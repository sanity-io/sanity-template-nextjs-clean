import './globals.css'

import {Inter, IBM_Plex_Mono, Playfair_Display} from 'next/font/google'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${playfairDisplay.variable} bg-white text-black`}>
      <body>
        {children}
      </body>
    </html>
  )
}
