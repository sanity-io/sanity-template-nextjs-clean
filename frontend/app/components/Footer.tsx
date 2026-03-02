import {PortableText, type PortableTextBlock} from 'next-sanity'

import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'

export default async function Footer() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  const footerText = settings?.footerText as PortableTextBlock[] | null
  const footerLinks = settings?.footerLinks

  return (
    <footer className="border-t border-gray-200">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8">
          <div className="text-sm text-gray-500 font-mono [&_a]:text-brand [&_a]:hover:underline">
            {footerText && footerText.length > 0 ? (
              <PortableText value={footerText} />
            ) : (
              <p>
                Built with <span className="text-brand">&hearts;</span> by Ben
              </p>
            )}
          </div>
          <nav className="flex gap-6">
            {footerLinks && footerLinks.length > 0
              ? footerLinks.map((link) => (
                  <a
                    key={link._key}
                    href={link.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-black font-mono transition-colors"
                  >
                    {link.label}
                  </a>
                ))
              : ['Twitter', 'GitHub'].map((name) => (
                  <span
                    key={name}
                    className="text-sm text-gray-500 font-mono"
                  >
                    {name}
                  </span>
                ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
