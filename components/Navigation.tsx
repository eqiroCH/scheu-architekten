import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-16 md:py-8 bg-white/90 backdrop-blur-lg transition-all duration-500 border-b border-gray-100/50">
      <div className="text-base md:text-lg font-semibold tracking-tight uppercase letter-spacing-tight hover:opacity-60 transition-opacity duration-300">
        <Link href="/">Scheu Architekten</Link>
      </div>
      <div className="flex gap-10 md:gap-16 text-[11px] md:text-xs font-light text-gray-400 uppercase tracking-[0.15em]">
        <Link href="/" className="hover:text-black transition-colors duration-300 relative group">
          <span className="relative z-10">Projekte</span>
          <span className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="/info" className="hover:text-black transition-colors duration-300 relative group">
          <span className="relative z-10">Info</span>
          <span className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="/info#team" className="hover:text-black transition-colors duration-300 relative group">
          <span className="relative z-10">Team</span>
          <span className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="/info#kontakt" className="hover:text-black transition-colors duration-300 relative group">
          <span className="relative z-10">Kontakt</span>
          <span className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
    </nav>
  );
}
