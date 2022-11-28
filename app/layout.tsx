import 'tailwindcss/tailwind.css'

import { IBM_Plex_Mono, Inter, PT_Serif } from '@next/font/google'

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable}`}
    >
      <head />
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
