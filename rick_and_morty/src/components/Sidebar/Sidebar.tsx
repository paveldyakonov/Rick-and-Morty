import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineLocationOn,
  MdMenu,
} from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import classes from "./Sidebar.module.scss";

const sidebarItems = [
  {
    name: "Home",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    name: "Characters",
    href: "/characters",
    icon: HiOutlineUserGroup,
  },
  {
    name: "Locations",
    href: "/locations",
    icon: MdOutlineLocationOn,
  },
  {
    name: "Mails",
    href: "/mails",
    icon: FiMail,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: TiContacts,
  },
];

export const Sidebar = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebarcollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onLinkClickHandler = () => {
    setIsCollapsed(true);
  };

  useEffect(() => {
    const onClick = (e: any) => {
      if (!sidebarRef.current?.contains(e.target)) {
        setIsCollapsed(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={sidebarRef} className={classes.sidebar__wrapper}>
      <button className={classes.btn} onClick={toggleSidebarcollapse}>
        <MdMenu />
      </button>
      <aside className={`${classes.sidebar} ${isCollapsed ? classes.collapsed : ""}`}>
        <div className={classes.sidebar__top}>
          <Image
            width={80}
            height={80}
            className={classes.sidebar__logo}
            src="/images/logo2.png"
            alt="logo"
          />
          <p className={classes["sidebar__logo-name"]}>Rick and Morty</p>
        </div>
        <ul className={classes.sidebar__list}>
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className={classes.sidebar__item} key={name} onClick={onLinkClickHandler}>
                <Link
                  className={`${classes.sidebar__link} ${
                    router.pathname === href ? classes["sidebar__link--active"] : ""
                  }`}
                  href={href}
                >
                  <span className={classes.sidebar__icon}>
                    <Icon />
                  </span>
                  <span className={classes.sidebar__name}>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};
