'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { contact } from '@/lib/projects';

const links = [
  { href: '/#projekte', label: 'Projekte' },
  { href: '/#werkverzeichnis', label: 'Werkverzeichnis' },
  { href: '/buero', label: 'Büro' },
  { href: '#kontakt', label: 'Kontakt' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-white">
        <div className="grid grid-cols-12 items-start gap-4 px-5 py-5 md:px-10 md:py-7">
          <Link href="/" className="col-span-6 md:col-span-3 block leading-[0.95] text-[15px] md:text-[17px] font-medium tracking-[-0.03em]" aria-label="Scheu Architekten – Startseite">
            <span className="block">Scheu</span>
            <span className="block">Architekten</span>
          </Link>

          <p className="eyebrow hidden md:block col-span-3 pt-0.5 opacity-70">
            Architekturbüro
            <br />
            Zürich, seit 2017
          </p>

          <nav className="hidden md:flex col-span-6 justify-end gap-8 lg:gap-12 pt-0.5" aria-label="Hauptnavigation">
            {links.map((l, i) => {
              const active = l.href === pathname;
              return (
                <Link key={l.href} href={l.href} className="group flex items-start gap-1.5 text-[15px] tracking-[-0.01em]">
                  <span className="font-mono text-[10px] opacity-50 pt-0.5">0{i + 1}</span>
                  <span className={`link-line ${active ? 'bg-[length:100%_1px]' : ''}`}>{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden col-span-6 justify-self-end flex items-center gap-3 text-[15px]"
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
        className={`fixed inset-0 z-[70] bg-ink text-paper flex flex-col px-5 py-5 transition-[clip-path] duration-700 ease-[cubic-bezier(.77,0,.18,1)] md:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)] pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="flex justify-between items-start">
          <span className="leading-[0.95] text-[15px] font-medium tracking-[-0.03em]">
            Scheu
            <br />
            Architekten
          </span>
          <button type="button" onClick={() => setOpen(false)} className="text-[15px] flex items-center gap-3">
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
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 border-b border-white/15 py-3"
            >
              <span className="font-mono text-[11px] text-stone pt-2">0{i + 1}</span>
              <span className="text-[11vw] leading-[0.95] font-medium tracking-[-0.05em]">{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="eyebrow text-stone flex justify-between">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.phoneHref}>{contact.phone}</a>
        </div>
      </div>
    </>
  );
}
