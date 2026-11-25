'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { contact } from '@/lib/site';

const links = [
  { href: '/#projekte', label: 'Projekte', match: (p: string) => p.startsWith('/projekte') },
  { href: '/buero', label: 'Büro', match: (p: string) => p === '/buero' },
  { href: '#kontakt', label: 'Kontakt', match: () => false },
];

/** Eine ruhige Papierleiste, immer gleich, auf jeder Seite. */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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

  return (
    <>
      <header className="sticky top-0 z-50 h-[var(--header)] border-b border-line bg-paper">
        <div className="wrap flex h-full items-center justify-between">
          <Link
            href="/"
            className="block text-body font-semibold leading-[0.95] tracking-[-0.02em] [font-variation-settings:'wdth'_92]"
            aria-label="Scheu Architekten – Startseite"
          >
            <span className="block">Scheu</span>
            <span className="block">Architekten</span>
          </Link>

          <nav className="hidden gap-10 md:flex" aria-label="Hauptnavigation">
            {links.map((l) => {
              const on = l.match(pathname);
              return (
                <Link key={l.href} href={l.href} aria-current={on ? 'page' : undefined} className="link-line font-medium">
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-3 flex items-center gap-3 px-3 py-3 font-medium md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menü
            <span className="flex flex-col gap-[5px]" aria-hidden>
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-4 self-end bg-current" />
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
        className={`fixed inset-0 z-[70] flex flex-col bg-ink text-paper transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="wrap flex h-[var(--header)] shrink-0 items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block text-body font-semibold leading-[0.95] tracking-[-0.02em] [font-variation-settings:'wdth'_92]"
          >
            <span className="block">Scheu</span>
            <span className="block">Architekten</span>
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="-mr-3 flex items-center gap-3 px-3 py-3 font-medium">
            Schliessen
            <span className="relative block h-4 w-4" aria-hidden>
              <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav className="wrap mt-auto flex flex-col" aria-label="Mobile Navigation">
          {links.map((l, i) => (
            <Link
              key={l.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={l.match(pathname) ? 'page' : undefined}
              className="display border-b border-paper/15 py-4 text-heading"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="wrap mb-6 mt-8 flex flex-col text-small text-paper/80">
          <a href={`mailto:${contact.email}`} className="py-2.5">
            {contact.email}
          </a>
          <a href={contact.phoneHref} className="py-2.5">
            {contact.phone}
          </a>
        </div>
      </div>
    </>
  );
}
