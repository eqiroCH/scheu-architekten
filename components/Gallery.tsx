'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from '@/components/Reveal';
import type { Media } from '@/lib/projects';

export default function Gallery({ items, title }: { items: Media[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, go]);

  if (items.length === 0) return null;
  const current = open !== null ? items[open] : null;

  return (
    <>
      <div className="grid grid-cols-12 gap-x-6 gap-y-16 md:gap-x-8">
        {items.map((m, i) => {
          const landscape = m.width > m.height;
          // Wechselnde Spannweiten erzeugen Rhythmus
          const span =
            items.length === 1 || (landscape && items.length % 2 === 1 && i === 0)
              ? 'md:col-span-12'
              : 'md:col-span-6';
          return (
            <figure key={m.src} className={`col-span-12 ${span}`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full text-left"
                data-cursor="Öffnen"
                aria-label={`${m.caption} vergrössern`}
              >
                <Reveal variant="clip" delay={(i % 2) * 120} className="relative overflow-hidden bg-[#f6f6f6]">
                  <div style={{ aspectRatio: `${m.width} / ${m.height}` }} className="relative max-h-[88vh] w-full">
                    <Image
                      src={m.src}
                      alt={`${title}, ${m.caption}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain mix-blend-multiply transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                </Reveal>
              </button>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3">
                <span className="text-[15px]">{m.caption}</span>
                <span className="eyebrow text-stone">Abb. {String(i + 1).padStart(2, '0')}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {current && open !== null && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-ink text-paper animate-fade"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-5 md:px-10">
            <span className="eyebrow text-stone">
              {String(open + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={close} className="text-[15px] flex items-center gap-3" autoFocus>
              Schliessen
              <span className="relative block h-4 w-4" aria-hidden>
                <span className="absolute top-1/2 left-0 h-px w-4 bg-current rotate-45" />
                <span className="absolute top-1/2 left-0 h-px w-4 bg-current -rotate-45" />
              </span>
            </button>
          </div>

          <div className="relative flex-1 mx-5 md:mx-24" onClick={close}>
            <Image
              key={current.src}
              src={current.src}
              alt={`${title}, ${current.caption}`}
              fill
              sizes="100vw"
              className="object-contain animate-fade"
            />
          </div>

          <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-10">
            <button type="button" onClick={() => go(-1)} className="text-[15px] group flex items-center gap-2" aria-label="Vorheriges Bild">
              <span className="transition-transform group-hover:-translate-x-1">←</span> Zurück
            </button>
            <p className="text-[15px] text-center">{current.caption}</p>
            <button type="button" onClick={() => go(1)} className="text-[15px] group flex items-center gap-2" aria-label="Nächstes Bild">
              Weiter <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
