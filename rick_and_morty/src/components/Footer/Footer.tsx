import classes from "./Footer.module.scss";

import { SlSocialGithub, SlSocialVkontakte } from "react-icons/sl";
import { PiTelegramLogoLight } from "react-icons/pi";
import Link from "next/link";

type Link = {
  name: string;
  icon: any;
  href: string;
};

const links: Link[] = [
  {
    name: "github",
    icon: SlSocialGithub,
    href: "https://github.com/paveldyakonov",
  },
  {
    name: "vk",
    icon: SlSocialVkontakte,
    href: "https://vk.com/id349419044",
  },
  {
    name: "tg",
    icon: PiTelegramLogoLight,
    href: "https://t.me/PavelDyak",
  },
];

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__company}>
        <h3>Rick and Morty</h3>
        <div>PavelDyak &copy; 2023</div>
      </div>
      <div className={classes.footer__links}>
        {links.map((link: Link) => (
          <Link href={link.href} key={link.name} className={classes.link}>
            {<link.icon />}
          </Link>
        ))}
      </div>
    </footer>
  );
};
