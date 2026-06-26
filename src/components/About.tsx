import { motion } from 'motion/react';
import { Palette, Film, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
// @ts-expect-error - Vite handles asset imports correctly
import portraitImage from '../assets/images/regenerated_image_1781695314841.jpg';

export default function About() {
  const { language } = useLanguage();

  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-[#0A0A0A] select-none text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Pre-Headers */}
        <div className="flex flex-col mb-12 md:mb-18">
          <span className="text-xs font-mono tracking-[0.3em] text-accent uppercase mb-2">
            {language === 'es' ? '01 / BIOGRAFÍA' : '01 / BIOGRAPHY'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight">
            {language === 'es' ? 'Sobre Mí' : 'About Me'}
          </h2>
        </div>

        {/* Two-Column split structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Premium Cinematic Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative group"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-900 border border-neutral-800/40 clip-path-inset relative">
              {/* Overlay styling for extra dramatic high luxury vibe */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-40" />
              <img
                src={portraitImage}
                alt="Adrián Honrubia portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0 filter brightness-[0.85]"
              />
              
              {/* Gold corners to reinforce premium brand look */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-accent/40 pointer-events-none z-20" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-accent/40 pointer-events-none z-20" />
            </div>

            {/* Float Badge caption */}
            <div className="absolute bottom-6 left-6 z-20 hidden sm:block">
              <span className="text-[10px] font-mono tracking-widest text-[#FFF]/80 bg-[#0E0E0E]/90 px-3 py-1.5 border border-neutral-800 backdrop-blur-sm rounded-sm">
                ADRIÁN HONRUBIA
              </span>
            </div>
          </motion.div>

          {/* Right Column: Premium Text presentation & Experience Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            {/* Presentation Storytelling */}
            <div className="space-y-6">
              {language === 'es' ? (
                <>
                  <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                    Soy Adrián Honrubia, un diseñador gráfico y filmmaker afincado en Barcelona apasionado por la creación de experiencias visuales que conecten a las marcas con las personas. Mi trabajo se centra en el diseño gráfico, la creación de contenido y el storytelling en redes sociales, ayudando a las empresas a construir una presencia fuerte, auténtica y memorable en un mundo cada vez más digital.
                  </p>
                  <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                    Actualmente, estoy cursando el grado en Diseño Digital y Tecnologías Multimedia, donde sigo ampliando mis conocimientos en diseño, producción audiovisual y tecnologías emergentes. Veo cada proyecto como una oportunidad para aprender, experimentar y llevar mi creatividad más allá, buscando siempre crear experiencias modernas, impactantes y visualmente atractivas que ayuden a las marcas a destacar y conectar con su público.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                    I'm Adrián Honrubia, a Barcelona-based graphic designer and filmmaker passionate about creating visual experiences that connect brands with people. My work focuses on graphic design, content creation, and social media storytelling, helping businesses build a strong, authentic, and memorable presence in an increasingly digital world.
                  </p>
                  <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                    Currently, I am studying Digital Design and Multimedia Technologies, where I continue to expand my knowledge in design, audiovisual production, and emerging technologies. I see every project as an opportunity to learn, experiment, and push my creativity further, always aiming to create modern, impactful, and visually engaging experiences that help brands stand out and connect with their audience.
                  </p>
                </>
              )}
            </div>

            {/* Specialties & Creative Verticals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-10 border-t border-neutral-900">
              <div className="group flex flex-col gap-3">
                <div className="w-10 h-10 rounded-sm bg-neutral-950 border border-neutral-850 flex items-center justify-center text-accent/90 group-hover:border-accent/40 group-hover:bg-neutral-900 group-hover:text-accent transition-all duration-300">
                  <Palette size={18} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                    {language === 'es' ? 'Diseño Gráfico' : 'Graphic Design'}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light mt-1.5 leading-relaxed">
                    {language === 'es' 
                      ? 'Desarrollando recursos visuales limpios, maquetación de retículas y estructuras tipográficas cohesionadas.'
                      : 'Developing clean visual assets, grid layouts, and cohesive typography structures.'}
                  </p>
                </div>
              </div>

              <div className="group flex flex-col gap-3">
                <div className="w-10 h-10 rounded-sm bg-neutral-950 border border-neutral-850 flex items-center justify-center text-accent/90 group-hover:border-accent/40 group-hover:bg-neutral-900 group-hover:text-accent transition-all duration-300">
                  <Film size={18} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                    {language === 'es' ? 'Cine' : 'Filmmaking'}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light mt-1.5 leading-relaxed">
                    {language === 'es' 
                      ? 'Produciendo contenido de vídeo moderno, dirigiendo secuencias cinematográficas y narrativa dinámica para redes.'
                      : 'Producing modern video content, directing cinematic sequences, and dynamic social storytelling.'}
                  </p>
                </div>
              </div>

              <div className="group flex flex-col gap-3">
                <div className="w-10 h-10 rounded-sm bg-neutral-950 border border-neutral-850 flex items-center justify-center text-accent/90 group-hover:border-accent/40 group-hover:bg-neutral-900 group-hover:text-accent transition-all duration-300">
                  <Sparkles size={18} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                    {language === 'es' ? 'Branding' : 'Branding'}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light mt-1.5 leading-relaxed">
                    {language === 'es' 
                      ? 'Creando identidades de marca sólidas, estrategias creativas y una presencia digital de alto impacto.'
                      : 'Crafting strong identities, creative brand strategies, and high-impact digital presence.'}
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
