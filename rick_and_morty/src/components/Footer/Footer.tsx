import classes from "./Footer.module.scss";

import { SlSocialGithub, SlSocialVkontakte } from "react-icons/sl";
import { PiTelegramLogoLight } from "react-icons/pi";
import Link from "next/link";
import { Position, Tooltip } from "@components/Tooltip";

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
          <Tooltip key={link.name} position={Position.top} text={link.name}>
            <Link title={link.name} href={link.href} className={classes.link}>
              {<link.icon />}
            </Link>
          </Tooltip>
        ))}
      </div>
    </footer>
  );
};
