import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import ParticlesBackground from './components/ParticlesBackground';
import PasswordScreen from './components/PasswordScreen';
import Navbar from './components/Navbar';
import BirthdayIntro from './components/BirthdayIntro';
import StoryTimeline from './components/StoryTimeline';
import PhotoGallery from './components/PhotoGallery';
import PersonalLetter from './components/PersonalLetter';
import BirthdayCake from './components/BirthdayCake';
import FinalSurprise from './components/FinalSurprise';
import MusicControl from './components/MusicControl';
import GiftModal from './components/GiftModal';

import './styles/global.css';
import './styles/animations.css';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setMusicStarted(true);
  };

  const handleReplayStory = () => {
    const introEl = document.getElementById('intro');
    if (introEl) {
      introEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#ffffff] text-[#0f172a] selection:bg-purple-400 selection:text-white">
      {/* Dynamic Soft Pastel Canvas Particles Background */}
      <ParticlesBackground />

      {/* Secret Birthday Gate: Password Screen */}
      <AnimatePresence>
        {!isUnlocked && (
          <PasswordScreen onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {/* Main Birthday Experience (Visible once unlocked) */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Navigation Bar */}
          <Navbar
            onOpenGift={() => setGiftModalOpen(true)}
            onReplay={handleReplayStory}
          />

          {/* Section 2: Birthday Hero Introduction, Dhruv Portrait & Live Countdown */}
          <BirthdayIntro />

          {/* Section 3: Our Friendship Story (4 Chapters) */}
          <StoryTimeline />

          {/* Section 4: Cinematic Memory Wall & Photo Experience */}
          <PhotoGallery />

          {/* Section 5: A Small Message From My Side (Personal Letter) */}
          <PersonalLetter />

          {/* Section 6: Interactive Birthday Cake & Wish */}
          <BirthdayCake />

          {/* Section 7: Final Birthday Surprise & Grand Finale */}
          <FinalSurprise
            onReplay={handleReplayStory}
            onOpenGift={() => setGiftModalOpen(true)}
          />

          {/* Background Music Player & Volume Controller */}
          <MusicControl
            musicStarted={musicStarted}
            setMusicStarted={setMusicStarted}
          />

          {/* Hidden Surprise Reality Check Modal */}
          <GiftModal
            isOpen={giftModalOpen}
            onClose={() => setGiftModalOpen(false)}
          />
        </motion.div>
      )}
    </div>
  );
}
