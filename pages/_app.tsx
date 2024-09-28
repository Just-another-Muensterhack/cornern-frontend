import Head from 'next/head'
import type {AppProps} from 'next/app'
import 'leaflet/dist/leaflet.css';
import Script from "next/script";
import {setup} from "@twind/core";
import twindConfig from "@/twind/config";
import "../globals.css";

setup(twindConfig)

function MyApp({
                 Component,
                 pageProps
               }: AppProps) {
  return (
    <>
      <Head>
        <title>{"Corndex - Bier bei Stille, beste Promille"}</title>
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
