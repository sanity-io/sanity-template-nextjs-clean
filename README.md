# Next.js + Sanity: A Powerful Website Starter with Real-time Visual Editing

![Screenshot of Sanity Studio using Presentation Tool to do Visual Editing](sanity-nextjs-preview.webp)
_the website this template generates_
![Screenshot of Sanity Studio using Presentation Tool to do Visual Editing](sanity-nextjs-presentation.webp)
_Visual Editing using Sanity's Presentation Tool_

This starter is a statically generated blog that uses Next.js App Router for the frontend and [Sanity][sanity-homepage] to handle its content. It comes with a standalone Sanity Studio that offers features like real-time collaboration and visual editing with live updates using [Presentation][presentation].

The Studio connects to Sanity Content Lake, which gives you hosted content APIs with a flexible query language, on-demand image transformations, powerful patching, and more. You can use this starter to kick-start a website, blog or learn these technologies.

## Features

- **Fast and Performant:** Static site built with Next.js App Router for excellent speed and SEO.
- **Real-time Visual Editing:** Use Sanity's [Presentation](https://www.sanity.io/docs/presentation) tools to see live updates as you edit.
- **Customizable Pages:** Create and manage pages using a page builder with dynamic components.
- **Powerful Content Management:** Collaborate with team members in real-time, with fine-grained revision history.
- **AI-powered Media Support:** Auto-generate alt texts with Sanity AI Assist.
- **On-demand Publishing:** No waiting for rebuilds—new content is live instantly with Incremental Static Revalidation.
- **Easy Media Management:** Integrated Unsplash support for seamless media handling.

## Demo

🌐 [https://sanity-template-nextjs-clean-preview.sanity.dev/](https://sanity-template-nextjs-clean-preview.sanity.dev/)

## Get Started Quickly

The easiest way to start is by deploying your app to **Vercel** with the button below. This will:

- Clone the repo to your GitHub account.
- Link or set up a Sanity project.
- Deploy your Next.js app on Vercel.

### 🚀 1\. **Deploy to Vercel**

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

Click the button to begin the setup wizard for your Next.js and Sanity project.

> **Note:** Prefer manual installation? See [manual-installation.md](manual-installation.md).

---

### 🛠 2\. **Deploy Sanity Studio**

1. **Clone your repository**:

   ```bash
   git clone <your-repo-url>
   cd studio
   ```

2. **Initialize Sanity Studio**:

   ```bash
   npx sanity init --env
   ```

   This will generate a `.env` file in the `studio` directory.

3. _Configure environment variables:_ In the generated .env file, add the following:

   ```bash
   SANITY_STUDIO_PREVIEW_URL="<your-vercel-app-url>"
   ```

   Replace `<your-vercel-app-url>` with the URL of your Vercel hosted Next.js app.

4. **Deploy your Studio**:

   ```bash
   npx sanity deploy
   ```

   You'll be promted to set a URL for your deployed Sanity Studio (e.g., `https://your-project-name.sanity.studio`). Take note of this URL as you'll need it in the next step.

---

### 🔧 3. **Configure Next.js with Sanity Studio URL**

1.  Go to **Vercel Dashboard** > Settings > Environment Variables.
2.  Add:
    - **Name**: `NEXT_PUBLIC_SANITY_STUDIO_URL`
    - **Value**: Your Sanity Studio's URL (e.g., `https://your-project.sanity.studio`).
3.  **Redeploy** your Next.js app to apply changes.

---

## Running Locally

When developing your app, you'll run the files locally. Git Pushing your changes to the repo will trigger a build on Vercel and your changes will be deployed. You can deploy your Sanity Studio at any time by running `npx sanity deploy` in the `studio` directory, as we did earlier.

### Run Next.js App Locally

1. **Set environment variables**:

   - Use the [Vercel CLI](https://vercel.com/docs/cli) to link and pull environment variables:
     ```bash
     vercel link
     vercel env pull .env.development.local
     ```
   - Alternatively, copy `.env.local.example` to `.env.local` and fill in required values. Your `projectId` and `dataset` can be found in your Sanity project's [**Manage Console**](https://www.sanity.io/manage) and selecting your project.

2. **Install dependencies and run the NextJS app**:

   ```bash
   npm install
   npm run dev
   ```

---

### Run Sanity Studio Locally

1.  **Set up environment variables**:

- Change directories to the `studio` directory:
- Duplicate the `.env` file or copy `.env.local.example` and fill in the `projectId` and `dataset` values, same as the Next.js app.
- Set `SANITY_STUDIO_PREVIEW_URL` to the localhost URL of your Next.js app or you can leave it blank and the app will fallback to the default `localhost:3000`.

2.  **Install dependencies and run the Sanity Studio**:

    ```bash
    npm install
    npm run dev
    ```

---

## 📚 Additional Resources

- 🎓 [Sanity Learn: Work-ready Next.js](https://www.sanity.io/learn/track/work-ready-next-js)
- 📖 [Sanity Documentation](https://www.sanity.io/docs)
- 💬 [Join the Sanity Community](https://slack.sanity.io)

[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[presentation]: https://www.sanity.io/docs/presentation
[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkenjonespizza%2Fsanity-template-nextjs-clean.git&env=NEXT_PUBLIC_SANITY_STUDIO_URL&project-name=nextjs-sanity-app&repository-name=nextjs-sanity-app&demo-title=NextJS%20Sanity%20Clean%20Starter%20Demo&demo-url=https%3A%2F%2Fsanity-template-nextjs-clean-preview.sanity.dev%2F&demo-image=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffkfgfb3d%2Fproduction%2Fbdec8dc8bd60198c011b888d700009e28841601b-1490x878.png%3Ffm-jpg&demo-description=A%20starter%20template%20for%20using%20NextJS%20with%20Sanity&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&root-directory=nextjs-app
