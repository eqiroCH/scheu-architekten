export const siteUrl = 'https://scheuarchitekten.ch';

/** Gemeinsame Open-Graph-Angaben, damit Unterseiten Locale und Typ nicht verlieren */
export const baseOpenGraph = {
  siteName: 'Scheu Architekten',
  locale: 'de_CH',
  type: 'website' as const,
};

export const contact = {
  company: 'Scheu Architekten GmbH',
  street: 'Räffelstrasse 11',
  city: '8045 Zürich',
  email: 'info@scheuarchitekten.ch',
  phone: '+41 44 552 88 90',
  phoneHref: 'tel:+41445528890',
  maps: 'https://www.google.com/maps/search/?api=1&query=R%C3%A4ffelstrasse+11,+8045+Z%C3%BCrich',
};

/** Optimierte Bild-URL (JPEG/WebP, 1200 px) – für Teilen-Vorschauen statt der Originaldatei */
export const ogImage = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`;
