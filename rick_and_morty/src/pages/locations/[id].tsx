import { API_ENDPOINTS } from "@/config/api";
import { Character } from "@/types/character";
import { getArrayOfCharacters, getSingleCharacter } from "@/utils/getCharacters";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import classes from "@styles/pages/locationAndEpisodePage.module.scss";
import { MotionContainer } from "@components/MotionContainer";
import { Location } from "@/types/location";
import { getSingleLocation } from "@/utils/getLocations";

import { Carousel } from "@components/Carousel";
import { CharacterCard } from "@components/CharacterCard";
import { Position, Tooltip } from "@components/Tooltip";

type Props = {
  location: Location;
  residents: Character[] | null;
};

export default function LocationPage({ location, residents }: Props) {
  return (
    <>
      <Head>
        <title>{`Rick-and-Morty | ${location.name}`}</title>
        <meta name="description" content={`Rick-and-Morty location: ${location.name}`} />
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
                  alt={location.name}
                  src={`/images/locations/${location.id}.webp`}
                  fill
                  sizes="(max-width: 600px) 60vw, 30vw"
                />
              </div>
            </MotionContainer>
            <MotionContainer>
              <div className={classes.info__text}>
                <h1 className={classes.h1}>{location.name}</h1>
                <div>
                  <span className={classes.category}>Type: </span>
                  <span className={classes.value}>{location.type}</span>
                </div>
                <div>
                  <span className={classes.category}>Dimension: </span>
                  <span className={classes.value}>{location.dimension}</span>
                </div>
              </div>
            </MotionContainer>
          </div>
          <MotionContainer>
            <div className={classes.carousel}>
              <h2 className={classes.h2}>
                <Tooltip
                  position={Position.top}
                  text={"Characters who have been last seen in the location"}
                >
                  All Residents:
                </Tooltip>
              </h2>
              {residents && (
                <Carousel swiperSlideClass={classes["swiper-slide"]}>
                  {residents.map((resident) => (
                    <CharacterCard key={resident.id} character={resident} />
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
  const location: Location | null = await getSingleLocation(
    `${API_ENDPOINTS.LOCATIONS}/${query.id}`,
  );

  if (!location?.id) {
    return {
      notFound: true,
    };
  }

  if (!location) {
    return {
      notFound: true,
    };
  }

  const residentIds: string[] = [];

  for (const url of location.residents) {
    const id = url.split("/").at(-1) ?? "";
    if (id !== "") {
      residentIds.push(id);
    }
  }

  let residents: Character[] | null = [];

  if (residentIds.length === 1) {
    const resident: Character | null = await getSingleCharacter(
      `${API_ENDPOINTS.CHARACTERS}/${residentIds}`,
    );

    if (resident) {
      residents.push(resident);
    }
  } else if (residentIds.length > 1) {
    residents = await getArrayOfCharacters(`${API_ENDPOINTS.CHARACTERS}/${residentIds}`);
  }

  return {
    props: {
      location,
      residents,
    },
  };
};
