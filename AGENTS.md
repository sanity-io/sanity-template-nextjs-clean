<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

Next.js + Sanity starter. npm workspaces: `frontend/` (Next.js App Router) and `studio/` (Sanity Studio). See [README.md](README.md) for setup, Visual Editing and deployment.

## Layout

- Studio config: `studio/sanity.config.ts`; schemas: `studio/src/schemaTypes/`; Studio sidebar: `studio/src/structure/`.
- Frontend routes and components: `frontend/app/`; Sanity client, GROQ queries and live content: `frontend/sanity/lib/`.
- TypeGen: the extracted schema is `sanity.schema.json` at the repo root. Generated types are in `frontend/sanity.types.ts` and `studio/sanity.types.ts`.

## Setup and commands

- If a workspace has no local env file, copy its `.env.example` to `.env`. Use the same Sanity project ID and dataset in both workspaces. Set `SANITY_API_READ_TOKEN` in the frontend only; keep it out of Git and client code.
- Run `npm install` at the repo root.
- `npm run dev`: runs TypeGen before starting Next.js (http://localhost:3000) and Studio (http://localhost:3333).
- `npm run lint`: frontend ESLint. `npm run format`: rewrites files with Prettier. `npm run type-check`: TypeScript in both workspaces (the frontend runs `next typegen` first). No test script is included.
- `npm run build --workspace=frontend`: generates Sanity types from the extracted schema, then builds Next.js. `npm run build --workspace=studio`: builds Studio.
- Ask before importing sample data or deploying. The sample import in the [README](README.md) targets `production` and replaces documents with matching IDs.

## Current docs

- [Sanity docs for agents](https://www.sanity.io/docs/llms.txt)
- [Sanity MCP setup](https://www.sanity.io/docs/ai/mcp-server): If the editor isn't already connected, offer `npx sanity@latest mcp configure` for a supported editor. Ask before running it; let the user complete any sign-in prompts.

## Features to offer next

The starter includes Visual Editing, TypeGen and a page builder. Offer these only when they fit the user's goal:

- **Functions** — Run code when content changes or on a schedule ([Functions guide](https://github.com/sanity-io/agent-toolkit/blob/main/skills/sanity-best-practices/references/functions.md))
- **Localization** — Model and edit content in multiple languages ([Localization guide](https://github.com/sanity-io/agent-toolkit/blob/main/skills/sanity-best-practices/references/localization.md))
- **Dashboard apps (beta)** — Use `defineApplication` to set up a Studio or App SDK app for the Sanity Dashboard ([Dashboard apps guide](https://github.com/sanity-io/agent-toolkit/blob/main/skills/sanity-best-practices/references/dashboard.md))
