import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className="fixed top-0 right-0 z-50 flex flex-col items-end justify-start px-6 py-12 md:px-8 md:py-16 bg-white/90 backdrop-blur-lg transition-all duration-500 border-l border-gray-100/50 h-screen w-40 md:w-48">
      <div className="flex flex-col w-full">
        {/* Logo oben - direkt als Bild */}
        <div className="mb-8 md:mb-10">
          <Link href="/" className="block hover:opacity-60 transition-opacity duration-300">
            <Image
              src="/image-removebg-preview.png"
              alt="Scheu Architekten"
              width={300}
              height={150}
              className="h-auto w-full max-w-full"
              priority
            />
          </Link>
        </div>
        
        {/* Navigation Links - rechtsbündig */}
        <div className="flex flex-col items-end gap-10 md:gap-12 text-xs md:text-sm font-light text-gray-400 uppercase tracking-[0.15em]">
          <Link href="/" className="hover:text-black transition-colors duration-300 relative group text-right">
            <span className="relative z-10">Projekte</span>
            <span className="absolute right-0 bottom-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/info" className="hover:text-black transition-colors duration-300 relative group text-right">
            <span className="relative z-10">Info</span>
            <span className="absolute right-0 bottom-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/info#team" className="hover:text-black transition-colors duration-300 relative group text-right">
            <span className="relative z-10">Team</span>
            <span className="absolute right-0 bottom-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/info#kontakt" className="hover:text-black transition-colors duration-300 relative group text-right">
            <span className="relative z-10">Kontakt</span>
            <span className="absolute right-0 bottom-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
