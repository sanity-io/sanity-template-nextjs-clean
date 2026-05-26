import {sanityFetch, type DynamicFetchOptions} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'

export async function fetchSettings({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const {data} = await sanityFetch({query: settingsQuery, perspective, stega})
  return data
}
