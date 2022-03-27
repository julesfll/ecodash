import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>EcoDash</title>
      </Head>
      <Navbar />
      <div className="w-[750px] m-auto py-6">
        <Component {...pageProps} />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default MyApp;
