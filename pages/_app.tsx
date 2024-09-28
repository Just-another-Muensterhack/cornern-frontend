import Head from 'next/head'
import type {AppProps} from 'next/app'
import {Inter, Space_Grotesk as SpaceGrotesk} from 'next/font/google'
import 'leaflet/dist/leaflet.css';
import Script from "next/script";
import {setup} from "@twind/core";
import twindConfig from "@/twind/config";
import "../globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

setup(twindConfig)


function MyApp({
                 Component,
                 pageProps
               }: AppProps) {
  return (
    <>
      <Head>
        <title>{"Corndex"}</title>
        <style>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-space: ${spaceGrotesk.style.fontFamily};
        }
      `}</style>
      </Head>
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
              integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
              crossOrigin=""></Script>
      <div className={"bg-background text-white"}>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
