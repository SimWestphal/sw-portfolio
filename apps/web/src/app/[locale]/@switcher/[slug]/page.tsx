// apps/web/src/app/[locale]/@switcher/[slug]/page.tsx

import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { sanityFetch } from "@/sanity/live";
import { TRANSLATIONS_QUERY } from "@/sanity/queries";

export default async function SwitcherSlot({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const { data } = await sanityFetch({
    query: TRANSLATIONS_QUERY,
    params: { slug, language: locale },
  });

  if (!data) return null;

  return (
    <LanguageSwitcher
      current={locale}
      translations={data.translations.filter(
        (t): t is { language: string; slug: string } =>
          Boolean(t?.language && t?.slug),
      )}
    />
  );
}
