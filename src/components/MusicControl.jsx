import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';

// Web Audio API ambient soothing birthday chords synthesizer
class LofiBirthdaySynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.1);
    }
  }

  playChord(frequencies, duration = 3.6) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Lowpass filter for warm, dreamy lo-fi tone
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(550 + Math.random() * 150, now);
      filter.Q.setValueAtTime(2, now);

      // Smooth attack and release envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06 / frequencies.length, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Gentle emotive chords: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4
    const chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj7
      [196.00, 261.63, 293.66, 392.00, 440.00], // Gsus4
      [261.63, 329.63, 392.00, 523.25, 659.25], // C high octave
      [220.00, 277.18, 329.63, 440.00, 554.37], // A / emotive
      [174.61, 220.00, 261.63, 349.23, 440.00], // F
      [196.00, 246.94, 293.66, 392.00, 493.88]  // G
    ];

    let step = 0;
    this.playChord(chords[0]);

    this.intervalId = setInterval(() => {
      step = (step + 1) % chords.length;
      this.playChord(chords[step]);
    }, 3800);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  playCandleBlow() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Breath / whoosh sound with noise
    const bufferSize = this.ctx.sampleRate * 1.2;
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
    filter.frequency.exponentialRampToValueAtTime(150, now + 1.1);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 1.2);

    // Subtle celebration chime
    const chimeFreqs = [523.25, 659.25, 783.99, 1046.50];
    chimeFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.5 + idx * 0.12);

      oscGain.gain.setValueAtTime(0.0001, now + 0.5 + idx * 0.12);
      oscGain.gain.linearRampToValueAtTime(0.08, now + 0.55 + idx * 0.12);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5 + idx * 0.12);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now + 0.5 + idx * 0.12);
      osc.stop(now + 1.8 + idx * 0.12);
    });
  }

  playChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      oscGain.gain.setValueAtTime(0.001, now + idx * 0.08);
      oscGain.gain.linearRampToValueAtTime(0.06, now + idx * 0.08 + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.7);
    });
  }
}

export const globalAudioSynth = new LofiBirthdaySynth();

export default function MusicControl({ musicStarted, setMusicStarted }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [hasCustomAudio, setHasCustomAudio] = useState(false);
  const [audioSrc, setAudioSrc] = useState('/audio/tera-yaar-hoon-main.mp3');
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioTagRef = useRef(null);

  // Check if custom /audio/tera-yaar-hoon-main.mp3 or fallback is available
  useEffect(() => {
    const audio = new Audio('/audio/tera-yaar-hoon-main.mp3');
    audio.preload = 'metadata';
    audio.oncanplay = () => {
      setHasCustomAudio(true);
      setAudioSrc('/audio/tera-yaar-hoon-main.mp3');
    };
    audio.onerror = () => {
      // Try fallback birthday.mp3
      const altAudio = new Audio('/audio/birthday.mp3');
      altAudio.preload = 'metadata';
      altAudio.oncanplay = () => {
        setHasCustomAudio(true);
        setAudioSrc('/audio/birthday.mp3');
      };
      altAudio.onerror = () => {
        setHasCustomAudio(false);
      };
    };
  }, []);

  // When parent signals music started (e.g. from Enter Surprise / Unlock button)
  useEffect(() => {
    if (musicStarted && !isPlaying) {
      startMusic();
    }
  }, [musicStarted]);

  // Keep volume in sync
  useEffect(() => {
    if (audioTagRef.current) {
      audioTagRef.current.volume = isMuted ? 0 : volume;
    }
    if (globalAudioSynth) {
      globalAudioSynth.setVolume(isMuted ? 0 : volume * 0.22);
    }
  }, [volume, isMuted]);

  const startMusic = () => {
    setIsPlaying(true);
    if (hasCustomAudio && audioTagRef.current) {
      audioTagRef.current.volume = isMuted ? 0 : volume;
      audioTagRef.current.play().catch(() => {
        globalAudioSynth.start();
      });
    } else {
      globalAudioSynth.start();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (hasCustomAudio && audioTagRef.current) {
        audioTagRef.current.pause();
      }
      globalAudioSynth.stop();
      setIsPlaying(false);
    } else {
      startMusic();
      if (!musicStarted && setMusicStarted) {
        setMusicStarted(true);
      }
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      globalAudioSynth.setVolume(volume * 0.22);
      if (audioTagRef.current) {
        audioTagRef.current.muted = false;
        audioTagRef.current.volume = volume;
      }
    } else {
      setIsMuted(true);
      globalAudioSynth.setVolume(0);
      if (audioTagRef.current) {
        audioTagRef.current.muted = true;
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
    }
  };

  return (
    <>
      <audio ref={audioTagRef} src={audioSrc} loop />
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div
          className="glass-panel"
          style={{
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            boxShadow: '0 10px 30px rgba(167, 139, 250, 0.18)'
          }}
        >
          {/* Spinning Vinyl / Music Disc */}
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause Music' : 'Play Background Music'}
            aria-label={isPlaying ? 'Pause Music' : 'Play Background Music'}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isPlaying ? '#7c3aed' : '#94a3b8',
              transition: 'transform 0.2s ease',
              animation: isPlaying ? 'spin 6s linear infinite' : 'none'
            }}
          >
            <Disc3 size={24} />
          </button>

          {/* Equalizer Bars when playing */}
          <div
            onClick={togglePlay}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '3px',
              height: '18px',
              cursor: 'pointer'
            }}
            title="Music status"
          >
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                style={{
                  width: '3px',
                  backgroundColor: isPlaying ? '#7c3aed' : '#cbd5e1',
                  borderRadius: '2px',
                  height: isPlaying ? `${Math.floor(Math.random() * 12 + 6)}px` : '4px',
                  transition: 'height 0.2s ease',
                  animation: isPlaying ? `equalizer 1.${bar}s ease-in-out infinite alternate` : 'none'
                }}
              />
            ))}
          </div>

          {/* Track Label: Tera Yaar Hoon Main */}
          <div
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            style={{ display: 'flex', flexDirection: 'column', minWidth: '135px', cursor: 'pointer' }}
            title="Click to toggle volume slider"
          >
            <span style={{ fontSize: '0.74rem', color: '#0f172a', fontWeight: 700, letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>
              Tera Yaar Hoon Main 🎵
            </span>
            <span style={{ fontSize: '0.62rem', color: '#64748b', whiteSpace: 'nowrap' }}>
              {isPlaying ? (hasCustomAudio ? 'Sonu Ke Titu Ki Sweety' : 'Melodic Friendship Chords') : 'Click to Play Song'}
            </span>
          </div>

          {/* Volume Slider Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              style={{
                width: '60px',
                accentColor: '#7c3aed',
                cursor: 'pointer',
                height: '4px'
              }}
            />
          </div>

          {/* Mute / Unmute Button */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isMuted ? '#e11d48' : '#475569',
              transition: 'all 0.2s ease'
            }}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes equalizer {
          0% { height: 4px; }
          50% { height: 16px; }
          100% { height: 8px; }
        }
      `}</style>
    </>
  );
}
