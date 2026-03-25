# Vercel Deployment Instructions

This guide is for users who deployed this template using the **Sanity + Vercel Integration** or **one-click Vercel deploy button**. It walks you through setting up your local development environment and deploying Sanity Studio.

## Step 1. Deploy to Vercel

If you haven't already, click the button below to deploy:

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

Follow the instructions on Vercel to complete the deployment. This will clone the repo to your GitHub account, deploy the Next.js frontend, and create a Sanity project via the Vercel integration.

## Step 2. Clone and install locally

Clone the repository that was created in your GitHub account and install dependencies:

```shell
git clone <your-new-repo-url>
cd <your-repo-name>
npm install
```

## Step 3. Pull environment variables

Link your local project to your Vercel project and pull the environment variables:

```shell
cd frontend && npx vercel link && npx vercel env pull .env.local && cd ..
```

The Vercel integration provisions environment variables for both the Next.js frontend (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, etc.) and Sanity Studio (`SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, etc.). Since each app only reads the variables it needs, you can use the same `.env.local` file for both:

```shell
cp frontend/.env.local studio/.env.local
```

## Step 4. Run locally

From the project root, start both the Next.js app and Sanity Studio:

```shell
npm run dev
```

- Next.js runs on [http://localhost:3000](http://localhost:3000)
- Sanity Studio runs on [http://localhost:3333](http://localhost:3333)

Sign in to the Studio with the same account you used during the Vercel/Sanity setup.

## Step 5. Import sample data (optional)

To get started quickly with pre-built content, run:

```shell
npm run import-sample-data
```

## Step 6. Deploy Sanity Studio

Deploy the Studio so your team can access it online:

```shell
cd studio && npx sanity deploy
```

You will be prompted to choose a hostname (e.g., `your-project.sanity.studio`).

After deploying, update the `NEXT_PUBLIC_SANITY_STUDIO_URL` environment variable in your Vercel project settings to point to your deployed Studio URL (e.g., `https://your-project.sanity.studio`).

## Step 7. Invite collaborators (optional)

Visit [sanity.io/manage](https://www.sanity.io/manage), select your project, and click **"Invite project members"** to collaborate with your team.

## Resources

- [Sanity documentation](https://www.sanity.io/docs)
- [Next.js documentation](https://nextjs.org/docs)
- [Join the Sanity Community](https://slack.sanity.io)
- [Learn Sanity](https://www.sanity.io/learn)

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fsanity-template-nextjs-clean&project-name=nextjs-clean-website-sanity-template&repository-name=nextjs-clean-website-sanity-template&demo-title=Clean%20Next.js%20%2B%20Sanity%20app&demo-description=A%20clean%20Next.js%20plus%20Sanity%20starter%20with%20real-time%20visual%20editing%2C%20drag-and-drop%20page%20builder%2C%20AI%20media%20support%2C%20and%20live%20content%20updates.&demo-url=https%3A%2F%2Ftemplate-nextjs-clean.sanity.build%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fsanity-io%2Fsanity-template-nextjs-clean%2Frefs%2Fheads%2Fmain%2Fsanity-next-preview.png&products=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22sanity%22%2C%22productSlug%22%3A%22project%22%2C%22protocol%22%3A%22other%22%7D%5D&root-directory=frontend
