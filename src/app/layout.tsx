import '~/styles/global.css'

import {draftMode} from 'next/headers'
import { VisualEditing } from 'next-sanity'

export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <>
      <main>{children}</main>
      {draftMode().isEnabled && <VisualEditing />}
    </>
  )
}
