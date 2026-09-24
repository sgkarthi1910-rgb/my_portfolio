import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import BentoGrid from './components/BentoGrid';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ExperienceTimeline from './components/ExperienceTimeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import InteractiveTerminal from './components/InteractiveTerminal';
import ResumeModal from './components/ResumeModal';
import CommandPalette from './components/CommandPalette';
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import ScrollInformationHUD from './components/ScrollInformationHUD';
import AchievementPopups from './components/AchievementPopups';
import ScrollSpyNav from './components/ScrollSpyNav';
import './App.css';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleOpenPalette = () => setCommandPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenPalette);
    return () => window.removeEventListener('open-command-palette', handleOpenPalette);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#010206] text-slate-100 selection:bg-purple-600 selection:text-white overflow-x-hidden">
      {/* Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      {/* Cybernetic Smooth Following Cursor */}
      <CustomCursor />

      {/* Photorealistic Astronomical Canvas & Astrometry Engine */}
      <ParticleBackground />

      {/* Vertical Scroll-Spy Rail with Horizontal Info Pop-Ups */}
      <ScrollSpyNav />

      {/* Real-time Dynamic Section Context HUD (Bottom-Left Pop-Up) */}
      <ScrollInformationHUD />

      {/* Scroll Milestone & Achievement Unlocked Toasts (Top-Right Pop-Up) */}
      <AchievementPopups />

      {/* Glassmorphic Navigation with Command Palette Trigger */}
      <Navbar 
        onOpenTerminal={() => setTerminalOpen(true)} 
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Portfolio Content */}
      <main className="relative z-10">
        <Hero 
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResumeModal={() => setResumeOpen(true)}
        />
        
        {/* Infinite Tech Marquee Strip */}
        <TechMarquee />

        <About />

        {/* High-Tech Bento Grid Cockpit */}
        <BentoGrid />

        <Skills />
        <Projects />
        <ExperienceTimeline />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Command Palette (Ctrl+K) */}
      <CommandPalette 
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => {
          setCommandPaletteOpen(false);
          setTerminalOpen(true);
        }}
        onOpenResume={() => {
          setCommandPaletteOpen(false);
          setResumeOpen(true);
        }}
      />

      {/* Interactive Terminal Emulator */}
      <InteractiveTerminal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
      />

      {/* Full Resume / CV Modal */}
      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />
    </div>
  );
}
