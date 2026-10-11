'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { projects } from '@/lib/projects';

const SLIDE_MS = 5500;
const slides = [projects[2], projects[1], projects[4], projects[0], projects[3]];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setPrev(index);
      setIndex((index + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [index]);

  const current = slides[index];

  return (
    <section className="relative min-h-[100svh] overflow-hidden" aria-label="Einleitung">
      {/* Bildfeld */}
      <Link
        href={`/projekte/${current.slug}`}
        data-cursor="Ansehen"
        className="absolute right-0 top-0 h-[56svh] w-full md:h-full md:w-[52vw] lg:w-[48vw] block overflow-hidden bg-paper-deep"
        aria-label={`Projekt ${current.title} ansehen`}
      >
        {slides.map((p, i) => {
          const isActive = i === index;
          const isPrev = i === prev;
          return (
            <div
              key={p.slug}
              className="absolute inset-0"
              style={{
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
                opacity: isActive || isPrev ? 1 : 0,
                animation: isActive && prev !== null ? 'slide-in 1.5s var(--ease-architect) both' : undefined,
              }}
            >
              <Image
                src={p.cover.src}
                alt={p.title}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 52vw"
                className="object-cover"
                style={{ animation: isActive ? `slow-zoom ${SLIDE_MS + 1500}ms var(--ease-out-expo) both` : undefined }}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/30 via-transparent to-black/10" />
      </Link>

      {/* Wortmarke – liegt über dem Bild und invertiert es */}
      <div className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 md:px-10 md:pb-10 mix-blend-difference text-white">
        <h1 className="display text-[16.4vw] md:text-[15.2vw]" aria-label="Scheu Architekten">
          <span className="line-mask" style={{ '--delay': '150ms' } as CSSProperties}>
            <span>Scheu</span>
          </span>
          <span className="line-mask" style={{ '--delay': '300ms' } as CSSProperties}>
            <span className="-ml-[0.04em]">Architekten</span>
          </span>
        </h1>
      </div>

      {/* Leitsatz */}
      <div className="absolute left-5 right-5 top-[59svh] z-10 md:left-10 md:right-auto md:top-[26vh] md:max-w-[30vw]">
        <p className="animate-fade font-serif text-[1.45rem] leading-[1.05] tracking-[-0.01em] md:text-[2.6vw]" style={{ '--delay': '900ms' } as CSSProperties}>
          Vom Umbau im <em>Bestand</em> bis zum <em>Neubau</em> –
          spezifische Lösungen für jeden Ort.
        </p>
      </div>

      {/* Bildlegende + Fortschritt */}
      <div className="absolute z-10 hidden md:block top-28 right-10 w-[calc(52vw-5rem)] lg:w-[calc(48vw-5rem)] text-white">
        <div className="flex items-end justify-between gap-6">
          <div className="eyebrow">
            <span className="opacity-60">
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <p key={current.slug} className="animate-fade mt-2 normal-case tracking-normal text-[13px] font-sans">
              {current.title}, {current.location}
            </p>
          </div>
          <span className="eyebrow opacity-60">{current.years}</span>
        </div>
        <div className="mt-4 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${slides.length}, 1fr)` }}>
          {slides.map((p, i) => (
            <span key={p.slug} className="h-px bg-white/30 overflow-hidden">
              <span
                key={i === index ? `a${index}` : p.slug}
                className="block h-full bg-white origin-left"
                style={{
                  transform: i < index ? 'scaleX(1)' : 'scaleX(0)',
                  animation: i === index ? `progress ${SLIDE_MS}ms linear forwards` : undefined,
                }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Scroll-Hinweis */}
      <div className="absolute bottom-6 left-5 z-10 eyebrow md:hidden">
        <span className="text-stone">{String(index + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}</span>{' '}
        {current.short}
      </div>
    </section>
  );
}
