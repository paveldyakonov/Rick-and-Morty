import Head from "next/head";

import { GetServerSideProps } from "next";

import classes from "@styles/pages/characters.module.scss";
import { Characters } from "@/types/character";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import { CharacterCard } from "@components/CharacterCard";
import { filterValues, genderValues } from "@/config/filter";
import Image from "next/image";

import { motion, Variants } from "framer-motion";
import { Pagination } from "@components/Pagination";
import { SearchInput } from "@components/SearchInput";
import { ParsedUrlQuery } from "querystring";
import { IndexDropdown } from "@components/IndexDropdown";

type Props = {
  characters: Characters;
  forcePage: number;
};

type queryParams = {
  page: number;
  name: string;
  status: string;
  gender: string;
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

const getRouterParams = (query: ParsedUrlQuery): queryParams => {
  let forcePage: string | string[] = query.page || "1";
  let characterName: string | string[] = query.name || "";
  let status: string | string[] = query.status || "0";
  let gender: string | string[] = query.gender || "0";

  if (typeof forcePage !== "string") {
    forcePage = forcePage[0];
  }
  if (typeof characterName !== "string") {
    characterName = characterName[0];
  }
  if (typeof status !== "string") {
    status = status[0];
  }
  if (typeof gender !== "string") {
    gender = gender[0];
  }

  if (parseInt(status) >= filterValues.length) {
    status = "0";
  }
  if (parseInt(gender) >= genderValues.length) {
    gender = "0";
  }

  const params: queryParams = {
    page: parseInt(forcePage),
    name: characterName,
    status: status === "0" ? "" : filterValues[parseInt(status)],
    gender: gender === "0" ? "" : genderValues[parseInt(gender)],
  };

  return params;
};

export const getServerSideProps: GetServerSideProps<{
  characters: Characters | null;
  forcePage: number;
}> = async ({ query }) => {
  let characters: Characters | null = null;
  const params: queryParams = getRouterParams(query);

  try {
    const result = await axios<Characters>({
      method: "GET",
      url: API_ENDPOINTS.CHARACTERS,
      params: params,
    });
    characters = result.data;
  } catch (error: any) {
    console.log(error);
  }

  return {
    props: {
      characters,
      forcePage: params.page - 1,
    },
  };
};
