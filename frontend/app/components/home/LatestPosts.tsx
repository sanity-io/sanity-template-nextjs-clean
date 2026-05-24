import Link from 'next/link'

import {AllPostsQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import TagBadge from '@/app/components/TagBadge'
import SectionHeading from './SectionHeading'
import {dataAttr} from '@/sanity/lib/utils'

function PostCard({post}: {post: AllPostsQueryResult[number]}) {
  const {_id, title, slug, excerpt, date, tags, readTime} = post

  return (
    <article
      data-sanity={dataAttr({id: _id, type: 'post', path: 'title'}).toString()}
      className="border border-gray-200 rounded-lg p-6 flex flex-col justify-start hover:border-gray-300 transition-colors relative bg-white"
    >
      <Link href={`/posts/${slug}`}>
        <span className="absolute inset-0 z-10" />
      </Link>
      <div>
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
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        {excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">{excerpt}</p>
        )}
      </div>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  )
}

type LatestPostsProps = {
  posts: AllPostsQueryResult
}

export default function LatestPosts({posts}: LatestPostsProps) {
  if (!posts || posts.length === 0) return null

  const displayPosts = posts.slice(0, 4)

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Articles and Tutorials"
          heading="Latest Posts"
          description="Thoughts on product, code, and the space in between."
          action={{label: 'View all', href: '/posts'}}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
