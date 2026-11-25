import Link from 'next/link';
import { werkverzeichnis } from '@/lib/projects';

/** Schlichte Liste: Jahr, Projekt, Ort, Art. Einträge mit eigener Seite sind unterstrichen. */
export default function WorkIndex() {
  return (
    <section id="werkverzeichnis" className="wrap py-20 md:py-32" aria-labelledby="wv-titel">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 md:mb-14">
        <h2 id="wv-titel" className="display text-heading">
          Werkverzeichnis
        </h2>
        <p className="text-stone">Alle Bauten, Studien und Verfahren.</p>
      </div>

      <div
        className="eyebrow hidden grid-cols-[8rem_1fr_11rem_11rem] gap-x-6 border-b border-ink pb-3 text-stone md:grid"
        aria-hidden
      >
        <span>Jahr</span>
        <span>Projekt</span>
        <span>Ort</span>
        <span>Art</span>
      </div>
      <ul className="border-t border-ink md:border-t-0">
        {werkverzeichnis.map((w) => (
          <li
            key={w.title + w.location + w.years}
            className="grid grid-cols-[6rem_1fr] gap-x-4 border-b border-line py-4 md:grid-cols-[8rem_1fr_11rem_11rem] md:gap-x-6"
          >
            <span className="tabular-nums text-stone">{w.years}</span>
            <div>
              {w.slug ? (
                <Link
                  href={`/projekte/${w.slug}`}
                  className="font-medium underline decoration-ink/30 decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {w.title}
                </Link>
              ) : (
                <span>{w.title}</span>
              )}
              {w.note && <span className="block text-small text-stone">{w.note}</span>}
              <span className="block text-small text-stone md:hidden">
                <span className="whitespace-nowrap">{w.location}</span> ·{' '}
                <span className="whitespace-nowrap">{w.kategorie}</span>
              </span>
            </div>
            <span className="hidden md:block">{w.location}</span>
            <span className="hidden text-stone md:block">{w.kategorie}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
