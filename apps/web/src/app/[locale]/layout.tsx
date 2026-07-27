import { SanityLive } from "@/sanity/live";
import "./../globals.css";

import { LOCALES } from "@/i18n/config";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { SidebarData } from "./SidebarData";

const mainStyles = {
  wrapper: "flex-1 ",
};

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-screen antialiased">
        <SidebarData locale={locale} />
        <main className={`${mainStyles.wrapper}`}>{children}</main>
        <SanityLive />
      </body>
    </html>
  );
}
