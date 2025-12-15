'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Lightbox Component
function Lightbox({ 
  src, 
  alt, 
  onClose, 
  onNext, 
  onPrevious, 
  hasNext, 
  hasPrevious,
  allImages,
  currentIndex,
  onImageSelect
}: { 
  src: string; 
  alt: string; 
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  allImages: string[];
  currentIndex: number;
  onImageSelect: (index: number) => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrevious) onPrevious();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrevious, hasNext, hasPrevious]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-6 px-4 py-8 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors text-3xl font-light z-20 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
        aria-label="Schließen"
      >
        ×
      </button>
      
      <div className="relative max-w-[90vw] w-full flex flex-col items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
        {/* Image Container - zentriert */}
        <div className="relative max-w-[85vw] max-h-[75vh] flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            width={1400}
            height={1000}
            className="object-contain w-auto h-auto max-w-full max-h-[75vh]"
            sizes="85vw"
          />
          
          {/* Previous Button - direkt links am Bild */}
          {hasPrevious && (
            <button
              onClick={onPrevious}
              className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 text-black hover:text-gray-600 transition-colors text-5xl md:text-6xl font-light z-10"
              aria-label="Vorheriges Bild"
            >
              ‹
            </button>
          )}
          
          {/* Next Button - direkt rechts am Bild */}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 text-black hover:text-gray-600 transition-colors text-5xl md:text-6xl font-light z-10"
              aria-label="Nächstes Bild"
            >
              ›
            </button>
          )}
        </div>
        
        {/* Thumbnail Gallery unter dem Bild */}
        {allImages.length > 1 && (
          <div className="flex gap-2 justify-center overflow-x-auto pb-2 max-w-full">
            {allImages.map((imgSrc, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onImageSelect(index);
                }}
                className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-black opacity-100' 
                    : 'border-gray-300 opacity-60 hover:opacity-80'
                }`}
                aria-label={`Bild ${index + 1} anzeigen`}
              >
                <Image
                  src={imgSrc}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectPage({ params }: PageProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [projectId, setProjectId] = useState<string>('');
  
  useEffect(() => {
    params.then(({ id }) => setProjectId(id));
  }, [params]);
  
  const projects: Record<string, { 
    title: string; 
    location: string;
    year: string;
    mainImage: string; 
    gallery: string[];
    collaboration?: string;
  }> = {
    'haus-im-boden': {
      title: 'Sanierung Haus Im Boden',
      location: 'Klosters-Monbiel',
      year: '2022-2023',
      mainImage: '/images/haus-im-boden.jpg',
      gallery: [
        '/images/haus-im-boden-plan-eg.jpg',
        '/images/haus-im-boden-plan-og.jpg',
        '/images/haus-im-boden-plan-dg.jpg',
      ]
    },
    'gymnasium-thun': {
      title: 'Erweiterung und Sanierung Gymnasium Thun',
      location: 'Thun',
      year: '2020-2027',
      mainImage: '/images/gymnasium-thun.jpg',
      collaboration: 'in Zusammenarbeit mit Stirnemann Architekten GmbH BSA SIA SWB',
      gallery: [
        '/images/gymnasium-thun-plan-1.jpg',
        '/images/gymnasium-thun-plan-eg.jpg',
      ]
    },
    'haus-am-hang': {
      title: 'Neubau Haus am Hang',
      location: 'Klosters',
      year: '2019-2022',
      mainImage: '/images/haus-am-hang.jpg',
      gallery: [
        '/images/haus-am-hang-schnitt.jpg',
        '/images/haus-am-hang-plan-2og.jpg',
        '/images/haus-am-hang-plan-dg.jpg',
      ]
    },
    'haus-garcia': {
      title: 'Umbau Haus Garcia',
      location: 'Meisterschwanden',
      year: '2017-2019',
      mainImage: '/images/haus-garcia.jpg',
      gallery: []
    },
    'frauenzentrale': {
      title: 'Büroumbau Frauenzentrale',
      location: 'Zürich',
      year: '2020-2021',
      mainImage: '/images/frauenzentrale.jpg',
      gallery: []
    }
  };

  if (!projectId) return null;

  const project = projects[projectId] || projects['haus-im-boden'];
  const { title, location, year, mainImage, gallery, collaboration } = project;

  const openLightbox = (src: string, alt: string, index: number) => {
    setLightboxImage(src);
    setLightboxAlt(alt);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxAlt('');
    setCurrentImageIndex(0);
  };

  const goToNext = () => {
    if (project && gallery.length > 0 && currentImageIndex < gallery.length - 1) {
      const nextIndex = currentImageIndex + 1;
      goToImage(nextIndex);
    }
  };

  const goToPrevious = () => {
    if (project && gallery.length > 0 && currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      goToImage(prevIndex);
    }
  };

  const goToImage = (index: number) => {
    if (project && gallery.length > 0 && index >= 0 && index < gallery.length) {
      setCurrentImageIndex(index);
      setLightboxImage(gallery[index]);
      setLightboxAlt(`${project.title} Plan ${index + 1}`);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto animate-fade-in">
        <div className="mb-6">
          <Link href="/" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors duration-300 inline-flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
            <span>Zurück zur Übersicht</span>
          </Link>
        </div>

        <header className="mb-8 md:mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light mb-3 tracking-tight leading-[1.05]">{title}</h1>
          <div className="space-y-1">
            <div className="flex items-baseline gap-3 text-xs text-gray-400 uppercase tracking-wider font-light">
              <span>{location}</span>
              <span className="text-gray-300">/</span>
              <span>{year}</span>
            </div>
            {collaboration && (
              <p className="text-xs text-gray-400 italic mt-1 leading-relaxed max-w-2xl">
                {collaboration}
              </p>
            )}
          </div>
        </header>

        <div className="space-y-12 md:space-y-16">
          {/* Hauptbild */}
          <div className="relative aspect-[21/9] w-full bg-gray-50 overflow-hidden">
             <Image
              src={mainImage}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-8">
              <h3 className="text-lg md:text-xl font-light mb-4 tracking-tight">Projektbeschrieb</h3>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-3 text-sm">
                <p>
                  Hier steht der ausführliche Projektbeschrieb. Er erläutert das Konzept, 
                  die städtebauliche Setzung und die architektonische Ausformulierung.
                  Die Architektur besticht durch Klarheit und Präzision im Detail.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-4 space-y-4 text-xs md:text-sm">
               <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                 <span className="font-light text-gray-500">Bauherrschaft</span>
                 <span className="text-gray-700">Private Bauherrschaft</span>
               </div>
               <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                 <span className="font-light text-gray-500">Architektur</span>
                 <span className="text-gray-700">Scheu Architekten</span>
               </div>
               <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                 <span className="font-light text-gray-500">Bauleitung</span>
                 <span className="text-gray-700">Partnerfirma AG</span>
               </div>
               <div className="grid grid-cols-2 gap-4 py-3">
                 <span className="font-light text-gray-500">Fertigstellung</span>
                 <span className="text-gray-700">{year.split('-')[1] || year}</span>
               </div>
            </div>
          </div>

          {/* Galerie / Pläne - Thumbnail Grid */}
          {gallery.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-light tracking-tight">Pläne und Details</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {gallery.map((imgSrc, index) => (
                  <button
                    key={index}
                    onClick={() => openLightbox(imgSrc, `${title} Plan ${index + 1}`, index)}
                    className="relative flex-shrink-0 w-48 h-32 md:w-64 md:h-40 bg-gray-50 overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity duration-300 rounded-sm"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${title} Plan ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="256px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && project && (
        <Lightbox 
          src={lightboxImage} 
          alt={lightboxAlt} 
          onClose={closeLightbox}
          onNext={goToNext}
          onPrevious={goToPrevious}
          hasNext={currentImageIndex < gallery.length - 1}
          hasPrevious={currentImageIndex > 0}
          allImages={gallery}
          currentIndex={currentImageIndex}
          onImageSelect={goToImage}
        />
      )}
    </>
  );
}
