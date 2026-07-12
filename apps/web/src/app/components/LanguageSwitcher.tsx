"use client";
import { LOCALES } from "@/i18n/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname(); // z.B. /de/projekte/projekt-xy
  const parts = pathname.split("/"); // ['', 'de', 'projekte', 'projekt-xy']
  // TODO : check if language is available
  return (
    <nav aria-label="Sprache wechseln">
      {LOCALES.map((locale) => {
        const href = ["", locale, ...parts.slice(2)].join("/");
        return (
          <Link key={locale} href={href} className="p-4">
            -{locale.toUpperCase()}-
          </Link>
        );
      })}
    </nav>
  );
}
