import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

const SECTIONS = [
  { id: 'hero', label: 'Launchpad', preview: 'Orbit 01 • Selva Guru Karthikeyan P • Cosmic Systems Architect' },
  { id: 'about', label: 'Avionics', preview: 'Orbit 02 • Astronaut Profile, Core Avionics & Education' },
  { id: 'skills', label: 'Propulsion', preview: 'Orbit 03 • 20+ Mastered Flight & Propulsion Subsystems' },
  { id: 'projects', label: 'Flagships', preview: 'Orbit 04 • Starfleet & Autonomous Orbital Missions' },
  { id: 'experience', label: 'Flight Log', preview: 'Orbit 05 • Aerospace Milestones & Accreditations' },
  { id: 'contact', label: 'Quantum Comms', preview: 'Orbit 06 • Deep-Space Encrypted Signal Gateway' }
];

export default function ScrollSpyNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    sound.click();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 pointer-events-auto">
      {/* Background Rail */}
      <div className="absolute top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-purple-600/40 to-transparent -z-10" />

      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredSection === sec.id;

        return (
          <div
            key={sec.id}
            className="relative flex items-center justify-center group"
            onMouseEnter={() => {
              sound.hover();
              setHoveredSection(sec.id);
            }}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Pop-Up Information Tooltip on Left */}
            <AnimatePresence>
              {(isHovered || (isActive && hoveredSection === null)) && (
                <motion.div
                  initial={{ opacity: 0, x: 15, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 15, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-7 pointer-events-none whitespace-nowrap"
                >
                  <div className="px-3 py-1.5 rounded-xl bg-[#0d1020]/95 backdrop-blur-xl border border-purple-500/40 shadow-xl shadow-black/50 text-left">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>{sec.label}</span>
                    </div>
                    {isHovered && (
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 max-w-[200px] truncate">
                        {sec.preview}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing Dot Node */}
            <button
              onClick={() => scrollTo(sec.id)}
              className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
                isActive
                  ? 'w-4 h-4 bg-gradient-to-tr from-purple-500 to-cyan-400 shadow-[0_0_12px_#38bdf8] scale-110'
                  : 'w-2.5 h-2.5 bg-slate-700 hover:bg-purple-400 hover:scale-125'
              }`}
              title={sec.label}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
