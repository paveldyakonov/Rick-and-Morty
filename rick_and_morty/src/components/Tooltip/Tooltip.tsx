import Image from "next/image";
import classes from "./Tooltip.module.scss";

export enum Position {
  "top" = "top",
  "bottom" = "bottom",
  "right" = "right",
  "left" = "left",
}

type Props = {
  children: React.ReactNode;
  position: Position;
  text: string;
};

export const Tooltip: React.FC<Props> = ({ children, position, text }) => {
  return (
    <div className={classes["tooltip-trigger"]}>
      {children}
      <div className={`${classes.tooltip} ${classes[`tooltip-${position}`]}`}>
        <div className={classes.tooltip__content}>
          {text}
          <div className={classes.tooltip__img}>
            <Image src={"/images/logo3.png"} alt="tooltip-logo" fill sizes="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};
