import {Image} from 'next-sanity/image'

import {urlForImage} from '@/sanity/lib/utils'
import DateComponent from '@/app/components/Date'

type Props = {
  person: {
    firstName: string | null
    lastName: string | null
    picture?: any
  }
  date?: string
  small?: boolean
}

export default function Avatar({person, date, small = false}: Props) {
  const {firstName, lastName, picture} = person

  return (
    <div className="flex items-center font-mono">
      {picture?.asset?._ref ? (
        <div className={`${small ? 'h-6 w-6 mr-2' : 'h-9 w-9 mr-4'}`}>
          <Image
            alt={picture?.alt || ''}
            className="h-full rounded-full object-cover"
            height={small ? 32 : 48}
            width={small ? 32 : 48}
            src={
              urlForImage(picture)
                ?.height(small ? 64 : 96)
                .width(small ? 64 : 96)
                .fit('crop')
                .url() as string
            }
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div className="flex flex-col">
        {firstName && lastName && (
          <div className={`font-bold ${small ? 'text-sm' : ''}`}>
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
