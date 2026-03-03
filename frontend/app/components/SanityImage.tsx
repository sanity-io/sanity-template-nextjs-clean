import {SanityImage, type WrapperProps} from 'sanity-image'

import {dataset, projectId} from '@/sanity/lib/api'

// Relax hotspot/crop types to accept Sanity's generated types where fields are optional
type LooseImageProps<T extends React.ElementType = 'img'> = Omit<
  WrapperProps<T>,
  'hotspot' | 'crop'
> & {
  hotspot?: {x?: number; y?: number; width?: number; height?: number} | null
  crop?: {top?: number; bottom?: number; left?: number; right?: number} | null
}

const Image = <T extends React.ElementType = 'img'>(props: LooseImageProps<T>) => (
  <SanityImage
    baseUrl={`https://cdn.sanity.io/images/${projectId}/${dataset}/`}
    {...(props as WrapperProps<T>)}
  />
)

export default Image
