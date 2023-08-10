import Head from "next/head";
import { Inter } from "next/font/google";

import classes from "@styles/pages/index.module.scss";
import Image from "next/image";
import { CategoryCard } from "@components/CategoryCard";

const inter = Inter({ subsets: ["latin"] });

type Category = {
  title: string;
  image: string;
};

const categories: Category[] = [
  {
    title: "All Characters",
    image: "/images/categories/characters.jpg",
  },
  {
    title: "All Locations",
    image: "/images/categories/locations.jpg",
  },
  {
    title: "All Epizodes",
    image: "/images/categories/epizodes.webp",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Rick-and-Morty</title>
        <meta
          name="description"
          content="Rick-and-Morty all characters, all locations and all epizodes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.page}>
        <div className={classes.main}>
          <h1 className={classes.h1}>
            Welcome to the Web App based on the &quot;Rick and Morty&quot;
          </h1>
          <h2 className={classes.h2}>
            Here you can see everything you love so much - your favorite characters, different
            locations and episodes
          </h2>
          <div className={classes.main__categories}>
            {categories.map((category) => (
              <CategoryCard key={category.title} title={category.title} image={category.image} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}