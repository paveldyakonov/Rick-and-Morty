import Head from "next/head";

import { GetServerSideProps } from "next";

import classes from "@styles/pages/characters.module.scss";
import { Character, Characters } from "@/types/character";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import { CharacterCard } from "@components/CharacterCard";

type Props = {
  characters: Characters;
};

export default function Characters({ characters }: Props) {
  if (characters === null) {
    return (
      <>
        <Head>
          <title>Rick-and-Morty | Characters</title>
          <meta name="description" content="Rick-and-Morty all characters" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className={classes.page}>
          <div className={classes.main}>
            <div>Not found</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Rick-and-Morty | Characters</title>
        <meta name="description" content="Rick-and-Morty all characters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={classes.page}>
        <div className={classes.main}>
          <h1 className={classes.h1}>All Characters</h1>
          <h2 className={classes.h2}>Your favorite characters</h2>
          <div className={classes.characters}>
            {characters.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  characters: Characters | null;
}> = async () => {
  let characters: Characters | null = null;
  try {
    const result = await axios.get<Characters>(API_ENDPOINTS.CHARACTERS);
    characters = result.data;
  } catch (error: any) {
    console.log(error);
  }

  return {
    props: {
      characters,
    },
  };
};
