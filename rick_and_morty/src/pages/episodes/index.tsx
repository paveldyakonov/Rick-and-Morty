import { API_ENDPOINTS } from "@/config/api";
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
import { MotionContainer } from "@components/MotionContainer";
import { Position, Tooltip } from "@components/Tooltip";

type Props = {
  episodes: Episodes;
  forcePage: number;
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
            <Tooltip position={Position.top} text={"Season"}>
              <IndexDropdown values={seasonValues} queryParam={"season"} />
            </Tooltip>
          </div>
          {episodes && (
            <>
              <h2 className={classes.h2}>Tap on arrow for more information</h2>
              <div className={classes.episodes}>
                {episodes.results.map((episode) => (
                  <MotionContainer key={episode.id}>
                    <EpisodeCard episode={episode} />
                  </MotionContainer>
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
