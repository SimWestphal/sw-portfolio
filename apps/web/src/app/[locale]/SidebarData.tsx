import { groupByNavigationName } from "@/app/lib/groupByNavigationName";
import { sanityFetch } from "@/sanity/live";
import { NAVIGATION_QUERY } from "@/sanity/queries";
import { Sidebar } from "../components/Sidebar/Sidebar";

export async function SidebarData({ locale }: { locale: string }) {
  // "use cache";

  const { data: navigation } = await sanityFetch({
    query: NAVIGATION_QUERY,
    params: { language: locale },
  });
  if (!navigation) return null;
  const byName = navigation ? groupByNavigationName(navigation) : null;
  return <Sidebar locale={locale} navigation={byName?.sidebar || null} />;
}
