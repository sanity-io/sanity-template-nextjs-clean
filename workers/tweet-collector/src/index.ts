interface Env {
  TWEET_KV: KVNamespace
  SECRET_TOKEN: string
}

type Action = 'add' | 'pin' | 'unpin' | 'remove'

const VALID_ACTIONS: Action[] = ['add', 'pin', 'unpin', 'remove']

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, {status: 204, headers: CORS_HEADERS})
    }

    if (request.method === 'POST' && url.pathname === '/collect') {
      const authHeader = request.headers.get('Authorization')
      if (!authHeader || authHeader !== `Bearer ${env.SECRET_TOKEN}`) {
        return new Response(JSON.stringify({ok: false, error: 'Unauthorized'}), {
          status: 401,
          headers: {'Content-Type': 'application/json', ...CORS_HEADERS},
        })
      }

      let body: {url?: string; action?: string}
      try {
        body = (await request.json()) as {url?: string; action?: string}
      } catch {
        return new Response(JSON.stringify({ok: false, error: 'Invalid JSON'}), {
          status: 400,
          headers: {'Content-Type': 'application/json', ...CORS_HEADERS},
        })
      }

      const id = extractTweetId(body.url ?? '')
      if (!id) {
        return new Response(JSON.stringify({ok: false, error: 'Could not extract tweet ID'}), {
          status: 400,
          headers: {'Content-Type': 'application/json', ...CORS_HEADERS},
        })
      }

      const action = body.action as Action
      if (!VALID_ACTIONS.includes(action)) {
        return new Response(JSON.stringify({ok: false, error: 'Invalid action'}), {
          status: 400,
          headers: {'Content-Type': 'application/json', ...CORS_HEADERS},
        })
      }

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

      return new Response(JSON.stringify({ok: true, action, id, pinned, recent}), {
        status: 200,
        headers: {'Content-Type': 'application/json', ...CORS_HEADERS},
      })
    }

    if (request.method === 'GET' && url.pathname === '/tweets') {
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
          ...CORS_HEADERS,
        },
      })
    }

    return new Response(JSON.stringify({ok: false, error: 'Not found'}), {
      status: 404,
      headers: {'Content-Type': 'application/json', ...CORS_HEADERS},
    })
  },
}
