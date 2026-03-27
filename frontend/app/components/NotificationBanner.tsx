'use client'

import {useState, useEffect, useCallback} from 'react'

function parseMarkdown(md: string): string {
  let html = md
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(
      /\[(.+?)\]\((https?:\/\/.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )

  // Sanitize: strip script tags and event handler attributes
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '')
  html = html.replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, '')

  return html
}

function getNotification(): {id: string; message: string} | null {
  try {
    const raw = process.env.SANITY_TEMPLATE_NOTIFICATION
    if (!raw) return null
    const n = JSON.parse(raw)
    if (n?.enabled && n?.id && n?.message) {
      return {id: n.id, message: n.message}
    }
    return null
  } catch {
    return null
  }
}

const notification = getNotification()

export default function NotificationBanner() {
  const storageKey = notification ? `notification-dismissed-${notification.id}` : ''

  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(() => {
    if (!notification) return false
    try {
      return !localStorage.getItem(storageKey)
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!mounted) return
    // Delay so the 0fr state is painted before we transition to 1fr
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => setShow(true))
    })
    return () => cancelAnimationFrame(timer)
  }, [mounted])

  const dismiss = useCallback(() => {
    setShow(false)
    try {
      localStorage.setItem(storageKey, '1')
    } catch {
      // localStorage unavailable
    }
  }, [storageKey])

  if (!notification || !mounted) return null

  const html = parseMarkdown(notification.message)

  return (
    <div
      role="status"
      className="grid transition-[grid-template-rows] duration-300 ease-out"
      style={{gridTemplateRows: show ? '1fr' : '0fr'}}
      onTransitionEnd={() => {
        if (!show) setMounted(false)
      }}
    >
      <div className="overflow-hidden">
        <div className="bg-blue-600 px-4 py-3 text-white">
          <div className="mx-auto text-center flex max-w-7xl items-center justify-center gap-4">
            <div
              className="text-sm [&_a]:underline [&_strong]:font-bold"
              dangerouslySetInnerHTML={{__html: html}}
            />
            <button
              onClick={dismiss}
              aria-label="Dismiss notification"
              className="shrink-0 rounded p-1 hover:bg-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
