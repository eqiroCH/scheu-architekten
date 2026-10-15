'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { projects } from '@/lib/projects';

const SLIDE_MS = 7000;
const slides = [projects[2], projects[1], projects[4], projects[0], projects[3]];
const pad = (n: number) => String(n).padStart(2, '0');

/*
 * Bildfeld: mobil oben (58svh), ab md rechts (52vw / 48vw).
 * Die Wortmarke liegt zweimal übereinander und wird exakt an der Bildkante geschnitten:
 * Tusche auf dem Papier, Papierweiss auf dem Bild.
 */
const imageBox = 'top-0 right-0 h-[58svh] w-full md:h-full md:w-[52vw] lg:w-[48vw]';
const imageClip =
  '[clip-path:inset(0_0_calc(100%_-_58svh)_0)] md:[clip-path:inset(0_0_0_calc(100%_-_52vw))] lg:[clip-path:inset(0_0_0_calc(100%_-_48vw))]';

function Wordmark({ tone }: { tone: 'ink' | 'paper' }) {
  const Tag = tone === 'ink' ? 'h1' : 'p';
  return (
    <div
      aria-hidden={tone === 'paper' || undefined}
      className={`pointer-events-none absolute inset-0 z-10 ${tone === 'paper' ? `text-paper ${imageClip}` : 'text-ink'}`}
    >
      <Tag className="display absolute left-5 right-5 top-[calc(58svh_-_15vw)] text-[16.4vw] md:left-10 md:right-10 md:top-auto md:bottom-10 md:text-[15vw]">
        <span className="line-mask" style={{ '--delay': '150ms' } as CSSProperties}>
          <span>Scheu</span>
        </span>{' '}
        <span className="line-mask" style={{ '--delay': '300ms' } as CSSProperties}>
          <span className="-ml-[0.03em]">Architekten</span>
        </span>
      </Tag>
    </div>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [hold, setHold] = useState(false); // Hover oder Fokus im Hero

  const go = (i: number) => {
    if (i === index) return;
    setPrev(index);
    setIndex((i + slides.length) % slides.length);
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || hold || reduced) return;
    const t = setTimeout(() => {
      setPrev(index);
      setIndex((index + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, hold]);

  const current = slides[index];
  const running = !paused && !hold;

  return (
    <section
      data-header="split"
      className="relative h-[100svh] min-h-[620px] overflow-hidden"
      aria-roledescription="Karussell"
      aria-label="Ausgewählte Projekte"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
    >
      {/* Bildfeld */}
      <Link href={`/projekte/${current.slug}`} className={`absolute block overflow-hidden bg-paper-deep ${imageBox}`} aria-label={`Projekt ${current.title} ansehen`}>
        {slides.map((p, i) => {
          const isActive = i === index;
          const isPrev = i === prev;
          const isNext = i === (index + 1) % slides.length;
          if (!isActive && !isPrev && !isNext) return null;
          return (
            <div
              key={p.slug}
              className="absolute inset-0"
              style={{
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
                opacity: isActive || isPrev ? 1 : 0,
                animation: isActive && prev !== null ? 'slide-in 1.2s var(--ease-architect) both' : undefined,
              }}
            >
              <Image
                src={p.cover.src}
                alt=""
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 52vw"
                className="object-cover"
                style={{ animation: isActive ? `slow-zoom ${SLIDE_MS + 1500}ms var(--ease-out-expo) both` : undefined }}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/35 via-transparent to-black/25" />
      </Link>

      <Wordmark tone="ink" />
      <Wordmark tone="paper" />

      {/* Leitsatz */}
      <p
        className="animate-fade serif absolute left-5 right-5 top-[calc(58svh_+_22vw)] z-10 text-[1.55rem] leading-[1.08] md:left-10 md:right-auto md:top-[24vh] md:max-w-[34vw] md:text-[2.7vw]"
        style={{ '--delay': '900ms' } as CSSProperties}
      >
        Vom Umbau im Bestand bis zum Neubau – spezifische Lösungen für jeden Ort.
      </p>

      {/* Steuerung + Legende */}
      <div className="absolute z-20 left-5 right-5 bottom-5 text-ink md:left-auto md:bottom-auto md:right-10 md:top-28 md:w-[calc(52vw_-_5rem)] lg:w-[calc(48vw_-_5rem)] md:text-white">
        <div className="flex items-end justify-between gap-6">
          <div aria-live="polite" className="min-w-0">
            <span className="eyebrow">
              {pad(index + 1)} / {pad(slides.length)}
            </span>
            <p key={current.slug} className="animate-fade mt-1 truncate text-[14px] font-medium">
              {current.short}, {current.location}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="eyebrow -m-2 flex shrink-0 items-center gap-2 p-2"
            aria-label={paused ? 'Bildwechsel starten' : 'Bildwechsel anhalten'}
          >
            {paused ? (
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden><path d="M1 0l9 5-9 5z" fill="currentColor" /></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden><path d="M1 0h3v10H1zM6 0h3v10H6z" fill="currentColor" /></svg>
            )}
            {paused ? 'Abspielen' : 'Pause'}
          </button>
        </div>
        <div className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${slides.length}, 1fr)` }}>
          {slides.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => go(i)}
              className="group py-2"
              aria-label={`Bild ${i + 1}: ${p.short}`}
              aria-current={i === index || undefined}
            >
              <span className="block h-px bg-current/30 overflow-hidden transition-[height] group-hover:h-[3px]">
                <span
                  key={i === index ? `a${index}-${running}` : p.slug}
                  className="block h-full bg-current origin-left"
                  style={{
                    transform: i < index || (i === index && !running) ? 'scaleX(1)' : 'scaleX(0)',
                    animation: i === index && running ? `progress ${SLIDE_MS}ms linear forwards` : undefined,
                  }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
