import { SanityLive } from "@/sanity/live";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import "./../globals.css";

import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <LanguageSwitcher />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
