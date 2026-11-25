import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Gallery from '@/components/Gallery';
import { getNextProject, getProject, projects } from '@/lib/projects';
import { baseOpenGraph, ogImage, siteUrl } from '@/lib/site';

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
  const { cover } = project;
  return {
    title: project.title,
    description: project.lead,
    alternates: { canonical: `/projekte/${project.slug}` },
    openGraph: {
      ...baseOpenGraph,
      title: project.title,
      description: project.lead,
      images: [{ url: ogImage(cover.src), width: 1200, height: Math.round((1200 * cover.height) / cover.width), alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const { cover } = project;
  const portrait = cover.height > cover.width;

  const facts = [
    { label: 'Ort', value: `${project.location}, ${project.canton}` },
    { label: 'Zeitraum', value: project.years },
    { label: 'Status', value: project.status === 'in Ausführung' ? 'In Ausführung' : 'Realisiert' },
    { label: 'Aufgabe', value: project.typ },
    project.collaboration && { label: 'Zusammenarbeit', value: project.collaboration },
    project.photography && { label: 'Fotografie', value: project.photography },
    ...(project.facts ?? []),
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Projekte', item: `${siteUrl}/#projekte` },
          { '@type': 'ListItem', position: 2, name: project.title, item: `${siteUrl}/projekte/${project.slug}` },
        ],
      },
      {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.lead,
        image: `${siteUrl}${cover.src}`,
        creator: { '@type': 'Organization', name: 'Scheu Architekten GmbH' },
        locationCreated: { '@type': 'Place', name: `${project.location}, ${project.canton}, Schweiz` },
      },
    ],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Kopf: Titel auf Papier */}
      <header className="wrap pt-10 md:pt-16">
        <h1 className="display max-w-[22ch] text-heading text-balance">{project.title}</h1>
        <p className="mt-4 text-stone">
          {project.location} · {project.years}
          {project.status === 'in Ausführung' && <span className="text-accent"> · In Ausführung</span>}
        </p>
      </header>

      {/*
       * Bild ohne Abdunklung, dazu Text und Angaben.
       * Querformat: Bild über die ganze Breite, Text darunter. Hochformat: Text rechts neben dem Bild.
       */}
      <div
        className={`wrap grid gap-y-12 pb-16 pt-10 md:grid-cols-12 md:gap-x-8 md:pb-24 md:pt-14 ${portrait ? 'md:grid-rows-[auto_1fr]' : ''}`}
      >
        <Image
          src={cover.src}
          alt={`${project.title}, ${cover.caption}`}
          width={cover.width}
          height={cover.height}
          priority
          sizes={portrait ? '(max-width: 768px) 100vw, (max-width: 1680px) 50vw, 800px' : '(max-width: 1680px) 100vw, 1600px'}
          className={`block h-auto bg-paper-deep ${
            portrait
              ? 'w-full md:col-span-6 md:row-span-2'
              : 'max-h-[calc(100svh-var(--header)-2.5rem)] w-auto max-w-full md:col-span-12 md:mb-10'
          }`}
        />
        <div className={portrait ? 'md:col-span-6 lg:col-span-5 lg:col-start-8' : 'md:col-span-8 md:col-start-5 md:row-start-2 lg:col-span-7 lg:col-start-5'}>
          <p className="text-lead font-medium tracking-[-0.015em] text-balance">{project.lead}</p>
          <div className="mt-8 max-w-[65ch] space-y-5">
            {project.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
        <dl
          className={`self-start border-t border-ink ${
            portrait ? 'md:col-span-6 lg:col-span-5 lg:col-start-8' : 'md:col-span-4 md:row-start-2 lg:col-span-3'
          }`}
        >
          {facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-x-4 border-b border-line py-3 text-small">
              <dt className="text-stone">{f.label}</dt>
              <dd>
                {f.href ? (
                  <a href={f.href} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                    {f.value}
                    <span className="sr-only"> (neuer Tab)</span>
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {project.gallery.length > 0 && (
        <section className="wrap pb-20 md:pb-32" aria-labelledby="plaene">
          <h2 id="plaene" className="display mb-10 text-heading md:mb-14">
            Pläne und Bilder
          </h2>
          <Gallery items={project.gallery} title={project.title} />
        </section>
      )}

      <div className="wrap">
        <nav className="flex flex-wrap items-end justify-between gap-6 border-t border-line py-8 md:py-10" aria-label="Projektnavigation">
          <Link href="/#projekte" className="group inline-flex items-center gap-3 font-medium">
            <span aria-hidden>←</span>
            <span className="link-line">Alle Projekte</span>
          </Link>
          <Link href={`/projekte/${next.slug}`} className="group text-right">
            <span className="block text-small text-stone">Nächstes Projekt</span>
            <span className="text-lead font-medium tracking-[-0.015em]">
              <span className="link-line">{next.short}</span> <span aria-hidden>→</span>
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
