import { useEffect, type MouseEvent } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import './NotFound.css';

export default function NotFound({ onNavigate }: { onNavigate: (target: string) => void }) {
  const { language } = useLanguage();
  const es = language === 'es';
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('not-found-title')?.focus({ preventScroll: true });
  }, []);
  const follow = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(target);
  };
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__halo" aria-hidden="true" />
      <div className="not-found__content">
        <span className="not-found__eyebrow">404 / {es ? 'FUERA DE PLANO' : 'OUT OF FRAME'}</span>
        <div className="not-found__art" aria-hidden="true">
          <span className="not-found__number">404</span>

          <span className="not-found__coordinate">AH — PORTFOLIO</span>
        </div>
        <h1 id="not-found-title" tabIndex={-1} className="not-found__title text-white">
          {es ? 'Aquí no hay nada. Todavía.' : 'Nothing here. Yet.'}
        </h1>
        <span className="not-found__horizon" aria-hidden="true" />
        <p className="not-found__description">
          {es ? 'Esta página no existe o ha cambiado de lugar. Mis proyectos siguen por aquí.' : 'This page doesn’t exist or has moved. My projects are still right here.'}
        </p>
        <nav className="not-found__actions" aria-label={es ? 'Volver al portfolio' : 'Return to portfolio'}>
          <a className="not-found__primary" href="/" onClick={event => follow(event, 'top')} data-cursor="hover">
            <ArrowLeft size={17} aria-hidden="true" /> {es ? 'Volver al inicio' : 'Back home'}
          </a>
          <a className="not-found__secondary" href="/#work" onClick={event => follow(event, 'work')} data-cursor="hover">
            {es ? 'Explorar proyectos' : 'Explore projects'} <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </section>
  );
}
