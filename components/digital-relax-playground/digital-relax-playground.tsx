"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BubbleWrapGame } from "./bubble-wrap-game";
import { ColorMixGame } from "./color-mix-game";
import {
  type RelaxSound,
  useRelaxAudio,
} from "./use-relax-audio";

type GameId =
  | "bubble"
  | "magnet"
  | "sand"
  | "jelly"
  | "bottle"
  | "cat-paw"
  | "ice"
  | "color"
  | "crunch"
  | "cloud";

const games: Array<{
  id: GameId;
  title: string;
  icon: string;
  stage: number;
}> = [
  { id: "bubble", title: "디지털 버블랩", icon: "◉", stage: 1 },
  { id: "magnet", title: "액체 자석", icon: "✦", stage: 2 },
  { id: "sand", title: "모래 자르기", icon: "▱", stage: 5 },
  { id: "jelly", title: "젤리 케이크", icon: "◒", stage: 3 },
  { id: "bottle", title: "반짝이 액체 병", icon: "♢", stage: 3 },
  { id: "cat-paw", title: "고양이 발바닥", icon: "●", stage: 2 },
  { id: "ice", title: "얼음 깨기", icon: "◇", stage: 4 },
  { id: "color", title: "컬러 액체 섞기", icon: "◐", stage: 1 },
  { id: "crunch", title: "크런치 토핑", icon: "✣", stage: 4 },
  { id: "cloud", title: "구름 찢기·합치기", icon: "☁", stage: 5 },
];

const availableGames: GameId[] = ["bubble", "color"];

export function DigitalRelaxPlayground() {
  const [activeGame, setActiveGame] = useState<GameId>("bubble");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [vibrationSupported, setVibrationSupported] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [challengeRunning, setChallengeRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [resetKey, setResetKey] = useState(0);
  const lastInteractionRef = useRef(0);
  const comboTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { play, getContext } = useRelaxAudio(soundEnabled, volume);

  useEffect(() => {
    setVibrationSupported(typeof navigator.vibrate === "function");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!challengeRunning) return;
    const interval = window.setInterval(() => {
      if (document.visibilityState === "hidden") return;
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [challengeRunning]);

  useEffect(() => {
    if (!challengeRunning || timeLeft > 0) return;
    setChallengeRunning(false);
  }, [challengeRunning, timeLeft]);

  useEffect(
    () => () => {
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      if (vibrationSupported) navigator.vibrate(0);
    },
    [vibrationSupported],
  );

  const vibrate = useCallback(
    (pattern: number | number[]) => {
      if (!vibrationEnabled || !vibrationSupported) return;
      navigator.vibrate(pattern);
    },
    [vibrationEnabled, vibrationSupported],
  );

  const registerInteraction = useCallback(
    (sound: RelaxSound, special = false) => {
      const now = Date.now();
      const rapid = now - lastInteractionRef.current < 430;
      const nextCombo = rapid ? combo + 1 : 1;
      lastInteractionRef.current = now;
      setCombo(nextCombo);
      setBestCombo((current) => Math.max(current, nextCombo));
      setInteractionCount((current) => current + 1);
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => setCombo(0), 900);
      void play(sound, special ? 0.9 : 0.5);
      vibrate(special ? [12, 28, 12] : 7);
    },
    [combo, play, vibrate],
  );

  const resetAll = () => {
    setInteractionCount(0);
    setCombo(0);
    setBestCombo(0);
    setChallengeRunning(false);
    setTimeLeft(30);
    setResetKey((current) => current + 1);
  };

  return (
    <div className="relax-app">
      <details className="relax-common-settings" open>
        <summary>놀이터 공통 설정</summary>
        <div>
          <button
            type="button"
            className="button button-secondary"
            aria-pressed={soundEnabled}
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) void getContext();
            }}
          >
            {soundEnabled ? "소리 끄기" : "소리 켜기"}
          </button>
          {vibrationSupported ? (
            <button
              type="button"
              className="button button-secondary"
              aria-pressed={vibrationEnabled}
              onClick={() => setVibrationEnabled((current) => !current)}
            >
              {vibrationEnabled ? "진동 끄기" : "진동 켜기"}
            </button>
          ) : null}
          <label>
            음량 <strong>{Math.round(volume * 100)}%</strong>
            <input
              type="range"
              min="0"
              max="0.7"
              step="0.05"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
            />
          </label>
          <button type="button" className="button button-muted" onClick={resetAll}>
            전체 초기화
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              const random =
                availableGames[Math.floor(Math.random() * availableGames.length)];
              setActiveGame(random);
              setResetKey((current) => current + 1);
            }}
          >
            오늘의 랜덤 게임
          </button>
          <p>소리는 첫 터치 후 재생됩니다.</p>
        </div>
      </details>

      <section className="relax-game-picker" aria-labelledby="relax-game-picker-title">
        <div className="relax-section-heading">
          <div>
            <p className="eyebrow">CHOOSE A GAME</p>
            <h2 id="relax-game-picker-title">10가지 힐링 미니게임</h2>
          </div>
          <span>현재 1단계 · 2개 게임 이용 가능</span>
        </div>
        <div>
          {games.map((game) => {
            const available = availableGames.includes(game.id);
            return (
              <button
                type="button"
                aria-pressed={activeGame === game.id}
                disabled={!available}
                onClick={() => {
                  setActiveGame(game.id);
                  setResetKey((current) => current + 1);
                }}
                key={game.id}
              >
                <span aria-hidden="true">{game.icon}</span>
                <strong>{game.title}</strong>
                <small>{available ? "지금 플레이" : `${game.stage}단계 구현`}</small>
              </button>
            );
          })}
        </div>
      </section>

      <div className="relax-shared-stats" aria-live="polite">
        <div><span>상호작용</span><strong>{interactionCount}</strong></div>
        <div><span>현재 콤보</span><strong>{combo}</strong></div>
        <div><span>최고 콤보</span><strong>{bestCombo}</strong></div>
        <div><span>챌린지</span><strong>{challengeRunning ? `${timeLeft}초` : "대기"}</strong></div>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => {
            setInteractionCount(0);
            setCombo(0);
            setBestCombo(0);
            setTimeLeft(30);
            setChallengeRunning(true);
          }}
        >
          30초 챌린지
        </button>
      </div>

      <div key={`${activeGame}-${resetKey}`}>
        {activeGame === "bubble" ? (
          <BubbleWrapGame
            reducedMotion={reducedMotion}
            onPop={(golden) => registerInteraction(golden ? "golden" : "bubble", golden)}
          />
        ) : (
          <ColorMixGame onAction={(sound) => registerInteraction(sound)} />
        )}
      </div>

      <div className="relax-phase-note" role="note">
        <strong>1단계 구현 범위</strong>
        <p>
          공통 시스템과 버블랩·컬러 액체 섞기를 먼저 완성했습니다.
          나머지 게임은 단계별 검증 후 순서대로 활성화됩니다.
        </p>
      </div>
    </div>
  );
}
