import React from "react";
import classes from "./CategoryCard.module.scss";
import Image from "next/image";

type Props = {
  title: string;
  image: string;
};

export const CategoryCard: React.FC<Props> = ({ title, image }) => {
  return (
    <div className={classes.card}>
      <figure className={classes.card__thumbnail}>
        <Image className={classes.img} src={image} alt={image} fill sizes="100%" />
        <span className={classes.card__title}>{title}</span>
      </figure>
    </div>
  );
};
