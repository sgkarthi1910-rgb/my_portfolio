import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Mail, 
  MapPin, 
  Globe 
} from 'lucide-react';
import { personalInfo, skillsData, experienceData, educationData, certificationsData } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.click();
    window.print();
  };

  const handleCopyText = () => {
    sound.click();
    const resumeText = `
${personalInfo.name}
${personalInfo.title}
Email: ${personalInfo.email} | Location: ${personalInfo.location}
GitHub: ${personalInfo.github} | LinkedIn: ${personalInfo.linkedin}

PROFILE SUMMARY:
${personalInfo.bio.join('\n')}

TECHNICAL SKILLS:
${skillsData.map((s) => `${s.category}: ${s.skills.map((item) => item.name).join(', ')}`).join('\n')}

EXPERIENCE:
${experienceData.map((e) => `${e.role} - ${e.organization} (${e.period})\n${e.bullets.map((b) => `• ${b}`).join('\n')}`).join('\n\n')}

EDUCATION:
${educationData.map((ed) => `${ed.degree} - ${ed.institution} (${ed.period}) - ${ed.grade}`).join('\n')}

CERTIFICATIONS:
${certificationsData.map((c) => `• ${c.title} (${c.issuer}, ${c.date})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-[#0c0e1a] border border-purple-600/40 shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#111424] border-b border-purple-900/30">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Curriculum Vitae • {personalInfo.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-[#191d33] hover:bg-purple-900/40 text-slate-300 hover:text-white border border-purple-900/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Copy formatted resume text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/30 hover:brightness-110 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Paper */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#090b14] text-slate-200">
          
          {/* Header */}
          <div className="border-b border-purple-900/40 pb-6">
            <h1 className="text-3xl font-extrabold text-white mb-1">
              {personalInfo.name}
            </h1>
            <p className="text-purple-400 font-semibold text-base mb-3 font-mono">
              {personalInfo.title}
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {personalInfo.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                {personalInfo.github}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {personalInfo.bio.join(' ')}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-3">
              Technical Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skillsData.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#121526] border border-purple-900/30">
                  <span className="font-bold text-white block mb-1">{cat.category}:</span>
                  <span className="text-slate-300 font-mono leading-relaxed">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-4">
              Work & Engineering Experience
            </h2>
            <div className="space-y-5">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-white">
                    <span>{exp.role} — <span className="text-purple-300">{exp.organization}</span></span>
                    <span className="font-mono text-xs text-slate-400">{exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-400">{exp.description}</p>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-3">
              Education
            </h2>
            {educationData.map((ed, idx) => (
              <div key={idx} className="text-xs sm:text-sm">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>{ed.degree}</span>
                  <span className="font-mono text-xs text-slate-400">{ed.period}</span>
                </div>
                <div className="text-xs text-purple-300">{ed.institution} • {ed.grade}</div>
                <p className="text-xs text-slate-400 mt-1">{ed.details}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-3">
              Certifications & Honors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certificationsData.map((c, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#111424] border border-purple-900/20 flex items-center justify-between">
                  <span className="font-medium text-slate-200">{c.title}</span>
                  <span className="text-[11px] font-mono text-purple-300">{c.issuer}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
