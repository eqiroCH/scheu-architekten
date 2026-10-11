'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Begleitender Cursor für Zeigegeräte.
 * Elemente mit `data-cursor="Label"` zeigen einen runden Badge,
 * Elemente mit `data-cursor-img="/pfad.jpg"` eine schwebende Bildvorschau.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor],[data-cursor-img]');
      setLabel(target?.dataset.cursor ?? null);
      setImg(target?.dataset.cursorImg ?? null);
    };
    const onLeave = () => {
      setLabel(null);
      setImg(null);
    };
    const tick = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block" aria-hidden>
      {/* Bildvorschau */}
      <div
        className={`absolute left-6 top-0 -translate-y-1/2 w-[260px] aspect-[4/5] overflow-hidden bg-paper-deep transition-[opacity,transform] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          img ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      {/* Label */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 flex h-24 w-24 items-center justify-center rounded-full bg-ink text-paper text-[13px] tracking-[-0.01em] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          label && !img ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        {label}
      </div>
    </div>
  );
}
