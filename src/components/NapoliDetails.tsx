import React, { useState } from 'react';
import { 
  Sparkles, Target, Tv, Volume2, VolumeX
} from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../LanguageContext';

interface NapoliDetailsProps {
  project: Project;
}

export default function NapoliDetails({ project }: NapoliDetailsProps) {
  const { language } = useLanguage();
  const musicVideoUrl = project.video || '';

  const galleryStills = [
    project.gallery?.[0] || '',
    project.gallery?.[1] || '',
    project.gallery?.[2] || '',
    project.gallery?.[3] || ''
  ];

  const [isVideoMuted, setIsVideoMuted] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pb-20 space-y-24">
      
      {/* 1. INTRODUCTION */}
      <section className="border-b border-neutral-900 pb-16 max-w-4xl">
        <div className="space-y-6">
          <span className="text-xs font-mono tracking-widest text-[#FFF]/50 uppercase">
            {language === 'es' ? 'INTRODUCCIÓN DEL PROYECTO' : 'PROJECT INTRODUCTION'}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
            {language === 'es'
              ? '«Napoli» es un videoclip cinematográfico dirigido para un tema de música urbana, centrado en la energía, el movimiento y la cultura callejera.'
              : '“Napoli” is a cinematic music video directed for an urban music track, focusing on energy, movement, and street culture.'}
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed font-sans">
            {language === 'es'
              ? 'El proyecto captura el estilo de vida de la calle y el movimiento utilizando planos dinámicos con poca luz y un estilo visual realista. En lugar de representaciones escénicas estándar, el vídeo enfatiza la velocidad, la acción y la cultura urbana local.'
              : 'The project captures street lifestyle and motion using dynamic low-light shots and a realistic visual style. Rather than standard scenic representations, the video emphasizes speed, action, and local urban culture.'}
          </p>
        </div>
      </section>

      {/* 2. THE IDEA (Featured Quote Block) */}
      <section className="py-6 border-b border-neutral-900 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-[1px] w-6 bg-neutral-800" />
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
              {language === 'es' ? 'EL CONCEPTO' : 'THE CONCEPT'}
            </span>
            <span className="h-[1px] w-6 bg-neutral-800" />
          </div>
          <h3 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight italic">
            {language === 'es'
              ? '«Capturar la esencia realista de la cultura de la calle y el movimiento».'
              : '“Capturing the realistic essence of street culture and movement.”'}
          </h3>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed font-sans max-w-2xl mx-auto">
            {language === 'es'
              ? 'Este concepto impulsa el trabajo de cámara y el ritmo de edición, manteniendo el foco en movimientos rápidos, cortes limpios y escenarios auténticos.'
              : 'This concept drives the camera work and editing pacing, maintaining focus on fast movement, clean cuts, and authentic backdrops.'}
          </p>
        </div>
      </section>

      {/* 3. CREATIVE CONCEPT & VISUAL DIRECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Creative Concept */}
        <div className="bg-[#0E0E0E] p-8 md:p-10 border border-neutral-900 rounded-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <Target size={16} />
              <span className="text-[10px] font-mono tracking-widest uppercase">
                {language === 'es' ? 'CONCEPTO CREATIVO' : 'CREATIVE CONCEPT'}
              </span>
            </div>
            <p className="text-lg md:text-xl font-serif font-light text-neutral-200 leading-relaxed italic">
              {language === 'es'
                ? '«El objetivo no es representar Nápoles de manera literal, sino capturar las emociones y el estilo de vida asociados con ella. El lenguaje visual traduce la cultura callejera, la libertad, la velocidad, la independencia y el movimiento constante en arte cinematográfico».'
                : '“The objective is not to literally represent Naples, but to capture the emotions and lifestyle associated with it. The visual language translates street culture, freedom, speed, independence, and constant movement into cinematic art.”'}
            </p>
          </div>
        </div>

        {/* Visual Direction */}
        <div className="bg-gradient-to-br from-neutral-950 to-[#0F0F0F] p-8 md:p-10 border border-neutral-900 rounded-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Sparkles size={16} />
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/60">
                {language === 'es' ? 'DIRECCIÓN VISUAL' : 'VISUAL DIRECTION'}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-light text-white tracking-tight leading-tight">
              {language === 'es'
                ? 'Una atmósfera callejera inmersiva diseñada mediante un estilo nocturno de alto contraste, capturas con cámara en mano y líneas de velocidad fluidas.'
                : 'An immersive street atmosphere crafted through high-contrast night styling, handheld camera captures, and fluid speed lines.'}
            </h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed font-sans pt-1">
              {language === 'es'
                ? 'Integrando localizaciones urbanas crudas, vehículos dinámicos y entornos espontáneos de baja iluminación para formar un flujo cinematográfico unificado que se ajusta a la energía acelerada de la canción.'
                : 'Integrating raw urban locations, dynamic vehicles, and spontaneous low-light environments to form a unified cinematic flow matching the fast-paced energy of the song.'}
            </p>
          </div>
        </div>

      </section>

      {/* 4. OFFICIAL MUSIC VIDEO */}
      <section className="space-y-8">
        <div className="flex flex-col border-b border-neutral-900 pb-6">
          <span className="text-xs font-mono tracking-widest text-[#FFF]/50 uppercase mb-2">
            {language === 'es' ? 'LANZAMIENTO DE PELÍCULA OFICIAL' : 'OFFICIAL FILM RELEASE'}
          </span>
          <h3 className="text-xl md:text-2xl font-serif text-white font-light">
            {language === 'es' ? 'Presentación de Emisión de Videoclip' : 'Music Video Broadcast Presentation'}
          </h3>
        </div>

        {/* Big Horizontal Video Placeholder */}
        <div className="aspect-[16/9] w-full bg-[#0D0D0D] border border-neutral-900 rounded-sm relative flex flex-col justify-between overflow-hidden group transition-all">
          {musicVideoUrl ? (
            <div className="absolute inset-0 w-full h-full z-0">
              {musicVideoUrl.includes('youtube.com') || musicVideoUrl.includes('youtu.be') ? (
                <iframe
                  src={musicVideoUrl}
                  className="w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <video
                    key={musicVideoUrl}
                    src={musicVideoUrl}
                    className="w-full h-full object-cover"
                    controls
                    muted={isVideoMuted}
                    autoPlay
                    loop
                    playsInline
                  />
                  <button 
                    type="button"
                    onClick={() => setIsVideoMuted(!isVideoMuted)}
                    className="absolute bottom-4 left-4 z-40 bg-black/70 backdrop-blur-md border border-neutral-800 p-2 rounded-sm text-neutral-300 hover:text-white hover:bg-neutral-900 transition-all opacity-0 group-hover:opacity-100"
                    title={isVideoMuted ? "Unmute sound" : "Mute sound"}
                  >
                    {isVideoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full border border-accent/25 bg-accent/5 flex items-center justify-center mx-auto">
                <Tv size={18} className="text-accent" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono tracking-widest text-[#FFF]/50 block uppercase">[ NO VIDEO ]</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. GALLERY STILLS SECTION */}
      <section className="space-y-12">
        <div className="flex flex-col border-b border-neutral-900 pb-6">
          <span className="text-xs font-mono tracking-widest text-[#FFF]/50 uppercase mb-2">
            {language === 'es' ? 'EXHIBICIÓN CINEMATOGRÁFICA' : 'CINEMATIC EXHIBITION'}
          </span>
          <h3 className="text-xl md:text-2xl font-serif text-white font-light">
            {language === 'es' ? 'Galería de Fotogramas de Película' : 'Film Frame Specimens Gallery'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[0, 1, 2, 3].map((idx) => (
            <div key={idx} className="space-y-4">
              <div className="aspect-[16/9] bg-[#0E0E0E] border border-neutral-900 rounded-sm relative flex flex-col justify-between p-6 overflow-hidden group transition-all">
                {galleryStills[idx] ? (
                  <img
                    src={galleryStills[idx]}
                    alt={`Cinema Still Specimen ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-0 brightness-[0.8] group-hover:brightness-95"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#070707] z-0 flex flex-col items-center justify-center p-8 text-center">
                    <span className="text-xs font-mono tracking-widest text-[#FFF]/30 block">[ STILL_SPECIMEN_0{idx + 1} ]</span>
                  </div>
                )}

                {/* Double Grid Guide Borders */}
                <div className="absolute inset-0 border border-neutral-950/20 pointer-events-none z-10" />
                <div className="absolute top-[4%] bottom-[4%] left-[4%] right-[4%] border border-[#FFF]/5 border-dashed pointer-events-none z-10" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
