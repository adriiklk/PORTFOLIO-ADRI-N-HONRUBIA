import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  viewState: ViewState;
  setViewState: (state: ViewState) => void;
}

const navLinks = [
  { label: 'Work', target: 'work' },
  { label: 'About', target: 'about' },
  { label: 'Services', target: 'services' },
  { label: 'Contact', target: 'contact' }
];

export default function Header({ viewState, setViewState }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            ? 'py-4 bg-[#0A0A0A]/90 border-b border-neutral-900/40 backdrop-blur-md'
            : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <button
            onClick={handleBrandClick}
            className="flex flex-col items-start gap-0.5 text-left group"
          >
            <span className="text-sm font-serif font-medium tracking-[0.2em] text-white group-hover:text-accent transition-colors duration-300">
              ADRIÁN HONRUBIA
            </span>
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 group-hover:text-white transition-colors duration-300">
              GRAPHIC DESIGN, FILMMAKING & BRANDING
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                className="relative text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-accent group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle Navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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
            className="fixed inset-0 z-40 bg-[#0E0E0E] flex flex-col justify-between p-8 pt-32"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono tracking-[0.3em] text-accent uppercase border-b border-neutral-900 pb-2">
                NAVIGATE DIRECTORY
              </span>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.button
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                    key={link.target}
                    onClick={() => handleNavClick(link.target)}
                    className="text-left text-3xl font-serif font-light text-neutral-400 hover:text-accent transition-all hover:pl-2"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Mobile Drawer Footer Info */}
            <div className="flex flex-col gap-4 border-t border-neutral-900 pt-6">
              <div className="text-[10px] font-mono tracking-wider text-neutral-500">
                INFO & INQUIRIES
              </div>
              <a
                href="mailto:adrianhonrubia05@gmail.com"
                className="text-xs font-mono text-white hover:text-accent transition-colors"
              >
                adrianhonrubia05@gmail.com
              </a>
              <div className="flex gap-4 text-[10px] font-mono text-neutral-500">
                <a href="#instagram" className="hover:text-white transition-colors">INSTAGRAM</a>
                <span>/</span>
                <a href="#linkedin" className="hover:text-white transition-colors">LINKEDIN</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
