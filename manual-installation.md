# Manual Installation

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

Project ID: <projectId>
Dataset: <dataset>

You can find your project on Sanity Manage — https://www.sanity.io/manage/project/rjtcllfw
```

Your `projectI ID` is not sensitive information

### Step 4. Set up environment variables

```bash
cp -i .env.local.example .env.local
```

Next, populate the `.env.local` file with the project ID and dataset name provided by the Sanity CLI in the previous step, or by visiting the [Sanity Manage Console](https://manage.sanity.io/)

### Step 5. Optionally seed content by importing a dataset

If you want to start with some sample content, you can import the provided dataset (demoData.tar.gz) into your Sanity project. This step is optional but can be helpful for getting started quickly.

To import the dataset, run the following command in your terminal:

```bash
npx sanity dataset import demoData.tar.gz production
```

This assumes your dataset is named `production`. If your dataset is named differently, replace `production` with the name of your dataset.

### Step 6. Run your Sanity Studio locally

At this point, when you run your Sanity Studio, you'll see a message indicating that Presentation needs to be configured.

![Presentation needs configuration](presentation-needs-configuration.webp)

We'll address this in the next section when we set up the Next.js app.

```bash
npm run dev
```

> [!TIP]
> In this demo starter, we are using TypeScript. After making changes to your schema, you'll need to extract the Sanity Studio Schema so that you can use that JSON file to generate TypeScript types for your Next.js app.

```bash
npm run extract-types
```

This command is running `sanity schema extract --enforce-required-fields` under the hood. Learn more about [extracting types](https://www.sanity.io/docs/sanity-typegen#b79c963e4cf4).

## Configure your Next.js app

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

You can now populate `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` by running the following command. Select your project and dataset when prompted and select NO when asked "Would you like to add configuration files for a Sanity project":

```bash
npm create sanity@latest -- --env=.env.local
```

#### Creating a read token

Before you can run the project you need to setup a read token (`SANITY_API_READ_TOKEN`), it's used for authentication by Sanity's Presentation tool and pulling content while in draft mode.

1. Go to [manage.sanity.io](https://manage.sanity.io/) and select your project in the "Project" dropdown.
2. Click on the `🔌 API` tab.
3. Click on `+ Add API token`.
4. Name it "Next.js / Presentation READ Token" and set `Permissions` to `Viewer` and hit `Save`.
5. Copy the token and add it to your `.env.local` file.

```bash
SANITY_API_READ_TOKEN="<paste your token here>"
```

### Step 4. Run your Next.js app locally

```bash
npm run dev
```

> [!Note]
> we are generating types automatically by running `"predev": "npm run typegen"` in our package.json file. This is optional, but will build your `sanity.types.ts` file automatically. Learn more about [Sanity TypeGen](https://www.sanity.io/docs/sanity-typegen).

```bash
npm run extract-types
```

This command is running `sanity typegen generate` under the hood. Learn more about [generating types](https://www.sanity.io/docs/sanity-typegen).

## Deploying the Sanity Studio and Next.js app to production

### Deploy your Sanity Studio

To deploy your Sanity Studio, follow these steps:

1. You'll likely need a different .env file for production, so that you can set a different `SANITY_STUDIO_PREVIEW_URL` to match the domain you will deploy your Next.js app to. Copy the .env.local file to .env.production and set the correct environment variables.

   ```bash
   cp -i .env.local .env.production
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

[!NOTE]

> You can deploy your Next.js app wherever you'd like, but for the sake of this demo we will be using Vercel.

#### To deploy manually deploy your Next.js app to Vercel, follow these steps:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Visit [Vercel's dashboard](https://vercel.com/dashboard) and click on "New Project".

3. Import your Git repository:

   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Choose the repository containing your Next.js app

4. Configure your project:

   - **Set the Root Directory to the directory of your Next.js app**
   - Vercel will automatically detect that it's a Next.js app
   - Adjust the build settings if needed (usually not necessary for Next.js apps)

5. Set up environment variables:

   - Click on "Environment Variables"
   - Add all the variables from your `.env` file. Don't forget to set `NEXT_PUBLIC_SANITY_STUDIO_URL` the url of your deployed studio.

6. Click "Deploy" to start the deployment process.

7. Once deployed, Vercel will provide you with a URL for your live app.

8. (Optional) Set up a custom domain in the Vercel dashboard.

9. Now you can add your App's domain to the list of CORS origins in your Sanity Manage console, under the `🔌 API` tab.

For subsequent deployments, simply push changes to your Git repository. Vercel will automatically rebuild and redeploy your app.

> [!TIP]
> You can also use the Vercel CLI for deployment. Install it globally with `npm i -g vercel`, then run `vercel` in your nextjs-app directory and follow the prompts.
> [!NOTE]
> You may need to disable or configure "Protection Bypass for Automation" in your Vercel settings to get Presentation to work in your Sanity Studio.

## Next steps

- [Sanity Learn: Work-ready Next.js](https://www.sanity.io/learn/track/work-ready-next-js)
- [Embedding Sanity Studio](https://www.sanity.io/docs/embedding-sanity-studio)
- [Join the Sanity community](https://slack.sanity.io/)

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fsanity-template-nextjs-clean&project-name=nextjs-sanity-app&repository-name=nextjs-sanity-app&demo-title=Next.js%20%2B%20Sanity%20Starter&demo-description=A%20starter%20template%20for%20using%20Next.js%20with%20Sanity&demo-url=template-nextjs-clean.sanity.build&demo-image=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffkfgfb3d%2Fproduction%2F24fe6ac08e17d7b4263701af217dc153ad31b3a9-1319x892.webp&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&root-directory=nextjs-app
[integration]: https://www.sanity.io/docs/vercel-integration
[`.env.local.example`]: .env.local.example
[unsplash]: https://unsplash.com
[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[presentation]: https://www.sanity.io/docs/presentation
[enable-ai-assist]: https://www.sanity.io/plugins/ai-assist#enabling-the-ai-assist-api
