import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setPercentage(Math.round(latest * 100));
      setShowButton(latest > 0.15);
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Laser Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 z-[100] origin-left shadow-[0_0_15px_rgba(168,85,247,0.8)]"
        style={{ scaleX }}
      />

      {/* Floating Scroll-to-Top Button with Dynamic Percentage Ring */}
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl bg-[#0e111f]/90 border border-purple-500/40 backdrop-blur-xl shadow-xl shadow-black/50 flex flex-col items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400 group transition-all duration-300 cursor-pointer"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-cyan-400" />
          <span className="text-[9px] font-mono font-bold text-purple-300">
            {percentage}%
          </span>
        </motion.button>
      )}
    </>
  );
}
