import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {Suspense} from 'react'

import PageBuilderPage from '@/app/components/PageBuilder'
import {PageOnboarding} from '@/app/components/Onboarding'
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
  type DynamicFetchOptions,
} from '@/sanity/lib/live'
import {getPageQuery, pagesSlugs} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'

type Params = {slug: string}
type Props = {params: Promise<Params>}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetchStaticParams({query: pagesSlugs})
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const [params, {perspective}] = await Promise.all([props.params, getDynamicFetchOptions()])
  const {data: page} = await sanityFetchMetadata({query: getPageQuery, params, perspective})

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function Page({params}: Props) {
  const {isEnabled: isDraftMode} = await draftMode()
  if (isDraftMode) {
    return (
      <Suspense fallback={<PageFallback />}>
        <DynamicPage params={params} />
      </Suspense>
    )
  }
  const {slug} = await params
  return <CachedPage slug={slug} perspective="published" stega={false} />
}

async function DynamicPage({params}: Props) {
  const [{slug}, {perspective, stega}] = await Promise.all([params, getDynamicFetchOptions()])
  return <CachedPage slug={slug} perspective={perspective} stega={stega} />
}

async function CachedPage({slug, perspective, stega}: Params & DynamicFetchOptions) {
  'use cache'
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug},
    perspective,
    stega,
  })

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    )
  }

  return (
    <div className="my-12 lg:my-24">
      <div className="">
        <div className="container">
          <div className="pb-6 border-b border-gray-100">
            <div className="max-w-3xl">
              <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl">{page.heading}</h1>
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                {page.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PageBuilderPage page={page as GetPageQueryResult} />
    </div>
  )
}

function PageFallback() {
  return (
    <div className="my-12 lg:my-24" aria-busy>
      <div className="container">
        <div className="pb-6 border-b border-gray-100">
          <div className="max-w-3xl">
            <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl">Loading…</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
