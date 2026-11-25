import Image from 'next/image';
import Link from 'next/link';
import { getProject } from '@/lib/projects';

const project = getProject('haus-am-hang')!;

/*
 * Ein ruhiges Bild: mobil oben (58svh), ab Tablet rechts (48vw).
 * Ab Tablet liegt die Wortmarke zweimal übereinander und wird exakt an der Bildkante geschnitten:
 * Tusche auf dem Papier, Papierweiss auf dem Bild. Mobil steht sie vollständig auf dem Papier unter dem Bild.
 */
const imageBox = 'top-0 right-0 h-[58svh] w-full md:h-full md:w-[48vw]';
const imageClip = 'hidden md:block md:[clip-path:inset(0_0_0_calc(100%_-_48vw))]';

function Wordmark({ tone }: { tone: 'ink' | 'paper' }) {
  const Tag = tone === 'ink' ? 'h1' : 'p';
  return (
    <div
      aria-hidden={tone === 'paper' || undefined}
      className={`pointer-events-none absolute inset-0 ${tone === 'paper' ? `text-paper ${imageClip}` : 'text-ink'}`}
    >
      <Tag className="display absolute left-[var(--edge)] top-[calc(58svh_+_1rem)] whitespace-nowrap text-display md:top-auto md:bottom-8">
        <span className="block">Scheu</span> <span className="block">Architekten</span>
      </Tag>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative h-[calc(58svh+27vw+7.5rem)] overflow-hidden md:h-[calc(100svh-var(--header))] md:min-h-[560px]">
      <Link href={`/projekte/${project.slug}`} tabIndex={-1} aria-hidden className={`absolute block bg-paper-deep ${imageBox}`}>
        <Image
          src={project.cover.src}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 48vw"
          className="object-cover object-[50%_70%]"
        />
      </Link>

      <Wordmark tone="ink" />
      <Wordmark tone="paper" />

      <Link
        href={`/projekte/${project.slug}`}
        className="group absolute bottom-5 left-[var(--edge)] text-small md:bottom-auto md:left-auto md:right-[calc(48vw+1.5rem)] md:top-6 md:text-right"
      >
        <span className="link-line font-medium">{project.short}</span>
        <span className="block text-stone">
          {project.location}, {project.years}
        </span>
      </Link>
    </section>
  );
}
