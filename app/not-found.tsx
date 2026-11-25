import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="wrap grid items-end gap-y-12 pb-20 pt-12 md:grid-cols-12 md:gap-x-8 md:pb-32 md:pt-20">
      <div className="md:col-span-7">
        <p className="text-small text-stone">Fehler 404</p>
        <h1 className="display mt-4 text-heading text-balance">Dieser Raum ist noch nicht gebaut.</h1>
        <Link href="/" className="group mt-8 inline-flex items-center gap-3 font-medium">
          <span className="link-line">Zurück zur Startseite</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
      <div className="relative aspect-[3/4] w-2/3 md:col-span-4 md:col-start-9 md:w-full" aria-hidden>
        <Image src="/plans/haus-am-hang-plan-dg.png" alt="" fill sizes="(max-width: 768px) 66vw, 33vw" className="object-contain" />
      </div>
    </section>
  );
}
