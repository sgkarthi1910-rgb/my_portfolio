import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  GitCommit, 
  Activity, 
  Headphones, 
  Sparkles, 
  Compass, 
  Code, 
  Radio, 
  Check, 
  Zap, 
  Terminal,
  Cpu
} from 'lucide-react';
import TiltCard from './TiltCard';
import AnimatedSection from './AnimatedSection';
import { sound } from '../utils/sound';

export default function BentoGrid() {
  const [timeStr, setTimeStr] = useState('');
  const [audioPlaying, setAudioPlaying] = useState(true);
  const [activeCell, setActiveCell] = useState(null);

  // Live ticking IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in IST
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setTimeStr(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate simulated 20-week commit matrix
  const weeks = 22;
  const daysPerWeek = 7;
  const commitLevels = [
    'bg-[#121626]', // 0
    'bg-purple-900/60', // 1
    'bg-purple-600/70', // 2
    'bg-cyan-500/80',   // 3
    'bg-emerald-400'    // 4
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Mini Header */}
        <AnimatedSection>
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-2">
              // Telemetry & Presence
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Cockpit</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl">
              Real-time telemetry, commit rhythm, local time in India, and live development vibe.
            </p>
          </div>
        </AnimatedSection>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Item 1: Live IST Clock & Working Status (5 cols) */}
          <AnimatedSection direction="up" delay={0.1} className="md:col-span-5 h-full">
            <TiltCard maxTilt={6} className="h-full">
              <div className="h-full p-6 rounded-3xl bg-[#0c0e1c]/90 border border-purple-900/30 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-purple-600/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>LIVE SYSTEM CLOCK</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      ONLINE
                    </span>
                  </div>

                  <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-tight mb-2">
                    {timeStr || '21:30:00'} <span className="text-sm font-normal text-purple-400">IST</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    Asia/Kolkata (UTC +5:30) • Tamil Nadu, India
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-900/20 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Working Hours:</span>
                  <span className="text-emerald-400 font-semibold">Active & Available</span>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

          {/* Bento Item 2: Focus Frequency / Waveform Audio Card (7 cols) */}
          <AnimatedSection direction="up" delay={0.2} className="md:col-span-7 h-full">
            <TiltCard maxTilt={6} className="h-full">
              <div className="h-full p-6 rounded-3xl bg-[#0c0e1c]/90 border border-purple-900/30 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-purple-600/40 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-2 text-xs font-mono text-purple-300">
                    <Radio className="w-4 h-4 text-purple-400" />
                    <span>CODING FREQUENCY & VIBE</span>
                  </span>
                  <button
                    onClick={() => {
                      sound.click();
                      setAudioPlaying(!audioPlaying);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-800/30 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Headphones className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{audioPlaying ? 'Pulse Active' : 'Paused'}</span>
                  </button>
                </div>

                <div className="my-2">
                  <div className="text-lg font-bold text-white mb-1">
                    Synthwave & Distributed Architecture Deep Work
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    High-focus cognitive state: designing low-latency REST APIs, concurrent reactive pipelines, and fluid UI systems.
                  </p>
                </div>

                {/* Animated Audio Equalizer Waveform */}
                <div className="mt-4 pt-4 border-t border-purple-900/20 flex items-end gap-1.5 h-12">
                  {[24, 40, 16, 32, 48, 20, 36, 44, 28, 18, 38, 46, 22, 34, 42, 16, 30, 48, 26, 38, 20, 44, 32, 18].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full bg-gradient-to-t from-purple-600 to-cyan-400 transition-all duration-300"
                      style={{
                        height: audioPlaying ? `${Math.max(6, (h + (i % 3) * 6))}%` : '8px',
                        opacity: audioPlaying ? 0.9 : 0.3
                      }}
                    />
                  ))}
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

          {/* Bento Item 3: GitHub Activity Commit Heatmap Simulator (8 cols) */}
          <AnimatedSection direction="up" delay={0.3} className="md:col-span-8 h-full">
            <TiltCard maxTilt={5} className="h-full">
              <div className="h-full p-6 rounded-3xl bg-[#0c0e1c]/90 border border-purple-900/30 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-purple-600/40 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <GitCommit className="w-4 h-4 text-emerald-400" />
                    <span>GITHUB COMMIT RHYTHM</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    650+ Commits this Year
                  </span>
                </div>

                {/* Commit Matrix Grid */}
                <div className="my-2 overflow-x-auto py-2">
                  <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
                    {Array.from({ length: weeks * daysPerWeek }).map((_, idx) => {
                      const level = (idx % 7 === 0 || idx % 5 === 0) 
                        ? (idx % 4) + 1 
                        : (idx % 3 === 0 ? 2 : (idx % 2 === 0 ? 1 : 0));
                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => {
                            sound.hover();
                            setActiveCell(idx);
                          }}
                          onMouseLeave={() => setActiveCell(null)}
                          className={`w-3.5 h-3.5 rounded-[3px] ${commitLevels[level]} hover:scale-125 transition-transform cursor-pointer shadow-sm`}
                          title={`Day ${idx + 1}: ${level * 3} contributions`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-900/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    {commitLevels.map((c, i) => (
                      <span key={i} className={`w-2.5 h-2.5 rounded-[2px] ${c}`} />
                    ))}
                  </div>
                  <span>More Activity</span>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

          {/* Bento Item 4: Architectural Creed & Reliability (4 cols) */}
          <AnimatedSection direction="up" delay={0.4} className="md:col-span-4 h-full">
            <TiltCard maxTilt={6} className="h-full">
              <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-[#12162a]/90 to-[#0a0c16]/90 border border-purple-900/30 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-cyan-500/40 transition-all text-left">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>SYSTEM INTEGRITY</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">
                    Zero-Regression Mindset
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prioritizing rigorous modular boundaries, strict TypeScript typings, automatic CI/CD verification, and sub-100ms API response budgets.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-900/20 flex items-center justify-between">
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Unit & E2E Tested</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">v2.4.0</span>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

        </div>

      </div>
    </section>
  );
}
