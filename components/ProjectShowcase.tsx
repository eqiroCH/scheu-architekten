import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { projects, type Project } from '@/lib/projects';

/** Asymmetrisches, redaktionelles Raster – jede Arbeit bekommt ihren eigenen Platz. */
const layout: Record<string, { wrap: string; aspect: string; sizes: string }> = {
  'gymnasium-thun': { wrap: 'md:col-span-12', aspect: 'aspect-[4/3] md:aspect-[21/10]', sizes: '100vw' },
  'haus-im-boden': { wrap: 'md:col-span-7', aspect: 'aspect-[4/3] md:aspect-[3/2]', sizes: '(max-width: 768px) 100vw, 58vw' },
  'haus-am-hang': { wrap: 'md:col-start-9 md:col-span-4 md:mt-[28vh]', aspect: 'aspect-[4/5]', sizes: '(max-width: 768px) 100vw, 33vw' },
  frauenzentrale: { wrap: 'md:col-start-2 md:col-span-4 md:-mt-[8vh]', aspect: 'aspect-[4/5]', sizes: '(max-width: 768px) 100vw, 33vw' },
  'haus-garcia': { wrap: 'md:col-start-7 md:col-span-6 md:mt-[18vh]', aspect: 'aspect-[4/5]', sizes: '(max-width: 768px) 100vw, 50vw' },
};

function Card({ project, index }: { project: Project; index: number }) {
  const l = layout[project.slug];
  return (
    <Link href={`/projekte/${project.slug}`} className={`group block col-span-12 ${l.wrap}`} data-cursor="Ansehen">
      <Reveal variant="clip" className={`relative ${l.aspect} overflow-hidden bg-paper-deep`}>
        <Image
          src={project.cover.src}
          alt={project.title}
          fill
          sizes={l.sizes}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" />
        {project.status === 'in Ausführung' && (
          <span className="eyebrow absolute left-4 top-4 flex items-center gap-2 bg-paper px-2.5 py-1.5 text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            In Ausführung
          </span>
        )}
      </Reveal>
      <Reveal className="mt-4 grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 border-t border-ink pt-3 md:mt-5">
        <span className="font-mono text-[11px] text-stone">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="text-[1.6rem] md:text-[clamp(1.5rem,2.3vw,2.6rem)] leading-[1] font-medium tracking-[-0.04em]">
          <span className="link-line">{project.short}</span>
        </h3>
        <span className="eyebrow text-stone text-right">{project.years}</span>
        <span />
        <p className="mt-1.5 text-[15px] text-stone">
          {project.typ}, {project.location}
        </p>
        <span
          aria-hidden
          className="justify-self-end text-xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          ↗
        </span>
      </Reveal>
    </Link>
  );
}

export default function ProjectShowcase() {
  return (
    <section id="projekte" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-40">
      <div className="mb-14 grid grid-cols-12 gap-4 md:mb-24">
        <h2 className="display col-span-12 md:col-span-8 text-[19vw] md:text-[11vw]">
          Projekte<sup className="font-mono text-[0.13em] tracking-normal align-top ml-2 text-accent">(05)</sup>
        </h2>
        <p className="col-span-12 md:col-span-3 md:col-start-10 self-end text-[17px] leading-snug text-ink/80">
          Eine Auswahl realisierter und laufender Arbeiten – von der Sanierung eines Baudenkmals in Graubünden bis zur Erweiterung
          eines Gymnasiums.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-x-6 gap-y-20 md:gap-x-8 md:gap-y-24">
        {projects.map((p, i) => (
          <Card key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
