import {Link} from '@/sanity.types'
import {dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {createDataAttribute, CreateDataAttributeProps} from 'next-sanity'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {DereferencedLink} from '@/sanity/lib/types'

const builder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

// Create an image URL builder using the client
// Export a function that can be used to get image URLs
function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Walk portable text arrays to find the first image block with a valid asset
 * reference. Checks `content` first, then `pageBuilder` sections that may
 * contain nested portable text (richTextBlock, infoSection).
 */
export function resolveFirstContentImage(
  content?: any[] | null,
  pageBuilder?: any[] | null,
): SanityImageSource | null {
  // Helper: return the first image block from a portable text array
  function findImageInBlocks(blocks?: any[] | null): SanityImageSource | null {
    if (!Array.isArray(blocks)) return null
    for (const block of blocks) {
      if (block?._type === 'image' && block?.asset?._ref) {
        return block as SanityImageSource
      }
    }
    return null
  }

  // 1. Check top-level content (portable text body)
  const fromContent = findImageInBlocks(content)
  if (fromContent) return fromContent

  // 2. Check pageBuilder sections that may contain images or nested content
  if (Array.isArray(pageBuilder)) {
    for (const section of pageBuilder) {
      // Direct image blocks in the page builder
      if (section?._type === 'image' && section?.asset?._ref) {
        return section as SanityImageSource
      }
      // Nested content within richTextBlock / infoSection
      const nested = findImageInBlocks(section?.content)
      if (nested) return nested
    }
  }

  return null
}

export function resolveOpenGraphImage(
  image?: SanityImageSource | null,
  width = 1200,
  height = 627,
) {
  if (!image) return
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url()
  if (!url) return
  return {url, alt: (image as {alt?: string})?.alt || '', width, height}
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
