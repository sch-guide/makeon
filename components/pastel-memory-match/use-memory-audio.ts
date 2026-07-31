"use client";

import { useCallback, useEffect, useRef } from "react";

type Sound = "flip" | "match" | "miss" | "combo" | "complete";

export function useMemoryAudio(enabled: boolean, volume: number) {
  const contextRef = useRef<AudioContext | null>(null);

  const play = useCallback((sound: Sound, combo = 0) => {
    if (!enabled || typeof window === "undefined" || document.hidden) return;
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = contextRef.current ?? new AudioContextClass();
    contextRef.current = context;
    if (context.state === "suspended") void context.resume();

    const now = context.currentTime;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume * 0.32), now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (sound === "complete" ? 0.65 : 0.18));
    gain.connect(context.destination);

    const notes = sound === "complete" ? [523, 659, 784] : [
      sound === "flip" ? 310 + Math.random() * 25 :
      sound === "match" ? 590 : sound === "miss" ? 210 : 620 + Math.min(combo, 5) * 45,
    ];
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = sound === "miss" ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start(now + index * 0.12);
      oscillator.stop(now + index * 0.12 + 0.2);
    });
  }, [enabled, volume]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && contextRef.current?.state === "running") {
        void contextRef.current.suspend();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      void contextRef.current?.close();
      contextRef.current = null;
    };
  }, []);

  return play;
}

declare global {
  interface Window { webkitAudioContext?: typeof AudioContext }
}
