import React from 'react';
import { 
  Cpu, 
  Layers, 
  Zap, 
  GraduationCap, 
  MapPin, 
  Code, 
  CheckCircle2, 
  Compass, 
  Flame 
} from 'lucide-react';
import { personalInfo, educationData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import TiltCard from './TiltCard';
import AnimatedSection from './AnimatedSection';

export default function About() {
  const pillars = [
    {
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      title: "Interstellar Scalability",
      desc: "Constructing distributed backends, microservices, and databases built for high throughput and fault resilience."
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: "Cinematic Holographic UI",
      desc: "Delivering reactive interfaces with zero-gravity micro-animations, accessible markup, and rapid loading times."
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: "Deep-Space AI Propulsion",
      desc: "Integrating Large Language Models, agentic workflows, and real-time processing directly into client applications."
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      title: "Mission-Grade Reliability",
      desc: "Disciplined Git hygiene, continuous integration, comprehensive unit testing, and maintainable clean code."
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-mono mb-2">
            // Mission Orbit // Chapter 01
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Astronaut <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Profile & Avionics</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Flight telemetry, core engineering philosophy, and driving interstellar mission curiosity.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Bio card */}
          <AnimatedSection direction="right" className="lg:col-span-7 h-full">
            <TiltCard maxTilt={5} className="h-full">
              <div className="h-full flex flex-col justify-between p-8 rounded-3xl bg-[#0f1120]/80 border border-purple-900/30 backdrop-blur-xl shadow-xl shadow-black/30">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-purple-600/30">
                      {personalInfo.initials}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {personalInfo.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{personalInfo.location}</span>
                        <span className="text-purple-400">•</span>
                        <span>{personalInfo.timezone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                    {personalInfo.bio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Quick badges */}
                <div className="mt-8 pt-6 border-t border-purple-900/30 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-800/40">
                    #FullStackEngineering
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                    #CloudNative
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                    #GenerativeAI
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                    #CleanArchitecture
                  </span>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

          {/* Right: Pillars & Education */}
          <AnimatedSection direction="left" delay={0.2} className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((item, idx) => (
                <TiltCard key={idx} maxTilt={8}>
                  <div 
                    onMouseEnter={() => sound.hover()}
                    className="h-full p-5 rounded-2xl bg-[#0f111f]/60 border border-purple-900/20 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <div className="mb-3 p-2.5 rounded-xl bg-[#141829] w-fit border border-purple-900/40">
                      {item.icon}
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-1.5">{item.title}</h4>
                    <p className="text-slate-400 text-xs leading-normal">{item.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>

            {/* Education Card */}
            {educationData.map((edu, idx) => (
              <TiltCard key={idx} maxTilt={5}>
                <div 
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#121526]/90 to-[#0e101d]/90 border border-indigo-900/30 shadow-lg relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                        {edu.period} • {edu.grade}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-indigo-200/80 mb-2">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {edu.details}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}

          </AnimatedSection>

        </div>

      </div>
    </section>
  );
}
