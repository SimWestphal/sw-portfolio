import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

// Eine Query für beide Rechtstexte – nur die ID unterscheidet sich.
// Fallback auf die DE-Version, falls die Übersetzung (noch) fehlt.
const LEGAL_PAGE_QUERY = defineQuery(`
  coalesce(*[_id == $id][0], *[_id == $fallbackId][0]){ title, body }
`);

export async function LegalPageView({
  idBase,
  locale,
}: {
  idBase: "impressum" | "datenschutz";
  locale: string;
}) {
  const { data } = await sanityFetch({
    query: LEGAL_PAGE_QUERY,
    params: { id: `${idBase}-${locale}`, fallbackId: `${idBase}-de` },
  });

  if (!data) notFound();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        {data.title}
      </h1>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        {data.body && <PortableText value={data.body} />}
      </div>
    </main>
  );
}
