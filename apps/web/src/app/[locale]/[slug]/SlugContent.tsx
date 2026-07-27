import { LegalPageView } from "@/app/components/LegalPageView";
import { sanityFetch } from "@/sanity/live";
import { LEGAL_PAGE_QUERY } from "@/sanity/queries";
import { notFound } from "next/navigation";

export async function SlugContent({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  //"use cache";

  const { data: page } = await sanityFetch({
    query: LEGAL_PAGE_QUERY,
    params: { slug, language: locale },
  });

  if (!page) notFound();

  switch (page._type) {
    case "legalPage":
      return <LegalPageView page={page} />;
    default:
      notFound();
  }
}
