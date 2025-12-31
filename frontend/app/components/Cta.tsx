import {PortableTextBlock} from 'next-sanity'

import ResolvedLink from '@/app/components/ResolvedLink'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {stegaClean} from '@sanity/client/stega'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type CtaProps = {
  block: ExtractPageBuilderType<'callToAction'>
  index: number
  // Needed if you want to createDataAttributes to do non-text overlays in Presentation (Visual Editing)
  pageType: string
  pageId: string
}

export default function CTA({block}: CtaProps) {
  const {heading, eyebrow, body = [], button, image, theme, contentAlignment} = block

  const isDark = theme === 'dark'
  const isImageFirst = stegaClean(contentAlignment) === 'imageFirst'

  return (
    <section className={isDark ? 'relative dark dark:bg-black' : 'relative dark:bg-black'}>
      <div className="absolute inset-0 bg-size-[5px] bg-[url(/images/tile-1-black.png)] dark:bg-[url(/images/tile-1-white.png)] opacity-25" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 py-12">
          <div
            className={`${isImageFirst && image ? 'row-start-2 lg:row-start-1 lg:col-start-2' : ''} flex flex-col gap-2 `}
          >
            {eyebrow && (
              <span className="text-sm uppercase dark:text-white font-mono tracking-tight opacity-70">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl dark:text-white">{heading}</h2>
            )}
            {body && (
              <div className="lg:text-left">
                <PortableText value={body as PortableTextBlock[]} className="dark:prose-invert" />
              </div>
            )}

            {button?.buttonText && button?.link && (
              <div className="flex mt-4">
                <ResolvedLink
                  link={button?.link}
                  className="rounded-full flex gap-2 font-mono text-sm whitespace-nowrap items-center bg-black dark:bg-white hover:bg-blue focus:bg-blue py-3 px-6 text-white dark:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {button?.buttonText}
                </ResolvedLink>
              </div>
            )}
          </div>

          {image?.asset?._ref && (
            <Image
              id={image.asset._ref}
              alt="Demo image"
              width={704}
              crop={image.crop}
              mode="cover"
              className="rounded-sm"
            />
          )}
        </div>
      </div>
    </section>
  )
}
