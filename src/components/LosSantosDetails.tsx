import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Shield, 
  Eye, 
  Layers, 
  Sliders, 
  ArrowRight, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Monitor, 
  Smartphone, 
  Cpu, 
  Activity, 
  RotateCcw,
  MousePointer,
  CheckCircle2,
  Wrench
} from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../LanguageContext';

// @ts-expect-error - Vite handles asset imports correctly
import visualDirectionHeroImage from '../assets/images/regenerated_image_1790068986443.png';
// @ts-expect-error - Vite handles asset imports correctly
import visualDirectionNeonImage from '../assets/images/regenerated_image_1790068987199.png';
// @ts-expect-error - Vite handles asset imports correctly
import losSantosNeonLogo from '../assets/images/los_santos_neon_logo.png';

// Dedicated, independent project gallery captures (no repetition)
// @ts-expect-error - Vite handles asset imports correctly
import lsDesktopHeroImage from '../assets/images/regenerated_image_1790070468832.png';
// @ts-expect-error - Vite handles asset imports correctly
import lsBookingContactImage from '../assets/images/regenerated_image_1790070472203.png';
// @ts-expect-error - Vite handles asset imports correctly
import lsServicesUiImage from '../assets/images/regenerated_image_1790070470979.png';
// @ts-expect-error - Vite handles asset imports correctly
import lsBeforeAfterImage from '../assets/images/regenerated_image_1790070473194.png';

interface LosSantosDetailsProps {
  project: Project;
}

export default function LosSantosDetails({ project }: LosSantosDetailsProps) {
  const { language } = useLanguage();

  // --- INTERACTIVE NEON LOGO SIMULATOR STATE ---
  const neonStageRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 }); // relative -1 to 1
  const [distancePx, setDistancePx] = useState(280); // Distance in pixels to center
  const [isHovering, setIsHovering] = useState(false);

  // Calculate dynamic neon intensity based on cursor proximity
  const maxRadius = 380;
  const rawIntensity = Math.max(0, 1 - Math.min(distancePx / maxRadius, 1));
  const glowLevel = isHovering
    ? 0.25 + 0.75 * Math.pow(rawIntensity, 0.85)
    : 0.32; // Default resting glow

  // 3D Tilt calculation (subtle, delicate rotation)
  const maxTiltAngle = 6.5; // delicate, not exaggerated
  const tiltX = isHovering ? -cursorPos.y * maxTiltAngle : 0;
  const tiltY = isHovering ? cursorPos.x * maxTiltAngle : 0;

  // Handle pointer tracking on interactive neon canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!neonStageRef.current) return;
    setIsHovering(true);
    const rect = neonStageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    setDistancePx(dist);
    setCursorPos({
      x: Math.max(-1, Math.min(1, dx / (rect.width / 2))),
      y: Math.max(-1, Math.min(1, dy / (rect.height / 2)))
    });
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
    setDistancePx(340);
    setCursorPos({ x: 0, y: 0 });
  };

  // Dedicated Visual Direction Items (Compositions)
  const visualDirectionItems = [
    {
      id: 'visual-hero',
      labelEs: 'DIRECCIÓN VISUAL · HERO & PORTADA',
      labelEn: 'VISUAL DIRECTION · HERO & LANDING',
      subtitleEs: 'Atmósfera general de estudio privado, softbox suspendido y acabado cerámico sobre la carrocería.',
      subtitleEn: 'Private studio atmosphere, suspended softbox, and ceramic coating clearcoat reflections.',
      tag: 'VISUAL COMPOSITION 01',
      src: visualDirectionHeroImage,
    },
    {
      id: 'visual-before-after',
      labelEs: 'DIRECCIÓN VISUAL · INTERACTIVO ANTES/DESPUÉS DEL SERVICIO',
      labelEn: 'VISUAL DIRECTION · BEFORE/AFTER SERVICE INTERACTIVE',
      subtitleEs: 'Módulo interactivo de antes y después del servicio en la web diseñada, mostrando el brillo azul neón, la estética moderna y títulos en tipografía Pricedown.',
      subtitleEn: 'Interactive before-and-after service module of the designed website, highlighting vibrant neon blue reflections, modern aesthetic, and Pricedown headline typography.',
      tag: 'VISUAL COMPOSITION 02',
      src: visualDirectionNeonImage,
    },
  ];

  // Dedicated, 100% Unique Prototype Captures (Composiciones y capturas del prototipo)
  const galleryItems = [
    {
      id: 'homepage',
      labelEs: '01 · HOMEPAGE & PORTADA',
      labelEn: '01 · HOMEPAGE & COVER',
      subtitleEs: 'Composición inicial oscura con navegación minimalista, titular editorial y atmósfera inmersiva.',
      subtitleEn: 'Opening dark composition with minimalist navigation, editorial headline, and immersive atmosphere.',
      tag: 'HERO LANDING',
      src: lsDesktopHeroImage,
    },
    {
      id: 'before-after',
      labelEs: '02 · COMPARATIVA BEFORE / AFTER',
      labelEn: '02 · BEFORE / AFTER COMPARISON',
      subtitleEs: 'Comparador interactivo split-view de reflectancia y profundidad óptica sobre la carrocería pulida.',
      subtitleEn: 'Interactive split-view comparator of reflectance and optical depth across polished vehicle clearcoat.',
      tag: 'TRANSFORMATION',
      src: lsBeforeAfterImage,
    },
    {
      id: 'services',
      labelEs: '03 · ARQUITECTURA DE SERVICIOS',
      labelEn: '03 · SERVICES ARCHITECTURE',
      subtitleEs: 'Catálogo de tratamientos de alta gama: corrección de pintura, sellado cerámico y restauración.',
      subtitleEn: 'High-end treatment catalog: paint correction, ceramic coatings, and interior restoration.',
      tag: 'SERVICE SUITE',
      src: lsServicesUiImage,
    },
    {
      id: 'booking-contact',
      labelEs: '04 · RESERVAS, UBICACIÓN & CONTACTO',
      labelEn: '04 · BOOKING, LOCATION & CONTACT',
      subtitleEs: 'Sistema de reservas mediante cuestionario guiado con botón directo a WhatsApp de la empresa, ubicación del taller, Instagram y horarios.',
      subtitleEn: 'Intake booking questionnaire featuring direct WhatsApp messaging to the company, studio geolocation, Instagram feed, and business hours.',
      tag: 'BOOKING & CONTACT',
      src: lsBookingContactImage,
    },
  ];

  // All modal items for lightbox navigation (visual compositions + prototype captures)
  const allModalItems = [...visualDirectionItems, ...galleryItems];

  // Lightbox index state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : allModalItems.length - 1) : null));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev < allModalItems.length - 1 ? prev + 1 : 0) : null));
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, allModalItems.length]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pb-28 space-y-28 text-neutral-800 dark:text-neutral-200 font-sans transition-colors duration-400">

      {/* 01 — INTRODUCTION */}
      <section id="introduction" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            01 — {language === 'es' ? 'INTRODUCCIÓN' : 'INTRODUCTION'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-950 dark:text-white leading-[1.15]">
              Los Santos Detailing
            </h2>
            <p className="text-sm font-mono tracking-wider text-accent uppercase">
              {language === 'es'
                ? 'Prototipo de experiencia digital para un estudio de detailing de alta gama'
                : 'Digital experience prototype for a high-end automotive detailing studio'}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5 text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-light leading-relaxed">
            <p>
              {language === 'es'
                ? 'Los Santos Detailing es un concepto digital y prototipo web desarrollado para una firma de detailing y cuidado automotriz de alta gama. El proyecto nace con el objetivo de concebir una experiencia digital premium orientada a cuatro pilares fundamentales: precisión, exclusividad, artesanía y estética automotriz de vanguardia.'
                : 'Los Santos Detailing is a digital concept and web prototype created for a bespoke high-end automotive detailing studio. The project was conceived to craft a premium digital experience anchored by four core pillars: precision, exclusivity, craftsmanship, and automotive aesthetics.'}
            </p>
            <p>
              {language === 'es'
                ? 'Existe una profunda analogía entre la artesanía del detailing físico —el pulido óptico micrométrico de la laca, la aplicación controlada de recubrimientos cerámicos y la iluminación técnica de inspección— y la precisión del diseño digital contemporáneo. Cada transición, proporción tipográfica y comportamiento interactivo fue calibrado con el mismo rigor que un maestro detallador aplica sobre la carrocería de un superdeportivo.'
                : 'There is an intrinsic synergy between automotive craftsmanship and digital precision. The obsessive patience required for micrometric paint correction, optical refinement, and ceramic curing directly mirrors the pixel-level calibration, responsive mathematical physics, and typographic discipline of contemporary web design.'}
            </p>
          </div>
        </div>
      </section>

      {/* 02 — THE CONCEPT */}
      <section id="the-concept" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            02 — {language === 'es' ? 'EL CONCEPTO' : 'THE CONCEPT'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-950 p-8 md:p-12 border border-neutral-200 dark:border-neutral-900 rounded-sm">
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
                {language === 'es' ? 'TRIADA ESTRATÉGICA' : 'STRATEGIC TRIAD'}
              </span>
              <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
                {language === 'es'
                  ? 'Precisión + Exclusividad + Interacción'
                  : 'Precision + Exclusivity + Interaction'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-neutral-200 dark:border-neutral-900">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent font-mono text-xs tracking-wider uppercase font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{language === 'es' ? '01. PRECISIÓN' : '01. PRECISION'}</span>
                </div>
                <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
                  {language === 'es' ? 'Rigor milimétrico' : 'Micrometric Rigor'}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  {language === 'es'
                    ? 'La estructura de la web emula la pulcritud de un laboratorio técnico: retículas exactas, datos ópticos y tipografías monoespaciadas que transmiten solvencia y maestría.'
                    : 'The website structure reflects the immaculacy of a technical laboratory: exact grids, optical data stamps, and monospace typography that communicate mastery.'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent font-mono text-xs tracking-wider uppercase font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{language === 'es' ? '02. EXCLUSIVIDAD' : '02. EXCLUSIVITY'}</span>
                </div>
                <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
                  {language === 'es' ? 'Atmósfera reservada' : 'Private Atmosphere'}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  {language === 'es'
                    ? 'Un entorno inmersivo oscuro donde el vehículo es la única estrella. La iluminación selectiva guía la mirada hacia texturas, barnices y reflejos especulares de altísima gama.'
                    : 'A dark, reserved environment where the vehicle remains the focal star. Selective lighting draws the eye toward deep reflections, textures, and bespoke clearcoats.'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent font-mono text-xs tracking-wider uppercase font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{language === 'es' ? '03. INTERACCIÓN' : '03. INTERACTION'}</span>
                </div>
                <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
                  {language === 'es' ? 'Identidad viva' : 'Living Identity'}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  {language === 'es'
                    ? 'En lugar de un logotipo plano e inerte, la identidad se transforma en un objeto físico iluminado que reacciona a la presencia y movimiento del usuario en tiempo real.'
                    : 'Rather than a flat static mark, the brand identity is transformed into a real luminous object reacting dynamically to user presence and cursor proximity in real time.'}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-900">
              <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base font-light italic leading-relaxed">
                {language === 'es'
                  ? '«El proyecto fue diseñado para que el sitio web se sienta como una extensión directa del propio estudio físico de detailing: controlado, sofisticado, silencioso y técnicamente implacable».'
                  : '“The project was designed so the website feels like an authentic digital extension of the physical detailing bay: controlled, sophisticated, silent, and technically relentless.”'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — INTERACTIVE IDENTITY (MAIN SHOWCASE & SIMULATOR) */}
      <section id="interactive-identity" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            03 — {language === 'es' ? 'IDENTIDAD INTERACTIVA' : 'INTERACTIVE IDENTITY'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-950 dark:text-white leading-[1.15]">
            {language === 'es' 
              ? 'Un logotipo estático transformado en experiencia de marca interactiva' 
              : 'A static logo transformed into an interactive brand experience'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-4xl">
            {language === 'es'
              ? 'La idea central del proyecto es convertir el propio logotipo de la empresa en una parte integral y participativa de la experiencia de usuario. La insignia se concibe como un rótulo de neón físico suspendido en la pared oscura del estudio, dotado de reactividad fotométrica y micro-inclinación espacial calculada según la proximidad del cursor.'
              : 'The central premise of the project is to make the company logo itself part of the user experience. The emblem is rendered as a physical neon sign hanging against the dark textured studio wall, endowed with photometric reactivity and spatial micro-rotations computed dynamically from cursor proximity.'}
          </p>
        </div>

        {/* --- LIVE INTERACTIVE NEON SIMULATOR --- */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-neutral-800 dark:text-neutral-200 uppercase font-medium">
              {language === 'es' 
                ? 'SIMULADOR EN VIVO · PRUEBA EL CURSOR DENTRO DEL RECUADRO' 
                : 'LIVE INTERACTIVE SIMULATOR · MOVE CURSOR INSIDE BOX'}
            </span>
          </div>

          {/* Interactive Canvas */}
          <div
            ref={neonStageRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            data-theme-keep="dark"
            className="relative h-[440px] sm:h-[540px] w-full rounded-sm overflow-hidden bg-[#070709] border border-neutral-800 cursor-crosshair select-none flex items-center justify-center p-6 [perspective:1000px] shadow-2xl"
          >
            {/* Subtle Studio Concrete Texture / Grid Background */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                backgroundSize: '28px 28px'
              }}
            />

            {/* Subtle Ambient Radial Light behind the sign matching current glowLevel */}
            <div
              className="absolute pointer-events-none rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${260 + glowLevel * 360}px`,
                height: `${260 + glowLevel * 360}px`,
                background: `radial-gradient(circle, rgba(6, 182, 212, ${0.15 + glowLevel * 0.35}) 0%, rgba(56, 189, 248, ${0.08 + glowLevel * 0.22}) 38%, transparent 70%)`,
                filter: 'blur(50px)',
                transform: `translate3d(${cursorPos.x * 20}px, ${cursorPos.y * 20}px, 0)`
              }}
            />

            {/* Top Status Telemetry HUD */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none image-badge">
              <span className="text-[10px] font-mono tracking-widest text-white bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/10 uppercase">
                {language === 'es' ? 'INTENSIDAD LUMINOSA:' : 'GLOW INTENSITY:'} <strong className="text-cyan-400">{Math.round(glowLevel * 100)}%</strong>
              </span>
            </div>

            {/* Bottom-right state indicator */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none image-badge">
              <span className="text-[10px] font-mono tracking-widest text-white bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/15 uppercase flex items-center gap-2">
                <span 
                  className="w-2 h-2 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: glowLevel > 0.75 ? '#06B6D4' : glowLevel > 0.4 ? '#38BDF8' : '#71717A',
                    boxShadow: glowLevel > 0.75 ? '0 0 8px #06B6D4' : 'none'
                  }}
                />
                <span>
                  {glowLevel > 0.75 
                    ? (language === 'es' ? 'ESTADO: PROXIMIDAD MÁXIMA (BLOOM)' : 'STATE: PROXIMITY BURST')
                    : glowLevel > 0.4
                    ? (language === 'es' ? 'ESTADO: EQUILIBRIO AMBIENTAL' : 'STATE: BALANCED RADIANCE')
                    : (language === 'es' ? 'ESTADO: REPOSO EN ESPERA (IDLE)' : 'STATE: CALM RESTING IDLE')}
                </span>
              </span>
            </div>

            {/* --- 3D TILTED NEON SIGN OBJECT --- */}
            <div
              className="relative z-10 flex flex-col items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Outer Neon Shield Emblem (Selected Element) */}
              <div
                className="relative p-3 sm:p-6 transition-all duration-300 flex flex-col items-center justify-center select-none"
                style={{
                  transform: 'translateZ(40px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <img
                  src={losSantosNeonLogo}
                  alt="Los Santos Detailing Neon Logo"
                  referrerPolicy="no-referrer"
                  className="max-h-[280px] sm:max-h-[360px] md:max-h-[410px] w-auto max-w-full object-contain select-none pointer-events-none transition-all duration-300 drop-shadow-2xl"
                  style={{
                    filter: `
                      drop-shadow(0 0 ${8 + glowLevel * 22}px rgba(6, 182, 212, ${0.5 + glowLevel * 0.5}))
                      drop-shadow(0 0 ${22 + glowLevel * 45}px rgba(56, 189, 248, ${0.35 + glowLevel * 0.45}))
                      drop-shadow(0 0 ${50 + glowLevel * 75}px rgba(6, 182, 212, ${0.2 + glowLevel * 0.4}))
                      brightness(${0.9 + glowLevel * 0.28})
                    `
                  }}
                />
              </div>

              {/* Floor Shadow Reflection */}
              <div
                className="w-4/5 h-4 mt-4 rounded-full mx-auto transition-all duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse, rgba(6, 182, 212, ${0.2 + glowLevel * 0.45}) 0%, transparent 70%)`,
                  filter: 'blur(12px)',
                  transform: `scale(${0.85 + glowLevel * 0.35})`
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 04 — HOW THE INTERACTION WORKS */}
      <section id="how-it-works" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            04 — {language === 'es' ? 'CÓMO FUNCIONA LA INTERACCIÓN' : 'HOW THE INTERACTION WORKS'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
            {language === 'es'
              ? 'Comportamiento fotométrico y micro-rotación espacial'
              : 'Photometric behavior and spatial micro-rotation'}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
            {language === 'es'
              ? 'La lógica interactiva fue concebida para ser comprensible de inmediato. Se estructuran tres estados lumínicos principales determinados por la distancia euclídea entre las coordenadas del cursor y el centro geométrico del logotipo.'
              : 'The interactive logic was engineered for immediate clarity. Three core luminous states are calculated dynamically based on the Euclidean distance between cursor coordinates and the geometric center of the logo.'}
          </p>
        </div>

        {/* 3 State Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* State 1: Cursor Close */}
          <div className="bg-white dark:bg-neutral-950 p-6 md:p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-4 relative overflow-hidden group hover:border-accent transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-medium bg-cyan-500/10 px-2 py-0.5 rounded">
                STATE 01
              </span>
            </div>

            <div className="h-20 rounded bg-black flex items-center justify-center border border-cyan-400/50 shadow-[0_0_28px_rgba(6,182,212,0.45),0_0_55px_rgba(56,189,248,0.25)]" data-theme-keep="dark">
              <span className="text-sm font-serif tracking-widest text-white uppercase font-normal" style={{ textShadow: '0 0 8px #FFFFFF, 0 0 16px #38BDF8, 0 0 30px #06B6D4, 0 0 45px #0284C7' }}>
                NEÓN VIBRANTE (100%)
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Cursor cerca → Neón intenso' : 'Cursor close → Stronger neon'}
              </h4>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Al aproximarse el cursor, el resplandor se intensifica al máximo. El halo de luz se expande y el logotipo responde activamente, transmitiendo energía y viveza.'
                  : 'As the cursor draws closer, neon bloom reaches maximum luminance. The glow expands and the sign pulses with responsive energy, feeling tactile and active.'}
              </p>
            </div>
          </div>

          {/* State 2: Medium Distance */}
          <div className="bg-white dark:bg-neutral-950 p-6 md:p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-4 relative overflow-hidden group hover:border-accent transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-medium bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded">
                STATE 02
              </span>
            </div>

            <div className="h-20 rounded bg-black flex items-center justify-center border border-neutral-800 shadow-[0_0_15px_rgba(56,189,248,0.2)]" data-theme-keep="dark">
              <span className="text-sm font-serif tracking-widest text-neutral-200 uppercase" style={{ textShadow: '0 0 8px #38BDF8' }}>
                AURA EQUILIBRADA (60%)
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Distancia media → Brillo balanceado' : 'Medium distance → Balanced glow'}
              </h4>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Mantiene una presencia luminosa elegante y equilibrada, funcionando como punto focal visible sin saturar la composición editorial circundante.'
                  : 'Maintains an elegant, calibrated ambient glow, anchoring the opening viewport as a distinct focal point without overwhelming adjacent content.'}
              </p>
            </div>
          </div>

          {/* State 3: Far Away */}
          <div className="bg-white dark:bg-neutral-950 p-6 md:p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-4 relative overflow-hidden group hover:border-accent transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-medium bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded">
                STATE 03
              </span>
            </div>

            <div className="h-20 rounded bg-black flex items-center justify-center border border-neutral-900" data-theme-keep="dark">
              <span className="text-sm font-serif tracking-widest text-neutral-400 uppercase">
                REPOSO CALMO (20%)
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Cursor lejos → Resplandor atenuado' : 'Cursor far away → Reduced glow'}
              </h4>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Al alejarse el cursor, el neón disminuye progresivamente hasta un estado de reposo calmo y silencioso, esperando la siguiente interacción.'
                  : 'When the cursor retreats, glow smoothly diminishes to a quiet resting state, conserving visual calmness while remaining ready for re-engagement.'}
              </p>
            </div>
          </div>
        </div>

        {/* Cursor-Based Rotation Details Card */}
        <div className="bg-neutral-100 dark:bg-neutral-950 p-6 md:p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
              <RotateCcw size={14} />
              <span>{language === 'es' ? 'FÍSICA TRIDIMENSIONAL SUTIL' : 'SUBTLE 3D PHYSICS'}</span>
            </div>
            <h4 className="text-xl font-serif font-light text-neutral-950 dark:text-white">
              {language === 'es' ? 'Inclinación y rotación tridimensional calibrada' : 'Calibrated 3D tilt & rotation'}
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Además de la intensidad fotométrica, el logotipo incorpora una rotación 3D en los ejes X e Y según la posición angular del ratón. El ángulo está deliberadamente limitado a ±6.5° para sentirse delicado, pesado y prémium, nunca exagerado ni caricaturesco. Esto confiere al rótulo una sensación de objeto físico real suspendido en el espacio.'
                : 'Alongside photometric bloom, the logo features subtle 3D rotational tilt on X and Y axes relative to cursor coordinates. The maximum tilt is strictly capped at ±6.5° to remain delicate, heavy, and premium, avoiding cartoonish exaggerations. This anchors the emblem as a tangible physical installation.'}
            </p>
          </div>
        </div>
      </section>

      {/* 05 — UX / UI */}
      <section id="ux-ui" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            05 — UX / UI
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
            {language === 'es'
              ? 'Arquitectura del prototipo & Recorrido del usuario'
              : 'Prototype architecture & User journey'}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
            {language === 'es'
              ? 'El prototipo web se estructura a través de seis módulos concebidos como un recorrido coherente: desde el impacto inicial de marca hasta la comprensión exhaustiva de los servicios y el contacto final con el estudio.'
              : 'The web prototype is structured across six key modules designed as an intentional user journey: moving seamlessly from initial brand immersion to service comprehension and direct consultation booking.'}
          </p>
        </div>

        {/* 6 Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              {language === 'es' ? '01 · SERVICIOS' : '01 · SERVICES'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Tratamientos Especializados' : 'Specialized Treatments'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Catálogo exhaustivo de servicios técnicos: corrección de pintura en varias fases, sellados cerámicos de 3 y 5 años, protección PPF y regeneración interior de cuero.'
                : 'Comprehensive breakdown of high-precision services: multi-stage paint correction, 3 to 5-year ceramic coatings, PPF protection, and bespoke leather regeneration.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              {language === 'es' ? '02 · ANTES / DESPUÉS' : '02 · BEFORE / AFTER'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Transformación Visual' : 'Visual Transformation'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Demostración interactiva de antes y después con control deslizante que permite comparar los hologramas y arañazos iniciales frente a la nitidez cristalina final.'
                : 'Interactive split slider demonstrating tangible craft: comparing initial swirls, micro-scratches, and holograms against mirror-depth optical clarity.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              {language === 'es' ? '03 · FILOSOFÍA' : '03 · PHILOSOPHY'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Filosofía & Artesanía' : 'Philosophy & Craft'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Declaración del compromiso con la preservación del patrimonio automovilístico, ciencia de materiales químicos y estándares quirúrgicos de limpieza.'
                : 'Manifesto on automotive heritage preservation, advanced chemical materials science, and surgical inspection standards.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              {language === 'es' ? '04 · PROCESO' : '04 · PROCESS'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Protocolo Quirúrgico' : 'Surgical Protocol'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Desglose transparente del proceso: descontaminación férrica, medición electromagnética del espesor de laca, pulido rotativo y curado por infrarrojos.'
                : 'Transparent workflow breakdown: chemical iron decontamination, digital lacquer gauge measurement, rotary polishing, and controlled infrared curing.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              {language === 'es' ? '05 · TRABAJOS' : '05 · WORKS'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Exhibición de Obras' : 'Works Gallery'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Galería fotográfica de vehículos tratados: superdeportivos contemporáneos, coupés clásicos y piezas de colección fotografiadas bajo luz de estudio.'
                : 'Photographic gallery of completed vehicles: modern exotics, classic grand tourers, and rare collector editions documented under studio softboxes.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              {language === 'es' ? '06 · CONTACTO' : '06 · CONTACT'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Cita, Ubicación & WhatsApp' : 'Booking, Location & WhatsApp'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Cuestionario interactivo de reservas con botón directo a WhatsApp de la empresa, geolocalización del taller, feed de Instagram y horarios de atención.'
                : 'Interactive booking questionnaire with direct WhatsApp dispatch to the company, studio geolocation, Instagram channel, and business hours.'}
            </p>
          </div>
        </div>
      </section>

      {/* 06 — VISUAL DIRECTION */}
      <section id="visual-direction" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            06 — {language === 'es' ? 'DIRECCIÓN VISUAL' : 'VISUAL DIRECTION'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
            {language === 'es'
              ? 'Atmósfera de estudio privado de alta gama'
              : 'Private high-end automotive studio atmosphere'}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
            {language === 'es'
              ? 'El diseño visual evoca la exclusividad de un box cerrado donde los vehículos son tratados con discreción absoluta. Se combinan fondos oscuros, iluminación dramática de contorno, reflejos en azul neón y la emblemática tipografía Pricedown para los títulos principales.'
              : 'The visual direction evokes the exclusivity of a secluded studio bay where vehicles are treated with absolute discretion. Dark tones, dramatic rim lighting, electric neon blue reflections, and the iconic Pricedown typography for main headlines combine to build an elevated presence.'}
          </p>
        </div>

        {/* Visual Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm">
            <span className="text-accent uppercase block text-[10px] mb-1">
              {language === 'es' ? '01 · PALETA' : '01 · PALETTE'}
            </span>
            <strong className="text-neutral-900 dark:text-white font-medium block">
              {language === 'es' ? 'Oscuro & Inmersivo' : 'Dark & Immersive'}
            </strong>
            <span className="text-neutral-500 text-[11px] mt-1 block">
              {language === 'es' ? 'Negros profundos (#070709, #0D0B0A)' : 'Deep blacks (#070709, #0D0B0A)'}
            </span>
          </div>
          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm">
            <span className="text-accent uppercase block text-[10px] mb-1">
              {language === 'es' ? '02 · ACENTOS' : '02 · ACCENTS'}
            </span>
            <strong className="text-neutral-900 dark:text-white font-medium block">
              {language === 'es' ? 'Azul Neón Vibrante' : 'Vibrant Neon Blue'}
            </strong>
            <span className="text-neutral-500 text-[11px] mt-1 block">
              {language === 'es' ? 'Azul neón (#38BDF8), bloom intenso, cian eléctrico' : 'Neon blue (#38BDF8), intense bloom, electric cyan'}
            </span>
          </div>
          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm">
            <span className="text-accent uppercase block text-[10px] mb-1">
              {language === 'es' ? '03 · TIPOGRAFÍA' : '03 · TYPOGRAPHY'}
            </span>
            <strong className="text-neutral-900 dark:text-white font-medium block">
              <span className="font-pricedown tracking-wider">Pricedown</span> + Monospace
            </strong>
            <span className="text-neutral-500 text-[11px] mt-1 block">
              {language === 'es' ? 'Tipografía titular Pricedown para una identidad audaz en los títulos, con métricas monoespaciadas' : 'Pricedown title typography establishing bold identity for headlines, paired with technical monospace metrics'}
            </span>
          </div>
          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm">
            <span className="text-accent uppercase block text-[10px] mb-1">
              {language === 'es' ? '04 · CONTRASTE' : '04 · CONTRAST'}
            </span>
            <strong className="text-neutral-900 dark:text-white font-medium block">
              {language === 'es' ? 'Alto Especular' : 'High Specular'}
            </strong>
            <span className="text-neutral-500 text-[11px] mt-1 block">
              {language === 'es' ? 'Reflejos nítidos sobre texturas mate' : 'Crisp reflections against matte textures'}
            </span>
          </div>
        </div>

        {/* Large Editorial Image Placeholders for Future Screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div 
            className="aspect-[16/10] bg-[#0A0A0B] border border-neutral-800 rounded-sm relative overflow-hidden flex flex-col justify-between p-6 group cursor-pointer shadow-lg"
            data-theme-keep="dark"
            onClick={() => setLightboxIndex(0)}
            data-cursor="hover"
          >
            <div className="flex justify-between items-center z-10 image-badge">
              <span className="text-[10px] font-mono tracking-widest text-white bg-black/75 px-2.5 py-1 rounded border border-white/10">
                {language === 'es' ? 'VISUAL 01 · HERO & PORTADA' : 'VISUAL 01 · HERO & LANDING'}
              </span>
              <span className="text-[10px] font-mono text-accent bg-black/75 px-2 py-0.5 rounded border border-accent/20">
                16:10 RAW
              </span>
            </div>

            <img 
              src={visualDirectionHeroImage} 
              alt="Visual 01 Landing" 
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

            <div className="z-10 image-overlay">
              <span className="text-xs font-mono text-accent uppercase font-medium block mb-1">
                {language === 'es' ? 'Captura de Portada' : 'Cover Capture'}
              </span>
              <p className="text-white text-sm font-serif font-light">
                {language === 'es'
                  ? 'Estructura general del hero y presentación inicial del estudio.'
                  : 'Hero structure layout and studio brand positioning.'}
              </p>
            </div>
          </div>

          {/* VISUAL 02 — CAPTURA DEL MÓDULO INTERACTIVO DE ANTES Y DESPUÉS (AZUL NEÓN & ESTÉTICA MODERNA) */}
          <div 
            className="aspect-[16/10] bg-[#0A0A0B] border border-neutral-800 rounded-sm relative overflow-hidden flex flex-col justify-between p-6 group cursor-pointer shadow-lg"
            data-theme-keep="dark"
            onClick={() => setLightboxIndex(1)}
            data-cursor="hover"
          >
            <div className="flex justify-between items-center z-10 image-badge">
              <span className="text-[10px] font-mono tracking-widest text-white bg-black/75 px-2.5 py-1 rounded border border-white/10">
                {language === 'es' ? 'VISUAL 02 · INTERACTIVO ANTES / DESPUÉS' : 'VISUAL 02 · BEFORE / AFTER INTERACTIVE'}
              </span>
              <span className="text-[10px] font-mono text-accent bg-black/75 px-2 py-0.5 rounded border border-accent/20">
                16:10 RAW
              </span>
            </div>

            <img 
              src={visualDirectionNeonImage} 
              alt="Visual 02 Before After Module Capture" 
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.92] group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

            <div className="z-10 image-overlay">
              <span className="text-xs font-mono text-accent uppercase font-medium block mb-1">
                {language === 'es' ? 'Interactivo Antes/Después del Servicio' : 'Interactive Before/After Service'}
              </span>
              <p className="text-white text-sm font-serif font-light">
                {language === 'es'
                  ? 'Módulo interactivo de antes y después del servicio, con estética moderna, reflejos en azul neón vibrante y títulos en tipografía Pricedown.'
                  : 'Interactive before-and-after service module: modern web aesthetic, vibrant neon blue reflections, and Pricedown headline typography.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — INTERACTION & TRANSFORMATION */}
      <section id="interaction-transformation" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            07 — {language === 'es' ? 'INTERACCIÓN & TRANSFORMACIÓN' : 'INTERACTION & TRANSFORMATION'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-950 p-8 md:p-12 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-6">
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
            {language === 'es' ? 'MÁS ALLÁ DEL IDENTIFICADOR PLANO' : 'BEYOND FLAT GRAPHIC IDENTIFIERS'}
          </span>
          <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
            {language === 'es'
              ? 'Transformar activos estáticos de marca en experiencias interactivas vivas'
              : 'Transforming static brand assets into living interactive experiences'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            <p>
              {language === 'es'
                ? 'Históricamente, en la web tradicional, el logotipo de una empresa ha operado como un mero enlace de navegación anclado en la esquina superior izquierda: un activo estático y pasivo que el usuario observa sin interactuar sensorialmente. Este proyecto explora la hipótesis contraria: ¿qué ocurre si la propia identidad gráfica es el acontecimiento principal de la interfaz?'
                : 'Historically in web design, a company logo operates merely as a static navigation anchor pinned to the top-left corner: a passive asset observed without tactile resonance. This case study tests the inverse hypothesis: what happens when brand identity itself is elevated to the primary sensory event of the interface?'}
            </p>
            <p>
              {language === 'es'
                ? 'Al convertir la marca en un neón reactivo con propiedades físicas —luz, reverberación lumínica y micro-inclinación tridimensional—, el usuario establece una conexión física con la marca. Este enfoque ejemplifica mi interés continuo en tender puentes orgánicos entre el diseño gráfico, el diseño de interacción y el desarrollo frontend contemporáneo.'
                : 'By translating the brand into a responsive neon artifact with physical attributes—luminance, photometric bloom, and 3D micro-tilt—the visitor establishes an immediate tactile relationship with the studio. This approach reflects my dedication to uniting graphic design, interaction architecture, and frontend creative technology.'}
            </p>
          </div>
        </div>
      </section>

      {/* 08 — DEVELOPED WITH AI */}
      <section id="developed-with-ai" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            08 — {language === 'es' ? 'DESARROLLADO CON IA' : 'DEVELOPED WITH AI'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="bg-white dark:bg-neutral-950 p-8 md:p-12 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-8 shadow-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent font-mono text-xs tracking-wider uppercase">
              <Cpu size={15} />
              <span>{language === 'es' ? 'INTEGRACIÓN TÉCNICA DE INTELIGENCIA ARTIFICIAL' : 'AI-POWERED WORKFLOW INTEGRATION'}</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
              {language === 'es'
                ? 'La Inteligencia Artificial como catalizador creativo y técnico'
                : 'Artificial Intelligence as a creative and technical amplifier'}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
              {language === 'es'
                ? 'La Inteligencia Artificial se empleó a lo largo de todo el proceso de desarrollo como una herramienta profesional de aceleración, experimentación y síntesis, permitiendo llevar rápidamente conceptos visuales complejos a un prototipo funcional de alta fidelidad.'
                : 'Artificial Intelligence was leveraged across the design and development lifecycle as a professional creative and technical accelerator, translating ambitious visual concepts into an interactive, high-fidelity prototype.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-neutral-200 dark:border-neutral-900">
            <div className="space-y-2">
              <span className="text-xs font-mono text-accent font-medium uppercase">
                {language === 'es' ? '01 · ESTRUCTURA DE INTERFAZ' : '01 · INTERFACE STRUCTURE'}
              </span>
              <h5 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Estructuración UX' : 'UX Structuring'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Modelado de la jerarquía de contenidos y flujos de usuario orientados al sector del motor de lujo mediante razonamiento asistido.'
                  : 'Synthesizing content hierarchies, section order, and high-conversion flows suited for luxury automotive clients.'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-accent font-medium uppercase">
                {language === 'es' ? '02 · FÍSICA DE INTERACCIÓN' : '02 · INTERACTION PHYSICS'}
              </span>
              <h5 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Fórmulas Matemáticas' : 'Interaction Physics'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Aceleración en el cálculo trigonométrico para la atenuación de intensidad y la amortiguación de giro en los ejes X/Y.'
                  : 'Accelerated computation of trigonometric proximity curves, exponential bloom attenuation, and damped X/Y tilt angles.'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-accent font-medium uppercase">
                {language === 'es' ? '03 · ESTRUCTURA DE CÓDIGO' : '03 · CODE SCAFFOLDING'}
              </span>
              <h5 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Implementación Funcional' : 'Functional Implementation'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Traducción rápida de tokens visuales y animaciones a código limpio en React, TypeScript y Tailwind CSS bajo rigurosa dirección humana.'
                  : 'Fast translation of design tokens and state hooks into clean, production-grade React and Tailwind code under strict human art direction.'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-[#070709] rounded border border-neutral-200 dark:border-neutral-850 text-xs font-light text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
            {language === 'es'
              ? 'Nota metodológica: La IA no genera el proyecto por sí sola; funciona como un socio de ingeniería que potencia la visión del diseñador, multiplicando la capacidad de iterar sobre el detalle fino y la arquitectura interactiva.'
              : 'Methodological note: AI does not generate the project autonomously; it acts as an engineering multiplier for the designer’s vision, vastly expanding the capacity to iterate on craft, nuances, and responsive architecture.'}
          </div>
        </div>
      </section>

      {/* 09 — PROTOTYPE STATUS */}
      <section id="prototype-status" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            09 — {language === 'es' ? 'ESTADO DEL PROTOTIPO' : 'PROTOTYPE STATUS'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-950 p-6 md:p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 bg-accent/10 text-accent rounded-sm shrink-0">
              <Shield size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-serif font-light text-neutral-950 dark:text-white">
                {language === 'es'
                  ? 'Prototipo de exploración digital y prueba de concepto funcional'
                  : 'Digital exploration prototype & functional proof-of-concept'}
              </h4>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Este proyecto se presenta como un prototipo web integral. La identidad visual, arquitectura UX, maquetación y comportamientos interactivos se encuentran plenamente desarrollados. Una versión de producción final requeriría la fotografía definitiva de las instalaciones reales de la empresa, testimonios auditados y tarifas comerciales cerradas.'
                  : 'This case study reflects a comprehensive web prototype. The visual identity, UX architecture, layouts, and responsive interactions are fully realized. Commercial production would incorporate the company’s definitive facility photography, verified customer histories, and official price tables.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — PROJECT GALLERY */}
      <section id="project-gallery" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            10 — {language === 'es' ? 'GALERÍA EDITORIAL DEL PROYECTO' : 'PROJECT EDITORIAL GALLERY'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
            {language === 'es'
              ? 'Composiciones visuales y capturas del prototipo'
              : 'Visual compositions & prototype captures'}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
            {language === 'es'
              ? 'Colección de composiciones a gran escala que documentan las distintas pantallas y módulos del prototipo web. Haz clic en cualquiera de ellas para visualizarlas en pantalla completa.'
              : 'Curated large-scale compositions documenting the prototype views and interactive modules. Click on any item to view in full-screen lightbox mode.'}
          </p>
        </div>

        {/* Gallery Grid (4 Items with dedicated, unique prototype captures) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx + 2)}
              data-theme-keep="dark"
              data-cursor="hover"
              className="group cursor-pointer bg-[#0A0A0B] border border-neutral-800 rounded-sm overflow-hidden flex flex-col justify-between p-6 relative aspect-[16/10] shadow-md hover:border-accent/60 transition-all duration-300"
            >
              {/* Background Image */}
              <img
                src={item.src}
                alt={language === 'es' ? item.labelEs : item.labelEn}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Top tag */}
              <div className="relative z-10 flex justify-between items-center image-badge">
                <span className="text-[10px] font-mono tracking-widest text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/10 uppercase font-medium">
                  {language === 'es' ? item.labelEs : item.labelEn}
                </span>
                <span className="text-[10px] font-mono text-accent bg-black/75 px-2 py-0.5 rounded border border-accent/25 uppercase">
                  {item.tag}
                </span>
              </div>

              {/* Bottom text */}
              <div className="relative z-10 image-overlay">
                <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                  {language === 'es' ? item.subtitleEs : item.subtitleEn}
                </p>
              </div>

              {/* Hover Zoom Prompt */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 pointer-events-none">
                <div className="px-3.5 py-1.5 bg-black/85 backdrop-blur-md rounded border border-white/20 text-white text-xs font-mono flex items-center gap-2 shadow-2xl">
                  <Maximize2 size={13} className="text-accent" />
                  <span>{language === 'es' ? 'Ver en detalle' : 'View full frame'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11 — VIEW PROTOTYPE (HERO CTA) */}
      <section id="view-prototype" className="pt-8">
        <div className="relative rounded-sm overflow-hidden bg-gradient-to-br from-neutral-900 via-[#0D0B0A] to-neutral-950 border border-neutral-800 p-8 sm:p-14 text-center space-y-6 shadow-2xl" data-theme-keep="dark">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-96 h-96 rounded-full bg-accent/10 filter blur-[90px]" />
          </div>

          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium block">
              11 — {language === 'es' ? 'EXPERIMENTA EL SITIO WEB' : 'EXPERIENCE THE WEBSITE'}
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif font-light text-white leading-tight">
              Los Santos Detailing
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Explora el prototipo interactivo desplegado en vivo con el rótulo de neón reactivo al cursor y la arquitectura completa de servicios.'
                : 'Explore the live deployed prototype with the cursor-reactive neon sign and full service architecture.'}
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <a
              href="https://los-santos-detailing.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-[#D8B97E] text-neutral-950 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-medium rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-[0_0_25px_rgba(201,169,110,0.4)]"
              data-cursor="hover"
            >
              <span>{language === 'es' ? 'Ver Prototipo' : 'View Prototype'}</span>
              <ArrowRight size={18} />
            </a>
            <div className="mt-3 text-[11px] font-mono text-neutral-500">
              los-santos-detailing.vercel.app
            </div>
          </div>
        </div>
      </section>

      {/* --- FULLSCREEN LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2.5 rounded-full bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors z-50 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X size={22} />
            </button>

            {/* Prev Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : allModalItems.length - 1) : null))}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors z-50 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev < allModalItems.length - 1 ? prev + 1 : 0) : null))}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors z-50 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4"
              data-theme-keep="dark"
            >
              <div className="relative w-full aspect-[16/10] max-h-[70vh] bg-neutral-950 border border-neutral-850 rounded-sm overflow-hidden flex items-center justify-center shadow-2xl">
                <img
                  src={allModalItems[lightboxIndex].src}
                  alt={language === 'es' ? allModalItems[lightboxIndex].labelEs : allModalItems[lightboxIndex].labelEn}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption */}
              <div className="text-center space-y-1.5 px-4">
                <span className="text-xs font-mono text-accent tracking-widest uppercase">
                  {allModalItems[lightboxIndex].tag} · {lightboxIndex + 1} / {allModalItems.length}
                </span>
                <h4 className="text-lg font-serif text-white">
                  {language === 'es' ? allModalItems[lightboxIndex].labelEs : allModalItems[lightboxIndex].labelEn}
                </h4>
                <p className="text-xs sm:text-sm font-light text-neutral-300 max-w-xl mx-auto leading-relaxed">
                  {language === 'es' ? allModalItems[lightboxIndex].subtitleEs : allModalItems[lightboxIndex].subtitleEn}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
