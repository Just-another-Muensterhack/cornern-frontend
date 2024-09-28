import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="og:title" property="og:title" content="corndex"/>
          <meta name="description" content="corndex"/>
          <meta property="og:description" content="corndex"/>
          <link rel="icon" href="/favicon.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="white"/>
          <meta property="og:site_name" content="corndex"/>
          <meta property="og:type" content="website"/>
          <meta property="og:locale" content="de_DE"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
