import {createImageUrlBuilder, isImageWithAsset, type InferImageValue} from '@sanity/image-url'
import type {SanityQueries} from '@sanity/client'
import {createDataAttribute, CreateDataAttributeProps} from 'next-sanity'

import {Link} from '@/sanity.types'
import {dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {DereferencedLink} from '@/sanity/lib/types'

const builder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export type ImageValue = InferImageValue<SanityQueries[keyof SanityQueries]>

// Create an image URL builder using the client
// Export a function that can be used to get image URLs
function urlForImage(source: ImageValue) {
  return builder.image(source)
}

function imageAlt(image: object): string {
  return 'alt' in image && typeof image.alt === 'string' ? image.alt : ''
}

export function resolveOpenGraphImage(image?: ImageValue | null, width = 1200, height = 627) {
  if (!isImageWithAsset(image)) return
  const url = urlForImage(image).width(1200).height(627).fit('crop').url()
  if (!url) return
  return {url, alt: imageAlt(image), width, height}
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | DereferencedLink | undefined) {
  if (!link) return null

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = 'href'
  }

  switch (link.linkType) {
    case 'href':
      return link.href || null
    case 'page':
      if (link?.page && typeof link.page === 'string') {
        return `/${link.page}`
      }
    case 'post':
      if (link?.post && typeof link.post === 'string') {
        return `/posts/${link.post}`
      }
    default:
      return null
  }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config)
}
