import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Sparkles, PartyPopper, Heart, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_CONFIG } from '../data/storyData';
import { globalAudioSynth } from './MusicControl';

export default function BirthdayIntro() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthdayToday: false,
    isPastBirthday: false
  });
  const [imgError, setImgError] = useState(false);

  // Optional preview mode to test how it looks on the exact birthday
  const [forceCelebration, setForceCelebration] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // Target: 26 November 2026 00:00:00
      const target = new Date(BIRTHDAY_CONFIG.targetDate);
      
      // Check if today is November 26
      const isSameDay =
        now.getFullYear() === target.getFullYear() &&
        now.getMonth() === target.getMonth() &&
        now.getDate() === target.getDate();

      const diff = target - now;

      if (isSameDay) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isBirthdayToday: true,
          isPastBirthday: false
        });
      } else if (diff <= 0) {
        // Opened after Nov 26
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isBirthdayToday: false,
          isPastBirthday: true
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isBirthdayToday: false,
          isPastBirthday: false
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    globalAudioSynth.playChime();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const isCelebrationMode = timeLeft.isBirthdayToday || timeLeft.isPastBirthday || forceCelebration;

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="intro"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7rem 1.5rem 5rem',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background glow circle */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '580px',
          height: '580px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
        {/* Date Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 22px',
            borderRadius: '9999px',
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.08), rgba(245, 158, 11, 0.12))',
            border: '1px solid rgba(217, 119, 6, 0.35)',
            boxShadow: '0 4px 15px rgba(217, 119, 6, 0.12)',
            marginBottom: '1.75rem'
          }}
        >
          <Calendar size={16} color="#d97706" />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.12em',
              color: '#b45309'
            }}
          >
            {BIRTHDAY_CONFIG.displayDate}
          </span>
          <span style={{ color: '#94a3b8' }}>•</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#0284c7',
              letterSpacing: '0.05em',
              fontWeight: 600
            }}
          >
            ANNUAL SPECIAL
          </span>
        </motion.div>

        {/* Legend Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="cinematic-title"
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)',
            color: '#64748b',
            marginBottom: '1.75rem',
            letterSpacing: '0.25em',
            fontWeight: 700
          }}
        >
          {BIRTHDAY_CONFIG.tagline}
        </motion.p>

        {/* DHRUV'S PROMINENT HERO PORTRAIT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            display: 'inline-block',
            margin: '0 auto 2.25rem'
          }}
        >
          {/* Pastel decorative halo aura */}
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '36px',
              background: 'linear-gradient(135deg, rgba(196, 181, 253, 0.6) 0%, rgba(251, 207, 232, 0.6) 50%, rgba(186, 230, 253, 0.6) 100%)',
              filter: 'blur(16px)',
              zIndex: 0
            }}
          />

          {/* Main Portrait Frame */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: 'clamp(190px, 24vw, 230px)',
              height: 'clamp(210px, 27vw, 260px)',
              borderRadius: '30px',
              overflow: 'hidden',
              border: '6px solid #ffffff',
              boxShadow: '0 20px 45px -10px rgba(139, 92, 246, 0.25), 0 10px 20px -5px rgba(244, 114, 182, 0.15)',
              backgroundColor: '#faf5ff'
            }}
          >
            <img
              src={!imgError ? BIRTHDAY_CONFIG.dhruvPhoto : BIRTHDAY_CONFIG.dhruvFullPhoto}
              alt="Dhruv"
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block'
              }}
            />
          </div>

          {/* Birthday Crown / Legend Tag Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 220 }}
            style={{
              position: 'absolute',
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 18px',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              boxShadow: '0 4px 15px rgba(217, 119, 6, 0.18)',
              color: '#b45309',
              fontSize: '0.82rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)'
            }}
          >
            <span>👑</span>
            <span>Birthday Legend • Dhruv</span>
          </motion.div>
        </motion.div>

        {/* Main Glowing Typography */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 7vw, 4.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem'
          }}
        >
          <span className="gradient-text-gold">{BIRTHDAY_CONFIG.birthdayWish}</span>
        </motion.h1>

        {/* Humorous Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(1.1rem, 2.8vw, 1.45rem)',
            color: '#334155',
            fontWeight: 500,
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.5
          }}
        >
          {BIRTHDAY_CONFIG.birthdaySubheading}
        </motion.p>

        {/* COUNTDOWN OR CELEBRATION BLOCK */}
        {!isCelebrationMode ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-panel"
            style={{
              maxWidth: '640px',
              margin: '0 auto 3rem',
              padding: '2rem 1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              border: '1px solid rgba(139, 92, 246, 0.22)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '1.25rem',
                color: '#0284c7',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600
              }}
            >
              <Clock size={16} />
              <span>COUNTDOWN TO THE SPECIAL DAY</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                maxWidth: '480px',
                margin: '0 auto'
              }}
            >
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINUTES', val: timeLeft.minutes },
                { label: 'SECONDS', val: timeLeft.seconds }
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1rem 0.5rem',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
                      fontWeight: 800,
                      color: '#0f172a',
                      lineHeight: 1
                    }}
                  >
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: '#64748b',
                      marginTop: '6px',
                      letterSpacing: '0.08em',
                      fontWeight: 600
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <button
                onClick={() => setForceCelebration(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.75rem',
                  color: '#64748b',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                (Preview Birthday Celebration Mode)
              </button>
            </div>
          </motion.div>
        ) : (
          /* CELEBRATION BANNER ON / AFTER NOVEMBER 26 */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{
              maxWidth: '680px',
              margin: '0 auto 3rem',
              padding: '2rem 1.5rem',
              border: '1px solid rgba(217, 119, 6, 0.35)',
              background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.75), rgba(243, 232, 255, 0.75))',
              boxShadow: '0 15px 40px rgba(217, 119, 6, 0.12)'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 14px',
                borderRadius: '9999px',
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#b45309',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '1rem'
              }}
            >
              <PartyPopper size={16} />
              <span>OFFICIAL CELEBRATION DAY IS HERE!</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                color: '#0f172a',
                marginBottom: '0.5rem',
                fontWeight: 800
              }}
            >
              Today The Universe Blessed Us With Dhruv! 🎉
            </h3>
            <p style={{ color: '#334155', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              No countdown needed anymore — today is 100% all about celebrating you, bro!
            </p>

            <button
              onClick={triggerConfetti}
              className="btn-primary btn-gold"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.5rem' }}
            >
              <Sparkles size={16} />
              <span>Blast Confetti 🎊</span>
            </button>

            {forceCelebration && (
              <div style={{ marginTop: '0.75rem' }}>
                <button
                  onClick={() => setForceCelebration(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '0.75rem',
                    color: '#64748b',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  (Back to Countdown view)
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Button: Let's Rewind Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem'
          }}
        >
          <button
            onClick={scrollToStory}
            className="btn-primary"
            style={{
              padding: '1.1rem 2.8rem',
              fontSize: '1.05rem',
              boxShadow: '0 8px 30px rgba(124, 58, 237, 0.35)'
            }}
          >
            <span>Let's Rewind Our Story</span>
            <ChevronDown size={20} />
          </button>

          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
            Scroll down to explore Chapter 1 to 4 ↓
          </span>
        </motion.div>
      </div>
    </section>
  );
}
