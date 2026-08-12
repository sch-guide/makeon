"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode, SyntheticEvent } from "react";

const ENABLED_STORAGE_KEY = "makeon-blog-bgm-enabled";
const VOLUME_STORAGE_KEY = "makeon-blog-bgm-volume";
const DEFAULT_VOLUME = 0.12;
const MAX_VOLUME = 0.3;
const STEP_DURATION_MS = 1_650;

type PlaybackState = "idle" | "waiting" | "playing";

type Voice = {
  gain: GainNode;
  oscillator: OscillatorNode;
};

type BlogAudioEngine = {
  compressor: DynamicsCompressorNode;
  context: AudioContext;
  input: GainNode;
  master: GainNode;
  step: number;
  timer: number | null;
  voices: Set<Voice>;
};

const chordProgression = [
  [261.63, 329.63, 392, 493.88],
  [220, 261.63, 329.63, 392],
  [174.61, 220, 261.63, 329.63],
  [196, 246.94, 293.66, 392],
] as const;

const melody = [
  659.25, 783.99, 987.77, 783.99,
  659.25, 523.25, 659.25, 783.99,
  698.46, 659.25, 523.25, 440,
  493.88, 587.33, 659.25, 493.88,
] as const;

function getAudioContextConstructor() {
  return window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
}

function scheduleTone(
  engine: BlogAudioEngine,
  frequency: number,
  duration: number,
  peakGain: number,
  type: OscillatorType,
  delay = 0,
) {
  const { context } = engine;
  const start = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const voice = { oscillator, gain };

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.detune.setValueAtTime((Math.random() - 0.5) * 4, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peakGain, start + Math.min(0.12, duration * 0.2));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(engine.input);
  engine.voices.add(voice);

  oscillator.addEventListener("ended", () => {
    oscillator.disconnect();
    gain.disconnect();
    engine.voices.delete(voice);
  }, { once: true });

  oscillator.start(start);
  oscillator.stop(start + duration + 0.03);

  if (engine.voices.size > 24) {
    const oldest = engine.voices.values().next().value as Voice | undefined;
    if (oldest && oldest !== voice) {
      try {
        oldest.gain.gain.cancelScheduledValues(context.currentTime);
        oldest.gain.gain.setTargetAtTime(0.0001, context.currentTime, 0.03);
        oldest.oscillator.stop(context.currentTime + 0.12);
      } catch {
        // 이미 종료된 voice는 ended 이벤트에서 정리됩니다.
      }
    }
  }
}

function playMusicStep(engine: BlogAudioEngine) {
  if (document.visibilityState === "hidden") return;

  const step = engine.step;
  const chord = chordProgression[Math.floor(step / 4) % chordProgression.length];

  if (step % 4 === 0) {
    chord.forEach((frequency, index) => {
      scheduleTone(engine, frequency / 2, 6.1, 0.026 - index * 0.002, "sine", index * 0.035);
      scheduleTone(engine, frequency, 4.8, 0.008, "triangle", index * 0.04);
    });
  }

  scheduleTone(engine, melody[step % melody.length], 2.35, 0.034, "sine", 0.04);

  if (step % 8 === 6) {
    scheduleTone(engine, melody[(step + 3) % melody.length] * 2, 1.5, 0.012, "sine", 0.42);
  }

  engine.step += 1;
}

export function BlogBgm({ children }: Readonly<{ children: ReactNode }>) {
  const engineRef = useRef<BlogAudioEngine | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);
  const enabledRef = useRef(true);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const userStartedRef = useRef(false);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [playback, setPlayback] = useState<PlaybackState>("idle");
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  const stopScheduler = useCallback((fade = true) => {
    const engine = engineRef.current;
    if (!engine) return;

    if (engine.timer !== null) {
      window.clearInterval(engine.timer);
      engine.timer = null;
    }

    const now = engine.context.currentTime;
    engine.master.gain.cancelScheduledValues(now);
    if (fade) {
      engine.master.gain.setTargetAtTime(0.0001, now, 0.08);
    } else {
      engine.master.gain.setValueAtTime(0.0001, now);
    }
    setPlayback(enabledRef.current ? "waiting" : "idle");
  }, []);

  const ensureEngine = useCallback(() => {
    if (engineRef.current) return engineRef.current;
    const AudioContextConstructor = getAudioContextConstructor();
    if (!AudioContextConstructor) return null;

    const context = new AudioContextConstructor();
    const input = context.createGain();
    const highPass = context.createBiquadFilter();
    const lowPass = context.createBiquadFilter();
    const compressor = context.createDynamicsCompressor();
    const master = context.createGain();

    highPass.type = "highpass";
    highPass.frequency.value = 80;
    lowPass.type = "lowpass";
    lowPass.frequency.value = 4_200;
    lowPass.Q.value = 0.35;
    compressor.threshold.value = -25;
    compressor.knee.value = 18;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.02;
    compressor.release.value = 0.35;
    master.gain.value = 0.0001;

    input.connect(highPass);
    highPass.connect(lowPass);
    lowPass.connect(compressor);
    compressor.connect(master);
    master.connect(context.destination);

    const engine: BlogAudioEngine = {
      compressor,
      context,
      input,
      master,
      step: 0,
      timer: null,
      voices: new Set(),
    };
    engineRef.current = engine;
    return engine;
  }, []);

  const startBgm = useCallback(async () => {
    if (!enabledRef.current || document.visibilityState === "hidden") return;
    const engine = ensureEngine();
    if (!engine) {
      setPlayback("waiting");
      return;
    }

    try {
      if (engine.context.state === "suspended") await engine.context.resume();
      if (engine.context.state !== "running") {
        setPlayback("waiting");
        return;
      }

      userStartedRef.current = true;
      const now = engine.context.currentTime;
      engine.master.gain.cancelScheduledValues(now);
      engine.master.gain.setTargetAtTime(Math.max(0.0001, volumeRef.current), now, 0.18);

      if (engine.timer === null) {
        playMusicStep(engine);
        engine.timer = window.setInterval(() => playMusicStep(engine), STEP_DURATION_MS);
      }
      setPlayback("playing");
    } catch {
      setPlayback("waiting");
    }
  }, [ensureEngine]);

  useEffect(() => {
    let storedEnabled = true;
    let storedVolume = DEFAULT_VOLUME;
    try {
      storedEnabled = window.localStorage.getItem(ENABLED_STORAGE_KEY) !== "false";
      const storedVolumeValue = window.localStorage.getItem(VOLUME_STORAGE_KEY);
      if (storedVolumeValue !== null) {
        const parsedVolume = Number(storedVolumeValue);
        if (Number.isFinite(parsedVolume) && parsedVolume >= 0 && parsedVolume <= MAX_VOLUME) {
          storedVolume = parsedVolume;
        }
      }
    } catch {
      // 저장소가 차단되어도 기본 설정으로 BGM 컨트롤을 사용할 수 있습니다.
    }

    enabledRef.current = storedEnabled;
    volumeRef.current = storedVolume;
    setEnabled(storedEnabled);
    setVolume(storedVolume);
    setPlayback(storedEnabled ? "waiting" : "idle");
  }, []);

  useEffect(() => {
    if (enabled !== true || userStartedRef.current) return;
    void startBgm();
  }, [enabled, startBgm]);

  useEffect(() => {
    if (enabled === false || userStartedRef.current) return;

    const beginAfterInteraction = (event: Event) => {
      if (controlRef.current?.contains(event.target as Node)) return;
      document.removeEventListener("pointerdown", beginAfterInteraction);
      document.removeEventListener("touchstart", beginAfterInteraction);
      document.removeEventListener("click", beginAfterInteraction);
      document.removeEventListener("keydown", beginAfterInteraction);
      void startBgm();
    };

    document.addEventListener("pointerdown", beginAfterInteraction, { passive: true });
    document.addEventListener("touchstart", beginAfterInteraction, { passive: true });
    document.addEventListener("click", beginAfterInteraction);
    document.addEventListener("keydown", beginAfterInteraction);
    return () => {
      document.removeEventListener("pointerdown", beginAfterInteraction);
      document.removeEventListener("touchstart", beginAfterInteraction);
      document.removeEventListener("click", beginAfterInteraction);
      document.removeEventListener("keydown", beginAfterInteraction);
    };
  }, [enabled, startBgm]);

  useEffect(() => {
    const handleVisibility = () => {
      const engine = engineRef.current;
      if (!engine) return;
      if (document.visibilityState === "hidden") {
        stopScheduler();
        void engine.context.suspend().catch(() => undefined);
      } else if (enabledRef.current && userStartedRef.current) {
        void startBgm();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [startBgm, stopScheduler]);

  useEffect(() => () => {
    const engine = engineRef.current;
    if (!engine) return;
    if (engine.timer !== null) window.clearInterval(engine.timer);
    engine.voices.forEach(({ gain, oscillator }) => {
      try {
        gain.disconnect();
        oscillator.stop();
        oscillator.disconnect();
      } catch {
        // 이미 종료된 voice입니다.
      }
    });
    engine.voices.clear();
    engine.input.disconnect();
    engine.compressor.disconnect();
    engine.master.disconnect();
    void engine.context.close().catch(() => undefined);
    engineRef.current = null;
  }, []);

  const toggleBgm = () => {
    if (enabled === true && playback === "waiting") {
      void startBgm();
      return;
    }

    const next = enabled !== true;
    enabledRef.current = next;
    setEnabled(next);
    try {
      window.localStorage.setItem(ENABLED_STORAGE_KEY, String(next));
    } catch {
      // 저장이 차단되어도 현재 페이지의 제어는 유지됩니다.
    }

    if (next) {
      void startBgm();
    } else {
      stopScheduler();
      setPlayback("idle");
    }
  };

  const updateVolume = (nextVolume: number) => {
    const safeVolume = Math.min(MAX_VOLUME, Math.max(0, nextVolume));
    volumeRef.current = safeVolume;
    setVolume(safeVolume);
    try {
      window.localStorage.setItem(VOLUME_STORAGE_KEY, String(safeVolume));
    } catch {
      // 저장이 차단되어도 현재 음량은 바뀝니다.
    }

    const engine = engineRef.current;
    if (engine && playback === "playing") {
      engine.master.gain.setTargetAtTime(Math.max(0.0001, safeVolume), engine.context.currentTime, 0.08);
    }
  };

  const isEnabled = enabled === true;
  const isPlaying = playback === "playing";
  const stateLabel = isPlaying ? "BGM 끄기" : "BGM 켜기";

  const beginFromBlogInteraction = (event: SyntheticEvent) => {
    if (
      !enabledRef.current ||
      userStartedRef.current ||
      controlRef.current?.contains(event.target as Node)
    ) return;
    void startBgm();
  };

  return (
    <div
      className="blog-bgm-scope"
      onClickCapture={beginFromBlogInteraction}
      onKeyDownCapture={beginFromBlogInteraction}
      onPointerDownCapture={beginFromBlogInteraction}
      onTouchStartCapture={beginFromBlogInteraction}
    >
      {children}
      <div className="blog-bgm-control" ref={controlRef} role="group" aria-label="블로그 배경음악 설정">
        <button
          className="blog-bgm-toggle"
          type="button"
          aria-label={isPlaying ? "블로그 배경음악 끄기" : "블로그 배경음악 켜기"}
          aria-pressed={isPlaying}
          onClick={toggleBgm}
        >
          <span aria-hidden="true">♪</span>
          <span>{stateLabel}</span>
        </button>
        <label className="blog-bgm-volume">
          <span className="sr-only">블로그 배경음악 음량</span>
          <input
            type="range"
            min="0"
            max={MAX_VOLUME}
            step="0.01"
            value={volume}
            disabled={!isEnabled}
            onChange={(event) => updateVolume(Number(event.target.value))}
            aria-label={`블로그 배경음악 음량 ${Math.round(volume * 100)}%`}
          />
          <span aria-hidden="true">{Math.round(volume * 100)}%</span>
        </label>
        <span className="sr-only" aria-live="polite">
          {playback === "waiting" && isEnabled
            ? "첫 클릭이나 터치 후 배경음악이 재생됩니다."
            : stateLabel}
        </span>
      </div>
    </div>
  );
}
