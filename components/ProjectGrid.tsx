import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  imageUrl: string;
  collaboration?: string;
  yearEnd?: number;
  isCurrent?: boolean; // Explizit markieren, ob Projekt noch läuft
}

const projects: Project[] = [
  {
    id: 'gymnasium-thun',
    title: 'Erweiterung und Sanierung Gymnasium Thun',
    location: 'Thun',
    year: '2020-2027',
    yearEnd: 2027,
    isCurrent: true, // Läuft noch
    imageUrl: '/images/gymnasium-thun.jpg',
    collaboration: 'in Zusammenarbeit mit Stirnemann Architekten GmbH BSA SIA SWB',
  },
  {
    id: 'haus-im-boden',
    title: 'Sanierung Haus Im Boden',
    location: 'Klosters-Monbiel',
    year: '2022-2023',
    yearEnd: 2023,
    isCurrent: false, // Abgeschlossen
    imageUrl: '/images/haus-im-boden.jpg',
  },
  {
    id: 'haus-am-hang',
    title: 'Neubau Haus am Hang',
    location: 'Klosters',
    year: '2019-2022',
    yearEnd: 2022,
    isCurrent: false, // Abgeschlossen
    imageUrl: '/images/haus-am-hang.jpg',
  },
  {
    id: 'frauenzentrale',
    title: 'Büroumbau Frauenzentrale',
    location: 'Zürich',
    year: '2020-2021',
    yearEnd: 2021,
    isCurrent: false, // Abgeschlossen
    imageUrl: '/images/frauenzentrale.jpg',
  },
  {
    id: 'haus-garcia',
    title: 'Umbau Haus Garcia',
    location: 'Meisterschwanden',
    year: '2017-2019',
    yearEnd: 2019,
    isCurrent: false, // Abgeschlossen
    imageUrl: '/images/haus-garcia.jpg',
  },
];

// Trenne Projekte in aktuelle und abgeschlossene
const currentProjects = projects.filter(p => p.isCurrent).sort((a, b) => (b.yearEnd || 0) - (a.yearEnd || 0));
const completedProjects = projects.filter(p => !p.isCurrent).sort((a, b) => (b.yearEnd || 0) - (a.yearEnd || 0));

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link 
      key={project.id} 
      href={`/project/${project.id}`} 
      className="group block cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 mb-4 md:mb-5">
         <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-[0.98]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:via-black/5 group-hover:to-black/10 transition-all duration-700" />
      </div>
      <div className="space-y-2 md:space-y-2.5">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-light leading-tight text-gray-900 group-hover:text-gray-700 transition-colors duration-300 tracking-tight">
          {project.title}
        </h3>
        <div className="flex items-baseline gap-3 text-base md:text-lg text-gray-400 uppercase tracking-[0.1em] font-light">
          <span>{project.location}</span>
          <span className="text-gray-300">/</span>
          <span>{project.year}</span>
        </div>
        {project.collaboration && (
          <p className="text-sm md:text-base text-gray-400 italic mt-2 leading-relaxed max-w-md">
            {project.collaboration}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function ProjectGrid() {
  return (
    <div className="space-y-16 md:space-y-20">
      {/* Aktuelle Projekte */}
      {currentProjects.length > 0 && (
        <div>
          <div className="mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-2 text-gray-900">
              Aktuelle Projekte
            </h2>
            <p className="text-lg md:text-xl text-gray-500 uppercase tracking-wider">
              In Bearbeitung
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-x-16 md:gap-y-16">
            {currentProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Abgeschlossene Projekte */}
      {completedProjects.length > 0 && (
        <div>
          <div className="mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-2 text-gray-900">
              Abgeschlossene Projekte
            </h2>
            <p className="text-lg md:text-xl text-gray-500 uppercase tracking-wider">
              Realisiert
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-x-16 md:gap-y-16">
            {completedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
