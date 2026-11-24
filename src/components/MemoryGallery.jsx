import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Camera, 
  FolderHeart,
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/storyData';
import { globalAudioSynth } from './MusicControl';

// Beautiful SVG illustrations for each memory fallback tailored for a clean modern aesthetic
const MemoryIllustration = ({ type, title }) => {
  switch (type) {
    case 'Home':
      // Hostel illustration
      return (
        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', background: '#e0e7ff' }}>
          <defs>
            <linearGradient id="hostelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ede9fe" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>
            <radialGradient id="hostelLight" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#hostelGrad)" />
          <circle cx="200" cy="120" r="120" fill="url(#hostelLight)" />
          {/* Hostel Windows */}
          <rect x="70" y="60" width="40" height="55" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <rect x="130" y="60" width="40" height="55" rx="4" fill="#c7d2fe" stroke="#6366f1" strokeWidth="2" />
          <rect x="230" y="60" width="40" height="55" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <rect x="290" y="60" width="40" height="55" rx="4" fill="#c7d2fe" stroke="#6366f1" strokeWidth="2" />
          <rect x="70" y="140" width="40" height="55" rx="4" fill="#c7d2fe" stroke="#6366f1" strokeWidth="2" />
          <rect x="130" y="140" width="40" height="55" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <rect x="230" y="140" width="40" height="55" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <rect x="290" y="140" width="40" height="55" rx="4" fill="#c7d2fe" stroke="#6366f1" strokeWidth="2" />
          {/* Tea cup */}
          <ellipse cx="200" cy="245" rx="32" ry="8" fill="#cbd5e1" />
          <path d="M185 220 h30 v18 a15 15 0 0 1 -30 0 z" fill="#f59e0b" />
          <path d="M215 224 a6 6 0 0 1 0 10 h-3" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          <text x="200" y="278" textAnchor="middle" fill="#4338ca" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
            Hostel Midnight Chai & Talks
          </text>
        </svg>
      );
    case 'Terminal':
      // SIH Hackathon sprint illustration
      return (
        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', background: '#f5f3ff' }}>
          <defs>
            <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5f3ff" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#codeGrad)" />
          {/* Laptop Mock */}
          <rect x="100" y="70" width="200" height="120" rx="8" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" />
          <rect x="110" y="80" width="180" height="100" rx="4" fill="#0f172a" />
          <line x1="120" y1="95" x2="170" y2="95" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          <line x1="120" y1="110" x2="230" y2="110" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
          <line x1="135" y1="125" x2="210" y2="125" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
          <line x1="135" y1="140" x2="250" y2="140" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
          <line x1="120" y1="155" x2="160" y2="155" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
          <path d="M80 190 h240 a10 10 0 0 1 -10 12 h-220 a10 10 0 0 1 -10 -12 z" fill="#475569" />
          <text x="200" y="245" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="bold" fontFamily="monospace">
            SIH 36-HOUR HACKATHON
          </text>
          <text x="200" y="270" textAnchor="middle" fill="#475569" fontSize="12" fontFamily="sans-serif">
            Lines of code & endless debug cycles
          </text>
        </svg>
      );
    case 'Users':
      // Team celebration
      return (
        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', background: '#eff6ff' }}>
          <rect width="400" height="300" fill="#eff6ff" />
          <circle cx="200" cy="110" r="60" fill="#dbeafe" />
          {/* Silhouettes */}
          <circle cx="150" cy="130" r="22" fill="#3b82f6" />
          <path d="M125 190 a25 25 0 0 1 50 0 z" fill="#3b82f6" />
          <circle cx="200" cy="115" r="24" fill="#7c3aed" />
          <path d="M172 185 a28 28 0 0 1 56 0 z" fill="#7c3aed" />
          <circle cx="250" cy="130" r="22" fill="#0284c7" />
          <path d="M225 190 a25 25 0 0 1 50 0 z" fill="#0284c7" />
          {/* Sparkles */}
          <polygon points="200,60 205,75 220,80 205,85 200,100 195,85 180,80 195,75" fill="#f59e0b" />
          <text x="200" y="245" textAnchor="middle" fill="#1e3a8a" fontSize="14" fontWeight="bold">
            Unbeatable Team Spirit
          </text>
          <text x="200" y="270" textAnchor="middle" fill="#475569" fontSize="12">
            The clutch pitch & victory moments
          </text>
        </svg>
      );
    case 'PartyPopper':
    case 'Sparkles':
      // Navrang Fest Lights
      return (
        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', background: '#fdf2f8' }}>
          <defs>
            <linearGradient id="festLight" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="festLight2" x1="100%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="#fdf2f8" />
          <polygon points="100,300 200,50 160,300" fill="url(#festLight)" />
          <polygon points="300,300 200,50 240,300" fill="url(#festLight2)" />
          {/* Stage floor */}
          <polygon points="50,220 350,220 380,280 20,280" fill="#4c1d95" opacity="0.8" />
          <circle cx="200" cy="50" r="12" fill="#fbbf24" filter="drop-shadow(0 0 10px #f59e0b)" />
          <text x="200" y="250" textAnchor="middle" fill="#831843" fontSize="15" fontWeight="bold">
            Navrang Fest Lights
          </text>
          <text x="200" y="275" textAnchor="middle" fill="#475569" fontSize="12">
            Crazy energy, stage hype & memories
          </text>
        </svg>
      );
    default:
      // Friends gang forever
      return (
        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', background: '#f0fdf4' }}>
          <rect width="400" height="300" fill="#f0fdf4" />
          <circle cx="200" cy="120" r="80" fill="#bbf7d0" opacity="0.5" />
          <text x="200" y="130" textAnchor="middle" fontSize="48">✨ 🤝 📸</text>
          <text x="200" y="225" textAnchor="middle" fill="#14532d" fontSize="15" fontWeight="bold">
            College Memories Forever
          </text>
          <text x="200" y="250" textAnchor="middle" fill="#475569" fontSize="12">
            The laughs, the stories, the brotherhood
          </text>
        </svg>
      );
  }
};

export default function MemoryGallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index) => {
    globalAudioSynth.playChime();
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
  };

  const currentPhoto = activePhotoIndex !== null ? GALLERY_PHOTOS[activePhotoIndex] : null;

  return (
    <section id="gallery" className="section-padding" style={{ position: 'relative', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(217, 119, 6, 0.08)',
              border: '1px solid rgba(217, 119, 6, 0.25)',
              marginBottom: '1rem'
            }}
          >
            <Camera size={15} color="#d97706" />
            <span className="mono-tag" style={{ color: '#d97706', fontWeight: 600 }}>
              POLAROID ARCHIVE // PHOTO ALBUM
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
              marginBottom: '1rem'
            }}
          >
            Some Moments Deserve To <span className="gradient-text-gold">Stay Forever.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              color: '#64748b',
              fontSize: '1.05rem',
              maxWidth: '620px',
              margin: '0 auto'
            }}
          >
            Captured snapshots of college life, hackathons, and celebrations. Click any polaroid to enlarge!
          </motion.p>
        </div>

        {/* Polaroid Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            padding: '1rem 0'
          }}
        >
          {GALLERY_PHOTOS.map((photo, index) => {
            const hasError = imageErrors[photo.id];

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{
                  scale: 1.04,
                  rotate: 0,
                  zIndex: 20,
                  transition: { duration: 0.25 }
                }}
                onClick={() => openLightbox(index)}
                style={{
                  transform: `rotate(${photo.rotation}deg)`,
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Polaroid Frame */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '14px 14px 24px 14px',
                    borderRadius: '8px',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08), 0 3px 10px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  {/* Top Scotch Tape Effect */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '70px',
                      height: '24px',
                      background: 'rgba(255, 255, 255, 0.75)',
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                      borderLeft: '1px dashed rgba(0,0,0,0.15)',
                      borderRight: '1px dashed rgba(0,0,0,0.15)',
                      zIndex: 10
                    }}
                  />

                  {/* Image Container */}
                  <div
                    style={{
                      width: '100%',
                      height: '230px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    {!hasError ? (
                      <img
                        src={photo.src}
                        alt={photo.title}
                        onError={() => handleImageError(photo.id)}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                    ) : (
                      <MemoryIllustration type={photo.icon} title={photo.title} />
                    )}

                    {/* Tag badge overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(4px)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        color: '#f8fafc',
                        fontWeight: 600
                      }}
                    >
                      {photo.tag}
                    </div>

                    {/* Hover expand hint */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(15, 23, 42, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.2s ease'
                      }}
                      className="photo-hover-overlay"
                    >
                      <span
                        style={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          color: '#0f172a',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        <Maximize2 size={13} /> Click to View
                      </span>
                    </div>
                  </div>

                  {/* Polaroid handwritten caption */}
                  <div style={{ marginTop: '14px', textAlign: 'center', padding: '0 4px' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-handwritten)',
                        fontSize: '1.35rem',
                        color: '#0f172a',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        marginBottom: '4px'
                      }}
                    >
                      {photo.title}
                    </p>
                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: '#475569',
                        lineHeight: 1.35,
                        fontFamily: 'var(--font-main)'
                      }}
                    >
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Helpful Tip for user custom photos */}
        <div
          style={{
            marginTop: '3.5rem',
            textAlign: 'center',
            background: 'rgba(139, 92, 246, 0.05)',
            border: '1px dashed rgba(139, 92, 246, 0.3)',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            maxWidth: '680px',
            margin: '3.5rem auto 0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#7c3aed', marginBottom: '4px' }}>
            <FolderHeart size={16} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Want to drop your real photos?</span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.5 }}>
            Simply save your college photos as <code style={{ color: '#0284c7', fontWeight: 600 }}>hostel.jpg</code>, <code style={{ color: '#0284c7', fontWeight: 600 }}>sih1.jpg</code>, <code style={{ color: '#0284c7', fontWeight: 600 }}>sih2.jpg</code>, <code style={{ color: '#0284c7', fontWeight: 600 }}>navrang1.jpg</code>, <code style={{ color: '#0284c7', fontWeight: 600 }}>navrang2.jpg</code>, and <code style={{ color: '#0284c7', fontWeight: 600 }}>friends.jpg</code> inside <code style={{ color: '#d97706', fontWeight: 600 }}>/public/images/</code>. They will automatically load here!
          </p>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhotoIndex !== null && currentPhoto && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(15, 23, 42, 0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ffffff',
                zIndex: 1010
              }}
            >
              <X size={22} />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '50%',
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ffffff',
                zIndex: 1010
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '50%',
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ffffff',
                zIndex: 1010
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '680px',
                width: '100%',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '16px 16px 24px 16px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: 'clamp(280px, 50vh, 440px)',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                {!imageErrors[currentPhoto.id] ? (
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.title}
                    onError={() => handleImageError(currentPhoto.id)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <MemoryIllustration type={currentPhoto.icon} title={currentPhoto.title} />
                )}
              </div>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    backgroundColor: '#e2e8f0',
                    color: '#334155',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    marginBottom: '6px'
                  }}
                >
                  {currentPhoto.tag} • {activePhotoIndex + 1} of {GALLERY_PHOTOS.length}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: '1.9rem',
                    color: '#0f172a',
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}
                >
                  {currentPhoto.title}
                </h3>

                <p style={{ color: '#475569', fontSize: '0.95rem' }}>
                  {currentPhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        div:hover > div > div > .photo-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
