import { useState } from 'react';
import SpecularButton from './SpecularButton';
import { ArrowDown, ArrowUpRight, Linkedin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
const specularStyle = {
  size: 'lg' as const,
  radius: 18,
  tint: '#ffffff',
  tintOpacity: 0,
  blur: 0,
  textColor: '#f5f5f5',
  lineColor: '#E8C98D',
  baseColor: '#A8813B',
  intensity: 1,
  shineSize: 10,
  shineFade: 40,
  thickness: 1,
  speed: 0.35,
  followMouse: true,
  proximity: 250,
  autoAnimate: false,
};


export default function Hero({ onDiscoverClick }: { onDiscoverClick: () => void }) {
  const { language } = useLanguage();
  const [activeLetters, setActiveLetters] = useState<Set<number>>(() => new Set());
  const startLetter = (index: number) => setActiveLetters(current => current.has(index) ? current : new Set(current).add(index));
  const finishLetter = (index: number) => setActiveLetters(current => { const next = new Set(current); next.delete(index); return next; });
  const nameLetters = Array.from('ADRIÁN HONRUBIA');
  return <section className="gallery-hero">
    <div className="gallery-hero__background" />
    <h1 className="gallery-hero__name" aria-label="ADRIÁN HONRUBIA">
      <svg viewBox="0 0 1500 190" aria-hidden="true">
        <defs>
          <linearGradient id="hero-name-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="40%" stopColor="white" />
            <stop offset="80%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="hero-name-exterior" maskUnits="userSpaceOnUse" x="0" y="0" width="1500" height="190">
            <rect width="1500" height="190" fill="white" />
            <text x="750" y="150" textAnchor="middle" fill="black">ADRIÁN HONRUBIA</text>
          </mask>
          <mask id="hero-name-lit-outline" maskUnits="userSpaceOnUse" x="0" y="0" width="1500" height="190">
            <text x="750" y="150" textAnchor="middle" fill="none" stroke="url(#hero-name-fade)" strokeWidth="5">ADRIÁN HONRUBIA</text>
          </mask>
        </defs>
        <text x="750" y="150" textAnchor="middle" fill="none" stroke="url(#hero-name-fade)" strokeWidth="5" mask="url(#hero-name-exterior)">ADRIÁN HONRUBIA</text>
        <g mask="url(#hero-name-exterior)" className="gallery-hero__name-glint" data-active={activeLetters.size > 0}>
          <g mask="url(#hero-name-lit-outline)">
            <text className="gallery-hero__name-trace" x="750" y="150" textAnchor="middle" fill="none" stroke="#fff9e8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">{nameLetters.map((letter, index) => <tspan key={index} className={activeLetters.has(index) ? "is-tracing" : undefined} onAnimationEnd={() => finishLetter(index)}>{letter}</tspan>)}</text>
          </g>
        </g>
        <text x="750" y="150" textAnchor="middle" fill="transparent" className="gallery-hero__name-hit">
          {nameLetters.map((letter, index) => <tspan key={index} onPointerEnter={() => { if (letter !== ' ') startLetter(index); }}>{letter}</tspan>)}
        </text>
      </svg>
    </h1>
    <div id="hero-carousel-anchor" className="gallery-hero__anchor" />
    <div className="gallery-hero__footer">
      <p className="gallery-hero__role">AI CREATOR &amp;<br />MULTIMEDIA DESIGNER</p>
      <div className="gallery-hero__actions">
        <SpecularButton {...specularStyle} onClick={onDiscoverClick} className="hero-specular-button">
          <span> {language === 'es' ? 'VER MI TRABAJO' : 'VIEW MY WORK'} <ArrowDown size={14} /></span>
        </SpecularButton>
        <SpecularButton {...specularStyle} href="https://www.linkedin.com/in/adri%C3%A1n-honrubia-gonz%C3%A1lez-8b1640435/" target="_blank" rel="noopener noreferrer" className="hero-specular-button">
          <span><Linkedin size={14} /> LINKEDIN <ArrowUpRight size={13} /></span>
        </SpecularButton>
      </div>
    </div>
  </section>;
}
