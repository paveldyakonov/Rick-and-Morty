import Image from "next/image";

import classes from "./CharacterCard.module.scss";

import { IconContext } from "react-icons";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useState } from "react";
import { Character } from "@/types/character";
import { BsArrowUpCircle } from "react-icons/bs";
import { Status } from "@/types/character";
import Link from "next/link";

type Props = {
  character: Character;
};

export const CharacterCard: React.FC<Props> = ({ character }) => {
  const [isLiked, setIsLiked] = useState(false);

  const onLikeClickHandler = () => {
    setIsLiked((isLiked) => !isLiked);
  };

  return (
    <div className={`${classes.cards} ${classes["cards--three"]}`}>
      <Image
        className={classes["img-responsive"]}
        src={character.image}
        alt={character.name}
        fill
        sizes="100%"
      />
      <span className={classes["cards--three__rect-1"]}>
        <span className={classes["shadow-1"]}></span>
        <p>{character.name}</p>
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
        <span className={classes["type"]}> - {character.species}</span>
        <p className={classes["location"]}>Last Location:</p>
        <span className={classes["location-name"]}>{character.location.name}</span>
        <p className={classes["location"]}>Origin Location:</p>
        <span className={classes["location-name"]}>{character.origin.name}</span>
      </span>
      <span className={classes["cards--three__circle2"]}></span>
      <Link href={`/characters/${character.id}`}>
        <IconContext.Provider value={{ className: `${classes.moreinfo_icon}`, size: "1.2em" }}>
          <div>
            <BsArrowUpCircle />
          </div>
        </IconContext.Provider>
      </Link>
      <span className={classes["cards--three__circle"]}></span>
      <ul className={classes["cards--three__list"]}>
        <li>
          <IconContext.Provider value={{ className: `${classes.icon}`, size: "2em" }}>
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
