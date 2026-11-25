'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import Reveal from '@/components/Reveal';
import type { Media } from '@/lib/projects';

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
      <div className="grid items-end gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
        {items.map((m, i) => {
          const isPlan = m.kind === 'plan';
          const wide = items.length === 1 || m.width > m.height;
          return (
            <figure key={m.src} className={wide ? 'md:col-span-2' : undefined}>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => show(i)}
                className="block w-full cursor-zoom-in text-left"
                aria-label={`${m.caption} vergrössern`}
              >
                <Reveal
                  className={`relative w-full overflow-hidden ${isPlan ? 'border border-line' : 'bg-paper-deep'} ${
                    wide ? 'aspect-[16/10]' : 'aspect-[4/5]'
                  }`}
                >
                  <Image
                    src={m.src}
                    alt={`${title}, ${m.caption}`}
                    fill
                    sizes={wide ? '(max-width: 1680px) 100vw, 1600px' : '(max-width: 768px) 100vw, 800px'}
                    className={isPlan ? 'object-contain p-[6%]' : 'object-cover'}
                  />
                </Reveal>
              </button>
              <figcaption className="mt-3 text-small">{m.caption}</figcaption>
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
              <span className="text-small tabular-nums text-stone">
                {open + 1} / {items.length}
              </span>
              <button type="button" onClick={close} className="-m-3 flex items-center gap-3 p-3 font-medium" data-autofocus>
                Schliessen
                <span className="relative block h-4 w-4" aria-hidden>
                  <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
                </span>
              </button>
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
                className="object-contain transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
                style={zoom ? { transform: 'scale(2.4)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
              />
            </button>

            <div className="flex items-center justify-between gap-6 px-5 py-4 md:px-10">
              <button type="button" onClick={() => go(-1)} className="-m-3 flex items-center gap-2 p-3 font-medium" aria-label="Vorheriges Bild">
                <span aria-hidden>←</span>
                <span className="hidden sm:inline">Zurück</span>
              </button>
              <p className="text-center text-small">{current.caption}</p>
              <button type="button" onClick={() => go(1)} className="-m-3 flex items-center gap-2 p-3 font-medium" aria-label="Nächstes Bild">
                <span className="hidden sm:inline">Weiter</span>
                <span aria-hidden>→</span>
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
