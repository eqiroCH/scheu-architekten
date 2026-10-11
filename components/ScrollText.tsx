'use client';

import { useEffect, useRef, useState } from 'react';

type Segment = string | { em: string };

/** Text, der sich Wort für Wort mit dem Scrollen "einschreibt". */
export default function ScrollText({ segments, className }: { segments: Segment[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  const words = segments.flatMap((s) =>
    typeof s === 'string'
      ? s.split(/\s+/).filter(Boolean).map((w) => ({ w, em: false }))
      : s.em.split(/\s+/).map((w) => ({ w, em: true })),
  );

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.25);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map(({ w, em }, i) => {
        const on = progress * words.length > i;
        return (
          <span
            key={i}
            className={`transition-[opacity,color] duration-500 ${em ? 'font-serif italic tracking-[-0.01em]' : ''} ${on && em ? 'text-accent' : ''}`}
            style={{ opacity: on ? 1 : 0.14 }}
          >
            {w}{' '}
          </span>
        );
      })}
    </p>
  );
}
