import type {Metadata} from 'next'
import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {postsByTagQuery, allTagsQuery} from '@/sanity/lib/queries'
import {AllPostsQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import TagBadge from '@/app/components/TagBadge'
import SectionHeading from '@/app/components/home/SectionHeading'
import {dataAttr} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{tag: string}>
}

export async function generateStaticParams() {
  const {data: tags} = await sanityFetch({
    query: allTagsQuery,
    perspective: 'published',
    stega: false,
  })
  return (tags || []).filter(Boolean).map((tag) => ({tag}))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const {tag} = await props.params
  const decodedTag = decodeURIComponent(tag)
  return {
    title: `Posts tagged "${decodedTag}"`,
    description: `All posts tagged with "${decodedTag}".`,
  }
}

function PostCard({post}: {post: AllPostsQueryResult[number]}) {
  const {_id, title, slug, excerpt, date, tags, readTime} = post

  return (
    <article
      data-sanity={dataAttr({id: _id, type: 'post', path: 'title'}).toString()}
      className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors relative bg-white"
    >
      <Link href={`/posts/${slug}`}>
        <span className="absolute inset-0 z-10" />
      </Link>
      <div className="flex items-center gap-2 mb-3">
        <time className="text-gray-400 text-xs font-mono" dateTime={date}>
          <DateComponent dateString={date} />
        </time>
        {(readTime ?? 0) > 0 && (
          <>
            <span className="text-gray-300">&bull;</span>
            <span className="text-gray-400 text-xs font-mono">{readTime} min read</span>
          </>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {excerpt && (
        <p className="text-sm leading-relaxed text-gray-500">{excerpt}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
        </div>
      )}
    </article>
  )
}

export default async function TagDetailPage(props: Props) {
  const {tag} = await props.params
  const decodedTag = decodeURIComponent(tag)
  const {data: posts} = await sanityFetch({
    query: postsByTagQuery,
    params: {tag: decodedTag} as Record<string, string>,
  })

  return (
    <div className="mt-24 lg:mt-32">
      <div className="container py-16 sm:py-24">
        <Link
          href="/posts"
          className="inline-flex items-center gap-1.5 text-sm font-mono text-gray-500 hover:text-black transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
          </svg>
          Back to Posts
        </Link>

        <SectionHeading
          eyebrow="Tag"
          heading={`Posts tagged: ${decodedTag}`}
          description={`${posts.length} post${posts.length === 1 ? '' : 's'} found.`}
        />
        {posts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts found with this tag.</p>
        )}
      </div>
    </div>
  )
}
