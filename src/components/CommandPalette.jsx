import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Terminal, 
  FileText, 
  Mail, 
  FolderGit2, 
  Sparkles, 
  ExternalLink, 
  Volume2, 
  X, 
  ArrowRight,
  Code,
  User,
  Layers,
  Award
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function CommandPalette({ 
  isOpen, 
  onClose, 
  onOpenTerminal, 
  onOpenResume 
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'projects',
      title: 'Explore Featured Projects',
      subtitle: 'View full-stack, AI, and systems engineering showcase',
      icon: FolderGit2,
      category: 'Navigation',
      perform: () => {
        const el = document.getElementById('projects');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'terminal',
      title: 'Launch GuruShell Terminal',
      subtitle: 'Open the interactive CLI developer terminal',
      icon: Terminal,
      category: 'Interactive',
      perform: onOpenTerminal
    },
    {
      id: 'resume',
      title: 'View / Print Resume (CV)',
      subtitle: 'Open formatted professional resume modal',
      icon: FileText,
      category: 'Documentation',
      perform: onOpenResume
    },
    {
      id: 'skills',
      title: 'Inspect Technical Mastery',
      subtitle: 'Frontend, Backend, Cloud & AI proficiencies',
      icon: Layers,
      category: 'Navigation',
      perform: () => {
        const el = document.getElementById('skills');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'about',
      title: 'About Selva Guru Karthikeyan P',
      subtitle: 'Engineering philosophy, background, and education',
      icon: User,
      category: 'Navigation',
      perform: () => {
        const el = document.getElementById('about');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'experience',
      title: 'View Career & Milestones',
      subtitle: 'Work experience, certifications, and hackathons',
      icon: Award,
      category: 'Navigation',
      perform: () => {
        const el = document.getElementById('experience');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'contact',
      title: 'Send a Message / Email',
      subtitle: 'Direct email or dispatch contact message',
      icon: Mail,
      category: 'Contact',
      perform: () => {
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/SelvaGuruKarthikeyan',
      icon: ExternalLink,
      category: 'External',
      perform: () => window.open(personalInfo.github, '_blank')
    },
    {
      id: 'linkedin',
      title: 'Connect on LinkedIn',
      subtitle: 'linkedin.com/in/selva-guru-karthikeyan-p',
      icon: ExternalLink,
      category: 'External',
      perform: () => window.open(personalInfo.linkedin, '_blank')
    }
  ];

  const filtered = actions.filter((act) => 
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          sound.click();
          window.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (act) => {
    sound.click();
    act.perform();
    onClose();
    setQuery('');
  };

  const handleKeyNav = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-2xl bg-[#0c0e1a] border border-purple-500/40 shadow-2xl shadow-purple-950/50 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-purple-900/30 bg-[#121526]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNav}
            placeholder="Type a command or jump to section... (e.g. projects, resume, contact)"
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-500 font-medium"
            autoFocus
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-800/40">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-mono">
              No matching actions found for "{query}".
            </div>
          ) : (
            filtered.map((act, idx) => {
              const Icon = act.icon;
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={act.id}
                  onClick={() => handleSelect(act)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-600/40 text-white' 
                      : 'hover:bg-purple-950/30 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-600 text-white' : 'bg-[#15192c] text-purple-300'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                        <span>{act.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-900/40 text-purple-300 border border-purple-800/30">
                          {act.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {act.subtitle}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mr-1 animate-pulse" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-[#090b14] border-t border-purple-900/30 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span className="text-purple-400">Command Palette</span>
        </div>
      </div>
    </div>
  );
}
