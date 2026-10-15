import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { contact } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Büro',
  alternates: { canonical: '/buero' },
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
      <section className="px-5 pt-36 pb-20 md:px-10 md:pt-48 md:pb-28">
        <p className="eyebrow text-stone mb-8 animate-fade">Büro, Zürich, seit 2017</p>
        <h1 className="display text-[22vw] md:text-[12vw] -ml-[0.03em]">
          <span className="line-mask" style={{ '--delay': '150ms' } as CSSProperties}>
            <span>Büro</span>
          </span>
        </h1>
        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-4">
          <Reveal className="col-span-12 md:col-span-8 md:col-start-5">
            <p className="text-[7vw] md:text-[2.9vw] leading-[1.08] tracking-[-0.025em] font-medium [font-variation-settings:'wdth'_92] text-balance">
              Scheu Architekten ist ein Architekturbüro in Zürich, gegründet 2017 von Beat Scheu. Wir arbeiten an Aufgaben
              unterschiedlicher Massstäbe, vom Möbel bis zur Schulanlage.
            </p>
          </Reveal>
          <Reveal delay={150} className="col-span-12 md:col-span-4 md:col-start-5 mt-8 text-[17px] leading-relaxed">
            Unsere Architektur sucht nach spezifischen Lösungen für jeden Ort und jede Aufgabe. Dabei legen wir Wert auf eine
            sorgfältige Materialisierung und eine detailgerechte Ausführung.
          </Reveal>
          <Reveal delay={250} className="col-span-12 md:col-span-4 md:mt-8 text-[17px] leading-relaxed">
            Ob im Umgang mit einem Baudenkmal in Graubünden oder bei der Erweiterung einer Schule: Wir verstehen den Bestand als
            Ausgangspunkt und das Handwerk als Massstab.
          </Reveal>
        </div>
      </section>

      {/* Bildband: Foto und Zeichnung */}
      <section className="grid grid-cols-12 items-end gap-4 px-5 md:px-10" aria-hidden>
        <Reveal variant="clip" className="relative col-span-7 md:col-span-5 aspect-[4/5] overflow-hidden bg-paper-deep">
          <Image src="/images/haus-garcia.jpg" alt="" fill sizes="40vw" className="object-cover" />
        </Reveal>
        <Reveal delay={150} className="relative col-span-5 md:col-span-5 md:col-start-8 aspect-[4/3]">
          <Image src="/plans/haus-am-hang-schnitt.png" alt="" fill sizes="40vw" className="object-contain" />
        </Reveal>
      </section>

      {/* Beat Scheu */}
      <section className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="gruender">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow text-stone">Gründer, Geschäftsführung</p>
            <h2 id="gruender" className="display mt-4 text-[13vw] md:text-[5.6vw]">
              Beat
              <br />
              Scheu
            </h2>
            <p className="mt-6 max-w-xs text-[17px] leading-relaxed">
              Vom Möbelschreiner zum Architekten. Das Wissen um Material und Fügung prägt die Arbeit des Büros bis heute.
            </p>
          </div>
          <ol className="col-span-12 md:col-span-8 mt-10 md:mt-0 border-t border-ink">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year + t.text} delay={i * 60} className="grid grid-cols-12 gap-4 border-b border-line py-5 md:py-6">
                <span className="eyebrow col-span-4 md:col-span-3 pt-1.5 text-stone">{t.year}</span>
                <span className="col-span-8 md:col-span-9 text-[19px] md:text-[clamp(1.1rem,1.6vw,1.6rem)] leading-tight tracking-[-0.015em]">
                  {t.text}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-treppe px-5 py-24 md:px-10 md:py-36" aria-labelledby="team-titel">
        <div className="grid grid-cols-12 gap-4 mb-12 md:mb-16">
          <h2 id="team-titel" className="display col-span-12 md:col-span-6 text-[22vw] md:text-[10vw]">
            Team
          </h2>
          <p className="col-span-12 md:col-span-4 md:col-start-9 self-end text-[17px] leading-snug">
            Fünf Menschen mit Ausbildungen aus Fachhochschule, Hochschule und Berufslehre, gemeinsam an der Räffelstrasse in
            Zürich.
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-ink">
          {team.map((m) => (
            <Reveal as="li" key={m.name} className="border-b border-ink/25 py-7 md:py-9">
              <p className="eyebrow min-h-[1.4em]">{m.note}</p>
              <p className="display mt-4 text-[9vw] md:text-[2.5vw]">{m.name}</p>
              <p className="mt-3 text-[15px]">{m.role}</p>
            </Reveal>
          ))}
        </ul>
        <div className="mt-14 grid grid-cols-12 gap-4">
          <h3 className="eyebrow col-span-12 md:col-span-3">Ehemalige</h3>
          <ul className="col-span-12 md:col-span-9 grid md:grid-cols-3 gap-2 text-[15px]">
            {alumni.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stellen */}
      <section id="stellen" className="px-5 py-24 md:px-10 md:py-32 border-b border-ink" aria-labelledby="stellen-titel">
        <div className="grid grid-cols-12 gap-4">
          <h2 id="stellen-titel" className="eyebrow col-span-12 md:col-span-3 text-stone">
            Stellen
          </h2>
          <div className="col-span-12 md:col-span-9">
            <p className="text-[7vw] md:text-[2.9vw] leading-[1.08] tracking-[-0.025em] font-medium [font-variation-settings:'wdth'_92] text-balance">
              Aktuell sind keine Stellen ausgeschrieben. Spontanbewerbungen nehmen wir gerne per E-Mail entgegen.
            </p>
            <a href={`mailto:${contact.email}?subject=Bewerbung`} className="group mt-8 inline-flex items-center gap-3 text-[17px] font-medium">
              <span className="link-line">{contact.email}</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1.5">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Nachweise */}
      <section className="px-5 py-20 md:px-10 md:py-28" aria-labelledby="nachweise">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10 text-[15px] leading-relaxed">
          <h2 id="nachweise" className="eyebrow col-span-12 md:col-span-3 text-stone">
            Bildnachweis
          </h2>
          <div className="col-span-12 md:col-span-4">
            <p className="font-medium">Roman Keller</p>
            <p className="text-stone">Neubau Haus am Hang, Klosters · Büroumbau Frauenzentrale, Zürich · Umbau Haus Garcia, Meisterschwanden</p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="font-medium">Studio Gataric Fotografie</p>
            <p className="text-stone">Sanierung Haus Im Boden, Klosters-Monbiel</p>
            <p className="mt-6 font-medium">Vermietung Haus Im Boden</p>
            <a href="https://www.magnificasa.ch" target="_blank" rel="noopener noreferrer" className="link-line text-stone">
              Stiftung Ferien im Baudenkmal ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
