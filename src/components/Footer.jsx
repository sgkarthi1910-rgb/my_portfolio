import React from 'react';
import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-purple-900/30 bg-[#06070c] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1.5px]">
              <div className="w-full h-full bg-[#0d0f18] rounded-[10px] flex items-center justify-center font-bold text-white text-sm">
                {personalInfo.initials}
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-white text-base">
                {personalInfo.name}
              </h3>
              <p className="text-xs text-purple-400 font-mono">
                {personalInfo.title}
              </p>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#about" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">Mission</a>
            <a href="#skills" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">Avionics</a>
            <a href="#projects" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">Flagships</a>
            <a href="#experience" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">Flight Log</a>
            <a href="#contact" onClick={() => sound.click()} className="hover:text-cyan-300 transition-colors">Quantum Comms</a>
          </div>

          {/* Socials & Scroll to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.click()}
              className="p-2.5 rounded-lg bg-[#111424] text-slate-400 hover:text-white hover:bg-purple-900/40 border border-purple-900/30 transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.click()}
              className="p-2.5 rounded-lg bg-[#111424] text-slate-400 hover:text-white hover:bg-cyan-900/40 border border-purple-900/30 transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.twitter}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.click()}
              className="p-2.5 rounded-lg bg-[#111424] text-slate-400 hover:text-white hover:bg-sky-900/40 border border-purple-900/30 transition-all"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={() => sound.click()}
              className="p-2.5 rounded-lg bg-[#111424] text-slate-400 hover:text-white hover:bg-pink-900/40 border border-purple-900/30 transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-110 transition-all shadow-md shadow-purple-600/30 cursor-pointer"
              title="Return to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-900/20 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Cosmic Flight Telemetry • Operating in Synchronized Galactic Time (IST)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
