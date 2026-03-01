# Tweet Collector — Cloudflare Worker

A lightweight Cloudflare Worker that manages a list of tweet IDs stored in KV. The blog's `RecentTweets` component fetches from this worker to display tweets on the homepage.

## Architecture

- **POST /collect** — Authenticated endpoint to add, pin, unpin, or remove tweets
- **GET /tweets** — Public endpoint returning merged pinned + recent tweet IDs (cached 60s)
- **Cloudflare KV** — Stores two arrays: `pinned` and `recent`

## Setup

### 1. Create KV namespace

```bash
wrangler kv:namespace create TWEET_KV
```

Update the `id` in `wrangler.toml` with the returned namespace ID.

### 2. Set the secret token

```bash
wrangler secret put SECRET_TOKEN
```

Enter a secure token. This is used for Bearer auth on the `/collect` endpoint.

### 3. Deploy

```bash
cd workers/tweet-collector
npm install
wrangler deploy
```

### 4. Connect to the blog

Add the worker URL as an environment variable for the Next.js frontend:

- **Local**: Add `TWEET_WORKER_URL="https://tweet-collector.<your-subdomain>.workers.dev"` to `frontend/.env`
- **Netlify/Vercel**: Add `TWEET_WORKER_URL` in your hosting provider's environment variables, then redeploy

## Usage

### Add a tweet

```bash
curl -X POST https://tweet-collector.<your-subdomain>.workers.dev/collect \
  -H "Authorization: Bearer <your-secret-token>" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://x.com/user/status/123456789", "action": "add"}'
```

### Actions

| Action   | Description                          |
|----------|--------------------------------------|
| `add`    | Add tweet to recent list             |
| `pin`    | Pin tweet (moves from recent to pinned) |
| `unpin`  | Unpin tweet (moves back to recent)   |
| `remove` | Remove tweet from both lists         |

The `url` field accepts full tweet URLs (with or without query params) or bare tweet IDs.

### Read tweets

```bash
curl https://tweet-collector.<your-subdomain>.workers.dev/tweets
```

Returns a JSON array of tweet IDs (pinned first, then recent, max 10).

## Tests

```bash
npm install
npx vitest run
```
