import { groupByNavigationName } from "@/app/lib/groupByNavigationName";
import { sanityFetch } from "@/sanity/live";
import { NAVIGATION_QUERY } from "@/sanity/queries";
import { Sidebar } from "../components/Sidebar/Sidebar";

export async function SidebarData({
  locale,
  switcher,
}: {
  locale: string;
  switcher: React.ReactNode;
}) {
  // "use cache";

  const { data: navigation } = await sanityFetch({
    query: NAVIGATION_QUERY,
    params: { language: locale },
  });

  if (!navigation) return null;
  const byName = groupByNavigationName(navigation);

  const sidebar = byName.sidebar;

  if (!sidebar) return null;

  return <Sidebar locale={locale} navigation={sidebar} switcher={switcher} />;
}
