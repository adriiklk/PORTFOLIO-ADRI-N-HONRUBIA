import React from 'react';
import { Project } from '../types';

interface ManaDetailsProps {
  project: Project;
}

export default function ManaDetails({ project }: ManaDetailsProps) {
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
          <span className="text-xs font-mono tracking-widest text-[#FFF]/50 uppercase">PROJECT INTRODUCTION</span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white leading-tight underline decoration-neutral-800 decoration-1 underline-offset-8">
            Maná Energy Drink
          </h2>
          <p className="text-lg text-neutral-400 font-light leading-relaxed">
            Maná Energy Drink is a branding project developed for a natural energy drink. The objective was to create a visual identity capable of communicating both natural ingredients and high energy performance through a distinctive and memorable brand language.
          </p>
        </div>
      </section>

      {/* 3. THE IDEA */}
      <section className="py-12 text-center space-y-8">
        <h3 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight leading-tight italic">
          "Natural energy doesn't have to look ordinary."
        </h3>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Introducing the core concept where organic vitality meets high-performance energy in a modern, streamlined visual narrative.
        </p>
      </section>

      {/* 4. NAMING */}
      <section className="space-y-6">
        <h3 className="text-2xl font-serif font-light text-white">Naming Evolution</h3>
        <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">
          The brand takes its name from the word "Maná", a concept historically associated with nourishment, vitality and a source of energy. The name was chosen because it connects naturally with the idea of providing energy while maintaining a more natural and approachable identity than traditional energy drink brands.
        </p>
      </section>

      {/* 5. BRAND STRATEGY */}
      <section className="space-y-6 ml-auto text-right max-w-2xl">
        <h3 className="text-2xl font-serif font-light text-white">Brand Positioning</h3>
        <p className="text-neutral-400 font-light leading-relaxed">
          The challenge was creating a brand that could compete visually with conventional energy drinks while differentiating itself through a more natural identity. The solution was to combine organic visual references with energetic and vibrant visual elements.
        </p>
      </section>

      {/* 6. LOGO DESIGN */}
      <section className="space-y-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-light text-white">Logo Design</h3>
          <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">
            Designed to balance <strong>Nature</strong> and <strong>Energy</strong>. The visual identity uses forms and graphic elements inspired by natural energy sources while maintaining a modern and dynamic appearance.
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
          <h3 className="text-2xl font-serif font-light text-white">Visual Identity</h3>
          <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">
            The identity combines natural visual cues with electric and vibrant colors, creating a contrast between natural origin and high-energy performance.
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
          <h3 className="text-2xl font-serif font-light text-white">Packaging Design</h3>
          <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">
            Designed to stand out on shelves while reinforcing the brand's dual personality: Natural values, modern aesthetics, and high visual impact.
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
          <h3 className="text-2xl font-serif font-light text-white">Advertising Campaign</h3>
          <p className="text-neutral-400 max-w-2xl font-light leading-relaxed">
            Demonstrating how the brand scales, featuring a branded airship flying above Barcelona to prove high visibility and recognition.
          </p>
        </div>
        {renderImage('Advertising Showcase', images[6] || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop')}
      </section>

    </div>
  );
}
