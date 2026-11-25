# Scheu Architekten – Website

Next.js (App Router) mit Tailwind CSS 4. Wird bei jedem Push auf `main` automatisch über Netlify veröffentlicht; Pull Requests bekommen eine Vorschau-URL.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build prüfen
```

## Inhalte pflegen

Alle Inhalte stehen in zwei Dateien:

- `lib/projects.ts` – Projekte mit eigener Seite und das Werkverzeichnis
- `lib/site.ts` – Adresse, Telefon, E-Mail, Domain

### Neues Projekt mit eigener Seite

1. Titelbild nach `public/images/<slug>.jpg` legen (mind. 2400 px an der langen Seite).
   Pläne als PNG mit transparentem Hintergrund nach `public/plans/<slug>-….png`.
2. In `lib/projects.ts` einen Eintrag in `projects` ergänzen (Reihenfolge = Reihenfolge auf der Startseite;
   das erste Projekt erscheint gross über die ganze Breite).
3. Im `werkverzeichnis` an der richtigen Stelle `mitSeite('<slug>', '<Kategorie>')` einfügen –
   Titel, Ort und Jahre werden aus dem Projekt übernommen.

Raster, Projektseite, Sitemap und Bildnachweis (Impressum) passen sich automatisch an.

### Arbeit ohne eigene Seite

Nur eine Zeile im `werkverzeichnis` ergänzen (`title`, `location`, `years`, `kategorie`, optional `note`).

## Gestaltung

- Farben: Papier `#efece6`, Tusche `#121212`, Grau `#66625b`, Linie `#cfcac0`; Rot `#b8231c` nur für «In Ausführung».
- Schrift: Archivo (variable Breite). Sechs Grössen, definiert in `app/globals.css`:
  `text-label`, `text-small`, `text-body`, `text-lead`, `text-heading`, `text-display` (nur Wortmarke).
- Satzspiegel: Klasse `wrap` (max. 1680 px, Rand 20/40 px).
- Bewegung: nur ein sanftes Einblenden der Bilder (`components/Reveal.tsx`) und die Unterstreichung bei Hover.

Teilen-Bild (`app/opengraph-image.jpg`) und Favicon (`app/icon.png`, `app/apple-icon.png`) sind statische Dateien.
`public/image-removebg-preview.png` ist das ursprüngliche Logo des Büros (Referenz, wird nicht verwendet).
