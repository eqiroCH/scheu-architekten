import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { projects, type Media, type Project } from '@/lib/projects';

/*
 * Redaktionelles Raster: Foto und Zeichnung stehen nebeneinander.
 * Freie Felder werden mit dem passenden Plan besetzt statt leer zu bleiben.
 */
const layout: Record<string, { wrap: string; aspect: string; sizes: string; plan?: { wrap: string; src: string } }> = {
  'gymnasium-thun': {
    wrap: 'md:col-span-12',
    aspect: 'aspect-[4/3] md:aspect-[16/9]',
    sizes: '100vw',
  },
  'haus-im-boden': {
    wrap: 'md:col-span-7',
    aspect: 'aspect-[4/3] md:aspect-[3/2]',
    sizes: '(max-width: 768px) 100vw, 58vw',
    plan: { wrap: 'md:col-start-9 md:col-span-3 md:self-end', src: '/plans/haus-im-boden-plan-eg.png' },
  },
  'haus-am-hang': {
    wrap: 'md:col-span-5 md:mt-[12vh]',
    aspect: 'aspect-[4/5]',
    sizes: '(max-width: 768px) 100vw, 42vw',
    plan: { wrap: 'md:col-start-7 md:col-span-6 md:self-center', src: '/plans/haus-am-hang-schnitt.png' },
  },
  frauenzentrale: {
    wrap: 'md:col-start-2 md:col-span-4',
    aspect: 'aspect-[4/5]',
    sizes: '(max-width: 768px) 100vw, 33vw',
  },
  'haus-garcia': {
    wrap: 'md:col-start-7 md:col-span-6 md:mt-[16vh]',
    aspect: 'aspect-[4/5]',
    sizes: '(max-width: 768px) 100vw, 50vw',
  },
};

function Card({ project, index }: { project: Project; index: number }) {
  const l = layout[project.slug];
  const plan: Media | undefined = l.plan && project.gallery.find((m) => m.src === l.plan!.src);
  return (
    <>
      <Link href={`/projekte/${project.slug}`} className={`group block col-span-12 ${l.wrap}`} aria-label={`${project.title}, ${project.location}`}>
        <Reveal variant="clip" className={`relative ${l.aspect} overflow-hidden bg-paper-deep`}>
          <Image
            src={project.cover.src}
            alt=""
            fill
            sizes={l.sizes}
            className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.025]"
          />
          {project.status === 'in Ausführung' && (
            <span className="eyebrow absolute left-4 top-4 flex items-center gap-2 bg-paper px-2.5 py-1.5 text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              In Ausführung
            </span>
          )}
        </Reveal>
        <div className="mt-4 grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 border-t border-ink pt-3 md:mt-5" aria-hidden>
          <span className="eyebrow text-stone">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="display text-[1.75rem] md:text-[clamp(1.6rem,2.4vw,2.7rem)] leading-[1]">
            <span className="link-line">{project.short}</span>
          </h3>
          <span className="eyebrow text-stone text-right">{project.years}</span>
          <span />
          <p className="mt-1.5 text-[15px] text-stone">
            {project.typ}, {project.location}
          </p>
          <span className="justify-self-end text-xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </div>
      </Link>

      {plan && (
        <Link href={`/projekte/${project.slug}`} className={`group col-span-12 hidden md:block ${l.plan!.wrap}`} tabIndex={-1} aria-hidden>
          <Reveal delay={150}>
            <div className="relative w-full" style={{ aspectRatio: `${plan.width} / ${plan.height}` }}>
              <Image src={plan.src} alt="" fill sizes="40vw" className="object-contain" />
            </div>
            <p className="eyebrow mt-3 flex justify-between border-t border-line pt-2 text-stone">
              <span>{project.short}</span>
              <span>{plan.caption}</span>
            </p>
          </Reveal>
        </Link>
      )}
    </>
  );
}

export default function ProjectShowcase() {
  return (
    <section id="projekte" className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="projekte-titel">
      <div className="mb-14 grid grid-cols-12 gap-4 md:mb-24">
        <h2 id="projekte-titel" className="display col-span-12 md:col-span-8 text-[19vw] md:text-[11vw]">
          Projekte
          <sup className="eyebrow ml-2 align-top text-[max(0.7rem,0.1em)] tracking-normal text-stone">
            ({String(projects.length).padStart(2, '0')})
          </sup>
        </h2>
        <p className="col-span-12 md:col-span-3 md:col-start-10 self-end text-[17px] leading-snug">
          Eine Auswahl realisierter und laufender Arbeiten, von der Sanierung eines Baudenkmals in Graubünden bis zur
          Erweiterung eines Gymnasiums.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-x-6 gap-y-20 md:gap-x-8 md:gap-y-28">
        {projects.map((p, i) => (
          <Card key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
