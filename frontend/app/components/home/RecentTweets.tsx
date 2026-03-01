import {Tweet} from 'react-tweet'
import {stegaClean} from '@sanity/client/stega'

import {SettingsQueryResult} from '@/sanity.types'
import SectionHeading from './SectionHeading'

function getTweetId(url: string): string | null {
  const match = url.match(/\/status\/(\d+)/)
  return match ? match[1] : null
}

function getTwitterHandle(settings: SettingsQueryResult): string | null {
  const link = settings?.socialLinks?.find(
    (l) => stegaClean(l.platform) === 'twitter',
  )
  if (!link?.url) return null
  const match = link.url.match(/(?:x\.com|twitter\.com)\/(\w+)/)
  return match ? match[1] : null
}

type RecentTweetsProps = {
  settings: SettingsQueryResult
}

export default async function RecentTweets({settings}: RecentTweetsProps) {
  const handle = getTwitterHandle(settings)

  if (!handle) return null

  const sanityIds = (
    settings?.featuredTweets?.map(getTweetId).filter(Boolean) ?? []
  ) as string[]

  let workerIds: string[] = []
  const workerUrl = process.env.TWEET_WORKER_URL
  if (workerUrl) {
    try {
      const res = await fetch(`${workerUrl}/tweets`, {
        next: {revalidate: 60},
      })
      if (res.ok) {
        const data: unknown = await res.json()
        if (
          Array.isArray(data) &&
          data.every((item) => typeof item === 'string')
        ) {
          workerIds = data
        }
      }
    } catch {
      // silently fall back to empty
    }
  }

  const tweetIds = [
    ...sanityIds,
    ...workerIds.filter((id) => !sanityIds.includes(id)),
  ].slice(0, 10)

  const profileUrl = `https://x.com/${handle}`

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container">
        <SectionHeading
          eyebrow="Recent Tweets"
          heading={`@${handle}`}
          description="Thoughts, updates, and conversations on X."
        />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <svg height="16" width="16" viewBox="0 0 834.782 853.566" xmlns="http://www.w3.org/2000/svg" fill="white">
                  <path d="M496.809 361.241 807.576 0h-73.642L464.095 313.661 248.576 0H0l325.907 474.31L0 853.127h73.646l284.957-331.236 227.604 331.236h248.576L496.791 361.241zM395.941 478.489l-33.022-47.23-262.738-375.82h113.116L425.33 358.737l33.022 47.23L733.97 800.208H620.853L395.941 478.506z" />
                </svg>
              </div>
              <span className="font-mono text-base font-medium">@{handle}</span>
            </div>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand font-mono text-sm hover:underline"
            >
              Follow &rarr;
            </a>
          </div>

          {tweetIds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tweetIds.map((id) => (
                <div key={id} className="[&>div]:m-0!">
                  <Tweet id={id} />
                </div>
              ))}
            </div>
          ) : (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-200 rounded-lg p-8 text-center hover:border-gray-300 transition-colors bg-white"
            >
              <span className="text-brand font-mono text-sm">
                View posts on X &rarr;
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
