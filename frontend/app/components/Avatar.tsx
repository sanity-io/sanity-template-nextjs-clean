import {isImageWithAsset} from '@sanity/image-url'

import Image from '@/app/components/SanityImage'
import DateComponent from '@/app/components/Date'
import type {AllPostsQueryResult, PostQueryResult} from '@/sanity.types'

type Person = NonNullable<
  NonNullable<PostQueryResult>['author'] | AllPostsQueryResult[number]['author']
>

type Props = {
  person: Person
  date?: string
  small?: boolean
}

export default function Avatar({person, date, small = false}: Props) {
  const {firstName, lastName, picture} = person

  return (
    <div className="flex items-center font-mono">
      {isImageWithAsset(picture) ? (
        <div className={`${small ? 'h-6 w-6 mr-2' : 'h-9 w-9 mr-4'}`}>
          <Image
            value={picture}
            alt={picture.alt || ''}
            className="h-full rounded-full"
            height={small ? 32 : 48}
            width={small ? 32 : 48}
            mode="cover"
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div className="flex flex-col">
        {firstName && lastName && (
          <div className={`${small ? 'text-sm' : ''}`}>
            {firstName} {lastName}
          </div>
        )}
        <div className={`text-gray-500 ${small ? 'text-xs' : 'text-sm'}`}>
          <DateComponent dateString={date} />
        </div>
      </div>
    </div>
  )
}
