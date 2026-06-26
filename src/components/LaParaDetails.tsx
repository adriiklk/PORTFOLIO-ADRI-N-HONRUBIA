import React from 'react';
import { 
  Target, Sparkles, Layers, TrendingUp, Award 
} from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../LanguageContext';

interface LaParaDetailsProps {
  project: Project;
}

export default function LaParaDetails({ project }: LaParaDetailsProps) {
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pb-20 space-y-24 text-neutral-200 font-sans">
      
      {/* 1. INTRODUCTION & OVERVIEW GRID */}
      <section className="border-b border-neutral-900 pb-16">
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
            {language === 'es' ? 'INTRODUCCIÓN DEL PROYECTO' : 'PROJECT INTRODUCTION'}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
            {language === 'es'
              ? 'LaPara BarberShow es un proyecto continuo de redes sociales y creación de contenido enfocado en fortalecer la presencia digital de la barbería y construir una identidad de marca reconocible en las plataformas sociales.'
              : 'LaPara BarberShow is an ongoing social media and content creation project focused on strengthening the barbershop\'s digital presence and building a recognizable brand identity across social platforms.'}
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            {language === 'es'
              ? 'El objetivo es crear contenido que no solo muestre la calidad del servicio sino que también comunique la personalidad, el profesionalismo y la atmósfera de la marca.'
              : 'The objective is to create content that not only showcases the quality of the service but also communicates the personality, professionalism, and atmosphere of the brand.'}
          </p>
        </div>
      </section>

      {/* 2. THE OBJECTIVE */}
      <section className="bg-neutral-950 p-8 md:p-12 border border-neutral-900 rounded-sm space-y-6">
        <div className="flex items-center gap-2">
          <Target size={16} className="text-accent" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-accent">
            {language === 'es' ? 'EL OBJETIVO' : 'THE OBJECTIVE'}
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
            {language === 'es'
              ? 'Establecer una presencia digital sólida y coherente capaz de atraer nuevos clientes mientras se refuerza la imagen profesional de la marca.'
              : 'Establishing a strong and consistent digital presence capable of attracting new clients while reinforcing the brand\'s professional image.'}
          </h3>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            {language === 'es'
              ? 'La estrategia combina identidad visual, contenido de vídeo de formato corto y storytelling para aumentar la visibilidad y el engagement en las plataformas de redes sociales.'
              : 'The strategy combines visual identity, short-form video content, and storytelling to increase visibility and engagement across social media platforms.'}
          </p>
        </div>
      </section>

      {/* 3. BRAND IMAGE */}
      <section className="max-w-3xl space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-accent" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-accent">
            {language === 'es' ? 'IMAGEN DE MARCA' : 'BRAND IMAGE'}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
          {language === 'es'
            ? 'La comunicación visual de una barbería juega un papel fundamental en la generación de confianza.'
            : 'The visual communication of a barbershop plays a key role in building trust.'}
        </h3>
        <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
          {language === 'es'
            ? 'Para LaPara BarberShow, el objetivo era desarrollar una estética limpia, moderna y cuidadosamente seleccionada que refleje el profesionalismo y la atención al detalle. Cada elemento visual está diseñado para comunicar los valores clave de la marca:'
            : 'For LaPara BarberShow, the objective was to develop a clean, modern, and carefully curated aesthetic that reflects professionalism and attention to detail. Every visual element is designed to communicate key brand values:'}
        </p>
        <div className="grid grid-cols-2 gap-4 pt-2">
          {language === 'es' ? (
            <>
              <div className="border border-neutral-900 bg-[#070707] p-4 rounded-sm">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">Confianza</h4>
                <p className="text-[11px] text-neutral-500 font-light">Fomentando relaciones a largo plazo con los clientes</p>
              </div>
              <div className="border border-neutral-900 bg-[#070707] p-4 rounded-sm">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">Profesionalidad</h4>
                <p className="text-[11px] text-neutral-500 font-light">Ejecución impecable y técnicas expertas</p>
              </div>
              <div className="border border-neutral-900 bg-[#070707] p-4 rounded-sm">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">Modernidad</h4>
                <p className="text-[11px] text-neutral-500 font-light">Estar al día con las tendencias de estilismo contemporáneas</p>
              </div>
              <div className="border border-neutral-900 bg-[#070707] p-4 rounded-sm">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">Calidad</h4>
                <p className="text-[11px] text-neutral-500 font-light">Atención al detalle en cada corte y servicio</p>
              </div>
            </>
          ) : (
            <>
              <div className="border border-neutral-900 bg-[#070707] p-4 rounded-sm">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">Trust</h4>
                <p className="text-[11px] text-neutral-500 font-light">Fostering long-term customer relationships</p>
              </div>
              <div className="border border-neutral-900 bg-[#070707] p-4 rounded-sm">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">Professionalism</h4>
                <p className="text-[11px] text-neutral-500 font-light">Flawless execution and expert techniques</p>
              </div>
              <div className="border border-neutral-900 bg-[#070707] p-4 rounded-sm">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">Modernity</h4>
                <p className="text-[11px] text-neutral-500 font-light">Staying ahead of contemporary grooming trends</p>
              </div>
              <div className="border border-neutral-900 bg-[#070707] p-4 rounded-sm">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">Quality</h4>
                <p className="text-[11px] text-neutral-500 font-light">Attention to detail in every cut and service</p>
              </div>
            </>
          )}
        </div>
        <p className="text-neutral-400 text-sm font-light italic">
          {language === 'es'
            ? 'El contenido busca crear una experiencia de marca coherente en todos los puntos de contacto digitales.'
            : 'The content aims to create a consistent brand experience across all digital touchpoints.'}
        </p>
      </section>

      {/* 4. CONTENT STRATEGY */}
      <section className="bg-neutral-950 p-8 md:p-12 border border-neutral-900 rounded-sm space-y-8">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-accent" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-accent">
            {language === 'es' ? 'ESTRATEGIA DE CONTENIDO' : 'CONTENT STRATEGY'}
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-2xl font-serif font-light text-white leading-tight">
              {language === 'es'
                ? 'Un enfoque de contenido polifacético para maximizar el engagement.'
                : 'A multifaceted content approach to maximize engagement.'}
            </h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              {language === 'es'
                ? 'Cada pieza de contenido está diseñada para captar la atención rápidamente mientras muestra la calidad del trabajo y la personalidad de la marca.'
                : 'Each piece of content is designed to capture attention quickly while showcasing the quality of the work and personality of the brand.'}
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {language === 'es' ? (
              <>
                <div className="border border-neutral-900 p-6 bg-[#070707] rounded-sm space-y-2">
                  <span className="text-xs font-mono text-accent">01</span>
                  <h4 className="text-sm font-mono text-white uppercase tracking-wider">Transformaciones de Corte de Pelo</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">Revelaciones dramáticas de antes y después que muestran precisión técnica y resultados visuales inmediatos.</p>
                </div>
                <div className="border border-neutral-900 p-6 bg-[#070707] rounded-sm space-y-2">
                  <span className="text-xs font-mono text-accent">02</span>
                  <h4 className="text-sm font-mono text-white uppercase tracking-wider">Experiencias de Clientes</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">Capturando reacciones auténticas de los clientes, interacciones comunitarias y la atmósfera acogedora del salón.</p>
                </div>
                <div className="border border-neutral-900 p-6 bg-[#070707] rounded-sm space-y-2">
                  <span className="text-xs font-mono text-accent">03</span>
                  <h4 className="text-sm font-mono text-white uppercase tracking-wider">Detrás de las Escenas</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">Una mirada transparente a las rutinas de la barbería, la preparación del peinado, el mantenimiento de herramientas y la formación continua.</p>
                </div>
                <div className="border border-neutral-900 p-6 bg-[#070707] rounded-sm space-y-2">
                  <span className="text-xs font-mono text-accent">04</span>
                  <h4 className="text-sm font-mono text-white uppercase tracking-wider">Estilo de Vida y Posicionamiento</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">Curaduría de la estética de estilo urbano moderno, adaptando los cortes de pelo al estilo personal y reforzando el posicionamiento premium.</p>
                </div>
              </>
            ) : (
              <>
                <div className="border border-neutral-900 p-6 bg-[#070707] rounded-sm space-y-2">
                  <span className="text-xs font-mono text-accent">01</span>
                  <h4 className="text-sm font-mono text-white uppercase tracking-wider">Haircut Transformations</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">Dramatic before-and-after reveals that showcase technical precision and immediate visual pay-offs.</p>
                </div>
                <div className="border border-neutral-900 p-6 bg-[#070707] rounded-sm space-y-2">
                  <span className="text-xs font-mono text-accent">02</span>
                  <h4 className="text-sm font-mono text-white uppercase tracking-wider">Client Experiences</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">Capturing authentic client reactions, community interactions, and the welcoming lounge atmosphere.</p>
                </div>
                <div className="border border-neutral-900 p-6 bg-[#070707] rounded-sm space-y-2">
                  <span className="text-xs font-mono text-accent">03</span>
                  <h4 className="text-sm font-mono text-white uppercase tracking-wider">Behind-The-Scenes</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">A transparent look into barbershop routines, styling preparation, tool maintenance, and continuous craft education.</p>
                </div>
                <div className="border border-neutral-900 p-6 bg-[#070707] rounded-sm space-y-2">
                  <span className="text-xs font-mono text-accent">04</span>
                  <h4 className="text-sm font-mono text-white uppercase tracking-wider">Lifestyle & Positioning</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">Curating modern urban style aesthetics, matching haircuts to personal style, and reinforcing premium positioning.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 5. VIDEO SHOWCASE */}
      <section className="space-y-8">
        <div className="flex flex-col border-b border-neutral-900 pb-6">
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">
            {language === 'es' ? 'GALERÍA DE VÍDEOS' : 'VIDEO SHOWCASE'}
          </span>
          <h3 className="text-xl md:text-2xl font-serif text-white font-light">
            {language === 'es' ? 'Adaptaciones de Contenido Corto (Formato Vertical 9:16)' : 'Short-Form Content Adaptations (9:16 Portrait)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Vertical Video Placeholder 1 (Embedded YouTube Short) */}
          <div className="space-y-4">
            <div className="aspect-[9/16] bg-[#0A0A0A] border border-neutral-900 rounded-sm relative overflow-hidden group">
              <iframe
                src="https://www.youtube.com/embed/a9rQ3KGqVEc"
                title="LaPara BarberShow - The Fade Transformation"
                className="w-full h-full absolute inset-0 border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text-center md:text-left space-y-1">
              <h4 className="text-sm font-mono text-white uppercase tracking-wider">BRAZILIAN CUT FOR AARON JAUREGUI</h4>
              <p className="text-xs text-neutral-500 font-light">
                {language === 'es'
                  ? 'Este cambio de look ha sido realizado a Aaron Jauregui, un TikToker con más de 700 mil seguidores entre todas sus redes sociales, logrando un impacto visual sobresaliente y un alto nivel de interacción.'
                  : 'This makeover was done for Aaron Jauregui, a well-known TikToker with over 700,000 followers across all his social media networks, achieving outstanding visual impact and high engagement.'}
              </p>
            </div>
          </div>

          {/* Vertical Video Placeholder 2 (Embedded YouTube Short) */}
          <div className="space-y-4">
            <div className="aspect-[9/16] bg-[#0A0A0A] border border-neutral-900 rounded-sm relative overflow-hidden group">
              <iframe
                src="https://www.youtube.com/embed/c5PztrcfMHk"
                title="LaPara BarberShow - The Experience Cut"
                className="w-full h-full absolute inset-0 border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text-center md:text-left space-y-1">
              <h4 className="text-sm font-mono text-white uppercase tracking-wider">MULLET FADE VIDEO</h4>
              <p className="text-xs text-neutral-500 font-light">
                {language === 'es'
                  ? 'Este es un vídeo mostrando cómo se trabaja en LaParaBarberShow, utilizando una de las canciones del momento y sincronizando todo lo visual con lo auditivo para darle un flujo mucho más continuado de vista.'
                  : 'This video showcases the active work process at LaParaBarberShow, leveraging a trending soundtrack and matching key transitions to the beat for a fluid, highly engaging viewing flow.'}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto pt-4 text-center">
          <p className="text-neutral-400 text-sm font-light leading-relaxed">
            {language === 'es'
              ? 'El contenido de formato corto está meticulosamente optimizado para el consumo moderno en redes sociales. Mediante la edición dinámica, cambios de plano de alta frecuencia, hooks fuertes y ritmos auditivos atractivos, se asegura la retención inmediata de la atención del usuario en los primeros 3 segundos de reproducción.'
              : 'The short-form content is meticulously optimized for modern social media consumption. Using dynamic editing, high-frequency frame shifts, strong hooks, and engaging auditory beats, it ensures immediately retained user engagement within the first 3 seconds of scroll.'}
          </p>
        </div>
      </section>

      {/* 6. RESULTS */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-b border-neutral-900 py-16">
        <div className="md:col-span-5 text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <TrendingUp size={16} className="text-accent" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-accent">
              {language === 'es' ? 'RESULTADOS DE MÉTRICAS' : 'METRIC RESULTS'}
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
            10,000+
          </h3>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            {language === 'es' ? 'VISTAS OBTENIDAS EN MÚLTIPLES VÍDEOS' : 'VIEWS ACHIEVED ON MULTIPLE VIDEOS'}
          </p>
        </div>
        <div className="md:col-span-7">
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            {language === 'es'
              ? 'La creación estratégica de contenido y una comunicación visual coherente ayudaron a aumentar significativamente la visibilidad de la marca y el engagement de la audiencia. Enfocándonos estrictamente en el alcance orgánico y la interacción genuina con la audiencia, nuestros sistemas de contenido ayudaron a elevar la huella digital de la barbería local, lo que se tradujo en reservas continuas de clientes e interacciones digitales robustas.'
              : 'Strategic content creation and consistent visual communication helped significantly increase the brand\'s visibility and audience engagement. Focusing strictly on organic reach and genuine audience interaction, our content systems helped elevate the local barbershop\'s digital footprint, resulting in continuous client bookings and robust digital interactions.'}
          </p>
        </div>
      </section>

      {/* 7. MY ROLE */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-accent" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-accent">
            {language === 'es' ? 'MI ROL Y RESPONSABILIDADES' : 'MY ROLE & RESPONSIBILITIES'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {language === 'es' ? (
            <>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Planificación de Contenidos</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Desarrollando calendarios editoriales, guiones gráficos de ganchos y estructurando directrices de frecuencia de publicación.</p>
              </div>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Filmación</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Captura en alta definición en localización con móvil y cámara, configurando la iluminación y capturando ángulos de movimiento auténticos.</p>
              </div>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Edición</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Sincronización de audio, seguimiento del ritmo, gradación de color y edición de transiciones de formato corto.</p>
              </div>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Diseño Gráfico</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Diseño de plantillas personalizadas de publicaciones tipográficas, miniaturas y portadas de destacados.</p>
              </div>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Creación de Contenido en Redes Sociales</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Redacción de copy, gestión de hashtags, optimización de metadatos de plataformas y coordinación del engagement en canales.</p>
              </div>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Comunicación de Marca</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Garantizar una consistencia del tono de voz y la estética estilística en todos los canales sociales.</p>
              </div>
            </>
          ) : (
            <>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Content Planning</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Developing editorial calendars, storyboarding hooks, and structuring post-frequency guidelines.</p>
              </div>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Filming</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">High-definition mobile and camera capture on-location, setting lighting, and capturing authentic motion angles.</p>
              </div>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Editing</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Audio syncing, pace tracking, color grading, and short-form transitions editing.</p>
              </div>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Graphic Design</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Designing custom typographic post templates, thumbnails, and highlight covers.</p>
              </div>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Social Media Content Creation</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Writing copy, managing hashtags, optimizing platform metadata, and coordinating channel engagement.</p>
              </div>
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">Brand Communication</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">Ensuring consistent tone-of-voice and style aesthetics across all social channels.</p>
              </div>
            </>
          )}
        </div>
      </section>

    </div>
  );
}
