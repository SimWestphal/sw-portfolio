import { sanityFetch, SanityLive } from "@/sanity/live";
import "./../globals.css";

import { defineQuery } from "next-sanity";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Sidebar } from "../components/Sidebar";

const mainStyles = {
  wrapper: "flex-1 ",
};

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const NAVIGATION_QUERY = defineQuery(`*[_type == "navigation"][] {
   "name": coalesce(
      name[language == $locale][0].value,
      name[language == "de"][0].value,
      ""
    ),
    "icon": icon,
    "anchor": coalesce(
      anchor[language == $locale][0].value,
      anchor[language == "de"][0].value,
      ""
    )
  }`);

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const { data: navigation } = await sanityFetch({
    query: NAVIGATION_QUERY,
    params: { locale },
  });

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-screen antialiased">
        <Sidebar locale={locale} navigation={navigation} />
        <main className={`${mainStyles.wrapper}`}>{children}</main>
        {/* <LanguageSwitcher /> */}

        <SanityLive />
      </body>
    </html>
  );
}
