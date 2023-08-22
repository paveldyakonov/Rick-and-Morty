import Head from "next/head";

import { GetServerSideProps } from "next";

import classes from "@styles/pages/characters.module.scss";
import { Characters } from "@/types/character";
import { API_ENDPOINTS } from "@/config/api";
import { CharacterCard } from "@components/CharacterCard";
import { filterValues, genderValues } from "@/config/filter";
import Image from "next/image";

import { motion, Variants } from "framer-motion";
import { Pagination } from "@components/Pagination";
import { SearchInput } from "@components/SearchInput";
import { IndexDropdown } from "@components/IndexDropdown";
import { getCharacters, getRouterParams } from "@/utils/getCharacters";

type Props = {
  characters: Characters;
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

export default function Characters({ characters, forcePage }: Props) {
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
          <div className={classes.main__filters}>
            <SearchInput title="character" />
            <div className={classes.main__dropdowns}>
              <IndexDropdown values={filterValues} queryParam="status" />
              <IndexDropdown values={genderValues} queryParam="gender" />
            </div>
          </div>
          {characters && (
            <>
              <h2 className={classes.h2}>Tap on card for more information</h2>
              <div className={classes.characters}>
                {characters.results.map((character) => (
                  <motion.div
                    key={character.id}
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                  >
                    <motion.div className="card" variants={cardVariants}>
                      <CharacterCard character={character} />
                    </motion.div>
                  </motion.div>
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
  const params = getRouterParams(query);
  const characters: Characters | null = await getCharacters(API_ENDPOINTS.CHARACTERS, params);

  return {
    props: {
      characters,
      forcePage: params.page - 1,
    },
  };
};
