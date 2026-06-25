import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
}

export default function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  return (
    <section id="work" className="relative w-full py-24 md:py-32 bg-[#0A0A0A] text-white select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="flex flex-col">
            <span className="text-xs font-mono tracking-[0.3em] text-accent uppercase mb-2">
              02 / WORK
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white">
              Selected Projects
            </h2>
          </div>
          <div className="max-w-md text-neutral-400 font-light text-xs md:text-sm leading-relaxed font-sans">
            A selection of my most notable work, where design, creativity, and storytelling come together to create meaningful visual experiences.
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
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-950 border border-neutral-900 clip-path-inset relative">
                  {/* Hover dark blend overlays */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                  
                  {/* Image specimens tag with no-referrer policy */}
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />

                  {/* Top corners tag overlays */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-black">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>

                  {/* Corner aesthetic details */}
                  <div className="absolute bottom-4 left-4 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[9px] font-mono tracking-widest text-[#FFF]/80 bg-black/60 px-2 py-1 border border-neutral-800 backdrop-blur-sm rounded-sm uppercase">
                      OPEN PORTFOLIO
                    </span>
                  </div>
                </div>

                {/* Spec Sheets Details */}
                <div className="mt-6 flex justify-between items-baseline border-b border-neutral-900 pb-4 filter brightness-[0.9] group-hover:brightness-[1.1] transition-all">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1 font-mono text-[9px] text-neutral-400">
                    <span className="text-accent">{project.year}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
