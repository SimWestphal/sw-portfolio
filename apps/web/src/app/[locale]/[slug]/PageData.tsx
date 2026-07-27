import { LegalPage } from "@/app/[locale]/[slug]/LegalPage";
import { sanityFetch } from "@/sanity/live";
import { LEGAL_PAGE_QUERY } from "@/sanity/queries";
import { notFound } from "next/navigation";

export async function PageData({
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
      return <LegalPage page={page} />;
    default:
      notFound();
  }
}
