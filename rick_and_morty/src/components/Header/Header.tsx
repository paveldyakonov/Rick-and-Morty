import Image from "next/image";

import { MdNotificationsNone } from "react-icons/md";

import classes from "./Header.module.scss";
import { toast } from "react-toastify";

const Notifications = [
  "You look so nice today!",
  "Your smile is contagious!",
  "You have the best laugh!",
  "You have a great sense of humor",
  "You light up the room",
  "Hello, Rick respects you",
  "Colors seem brighter when you're around!",
  "Jokes are funnier when you tell them",
];

export const Header: React.FC = () => {
  const getRandom = (max: number): number => {
    return Math.floor(Math.random() * max);
  };

  const notify = () => {
    const text = Notifications[getRandom(Notifications.length)];

    toast(text, {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
      <button className={classes.notification} onClick={notify}>
        {<MdNotificationsNone />}
      </button>
    </header>
  );
};
