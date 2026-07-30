// apps/web/src/app/[locale]/@switcher/page.tsx

import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { LOCALES } from "@/i18n/config";

export default async function SwitcherSlot({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <LanguageSwitcher
      current={locale}
      translations={LOCALES.map((language) => ({ language, slug: "" }))}
    />
  );
}
