"use client";

import { useCallback, useEffect, useRef } from "react";

type SoundName = "select" | "move" | "land" | "invalid" | "complete" | "win";

export function usePastelAudio(enabled: boolean) {
  const contextRef = useRef<AudioContext | null>(null);

  const stop = useCallback(() => {
    const context = contextRef.current;
    contextRef.current = null;
    if (context && context.state !== "closed") void context.close();
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, [stop]);

  return useCallback(
    (name: SoundName) => {
      if (!enabled || typeof window === "undefined") return;
      const AudioContextClass = window.AudioContext;
      const context = contextRef.current ?? new AudioContextClass();
      contextRef.current = context;
      if (context.state === "suspended") void context.resume();

      const notes: Record<SoundName, [number, number, OscillatorType]> = {
        select: [420, 0.045, "sine"],
        move: [310, 0.11, "sine"],
        land: [230, 0.07, "triangle"],
        invalid: [185, 0.09, "sine"],
        complete: [620, 0.16, "sine"],
        win: [520, 0.32, "triangle"],
      };
      const [frequency, duration, type] = notes[name];
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      if (name === "win") oscillator.frequency.exponentialRampToValueAtTime(780, context.currentTime + duration);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration + 0.02);
    },
    [enabled],
  );
}
