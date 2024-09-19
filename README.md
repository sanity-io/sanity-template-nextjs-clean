# A statically generated blog example using Next.js and Sanity

![Screenshot of Sanity Studio using Presentation Tool to do Visual Editing](sanity-nextjs-preview.webp)
![Screenshot of Sanity Studio using Presentation Tool to do Visual Editing](sanity-nextjs-presentation.webp)

This starter is a statically generated blog that uses Next.js App Router for the frontend and [Sanity][sanity-homepage] to handle its content. It comes with a Sanity Studio that offers features like real-time collaboration and visual editing with live updates using [Presentation][presentation].

The Studio connects to Sanity Content Lake, which gives you hosted content APIs with a flexible query language, on-demand image transformations, powerful patching, and more. You can use this starter to kick-start a website, blog or learn these technologies.

## Features

- A performant, static Next.js website with pages and a blog.
  - Pages are configured with a page builder.
  - Blog posts with connected authors, and site settings.
- Visual editing with live updates through [Presentation](https://www.sanity.io/docs/presentation)
- TypeScript setup with [Sanity TypeGen](https://www.sanity.io/docs/sanity-typegen)
- A native and customizable authoring environment. You can [deploy and host the studio with Sanity](https://www.sanity.io/docs/deployment) or your hosting environment of choice.
- Real-time and collaborative content editing with fine-grained revision history
- Support for block content and the most advanced custom fields capability in the industry
- Incremental Static Revalidation; no need to wait for a rebuild to publish new content
- Unsplash integration setup for easy media management
- [Sanity AI Assist preconfigured for image alt text generation](https://www.sanity.io/docs/ai-assist?utm_source=github.com)

## Demo

### [https://next-blog.sanity.build](https://next-blog.sanity.build)

## Important files and folders

| File/Directory           | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| **studio/**              |                                                               |
| `src/schemaTypes/`       | Directory where Sanity Studio content types are defined       |
| `env.local`              | Environment variables for local development                   |
| `sanity.cli.ts`          | Config file for Sanity CLI                                    |
| `sanity.config.ts`       | Sanity config                                                 |
| **nextjs-app/**          |                                                               |
| `app/[slug]/page.tsx`    | Route for a page                                              |
| `app/api/draft/route.ts` | Serverless route for triggering Draft mode                    |
| `app/components/`        | Shared components                                             |
| `app/posts/page.tsx`     | Route for a blog post                                         |
| `app/layout.tsx`         | Global layout for the app                                     |
| `app/page.tsx`           | Route for index page page                                     |
| `sanity/lib/client.ts`   | Sanity client configured based on `env.ts`                    |
| `sanity/lib/fetch.ts`    | Utility for fetching data from Sanity                         |
| `sanity/lib/queries.ts`  | GROQ queries used across the app                              |
| `env.local`              | Environment variables for local development                   |
| `sanity-typegen.json`    | TypeGen config                                                |
| `sanity.types.ts`        | Generated file of schema and query types                      |
| `tailwind.config.ts`     | Tailwind config. Only applies to files listed under `content` |

## Configure your Sanity Studio

### Step 1. Change directories to your Sanity Studio

```bash
cd studio
```

### Step 2. Install dependencies

```bash
npm install
```

### Step 3 Create a new Sanity project and dataset

```bash
npx sanity init --bare
```

You will be prompted with an output that contains the project ID and dataset name.

```bash
Success! Below are your project details:

Project ID: rjtcllfw
Dataset: production

You can find your project on Sanity Manage — https://www.sanity.io/manage/project/rjtcllfw
```

Your `projectI ID` is not sensitive information

### Step 4. Set up environment variables

```bash
cp -i .env.local.example .env.local
```

Next, populate the `.env.local` file with the project ID and dataset name provided by the Sanity CLI in the previous step, or by visiting the [Sanity Manage Console](https://manage.sanity.io/)

### Step 5. Optionally import the dataset

If you want to start with some sample content, you can import the provided dataset into your Sanity project. This step is optional but can be helpful for getting started quickly.

To import the dataset, run the following command in your terminal:

```bash
npx sanity dataset import production.tar.gz production
```

### Step 6. Run your Sanity Studio locally

At this point, when you run your Sanity Studio, you'll see a message indicating that Presentation needs to be configured.

![Presentation needs configuration](presentation-needs-configuration.webp)

We'll address this in the next section when we set up the Next.js app.

```bash
npm run dev
```

## Configure your Next.js app (Not using Vercel)

### Step 1. Change directories to your Next.js app

```bash
cd nextjs-app # from the root of the repo
```

### Step 2. Install dependencies

```bash
npm install
```

### Step 3. Set up environment variables

```bash
cp -i .env.local.example .env.local
```

Add your Sanity project details to the `.env.local` file. The `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.

#### Creating a read token

Before you can run the project you need to setup a read token (`SANITY_API_READ_TOKEN`), it's used for authentication by Sanity's Presentation tool and pulling content while in draft mode.

1. Go to [manage.sanity.io](https://manage.sanity.io/) and select your project and select your project in "Project" dropdown.
2. Click on the `🔌 API` tab.
3. Click on `+ Add API token`.
4. Name it "NextJS / Presentation READ Token" and set `Permissions` to `Viewer` and hit `Save`.
5. Copy the token and add it to your `.env.local` file.

```bash
SANITY_API_READ_TOKEN="<paste your token here>"
```

### Step 4. Run your Next.js app locally

```bash
npm run dev
```

# Populate content

Open your Sanity Studio that should be running on [http://localhost:3000/studio](http://localhost:3000/studio).

By default you're taken to the [Presentation tool][presentation], which has a preview of the blog on the left hand side, and a list of documents on the right hand side.

<details>
<summary>View screenshot ✨</summary>

![screenshot](https://github.com/vercel/next.js/assets/81981/07cbc580-4a03-4837-9aa4-90b632c95630)

</details>

We're all set to do some content creation!

- Click on the **"+ Create"** button top left and select **Post**
- Type some dummy data for the **Title**
- **Generate** a **Slug**
  <details>
  <summary>Now that you have a slug you should see the post show up in the preview on the left hand side ✨</summary>

  ![screenshot](https://github.com/vercel/next.js/assets/81981/05b74848-6ae4-442b-8995-0b7e2180aa74)

  </details>

- Fill in **Content** with some dummy text
  <details>
  <summary>Or generate it with AI Assist ✨</summary>

  If you've enabled [AI Assist][enable-ai-assist] you click on the sparkles ✨ button and generate a draft based on your title and then on **Generate sample content**.

  ![screenshot](https://github.com/vercel/next.js/assets/81981/2276d8ad-5b55-447c-befe-d53249f091e1)

  </details>

- Summarize the **Content** in the **Excerpt** field
  <details>
  <summary>Or have AI Assist summarize it for you ✨</summary>

  If you've enabled [AI Assist][enable-ai-assist] you click on the sparkles ✨ button and then on **Generate sample content**.

  ![screenshot](https://github.com/vercel/next.js/assets/81981/d24b9b37-cd88-4519-8094-f4c956102450)

  </details>

- Select a **Cover Image** from [Unsplash].
  <details>
  <summary>Unsplash is available in the **Select** dropdown ✨</summary>

  ![screenshot](https://github.com/vercel/next.js/assets/81981/204d004d-9396-434e-8795-a8b68a2ed89b)

  </details>
  <details>
  <summary>Click the "Crop image" button to adjust hotspots and cropping ✨</summary>

  ![screenshot](https://github.com/vercel/next.js/assets/81981/e905fc6e-5bab-46a7-baec-7cb08747772c)

  </details>
  <details>
  <summary>You can preview the results live on the left side, and additional formats on the right side ✨</summary>

  ![screenshot](https://github.com/vercel/next.js/assets/81981/6c59eef0-d2d9-4d77-928a-98e99df4b1df)

  </details>

- Customize the blog name, description and more.
  <details>
  <summary>Click "Structure" at the top center, then on "Settings" on the left hand side ✨</summary>

  ![screenshot](https://github.com/vercel/next.js/assets/81981/14f48d83-af81-4589-900e-a7a598cc608a)

  </details>
  <details>
  <summary>Once you have a "Settings" document, you can customize it inside "Presentation" ✨</summary>

  ![screenshot](https://github.com/vercel/next.js/assets/81981/e3473f7b-5e7e-46ab-8d43-cae54a4b929b)

  </details>

> [!IMPORTANT]  
> For each post record, you need to click **Publish** after saving for it to be visible outside Draft Mode. In production new content is using [Time-based Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation), which means it may take up to 1 minute before changes show up. Since a stale-while-revalidate pattern is used you may need to refresh a couple of times to see the changes.

## Step 4. Deploying the Sanity Studio and Next.js app to production

### Deploy your Sanity Studio

To deploy your Sanity Studio, follow these steps:

1. You'll likely need a different .env file for production, so that you can set a different `SANITY_STUDIO_PREVIEW_URL` to match the domain you will deploy your Next.js app to. Copy the .env.local.example file to .env.production and set the correct environment variables.

   ```bash
   cp -i .env.local.example .env.production
   ```

2. In your terminal use the following command to deploy the Studio to Sanity's servers. [Learn more about deploying to Sanity](https://www.sanity.io/docs/deployment).

   ```bash
   npx sanity deploy
   ```

3. When prompted, choose a unique hostname for your Studio. This will be the URL where your Studio is accessible.

4. Once the deployment is complete, you'll receive a URL for your deployed Sanity Studio. It will look something like:

   ```
   https://your-project-name.sanity.studio
   ```

5. You can now access and use your Sanity Studio from this URL from any device with an internet connection.

Remember to redeploy your Studio whenever you make changes to its configuration or schema.

> [!NOTE]
> Make sure you have the necessary permissions to deploy. If you're working in a team, check with your project owner or administrator.

> [!TIP]
> You can also set up continuous deployment for your Sanity Studio using services like Netlify or Vercel. This allows your Studio to automatically redeploy whenever you push changes to your repository.

### Deploy your Next.js app to Vercel

To deploy your Next.js app to Vercel, follow these steps:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Visit [Vercel's dashboard](https://vercel.com/dashboard) and click on "New Project".

3. Import your Git repository:

   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Choose the repository containing your Next.js app

4. Configure your project:

   - **Set the Root Directory to the directory of your NextJS app**
   - Vercel will automatically detect that it's a Next.js app
   - Adjust the build settings if needed (usually not necessary for Next.js apps)

5. Set up environment variables:

   - Click on "Environment Variables"
   - Add all the variables from your `.env` file. Don't forget to set `NEXT_PUBLIC_SANITY_STUDIO_URL` the url of your deployed studio.

6. Click "Deploy" to start the deployment process.

7. Once deployed, Vercel will provide you with a URL for your live app.

8. (Optional) Set up a custom domain in the Vercel dashboard.

9. Now you can add your App's domain to the list of CORS orgins in your Sanity Manage console, under the `🔌 API` tab.

For subsequent deployments, simply push changes to your Git repository. Vercel will automatically rebuild and redeploy your app.

> [!TIP]
> You can also use the Vercel CLI for deployment. Install it globally with `npm i -g vercel`, then run `vercel` in your nextjs-app directory and follow the prompts.

## Next steps

- [Join the Sanity community](https://slack.sanity.io/)
- [Embedding Sanity Studio](https://www.sanity.io/docs/embedding-sanity-studio)

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fsanity-template-nextjs-clean&repository-name=nextjs-sanity-clean&project-name=nextjs-sanity-clean&demo-title=Clean+Sanity+%2B+Next.js+app&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F835514%2F212771865-7a603a28-0416-45e8-84d3-2aafe02b0c7f.png&demo-description=A+clean+example+of+Next.js+with+embedded+Sanity+ready+for+recomposition.&demo-url=https%3A%2F%2Ftemplate-nextjs-clean.sanity.build&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs%3Btemplate%3Dnextjs-sanity-clean
[integration]: https://www.sanity.io/docs/vercel-integration
[`.env.local.example`]: .env.local.example
[unsplash]: https://unsplash.com
[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[presentation]: https://www.sanity.io/docs/presentation
[enable-ai-assist]: https://www.sanity.io/plugins/ai-assist#enabling-the-ai-assist-api
