import Link from 'next/link';
import ZurichClock from '@/components/ZurichClock';
import { contact } from '@/lib/projects';

export default function Footer() {
  return (
    <footer id="kontakt" className="relative overflow-hidden bg-ink text-paper scroll-mt-0">
      <div className="px-5 pt-24 md:px-10 md:pt-36">
        <div className="grid grid-cols-12 gap-4">
          <p className="eyebrow col-span-12 md:col-span-3 text-stone">Kontakt</p>
          <div className="col-span-12 md:col-span-9">
            <p className="font-serif text-[9vw] md:text-[5.4vw] leading-[0.95] tracking-[-0.02em]">
              Ein Ort, eine Aufgabe, <em className="text-accent">ein Gespräch.</em>
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="group mt-10 md:mt-14 inline-flex items-center gap-4 text-[6.4vw] md:text-[3.4vw] font-medium tracking-[-0.045em] leading-none"
            >
              <span className="link-line pb-1">{contact.email}</span>
              <span aria-hidden className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-12 gap-x-4 gap-y-10 border-t border-white/15 pt-8 text-[15px]">
          <address className="not-italic md:col-span-3 md:col-start-4 leading-relaxed">
            <span className="eyebrow block text-stone mb-3">Büro</span>
            {contact.company}
            <br />
            <a href={contact.maps} target="_blank" rel="noopener noreferrer" className="link-line">
              {contact.street}
              <br />
              {contact.city}
            </a>
          </address>
          <div className="md:col-span-3 leading-relaxed">
            <span className="eyebrow block text-stone mb-3">Telefon</span>
            <a href={contact.phoneHref} className="link-line">
              {contact.phone}
            </a>
            <span className="eyebrow block text-stone mt-6 mb-1">Ortszeit Zürich</span>
            <ZurichClock />
          </div>
          <nav className="md:col-span-3 leading-relaxed flex flex-col items-start" aria-label="Fussnavigation">
            <span className="eyebrow block text-stone mb-3">Index</span>
            <Link href="/#projekte" className="link-line">Projekte</Link>
            <Link href="/#werkverzeichnis" className="link-line">Werkverzeichnis</Link>
            <Link href="/buero" className="link-line">Büro</Link>
            <Link href="/impressum" className="link-line">Impressum</Link>
          </nav>
        </div>
      </div>

      <div className="mt-16 md:mt-24 flex items-end justify-between px-5 md:px-10 eyebrow text-stone">
        <span>© {new Date().getFullYear()} {contact.company}</span>
        <span className="hidden md:inline">Zürich, Schweiz</span>
      </div>

      {/* Angeschnittene Wortmarke */}
      <p
        aria-hidden
        className="display select-none whitespace-nowrap text-[17.4vw] translate-y-[22%] -ml-[0.04em] pl-5 md:pl-10 text-paper/95 mt-4"
      >
        Scheu Architekten
      </p>
    </footer>
  );
}
