import Image from "next/image";

import classes from "./LocationCard.module.scss";

import { IconContext } from "react-icons";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import React, { useState } from "react";
import { Location } from "@/types/location";

type Props = {
  location: Location;
};

export const LocationCard: React.FC<Props> = ({ location }) => {
  const [isLiked, setIsLiked] = useState(false);

  const onLikeClickHandler = () => {
    setIsLiked((isLiked) => !isLiked);
  };

  return (
    <div className={`${classes.cards} ${classes["cards--three"]}`}>
      <Image
        className={classes["img-responsive"]}
        src={`/images/locations/${location.id}.webp`}
        alt={location.name}
        fill
        sizes="100%"
      />
      <span className={classes["cards--three__rect-1"]}>
        <span className={classes["shadow-1"]}></span>
        <p>{location.name}</p>
        <span className={classes["type"]}> - {location.type}</span>
        <p className={classes["location"]}>Dimension:</p>
        <span className={classes["location-name"]}>{location.dimension}</span>
      </span>
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