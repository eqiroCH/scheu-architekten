import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Gallery from '@/components/Gallery';
import Reveal from '@/components/Reveal';
import { getNextProject, getProject, projects } from '@/lib/projects';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.lead,
    openGraph: { images: [project.cover.src] },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const number = String(projects.indexOf(project) + 1).padStart(2, '0');
  const portrait = project.cover.height > project.cover.width;

  const meta = [
    { k: 'Ort', v: `${project.location}, ${project.canton}` },
    { k: 'Zeitraum', v: project.years },
    { k: 'Status', v: project.status === 'in Ausführung' ? 'In Ausführung' : 'Realisiert' },
    { k: 'Aufgabe', v: project.typ },
    project.collaboration && { k: 'In Zusammenarbeit mit', v: project.collaboration },
    project.photography && { k: 'Fotografie', v: project.photography },
  ].filter(Boolean) as { k: string; v: string }[];

  const titleLines = (
    <h1 className={`display ${portrait ? 'text-[15vw] md:text-[6.6vw]' : 'text-[15vw] md:text-[10.5vw]'}`}>
      {project.short.split(' ').map((word, i) => (
        <span key={i} className="line-mask" style={{ '--delay': `${200 + i * 120}ms` } as CSSProperties}>
          <span>{word}</span>
        </span>
      ))}
    </h1>
  );

  return (
    <article>
      {/* Kopf */}
      {portrait ? (
        <header className="grid min-h-[100svh] grid-cols-1 md:grid-cols-2">
          <div className="relative order-1 h-[78svh] md:order-2 md:h-auto md:min-h-[100svh] overflow-hidden">
            <Image src={project.cover.src} alt={project.title} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ animation: 'slow-zoom 2.4s var(--ease-out-expo) both' }} />
          </div>
          <div className="order-2 md:order-1 flex flex-col justify-end px-5 pt-10 pb-12 md:px-10 md:pb-10">
            <p className="eyebrow text-stone mb-6 animate-fade">
              <span className="text-accent">{number}</span> — {project.title}
            </p>
            {titleLines}
            <p className="mt-8 eyebrow animate-fade" style={{ '--delay': '700ms' } as CSSProperties}>
              {project.location} · {project.years}
            </p>
          </div>
        </header>
      ) : (
        <header className="relative min-h-[100svh] overflow-hidden text-paper">
          <Image src={project.cover.src} alt={project.title} fill priority sizes="100vw" className="object-cover" style={{ animation: 'slow-zoom 2.4s var(--ease-out-expo) both' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />
          <div className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-10 md:px-10">
            <p className="eyebrow mb-6 animate-fade opacity-80">
              <span className="text-accent">{number}</span> — {project.title}
            </p>
            {titleLines}
            <p className="mt-8 eyebrow animate-fade" style={{ '--delay': '700ms' } as CSSProperties}>
              {project.location} · {project.years}
            </p>
          </div>
        </header>
      )}

      {/* Text + Angaben */}
      <section className="grid grid-cols-12 gap-x-4 gap-y-14 px-5 py-24 md:px-10 md:py-36">
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <dl className="md:sticky md:top-28 border-t border-ink">
            {meta.map((m) => (
              <div key={m.k} className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1 border-b border-line py-3.5">
                <dt className="eyebrow text-stone pt-0.5">{m.k}</dt>
                <dd className="text-[15px] leading-snug">{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="text-[7.4vw] md:text-[2.9vw] leading-[1.06] tracking-[-0.035em] font-medium">{project.lead}</p>
          </Reveal>
          <div className="mt-12 md:mt-16 grid gap-6 md:grid-cols-2 md:gap-8 text-[17px] leading-relaxed text-ink/80">
            {project.text.map((t, i) => (
              <Reveal key={i} delay={i * 120} as="p">
                {t}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="px-5 pb-24 md:px-10 md:pb-40" aria-labelledby="plaene">
          <div className="mb-10 md:mb-14 flex items-end justify-between border-b border-ink pb-4">
            <h2 id="plaene" className="text-[9vw] md:text-[4.4vw] leading-none font-medium tracking-[-0.05em]">
              Pläne <em className="font-serif font-normal tracking-[-0.02em] text-accent">&amp;</em> Bilder
            </h2>
            <span className="eyebrow text-stone">{String(project.gallery.length).padStart(2, '0')} Abbildungen</span>
          </div>
          <Gallery items={project.gallery} title={project.title} />
        </section>
      )}

      {/* Nächstes Projekt */}
      <Link
        href={`/projekte/${next.slug}`}
        className="group relative block overflow-hidden bg-ink text-paper"
        data-cursor="Weiter"
      >
        <div className="absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-45">
          <Image src={next.cover.src} alt="" fill sizes="100vw" className="object-cover scale-110 transition-transform duration-[2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100" />
        </div>
        <div className="relative px-5 py-20 md:px-10 md:py-32">
          <p className="eyebrow text-stone">Nächstes Projekt</p>
          <p className="display mt-6 text-[14vw] md:text-[10vw] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4">
            {next.short} <span className="font-serif font-normal">→</span>
          </p>
          <p className="mt-6 eyebrow">
            {next.location} · {next.years}
          </p>
        </div>
      </Link>
    </article>
  );
}
