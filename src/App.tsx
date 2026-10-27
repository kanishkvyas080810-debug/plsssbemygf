/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LetterChapter } from './components/LetterChapter';
import { StickyNotesChapter } from './components/StickyNotesChapter';
import { ProposalChapter } from './components/ProposalChapter';
import { CelebrationScreen } from './components/CelebrationScreen';
import { BrowseModal } from './components/BrowseModal';
import { toggleBackgroundMusic, getIsMusicPlaying, stopBackgroundMusic } from './utils/audio';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<1 | 2 | 3>(1);
  const [isCelebration, setIsCelebration] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('fav_reasons');
      return saved ? JSON.parse(saved) : [0, 4, 15, 67, 98, 99];
    } catch {
      return [0, 4, 15, 67, 98, 99];
    }
  });

  // Floating ambient hearts generator
  const [hearts, setHearts] = useState<
    Array<{ id: number; left: number; emoji: string; size: number; duration: number }>
  >([]);

  useEffect(() => {
    let heartId = 0;
    const interval = setInterval(() => {
      heartId++;
      const emojiList = ['💖', '✨', '🌸', '💕', '🌷', '💫'];
      const newHeart = {
        id: heartId,
        left: Math.random() * 92,
        emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
        size: Math.random() * 12 + 14,
        duration: Math.random() * 2.5 + 3.8,
      };

      setHearts((prev) => [...prev.slice(-15), newHeart]);
    }, 900);

    return () => {
      clearInterval(interval);
      stopBackgroundMusic();
    };
  }, []);

  const handleToggleFavorite = (index: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
      try {
        localStorage.setItem('fav_reasons', JSON.stringify(updated));
      } catch {
        //
      }
      return updated;
    });
  };

  const handleToggleMusic = () => {
    const nextState = toggleBackgroundMusic((playing) => setIsMusicPlaying(playing));
    setIsMusicPlaying(nextState);
  };

  const handleSelectChapter = (chapter: 1 | 2 | 3) => {
    setIsCelebration(false);
    setCurrentChapter(chapter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-slate-100 relative flex flex-col justify-between items-center px-3 py-2 sm:px-4 selection:bg-pink-500 selection:text-white">
      {/* Ambient Cosmic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/6 -left-12 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-12 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute top-8 right-6 text-pink-300/40 text-xl star-twinkle" style={{ animationDelay: '0.2s' }}>
          ✨
        </div>
        <div className="absolute top-36 left-4 text-amber-200/30 text-lg star-twinkle" style={{ animationDelay: '1.1s' }}>
          ⭐
        </div>
        <div className="absolute bottom-28 left-8 text-rose-300/30 text-xl star-twinkle" style={{ animationDelay: '1.8s' }}>
          ✨
        </div>
        <div className="absolute top-2/3 right-4 text-purple-300/30 text-lg star-twinkle" style={{ animationDelay: '2.3s' }}>
          ⭐
        </div>

        {/* Floating Hearts Array */}
        {hearts.map((h) => (
          <div
            key={h.id}
            className="heart-particle select-none"
            style={{
              left: `${h.left}vw`,
              bottom: '-20px',
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
            }}
          >
            {h.emoji}
          </div>
        ))}
      </div>

      {/* Mobile Max Container (390px - 430px) */}
      <div className="relative z-10 w-full max-w-[430px] flex-1 flex flex-col items-center">
        {/* Navigation Bar */}
        <Header
          currentChapter={currentChapter}
          onSelectChapter={handleSelectChapter}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          onOpenBrowse={() => setIsBrowseOpen(true)}
          favoritesCount={favorites.length}
        />

        {/* Stage Content */}
        {isCelebration ? (
          <CelebrationScreen
            onReadAgain={() => {
              setIsCelebration(false);
              setCurrentChapter(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToLetter={() => {
              setIsCelebration(false);
              setCurrentChapter(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {currentChapter === 1 && (
              <LetterChapter
                onContinue={() => {
                  setCurrentChapter(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentChapter === 2 && (
              <StickyNotesChapter
                currentIndex={currentNoteIndex}
                onIndexChange={setCurrentNoteIndex}
                onGoToFinale={() => {
                  setCurrentChapter(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenBrowse={() => setIsBrowseOpen(true)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {currentChapter === 3 && (
              <ProposalChapter
                onAccept={() => {
                  setIsCelebration(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}

        {/* Mobile Global Footer */}
        <footer className="w-full py-4 text-center text-[10px] text-slate-500 border-t border-white/5 mt-4 select-none">
          <p className="flex items-center justify-center gap-1">
            <span>Crafted with pure love for meri favourite person</span>
            <span className="text-rose-500">❤️</span>
          </p>
        </footer>
      </div>

      {/* All 100 Reasons Browse Modal */}
      <BrowseModal
        isOpen={isBrowseOpen}
        onClose={() => setIsBrowseOpen(false)}
        onSelectReason={(idx) => {
          setCurrentNoteIndex(idx);
          setCurrentChapter(2);
          setIsCelebration(false);
        }}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        currentIndex={currentNoteIndex}
      />
    </div>
  );
}
