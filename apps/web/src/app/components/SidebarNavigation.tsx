"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import type { NAVIGATION_QUERY_RESULT } from "../../../sanity.types";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { iconMap } from "./icons";

type NavItem = NAVIGATION_QUERY_RESULT[number];
type HandleScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string,
) => void;

const sidebarStyles = tv({
  slots: {
    link: "w-full flex  items-center md:my-5 md:mx-0 cursor-pointer",
    linkDash: "hidden md:mr-4  md:h-[1px] transition-smooth",
    linkText: "hidden transition-smooth md:block md:text-content-body",
    linkIconButton: "flex mx-auto md:mx-0 p-2 md:hidden transition-smooth",
    linkIcon: "w-6 h-6 md:hidden",
  },
  variants: {
    isActive: {
      true: {
        linkText: "md:text-content-primary md:font-bold",
        linkDash: "md:inline-block md:h-[2px] md:w-6 md:bg-accent",
        linkIconButton: "bg-accent-tint text-accent",
      },
      false: {
        linkText: "md:text-content-secondary hover:font-bold",
        linkDash: "md:inline-block md:w-4 md:bg-content-body",
        linkIconButton: "text-content-secondary",
      },
    },
  },
});

function NavigationItem({
  item,
  isActive,
  handleScroll,
}: {
  item: NavItem;
  isActive: boolean;
  handleScroll: HandleScroll;
}) {
  const { link, linkDash, linkText, linkIconButton, linkIcon } = sidebarStyles({
    isActive,
  });
  const IconComponent =
    item.icon && item.icon in iconMap
      ? iconMap[item.icon as keyof typeof iconMap]
      : null;
  return (
    <Link
      href={`#${item.anchor}`}
      onClick={(e) => handleScroll(e, item.anchor ?? "")}
      className={link()}
      aria-label={item.name ?? undefined}
    >
      {IconComponent ? (
        <span className={linkIconButton()}>
          <IconComponent className={linkIcon()} />
        </span>
      ) : null}
      <span className={linkDash()}></span>
      <span className={linkText()}>{item.name}</span>
    </Link>
  );
}

export function SidebarNavigation({
  navigation,
  isExpanded,
}: {
  navigation: NAVIGATION_QUERY_RESULT;
  isExpanded: boolean;
}) {
  const { activePathId, handleScroll } = useScrollSpy(navigation);
  return (
    <nav>
      {navigation.map((item) => {
        const isActive = item.anchor == activePathId;
        return (
          <NavigationItem
            item={item}
            isActive={isActive}
            key={item.anchor}
            handleScroll={handleScroll}
          />
        );
      })}
    </nav>
  );
}
