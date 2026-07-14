import { LegalPageView } from "@/app/components/LegalPageView";

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LegalPageView idBase="datenschutz" locale={locale} />;
}
