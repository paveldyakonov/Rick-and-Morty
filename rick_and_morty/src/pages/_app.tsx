import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@components/Layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
