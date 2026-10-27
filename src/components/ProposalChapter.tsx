import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { RECONSIDER_MESSAGES } from '../data/reasons';
import { playCatMeow, playCelebrationFanfare } from '../utils/audio';

interface ProposalChapterProps {
  onAccept: () => void;
}

export const ProposalChapter: React.FC<ProposalChapterProps> = ({ onAccept }) => {
  const [nahCount, setNahCount] = useState(0);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const maxNahClicks = 5;

  const hellYaaScale = 1 + nahCount * 0.24;
  const isNaahHidden = nahCount >= maxNahClicks;

  const catSpeechMessages = [
    "I have the official question! 🐾📜",
    "Wait, don't say no! 😿",
    "Look how huge the YES button is getting! 🙀",
    "My paws are literally shaking! 🐾💔",
    "Almost gone! Say YES! 😻",
    "Destiny is locked in! 💖🐾",
  ];

  const handleNah = () => {
    playCatMeow();
    const nextCount = nahCount + 1;
    setNahCount(nextCount);

    // Random dodge offset for playful interaction
    const angle = Math.random() * Math.PI * 2;
    const distance = 25 + Math.random() * 35;
    setButtonOffset({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * 15,
    });
  };

  const handleYes = () => {
    playCelebrationFanfare();

    // Multistage high-energy confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#f43f5e', '#ec4899', '#fb7185'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#fda4af', '#f472b6', '#ffffff'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#10b981', '#34d399', '#fef08a'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#e11d48', '#be185d'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#fbbf24', '#f43f5e'],
    });

    onAccept();
  };

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-start py-3 transition-all duration-500 animate-fadeIn select-none">
      {/* Top Badge */}
      <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-[11px] font-semibold tracking-wide uppercase backdrop-blur-md shadow-sm">
        <span>💌 Chapter 3</span> • <span>The Finale</span>
      </div>

      {/* Finale Statement Card */}
      <div className="w-full bg-gradient-to-br from-rose-950/80 via-slate-900/90 to-purple-950/80 border-2 border-pink-400/40 rounded-3xl p-5 backdrop-blur-xl shadow-2xl text-center relative overflow-hidden mb-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-3xl shadow-lg shadow-pink-500/30 animate-bounce mb-3">
          💌
        </div>
        <p className="font-handwriting text-2xl sm:text-3xl text-pink-200 font-bold leading-relaxed px-1">
          "100 reasons aren't enough, but I will stop here for now... you can ask me anytime for more! ❤️"
        </p>
        <p className="text-xs text-pink-300/80 mt-1.5 italic font-medium">
          And someone very special just rushed over to deliver a question...
        </p>
      </div>

      {/* Playful Proposal Arena with Cat */}
      <div className="w-full bg-slate-900/70 rounded-3xl border border-white/15 p-5 flex flex-col items-center shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Cat Visual Area */}
        <div className="relative w-full flex flex-col items-center justify-center my-1">
          {/* Cat Speech Bubble */}
          <div className="mb-2 px-3.5 py-1.5 bg-white text-slate-800 rounded-xl shadow-md border border-slate-200 text-xs font-bold whitespace-nowrap relative animate-pulse transition-all">
            <span>{catSpeechMessages[Math.min(nahCount, catSpeechMessages.length - 1)]}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-200" />
          </div>

          {/* Cute Animated Cat SVG */}
          <div className="w-28 h-28 relative transform hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={handleNah}>
            <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 120 120">
              {/* Tail with wagging hint */}
              <path
                d="M 30,85 C 10,80 5,50 20,40 C 25,36 30,55 35,75"
                fill="none"
                stroke="#f472b6"
                strokeLinecap="round"
                strokeWidth="7"
                className="animate-pulse"
              />
              {/* Body */}
              <ellipse cx="60" cy="78" fill="#fda4af" rx="32" ry="26" />
              <ellipse cx="60" cy="80" fill="#fff1f2" rx="20" ry="16" />
              {/* Heart pouch */}
              <path d="M 46,74 Q 60,92 74,74 Z" fill="#fb7185" stroke="#e11d48" strokeWidth="2" />
              {/* Cat Head */}
              <circle cx="60" cy="45" fill="#fda4af" r="22" />
              {/* Ears */}
              <polygon points="42,32 46,16 55,26" fill="#fb7185" stroke="#f43f5e" strokeWidth="1" />
              <polygon points="78,32 74,16 65,26" fill="#fb7185" stroke="#f43f5e" strokeWidth="1" />
              {/* Blush */}
              <circle cx="49" cy="49" fill="#fb7185" opacity="0.65" r="3.5" />
              <circle cx="71" cy="49" fill="#fb7185" opacity="0.65" r="3.5" />
              {/* Eyes */}
              {nahCount >= 3 ? (
                // Crying / pleading eyes
                <>
                  <path d="M 49,42 Q 52,38 55,42" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 65,42 Q 68,38 71,42" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Tears */}
                  <circle cx="48" cy="47" fill="#60a5fa" r="1.5" />
                  <circle cx="72" cy="47" fill="#60a5fa" r="1.5" />
                </>
              ) : (
                // Happy big curious eyes
                <>
                  <circle cx="52" cy="42" fill="#1e1b4b" r="3.5" />
                  <circle cx="68" cy="42" fill="#1e1b4b" r="3.5" />
                  <circle cx="51" cy="41" fill="#ffffff" r="1" />
                  <circle cx="67" cy="41" fill="#ffffff" r="1" />
                </>
              )}
              {/* Nose & Mouth */}
              <polygon points="58,47 62,47 60,50" fill="#e11d48" />
              <path
                d="M 56,51 Q 60,53 60,51 Q 60,53 64,51"
                fill="none"
                stroke="#881337"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* The Big Question Box */}
        <div className="w-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-yellow-200 text-slate-800 rounded-2xl p-4 sm:p-5 text-center shadow-lg mt-1">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-950 text-[10px] font-black tracking-wide uppercase mb-2">
            <span>💖 The Most Important Question</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            {nahCount >= maxNahClicks
              ? "Will you be my girlfriend? (It's settled!) 🌟"
              : "Will you be my girlfriend? 🥺👉👈"}
          </h3>

          <p className="text-xs font-semibold text-rose-600 mt-1 min-h-[18px] transition-all">
            {nahCount > 0
              ? RECONSIDER_MESSAGES[Math.min(nahCount - 1, RECONSIDER_MESSAGES.length - 1)]
              : "(Meri favourite person, this is for real!)"}
          </p>

          {/* Interactive Buttons Arena */}
          <div className="mt-5 flex flex-col items-center justify-center gap-3 relative min-h-[130px] overflow-visible">
            {/* HELL YAA Button (Grows on every "naah" click) */}
            <button
              onClick={handleYes}
              style={{
                transform: `scale(${hellYaaScale})`,
                boxShadow: `0 15px 35px rgba(16, 185, 129, ${Math.min(0.25 + nahCount * 0.15, 0.85)})`,
              }}
              className="z-30 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:opacity-95 active:scale-95 text-white font-extrabold text-base shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Hell yaa!</span>
              <span className="text-lg">💖</span>
            </button>

            {/* NAAH Button (Dodges, shrinks, and vanishes) */}
            {!isNaahHidden && (
              <button
                onClick={handleNah}
                style={{
                  transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px) scale(${Math.max(
                    0.6,
                    1 - nahCount * 0.08
                  )})`,
                  opacity: Math.max(0.2, 1 - nahCount * 0.18),
                }}
                className="z-10 px-5 py-2 rounded-xl bg-slate-200 hover:bg-rose-100 text-slate-700 font-bold text-xs border border-slate-300 transition-all duration-300 cursor-pointer"
              >
                <span>naah...</span>
              </button>
            )}
          </div>

          <p className="text-[10px] text-slate-400 mt-2 italic">
            {nahCount > 0
              ? `Resistance level: ${nahCount}/${maxNahClicks} (Destiny is inevitable! ✨)`
              : 'Tip: "Hell yaa" is 100% the correct answer.'}
          </p>
        </div>
      </div>
    </main>
  );
};
