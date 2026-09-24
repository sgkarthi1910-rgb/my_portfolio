import React, { useState } from 'react';
import { 
  ExternalLink, 
  Layers, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { GithubIcon } from './Icons';
import TiltCard from './TiltCard';
import AnimatedSection from './AnimatedSection';
import { projectsData } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All Missions");
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ["All Missions", "Autonomous Deep-Space AI", "Mission Infrastructure", "Web Platforms"];

  const filteredProjects = selectedCategory === "All Missions" || selectedCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleOpenModal = (project) => {
    sound.click();
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    sound.click();
    setActiveModalProject(null);
  };

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-mono mb-2">
            // Flight Mission // Chapter 03
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Starfleet & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Orbital Flagships</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Deep-space mission systems, autonomous AI workstations, and high-concurrency planetary software deployed by Selva Guru Karthikeyan P.
          </p>
        </div>

        {/* Filter Pills */}
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
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-[#121524] text-slate-300 hover:text-white hover:bg-[#1a1e33] border border-purple-900/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <AnimatedSection key={project.id} delay={idx * 0.08} className="h-full">
              <TiltCard maxTilt={8} className="h-full">
                <div
                  className="group h-full rounded-3xl bg-[#0e101f]/90 border border-purple-900/30 overflow-hidden shadow-xl hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image & Overlay Header */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e101f] via-[#0e101f]/40 to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-950/80 text-purple-300 border border-purple-700/50 backdrop-blur-md shadow-md flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          {project.badge}
                        </span>
                      </div>

                      {/* Quick Expand Button */}
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 hover:bg-purple-600/80 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-md"
                        title="View Full Architecture"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                        <span>{project.category}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Impact Metric Box */}
                      <div className="p-2.5 rounded-xl bg-[#14182a] border border-purple-900/30 text-xs font-mono text-emerald-400 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span className="truncate">{project.metrics}</span>
                      </div>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.technologies.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-purple-950/40 text-purple-200 border border-purple-800/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800/50 text-slate-400">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-6 pt-0 border-t border-purple-900/20 mt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleOpenModal(project)}
                      onMouseEnter={() => sound.hover()}
                      className="text-xs font-semibold text-purple-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      Architecture & Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.click()}
                        className="p-2 rounded-lg bg-[#14182b] hover:bg-purple-900/40 text-slate-300 hover:text-white border border-purple-900/30 transition-all"
                        title="View Source on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.click()}
                        className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-md shadow-purple-600/20"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Modal for Deep-Dive Architecture Inspection */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div 
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0e1a] border border-purple-700/50 p-6 sm:p-8 shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {activeModalProject.title}
                </h3>
              </div>

              {/* Image Preview */}
              <div className="my-5 rounded-2xl overflow-hidden border border-purple-900/40 max-h-56">
                <img 
                  src={activeModalProject.image} 
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Full Description */}
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed mb-6">
                <p>{activeModalProject.fullDescription}</p>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider font-mono text-purple-300 mb-3 font-semibold">
                  Key Engineering Highlights:
                </h4>
                <div className="space-y-2">
                  {activeModalProject.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Full */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider font-mono text-purple-300 mb-2 font-semibold">
                  Technologies Employed:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-950/60 text-purple-200 border border-purple-800/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between gap-4">
                <div className="text-xs font-mono text-emerald-400">
                  ⚡ Metric: {activeModalProject.metrics}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#14182c] border border-purple-900/40 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                  <a
                    href={activeModalProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/30"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Simulation</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
