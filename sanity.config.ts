/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
// see https://www.sanity.io/docs/api-versioning for how versioning works
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    // Start writing your schema here
    types: [],
  },
  plugins: [
    deskTool(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
