import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { baseOpenGraph, siteUrl } from "@/lib/site";
import { contact } from "@/lib/projects";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Scheu Architekten — Architekturbüro in Zürich",
    template: "%s — Scheu Architekten",
  },
  description:
    "Scheu Architekten GmbH, Zürich. Gegründet 2017 von Beat Scheu. Bauaufgaben unterschiedlicher Massstäbe, vom Umbau im Bestand bis zum Neubau.",
  keywords: ["Architektur", "Zürich", "Beat Scheu", "Architekturbüro", "Umbau", "Neubau", "Sanierung", "Baudenkmal"],
  alternates: { canonical: "/" },
  openGraph: {
    ...baseOpenGraph,
    title: "Scheu Architekten",
    description: "Architekturbüro in Zürich – vom Umbau im Bestand bis zum Neubau.",
  },
};

export const viewport: Viewport = {
  themeColor: "#efece6",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: contact.company,
  url: siteUrl,
  email: contact.email,
  telephone: contact.phone,
  foundingDate: "2017",
  founder: { "@type": "Person", name: "Beat Scheu" },
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    postalCode: "8045",
    addressLocality: "Zürich",
    addressCountry: "CH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" suppressHydrationWarning>
      <head>
        {/* Reveal-Animationen nur mit JavaScript – ohne JS ist alles sofort sichtbar */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body className={`${archivo.variable} ${newsreader.variable} min-h-screen flex flex-col`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Zum Inhalt
        </a>
        <SiteHeader />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
