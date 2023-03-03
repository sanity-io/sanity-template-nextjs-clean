# Adding studio preview

Although this template does not ship any studio schemas, it contains the bits needed to add live-preview to for any document schema.

To add Studio preview to a document schema:

### Add a defaultDocumentNode resolver

1. `deskTool.defaultDocumentNode` allow us to configure views for schemas. Create ./sanity/structure.ts and paste:

```ts
// ./sanity/structure.ts
import { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/desk'

import { IFramePreviewView } from './components/IFramePreviewView'

// Example on how to add views for a schemaType
// https://www.sanity.io/docs/create-custom-document-views-with-structure-builder
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, ctx) => {
  const schemaType = ctx.schema.get(ctx.schemaType)

  // add preview based on schema tname
  if (schemaType.name === 'testDoc') {
    return S.document().views([
      S.view.form().title('Content'),
      S.view.component(IFramePreviewView).title('Preview'),
    ])
  }

  // or add preview based on some custom property
  if (schemaType.options?.preview) {
    return S.document().views([
      S.view.form().title('Content'),
      S.view.component(IFramePreviewView).title('Preview'),
    ])
  }

  return S.document()
}

export const structure: StructureResolver = (S, context) => {
  return S.list()
    .title('Content')
    .items([...S.documentTypeListItems()])
}
```

2 . Add this function to `deskTool` configuration in `sanity.config.ts`, and import from `./sanity/structure`:

```ts
//sanity.config.ts
import { defaultDocumentNode, structure } from './sanity/structure'

export default defineConfig({
  //..other config
  plugins: [deskTool({defaultDocumentNode, structure}),
})
```

3. Add a field named `slug` with type `slug` to your document schema
4. Add a `[slug].tsx` route to `/pages` that resolves and renders the data.
5. (Check out the slug route in [personal-website-template](https://github.com/sanity-io/template-nextjs-personal-website/tree/main/pages/%5Bslug%5D.tsx) for an example of what that might look like)

## Next steps

Make changes to preview configuration as needed.
The following files all work together:

- `sanity/components/IFramePreviewView.tsx`
- `sanity/lib/previewSecret.ts`
- `pages/api/preview.ts`
- `pages/api/exit-preview.ts`
- Preview logic in any `/pages` routes
