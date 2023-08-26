import Head from "next/head";

import classes from "@styles/pages/errorPage.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import Image from "next/image";

type Props = {
  statusCode?: number;
};

export default function ErrorPage({ statusCode }: Props) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      router.push("/");
    }
  }, [seconds]);

  return (
    <>
      <Head>
        <title>{statusCode ? `Error ${statusCode}` : `Error 404`}</title>
      </Head>
      <div className={classes.page}>
        <h1 className={classes.page__title}>
          {statusCode
            ? `Sorry, a ${statusCode} error occurred :(`
            : "Sorry, a 404 error occurred :("}
        </h1>
        <div className={classes.page__img}>
          <Image src="/images/not_found.png" alt="error_img" fill sizes="50vw" />
        </div>
        <div className={classes.page__to_main}>
          Return{" "}
          <Link href={"/"} replace>
            to Main
          </Link>{" "}
          via {seconds}...
        </div>
      </div>
    </>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
