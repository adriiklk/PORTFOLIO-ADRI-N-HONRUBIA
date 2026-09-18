import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Target, Tv, Volume2, VolumeX, Maximize2, X, ChevronLeft, ChevronRight
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation & body scroll lock for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : galleryStills.length - 1) : null));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev < galleryStills.length - 1 ? prev + 1 : 0) : null));
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, galleryStills.length]);

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
            <span className="text-xs md:text-sm font-mono text-accent uppercase tracking-widest font-medium">
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
            <div className="flex items-center gap-2.5 text-accent">
              <Target size={18} />
              <span className="text-xs md:text-sm font-mono tracking-wider uppercase font-medium">
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
            <div className="flex items-center gap-2.5 text-white">
              <Sparkles size={18} />
              <span className="text-xs md:text-sm font-mono tracking-wider uppercase text-white/75 font-medium">
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-900 pb-6 gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#FFF]/50 uppercase mb-2 block">
              {language === 'es' ? 'EXHIBICIÓN CINEMATOGRÁFICA' : 'CINEMATIC EXHIBITION'}
            </span>
            <h3 className="text-xl md:text-2xl font-serif text-white font-light">
              {language === 'es' ? 'Galería de Fotogramas de Película' : 'Film Frame Specimens Gallery'}
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400 hidden sm:inline-flex items-center gap-1.5 shrink-0">
            <Maximize2 size={13} className="text-accent" />
            {language === 'es' ? 'Haz clic en un fotograma para ampliar' : 'Click any frame to enlarge'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[0, 1, 2, 3].map((idx) => {
            const hasImage = Boolean(galleryStills[idx]);
            return (
              <div key={idx} className="space-y-4">
                <div 
                  onClick={() => {
                    if (hasImage) setLightboxIndex(idx);
                  }}
                  onKeyDown={(e) => {
                    if (hasImage && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setLightboxIndex(idx);
                    }
                  }}
                  role={hasImage ? "button" : undefined}
                  tabIndex={hasImage ? 0 : undefined}
                  aria-label={hasImage ? (language === 'es' ? `Ampliar fotograma ${idx + 1}` : `Enlarge film still ${idx + 1}`) : undefined}
                  className={`aspect-[16/9] bg-[#0E0E0E] border border-neutral-900 rounded-sm relative flex flex-col justify-between p-6 overflow-hidden group transition-all select-none ${
                    hasImage ? 'cursor-pointer hover:border-accent/60 shadow-sm hover:shadow-lg' : ''
                  }`}
                >
                  {hasImage ? (
                    <img
                      src={galleryStills[idx]}
                      alt={`Cinema Still Specimen ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-0 brightness-[0.85] group-hover:brightness-100"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#070707] z-0 flex flex-col items-center justify-center p-8 text-center">
                      <span className="text-xs font-mono tracking-widest text-[#FFF]/30 block">[ STILL_SPECIMEN_0{idx + 1} ]</span>
                    </div>
                  )}

                  {/* Hover Visual Prompt */}
                  {hasImage && (
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors flex items-center justify-center pointer-events-none z-20">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0 px-3 py-1.5 bg-black/85 backdrop-blur-sm border border-neutral-700 text-white rounded-sm text-xs font-mono flex items-center gap-2 shadow-xl">
                        <Maximize2 size={13} className="text-accent" />
                        <span>{language === 'es' ? 'Ver fotograma' : 'View frame'}</span>
                      </div>
                    </div>
                  )}

                  {/* Top identifier stamp */}
                  <div className="relative z-10 flex justify-between items-center pointer-events-none">
                    <span className="text-[10px] font-mono tracking-widest text-white/60 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-white/10">
                      FRAME 0{idx + 1}
                    </span>
                    {hasImage && (
                      <span className="text-[10px] font-mono tracking-wider text-accent bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        16:9 RAW
                      </span>
                    )}
                  </div>

                  {/* Double Grid Guide Borders */}
                  <div className="absolute inset-0 border border-neutral-950/20 pointer-events-none z-10" />
                  <div className="absolute top-[4%] bottom-[4%] left-[4%] right-[4%] border border-[#FFF]/10 border-dashed pointer-events-none z-10" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && galleryStills[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/95 backdrop-blur-md p-3 sm:p-6 md:p-8 select-none animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar Navigation */}
          <div 
            className="absolute top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 flex items-center justify-between text-white z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-1 bg-neutral-900/90 border border-neutral-700 text-accent rounded-sm font-semibold tracking-wider">
                {lightboxIndex + 1} / {galleryStills.length}
              </span>
              <h4 className="text-sm sm:text-base font-serif font-light text-white tracking-wide">
                {language === 'es' ? `Fotograma Cinematográfico 0${lightboxIndex + 1}` : `Cinematic Film Frame 0${lightboxIndex + 1}`}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline mr-2">
                {language === 'es' ? 'Esc para cerrar · ← → para navegar' : 'Esc to close · ← → to navigate'}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="cursor-pointer p-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors shadow-lg"
                title={language === 'es' ? 'Cerrar (Esc)' : 'Close (Esc)'}
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Previous Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : galleryStills.length - 1) : null));
            }}
            className="cursor-pointer absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-accent border border-neutral-700 transition-all z-20 shadow-2xl group"
            title={language === 'es' ? 'Anterior' : 'Previous'}
            aria-label="Previous frame"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Frame Container */}
          <div 
            className="relative max-w-6xl max-h-[86vh] w-full h-full flex flex-col items-center justify-center p-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] w-auto flex items-center justify-center overflow-hidden rounded-sm border border-neutral-800 shadow-2xl bg-black">
              <img
                src={galleryStills[lightboxIndex]}
                alt={`Cinematic Frame 0${lightboxIndex + 1}`}
                className="max-h-[75vh] max-w-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              {/* Subtle cinema guide lines */}
              <div className="absolute top-[3%] bottom-[3%] left-[3%] right-[3%] border border-white/5 border-dashed pointer-events-none" />
            </div>

            {/* Technical Caption Stamp */}
            <div className="mt-3.5 flex items-center gap-3 text-[11px] font-mono text-neutral-400 text-center px-4 py-1.5 bg-neutral-900/80 border border-neutral-800 rounded-sm">
              <span className="text-accent font-medium">STILL_SPECIMEN_0{lightboxIndex + 1}</span>
              <span className="text-neutral-600">·</span>
              <span>16:9 35MM GRAIN</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-300">NAPOLI MUSIC VIDEO</span>
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev < galleryStills.length - 1 ? prev + 1 : 0) : null));
            }}
            className="cursor-pointer absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-accent border border-neutral-700 transition-all z-20 shadow-2xl group"
            title={language === 'es' ? 'Siguiente' : 'Next'}
            aria-label="Next frame"
          >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}

    </div>
  );
}
