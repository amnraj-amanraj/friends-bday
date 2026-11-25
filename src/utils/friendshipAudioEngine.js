/**
 * Unified Audio Engine for DHruv.exe Birthday Website
 * Manages background soundtrack ("Tera Yaar Hoon Main"), timeline synchronization,
 * Web Audio synthesizers, chime effects, and sound control.
 */

class UnifiedAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.audioElement = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.75;
    this.currentTime = 0;
    this.duration = 68; // 68s soundtrack loop (matches audio length)
    this.listeners = new Set();
    this.synthLoopId = null;
    this.isUsingSynth = false;

    // Available audio sources in priority order
    this.sources = [
      '/audio/tera-yaar-hoon-main.wav',
      '/audio/tera-yaar-hoon-main.mp3',
      '/audio/friendship-song.mp3',
      '/audio/birthday.mp3'
    ];
    this.currentSourceIdx = 0;
  }

  init() {
    // 1. Initialize Web Audio Context for chimes and synthesized effects
    if (!this.ctx && (typeof window !== 'undefined')) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.22, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    // 2. Initialize HTML5 Audio Element for the real music track
    if (!this.audioElement && (typeof window !== 'undefined')) {
      this.audioElement = new Audio();
      this.audioElement.src = this.sources[0];
      this.audioElement.loop = true;
      this.audioElement.volume = this.isMuted ? 0 : this.volume;

      this.audioElement.onloadedmetadata = () => {
        if (this.audioElement.duration && !isNaN(this.audioElement.duration)) {
          this.duration = Math.floor(this.audioElement.duration);
          this.notify();
        }
      };

      this.audioElement.ontimeupdate = () => {
        if (this.audioElement && this.isPlaying && !this.isUsingSynth) {
          this.currentTime = this.audioElement.currentTime;
          this.notify();
        }
      };

      this.audioElement.onerror = () => {
        // Try fallback source if primary fails
        if (this.currentSourceIdx < this.sources.length - 1) {
          this.currentSourceIdx++;
          this.audioElement.src = this.sources[this.currentSourceIdx];
          if (this.isPlaying) {
            this.audioElement.play().catch(() => this.startSynthFallback());
          }
        } else {
          // If all audio files fail, seamlessly fall back to synthesizer
          if (this.isPlaying) {
            this.startSynthFallback();
          }
        }
      };
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Initial notification
    listener(this.currentTime, this.isPlaying, this.volume, this.isMuted);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.currentTime, this.isPlaying, this.volume, this.isMuted);
      } catch (e) {
        // Safe listener invocation
      }
    });
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      this.audioElement.currentTime = this.currentTime;
      this.audioElement.play().then(() => {
        this.isUsingSynth = false;
        this.stopSynthFallback();
      }).catch(() => {
        // If audio element playback fails (e.g. autoplay block or missing codec), use melodic synth
        this.startSynthFallback();
      });
    } else {
      this.startSynthFallback();
    }

    this.notify();
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynthFallback();
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.isMuted && this.volume > 0) {
      this.isMuted = false;
    }
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume * 0.22, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume * 0.22, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  seek(seconds) {
    this.currentTime = Math.max(0, Math.min(seconds, this.duration));
    if (this.audioElement && !this.isUsingSynth) {
      this.audioElement.currentTime = this.currentTime;
    }
    this.notify();
  }

  jumpToChapter(startTime) {
    this.seek(startTime);
    if (!this.isPlaying) {
      this.start();
    }
  }

  // Melodic fallback synthesizer if audio element is blocked
  startSynthFallback() {
    this.isUsingSynth = true;
    if (this.synthLoopId) return;

    // Iconic Tera Yaar Hoon Main / Friendship Chords
    const chords = [
      [293.66, 369.99, 440.00], // D major
      [220.00, 277.18, 329.63], // A major
      [246.94, 293.66, 369.99], // B minor
      [196.00, 246.94, 293.66], // G major
    ];

    let step = 0;
    const playNext = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = chords[step % chords.length];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.15 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + idx * 0.15);
        osc.stop(now + 2.6);
      });
      step++;
      this.currentTime = (this.currentTime + 3) % this.duration;
      this.notify();
    };

    playNext();
    this.synthLoopId = setInterval(playNext, 3000);
  }

  stopSynthFallback() {
    this.isUsingSynth = false;
    if (this.synthLoopId) {
      clearInterval(this.synthLoopId);
      this.synthLoopId = null;
    }
  }

  // Celebratory bell chime for unlocks, cake, modal clicks
  playChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      gain.gain.setValueAtTime(0.001, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.7);
    });
  }

  // Birthday candle blowing whoosh effect
  playCandleBlow() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.9;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(160, now + 0.85);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.9);
  }
}

export const globalFriendshipEngine = new UnifiedAudioEngine();
