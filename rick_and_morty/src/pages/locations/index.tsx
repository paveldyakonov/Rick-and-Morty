import { API_ENDPOINTS } from "@/config/api";
import { Locations } from "@/types/location";
import { GetServerSideProps } from "next";
import Head from "next/head";
import classes from "@styles/pages/locations.module.scss";
import { SearchInput } from "@components/SearchInput";
import { LocationCard } from "@components/LocationCard";
import { Pagination } from "@components/Pagination";
import Image from "next/image";
import { getLocations, getLocationsRouterParams } from "@/utils/getLocations";
import { MotionContainer } from "@components/MotionContainer";

type Props = {
  locations: Locations;
  forcePage: number;
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
              <h2 className={classes.h2}>Tap on arrow for more information</h2>
              <div className={classes.locations}>
                {locations.results.map((location) => (
                  <MotionContainer key={location.id}>
                    <LocationCard location={location} />
                  </MotionContainer>
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

export const getServerSideProps: GetServerSideProps<{
  locations: Locations | null;
  forcePage: number;
}> = async ({ query }) => {
  const params = getLocationsRouterParams(query);
  const locations: Locations | null = await getLocations(API_ENDPOINTS.LOCATIONS, params);

  return {
    props: {
      locations,
      forcePage: params.page - 1,
    },
  };
};
