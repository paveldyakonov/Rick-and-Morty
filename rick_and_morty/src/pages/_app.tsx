import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@components/Layout";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress height={6} color="#01afc8" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
