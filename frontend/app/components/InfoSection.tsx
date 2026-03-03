import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {InfoSection} from '@/sanity.types'

type InfoProps = {
  block: InfoSection
  index: number
  // Needed if you want to createDataAttributes to do non-text overlays in Presentation (Visual Editing)
  pageId: string
  pageType: string
}

export default function CTA({block}: InfoProps) {
  const hasImage = !!block?.image?.asset?._ref

  return (
    <div className="container my-12">
      <div className={hasImage ? 'grid lg:grid-cols-2 gap-12 items-start' : 'max-w-3xl'}>
        <div>
          {block?.heading && <h2 className="text-2xl md:text-3xl lg:text-4xl">{block.heading}</h2>}
          {block?.subheading && (
            <span className="block mt-4 mb-8 text-lg uppercase font-light text-gray-900/70">
              {block.subheading}
            </span>
          )}
          <div className="mt-4">
            {block?.content?.length && (
              <PortableText className="" value={block.content as PortableTextBlock[]} />
            )}
          </div>
        </div>

        {hasImage && (
          <Image
            id={block.image!.asset!._ref}
            alt=""
            width={704}
            crop={block.image!.crop}
            mode="cover"
            className="rounded-sm"
          />
        )}
      </div>
    </div>
  )
}
