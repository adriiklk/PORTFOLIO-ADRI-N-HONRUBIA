import React from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, Target, Sparkles, Smartphone, Play, 
  TrendingUp, Layers, Award, Film, CheckCircle2 
} from 'lucide-react';
import { Project } from '../types';

interface LaParaDetailsProps {
  project: Project;
}

export default function LaParaDetails({ project }: LaParaDetailsProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pb-20 space-y-24 text-neutral-200 font-sans">
      
      {/* 1. INTRODUCTION & OVERVIEW GRID */}
      <section className="border-b border-neutral-900 pb-16">
        {/* Intro */}
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
            PROJECT INTRODUCTION
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
            LaPara BarberShow is an ongoing social media and content creation project focused on strengthening the barbershop's digital presence and building a recognizable brand identity across social platforms.
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            The objective is to create content that not only showcases the quality of the service but also communicates the personality, professionalism, and atmosphere of the brand.
          </p>
        </div>
      </section>

      {/* 2. THE OBJECTIVE */}
      <section className="bg-neutral-950 p-8 md:p-12 border border-neutral-900 rounded-sm space-y-6">
        <div className="flex items-center gap-2">
          <Target size={16} className="text-accent" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-accent">THE OBJECTIVE</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
            Establishing a strong and consistent digital presence capable of attracting new clients while reinforcing the brand's professional image.
          </h3>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            The strategy combines visual identity, short-form video content, and storytelling to increase visibility and engagement across social media platforms.
          </p>
        </div>
      </section>

      {/* 3. BRAND IMAGE */}
      <section className="max-w-3xl space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-accent" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-accent">BRAND IMAGE</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
          The visual communication of a barbershop plays a key role in building trust.
        </h3>
        <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
          For LaPara BarberShow, the objective was to develop a clean, modern, and carefully curated aesthetic that reflects professionalism and attention to detail. Every visual element is designed to communicate key brand values:
        </p>
        <div className="grid grid-cols-2 gap-4 pt-2">
          {[
            { title: 'Trust', desc: 'Fostering long-term customer relationships' },
            { title: 'Professionalism', desc: 'Flawless execution and expert techniques' },
            { title: 'Modernity', desc: 'Staying ahead of contemporary grooming trends' },
            { title: 'Quality', desc: 'Attention to detail in every cut and service' }
          ].map((v) => (
            <div key={v.title} className="border border-neutral-900 bg-[#070707] p-4 rounded-sm">
              <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1">{v.title}</h4>
              <p className="text-[11px] text-neutral-500 font-light">{v.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-neutral-400 text-sm font-light italic">
          The content aims to create a consistent brand experience across all digital touchpoints.
        </p>
      </section>

      {/* 4. CONTENT STRATEGY */}
      <section className="bg-neutral-950 p-8 md:p-12 border border-neutral-900 rounded-sm space-y-8">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-accent" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-accent">CONTENT STRATEGY</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-2xl font-serif font-light text-white leading-tight">
              A multifaceted content approach to maximize engagement.
            </h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Each piece of content is designed to capture attention quickly while showcasing the quality of the work and personality of the brand.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { num: '01', title: 'Haircut Transformations', desc: 'Dramatic before-and-after reveals that showcase technical precision and immediate visual pay-offs.' },
              { num: '02', title: 'Client Experiences', desc: 'Capturing authentic client reactions, community interactions, and the welcoming lounge atmosphere.' },
              { num: '03', title: 'Behind-The-Scenes', desc: 'A transparent look into barbershop routines, styling preparation, tool maintenance, and continuous craft education.' },
              { num: '04', title: 'Lifestyle & Positioning', desc: 'Curating modern urban style aesthetics, matching haircuts to personal style, and reinforcing premium positioning.' }
            ].map((item) => (
              <div key={item.num} className="border border-neutral-900 p-6 bg-[#070707] rounded-sm space-y-2">
                <span className="text-xs font-mono text-accent">{item.num}</span>
                <h4 className="text-sm font-mono text-white uppercase tracking-wider">{item.title}</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VIDEO SHOWCASE */}
      <section className="space-y-8">
        <div className="flex flex-col border-b border-neutral-900 pb-6">
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">
            VIDEO SHOWCASE
          </span>
          <h3 className="text-xl md:text-2xl font-serif text-white font-light">
            Short-Form Content Adaptations (9:16 Portrait)
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
              <p className="text-xs text-neutral-500 font-light">This makeover was done for Aaron Jauregui, a well-known TikToker with over 700,000 followers across all his social media networks, achieving outstanding visual impact and high engagement.</p>
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
              <p className="text-xs text-neutral-500 font-light">This video showcases the active work process at LaParaBarberShow, leveraging a trending soundtrack and matching key transitions to the beat for a fluid, highly engaging viewing flow.</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto pt-4 text-center">
          <p className="text-neutral-400 text-sm font-light leading-relaxed">
            The short-form content is meticulously optimized for modern social media consumption. Using dynamic editing, high-frequency frame shifts, strong hooks, and engaging auditory beats, it ensures immediately retained user engagement within the first 3 seconds of scroll.
          </p>
        </div>
      </section>

      {/* 6. RESULTS */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-b border-neutral-900 py-16">
        <div className="md:col-span-5 text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <TrendingUp size={16} className="text-accent" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-accent">METRIC RESULTS</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
            10,000+
          </h3>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            VIEWS ACHIEVED ON MULTIPLE VIDEOS
          </p>
        </div>
        <div className="md:col-span-7">
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            Strategic content creation and consistent visual communication helped significantly increase the brand's visibility and audience engagement. Focusing strictly on organic reach and genuine audience interaction, our content systems helped elevate the local barbershop's digital footprint, resulting in continuous client bookings and robust digital interactions.
          </p>
        </div>
      </section>

      {/* 7. MY ROLE */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-accent" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-accent">MY ROLE & RESPONSIBILITIES</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Content Planning', desc: 'Developing editorial calendars, storyboarding hooks, and structuring post-frequency guidelines.' },
            { title: 'Filming', desc: 'High-definition mobile and camera capture on-location, setting lighting, and capturing authentic motion angles.' },
            { title: 'Editing', desc: 'Audio syncing, pace tracking, color grading, and short-form transitions editing.' },
            { title: 'Graphic Design', desc: 'Designing custom typographic post templates, thumbnails, and highlight covers.' },
            { title: 'Social Media Content Creation', desc: 'Writing copy, managing hashtags, optimizing platform metadata, and coordinating channel engagement.' },
            { title: 'Brand Communication', desc: 'Ensuring consistent tone-of-voice and style aesthetics across all social channels.' }
          ].map((item) => (
            <div key={item.title} className="border border-neutral-900 bg-neutral-950 p-6 rounded-sm space-y-3">
              <h4 className="text-xs font-mono text-white uppercase tracking-wider border-b border-neutral-900 pb-2">{item.title}</h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>



    </div>
  );
}
