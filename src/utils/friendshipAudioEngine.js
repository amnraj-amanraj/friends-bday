/**
 * Web Audio API Engine for Friendship Song
 * Synthesizes acoustic guitar + piano chords and melody of iconic friendship themes,
 * with seamless fallback to custom /audio/friendship-song.mp3 if provided.
 */

class FriendshipAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 240; // 4 minutes
    this.timerId = null;
    this.chordInterval = null;
    this.audioElement = null;
    this.hasCustomFile = false;
    this.listeners = new Set();
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.src = '/audio/friendship-song.mp3';
      this.audioElement.preload = 'metadata';
      this.audioElement.oncanplay = () => {
        this.hasCustomFile = true;
      };
      this.audioElement.ontimeupdate = () => {
        if (this.hasCustomFile && this.isPlaying) {
          this.currentTime = this.audioElement.currentTime;
          this.notify();
        }
      };
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.currentTime, this.isPlaying));
  }

  setVolume(vol) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
    }
    if (this.audioElement) {
      this.audioElement.volume = vol;
    }
  }

  playNote(freq, startTime, duration, type = 'sine', gainAmt = 0.08) {
    if (!this.ctx || !this.isPlaying) return;
    const now = startTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Warm acoustic filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(1.5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(gainAmt, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  playFriendshipArpeggio(rootFreqs, now) {
    // Acoustic guitar-style arpeggiated strum
    rootFreqs.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.18, 2.8, idx % 2 === 0 ? 'sine' : 'triangle', 0.05);
    });

    // Gentle high octave harmony note (piano touch)
    const melodyFreq = rootFreqs[rootFreqs.length - 1] * 1.5;
    this.playNote(melodyFreq, now + 0.7, 1.8, 'sine', 0.04);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (this.hasCustomFile && this.audioElement) {
      this.audioElement.currentTime = this.currentTime;
      this.audioElement.play().catch(() => {});
    }

    // Iconic friendship chord progressions (Tera Yaar Hoon Main / Yaaron Dosti inspired)
    // F -> C -> Dm -> Bb -> F -> C -> Bb -> C
    const progression = [
      [174.61, 220.00, 261.63, 349.23], // F major (Warm acoustic start)
      [261.63, 329.63, 392.00, 523.25], // C major (Open melody)
      [220.00, 261.63, 349.23, 440.00], // D minor (Emotional heart)
      [233.08, 293.66, 349.23, 466.16], // Bb major (Lifting resolve)
      [174.61, 261.63, 349.23, 440.00], // F higher
      [196.00, 246.94, 293.66, 392.00], // G/C
      [220.00, 277.18, 329.63, 440.00], // A
      [261.63, 329.63, 392.00, 523.25]  // C climax
    ];

    let chordStep = Math.floor(this.currentTime / 3) % progression.length;
    if (this.ctx) {
      this.playFriendshipArpeggio(progression[chordStep], this.ctx.currentTime);
    }

    this.chordInterval = setInterval(() => {
      chordStep = (chordStep + 1) % progression.length;
      if (this.ctx && this.isPlaying) {
        this.playFriendshipArpeggio(progression[chordStep], this.ctx.currentTime);
      }
    }, 3200);

    // Timeline ticker
    this.timerId = setInterval(() => {
      this.currentTime += 1;
      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
      }
      this.notify();
    }, 1000);

    this.notify();
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId) clearInterval(this.timerId);
    if (this.chordInterval) clearInterval(this.chordInterval);
    if (this.audioElement && this.hasCustomFile) {
      this.audioElement.pause();
    }
    this.notify();
  }

  seek(seconds) {
    this.currentTime = Math.max(0, Math.min(seconds, this.duration));
    if (this.audioElement && this.hasCustomFile) {
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
}

export const globalFriendshipEngine = new FriendshipAudioEngine();
