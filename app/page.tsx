import Link from 'next/link';
import Hero from '@/components/Hero';
import ProjectShowcase from '@/components/ProjectShowcase';
import PlanCabinet from '@/components/PlanCabinet';
import WorkIndex from '@/components/WorkIndex';
import Reveal from '@/components/Reveal';
import { werkverzeichnis } from '@/lib/projects';

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <>
      <Hero />

      {/* Haltung */}
      <section className="px-5 pt-28 pb-24 md:px-10 md:pt-44 md:pb-36" aria-labelledby="haltung">
        <div className="grid grid-cols-12 gap-4">
          <h2 id="haltung" className="eyebrow col-span-12 md:col-span-3 text-stone mb-6 md:mb-0 md:pt-3">
            Haltung
          </h2>
          <Reveal className="col-span-12 md:col-span-9">
            <p className="text-[8vw] md:text-[4.1vw] leading-[1.04] tracking-[-0.03em] font-medium [font-variation-settings:'wdth'_92] text-balance">
              Wir beschäftigen uns mit Bauaufgaben unterschiedlicher Massstäbe, vom Umbau im Bestand bis zum Neubau. Unsere
              Architektur sucht nach spezifischen Lösungen für jeden Ort und jede Aufgabe.
            </p>
          </Reveal>
        </div>

        {/* Masslinie: Gründung bis heute */}
        <Reveal className="mt-24 md:mt-32 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <div className="flex items-end justify-between eyebrow">
              <span>2017</span>
              <span>{year}</span>
            </div>
            <div className="dimension mt-3 text-ink" aria-hidden />
            <p className="mt-5 text-[19px] md:text-[22px] leading-snug tracking-[-0.01em] max-w-[40rem]">
              Gegründet 2017 in Zürich von Beat Scheu. Seither {werkverzeichnis.length} Bauten, Studien und Verfahren in den
              Kantonen Zürich, Graubünden, Bern und Aargau.
            </p>
            <Link href="/buero" className="group mt-8 inline-flex items-center gap-3 text-[17px] font-medium">
              <span className="link-line">Mehr über das Büro</span>
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      <ProjectShowcase />
      <PlanCabinet />
      <WorkIndex />
    </>
  );
}
