
'use client';

export type SoundEffect =
  | 'click'
  | 'correct'
  | 'incorrect'
  | 'timeup'
  | 'summary'
  | 'flash';

const defaultToneUrl = 'https://files.catbox.moe/p7zmwi.wav';

const soundUrls: Record<SoundEffect, string> = {
  click: 'https://files.catbox.moe/dw2po2.wav',
  correct: 'https://files.catbox.moe/3a4v3b.wav',
  incorrect: defaultToneUrl,
  timeup: 'https://files.catbox.moe/2k30ep.wav',
  summary: 'https://files.catbox.moe/2vjgnw.wav',
  flash: 'https://files.catbox.moe/41zoqv.wav',
};

// Use a simple cache to avoid re-creating Audio objects
const audioCache: { [key in SoundEffect]?: HTMLAudioElement } = {};

export function playSound(sound: SoundEffect) {
    if (typeof window === 'undefined') {
        return; // Don't run on server
    }

    try {
        let audio = audioCache[sound];

        if (!audio) {
            // Create and cache the audio object on first play
            audio = new Audio(soundUrls[sound]);
            audio.load();
            audioCache[sound] = audio;
        }

        // Rewind and play
        audio.currentTime = 0;
        audio.play().catch(error => {
            // Autoplay was prevented. This is common before the first user interaction.
            // console.warn(`Could not play sound '${sound}':`, error);
        });
    } catch (e) {
        console.error(`Error playing sound '${sound}':`, e);
    }
}
