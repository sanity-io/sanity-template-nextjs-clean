'use client'

import {useState} from 'react'
import {Tweet} from 'react-tweet'

type TweetGridProps = {
  tweetIds: string[]
  initialCount?: number
}

export default function TweetGrid({tweetIds, initialCount = 3}: TweetGridProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {tweetIds.map((id, index) => (
          <div
            key={id}
            className={`break-inside-avoid mb-4 [&>div]:m-0! ${
              index >= initialCount && !expanded ? 'hidden md:block' : ''
            }`}
          >
            <Tweet id={id} />
          </div>
        ))}
      </div>

      {tweetIds.length > initialCount && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="md:hidden w-full mt-4 py-3 text-brand font-mono text-sm border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white"
        >
          {expanded
            ? 'Show less'
            : `Show ${tweetIds.length - initialCount} more tweets`}
        </button>
      )}
    </>
  )
}
