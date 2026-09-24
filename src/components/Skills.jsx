import React, { useState } from 'react';
import { 
  Atom, 
  FileCode, 
  Palette, 
  Globe, 
  Layers, 
  Boxes, 
  Server, 
  Terminal, 
  Network, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  Database, 
  HardDrive, 
  Zap, 
  Box, 
  Cloud, 
  GitBranch, 
  Sparkles, 
  Search, 
  Bot, 
  CheckCircle,
  Filter
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import TiltCard from './TiltCard';
import AnimatedSection from './AnimatedSection';

const ICON_MAP = {
  Atom,
  FileCode,
  Palette,
  Globe,
  Layers,
  Boxes,
  Server,
  Terminal,
  Network,
  Cpu,
  ShieldCheck,
  Code2,
  Database,
  HardDrive,
  Zap,
  Box,
  Cloud,
  GitBranch,
  Sparkles,
  Search,
  Bot,
  CheckCircle
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All Subsystems", ...skillsData.map((c) => c.category)];

  const filteredCategories = selectedCategory === "All Subsystems" || selectedCategory === "All"
    ? skillsData
    : skillsData.filter((c) => c.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-2">
            // Flight Mission // Chapter 02
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Avionics & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">Technical Propulsion</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Battle-tested flight instrumentation engineered for zero downtime, warp speed, and interplanetary scale.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.click();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => sound.hover()}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-[#121524] text-slate-300 hover:text-white hover:bg-[#1a1e33] border border-purple-900/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Categories Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((group, groupIdx) => (
            <AnimatedSection key={groupIdx} delay={groupIdx * 0.1} className="h-full">
              <TiltCard maxTilt={6} className="h-full">
                <div 
                  className="h-full p-7 rounded-3xl bg-[#0e101f]/80 border border-purple-900/30 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-purple-600/40 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        {group.category}
                      </h3>
                      <span className="text-xs font-mono text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-800/30">
                        {group.skills.length} skills
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                      {group.description}
                    </p>

                    {/* Skills Bars & Badges */}
                    <div className="space-y-4">
                      {group.skills.map((skill, sIdx) => {
                        const IconComponent = ICON_MAP[skill.icon] || Code2;
                        return (
                          <div 
                            key={sIdx}
                            onMouseEnter={() => sound.hover()}
                            className="group"
                          >
                            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                              <span className="flex items-center gap-2 text-slate-200 group-hover:text-cyan-300 transition-colors">
                                <span 
                                  className="p-1 rounded-md bg-[#161a2e] border border-purple-900/30 group-hover:scale-110 transition-transform"
                                  style={{ color: skill.color }}
                                >
                                  <IconComponent className="w-3.5 h-3.5" />
                                </span>
                                {skill.name}
                              </span>
                              <span className="font-mono text-slate-400 text-[11px]">
                                {skill.level}%
                              </span>
                            </div>

                            {/* Progress track */}
                            <div className="w-full h-2 rounded-full bg-[#151829] overflow-hidden p-[1px]">
                              <div 
                                className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-125"
                                style={{ 
                                  width: `${skill.level}%`,
                                  background: `linear-gradient(90deg, #7c3aed 0%, ${skill.color || '#38bdf8'} 100%)`
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom tag summary */}
                  <div className="mt-6 pt-4 border-t border-purple-900/20 flex flex-wrap gap-1.5">
                    {group.skills.map((s, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131628] text-slate-400 border border-slate-800"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>

                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Currently Specializing Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950/40 border border-purple-700/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 rounded-xl bg-purple-900/30 text-purple-300 border border-purple-700/40">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Current Deep-Dive Focus & Research</h4>
              <p className="text-xs text-slate-400">Agentic LLM Workflows, Distributed Realtime Systems (CRDTs), and WebGPU acceleration.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
              Always Evolving
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
