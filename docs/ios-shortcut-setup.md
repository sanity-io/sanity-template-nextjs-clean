# iOS Shortcut Setup — Tweet Collector

Use this guide to add tweets to your site directly from the iOS Share Sheet.

---

## Prerequisites

- The Cloudflare Worker is deployed and your `SECRET_TOKEN` is set via `wrangler secret put SECRET_TOKEN`.
- You know your token value.

---

## iOS Shortcut Steps

Create a new Shortcut in the **Shortcuts** app with the following actions:

1. **Receive input from Share Sheet** — set the input type to **URLs**. This makes the shortcut appear in the iOS Share menu when sharing a link.

2. **Get URLs from Share Sheet Input** — retrieves the URL passed from the Share Sheet.

3. **Choose from Menu** — set the title to `Tweet action` and add four options:
   - `Add`
   - `Pin`
   - `Unpin`
   - `Remove`

4. **Get Contents of URL** — configure as an HTTP request:
   - **URL:** `https://tweet-collector.bvc.workers.dev/collect`
   - **Method:** `POST`
   - **Headers:**
     - `Authorization`: `Bearer YOUR_SECRET_TOKEN`
     - `Content-Type`: `application/json`
   - **Request Body:** JSON
     ```json
     {
       "url": "<Share Sheet URL>",
       "action": "<chosen menu item (lowercase)>"
     }
     ```
     > In Shortcuts, insert the **URL** variable from step 2 as the value of `"url"`, and the **Chosen Item** variable from step 3 (set to lowercase) as the value of `"action"`.

5. **Show Notification** — display `Done: <Chosen Item>` to confirm success.

---

## Enable in Share Sheet

To make the shortcut appear when you tap **Share** on a tweet URL:

1. Open **Settings → Shortcuts**.
2. Tap your shortcut and enable **Show in Share Sheet**.

Or when editing the shortcut, tap the **ⓘ** icon → enable **Show in Share Sheet** and set the input type to URLs.

---

## Desktop (curl)

You can manage tweets from the terminal using `curl`:

```bash
# Add a tweet
curl -X POST https://tweet-collector.YOUR_SUBDOMAIN.workers.dev/collect \
  -H "Authorization: Bearer YOUR_SECRET_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://x.com/user/status/1234567890", "action": "add"}'

# Pin a tweet
curl -X POST https://tweet-collector.YOUR_SUBDOMAIN.workers.dev/collect \
  -H "Authorization: Bearer YOUR_SECRET_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://x.com/user/status/1234567890", "action": "pin"}'

# View current tweets
curl https://tweet-collector.YOUR_SUBDOMAIN.workers.dev/tweets
```

Replace `YOUR_SUBDOMAIN` and `YOUR_SECRET_TOKEN` with your actual values.
