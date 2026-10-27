/**
 * Web Audio API synthesizer for romantic sound effects and ambient background melody
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Paper peel flutter sound
 */
export function playPeelSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Pink noise / filtered friction buffer
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.95 * b1 + white * 0.05;
      b2 = 0.85 * b2 + white * 0.05;
      data[i] = (b0 + b1 + b2) * 0.35;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.15);
    filter.Q.setValueAtTime(2, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);

    // Complementary soft bell chime
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.2);

    oscGain.gain.setValueAtTime(0.05, now + 0.04);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now + 0.04);
    osc.stop(now + 0.25);
  } catch {
    // Ignore audio failures if restricted
  }
}

/**
 * Sweet sparkle chime
 */
export function playChimeSound(frequency = 1046.5): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + 0.35);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch {
    //
  }
}

/**
 * Playful cat meow
 */
export function playCatMeow(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.32);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch {
    //
  }
}

/**
 * Victory fanfare when YES is pressed
 */
export function playCelebrationFanfare(): void {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.1;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    });
  } catch {
    //
  }
}

// Background music looping synthesizer
let isMusicPlaying = false;
let musicInterval: number | null = null;
let currentNoteIndex = 0;

// Romantic lullaby chord progression (Cmaj9, Am9, Fmaj7, Gsus4)
const MELODY = [
  // Cmaj9
  { notes: [261.63, 329.63, 392.00, 493.88], dur: 1.6 },
  { notes: [392.00, 493.88, 587.33], dur: 1.4 },
  // Am9
  { notes: [220.00, 261.63, 329.63, 493.88], dur: 1.6 },
  { notes: [329.63, 440.00, 523.25], dur: 1.4 },
  // Fmaj7
  { notes: [174.61, 261.63, 329.63, 349.23], dur: 1.6 },
  { notes: [329.63, 392.00, 523.25], dur: 1.4 },
  // Gsus4 -> G
  { notes: [196.00, 293.66, 392.00, 523.25], dur: 1.6 },
  { notes: [196.00, 293.66, 392.00, 493.88], dur: 1.4 },
];

export function toggleBackgroundMusic(onStateChange?: (playing: boolean) => void): boolean {
  if (isMusicPlaying) {
    stopBackgroundMusic();
    onStateChange?.(false);
    return false;
  } else {
    startBackgroundMusic();
    onStateChange?.(true);
    return true;
  }
}

export function startBackgroundMusic(): void {
  if (isMusicPlaying) return;
  isMusicPlaying = true;

  const playStep = () => {
    if (!isMusicPlaying) return;
    try {
      const ctx = getAudioContext();
      const item = MELODY[currentNoteIndex % MELODY.length];
      const now = ctx.currentTime;

      item.notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Soft, warm attack and gentle decay
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.035, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + item.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + item.dur);
      });

      currentNoteIndex++;
      musicInterval = window.setTimeout(playStep, item.dur * 1000 * 0.95);
    } catch {
      //
    }
  };

  playStep();
}

export function stopBackgroundMusic(): void {
  isMusicPlaying = false;
  if (musicInterval !== null) {
    clearTimeout(musicInterval);
    musicInterval = null;
  }
}

export function getIsMusicPlaying(): boolean {
  return isMusicPlaying;
}
