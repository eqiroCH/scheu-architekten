import Hero from '@/components/Hero';
import ScrollText from '@/components/ScrollText';
import CountUp from '@/components/CountUp';
import ProjectShowcase from '@/components/ProjectShowcase';
import PlanArchive from '@/components/PlanArchive';
import WorkIndex from '@/components/WorkIndex';
import Reveal from '@/components/Reveal';
import Link from 'next/link';
import { werkverzeichnis } from '@/lib/projects';

const facts = [
  { value: 2017, from: 1980, label: 'Gründung in Zürich durch Beat Scheu' },
  { value: werkverzeichnis.length, label: 'Bauten, Studien und Verfahren' },
  { value: 4, label: 'Kantone: Zürich, Graubünden, Bern, Aargau' },
  { value: 5, label: 'Menschen im Team' },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Haltung */}
      <section className="px-5 pt-28 pb-20 md:px-10 md:pt-44 md:pb-32">
        <div className="grid grid-cols-12 gap-4">
          <p className="eyebrow col-span-12 md:col-span-3 text-stone mb-6 md:mb-0 md:pt-4">Haltung</p>
          <ScrollText
            className="col-span-12 md:col-span-9 text-[8.4vw] md:text-[4.3vw] leading-[1.02] tracking-[-0.045em] font-medium"
            segments={[
              'Wir beschäftigen uns mit Bauaufgaben unterschiedlicher Massstäbe – vom',
              { em: 'Umbau im Bestand' },
              'bis zum',
              { em: 'Neubau.' },
              'Unsere Architektur sucht nach spezifischen Lösungen für',
              { em: 'jeden Ort' },
              'und jede Aufgabe – sorgfältig materialisiert, präzise im Detail.',
            ]}
          />
        </div>

        <div className="mt-24 md:mt-36 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 120} className="border-t border-ink pt-4">
              <p className="text-[18vw] md:text-[7vw] leading-[0.85] font-medium tracking-[-0.06em]">
                <CountUp to={f.value} from={f.from} />
              </p>
              <p className="mt-4 text-[15px] leading-snug text-ink/75 max-w-[16rem]">{f.label}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-end">
          <Link href="/buero" className="group inline-flex items-center gap-3 text-[17px]" data-cursor="Büro">
            <span className="link-line">Mehr über das Büro</span>
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
          </Link>
        </div>
      </section>

      <ProjectShowcase />
      <PlanArchive />
      <WorkIndex />
    </>
  );
}
