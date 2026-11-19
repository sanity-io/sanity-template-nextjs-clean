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
- [Sanity MCP setup](https://www.sanity.io/docs/ai/mcp-server)

## Sanity: connect MCP, then what to build next

If Sanity MCP tools aren't available, offer to run `npx sanity@latest mcp configure` for a supported editor. Ask before running it, and let the user complete sign-in in their editor.

Once the project is set up, show the user this map and offer the next step. These are offers, not permission to deploy a schema, the Studio or a Function — ask first.

1. **Schema**: model content in `studio/src/schemaTypes/`, then run `npx sanity schemas deploy` in `studio/` so MCP tools can see it.
2. **Queries and types**: write GROQ with `defineQuery` in `frontend/sanity/lib/queries.ts`, then run `npm run sanity:typegen --workspace=frontend` to regenerate types.
3. **Functions**: run code when content changes or on a schedule, for example fill in a slug when a post is published ([Functions guide](https://github.com/sanity-io/agent-toolkit/blob/main/skills/sanity-best-practices/references/functions.md)).
4. **Deploy**: `npm run deploy --workspace=studio` for the Studio; see [README.md](README.md) for the frontend.
