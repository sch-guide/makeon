"use client";

import { useCallback, useEffect, useRef } from "react";

export type RelaxSound =
  | "bubble"
  | "golden"
  | "pour"
  | "stir"
  | "complete";

type Voice = {
  source: AudioScheduledSourceNode;
  gain: GainNode;
};

export function useRelaxAudio(enabled: boolean, volume: number) {
  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const voicesRef = useRef<Voice[]>([]);

  const getContext = useCallback(async () => {
    const AudioContextConstructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextConstructor) return null;
    const context = contextRef.current ?? new AudioContextConstructor();
    contextRef.current = context;
    if (context.state === "suspended") await context.resume();
    if (!masterRef.current) {
      const compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -22;
      compressor.knee.value = 18;
      compressor.ratio.value = 3;
      compressor.attack.value = 0.004;
      compressor.release.value = 0.16;
      const master = context.createGain();
      master.gain.value = Math.min(0.7, Math.max(0, volume));
      compressor.connect(master);
      master.connect(context.destination);
      compressorRef.current = compressor;
      masterRef.current = master;
    }
    return context;
  }, [volume]);

  useEffect(() => {
    if (!contextRef.current || !masterRef.current) return;
    const now = contextRef.current.currentTime;
    masterRef.current.gain.cancelScheduledValues(now);
    masterRef.current.gain.linearRampToValueAtTime(
      Math.min(0.7, Math.max(0, volume)),
      now + 0.04,
    );
  }, [volume]);

  const register = useCallback((source: AudioScheduledSourceNode, gain: GainNode) => {
    while (voicesRef.current.length >= 5) {
      const oldest = voicesRef.current.shift();
      if (!oldest || !contextRef.current) break;
      const now = contextRef.current.currentTime;
      oldest.gain.gain.cancelScheduledValues(now);
      oldest.gain.gain.setTargetAtTime(0.0001, now, 0.008);
      try {
        oldest.source.stop(now + 0.03);
      } catch {
        // The source may already have ended.
      }
    }
    voicesRef.current.push({ source, gain });
    source.addEventListener(
      "ended",
      () => {
        voicesRef.current = voicesRef.current.filter(
          (voice) => voice.source !== source,
        );
        source.disconnect();
        gain.disconnect();
      },
      { once: true },
    );
  }, []);

  const play = useCallback(
    async (sound: RelaxSound, intensity = 0.5) => {
      if (!enabled || document.visibilityState === "hidden") return;
      const context = await getContext();
      if (!context || !compressorRef.current) return;
      const now = context.currentTime + 0.004;
      const duration =
        sound === "pour" ? 0.34 : sound === "stir" ? 0.28 : 0.09;
      const oscillator = context.createOscillator();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      const variation = 0.95 + Math.random() * 0.1;
      oscillator.type = "sine";
      const frequencies: Record<RelaxSound, [number, number]> = {
        bubble: [220, 138],
        golden: [330, 232],
        pour: [178, 112],
        stir: [154, 124],
        complete: [262, 392],
      };
      const [start, end] = frequencies[sound];
      oscillator.frequency.setValueAtTime(start * variation, now);
      oscillator.frequency.exponentialRampToValueAtTime(end * variation, now + duration);
      filter.type = "lowpass";
      filter.frequency.value = sound === "golden" ? 820 : 560;
      filter.Q.value = 0.4;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(
        (0.035 + Math.min(1, intensity) * 0.035) * variation,
        now + 0.012,
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(compressorRef.current);
      register(oscillator, gain);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.02);
    },
    [enabled, getContext, register],
  );

  useEffect(
    () => () => {
      voicesRef.current.forEach(({ source, gain }) => {
        try {
          source.stop();
        } catch {
          // The source may already have ended.
        }
        source.disconnect();
        gain.disconnect();
      });
      voicesRef.current = [];
      compressorRef.current?.disconnect();
      masterRef.current?.disconnect();
      if (contextRef.current) void contextRef.current.close();
    },
    [],
  );

  return { play, getContext };
}
