import React, { useState } from 'react';
import { X, Search, Heart, Sparkles, Check } from 'lucide-react';
import { REASONS } from '../data/reasons';
import { playChimeSound } from '../utils/audio';

interface BrowseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReason: (index: number) => void;
  favorites: number[];
  onToggleFavorite: (index: number) => void;
  currentIndex: number;
}

export const BrowseModal: React.FC<BrowseModalProps> = ({
  isOpen,
  onClose,
  onSelectReason,
  favorites,
  onToggleFavorite,
  currentIndex,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  if (!isOpen) return null;

  const filteredReasons = REASONS.map((text, idx) => ({ text, index: idx })).filter(
    (item) => {
      const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFav = onlyFavorites ? favorites.includes(item.index) : true;
      return matchesSearch && matchesFav;
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md max-h-[85vh] bg-slate-900 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>All 100 Reasons</span>
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            </h3>
            <p className="text-[11px] text-pink-300/80">
              {favorites.length} bookmarked as your favorites
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-3 border-b border-white/10 bg-slate-900/60 flex flex-col gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search words (e.g. smile, laugh, voice, meet)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                onlyFavorites
                  ? 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>Only Favorites ({favorites.length})</span>
            </button>

            <span className="text-[11px] text-slate-400">
              Showing {filteredReasons.length} of 100
            </span>
          </div>
        </div>

        {/* Reasons List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredReasons.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              {onlyFavorites ? "You haven't bookmarked any reasons yet! Tap ❤️ on notes you love." : "No matching reasons found."}
            </div>
          ) : (
            filteredReasons.map(({ text, index }) => {
              const isFav = favorites.includes(index);
              const isCurrent = index === currentIndex;

              return (
                <div
                  key={index}
                  onClick={() => {
                    playChimeSound(880);
                    onSelectReason(index);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                    isCurrent
                      ? 'bg-pink-500/15 border-pink-400/50 text-white shadow-sm'
                      : 'bg-slate-800/50 border-white/5 text-slate-200 hover:bg-slate-800 hover:border-white/15'
                  }`}
                >
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-black shrink-0 ${
                      isCurrent
                        ? 'bg-pink-500 text-white'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    #{index + 1}
                  </span>

                  <p className="flex-1 text-xs leading-relaxed font-sans">
                    {text}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playChimeSound(1200);
                      onToggleFavorite(index);
                    }}
                    className={`p-1 rounded-full transition-transform ${
                      isFav ? 'text-rose-500 scale-110' : 'text-slate-500 hover:text-rose-400'
                    }`}
                    title={isFav ? "Remove favorite" : "Bookmark this reason"}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-slate-950/70 text-center">
          <p className="text-[11px] text-slate-400">
            Tap any reason above to view and peel it in the sticky note deck! 💌
          </p>
        </div>
      </div>
    </div>
  );
};
