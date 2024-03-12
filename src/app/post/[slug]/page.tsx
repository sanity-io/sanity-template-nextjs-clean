import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import type { SharedPageProps } from '~/app/layout'
import Container from '~/components/Container'
import { sanityFetch } from '~/lib/sanity.fetch'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}


export async function generateStaticParams() {
  return sanityFetch({
    query: postSlugsQuery,
    perspective: 'published',
    stega: false
  })
}

export default async function PostSlugRoute(
  {params}: {params: any}
) {
  const post = await sanityFetch({ query: postBySlugQuery, params, stega: false})

  if (!post?._id) {
    return notFound()
  }

  return (
    <Container>
      <section className="post">
        {post.mainImage ? (
          <Image
            className="post__cover"
            src={urlForImage(post.mainImage).url()}
            height={231}
            width={367}
            alt=""
          />
        ) : (
          <div className="post__cover--none" />
        )}
        <div className="post__container">
          <h1 className="post__title">{post.title}</h1>
          <p className="post__excerpt">{post.excerpt}</p>
          <p className="post__date">{formatDate(post._createdAt)}</p>
          <div className="post__content">
            <PortableText value={post.body} />
          </div>
        </div>
      </section>
    </Container>
  )
}
