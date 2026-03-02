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

## iOS Shortcut Setup

Create an iOS Shortcut to save, pin, unpin, or remove tweets from the Share Sheet.

### Shortcut Actions

Open **Shortcuts** app → tap **+** → name it **"Save Tweet"**. Add these actions in order:

1. **Receive URLs from Share Sheet**
   - Input type: **URLs**
   - "If there's no input": **Continue**

2. **Get URLs from Input**
   - Input: **Shortcut Input**

3. **List** + **Choose from List**
   - Add a **List** with items: `add`, `pin`, `unpin`, `remove`
   - Add **Choose from List** after it
   - Use "Choose from List" (not "Choose from Menu" — the menu is for branching and won't pass the label as a plain string)

4. **Get Contents of URL** (the POST request)
   - URL: `https://tweet-collector.<subdomain>.workers.dev/collect`
   - Method: **POST**
   - Headers:
     - `Authorization` → `Bearer YOUR_SECRET_TOKEN`
     - `Content-Type` → `application/json`
   - Request Body (JSON):
     - `url` → **URLs** variable (from step 2)
     - `action` → **Chosen Item** variable (from step 3)

5. **Check response and notify**
   - **Get Dictionary Value** — key: `ok`, dictionary: **Contents of URL**
   - **If** Dictionary Value **is** `1`:
     - **Show Notification**: `Tweet added`
   - **Otherwise**:
     - **Get Dictionary Value** — key: `error`, dictionary: **Contents of URL**
     - **Show Notification**: Dictionary Value
   - **End If**

### Tips

- Use `Bearer` (not `Bear`) in the Authorization header
- Shortcuts represents JSON `true` as `1` and `false` as `0` — use **is `1`** not "has any value"
- Leave the notification Title blank to avoid duplicate text — the shortcut name shows automatically

### Enable in Share Sheet

When editing the shortcut, tap **ⓘ** → enable **Show in Share Sheet** → set type to **URLs**.

### Usage

1. Open a tweet in the **X app** or **Safari**
2. Tap **Share** → **Save Tweet**
3. Pick an action → get a notification confirming success or showing the error

## Tests

```bash
npm install
npx vitest run
```
