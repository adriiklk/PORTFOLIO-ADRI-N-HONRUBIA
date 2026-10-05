import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Eye, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Box, 
  RotateCcw, 
  Compass, 
  ShieldCheck, 
  Layout, 
  CheckCircle2, 
  Upload, 
  Sliders, 
  Activity, 
  Monitor, 
  Smartphone,
  Move
} from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../LanguageContext';
// @ts-expect-error - Vite handles asset imports correctly
import imaclinicCoverImage from '../assets/images/regenerated_image_1791146481609.png';
// @ts-expect-error - Vite handles asset imports correctly
import imaclinicVisualEditorial from '../assets/images/regenerated_image_1791147683609.png';
// @ts-expect-error - Vite handles asset imports correctly
import imaclinicVisual3D from '../assets/images/regenerated_image_1791147684197.png';

// Independent images for the 4-item editorial gallery (completely decoupled from other sections)
// @ts-expect-error - Vite handles asset imports correctly
import imaclinicGallery1 from '../assets/images/imaclinic_gallery_1.png';
// @ts-expect-error - Vite handles asset imports correctly
import imaclinicGallery2 from '../assets/images/imaclinic_gallery_2.png';
// @ts-expect-error - Vite handles asset imports correctly
import imaclinicGallery3 from '../assets/images/imaclinic_gallery_3.png';
// @ts-expect-error - Vite handles asset imports correctly
import imaclinicGallery4 from '../assets/images/imaclinic_gallery_4.png';

interface ImaClinicDetailsProps {
  project: Project;
}

// Media placeholder descriptor for editorial presentation
interface MediaPlaceholder {
  id: string;
  tag: string;
  aspect: string;
  src?: string;
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
  category: 'hero' | '3d-tooth' | 'scroll' | 'ui' | 'process' | 'gallery';
  hintEn: string;
  hintEs: string;
}

export default function ImaClinicDetails({ project }: ImaClinicDetailsProps) {
  const { language } = useLanguage();

  // --- LIGHTBOX STATE FOR HIGH-RESOLUTION PLACEHOLDERS ---
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Gallery items configured for the 4 curated editorial project images (independent assets)
  const galleryItems: MediaPlaceholder[] = [
    {
      id: 'gallery-hero',
      tag: '01 · HERO DESKTOP',
      aspect: '16/10',
      src: imaclinicGallery1,
      category: 'hero',
      titleEn: 'Desktop Website Hero Presentation',
      titleEs: 'Presentación Hero del Sitio Web en Desktop',
      descEn: 'Opening hero section of IMAclinic featuring the interactive 3D tooth centered with clean typographic hierarchy and negative space.',
      descEs: 'Sección de cabecera hero de IMAclinic con el diente 3D interactivo centrado, tipografía limpia y amplio espacio en blanco.',
      hintEn: 'Desktop Website Hero view',
      hintEs: 'Vista de cabecera hero del sitio web'
    },
    {
      id: 'gallery-editorial',
      tag: '02 · DIRECCIÓN VISUAL',
      aspect: '16/10',
      src: imaclinicGallery2,
      category: 'ui',
      titleEn: 'Healthcare Grid & Spatial Structure',
      titleEs: 'Estructura de Espacios & Retícula Sanitaria',
      descEn: 'Minimalist editorial composition demonstrating clinical breathing room, generous whitespace, and pure graphic hierarchy.',
      descEs: 'Composición editorial minimalista demostrando respiración visual clínica, espacio en blanco y jerarquía gráfica depurada.',
      hintEn: 'Editorial layout composition',
      hintEs: 'Composición de maquetación editorial'
    },
    {
      id: 'gallery-tooth-render',
      tag: '03 · MODELO 3D',
      aspect: '16/10',
      src: imaclinicGallery3,
      category: '3d-tooth',
      titleEn: 'Custom 3D Tooth Model & Craft',
      titleEs: 'El Diente 3D como Núcleo Visual',
      descEn: 'Custom 3D tooth asset sculpted specifically for the clinic, highlighting smooth enamel curvature and real-time interaction.',
      descEs: 'Modelo 3D del diente modelado a medida para la clínica, resaltando la curvatura del esmalte y la interacción en tiempo real.',
      hintEn: 'Custom 3D model render',
      hintEs: 'Render del modelo 3D a medida'
    },
    {
      id: 'gallery-cover',
      tag: '04 · IDENTIDAD DE MARCA',
      aspect: '16/10',
      src: imaclinicGallery4,
      category: 'gallery',
      titleEn: 'IMAclinic Brand & Digital Showcase',
      titleEs: 'Identidad Digital & Portada de IMAclinic',
      descEn: 'Comprehensive brand presentation and visual showcase embodying contemporary healthcare and digital excellence.',
      descEs: 'Presentación global de marca y muestra visual unificando rigor sanitario y diseño digital de vanguardia.',
      hintEn: 'Brand showcase & project overview',
      hintEs: 'Muestra de marca y vista general del proyecto'
    }
  ];

  // Handle keyboard events for lightbox
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, galleryItems.length]);

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
              IMAclinic
            </h2>
            <p className="text-sm font-mono tracking-wider text-accent uppercase">
              {language === 'es'
                ? 'Diseño web & Prototipo interactivo 3D para clínica dental'
                : 'Web design & 3D interactive prototype for a dental clinic'}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5 text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-light leading-relaxed">
            <p>
              {language === 'es'
                ? 'IMAclinic es un prototipo web para una clínica dental contemporánea construido en torno a una experiencia interactiva central en 3D. El objetivo del proyecto fue trascender las convenciones estáticas del sector sanitario, creando una experiencia digital que combine rigor profesional, confianza médica y máxima pulcritud con una interacción moderna y memorable.'
                : 'IMAclinic is a contemporary dental clinic web prototype built around a central interactive 3D experience. The objective was to move beyond the static conventions of the healthcare sector, creating a digital experience that pairs professional rigor, patient trust, and clinical cleanliness with modern, memorable interactivity.'}
            </p>
            <p>
              {language === 'es'
                ? 'El elemento diferencial absoluto del proyecto es un modelo 3D de un diente conceptualizado y modelado por mí específicamente para este sitio web. Lejos de ser un elemento decorativo aislado, el diente se integra de forma viva en el código del navegador y acompaña al paciente a lo largo de todo su recorrido por la página.'
                : 'The defining centerpiece of the project is a custom 3D tooth model conceptualised and modelled by me specifically for this website. Rather than functioning as a detached decorative render, the tooth is natively integrated into the browser and accompanies the patient throughout the entire journey across the page.'}
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

        <div className="bg-neutral-100 dark:bg-neutral-950 p-8 md:p-12 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
              {language === 'es' ? 'EQUILIBRIO CONCEPTUAL' : 'CONCEPTUAL BALANCE'}
            </span>
            <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
              {language === 'es'
                ? 'Diseño sanitario limpio + 3D + Interacción + Narrativa continua'
                : 'Clean healthcare design + 3D + Interaction + Continuous storytelling'}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
              {language === 'es'
                ? 'Los sitios web dentales requieren comunicar solvencia médica, higiene y confianza serena. Para IMAclinic, el desafío consistió en preservar íntegramente estas cualidades esenciales mientras se creaba una experiencia digital contemporánea, interactiva y profundamente memorable.'
                : 'Dental clinic websites must communicate clinical rigor, impeccable hygiene, and reassuring trust. For IMAclinic, the challenge was preserving these fundamental qualities while crafting a digital experience that feels contemporary, interactive, and memorable.'}
            </p>
          </div>

          {/* 5 Strategic Pillars of the Concept */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 pt-4 border-t border-neutral-200 dark:border-neutral-900">
            <div className="bg-white dark:bg-[#0C0F12] p-5 border border-accent/60 dark:border-accent/50 rounded-sm space-y-2 hover:border-accent transition-colors">
              <span className="text-xs font-mono text-accent font-semibold">01</span>
              <h4 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Profesionalidad' : 'Professionalism'}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Rigor clínico en cada módulo, transmitiendo autoridad médica y precisión técnica.'
                  : 'Clinical rigor in every section, conveying medical authority and technical accuracy.'}
              </p>
            </div>

            <div className="bg-white dark:bg-[#0C0F12] p-5 border border-accent/60 dark:border-accent/50 rounded-sm space-y-2 hover:border-accent transition-colors">
              <span className="text-xs font-mono text-accent font-semibold">02</span>
              <h4 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Confianza' : 'Trust'}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Espacios luminosos y serenidad visual para disipar la aprensión tradicional al dentista.'
                  : 'Bright spaces and serene visual tone that alleviate traditional dental anxiety.'}
              </p>
            </div>

            <div className="bg-white dark:bg-[#0C0F12] p-5 border border-accent/60 dark:border-accent/50 rounded-sm space-y-2 hover:border-accent transition-colors">
              <span className="text-xs font-mono text-accent font-semibold">03</span>
              <h4 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Limpieza' : 'Cleanliness'}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Composiciones puras, blanco clínico y ausencia deliberada de ruido visual superfluo.'
                  : 'Pure compositions, clinical white, and the deliberate absence of visual noise.'}
              </p>
            </div>

            <div className="bg-white dark:bg-[#0C0F12] p-5 border border-accent/60 dark:border-accent/50 rounded-sm space-y-2 hover:border-accent transition-colors">
              <span className="text-xs font-mono text-accent font-semibold">04</span>
              <h4 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Tecnología' : 'Technology'}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Renderizado 3D en tiempo real que refleja el equipamiento de vanguardia de la clínica.'
                  : 'Real-time 3D rendering reflecting the clinic’s state-of-the-art dental technology.'}
              </p>
            </div>

            <div className="bg-white dark:bg-[#0C0F12] p-5 border border-accent/60 dark:border-accent/50 rounded-sm space-y-2 hover:border-accent transition-colors">
              <span className="text-xs font-mono text-accent font-semibold">05</span>
              <h4 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Interacción' : 'Interaction'}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Un viaje dinámico donde el paciente interactúa activamente con el objeto tridimensional.'
                  : 'A dynamic journey where the patient actively interacts with the 3D model.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — VISUAL DIRECTION */}
      <section id="visual-direction" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            03 — {language === 'es' ? 'DIRECCIÓN VISUAL' : 'VISUAL DIRECTION'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
            {language === 'es'
              ? 'Sistema visual minimalista: El espacio en blanco como escenario del 3D'
              : 'Minimalist visual system: Whitespace as the stage for interactive 3D'}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
            {language === 'es'
              ? 'La interfaz fue diseñada deliberadamente con una sobriedad ejemplar. Al mantener la arquitectura gráfica depurada, con tipografía clara y jerarquías limpias, el diente tridimensional interactivo emerge sin distracciones como el protagonista absoluto de la experiencia.'
              : 'The interface was intentionally sculpted with exemplary restraint. By maintaining a clean graphic architecture with crisp typography and strong hierarchy, the interactive 3D tooth emerges without distraction as the undisputed protagonist of the experience.'}
          </p>
        </div>

        {/* 4 Visual Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm">
            <span className="text-accent uppercase block text-[10px] mb-1">01 · WHITESPACE</span>
            <strong className="text-neutral-900 dark:text-white font-medium block">
              {language === 'es' ? 'Espacio Negativo Generoso' : 'Generous Whitespace'}
            </strong>
            <span className="text-neutral-500 text-[11px] mt-1 block">
              {language === 'es' ? 'Respiración visual que comunica pureza, higiene y calma médica.' : 'Visual breathing room evoking clinical hygiene and calmness.'}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm">
            <span className="text-accent uppercase block text-[10px] mb-1">02 · TYPOGRAPHY</span>
            <strong className="text-neutral-900 dark:text-white font-medium block">
              {language === 'es' ? 'Jerarquía & Legibilidad' : 'Hierarchy & Clarity'}
            </strong>
            <span className="text-neutral-500 text-[11px] mt-1 block">
              {language === 'es' ? 'Títulos editoriales y textos precisos fáciles de escanear.' : 'Editorial headlines paired with legible, scannable body text.'}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm">
            <span className="text-accent uppercase block text-[10px] mb-1">03 · MINIMAL NOISE</span>
            <strong className="text-neutral-900 dark:text-white font-medium block">
              {language === 'es' ? 'Cero Ruido Visual' : 'Minimal Visual Noise'}
            </strong>
            <span className="text-neutral-500 text-[11px] mt-1 block">
              {language === 'es' ? 'Sin adornos superfluos que resten protagonismo a la pieza central.' : 'Elimination of decorative clutter to spotlight the 3D model.'}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-sm">
            <span className="text-accent uppercase block text-[10px] mb-1">04 · 3D HERO</span>
            <strong className="text-neutral-900 dark:text-white font-medium block">
              {language === 'es' ? '3D como Elemento Central' : '3D as Main Protagonist'}
            </strong>
            <span className="text-neutral-500 text-[11px] mt-1 block">
              {language === 'es' ? 'El modelo conecta y unifica la narrativa de toda la página.' : 'The model threads and unifies the entire narrative flow.'}
            </span>
          </div>
        </div>

        {/* Large Visual Direction Editorial Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 items-start">
          {/* Visual 01: Minimalist Composition */}
          <div 
            onClick={() => setLightboxIndex(1)}
            data-cursor="hover"
            data-theme-keep="dark"
            className="group cursor-pointer bg-[#0A0D10] border border-neutral-800 rounded-sm overflow-hidden relative shadow-lg hover:border-accent/60 transition-all duration-300"
          >
            <img 
              src={imaclinicVisualEditorial} 
              alt={language === 'es' ? 'Estructura de Espacios & Retícula Sanitaria' : 'Healthcare Grid & Spatial Structure'} 
              className="w-full h-auto object-contain block filter brightness-[0.98] group-hover:scale-102 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Visual 02: 3D Integration Specimen */}
          <div 
            onClick={() => setLightboxIndex(2)}
            data-cursor="hover"
            data-theme-keep="dark"
            className="group cursor-pointer bg-[#0A0D10] border border-neutral-800 rounded-sm overflow-hidden relative shadow-lg hover:border-accent/60 transition-all duration-300"
          >
            <img 
              src={imaclinicVisual3D} 
              alt={language === 'es' ? 'El Diente 3D como Núcleo Visual' : 'The 3D Tooth as the Visual Core'} 
              className="w-full h-auto object-contain block filter brightness-[0.98] group-hover:scale-102 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 04 — THE 3D TOOTH */}
      <section id="the-3d-tooth" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            04 — {language === 'es' ? 'EL DIENTE 3D' : 'THE 3D TOOTH'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
            {language === 'es' ? 'MODELADO PROPIO & ARTESANÍA DIGITAL' : 'CUSTOM MODELLING & DIGITAL CRAFT'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-950 dark:text-white leading-[1.15]">
            {language === 'es'
              ? 'Del modelo 3D a la experiencia web interactiva'
              : 'From 3D model to interactive web experience'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-4xl">
            {language === 'es'
              ? 'El diente no es una ilustración estática ni un elemento comprado en una librería. Fue conceptualizado específicamente para este proyecto y modelado íntegramente por mí como un activo 3D a medida. Posteriormente fue optimizado geométricamente para su visualización web en tiempo real, integrado en el código del navegador y vinculado matemáticamente al recorrido de scroll.'
              : 'The tooth is neither a static graphic nor a pre-bought stock model. It was conceptualised specifically for this project and modelled by me as a custom 3D asset. It was then geometrically optimised for real-time web rendering, natively integrated into the browser DOM/canvas, and mathematically linked to the scroll journey.'}
          </p>
        </div>

        {/* Clear 4-Step Conceptual Progression: 3D MODEL → WEB OPTIMISATION → INTERACTION → FINAL EXPERIENCE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 relative group hover:border-accent transition-colors shadow-xs">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
                STAGE 01
              </span>
              <Box size={16} className="text-neutral-400 group-hover:text-accent transition-colors" />
            </div>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              3D MODEL
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Modelado poligonal anatómico en Blender por mí, con curvatura orgánica en corona, fosas oclusales y bifurcación radicular.'
                : 'Custom polygonal modelling crafted in Blender by me, featuring organic crown curvature, occlusal fissures, and radicular bifurcation.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 relative group hover:border-accent transition-colors shadow-xs">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
                STAGE 02
              </span>
              <Sliders size={16} className="text-neutral-400 group-hover:text-accent transition-colors" />
            </div>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              WEB OPTIMISATION
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Reducción de polígonos, horneado de normales y compresión de texturas para garantizar 60 FPS estables sin retardos en el navegador.'
                : 'Polygon reduction, normal map baking, and texture compression ensuring consistent 60 FPS performance in the browser.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 relative group hover:border-accent transition-colors shadow-xs">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
                STAGE 03
              </span>
              <RotateCcw size={16} className="text-neutral-400 group-hover:text-accent transition-colors" />
            </div>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              INTERACTION
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Asignación de coordenadas reactivas: el modelo responde al desplazamiento del scroll y a sutiles micro-rotaciones por el cursor.'
                : 'Reactive coordinate binding: the model responds to vertical scroll progression and subtle cursor micro-rotations.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 relative group hover:border-accent transition-colors shadow-xs">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
                STAGE 04
              </span>
              <Sparkles size={16} className="text-neutral-400 group-hover:text-accent transition-colors" />
            </div>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              FINAL EXPERIENCE
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Integración fluida en la interfaz clínica final donde el objeto actúa como hilo conductor permanente entre secciones.'
                : 'Seamless integration into the clinic interface where the object acts as an unbroken visual thread across all sections.'}
            </p>
          </div>
        </div>
      </section>

      {/* 05 — FOLLOWING THE USER (SCROLL EXPERIENCE) */}
      <section id="following-the-user" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            05 — {language === 'es' ? 'SIGUIENDO AL USUARIO' : 'FOLLOWING THE USER'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
            {language === 'es' ? 'LA EXPERIENCIA DE SCROLL CONTINUO' : 'THE CONTINUOUS SCROLL EXPERIENCE'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-950 dark:text-white leading-[1.15]">
            {language === 'es'
              ? 'Un elemento. Un recorrido continuo.'
              : 'One element. One continuous journey.'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-4xl">
            {language === 'es'
              ? 'En la mayoría de páginas web con elementos 3D, el modelo aparece en el hero y desaparece para siempre en cuanto el usuario hace scroll hacia abajo. En IMAclinic, el objeto permanece vivo durante toda la navegación: a medida que el usuario se desplaza, el diente cambia de posición en la pantalla, orientación espacial, escala y relación con el contenido circundante, convirtiéndose en una guía visual continua.'
              : 'On typical 3D websites, a 3D model appears in the hero section and vanishes forever once the user scrolls down. In IMAclinic, the object remains an active part of the entire experience: as the user scrolls, the tooth dynamically shifts its screen position, spatial orientation, scale, and relationship with surrounding editorial content, acting as an unbroken visual guide throughout the clinic.'}
          </p>
        </div>
      </section>

      {/* 06 — UX / UI */}
      <section id="ux-ui" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            06 — UX / UI
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
            {language === 'es'
              ? 'Arquitectura de información accesible & Protagonismo espacial'
              : 'Accessible information architecture & Spatial prominence'}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
            {language === 'es'
              ? 'La interfaz fue concebida para que la información sanitaria sea clara, accesible y tranquilizadora para cualquier perfil de paciente, permitiendo simultáneamente que la interacción 3D ocupe un rol prominente sin dificultar la lectura ni la reserva de cita.'
              : 'The interface was structured to keep medical information clear, reassuring, and accessible for all patient profiles, while effortlessly allowing the 3D interaction to remain prominent without obstructing reading or appointment bookings.'}
          </p>
        </div>

        {/* 6 Key Modules of the Website Architecture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              01 · {language === 'es' ? 'HERO INAUGURAL' : 'HERO ENTRY'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Cabecera & Bienvenida' : 'Greeting & Visual Anchor'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Presentación central del diente 3D con llamada inmediata a consulta y titular sereno que transmite calma clínica.'
                : 'Central 3D tooth showcase with instant consultation CTA and serene clinical headline.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              02 · {language === 'es' ? 'FILOSOFÍA' : 'PHILOSOPHY'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Confianza & Trato Humano' : 'Patient Care & Trust'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Declaración de principios odontológicos: odontología preventiva, empatía en consulta y cero dolor.'
                : 'Dental care manifesto: preventative dentistry, clinical empathy, and pain-free treatments.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              03 · {language === 'es' ? 'TRATAMIENTOS' : 'TREATMENTS'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Odontología Especializada' : 'Specialized Services'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Implantología guiada, ortodoncia invisible, estética dental y periodoncia explicadas sin jerga médica densa.'
                : 'Guided implantology, clear aligners, aesthetic veneers, and periodontics explained with accessible clarity.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              04 · {language === 'es' ? 'TECNOLOGÍA' : 'TECHNOLOGY'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Escaneo Digital 3D' : '3D Digital Diagnostics'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Diagnóstico por imagen TAC 3D, escáner intraoral óptico y planificación virtual de cada intervención.'
                : '3D CBCT imaging, intraoral optical scanning, and computer-guided surgical planning.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              05 · {language === 'es' ? 'EQUIPO' : 'TEAM'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Especialistas & Espacio' : 'Medical Team & Facilities'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Presentación del cuadro facultativo y un recorrido sereno por las instalaciones higienizadas de la clínica.'
                : 'Doctor credentials and a tranquil photographic walk through the clinic’s sanitized facilities.'}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-3 shadow-xs">
            <span className="text-xs font-mono text-accent font-medium uppercase">
              06 · {language === 'es' ? 'CITA PREVIA' : 'BOOKING'}
            </span>
            <h4 className="text-lg font-serif font-light text-neutral-900 dark:text-white">
              {language === 'es' ? 'Reserva Ágil & Contacto' : 'Direct Booking & Consultation'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {language === 'es'
                ? 'Selector intuitivo de motivo de consulta, contacto directo por WhatsApp y geolocalización de la clínica.'
                : 'Intuitive consultation selector, direct WhatsApp dispatch, and interactive geolocation map.'}
            </p>
          </div>
        </div>
      </section>

      {/* 07 — FROM BLENDER TO BROWSER */}
      <section id="blender-to-browser" className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium">
            07 — {language === 'es' ? 'DE BLENDER AL NAVEGADOR' : 'FROM BLENDER TO BROWSER'}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-900" />
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-950 p-8 md:p-12 border border-neutral-200 dark:border-neutral-900 rounded-sm space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
              {language === 'es' ? 'PERFIL MULTIDISCIPLINAR' : 'MULTIDISCIPLINARY CAPABILITY'}
            </span>
            <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
              {language === 'es'
                ? 'Conectar el modelado 3D, el diseño web y el desarrollo frontend'
                : 'Bridging 3D design, web design, and frontend development'}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
              {language === 'es'
                ? 'Este proyecto es un testimonio directo de mi versatilidad profesional: la capacidad de idear un concepto, esculpir a mano el activo 3D en Blender, diseñar el sistema de diseño completo y programar su comportamiento interactivo en el navegador sin dependencias de terceros.'
                : 'This project demonstrates multidisciplinary fluency: the ability to conceptualise an art direction, sculpt the custom 3D asset in Blender, architect the UX/UI system, and program responsive scroll interactions in production web code.'}
            </p>
          </div>

          {/* 5-Step Process Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-900">
            <div className="p-4 bg-white dark:bg-[#07090C] border border-accent/60 dark:border-accent/50 rounded-sm space-y-2 hover:border-accent transition-colors">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider block">STEP 01</span>
              <h5 className="text-sm font-serif font-medium text-neutral-900 dark:text-white">
                {language === 'es' ? 'Modelado 3D' : '3D Modelling'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es' ? 'Esculpido manual en Blender cuidando curvas y anatomía.' : 'Manual sculpt in Blender focusing on dental anatomy.'}
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-[#07090C] border border-accent/60 dark:border-accent/50 rounded-sm space-y-2 hover:border-accent transition-colors">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider block">STEP 02</span>
              <h5 className="text-sm font-serif font-medium text-neutral-900 dark:text-white">
                {language === 'es' ? 'Optimización' : 'Optimisation'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es' ? 'Retopología y compresión GLTF/GLB ligera para web.' : 'Retopology and lightweight GLTF/GLB compression.'}
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-[#07090C] border border-accent/60 dark:border-accent/50 rounded-sm space-y-2 hover:border-accent transition-colors">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider block">STEP 03</span>
              <h5 className="text-sm font-serif font-medium text-neutral-900 dark:text-white">
                {language === 'es' ? 'Integración Web' : 'Web Integration'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es' ? 'Inserción en el canvas WebGL con shaders de esmalte.' : 'Insertion into WebGL canvas with custom enamel shaders.'}
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-[#07090C] border border-accent/60 dark:border-accent/50 rounded-sm space-y-2 hover:border-accent transition-colors">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider block">STEP 04</span>
              <h5 className="text-sm font-serif font-medium text-neutral-900 dark:text-white">
                {language === 'es' ? 'Comportamiento Scroll' : 'Scroll Behaviour'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es' ? 'Interpolación de coordenadas y giros entre secciones.' : 'Smooth coordinate and rotation interpolation across views.'}
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-[#07090C] border border-accent/60 dark:border-accent/50 rounded-sm space-y-2 hover:border-accent transition-colors">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider block">STEP 05</span>
              <h5 className="text-sm font-serif font-medium text-neutral-900 dark:text-white">
                {language === 'es' ? 'Experiencia Final' : 'Final Experience'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es' ? 'Fluidez reactiva en cualquier dispositivo y pantalla.' : 'Seamless responsiveness across desktop and mobile screens.'}
              </p>
            </div>
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
              <span>{language === 'es' ? 'INTELIGENCIA ARTIFICIAL EN EL FLUJO DE TRABAJO' : 'AI-POWERED WORKFLOW INTEGRATION'}</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-serif font-light text-neutral-950 dark:text-white leading-tight">
              {language === 'es'
                ? 'Artesanía 3D propia potenciada por flujos modernos de IA'
                : 'Custom 3D craft amplified by modern AI workflows'}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
              {language === 'es'
                ? 'La Inteligencia Artificial se utilizó de forma activa como asistente en las fases de desarrollo web, experimentación de interfaz, resolución de problemas técnicos en la vinculación del scroll e iteración ágil de código.'
                : 'Artificial Intelligence was actively deployed as a technical partner across web development, interface experimentation, scroll-listener troubleshooting, and rapid code iteration.'}
            </p>
          </div>

          {/* CRITICAL DISTINCTION BOX */}
          <div className="p-6 bg-sky-500/5 dark:bg-sky-500/10 border-l-4 border-sky-400 rounded-sm space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <ShieldCheck size={16} />
              <span>{language === 'es' ? 'DISTINCIÓN FUNDAMENTAL DEL PROYECTO' : 'FUNDAMENTAL PROJECT DISTINCTION'}</span>
            </div>
            <p className="text-sm md:text-base font-serif font-light text-neutral-900 dark:text-white leading-relaxed">
              {language === 'es'
                ? 'El modelo 3D del diente fue creado y modelado a mano por mí. No fue generado por Inteligencia Artificial. La IA se empleó como un catalizador de ingeniería de software para acelerar la maquetación y la implementación interactiva, demostrando mi capacidad para combinar habilidades creativas tradicionales (modelado 3D, dirección de arte) con los flujos de trabajo asistidos por IA más avanzados del sector.'
                : 'The 3D tooth model was sculpted and modelled by me. It was NOT generated by Artificial Intelligence. AI was leveraged as a software engineering catalyst to accelerate web development and interactive mechanics, showcasing my ability to fuse traditional creative skills (3D modelling, art direction) with industry-leading AI-assisted workflows.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 border-t border-neutral-200 dark:border-neutral-900">
            <div className="space-y-2">
              <span className="text-xs font-mono text-accent font-medium uppercase">
                01 · {language === 'es' ? 'DESARROLLO WEB' : 'WEB DEVELOPMENT'}
              </span>
              <h5 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Arquitectura de Código' : 'Code Architecture'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Aceleración en la estructura modular en React, TypeScript y Tailwind CSS bajo rigurosa dirección.'
                  : 'Accelerating modular React, TypeScript, and Tailwind scaffolding under human oversight.'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-accent font-medium uppercase">
                02 · {language === 'es' ? 'EXPERIMENTACIÓN' : 'EXPERIMENTATION'}
              </span>
              <h5 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Cálculo de Transiciones' : 'Transition Mathematics'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Pruebas ágiles de curvas de interpolación espacial para que el diente acompañe con suavidad el scroll.'
                  : 'Fast iteration of spatial curves so the tooth model glides fluidly during viewport scrolling.'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-accent font-medium uppercase">
                03 · {language === 'es' ? 'RESOLUCIÓN TÉCNICA' : 'PROBLEM SOLVING'}
              </span>
              <h5 className="text-base font-serif font-light text-neutral-900 dark:text-white">
                {language === 'es' ? 'Optimización & Depuración' : 'Optimization & Debugging'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Diagnóstico inmediato de cuellos de botella de rendimiento para mantener la tasa de refresco a 60 FPS.'
                  : 'Immediate diagnostic of rendering bottlenecks to ensure locked 60 FPS across viewports.'}
              </p>
            </div>
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
              <Compass size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-serif font-light text-neutral-950 dark:text-white">
                {language === 'es'
                  ? 'Demostración de dirección digital, integración 3D e interacción'
                  : 'Exploration & functional demonstration of digital direction'}
              </h4>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'IMAclinic se presenta actualmente como un prototipo web funcional completo. Su objetivo primordial es explorar y demostrar la viabilidad estética, la integración del activo 3D en tiempo real, la coreografía de scroll y la experiencia de usuario integral. No representa un trabajo inconcluso, sino una propuesta sólida de dirección digital contemporánea para el ámbito sanitario.'
                  : 'IMAclinic is currently presented as a fully functional web prototype. Its primary purpose is to explore and demonstrate visual direction, real-time 3D asset integration, scroll interaction choreography, and overall digital experience. It is not an unfinished project, but a resolute exploration of how contemporary digital craft elevates healthcare design.'}
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
              ? 'Colección editorial a gran escala del proyecto'
              : 'Curated large-scale editorial gallery'}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
            {language === 'es'
              ? 'Colección editorial compuesta por las 4 imágenes clave de IMAclinic: la cabecera hero, la dirección visual, el activo 3D y la identidad digital del proyecto. Haz clic en cualquiera de ellas para examinar en detalle.'
              : 'Editorial collection featuring the 4 key IMAclinic visuals: the hero presentation, visual direction, custom 3D asset, and brand identity showcase. Click on any item to view in full-screen mode.'}
          </p>
        </div>

        {/* Editorial Gallery Grid: 4 Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              data-theme-keep="dark"
              data-cursor="hover"
              className="group cursor-pointer bg-[#0A0D10] border border-neutral-800 rounded-sm overflow-hidden flex flex-col justify-between relative shadow-md hover:border-accent/60 transition-all duration-300"
            >
              {/* Top Tag Badges */}
              <div className="p-3.5 sm:p-4 flex justify-between items-center z-10 border-b border-white/5 bg-[#0A0D10]/80">
                <span className="text-[10px] font-mono tracking-widest text-white bg-black/80 px-2.5 py-1 rounded border border-white/10 uppercase">
                  {item.tag}
                </span>
                <span className="text-accent text-[10px] font-mono flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <Maximize2 size={12} /> {language === 'es' ? 'AMPLIAR' : 'EXPAND'}
                </span>
              </div>

              {/* Main Image Frame: 100% visible, never cropped */}
              <div className="relative w-full aspect-[2/1] bg-[#050709] flex items-center justify-center p-2 sm:p-3 overflow-hidden">
                {item.src ? (
                  <img
                    src={item.src}
                    alt={language === 'es' ? item.titleEs : item.titleEn}
                    className="w-full h-full object-contain filter brightness-[0.98] group-hover:scale-102 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-center my-auto py-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      {item.category === '3d-tooth' ? (
                        <Box size={20} className="text-sky-400" />
                      ) : (
                        <Layout size={20} className="text-accent" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11 — VIEW PROTOTYPE (PROMINENT CTA) */}
      <section id="view-prototype" className="pt-8">
        <div className="relative rounded-sm overflow-hidden bg-gradient-to-br from-[#0B1218] via-[#07090C] to-black border border-neutral-800 p-8 sm:p-14 text-center space-y-6 shadow-2xl" data-theme-keep="dark">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-96 h-96 rounded-full bg-sky-500/10 filter blur-[90px]" />
          </div>

          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-medium block">
              11 — {language === 'es' ? 'EXPERIMENTA EL PROTOTIPO EN VIVO' : 'EXPERIENCE THE LIVE PROTOTYPE'}
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif font-light text-white leading-tight">
              IMAclinic
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {language === 'es'
                ? 'Explora el prototipo desplegado en vivo con el diente 3D modelado a mano acompañando tu navegación por toda la clínica dental.'
                : 'Explore the live deployed prototype with the custom 3D tooth accompanying your journey across the entire clinic website.'}
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <a
              href="https://imaclinic.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-[#D8B97E] text-neutral-950 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-medium rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-[0_0_25px_rgba(201,169,110,0.4)]"
              data-cursor="hover"
            >
              <span>{language === 'es' ? 'Ver Prototipo' : 'View Prototype'}</span>
              <ArrowRight size={18} />
            </a>
            <div className="mt-3 text-[11px] font-mono text-neutral-500">
              imaclinic.vercel.app
            </div>
          </div>
        </div>
      </section>

      {/* --- FULLSCREEN LIGHTBOX MODAL FOR PLACEHOLDERS --- */}
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
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : galleryItems.length - 1) : null))}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors z-50 cursor-pointer"
              aria-label="Previous item"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev < galleryItems.length - 1 ? prev + 1 : 0) : null))}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors z-50 cursor-pointer"
              aria-label="Next item"
            >
              <ChevronRight size={24} />
            </button>

            {/* Lightbox Editorial Display Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4"
              data-theme-keep="dark"
            >
              {galleryItems[lightboxIndex].src ? (
                <div className="relative w-full aspect-[16/10] max-h-[70vh] bg-neutral-950 border border-neutral-850 rounded-sm overflow-hidden flex items-center justify-center shadow-2xl">
                  <img
                    src={galleryItems[lightboxIndex].src}
                    alt={language === 'es' ? galleryItems[lightboxIndex].titleEs : galleryItems[lightboxIndex].titleEn}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-[16/10] max-h-[70vh] bg-[#07090C] border border-neutral-800 rounded-sm overflow-hidden flex flex-col items-center justify-center p-8 sm:p-12 shadow-2xl text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <Box size={28} className="text-sky-400" />
                  </div>
                  <span className="text-xs font-mono tracking-widest text-accent uppercase mb-2">
                    {galleryItems[lightboxIndex].tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">
                    {language === 'es' ? galleryItems[lightboxIndex].titleEs : galleryItems[lightboxIndex].titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-neutral-300 max-w-xl leading-relaxed mb-6">
                    {language === 'es' ? galleryItems[lightboxIndex].descEs : galleryItems[lightboxIndex].descEn}
                  </p>
                  <div className="px-4 py-2 bg-white/5 rounded border border-white/10 text-neutral-400 text-xs font-mono flex items-center gap-2">
                    <Upload size={14} className="text-accent" />
                    <span>{language === 'es' ? galleryItems[lightboxIndex].hintEs : galleryItems[lightboxIndex].hintEn}</span>
                  </div>
                </div>
              )}

              {/* Caption */}
              <div className="text-center space-y-1 px-4">
                <span className="text-xs font-mono text-accent tracking-widest uppercase">
                  {lightboxIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
