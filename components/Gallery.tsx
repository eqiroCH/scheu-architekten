'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import Reveal from '@/components/Reveal';
import type { Media } from '@/lib/projects';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Gallery({ items, title }: { items: Media[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const lastOpened = useRef(0);

  const show = (i: number) => {
    setZoom(null);
    setOpen(i);
  };

  // Erst öffnen, wenn der Inhalt gerendert ist – dann greift autoFocus
  useEffect(() => {
    const d = dialogRef.current;
    if (open === null) return;
    lastOpened.current = open;
    if (d && !d.open) {
      d.showModal();
      d.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }
  }, [open]);
  const close = useCallback(() => dialogRef.current?.close(), []);
  const go = useCallback(
    (dir: 1 | -1) => {
      setZoom(null);
      setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length));
    },
    [items.length],
  );

  // Native <dialog>: Fokusfalle und Escape sind eingebaut; beim Schliessen Fokus zurückgeben
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => {
      setOpen(null);
      triggers.current[lastOpened.current]?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    d.addEventListener('close', onClose);
    d.addEventListener('keydown', onKey);
    return () => {
      d.removeEventListener('close', onClose);
      d.removeEventListener('keydown', onKey);
    };
  }, [go]);

  if (items.length === 0) return null;
  const current = open !== null ? items[open] : null;

  const toggleZoom = (e: MouseEvent<HTMLButtonElement>) => {
    if (zoom) return setZoom(null);
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <>
      <div className="grid grid-cols-12 items-end gap-x-6 gap-y-16 md:gap-x-8">
        {items.map((m, i) => {
          const landscape = m.width > m.height;
          const isPlan = m.kind === 'plan';
          const wide = items.length === 1 || landscape;
          return (
            <figure key={m.src} className={`col-span-12 ${wide ? 'md:col-span-12' : 'md:col-span-6'}`}>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => show(i)}
                className="group block w-full text-left"
                aria-label={`${m.caption} vergrössern`}
              >
                <Reveal
                  variant="clip"
                  delay={(i % 2) * 120}
                  className={`relative w-full overflow-hidden ${isPlan ? 'border border-line' : 'bg-paper-deep'} ${
                    wide ? 'aspect-[16/10]' : 'aspect-[4/5]'
                  }`}
                >
                  <Image
                    src={m.src}
                    alt={`${title}, ${m.caption}`}
                    fill
                    sizes={wide ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                    className={`transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02] ${
                      isPlan ? 'object-contain p-[6%]' : 'object-cover'
                    }`}
                  />
                  <span className="eyebrow absolute right-3 top-3 bg-paper px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    Vergrössern
                  </span>
                </Reveal>
              </button>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-ink pt-3">
                <span className="text-[15px]">{m.caption}</span>
                <span className="eyebrow text-stone">Abb. {pad(i + 1)}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={current?.caption ?? 'Bildansicht'}
        className="m-0 h-full max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-ink/60 open:flex open:flex-col"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null || zoom) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && open !== null && (
          <>
            <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-10">
              <span className="eyebrow text-stone">
                {pad(open + 1)} / {pad(items.length)}
              </span>
              <div className="flex items-center gap-6">
                <a href={current.src} target="_blank" rel="noopener noreferrer" className="eyebrow link-line hidden sm:inline">
                  Originaldatei ↗
                </a>
                <button type="button" onClick={close} className="-m-3 flex items-center gap-3 p-3 text-[15px] font-medium" data-autofocus>
                  Schliessen
                  <span className="relative block h-4 w-4" aria-hidden>
                    <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
                    <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleZoom}
              className={`relative mx-5 flex-1 overflow-hidden md:mx-24 ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              aria-label={zoom ? 'Verkleinern' : 'Vergrössern'}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={`${title}, ${current.caption}`}
                fill
                sizes="100vw"
                quality={90}
                className="animate-fade object-contain transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
                style={zoom ? { transform: 'scale(2.4)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
              />
            </button>

            <div className="flex items-center justify-between gap-6 px-5 py-4 md:px-10">
              <button type="button" onClick={() => go(-1)} className="group -m-3 flex items-center gap-2 p-3 text-[15px] font-medium" aria-label="Vorheriges Bild">
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span className="hidden sm:inline">Zurück</span>
              </button>
              <p className="text-center text-[15px]">{current.caption}</p>
              <button type="button" onClick={() => go(1)} className="group -m-3 flex items-center gap-2 p-3 text-[15px] font-medium" aria-label="Nächstes Bild">
                <span className="hidden sm:inline">Weiter</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
