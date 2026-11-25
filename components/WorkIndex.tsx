'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import {
  getProject,
  isOngoing,
  kategorien,
  TIMELINE_END,
  TIMELINE_START,
  werkverzeichnis,
  type Kategorie,
  type Werk,
} from '@/lib/projects';

const slugOf = (k: Kategorie) =>
  k.toLowerCase().replace(/ & /g, '-').replace(/ä/g, 'ae').replace(/ü/g, 'ue').replace(/ö/g, 'oe');
const span = TIMELINE_END - TIMELINE_START + 1;

function Timeline({ w }: { w: Werk }) {
  const left = ((w.from - TIMELINE_START) / span) * 100;
  const width = ((w.to - w.from + 1) / span) * 100;
  const ongoing = isOngoing(w);
  return (
    <span className="relative block h-[7px] w-full" aria-hidden>
      <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
      <span
        className={`absolute top-0 h-full ${ongoing ? 'bg-accent' : 'bg-ink'}`}
        style={{ left: `${left}%`, width: `${width}%` }}
      />
    </span>
  );
}

// Filter steht in der URL (?kategorie=studie), damit gefilterte Listen teilbar sind
const URL_EVENT = 'werkverzeichnis-filter';
const subscribe = (cb: () => void) => {
  window.addEventListener('popstate', cb);
  window.addEventListener(URL_EVENT, cb);
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener(URL_EVENT, cb);
  };
};
const readParam = () => new URLSearchParams(window.location.search).get('kategorie');

export default function WorkIndex() {
  const fromUrl = useSyncExternalStore(subscribe, readParam, () => null);
  const filter: Kategorie | 'Alle' = kategorien.find((k) => slugOf(k) === fromUrl) ?? 'Alle';

  const firstWithImage = werkverzeichnis.find((w) => w.slug)!;
  const [preview, setPreview] = useState<Werk>(firstWithImage);
  const previewProject = preview.slug ? getProject(preview.slug) : undefined;

  const setFilter = (k: Kategorie | 'Alle') => {
    const url = new URL(window.location.href);
    if (k === 'Alle') url.searchParams.delete('kategorie');
    else url.searchParams.set('kategorie', slugOf(k));
    window.history.replaceState(window.history.state, '', url);
    window.dispatchEvent(new Event(URL_EVENT));
  };

  const filters = ['Alle', ...kategorien] as const;
  const count = (k: (typeof filters)[number]) =>
    k === 'Alle' ? werkverzeichnis.length : werkverzeichnis.filter((w) => w.kategorie === k).length;
  const rows = werkverzeichnis.filter((w) => filter === 'Alle' || w.kategorie === filter);

  return (
    <section id="werkverzeichnis" className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="wv-titel">
      <div className="grid grid-cols-12 gap-4 mb-10 md:mb-14">
        <h2 id="wv-titel" className="display col-span-12 text-[12vw] md:text-[9vw] hyphens-auto" lang="de">
          Werkverzeichnis
        </h2>
        <p className="col-span-12 md:col-span-4 mt-4 text-[17px] leading-snug">
          Alle Bauten, Studien und Verfahren seit der Gründung 2017. Einträge mit <span className="text-accent">↗</span> führen
          zum Projekt.
        </p>
        <div className="col-span-12 md:col-span-8 mt-4 flex flex-col gap-3 md:items-end self-end">
          <div className="flex flex-wrap gap-2 md:justify-end" role="group" aria-label="Nach Kategorie filtern">
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`min-h-11 rounded-full border px-4 text-[14px] font-medium transition-colors duration-300 ${
                    active ? 'border-ink bg-ink text-paper' : 'border-ink/25 hover:border-ink'
                  }`}
                >
                  {f} <span className="tabular-nums opacity-80">{count(f)}</span>
                </button>
              );
            })}
          </div>
          <p className="eyebrow text-stone" aria-live="polite">
            {rows.length} {rows.length === 1 ? 'Eintrag' : 'Einträge'}
            {filter !== 'Alle' && ` · ${filter}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-x-8">
        <table className="col-span-12 lg:col-span-9 w-full border-collapse text-left max-md:block">
          <caption className="sr-only">Werkverzeichnis Scheu Architekten, neueste zuerst</caption>
          <thead className="max-md:hidden">
            <tr className="eyebrow text-stone border-b border-ink">
              <th scope="col" className="w-12 py-3 font-medium">Nr.</th>
              <th scope="col" className="py-3 font-medium">Projekt</th>
              <th scope="col" className="w-40 py-3 font-medium">Ort</th>
              <th scope="col" className="w-36 py-3 font-medium">
                <span className="sr-only">Zeitleiste </span>
                <span className="flex justify-between" aria-hidden>
                  <span>{TIMELINE_START}</span>
                  <span>{TIMELINE_END}</span>
                </span>
              </th>
              <th scope="col" className="w-28 py-3 pl-4 text-right font-medium">Jahr</th>
            </tr>
          </thead>
          <tbody className="max-md:block max-md:border-t max-md:border-ink">
            {rows.map((w) => {
              const project = w.slug ? getProject(w.slug) : undefined;
              const nr = String(werkverzeichnis.length - werkverzeichnis.indexOf(w)).padStart(2, '0');
              const ongoing = isOngoing(w);
              return (
                <tr
                  key={w.title + w.location}
                  onMouseEnter={() => setPreview(w)}
                  onFocusCapture={() => setPreview(w)}
                  className={`group border-b border-line align-top transition-colors duration-300 max-md:grid max-md:grid-cols-[2.5rem_1fr_auto] max-md:gap-x-3 max-md:py-5 ${
                    project ? 'hover:bg-fichte/25' : ''
                  }`}
                >
                  <td className="eyebrow py-5 text-stone md:pt-6 max-md:row-span-3 max-md:py-0 max-md:pt-1.5">{nr}</td>
                  <td className="py-5 pr-6 max-md:col-span-2 max-md:py-0">
                    {project ? (
                      <Link href={`/projekte/${project.slug}`} className="text-[19px] md:text-[clamp(1.1rem,1.55vw,1.5rem)] font-medium leading-tight tracking-[-0.015em] hyphens-auto" lang="de">
                        <span className="link-line">{w.title}</span>
                        <span className="ml-2 text-accent" aria-hidden>↗</span>
                      </Link>
                    ) : (
                      <span className="text-[19px] md:text-[clamp(1.1rem,1.55vw,1.5rem)] leading-tight tracking-[-0.015em] hyphens-auto" lang="de">
                        {w.title}
                      </span>
                    )}
                    <span className="mt-1 block text-[14px] text-stone">
                      {w.kategorie}
                      {w.note && ` · ${w.note}`}
                    </span>
                  </td>
                  <td className="py-5 pr-4 text-[15px] md:pt-6 max-md:py-0 max-md:pt-2">{w.location}</td>
                  <td className="py-5 md:pt-[1.85rem] max-md:hidden">
                    <Timeline w={w} />
                  </td>
                  <td className="py-5 pl-4 text-right text-[14px] tabular-nums md:pt-6 max-md:py-0 max-md:pt-2">
                    {w.years}
                    {ongoing && <span className="eyebrow mt-1 block text-accent">laufend</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Vorschau – fester Platz statt Bild am Cursor */}
        <aside className="hidden lg:block lg:col-span-3" aria-hidden>
          <div className="sticky top-24">
            {previewProject ? (
              <Link href={`/projekte/${previewProject.slug}`} tabIndex={-1} className="block">
                <div className="relative overflow-hidden bg-paper-deep" style={{ aspectRatio: `${previewProject.cover.width} / ${previewProject.cover.height}` }}>
                  <Image key={previewProject.slug} src={previewProject.cover.src} alt="" fill sizes="25vw" className="object-cover animate-fade" />
                </div>
                <p className="mt-3 flex justify-between gap-4 border-t border-ink pt-2 text-[14px]">
                  <span className="font-medium">{previewProject.short}</span>
                  <span className="text-stone">{previewProject.years}</span>
                </p>
              </Link>
            ) : (
              <div className="flex aspect-[4/5] flex-col justify-end border border-line p-5">
                <p className="text-[15px] font-medium">{preview.title}</p>
                <p className="mt-1 text-[14px] text-stone">
                  {preview.location} · {preview.years}
                </p>
                <p className="eyebrow mt-6 text-stone">Ohne Projektseite</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
