'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getProject, kategorien, werkverzeichnis, type Kategorie } from '@/lib/projects';

export default function WorkIndex() {
  const [filter, setFilter] = useState<Kategorie | 'Alle'>('Alle');
  const filters = ['Alle', ...kategorien] as const;
  const count = (k: (typeof filters)[number]) =>
    k === 'Alle' ? werkverzeichnis.length : werkverzeichnis.filter((w) => w.kategorie === k).length;

  return (
    <section id="werkverzeichnis" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-40">
      <div className="grid grid-cols-12 gap-4 mb-10 md:mb-16">
        <h2 className="display col-span-12 text-[13.5vw] md:text-[9.6vw]">Werkverzeichnis</h2>
        <p className="col-span-12 md:col-span-4 mt-4 text-[17px] leading-snug text-ink/80">
          Alle Bauten, Studien und Verfahren seit der Gründung 2017. Mit Bild hinterlegte Einträge führen zum Projekt.
        </p>
        <div className="col-span-12 md:col-span-7 md:col-start-6 mt-4 flex flex-wrap gap-2 md:justify-end self-end" role="group" aria-label="Filter">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-[14px] transition-colors duration-300 ${
                  active ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'
                }`}
              >
                {f}
                <sup className="ml-1 font-mono text-[9px] opacity-60">{count(f)}</sup>
              </button>
            );
          })}
        </div>
      </div>

      <div className="eyebrow hidden md:grid grid-cols-12 gap-4 pb-3 text-stone border-b border-ink">
        <span className="col-span-1">Nr.</span>
        <span className="col-span-6">Projekt</span>
        <span className="col-span-2">Ort</span>
        <span className="col-span-2">Kategorie</span>
        <span className="col-span-1 text-right">Jahr</span>
      </div>

      <ol>
        {werkverzeichnis.map((w, i) => {
          const visible = filter === 'Alle' || filter === w.kategorie;
          const project = w.slug ? getProject(w.slug) : undefined;
          const inner = (
            <>
              <span className="col-span-2 md:col-span-1 font-mono text-[11px] text-stone pt-1.5">
                {String(werkverzeichnis.length - i).padStart(2, '0')}
              </span>
              <span className="col-span-10 md:col-span-6 text-[19px] md:text-[clamp(1.1rem,1.6vw,1.6rem)] leading-tight tracking-[-0.025em] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2">
                {w.title}
                {project && <span className="ml-2 text-accent">↗</span>}
                {w.note && <span className="block text-[13px] tracking-normal text-stone mt-1">{w.note}</span>}
              </span>
              <span className="col-span-5 col-start-3 md:col-start-auto md:col-span-2 text-[15px] text-ink/80 pt-1">{w.location}</span>
              <span className="hidden md:block md:col-span-2 text-[15px] text-stone pt-1">{w.kategorie}</span>
              <span className="col-span-5 md:col-span-1 text-right font-mono text-[12px] pt-1.5">{w.years}</span>
            </>
          );
          const rowClass =
            'group grid grid-cols-12 gap-x-4 gap-y-1 py-5 md:py-6 border-b border-line transition-colors duration-300';
          return (
            <li
              key={w.title + w.location}
              className={`transition-[opacity] duration-500 ${visible ? 'opacity-100' : 'hidden'}`}
            >
              {project ? (
                <Link href={`/projekte/${project.slug}`} className={`${rowClass} hover:bg-paper-deep/60`} data-cursor-img={project.cover.src}>
                  {inner}
                </Link>
              ) : (
                <div className={rowClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
