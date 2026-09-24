import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Volume2, VolumeX, ArrowUpRight, Sparkles, Search } from 'lucide-react';
import { sound } from '../utils/sound';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ onOpenTerminal, onOpenCommandPalette }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const state = sound.toggle();
    setSoundEnabled(state);
  };

  const navLinks = [
    { label: 'Mission', href: '#about' },
    { label: 'Avionics', href: '#skills' },
    { label: 'Flagships', href: '#projects' },
    { label: 'Flight Log', href: '#experience' },
    { label: 'Quantum Comms', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#08090e]/85 backdrop-blur-md border-b border-purple-900/30 py-3 shadow-lg shadow-black/40' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={() => sound.click()}
            onMouseEnter={() => sound.hover()}
            className="group flex items-center gap-3.5 cursor-pointer select-none"
          >
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0d0f18] rounded-[10px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 text-sm tracking-wider">
                {personalInfo.initials}
              </div>
            </div>
            <div className="flex flex-col justify-center text-left min-w-0">
              <span className="font-bold text-white text-base tracking-tight leading-tight group-hover:text-purple-300 transition-colors whitespace-nowrap block">
                {personalInfo.shortName}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-purple-300/90 whitespace-nowrap mt-0.5 uppercase">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ASTRONAUT &amp; ARCHITECT</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121524]/60 backdrop-blur-lg px-4 py-1.5 rounded-full border border-purple-900/40 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => sound.click()}
                  onMouseEnter={() => sound.hover()}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-sm shadow-purple-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Tools: Search, Sound, Terminal & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                sound.click();
                onOpenCommandPalette?.();
              }}
              onMouseEnter={() => sound.hover()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111424] hover:bg-[#1b1f36] border border-purple-900/40 text-slate-300 hover:text-white text-xs font-mono transition-all"
              title="Search and Quick Actions"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Search</span>
              <kbd className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800/40">
                ⌘K
              </kbd>
            </button>

            {/* Terminal Trigger */}
            <button
              onClick={() => {
                sound.click();
                onOpenTerminal();
              }}
              onMouseEnter={() => sound.hover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141829] hover:bg-[#1e233d] border border-purple-800/40 text-purple-300 text-xs font-mono transition-all hover:border-purple-500"
              title="Open Spacecraft Interactive Mission CLI"
            >
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>Mission CLI</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition-all ${
                soundEnabled 
                  ? 'border-cyan-500/50 text-cyan-400 bg-cyan-950/30' 
                  : 'border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-900/50'
              }`}
              title={soundEnabled ? "Mute interactive audio effects" : "Enable interactive sound effects"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              onClick={() => sound.click()}
              onMouseEnter={() => sound.hover()}
              className="relative group overflow-hidden px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="flex items-center gap-1.5">
                Quantum Uplink
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                sound.click();
                onOpenCommandPalette?.();
              }}
              className="p-2 rounded-lg bg-[#141829] border border-purple-800/40 text-cyan-300"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.click();
                onOpenTerminal();
              }}
              className="p-2 rounded-lg bg-[#141829] border border-purple-800/40 text-purple-300"
              title="Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.click();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#0e101d]/95 backdrop-blur-xl border border-purple-800/40 shadow-2xl flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.click();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-purple-900/30 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-purple-900/30 flex items-center justify-between">
              <button
                onClick={toggleSound}
                className="flex items-center gap-2 text-xs text-slate-400 py-1"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
                <span>Sound: {soundEnabled ? 'On' : 'Muted'}</span>
              </button>

              <a
                href="#contact"
                onClick={() => {
                  sound.click();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-purple-600 text-xs text-white font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
