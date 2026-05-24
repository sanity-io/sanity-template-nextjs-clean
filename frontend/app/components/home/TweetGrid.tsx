'use client'

import {Children, useState} from 'react'

type TweetGridProps = {
  children: React.ReactNode
  totalCount: number
  initialCount?: number
}

export default function TweetGrid({children, totalCount, initialCount = 3}: TweetGridProps) {
  const [expanded, setExpanded] = useState(false)
  const items = Children.toArray(children)

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {items.map((child, index) => (
          <div
            key={index}
            className={
              index >= initialCount && !expanded ? 'hidden md:block' : ''
            }
          >
            {child}
          </div>
        ))}
      </div>

      {totalCount > initialCount && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="md:hidden w-full mt-4 py-3 text-brand font-mono text-sm border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white"
        >
          {expanded
            ? 'Show less'
            : `Show ${totalCount - initialCount} more tweets`}
        </button>
      )}
    </>
  )
}
