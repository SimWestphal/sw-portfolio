import { SanityLive } from "@/sanity/live";
import "./../globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-screen antialiased">
        <Sidebar />
        <main className={`${mainStyles.wrapper}`}>{children}</main>
        {/* <LanguageSwitcher /> */}

        <SanityLive />
      </body>
    </html>
  );
}
