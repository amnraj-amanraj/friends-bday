import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_CONFIG } from '../data/storyData';
import { globalAudioSynth } from './MusicControl';

export default function GiftModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      globalAudioSynth.playChime();
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="glass-panel"
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '480px',
            width: '100%',
            padding: '2rem',
            textAlign: 'center',
            position: 'relative',
            borderRadius: '20px',
            border: '1px solid rgba(217, 119, 6, 0.35)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 35px rgba(217, 119, 6, 0.1)',
            background: '#ffffff'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={18} />
          </button>

          {/* Glowing Gift Icon Header */}
          <div
            style={{
              width: '76px',
              height: '76px',
              margin: '0 auto 1.25rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9), rgba(243, 232, 255, 0.9))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(217, 119, 6, 0.4)',
              boxShadow: '0 4px 20px rgba(217, 119, 6, 0.2)'
            }}
          >
            <Gift size={38} color="#d97706" />
          </div>

          <span
            className="mono-tag"
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              color: '#b45309',
              marginBottom: '0.75rem',
              fontWeight: 700
            }}
          >
            UNLOCKED SECRET TRANSMISSION
          </span>

          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '1rem'
            }}
          >
            A Quick Reality Check 👀
          </h3>

          <div
            style={{
              background: '#fefce8',
              border: '1px dashed rgba(217, 119, 6, 0.5)',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              position: 'relative'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                lineHeight: 1.6,
                color: '#92400e',
                fontWeight: 700
              }}
            >
              "{BIRTHDAY_CONFIG.hiddenSurpriseMessage}"
            </p>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '1.5rem' }}>
            Terms & Conditions: Pizza, Biryani, ya cold coffee — Dhruv ke account se! 😂
          </p>

          <button
            onClick={onClose}
            className="btn-primary btn-gold"
            style={{ width: '100%', padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
          >
            <Check size={18} />
            <span>Bilkul Done Bhai! 🤝</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
