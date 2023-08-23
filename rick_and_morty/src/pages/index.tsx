import Head from "next/head";
import classes from "@styles/pages/index.module.scss";
import { CategoryCard } from "@components/CategoryCard";
import Link from "next/link";
import React from "react";
import { motion, Variants } from "framer-motion";

type Category = {
  title: string;
  image: string;
  href: string;
};

const cardVariants: Variants = {
  offscreen: {
    y: 300,
    opacity: 0,
    rotate: -10,
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

const categories: Category[] = [
  {
    title: "All Characters",
    image: "/images/categories/characters.jpg",
    href: "/characters",
  },
  {
    title: "All Locations",
    image: "/images/categories/locations.jpg",
    href: "/locations",
  },
  {
    title: "All Episodes",
    image: "/images/categories/epizodes.webp",
    href: "/episodes",
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
              <motion.div
                key={category.title}
                className="card-container"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
              >
                <motion.div className="card" variants={cardVariants}>
                  <Link href={category.href}>
                    <CategoryCard title={category.title} image={category.image} />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
