import { sanityFetch } from "@/sanity/live";
import { NAVIGATION_QUERY } from "@/sanity/queries";
import { NAVIGATION_QUERY_RESULT } from "../../../../sanity.types";
import { Sidebar } from "./Sidebar";

type Navigation = NonNullable<NAVIGATION_QUERY_RESULT>;
type NavItem = NonNullable<Navigation["navigationItem"]>[number];

export async function SidebarData({ locale }: { locale: string }) {
  // "use cache";

  const { data: navigation } = await sanityFetch({
    query: NAVIGATION_QUERY,
    params: { language: locale },
  });

  const safeNavigation = Array.isArray(navigation)
    ? navigation
    : navigation
      ? [navigation]
      : [];

  const byName = safeNavigation.reduce<Record<string, NAVIGATION_QUERY_RESULT>>(
    (acc, item) => {
      if (!item.name) return acc;
      const key = item.name.toLowerCase();
      console.log(key);
      return {
        ...acc,
        [key]: { ...item },
      };
    },
    {},
  );

  return <Sidebar locale={locale} navigation={byName?.sidebar || null} />;
}
