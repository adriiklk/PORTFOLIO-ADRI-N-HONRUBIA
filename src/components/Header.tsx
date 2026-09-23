import { useEffect, useState } from 'react';
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
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out select-none ${
          isScrolled
            ? 'py-4 bg-[#F9F9F7]/90 dark:bg-[#0A0A0A]/90 border-b border-neutral-200/80 dark:border-neutral-900/40 backdrop-blur-md shadow-xs dark:shadow-none'
            : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <button
            onClick={handleBrandClick}
            className="flex flex-col items-start gap-0.5 text-left group"
          >
            <span className="text-sm font-serif font-medium tracking-[0.2em] text-neutral-900 dark:text-white group-hover:text-accent transition-colors duration-300">
              ADRIÁN HONRUBIA
            </span>
            <span className="text-[9px] font-sans tracking-[0.18em] uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors duration-300 font-medium">
              {t('brand.subtitle')}
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            <nav className="flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => handleNavClick(link.target)}
                  className="relative text-[11px] font-sans font-medium uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-2 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-accent group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Desktop Language Selector */}
            <div className="flex items-center gap-2 border-l border-neutral-300 dark:border-neutral-800 pl-6 h-4">
              <button
                onClick={() => setLanguage('en')}
                className={`text-[10px] font-sans tracking-widest transition-colors ${
                  language === 'en' ? 'text-accent font-semibold' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium'
                }`}
                aria-label="Set language to English"
              >
                EN
              </button>
              <span className="text-[11px] font-sans text-neutral-400 dark:text-neutral-500 font-normal select-none">/</span>
              <button
                onClick={() => setLanguage('es')}
                className={`text-[10px] font-sans tracking-widest transition-colors ${
                  language === 'es' ? 'text-accent font-semibold' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium'
                }`}
                aria-label="Set language to Spanish"
              >
                ES
              </button>
            </div>

            {/* Desktop Theme Mode Toggle */}
            <div className="flex items-center pl-3 border-l border-neutral-300 dark:border-neutral-800">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-accent hover:bg-neutral-200/70 dark:hover:bg-neutral-800/80 transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? (language === 'es' ? 'Activar modo claro' : 'Switch to light mode') : (language === 'es' ? 'Activar modo oscuro' : 'Switch to dark mode')}
              >
                {theme === 'dark' ? (
                  <Sun size={15} className="transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon size={15} className="transition-transform duration-300 hover:-rotate-12" />
                )}
              </button>
            </div>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-accent transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="Toggle Navigation menu"
            >
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
