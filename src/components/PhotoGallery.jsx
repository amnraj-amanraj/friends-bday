import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Film, 
  Heart, 
  FolderHeart,
  Eye,
  Calendar,
  Sparkle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MEMORY_PHOTOS, MEMORY_CATEGORIES, HIDDEN_MEMORY_DATA } from '../data/memories';
import { globalAudioSynth } from './MusicControl';

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [hiddenMemoryOpen, setHiddenMemoryOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const filmstripRef = useRef(null);

  // Filter only real, valid memories
  const validPhotos = MEMORY_PHOTOS.filter((p) => p.isRealPhoto);

  // Filter memories according to selected tab
  const filteredPhotos = selectedCategory === 'all'
    ? validPhotos
    : validPhotos.filter((p) => p.category === selectedCategory);

  // Spotlight photo (Classroom Formals)
  const spotlightPhoto = validPhotos.find((p) => p.featured) || validPhotos[0];

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (photoOrIndex) => {
    globalAudioSynth.playChime();
    if (typeof photoOrIndex === 'number') {
      setActivePhotoIndex(photoOrIndex);
    } else {
      const idx = validPhotos.findIndex((p) => p.id === photoOrIndex.id);
      setActivePhotoIndex(idx !== -1 ? idx : 0);
    }
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextLightboxPhoto = (e) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % validPhotos.length);
  };

  const prevLightboxPhoto = (e) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + validPhotos.length) % validPhotos.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxPhoto();
      if (e.key === 'ArrowLeft') prevLightboxPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  // Scroll filmstrip
  const scrollFilmstrip = (direction) => {
    if (filmstripRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      filmstripRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Open hidden memory modal
  const handleOpenHiddenMemory = () => {
    globalAudioSynth.playChime();
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    setHiddenMemoryOpen(true);
  };

  const activePhoto = activePhotoIndex !== null ? validPhotos[activePhotoIndex] : null;

  return (
    <section
      id="gallery"
      className="section-padding"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #f1f5f9 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Soft Ambient Background Glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '5%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
              backgroundColor: 'rgba(124, 58, 237, 0.08)',
              border: '1px solid rgba(124, 58, 237, 0.25)',
              marginBottom: '1rem'
            }}
          >
            <Camera size={15} color="#7c3aed" />
            <span className="mono-tag" style={{ color: '#7c3aed', fontWeight: 600 }}>
              CINEMATIC MEMORY ARCHIVE // UNFILTERED
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 5.5vw, 3.6rem)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '0.85rem'
            }}
          >
            Some Memories Never <span className="gradient-text-purple">Fade ✨</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              color: '#64748b',
              fontSize: '1.08rem',
              maxWidth: '650px',
              margin: '0 auto 1.5rem',
              lineHeight: 1.6
            }}
          >
            Real snapshots from college days, formal days, classroom backbenches, and late-night mess food.
          </motion.p>

          {/* Hidden Memory Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenHiddenMemory}
            className="glass-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#b45309',
              background: 'linear-gradient(90deg, rgba(254, 243, 199, 0.9), rgba(255, 237, 213, 0.9))',
              border: '1px solid rgba(217, 119, 6, 0.35)',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(217, 119, 6, 0.15)',
              position: 'relative'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#f59e0b',
                boxShadow: '0 0 8px #f59e0b'
              }}
              className="animate-ping-radar"
            />
            <Sparkle size={15} color="#d97706" />
            <span>Click to Reveal Secret Memory 📸</span>
          </motion.button>
        </div>

        {/* 1. SPECIAL FEATURE — MEMORY SPOTLIGHT */}
        {spotlightPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              marginBottom: '5rem',
              position: 'relative'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-cinematic)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.2em',
                  color: '#7c3aed',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                SPECIAL FEATURE // MEMORY SPOTLIGHT
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginTop: '4px'
                }}
              >
                {spotlightPhoto.spotlightTitle}
              </h3>
            </div>

            {/* Cinematic Hero Frame */}
            <div
              onClick={() => openLightbox(spotlightPhoto)}
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                maxHeight: '520px',
                cursor: 'pointer',
                boxShadow: '0 25px 60px rgba(15, 23, 42, 0.15), 0 0 40px rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}
              className="group spotlight-container"
            >
              {/* Blurred background glow derived from image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${spotlightPhoto.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(30px) brightness(0.8)',
                  transform: 'scale(1.1)',
                  zIndex: 1
                }}
              />

              {/* Main Crisp Foreground Image (no face distortion!) */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(15, 23, 42, 0.35)',
                  minHeight: '420px',
                  maxHeight: '520px',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={spotlightPhoto.src}
                  alt={spotlightPhoto.title}
                  style={{
                    maxHeight: '520px',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 35%',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="spotlight-image"
                />

                {/* Gradient Vignette Overlay for Text Readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(15, 23, 42, 0.9) 100%)',
                    zIndex: 3
                  }}
                />

                {/* Text Content Overlay at Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 'clamp(1.5rem, 4vw, 2.75rem)',
                    zIndex: 4,
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        padding: '4px 14px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(124, 58, 237, 0.85)',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em'
                      }}
                    >
                      {spotlightPhoto.tag}
                    </span>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        color: '#cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Calendar size={13} /> {spotlightPhoto.date}
                    </span>
                  </div>

                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                      fontWeight: 800,
                      lineHeight: 1.2,
                      color: '#ffffff',
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}
                  >
                    {spotlightPhoto.title}
                  </h4>

                  <p
                    style={{
                      fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                      color: '#f1f5f9',
                      maxWidth: '780px',
                      lineHeight: 1.5,
                      textShadow: '0 1px 6px rgba(0,0,0,0.6)'
                    }}
                  >
                    "{spotlightPhoto.caption}"
                  </p>

                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#93c5fd' }}>
                    <Maximize2 size={14} /> Click to expand full resolution
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. STORY-BASED PHOTO CATEGORY TABS */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '1rem'
            }}
          >
            {Object.values(MEMORY_CATEGORIES).map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    border: isActive ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                    backgroundColor: isActive ? '#7c3aed' : '#ffffff',
                    color: isActive ? '#ffffff' : '#475569',
                    boxShadow: isActive ? '0 4px 15px rgba(124, 58, 237, 0.25)' : '0 2px 6px rgba(0,0,0,0.04)'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Active Category Caption */}
          {MEMORY_CATEGORIES[selectedCategory]?.caption && (
            <motion.p
              key={selectedCategory}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: 'center',
                color: '#7c3aed',
                fontSize: '0.92rem',
                fontStyle: 'italic',
                fontWeight: 600
              }}
            >
              "{MEMORY_CATEGORIES[selectedCategory].caption}"
            </motion.p>
          )}
        </div>

        {/* 3. CINEMATIC MEMORY WALL (Masonry / Editorial Asymmetric Layout) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            padding: '1rem 0 3.5rem'
          }}
        >
          {filteredPhotos.map((photo, index) => {
            const hasError = imageErrors[photo.id];

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                  zIndex: 25,
                  transition: { duration: 0.25 }
                }}
                onClick={() => openLightbox(photo)}
                style={{
                  transform: `rotate(${photo.rotation}deg)`,
                  cursor: 'pointer',
                  position: 'relative'
                }}
                className="polaroid-wrapper"
              >
                {/* Polaroid Frame Card */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '14px 14px 22px 14px',
                    borderRadius: '8px',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08), 0 3px 10px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(226, 232, 240, 0.85)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  className="polaroid-card"
                >
                  {/* Scotch Tape Graphic at Top */}
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

                  {/* Photo Container */}
                  <div
                    style={{
                      width: '100%',
                      height: '240px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    {!photo.isVideo ? (
                      <img
                        src={hasError ? '/images/classroom-formals.jpg' : photo.src}
                        alt={photo.title}
                        loading="lazy"
                        onError={() => handleImageError(photo.id)}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: photo.objectPosition || 'center center',
                          display: 'block'
                        }}
                      />
                    ) : (
                      /* Video Preview */
                      <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0f172a' }}>
                        <video
                          src={photo.src}
                          muted
                          loop
                          playsInline
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(15, 23, 42, 0.4)'
                          }}
                        >
                          <div
                            style={{
                              width: '46px',
                              height: '46px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(124, 58, 237, 0.9)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ffffff',
                              boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
                            }}
                          >
                            <Play size={20} fill="#ffffff" style={{ marginLeft: '3px' }} />
                          </div>
                        </div>
                      </div>
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

                    {/* Hover expand button hint */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(15, 23, 42, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.25s ease'
                      }}
                      className="photo-hover-overlay"
                    >
                      <span
                        style={{
                          background: '#ffffff',
                          color: '#0f172a',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                      >
                        <Maximize2 size={13} /> {photo.isVideo ? 'Play Video' : 'View Full Image'}
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
                        fontSize: '0.8rem',
                        color: '#475569',
                        lineHeight: 1.4,
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

        {/* 4. SPECIAL FEATURE — PHOTO FILMSTRIP */}
        <div style={{ marginTop: '2rem', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Film size={18} color="#7c3aed" />
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                Memory Filmstrip // 35mm Snapshots
              </h4>
            </div>

            {/* Filmstrip Left/Right Nav Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => scrollFilmstrip('left')}
                aria-label="Scroll Filmstrip Left"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#475569',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollFilmstrip('right')}
                aria-label="Scroll Filmstrip Right"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#475569',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Filmstrip Roll Track with Perforations */}
          <div
            style={{
              background: '#0f172a',
              borderRadius: '16px',
              padding: '16px 12px',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
              position: 'relative'
            }}
          >
            {/* Top Sprocket Perforations */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 12px 10px',
                borderBottom: '1px dashed #334155'
              }}
            >
              {[...Array(16)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: '12px',
                    height: '6px',
                    borderRadius: '2px',
                    backgroundColor: '#cbd5e1',
                    opacity: 0.6
                  }}
                />
              ))}
            </div>

            {/* Horizontal Scroll Area */}
            <div
              ref={filmstripRef}
              style={{
                display: 'flex',
                gap: '16px',
                overflowX: 'auto',
                padding: '12px 6px',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              className="filmstrip-scroll"
            >
              {validPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(idx)}
                  style={{
                    flex: '0 0 170px',
                    height: '125px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    border: '2px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease'
                  }}
                  className="filmstrip-frame"
                >
                  <img
                    src={photo.thumbnail || photo.src}
                    alt={photo.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '4px 6px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {photo.tag}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Sprocket Perforations */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 12px 0',
                borderTop: '1px dashed #334155'
              }}
            >
              {[...Array(16)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: '12px',
                    height: '6px',
                    borderRadius: '2px',
                    backgroundColor: '#cbd5e1',
                    opacity: 0.6
                  }}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 5. INTERACTIVE FULL-SCREEN LIGHTBOX */}
      <AnimatePresence>
        {activePhotoIndex !== null && activePhoto && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
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
              onClick={prevLightboxPhoto}
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
              onClick={nextLightboxPhoto}
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
                maxWidth: '740px',
                width: '100%',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '16px 16px 24px 16px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
                position: 'relative'
              }}
            >
              {/* Image / Video Display Area */}
              <div
                style={{
                  width: '100%',
                  height: 'clamp(280px, 55vh, 480px)',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {!activePhoto.isVideo ? (
                  <img
                    src={imageErrors[activePhoto.id] ? '/images/classroom-formals.jpg' : activePhoto.src}
                    alt={activePhoto.title}
                    onError={() => handleImageError(activePhoto.id)}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <video
                    src={activePhoto.src}
                    controls
                    autoPlay
                    playsInline
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                )}
              </div>

              {/* Lightbox Caption & Details */}
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    color: '#7c3aed',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '6px'
                  }}
                >
                  {activePhoto.tag} • {activePhotoIndex + 1} of {validPhotos.length}
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
                  {activePhoto.title}
                </h3>

                <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '620px', margin: '0 auto' }}>
                  {activePhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. SPECIAL FEATURE — HIDDEN MEMORY MODAL */}
      <AnimatePresence>
        {hiddenMemoryOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1050,
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setHiddenMemoryOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{
                maxWidth: '500px',
                width: '100%',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(217, 119, 6, 0.35)',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.2), 0 0 35px rgba(245, 158, 11, 0.2)',
                borderRadius: '24px',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setHiddenMemoryOpen(false)}
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
                  color: '#64748b'
                }}
              >
                <X size={18} />
              </button>

              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9), rgba(254, 215, 170, 0.9))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  border: '2px solid rgba(217, 119, 6, 0.4)',
                  boxShadow: '0 4px 15px rgba(217, 119, 6, 0.2)'
                }}
              >
                <Heart size={34} color="#d97706" fill="#f59e0b" />
              </div>

              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(217, 119, 6, 0.1)',
                  color: '#b45309',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}
              >
                UNLOCKED HIDDEN MEMORY
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '1.25rem',
                  lineHeight: 1.3
                }}
              >
                A Reminder For You, Dhruv ✨
              </h3>

              <div
                style={{
                  background: '#fefce8',
                  border: '1px dashed rgba(217, 119, 6, 0.5)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginBottom: '1.25rem'
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: '1.5rem',
                    color: '#92400e',
                    fontWeight: 700,
                    lineHeight: 1.4
                  }}
                >
                  "{HIDDEN_MEMORY_DATA.message}"
                </p>
              </div>

              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {HIDDEN_MEMORY_DATA.footnote}
              </p>

              <button
                onClick={() => setHiddenMemoryOpen(false)}
                className="btn-primary btn-gold"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
              >
                Dil Se Shukriya Mere Bhai! ❤️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .polaroid-wrapper:hover .photo-hover-overlay {
          opacity: 1 !important;
        }
        .spotlight-container:hover .spotlight-image {
          transform: scale(1.04);
        }
        .filmstrip-scroll::-webkit-scrollbar {
          display: none;
        }
        .filmstrip-frame:hover {
          transform: scale(1.06);
          border-color: #a855f7 !important;
        }
      `}</style>
    </section>
  );
}
