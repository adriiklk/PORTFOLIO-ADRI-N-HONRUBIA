const headerLogo = new URL('../assets/images/ah-logo.png', import.meta.url).href;
import './Header.css';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { ViewState } from '../types';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

interface HeaderProps {
  viewState: ViewState;
  setViewState: (state: ViewState) => void;
}

export default function Header({ viewState, setViewState }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: t('nav.work'), target: 'work' },
    { label: t('nav.about'), target: 'about' },
    { label: t('nav.services'), target: 'services' },
    { label: t('nav.contact'), target: 'contact' }
  ];

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 40);
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      headerRef.current?.style.setProperty('--header-glint-position', `${34 + progress * 32}%`);
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    };
    updateScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const handleNavClick = (target: string) => {
    setIsMobileMenuOpen(false);
    
    // If we are currently in project detail view, switch back to home view first
    if (viewState.view !== 'home') {
      setViewState({ view: 'home' });
      // Minor timeout to let React re-mount the home page elements before scrolling
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleBrandClick = () => {
    setIsMobileMenuOpen(false);
    setViewState({ view: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header ref={headerRef} className={`glass-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="glass-header__bar">
          <div className="glass-header__side glass-header__left">
            <div className="glass-header__languages" aria-label="Language">
              <button onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button>
              <span>/</span>
              <button onClick={() => setLanguage('es')} aria-pressed={language === 'es'}>ES</button>
            </div>
            <nav className="glass-header__nav" aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}>
              {navLinks.slice(0, 2).map(link => <button key={link.target} onClick={() => handleNavClick(link.target)}>{link.label}</button>)}
            </nav>
          </div>
          <button className="glass-header__brand" onClick={handleBrandClick} aria-label="Adrián Honrubia — Inicio">
            <span className="glass-header__logo"><img src={headerLogo} alt="" />
            </span>
          </button>
          <div className="glass-header__side glass-header__right">
            <nav className="glass-header__nav" aria-label={language === 'es' ? 'Más secciones' : 'More sections'}>
              {navLinks.slice(2).map(link => <button key={link.target} onClick={() => handleNavClick(link.target)}>{link.label}</button>)}
            </nav>
            <button className="glass-header__theme" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'} aria-pressed={theme === 'light'}>
              <Moon size={14} /><span className="glass-header__orb" /><Sun size={14} />
            </button>
            <button className="glass-header__menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={language === 'es' ? 'Abrir o cerrar menú' : 'Toggle navigation'} aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#F9F9F7] dark:bg-[#0E0E0E] text-neutral-900 dark:text-white flex flex-col justify-between p-8 pt-28"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-sans font-medium tracking-[0.3em] text-accent uppercase border-b border-neutral-200 dark:border-neutral-900 pb-2">
                {t('brand.directory')}
              </span>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <motion.button
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                    key={link.target}
                    onClick={() => handleNavClick(link.target)}
                    className="text-left text-2xl sm:text-3xl font-sans uppercase tracking-[0.12em] font-light text-neutral-700 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-all hover:pl-2"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              {/* Mobile Theme Selector inside drawer */}
              <div className="flex items-center justify-between py-2 border-b border-neutral-200 dark:border-neutral-900">
                <span className="text-[10px] font-sans font-medium tracking-[0.3em] text-neutral-500 uppercase">
                  {language === 'es' ? 'TEMA' : 'THEME'}
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-xs font-sans font-medium tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-accent transition-colors"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun size={14} className="text-accent" />
                      <span>{language === 'es' ? 'MODO CLARO' : 'LIGHT MODE'}</span>
                    </>
                  ) : (
                    <>
                      <Moon size={14} className="text-accent" />
                      <span>{language === 'es' ? 'MODO OSCURO' : 'DARK MODE'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile Language Selector inside drawer */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-sans font-medium tracking-[0.3em] text-neutral-500 uppercase">
                  {language === 'es' ? 'IDIOMA' : 'LANGUAGE'}
                </span>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`text-xs font-sans tracking-widest py-1 ${
                      language === 'en' ? 'text-accent font-semibold' : 'text-neutral-500 font-medium'
                    }`}
                  >
                    ENGLISH
                  </button>
                  <span className="text-xs font-sans text-neutral-400 dark:text-neutral-500 font-normal select-none">/</span>
                  <button
                    onClick={() => setLanguage('es')}
                    className={`text-xs font-sans tracking-widest py-1 ${
                      language === 'es' ? 'text-accent font-semibold' : 'text-neutral-500 font-medium'
                    }`}
                  >
                    ESPAÑOL
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Drawer Footer Info */}
            <div className="flex flex-col gap-4 border-t border-neutral-200 dark:border-neutral-900 pt-6">
              <div className="text-[10px] font-sans tracking-wider text-neutral-500 font-medium">
                {t('brand.info')}
              </div>
              <a
                href="mailto:adrianhonrubia05@gmail.com"
                className="text-xs font-sans font-medium text-neutral-900 dark:text-white hover:text-accent transition-colors"
              >
                adrianhonrubia05@gmail.com
              </a>
              <div className="flex gap-4 text-[10px] font-sans font-medium text-neutral-500">
                <a href="https://instagram.com/adriannhg_" target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">INSTAGRAM</a>
                <span>/</span>
                <a href="https://www.linkedin.com/in/adri%C3%A1n-honrubia-gonz%C3%A1lez-8b1640435/" target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">LINKEDIN</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
