import Head from "next/head";

import { GetServerSideProps } from "next";

import classes from "@styles/pages/characters.module.scss";
import { Characters } from "@/types/character";
import { API_ENDPOINTS } from "@/config/api";
import { CharacterCard } from "@components/CharacterCard";
import { filterValues, genderValues } from "@/config/filter";
import Image from "next/image";

import { Pagination } from "@components/Pagination";
import { SearchInput } from "@components/SearchInput";
import { IndexDropdown } from "@components/IndexDropdown";
import { getCharacters, getCharactersRouterParams } from "@/utils/getCharacters";
import { MotionContainer } from "@components/MotionContainer";
import { Position, Tooltip } from "@components/Tooltip";

type Props = {
  characters: Characters;
  forcePage: number;
};

export default function Characters({ characters, forcePage }: Props) {
  return (
    <>
      <Head>
        <title>Rick-and-Morty | Characters</title>
        <meta name="description" content="Rick-and-Morty all characters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Dyakonov Pavel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.page}>
        <div className={classes.main}>
          <h1 className={classes.h1}>All Characters</h1>
          <div className={classes.main__filters}>
            <SearchInput title="character" />
            <div className={classes.main__dropdowns}>
              <Tooltip position={Position.top} text={"Status"}>
                <IndexDropdown values={filterValues} queryParam="status" />
              </Tooltip>
              <Tooltip position={Position.top} text={"Gender"}>
                <IndexDropdown values={genderValues} queryParam="gender" />
              </Tooltip>
            </div>
          </div>
          {characters && (
            <>
              <h2 className={classes.h2}>Tap on arrow for more information</h2>
              <div className={classes.characters}>
                {characters.results.map((character) => (
                  <MotionContainer key={character.id}>
                    <CharacterCard character={character} />
                  </MotionContainer>
                ))}
              </div>
              <div className={classes.pagination}>
                <Pagination pageCount={characters.info.pages} forcePage={forcePage} />
              </div>
            </>
          )}
          {!characters && (
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
  characters: Characters | null;
  forcePage: number;
}> = async ({ query }) => {
  const params = getCharactersRouterParams(query);
  const characters: Characters | null = await getCharacters(API_ENDPOINTS.CHARACTERS, params);

  return {
    props: {
      characters,
      forcePage: params.page - 1,
    },
  };
};
