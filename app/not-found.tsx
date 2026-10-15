import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] grid-cols-12 gap-4 px-5 pt-36 pb-16 md:px-10">
      <div className="col-span-12 md:col-span-7 flex flex-col justify-end">
        <p className="eyebrow text-stone">Fehler 404</p>
        <h1 className="display mt-6 text-[24vw] md:text-[17vw]">404</h1>
        <p className="mt-8 text-[7vw] md:text-[3vw] leading-[1.05] font-medium tracking-[-0.025em]">Dieser Raum ist noch nicht gebaut.</p>
        <Link href="/" className="group mt-10 inline-flex items-center gap-3 text-[17px]">
          <span className="link-line">Zurück zur Startseite</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1.5">→</span>
        </Link>
      </div>
      <div className="relative col-span-12 md:col-span-4 md:col-start-9 aspect-[3/4] self-end" aria-hidden>
        <Image src="/plans/haus-am-hang-plan-dg.png" alt="" fill sizes="33vw" className="object-contain" />
      </div>
    </section>
  );
}
