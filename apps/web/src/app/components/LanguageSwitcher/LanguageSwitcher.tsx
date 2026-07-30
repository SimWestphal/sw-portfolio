// apps/web/src/components/LanguageSwitcher/LanguageSwitcher.tsx

import { tv } from "@/app/lib/tv";
import Link from "next/link";

type Translation = { language: string; slug: string };

const languageSwitcherStyles = tv({
  slots: {
    wrapper: "flex flex-none gap-3",
    link: "border-1 border-content-subtle cursor-pointer text-langswitch font-mono p-2",
  },
  variants: {
    isActive: {
      true: { link: "border-accent text-content-muted bg-accent-tint" },
      false: { link: "text-content-label" },
    },
  },
});

export function LanguageSwitcher({
  current,
  translations,
}: {
  current: string;
  translations: Translation[];
}) {
  const { wrapper, link } = languageSwitcherStyles({});

  return (
    <nav className={wrapper()} aria-label="Sprache wechseln">
      {translations.map((t) => (
        <Link
          key={t.language}
          href={`/${t.language}${t.slug ? `/${t.slug}` : ""}`}
          hrefLang={t.language}
          lang={t.language}
          className={link({ isActive: t.language === current })}
        >
          {t.language.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
