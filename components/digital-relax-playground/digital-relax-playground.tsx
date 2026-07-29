"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BubbleWrapGame } from "./bubble-wrap-game";
import { ColorMixGame } from "./color-mix-game";
import {
  RelaxMiniGame,
  type SuiteGameId,
} from "./relax-game-suite";
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

type GamePreviewStyle = CSSProperties & {
  "--preview-x": string;
  "--preview-y": string;
};

const games: Array<{
  id: GameId;
  title: string;
  description: string;
  stage: number;
  previewX: string;
  previewY: string;
}> = [
  {
    id: "bubble",
    title: "디지털 버블랩",
    description: "반투명 젤 버블을 누르고 드래그해 연속으로 터뜨려 보세요.",
    stage: 1,
    previewX: "0%",
    previewY: "0%",
  },
  {
    id: "magnet",
    title: "액체 자석 놀이터",
    description: "손끝을 따라 유리 구슬 같은 입자들이 부드럽게 모입니다.",
    stage: 2,
    previewX: "25%",
    previewY: "0%",
  },
  {
    id: "sand",
    title: "모래 자르기 ASMR",
    description: "색색의 층이 숨은 모래 케이크를 천천히 잘라보세요.",
    stage: 5,
    previewX: "50%",
    previewY: "0%",
  },
  {
    id: "jelly",
    title: "젤리 케이크 꾸미기",
    description: "말랑한 젤리 케이크 위에 크림과 과일을 올려보세요.",
    stage: 3,
    previewX: "75%",
    previewY: "0%",
  },
  {
    id: "bottle",
    title: "반짝이 액체 병",
    description: "빛나는 구슬과 반짝이가 흐르는 나만의 병을 만듭니다.",
    stage: 3,
    previewX: "100%",
    previewY: "0%",
  },
  {
    id: "cat-paw",
    title: "고양이 발바닥",
    description: "폭신한 고양이 발 젤리를 하나씩 눌러 친해져 보세요.",
    stage: 4,
    previewX: "0%",
    previewY: "100%",
  },
  {
    id: "ice",
    title: "얼음 깨기",
    description: "푸른 얼음에 금을 내고 안쪽의 작은 보물을 찾아보세요.",
    stage: 4,
    previewX: "25%",
    previewY: "100%",
  },
  {
    id: "color",
    title: "컬러 액체 섞기",
    description: "두 색의 비율을 조절해 새로운 색과 HEX 코드를 만듭니다.",
    stage: 2,
    previewX: "50%",
    previewY: "100%",
  },
  {
    id: "crunch",
    title: "크런치 토핑 만들기",
    description: "투명 젤에 별·하트·폼볼을 넣고 천천히 섞어보세요.",
    stage: 5,
    previewX: "75%",
    previewY: "100%",
  },
  {
    id: "cloud",
    title: "구름 찢기·합치기",
    description: "하늘을 떠다니는 구름을 나누고 다시 포개어 합쳐보세요.",
    stage: 5,
    previewX: "100%",
    previewY: "100%",
  },
];

export function DigitalRelaxPlayground() {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
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
      vibrate(special ? [10, 22, 10] : 6);
    },
    [combo, play, vibrate],
  );

  const resetGame = useCallback(() => {
    setInteractionCount(0);
    setCombo(0);
    setBestCombo(0);
    setChallengeRunning(false);
    setTimeLeft(30);
    setResetKey((current) => current + 1);
  }, []);

  const openGame = (game: GameId) => {
    resetGame();
    setActiveGame(game);
  };

  if (activeGame) {
    const activeDefinition = games.find((game) => game.id === activeGame) ?? games[0];
    const activeIndex = games.findIndex((game) => game.id === activeGame) + 1;

    return (
      <div className="relax-app relax-play-view">
        <header className="relax-play-header">
          <button
            type="button"
            className="relax-back-button"
            onClick={() => setActiveGame(null)}
          >
            <span aria-hidden="true">←</span>
            게임 선택
          </button>
          <div>
            <span>GAME {String(activeIndex).padStart(2, "0")}</span>
            <h2>{activeDefinition.title}</h2>
          </div>
          <div className="relax-play-actions">
            <button
              type="button"
              aria-pressed={soundEnabled}
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) void getContext();
              }}
            >
              <span aria-hidden="true">{soundEnabled ? "♪" : "×"}</span>
              {soundEnabled ? "소리 켬" : "음소거"}
            </button>
            <button type="button" onClick={resetGame}>
              <span aria-hidden="true">↻</span>
              초기화
            </button>
          </div>
        </header>

        <div className="relax-bubble-scorebar" aria-live="polite">
          <div>
            <span>놀이 횟수</span>
            <strong>{interactionCount}</strong>
          </div>
          <div>
            <span>현재 콤보</span>
            <strong>{combo}</strong>
          </div>
          <div>
            <span>최고 콤보</span>
            <strong>{bestCombo}</strong>
          </div>
          <div>
            <span>챌린지</span>
            <strong>{challengeRunning ? `${timeLeft}초` : "준비"}</strong>
          </div>
        </div>

        <div key={resetKey}>
          {activeGame === "bubble" ? (
            <BubbleWrapGame
              reducedMotion={reducedMotion}
              onPop={(golden) =>
                registerInteraction(golden ? "golden" : "bubble", golden)
              }
            />
          ) : activeGame === "color" ? (
            <ColorMixGame onAction={(sound) => registerInteraction(sound)} />
          ) : (
            <RelaxMiniGame
              game={activeGame as SuiteGameId}
              onAction={(sound, special) => registerInteraction(sound, special)}
            />
          )}
        </div>

        <section className="relax-play-controls" aria-label="게임 설정">
          <div className="relax-sound-controls">
            <label>
              음량 <strong>{Math.round(volume * 100)}%</strong>
              <input
                type="range"
                min="0"
                max="0.6"
                step="0.05"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
              />
            </label>
            {vibrationSupported ? (
              <button
                type="button"
                aria-pressed={vibrationEnabled}
                onClick={() => setVibrationEnabled((current) => !current)}
              >
                {vibrationEnabled ? "진동 켬" : "진동 끔"}
              </button>
            ) : (
              <span>이 기기에서는 진동을 지원하지 않습니다.</span>
            )}
            <small>소리는 첫 터치 후 재생됩니다.</small>
          </div>
          <button
            type="button"
            className="button button-primary relax-challenge-button"
            onClick={() => {
              setInteractionCount(0);
              setCombo(0);
              setBestCombo(0);
              setTimeLeft(30);
              setChallengeRunning(true);
              setResetKey((current) => current + 1);
            }}
          >
            30초 챌린지 시작
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="relax-app relax-select-view">
      <section
        className="relax-game-picker relax-game-library"
        aria-labelledby="relax-game-picker-title"
      >
        <div className="relax-section-heading">
          <div>
            <p className="eyebrow">CHOOSE A GAME</p>
            <h2 id="relax-game-picker-title">오늘은 무엇으로 쉬어갈까요?</h2>
            <p>
              이미지를 눌러 각 게임의 전용 놀이 화면으로 들어갈 수 있습니다.
            </p>
          </div>
          <span>10개 게임 모두 플레이 가능</span>
        </div>

        <div className="relax-game-grid">
          {games.map((game) => {
            const previewStyle: GamePreviewStyle = {
              "--preview-x": game.previewX,
              "--preview-y": game.previewY,
            };

            return (
              <button
                type="button"
                className="relax-game-tile"
                onClick={() => openGame(game.id)}
                key={game.id}
              >
                <span
                  className="relax-game-preview"
                  style={previewStyle}
                  aria-hidden="true"
                />
                <span className="relax-game-copy">
                  <span>
                    <small>PLAY GAME</small>
                    <strong>{game.title}</strong>
                  </span>
                  <span className="relax-game-arrow" aria-hidden="true">
                    →
                  </span>
                  <span>{game.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="relax-phase-note" role="note">
        <strong>10가지 놀이를 한 화면에서 골라 즐겨보세요.</strong>
        <p>
          각 카드는 독립된 놀이 화면으로 연결됩니다. 소리는 기본적으로 꺼져 있으며,
          지원 기기에서는 진동을 선택해 사용할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
