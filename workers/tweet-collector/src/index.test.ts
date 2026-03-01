import {env, createExecutionContext, waitOnExecutionContext} from 'cloudflare:test'
import {describe, it, expect, beforeEach} from 'vitest'
import worker from './index'

const SECRET = 'test-secret'

function makeRequest(method: string, path: string, body?: unknown, token?: string) {
  const headers: Record<string, string> = {'Content-Type': 'application/json'}
  if (token) headers['Authorization'] = `Bearer ${token}`
  return new Request(`https://test.example.com${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
}

async function collect(action: string, url: string) {
  const ctx = createExecutionContext()
  const res = await worker.fetch(
    makeRequest('POST', '/collect', {url, action}, SECRET),
    {...env, SECRET_TOKEN: SECRET},
    ctx,
  )
  await waitOnExecutionContext(ctx)
  return res.json() as Promise<{ok: boolean; action: string; id: string; pinned: string[]; recent: string[]}>
}

async function getTweets() {
  const ctx = createExecutionContext()
  const res = await worker.fetch(
    makeRequest('GET', '/tweets'),
    {...env, SECRET_TOKEN: SECRET},
    ctx,
  )
  await waitOnExecutionContext(ctx)
  return res.json() as Promise<string[]>
}

describe('tweet-collector worker', () => {
  beforeEach(async () => {
    await env.TWEET_KV.put('pinned', JSON.stringify([]))
    await env.TWEET_KV.put('recent', JSON.stringify([]))
  })

  describe('auth', () => {
    it('returns 401 without auth header', async () => {
      const ctx = createExecutionContext()
      const res = await worker.fetch(
        makeRequest('POST', '/collect', {url: '123', action: 'add'}),
        {...env, SECRET_TOKEN: SECRET},
        ctx,
      )
      await waitOnExecutionContext(ctx)
      expect(res.status).toBe(401)
    })

    it('returns 401 with wrong token', async () => {
      const ctx = createExecutionContext()
      const res = await worker.fetch(
        makeRequest('POST', '/collect', {url: '123', action: 'add'}, 'wrong'),
        {...env, SECRET_TOKEN: SECRET},
        ctx,
      )
      await waitOnExecutionContext(ctx)
      expect(res.status).toBe(401)
    })
  })

  describe('validation', () => {
    it('returns 400 for invalid tweet URL', async () => {
      const ctx = createExecutionContext()
      const res = await worker.fetch(
        makeRequest('POST', '/collect', {url: 'not-a-tweet', action: 'add'}, SECRET),
        {...env, SECRET_TOKEN: SECRET},
        ctx,
      )
      await waitOnExecutionContext(ctx)
      expect(res.status).toBe(400)
      const body = await res.json() as {error: string}
      expect(body.error).toContain('tweet ID')
    })

    it('returns 400 for invalid action', async () => {
      const ctx = createExecutionContext()
      const res = await worker.fetch(
        makeRequest('POST', '/collect', {url: '123', action: 'invalid'}, SECRET),
        {...env, SECRET_TOKEN: SECRET},
        ctx,
      )
      await waitOnExecutionContext(ctx)
      expect(res.status).toBe(400)
      const body = await res.json() as {error: string}
      expect(body.error).toContain('Invalid action')
    })

    it('extracts ID from full tweet URL', async () => {
      const result = await collect('add', 'https://x.com/user/status/9876543210')
      expect(result.id).toBe('9876543210')
    })

    it('extracts ID from tweet URL with query params', async () => {
      const result = await collect('add', 'https://x.com/user/status/9876543210?s=20')
      expect(result.id).toBe('9876543210')
    })

    it('handles shell-escaped URL with invalid JSON escapes', async () => {
      // Simulates: -d '{"url": "https://x.com/user/status/123\?s\=20", "action": "add"}'
      // where \? and \= are invalid JSON escape sequences
      const rawBody = '{"url": "https://x.com/user/status/9876543210\\?s\\=20", "action": "add"}'
      const req = new Request('https://test.example.com/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SECRET}`,
        },
        body: rawBody,
      })
      const ctx = createExecutionContext()
      const res = await worker.fetch(req, {...env, SECRET_TOKEN: SECRET}, ctx)
      await waitOnExecutionContext(ctx)
      const result = await res.json() as {ok: boolean; id: string}
      expect(result.ok).toBe(true)
      expect(result.id).toBe('9876543210')
    })

    it('accepts bare numeric ID', async () => {
      const result = await collect('add', '1234567890')
      expect(result.id).toBe('1234567890')
    })
  })

  describe('method enforcement', () => {
    it('returns 405 for GET /collect', async () => {
      const ctx = createExecutionContext()
      const res = await worker.fetch(
        makeRequest('GET', '/collect'),
        {...env, SECRET_TOKEN: SECRET},
        ctx,
      )
      await waitOnExecutionContext(ctx)
      expect(res.status).toBe(405)
    })

    it('returns 405 for POST /tweets', async () => {
      const ctx = createExecutionContext()
      const res = await worker.fetch(
        makeRequest('POST', '/tweets'),
        {...env, SECRET_TOKEN: SECRET},
        ctx,
      )
      await waitOnExecutionContext(ctx)
      expect(res.status).toBe(405)
    })
  })

  describe('add action', () => {
    it('adds tweet to recent', async () => {
      const result = await collect('add', '111')
      expect(result.recent).toEqual(['111'])
      expect(result.pinned).toEqual([])
    })

    it('is a no-op if already in recent', async () => {
      await collect('add', '111')
      const result = await collect('add', '111')
      expect(result.recent).toEqual(['111'])
    })

    it('is a no-op if already in pinned', async () => {
      await collect('pin', '111')
      const result = await collect('add', '111')
      expect(result.pinned).toEqual(['111'])
      expect(result.recent).toEqual([])
    })

    it('caps recent at 10 entries', async () => {
      for (let i = 1; i <= 11; i++) {
        await collect('add', String(i))
      }
      const tweets = await getTweets()
      expect(tweets).toHaveLength(10)
      // Most recent first, oldest (1) dropped
      expect(tweets[0]).toBe('11')
      expect(tweets).not.toContain('1')
    })
  })

  describe('pin action', () => {
    it('pins a new tweet', async () => {
      const result = await collect('pin', '111')
      expect(result.pinned).toEqual(['111'])
      expect(result.recent).toEqual([])
    })

    it('moves tweet from recent to pinned', async () => {
      await collect('add', '111')
      const result = await collect('pin', '111')
      expect(result.pinned).toEqual(['111'])
      expect(result.recent).toEqual([])
    })

    it('is a no-op if already pinned', async () => {
      await collect('pin', '111')
      await collect('pin', '222')
      const result = await collect('pin', '111')
      expect(result.pinned).toEqual(['222', '111'])
    })
  })

  describe('unpin action', () => {
    it('moves pinned tweet to recent', async () => {
      await collect('pin', '111')
      const result = await collect('unpin', '111')
      expect(result.pinned).toEqual([])
      expect(result.recent).toEqual(['111'])
    })

    it('is a no-op if already in recent', async () => {
      await collect('add', '111')
      const result = await collect('unpin', '111')
      expect(result.recent).toEqual(['111'])
      expect(result.pinned).toEqual([])
    })

    it('adds to recent if not in either array', async () => {
      const result = await collect('unpin', '999')
      expect(result.recent).toEqual(['999'])
      expect(result.pinned).toEqual([])
    })
  })

  describe('remove action', () => {
    it('removes from pinned', async () => {
      await collect('pin', '111')
      const result = await collect('remove', '111')
      expect(result.pinned).toEqual([])
      expect(result.recent).toEqual([])
    })

    it('removes from recent', async () => {
      await collect('add', '111')
      const result = await collect('remove', '111')
      expect(result.recent).toEqual([])
    })

    it('is a no-op if not in either', async () => {
      const result = await collect('remove', '999')
      expect(result.ok).toBe(true)
      expect(result.pinned).toEqual([])
      expect(result.recent).toEqual([])
    })
  })

  describe('GET /tweets', () => {
    it('returns empty array when no tweets', async () => {
      const tweets = await getTweets()
      expect(tweets).toEqual([])
    })

    it('returns pinned before recent, deduplicated', async () => {
      await collect('add', '111')
      await collect('add', '222')
      await collect('pin', '333')
      const tweets = await getTweets()
      expect(tweets).toEqual(['333', '222', '111'])
    })

    it('deduplicates pinned and recent', async () => {
      await collect('add', '111')
      await collect('pin', '111')
      const tweets = await getTweets()
      expect(tweets).toEqual(['111'])
    })

    it('caps merged result at 10', async () => {
      for (let i = 1; i <= 8; i++) {
        await collect('pin', String(i))
      }
      for (let i = 9; i <= 15; i++) {
        await collect('add', String(i))
      }
      const tweets = await getTweets()
      expect(tweets).toHaveLength(10)
    })

    it('returns correct cache headers', async () => {
      const ctx = createExecutionContext()
      const res = await worker.fetch(
        makeRequest('GET', '/tweets'),
        {...env, SECRET_TOKEN: SECRET},
        ctx,
      )
      await waitOnExecutionContext(ctx)
      expect(res.headers.get('Cache-Control')).toBe('public, max-age=60')
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*')
    })
  })
})
