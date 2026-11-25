import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Disc3 } from 'lucide-react';
import { globalFriendshipEngine } from '../utils/friendshipAudioEngine';

// Export backward-compatible globalAudioSynth proxy for Chimes & Cake blowing
export const globalAudioSynth = {
  playChime: () => globalFriendshipEngine.playChime(),
  playCandleBlow: () => globalFriendshipEngine.playCandleBlow(),
  start: () => globalFriendshipEngine.start(),
  stop: () => globalFriendshipEngine.pause(),
  setVolume: (val) => globalFriendshipEngine.setVolume(val)
};

export default function MusicControl({ musicStarted, setMusicStarted }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);

  // Subscribe to the unified audio manager state
  useEffect(() => {
    const unsubscribe = globalFriendshipEngine.subscribe((time, playing, vol, muted) => {
      setIsPlaying(playing);
      setVolume(vol);
      setIsMuted(muted);
    });
    return () => unsubscribe();
  }, []);

  // When parent signals entrance (e.g. password unlocked)
  useEffect(() => {
    if (musicStarted && !isPlaying) {
      globalFriendshipEngine.start();
    }
  }, [musicStarted]);

  const togglePlay = () => {
    globalFriendshipEngine.toggle();
    if (!musicStarted && setMusicStarted) {
      setMusicStarted(true);
    }
  };

  const toggleMute = () => {
    globalFriendshipEngine.toggleMute();
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    globalFriendshipEngine.setVolume(newVol);
  };

  return (
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
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          border: '1px solid rgba(139, 92, 246, 0.28)',
          boxShadow: '0 10px 30px rgba(167, 139, 250, 0.2)'
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
            animation: isPlaying ? 'spin 5s linear infinite' : 'none'
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
          onClick={togglePlay}
          style={{ display: 'flex', flexDirection: 'column', minWidth: '135px', cursor: 'pointer' }}
          title="Click to toggle playback"
        >
          <span style={{ fontSize: '0.74rem', color: '#0f172a', fontWeight: 700, letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>
            Tera Yaar Hoon Main 🎵
          </span>
          <span style={{ fontSize: '0.62rem', color: '#64748b', whiteSpace: 'nowrap' }}>
            {isPlaying ? 'Sonu Ke Titu Ki Sweety' : 'Click to Play Song'}
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
    </div>
  );
}
