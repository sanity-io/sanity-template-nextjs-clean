import type {Metadata, ResolvingMetadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import {Suspense} from 'react'

import Avatar from '@/app/components/Avatar'
import DateComponent from '@/app/components/Date'
import {MorePosts} from '@/app/components/Posts'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {postPagesSlugs, postQuery, adjacentPostsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

const TAG_COLORS = [
  'bg-red-100 text-red-700',
  'bg-green-100 text-green-700',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-teal-100 text-teal-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
]

function getTagColor(tag: string): string {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]
}

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: postPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: post} = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.coverImage)

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{name: `${post.author.firstName} ${post.author.lastName}`}]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function PostPage(props: Props) {
  const params = await props.params
  const [{data: post}] = await Promise.all([sanityFetch({query: postQuery, params})])

  if (!post?._id) {
    return notFound()
  }

  const {data: adjacent} = await sanityFetch({
    query: adjacentPostsQuery,
    params: {id: post._id, date: post.date, updatedAt: post.date},
  })

  return (
    <>
      <div className="container mt-24 mb-12 lg:mt-32 lg:mb-24 grid gap-12">
        <div>
          {/* Back link */}
          <Link
            href="/posts"
            className="inline-flex items-center gap-1.5 text-sm font-mono text-gray-500 hover:text-black transition-colors mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
            Back to Posts
          </Link>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-gray-900 sm:text-5xl lg:text-6xl font-bold mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mb-6">
              {post.excerpt}
            </p>
          )}

          {/* Date + read time */}
          <div className="flex items-center gap-4 text-gray-400 text-sm font-mono mb-4">
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
              </svg>
              <DateComponent dateString={post.date} />
            </span>
            {post.readTime > 0 && (
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                </svg>
                {post.readTime} min read
              </span>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider + author */}
          <div className="pb-6 mb-6 border-b border-gray-100">
            <div className="flex gap-4 items-center">
              {post.author && post.author.firstName && post.author.lastName && (
                <Avatar person={post.author} />
              )}
            </div>
          </div>

          {/* Article content */}
          <article className="gap-6 grid max-w-4xl">
            {post?.coverImage && (
              <Image
                id={post.coverImage.asset?._ref || ''}
                alt={post.coverImage.alt || ''}
                className="rounded-sm w-full"
                width={1024}
                height={538}
                mode="contain"
                hotspot={post.coverImage.hotspot}
                crop={post.coverImage.crop}
              />
            )}
            {post.content?.length && (
              <PortableText
                className="max-w-2xl prose-headings:font-medium prose-headings:tracking-tight"
                value={post.content as PortableTextBlock[]}
              />
            )}
          </article>

          {/* Prev / Next navigation */}
          {(adjacent?.prev || adjacent?.next) && (
            <nav className="border-t border-gray-100 mt-12 pt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adjacent.prev ? (
                  <Link
                    href={`/posts/${adjacent.prev.slug}`}
                    className="group border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors"
                  >
                    <span className="text-sm text-gray-400 font-mono flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 0 1-.02 1.06L8.832 10l3.938 3.71a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 0 1 1.06.02Z" clipRule="evenodd" />
                      </svg>
                      Previous
                    </span>
                    <span className="block font-bold text-gray-800 mt-1 group-hover:text-black">
                      {adjacent.prev.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {adjacent.next ? (
                  <Link
                    href={`/posts/${adjacent.next.slug}`}
                    className="group border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors text-right"
                  >
                    <span className="text-sm text-gray-400 font-mono flex items-center justify-end gap-1">
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="block font-bold text-gray-800 mt-1 group-hover:text-black">
                      {adjacent.next.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </nav>
          )}
        </div>
      </div>

      {/* More posts section */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container py-12 lg:py-24 grid gap-12">
          <aside>
            <Suspense>{await MorePosts({skip: post._id, limit: 2})}</Suspense>
          </aside>
        </div>
      </div>
    </>
  )
}
