import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { projects, type Project } from '@/lib/projects';

/*
 * Ruhiges Raster: das erste Projekt über die ganze Breite, alle weiteren zu zweit im gleichen Format.
 * Funktioniert mit beliebig vielen Projekten – neue Einträge in lib/projects.ts erscheinen automatisch.
 */
function Card({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <article className={wide ? 'md:col-span-2' : undefined}>
      <Link href={`/projekte/${project.slug}`} className="group block">
        <Reveal className={`relative overflow-hidden bg-paper-deep ${wide ? 'aspect-[4/3] md:aspect-[2/1]' : 'aspect-[4/5]'}`}>
          <Image
            src={project.cover.src}
            alt=""
            fill
            sizes={wide ? '(max-width: 1680px) 100vw, 1600px' : '(max-width: 768px) 100vw, (max-width: 1680px) 50vw, 800px'}
            className="object-cover"
          />
        </Reveal>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-lead font-medium tracking-[-0.015em]">
            <span className="link-line">{project.short}</span>
          </h3>
          <p className="text-small text-stone">
            {project.location}, {project.years}
            {project.status === 'in Ausführung' && <span className="text-accent"> · In Ausführung</span>}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default function ProjectShowcase() {
  return (
    <section id="projekte" className="wrap py-20 md:py-32" aria-labelledby="projekte-titel">
      <h2 id="projekte-titel" className="display mb-10 text-heading md:mb-14">
        Projekte
      </h2>
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
        {projects.map((p, i) => (
          <Card key={p.slug} project={p} wide={i === 0} />
        ))}
      </div>
    </section>
  );
}
