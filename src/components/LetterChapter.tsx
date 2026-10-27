import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { playChimeSound } from '../utils/audio';

interface LetterChapterProps {
  onContinue: () => void;
}

export const LetterChapter: React.FC<LetterChapterProps> = ({ onContinue }) => {
  const handleProceed = () => {
    playChimeSound(880);
    onContinue();
  };

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-start py-4 transition-all duration-500 animate-fadeIn">
      {/* Top Chapter Badge */}
      <div className="mb-3.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-[11px] font-semibold tracking-wide uppercase backdrop-blur-md shadow-sm">
        <span>📖 Chapter 1</span> • <span>Read With Your Heart</span>
      </div>

      {/* Realistic Letter Paper Container */}
      <div className="w-full bg-[#fdfbf7] text-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative border-4 border-white/95 letter-paper overflow-hidden">
        {/* Subtle Watermark Flower in background */}
        <div className="absolute right-0 bottom-16 text-rose-100/40 text-9xl pointer-events-none select-none font-serif -z-0">
          🌸
        </div>

        {/* Vintage Stamp in top right */}
        <div className="absolute top-4 right-4 flex flex-col items-end pointer-events-none z-10 select-none">
          <div className="w-13 h-15 border-2 border-dashed border-rose-300 rounded-sm p-1 bg-rose-50/90 flex flex-col items-center justify-center text-center shadow-inner">
            <span className="text-base">🌸</span>
            <span className="text-[7.5px] font-bold uppercase text-rose-600 leading-none mt-0.5 tracking-tight">
              Air Mail
            </span>
            <span className="text-[6.5px] text-slate-400 font-mono tracking-tighter">
              100% Dil
            </span>
          </div>
          <div className="text-[7.5px] text-slate-400 mt-1 font-mono tracking-widest">
            NO. LOVE-01
          </div>
        </div>

        {/* Letter Heading */}
        <div className="pr-16 mb-4">
          <p className="text-[11px] font-bold tracking-wider text-rose-500 font-sans uppercase flex items-center gap-1">
            <span>A Letter To You</span>
          </p>
          <h1 className="font-serif-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-1">
            To the girl I've never met, but somehow feel so close to. <span className="text-rose-500 inline-block animate-pulse">❤️</span>
          </h1>
        </div>

        {/* Verbatim Letter Content with Authentically Rendered Handwriting */}
        <div className="space-y-4 text-slate-700 leading-relaxed font-handwriting text-xl sm:text-2xl pt-2 border-t border-rose-100/90 relative z-10">
          <p className="font-bold text-slate-900 text-2xl sm:text-3xl">
            Hey, meri favourite person,
          </p>

          <p className="italic text-slate-800 font-semibold text-[1.3rem]">
            You know what's strange?
          </p>

          <p>
            Hum kabhi real life mein mile hi nahi. We've never sat together, never walked beside each other, and never shared one of those little moments people usually talk about when they're falling for someone.
          </p>

          <p className="font-semibold text-rose-700 text-[1.35rem]">
            And yet, somehow, you became one of my favourite parts of life.
          </p>

          <p className="italic text-slate-800">
            Funny, isn't it?
          </p>

          <p>
            Ki ek insaan jisse tum kabhi mile bhi nahi, woh tumhare liye itna special kaise ban sakta hai?
          </p>

          <p>
            I don't know exactly when it happened. Maybe somewhere between our random conversations, your cute little replies, and those moments when I'd catch myself smiling at my phone for absolutely no reason.
          </p>

          <p className="text-slate-900 font-bold text-[1.35rem]">
            But slowly, without even realising it, I started falling for you.
          </p>

          <p>
            Tumhari woh sweet si personality, tumhara innocence, aur tumhari chhoti chhoti baatein... there's something about you that makes even an ordinary day feel beautiful.
          </p>

          <p>
            And the funniest part? You already know I like you. 😭❤️
          </p>

          <p>
            But knowing that I like you and knowing how much you mean to me are two different things.
          </p>

          <p>
            Sometimes I wonder what it'll be like when we finally meet.
          </p>

          <p>
            Will I be nervous? Probably.
          </p>

          <p>
            Will I forget everything I planned to say? Definitely.
          </p>

          <p>
            But I know one thing. I'll be genuinely happy to finally see the person who's made me smile so many times from miles away.
          </p>

          <p>
            I'm not going to promise you a perfect relationship or a fairytale ending.
          </p>

          <p>
            But I'd love to get to know you even more, be there for you, make you laugh at my stupid jokes, and turn this beautiful online connection into something even more special.
          </p>

          <p className="pt-1 font-bold text-slate-900">
            Aur ek aakhri baat...
          </p>

          {/* Special Quote Box */}
          <div className="p-4 bg-rose-50/90 rounded-2xl border border-rose-200/90 my-3 shadow-inner relative">
            <p className="text-rose-900 text-lg sm:text-xl font-bold italic leading-relaxed text-center">
              "Tumse milna abhi baaki hai, lekin tumhara meri zindagi mein aana meri favourite coincidence ban chuka hai. Aur agar kabhi kismat ne humari kahaani likhi, toh main chahta hoon uske har khoobsurat panne par tumhara naam ho."
            </p>
          </div>

          <div className="pt-2 text-slate-800 text-lg sm:text-xl space-y-1">
            <p>With a heart full of hope,</p>
            <p className="font-bold text-slate-950 text-xl sm:text-2xl leading-snug">
              The boy who hasn't met you yet, but already has a thousand reasons to smile because of you. ❤️
            </p>
          </div>
        </div>

        {/* Button to Chapter 2 */}
        <div className="mt-7 pt-4 border-t border-slate-200/90 flex flex-col gap-2.5 relative z-10">
          <button
            onClick={handleProceed}
            className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:opacity-95 active:scale-[0.98] text-white font-extrabold text-base shadow-xl shadow-pink-500/30 transition-all cursor-pointer group"
          >
            <span>Tap to see something special ✨</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform animate-pulse" />
          </button>
          
          <p className="text-center text-[11px] text-slate-400 font-medium italic">
            Turn the page 💌 • Prepared specially for you
          </p>
        </div>
      </div>
    </main>
  );
};
