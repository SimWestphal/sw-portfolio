"use client";

import { useState } from "react";
import { tv } from "tailwind-variants";

import { SidebarNavigation } from "../SidebarNavigation";

const sidebarStyles = tv({
  slots: {
    aside:
      "sticky w-20 items-center top-0 h-screen flex flex-col bg-stripes px-0 py-2 justify-between md:items-start md:px-12 md:py-14 transition-smooth",
  },
  variants: {
    isExpanded: {
      true: { aside: "md:w-80" },
      false: { aside: "md:w-20" },
    },
  },
});

export function Sidebar({
  locale,
  navigation,
}: {
  locale: string;
  navigation: any;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  // TODO expandButton

  const { aside } = sidebarStyles({
    isExpanded,
  });

  return navigation.navigationItem.length > 0 ? (
    <aside className={aside()}>
      <h1>SW</h1>
      <SidebarNavigation navigation={navigation} isExpanded={isExpanded} />
      <p>f</p>
    </aside>
  ) : (
    <> </>
  );
}
