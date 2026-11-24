import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FINALE_SECTION } from '../data/storyData';
import { globalAudioSynth } from './MusicControl';

export default function FinalSurprise({ onReplay, onOpenGift }) {
  const triggerGrandFireworks = () => {
    globalAudioSynth.playChime();
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#7c3aed', '#0284c7', '#d97706', '#f43f5e']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#7c3aed', '#0284c7', '#d97706', '#f43f5e']
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleReplayClick = () => {
    globalAudioSynth.playChime();
    if (onReplay) {
      onReplay();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="finale"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '6rem 1.5rem 5rem',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 60%, rgba(243, 232, 255, 0.6) 0%, #f8fafc 70%, #f1f5f9 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Cinematic ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '850px' }}>
        {/* Subtle pill tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 20px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(124, 58, 237, 0.08)',
            border: '1px solid rgba(124, 58, 237, 0.25)',
            marginBottom: '1.5rem'
          }}
        >
          <Sparkles size={15} color="#7c3aed" />
          <span className="mono-tag" style={{ color: '#7c3aed', letterSpacing: '0.1em', fontWeight: 600 }}>
            GRAND FINALE // CELEBRATION DISPATCH
          </span>
        </motion.div>

        {/* ONCE AGAIN... */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="cinematic-title"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: '#64748b',
            letterSpacing: '0.3em',
            marginBottom: '1rem',
            fontWeight: 700
          }}
        >
          {FINALE_SECTION.line1}
        </motion.p>

        {/* HAPPY BIRTHDAY, DHRUV! ❤️ */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.6rem, 7.5vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem'
          }}
        >
          <span className="gradient-text-gold">{FINALE_SECTION.line2}</span>
        </motion.h2>

        {/* "Stay crazy. Stay happy. Keep winning." */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '1rem',
            letterSpacing: '0.02em'
          }}
        >
          {FINALE_SECTION.line3}
        </motion.p>

        {/* "College gave us many things, but some memories are truly special." */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            color: '#475569',
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            maxWidth: '650px',
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}
        >
          "{FINALE_SECTION.line4}"
        </motion.p>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}
        >
          {/* Replay Our Story Button */}
          <button
            onClick={handleReplayClick}
            className="btn-primary"
            style={{
              padding: '1.1rem 2.6rem',
              fontSize: '1.05rem',
              boxShadow: '0 8px 30px rgba(124, 58, 237, 0.35)'
            }}
          >
            <RotateCcw size={18} />
            <span>Replay Our Story</span>
          </button>

          {/* Trigger Fireworks Button */}
          <button
            onClick={triggerGrandFireworks}
            className="btn-primary btn-gold"
            style={{
              padding: '1.1rem 2.2rem',
              fontSize: '1.05rem'
            }}
          >
            <Sparkles size={18} />
            <span>Fireworks Show 🎆</span>
          </button>
        </motion.div>

        {/* Footer Credit & Friendship Tag */}
        <div
          style={{
            marginTop: '5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(226, 232, 240, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#64748b' }}>
            PROJECT: <span style={{ color: '#0284c7', fontWeight: 600 }}>DHruv.exe</span> — The Friendship Edition
          </p>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            Built with React, Framer Motion, nostalgia & pure respect.
          </p>
        </div>
      </div>
    </section>
  );
}
