import Link from 'next/link';
import ZurichClock from '@/components/ZurichClock';
import { contact } from '@/lib/projects';

export default function Footer() {
  return (
    <footer id="kontakt" className="relative overflow-hidden bg-ink text-paper" aria-labelledby="kontakt-titel">
      <div className="px-5 pt-24 md:px-10 md:pt-36">
        <div className="grid grid-cols-12 gap-4">
          <h2 id="kontakt-titel" className="eyebrow col-span-12 md:col-span-3 text-paper/65">
            Kontakt
          </h2>
          <div className="col-span-12 md:col-span-9">
            <p className="serif text-[9vw] md:text-[5.2vw] leading-[0.98]">Ein Ort, eine Aufgabe, ein Gespräch.</p>
            <a
              href={`mailto:${contact.email}`}
              className="group mt-10 md:mt-14 inline-flex items-center gap-4 display text-[7vw] md:text-[3.6vw] leading-none"
            >
              <span className="link-line pb-1">{contact.email}</span>
              <span aria-hidden className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-12 gap-x-4 gap-y-10 border-t border-white/15 pt-8 text-[15px] leading-relaxed">
          <address className="not-italic md:col-span-3 md:col-start-4">
            <h3 className="eyebrow mb-3 text-paper/65">Büro</h3>
            {contact.company}
            <br />
            <a href={contact.maps} target="_blank" rel="noopener noreferrer" className="link-line">
              {contact.street}, {contact.city}
              <span className="sr-only"> (Karte in neuem Tab)</span>
            </a>
          </address>
          <div className="md:col-span-3">
            <h3 className="eyebrow mb-3 text-paper/65">Telefon</h3>
            <a href={contact.phoneHref} className="link-line">
              {contact.phone}
            </a>
            <h3 className="eyebrow mt-6 mb-1 text-paper/65">Ortszeit Zürich</h3>
            <ZurichClock />
          </div>
          <nav className="col-span-2 md:col-span-3 flex flex-col items-start" aria-label="Fussnavigation">
            <h3 className="eyebrow mb-3 text-paper/65">Index</h3>
            <Link href="/#projekte" className="link-line">Projekte</Link>
            <Link href="/#werkverzeichnis" className="link-line">Werkverzeichnis</Link>
            <Link href="/buero" className="link-line">Büro</Link>
            <Link href="/buero#stellen" className="link-line">Stellen</Link>
            <Link href="/impressum" className="link-line">Impressum</Link>
          </nav>
        </div>
      </div>

      <div className="mt-16 md:mt-24 flex items-end justify-between px-5 md:px-10 eyebrow text-paper/65">
        <span>© {new Date().getFullYear()} {contact.company}</span>
        <span>Zürich, Schweiz</span>
      </div>

      {/* Wortmarke, exakt auf Satzbreite, nur unten angeschnitten */}
      <p aria-hidden className="display select-none whitespace-nowrap px-5 md:px-10 mt-6 text-[calc((100vw_-_2.5rem)/7.1)] md:text-[calc((100vw_-_5rem)/7.1)] leading-[0.8] translate-y-[14%] text-paper">
        Scheu Architekten
      </p>
    </footer>
  );
}
