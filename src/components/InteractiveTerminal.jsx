import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { terminalCommands, personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function InteractiveTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to GuruShell v2.4.0-release [Selva Guru Karthikeyan P]' },
    { type: 'system', text: "Type 'help' to see available commands, or 'projects' to view showcase." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = inputVal.trim();
      sound.click();

      if (!trimmed) return;

      const newHistory = [...history, { type: 'user', text: trimmed }];
      setCommandHistory((prev) => [...prev, trimmed]);
      setCmdIndex(-1);

      const lower = trimmed.toLowerCase();

      if (lower === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      }

      if (lower === 'exit' || lower === 'quit') {
        onClose();
        setInputVal('');
        return;
      }

      if (lower === 'matrix') {
        sound.matrix();
        newHistory.push({
          type: 'matrix',
          text: "WAKE UP, NEO...\nTHE MATRIX HAS YOU...\nFOLLOW THE WHITE RABBIT 🐇\n[CYBERSTREAM SIMULATED]"
        });
      } else if (lower.startsWith('echo ')) {
        newHistory.push({ type: 'output', text: trimmed.substring(5) });
      } else if (lower === 'date') {
        newHistory.push({ type: 'output', text: new Date().toString() });
      } else if (terminalCommands[lower]) {
        const lines = terminalCommands[lower];
        if (Array.isArray(lines)) {
          lines.forEach((line) => newHistory.push({ type: 'output', text: line }));
        } else {
          newHistory.push({ type: 'output', text: lines });
        }
      } else {
        newHistory.push({
          type: 'error',
          text: `Command not found: "${trimmed}". Type 'help' to inspect supported commands.`
        });
      }

      setHistory(newHistory);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0) {
        const nextIndex = cmdIndex === -1 ? commandHistory.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (cmdIndex !== -1) {
        const nextIndex = cmdIndex + 1;
        if (nextIndex < commandHistory.length) {
          setCmdIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        } else {
          setCmdIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full rounded-2xl bg-[#090b14] border border-purple-600/50 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullScreen ? 'h-full max-w-full' : 'max-w-3xl h-[600px] max-h-[85vh]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111424] border-b border-purple-900/40 select-none">
          <div className="flex items-center gap-2">
            <span 
              onClick={onClose} 
              className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:opacity-80 cursor-pointer inline-block" 
              title="Close terminal" 
            />
            <span 
              onClick={() => setIsFullScreen(!isFullScreen)} 
              className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:opacity-80 cursor-pointer inline-block" 
              title="Toggle size" 
            />
            <span 
              onClick={() => setHistory([])} 
              className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:opacity-80 cursor-pointer inline-block" 
              title="Clear terminal" 
            />
            <span className="ml-3 text-xs font-mono text-purple-300 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>guru@archlinux:~ (GuruShell v2.4)</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1 hover:text-white transition-colors"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm text-left leading-relaxed space-y-2 bg-[#080911]">
          {history.map((item, idx) => {
            if (item.type === 'system') {
              return (
                <div key={idx} className="text-cyan-400/90 font-medium">
                  {item.text}
                </div>
              );
            }
            if (item.type === 'user') {
              return (
                <div key={idx} className="flex items-center gap-2 text-white">
                  <span className="text-purple-400 font-bold">sgk@terminal:~$</span>
                  <span>{item.text}</span>
                </div>
              );
            }
            if (item.type === 'matrix') {
              return (
                <div key={idx} className="text-emerald-400 font-bold whitespace-pre-line bg-black/60 p-3 rounded-lg border border-emerald-500/30">
                  {item.text}
                </div>
              );
            }
            if (item.type === 'error') {
              return (
                <div key={idx} className="text-rose-400">
                  {item.text}
                </div>
              );
            }
            return (
              <div key={idx} className="text-slate-300 whitespace-pre-wrap">
                {item.text}
              </div>
            );
          })}

          {/* Current prompt line */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-purple-400 font-bold shrink-0">sgk@terminal:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent text-white outline-none border-none font-mono text-xs sm:text-sm p-0 m-0 focus:ring-0"
              placeholder="type 'help' or command..."
              autoFocus
            />
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion bar */}
        <div className="px-4 py-2 bg-[#0d0f1c] border-t border-purple-900/30 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-slate-500 hidden sm:inline">Try:</span>
            {['help', 'about', 'skills', 'projects', 'sudo hire', 'matrix'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInputVal(cmd);
                  inputRef.current?.focus();
                }}
                className="px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-800/30 hover:bg-purple-900/50 hover:text-white transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          <span className="hidden sm:inline text-slate-500 text-[10px]">
            Press Enter ↵ to run
          </span>
        </div>

      </div>
    </div>
  );
}
