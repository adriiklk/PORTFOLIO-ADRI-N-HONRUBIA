import React from 'react';
import { Project } from '../types';
import { useLanguage } from '../LanguageContext';

interface ManaDetailsProps {
  project: Project;
}

export default function ManaDetails({ project }: ManaDetailsProps) {
  const { language } = useLanguage();
  const images = project.gallery || [];

  const renderImage = (label: string, imageUrl: string, containerClass: string = 'w-full') => {
    return (
      <div className={`bg-[#0A0A0A] border border-neutral-900 rounded-sm overflow-hidden group h-fit ${containerClass}`}>
        {imageUrl && (
          <img src={imageUrl} alt={label} className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105" />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pb-20 space-y-24 text-neutral-200 font-sans">
      
      {/* 1. PROJECT INTRODUCTION */}
      <section className="border-b border-neutral-900 pb-16">
        <div className="space-y-6 max-w-3xl">
          <span className="text-xs font-mono tracking-widest text-[#FFF]/50 uppercase">
            {language === 'es' ? 'INTRODUCCIÓN DEL PROYECTO' : 'PROJECT INTRODUCTION'}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white leading-tight underline decoration-neutral-800 decoration-1 underline-offset-8">
            Maná Energy Drink
          </h2>
          <p className="text-lg text-neutral-400 font-light leading-relaxed">
            {language === 'es'
              ? 'Maná Energy Drink es un proyecto de branding desarrollado para una bebida energética natural. El objetivo era crear una identidad visual capaz de comunicar tanto los ingredientes naturales como el alto rendimiento energético a través de un lenguaje de marca distintivo y memorable.'
              : 'Maná Energy Drink is a branding project developed for a natural energy drink. The objective was to create a visual identity capable of communicating both natural ingredients and high energy performance through a distinctive and memorable brand language.'}
          </p>
        </div>
      </section>

      {/* 3. THE IDEA */}
      <section className="py-12 text-center space-y-8">
        <h3 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight leading-tight italic">
          {language === 'es'
            ? '«La energía natural no tiene por qué parecer ordinaria».'
            : '“Natural energy doesn\'t have to look ordinary.”'}
        </h3>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          {language === 'es'
            ? 'Presentación del concepto central donde la vitalidad orgánica se une con la energía de alto rendimiento en una narrativa visual moderna.'
            : 'Introducing the core concept where organic vitality meets high-performance energy in a modern, streamlined visual narrative.'}
        </p>
      </section>

      {/* 4. NAMING */}
      <section className="space-y-6">
        <h3 className="text-2xl font-serif font-light text-white">
          {language === 'es' ? 'Evolución del Naming' : 'Naming Evolution'}
        </h3>
        <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">
          {language === 'es'
            ? 'La marca toma su nombre de la palabra «Maná», un concepto históricamente asociado con el alimento, la vitalidad y una fuente de energía pura. El nombre fue elegido porque conecta de forma natural con la idea de proporcionar energía manteniendo al mismo tiempo una identidad más natural y cercana que las marcas tradicionales de bebidas energéticas.'
            : 'The brand takes its name from the word "Maná", a concept historically associated with nourishment, vitality and a source of energy. The name was chosen because it connects naturally with the idea of providing energy while maintaining a more natural and approachable identity than traditional energy drink brands.'}
        </p>
      </section>

      {/* 5. BRAND STRATEGY */}
      <section className="space-y-6 ml-auto text-right max-w-2xl">
        <h3 className="text-2xl font-serif font-light text-white">
          {language === 'es' ? 'Posicionamiento de Marca' : 'Brand Positioning'}
        </h3>
        <p className="text-neutral-400 font-light leading-relaxed">
          {language === 'es'
            ? 'El reto consistía en crear una marca que pudiera competir visualmente con las bebidas energéticas convencionales diferenciándose al mismo tiempo gracias a una identidad más natural. La solución fue combinar referencias visuales orgánicas con elementos gráficos enérgicos y vibrantes.'
            : 'The challenge was creating a brand that could compete visually with conventional energy drinks while differentiating itself through a more natural identity. The solution was to combine organic visual references with energetic and vibrant visual elements.'}
        </p>
      </section>

      {/* 6. LOGO DESIGN */}
      <section className="space-y-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-light text-white">
            {language === 'es' ? 'Diseño de Logotipo' : 'Logo Design'}
          </h3>
          <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">
            {language === 'es' ? (
              <>
                Diseñado para equilibrar la <strong>Naturaleza</strong> y la <strong>Energía</strong>. La identidad visual utiliza formas y elementos gráficos inspirados en fuentes de energía natural manteniendo un aspecto moderno y dinámico.
              </>
            ) : (
              <>
                Designed to balance <strong>Nature</strong> and <strong>Energy</strong>. The visual identity uses forms and graphic elements inspired by natural energy sources while maintaining a modern and dynamic appearance.
              </>
            )}
          </p>
        </div>
        {renderImage(
          'Logo Showcase',
          images[0] || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
          'max-w-2xl mx-auto'
        )}
      </section>

      {/* 7. VISUAL IDENTITY */}
      <section className="space-y-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-light text-white">
            {language === 'es' ? 'Identidad Visual' : 'Visual Identity'}
          </h3>
          <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">
            {language === 'es'
              ? 'La identidad combina referencias visuales naturales con colores eléctricos y vibrantes, creando un fuerte contraste entre el origen natural y el rendimiento de alta energía.'
              : 'The identity combines natural visual cues with electric and vibrant colors, creating a contrast between natural origin and high-energy performance.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderImage('Typography', images[2] || 'https://images.unsplash.com/photo-1540747737956-378724044432?q=80&w=800&auto=format&fit=crop')}
          {renderImage('Brand Elements', images[3] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop')}
        </div>
      </section>

      {/* 8. PACKAGING DESIGN */}
      <section className="space-y-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-light text-white">
            {language === 'es' ? 'Diseño de Packaging' : 'Packaging Design'}
          </h3>
          <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">
            {language === 'es'
              ? 'Diseñado para destacar en los estantes a la vez que refuerza la doble personalidad de la marca: valores naturales, estética moderna y un alto impacto visual.'
              : 'Designed to stand out on shelves while reinforcing the brand\'s dual personality: Natural values, modern aesthetics, and high visual impact.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderImage('Premium Packaging 01', images[4] || 'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=800&auto=format&fit=crop')}
          {renderImage('Premium Packaging 02', images[5] || 'https://images.unsplash.com/photo-1615555466453-6ce862803c14?q=80&w=800&auto=format&fit=crop')}
        </div>
      </section>

      {/* 9. ADVERTISING APPLICATION */}
      <section className="space-y-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-light text-white">
            {language === 'es' ? 'Campaña Publicitaria' : 'Advertising Campaign'}
          </h3>
          <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">
            {language === 'es'
              ? 'Demostración de la escala de la marca, presentando un zepelín publicitario sobrevolando Barcelona para garantizar una alta visibilidad y reconocimiento.'
              : 'Demonstrating how the brand scales, featuring a branded airship flying above Barcelona to prove high visibility and recognition.'}
          </p>
        </div>
        {renderImage('Advertising Showcase', images[6] || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop')}
      </section>

    </div>
  );
}
