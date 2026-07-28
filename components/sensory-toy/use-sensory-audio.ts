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
  pressDuration?: number;
  pointerSpeed?: number;
  pointerVelocity?: number;
  dragDistance?: number;
  deformationAmount?: number;
  releaseVelocity?: number;
  comboInterval?: number;
  surface?: "foam" | "gel" | "mochi" | "clear-crunch";
  slimeTexture?: "chewy" | "water" | "butter" | "bouncy";
  toppings?: string[];
  waxCrackLevel?: number;
};

type NoiseCharacter = "air" | "foam" | "wet" | "soft-dry";
type ActiveVoice = {
  source: AudioScheduledSourceNode;
  gain: GainNode;
  nodes: AudioNode[];
};

const MAX_VOICES = 4;
const MAX_VOLUME = 0.6;

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

export function useSensoryAudio(
  enabled: boolean,
  volume: number,
  soundStyle: SoundStyle,
) {
  const contextRef = useRef<AudioContext | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const voicesRef = useRef<ActiveVoice[]>([]);
  const variationRef = useRef<Record<SensoryMode, number>>({
    squishy: 0,
    slime: 0,
    crunch: 0,
    wax: 0,
  });

  const getContext = useCallback(async () => {
    const AudioContextConstructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextConstructor) return null;

    const context = contextRef.current ?? new AudioContextConstructor();
    contextRef.current = context;
    if (context.state === "suspended") await context.resume();

    if (!masterRef.current || !compressorRef.current) {
      const compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -24;
      compressor.knee.value = 20;
      compressor.ratio.value = 3;
      compressor.attack.value = 0.002;
      compressor.release.value = 0.14;

      const master = context.createGain();
      master.gain.value = clamp(volume, 0, MAX_VOLUME);
      compressor.connect(master);
      master.connect(context.destination);
      compressorRef.current = compressor;
      masterRef.current = master;
    }
    return context;
  }, [volume]);

  useEffect(() => {
    if (!masterRef.current || !contextRef.current) return;
    const now = contextRef.current.currentTime;
    masterRef.current.gain.cancelScheduledValues(now);
    masterRef.current.gain.linearRampToValueAtTime(
      clamp(volume, 0, MAX_VOLUME),
      now + 0.04,
    );
  }, [volume]);

  const registerVoice = useCallback(
    (
      source: AudioScheduledSourceNode,
      gain: GainNode,
      nodes: AudioNode[],
    ) => {
      while (voicesRef.current.length >= MAX_VOICES) {
        const oldest = voicesRef.current.shift();
        if (!oldest) break;
        const context = contextRef.current;
        const now = context?.currentTime ?? 0;
        oldest.gain.gain.cancelScheduledValues(now);
        oldest.gain.gain.setTargetAtTime(0.0001, now, 0.008);
        try {
          oldest.source.stop(now + 0.03);
        } catch {
          // The oldest voice may already have ended.
        }
      }
      const activeVoice = { source, gain, nodes };
      voicesRef.current.push(activeVoice);
      source.addEventListener(
        "ended",
        () => {
          voicesRef.current = voicesRef.current.filter(
            (item) => item.source !== source,
          );
          source.disconnect();
          nodes.forEach((node) => node.disconnect());
        },
        { once: true },
      );
    },
    [],
  );

  const createNoise = useCallback(
    (
      context: AudioContext,
      duration: number,
      filterType: BiquadFilterType,
      frequency: number,
      gainValue: number,
      startAt: number,
      character: NoiseCharacter,
      resonance = 0.7,
    ) => {
      if (!compressorRef.current) return;
      const safeDuration = clamp(duration, 0.045, 0.48);
      const source = context.createBufferSource();
      const buffer = context.createBuffer(
        1,
        Math.max(1, Math.floor(context.sampleRate * safeDuration)),
        context.sampleRate,
      );
      const data = buffer.getChannelData(0);
      let smoothedNoise = 0;
      for (let index = 0; index < data.length; index += 1) {
        const progress = index / data.length;
        const rawNoise = Math.random() * 2 - 1;
        const smoothing =
          character === "wet"
            ? 0.96
            : character === "foam"
              ? 0.95
              : character === "air"
                ? 0.93
                : 0.82;
        smoothedNoise = smoothedNoise * smoothing + rawNoise * (1 - smoothing);
        const body =
          character === "soft-dry"
            ? smoothedNoise * 2.1 + rawNoise * 0.12
            : smoothedNoise * 3;
        const attack = Math.min(1, progress / 0.12);
        const release = Math.pow(
          Math.max(0, 1 - progress),
          character === "wet" ? 0.72 : 1.2,
        );
        data[index] = body * attack * release;
      }
      source.buffer = buffer;

      const filter = context.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.value = frequency;
      filter.Q.value = resonance;
      const gain = context.createGain();
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(
        Math.max(0.0002, gainValue),
        startAt + 0.018,
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + safeDuration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(compressorRef.current);
      registerVoice(source, gain, [filter, gain]);
      source.start(startAt);
      source.stop(startAt + safeDuration + 0.012);
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
      if (!compressorRef.current) return;
      const safeDuration = clamp(duration, 0.045, 0.42);
      const oscillator = context.createOscillator();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(Math.max(30, startFrequency), startAt);
      oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(30, endFrequency),
        startAt + safeDuration,
      );
      filter.type = "lowpass";
      filter.frequency.value = 720;
      filter.Q.value = 0.55;
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(
        Math.max(0.0002, gainValue),
        startAt + 0.016,
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + safeDuration);
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(compressorRef.current);
      registerVoice(oscillator, gain, [filter, gain]);
      oscillator.start(startAt);
      oscillator.stop(startAt + safeDuration + 0.012);
    },
    [registerVoice],
  );

  const playSoftBody = useCallback(
    (
      context: AudioContext,
      phase: SoundPhase,
      options: PlayOptions,
      intensity: number,
      variation: number,
      pitch: number,
      startAt: number,
      transparent = false,
    ) => {
      const pressDuration = clamp((options.pressDuration ?? 0) / 1500);
      const pointerSpeed = clamp(
        options.pointerVelocity ?? options.pointerSpeed ?? 0,
      );
      const dragDistance = clamp((options.dragDistance ?? 0) / 100);
      const deformation = clamp(options.deformationAmount ?? intensity);
      const releaseVelocity = clamp(options.releaseVelocity ?? 0);
      const rapidTap =
        (options.comboInterval ?? Number.POSITIVE_INFINITY) < 260;
      const isRelease = phase === "release";
      const isDrag = phase === "drag";
      const duration = isRelease
        ? 0.085 + releaseVelocity * 0.085
        : isDrag
          ? 0.14 + dragDistance * 0.15
          : 0.09 + pressDuration * 0.26;
      const surfacePitch =
        options.surface === "foam"
          ? 0.86
          : options.surface === "gel"
            ? 1.05
            : options.surface === "clear-crunch"
              ? 1.02
              : 0.94;

      // The audible body is a rounded compression pulse in the phone-friendly
      // mid-low range. Surface noise remains a quiet secondary layer.
      createTone(
        context,
        (isRelease ? 176 : 205) * variation * pitch * surfacePitch,
        (isRelease ? 218 : 148) * variation * pitch * surfacePitch,
        duration,
        (0.035 + deformation * 0.04) * variation * (rapidTap ? 0.86 : 1),
        "sine",
        startAt,
      );
      createNoise(
        context,
        duration * 0.92,
        "lowpass",
        (380 + deformation * 120 + pointerSpeed * 70) * variation,
        (0.018 + intensity * 0.024) * variation * (rapidTap ? 0.88 : 1),
        startAt + 0.006,
        transparent || options.surface === "gel" ? "air" : "foam",
      );

      if (!isRelease && (isDrag || pressDuration > 0.28 || deformation > 0.67)) {
        createNoise(
          context,
          0.08 + pressDuration * 0.18 + dragDistance * 0.09,
          "bandpass",
          (300 + pointerSpeed * 160 + deformation * 60) * variation,
          (0.012 + deformation * 0.016) * variation,
          startAt + 0.012,
          "wet",
          0.55,
        );
      }
    },
    [createNoise, createTone],
  );

  const play = useCallback(
    async (
      mode: SensoryMode,
      phase: SoundPhase = "press",
      options: PlayOptions = {},
    ) => {
      if (!enabled || document.visibilityState === "hidden") return;
      const context = await getContext();
      if (!context || !compressorRef.current) return;

      const intensity = clamp(options.intensity ?? 0.45, 0.1, 1);
      const variationIndex = variationRef.current[mode];
      variationRef.current[mode] = (variationIndex + 1) % 8;
      const pattern = [-0.048, 0.031, -0.019, 0.057, -0.036, 0.014, 0.043, -0.026];
      const variation =
        1 + pattern[variationIndex] + (Math.random() - 0.5) * 0.024;
      const stylePitch =
        soundStyle === "deep" ? 0.9 : soundStyle === "crisp" ? 1.06 : 1;
      const now = context.currentTime + 0.004;

      if (mode === "squishy") {
        playSoftBody(
          context,
          phase,
          options,
          intensity,
          variation,
          stylePitch,
          now,
        );
        return;
      }

      if (mode === "slime") {
        const speed = clamp(
          options.pointerVelocity ?? options.pointerSpeed ?? 0,
        );
        const distance = clamp((options.dragDistance ?? 0) / 130);
        const duration =
          phase === "drag"
            ? 0.18 + (1 - speed) * 0.16 + distance * 0.08
            : phase === "release"
              ? 0.13 + (1 - clamp(options.releaseVelocity ?? 0)) * 0.12
              : 0.14 + clamp((options.pressDuration ?? 0) / 1800) * 0.18;
        const texturePitch =
          options.slimeTexture === "water"
            ? 1.08
            : options.slimeTexture === "butter"
              ? 0.9
              : options.slimeTexture === "bouncy"
                ? 1.04
                : 0.96;
        createNoise(
          context,
          duration,
          "bandpass",
          (185 + speed * 235) * variation * texturePitch,
          (0.07 + intensity * 0.06) * variation,
          now,
          "wet",
          0.5,
        );
        createTone(
          context,
          (phase === "release" ? 194 : 168) * variation * stylePitch,
          (phase === "release" ? 152 : 126) * variation * stylePitch,
          duration * 0.9,
          (0.026 + intensity * 0.028) * variation,
          "sine",
          now,
        );
        if (phase === "drag" && speed > 0.58) {
          createNoise(
            context,
            0.065 + speed * 0.035,
            "lowpass",
            430 * variation,
            0.026 * variation,
            now + 0.018,
            "wet",
          );
        }
        return;
      }

      if (mode === "crunch") {
        playSoftBody(
          context,
          phase,
          options,
          intensity * 0.82,
          variation,
          stylePitch * 1.02,
          now,
          true,
        );

        const selected = options.toppings ?? [];
        if (selected.length === 0 || Math.random() > 0.82) return;
        const shuffled = [...selected].sort(() => Math.random() - 0.5);
        const layers = shuffled.slice(0, intensity > 0.72 && Math.random() > 0.5 ? 2 : 1);
        layers.forEach((topping, index) => {
          const offset = index * 0.028;
          const speed = clamp(options.pointerVelocity ?? options.pointerSpeed ?? 0);
          if (topping === "beads") {
            createTone(
              context,
              205 * variation,
              142 * variation,
              0.055,
              0.016 + intensity * 0.014,
              "sine",
              now + offset,
            );
          } else if (topping === "flakes") {
            createNoise(
              context,
              0.07 + intensity * 0.045,
              "bandpass",
              620 * variation,
              0.032 + intensity * 0.025,
              now + offset,
              "soft-dry",
              0.65,
            );
          } else if (topping === "foam") {
            createNoise(
              context,
              0.09 + intensity * 0.05,
              "lowpass",
              (480 + speed * 110) * variation,
              0.034 + intensity * 0.025,
              now + offset,
              "foam",
            );
          } else {
            createNoise(
              context,
              0.06 + intensity * 0.04,
              "bandpass",
              540 * variation,
              0.024 + intensity * 0.02,
              now + offset,
              "soft-dry",
              0.55,
            );
          }
        });
        return;
      }

      const waxLevel = clamp(options.waxCrackLevel ?? 0);
      if (phase === "press" || phase === "release") {
        createNoise(
          context,
          0.045 + waxLevel * 0.025,
          "bandpass",
          (470 + waxLevel * 150) * variation,
          0.026 + intensity * 0.018,
          now,
          "soft-dry",
          0.7,
        );
        return;
      }
      if (phase === "piece") {
        createNoise(
          context,
          0.075 + intensity * 0.035,
          "lowpass",
          520 * variation,
          0.038 + intensity * 0.025,
          now,
          "soft-dry",
        );
        createTone(
          context,
          102 * variation,
          70 * variation,
          0.075,
          0.012 + intensity * 0.012,
          "sine",
          now,
        );
        return;
      }

      const crackCount = phase === "complete" ? 3 : waxLevel > 0.72 ? 2 : 1;
      for (let index = 0; index < crackCount; index += 1) {
        createNoise(
          context,
          0.045 + intensity * 0.04,
          "bandpass",
          (560 + waxLevel * 220) * variation,
          (0.03 + intensity * 0.032) / Math.sqrt(crackCount),
          now + index * 0.034,
          "soft-dry",
          0.85,
        );
      }
    },
    [
      createNoise,
      createTone,
      enabled,
      getContext,
      playSoftBody,
      soundStyle,
    ],
  );

  useEffect(
    () => () => {
      voicesRef.current.forEach((voice) => {
        try {
          voice.source.stop();
        } catch {
          // The source may already have ended.
        }
        voice.source.disconnect();
        voice.nodes.forEach((node) => node.disconnect());
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
