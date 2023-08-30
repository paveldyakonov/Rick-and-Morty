import { API_ENDPOINTS } from "@/config/api";
import { Character } from "@/types/character";
import { getArrayOfCharacters, getSingleCharacter } from "@/utils/getCharacters";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import classes from "@styles/pages/locationAndEpisodePage.module.scss";
import { MotionContainer } from "@components/MotionContainer";

import { Carousel } from "@components/Carousel";
import { CharacterCard } from "@components/CharacterCard";
import { Episode } from "@/types/episode";
import { getSingleEpisode } from "@/utils/getEpisodes";

type Props = {
  episode: Episode;
  characters: Character[] | null;
};

export default function EpisodePage({ episode, characters }: Props) {
  return (
    <>
      <Head>
        <title>{`Rick-and-Morty | ${episode.name}`}</title>
        <meta name="description" content={`Rick-and-Morty episode: ${episode.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Dyakonov Pavel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.page}>
        <div className={classes.main}>
          <div className={classes.info}>
            <MotionContainer>
              <div className={classes.info__img}>
                <Image
                  alt={episode.name}
                  src={`/images/episodes/${episode.id}.webp`}
                  fill
                  sizes="(max-width: 600px) 60vw, 30vw"
                />
              </div>
            </MotionContainer>
            <MotionContainer>
              <div className={classes.info__text}>
                <h1 className={classes.h1}>{episode.name}</h1>
                <div>
                  <span className={classes.category}>Episode: </span>
                  <span className={classes.value}>
                    {episode.episode.replace("S", "Season ").replace("E", " Episode ")}
                  </span>
                </div>
                <div>
                  <span className={classes.category}>Air Date: </span>
                  <span className={classes.value}>{episode.air_date}</span>
                </div>
              </div>
            </MotionContainer>
          </div>
          <MotionContainer>
            <div className={classes.carousel}>
              <h2 className={classes.h2}>All Characters:</h2>
              {characters && (
                <Carousel swiperSlideClass={classes["swiper-slide"]}>
                  {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
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
  const episode: Episode | null = await getSingleEpisode(`${API_ENDPOINTS.EPISODES}/${query.id}`);

  if (!episode?.id) {
    return {
      notFound: true,
    };
  }

  if (!episode) {
    return {
      notFound: true,
    };
  }

  const characterIds: string[] = [];

  for (const url of episode.characters) {
    const id = url.split("/").at(-1) ?? "";
    if (id !== "") {
      characterIds.push(id);
    }
  }

  let characters: Character[] | null = [];

  if (characterIds.length === 1) {
    const character: Character | null = await getSingleCharacter(
      `${API_ENDPOINTS.CHARACTERS}/${characterIds}`,
    );

    if (character) {
      characters.push(character);
    }
  } else if (characterIds.length > 1) {
    characters = await getArrayOfCharacters(`${API_ENDPOINTS.CHARACTERS}/${characterIds}`);
  }

  return {
    props: {
      episode,
      characters,
    },
  };
};
