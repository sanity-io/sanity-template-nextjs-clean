import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
    // Read the notification config from sanity-template.json at startup so the
    // NotificationBanner client component can access it via process.env.
    SANITY_TEMPLATE_NOTIFICATION: (() => {
      try {
        const raw = readFileSync(resolve(process.cwd(), '..', 'sanity-template.json'), 'utf-8')
        const notification = JSON.parse(raw)?.notification
        return notification ? JSON.stringify(notification) : ''
      } catch {
        return ''
      }
    })(),
  },
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/**')],
  },
}

export default nextConfig
