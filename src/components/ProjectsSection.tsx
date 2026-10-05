import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import CircularCarousel from './CircularCarousel';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
}

export default function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const { language } = useLanguage();

  return (
    <section id="work" className="relative w-full py-24 md:py-32 bg-[#F9F9F7] dark:bg-[#0A0A0A] text-neutral-900 dark:text-white select-none scroll-mt-20 transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-mono tracking-[0.25em] text-accent uppercase mb-2 font-medium">
              {language === 'es' ? '02 / TRABAJO' : '02 / WORK'}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-neutral-900 dark:text-white">
              {language === 'es' ? 'Proyectos Seleccionados' : 'Selected Projects'}
            </h2>
          </div>
          <div className="max-w-md text-neutral-600 dark:text-neutral-400 font-light text-xs md:text-sm leading-relaxed font-sans">
            {language === 'es' 
              ? 'Una selección de mis trabajos más notables, donde el diseño, la creatividad y el storytelling se unen para crear experiencias visuales significativas.'
              : 'A selection of my most notable work, where design, creativity, and storytelling come together to create meaningful visual experiences.'}
          </div>
        </div>

        {/* Dynamic Offset Masonry Design Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => {
            // Give even projects an elegant structural offset on wider screens to mock custom hand-coded masonry layouts
            const isOffset = index % 2 === 1;

            return (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                whileHover={{ y: -6, scale: 1.012 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`flex flex-col cursor-pointer group select-none ${
                  isOffset ? 'md:mt-16' : ''
                }`}
                // Attach custom cursor trigger parameter to allow CustomCursor to display labels
                data-cursor="project"
              >
                {/* Image Showcase Container */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 group-hover:border-accent/60 dark:group-hover:border-accent/50 group-hover:shadow-[0_12px_36px_-8px_rgba(201,169,110,0.18)] transition-all duration-500 clip-path-inset relative shadow-sm dark:shadow-none rounded-sm">
                  {/* Hover dark blend overlays */}
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/30 group-hover:bg-transparent dark:group-hover:bg-black/10 transition-colors duration-500 z-10" />
                  
                  {/* Image specimens tag with no-referrer policy */}
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />

                  {/* Top corners tag overlays */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-black shadow-md">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>

                  {/* Corner aesthetic details */}
                  <div className="absolute bottom-4 left-4 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 image-badge" data-theme-keep="dark">
                    <span className="text-[11px] font-mono tracking-wider text-white bg-black/75 px-2.5 py-1 border border-white/15 backdrop-blur-sm rounded-sm uppercase font-medium shadow-md">
                      {language === 'es' ? 'VER PROYECTO' : 'OPEN PORTFOLIO'}
                    </span>
                  </div>
                </div>

                {/* Spec Sheets Details */}
                <div className="mt-6 flex justify-between items-baseline border-b border-neutral-200 dark:border-neutral-900 group-hover:border-accent/40 pb-4 filter brightness-[0.95] group-hover:brightness-100 transition-all duration-500">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-mono tracking-wider text-accent uppercase font-medium">
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-neutral-900 dark:text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1 font-mono text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
                    <span className="text-accent font-medium">{project.year}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
<<<<<<< Updated upstream
=======
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          MAIN PROJECTS SECTION                             */
/* -------------------------------------------------------------------------- */
export default function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const { language } = useLanguage();

  // Mode switcher: 'grid' (3D tilt cards) or 'spotlight' (theatrical cinematic stage)
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Discipline Filter
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Active project ID in Spotlight mode
  const [spotlightActiveId, setSpotlightActiveId] = useState<string>(
    projects[0]?.id || 'imaclinic'
  );

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => getProjectDiscipline(p.id) === activeFilter);
  }, [projects, activeFilter]);

  // Keep spotlight active id valid when filter changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const exists = filteredProjects.some((p) => p.id === spotlightActiveId);
      if (!exists) {
        setSpotlightActiveId(filteredProjects[0].id);
      }
    }
  }, [filteredProjects, spotlightActiveId]);

  // Discipline filter tabs configuration
  const filterTabs: { key: FilterCategory; labelEs: string; labelEn: string; count: number }[] = [
    { key: 'all', labelEs: 'Todos', labelEn: 'All Works', count: projects.length },
    {
      key: 'web-3d',
      labelEs: 'Web & 3D',
      labelEn: 'Web & 3D',
      count: projects.filter((p) => getProjectDiscipline(p.id) === 'web-3d').length,
    },
    {
      key: 'film',
      labelEs: 'Cine & Vídeo',
      labelEn: 'Film & Motion',
      count: projects.filter((p) => getProjectDiscipline(p.id) === 'film').length,
    },
    {
      key: 'branding',
      labelEs: 'Branding & Social',
      labelEn: 'Branding & Social',
      count: projects.filter((p) => getProjectDiscipline(p.id) === 'branding').length,
    },
  ];

  return (
    <section 
      id="work" 
      className="relative w-full py-24 md:py-32 bg-[#F9F9F7] dark:bg-[#0A0A0A] text-neutral-900 dark:text-white select-none scroll-mt-20 transition-colors duration-400"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs md:text-sm font-mono tracking-[0.25em] text-accent uppercase font-medium">
                {language === 'es' ? '02 / TRABAJO' : '02 / WORK'}
              </span>
              <div className="h-[1px] w-12 bg-accent/60" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light tracking-tight text-neutral-900 dark:text-white">
              {language === 'es' ? 'Proyectos Seleccionados' : 'Selected Projects'}
            </h2>

            <p className="max-w-xl text-neutral-600 dark:text-neutral-400 font-light text-xs md:text-sm leading-relaxed font-sans">
              {language === 'es' 
                ? 'Una colección curada de prototipos interactivos, modelado 3D, dirección cinematográfica y sistemas de identidad visual.'
                : 'A curated collection of interactive prototypes, bespoke 3D modeling, cinematic film direction, and visual identity systems.'}
            </p>
          </div>

          {/* Controls Cluster: Mode Switcher (Grid vs Spotlight) */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            <div className="inline-flex items-center p-1 bg-neutral-200/80 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-800 rounded-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-accent shadow-sm font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
                title={language === 'es' ? 'Carrusel circular' : 'Circular carousel'}
              >
                <LayoutGrid size={13} />
                <span>{language === 'es' ? 'Carrusel' : 'Carousel'}</span>
              </button>

              <button
                onClick={() => setViewMode('spotlight')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-all ${
                  viewMode === 'spotlight'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-accent shadow-sm font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
                title="Escenario Cinematográfico"
              >
                <Sparkles size={13} />
                <span>{language === 'es' ? 'Escenario' : 'Spotlight'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters apply only to Spotlight; the carousel always shows all projects. */}
        {viewMode === 'spotlight' && (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-900 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.key;
              const label = language === 'es' ? tab.labelEs : tab.labelEn;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors rounded-sm flex items-center gap-2 ${
                    isActive
                      ? 'text-neutral-950 dark:text-white font-medium bg-neutral-200/80 dark:bg-neutral-850'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  <span>{label}</span>
                  <span className={`text-[10px] ${isActive ? 'text-accent font-semibold' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    ({tab.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Counter Display */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>
              {language === 'es'
                ? `Mostrando ${filteredProjects.length} de ${projects.length} proyectos`
                : `Showing ${filteredProjects.length} of ${projects.length} projects`}
            </span>
          </div>
        </div>

        )}

        {/* Dynamic Presentation Body (Circular Carousel OR Spotlight Stage) */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="projects-carousel-stage"
            >
              {projects.length > 0 && (
                <CircularCarousel
                  items={projects.map(project => ({
                    id: project.id,
                    src: project.image,
                    alt: project.title,
                    title: project.title,
                    subtitle: project.category,
                  }))}
                  preset="cylinder"
                  intro="rise"
                  cardWidth={450}
                  aspectRatio={1.5}
                  speed={14}
                  captions
                  gap={34}
                  perspective={2200}
                  onItemClick={(item) => onSelectProject(item.id)}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="spotlight-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            >
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <ProjectTiltCard
                    key={project.id}
                    project={project}
                    index={index}
                    total={filteredProjects.length}
                    onSelect={onSelectProject}
                    language={language}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
>>>>>>> Stashed changes
    </section>
  );
}
