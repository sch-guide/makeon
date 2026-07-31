"use client";

import { useCallback, useEffect, useRef } from "react";

type SoundName = "tap" | "select" | "move" | "land" | "invalid" | "complete" | "win";

type AudioEngine = {
  context: AudioContext;
  sfx: GainNode;
  music: GainNode;
  pad: BiquadFilterNode;
  loopTimer: number | null;
  nextLoopAt: number;
};

const LOOP_SECONDS = 12.8;

function makeEngine() {
  const context = new window.AudioContext();
  const master = context.createGain();
  const compressor = context.createDynamicsCompressor();
  const music = context.createGain();
  const sfx = context.createGain();
  const pad = context.createBiquadFilter();
  master.gain.value = 0.72;
  music.gain.value = 0.055;
  sfx.gain.value = 0.28;
  compressor.threshold.value = -20;
  compressor.knee.value = 18;
  compressor.ratio.value = 3;
  pad.type = "lowpass";
  pad.frequency.value = 1150;
  pad.Q.value = 0.45;
  pad.connect(music);
  music.connect(master);
  sfx.connect(master);
  master.connect(compressor).connect(context.destination);
  return { context, sfx, music, pad, loopTimer: null, nextLoopAt: 0 } satisfies AudioEngine;
}

function tone(
  context: AudioContext,
  destination: AudioNode,
  frequency: number,
  start: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine",
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.035, duration * 0.2));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.03);
}

function scheduleBgmLoop(engine: AudioEngine, start: number) {
  const { context, music, pad } = engine;

  const chords = [
    [220, 277.18, 329.63],
    [196, 246.94, 329.63],
    [174.61, 220, 261.63],
    [196, 246.94, 293.66],
  ];
  chords.forEach((chord, index) => {
    const chordStart = start + index * 3.2;
    chord.forEach((frequency, voice) => {
      tone(context, pad, frequency, chordStart, 3.35, voice === 0 ? 0.16 : 0.095, "sine");
    });
  });

  const melody = [659.25, 554.37, 493.88, 554.37, 659.25, 739.99, 659.25, 554.37];
  melody.forEach((frequency, index) => {
    const noteStart = start + 0.8 + index * 1.6;
    tone(context, music, frequency, noteStart, 0.72, index % 3 === 0 ? 0.15 : 0.095, "sine");
    tone(context, music, frequency * 2, noteStart, 0.32, 0.025, "sine");
  });
}

function startBgm(engine: AudioEngine) {
  if (engine.loopTimer !== null) return;
  engine.nextLoopAt = engine.context.currentTime + 0.08;
  scheduleBgmLoop(engine, engine.nextLoopAt);
  engine.nextLoopAt += LOOP_SECONDS;
  engine.loopTimer = window.setInterval(() => {
    if (engine.context.state !== "running") return;
    while (engine.nextLoopAt < engine.context.currentTime + 1.2) {
      scheduleBgmLoop(engine, engine.nextLoopAt);
      engine.nextLoopAt += LOOP_SECONDS;
    }
  }, 900);
}

function waterSound(engine: AudioEngine) {
  const { context, sfx } = engine;
  const duration = 0.34;
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let index = 0; index < channel.length; index += 1) {
    const fade = Math.sin((Math.PI * index) / channel.length);
    channel[index] = (Math.random() * 2 - 1) * fade;
  }
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(720, context.currentTime);
  filter.frequency.exponentialRampToValueAtTime(430, context.currentTime + duration);
  filter.Q.value = 0.8;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
  source.connect(filter).connect(gain).connect(sfx);
  source.start();
}

export function usePastelAudio(enabled: boolean) {
  const engineRef = useRef<AudioEngine | null>(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const stop = useCallback(() => {
    const engine = engineRef.current;
    engineRef.current = null;
    if (!engine) return;
    if (engine.loopTimer !== null) window.clearInterval(engine.loopTimer);
    if (engine.context.state !== "closed") void engine.context.close();
  }, []);

  const ensureEngine = useCallback(() => {
    if (!enabledRef.current || typeof window === "undefined") return null;
    const engine = engineRef.current ?? makeEngine();
    engineRef.current = engine;
    if (engine.context.state === "suspended") void engine.context.resume();
    startBgm(engine);
    return engine;
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!enabled && engine) stop();
  }, [enabled, stop]);

  useEffect(() => {
    const onVisibility = () => {
      const engine = engineRef.current;
      if (!engine) return;
      if (document.hidden && engine.context.state === "running") void engine.context.suspend();
      else if (!document.hidden && enabledRef.current && engine.context.state === "suspended") {
        void engine.context.resume();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, [stop]);

  const playSound = useCallback((name: SoundName) => {
    const engine = ensureEngine();
    if (!engine) return;
    const now = engine.context.currentTime;
    if (name === "move") {
      waterSound(engine);
      tone(engine.context, engine.sfx, 294, now, 0.23, 0.08, "sine");
      return;
    }
    if (name === "select") {
      tone(engine.context, engine.sfx, 880, now, 0.16, 0.12, "sine");
      tone(engine.context, engine.sfx, 1320, now + 0.01, 0.11, 0.04, "sine");
      return;
    }
    if (name === "tap") {
      tone(engine.context, engine.sfx, 420, now, 0.065, 0.06, "sine");
      return;
    }
    if (name === "land") {
      tone(engine.context, engine.sfx, 246.94, now, 0.14, 0.1, "sine");
      tone(engine.context, engine.sfx, 493.88, now + 0.025, 0.12, 0.04, "sine");
      return;
    }
    if (name === "invalid") {
      tone(engine.context, engine.sfx, 196, now, 0.18, 0.07, "sine");
      tone(engine.context, engine.sfx, 174.61, now + 0.06, 0.16, 0.05, "sine");
      return;
    }
    const chord = name === "win" ? [523.25, 659.25, 783.99, 1046.5] : [523.25, 659.25, 783.99];
    chord.forEach((frequency, index) => {
      tone(engine.context, engine.sfx, frequency, now + index * 0.07, name === "win" ? 0.48 : 0.3, 0.085, "sine");
    });
  }, [ensureEngine]);

  return { playSound };
}
