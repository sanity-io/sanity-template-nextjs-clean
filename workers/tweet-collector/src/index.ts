interface Env {
  TWEET_KV: KVNamespace
  SECRET_TOKEN: string
  ALLOWED_ORIGIN?: string
}

type Action = 'add' | 'pin' | 'unpin' | 'remove'

const VALID_ACTIONS: Action[] = ['add', 'pin', 'unpin', 'remove']

function isValidAction(value: unknown): value is Action {
  return typeof value === 'string' && VALID_ACTIONS.includes(value as Action)
}

const PUBLIC_CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function collectCorsHeaders(env: Env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  }
}

function extractTweetId(input: string): string | null {
  const statusMatch = input.match(/\/status\/(\d+)/)
  if (statusMatch) return statusMatch[1]
  if (/^\d+$/.test(input.trim())) return input.trim()
  return null
}

async function getArray(kv: KVNamespace, key: string): Promise<string[]> {
  const value = await kv.get(key)
  if (!value) return []
  try {
    return JSON.parse(value) as string[]
  } catch {
    return []
  }
}

function jsonResponse(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {'Content-Type': 'application/json', ...headers},
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const method = request.method

    // CORS preflight
    if (method === 'OPTIONS') {
      const cors =
        url.pathname === '/collect' ? collectCorsHeaders(env) : PUBLIC_CORS_HEADERS
      return new Response(null, {status: 204, headers: cors})
    }

    // POST /collect — authenticated tweet management
    if (url.pathname === '/collect') {
      if (method !== 'POST') {
        return jsonResponse({ok: false, error: 'Method not allowed'}, 405, collectCorsHeaders(env))
      }

      const authHeader = request.headers.get('Authorization')
      if (!authHeader || authHeader !== `Bearer ${env.SECRET_TOKEN}`) {
        return jsonResponse({ok: false, error: 'Unauthorized'}, 401, collectCorsHeaders(env))
      }

      let body: {url?: string; action?: string}
      try {
        body = (await request.json()) as {url?: string; action?: string}
      } catch {
        return jsonResponse({ok: false, error: 'Invalid JSON'}, 400, collectCorsHeaders(env))
      }

      const id = extractTweetId(body.url ?? '')
      if (!id) {
        return jsonResponse({ok: false, error: 'Could not extract tweet ID'}, 400, collectCorsHeaders(env))
      }

      if (!isValidAction(body.action)) {
        return jsonResponse({ok: false, error: 'Invalid action'}, 400, collectCorsHeaders(env))
      }
      const action = body.action

      // NOTE: KV does not support transactions. Concurrent POST requests can
      // cause lost updates (read-modify-write race). This is acceptable for
      // low-traffic, single-user usage. For higher concurrency, migrate to
      // Durable Objects.
      let pinned = await getArray(env.TWEET_KV, 'pinned')
      let recent = await getArray(env.TWEET_KV, 'recent')

      const inPinned = pinned.includes(id)
      const inRecent = recent.includes(id)

      if (action === 'add') {
        if (!inPinned && !inRecent) {
          recent = [id, ...recent].slice(0, 10)
        }
      } else if (action === 'pin') {
        if (!inPinned) {
          recent = recent.filter((x) => x !== id)
          pinned = [id, ...pinned]
        }
      } else if (action === 'unpin') {
        if (inPinned) {
          pinned = pinned.filter((x) => x !== id)
          recent = [id, ...recent].slice(0, 10)
        } else if (!inRecent) {
          recent = [id, ...recent].slice(0, 10)
        }
      } else if (action === 'remove') {
        if (inPinned || inRecent) {
          pinned = pinned.filter((x) => x !== id)
          recent = recent.filter((x) => x !== id)
        }
      }

      await Promise.all([
        env.TWEET_KV.put('pinned', JSON.stringify(pinned)),
        env.TWEET_KV.put('recent', JSON.stringify(recent)),
      ])

      return jsonResponse({ok: true, action, id, pinned, recent}, 200, collectCorsHeaders(env))
    }

    // GET /tweets — public endpoint
    if (url.pathname === '/tweets') {
      if (method !== 'GET') {
        return jsonResponse({ok: false, error: 'Method not allowed'}, 405, PUBLIC_CORS_HEADERS)
      }

      const [pinned, recent] = await Promise.all([
        getArray(env.TWEET_KV, 'pinned'),
        getArray(env.TWEET_KV, 'recent'),
      ])

      const merged = [...pinned, ...recent.filter((id) => !pinned.includes(id))].slice(0, 10)

      return new Response(JSON.stringify(merged), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
          ...PUBLIC_CORS_HEADERS,
        },
      })
    }

    return jsonResponse({ok: false, error: 'Not found'}, 404, PUBLIC_CORS_HEADERS)
  },
}
