import { LegalPageView } from "@/app/components/LegalPageView";

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LegalPageView idBase="impressum" locale={locale} />;
}
