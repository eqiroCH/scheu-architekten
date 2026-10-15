'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, type PointerEvent } from 'react';
import { allPlans } from '@/lib/projects';

/** Planschrank: Blätter mit Plankopf, horizontal blätterbar (Ziehen, Pfeile, Tastatur, Wischen). */
export default function PlanCabinet() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !scroller.current) return;
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft, moved: false };
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !scroller.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    scroller.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    setTimeout(() => (drag.current = null), 0);
  };

  return (
    <section className="relative bg-ink text-paper py-24 md:py-36" aria-labelledby="planschrank">
      <div className="px-5 md:px-10 grid grid-cols-12 gap-4 mb-12 md:mb-16">
        <h2 id="planschrank" className="eyebrow col-span-12 md:col-span-3 text-paper/65">
          Planschrank
        </h2>
        <p className="col-span-12 md:col-span-9 display text-[11vw] md:text-[6vw] text-balance">Gedacht in Grundriss und Schnitt.</p>
        <div className="col-span-12 md:col-span-9 md:col-start-4 mt-4 flex flex-wrap items-center justify-between gap-6">
          <p className="eyebrow flex items-center gap-5 text-paper/80">
            <span className="flex items-center gap-2">
              <span className="block h-[3px] w-6 bg-paper" aria-hidden /> Bestand
            </span>
            <span className="flex items-center gap-2">
              <span className="block h-[3px] w-6 bg-[#e8584b]" aria-hidden /> Neu
            </span>
            <span className="hidden sm:inline normal-case tracking-normal text-[13px] text-paper/60">
              Die Farbkonvention der Umbaupläne
            </span>
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} className="h-11 w-11 rounded-full border border-white/25 transition-colors hover:bg-paper hover:text-ink" aria-label="Vorherige Pläne">
              ←
            </button>
            <button type="button" onClick={() => step(1)} className="h-11 w-11 rounded-full border border-white/25 transition-colors hover:bg-paper hover:text-ink" aria-label="Weitere Pläne">
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={(e) => {
          if (drag.current?.moved) e.preventDefault();
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 md:cursor-grab md:gap-8 md:scroll-px-10 md:px-10 active:md:cursor-grabbing"
        role="region"
        aria-label="Pläne, horizontal scrollbar"
        tabIndex={0}
      >
        {allPlans.map((plan, i) => (
          <Link
            key={plan.src}
            href={`/projekte/${plan.project.slug}`}
            draggable={false}
            className="group shrink-0 snap-start border border-white/15 transition-colors hover:border-white/40"
          >
            <div className="relative h-[52vh] md:h-[58vh] p-6 md:p-10" style={{ aspectRatio: `${plan.width} / ${plan.height}` }}>
              <div className="relative h-full w-full">
                <Image
                  src={plan.src}
                  alt={`${plan.project.short}, ${plan.caption}`}
                  fill
                  draggable={false}
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="plan-light object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
                />
              </div>
            </div>
            {/* Plankopf */}
            <dl className="grid grid-cols-[1fr_auto] border-t border-white/15 text-[13px]">
              <dt className="sr-only">Projekt</dt>
              <dd className="border-r border-white/15 px-4 py-3 font-medium">{plan.project.short}</dd>
              <dt className="sr-only">Blatt</dt>
              <dd className="eyebrow px-4 py-3 text-paper/65 tabular-nums">Blatt {String(i + 1).padStart(2, '0')}</dd>
              <dt className="sr-only">Inhalt</dt>
              <dd className="border-r border-t border-white/15 px-4 py-3 text-paper/80">{plan.caption}</dd>
              <dt className="sr-only">Zeitraum</dt>
              <dd className="eyebrow border-t border-white/15 px-4 py-3 text-paper/65">{plan.project.years}</dd>
            </dl>
          </Link>
        ))}
      </div>
    </section>
  );
}
