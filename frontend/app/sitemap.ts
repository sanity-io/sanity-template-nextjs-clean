import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'
import {headers} from 'next/headers'

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapData,
  })
  const headersList = await headers()
  const sitemap: MetadataRoute.Sitemap = []
  const domain: String = headersList.get('host') as string
  sitemap.push({
    url: domain as string,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: 'monthly',
  })

  if (allPostsAndPages != null && allPostsAndPages.data.length != 0) {
    let priority: number
    let changeFrequency:
      | 'monthly'
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'yearly'
      | 'never'
      | undefined
    let url: string

    for (const p of allPostsAndPages.data) {
      switch (p._type) {
        case 'page':
          priority = 0.8
          changeFrequency = 'monthly'
          url = `${domain}/${p.slug}`
          break
        case 'post':
          priority = 0.5
          changeFrequency = 'never'
          url = `${domain}/posts/${p.slug}`
          break
      }
      sitemap.push({
        lastModified: p._updatedAt || new Date(),
        priority,
        changeFrequency,
        url,
      })
    }
  }

  return sitemap
}
