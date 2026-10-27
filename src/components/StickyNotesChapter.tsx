import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, FastForward, Heart, Sparkles, BookOpen, Layers } from 'lucide-react';
import { REASONS, NOTE_THEMES, EMOJIS } from '../data/reasons';
import { playPeelSound, playChimeSound } from '../utils/audio';

interface StickyNotesChapterProps {
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onGoToFinale: () => void;
  onOpenBrowse: () => void;
  favorites: number[];
  onToggleFavorite: (index: number) => void;
}

export const StickyNotesChapter: React.FC<StickyNotesChapterProps> = ({
  currentIndex,
  onIndexChange,
  onGoToFinale,
  onOpenBrowse,
  favorites,
  onToggleFavorite,
}) => {
  const [isPeeling, setIsPeeling] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const currentReason = REASONS[currentIndex];
  const nextReason = currentIndex < REASONS.length - 1 ? REASONS[currentIndex + 1] : null;

  const currentTheme = NOTE_THEMES[currentIndex % NOTE_THEMES.length];
  const nextTheme = NOTE_THEMES[(currentIndex + 1) % NOTE_THEMES.length];
  const currentEmoji = EMOJIS[currentIndex % EMOJIS.length];

  const isFavorite = favorites.includes(currentIndex);
  const progressPercent = Math.min(100, Math.round(((currentIndex + 1) / REASONS.length) * 100));

  const handlePeel = () => {
    if (isPeeling) return;
    setIsPeeling(true);
    playPeelSound();

    setTimeout(() => {
      if (currentIndex < REASONS.length - 1) {
        onIndexChange(currentIndex + 1);
        setIsPeeling(false);
      } else {
        setIsPeeling(false);
        onGoToFinale();
      }
    }, 420);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < REASONS.length - 1) {
      playPeelSound();
      onIndexChange(currentIndex + 1);
    } else {
      onGoToFinale();
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      playChimeSound(660);
      onIndexChange(currentIndex - 1);
    }
  };

  const handleJumpTen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    playChimeSound(990);
    const target = Math.min(REASONS.length - 1, currentIndex + 10);
    onIndexChange(target);
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handlePeel();
    } else if (diff < -40 && currentIndex > 0) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-start py-3 transition-all duration-500 animate-fadeIn select-none">
      {/* Top Header Instructions */}
      <div className="w-full text-center px-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-[11px] font-semibold tracking-wide uppercase backdrop-blur-md shadow-sm mb-1.5">
          <span>🌸 Chapter 2</span> • <span>Interactive Peel</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
          100 Reasons I Want To Be Your Boyfriend
        </h2>

        <p className="text-xs font-medium text-pink-200/90 mt-1 flex items-center justify-center gap-1.5">
          <span>Tap or drag note to peel away 🌸</span>
          <span className="font-bold text-amber-300">
            (Note {currentIndex + 1} of {REASONS.length})
          </span>
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2.5 mt-2.5 overflow-hidden p-0.5 border border-white/15">
          <div
            className="bg-gradient-to-r from-amber-300 via-rose-400 to-pink-500 h-full rounded-full transition-all duration-300 shadow-sm shadow-pink-500/40"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Sticky Note Deck Container */}
      <div 
        className="relative w-full min-h-[390px] flex items-center justify-center py-2 px-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Stack Visual Effects (paper stack depth) */}
        <div className="absolute w-[90%] h-[330px] rounded-3xl bg-amber-100/20 rotate-3 translate-y-3.5 pointer-events-none" />
        <div className="absolute w-[93%] h-[335px] rounded-3xl bg-rose-100/25 -rotate-2 translate-y-2 pointer-events-none" />

        {/* Underneath Card (Preview of next reason) */}
        <div
          className={`absolute w-[96%] min-h-[345px] rounded-3xl bg-gradient-to-br ${nextTheme.bg} border-2 ${nextTheme.border} p-5 shadow-lg flex flex-col justify-between pointer-events-none opacity-85 scale-95 translate-y-1`}
        >
          {/* Washi tape at top */}
          <div className="washi-tape w-24 h-5 mx-auto rounded-sm -mt-7 mb-1 opacity-70 flex items-center justify-center">
            <span className="text-[8px] font-bold text-amber-900/50 uppercase">Sticky Note</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold text-amber-900/60 pb-2 border-b border-amber-300/40">
            <span>{nextReason ? `Reason #${currentIndex + 2}` : 'Grand Finale'}</span>
            <span className="flex items-center gap-1">Next up ✨</span>
          </div>

          <div className="flex-1 flex items-center justify-center py-4 text-center px-2">
            <p className="font-handwriting text-2xl text-slate-800 leading-snug line-clamp-4">
              {nextReason || "You have reached the end of the notes... Tap to unveil the finale! ❤️"}
            </p>
          </div>

          <div className="text-[10px] text-center text-amber-900/50 font-medium">
            (Waiting underneath)
          </div>
        </div>

        {/* Active Top Sticky Note (Tappable & Peelable) */}
        <div
          onClick={handlePeel}
          className={`relative z-20 w-[96%] min-h-[355px] rounded-3xl bg-gradient-to-br ${currentTheme.bg} border-2 ${currentTheme.border} text-slate-800 p-5 sm:p-6 shadow-2xl flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-transform duration-150 ${
            isPeeling ? 'peel-active' : ''
          }`}
        >
          {/* Authentic Washi Tape on top center */}
          <div className="washi-tape w-28 h-6 mx-auto rounded-sm -mt-8 mb-1 shadow-sm flex items-center justify-center">
            <span className="text-[9px] font-bold text-amber-900/70 tracking-widest uppercase">
              Sticky Note
            </span>
          </div>

          {/* Note Top Header */}
          <div className="flex items-center justify-between text-xs font-bold pb-2 border-b border-amber-400/40">
            <span className={`px-2.5 py-0.5 rounded-full font-black text-xs ${currentTheme.badge} shadow-xs`}>
              #{currentIndex + 1} of 100
            </span>

            {/* Favorite / Bookmark toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playChimeSound(1200);
                  onToggleFavorite(currentIndex);
                }}
                className={`p-1.5 rounded-full transition-all ${
                  isFavorite
                    ? 'text-rose-600 bg-rose-100 scale-110'
                    : 'text-amber-800/60 hover:text-rose-500 hover:bg-amber-200/50'
                }`}
                title={isFavorite ? "Remove favorite" : "Bookmark this reason"}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
              <span className="text-[11px] font-semibold text-amber-900 flex items-center gap-1">
                Tap to peel 👆
              </span>
            </div>
          </div>

          {/* Main Reason Content */}
          <div className="flex-1 flex flex-col items-center justify-center py-5 px-1 text-center">
            <span className="text-3xl mb-2.5 transform hover:scale-125 transition-transform">
              {currentEmoji}
            </span>
            <p className="font-handwriting text-2xl sm:text-3xl text-slate-900 font-bold leading-snug tracking-wide max-w-[340px]">
              {currentReason}
            </p>
          </div>

          {/* Note Bottom Details */}
          <div className="pt-2 border-t border-amber-400/40 flex items-center justify-between text-[11px] text-amber-900/80 font-medium">
            <span className="italic flex items-center gap-1">
              <span>Written for meri favourite person</span>
            </span>
            <span className="font-bold underline decoration-amber-600 hover:text-amber-950 flex items-center gap-1">
              <span>{currentIndex === REASONS.length - 1 ? 'Go to Finale' : 'Peel next'}</span>
              <span>➔</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Navigation Controls */}
      <div className="w-full mt-3 px-2 flex items-center justify-between gap-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-xs font-bold text-slate-200 border border-white/10 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-1 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleJumpTen}
          className="px-3.5 py-2.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 active:scale-95 text-xs font-bold text-pink-300 border border-pink-400/30 flex items-center gap-1 transition-all"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>+10 Jump</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-xs font-bold text-slate-200 border border-white/10 flex items-center justify-center gap-1 transition-all"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Action links */}
      <div className="mt-3.5 flex items-center justify-center gap-4 text-xs">
        <button
          onClick={onOpenBrowse}
          className="text-pink-300/80 hover:text-pink-200 flex items-center gap-1 font-medium transition-colors"
        >
          <BookOpen className="w-3 h-3" />
          <span>Browse All 100</span>
        </button>

        <span className="text-white/20">•</span>

        <button
          onClick={onGoToFinale}
          className="text-pink-300/80 hover:text-pink-200 underline font-medium transition-colors"
        >
          Skip directly to the finale 💌
        </button>
      </div>
    </main>
  );
};
