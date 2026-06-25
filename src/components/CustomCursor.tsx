import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'project' | 'play'>('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Outer circle lag springs for buttery fluid animations
  const outerX = useSpring(cursorX, springConfig);
  const outerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only activate cursor if the pointer supports fine actions (mouse pointer)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest interactive element or custom action targets
      const clickable = target.closest('a, button, [role="button"], input, select, textarea');
      const projectCard = target.closest('[data-cursor="project"]');
      const playCard = target.closest('[data-cursor="play"]');

      if (playCard) {
        setCursorType('play');
      } else if (projectCard) {
        setCursorType('project');
      } else if (clickable) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const handleHoverEnd = () => {
      setCursorType('default');
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Listen to mouseover events dynamically across the entire page
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="fixed pointer-events-none inset-0 z-[10000] overflow-hidden">
      {/* 1. Fine Inner Dot */}
      <motion.div
        className="w-1.5 h-1.5 bg-accent rounded-full fixed -translate-x-1/2 -translate-y-1/2"
        style={{
          left: cursorX,
          top: cursorY,
        }}
        animate={{
          scale: cursorType !== 'default' ? 0.4 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* 2. Slow Trailing Outer Interactive Ring / Badge */}
      <motion.div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-sans font-medium text-[9px] tracking-widest text-black"
        style={{
          left: outerX,
          top: outerY,
          width: cursorType === 'project' || cursorType === 'play' ? 64 : cursorType === 'hover' ? 36 : 20,
          height: cursorType === 'project' || cursorType === 'play' ? 64 : cursorType === 'hover' ? 36 : 20,
          border: cursorType === 'project' || cursorType === 'play' ? 'none' : '1px solid rgba(201, 169, 110, 0.6)',
          backgroundColor: cursorType === 'project' ? '#C9A96E' : cursorType === 'play' ? '#FFFFFF' : 'transparent',
          color: cursorType === 'project' ? '#000000' : cursorType === 'play' ? '#000000' : '#FFFFFF',
        }}
        animate={{
          scale: 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {cursorType === 'project' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-semibold text-[8px]"
          >
            VIEW
          </motion.span>
        )}
        {cursorType === 'play' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-semibold text-[8px]"
          >
            PLAY
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
