"use client";

import { useEffect, useRef, useState } from "react";
import type { NAVIGATION_QUERY_RESULT } from "../../../../sanity.types";

export function useScrollSpy(navigation: NAVIGATION_QUERY_RESULT) {
  const [activePathId, setActivePathId] = useState("/");

  // Verhindert, dass der Scroll-Observer dazwischenfunkt, während das Klick-Scrollen läuft
  const isScrollingRef = useRef(false);

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
    navigation.forEach((item) => {
      const el = document.getElementById(item.anchor ?? "");
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navigation]);

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
  return { activePathId, handleScroll };
}
