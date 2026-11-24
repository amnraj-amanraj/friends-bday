import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, Sparkles, AlertCircle, Heart } from 'lucide-react';
import { globalAudioSynth } from './MusicControl';
import { BIRTHDAY_CONFIG } from '../data/storyData';

export default function PasswordScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [imgError, setImgError] = useState(false);

  // The secret passcode for the birthday surprise
  // Verified dynamically without exposing in visible DOM elements
  const SECRET_KEY = "2611";

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password.trim() === SECRET_KEY) {
      setError('');
      globalAudioSynth.playChime();
      onUnlock();
    } else {
      setError("Oops! Wrong password. Try again, birthday boy! 😂");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 40%, #ffffff 0%, #faf9f6 60%, #f3e8ff 100%)',
        padding: '1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Soft Pastel Background Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '12%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'rgba(196, 181, 253, 0.35)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '12%',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'rgba(251, 207, 232, 0.35)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '45%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'rgba(186, 230, 253, 0.35)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Centered Password Card */}
      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '28px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          position: 'relative',
          border: '1px solid #ede9fe',
          boxShadow: '0 25px 60px -15px rgba(167, 139, 250, 0.25), 0 10px 25px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Decorative Top Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            marginBottom: '1.25rem'
          }}
        >
          <Lock size={12} color="#7c3aed" />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7c3aed', letterSpacing: '0.08em' }}>
            BIRTHDAY SURPRISE GATE
          </span>
        </div>

        {/* DHRUV'S PHOTOGRAPH IN PROMINENT PORTRAIT FRAME */}
        <div style={{ position: 'relative', width: '145px', height: '175px', margin: '0 auto 1.35rem' }}>
          {/* Pastel Glowing Halo Ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '26px',
              background: 'linear-gradient(135deg, rgba(196, 181, 253, 0.7) 0%, rgba(251, 207, 232, 0.7) 50%, rgba(186, 230, 253, 0.7) 100%)',
              filter: 'blur(8px)',
              opacity: 0.85
            }}
          />

          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '22px',
              overflow: 'hidden',
              border: '4px solid #ffffff',
              boxShadow: '0 12px 30px rgba(139, 92, 246, 0.22)',
              backgroundColor: '#faf5ff'
            }}
          >
            <img
              src={!imgError ? (BIRTHDAY_CONFIG.dhruvPasswordPhoto || '/images/dhruv-kurta-portrait.jpg') : BIRTHDAY_CONFIG.dhruvPhoto}
              alt="Dhruv in Pink Kurta"
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
                display: 'block'
              }}
            />
          </div>

          {/* Birthday crown badge */}
          <span
            style={{
              position: 'absolute',
              bottom: '-6px',
              right: '-6px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              fontSize: '18px',
              border: '2px solid rgba(245, 158, 11, 0.3)'
            }}
            title="Birthday Boy"
          >
            👑
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 4vw, 1.85rem)',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '0.4rem',
            lineHeight: 1.25
          }}
        >
          A Little Surprise For You!
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '0.95rem',
            color: '#64748b',
            marginBottom: '1.75rem',
            lineHeight: 1.5
          }}
        >
          But first, prove you're the birthday boy. 😉
        </p>

        {/* Password Form */}
        <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }}
            >
              <KeyRound size={18} />
            </span>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secret birthday code..."
              autoFocus
              style={{
                width: '100%',
                padding: '13px 16px 13px 44px',
                borderRadius: '9999px',
                border: error ? '1.5px solid #f43f5e' : '1px solid #cbd5e1',
                outline: 'none',
                fontSize: '0.95rem',
                color: '#0f172a',
                backgroundColor: '#f8fafc',
                transition: 'all 0.2s ease',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
              }}
              className="focus:border-purple-500 focus:bg-white"
            />
          </div>

          {/* Error Message with cute text */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  color: '#e11d48',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '4px 8px'
                }}
              >
                <AlertCircle size={14} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unlock Button */}
          <button
            type="submit"
            className="btn-primary"
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginTop: '4px'
            }}
          >
            <span>UNLOCK SURPRISE</span>
            <Sparkles size={18} />
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
          Hint: Dhruv's Birthday Date (DDMM) 🎂
        </p>
      </motion.div>
    </motion.section>
  );
}
