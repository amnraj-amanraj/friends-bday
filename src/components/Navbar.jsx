import React, { useState, useEffect } from 'react';
import { Sparkles, Gift, Flame, BookOpen, Image, Heart } from 'lucide-react';

export default function Navbar({ onOpenGift, onReplay }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress((totalScroll / (windowHeight || 1)) * 100);

      // Detect active section
      const sections = ['intro', 'story', 'gallery', 'letter', 'cake', 'finale'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Story', href: '#story', icon: BookOpen, id: 'story' },
    { label: 'Memories', href: '#gallery', icon: Image, id: 'gallery' },
    { label: 'Letter', href: '#letter', icon: Heart, id: 'letter' },
    { label: 'Cake', href: '#cake', icon: Flame, id: 'cake' },
  ];

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.85)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Scroll Progress Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '3px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #0284c7, #7c3aed, #d97706)',
          transition: 'width 0.1s ease',
          boxShadow: '0 0 8px rgba(124, 58, 237, 0.5)'
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Title */}
        <a
          href="#intro"
          onClick={(e) => scrollTo(e, '#intro')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#0f172a',
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            fontWeight: 800,
            letterSpacing: '0.05em'
          }}
        >
          <span style={{ color: '#0284c7' }}>&gt;</span>
          <span className="gradient-text-purple">DHruv.exe</span>
          <span
            style={{
              fontSize: '0.65rem',
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(2, 132, 199, 0.08)',
              border: '1px solid rgba(2, 132, 199, 0.25)',
              color: '#0284c7',
              marginLeft: '4px',
              fontWeight: 700
            }}
          >
            v26.11
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px'
          }}
          className="desktop-nav-menu"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? '#7c3aed' : '#475569',
                  backgroundColor: isActive ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(124, 58, 237, 0.25)' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} style={{ color: isActive ? '#7c3aed' : 'inherit' }} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right side: Secret Gift Trigger Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onOpenGift}
            className="btn-gold"
            title="Open Secret Gift"
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(217, 119, 6, 0.5)',
              color: '#ffffff',
              position: 'relative'
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                boxShadow: '0 0 6px #ef4444'
              }}
            />
            <Gift size={15} />
            <span>Secret Gift 🎁</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 680px) {
          .desktop-nav-menu {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
