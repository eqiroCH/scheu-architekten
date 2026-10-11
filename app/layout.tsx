import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scheuarchitekten.ch"),
  title: {
    default: "Scheu Architekten — Architekturbüro in Zürich",
    template: "%s — Scheu Architekten",
  },
  description:
    "Scheu Architekten GmbH, Zürich. Gegründet 2017 von Beat Scheu. Bauaufgaben unterschiedlicher Massstäbe, vom Umbau im Bestand bis zum Neubau.",
  keywords: ["Architektur", "Zürich", "Beat Scheu", "Architekturbüro", "Umbau", "Neubau", "Sanierung", "Baudenkmal"],
  openGraph: {
    title: "Scheu Architekten",
    description: "Architekturbüro in Zürich – vom Umbau im Bestand bis zum Neubau.",
    images: ["/images/haus-am-hang.jpg"],
    locale: "de_CH",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#efece6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} grain min-h-screen flex flex-col`}
      >
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
