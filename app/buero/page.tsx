import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Büro',
  alternates: { canonical: '/buero' },
  description: 'Scheu Architekten GmbH – Architekturbüro in Zürich, gegründet 2017 von Beat Scheu. Werdegang, Team und Stellen.',
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
      <section className="wrap grid gap-y-8 pb-16 pt-12 md:grid-cols-12 md:gap-x-8 md:pb-24 md:pt-20">
        <h1 className="display text-heading md:col-span-4">Büro</h1>
        <div className="md:col-span-8 lg:col-span-7">
          <p className="text-lead font-medium tracking-[-0.015em] text-balance">
            Scheu Architekten ist ein Architekturbüro in Zürich, gegründet 2017 von Beat Scheu. Wir arbeiten an Aufgaben
            unterschiedlicher Massstäbe, vom Möbel bis zur Schulanlage.
          </p>
          <p className="mt-8 max-w-[65ch]">
            Dabei legen wir Wert auf eine sorgfältige Materialisierung und eine detailgerechte Ausführung. Ob im Umgang mit
            einem Baudenkmal in Graubünden oder bei der Erweiterung einer Schule: Wir verstehen den Bestand als
            Ausgangspunkt und das Handwerk als Massstab.
          </p>
        </div>
      </section>

      {/* Foto und Zeichnung */}
      <section className="wrap grid grid-cols-12 items-end gap-4 md:gap-8" aria-hidden>
        <Reveal className="relative col-span-7 aspect-[4/5] overflow-hidden bg-paper-deep md:col-span-5">
          <Image src="/images/haus-garcia.jpg" alt="" fill sizes="(max-width: 768px) 58vw, 40vw" className="object-cover" />
        </Reveal>
        <Reveal className="relative col-span-5 aspect-[4/3] md:col-span-5 md:col-start-8">
          <Image src="/plans/haus-am-hang-schnitt.png" alt="" fill sizes="(max-width: 768px) 42vw, 40vw" className="object-contain" />
        </Reveal>
      </section>

      {/* Beat Scheu */}
      <section className="wrap grid gap-y-10 py-20 md:grid-cols-12 md:gap-x-8 md:py-32" aria-labelledby="gruender">
        <div className="md:col-span-4">
          <h2 id="gruender" className="display text-heading">
            Beat Scheu
          </h2>
          <p className="mt-2 text-stone">Dipl. Architekt FH, Gründer und Geschäftsführer</p>
          <p className="mt-6 max-w-xs">
            Vom Möbelschreiner zum Architekten. Das Wissen um Material und Fügung prägt die Arbeit des Büros bis heute.
          </p>
        </div>
        <ol className="border-t border-ink md:col-span-8">
          {timeline.map((t) => (
            <li key={t.year + t.text} className="grid grid-cols-[6.5rem_1fr] gap-x-4 border-b border-line py-4 md:grid-cols-[9rem_1fr]">
              <span className="tabular-nums text-stone">{t.year}</span>
              <span>{t.text}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section id="team" className="wrap grid gap-y-10 pb-20 md:grid-cols-12 md:gap-x-8 md:pb-32" aria-labelledby="team-titel">
        <h2 id="team-titel" className="display text-heading md:col-span-4">
          Team
        </h2>
        <div className="md:col-span-8">
          <ul className="grid border-t border-ink sm:grid-cols-2 sm:gap-x-8">
            {team.map((m) => (
              <li key={m.name} className="border-b border-line py-4">
                <p className="font-medium">{m.name}</p>
                <p className="text-small text-stone">{m.role}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-small text-stone">
            <span className="font-medium text-ink">Ehemalige:</span> {alumni.join(' · ')}
          </p>
        </div>
      </section>

      {/* Stellen */}
      <section id="stellen" className="wrap pb-20 md:pb-32" aria-labelledby="stellen-titel">
        <div className="grid gap-y-3 border-t border-ink pt-6 md:grid-cols-12 md:gap-x-8">
          <h2 id="stellen-titel" className="font-medium md:col-span-4">
            Stellen
          </h2>
          <p className="md:col-span-8">
            Aktuell sind keine Stellen ausgeschrieben. Spontanbewerbungen nehmen wir gerne per E-Mail entgegen:{' '}
            <a href={`mailto:${contact.email}?subject=Bewerbung`} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              {contact.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
