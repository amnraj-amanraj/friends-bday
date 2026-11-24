import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { globalAudioSynth } from './MusicControl';

export default function WelcomeScreen({ onEnter }) {
  const handleEnterClick = () => {
    // Play warm sound effect upon user interaction
    globalAudioSynth.playChime();
    onEnter();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #ffffff 0%, #f1f5f9 65%, #e2e8f0 100%)',
        padding: '1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Decorative ambient blurred glow orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'rgba(147, 51, 234, 0.12)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'rgba(56, 189, 248, 0.15)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}
      />

      <div
        className="glass-panel"
        style={{
          maxWidth: '560px',
          width: '100%',
          padding: '3rem 2.25rem',
          textAlign: 'center',
          position: 'relative',
          borderRadius: '24px',
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          boxShadow: '0 25px 70px rgba(15, 23, 42, 0.1), 0 0 45px rgba(124, 58, 237, 0.08)'
        }}
      >
        {/* Terminal Header Tag */}
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(124, 58, 237, 0.08)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            marginBottom: '1.75rem'
          }}
        >
          <Terminal size={14} color="#0284c7" />
          <span className="mono-tag" style={{ color: '#0284c7', fontWeight: 600 }}>
            INIT_SESSION // DHRUV.EXE
          </span>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }}
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 6vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            lineHeight: 1.15
          }}
        >
          <span className="gradient-text-purple">Hey Dhruv!</span>{' '}
          <span style={{ display: 'inline-block' }} className="animate-float">👀</span>
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '0.85rem'
          }}
        >
          Someone has something special for you...
        </motion.h2>

        {/* Small Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{
            fontSize: '0.975rem',
            color: '#64748b',
            marginBottom: '2.5rem',
            fontStyle: 'italic'
          }}
        >
          "Don't worry, this isn't a college assignment." 😉
        </motion.p>

        {/* Enter Button */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button
            onClick={handleEnterClick}
            className="btn-primary"
            style={{
              fontSize: '1.05rem',
              padding: '1.1rem 2.5rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: '0 8px 30px rgba(124, 58, 237, 0.35)',
              width: '100%',
              maxWidth: '340px'
            }}
          >
            <span>ENTER THE SURPRISE</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Footnote audio notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            color: '#64748b'
          }}
        >
          <Sparkles size={13} color="#7c3aed" />
          <span>Interactive sound & cinematic experience enabled</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
