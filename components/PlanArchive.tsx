import Image from 'next/image';
import Link from 'next/link';
import { allPlans } from '@/lib/projects';

export default function PlanArchive() {
  const loop = [...allPlans, ...allPlans];
  return (
    <section className="relative overflow-hidden bg-ink text-paper py-24 md:py-36" aria-labelledby="planarchiv">
      <div className="px-5 md:px-10 grid grid-cols-12 gap-4 mb-14 md:mb-20">
        <p className="eyebrow col-span-12 md:col-span-3 text-stone">Planarchiv</p>
        <h2 id="planarchiv" className="col-span-12 md:col-span-9 text-[11vw] md:text-[6.4vw] leading-[0.92] tracking-[-0.05em] font-medium">
          Gedacht in <em className="font-serif font-normal tracking-[-0.02em] text-accent">Grundriss</em> und{' '}
          <em className="font-serif font-normal tracking-[-0.02em]">Schnitt</em>.
        </h2>
      </div>

      <div className="flex w-max marquee gap-6 md:gap-10" aria-label="Pläne aus den Projekten">
        {loop.map((plan, i) => (
          <Link
            key={`${plan.src}-${i}`}
            href={`/projekte/${plan.project.slug}`}
            className="group block shrink-0"
            data-cursor="Projekt"
            tabIndex={i >= allPlans.length ? -1 : undefined}
            aria-hidden={i >= allPlans.length ? true : undefined}
          >
            <div
              className="relative h-[46vh] md:h-[58vh] overflow-hidden bg-ink"
              style={{ aspectRatio: `${plan.width} / ${plan.height}` }}
            >
              <Image
                src={plan.src}
                alt={`${plan.project.short}, ${plan.caption}`}
                fill
                sizes="(max-width: 768px) 70vw, 40vw"
                className="plan-invert object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-6 border-t border-white/20 pt-3">
              <span className="text-[15px] tracking-[-0.01em]">{plan.project.short}</span>
              <span className="eyebrow text-stone">{plan.caption}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
