import {format} from 'date-fns'

export default function DateComponent({dateString}: {dateString: string | undefined}) {
  if (!dateString) {
    return null
  }

  return (
    <time dateTime={dateString} className="">
      {format(new Date(dateString), 'LLLL	d, yyyy')}
    </time>
  )
}
