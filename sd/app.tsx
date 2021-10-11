import React, { FC } from 'react'

export default function App({ Page, pageProps }: { Page: FC, pageProps: Record<string, unknown> }) {
  return (
    <>
    <head>
        <meta name="viewport" content="width=device-width" />
        <link rel="shortcut icon" type="image/jpg" href="favicon.png"/>
        <script src="https://kit.fontawesome.com/7c727f6530.js" crossOrigin="anonymous"></script>
      </head>
    <main>
      <Page {...pageProps} />
    </main>
    </>
  )
}
