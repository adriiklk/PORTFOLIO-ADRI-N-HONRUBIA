import SpecularButton from './SpecularButton';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Linkedin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const specularStyle = {
  size: 'lg' as const,
  radius: 18,
  tint: '#ffffff',
  tintOpacity: 0,
  blur: 0,
  textColor: '#f5f5f5',
  lineColor: '#ffffff',
  baseColor: '#525252',
  intensity: 1,
  shineSize: 10,
  shineFade: 40,
  thickness: 1,
  speed: 0.35,
  followMouse: true,
  proximity: 250,
  autoAnimate: false,
};

interface HeroProps {
  onDiscoverClick: () => void;
}

export default function Hero({ onDiscoverClick }: HeroProps) {
  const { language } = useLanguage();

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center select-none bg-[#F9F9F7] dark:bg-black transition-colors duration-400">
      {/* Cinematic Autoplay Background Video */}
      <div className="absolute inset-0 w-full h-full object-cover">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20 dark:opacity-60 filter grayscale brightness-100 dark:brightness-[0.4] transition-opacity duration-500"
          src="https://player.vimeo.com/external/517482813.hd.mp4?s=d94a9bf5028f090d810f2d9f4851214ab6fdc64d&profile_id=174&oauth2_token_id=57447761"
          referrerPolicy="no-referrer"
        />
        {/* Vignette layers for high-contrast legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F9F7]/90 via-transparent to-[#F9F9F7] dark:from-[#0A0A0A]/80 dark:via-transparent dark:to-[#0A0A0A] transition-colors duration-400" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: 'radial-gradient(circle, transparent 20%, var(--bg-primary) 100%)'
          }}
        />
      </div>

      {/* Foreground Content Panel */}
      <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-accent text-sm md:text-base font-mono tracking-[0.3em] font-medium uppercase mb-4"
        >
          ADRIÁN HONRUBIA
        </motion.div>

        {/* Major Displays Title */}
        <div className="overflow-hidden mb-6 py-2">
          <motion.h2
            initial={{ y: 110 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-serif font-light text-neutral-900 dark:text-white tracking-tight leading-none transition-colors duration-400"
          >
            {language === 'es' ? (
              <>
                Multimedia Designer <br className="hidden sm:inline" />
                <span className="italic font-serif font-light text-neutral-600 dark:text-neutral-300 transition-colors duration-400">&amp; AI Creator</span>
              </>
            ) : (
              <>
                Multimedia Designer <br className="hidden sm:inline" />
                <span className="italic font-serif font-light text-neutral-600 dark:text-neutral-300 transition-colors duration-400">&amp; AI Creator</span>
              </>
            )}
          </motion.h2>
        </div>

        {/* Narrative Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-neutral-600 dark:text-neutral-300 font-light text-sm sm:text-base md:text-lg tracking-normal max-w-xl mb-12 transition-colors duration-400"
        >
          {language === 'es' 
            ? 'Creando experiencias visuales a través del diseño y la narrativa cinematográfica.'
            : 'Creating visual experiences through design and cinematic storytelling.'}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <SpecularButton
            {...specularStyle}
            onClick={onDiscoverClick}
            className="hero-specular-button w-full sm:w-auto"
          >
            <span className="inline-flex items-center justify-center gap-3 font-mono text-xs tracking-[0.2em]">
              {language === 'es' ? 'VER MI TRABAJO' : 'VIEW MY WORK'}
              <ArrowDown size={14} />
            </span>
          </SpecularButton>

          <SpecularButton
            {...specularStyle}
            href="https://www.linkedin.com/in/adri%C3%A1n-honrubia-gonz%C3%A1lez-8b1640435/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-specular-button w-full sm:w-auto"
          >
            <span className="inline-flex items-center justify-center gap-3 font-mono text-xs tracking-[0.2em]">
              <Linkedin size={14} />
              LINKEDIN
              <ArrowUpRight size={13} />
            </span>
          </SpecularButton>
        </motion.div>
      </div>
    </section>
  );
}
