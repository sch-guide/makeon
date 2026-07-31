"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MemoryCard, type MemoryCardModel } from "./memory-card";
import {
  difficulties,
  getDifficulty,
  getTheme,
  memoryThemes,
  type DifficultyId,
  type ThemeId,
} from "./memory-data";
import { useMemoryAudio } from "./use-memory-audio";
import styles from "./pastel-memory-match.module.css";

type GameStatus = "ready" | "preview" | "playing" | "resolving" | "complete";
type PreviewSeconds = 0 | 2 | 4;
type Records = Record<DifficultyId, { score: number; seconds: number; moves: number }> & { bestCombo: number };
type Result = {
  seconds: number;
  moves: number;
  bestCombo: number;
  hintsUsed: number;
  score: number;
  isBest: boolean;
  stars: number;
};

const STORAGE_KEY = "makeon-pastel-memory-v1";
const emptyRecords: Records = {
  easy: { score: 0, seconds: 0, moves: 0 },
  normal: { score: 0, seconds: 0, moves: 0 },
  hard: { score: 0, seconds: 0, moves: 0 },
  challenge: { score: 0, seconds: 0, moves: 0 },
  bestCombo: 0,
};

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function buildCards(themeId: ThemeId, difficultyId: DifficultyId, faceUp: boolean): MemoryCardModel[] {
  const theme = getTheme(themeId);
  const difficulty = getDifficulty(difficultyId);
  return shuffle(theme.symbols.slice(0, difficulty.pairs).flatMap((symbol) => [0, 1].map((copy) => ({
    id: `${symbol.key}-${copy}-${Math.random().toString(36).slice(2, 8)}`,
    pairId: symbol.key,
    iconKey: symbol.key,
    label: symbol.label,
    accent: symbol.accent,
    soft: symbol.soft,
    theme: themeId,
    faceUp,
    matched: false,
  }))));
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function comboMultiplier(combo: number) {
  if (combo >= 5) return 2;
  if (combo >= 3) return 1.5;
  if (combo >= 2) return 1.2;
  return 1;
}

export function PastelMemoryMatch() {
  const [themeId, setThemeId] = useState<ThemeId>("cats");
  const [difficultyId, setDifficultyId] = useState<DifficultyId>("easy");
  const [previewSeconds, setPreviewSeconds] = useState<PreviewSeconds>(2);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [status, setStatus] = useState<GameStatus>("ready");
  const [cards, setCards] = useState<MemoryCardModel[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [hintedPair, setHintedPair] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [announcement, setAnnouncement] = useState("게임 설정을 선택해 주세요.");
  const [result, setResult] = useState<Result | null>(null);
  const [records, setRecords] = useState<Records>(emptyRecords);
  const startTimeRef = useRef(0);
  const lockRef = useRef(false);
  const selectedRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const playSound = useMemoryAudio(soundEnabled, volume);
  const difficulty = getDifficulty(difficultyId);
  const theme = getTheme(themeId);

  const clearScheduled = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current.clear();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(() => {
      timeoutsRef.current.delete(timeout);
      callback();
    }, delay);
    timeoutsRef.current.add(timeout);
  }, []);

  useEffect(() => clearScheduled, [clearScheduled]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as {
        themeId?: ThemeId; previewSeconds?: PreviewSeconds; soundEnabled?: boolean; volume?: number; records?: Records;
      } | null;
      if (!stored) return;
      if (stored.themeId && memoryThemes.some((item) => item.id === stored.themeId)) setThemeId(stored.themeId);
      if ([0, 2, 4].includes(stored.previewSeconds ?? -1)) setPreviewSeconds(stored.previewSeconds ?? 2);
      setSoundEnabled(Boolean(stored.soundEnabled));
      if (typeof stored.volume === "number") setVolume(Math.min(0.6, Math.max(0.05, stored.volume)));
      if (stored.records) setRecords({ ...emptyRecords, ...stored.records });
    } catch { /* localStorage가 차단되어도 게임은 계속 동작합니다. */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ themeId, previewSeconds, soundEnabled, volume, records }));
    } catch { /* 저장할 수 없는 환경에서는 메모리 상태만 사용합니다. */ }
  }, [themeId, previewSeconds, soundEnabled, volume, records]);

  const beginTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    setElapsed(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 500);
  }, []);

  const startGame = useCallback(() => {
    clearScheduled();
    lockRef.current = previewSeconds > 0;
    setCards(buildCards(themeId, difficultyId, previewSeconds > 0));
    selectedRef.current = null;
    setSelectedId(null);
    setMoves(0);
    setMatches(0);
    setCombo(0);
    setBestCombo(0);
    setScore(0);
    setHintsLeft(3);
    setHintedPair(null);
    setElapsed(0);
    setResult(null);
    if (previewSeconds > 0) {
      setStatus("preview");
      setAnnouncement(`${previewSeconds}초 동안 카드를 미리 보여드려요.`);
      schedule(() => {
        setCards((current) => current.map((card) => ({ ...card, faceUp: false })));
        lockRef.current = false;
        setStatus("playing");
        setAnnouncement("미리보기가 끝났습니다. 같은 그림을 찾아보세요.");
        beginTimer();
      }, previewSeconds * 1000);
    } else {
      lockRef.current = false;
      setStatus("playing");
      setAnnouncement("게임을 시작합니다. 같은 그림을 찾아보세요.");
      beginTimer();
    }
  }, [beginTimer, clearScheduled, difficultyId, previewSeconds, schedule, themeId]);

  const finishGame = useCallback((finalMoves: number, finalBestCombo: number, finalScore: number, hintsUsed: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    const seconds = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
    setElapsed(seconds);
    const timeBonus = Math.max(0, (difficulty.targetSeconds - seconds) * 5);
    const moveBonus = Math.max(0, (difficulty.targetMoves - finalMoves) * 20);
    const completedScore = Math.max(0, Math.round(finalScore + timeBonus + moveBonus));
    const stars = seconds <= difficulty.targetSeconds && finalMoves <= difficulty.targetMoves ? 3
      : seconds <= difficulty.targetSeconds * 1.6 && finalMoves <= difficulty.targetMoves * 1.6 ? 2 : 1;
    const previous = records[difficultyId];
    const isBest = completedScore > previous.score;
    const nextRecords: Records = {
      ...records,
      [difficultyId]: {
        score: Math.max(previous.score, completedScore),
        seconds: previous.seconds === 0 ? seconds : Math.min(previous.seconds, seconds),
        moves: previous.moves === 0 ? finalMoves : Math.min(previous.moves, finalMoves),
      },
      bestCombo: Math.max(records.bestCombo, finalBestCombo),
    };
    setRecords(nextRecords);
    setScore(completedScore);
    setResult({ seconds, moves: finalMoves, bestCombo: finalBestCombo, hintsUsed, score: completedScore, isBest, stars });
    setStatus("complete");
    lockRef.current = true;
    setAnnouncement(`게임 완료! ${completedScore}점, 별 ${stars}개를 받았습니다.`);
    playSound("complete");
  }, [difficulty, difficultyId, playSound, records]);

  const selectCard = useCallback((card: MemoryCardModel) => {
    if (status !== "playing" || lockRef.current || card.faceUp || card.matched) return;
    playSound("flip");
    setCards((current) => current.map((item) => item.id === card.id ? { ...item, faceUp: true } : item));
    if (!selectedRef.current) {
      selectedRef.current = card.id;
      setSelectedId(card.id);
      setAnnouncement(`${card.label} 카드를 열었습니다. 한 장 더 선택하세요.`);
      return;
    }

    const first = cards.find((item) => item.id === selectedRef.current);
    if (!first || first.id === card.id) return;
    lockRef.current = true;
    setStatus("resolving");
    const nextMoves = moves + 1;
    setMoves(nextMoves);

    if (first.pairId === card.pairId) {
      const nextCombo = combo + 1;
      const nextBestCombo = Math.max(bestCombo, nextCombo);
      const gained = Math.round(100 * comboMultiplier(nextCombo));
      const nextScore = score + gained;
      const nextMatches = matches + 1;
      playSound(nextCombo >= 2 ? "combo" : "match", nextCombo);
      schedule(() => {
        setCards((current) => current.map((item) => item.id === first.id || item.id === card.id ? { ...item, faceUp: true, matched: true } : item));
        selectedRef.current = null;
        setSelectedId(null);
        setCombo(nextCombo);
        setBestCombo(nextBestCombo);
        setScore(nextScore);
        setMatches(nextMatches);
        setAnnouncement(`${card.label} 한 쌍을 맞췄습니다. ${nextCombo > 1 ? `${nextCombo}콤보!` : ""}`);
        if (nextMatches === difficulty.pairs) {
          finishGame(nextMoves, nextBestCombo, nextScore, 3 - hintsLeft);
        } else {
          lockRef.current = false;
          setStatus("playing");
        }
      }, 360);
    } else {
      playSound("miss");
      setAnnouncement("서로 다른 카드예요. 잠시 후 다시 뒤집습니다.");
      schedule(() => {
        setCards((current) => current.map((item) => item.id === first.id || item.id === card.id ? { ...item, faceUp: false } : item));
        selectedRef.current = null;
        setSelectedId(null);
        setCombo(0);
        lockRef.current = false;
        setStatus("playing");
      }, 760);
    }
  }, [bestCombo, cards, combo, difficulty.pairs, finishGame, hintsLeft, matches, moves, playSound, schedule, score, selectedId, status]);

  const useHint = useCallback(() => {
    if (status !== "playing" || lockRef.current || hintedPair || hintsLeft <= 0) return;
    const candidates = cards.filter((card) => !card.matched && !card.faceUp);
    const pairIds = candidates.reduce<string[]>((ids, card) => {
      if (!ids.includes(card.pairId) && candidates.filter((item) => item.pairId === card.pairId).length === 2) ids.push(card.pairId);
      return ids;
    }, []);
    if (!pairIds.length) return;
    const pairId = pairIds[Math.floor(Math.random() * pairIds.length)];
    setHintedPair(pairId);
    setHintsLeft((value) => value - 1);
    setScore((value) => Math.max(0, value - 50));
    setAnnouncement("아직 맞추지 않은 한 쌍을 부드럽게 강조했습니다.");
    schedule(() => setHintedPair(null), 1050);
  }, [cards, hintedPair, hintsLeft, schedule, status]);

  const leaveGame = useCallback(() => {
    clearScheduled();
    lockRef.current = false;
    setCards([]);
    selectedRef.current = null;
    setStatus("ready");
    setResult(null);
    setAnnouncement("게임 설정 화면으로 돌아왔습니다.");
  }, [clearScheduled]);

  const remainingPairs = difficulty.pairs - matches;
  const isActive = status !== "ready" && status !== "complete";
  const cardStyle = useMemo(() => ({ "--memory-columns": difficulty.columns } as React.CSSProperties), [difficulty.columns]);

  return (
    <div className={styles.gameShell}>
      <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">{announcement}</div>

      {status === "ready" && (
        <section className={styles.setup} aria-labelledby="memory-setup-title">
          <div className={styles.setupHeading}>
            <span className={styles.kicker}>READY TO MATCH?</span>
            <h2 id="memory-setup-title">오늘의 카드 덱을 골라주세요.</h2>
            <p>설정은 이 브라우저에만 저장되며 개인정보는 수집하지 않습니다.</p>
          </div>

          <fieldset className={styles.optionGroup}>
            <legend>카드 테마</legend>
            <div className={styles.themeGrid}>
              {memoryThemes.map((item) => (
                <button key={item.id} type="button" className={themeId === item.id ? styles.selectedOption : ""} aria-pressed={themeId === item.id} onClick={() => setThemeId(item.id)}>
                  <strong>{item.name}</strong><span>{item.description}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className={styles.setupRow}>
            <label>난이도
              <select value={difficultyId} onChange={(event) => setDifficultyId(event.target.value as DifficultyId)}>
                {difficulties.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.pairs * 2}장</option>)}
              </select>
            </label>
            <label>카드 미리보기
              <select value={previewSeconds} onChange={(event) => setPreviewSeconds(Number(event.target.value) as PreviewSeconds)}>
                <option value={0}>없음</option><option value={2}>2초</option><option value={4}>4초</option>
              </select>
            </label>
          </div>

          <div className={styles.startSummary}>
            <span><strong>{theme.name}</strong> 테마</span><span>{difficulty.name} · {difficulty.pairs}쌍</span><span>힌트 3회</span>
          </div>
          <button type="button" className={styles.primaryButton} onClick={startGame}>게임 시작</button>
          {records[difficultyId].score > 0 && <p className={styles.recordNote}>이 난이도 최고 {records[difficultyId].score.toLocaleString()}점 · 최단 {formatTime(records[difficultyId].seconds)}</p>}
        </section>
      )}

      {isActive && (
        <section className={styles.playArea} aria-label="메모리 카드 게임">
          {status === "preview" && <div className={styles.previewBanner}>눈으로 위치를 기억해 보세요 · {previewSeconds}초 미리보기</div>}
          <div className={styles.hud}>
            <div><span>남은 쌍</span><strong>{remainingPairs}</strong></div>
            <div><span>이동</span><strong>{moves}</strong></div>
            <div><span>콤보</span><strong>{combo}</strong></div>
            <div><span>최고 콤보</span><strong>{bestCombo}</strong></div>
            <div><span>시간</span><strong>{formatTime(elapsed)}</strong></div>
            <div><span>점수</span><strong>{score.toLocaleString()}</strong></div>
          </div>
          <div className={styles.progressTrack} aria-label={`${matches}/${difficulty.pairs}쌍 완료`}><span style={{ width: `${(matches / difficulty.pairs) * 100}%` }} /></div>
          <div className={styles.board} style={cardStyle} aria-busy={status === "preview" || status === "resolving"}>
            {cards.map((card) => <MemoryCard key={card.id} card={card} disabled={status !== "playing"} hinted={hintedPair === card.pairId} onSelect={selectCard} />)}
          </div>
          <div className={styles.controls}>
            <button type="button" onClick={useHint} disabled={status !== "playing" || hintsLeft === 0 || Boolean(hintedPair)}>힌트 <span>{hintsLeft}/3</span></button>
            <button type="button" onClick={startGame}>다시 시작</button>
            <button type="button" aria-pressed={soundEnabled} onClick={() => setSoundEnabled((value) => !value)}>{soundEnabled ? "소리 켬" : "소리 끔"}</button>
            <button type="button" onClick={leaveGame}>게임 나가기</button>
          </div>
          {soundEnabled && <label className={styles.volume}>효과음 음량 <input type="range" min="0.05" max="0.6" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></label>}
        </section>
      )}

      {status === "complete" && result && (
        <section className={styles.result} aria-labelledby="memory-result-title">
          <div className={styles.resultBadge} aria-hidden="true">✓</div>
          <p className={styles.kicker}>ALL PAIRS FOUND</p>
          <h2 id="memory-result-title">게임 완료!</h2>
          <div className={styles.stars} aria-label={`별 ${result.stars}개`}>{[1, 2, 3].map((star) => <span className={star <= result.stars ? styles.earnedStar : ""} key={star}>★</span>)}</div>
          <p className={styles.resultLead}>{result.isBest ? "새로운 최고 점수예요!" : "차분하게 모든 짝을 찾았어요."}</p>
          <div className={styles.resultGrid}>
            <div><span>테마</span><strong>{theme.name}</strong></div><div><span>난이도</span><strong>{difficulty.name}</strong></div>
            <div><span>완료 시간</span><strong>{formatTime(result.seconds)}</strong></div><div><span>이동 횟수</span><strong>{result.moves}</strong></div>
            <div><span>최고 콤보</span><strong>{result.bestCombo}</strong></div><div><span>힌트 사용</span><strong>{result.hintsUsed}회</strong></div>
          </div>
          <div className={styles.finalScore}><span>최종 점수</span><strong>{result.score.toLocaleString()}</strong></div>
          <div className={styles.resultActions}>
            <button type="button" className={styles.primaryButton} onClick={startGame}>같은 조건으로 다시 하기</button>
            <button type="button" onClick={leaveGame}>난이도 바꾸기</button>
            <button type="button" onClick={leaveGame}>테마 바꾸기</button>
            <Link href="/tools">다른 무료 도구 보기</Link>
          </div>
        </section>
      )}
    </div>
  );
}
