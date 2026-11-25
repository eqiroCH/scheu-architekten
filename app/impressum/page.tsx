import type { Metadata } from 'next';
import { projects } from '@/lib/projects';
import { contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Impressum',
  alternates: { canonical: '/impressum' },
};

const sections = [
  {
    title: 'Haftung für Inhalte',
    text: 'Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
  },
  {
    title: 'Haftung für Links',
    text: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
  },
  {
    title: 'Urheberrecht',
    text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
  },
  {
    title: 'Datenschutz',
    text: 'Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.',
  },
];

/** Bildnachweis direkt aus den Projektdaten: Fotograf/in → Projekte */
const credits = Object.entries(
  projects.reduce<Record<string, string[]>>((acc, p) => {
    if (p.photography) (acc[p.photography] ??= []).push(`${p.title}, ${p.location}`);
    return acc;
  }, {}),
);

export default function ImpressumPage() {
  return (
    <section className="wrap pb-20 pt-12 md:pb-32 md:pt-20">
      <h1 className="display text-heading">Impressum</h1>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-3">
          <h2 className="mb-2 text-small text-stone">Firma</h2>
          <address className="not-italic">
            {contact.company}
            <br />
            {contact.street}
            <br />
            {contact.city}
            <br />
            Schweiz
          </address>
        </div>
        <div className="md:col-span-3">
          <h2 className="mb-2 text-small text-stone">Kontakt</h2>
          <a href={`mailto:${contact.email}`} className="link-line">
            {contact.email}
          </a>
          <br />
          <a href={contact.phoneHref} className="link-line">
            {contact.phone}
          </a>
        </div>
        <div className="md:col-span-3">
          <h2 className="mb-2 text-small text-stone">Geschäftsführung</h2>
          <p>Beat Scheu, Dipl. Architekt FH</p>
        </div>
      </div>

      <div className="mt-16 border-t border-ink md:mt-24">
        {sections.map((s) => (
          <div key={s.title} className="grid gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-12">
            <h2 className="font-medium md:col-span-3">{s.title}</h2>
            <p className="max-w-[65ch] md:col-span-9">{s.text}</p>
          </div>
        ))}
        <div className="grid gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-12">
          <h2 className="font-medium md:col-span-3">Bildnachweis</h2>
          <dl className="space-y-3 md:col-span-9">
            {credits.map(([photographer, list]) => (
              <div key={photographer}>
                <dt>{photographer}</dt>
                <dd className="text-small text-stone">{list.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
