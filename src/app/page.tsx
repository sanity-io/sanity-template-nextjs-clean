import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { draftMode } from 'next/headers'
import { LiveQueryProvider, useLiveQuery } from 'next-sanity/preview'

import type { SharedPageProps } from '~/app/layout'
import Card from '~/components/Card'
import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { sanityFetch } from '~/lib/sanity.fetch'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'


export default async function IndexPage() {
  const posts = await sanityFetch<Post[]>({query: postsQuery})

  return (
    <Container>
      <section>
        {posts.length ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : (
          <Welcome />
        )}
      </section>
    </Container>
  )
}
