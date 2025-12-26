import {SanityImage, type WrapperProps} from 'sanity-image'

import {dataset, projectId} from '@/sanity/lib/api'

const Image = <T extends React.ElementType = 'img'>(props: WrapperProps<T>) => (
  <SanityImage baseUrl={`https://cdn.sanity.io/images/${projectId}/${dataset}/`} {...props} />
)

export default Image
