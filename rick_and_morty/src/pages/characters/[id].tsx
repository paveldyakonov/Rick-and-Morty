import { API_ENDPOINTS } from "@/config/api";
import { Character, Status } from "@/types/character";
import { getSingleCharacter } from "@/utils/getCharacters";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import classes from "@styles/pages/characterPage.module.scss";
import { MotionContainer } from "@components/MotionContainer";
import { Location } from "@/types/location";
import { getSingleLocation } from "@/utils/getLocations";
import { LocationCard } from "@components/LocationCard";
import { Episode } from "@/types/episode";
import { getArrayOfEpisodes, getSingleEpisode } from "@/utils/getEpisodes";

import { EpisodeCard } from "@components/EpisodeCard";
import { Carousel } from "@components/Carousel";

type Props = {
  character: Character;
  originLocation: Location | null;
  lastLocation: Location | null;
  episodes: Episode[] | null;
};

export default function CharacterPage({
  character,
  originLocation,
  lastLocation,
  episodes,
}: Props) {
  return (
    <>
      <Head>
        <title>{`Rick-and-Morty | ${character.name}`}</title>
        <meta name="description" content={`Rick-and-Morty info about ${character.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={classes.page}>
        <div className={classes.main}>
          <div className={classes.info}>
            <MotionContainer>
              <div className={classes.info__img}>
                <Image
                  alt={character.name}
                  src={character.image}
                  fill
                  sizes="(max-width: 600px) 60vw, 30vw"
                />
              </div>
            </MotionContainer>
            <MotionContainer>
              <div className={classes.info__text}>
                <h1 className={classes.h1}>{character.name}</h1>
                <div>
                  <span className={classes.category}>Status: </span>
                  <span
                    className={
                      classes[
                        `${
                          character.status == Status.alive
                            ? "status-alive"
                            : character.status == Status.dead
                            ? "status-dead"
                            : "status-unknown"
                        }`
                      ]
                    }
                  >
                    {character.status}
                  </span>
                </div>
                <div>
                  <span className={classes.category}>Gender: </span>
                  <span className={classes.value}>{character.gender}</span>
                </div>
                <div>
                  <span className={classes.category}>Species: </span>
                  <span className={classes.value}>{character.species}</span>
                </div>
                <div>
                  <span className={classes.category}>Type: </span>
                  <span className={classes.value}>{character.type}</span>
                </div>
              </div>
            </MotionContainer>
          </div>
          <div className={classes.locations}>
            {originLocation && (
              <MotionContainer>
                <div className={classes.origin_location}>
                  <h2 className={classes.h2}>Origin Location:</h2>
                  <LocationCard location={originLocation} />
                </div>
              </MotionContainer>
            )}
            {lastLocation && (
              <MotionContainer>
                <div className={classes.last_location}>
                  <h2 className={classes.h2}>Last Location:</h2>
                  <LocationCard location={lastLocation} />
                </div>
              </MotionContainer>
            )}
          </div>
          <MotionContainer>
            <div className={classes.carousel}>
              <h2 className={classes.h2}>All Episodes:</h2>
              {episodes && (
                <Carousel swiperSlideClass={classes["swiper-slide"]}>
                  {episodes.map((episode) => (
                    <EpisodeCard key={episode.id} episode={episode} />
                  ))}
                </Carousel>
              )}
            </div>
          </MotionContainer>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const character: Character | null = await getSingleCharacter(
    `${API_ENDPOINTS.CHARACTERS}/${query.id}`,
  );

  if (!character?.id) {
    return {
      notFound: true,
    };
  }

  if (!character) {
    return {
      notFound: true,
    };
  }

  let originLocation: Location | null = null;
  let lastLocation: Location | null = null;

  if (character.origin.url !== "") {
    originLocation = await getSingleLocation(character.origin.url);
  }
  if (character.location.url !== "") {
    lastLocation = await getSingleLocation(character.location.url);
  }

  const episodeIds: string[] = [];

  for (const url of character.episode) {
    const id = url.split("/").at(-1) ?? "";
    if (id !== "") {
      episodeIds.push(id);
    }
  }

  let episodes: Episode[] | null = [];

  if (episodeIds.length === 1) {
    const episode: Episode | null = await getSingleEpisode(
      `${API_ENDPOINTS.EPISODES}/${episodeIds}`,
    );
    if (episode) {
      episodes.push(episode);
    }
  } else if (episodeIds.length > 1) {
    episodes = await getArrayOfEpisodes(`${API_ENDPOINTS.EPISODES}/${episodeIds}`);
  }

  return {
    props: {
      character,
      originLocation,
      lastLocation,
      episodes,
    },
  };
};
