import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, CheckCircle2, X, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

const ACHIEVEMENTS = [
  {
    threshold: 0.18,
    id: 'ach-1',
    title: 'Orbit 01 Reached: Escape Velocity',
    desc: 'Explored Astronaut Selva Guru Karthikeyan P\'s mission profile & engineering philosophy.',
    icon: Sparkles,
    badge: '+50 XP MISSION BLUEPRINT'
  },
  {
    threshold: 0.42,
    id: 'ach-2',
    title: 'Orbit 02 Reached: Avionics Mastered',
    desc: 'Analyzed 20+ flight-ready propulsion stacks in Frontend, Backend, Cloud & Autonomous AI.',
    icon: Zap,
    badge: '+75 XP AVIONICS'
  },
  {
    threshold: 0.68,
    id: 'ach-3',
    title: 'Orbit 03 Reached: Starfleet Flagships',
    desc: 'Inspected OmniAI Orbital Command, CloudPulse Radar & distributed planetary systems.',
    icon: Trophy,
    badge: '+100 XP STARFLEET'
  },
  {
    threshold: 0.90,
    id: 'ach-4',
    title: 'Orbit 04 Reached: Deep-Space Comms',
    desc: 'Quantum Uplink established. Ready to broadcast collaboration signal or interview invitation!',
    icon: CheckCircle2,
    badge: '+150 XP QUANTUM LINK'
  }
];

export default function AchievementPopups() {
  const [activeToast, setActiveToast] = useState(null);
  const [unlockedIds, setUnlockedIds] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = window.scrollY / scrollHeight;

      for (const ach of ACHIEVEMENTS) {
        if (progress >= ach.threshold && !unlockedIds.has(ach.id)) {
          setUnlockedIds((prev) => new Set([...prev, ach.id]));
          setActiveToast(ach);
          sound.success();

          // Auto dismiss after 4.5 seconds
          setTimeout(() => {
            setActiveToast((curr) => (curr?.id === ach.id ? null : curr));
          }, 4500);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [unlockedIds]);

  return (
    <div className="fixed top-20 right-6 z-50 pointer-events-none max-w-sm">
      <AnimatePresence>
        {activeToast && (
          <motion.div
            key={activeToast.id}
            initial={{ opacity: 0, x: 80, scale: 0.9, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 60, scale: 0.9, filter: 'blur(8px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto p-4 rounded-2xl bg-[#0e1124]/95 backdrop-blur-xl border border-amber-500/50 shadow-2xl shadow-amber-950/40 relative overflow-hidden"
          >
            {/* Ambient gold glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-bold shrink-0 mt-0.5 shadow-md shadow-amber-500/30">
                <activeToast.icon className="w-5 h-5" />
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/40 font-bold">
                    {activeToast.badge}
                  </span>
                  <button
                    onClick={() => setActiveToast(null)}
                    className="text-slate-500 hover:text-white p-0.5 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                  {activeToast.title}
                </h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {activeToast.desc}
                </p>
              </div>
            </div>

            {/* Countdown animation progress bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4.5, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-cyan-400"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
