import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MessageSquareDashed, 
  Laptop, 
  Sparkles, 
  Clock, 
  CheckCheck,
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Music2, 
  Disc3, 
  Volume2, 
  Heart,
  Radio
} from 'lucide-react';
import { TIMELINE_CHAPTERS } from '../data/storyData';
import { FRIENDSHIP_SONG } from '../data/friendshipSongData';
import { globalFriendshipEngine } from '../utils/friendshipAudioEngine';

export default function StoryTimeline() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState('chapter-1');

  // Subscribe to audio engine updates
  useEffect(() => {
    const unsubscribe = globalFriendshipEngine.subscribe((time, playing) => {
      setCurrentTime(time);
      setIsPlaying(playing);

      // Determine active chapter based on time
      const currentCh = FRIENDSHIP_SONG.chapters.find(
        (c) => time >= c.startTime && time < c.endTime
      ) || FRIENDSHIP_SONG.chapters[0];

      if (currentCh && currentCh.id !== activeChapterId) {
        setActiveChapterId(currentCh.id);
      }
    });

    return () => unsubscribe();
  }, [activeChapterId]);

  const togglePlay = () => {
    if (isPlaying) {
      globalFriendshipEngine.pause();
    } else {
      globalFriendshipEngine.start();
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    globalFriendshipEngine.seek(newTime);
  };

  const handleJumpToChapter = (chapterId) => {
    const ch = FRIENDSHIP_SONG.chapters.find((c) => c.id === chapterId);
    if (ch) {
      globalFriendshipEngine.jumpToChapter(ch.startTime);
      setActiveChapterId(chapterId);

      // Scroll to that chapter card smoothly
      const el = document.getElementById(chapterId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const activeChapterData = FRIENDSHIP_SONG.chapters.find((c) => c.id === activeChapterId) || FRIENDSHIP_SONG.chapters[0];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 size={22} />;
      case 'MessageSquareDashed':
        return <MessageSquareDashed size={22} />;
      case 'Laptop':
        return <Laptop size={22} />;
      case 'Sparkles':
        return <Sparkles size={22} />;
      default:
        return <Sparkles size={22} />;
    }
  };

  return (
    <section
      id="story"
      className="section-padding"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)',
        overflow: 'hidden'
      }}
    >
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
              padding: '6px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(124, 58, 237, 0.08)',
              border: '1px solid rgba(124, 58, 237, 0.25)',
              marginBottom: '1rem'
            }}
          >
            <Clock size={14} color="#7c3aed" />
            <span className="mono-tag" style={{ color: '#7c3aed', fontWeight: 600 }}>
              CHRONICLES OF US // 4 CHAPTERS & SOUNDTRACK
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '0.85rem'
            }}
          >
            Our Friendship <span className="gradient-text-purple">Story & Soundtrack</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              color: '#64748b',
              fontSize: '1.05rem',
              maxWidth: '650px',
              margin: '0 auto'
            }}
          >
            From stranger roommates to hackathon teammates and beyond — synchronized with our college friendship anthem.
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* DEDICATED FRIENDSHIP SONG TIMELINE PLAYER UI                   */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '880px',
            margin: '0 auto 4.5rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.94))',
            borderRadius: '24px',
            padding: '1.75rem 2rem',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            boxShadow: '0 20px 50px rgba(124, 58, 237, 0.1), 0 4px 15px rgba(0, 0, 0, 0.04)',
            position: 'relative'
          }}
        >
          {/* Header row: Album art + Track Details + Play Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: '1.25rem'
            }}
          >
            {/* Left: Album cover with real photo + spinning vinyl */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 4px 15px rgba(124, 58, 237, 0.25)',
                  border: '2px solid #7c3aed'
                }}
              >
                <img
                  src={FRIENDSHIP_SONG.coverImage}
                  alt="Friendship Cover"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {isPlaying && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(124, 58, 237, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Disc3 size={24} color="#ffffff" className="animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(124, 58, 237, 0.1)',
                      color: '#7c3aed',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em'
                    }}
                  >
                    SONG FROM MY SIDE
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    {activeChapterData.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    lineHeight: 1.2,
                    marginTop: '2px'
                  }}
                >
                  {FRIENDSHIP_SONG.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                  "{FRIENDSHIP_SONG.subtitle}"
                </p>
              </div>
            </div>

            {/* Playback Controls & Wave Visualizer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: 'auto' }}>
              {/* Dancing Equalizer Waves */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '22px' }}>
                {[1, 2, 3, 4, 5].map((bar) => (
                  <span
                    key={bar}
                    style={{
                      width: '3.5px',
                      backgroundColor: isPlaying ? '#7c3aed' : '#cbd5e1',
                      borderRadius: '2px',
                      height: isPlaying ? `${Math.floor(Math.random() * 14 + 8)}px` : '4px',
                      transition: 'height 0.2s ease',
                      animation: isPlaying ? `equalizer 1.${bar}s ease-in-out infinite alternate` : 'none'
                    }}
                  />
                ))}
              </div>

              {/* Main Play/Pause Button */}
              <button
                onClick={togglePlay}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ffffff',
                  boxShadow: '0 4px 18px rgba(124, 58, 237, 0.4)',
                  transition: 'transform 0.2s ease'
                }}
                className="hover:scale-105"
                title={isPlaying ? 'Pause Song' : 'Play Friendship Song'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>
            </div>
          </div>

          {/* Interactive Scrubbable Timeline Track */}
          <div style={{ marginBottom: '1.25rem' }}>
            <input
              type="range"
              min={0}
              max={FRIENDSHIP_SONG.totalDuration}
              value={currentTime}
              onChange={handleSeek}
              style={{
                width: '100%',
                accentColor: '#7c3aed',
                cursor: 'pointer',
                height: '6px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(FRIENDSHIP_SONG.totalDuration)}</span>
            </div>
          </div>

          {/* Chapter Quick Jump Milestones */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '8px',
              marginBottom: '1.25rem'
            }}
          >
            {FRIENDSHIP_SONG.chapters.map((ch) => {
              const isCurrent = activeChapterId === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleJumpToChapter(ch.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    background: isCurrent ? 'rgba(124, 58, 237, 0.1)' : '#ffffff',
                    border: isCurrent ? '1.5px solid #7c3aed' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: isCurrent ? '#7c3aed' : '#64748b' }}>
                      {ch.timestamp}
                    </span>
                    {isCurrent && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7c3aed' }} />
                    )}
                  </div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: isCurrent ? '#0f172a' : '#334155', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ch.tag}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Synchronized Live Lyric / Dedication Subtitle Pill */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapterData.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'linear-gradient(90deg, rgba(254, 243, 199, 0.7), rgba(243, 232, 255, 0.7))',
                border: '1px solid rgba(217, 119, 6, 0.3)',
                borderRadius: '14px',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0
                }}
              >
                <Music2 size={16} />
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.25rem', color: '#92400e', fontWeight: 700, lineHeight: 1.2 }}>
                  "{activeChapterData.lyricHindi}"
                </p>
                <p style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>
                  {activeChapterData.lyricQuote}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ============================================================== */}
        {/* TIMELINE CHAPTERS CARDS WITH AUDIO SYNC                        */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'relative',
            maxWidth: '940px',
            margin: '0 auto',
            padding: '1rem 0'
          }}
        >
          {/* Central Glowing Timeline Line */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              background: 'linear-gradient(180deg, #0284c7 0%, #6366f1 30%, #a855f7 65%, #d97706 100%)',
              boxShadow: '0 0 10px rgba(124, 58, 237, 0.3)',
              zIndex: 1
            }}
            className="timeline-central-line"
          />

          {/* Chapters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {TIMELINE_CHAPTERS.map((ch, idx) => {
              const isEven = idx % 2 === 0;
              const songChapter = FRIENDSHIP_SONG.chapters[idx] || FRIENDSHIP_SONG.chapters[0];
              const isCurrentlyActive = activeChapterId === ch.id;

              return (
                <motion.div
                  key={ch.id}
                  id={ch.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isEven ? 'flex-start' : 'flex-end',
                    width: '100%'
                  }}
                  className={`timeline-item ${isEven ? 'item-left' : 'item-right'}`}
                >
                  {/* Center Node Icon */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '28px',
                      transform: 'translateX(-50%)',
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      border: `2px solid ${isCurrentlyActive ? '#7c3aed' : ch.accentColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCurrentlyActive ? '#7c3aed' : ch.accentColor,
                      boxShadow: isCurrentlyActive
                        ? '0 0 20px rgba(124, 58, 237, 0.45)'
                        : `0 4px 15px ${ch.accentColor}33`,
                      zIndex: 3,
                      transition: 'all 0.3s ease'
                    }}
                    className="timeline-node"
                  >
                    {getIcon(ch.icon)}
                  </div>

                  {/* Card Content */}
                  <div
                    className="glass-panel timeline-card"
                    style={{
                      width: 'calc(50% - 45px)',
                      padding: '2rem 1.85rem',
                      borderRadius: '20px',
                      border: isCurrentlyActive ? '2px solid #7c3aed' : '1px solid rgba(226, 232, 240, 0.95)',
                      position: 'relative',
                      background: isCurrentlyActive
                        ? 'linear-gradient(145deg, #ffffff, #faf5ff)'
                        : 'rgba(255, 255, 255, 0.94)',
                      boxShadow: isCurrentlyActive
                        ? '0 15px 40px rgba(124, 58, 237, 0.15)'
                        : '0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {/* Chapter Header + Audio Chapter Play Trigger */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                        gap: '10px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: ch.accentColor,
                          letterSpacing: '0.1em'
                        }}
                      >
                        CHAPTER {ch.chapterNumber} • {ch.tag}
                      </span>

                      {/* Interactive Chapter Song Button */}
                      <button
                        onClick={() => handleJumpToChapter(ch.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.72rem',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          backgroundColor: isCurrentlyActive ? '#7c3aed' : `${ch.accentColor}14`,
                          color: isCurrentlyActive ? '#ffffff' : ch.accentColor,
                          border: `1px solid ${ch.accentColor}44`,
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isCurrentlyActive && isPlaying ? <Pause size={11} /> : <Play size={11} />}
                        <span>{songChapter.timestamp} Play Chapter</span>
                      </button>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.45rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        marginBottom: '0.85rem',
                        lineHeight: 1.3
                      }}
                    >
                      {ch.title}
                    </h3>

                    {/* Story Text */}
                    <p
                      style={{
                        color: '#334155',
                        fontSize: '0.98rem',
                        lineHeight: 1.65,
                        marginBottom: ch.illustrationType === 'silence' ? '1.25rem' : '1rem'
                      }}
                    >
                      {ch.story}
                    </p>

                    {/* Chapter 2 Humorous disappearing chat bubbles visual */}
                    {ch.illustrationType === 'silence' && (
                      <div
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '1rem',
                          marginBottom: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}
                      >
                        {/* Sent bubble */}
                        <div
                          style={{
                            alignSelf: 'flex-end',
                            background: '#2563eb',
                            border: '1px solid #1d4ed8',
                            padding: '6px 12px',
                            borderRadius: '12px 12px 2px 12px',
                            fontSize: '0.8rem',
                            color: '#ffffff',
                            maxWidth: '85%',
                            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
                          }}
                        >
                          "Bhai kal subah class chalna hai?"
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              gap: '4px',
                              fontSize: '0.65rem',
                              color: '#bfdbfe',
                              marginTop: '2px'
                            }}
                          >
                            11:42 PM <CheckCheck size={12} color="#ffffff" />
                          </span>
                        </div>

                        {/* Disappearing bubble */}
                        <motion.div
                          animate={{
                            opacity: [1, 0.35, 0.1, 0.35, 1],
                            scale: [1, 0.98, 0.96, 0.98, 1]
                          }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          style={{
                            alignSelf: 'flex-start',
                            background: '#e2e8f0',
                            border: '1px dashed #cbd5e1',
                            padding: '6px 12px',
                            borderRadius: '12px 12px 12px 2px',
                            fontSize: '0.8rem',
                            color: '#334155',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Dhruv is typing</span>
                          <span style={{ display: 'inline-flex', gap: '2px' }}>
                            <span className="animate-twinkle">.</span>
                            <span className="animate-twinkle" style={{ animationDelay: '0.2s' }}>.</span>
                            <span className="animate-twinkle" style={{ animationDelay: '0.4s' }}>.</span>
                          </span>
                          <span style={{ fontSize: '0.65rem', color: '#e11d48', marginLeft: 'auto', fontWeight: 600 }}>
                            (Lost to the void)
                          </span>
                        </motion.div>
                      </div>
                    )}

                    {/* Chapter 4 Continuation & Reflection */}
                    {ch.storyContinuation && (
                      <p
                        style={{
                          color: '#334155',
                          fontSize: '0.98rem',
                          lineHeight: 1.65,
                          marginBottom: '1rem'
                        }}
                      >
                        {ch.storyContinuation}
                      </p>
                    )}

                    {ch.reflection && (
                      <div
                        style={{
                          background: 'rgba(245, 158, 11, 0.12)',
                          borderLeft: '3px solid #d97706',
                          padding: '0.75rem 1rem',
                          borderRadius: '0 8px 8px 0',
                          marginBottom: '1rem'
                        }}
                      >
                        <p
                          style={{
                            color: '#92400e',
                            fontSize: '0.92rem',
                            fontStyle: 'italic',
                            lineHeight: 1.5,
                            fontWeight: 600
                          }}
                        >
                          "{ch.reflection}"
                        </p>
                      </div>
                    )}

                    {/* Chapter Friendship Soundtrack Lyric Dedicated to this step */}
                    <div
                      style={{
                        marginBottom: '1rem',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(124, 58, 237, 0.05)',
                        border: '1px dashed rgba(124, 58, 237, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Music2 size={14} color="#7c3aed" />
                      <span style={{ fontSize: '0.8rem', color: '#6d28d9', fontStyle: 'italic', fontWeight: 600 }}>
                        "{songChapter.lyricHindi}"
                      </span>
                    </div>

                    {/* Funny Caption Tag */}
                    <div
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.85rem',
                        color: ch.illustrationType === 'navrang' ? '#b45309' : '#0369a1',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>{ch.funnyCaption}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-central-line {
            left: 24px !important;
          }
          .timeline-node {
            left: 24px !important;
            transform: none !important;
            width: 38px !important;
            height: 38px !important;
          }
          .timeline-item {
            align-items: flex-start !important;
          }
          .timeline-card {
            width: calc(100% - 50px) !important;
            margin-left: 50px !important;
            padding: 1.4rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
