import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Scheu Architekten, Architekturbüro in Zürich';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Querformatiges Teilen-Bild: Papierfeld mit Wortmarke, rechts Haus Im Boden */
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), 'public/images/haus-im-boden.jpg'));
  const src = `data:image/jpeg;base64,${photo.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#efece6' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 560, padding: 56 }}>
          <div style={{ fontSize: 20, letterSpacing: 2, textTransform: 'uppercase', color: '#66625b' }}>Zürich, seit 2017</div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, lineHeight: 0.9, letterSpacing: -4, color: '#121212', fontWeight: 600 }}>
            <span>Scheu</span>
            <span>Architekten</span>
          </div>
        </div>
        <img src={src} alt="" width={640} height={630} style={{ objectFit: 'cover', width: 640, height: 630 }} />
      </div>
    ),
    size,
  );
}
