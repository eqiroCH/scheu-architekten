import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 px-8 md:px-16 border-t border-gray-100/50 mt-auto">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xs font-light mb-6 text-gray-400 uppercase tracking-wider">Kontakt</h3>
            <address className="not-italic text-xs text-gray-500 space-y-2 leading-relaxed">
              <p className="font-medium text-gray-700">Scheu Architekten GmbH</p>
              <p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Räffelstrasse+11,+8045+Zürich" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors duration-300"
                >
                  Räffelstrasse 11
                </a>
              </p>
              <p>8045 Zürich</p>
              <div className="pt-3 space-y-1">
                <p>
                  <a href="mailto:info@scheuarchitekten.ch" className="hover:text-black transition-colors duration-300">
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
          </div>
          <div>
            <h3 className="text-xs font-light mb-6 text-gray-400 uppercase tracking-wider">Navigation</h3>
            <nav className="text-xs text-gray-500 space-y-3">
              <Link href="/" className="block hover:text-black transition-colors duration-300">Projekte</Link>
              <Link href="/info" className="block hover:text-black transition-colors duration-300">Info</Link>
            </nav>
          </div>
          <div>
            <h3 className="text-xs font-light mb-6 text-gray-400 uppercase tracking-wider">Rechtliches</h3>
            <div className="text-xs text-gray-500 space-y-3">
              <Link href="/impressum" className="block hover:text-black transition-colors duration-300">Impressum</Link>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100/50 text-[10px] text-gray-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Scheu Architekten GmbH
        </div>
      </div>
    </footer>
  );
}
