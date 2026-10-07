import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import Hero from './Hero';
import ProjectsSection from './ProjectsSection';
import CircularCarousel from './CircularCarousel';
import { Project } from '../types';
import './HomeShowcase.css';

export default function HomeShowcase({ projects, onSelectProject, onDiscoverClick }: {
  projects: Project[];
  onSelectProject: (id: string) => void;
  onDiscoverClick: () => void;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const floating = useRef<HTMLDivElement>(null);
  const dockedRef = useRef(false);
  const [isDocked, setIsDocked] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'list'>('carousel');
  const items = useMemo(() => projects.map(p => ({ id: p.id, src: p.image, alt: p.title, title: p.title, subtitle: p.category })), [projects]);

  useLayoutEffect(() => {
    const root = scene.current;
    const layer = floating.current;
    const origin = root?.querySelector<HTMLElement>('#hero-carousel-anchor');
    if (!root || !layer || !origin) return;
    const destination = root.querySelector<HTMLElement>('#work-carousel-anchor');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let geometry = { start: 0, end: 0, left: 0, endLeft: 0, width: 0, endWidth: 0, height: 0, endHeight: 0, pageTop: 0 };
    const paint = () => {
      frame = 0;
      const g = geometry;
      const distance = g.end - g.start;
      const travel = destination && !reduced.matches ? Math.min(Math.max(window.scrollY - g.pageTop, 0), distance) : 0;
      const progress = distance > 0 ? travel / distance : 0;
      const mix = (a: number, b: number) => a + (b - a) * progress;
      const width = mix(g.width, g.endWidth);
      const height = mix(g.height, g.endHeight);
      layer.style.transform = `translate3d(${mix(g.left, g.endLeft) + (width - g.endWidth) / 2}px, ${g.start + travel + (height - g.endHeight) / 2}px, 0)`;
      layer.firstElementChild?.dispatchEvent(new CustomEvent('carousel-viewport', { detail: { width, height } }));
      const docked = Boolean(destination && (reduced.matches
        ? window.scrollY > g.pageTop + g.end - window.innerHeight * .6
        : progress >= 1));
      if (dockedRef.current !== docked) {
        dockedRef.current = docked;
        setIsDocked(docked);
      }
      // Reduced motion keeps the same carousel in its nearest section without travelling.
      if (destination && reduced.matches && window.scrollY > g.pageTop + g.end - window.innerHeight * .6) {
        layer.style.transform = `translate3d(${g.endLeft}px, ${g.end}px, 0)`;
        layer.firstElementChild?.dispatchEvent(new CustomEvent('carousel-viewport', { detail: { width: g.endWidth, height: g.endHeight } }));
      }
    };
    const measure = () => {
      const r = root.getBoundingClientRect(), a = origin.getBoundingClientRect(), b = destination?.getBoundingClientRect() ?? a;
      geometry = { start: a.top-r.top, end: b.top-r.top, left: a.left-r.left, endLeft: b.left-r.left, width: a.width, endWidth: b.width, height: a.height, endHeight: b.height, pageTop: r.top+window.scrollY };
      Object.assign(layer.style, { top: '0px', left: '0px', width: `${b.width}px`, height: `${b.height}px` });
      paint();
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const observer = new ResizeObserver(measure);
    observer.observe(root); observer.observe(origin);
    if (destination) observer.observe(destination);
    measure();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', measure);
    reduced.addEventListener('change', measure);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', measure); reduced.removeEventListener('change', measure); };
  }, [viewMode]);

  return <div ref={scene} className="home-showcase">
    <Hero onDiscoverClick={onDiscoverClick} />
    <ProjectsSection projects={projects} onSelectProject={onSelectProject} viewMode={viewMode} setViewMode={setViewMode} />
    <div ref={floating} className="travelling-carousel" data-docked={isDocked} inert={!isDocked}>
      <CircularCarousel items={items} preset="cylinder" intro="rise" cardWidth={450} aspectRatio={1.5} speed={14} captions gap={34} perspective={2200} onItemClick={isDocked ? item => { if (dockedRef.current) onSelectProject(item.id); } : undefined} />
    </div>
  </div>;
}
