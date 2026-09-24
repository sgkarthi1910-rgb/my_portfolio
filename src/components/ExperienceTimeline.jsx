import React from 'react';
import { 
  Briefcase, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Trophy, 
  Cloud, 
  Terminal, 
  ArrowUpRight 
} from 'lucide-react';
import { experienceData, certificationsData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import TiltCard from './TiltCard';
import AnimatedSection from './AnimatedSection';

const CERT_ICONS = {
  Award,
  Cloud,
  Terminal,
  Trophy
};

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-2">
            // Flight Mission // Chapter 04
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Flight Log & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Orbital Milestones</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Aerospace mission trajectory, engineering flight leadership, flight certifications, and space hackathon honors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Professional Timeline */}
          <div className="lg:col-span-7">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-400" />
              Mission Flight Telemetry & Industry Experience
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-900/40 space-y-10">
              {experienceData.map((exp, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.15}>
                  <div 
                    className="relative group text-left"
                    onMouseEnter={() => sound.hover()}
                  >
                    {/* Glowing Node */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border-4 border-[#08090e] group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-md shadow-purple-600/50" />

                    <TiltCard maxTilt={5}>
                      <div className="p-6 rounded-2xl bg-[#0f1222]/80 border border-purple-900/30 group-hover:border-purple-600/40 backdrop-blur-md transition-all">
                        
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-950/60 text-purple-300 border border-purple-800/40">
                            {exp.period}
                          </span>
                          <span className="text-xs font-mono text-cyan-400">
                            {exp.type}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-white mt-1">
                          {exp.role}
                        </h4>

                        <div className="text-sm font-medium text-purple-300 mb-3">
                          {exp.organization}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        <div className="space-y-2">
                          {exp.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>

                      </div>
                    </TiltCard>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Right: Certifications & Recognitions */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              Flight Accreditations & Honors
            </h3>

            <div className="space-y-4">
              {certificationsData.map((cert, idx) => {
                const IconComp = CERT_ICONS[cert.icon] || Award;
                return (
                  <AnimatedSection key={idx} delay={idx * 0.1}>
                    <TiltCard maxTilt={6}>
                      <div 
                        onMouseEnter={() => sound.hover()}
                        className="p-5 rounded-2xl bg-[#0e101e]/80 border border-purple-900/30 hover:border-cyan-500/40 transition-all duration-300 flex items-start gap-4 text-left group"
                      >
                        <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/30 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
                          <IconComp className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                            <span>{cert.date}</span>
                            <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                              {cert.badge}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {cert.title}
                          </h4>

                          <p className="text-xs text-slate-400 mt-0.5">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                    </TiltCard>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Engineering Ethics Card */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 to-cyan-950/30 border border-purple-800/30 text-left">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                Engineering Creed
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Writing software is not just about making things function—it is about architectural clarity, future extensibility, resilience under duress, and leaving the codebase cleaner than you found it."
              </p>
              <div className="mt-3 text-[11px] font-mono text-cyan-400">
                — Selva Guru Karthikeyan P
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
