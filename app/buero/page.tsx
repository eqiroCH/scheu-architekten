import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Büro',
  description: 'Scheu Architekten GmbH – Architekturbüro in Zürich, gegründet 2017 von Beat Scheu. Team, Werdegang und Kontakt.',
};

const timeline = [
  { year: '2017', text: 'Gründung Scheu Architekten GmbH in Zürich' },
  { year: '2010–2017', text: 'Mitarbeit bei Armon Semadeni Architekten GmbH BSA SIA, Zürich' },
  { year: '2006–2010', text: 'Mitarbeit bei Boltshauser Architekten AG BSA SIA, Zürich' },
  { year: '2004–2006', text: 'Mitarbeit bei Archstudio 11, Chur' },
  { year: '2003–2007', text: 'Architekturstudium an der HTW Chur' },
  { year: '2000–2004', text: 'Möbelschreiner in Klosters und Haldenstein' },
  { year: '1980', text: 'Geboren in Davos' },
];

const team = [
  { name: 'Beat Scheu', role: 'Dipl. Architekt FH', note: 'Gründer, Geschäftsführung' },
  { name: 'Christina Sulzer', role: 'Dipl. Architektin ETH' },
  { name: 'Lisa Colombo', role: 'Dipl. Architektin TU' },
  { name: 'Felix Simons', role: 'Dipl. Ing. TU' },
  { name: 'Kaltrina Shala', role: 'In Ausbildung zur Dipl. Technikerin HF / Zeichnerin EFZ' },
];

const alumni = ['Ivana Milojevic, Dipl. Architektin ETH', 'Leonid Alimi, Zeichner EFZ', 'Lars Tietz, Zeichner EFZ'];

export default function BueroPage() {
  return (
    <>
      {/* Kopf */}
      <section className="px-5 pt-36 pb-20 md:px-10 md:pt-48 md:pb-32">
        <p className="eyebrow text-stone mb-8 animate-fade">Büro — Zürich, seit 2017</p>
        <h1 className="display text-[30vw] md:text-[24vw] -ml-[0.04em]">
          <span className="line-mask" style={{ '--delay': '150ms' } as CSSProperties}>
            <span>Büro</span>
          </span>
        </h1>
        <div className="mt-16 md:mt-24 grid grid-cols-12 gap-4">
          <Reveal className="col-span-12 md:col-span-8 md:col-start-5">
            <p className="text-[7.4vw] md:text-[3vw] leading-[1.05] tracking-[-0.04em] font-medium">
              Scheu Architekten ist ein Architekturbüro in Zürich, gegründet 2017 von Beat Scheu. Wir arbeiten an Aufgaben
              unterschiedlicher Massstäbe – vom <em className="font-serif font-normal tracking-[-0.01em]">Möbel</em> bis zur{' '}
              <em className="font-serif font-normal tracking-[-0.01em]">Schulanlage</em>.
            </p>
          </Reveal>
          <Reveal delay={150} className="col-span-12 md:col-span-4 md:col-start-5 mt-8 text-[17px] leading-relaxed text-ink/80">
            Unsere Architektur sucht nach spezifischen Lösungen für jeden Ort und jede Aufgabe. Dabei legen wir Wert auf eine
            sorgfältige Materialisierung und eine detailgerechte Ausführung.
          </Reveal>
          <Reveal delay={250} className="col-span-12 md:col-span-4 md:mt-8 text-[17px] leading-relaxed text-ink/80">
            Ob im Umgang mit einem Baudenkmal in Graubünden oder bei der Erweiterung einer Schule: Wir verstehen den Bestand als
            Ausgangspunkt und das Handwerk als Massstab.
          </Reveal>
        </div>
      </section>

      {/* Bildband */}
      <section className="grid grid-cols-12 gap-4 px-5 md:px-10" aria-hidden>
        <Reveal variant="clip" className="relative col-span-7 md:col-span-5 aspect-[4/5] overflow-hidden">
          <Image src="/images/haus-am-hang.jpg" alt="" fill sizes="40vw" className="object-cover" />
        </Reveal>
        <Reveal variant="clip" delay={150} className="relative col-span-5 md:col-span-4 md:col-start-8 mt-[30%] aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
          <Image src="/images/haus-am-hang-schnitt.jpg" alt="" fill sizes="33vw" className="object-contain mix-blend-multiply" />
        </Reveal>
      </section>

      {/* Beat Scheu */}
      <section className="px-5 py-24 md:px-10 md:py-40">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow text-stone">Gründer</p>
            <h2 className="mt-4 text-[13vw] md:text-[5.6vw] leading-[0.9] font-medium tracking-[-0.05em]">
              Beat
              <br />
              Scheu
            </h2>
            <p className="mt-6 max-w-xs text-[17px] leading-relaxed text-ink/80">
              Vom Möbelschreiner zum Architekten – das Wissen um Material und Fügung prägt die Arbeit des Büros bis heute.
            </p>
          </div>
          <ol className="col-span-12 md:col-span-8 mt-10 md:mt-0 border-t border-ink">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year + t.text} delay={i * 60} className="group grid grid-cols-12 gap-4 border-b border-line py-5 md:py-6">
                <span className="col-span-4 md:col-span-3 font-mono text-[12px] md:text-[13px] pt-1.5 text-stone transition-colors group-hover:text-accent">
                  {t.year}
                </span>
                <span className="col-span-8 md:col-span-9 text-[19px] md:text-[clamp(1.1rem,1.7vw,1.7rem)] leading-tight tracking-[-0.025em]">
                  {t.text}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="scroll-mt-24 bg-paper-deep px-5 py-24 md:px-10 md:py-40">
        <div className="grid grid-cols-12 gap-4 mb-12 md:mb-20">
          <h2 className="display col-span-12 md:col-span-6 text-[22vw] md:text-[11vw]">Team</h2>
          <p className="col-span-12 md:col-span-4 md:col-start-9 self-end text-[17px] leading-snug text-ink/80">
            Fünf Menschen mit Ausbildungen aus Fachhochschule, Hochschule und Berufslehre – gemeinsam an der Räffelstrasse in
            Zürich.
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-ink">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 3) * 100} className="group border-b border-line py-7 md:py-9">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[11px] text-stone">{String(i + 1).padStart(2, '0')}</span>
                {m.note && <span className="eyebrow text-accent">{m.note}</span>}
              </div>
              <p className="mt-6 text-[9vw] md:text-[2.6vw] leading-[0.95] font-medium tracking-[-0.045em] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1.5">
                {m.name}
              </p>
              <p className="mt-3 text-[15px] text-ink/70">{m.role}</p>
            </Reveal>
          ))}
        </ul>
        <div className="mt-16 grid grid-cols-12 gap-4">
          <p className="eyebrow col-span-12 md:col-span-3 text-stone">Ehemalige</p>
          <ul className="col-span-12 md:col-span-9 grid md:grid-cols-3 gap-2 text-[15px] text-ink/70">
            {alumni.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nachweise */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10 text-[15px] leading-relaxed">
          <p className="eyebrow col-span-12 md:col-span-3 text-stone">Bildnachweis</p>
          <div className="col-span-12 md:col-span-4">
            <p className="font-medium">Roman Keller</p>
            <p className="text-ink/70">Neubau Haus am Hang, Klosters · Büroumbau Frauenzentrale, Zürich · Umbau Haus Garcia, Meisterschwanden</p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="font-medium">Studio Gataric Fotografie</p>
            <p className="text-ink/70">Sanierung Haus Im Boden, Klosters-Monbiel</p>
            <p className="mt-6 font-medium">Vermietung Haus Im Boden</p>
            <a href="https://www.magnificasa.ch" target="_blank" rel="noopener noreferrer" className="link-line text-ink/70">
              Stiftung Ferien im Baudenkmal ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
