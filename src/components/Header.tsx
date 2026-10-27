import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Heart, ListMusic } from 'lucide-react';

interface HeaderProps {
  currentChapter: 1 | 2 | 3;
  onSelectChapter: (chapter: 1 | 2 | 3) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenBrowse: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentChapter,
  onSelectChapter,
  isMusicPlaying,
  onToggleMusic,
  onOpenBrowse,
  favoritesCount,
}) => {
  return (
    <header className="w-full pt-3 pb-2.5 px-3.5 flex items-center justify-between border border-white/10 backdrop-blur-xl bg-slate-950/60 rounded-2xl shadow-xl shadow-black/40 mt-1 select-none">
      {/* Sender Avatar & Title */}
      <div 
        onClick={() => onSelectChapter(1)}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-500/30 text-white text-sm transform group-hover:scale-105 transition-transform">
          💌
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider text-pink-300 font-bold flex items-center gap-1">
            Special Letter <Sparkles className="w-2.5 h-2.5 text-pink-300 inline animate-spin" style={{ animationDuration: '6s' }} />
          </span>
          <p className="text-xs font-bold text-white tracking-tight flex items-center gap-1">
            For Meri Favourite Person <span className="text-rose-400">❤️</span>
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5">
        {/* Ambient Romantic Music Toggle */}
        <button
          onClick={onToggleMusic}
          title={isMusicPlaying ? "Mute romantic melody" : "Play romantic melody"}
          className={`p-2 rounded-xl text-xs font-medium border transition-all ${
            isMusicPlaying
              ? 'bg-pink-500/25 text-pink-200 border-pink-400/40 shadow-sm shadow-pink-500/20 animate-pulse'
              : 'bg-white/5 text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
          }`}
        >
          {isMusicPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Browse 100 Reasons Button */}
        <button
          onClick={onOpenBrowse}
          title="Browse all 100 reasons"
          className="p-2 rounded-xl text-xs font-medium bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10 relative transition-all"
        >
          <BookOpen className="w-3.5 h-3.5" />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center shadow">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* Chapter Indicator Pill with fast navigation */}
        <div className="relative group">
          <button
            className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 hover:bg-white/15 text-pink-200 border border-white/15 transition-all flex items-center gap-1"
          >
            <span>Chapter {currentChapter} of 3</span>
          </button>
          
          {/* Quick switcher dropdown */}
          <div className="absolute right-0 top-full mt-1.5 w-44 p-1.5 rounded-xl bg-slate-900/95 border border-white/15 shadow-2xl backdrop-blur-xl hidden group-hover:flex flex-col gap-1 z-50">
            <button
              onClick={() => onSelectChapter(1)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                currentChapter === 1 ? 'bg-pink-500/20 text-pink-200' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <span>1. The Letter</span>
              {currentChapter === 1 && <span className="text-pink-400">●</span>}
            </button>
            <button
              onClick={() => onSelectChapter(2)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                currentChapter === 2 ? 'bg-pink-500/20 text-pink-200' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <span>2. 100 Reasons</span>
              {currentChapter === 2 && <span className="text-pink-400">●</span>}
            </button>
            <button
              onClick={() => onSelectChapter(3)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                currentChapter === 3 ? 'bg-pink-500/20 text-pink-200' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <span>3. The Question</span>
              {currentChapter === 3 && <span className="text-pink-400">●</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
