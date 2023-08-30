import Image from "next/image";

import { MdNotificationsNone } from "react-icons/md";

import classes from "./Header.module.scss";
import { toast } from "react-toastify";
import { Position, Tooltip } from "@components/Tooltip";
import { useTheme } from "next-themes";

const Notifications = [
  "There is a theory that Rick killed his original Morty and as a result travelled to another dimension to find a new Morty who he will never let leave his side. Many fans believe this Evil Morty is the original Morty that Rick thinks he accidentally killed and Evil Morty is secretly planning his revenge on Rick.",
  "The Creators Didn’t Know Which Beth Was The Clone",
  "The theme song for Rick and Morty is a parody mix of ‘Doctor Who’ and ‘Tintin.’",
  "Rick and Morty were featured in The Simpsons couch gag for the last episode of season 26. It’s a mini story and can be seen on youtube.",
  "Rick Is Afraid Of Pirates",
  "Each one of Rick’s characteristic burps is a real burp",
  "THE SHOW WAS INSPIRED BY ROILAND’S VULGAR TAKE ON BACK TO THE FUTURE.",
  "When traveling in cars Rick never wears a seatbelt, while all the other characters do.",
  "In the Gravity Falls episode “Society of the Blind Eye” Grunkle Stan’s coffee mug with a question mark, pen, and notebook are sucked into a portal that supposedly will open a gateway to countless new worlds. You can see these items pop out of one of the portals during “Close Rick-counters of the Rick Kind.”",
  "Justin Roiland and Dan Harman sold the series and wrote the pilot in one day",
];

export const Header: React.FC = () => {
  const { resolvedTheme } = useTheme();

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
      theme: `${resolvedTheme === "light" ? "light" : "dark"}`,
    });
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Image className={classes.logo__img} src="/images/logo.png" alt="logo" fill sizes="100%" />
      </div>
      <button
        title="Some facts about rick and morty"
        className={classes.notification}
        onClick={notify}
      >
        {
          <Tooltip position={Position.bottom} text="Some facts">
            <MdNotificationsNone />
          </Tooltip>
        }
      </button>
    </header>
  );
};
