import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { PERSONAL_LETTER } from '../data/storyData';

export default function PersonalLetter() {
  return (
    <section
      id="letter"
      className="section-padding"
      style={{
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(254, 243, 199, 0.5) 0%, #f8fafc 75%, #f1f5f9 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Warm Golden Glow Lighting */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '650px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 60%, transparent 80%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '780px' }}>
        {/* Subtle Section Tag */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
              backgroundColor: 'rgba(217, 119, 6, 0.08)',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              marginBottom: '1rem'
            }}
          >
            <Feather size={15} color="#d97706" />
            <span className="mono-tag" style={{ color: '#d97706', letterSpacing: '0.08em', fontWeight: 600 }}>
              FROM THE HEART // UNFILTERED NOTE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-handwritten)',
              fontSize: 'clamp(2.6rem, 6vw, 3.8rem)',
              fontWeight: 700,
              color: '#b45309',
              textShadow: '0 2px 15px rgba(217, 119, 6, 0.2)'
            }}
          >
            {PERSONAL_LETTER.heading}
          </motion.h2>
        </div>

        {/* Parchment Styled Glass Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'relative',
            background: 'linear-gradient(160deg, #fffdf8 0%, #fefcf7 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(217, 119, 6, 0.35)',
            borderRadius: '24px',
            padding: 'clamp(2rem, 5vw, 3.75rem)',
            boxShadow: '0 20px 60px rgba(217, 119, 6, 0.12), 0 4px 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Decorative Corner Golden Filigree Accent */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '18px',
              width: '24px',
              height: '24px',
              borderTop: '2px solid rgba(217, 119, 6, 0.5)',
              borderLeft: '2px solid rgba(217, 119, 6, 0.5)',
              borderRadius: '4px 0 0 0'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              right: '18px',
              width: '24px',
              height: '24px',
              borderBottom: '2px solid rgba(217, 119, 6, 0.5)',
              borderRight: '2px solid rgba(217, 119, 6, 0.5)',
              borderRadius: '0 0 4px 0'
            }}
          />

          {/* Letter Wax Seal / Icon at Top Right */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              right: '32px',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#991b1b',
              border: '2px solid #fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              color: '#fef08a'
            }}
            title="Wax Seal"
          >
            <Heart size={20} fill="#fef08a" />
          </div>

          {/* Paragraphs with Staggered Fade-in */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.45rem' }}>
            {PERSONAL_LETTER.paragraphs.map((line, idx) => {
              const isGreeting = idx === 0;
              const isLastWish = idx === PERSONAL_LETTER.paragraphs.length - 1;
              const isSorryLine = line.includes('genuinely sorry bhai');

              return (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  style={{
                    fontFamily: isLastWish || isGreeting ? 'var(--font-heading)' : 'var(--font-main)',
                    fontSize: isLastWish
                      ? 'clamp(1.25rem, 3.5vw, 1.6rem)'
                      : isGreeting
                      ? 'clamp(1.15rem, 3vw, 1.35rem)'
                      : 'clamp(1.02rem, 2.5vw, 1.15rem)',
                    fontWeight: isLastWish ? 800 : isGreeting ? 700 : isSorryLine ? 600 : 400,
                    color: isLastWish
                      ? '#b45309'
                      : isSorryLine
                      ? '#9a3412'
                      : isGreeting
                      ? '#0f172a'
                      : '#1e293b',
                    lineHeight: 1.75,
                    borderLeft: isSorryLine ? '3px solid #d97706' : 'none',
                    paddingLeft: isSorryLine ? '1rem' : '0',
                    background: isSorryLine ? 'rgba(245, 158, 11, 0.06)' : 'transparent',
                    paddingTop: isSorryLine ? '4px' : '0',
                    paddingBottom: isSorryLine ? '4px' : '0',
                    borderRadius: isSorryLine ? '0 8px 8px 0' : '0'
                  }}
                >
                  {line}
                </motion.p>
              );
            })}
          </div>

          {/* Mature, positive closing signoff */}
          <div
            style={{
              marginTop: '2.5rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid rgba(217, 119, 6, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem' }}>
              <Sparkles size={14} color="#d97706" />
              <span>Written with genuine friendship & zero baggage.</span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-handwritten)',
                fontSize: '1.6rem',
                color: '#b45309',
                fontWeight: 700
              }}
            >
              — Always your bro ☕
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
