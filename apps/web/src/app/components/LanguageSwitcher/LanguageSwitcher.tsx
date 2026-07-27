"use client";
import { tv } from "@/app/lib/tv";
import { LOCALES } from "@/i18n/config";

import Link from "next/link";
import { usePathname } from "next/navigation";

const languageSwitcherStyles = tv({
  slots: {
    wrapper: "grid grid-cols-3 gap-3",
    link: "border-1 border-content-subtle cursor-pointer text-langswitch  font-mono p-2",
  },
  variants: {
    isActive: {
      true: {
        link: "border-accent text-content-muted bg-accent-tint",
      },
      false: {
        link: "text-content-label",
      },
    },
  },
});

function switchLanguage(lng: string) {
  // TODO : check if language is available
}
export function LanguageSwitcher() {
  const pathname = usePathname(); // z.B. /de/projekte/projekt-xy
  const parts = pathname.split("/"); // ['', 'de', 'projekte', 'projekt-xy']

  let isActive = false;
  const { wrapper, link } = languageSwitcherStyles({});
  return (
    <nav className={wrapper()} aria-label="Sprache wechseln">
      {LOCALES.map((locale) => {
        const href = ["", locale, ...parts.slice(2)].join("/");
        return (
          <Link className={link()} key={locale} href={href}>
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
