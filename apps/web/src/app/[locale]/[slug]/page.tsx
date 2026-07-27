import { client } from "@/sanity/client";
import { LEGAL_PAGE_PARAMS_QUERY } from "@/sanity/queries";
import { SlugContent } from "./SlugContent";

export async function generateStaticParams() {
  const pages = await client.fetch(LEGAL_PAGE_PARAMS_QUERY);
  return pages.map((p) => ({ locale: p.language!, slug: p.slug! }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <SlugContent locale={locale} slug={slug} />;
}
