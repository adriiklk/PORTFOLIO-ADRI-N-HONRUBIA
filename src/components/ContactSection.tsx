import { useLanguage } from '../LanguageContext';
import { Mail, ArrowUpRight, MapPin } from 'lucide-react';

export default function ContactSection() {
  const { language } = useLanguage();

  return (
    <section id="contact" className="relative w-full py-20 bg-[#0A0A0A] text-white select-none scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section title header */}
        <div className="flex flex-col mb-12 border-b border-neutral-900 pb-8">
          <span className="text-xs font-mono tracking-[0.3em] text-accent uppercase mb-2">
            {language === 'es' ? '04 / CONTACTO' : '04 / CONTACT'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white">
            {language === 'es' ? 'Ponte en contacto' : 'Feel free to reach out'}
          </h2>
        </div>

        {/* Simple Layout: Info Row/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          
          {/* Left Block: Brief Invite info */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-serif text-neutral-200 font-light leading-relaxed">
              {language === 'es' 
                ? 'Si tienes un proyecto en mente, una idea que quieres desarrollar, o simplemente quieres saludar, no dudes en ponerte en contacto conmigo directamente.'
                : 'If you have a project in mind, an idea you want to develop, or just want to say hello, feel free to contact me directly.'}
            </h3>
            <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed font-sans max-w-md">
              {language === 'es'
                ? 'Escríbeme un correo o conecta a través de mis redes sociales. Suelo responder en un plazo de 24 horas.'
                : 'Email me or connect via my social channels. I usually respond within 24 hours.'}
            </p>
          </div>

          {/* Right Block: Contact Channels cleanly presented */}
          <div className="space-y-6">
            {/* Email Card */}
            <a
              href="mailto:adrianhonrubia05@gmail.com"
              className="group block bg-[#0E0E0E] hover:bg-[#121212] p-6 border border-neutral-900 rounded-sm transition-all duration-300"
              data-cursor="hover"
            >
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                {language === 'es' ? 'CORREO DIRECTO' : 'DIRECT EMAIL'}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-base md:text-lg font-serif text-white group-hover:text-accent transition-colors">
                  adrianhonrubia05@gmail.com
                </span>
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                  <Mail size={14} className="group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </a>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/adriiii10._"
                target="_blank"
                rel="noreferrer"
                className="group block bg-[#0E0E0E] hover:bg-[#121212] p-5 border border-neutral-900 rounded-sm transition-all duration-300"
                data-cursor="hover"
              >
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">INSTAGRAM</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-sans text-white group-hover:text-accent transition-colors">@adriiii10._</span>
                  <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-white transition-colors" />
                </div>
              </a>

              {/* Linkedin */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group block bg-[#0E0E0E] hover:bg-[#121212] p-5 border border-neutral-900 rounded-sm transition-all duration-300"
                data-cursor="hover"
              >
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">LINKEDIN</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-sans text-white group-hover:text-accent transition-colors">adrian-honrubia</span>
                  <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-white transition-colors" />
                </div>
              </a>
            </div>

            {/* Location Line */}
            <div className="flex items-center gap-3 px-5 py-4 bg-[#0E0E0E]/50 border border-neutral-900/40 rounded-sm text-neutral-400 text-xs">
              <MapPin size={14} className="text-accent hover:scale-110 transition-transform" />
              <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-500">
                {language === 'es' ? 'UBICACIÓN:' : 'LOCATION:'}
              </span>
              <span className="font-serif text-sm font-light text-neutral-300">
                {language === 'es'
                  ? 'Barcelona, España (Disponible para todo el mundo)'
                  : 'Barcelona, Spain (Available worldwide)'}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
