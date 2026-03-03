import {stegaClean} from '@sanity/client/stega'
import {SettingsQueryResult} from '@/sanity.types'

const socialIcons: Record<string, React.ReactNode> = {
  twitter: (
    <svg height="18" width="18" viewBox="0 0 834.782 853.566" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M496.809 361.241 807.576 0h-73.642L464.095 313.661 248.576 0H0l325.907 474.31L0 853.127h73.646l284.957-331.236 227.604 331.236h248.576L496.791 361.241zM395.941 478.489l-33.022-47.23-262.738-375.82h113.116L425.33 358.737l33.022 47.23L733.97 800.208H620.853L395.941 478.506z" />
    </svg>
  ),
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
    </svg>
  ),
  youtube: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
}

type HeroBannerProps = {
  settings: SettingsQueryResult
}

export default function HeroBanner({settings}: HeroBannerProps) {
  if (!settings) return null

  return (
    <section className="relative bg-gradient-to-b from-mint to-white">
      <div className="container">
        <div className="max-w-3xl pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32">
          {settings.heroSubheading && (
            <p className="text-brand font-mono text-sm uppercase tracking-wider mb-4">
              {settings.heroSubheading}
            </p>
          )}
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black mb-6">
            {settings.heroHeading || settings.title}
          </h1>
          {settings.heroIntro && (
            <p className="text-gray-500 text-lg sm:text-xl leading-relaxed max-w-xl mb-8">
              {settings.heroIntro}
            </p>
          )}

          {settings.socialLinks && settings.socialLinks.length > 0 && (
            <div className="flex gap-3 mb-8">
              {settings.socialLinks.map((link) => {
                const platform = stegaClean(link.platform)
                if (!platform) return null
                return (
                  <a
                    key={link._key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors"
                    aria-label={platform}
                  >
                    {socialIcons[platform]}
                  </a>
                )
              })}
            </div>
          )}

          {settings.statusLine && (
            <p className="font-mono text-sm text-gray-500">{settings.statusLine}</p>
          )}
        </div>
      </div>
    </section>
  )
}
