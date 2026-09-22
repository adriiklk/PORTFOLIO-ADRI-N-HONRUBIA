import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="scroll-progress-indicator"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-accent origin-left z-[60] pointer-events-none shadow-[0_0_10px_var(--color-accent)]"
      style={{ scaleX }}
    />
  );
}
