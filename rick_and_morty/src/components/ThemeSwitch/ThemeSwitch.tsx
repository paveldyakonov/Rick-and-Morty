import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import classes from "./ThemeSwitch.module.scss";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import React from "react";

type Props = {
  nameClass: string;
};

export const ThemeSwitch: React.FC<Props> = ({ nameClass }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className={classes.theme__btn}
    >
      <span className={classes.theme__icon}>
        {resolvedTheme === "light" ? <BsSunFill /> : <BsMoonFill />}
      </span>
      <span className={nameClass}>{resolvedTheme === "light" ? "Light Mode" : "Dark Mode"}</span>
    </div>
  );
};
