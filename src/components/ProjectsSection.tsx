import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  LayoutGrid, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../LanguageContext';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
}

type FilterCategory = 'all' | 'web-3d' | 'film' | 'branding';
type ViewMode = 'grid' | 'spotlight';

// Map project IDs to disciplinary categories
const getProjectDiscipline = (id: string): FilterCategory => {
  if (id === 'imaclinic' || id === 'los-santos-detailing' || id === 'el-bon-vermut') {
    return 'web-3d';
  }
  if (id === 'ikea-spot' || id === 'aura-studios') {
    return 'film';
  }
  return 'branding';
};

/* -------------------------------------------------------------------------- */
/*                        3D TILT INTERACTIVE CARD                            */
/* -------------------------------------------------------------------------- */
interface TiltCardProps {
  key?: string;
  project: Project;
  index: number;
  total: number;
  onSelect: (id: string) => void;
  language: 'en' | 'es';
}

function ProjectTiltCard({ project, index, total, onSelect, language }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt angles (max ~6 degrees for elegant physical feel)
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const formattedIndex = String(index + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col group select-none"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project.id)}
        data-cursor="project"
        style={{
          perspective: 1000,
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.018 : 1}, ${isHovered ? 1.018 : 1}, 1)`,
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.5s ease-out',
        }}
        className="cursor-pointer relative flex flex-col bg-white dark:bg-[#0D1013] border border-neutral-200 dark:border-neutral-850 hover:border-accent/60 dark:hover:border-accent/60 rounded-sm overflow-hidden shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(201,169,110,0.22)] transition-shadow duration-500"
      >
        {/* Top Browser / Archival Chrome Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/90 dark:bg-[#090C0E]/90 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-accent transition-colors duration-300" />
            <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="ml-2 font-medium tracking-wider text-accent">
              {formattedIndex} / {formattedTotal}
            </span>
          </div>
          <div className="flex items-center gap-2 tracking-widest uppercase">
            <span>{project.year}</span>
            <span>·</span>
            <span className="truncate max-w-[140px] sm:max-w-none">{project.client}</span>
          </div>
        </div>

        {/* Clean, Full-Fidelity Image Container (Zero Grayscale & Zero Dark Veil) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Subtle Corner Action Badge */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent text-black shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <ArrowUpRight size={16} />
            </span>
          </div>

          {/* Quick Category Overlay Tag */}
          <div className="absolute bottom-3 left-3 z-20 pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono tracking-widest uppercase text-white bg-black/75 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded-sm">
              {project.category}
            </span>
          </div>
        </div>

        {/* Card Body & Editorial Specifications */}
        <div className="p-6 md:p-7 flex flex-col justify-between flex-1 gap-4 bg-white dark:bg-[#0D1013]">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-serif font-light text-neutral-950 dark:text-white tracking-tight leading-snug group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Services Delivered Micro-List */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-850 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <div className="flex flex-wrap items-center gap-1.5 line-clamp-1">
              {project.services.slice(0, 3).map((service, i) => (
                <span key={service} className="inline-flex items-center">
                  <span>{service}</span>
                  {i < Math.min(project.services.length, 3) - 1 && (
                    <span className="text-accent ml-1.5">·</span>
                  )}
                </span>
              ))}
            </div>

            <div className="inline-flex items-center gap-1 text-accent font-medium group-hover:translate-x-1 transition-transform duration-300">
              <span>{language === 'es' ? 'Ver Caso' : 'Explore'}</span>
              <ArrowRight size={13} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                      SPOTLIGHT STAGE (CINEMATIC MODE)                      */
/* -------------------------------------------------------------------------- */
interface SpotlightStageProps {
  projects: Project[];
  activeId: string;
  onSelectActiveId: (id: string) => void;
  onOpenProject: (id: string) => void;
  language: 'en' | 'es';
}

function SpotlightStage({ projects, activeId, onSelectActiveId, onOpenProject, language }: SpotlightStageProps) {
  const activeIndex = Math.max(0, projects.findIndex((p) => p.id === activeId));
  const activeProject = projects[activeIndex] || projects[0];

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + projects.length) % projects.length;
    onSelectActiveId(projects[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % projects.length;
    onSelectActiveId(projects[nextIndex].id);
  };

  // Keyboard navigation for spotlight mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, projects]);

  if (!activeProject) return null;

  const formattedIndex = String(activeIndex + 1).padStart(2, '0');
  const formattedTotal = String(projects.length).padStart(2, '0');

  return (
    <div className="space-y-8 select-none">
      {/* Main Theatrical Stage Viewport */}
      <div className="relative rounded-sm overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl p-6 md:p-10 lg:p-12 text-white">
        {/* Subtle Ambient Backlight Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-0" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Showcase (Interactive Browser Frame) */}
          <div className="lg:col-span-7">
            <div 
              onClick={() => onOpenProject(activeProject.id)}
              data-cursor="project"
              className="group cursor-pointer relative rounded-sm overflow-hidden border border-neutral-800 bg-[#070A0D] shadow-2xl transition-all duration-500 hover:border-accent/70 hover:shadow-[0_20px_60px_-15px_rgba(201,169,110,0.3)]"
            >
              {/* Browser Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800/80 text-[11px] font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-accent text-xs">
                    {activeProject.id}.prototype
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-500 text-[10px]">
                  <span>100% DISPLAY</span>
                  <ExternalLink size={11} />
                </div>
              </div>

              {/* Clean Image View with Smooth AnimatePresence */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeProject.id}
                    src={activeProject.image}
                    alt={activeProject.title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover object-top filter brightness-[0.98] group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                </AnimatePresence>

                {/* Hover Invitation Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black font-mono text-xs font-semibold tracking-wider uppercase rounded-sm shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span>{language === 'es' ? 'ABRIR CASO DE ESTUDIO' : 'OPEN CASE STUDY'}</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Dossier & Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Index & Year Metadata */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-mono text-accent font-light">
                    {formattedIndex}
                  </span>
                  <span className="text-neutral-600 font-mono text-sm">/ {formattedTotal}</span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  <span className="text-accent font-medium">{activeProject.year}</span>
                  <span>·</span>
                  <span>{activeProject.client}</span>
                </div>
              </div>

              {/* Title & Category */}
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-[0.2em] text-accent uppercase font-medium block">
                  {activeProject.category}
                </span>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={activeProject.id + '-title'}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-white leading-tight tracking-tight"
                  >
                    {activeProject.title}
                  </motion.h3>
                </AnimatePresence>
              </div>

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeProject.id + '-desc'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-sm md:text-base text-neutral-400 font-light leading-relaxed"
                >
                  {activeProject.description}
                </motion.p>
              </AnimatePresence>

              {/* Core Deliverables Chips */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase block">
                  {language === 'es' ? 'SERVICIOS CLAVE' : 'KEY DELIVERABLES'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.services.slice(0, 4).map((service) => (
                    <span
                      key={service}
                      className="text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage Action Bar */}
            <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                onClick={() => onOpenProject(activeProject.id)}
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-accent hover:bg-accent/90 text-black font-mono text-xs font-semibold tracking-widest uppercase rounded-sm transition-all shadow-md group"
              >
                <span>{language === 'es' ? 'ENTRAR AL PROYECTO' : 'VIEW FULL PROJECT'}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Quick Prev / Next Navigator Buttons */}
              <div className="flex items-center justify-end gap-2 text-neutral-400">
                <button
                  onClick={handlePrev}
                  aria-label="Previous project"
                  className="w-10 h-10 rounded-sm bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-800 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next project"
                  className="w-10 h-10 rounded-sm bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-800 flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Filmstrip Rail (Jump to Any Project) */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-3 min-w-max">
          {projects.map((proj, idx) => {
            const isCurrent = proj.id === activeProject.id;
            return (
              <button
                key={proj.id}
                onClick={() => onSelectActiveId(proj.id)}
                className={`group relative flex items-center gap-3 p-2.5 rounded-sm border transition-all text-left ${
                  isCurrent
                    ? 'bg-neutral-900 dark:bg-neutral-900 border-accent text-white shadow-lg ring-1 ring-accent/30'
                    : 'bg-white dark:bg-[#0D1013] border-neutral-200 dark:border-neutral-850 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div className="w-14 h-10 rounded-sm overflow-hidden bg-neutral-950 flex-shrink-0 relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {isCurrent && (
                    <div className="absolute inset-0 bg-accent/20 border border-accent/40" />
                  )}
                </div>

                <div className="flex flex-col pr-3 max-w-[170px]">
                  <span className="text-[10px] font-mono text-accent font-medium tracking-wider">
                    {String(idx + 1).padStart(2, '0')} · {proj.year}
                  </span>
                  <span className="text-xs font-serif font-light truncate group-hover:text-accent transition-colors">
                    {proj.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
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
                title="Cuadrícula 3D interactiva"
              >
                <LayoutGrid size={13} />
                <span>{language === 'es' ? 'Retícula 3D' : '3D Grid'}</span>
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

        {/* Filter Segmented Control Tabs */}
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

        {/* Dynamic Presentation Body (3D Tilt Grid OR Spotlight Stage) */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid-mode"
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
          ) : (
            <motion.div
              key="spotlight-mode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <SpotlightStage
                projects={filteredProjects}
                activeId={spotlightActiveId}
                onSelectActiveId={setSpotlightActiveId}
                onOpenProject={onSelectProject}
                language={language}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
