import { API_ENDPOINTS } from "@/config/api";
import { Variants, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Head from "next/head";
import classes from "@styles/pages/episodes.module.scss";
import { SearchInput } from "@components/SearchInput";
import { Pagination } from "@components/Pagination";
import Image from "next/image";
import { Episodes } from "@/types/episode";
import { getEpisodes, getEpisodesRouterParams } from "@/utils/getEpisodes";
import { EpisodeCard } from "@components/EpisodeCard";
import { IndexDropdown } from "@components/IndexDropdown";
import { seasonValues } from "@/config/filter";

type Props = {
  episodes: Episodes;
  forcePage: number;
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

export default function Episodes({ episodes, forcePage }: Props) {
  return (
    <>
      <Head>
        <title>Rick-and-Morty | Episodes</title>
        <meta name="description" content="Rick-and-Morty all episodes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={classes.page}>
        <div className={classes.main}>
          <h1 className={classes.h1}>All Episodes</h1>
          <div className={classes.main__filters}>
            <SearchInput title="episode" />
            <IndexDropdown values={seasonValues} queryParam={"season"} />
          </div>
          {episodes && (
            <>
              <h2 className={classes.h2}>Tap on card for more information</h2>
              <div className={classes.episodes}>
                {episodes.results.map((episode) => (
                  <motion.div
                    key={episode.id}
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                  >
                    <motion.div className="card" variants={cardVariants}>
                      <EpisodeCard episode={episode} />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <div className={classes.pagination}>
                <Pagination pageCount={episodes.info.pages} forcePage={forcePage} />
              </div>
            </>
          )}
          {!episodes && (
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
  episodes: Episodes | null;
  forcePage: number;
}> = async ({ query }) => {
  const params = getEpisodesRouterParams(query);
  const episodes: Episodes | null = await getEpisodes(API_ENDPOINTS.EPISODES, params);

  return {
    props: {
      episodes,
      forcePage: params.page - 1,
    },
  };
};
