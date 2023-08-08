import Image from "next/image";
import classes from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Image
          className={classes.logo__img}
          src="/images/logo.png"
          alt="logo"
          priority
          fill
          sizes="(min-width: 500px) 50vw, 20vw"
        />
      </div>
      {/* <div className={classes.logo2}>
        <Image
          className={classes.logo__img}
          src="/images/logo2.png"
          alt="logo2"
          priority
          fill
          sizes="(min-width: 500px) 30vw, 20vw"
        />
      </div> */}
    </header>
  );
};
