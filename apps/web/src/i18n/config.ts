export const LOCALES = ["de", "en", "es"] as const;
export const DEFAULT_LOCALE: Locale = "de";
export type Locale = (typeof LOCALES)[number];

export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}
