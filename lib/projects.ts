export type MediaKind = 'foto' | 'plan' | 'visualisierung' | 'modell';

export interface Media {
  src: string;
  width: number;
  height: number;
  caption: string;
  kind: MediaKind;
}

export interface Project {
  slug: string;
  title: string;
  /** Kurzform für grosse Typografie, z.B. "Haus am Hang" */
  short: string;
  typ: string;
  location: string;
  canton: string;
  years: string;
  status: 'realisiert' | 'in Ausführung';
  collaboration?: string;
  photography?: string;
  lead: string;
  text: string[];
  cover: Media;
  gallery: Media[];
}

export const projects: Project[] = [
  {
    slug: 'gymnasium-thun',
    title: 'Erweiterung und Sanierung Gymnasium Thun',
    short: 'Gymnasium Thun',
    typ: 'Erweiterung, Sanierung',
    location: 'Thun',
    canton: 'BE',
    years: '2020–2027',
    status: 'in Ausführung',
    collaboration: 'Stirnemann Architekten GmbH BSA SIA SWB',
    lead:
      'Die bestehende Schulanlage wird saniert und um neue Volumen ergänzt, die sich in die parkartige Umgebung zwischen den Bäumen einfügen.',
    text: [
      'Gemeinsam mit Stirnemann Architekten entwickeln wir die Erweiterung und Sanierung des Gymnasiums Thun. Neue und bestehende Bauten bilden ein zusammenhängendes Ensemble, dessen Aussenräume die Schule mit dem Quartier verbinden.',
      'Im Inneren entstehen grosszügige, lichte Räume für Unterricht und Aufenthalt – robust in der Materialisierung und präzise im Detail.',
    ],
    cover: { src: '/images/gymnasium-thun.jpg', width: 2000, height: 1360, caption: 'Modell', kind: 'modell' },
    gallery: [
      { src: '/images/gymnasium-thun-plan-1.jpg', width: 2811, height: 2536, caption: 'Situation, Erdgeschoss', kind: 'plan' },
      { src: '/images/gymnasium-thun-plan-eg.jpg', width: 2316, height: 1637, caption: 'Visualisierung Mensa', kind: 'visualisierung' },
    ],
  },
  {
    slug: 'haus-im-boden',
    title: 'Sanierung Haus Im Boden',
    short: 'Haus Im Boden',
    typ: 'Sanierung Baudenkmal',
    location: 'Klosters-Monbiel',
    canton: 'GR',
    years: '2022–2023',
    status: 'realisiert',
    photography: 'Studio Gataric Fotografie',
    lead:
      'Ein historisches Wohnhaus im Prättigau, sorgfältig saniert und heute als Ferienhaus der Stiftung Ferien im Baudenkmal zugänglich.',
    text: [
      'Das Haus Im Boden steht seit Generationen am Hang über Monbiel. Die Sanierung folgt dem Grundsatz, so viel wie möglich zu erhalten und so wenig wie nötig zu verändern.',
      'Neue Eingriffe ordnen sich der bestehenden Struktur unter, machen das Haus zeitgemäss bewohnbar und lassen seine Geschichte lesbar bleiben.',
    ],
    cover: { src: '/images/haus-im-boden.jpg', width: 1600, height: 1066, caption: 'Aussenansicht', kind: 'foto' },
    gallery: [
      { src: '/images/haus-im-boden-plan-eg.jpg', width: 2000, height: 2677, caption: 'Grundriss Erdgeschoss', kind: 'plan' },
      { src: '/images/haus-im-boden-plan-og.jpg', width: 2000, height: 2678, caption: 'Grundriss Obergeschoss', kind: 'plan' },
      { src: '/images/haus-im-boden-plan-dg.jpg', width: 2000, height: 2673, caption: 'Grundriss Dachgeschoss', kind: 'plan' },
    ],
  },
  {
    slug: 'haus-am-hang',
    title: 'Neubau Haus am Hang',
    short: 'Haus am Hang',
    typ: 'Neubau Wohnhaus',
    location: 'Klosters',
    canton: 'GR',
    years: '2019–2022',
    status: 'realisiert',
    photography: 'Roman Keller',
    lead:
      'Ein Wohnhaus, das sich in den steilen Hang schiebt: ein massiver Sockel aus Beton, darüber Räume in warmem Holz.',
    text: [
      'Die Topografie bestimmt den Schnitt. Eine Treppe führt vom Eingang im Sockel durch das Haus hinauf zu den Wohnräumen und dem Licht.',
      'Sichtbeton und Fichtenholz prägen die Innenräume – roh und warm zugleich, gefügt mit der Sorgfalt des Schreinerhandwerks.',
    ],
    cover: { src: '/images/haus-am-hang.jpg', width: 1800, height: 2250, caption: 'Eingang und Treppe', kind: 'foto' },
    gallery: [
      { src: '/images/haus-am-hang-schnitt.jpg', width: 1800, height: 1369, caption: 'Schnitt', kind: 'plan' },
      { src: '/images/haus-am-hang-plan-2og.jpg', width: 1800, height: 2105, caption: 'Grundriss 2. Obergeschoss', kind: 'plan' },
      { src: '/images/haus-am-hang-plan-dg.jpg', width: 1800, height: 2106, caption: 'Grundriss Dachgeschoss', kind: 'plan' },
    ],
  },
  {
    slug: 'frauenzentrale',
    title: 'Büroumbau Frauenzentrale',
    short: 'Frauenzentrale',
    typ: 'Umbau Büro',
    location: 'Zürich',
    canton: 'ZH',
    years: '2020–2021',
    status: 'realisiert',
    photography: 'Roman Keller',
    lead:
      'Neue Arbeitsräume für die Frauenzentrale Zürich – hell, ruhig und mit Möbeln, die aus dem Bestand heraus entwickelt sind.',
    text: [
      'Gezielte Eingriffe ordnen die bestehenden Räume neu. Eingebaute Möbel aus Holz besetzen die Stützen und schaffen Orte für Empfang, Austausch und konzentrierte Arbeit.',
    ],
    cover: { src: '/images/frauenzentrale.jpg', width: 1400, height: 1750, caption: 'Empfangsmöbel', kind: 'foto' },
    gallery: [],
  },
  {
    slug: 'haus-garcia',
    title: 'Umbau Haus Garcia',
    short: 'Haus Garcia',
    typ: 'Umbau Wohnhaus',
    location: 'Meisterschwanden',
    canton: 'AG',
    years: '2017–2019',
    status: 'realisiert',
    photography: 'Roman Keller',
    lead:
      'Der Umbau eines Wohnhauses am Hallwilersee – mit einer farbigen Treppe als neuem Rückgrat des Hauses.',
    text: [
      'Die bestehende Struktur bleibt sichtbar: Brettschalungsbeton, weiss gestrichen, trifft auf eine monolithische Treppe in mattem Grün.',
    ],
    cover: { src: '/images/haus-garcia.jpg', width: 1920, height: 2400, caption: 'Treppe', kind: 'foto' },
    gallery: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const kategorien = ['Umbau & Sanierung', 'Neubau', 'Studie', 'Verfahren'] as const;
export type Kategorie = (typeof kategorien)[number];

export interface Werk {
  title: string;
  location: string;
  years: string;
  kategorie: Kategorie;
  note?: string;
  slug?: string;
}

/** Vollständiges Werkverzeichnis, neueste zuerst */
export const werkverzeichnis: Werk[] = [
  { title: 'Erweiterung und Sanierung Gymnasium', location: 'Thun', years: '2020–2027', kategorie: 'Umbau & Sanierung', note: 'mit Stirnemann Architekten', slug: 'gymnasium-thun' },
  { title: 'Umnutzung Stall zu Wohnung', location: 'Birmensdorf', years: '2022–2024', kategorie: 'Umbau & Sanierung' },
  { title: 'Sanierung Haus Im Boden', location: 'Klosters-Monbiel', years: '2022–2023', kategorie: 'Umbau & Sanierung', slug: 'haus-im-boden' },
  { title: 'Schulhausprovisorium Kantonsschule Wiedikon', location: 'Zürich', years: '2022', kategorie: 'Neubau' },
  { title: 'Neubau Haus am Hang', location: 'Klosters', years: '2019–2022', kategorie: 'Neubau', slug: 'haus-am-hang' },
  { title: 'Studie Neubau MFH', location: 'Birmensdorf', years: '2021', kategorie: 'Studie' },
  { title: 'Büroumbau Frauenzentrale', location: 'Zürich', years: '2020–2021', kategorie: 'Umbau & Sanierung', slug: 'frauenzentrale' },
  { title: 'Sanierung WC-Anlagen Kantonsschule Rämibühl', location: 'Zürich', years: '2020–2021', kategorie: 'Umbau & Sanierung' },
  { title: 'Studie Sanierung MFH', location: 'Davos', years: '2020–2021', kategorie: 'Studie' },
  { title: 'Umbau EFH', location: 'Wallisellen', years: '2019–2020', kategorie: 'Umbau & Sanierung' },
  { title: 'Rahmenvereinbarung Baudenkmäler Kanton Zürich', location: 'Zürich', years: '2019', kategorie: 'Verfahren', note: 'Planerwahl im selektiven Verfahren' },
  { title: 'Studie Sanierung MFH', location: 'Baden', years: '2019', kategorie: 'Studie', note: 'mit Stirnemann Architekten' },
  { title: 'Studie Erweiterung TCS Campingplatz', location: 'St. Moritz', years: '2018', kategorie: 'Studie' },
  { title: 'Studie Umbau und Aufstockung Baumeisterhaus', location: 'Zürich', years: '2018', kategorie: 'Studie' },
  { title: 'Planerwahl Umbau Schulhaus', location: 'Zürich', years: '2018', kategorie: 'Verfahren' },
  { title: 'Umbau Haus Garcia', location: 'Meisterschwanden', years: '2017–2019', kategorie: 'Umbau & Sanierung', slug: 'haus-garcia' },
];

export const allPlans = projects.flatMap((p) =>
  p.gallery.filter((m) => m.kind === 'plan').map((m) => ({ ...m, project: p })),
);

export const contact = {
  company: 'Scheu Architekten GmbH',
  street: 'Räffelstrasse 11',
  city: '8045 Zürich',
  email: 'info@scheuarchitekten.ch',
  phone: '+41 44 552 88 90',
  phoneHref: 'tel:+41445528890',
  maps: 'https://www.google.com/maps/search/?api=1&query=R%C3%A4ffelstrasse+11,+8045+Z%C3%BCrich',
};
