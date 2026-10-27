import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Camera, Check, RotateCcw, Heart, Share2, MessageCircle } from 'lucide-react';
import { playChimeSound } from '../utils/audio';

interface CelebrationScreenProps {
  onReadAgain: () => void;
  onBackToLetter: () => void;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  onReadAgain,
  onBackToLetter,
}) => {
  const [copied, setCopied] = useState(false);

  const handleBurstMoreConfetti = () => {
    playChimeSound(1046.5);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#10b981', '#fbbf24', '#a855f7'],
    });
  };

  const handleCopyProof = () => {
    const message = "Official Proof: I said HELL YAA! 💖 Can't wait for our real-life first meeting, meri favourite person! 🌸";
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      playChimeSound(1318.5);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    "Official Update: I read all 100 reasons and I clicked HELL YAA! 💖 Can't wait for our first meeting! 🌸✨"
  )}`;

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start py-4 transition-all duration-500 animate-fadeIn select-none">
      <div className="w-full bg-slate-900/90 border-2 border-emerald-400/40 rounded-3xl p-6 backdrop-blur-xl shadow-2xl text-center relative overflow-hidden">
        {/* Glow backdrop behind emoji */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Celebration Trophy Icon */}
        <div 
          onClick={handleBurstMoreConfetti}
          className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-3xl shadow-xl shadow-emerald-500/30 animate-bounce mb-3 cursor-pointer hover:scale-110 transition-transform"
          title="Tap for more confetti!"
        >
          🎉
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Best Decision Ever!</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          YAAAAY! She Said YES! 🥳💖
        </h2>

        <p className="text-sm text-slate-300 mt-2 font-medium leading-relaxed max-w-[340px] mx-auto">
          You just made me the happiest person in the world! I can't wait for all our conversations, meeting you in real life, and everything that comes next.
        </p>

        {/* Screenshot / Proof Card */}
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-rose-950/70 to-purple-950/70 border border-pink-500/30 text-left relative overflow-hidden shadow-inner">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📸</span>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-pink-200 uppercase tracking-wide flex items-center gap-1">
                <span>Final Mission (Send Proof!):</span>
              </h4>
              <p className="text-slate-200 text-xs mt-1 leading-relaxed">
                Take a quick <span className="text-yellow-300 font-bold underline">screenshot of this screen</span> right now and send it to me so I can keep it forever! 💌
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={handleCopyProof}
              className="flex-1 py-2 px-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 active:scale-95 text-xs font-bold text-pink-200 border border-pink-400/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Proof Copied!</span>
                </>
              ) : (
                <>
                  <Camera className="w-3.5 h-3.5" />
                  <span>Copy Text Proof</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 active:scale-95 text-xs font-bold text-emerald-300 border border-emerald-400/30 flex items-center justify-center gap-1.5 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </a>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2">
          <button
            onClick={onReadAgain}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all border border-white/10 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-pink-300" />
            <span>Read 100 reasons again</span>
          </button>

          <button
            onClick={onBackToLetter}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-all border border-white/10 active:scale-95 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Re-read Chapter 1 Letter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
