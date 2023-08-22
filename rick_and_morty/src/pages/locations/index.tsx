import { API_ENDPOINTS } from "@/config/api";
import { Locations } from "@/types/location";
import axios from "axios";
import { Variants, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Head from "next/head";
import classes from "@styles/pages/locations.module.scss";
import { SearchInput } from "@components/SearchInput";
import { LocationCard } from "@components/LocationCard";
import { Pagination } from "@components/Pagination";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";

type Props = {
  locations: Locations;
  forcePage: number;
};

type queryParams = {
  page: number;
  name: string;
};

const cardVariants: Variants = {
  offscreen: {
    y: 300,
    opacity: 0,
    rotate: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export default function Locations({ locations, forcePage }: Props) {
  return (
    <>
      <Head>
        <title>Rick-and-Morty | Locations</title>
        <meta name="description" content="Rick-and-Morty all locations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={classes.page}>
        <div className={classes.main}>
          <h1 className={classes.h1}>All Locations</h1>
          <div className={classes.main__filters}>
            <SearchInput title="location" />
          </div>
          {locations && (
            <>
              <h2 className={classes.h2}>Tap on card for more information</h2>
              <div className={classes.locations}>
                {locations.results.map((location) => (
                  <motion.div
                    key={location.id}
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                  >
                    <motion.div className="card" variants={cardVariants}>
                      <LocationCard location={location} />
                      {/* <CharacterCard character={character} /> */}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <div className={classes.pagination}>
                <Pagination pageCount={locations.info.pages} forcePage={forcePage} />
              </div>
            </>
          )}
          {!locations && (
            <div className={classes.not_found}>
              <p className={classes.not_found__title}>Sorry, nothing was found :(</p>
              <div className={classes.not_found__img}>
                <Image src="/images/not_found.png" alt="not_found" fill sizes="50vw" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const getRouterParams = (query: ParsedUrlQuery): queryParams => {
  let forcePage: string | string[] = query.page || "1";
  let name: string | string[] = query.name || "";

  if (typeof forcePage !== "string") {
    forcePage = forcePage[0];
  }
  if (typeof name !== "string") {
    name = name[0];
  }

  const params: queryParams = {
    page: parseInt(forcePage),
    name: name,
  };

  return params;
};

export const getServerSideProps: GetServerSideProps<{
  locations: Locations | null;
  forcePage: number;
}> = async ({ query }) => {
  let locations: Locations | null = null;
  const params: queryParams = getRouterParams(query);

  try {
    const result = await axios<Locations>({
      method: "GET",
      url: API_ENDPOINTS.LOCATIONS,
      params: params,
    });
    locations = result.data;
  } catch (error: any) {
    console.log(error);
  }

  return {
    props: {
      locations,
      forcePage: params.page - 1,
    },
  };
};
