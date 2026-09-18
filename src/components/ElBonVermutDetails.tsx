import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  Layers, 
  MousePointer, 
  Cpu, 
  ExternalLink, 
  Sparkles, 
  Info, 
  Eye, 
  Layout, 
  CheckCircle2, 
  Monitor, 
  Smartphone, 
  Maximize2,
  RotateCcw,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../LanguageContext';
// @ts-expect-error - Vite handles asset imports correctly
import vermutLogoImage from '../assets/images/vermut_logo_1789665679862.jpg';
// @ts-expect-error - Vite handles asset imports correctly
import vermutLandingHeroImage from '../assets/images/regenerated_image_1789716993590.png';
// @ts-expect-error - Vite handles asset imports correctly
import vermutCoverImage from '../assets/images/vermut_cover_1789638959654.jpg';
// @ts-expect-error - Vite handles asset imports correctly
import parallaxBgImage from '../assets/images/background.png';
// @ts-expect-error - Vite handles asset imports correctly
import parallaxMidImage from '../assets/images/midground.png';
// @ts-expect-error - Vite handles asset imports correctly
import parallaxForeImage from '../assets/images/foregound.png';

// Dedicated, independent project gallery captures
// @ts-expect-error - Vite handles asset imports correctly
import vermutGalleryLanding from '../assets/images/regenerated_image_1789739055127.png';
// @ts-expect-error - Vite handles asset imports correctly
import vermutGalleryHistoria from '../assets/images/regenerated_image_1789739056896.png';
// @ts-expect-error - Vite handles asset imports correctly
import vermutGalleryCarta from '../assets/images/regenerated_image_1789739057369.png';
// @ts-expect-error - Vite handles asset imports correctly
import vermutGalleryReservas from '../assets/images/regenerated_image_1789739058164.png';

interface ElBonVermutDetailsProps {
  project: Project;
}

export default function ElBonVermutDetails({ project }: ElBonVermutDetailsProps) {
  const { language } = useLanguage();
  const [activeParallaxTab, setActiveParallaxTab] = useState<'interactive' | 'exploded'>('interactive');

  // Interactive Parallax demo state with Gyroscope (DeviceOrientation) & Touch support
  const demoRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [inputSource, setInputSource] = useState<'mouse' | 'gyro' | 'touch'>('mouse');
  const [gyroActive, setGyroActive] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);
  const baseBetaRef = useRef<number | null>(null);

  // Mouse interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!demoRef.current) return;
    setInputSource('mouse');
    const rect = demoRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    if (inputSource === 'mouse') {
      setMousePos({ x: 0, y: 0 });
    }
  };

  // Touch drag interaction for mobile & tablet
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!demoRef.current || e.touches.length === 0) return;
    setInputSource('touch');
    const touch = e.touches[0];
    const rect = demoRef.current.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((touch.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((touch.clientY - rect.top) / rect.height - 0.5) * 2));
    setMousePos({ x, y });
  };

  // Device orientation (Gyroscope / Accelerometer) for physical device tilting
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      setGyroActive(true);
      setInputSource('gyro');

      // Calibrate base reading posture on first orientation read
      if (baseBetaRef.current === null) {
        baseBetaRef.current = e.beta;
      }

      // Gamma: Left-to-right tilt (range roughly -28 to +28 deg)
      const gammaClamped = Math.max(-28, Math.min(28, e.gamma));
      const x = gammaClamped / 28;

      // Beta: Front-to-back tilt relative to baseline reading posture (range roughly -22 to +22 deg)
      const deltaBeta = e.beta - (baseBetaRef.current ?? 45);
      const betaClamped = Math.max(-22, Math.min(22, deltaBeta));
      const y = betaClamped / 22;

      setMousePos({ x, y });
    };

    // Check if device requires permission (iOS 13+ Safari)
    const DeviceOrientation = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };

    if (typeof DeviceOrientation?.requestPermission === 'function') {
      setNeedsPermission(true);
    } else if ('ondeviceorientation' in window || 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Request Gyroscope permissions (iOS 13+ user gesture requirement)
  const requestGyroPermission = async () => {
    const DeviceOrientation = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };

    if (typeof DeviceOrientation?.requestPermission === 'function') {
      try {
        const response = await DeviceOrientation.requestPermission();
        if (response === 'granted') {
          setNeedsPermission(false);
          setGyroActive(true);
          baseBetaRef.current = null;
          window.addEventListener(
            'deviceorientation',
            (e: DeviceOrientationEvent) => {
              if (e.gamma === null || e.beta === null) return;
              setInputSource('gyro');
              if (baseBetaRef.current === null) {
                baseBetaRef.current = e.beta;
              }
              const gammaClamped = Math.max(-28, Math.min(28, e.gamma));
              const x = gammaClamped / 28;
              const deltaBeta = e.beta - (baseBetaRef.current ?? 45);
              const betaClamped = Math.max(-22, Math.min(22, deltaBeta));
              const y = betaClamped / 22;
              setMousePos({ x, y });
            },
            true
          );
        }
      } catch (err) {
        console.warn('Error requesting DeviceOrientation permission:', err);
      }
    }
  };

  const recalibrateGyro = () => {
    baseBetaRef.current = null;
    setMousePos({ x: 0, y: 0 });
  };

  // Lightbox state and gallery item definitions
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems = [
    {
      id: 'landing',
      imageId: 'gallery-image-landing',
      src: vermutGalleryLanding,
      titleEs: '01 · LA LANDING',
      titleEn: '01 · THE LANDING PAGE',
      descEs: 'Cabecera interactiva con efecto de paralaje multicapa y navegación del sitio web.',
      descEn: 'Interactive header featuring multilayer parallax depth and website navigation.',
      Icon: Monitor,
    },
    {
      id: 'historia',
      imageId: 'gallery-image-historia',
      src: vermutGalleryHistoria,
      titleEs: '02 · LA NOSTRA HISTÒRIA',
      titleEn: '02 · OUR STORY',
      descEs: 'Relato de tradición vermutera con fotografías históricas de archivo de Sant Boi de Llobregat.',
      descEn: 'Heritage storytelling section with vintage archive photographs of Sant Boi de Llobregat.',
      Icon: BookOpen,
    },
    {
      id: 'carta',
      imageId: 'gallery-image-carta',
      src: vermutGalleryCarta,
      titleEs: '03 · LA CARTA',
      titleEn: '03 · THE MENU',
      descEs: 'Diseño editorial gastronómico con vermuts artesanos, aperitivos selectos y tapas.',
      descEn: 'Editorial culinary menu with artisanal vermouths, selected appetizers, and tapas.',
      Icon: Layout,
    },
    {
      id: 'reservas',
      imageId: 'gallery-image-reservas',
      src: vermutGalleryReservas,
      titleEs: '04 · FORMULARIO DE RESERVAS',
      titleEn: '04 · RESERVATION FORM',
      descEs: 'Módulo interactivo de reserva online para mesas y catas con selector de turnos.',
      descEn: 'Interactive table and tasting booking interface with time slot and party selectors.',
      Icon: Calendar,
    },
  ];

  // Handle keyboard navigation and background scroll locking when lightbox is active
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : galleryItems.length - 1) : null));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev < galleryItems.length - 1 ? prev + 1 : 0) : null));
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pb-24 space-y-28 text-neutral-800 dark:text-neutral-200 font-sans transition-colors duration-400">
      
      {/* 01 — INTRODUCTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            01 — {language === 'es' ? 'INTRODUCCIÓN' : 'INTRODUCTION'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-950 dark:text-white leading-[1.15]">
              El Bon Vermut
            </h2>
            <p className="text-sm font-mono tracking-wider text-accent uppercase">
              {language === 'es'
                ? 'Experiencia digital para una vermutería tradicional'
                : 'Digital experience for a traditional vermouth bar'}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5 text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-light leading-relaxed">
            <p>
              {language === 'es'
                ? 'El Bon Vermut es un negocio real ubicado en Sant Boi de Llobregat (Barcelona). Este proyecto nace con la intención de crear un prototipo de experiencia digital que capture fielmente la esencia de una vermutería tradicional catalana, reinterpretándola con una mirada contemporánea, atractiva e interactiva.'
                : 'El Bon Vermut is a real existing business located in Sant Boi de Llobregat (Barcelona). This project was born with the purpose of designing a digital experience prototype that faithfully captures the essence of a traditional Catalan vermouth bar, reinterpreting it through a contemporary, engaging, and interactive lens.'}
            </p>
            <p>
              {language === 'es'
                ? 'El propósito central ha sido dotar a un bar de proximidad de una presencia web a la altura de su carácter: un espacio acogedor donde el vermut, las tapas y el encuentro vecinal forman un ritual que merece ser vivido también a través de la pantalla.'
                : 'The core objective was to provide a local neighborhood bar with a digital presence worthy of its character: a welcoming space where vermouth, tapas, and community gathering constitute a ritual that deserves to be celebrated on screen as well.'}
            </p>
          </div>
        </div>
      </section>

      {/* 02 — CONCEPT */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            02 — {language === 'es' ? 'CONCEPTO CREATIVO' : 'CREATIVE CONCEPT'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-950 p-8 md:p-12 border border-neutral-200 dark:border-neutral-900 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Conceptual narrative: Derivative of the logo composition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
                  {language === 'es' ? 'GÉNESIS GRÁFICA & IDENTIDAD' : 'GRAPHIC GENESIS & IDENTITY'}
                </span>
                <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
                  {language === 'es'
                    ? 'La web como derivado interactivo de la composición de su logotipo'
                    : 'The website as an interactive derivative of its logo composition'}
                </h3>
              </div>

              <div className="space-y-4 text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                <p>
                  {language === 'es'
                    ? 'El concepto creativo de la web no proviene de una estructura genérica, sino que es un derivado directo de la propia composición de su logotipo. La identidad visual de El Bon Vermut ya albergaba en su emblema una síntesis gráfica completa del negocio y de su arraigo territorial en Sant Boi de Llobregat.'
                    : 'The creative concept of the website does not stem from a generic layout, but is a direct derivative of its own logo composition. The visual identity of El Bon Vermut already harbored within its emblem a complete graphic synthesis of the establishment and its local roots in Sant Boi de Llobregat.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'La composición del logotipo original articula en un único plano armónico todos los elementos esenciales: en el centro, la mesa con el clásico vaso de vermut y los aperitivos de taberna; flanqueándola a ambos costados, dos montañas que representan los iconos patrimoniales de Sant Boi —la Ermita de Sant Ramon por un lado y la emblemática iglesia parroquial de Sant Boi por el otro—; y tras ellos, el perfil natural del paisaje.'
                    : 'The original logo composition articulates within a single harmonious frame all core elements: at the center, the table with the classic vermouth glass and bistro tapas; flanking either side, two mountains capturing the heritage landmarks of Sant Boi—the Ermita de Sant Ramon on one side and the Sant Boi parish church on the other—; and behind them, the landscape horizon.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'El reto y la propuesta del proyecto consistió en trasladar esa misma composición bidimensional a un espacio web tridimensional y vivo. Al descomponer el logotipo en capas de profundidad independientes que se desplazan de manera reactiva con la posición del ratón, el usuario deja de ver un logotipo estático para interactuar directamente con la atmósfera y los elementos que lo componen.'
                    : 'The core challenge and proposal of this project was translating that very two-dimensional composition into a living, three-dimensional web experience. By deconstructing the logo into independent depth planes that shift reactively with the user\'s mouse movement, the visitor ceases to view a static logo and instead steps directly into its interactive atmosphere.'}
                </p>
              </div>

              {/* Compositional layer mapping pills */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white dark:bg-[#0E0E0E] border border-neutral-200 dark:border-neutral-800/70 rounded-sm text-center">
                  <span className="text-[10px] font-mono text-accent block mb-1">
                    {language === 'es' ? 'NÚCLEO CENTRAL' : 'CORE ANCHOR'}
                  </span>
                  <span className="text-xs font-serif font-medium text-neutral-900 dark:text-white">
                    {language === 'es' ? 'Vaso de Vermut' : 'Vermouth Table'}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-[#0E0E0E] border border-neutral-200 dark:border-neutral-800/70 rounded-sm text-center">
                  <span className="text-[10px] font-mono text-accent block mb-1">
                    {language === 'es' ? 'HITOS LOCALES' : 'LANDMARKS'}
                  </span>
                  <span className="text-xs font-serif font-medium text-neutral-900 dark:text-white">
                    St. Ramon &amp; Sant Boi
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-[#0E0E0E] border border-neutral-200 dark:border-neutral-800/70 rounded-sm text-center">
                  <span className="text-[10px] font-mono text-accent block mb-1">
                    {language === 'es' ? 'FONDO NATURAL' : 'BACKGROUND'}
                  </span>
                  <span className="text-xs font-serif font-medium text-neutral-900 dark:text-white">
                    {language === 'es' ? 'Paisaje de Sant Boi' : 'Sant Boi Horizon'}
                  </span>
                </div>
              </div>
            </div>

            {/* Logo image showcase alongside */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm bg-white dark:bg-[#0E0E0E] border border-neutral-200 dark:border-neutral-800 rounded-sm p-4 sm:p-6 shadow-sm dark:shadow-none space-y-4">
                <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-850 pb-3 text-[10px] font-mono">
                  <span className="text-accent uppercase tracking-wider font-semibold">
                    {language === 'es' ? 'IDENTIDAD DE MARCA' : 'BRAND IDENTITY'}
                  </span>
                  <span className="text-neutral-400">EMBLEMA ORIGINAL</span>
                </div>

                {/* Logo Image */}
                <div className="aspect-square w-full rounded-sm overflow-hidden bg-[#FBF8F3] dark:bg-[#141110] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-center p-3 relative group">
                  <img
                    src={vermutLogoImage}
                    alt="Logotipo de El Bon Vermut"
                    className="w-full h-full object-contain rounded-sm transition-transform duration-500 ease-out group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors pointer-events-none" />
                </div>

                <div className="space-y-1.5 pt-1 text-center sm:text-left">
                  <h4 className="text-sm font-serif font-medium text-neutral-900 dark:text-white">
                    El Bon Vermut · Logotipo
                  </h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    {language === 'es'
                      ? 'Emblema circular con el vaso de vermut, Sant Ramon, la iglesia y el paisaje que da origen a la composición interactiva de la web.'
                      : 'Circular emblem featuring the vermouth glass, Sant Ramon hermitage, parish church, and landscape that inspired the interactive website.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-850 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>SANT BOI DE LLOBREGAT</span>
                  <span className="text-accent">GÉNESIS DEL DISEÑO</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 03 — VISUAL DIRECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            03 — {language === 'es' ? 'DIRECCIÓN VISUAL' : 'VISUAL DIRECTION'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <h3 className="text-2xl md:text-3xl font-serif font-light text-neutral-950 dark:text-white">
              {language === 'es'
                ? 'Atmósfera cálida, cromatismo de taberna y elegancia tipográfica'
                : 'Warm atmosphere, tavern chromatics, and typographic poise'}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed">
              {language === 'es'
                ? 'La dirección visual se fundamenta en los tonos rojizos y ambarinos del propio vermut con sifón, maderas envejecidas, blancos rotos y acentos dorados. Una tipografía display clásica convive con una composición limpia y generosa en aire negativo, transmitiendo accesibilidad sin sacrificar sofisticación.'
                : 'The visual direction is anchored in the amber and ruby tones of traditional bottled vermouth with siphon, weathered bistro woods, off-whites, and golden accents. A classic display typeface lives alongside generous negative space, communicating approachable authenticity without sacrificing refined elegance.'}
            </p>
          </div>

          {/* Media placeholder container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
            <div className="lg:col-span-8 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm overflow-hidden aspect-[16/10] relative group flex flex-col justify-between shadow-sm dark:shadow-none">
              {/* Image specimen */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={vermutLandingHeroImage}
                  alt={language === 'es' ? 'Composición de cabecera de El Bon Vermut' : 'El Bon Vermut Hero Landing Composition'}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Top title badge overlay */}
              <div className="flex items-center p-4 sm:p-6 z-10">
                <span className="text-[11px] font-mono tracking-widest text-white uppercase flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 shadow-sm">
                  <Layout size={13} className="text-accent" /> {language === 'es' ? 'COMPOSICIÓN DE CABECERA / LANDING HERO' : 'HERO LANDING COMPOSITION'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm p-6 flex-1 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-850 pb-3">
                  <span className="text-[11px] font-mono tracking-wider text-neutral-600 dark:text-neutral-400 uppercase">
                    {language === 'es' ? 'CROMATISMO' : 'CHROMATICS'}
                  </span>
                  <span className="text-[10px] font-mono text-accent">PALETTE</span>
                </div>
                <div className="grid grid-cols-4 gap-2 my-4">
                  <div className="h-14 rounded-xs bg-[#78231C] flex items-end p-1 text-[8px] font-mono text-white/80">#78231C</div>
                  <div className="h-14 rounded-xs bg-[#C9A96E] flex items-end p-1 text-[8px] font-mono text-neutral-900 font-bold">#C9A96E</div>
                  <div className="h-14 rounded-xs bg-[#F4EFEA] border border-neutral-300 flex items-end p-1 text-[8px] font-mono text-neutral-800">#F4EFEA</div>
                  <div className="h-14 rounded-xs bg-[#1C1A17] flex items-end p-1 text-[8px] font-mono text-white/80">#1C1A17</div>
                </div>
                <p className="text-[11px] text-neutral-500 font-light">
                  {language === 'es' ? 'Rojo vermut, dorado barrica, crema papel y carbón taberna.' : 'Vermouth ruby, barrel gold, paper cream, and tavern charcoal.'}
                </p>
              </div>

              <div className="bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm p-6 flex-1 flex flex-col justify-between">
                <span className="text-[11px] font-mono tracking-wider text-neutral-600 dark:text-neutral-400 uppercase border-b border-neutral-200 dark:border-neutral-850 pb-3">
                  {language === 'es' ? 'TIPOGRAFÍA' : 'TYPOGRAPHY'}
                </span>
                <div className="my-3 space-y-1">
                  <div className="font-serif text-2xl text-neutral-950 dark:text-white">Playfair / Editorial</div>
                  <div className="font-mono text-xs text-accent">Plus Jakarta Sans &amp; JetBrains Mono</div>
                </div>
                <p className="text-[11px] text-neutral-500 font-light">
                  {language === 'es' ? 'Elegancia clásica para títulos, claridad contemporánea para lectura.' : 'Classic display elegance for titles, crisp clarity for menus and content.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — UX / UI */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            04 — {language === 'es' ? 'EXPERIENCIA DE USUARIO Y ESTRUCTURA' : 'UX / UI ARCHITECTURE'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <h3 className="text-2xl md:text-3xl font-serif font-light text-neutral-950 dark:text-white">
              {language === 'es'
                ? 'Arquitectura de información pensada para la hostelería de proximidad'
                : 'Information architecture crafted for neighborhood hospitality'}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed">
              {language === 'es'
                ? 'El prototipo organiza la experiencia en 5 bloques estratégicos, permitiendo al cliente conocer el alma del local, explorar la oferta gastronómica y gestionar su visita con la máxima fluidez desde cualquier dispositivo.'
                : 'The prototype organizes the user journey into 5 strategic sections, allowing guests to discover the venue\'s spirit, browse the food and vermouth selections, and arrange their visit seamlessly across any device.'}
            </p>
          </div>

          {/* 5 UI Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                num: '01',
                titleEs: 'Historia / Sobre Mí',
                titleEn: 'History / Story',
                descEs: 'Relato sobre la tradición del local, el valor del producto artesanal y su papel en el barrio.',
                descEn: 'Storytelling regarding the bar\'s traditions, artisanal produce, and neighborhood role.'
              },
              {
                num: '02',
                titleEs: 'Carta & Tapas',
                titleEn: 'Menu & Tapas',
                descEs: 'Visualización clara de vermuts de grifo y botella, conservas selectas, olivas y aperitivos.',
                descEn: 'Clear presentation of draft and bottled vermouths, tinned delicacies, and tapas.'
              },
              {
                num: '03',
                titleEs: 'Galería Visual',
                titleEn: 'Visual Gallery',
                descEs: 'Espacio inmersivo que transmitirá el ambiente del bar, la barra y el pulso de la clientela.',
                descEn: 'Immersive visual space showcasing tavern atmosphere, the counter, and patrons.'
              },
              {
                num: '04',
                titleEs: 'Reservas',
                titleEn: 'Reservations',
                descEs: 'Módulo ágil para solicitar mesa en terraza o interior de forma directa y sin fricción.',
                descEn: 'Frictionless interface to reserve terrace or indoor seating on high-demand days.'
              },
              {
                num: '05',
                titleEs: 'Contacto & Mapa',
                titleEn: 'Contact & Map',
                descEs: 'Horarios de apertura, localización exacta en Sant Boi de Llobregat y acceso telefónico.',
                descEn: 'Opening hours, exact geographic location in Sant Boi, and direct phone link.'
              }
            ].map((block) => (
              <div
                key={block.num}
                className="bg-white dark:bg-[#0E0E0E] p-6 border border-neutral-200 dark:border-neutral-800/80 rounded-sm flex flex-col justify-between hover:border-accent/40 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-accent">{block.num}</span>
                  <h4 className="text-base font-serif font-medium text-neutral-900 dark:text-white mt-2 mb-2">
                    {language === 'es' ? block.titleEs : block.titleEn}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    {language === 'es' ? block.descEs : block.descEn}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-neutral-100 dark:border-neutral-900 flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                  <CheckCircle2 size={12} className="text-accent" />
                  <span>{language === 'es' ? 'Área Prototipada' : 'Prototyped View'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — THE PARALLAX (HERO FEATURE OF THE CASE STUDY) */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            05 — {language === 'es' ? 'EL SISTEMA PARALLAX DE TRES CAPAS' : 'THE THREE-LAYER PARALLAX SYSTEM'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white">
              {language === 'es'
                ? 'Identidad gráfica viva: profundidad espacial a través del cursor'
                : 'Living graphic identity: spatial depth through cursor interaction'}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed">
              {language === 'es'
                ? 'El elemento distintivo principal del sitio web es un sistema de paralaje de tres capas inspirado en la identidad visual del negocio. En lugar de una animación pregrabada, el sistema calcula en tiempo real la posición del ratón para desplazar los planos con diferentes coeficientes cinéticos, conectando el producto con su territorio.'
                : 'The primary differentiating element of the website is a three-layer parallax system rooted in the business\'s visual identity. Instead of a pre-baked video loop, the system calculates cursor coordinates in real time to shift visual planes with distinct kinetic coefficients, connecting the product with its territory.'}
            </p>
          </div>

          {/* Interactive Parallax Sandbox Showcase */}
          <div className="bg-neutral-950 text-white border border-neutral-800 rounded-sm overflow-hidden">
            {/* Header / Mode Switcher */}
            <div className="p-4 sm:p-6 border-b border-neutral-850 flex flex-wrap items-center justify-between gap-4 bg-neutral-950/80">
              <div className="flex items-center gap-3">
                <Layers size={18} className="text-accent" />
                <div>
                  <h4 className="text-xs sm:text-sm font-mono tracking-wider uppercase text-white font-medium">
                    {language === 'es' ? 'DEMOSTRADOR INTERACTIVO DEL PARALLAX' : 'INTERACTIVE PARALLAX DEMONSTRATOR'}
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-400">
                    {language === 'es' 
                      ? 'Mueve el ratón o inclina tu móvil / tablet con el giroscopio para desplazar las capas' 
                      : 'Move cursor or tilt your mobile / tablet with the gyroscope to shift the layers'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-sm border border-neutral-800 text-xs font-mono">
                <button
                  onClick={() => setActiveParallaxTab('interactive')}
                  className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                    activeParallaxTab === 'interactive'
                      ? 'bg-neutral-800 text-accent font-medium'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {language === 'es' ? 'Vista Interactiva' : 'Interactive View'}
                </button>
                <button
                  onClick={() => setActiveParallaxTab('exploded')}
                  className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                    activeParallaxTab === 'exploded'
                      ? 'bg-neutral-800 text-accent font-medium'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {language === 'es' ? 'Desglose en 3 Planos' : '3-Plane Explosion'}
                </button>
              </div>
            </div>

            {/* Interactive Canvas Area */}
            {activeParallaxTab === 'interactive' ? (
              <div
                ref={demoRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={handleTouchMove}
                className="relative h-[480px] sm:h-[560px] md:h-[640px] w-full overflow-hidden bg-[#0D0B0A] cursor-crosshair select-none flex items-end justify-center touch-none"
              >
                {/* Mobile / Gyroscope helper controls */}
                <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                  {needsPermission && (
                    <button
                      onClick={requestGyroPermission}
                      className="cursor-pointer text-[10px] font-mono text-accent bg-black/85 hover:bg-neutral-900 backdrop-blur-md px-3 py-1.5 rounded-sm border border-accent/40 flex items-center gap-1.5 shadow-lg transition-colors"
                    >
                      <Smartphone size={12} className="text-accent" />
                      <span>{language === 'es' ? 'Activar Inclinación 3D' : 'Enable Tilt 3D'}</span>
                    </button>
                  )}
                  {gyroActive && (
                    <button
                      onClick={recalibrateGyro}
                      title={language === 'es' ? 'Recalibrar ángulo de inclinación' : 'Recalibrate resting tilt'}
                      className="cursor-pointer text-[10px] font-mono text-neutral-300 bg-black/80 hover:bg-neutral-900 backdrop-blur-md px-2.5 py-1.5 rounded-sm border border-neutral-800 flex items-center gap-1.5 shadow-lg transition-colors"
                    >
                      <RotateCcw size={11} className="text-accent" />
                      <span className="hidden sm:inline">{language === 'es' ? 'Recalibrar' : 'Recalibrate'}</span>
                    </button>
                  )}
                </div>

                {/* Subtle vignette shadow overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/35 z-20" />

                {/* LAYER 1: Background — Landscape & Sky (moves strongest: multiplier -26px) */}
                <div
                  className="absolute inset-x-[-8%] inset-y-[-8%] transition-transform duration-150 ease-out pointer-events-none will-change-transform"
                  style={{
                    transform: `translate3d(${mousePos.x * -26}px, ${mousePos.y * -16}px, 0)`
                  }}
                >
                  <img
                    src={parallaxBgImage}
                    alt="Capa 1: Fondo y horizonte de montañas de Sant Boi"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-8 text-[9px] font-mono text-white/50 uppercase tracking-widest bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                    [ CAPA 01: HORIZONTE Y CIELO · COEFICIENTE ×1.0 ]
                  </div>
                </div>

                {/* LAYER 2: Midground — Village & Heritage Landmarks (Sant Ramon + Church) (moves moderately: multiplier -14px) */}
                <div
                  className="absolute inset-x-[-4%] bottom-0 top-0 flex items-end justify-center transition-transform duration-200 ease-out pointer-events-none will-change-transform z-10"
                  style={{
                    transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * -8}px, 0)`
                  }}
                >
                  <img
                    src={parallaxMidImage}
                    alt="Capa 2: Ermita de Sant Ramon e Iglesia de Sant Boi de Llobregat"
                    className="w-full h-full object-cover sm:object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden md:block absolute bottom-24 left-8 text-[9px] font-mono text-accent/80 uppercase tracking-widest bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-accent/20">
                    [ CAPA 02: SANT RAMON & IGLESIA · COEFICIENTE ×0.50 ]
                  </div>
                </div>

                {/* LAYER 3: Foreground — Vermouth Table (STRICT STATIC ANCHOR: 0px displacement) */}
                <div
                  className="absolute bottom-[-1%] sm:bottom-[-2%] left-1/2 -translate-x-1/2 w-[92%] sm:w-[78%] md:w-[66%] lg:w-[56%] max-w-[680px] z-20 pointer-events-none flex flex-col items-center will-change-transform"
                >
                  <img
                    src={parallaxForeImage}
                    alt="Capa 3: Mesa de madera, botella de Vermut El Bon, vaso y aperitivos"
                    className="w-full h-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Static Anchor Badge */}
                  <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-md border border-accent/40 rounded-full text-[9px] font-mono tracking-widest text-accent uppercase font-medium whitespace-nowrap shadow-xl">
                    ANCLA VISUAL INMÓVIL (0px)
                  </div>
                </div>

                {/* Instruction hover caption */}
                <div className="absolute bottom-4 right-4 z-30 pointer-events-none text-[10px] font-mono text-neutral-300 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-sm border border-neutral-800 flex items-center gap-2 shadow-lg max-w-[85%] sm:max-w-none">
                  {inputSource === 'gyro' ? (
                    <>
                      <Compass size={12} className="text-accent animate-pulse shrink-0" />
                      <span>{language === 'es' ? 'Giroscopio activo: inclina tu dispositivo' : 'Tilt sensor active: tilt your device'}</span>
                    </>
                  ) : (
                    <>
                      <Smartphone size={12} className="text-accent animate-pulse shrink-0 sm:hidden" />
                      <MousePointer size={12} className="text-accent animate-bounce shrink-0 hidden sm:block" />
                      <span>
                        {language === 'es'
                          ? 'Mueve el ratón, inclina tu móvil o desliza el dedo'
                          : 'Move cursor, tilt device or drag finger'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* Exploded 3-Plane Isometric Visualization */
              <div className="p-6 sm:p-10 bg-[#0D0B0A] space-y-8">
                {/* 3D Visual Stack Demonstration */}
                <div className="relative h-64 sm:h-72 w-full rounded-sm overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 flex items-center justify-center p-4">
                  <div className="relative w-full max-w-2xl h-full flex items-center justify-center [perspective:1000px]">
                    {/* Layer 1 Plane (Back) */}
                    <div className="absolute w-56 sm:w-72 h-36 sm:h-44 rounded-sm border border-neutral-700 bg-neutral-900 shadow-2xl overflow-hidden [transform:rotateX(55deg)_rotateZ(-28deg)_translateZ(-50px)] transition-transform duration-500 hover:scale-105">
                      <img src={parallaxBgImage} alt="Plano 1" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                        <span className="text-[9px] font-mono text-accent font-bold">PLANO 01 · FONDO</span>
                      </div>
                    </div>

                    {/* Layer 2 Plane (Middle) */}
                    <div className="absolute w-56 sm:w-72 h-36 sm:h-44 rounded-sm border border-accent/40 bg-neutral-900/90 shadow-2xl overflow-hidden [transform:rotateX(55deg)_rotateZ(-28deg)_translateZ(20px)] transition-transform duration-500 hover:scale-105">
                      <img src={parallaxMidImage} alt="Plano 2" className="w-full h-full object-contain object-bottom" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/20 flex items-end p-2">
                        <span className="text-[9px] font-mono text-accent font-bold">PLANO 02 · HITOS</span>
                      </div>
                    </div>

                    {/* Layer 3 Plane (Front) */}
                    <div className="absolute w-56 sm:w-72 h-36 sm:h-44 rounded-sm border-2 border-accent bg-neutral-900/95 shadow-2xl overflow-hidden [transform:rotateX(55deg)_rotateZ(-28deg)_translateZ(90px)] transition-transform duration-500 hover:scale-105">
                      <img src={parallaxForeImage} alt="Plano 3" className="w-full h-full object-contain object-bottom" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/10 flex items-end p-2">
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">PLANO 03 · MESA (ANCLA)</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-1 rounded">
                    DESPIECE ISOMÉTRICO TRIDIMENSIONAL
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Plane 1 */}
                  <div className="p-5 bg-neutral-900/70 border border-neutral-800 rounded-sm space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-accent font-bold">PLANO 01 — FONDO</span>
                        <span className="text-neutral-400">DELTA × 1.0</span>
                      </div>
                      <div className="aspect-[16/9] w-full rounded overflow-hidden border border-neutral-800 bg-neutral-950">
                        <img src={parallaxBgImage} alt="Plano 1 Fondo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h5 className="text-base font-serif text-white">Paisaje de Sant Boi</h5>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        Cielo y cordillera del Baix Llobregat. Al ser la capa más distante, experimenta el desplazamiento reactivo más amplio (-26px) para generar perspectiva profunda.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-neutral-800 text-[10px] font-mono text-accent flex justify-between">
                      <span>Desplazamiento: -26px</span>
                      <span>Asset: background.png</span>
                    </div>
                  </div>

                  {/* Plane 2 */}
                  <div className="p-5 bg-neutral-900/70 border border-neutral-800 rounded-sm space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-accent font-bold">PLANO 02 — MEDIO</span>
                        <span className="text-neutral-400">DELTA × 0.50</span>
                      </div>
                      <div className="aspect-[16/9] w-full rounded overflow-hidden border border-neutral-800 bg-[#161210] flex items-end justify-center p-1">
                        <img src={parallaxMidImage} alt="Plano 2 Medio" className="w-full h-full object-contain object-bottom" referrerPolicy="no-referrer" />
                      </div>
                      <h5 className="text-base font-serif text-white">Sant Ramon y la Iglesia</h5>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        Montañas con la Ermita de Sant Ramon a la derecha y el campanario parroquial de Sant Boi a la izquierda. PNG recortado con transparencia (-14px).
                      </p>
                    </div>
                    <div className="pt-3 border-t border-neutral-800 text-[10px] font-mono text-accent flex justify-between">
                      <span>Desplazamiento: -14px</span>
                      <span>Asset: midground.png</span>
                    </div>
                  </div>

                  {/* Plane 3 */}
                  <div className="p-5 bg-neutral-900/70 border border-accent/40 rounded-sm space-y-3 shadow-[0_0_15px_rgba(201,169,110,0.1)] flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-accent font-bold">PLANO 03 — FRENTE</span>
                        <span className="text-emerald-400 font-bold">ESTÁTICO</span>
                      </div>
                      <div className="aspect-[16/9] w-full rounded overflow-hidden border border-neutral-800 bg-[#161210] flex items-end justify-center p-1">
                        <img src={parallaxForeImage} alt="Plano 3 Frente" className="w-full h-full object-contain object-bottom" referrerPolicy="no-referrer" />
                      </div>
                      <h5 className="text-base font-serif text-white">Mesa de Vermut</h5>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        Mesa rústica con botella de Vermut El Bon, vaso con rodaja de naranja, olivas, patatas y boquerones. Se mantiene inmóvil en el centro como ancla de referencia (0px).
                      </p>
                    </div>
                    <div className="pt-3 border-t border-neutral-800 text-[10px] font-mono text-emerald-400 font-bold flex justify-between">
                      <span>Desplazamiento: 0.0px</span>
                      <span>Asset: foregound.png</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Screenshot / Screen recording media placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-white dark:bg-[#0E0E0E] border border-neutral-200 dark:border-neutral-800 rounded-sm p-6 flex flex-col justify-between aspect-[16/10] relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-850 pb-3">
                <span className="text-[11px] font-mono tracking-widest text-accent uppercase font-medium">
                  {language === 'es' ? 'COMPOSICIÓN INTEGRADA DEL HERO' : 'HERO COMPOSITE PREVIEW'}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">3 CAPAS ACTIVAS</span>
              </div>
              
              <div className="relative my-auto w-full aspect-[16/9] rounded overflow-hidden border border-neutral-200 dark:border-neutral-800/80 bg-neutral-950">
                <img
                  src={vermutLandingHeroImage}
                  alt="Composición integrada del Hero"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 dark:text-neutral-500 border-t border-neutral-100 dark:border-neutral-850 pt-3">
                <span>VISTA FINAL DE LA CABECERA</span>
                <span className="text-accent">RENDERIZADO INTEGRADO</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0E0E0E] border border-neutral-200 dark:border-neutral-800 rounded-sm p-6 flex flex-col justify-between aspect-[16/10] relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-850 pb-3">
                <span className="text-[11px] font-mono tracking-widest text-accent uppercase font-medium">
                  {language === 'es' ? 'KIT DE CAPAS AISLADAS' : 'ISOLATED ASSET KIT'}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">PNG ALFA + JPG</span>
              </div>

              <div className="grid grid-cols-3 gap-2 my-auto w-full py-2">
                <div className="space-y-1.5 text-center">
                  <div className="aspect-[4/3] rounded overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900">
                    <img src={parallaxBgImage} alt="Fondo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 block">FONDO</span>
                </div>
                <div className="space-y-1.5 text-center">
                  <div className="aspect-[4/3] rounded overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 flex items-end">
                    <img src={parallaxMidImage} alt="Hitos" className="w-full h-full object-contain object-bottom" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 block">HITOS PNG</span>
                </div>
                <div className="space-y-1.5 text-center">
                  <div className="aspect-[4/3] rounded overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 flex items-end">
                    <img src={parallaxForeImage} alt="Mesa" className="w-full h-full object-contain object-bottom" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 block">MESA PNG</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 dark:text-neutral-500 border-t border-neutral-100 dark:border-neutral-850 pt-3">
                <span>3 ARCHIVOS ORIGINALES</span>
                <span className="text-accent">PROFUNDIDAD Z-AXIS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — INTERACTION DESIGN */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            06 — {language === 'es' ? 'DISEÑO DE INTERACCIÓN Y SIGNIFICADO' : 'INTERACTION DESIGN & PURPOSE'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
              {language === 'es'
                ? '¿Por qué importa la interacción? Dar vida a la identidad de marca'
                : 'Why interaction matters: Bringing brand identity to life'}
            </h3>
            <p className="text-sm font-mono tracking-wider text-accent uppercase">
              {language === 'es'
                ? 'No es un efecto genérico: es narrativa espacial'
                : 'Not a generic visual gimmick: true spatial storytelling'}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5 text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            <p>
              {language === 'es' ? (
                <>
                  La interacción no se concibió como un adorno visual superficial ni como una animación prefabricada. El objetivo fundamental fue <strong>hacer que la identidad de marca cobrara vida</strong>. La mesa de vermut estática actúa como ancla visual e invoca la presencia física del comensal, mientras que el paisaje y los iconos locales de Sant Boi se desplazan sutilmente alrededor de ella según la posición del cursor.
                </>
              ) : (
                <>
                  The parallax interaction was never conceived as a superficial visual embellishment or off-the-shelf animation. Its fundamental mission was <strong>to make the brand identity feel genuinely alive</strong>. The static vermouth table acts as an immovable visual anchor inviting the guest to pull up a chair, while the landscape and Sant Boi landmarks subtly shift around it according to mouse position.
                </>
              )}
            </p>
            <p>
              {language === 'es' ? (
                <>
                  Al asignar una mayor tasa de movimiento al fondo y una menor al plano medio, se genera una <strong>relación de profundidad óptica auténtica</strong>. El resultado demuestra cómo la identidad de marca, el contexto geográfico de proximidad y el diseño de interacción pueden converger orgánicamente dentro de un producto web para generar memoria e impacto emocional.
                </>
              ) : (
                <>
                  By assigning higher movement responsiveness to the background and subtle restraint to the midground, a <strong>genuine optical depth relationship</strong> is achieved. The outcome stands as a testament to how brand identity, local geographic context, and thoughtful interaction design can seamlessly unite within a web experience to forge emotional memory.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 07 — DEVELOPED WITH AI */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            07 — {language === 'es' ? 'DESARROLLADO CON INTELIGENCIA ARTIFICIAL' : 'DEVELOPED WITH ARTIFICIAL INTELLIGENCE'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-950 p-8 md:p-12 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-8">
          <div className="flex items-center gap-2.5">
            <Cpu size={20} className="text-accent" />
            <span className="text-xs md:text-sm font-mono tracking-wider uppercase text-accent font-medium">
              {language === 'es' ? 'METODOLOGÍA CREATIVA ASISTIDA POR IA' : 'AI-ASSISTED PROFESSIONAL CREATIVE WORKFLOW'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-2xl md:text-3xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
                {language === 'es'
                  ? 'La IA como catalizador en el proceso de diseño y desarrollo web'
                  : 'AI as an accelerator across design and web development'}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                {language === 'es'
                  ? 'En este proyecto, la Inteligencia Artificial no se utilizó como un simple generador de inspiración pasiva, sino como un colaborador metodológico integrado en cada fase del flujo de trabajo profesional.'
                  : 'In this project, Artificial Intelligence was not utilized as a passive prompt inspiration toy, but rather as an active methodological collaborator embedded within every stage of a rigorous professional creative workflow.'}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4 text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed">
              <p>
                {language === 'es'
                  ? 'La IA asistió en la conceptualización del relato de marca, en la exploración y refinamiento de la dirección visual, en la estructuración de la interfaz de usuario, y en la resolución del código matemático e interactivo necesario para articular el sistema de paralaje multicapa reactivo.'
                  : 'AI assisted in conceptualizing the brand narrative, exploring and refining the warm visual direction, architecting the user interface, and implementing the mathematical logic required to orchestrate the responsive multi-layer parallax mechanics.'}
              </p>
              <p className="text-xs font-mono text-accent pt-2">
                {language === 'es'
                  ? 'Demostrando criterio de dirección creativa, control técnico y dominio de flujos avanzados de IA.'
                  : 'Demonstrating art direction mastery, technical precision, and modern AI-native craft.'}
              </p>
            </div>
          </div>

          {/* AI Workflow Milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-900">
            {[
              {
                step: '01',
                titleEs: 'Conceptualización',
                titleEn: 'Concept Synthesis',
                descEs: 'Estructuración de pilares de marca, tono narrativo y formulación de la propuesta de valor.',
                descEn: 'Structuring brand pillars, narrative voice, and value proposition articulation.'
              },
              {
                step: '02',
                titleEs: 'Dirección Visual',
                titleEn: 'Visual Direction',
                descEs: 'Exploración de paletas cromáticas, tratamiento de texturas y armonías tipográficas.',
                descEn: 'Exploration of chromatic palettes, texture treatments, and font pairing harmony.'
              },
              {
                step: '03',
                titleEs: 'Diseño de Interfaz',
                titleEn: 'Interface Layouts',
                descEs: 'Organización modular de la carta, módulo de reservas y adaptación para dispositivos móviles.',
                descEn: 'Modular menu layout, reservation journey, and cross-device mobile ergonomics.'
              },
              {
                step: '04',
                titleEs: 'Lógica Interactiva',
                titleEn: 'Interaction Logic',
                descEs: 'Optimización de ecuaciones de movimiento, interpolación por cursor y rendimiento del DOM.',
                descEn: 'Optimization of motion equations, cursor interpolation, and DOM performance.'
              }
            ].map((card) => (
              <div key={card.step} className="p-4 bg-white dark:bg-[#0E0E0E] border border-neutral-200 dark:border-neutral-800/60 rounded-sm">
                <span className="text-[10px] font-mono text-accent font-semibold">{card.step}</span>
                <h5 className="text-sm font-serif font-medium text-neutral-900 dark:text-white mt-1 mb-1.5">
                  {language === 'es' ? card.titleEs : card.titleEn}
                </h5>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  {language === 'es' ? card.descEs : card.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — PROTOTYPE STATUS */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            08 — {language === 'es' ? 'ESTADO ACTUAL DEL PROTOTIPO' : 'PROTOTYPE STATUS & MATURITY'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-950 p-6 md:p-8 border border-neutral-200 dark:border-neutral-900 rounded-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-accent/10 border border-accent/30 rounded-sm text-accent shrink-0 mt-1">
              <Info size={20} />
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-serif font-medium text-neutral-950 dark:text-white">
                {language === 'es'
                  ? 'Prototipo digital funcional para un negocio existente'
                  : 'Functional digital prototype for an existing real business'}
              </h4>
              <div className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm font-light leading-relaxed">
                <p>
                  {language === 'es'
                    ? 'Es importante recalcar que El Bon Vermut es un negocio real y activo en Sant Boi de Llobregat, y no una marca ficticia. Este proyecto constituye el prototipo de su experiencia digital: la arquitectura de información, la identidad visual y la interacción central del paralaje han sido completamente desarrolladas y programadas.'
                    : 'It is important to emphasize that El Bon Vermut is a real, operational business in Sant Boi de Llobregat, not a fictional creation. This project represents the prototype of its digital experience: the information architecture, visual identity, and core parallax interaction have been completely conceptualized and coded.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'No obstante, el sitio no se presenta como la versión final de producción. La implantación definitiva requerirá incorporar las fotografías oficiales del local y sus productos, la carta con precios y alérgenos verificados, así como los contenidos textuales definitivos proporcionados por el negocio.'
                    : 'Nevertheless, the website is currently presented as a prototype rather than the final production rollout. The final implementation would incorporate the business\'s definitive commercial photography, verified food and beverage menus, confirmed pricing, allergen data, and validated brand copy.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — PROJECT GALLERY (INDEPENDENT 4-IMAGE SYSTEM: LANDING, HISTORIA, CARTA, RESERVAS) */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            09 — {language === 'es' ? 'GALERÍA DEL PROYECTO' : 'PROJECT GALLERY'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light max-w-2xl">
              {language === 'es'
                ? 'Galería visual con cuatro capturas exclusivas e independientes del proyecto: la landing page, la sección de historia tradicional, la carta gastronómica y el formulario interactivo de reservas.'
                : 'Visual gallery showcasing four dedicated and independent captures of the website: the landing page, the heritage history section, the culinary menu, and the interactive reservation form.'}
            </p>
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 hidden sm:inline-flex items-center gap-1.5 self-start shrink-0">
              <Maximize2 size={13} className="text-accent" />
              {language === 'es' ? 'Haz clic en una imagen para ampliar' : 'Click any image to enlarge'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {galleryItems.map((item, index) => {
              const IconComponent = item.Icon;
              return (
                <div 
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-accent/60 dark:hover:border-accent/60 rounded-sm p-4 sm:p-5 flex flex-col justify-between aspect-[16/10] relative overflow-hidden group shadow-sm hover:shadow-md transition-all cursor-pointer select-none"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxIndex(index);
                    }
                  }}
                  aria-label={language === 'es' ? `Ampliar ${item.titleEs}` : `Enlarge ${item.titleEn}`}
                >
                  <div className="flex justify-between items-center pb-3 border-b border-neutral-100 dark:border-neutral-850 z-10">
                    <span className="text-[11px] font-mono tracking-wider text-accent uppercase flex items-center gap-1.5 font-medium">
                      <IconComponent size={14} /> {language === 'es' ? item.titleEs : item.titleEn}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 group-hover:text-accent transition-colors">
                      <Maximize2 size={12} />
                      <span className="hidden sm:inline">{language === 'es' ? 'Ampliar' : 'Expand'}</span>
                    </span>
                  </div>

                  {/* Main Image Container */}
                  <div className="relative mt-3 w-full h-[85%] rounded-sm overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <img
                      id={item.imageId}
                      src={item.src}
                      alt={language === 'es' ? item.titleEs : item.titleEn}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Hover Visual Prompt */}
                    <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/40 transition-colors flex items-center justify-center pointer-events-none">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0 px-3 py-1.5 bg-neutral-950/80 backdrop-blur-sm border border-neutral-700 text-white rounded-sm text-xs font-mono flex items-center gap-2 shadow-lg">
                        <Maximize2 size={13} className="text-accent" />
                        <span>{language === 'es' ? 'Ver en detalle' : 'View in detail'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10 — VIEW PROTOTYPE GATEWAY */}
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white p-8 sm:p-14 border border-accent/40 rounded-sm shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            10 — {language === 'es' ? 'PROTOTIPO INTERACTIVO EN LÍNEA' : 'LIVE ONLINE PROTOTYPE'}
          </span>
          <h3 className="text-3xl sm:text-5xl font-serif font-light leading-tight text-white">
            {language === 'es' ? 'Explora el prototipo en directo' : 'Experience the live prototype'}
          </h3>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            {language === 'es'
              ? 'Navega por la versión interactiva alojada en Vercel para comprobar de primera mano la física del paralaje, el tono visual y la arquitectura de la información.'
              : 'Browse the live interactive prototype hosted on Vercel to experience the parallax physics, visual tone, and information architecture firsthand.'}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="https://el-bon-vermut.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-neutral-950 font-mono text-xs tracking-widest uppercase font-semibold rounded-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(201,169,110,0.4)] cursor-pointer group"
              data-cursor="hover"
            >
              <span>{language === 'es' ? 'VER PROTOTIPO' : 'VIEW PROTOTYPE'}</span>
              <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>

            <span className="text-xs font-mono text-neutral-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              el-bon-vermut.vercel.app
            </span>
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 backdrop-blur-md p-3 sm:p-6 md:p-8 select-none animate-in fade-in duration-200"
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
                {lightboxIndex + 1} / {galleryItems.length}
              </span>
              <h4 className="text-sm sm:text-base font-serif font-light text-white tracking-wide">
                {language === 'es' ? galleryItems[lightboxIndex].titleEs : galleryItems[lightboxIndex].titleEn}
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
              setLightboxIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : galleryItems.length - 1) : null));
            }}
            className="cursor-pointer absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-accent border border-neutral-700 transition-all z-20 shadow-2xl group"
            title={language === 'es' ? 'Anterior' : 'Previous'}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Image & Caption Container */}
          <div 
            className="relative max-w-6xl max-h-[86vh] w-full h-full flex flex-col items-center justify-center p-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] w-auto flex items-center justify-center overflow-hidden rounded-sm border border-neutral-800 shadow-2xl bg-neutral-950">
              <img
                src={galleryItems[lightboxIndex].src}
                alt={language === 'es' ? galleryItems[lightboxIndex].titleEs : galleryItems[lightboxIndex].titleEn}
                className="max-h-[75vh] max-w-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Caption */}
            <p className="mt-3.5 text-xs sm:text-sm font-mono text-neutral-300 text-center max-w-2xl px-4 py-1.5 bg-neutral-900/70 border border-neutral-800 rounded-sm">
              {language === 'es' ? galleryItems[lightboxIndex].descEs : galleryItems[lightboxIndex].descEn}
            </p>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev < galleryItems.length - 1 ? prev + 1 : 0) : null));
            }}
            className="cursor-pointer absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-accent border border-neutral-700 transition-all z-20 shadow-2xl group"
            title={language === 'es' ? 'Siguiente' : 'Next'}
            aria-label="Next image"
          >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}

    </div>
  );
}
