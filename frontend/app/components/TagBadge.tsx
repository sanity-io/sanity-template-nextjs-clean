import Link from 'next/link'

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

export function getTagColor(tag: string): string {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]
}

type TagBadgeProps = {
  tag: string
  count?: number
}

export default function TagBadge({tag, count}: TagBadgeProps) {
  return (
    <Link
      href={`/posts/tag/${encodeURIComponent(tag)}`}
      className={`relative z-20 text-xs font-medium px-3 py-1 rounded-full hover:opacity-80 transition-opacity ${getTagColor(tag)}`}
    >
      {tag}
      {count !== undefined && (
        <span className="ml-1 opacity-60">({count})</span>
      )}
    </Link>
  )
}
