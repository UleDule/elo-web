import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Subsets utvidet fra bare "latin" til å inkludere "latin-ext", "cyrillic",
// "cyrillic-ext" og "vietnamese". Dette dekker alle våre lokaliserings-språk
// med korrekte glyfer:
// - cyrillic + cyrillic-ext: russisk, ukrainsk (особенно і ї є ґ)
// - vietnamese: tone-tegn (ơ ư ạ ả osv.)
// - latin-ext: polsk, tyrkisk, tsjekkisk-typer (ł ą ş ż osv.)
// Inter laster bare subsets som faktisk trengs per request (Next.js
// optimaliserer), så bundle-størrelse blir ikke bekymring.
const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ELO Rankings",
  description:
    "Create custom leaderboards for any game or competition with a fair ELO-based ranking system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
