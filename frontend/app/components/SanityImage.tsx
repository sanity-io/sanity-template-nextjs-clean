import {isImageWithAsset} from '@sanity/image-url'
import {assetId, SanityImage, type WrapperProps} from 'sanity-image'

import {dataset, projectId} from '@/sanity/lib/api'
import type {ImageValue} from '@/sanity/lib/utils'

type ImageProps = Omit<WrapperProps<'img'>, 'id' | 'hotspot' | 'crop'> & {
  value: ImageValue
}

function imageAlt(image: object): string {
  return 'alt' in image && typeof image.alt === 'string' ? image.alt : ''
}

const Image = ({value, alt, ...props}: ImageProps) => {
  if (!isImageWithAsset(value)) return null

  return (
    <SanityImage
      baseUrl={`https://cdn.sanity.io/images/${projectId}/${dataset}/`}
      {...props}
      id={assetId(value.asset)}
      alt={alt ?? imageAlt(value)}
      hotspot={value.hotspot}
      crop={value.crop}
    />
  )
}

export default Image
