import React, { FC } from 'react'

export default function App({ Page, pageProps }: { Page: FC, pageProps: Record<string, unknown> }) {
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />
      </head>
      <Page {...pageProps} />
    </main>
  )
}
