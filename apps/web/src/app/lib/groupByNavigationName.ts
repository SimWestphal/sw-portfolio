import { NAVIGATION_QUERY_RESULT } from "./../../../sanity.types";
type Navigation = NonNullable<NAVIGATION_QUERY_RESULT>;
type NavigationDoc = NAVIGATION_QUERY_RESULT[number];

export function groupByNavigationName(navigation: NAVIGATION_QUERY_RESULT) {
  return navigation.reduce<Record<string, NavigationDoc>>((acc, item) => {
    if (!item.name) return acc;
    const key = item.name.toLowerCase();
    return {
      ...acc,
      [key]: { ...item },
    };
  }, {});
}
