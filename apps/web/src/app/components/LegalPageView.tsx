import { PortableText } from "next-sanity";
import { LEGAL_PAGE_QUERY_RESULT } from "../../../sanity.types";

type LegalPage = Extract<
  NonNullable<LEGAL_PAGE_QUERY_RESULT>,
  { _type: "legalPage" }
>;

export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        {page.title}
      </h1>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        {page.body && <PortableText value={page.body} />}
      </div>
    </main>
  );
}
