import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
