export default function ImpressumPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-16 md:space-y-20 animate-fade-in">
      <section className="space-y-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1]">Impressum</h1>
        
        <div className="space-y-8 text-sm md:text-base text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl md:text-2xl font-light mb-4 tracking-tight text-gray-900">Firmenangaben</h2>
            <address className="not-italic space-y-2">
              <p className="font-medium text-gray-900">Scheu Architekten GmbH</p>
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
              <p>Schweiz</p>
            </address>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-light mb-4 tracking-tight text-gray-900">Kontakt</h2>
            <div className="space-y-2">
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
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-light mb-4 tracking-tight text-gray-900">Geschäftsführung</h2>
            <p>Beat Scheu, Dipl. Architekt FH</p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-light mb-4 tracking-tight text-gray-900">Haftungsausschluss</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Haftung für Inhalte</h3>
                <p className="text-sm text-gray-600">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Haftung für Links</h3>
                <p className="text-sm text-gray-600">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Urheberrecht</h3>
                <p className="text-sm text-gray-600">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-light mb-4 tracking-tight text-gray-900">Datenschutz</h2>
            <p className="text-sm text-gray-600">
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

