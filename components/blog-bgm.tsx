"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode, SyntheticEvent } from "react";

const ENABLED_STORAGE_KEY = "makeon-blog-bgm-enabled";
const BGM_SOURCE = "/audio/makeon-blog-bgm.wav";
const BGM_VOLUME = 0.12;
const FADE_IN_DURATION_MS = 800;

export function BlogBgm({ children }: Readonly<{ children: ReactNode }>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);
  const enabledRef = useRef(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current !== null) {
      window.cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  }, []);

  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    cancelFade();
    const startedAt = performance.now();
    audio.volume = 0;

    const updateVolume = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / FADE_IN_DURATION_MS);
      audio.volume = BGM_VOLUME * progress;
      if (progress < 1 && !audio.paused) {
        fadeFrameRef.current = window.requestAnimationFrame(updateVolume);
      } else {
        fadeFrameRef.current = null;
      }
    };

    fadeFrameRef.current = window.requestAnimationFrame(updateVolume);
  }, [cancelFade]);

  const playBgm = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !enabledRef.current || document.visibilityState === "hidden") return;
    if (!audio.paused) {
      setPlaying(true);
      return;
    }
    if (playPromiseRef.current) return playPromiseRef.current;

    const playAttempt = audio.play()
      .then(() => {
        if (!enabledRef.current) {
          audio.pause();
          return;
        }
        fadeIn(audio);
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
      })
      .finally(() => {
        playPromiseRef.current = null;
      });

    playPromiseRef.current = playAttempt;
    return playAttempt;
  }, [fadeIn]);

  const pauseBgm = useCallback(() => {
    cancelFade();
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.volume = BGM_VOLUME;
    }
    setPlaying(false);
  }, [cancelFade]);

  useEffect(() => {
    let storedEnabled = false;
    try {
      storedEnabled = window.localStorage.getItem(ENABLED_STORAGE_KEY) === "true";
    } catch {
      // 저장소가 차단되어도 현재 페이지에서는 기본 OFF 상태로 동작합니다.
    }

    const audio = new Audio();
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = BGM_VOLUME;
    audio.src = BGM_SOURCE;
    audioRef.current = audio;
    enabledRef.current = storedEnabled;
    setEnabled(storedEnabled);

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    if (storedEnabled) void playBgm();

    return () => {
      cancelFade();
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
      playPromiseRef.current = null;
    };
  }, [cancelFade, playBgm]);

  useEffect(() => {
    if (enabled !== true || playing) return;

    const beginAfterInteraction = (event: Event) => {
      if (controlRef.current?.contains(event.target as Node)) return;
      void playBgm();
    };

    document.addEventListener("pointerdown", beginAfterInteraction, { passive: true });
    document.addEventListener("touchstart", beginAfterInteraction, { passive: true });
    document.addEventListener("click", beginAfterInteraction);
    return () => {
      document.removeEventListener("pointerdown", beginAfterInteraction);
      document.removeEventListener("touchstart", beginAfterInteraction);
      document.removeEventListener("click", beginAfterInteraction);
    };
  }, [enabled, playBgm, playing]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        pauseBgm();
      } else if (enabledRef.current) {
        void playBgm();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [pauseBgm, playBgm]);

  const toggleBgm = () => {
    const nextEnabled = !enabledRef.current;
    enabledRef.current = nextEnabled;
    setEnabled(nextEnabled);
    try {
      window.localStorage.setItem(ENABLED_STORAGE_KEY, String(nextEnabled));
    } catch {
      // 저장이 차단되어도 현재 페이지의 ON/OFF 제어는 유지됩니다.
    }

    if (nextEnabled) {
      void playBgm();
    } else {
      pauseBgm();
    }
  };

  const beginFromBlogInteraction = (event: SyntheticEvent) => {
    if (
      !enabledRef.current ||
      playing ||
      controlRef.current?.contains(event.target as Node)
    ) return;
    void playBgm();
  };

  const isEnabled = enabled === true;
  const stateLabel = isEnabled ? "BGM ON" : "BGM OFF";

  return (
    <div
      className="blog-bgm-scope"
      onClickCapture={beginFromBlogInteraction}
      onPointerDownCapture={beginFromBlogInteraction}
      onTouchStartCapture={beginFromBlogInteraction}
    >
      {children}
      <div className="blog-bgm-control" ref={controlRef}>
        <button
          className="blog-bgm-toggle"
          type="button"
          aria-label={isEnabled ? "BGM 끄기" : "BGM 켜기"}
          aria-pressed={isEnabled}
          onClick={toggleBgm}
        >
          <span className="blog-bgm-status-dot" aria-hidden="true" />
          <span aria-hidden="true">♪</span>
          <span>{stateLabel}</span>
        </button>
        <span className="sr-only" aria-live="polite">
          {playing ? "블로그 배경음악 재생 중" : isEnabled ? "사용자 동작 후 배경음악 재생 대기 중" : "블로그 배경음악 꺼짐"}
        </span>
      </div>
    </div>
  );
}
