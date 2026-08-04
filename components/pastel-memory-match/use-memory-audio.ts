"use client";

import { useCallback, useEffect, useRef } from "react";

type Sound = "tap" | "flip" | "match" | "miss" | "combo" | "complete";
type AudioOptions = {
  sfxEnabled: boolean;
  bgmEnabled: boolean;
  bgmVolume: number;
  bgmActive: boolean;
};

const BEAT_MS = 430;

export function useMemoryAudio({ sfxEnabled, bgmEnabled, bgmVolume, bgmActive }: AudioOptions) {
  const contextRef = useRef<AudioContext | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const effectsGainRef = useRef<GainNode | null>(null);
  const musicTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const musicStartedRef = useRef(false);
  const musicStepRef = useRef(0);
  const settingsRef = useRef({ sfxEnabled, bgmEnabled, bgmVolume, bgmActive });
  settingsRef.current = { sfxEnabled, bgmEnabled, bgmVolume, bgmActive };

  const ensureContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (contextRef.current) return contextRef.current;
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
    if (!AudioContextClass) return null;
    const context = new AudioContextClass();
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -22;
    compressor.knee.value = 18;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.02;
    compressor.release.value = 0.35;
    compressor.connect(context.destination);

    const effectsGain = context.createGain();
    effectsGain.gain.value = 0.26;
    effectsGain.connect(compressor);
    effectsGainRef.current = effectsGain;

    const musicGain = context.createGain();
    musicGain.gain.value = 0.0001;
    const warmth = context.createBiquadFilter();
    warmth.type = "lowpass";
    warmth.frequency.value = 3600;
    warmth.Q.value = 0.45;
    musicGain.connect(warmth);
    warmth.connect(compressor);
    musicGainRef.current = musicGain;
    contextRef.current = context;
    return context;
  }, []);

  const playMusicStep = useCallback((context: AudioContext) => {
    const destination = musicGainRef.current;
    if (!destination) return;
    const step = musicStepRef.current;
    musicStepRef.current = (step + 1) % 32;
    const now = context.currentTime + 0.018;
    const progression = [
      [261.63, 329.63, 392], [261.63, 329.63, 392],
      [349.23, 440, 523.25], [349.23, 440, 523.25],
      [392, 493.88, 587.33], [392, 493.88, 587.33],
      [329.63, 392, 493.88], [392, 493.88, 587.33],
    ];
    const melody = [
      659.25, 783.99, 880, 783.99, 698.46, 880, 783.99, 659.25,
      698.46, 783.99, 987.77, 880, 783.99, 698.46, 659.25, 783.99,
      880, 987.77, 1046.5, 987.77, 880, 783.99, 698.46, 783.99,
      659.25, 783.99, 880, 987.77, 1046.5, 987.77, 880, 783.99,
    ];
    const chord = progression[Math.floor(step / 4) % progression.length];

    const voice = (frequency: number, offset: number, length: number, peak: number, type: OscillatorType, cutoff: number) => {
      const oscillator = context.createOscillator();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      const start = now + offset;
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      filter.type = "lowpass";
      filter.frequency.value = cutoff;
      filter.Q.value = 0.35;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.014);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(destination);
      oscillator.start(start);
      oscillator.stop(start + length + 0.025);
    };

    voice(melody[step], 0, 0.25, step % 4 === 0 ? 0.038 : 0.029, "triangle", 2700);
    if (step % 2 === 0) voice(chord[0] * 0.5, 0, 0.32, 0.042, "sine", 620);
    if (step % 4 === 0) {
      chord.forEach((frequency, index) => voice(frequency, 0.025, 0.38, index === 0 ? 0.021 : 0.014, "triangle", 1500 + index * 280));
    }
    if (step % 8 === 7) voice(melody[(step + 2) % melody.length], 0.19, 0.17, 0.018, "sine", 3100);
  }, []);

  const stopBgm = useCallback(() => {
    if (musicTimerRef.current) clearInterval(musicTimerRef.current);
    musicTimerRef.current = null;
    musicStartedRef.current = false;
    musicStepRef.current = 0;
    const context = contextRef.current;
    const musicGain = musicGainRef.current;
    if (context && musicGain) {
      musicGain.gain.cancelScheduledValues(context.currentTime);
      musicGain.gain.setTargetAtTime(0.0001, context.currentTime, 0.12);
    }
  }, []);

  const startBgm = useCallback((forceActive = false, forceEnabled = false) => {
    const settings = settingsRef.current;
    if ((!settings.bgmEnabled && !forceEnabled) || (!settings.bgmActive && !forceActive) || document.hidden || musicStartedRef.current) return;
    const context = ensureContext();
    const musicGain = musicGainRef.current;
    if (!context || !musicGain) return;
    musicStartedRef.current = true;
    const begin = () => {
      if (!musicStartedRef.current || !settingsRef.current.bgmEnabled || (!settingsRef.current.bgmActive && !forceActive)) return;
      musicGain.gain.cancelScheduledValues(context.currentTime);
      musicGain.gain.setTargetAtTime(Math.max(0.015, settingsRef.current.bgmVolume * 0.3), context.currentTime, 0.08);
      playMusicStep(context);
      musicTimerRef.current = setInterval(() => {
        if (!document.hidden && settingsRef.current.bgmEnabled && settingsRef.current.bgmActive) playMusicStep(context);
      }, BEAT_MS);
    };
    if (context.state === "suspended") void context.resume().then(begin);
    else begin();
  }, [ensureContext, playMusicStep]);

  const play = useCallback((sound: Sound, combo = 0) => {
    if (!settingsRef.current.sfxEnabled || document.hidden) return;
    const context = ensureContext();
    const destination = effectsGainRef.current;
    if (!context || !destination) return;
    if (context.state === "suspended") void context.resume();
    const now = context.currentTime;
    const randomPitch = 1 + (Math.random() - 0.5) * 0.035;

    if (sound === "tap" || sound === "flip") {
      const buffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.09), context.sampleRate);
      const samples = buffer.getChannelData(0);
      for (let index = 0; index < samples.length; index += 1) samples[index] = (Math.random() * 2 - 1) * (1 - index / samples.length);
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      filter.type = sound === "tap" ? "bandpass" : "lowpass";
      filter.frequency.value = sound === "tap" ? 820 : 1150;
      filter.Q.value = 0.7;
      gain.gain.setValueAtTime(sound === "tap" ? 0.055 : 0.075, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (sound === "tap" ? 0.045 : 0.09));
      source.buffer = buffer;
      source.connect(filter);
      filter.connect(gain);
      gain.connect(destination);
      source.start(now);
      return;
    }

    const notes = sound === "complete" ? [392, 493.88, 587.33, 659.25]
      : sound === "match" ? [440, 554.37]
      : sound === "miss" ? [246.94]
      : [523.25 + Math.min(combo, 6) * 22, 659.25 + Math.min(combo, 6) * 18];
    notes.forEach((frequency, index) => {
      const noteStart = now + index * (sound === "complete" ? 0.13 : 0.08);
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = sound === "miss" ? "sine" : "triangle";
      oscillator.frequency.value = frequency * randomPitch;
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(sound === "miss" ? 0.08 : 0.12, noteStart + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + (sound === "complete" ? 0.5 : 0.24));
      oscillator.connect(gain);
      gain.connect(destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + 0.55);
    });
  }, [ensureContext]);

  useEffect(() => {
    if (!bgmEnabled || !bgmActive) stopBgm();
    else if (musicStartedRef.current && musicGainRef.current && contextRef.current) {
      musicGainRef.current.gain.setTargetAtTime(Math.max(0.015, bgmVolume * 0.32), contextRef.current.currentTime, 0.15);
    }
  }, [bgmActive, bgmEnabled, bgmVolume, stopBgm]);

  useEffect(() => {
    const onVisibility = () => {
      const context = contextRef.current;
      if (!context) return;
      if (document.hidden && context.state === "running") void context.suspend();
      else if (!document.hidden && settingsRef.current.bgmActive && settingsRef.current.bgmEnabled) {
        void context.resume();
        if (!musicStartedRef.current) startBgm();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopBgm();
      void contextRef.current?.close();
      contextRef.current = null;
    };
  }, [startBgm, stopBgm]);

  return { play, startBgm, stopBgm };
}

declare global {
  interface Window { webkitAudioContext?: typeof AudioContext }
}
