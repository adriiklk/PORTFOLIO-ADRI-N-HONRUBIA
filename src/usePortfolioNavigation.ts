import { useCallback, useEffect, useRef, useState } from 'react';
import { pathForView, resolvePath } from './projectRoutes.mjs';
import { ViewState } from './types';

export default function usePortfolioNavigation() {
  const [viewState, setViewState] = useState<ViewState>(() => resolvePath(window.location.pathname) as ViewState);
  const homePosition = useRef(0);
  const pendingHome = useRef<{ hash: string; y: number; behavior?: ScrollBehavior } | null>(null);
  const currentView = useRef(viewState.view);

  const restoreHome = useCallback(() => {
    const pending = pendingHome.current;
    if (!pending) return;
    const element = pending.hash ? document.getElementById(pending.hash) : null;
    if (pending.hash && !element) return;
    pendingHome.current = null;
    if (element) element.scrollIntoView({ block: 'start', behavior: pending.behavior ?? 'instant' });
    else window.scrollTo({ top: pending.y, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    const pop = () => {
      const next = resolvePath(location.pathname) as ViewState;
      pendingHome.current = next.view === 'home' ? { hash: location.hash.slice(1), y: homePosition.current } : null;
      currentView.current = next.view;
      setViewState(next);
      if (next.view === 'home') requestAnimationFrame(restoreHome);
    };
    const scroll = () => { if (currentView.current === 'home') homePosition.current = window.scrollY; };
    if (location.hash && currentView.current === 'home') pendingHome.current = { hash: location.hash.slice(1), y: 0 };
    window.addEventListener('popstate', pop);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => { history.scrollRestoration = previous; window.removeEventListener('popstate', pop); window.removeEventListener('scroll', scroll); };
  }, [restoreHome]);

  const navigate = useCallback((next: ViewState, target?: string) => {
    if (currentView.current === 'home') homePosition.current = window.scrollY;
    const url = pathForView(next) + (target && target !== 'top' ? `#${target}` : '');
    if (location.pathname + location.hash !== url) history.pushState(null, '', url);
    pendingHome.current = next.view === 'home' ? { hash: target && target !== 'top' ? target : '', y: target === 'top' ? 0 : homePosition.current, behavior: currentView.current === 'home' ? 'smooth' : 'instant' } : null;
    const alreadyHome = currentView.current === 'home';
    currentView.current = next.view;
    setViewState(next);
    if (alreadyHome && next.view === 'home') restoreHome();
  }, [restoreHome]);

  return { viewState, navigate, restoreHome };
}
