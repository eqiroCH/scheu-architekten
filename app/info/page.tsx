export default function InfoPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-20 md:space-y-24 animate-fade-in">
      {/* Büro */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1]">Scheu Architekten</h1>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4 text-[15px] md:text-base">
          <p className="max-w-2xl">
            Scheu Architekten GmbH ist ein Architekturbüro in Zürich, gegründet 2017 von Beat Scheu.
            Wir beschäftigen uns mit Bauaufgaben unterschiedlicher Massstäbe, vom Umbau im Bestand bis zum Neubau.
          </p>
          <p className="max-w-2xl">
            Unsere Architektur sucht nach spezifischen Lösungen für jeden Ort und jede Aufgabe. 
            Dabei legen wir Wert auf eine sorgfältige Materialisierung und detailgerechte Ausführung.
          </p>
        </div>
      </section>

      {/* Beat Scheu - Timeline Design */}
      <section className="space-y-8">
        <div className="flex items-baseline gap-4">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">Beat Scheu</h2>
          <span className="text-sm text-gray-400 uppercase tracking-wider">Gründer</span>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[60px] md:left-[80px] top-0 bottom-0 w-px bg-gray-200"></div>
          
          <div className="space-y-6">
            {[
              { year: '2017', text: 'Gründung Scheu Architekten GmbH in Zürich' },
              { year: '2010-2017', text: 'Mitarbeit bei Armon Semadeni Architekten GmbH BSA SIA in Zürich' },
              { year: '2006-2010', text: 'Mitarbeit bei Boltshauser Architekten AG BSA SIA in Zürich' },
              { year: '2004-2006', text: 'Mitarbeit bei Archstudio 11 in Chur' },
              { year: '2003-2007', text: 'Architekturstudium an der HTW Chur' },
              { year: '2000-2004', text: 'Möbelschreiner in Klosters und Haldenstein' },
              { year: '1980', text: 'geboren in Davos' },
            ].map((item, index) => (
              <div key={index} className="relative flex gap-6 md:gap-8 group">
                <div className="flex-shrink-0 w-[60px] md:w-[80px] flex justify-end">
                  <div className="relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white border-2 border-gray-400 rounded-full group-hover:border-black transition-colors z-10"></div>
                    <span className="text-xs text-gray-400 font-light pr-4">{item.year}</span>
                  </div>
                </div>
                <div className="flex-1 pt-1 pb-4">
                  <p className="text-sm md:text-base text-gray-700 group-hover:text-gray-900 transition-colors">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - Grid Layout */}
      <section id="team" className="space-y-8 scroll-mt-24">
        <div>
          <h2 className="text-3xl md:text-4xl font-light mb-2 tracking-tight">Team</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Beat Scheu', title: 'Gründer', role: 'Dipl. Architekt FH' },
            { name: 'Christina Sulzer', title: null, role: 'Dipl. Architektin ETH' },
            { name: 'Kaltrina Shala', title: null, role: 'in Ausbildung zur Dipl. Technikerin HF / Zeichnerin EFZ' },
            { name: 'Lisa Colombo', title: null, role: 'Dipl. Architektin TU' },
            { name: 'Felix Simons', title: null, role: 'Dipl. Ing. TU' },
          ].map((member, index) => (
            <div key={index} className="space-y-1 pb-6 border-b border-gray-100 hover:border-gray-200 transition-colors group">
              <div className="flex items-baseline gap-2">
                <p className="font-medium text-gray-900 text-base group-hover:text-black transition-colors">{member.name}</p>
                {member.title && (
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{member.title}</span>
                )}
              </div>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-sm font-light mb-4 text-gray-400 uppercase tracking-wider">Ehemalige</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-500">
            <p>Ivana Milojevic, Dipl. Architektin ETH</p>
            <p>Leonid Alimi, Zeichner EFZ</p>
            <p>Lars Tietz, Zeichner EFZ</p>
          </div>
        </div>
      </section>

      {/* Projektliste - Kompakter */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Projektliste</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {[
            'Erweiterung und Sanierung Gymnasium Thun, in Zusammenarbeit mit Stirnemann Architekten GmbH BSA SIA SWB, 2020-2027',
            'Sanierung Haus Im Boden in Klosters-Monbiel, 2022-2023',
            'Schulhausprovisorium Kantonsschule Wiedikon in Zürich, 2022',
            'Umnutzung Stall zu Wohnung in Birmensdorf, 2022-2024',
            'Neubau Haus am Hang in Klosters, 2019-2022',
            'Studie Neubau MFH in Birmensdorf, 2021',
            'Büroumbau Frauenzentrale in Zürich, 2020-2021',
            'Sanierung WC-Anlagen Kantonsschule Rämibühl in Zürich, 2020-2021',
            'Studie Sanierung MFH in Davos, 2020-2021',
            'Umbau EFH in Wallisellen, 2019-2020',
            'Planerwahl im selektiven Verfahren, Rahmenvereinbarung für Baudenkmäler des Kantons Zürich, 2019',
            'Studie Sanierung MFH in Baden, in Zusammenarbeit mit Stirnemann Architekten GmbH BSA SIA SWB, 2019',
            'Studie Erweiterung TCS Campingplatz in St. Moritz, 2018',
            'Studie Umbau und Aufstockung Baumeisterhaus in Zürich, 2018',
            'Planerwahl Umbau Schulhaus in Zürich, 2018',
            'Umbau Haus Garcia in Meisterschwanden, 2017-2019',
          ].map((project, index) => (
            <div 
              key={index}
              className="py-3 border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 -mx-2 px-2 rounded text-gray-600 hover:text-gray-900"
            >
              {project}
            </div>
          ))}
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="space-y-6 scroll-mt-24">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Kontakt</h2>
        <address className="not-italic text-gray-700 leading-relaxed space-y-3">
          <p className="font-medium text-gray-900 text-base">Scheu Architekten GmbH</p>
          <div className="space-y-1 text-sm">
            <p>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Räffelstrasse+11,+8045+Zürich" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black underline decoration-gray-300 hover:decoration-black transition-all duration-300"
              >
                Räffelstrasse 11
              </a>
            </p>
            <p>8045 Zürich</p>
          </div>
          <div className="pt-4 space-y-2 text-sm">
            <p>
              <a href="mailto:info@scheuarchitekten.ch" className="hover:text-black underline decoration-gray-300 hover:decoration-black transition-all duration-300">
                info@scheuarchitekten.ch
              </a>
            </p>
            <p>
              <a href="tel:+41445528890" className="hover:text-black transition-colors duration-300">
                +41 44 552 88 90
              </a>
            </p>
          </div>
        </address>
      </section>

      {/* Bildnachweis */}
      <section className="pt-8 border-t border-gray-100 space-y-4">
        <h3 className="text-xs font-light text-gray-400 uppercase tracking-wider">Bildnachweis</h3>
        <div className="text-xs text-gray-500 space-y-2 leading-relaxed">
          <p>Roman Keller: Neubau Haus am Hang in Klosters, Büroumbau Frauenzentrale in Zürich, Umbau Haus Garcia in Meisterschwanden</p>
          <p>Studio Gataric Fotografie: Haus Im Boden</p>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Vermietung Haus Im Boden</p>
          <p className="text-xs text-gray-500">Stiftung Ferien im Baudenkmal</p>
        </div>
      </section>
    </div>
  );
}
