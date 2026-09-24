// Native Web Audio API Synthesizer for high-tech micro-interactions
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.playBeep(520, 0.08, 'sine');
    }
    return this.enabled;
  }

  playBeep(freq = 440, duration = 0.05, type = 'sine') {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  hover() {
    this.playBeep(320, 0.03, 'sine');
  }

  click() {
    this.playBeep(640, 0.06, 'triangle');
  }

  success() {
    if (!this.enabled) return;
    this.playBeep(523.25, 0.08, 'sine');
    setTimeout(() => this.playBeep(659.25, 0.08, 'sine'), 80);
    setTimeout(() => this.playBeep(783.99, 0.12, 'sine'), 160);
  }

  matrix() {
    if (!this.enabled) return;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.playBeep(200 + Math.random() * 600, 0.03, 'sawtooth');
      }, i * 50);
    }
  }
}

export const sound = new SoundFX();
