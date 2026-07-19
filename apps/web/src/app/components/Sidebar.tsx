"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { IconAbout } from "./icons/IconAbout";
import { IconContact } from "./icons/IconContact";
import { IconProjects } from "./icons/IconProjects";
import { IconSkills } from "./icons/IconSkills";
import { IconStations } from "./icons/IconStations";

const sidebarStyles = tv({
  slots: {
    aside:
      "sticky w-20 items-center top-0 h-screen flex flex-col bg-stripes px-0 py-2 justify-between md:items-start md:px-12 md:py-14 transition-smooth",
    link: "w-full flex text-content-body items-center md:my-5 md:mx-0 cursor-pointer",
    linkDash: "hidden md:mr-4  md:h-[1px] transition-smooth",
    linkText: "hidden transition-smooth",
    linkIconButton: "flex mx-auto md:mx-0 p-2 md:hidden transition-smooth",
    linkIcon: "w-6 h-6 md:hidden",
  },
  variants: {
    isExpanded: {
      true: { aside: "md:w-80", linkText: "md:block" },
      false: { aside: "md:w-20" },
    },
    isActive: {
      true: {
        link: "md:text-content-primary md:font-bold",
        linkDash: "md:inline-block md:h-[2px] md:w-6 md:bg-accent",
        linkIconButton: "bg-accent-tint text-accent",
      },
      false: {
        link: "md:text-content-secondary hover:font-bold",
        linkDash: "md:inline-block md:w-4 md:bg-content-body",
        linkIconButton: "text-content-secondary",
      },
    },
  },
});

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true); // TODO expandButton
  const [activePathId, setActivePathId] = useState("/");
  const isClicking = useRef(false);
  const { aside, link, linkDash, linkText, linkIconButton, linkIcon } =
    sidebarStyles({
      isExpanded,
    });

  // Verhindert, dass der Scroll-Observer dazwischenfunkt, während das Klick-Scrollen läuft
  const isScrollingRef = useRef(false);

  const navItems = [
    { name: "Über mich", targetId: "about", icon: IconAbout },
    { name: "Projekte", targetId: "projects", icon: IconProjects },
    { name: "Skills", targetId: "skills", icon: IconSkills },
    { name: "Werdegang", targetId: "stations", icon: IconStations },
    { name: "Kontakt", targetId: "contact", icon: IconContact },
  ];

  // Beobachtet das manuelle Scrollen mit der Maus oder Touch
  useEffect(() => {
    const observerOptions = {
      root: null, // gesamtes Browserfenster
      rootMargin: "-30% 0px -50% 0px", // Reagiert, wenn die Sektion das obere Drittel des Screens erreicht
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Wenn scrollen durch klick, Maus-Event ignorieren
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActivePathId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Alle Sektionen im HTML registrieren
    navItems.forEach((item) => {
      const el = document.getElementById(item.targetId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scrollt und aktiviert das Item erst am Ende des Scrollens
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      // Sperre für den Mausrad-Observer aktivieren
      isScrollingRef.current = true;

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      const onScrollEnd = () => {
        setActivePathId(id);
        isScrollingRef.current = false; // Sperre für Observer wieder aufheben
        window.removeEventListener("scrollend", onScrollEnd);
      };

      window.addEventListener("scrollend", onScrollEnd);
    }
  };

  return (
    <aside className={aside()}>
      <h1>SW</h1>
      <nav>
        {navItems.map((item, i) => {
          const isActive = item.targetId == activePathId;
          const IconComponent = item?.icon;

          return (
            <Link
              href={`#${item.targetId}`}
              key={item.targetId}
              onClick={(e) => handleScroll(e, item.targetId)}
              className={link({
                isActive: isActive,
              })}
              aria-label={item.name}
            >
              {IconComponent ? (
                <span className={linkIconButton({ isActive: isActive })}>
                  <IconComponent className={linkIcon()} />
                </span>
              ) : null}
              <span
                className={linkDash({
                  isActive: isActive,
                })}
              ></span>
              <span className={linkText()}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <p>f</p>
    </aside>
  );
}
