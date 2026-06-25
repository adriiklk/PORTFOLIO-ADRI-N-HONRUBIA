import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-neutral-900/60 text-neutral-500 py-12 select-none font-mono text-[10px] tracking-widest uppercase">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Credit */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-left">
          <span>&copy; {currentYear} ADRIÁN HONRUBIA</span>
          <span className="hidden md:inline">/</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>

        {/* Right Scroll to Top Lever */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-white transition-colors py-2 px-1 group"
          data-cursor="hover"
          aria-label="Scroll back to top of page"
        >
          <span>BACK TO SUMMIT</span>
          <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
    </footer>
  );
}
