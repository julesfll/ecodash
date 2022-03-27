import "../styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="w-[750px] m-auto py-6">
        <Component {...pageProps} />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default MyApp;
