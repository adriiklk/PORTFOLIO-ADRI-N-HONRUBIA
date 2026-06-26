import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Project } from '../types';
import { getPortfolioProjects } from '../data';
import IkeaSpotDetails from './IkeaSpotDetails';
import NapoliDetails from './NapoliDetails';
import ManaDetails from './ManaDetails';
import LaParaDetails from './LaParaDetails';
import { useLanguage } from '../LanguageContext';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onNavigateToProject: (id: string) => void;
}

export default function ProjectDetail({ project, onBack, onNavigateToProject }: ProjectDetailProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const { language } = useLanguage();

  const localizedProjects = getPortfolioProjects(language);

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setIsPlayingVideo(false);
  }, [project.id]);

  // Find next project index to suggest at the bottom
  const currentIndex = localizedProjects.findIndex((p) => p.id === project.id);
  const nextProject = localizedProjects[(currentIndex + 1) % localizedProjects.length];

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#0A0A0A] text-white min-h-screen pt-24 pb-32 select-none"
    >
      {/* 1. Immersive Cover Header */}
      <div className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden bg-black flex items-end">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.5] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
        </div>

        {/* Back Button and Title Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 flex flex-col justify-end">
          <button
            onClick={onBack}
            className="self-start inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#FFF]/60 hover:text-accent transition-colors mb-8 group"
            data-cursor="hover"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>{language === 'es' ? 'VOLVER AL INICIO' : 'BACK TO GALLERY'}</span>
          </button>

          <span className="text-accent text-xs font-mono tracking-[0.3em] uppercase mb-2">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-7xl font-serif font-light tracking-tight leading-none text-white max-w-4xl">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Cinematic Video Overlay Modal */}
      <AnimatePresence>
        {isPlayingVideo && project.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsPlayingVideo(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 cursor-pointer bg-neutral-900/50 hover:bg-neutral-800/80 rounded-full border border-neutral-850"
              aria-label="Close video player"
            >
              <X size={24} />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="w-full max-w-5xl aspect-video rounded-sm overflow-hidden bg-neutral-950 border border-neutral-900 shadow-2xl relative"
            >
              <video
                src={project.video}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {project.id === 'ikea-spot' ? (
        <IkeaSpotDetails project={project} />
      ) : project.id === 'aura-studios' ? (
        <NapoliDetails project={project} />
      ) : project.id === 'nocturnal-drift' ? (
        <ManaDetails project={project} />
      ) : project.id === 'vague-magazine' ? (
        <LaParaDetails project={project} />
      ) : (
        <>
          {/* fallback details if any other project is ever added */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-neutral-900 pb-16">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
                {language === 'es' ? 'RESUMEN DEL CONCEPTO' : 'CONCEPT OVERVIEW'}
              </h2>
              <p className="text-xl md:text-2xl font-serif font-light text-neutral-200 leading-relaxed italic">
                &ldquo;{project.description}&rdquo;
              </p>
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div className="lg:col-span-4 bg-neutral-950 p-6 md:p-8 border border-neutral-900 rounded-sm">
              <h3 className="text-xs font-mono tracking-widest text-accent uppercase border-b border-neutral-900 pb-3 mb-4">
                {language === 'es' ? 'ESPECIFICACIONES DEL PROYECTO' : 'PROJECT SPECIFICATION'}
              </h3>
              <dl className="space-y-4 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-neutral-900/40">
                  <dt className="text-neutral-500 uppercase">{language === 'es' ? 'CLIENTE' : 'CLIENT'}</dt>
                  <dd className="text-white font-medium text-right uppercase">{project.client}</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-900/40">
                  <dt className="text-neutral-500 uppercase">{language === 'es' ? 'AÑO' : 'YEAR'}</dt>
                  <dd className="text-white font-medium text-right">{project.year}</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-900/40">
                  <dt className="text-neutral-500 uppercase">{language === 'es' ? 'ROL' : 'ROLE'}</dt>
                  <dd className="text-white font-medium text-right uppercase">{project.role}</dd>
                </div>
              </dl>
            </div>
          </div>
        </>
      )}

      {/* 5. Next Project Teaser Gateway */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 border-t border-neutral-900 pt-16">
        <button
          onClick={() => onNavigateToProject(nextProject.id)}
          className="w-full block group text-left relative"
          data-cursor="hover"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-accent uppercase">
                {language === 'es' ? 'SIGUIENTE EN LA GALERÍA' : 'UP NEXT IN LINE'}
              </span>
              <h4 className="text-3xl md:text-5xl font-serif font-light text-neutral-400 group-hover:text-white transition-colors duration-500 mt-2">
                {nextProject.title}
              </h4>
            </div>
            
            <div className="inline-flex items-center gap-3 text-neutral-500 group-hover:text-accent transition-colors duration-500 self-end sm:self-center font-mono text-xs tracking-widest">
              <span>{language === 'es' ? 'EXPLORAR PROYECTO' : 'EXPLORE DIRECTORY'}</span>
              <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform duration-500" />
            </div>
          </div>
        </button>
      </div>
    </motion.article>
  );
}
