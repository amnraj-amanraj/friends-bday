import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Wind, RotateCcw, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAKE_SECTION } from '../data/storyData';
import { globalAudioSynth } from './MusicControl';

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const handleMakeWish = () => {
    if (!candlesLit) return;
    setIsBlowing(true);

    // Play synthesized candle blow sound effect
    globalAudioSynth.playCandleBlow();

    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);
      setWishMade(true);

      // Trigger twin confetti cannons
      try {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.7 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.7 }
        });
      } catch (e) {
        // Fallback
      }
    }, 700);
  };

  const handleRelight = () => {
    globalAudioSynth.playChime();
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section
      id="cake"
      className="section-padding"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #f8fafc 0%, #fdf2f8 50%, #f8fafc 100%)',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(236, 72, 153, 0.08)',
              border: '1px solid rgba(236, 72, 153, 0.25)',
              marginBottom: '1rem'
            }}
          >
            <Flame size={15} color="#db2777" />
            <span className="mono-tag" style={{ color: '#db2777', fontWeight: 600 }}>
              TIME FOR A WISH // CAKE CEREMONY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '0.85rem'
            }}
          >
            Blow Out The <span className="gradient-text-gold">Candles!</span> 🎂
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ color: '#64748b', fontSize: '1.05rem' }}
          >
            {candlesLit ? CAKE_SECTION.instruction : 'Your wish has been dispatched to the stars! ✨'}
          </motion.p>
        </div>

        {/* 3D-STYLE ANIMATED CAKE CONTAINER */}
        <div
          style={{
            position: 'relative',
            height: '340px',
            maxWidth: '460px',
            margin: '0 auto 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: '20px'
          }}
        >
          {/* Cake Candles (3 Candles) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '34px',
              marginBottom: '-8px',
              zIndex: 15,
              position: 'relative'
            }}
          >
            {[
              { id: 1, color: '#f59e0b', stripe: '#fef08a', height: 50 },
              { id: 2, color: '#ec4899', stripe: '#fbcfe8', height: 60 },
              { id: 3, color: '#0284c7', stripe: '#bae6fd', height: 50 }
            ].map((candle) => (
              <div
                key={candle.id}
                onClick={candlesLit ? handleMakeWish : undefined}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: candlesLit ? 'pointer' : 'default',
                  position: 'relative'
                }}
                title={candlesLit ? 'Click to blow candle' : 'Candle blown out'}
              >
                {/* Flame / Smoke */}
                <div style={{ height: '32px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {candlesLit ? (
                    <motion.div
                      animate={{
                        scale: isBlowing ? [1, 0.4, 0] : [1, 1.15, 0.95, 1.1, 1],
                        rotate: isBlowing ? -15 : [0, 2, -2, 1, 0]
                      }}
                      transition={{
                        repeat: isBlowing ? 0 : Infinity,
                        duration: isBlowing ? 0.4 : 1.2,
                        ease: 'easeInOut'
                      }}
                      style={{
                        width: '16px',
                        height: '24px',
                        background: 'radial-gradient(ellipse at bottom, #ffffff 0%, #fef08a 35%, #f59e0b 70%, #ef4444 100%)',
                        borderRadius: '50% 50% 35% 35% / 60% 60% 40% 40%',
                        boxShadow: '0 0 20px #f59e0b, 0 -6px 20px #ef4444, 0 0 35px #fbbf24',
                        transformOrigin: 'bottom center'
                      }}
                    />
                  ) : (
                    /* Smoke wisps after blowing */
                    <div
                      className="animate-smoke"
                      style={{
                        width: '6px',
                        height: '18px',
                        background: 'rgba(148, 163, 184, 0.55)',
                        borderRadius: '4px',
                        filter: 'blur(1.5px)'
                      }}
                    />
                  )}
                </div>

                {/* Candle Wick */}
                <div style={{ width: '2px', height: '6px', backgroundColor: '#334155' }} />

                {/* Candle Body */}
                <div
                  style={{
                    width: '14px',
                    height: `${candle.height}px`,
                    background: `repeating-linear-gradient(45deg, ${candle.color}, ${candle.color} 5px, ${candle.stripe} 5px, ${candle.stripe} 10px)`,
                    borderRadius: '4px 4px 1px 1px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    border: '1px solid rgba(255,255,255,0.6)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* TOP CAKE LAYER */}
          <div
            style={{
              width: '180px',
              height: '75px',
              background: 'linear-gradient(180deg, #9333ea 0%, #7c3aed 100%)',
              borderRadius: '20px 20px 8px 8px',
              position: 'relative',
              boxShadow: '0 6px 20px rgba(124, 58, 237, 0.25), inset 0 4px 8px rgba(255, 255, 255, 0.4)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '6px 12px'
            }}
          >
            {/* Top Icing Drips */}
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                left: '0',
                right: '0',
                height: '14px',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            {/* Sprinkles on top layer */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '12px' }}>
              <span style={{ width: '6px', height: '3px', background: '#fbbf24', borderRadius: '2px' }} />
              <span style={{ width: '3px', height: '6px', background: '#f43f5e', borderRadius: '2px' }} />
              <span style={{ width: '7px', height: '3px', background: '#38bdf8', borderRadius: '2px' }} />
              <span style={{ width: '5px', height: '3px', background: '#4ade80', borderRadius: '2px' }} />
              <span style={{ width: '3px', height: '5px', background: '#fbbf24', borderRadius: '2px' }} />
            </div>
            {/* Cream wave */}
            <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.35)', borderRadius: '4px' }} />
          </div>

          {/* BOTTOM CAKE LAYER */}
          <div
            style={{
              width: '270px',
              height: '95px',
              background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)',
              borderRadius: '22px 22px 10px 10px',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(79, 70, 229, 0.25), inset 0 4px 10px rgba(255, 255, 255, 0.35)',
              zIndex: 9,
              marginTop: '-10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '10px 18px'
            }}
          >
            {/* White Cream Dripping Layer */}
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                left: '0',
                right: '0',
                height: '18px',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
            {/* Decorative Gold Stars / Studs */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '18px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 6px #fbbf24' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 6px #38bdf8' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e', boxShadow: '0 0 6px #f43f5e' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 6px #fbbf24' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 6px #a855f7' }} />
            </div>
            {/* Golden Ribbon accent */}
            <div
              style={{
                width: '100%',
                height: '12px',
                background: 'linear-gradient(90deg, #f59e0b, #fef08a, #f59e0b)',
                borderRadius: '6px',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.4)'
              }}
            />
          </div>

          {/* CAKE STAND / PLATTER */}
          <div
            style={{
              width: '320px',
              height: '16px',
              background: 'linear-gradient(90deg, #e2e8f0 0%, #ffffff 50%, #cbd5e1 100%)',
              borderRadius: '9999px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(203, 213, 225, 0.8)',
              zIndex: 8,
              marginTop: '-4px'
            }}
          />
        </div>

        {/* WISH REVEAL MESSAGE OR ACTION BUTTON */}
        <div style={{ minHeight: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {candlesLit ? (
              <motion.div
                key="make-wish-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <button
                  onClick={handleMakeWish}
                  disabled={isBlowing}
                  className="btn-primary btn-gold"
                  style={{
                    fontSize: '1.15rem',
                    padding: '1.1rem 2.8rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  <Wind size={20} />
                  <span>{isBlowing ? 'Blowing Out Candles...' : 'Make a Wish ✨'}</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="wish-revealed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-panel"
                style={{
                  maxWidth: '640px',
                  padding: '2rem 1.85rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(217, 119, 6, 0.35)',
                  boxShadow: '0 15px 40px rgba(217, 119, 6, 0.15)'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#b45309',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    marginBottom: '1rem'
                  }}
                >
                  <PartyPopper size={15} />
                  <span>WISH SEALED WITH THE UNIVERSE!</span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
                    fontWeight: 700,
                    lineHeight: 1.5,
                    color: '#b45309',
                    marginBottom: '1.5rem'
                  }}
                >
                  "{CAKE_SECTION.wishMessage}"
                </p>

                <button
                  onClick={handleRelight}
                  className="btn-glass"
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
                >
                  <RotateCcw size={15} />
                  <span>Light Candles Again 🕯️</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
