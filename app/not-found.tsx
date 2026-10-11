import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] grid-cols-12 gap-4 px-5 pt-36 pb-16 md:px-10">
      <div className="col-span-12 md:col-span-7 flex flex-col justify-end">
        <p className="eyebrow text-stone">Fehler 404</p>
        <h1 className="display mt-6 text-[24vw] md:text-[17vw]">404</h1>
        <p className="mt-8 font-serif text-[8vw] md:text-[3.4vw] leading-[1]">
          Dieser Raum ist <em className="text-accent">noch nicht gebaut.</em>
        </p>
        <Link href="/" className="group mt-10 inline-flex items-center gap-3 text-[17px]">
          <span className="link-line">Zurück zur Startseite</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1.5">→</span>
        </Link>
      </div>
      <div className="relative col-span-12 md:col-span-4 md:col-start-9 aspect-[3/4] self-end bg-[#f5f5f5]" aria-hidden>
        <Image src="/images/haus-am-hang-plan-dg.jpg" alt="" fill sizes="33vw" className="object-contain mix-blend-multiply opacity-80" />
      </div>
    </section>
  );
}
