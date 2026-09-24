import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  FolderGit2, 
  Award, 
  Mail, 
  Activity, 
  X,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/sound';

const SECTION_INSIGHTS = {
  hero: {
    title: "Cosmic Identity",
    tag: "ORBITAL STATUS: NOMINAL",
    text: "Selva Guru Karthikeyan P • Deep Space Systems Architect & Full-Stack Astronaut.",
    icon: Sparkles,
    color: "from-purple-500 to-indigo-500",
    border: "border-purple-500/40"
  },
  about: {
    title: "Astronaut Profile & Avionics",
    tag: "FLIGHT CREW DATA",
    text: "Architecting for interstellar scale, zero-defect gravity, and sub-100ms warp latency.",
    icon: Cpu,
    color: "from-cyan-500 to-blue-500",
    border: "border-cyan-500/40"
  },
  skills: {
    title: "Technical Propulsion Systems",
    tag: "20+ SUBSYSTEMS ARMED",
    text: "Battle-tested with React 19, TypeScript, Python, FastAPI, Docker, and AWS Orbital Cloud.",
    icon: Layers,
    color: "from-pink-500 to-purple-500",
    border: "border-pink-500/40"
  },
  projects: {
    title: "Starfleet & Orbital Missions",
    tag: "FLIGHT CONFIRMED",
    text: "Autonomous multi-agent AI, spacecraft telemetry monitors, and distributed DeFi platforms.",
    icon: FolderGit2,
    color: "from-emerald-500 to-cyan-500",
    border: "border-emerald-500/40"
  },
  experience: {
    title: "Flight Log & Milestones",
    tag: "FLIGHT CERTIFIED",
    text: "Meta & AWS certified • State Hackathon winner • Stellar engineering leadership.",
    icon: Award,
    color: "from-amber-500 to-orange-500",
    border: "border-amber-500/40"
  },
  contact: {
    title: "Deep-Space Quantum Uplink",
    tag: "COMMS LINK OPEN",
    text: "Transmission latency under 24 hrs. Receiving encrypted signals for mission engineering.",
    icon: Mail,
    color: "from-purple-500 to-cyan-500",
    border: "border-purple-500/40"
  }
};

export default function ScrollInformationHUD() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            if (currentSection !== sectionId) {
              setCurrentSection(sectionId);
              sound.hover();
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  if (dismissed) return null;

  const currentInsight = SECTION_INSIGHTS[currentSection] || SECTION_INSIGHTS.hero;
  const Icon = currentInsight.icon;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm hidden sm:block pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, scale: 0.9, filter: 'blur(6px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto p-4 rounded-2xl bg-[#090b16]/90 backdrop-blur-xl border ${currentInsight.border} shadow-2xl shadow-black/60 relative overflow-hidden`}
        >
          {/* Ambient corner glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent pointer-events-none" />

          <div className="flex items-start gap-3">
            {/* Holographic Glowing Icon Badge */}
            <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${currentInsight.color} text-white shadow-lg shrink-0 mt-0.5`}>
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 pr-3">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  {currentInsight.tag}
                </span>
                <span className="text-purple-400 text-[10px]">•</span>
                <span className="text-xs font-bold text-white">
                  {currentInsight.title}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {currentInsight.text}
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => {
                sound.click();
                setDismissed(true);
              }}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors cursor-pointer shrink-0"
              title="Dismiss HUD"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Action Link */}
          <div className="mt-2.5 pt-2 border-t border-purple-900/30 flex items-center justify-between text-[11px] font-mono text-purple-300">
            <span className="text-slate-400">Section telemetry:</span>
            <span className="text-cyan-400 flex items-center gap-1 font-semibold uppercase">
              #{currentSection}
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
