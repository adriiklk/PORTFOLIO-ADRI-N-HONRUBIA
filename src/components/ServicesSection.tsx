import { motion } from 'motion/react';
import { Service } from '../types';
import { PenTool, Target, Layers, Video, Clapperboard, Cpu } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ServicesSectionProps {
  services: Service[];
}

// Map service id to corresponding icons for visual polish
const getServiceIcon = (id: string, size?: number) => {
  const finalSize = size || 20;
  switch (id) {
    case 'graphic-design':
      return <PenTool size={finalSize} className="text-accent" />;
    case 'branding':
      return <Target size={finalSize} className="text-accent" />;
    case 'social-content':
      return <Layers size={finalSize} className="text-accent" />;
    case 'filmmaking':
      return <Video size={finalSize} className="text-accent" />;
    case 'video-editing':
      return <Clapperboard size={finalSize} className="text-accent" />;
    case 'ia':
      return <Cpu size={finalSize} className="text-accent" />;
    default:
      return <PenTool size={finalSize} className="text-accent" />;
  }
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  const { language } = useLanguage();

  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-[#080808] text-white select-none scroll-mt-20">
      {/* Absolute background accent lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Title Header */}
        <div className="flex flex-col mb-16 md:mb-24">
          <span className="text-xs font-mono tracking-[0.3em] text-accent uppercase mb-2">
            {language === 'es' ? '03 / CAPACIDADES' : '03 / CAPABILITIES'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white">
            {language === 'es' ? 'Servicios y Oficio' : 'Services & Craft'}
          </h2>
        </div>

        {/* Minimalist Grid of Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeOut' }}
              key={service.id}
              className="group bg-neutral-950/60 hover:bg-neutral-950 p-8 border border-neutral-900 hover:border-accent/40 transition-all duration-500 rounded-sm flex flex-col justify-between min-h-[300px]"
              data-cursor="hover"
            >
              <div>
                {/* Icon & Title spec sheet header */}
                <div className="mb-8">
                  {getServiceIcon(service.id, 22)}
                </div>

                {/* Service Heading titles */}
                <h3 className="text-xl md:text-2xl font-serif font-light text-white group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Narrative core description */}
                <p className="text-neutral-400 text-xs md:text-sm font-light mt-4 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Sub-item specific bullet matrices */}
              <div className="mt-8 pt-6 border-t border-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {service.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-[10px] font-mono text-neutral-400 flex items-center gap-1.5 truncate">
                      <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
