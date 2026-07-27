import { client } from "@/sanity/client";
import { LEGAL_PAGE_PARAMS_QUERY } from "@/sanity/queries";
import { PageData } from "./PageData";

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
  return <PageData locale={locale} slug={slug} />;
}
