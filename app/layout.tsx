import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scheu Architekten",
  description: "Architekturbüro in Zürich - Beat Scheu. Wir beschäftigen uns mit Bauaufgaben unterschiedlicher Massstäbe, vom Umbau im Bestand bis zum Neubau.",
  keywords: ["Architektur", "Zürich", "Beat Scheu", "Architekturbüro", "Bauplanung"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black flex flex-col`}
      >
        <Navigation />
        <main className="flex-grow pt-24 px-8 pb-16 md:pt-28 md:px-16 md:pb-24 w-full max-w-[1800px] mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
