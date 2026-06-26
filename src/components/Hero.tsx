import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onDiscoverClick: () => void;
}

export default function Hero({ onDiscoverClick }: HeroProps) {
  const { language } = useLanguage();

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center select-none bg-black">
      {/* Cinematic Autoplay Background Video */}
      <div className="absolute inset-0 w-full h-full object-cover">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 filter grayscale brightness-[0.4]"
          src="https://player.vimeo.com/external/517482813.hd.mp4?s=d94a9bf5028f090d810f2d9f4851214ab6fdc64d&profile_id=174&oauth2_token_id=57447761"
          referrerPolicy="no-referrer"
        />
        {/* Dark vignette layers for high-contrast legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" style={{
          background: 'radial-gradient(circle, transparent 20%, rgba(10, 10, 10, 0.9) 100%)'
        }} />
      </div>

      {/* Foreground Content Panel */}
      <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-accent text-xs md:text-sm font-mono tracking-[0.35em] uppercase mb-4"
        >
          ADRIÁN HONRUBIA
        </motion.div>

        {/* Major Displays Title */}
        <div className="overflow-hidden mb-6 py-2">
          <motion.h2
            initial={{ y: 110 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-serif font-light text-white tracking-tight leading-none"
          >
            {language === 'es' ? (
              <>
                Diseñador Gráfico <br className="hidden sm:inline" />
                <span className="italic font-serif font-light text-neutral-300">&amp; Filmmaker</span>
              </>
            ) : (
              <>
                Graphic Designer <br className="hidden sm:inline" />
                <span className="italic font-serif font-light text-neutral-300">&amp; Filmmaker</span>
              </>
            )}
          </motion.h2>
        </div>

        {/* Narrative Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-neutral-300 font-light text-sm sm:text-base md:text-lg tracking-normal max-w-xl mb-12"
        >
          {language === 'es' 
            ? 'Creando experiencias visuales a través del diseño y la narrativa cinematográfica.'
            : 'Creating visual experiences through design and cinematic storytelling.'}
        </motion.p>

        {/* Call to Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onClick={onDiscoverClick}
          className="relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-neutral-700/60 hover:border-accent text-xs font-mono tracking-[0.2em] text-white uppercase overflow-hidden group select-none transition-all duration-300 rounded-sm"
          data-cursor="hover"
        >
          {/* Accent hover backgrounds sliding effect */}
          <span className="absolute inset-0 h-full w-0 bg-accent group-hover:w-full transition-all duration-500 ease-[0.76, 0, 0.24, 1] -z-10" />
          <span className="group-hover:text-black transition-colors duration-300">
            {language === 'es' ? 'VER MI TRABAJO' : 'VIEW MY WORK'}
          </span>
          <ArrowDown size={14} className="group-hover:text-black group-hover:translate-y-0.5 transition-all text-neutral-400 duration-300" />
        </motion.button>
      </div>
    </section>
  );
}
