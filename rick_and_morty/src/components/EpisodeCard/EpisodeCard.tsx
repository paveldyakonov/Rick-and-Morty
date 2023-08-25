import Image from "next/image";

import classes from "./EpisodeCard.module.scss";

import { IconContext } from "react-icons";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import React, { useState } from "react";
import { Episode } from "@/types/episode";
import { BsArrowUpCircle } from "react-icons/bs";
import Link from "next/link";

type Props = {
  episode: Episode;
};

export const EpisodeCard: React.FC<Props> = ({ episode }) => {
  const [isLiked, setIsLiked] = useState(false);

  const onLikeClickHandler = () => {
    setIsLiked((isLiked) => !isLiked);
  };

  return (
    <div className={`${classes.cards} ${classes["cards--three"]}`}>
      <Image
        className={classes["img-responsive"]}
        src={`/images/episodes/${episode.id}.webp`}
        alt={episode.name}
        fill
        sizes="100%"
      />
      <span className={classes["cards--three__rect-1"]}>
        <span className={classes["shadow-1"]}></span>
        <p>{episode.name}</p>
        <span className={classes["episode"]}>
          {episode.episode.replace("S", "Season ").replace("E", " Episode ")}
        </span>
        <br />
        <span className={classes["type"]}>{episode.air_date}</span>
      </span>
      <span className={classes["cards--three__circle2"]}></span>
      <Link href={`/episodes/${episode.id}`}>
        <IconContext.Provider value={{ className: `${classes.moreinfo_icon}`, size: "1.5em" }}>
          <div>
            <BsArrowUpCircle />
          </div>
        </IconContext.Provider>
      </Link>
      <span className={classes["cards--three__circle"]}></span>
      <ul className={classes["cards--three__list"]}>
        <li>
          <IconContext.Provider value={{ className: `${classes.icon}`, size: "2.5em" }}>
            <div>
              {isLiked ? (
                <FcLike onClick={onLikeClickHandler} />
              ) : (
                <FcLikePlaceholder onClick={onLikeClickHandler} />
              )}
            </div>
          </IconContext.Provider>
        </li>
      </ul>
    </div>
  );
};
