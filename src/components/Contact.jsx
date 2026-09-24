import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';
import TiltCard from './TiltCard';
import AnimatedSection from './AnimatedSection';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.click();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      sound.success();

      // Trigger celebratory confetti 🎉
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // Fallback
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 900);
  };

  const handleCopyEmail = () => {
    sound.click();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-mono mb-2">
            // Ground-To-Orbit Comms // Chapter 05
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Deep-Space <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Quantum Uplink</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Have an interplanetary venture, high-velocity engineering role, or technical collaboration in mind? Broadcast your encrypted transmission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Direct Info Cards */}
          <AnimatedSection direction="right" className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              {/* Direct Email Card with One-Click Copy */}
              <TiltCard maxTilt={6}>
                <div className="p-6 rounded-2xl bg-[#0e101f]/90 border border-purple-900/30 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300">
                        <Mail className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                          Direct Email Address
                        </span>
                        <a 
                          href={`mailto:${personalInfo.email}`} 
                          className="text-white font-semibold text-sm hover:text-cyan-300 transition-colors"
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyEmail}
                      className="p-2.5 rounded-xl bg-[#15182c] hover:bg-purple-900/40 text-slate-300 hover:text-white border border-purple-900/40 transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Feel free to send proposals, meeting links, or job opportunities directly.
                  </p>
                </div>
              </TiltCard>

              {/* Location & Timezone */}
              <TiltCard maxTilt={6}>
                <div className="p-6 rounded-2xl bg-[#0e101f]/90 border border-purple-900/30 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Location & Time Zone
                      </span>
                      <span className="text-white font-semibold text-sm">
                        {personalInfo.location} • {personalInfo.timezone}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono mt-3 pt-3 border-t border-purple-900/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                    <span>Available for remote & hybrid collaboration worldwide</span>
                  </div>
                </div>
              </TiltCard>

              {/* Fast Response Guarantee */}
              <TiltCard maxTilt={6}>
                <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900/40 border border-purple-800/30 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Response Time: &lt; 24 Hours</span>
                  </div>
                  <p className="text-slate-400">
                    I check inquiries daily and prioritize thoughtful discussions on software development, hiring, and system architecture.
                  </p>
                </div>
              </TiltCard>
            </div>

            {/* Quick Links */}
            <div className="p-5 rounded-2xl bg-[#0a0c16] border border-purple-900/20 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Professional Profiles:</span>
              <div className="flex items-center gap-3">
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-purple-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  LinkedIn <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-600">•</span>
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-purple-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </AnimatedSection>

          {/* Right Column: Contact Message Form */}
          <AnimatedSection direction="left" delay={0.2} className="lg:col-span-7 h-full">
            <TiltCard maxTilt={4} className="h-full">
              <div className="h-full p-8 rounded-3xl bg-[#0e1020]/90 border border-purple-900/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>DIRECT DISPATCH FORM</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Send a Message
                  </h3>

              {status === 'success' ? (
                <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3 animate-fadeIn my-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Dispatched Successfully!</h4>
                  <p className="text-xs text-emerald-300 max-w-md mx-auto">
                    Thank you for reaching out. Selva Guru Karthikeyan P will receive this transmission and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#14172a] border border-purple-900/40 focus:border-cyan-400 focus:outline-none text-white text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#14172a] border border-purple-900/40 focus:border-cyan-400 focus:outline-none text-white text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry / Job Opportunity / Collaboration"
                      className="w-full px-4 py-3 rounded-xl bg-[#14172a] border border-purple-900/40 focus:border-cyan-400 focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Hi Selva, I loved your portfolio and would like to talk about..."
                      className="w-full px-4 py-3 rounded-xl bg-[#14172a] border border-purple-900/40 focus:border-cyan-400 focus:outline-none text-white text-sm transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Transmitting via Quantum Relay...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>Broadcast Quantum Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-purple-900/20 text-center text-[11px] text-slate-500 font-mono">
              Direct and confidential communication channel.
            </div>
          </div>
        </TiltCard>
      </AnimatedSection>

    </div>

      </div>
    </section>
  );
}
