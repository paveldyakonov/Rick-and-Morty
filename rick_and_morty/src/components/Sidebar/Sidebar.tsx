import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineLocationOn, MdMenu } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { PiTelevisionSimpleBold } from "react-icons/pi";

import classes from "./Sidebar.module.scss";
import { ThemeSwitch } from "@components/ThemeSwitch";

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
    name: "Episodes",
    href: "/episodes",
    icon: PiTelevisionSimpleBold,
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
      <button title="Sidebar menu" className={classes.btn} onClick={toggleSidebarcollapse}>
        <MdMenu />
      </button>
      <aside className={`${classes.sidebar} ${isCollapsed ? classes.collapsed : ""}`}>
        <Link
          title="Home Page"
          className={classes.sidebar__top_link}
          href={"/"}
          onClick={onLinkClickHandler}
        >
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
        </Link>
        <ul className={classes.sidebar__list}>
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li key={name} className={classes.sidebar__item} onClick={onLinkClickHandler}>
                <Link
                  title={name}
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
          <li className={classes.sidebar__item} onClick={onLinkClickHandler}>
            <ThemeSwitch nameClass={classes.sidebar__name} />
          </li>
        </ul>
      </aside>
    </div>
  );
};
