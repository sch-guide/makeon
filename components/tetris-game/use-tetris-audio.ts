"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Sound = "move" | "rotate" | "drop" | "line" | "tetris" | "over";

const STORAGE_KEY = "makeon-tetris-audio-v1";

export function useTetrisAudio() {
  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const bgmTimerRef = useRef<number | null>(null);
  const bgmStepRef = useRef(0);
  const soundRef = useRef(true);
  const bgmRef = useRef(true);
  const volumeRef = useRef(0.22);
  const [soundEnabled, setSoundState] = useState(true);
  const [bgmEnabled, setBgmState] = useState(true);
  const [volume, setVolumeState] = useState(0.22);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { sound?: boolean; bgm?: boolean; volume?: number };
        const sound = saved.sound !== false;
        const bgm = saved.bgm !== false;
        const nextVolume = Math.min(0.5, Math.max(0, Number(saved.volume) || 0.22));
        soundRef.current = sound;
        bgmRef.current = bgm;
        volumeRef.current = nextVolume;
        setSoundState(sound);
        setBgmState(bgm);
        setVolumeState(nextVolume);
      }
    } catch {
      // Audio remains usable when storage is unavailable.
    }
  }, []);

  const save = useCallback((next: Partial<{ sound: boolean; bgm: boolean; volume: number }>) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...(raw ? JSON.parse(raw) : {}), ...next }));
    } catch {
      // Ignore private browsing storage failures.
    }
  }, []);

  const ensureAudio = useCallback(async () => {
    const Constructor = window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Constructor) return null;
    const context = contextRef.current ?? new Constructor();
    contextRef.current = context;
    if (context.state === "suspended") await context.resume();
    if (!masterRef.current) {
      const compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -20;
      compressor.knee.value = 18;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.006;
      compressor.release.value = 0.18;
      const master = context.createGain();
      master.gain.value = volumeRef.current;
      compressor.connect(master);
      master.connect(context.destination);
      compressorRef.current = compressor;
      masterRef.current = master;
    }
    return context;
  }, []);

  const tone = useCallback(async (
    frequency: number,
    duration: number,
    peak: number,
    type: OscillatorType = "sine",
    delay = 0,
  ) => {
    const context = await ensureAudio();
    if (!context || !compressorRef.current || document.visibilityState === "hidden") return;
    const start = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency * (0.985 + Math.random() * 0.03);
    filter.type = "lowpass";
    filter.frequency.value = 1450;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(compressorRef.current);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
    oscillator.addEventListener("ended", () => {
      oscillator.disconnect();
      filter.disconnect();
      gain.disconnect();
    }, { once: true });
  }, [ensureAudio]);

  const play = useCallback((name: Sound) => {
    if (!soundRef.current) return;
    if (name === "move") void tone(132, 0.045, 0.018, "triangle");
    if (name === "rotate") void tone(215, 0.07, 0.025, "sine");
    if (name === "drop") void tone(92, 0.1, 0.045, "triangle");
    if (name === "line") [392, 494, 587].forEach((note, index) => void tone(note, 0.12, 0.027, "sine", index * 0.055));
    if (name === "tetris") [330, 440, 554, 659].forEach((note, index) => void tone(note, 0.18, 0.032, "sine", index * 0.065));
    if (name === "over") [196, 165, 131].forEach((note, index) => void tone(note, 0.2, 0.03, "triangle", index * 0.12));
  }, [tone]);

  const stopBgm = useCallback(() => {
    if (bgmTimerRef.current !== null) {
      clearInterval(bgmTimerRef.current);
      bgmTimerRef.current = null;
    }
  }, []);

  const playBgmStep = useCallback(() => {
    if (!bgmRef.current || document.visibilityState === "hidden") return;
    const melody = [
      330, 392, 440, 494, 440, 392, 330, 294,
      262, 330, 392, 440, 392, 330, 294, 247,
      294, 370, 440, 554, 494, 440, 370, 330,
      262, 294, 330, 392, 330, 294, 247, 220,
    ];
    const bass = [131, 110, 123, 98, 131, 110, 92, 98];
    const step = bgmStepRef.current++;
    void tone(melody[step % melody.length], 0.24, 0.012, "triangle");
    if (step % 2 === 0) void tone(bass[Math.floor(step / 4) % bass.length], 0.34, 0.014, "sine");
  }, [tone]);

  const startBgm = useCallback(async () => {
    if (!bgmRef.current || bgmTimerRef.current !== null) return;
    await ensureAudio();
    playBgmStep();
    bgmTimerRef.current = window.setInterval(playBgmStep, 315);
  }, [ensureAudio, playBgmStep]);

  const setSoundEnabled = useCallback((next: boolean) => {
    soundRef.current = next;
    setSoundState(next);
    save({ sound: next });
    if (next) void ensureAudio();
  }, [ensureAudio, save]);

  const setBgmEnabled = useCallback((next: boolean) => {
    bgmRef.current = next;
    setBgmState(next);
    save({ bgm: next });
    if (next) void startBgm();
    else stopBgm();
  }, [save, startBgm, stopBgm]);

  const setVolume = useCallback((next: number) => {
    const safe = Math.min(0.5, Math.max(0, next));
    volumeRef.current = safe;
    setVolumeState(safe);
    save({ volume: safe });
    const context = contextRef.current;
    if (context && masterRef.current) masterRef.current.gain.setTargetAtTime(safe, context.currentTime, 0.025);
  }, [save]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "hidden") stopBgm();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopBgm();
      void contextRef.current?.close();
    };
  }, [stopBgm]);

  return {
    soundEnabled,
    bgmEnabled,
    volume,
    setSoundEnabled,
    setBgmEnabled,
    setVolume,
    play,
    startBgm,
    stopBgm,
  };
}
