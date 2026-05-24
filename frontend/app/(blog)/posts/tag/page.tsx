import type {Metadata} from 'next'

import {sanityFetch} from '@/sanity/lib/live'
import {allTagsQuery, allPostsQuery} from '@/sanity/lib/queries'
import TagBadge from '@/app/components/TagBadge'
import SectionHeading from '@/app/components/home/SectionHeading'

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse all tags across blog posts.',
}

export default async function TagsPage() {
  const [{data: tags}, {data: posts}] = await Promise.all([
    sanityFetch({query: allTagsQuery}),
    sanityFetch({query: allPostsQuery}),
  ])

  // Count posts per tag
  const tagCounts = new Map<string, number>()
  for (const post of posts) {
    if (post.tags) {
      for (const tag of post.tags) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      }
    }
  }

  // Sort tags alphabetically
  const sortedTags = [...(tags || [])].filter((t): t is string => Boolean(t)).sort((a, b) =>
    a.localeCompare(b),
  )

  return (
    <div className="mt-24 lg:mt-32">
      <div className="container py-16 sm:py-24">
        <SectionHeading
          eyebrow="Browse"
          heading="Tags"
          description="Explore posts by topic."
        />
        {sortedTags.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {sortedTags.map((tag) => (
              <TagBadge key={tag} tag={tag} count={tagCounts.get(tag) || 0} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tags found.</p>
        )}
      </div>
    </div>
  )
}
