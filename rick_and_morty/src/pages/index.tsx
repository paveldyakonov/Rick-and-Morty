import Head from "next/head";
import { Inter } from "next/font/google";

import classes from "@styles/pages/index.module.scss";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Rick-and-Morty</title>
        <meta
          name="description"
          content="Rick-and-Morty all characters, all locations and all epizodes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.page}>
        <div className={classes.main}>
          <h1 className={classes.h1}>
            Welcome to the Web App based on the &quot;Rick and Morty&quot;
          </h1>
          {/* <div className={classes.main__img}>
            <Image
              src="/images/mainImage.webp"
              alt="main image"
              fill
              priority
              sizes="(min-width: 500px) 50vw, 20vw"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
