import Link from 'next/link';
import Hero from '@/components/Hero';
import ProjectShowcase from '@/components/ProjectShowcase';
import WorkIndex from '@/components/WorkIndex';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="wrap grid gap-y-6 py-20 md:grid-cols-12 md:gap-x-8 md:py-32" aria-labelledby="haltung">
        <h2 id="haltung" className="eyebrow pt-2 text-stone md:col-span-3">
          Haltung
        </h2>
        <div className="md:col-span-9 lg:col-span-8">
          <p className="text-lead font-medium tracking-[-0.015em] text-balance">
            Wir beschäftigen uns mit Bauaufgaben unterschiedlicher Massstäbe, vom Umbau im Bestand bis zum Neubau. Unsere
            Architektur sucht nach spezifischen Lösungen für jeden Ort und jede Aufgabe.
          </p>
          <p className="mt-6 text-stone">Gegründet 2017 von Beat Scheu in Zürich.</p>
          <Link href="/buero" className="group mt-4 inline-flex items-center gap-3 font-medium">
            <span className="link-line">Mehr über das Büro</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <ProjectShowcase />
      <WorkIndex />
    </>
  );
}
