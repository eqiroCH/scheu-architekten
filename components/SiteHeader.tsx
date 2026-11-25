'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { contact } from '@/lib/projects';

const links = [
  { href: '/#projekte', label: 'Projekte', id: 'projekte' },
  { href: '/#werkverzeichnis', label: 'Werkverzeichnis', id: 'werkverzeichnis' },
  { href: '/buero', label: 'Büro', id: 'buero' },
  { href: '#kontakt', label: 'Kontakt', id: 'kontakt' },
];

/**
 * Über einem Bild-Kopf (`data-header="light" | "split"`) liegt die Navigation frei und weiss,
 * danach als ruhige Papierleiste, die beim Runterscrollen ausweicht.
 */
type Mode = 'solid' | 'light' | 'split';

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('solid');
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Modus + Ein-/Ausblenden
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const hero = document.querySelector<HTMLElement>('[data-header]');
      const overHero = hero ? hero.getBoundingClientRect().bottom > 72 : false;
      setMode(overHero ? ((hero!.dataset.header as Mode) ?? 'light') : 'solid');
      if (overHero || y < lastY - 4) setHidden(false);
      else if (y > 320 && y > lastY + 4) setHidden(true);
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // Aktiver Abschnitt
  useEffect(() => {
    const targets = ['projekte', 'werkverzeichnis', 'kontakt']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((a) => (a === e.target.id ? null : a));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  // Mobile Menü: Scroll sperren, Escape, Fokus
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [open]);

  const isActive = (id: string) => (id === 'buero' ? pathname === '/buero' : pathname === '/' && active === id);

  const solid = mode === 'solid';
  const shell = solid
    ? 'bg-paper/92 backdrop-blur-md text-ink border-b border-ink/10'
    : 'bg-gradient-to-b from-black/30 to-transparent md:from-transparent text-white';
  const logoTone = mode === 'split' ? 'md:text-ink' : '';
  const metaTone = mode === 'split' ? 'md:text-ink' : '';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${shell} ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className={`grid grid-cols-12 items-start gap-4 px-5 md:px-10 transition-[padding] duration-500 ${solid ? 'py-4' : 'py-5 md:py-7'}`}>
          <Link
            href="/"
            className={`col-span-6 md:col-span-3 block leading-[0.95] text-[16px] md:text-[17px] font-semibold tracking-[-0.02em] [font-variation-settings:'wdth'_92] ${logoTone}`}
            aria-label="Scheu Architekten – Startseite"
          >
            <span className="block">Scheu</span>
            <span className="block">Architekten</span>
          </Link>

          <p className={`eyebrow hidden lg:block col-span-3 pt-0.5 ${metaTone}`}>
            Architekturbüro
            <br />
            Zürich, seit 2017
          </p>

          <nav className="hidden md:flex col-span-9 lg:col-span-6 justify-end gap-8 lg:gap-10 pt-0.5" aria-label="Hauptnavigation">
            {links.map((l) => {
              const on = isActive(l.id);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={on ? (l.id === 'buero' ? 'page' : 'location') : undefined}
                  className="group relative text-[15px] font-medium tracking-[-0.005em]"
                >
                  <span className={`link-line ${on ? '!bg-[length:100%_1px]' : ''}`}>{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden col-span-6 justify-self-end -my-3 -mr-3 flex items-center gap-3 px-3 py-3 text-[15px] font-medium"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menü
            <span className="flex flex-col gap-[5px]" aria-hidden>
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-4 bg-current self-end" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menü */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        inert={!open}
        className={`fixed inset-0 z-[70] bg-ink text-paper flex flex-col px-5 py-5 transition-[clip-path] duration-700 ease-[cubic-bezier(.77,0,.18,1)] md:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <div className="flex justify-between items-start">
          <Link href="/" onClick={() => setOpen(false)} className="leading-[0.95] text-[16px] font-semibold tracking-[-0.02em]">
            Scheu
            <br />
            Architekten
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="-my-3 -mr-3 px-3 py-3 text-[15px] font-medium flex items-center gap-3">
            Schliessen
            <span className="relative block h-4 w-4" aria-hidden>
              <span className="absolute top-1/2 left-0 h-px w-4 bg-current rotate-45" />
              <span className="absolute top-1/2 left-0 h-px w-4 bg-current -rotate-45" />
            </span>
          </button>
        </div>

        <nav className="mt-auto mb-12 flex flex-col" aria-label="Mobile Navigation">
          {links.map((l, i) => (
            <Link
              key={l.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/15 py-3 display text-[12vw]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="eyebrow text-paper/70 flex flex-col gap-1">
          <span className="select-all">{contact.email}</span>
          <span>{contact.phone}</span>
        </div>
      </div>
    </>
  );
}
