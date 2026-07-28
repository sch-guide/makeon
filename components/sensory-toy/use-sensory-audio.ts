"use client";

import { useCallback, useEffect, useRef } from "react";

export type SensoryMode = "squishy" | "slime" | "crunch" | "wax";
export type SoundPhase = "press" | "drag" | "release" | "crack" | "complete";
export type SoundStyle = "soft" | "deep" | "crisp";

type PlayOptions = {
  intensity?: number;
  topping?: string;
  force?: boolean;
};

const MAX_VOICES = 6;

export function useSensoryAudio(
  enabled: boolean,
  volume: number,
  soundStyle: SoundStyle,
) {
  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const voicesRef = useRef<Set<AudioScheduledSourceNode>>(new Set());

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
      const master = context.createGain();
      master.gain.value = Math.min(0.7, Math.max(0, volume));
      master.connect(context.destination);
      masterRef.current = master;
    }
    return context;
  }, [volume]);

  useEffect(() => {
    if (!masterRef.current || !contextRef.current) return;
    const now = contextRef.current.currentTime;
    masterRef.current.gain.cancelScheduledValues(now);
    masterRef.current.gain.linearRampToValueAtTime(
      Math.min(0.7, Math.max(0, volume)),
      now + 0.04,
    );
  }, [volume]);

  const registerVoice = useCallback((voice: AudioScheduledSourceNode) => {
    if (voicesRef.current.size >= MAX_VOICES) return false;
    voicesRef.current.add(voice);
    voice.addEventListener(
      "ended",
      () => {
        voicesRef.current.delete(voice);
        voice.disconnect();
      },
      { once: true },
    );
    return true;
  }, []);

  const createNoise = useCallback(
    (
      context: AudioContext,
      duration: number,
      filterType: BiquadFilterType,
      frequency: number,
      gainValue: number,
      startAt: number,
    ) => {
      const source = context.createBufferSource();
      if (!registerVoice(source)) return;
      const buffer = context.createBuffer(
        1,
        Math.max(1, Math.floor(context.sampleRate * duration)),
        context.sampleRate,
      );
      const data = buffer.getChannelData(0);
      for (let index = 0; index < data.length; index += 1) {
        const progress = index / data.length;
        data[index] = (Math.random() * 2 - 1) * Math.pow(1 - progress, 1.5);
      }
      source.buffer = buffer;

      const filter = context.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.value = frequency;
      filter.Q.value = 0.8;
      const gain = context.createGain();
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(gainValue, startAt + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

      source.connect(filter);
      filter.connect(gain);
      if (masterRef.current) gain.connect(masterRef.current);
      source.start(startAt);
      source.stop(startAt + duration + 0.01);
    },
    [registerVoice],
  );

  const createTone = useCallback(
    (
      context: AudioContext,
      startFrequency: number,
      endFrequency: number,
      duration: number,
      gainValue: number,
      type: OscillatorType,
      startAt: number,
    ) => {
      const oscillator = context.createOscillator();
      if (!registerVoice(oscillator)) return;
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(startFrequency, startAt);
      oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(20, endFrequency),
        startAt + duration,
      );
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(gainValue, startAt + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
      oscillator.connect(gain);
      if (masterRef.current) gain.connect(masterRef.current);
      oscillator.start(startAt);
      oscillator.stop(startAt + duration + 0.01);
    },
    [registerVoice],
  );

  const play = useCallback(
    async (
      mode: SensoryMode,
      phase: SoundPhase = "press",
      options: PlayOptions = {},
    ) => {
      if (!enabled && !options.force) return;
      const context = await getContext();
      if (!context || !masterRef.current) return;

      const intensity = Math.min(1, Math.max(0.12, options.intensity ?? 0.5));
      const variation = 0.92 + Math.random() * 0.17;
      const stylePitch =
        soundStyle === "deep" ? 0.78 : soundStyle === "crisp" ? 1.18 : 1;
      const now = context.currentTime + 0.005;

      if (mode === "squishy") {
        const releasing = phase === "release";
        createTone(
          context,
          (releasing ? 118 : 152) * variation * stylePitch,
          (releasing ? 225 : 102) * variation * stylePitch,
          0.18 + intensity * 0.1,
          0.24 + intensity * 0.12,
          "sine",
          now,
        );
        createNoise(
          context,
          0.13 + intensity * 0.08,
          "lowpass",
          520 + intensity * 180,
          0.16 + intensity * 0.1,
          now,
        );
        return;
      }

      if (mode === "slime") {
        createTone(
          context,
          (phase === "release" ? 162 : 96) * variation * stylePitch,
          (phase === "release" ? 88 : 48) * variation * stylePitch,
          phase === "drag" ? 0.24 : 0.34,
          phase === "drag" ? 0.1 : 0.2 + intensity * 0.1,
          "sine",
          now,
        );
        createNoise(
          context,
          phase === "drag" ? 0.2 : 0.29,
          "lowpass",
          360 + intensity * 220,
          phase === "drag" ? 0.08 : 0.18,
          now,
        );
        return;
      }

      if (mode === "crunch") {
        const isFlakes = options.topping === "flakes";
        const isBeads = options.topping === "beads";
        createNoise(
          context,
          0.11 + intensity * 0.1,
          isFlakes ? "bandpass" : "highpass",
          isFlakes ? 1150 : 1500 + intensity * 900,
          0.22 + intensity * 0.18,
          now,
        );
        const clicks = isBeads ? 4 : 2;
        for (let index = 0; index < clicks; index += 1) {
          const time = now + index * 0.027 + Math.random() * 0.014;
          createTone(
            context,
            (380 + Math.random() * 650) * stylePitch,
            180 * stylePitch,
            0.035,
            0.1 + intensity * 0.06,
            "triangle",
            time,
          );
        }
        return;
      }

      if (phase === "complete") {
        createTone(context, 146, 292, 0.34, 0.28, "sine", now);
        createTone(context, 220, 440, 0.28, 0.16, "sine", now + 0.07);
        return;
      }

      const crackLevel =
        phase === "crack" ? 1 : phase === "release" ? 0.66 : 0.42;
      createNoise(
        context,
        0.055 + crackLevel * 0.06,
        "highpass",
        1350 + crackLevel * 950,
        0.18 + crackLevel * 0.18,
        now,
      );
      createTone(
        context,
        (520 + crackLevel * 450) * variation * stylePitch,
        210 * stylePitch,
        0.045 + crackLevel * 0.025,
        0.08 + crackLevel * 0.08,
        "square",
        now,
      );
    },
    [createNoise, createTone, enabled, getContext, soundStyle],
  );

  useEffect(
    () => () => {
      voicesRef.current.forEach((voice) => {
        try {
          voice.stop();
        } catch {
          // The source may already have stopped.
        }
      });
      voicesRef.current.clear();
      if (contextRef.current) void contextRef.current.close();
    },
    [],
  );

  return { play, getContext };
}
