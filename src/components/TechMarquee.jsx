import React from 'react';
import { 
  Atom, 
  Cpu, 
  Database, 
  Globe, 
  Server, 
  Terminal, 
  Zap, 
  Cloud, 
  Boxes, 
  Layers, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

const TECH_ITEMS = [
  { name: "React 19", icon: Atom, color: "#61dafb" },
  { name: "TypeScript", icon: Terminal, color: "#3178c6" },
  { name: "Next.js", icon: Globe, color: "#ffffff" },
  { name: "Python", icon: Terminal, color: "#eab308" },
  { name: "Node.js & Express", icon: Server, color: "#22c55e" },
  { name: "Tailwind CSS v4", icon: Layers, color: "#38bdf8" },
  { name: "PostgreSQL", icon: Database, color: "#336791" },
  { name: "Docker", icon: Boxes, color: "#0284c7" },
  { name: "Agentic AI / LLMs", icon: Sparkles, color: "#a855f7" },
  { name: "AWS Cloud", icon: Cloud, color: "#f59e0b" },
  { name: "Redis Caching", icon: Zap, color: "#ef4444" },
  { name: "FastAPI", icon: Cpu, color: "#10b981" },
  { name: "Microservices", icon: ShieldCheck, color: "#818cf8" }
];

export default function TechMarquee() {
  return (
    <div className="relative w-full py-8 overflow-hidden z-20 border-y border-purple-900/30 bg-[#090b14]/70 backdrop-blur-md">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#08090e] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#08090e] to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
        {[...TECH_ITEMS, ...TECH_ITEMS].map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#121526]/80 border border-purple-900/30 hover:border-purple-500/50 shadow-sm transition-all hover:scale-105 cursor-default select-none"
            >
              <Icon className="w-4 h-4" style={{ color: tech.color }} />
              <span className="text-xs font-mono font-medium text-slate-200 tracking-wide">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
