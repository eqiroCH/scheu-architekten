import Link from 'next/link';
import { contact } from '@/lib/site';

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-ink text-paper" aria-labelledby="kontakt-titel">
      <div className="wrap pb-8 pt-20 md:pt-28">
        <h2 id="kontakt-titel" className="display text-heading">
          Kontakt
        </h2>
        <a href={`mailto:${contact.email}`} className="link-line mt-6 inline-block text-lead font-medium">
          {contact.email}
        </a>

        <div className="mt-14 grid gap-x-8 gap-y-6 border-t border-paper/20 pt-6 sm:grid-cols-2 md:mt-20 md:grid-cols-4">
          <address className="not-italic">
            {contact.company}
            <br />
            <a href={contact.maps} target="_blank" rel="noopener noreferrer" className="link-line">
              {contact.street}, {contact.city}
              <span className="sr-only"> (Karte in neuem Tab)</span>
            </a>
          </address>
          <p>
            <a href={contact.phoneHref} className="link-line inline-block py-1">
              {contact.phone}
            </a>
          </p>
          <nav className="flex flex-col items-start md:col-start-4" aria-label="Fussnavigation">
            <Link href="/buero#stellen" className="link-line">
              Stellen
            </Link>
            <Link href="/impressum" className="link-line">
              Impressum
            </Link>
          </nav>
        </div>

        <p className="mt-16 text-small text-paper/65">© {new Date().getFullYear()} {contact.company}</p>
      </div>
    </footer>
  );
}
