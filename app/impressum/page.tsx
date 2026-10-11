import type { Metadata } from 'next';
import { contact } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Impressum',
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

export default function ImpressumPage() {
  return (
    <section className="px-5 pt-36 pb-24 md:px-10 md:pt-48 md:pb-40">
      <h1 className="display text-[19vw] md:text-[12vw] -ml-[0.04em]">Impressum</h1>

      <div className="mt-16 md:mt-24 grid grid-cols-12 gap-x-4 gap-y-12 text-[15px] leading-relaxed">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow text-stone mb-3">Firma</p>
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
        <div className="col-span-6 md:col-span-3">
          <p className="eyebrow text-stone mb-3">Kontakt</p>
          <a href={`mailto:${contact.email}`} className="link-line">
            {contact.email}
          </a>
          <br />
          <a href={contact.phoneHref} className="link-line">
            {contact.phone}
          </a>
        </div>
        <div className="col-span-6 md:col-span-3">
          <p className="eyebrow text-stone mb-3">Geschäftsführung</p>
          <p>Beat Scheu, Dipl. Architekt FH</p>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-4 border-t border-ink">
          {sections.map((s) => (
            <div key={s.title} className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 border-b border-line py-6">
              <h2 className="font-medium">{s.title}</h2>
              <p className="md:col-span-2 text-ink/75">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
