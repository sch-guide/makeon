"use client";

import { useCallback, useEffect, useRef } from "react";

export type SensoryMode = "squishy" | "slime" | "crunch" | "wax";
export type SoundPhase =
  | "press"
  | "drag"
  | "release"
  | "crack"
  | "piece"
  | "complete";
export type SoundStyle = "soft" | "deep" | "crisp";

type PlayOptions = {
  intensity?: number;
  topping?: string;
  force?: boolean;
  pressDuration?: number;
  pointerSpeed?: number;
  dragDistance?: number;
  deformationAmount?: number;
  releaseVelocity?: number;
  comboSpeed?: number;
  surface?: "foam" | "gel" | "mochi" | "clear-crunch";
};

const MAX_VOICES = 6;

export function useSensoryAudio(
  enabled: boolean,
  volume: number,
  soundStyle: SoundStyle,
) {
  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const voicesRef = useRef<AudioScheduledSourceNode[]>([]);

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
    while (voicesRef.current.length >= MAX_VOICES) {
      const oldest = voicesRef.current.shift();
      if (!oldest) break;
      try {
        oldest.stop();
      } catch {
        // The oldest source may already have stopped.
      }
      oldest.disconnect();
    }
    voicesRef.current.push(voice);
    voice.addEventListener(
      "ended",
      () => {
        voicesRef.current = voicesRef.current.filter((item) => item !== voice);
        voice.disconnect();
      },
      { once: true },
    );
  }, []);

  const createNoise = useCallback(
    (
      context: AudioContext,
      duration: number,
      filterType: BiquadFilterType,
      frequency: number,
      gainValue: number,
      startAt: number,
      character: "air" | "foam" | "wet" | "dry" = "air",
    ) => {
      const source = context.createBufferSource();
      registerVoice(source);
      const buffer = context.createBuffer(
        1,
        Math.max(1, Math.floor(context.sampleRate * duration)),
        context.sampleRate,
      );
      const data = buffer.getChannelData(0);
      let smoothedNoise = 0;
      for (let index = 0; index < data.length; index += 1) {
        const progress = index / data.length;
        const rawNoise = Math.random() * 2 - 1;
        const smoothing =
          character === "wet" ? 0.92 : character === "foam" ? 0.86 : 0.72;
        smoothedNoise = smoothedNoise * smoothing + rawNoise * (1 - smoothing);
        const sourceNoise = character === "dry" ? rawNoise : smoothedNoise * 3.2;
        const attack = Math.min(1, progress / 0.045);
        const release = Math.pow(1 - progress, character === "wet" ? 0.8 : 1.45);
        data[index] = sourceNoise * attack * release;
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
      registerVoice(oscillator);
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
      const vary = () => 0.88 + Math.random() * 0.24;
      const variation = vary();
      const stylePitch =
        soundStyle === "deep" ? 0.78 : soundStyle === "crisp" ? 1.18 : 1;
      const now = context.currentTime + 0.005;

      if (mode === "squishy") {
        const releasing = phase === "release";
        const dragging = phase === "drag";
        const pressDuration = Math.min(1, (options.pressDuration ?? 0) / 1400);
        const pointerSpeed = Math.min(1, options.pointerSpeed ?? 0);
        const dragDistance = Math.min(1, (options.dragDistance ?? 0) / 90);
        const deformation = Math.min(
          1,
          options.deformationAmount ?? intensity,
        );
        const releaseVelocity = Math.min(1, options.releaseVelocity ?? 0);
        const comboSpeed = Math.min(1, options.comboSpeed ?? 0);
        const surfacePitch =
          options.surface === "foam"
            ? 0.82
            : options.surface === "gel"
              ? 1.12
              : options.surface === "clear-crunch"
                ? 1.04
                : 0.94;
        const duration = releasing
          ? 0.12 + releaseVelocity * 0.12
          : dragging
            ? 0.15 + dragDistance * 0.18
            : 0.12 + pressDuration * 0.28;
        const lowGain =
          (0.035 + deformation * 0.045) * (1 - comboSpeed * 0.22) * vary();

        // A very quiet low-frequency body layer gives weight without sounding
        // like a game oscillator.
        createTone(
          context,
          (releasing ? 92 : 76) * variation * stylePitch * surfacePitch,
          (releasing ? 134 : 58) * variation * stylePitch * surfacePitch,
          duration * vary(),
          lowGain,
          "sine",
          now,
        );

        // Air escaping from the foam/gel body.
        createNoise(
          context,
          duration * vary(),
          "lowpass",
          (350 + deformation * 230 + pointerSpeed * 90) * vary(),
          (0.12 + intensity * 0.1) * vary(),
          now,
          options.surface === "gel" ? "wet" : "air",
        );

        // Long/deep presses and drags add a moist friction layer instead of a
        // repeated electronic click.
        if (pressDuration > 0.24 || dragging || deformation > 0.68) {
          createNoise(
            context,
            (0.1 + pressDuration * 0.22 + dragDistance * 0.12) * vary(),
            "bandpass",
            (240 + pointerSpeed * 330 + deformation * 120) * vary(),
            (0.045 + deformation * 0.065) * vary(),
            now + 0.012,
            "wet",
          );
        }

        if (options.surface === "clear-crunch" && deformation > 0.5) {
          createNoise(
            context,
            (0.08 + deformation * 0.08) * vary(),
            "lowpass",
            (420 + pointerSpeed * 110) * vary(),
            (0.035 + deformation * 0.04) * vary(),
            now + 0.018,
            "foam",
          );
        }
        return;
      }

      if (mode === "slime") {
        const pointerSpeed = Math.min(1, options.pointerSpeed ?? 0);
        const dragDistance = Math.min(1, (options.dragDistance ?? 0) / 120);
        const pressDuration = Math.min(1, (options.pressDuration ?? 0) / 1800);
        const quickRelease =
          phase === "release" && (options.releaseVelocity ?? 0) > 0.55;
        createTone(
          context,
          (quickRelease ? 118 : 72) * variation * stylePitch,
          (quickRelease ? 164 : 48) * variation * stylePitch,
          (phase === "drag" ? 0.22 + dragDistance * 0.22 : 0.2) * vary(),
          (0.025 + intensity * 0.035) * vary(),
          "sine",
          now,
        );
        createNoise(
          context,
          (phase === "drag" ? 0.18 + dragDistance * 0.28 : 0.16 + pressDuration * 0.2) *
            vary(),
          "bandpass",
          (260 + pointerSpeed * 310 + intensity * 120) * vary(),
          (0.09 + intensity * 0.08) * vary(),
          now,
          "wet",
        );
        if (quickRelease) {
          createNoise(
            context,
            0.075 * vary(),
            "bandpass",
            520 * vary(),
            0.038 * vary(),
            now + 0.012,
            "wet",
          );
        }
        return;
      }

      if (mode === "crunch") {
        const isFlakes = options.topping === "flakes";
        const isBeads = options.topping === "beads";
        const pointerSpeed = Math.min(1, options.pointerSpeed ?? 0);
        const deformation = Math.min(
          1,
          options.deformationAmount ?? intensity,
        );
        createNoise(
          context,
          (0.08 + deformation * 0.12) * vary(),
          isFlakes ? "bandpass" : "highpass",
          (isFlakes ? 980 : 1250 + pointerSpeed * 720) * vary(),
          (0.11 + intensity * 0.11) * vary(),
          now,
          isFlakes ? "dry" : "foam",
        );
        createNoise(
          context,
          (0.11 + deformation * 0.08) * vary(),
          "lowpass",
          (310 + deformation * 170) * vary(),
          (0.045 + deformation * 0.05) * vary(),
          now,
          "wet",
        );
        const clicks = Math.min(4, isBeads ? 2 + Math.round(intensity * 2) : 2);
        for (let index = 0; index < clicks; index += 1) {
          const time = now + index * 0.027 + Math.random() * 0.014;
          createTone(
            context,
            (260 + Math.random() * 380) * stylePitch,
            150 * stylePitch,
            0.025 * vary(),
            (0.025 + intensity * 0.025) * vary(),
            "triangle",
            time,
          );
        }
        return;
      }

      if (phase === "piece") {
        createNoise(
          context,
          0.065 * vary(),
          "bandpass",
          680 * vary(),
          0.07 * vary(),
          now,
          "dry",
        );
        createTone(
          context,
          105 * variation,
          72 * variation,
          0.07 * vary(),
          0.025 * vary(),
          "sine",
          now,
        );
        return;
      }

      if (phase === "complete") {
        createNoise(
          context,
          0.16 * vary(),
          "bandpass",
          780 * vary(),
          0.1 * vary(),
          now,
          "dry",
        );
        createNoise(
          context,
          0.22 * vary(),
          "lowpass",
          360 * vary(),
          0.06 * vary(),
          now + 0.035,
          "foam",
        );
        return;
      }

      const crackLevel =
        phase === "crack" ? 1 : phase === "release" ? 0.66 : 0.42;
      createNoise(
        context,
        (0.045 + crackLevel * 0.055) * vary(),
        "highpass",
        (1200 + crackLevel * 900) * vary(),
        (0.11 + crackLevel * 0.12) * vary(),
        now,
        "dry",
      );
      createNoise(
        context,
        (0.035 + crackLevel * 0.04) * vary(),
        "bandpass",
        (720 + crackLevel * 420) * vary(),
        (0.055 + crackLevel * 0.055) * vary(),
        now + 0.012,
        "dry",
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
      voicesRef.current = [];
      if (contextRef.current) void contextRef.current.close();
    },
    [],
  );

  return { play, getContext };
}
