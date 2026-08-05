"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MemoryIcon } from "@/components/pastel-memory-match/memory-icon";
import { getTheme, memoryThemes, type ThemeId } from "@/components/pastel-memory-match/memory-data";
import { useMemoryAudio } from "@/components/pastel-memory-match/use-memory-audio";
import styles from "./memory-token-battle.module.css";

type Mode = "solo" | "duo" | "robot" | "challenge";
type Difficulty = "easy" | "normal" | "hard";
type Status = "setup" | "playing" | "resolving" | "complete";
type Owner = 0 | 1 | null;

type Token = {
  id: string;
  pairId: string;
  iconKey: string;
  label: string;
  accent: string;
  soft: string;
  theme: ThemeId;
  faceUp: boolean;
  matched: boolean;
  owner: Owner;
};

type MemoryItem = { pairId: string; seenTurn: number };

const MODE_OPTIONS: Array<{ id: Mode; name: string; description: string }> = [
  { id: "solo", name: "혼자 연습", description: "시간과 이동 수를 줄여보세요." },
  { id: "duo", name: "2인 대전", description: "한 기기에서 차례로 겨뤄요." },
  { id: "robot", name: "로봇 대전", description: "기억하는 로봇과 대결해요." },
  { id: "challenge", name: "30초 챌린지", description: "제한 시간 동안 최대한 찾아요." },
];

const DIFFICULTIES: Record<Difficulty, { name: string; pairs: number; columns: number }> = {
  easy: { name: "쉬움", pairs: 6, columns: 4 },
  normal: { name: "보통", pairs: 10, columns: 5 },
  hard: { name: "어려움", pairs: 15, columns: 6 },
};

const ROBOT_SKILL: Record<Difficulty, { retention: number; knownPair: number; memoryTurns: number }> = {
  easy: { retention: 0.36, knownPair: 0.58, memoryTurns: 2 },
  normal: { retention: 0.66, knownPair: 0.82, memoryTurns: 5 },
  hard: { retention: 0.9, knownPair: 0.94, memoryTurns: 12 },
};

const STORAGE_KEY = "makeon-memory-token-battle-v1";

function shuffle<T>(source: T[]) {
  const items = [...source];
  for (let index = items.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [items[index], items[target]] = [items[target], items[index]];
  }
  return items;
}

function buildTokens(themeId: ThemeId, pairCount: number): Token[] {
  const playableThemes = memoryThemes.filter((theme) => theme.id !== "coding");
  const orderedThemes = [getTheme(themeId), ...playableThemes.filter((theme) => theme.id !== themeId)];
  const symbols = orderedThemes.flatMap((theme) => theme.symbols.map((symbol) => ({ symbol, themeId: theme.id }))).slice(0, pairCount);
  return shuffle(symbols.flatMap(({ symbol, themeId: symbolTheme }, pairIndex) => [0, 1].map((copy) => ({
    id: `${symbol.key}-${copy}-${crypto.randomUUID()}`,
    pairId: `${symbolTheme}-${symbol.key}-${pairIndex}`,
    iconKey: symbol.key,
    label: symbol.label,
    accent: symbol.accent,
    soft: symbol.soft,
    theme: symbolTheme,
    faceUp: false,
    matched: false,
    owner: null,
  }))));
}

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function MemoryTokenBattle() {
  const [mode, setMode] = useState<Mode>("solo");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [themeId, setThemeId] = useState<ThemeId>("cats");
  const [playerNames, setPlayerNames] = useState<[string, string]>(["플레이어 1", "플레이어 2"]);
  const [status, setStatus] = useState<Status>("setup");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [scores, setScores] = useState<[number, number]>([0, 0]);
  const [captured, setCaptured] = useState<[string[], string[]]>([[], []]);
  const [activePlayer, setActivePlayer] = useState<0 | 1>(0);
  const [moves, setMoves] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [remaining, setRemaining] = useState(30);
  const [message, setMessage] = useState("모드와 난이도를 선택해 주세요.");
  const [robotThinking, setRobotThinking] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [bgmEnabled, setBgmEnabled] = useState(true);
  const [volume, setVolume] = useState(0.18);
  const [bestRecord, setBestRecord] = useState<{ pairs: number; seconds: number; moves: number } | null>(null);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const robotMemoryRef = useRef<Map<string, MemoryItem>>(new Map());
  const turnRef = useRef(0);
  const config = DIFFICULTIES[difficulty];
  const effectivePairs = mode === "challenge" ? 18 : config.pairs;
  const columns = mode === "challenge" ? 6 : config.columns;
  const currentNames: [string, string] = mode === "robot"
    ? [playerNames[0] || "플레이어", "기억 로봇"]
    : playerNames;
  const audioActive = status === "playing" || status === "resolving";
  const { play, startBgm, stopBgm } = useMemoryAudio({ sfxEnabled, bgmEnabled, bgmVolume: volume, bgmActive: audioActive });

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      timersRef.current.delete(timer);
      callback();
    }, delay);
    timersRef.current.add(timer);
  }, []);

  useEffect(() => () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current.clear();
    stopBgm();
  }, [stopBgm]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as { best?: typeof bestRecord; sfx?: boolean; bgm?: boolean; volume?: number } | null;
      if (saved?.best) setBestRecord(saved.best);
      if (typeof saved?.sfx === "boolean") setSfxEnabled(saved.sfx);
      if (typeof saved?.bgm === "boolean") setBgmEnabled(saved.bgm);
      if (typeof saved?.volume === "number") setVolume(Math.min(0.35, Math.max(0, saved.volume)));
    } catch { /* 손상된 로컬 설정은 무시합니다. */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ best: bestRecord, sfx: sfxEnabled, bgm: bgmEnabled, volume })); } catch { /* 저장 차단 시 게임은 계속됩니다. */ }
  }, [bestRecord, bgmEnabled, sfxEnabled, volume]);

  useEffect(() => {
    if (status !== "playing" && status !== "resolving") return;
    const timer = setInterval(() => {
      setElapsed((value) => value + 1);
      if (mode === "challenge") setRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, status]);

  useEffect(() => {
    if (mode === "challenge" && remaining === 0 && (status === "playing" || status === "resolving")) {
      timersRef.current.forEach(clearTimeout);
      timersRef.current.clear();
      setSelectedIds([]);
      setStatus("complete");
      setMessage("30초 도전이 끝났어요!");
      play("complete");
      stopBgm();
    }
  }, [mode, play, remaining, status, stopBgm]);

  const startGame = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current.clear();
    robotMemoryRef.current.clear();
    turnRef.current = 0;
    setTokens(buildTokens(themeId, effectivePairs));
    setSelectedIds([]);
    setScores([0, 0]);
    setCaptured([[], []]);
    setActivePlayer(0);
    setMoves(0);
    setCombo(0);
    setBestCombo(0);
    setElapsed(0);
    setRemaining(30);
    setRobotThinking(false);
    setStatus("playing");
    setMessage(mode === "challenge" ? "30초 동안 최대한 많은 짝을 찾으세요!" : `${currentNames[0]} 차례입니다.`);
    startBgm(true, true);
  }, [currentNames, effectivePairs, mode, startBgm, themeId]);

  const completeGame = useCallback((nextScores: [number, number], nextCaptured: [string[], string[]]) => {
    setStatus("complete");
    setRobotThinking(false);
    stopBgm();
    play("complete");
    const totalPairs = nextScores[0] + nextScores[1];
    if (mode === "solo" || mode === "challenge") {
      setBestRecord((previous) => !previous || totalPairs > previous.pairs || (totalPairs === previous.pairs && elapsed < previous.seconds)
        ? { pairs: totalPairs, seconds: elapsed, moves }
        : previous);
    }
    if (mode === "duo" || mode === "robot") {
      setMessage(nextScores[0] === nextScores[1] ? "무승부예요! 한 번 더 겨뤄볼까요?" : `${currentNames[nextScores[0] > nextScores[1] ? 0 : 1]} 승리!`);
    } else setMessage(mode === "challenge" ? `${totalPairs}쌍을 찾았어요!` : "모든 토큰 짝을 찾았어요!");
    setCaptured(nextCaptured);
  }, [currentNames, elapsed, mode, moves, play, stopBgm]);

  const resolveSelection = useCallback((firstId: string, secondId: string) => {
    const first = tokens.find((token) => token.id === firstId);
    const second = tokens.find((token) => token.id === secondId);
    if (!first || !second) return;
    setMoves((value) => value + 1);
    turnRef.current += 1;
    robotMemoryRef.current.set(first.id, { pairId: first.pairId, seenTurn: turnRef.current });
    robotMemoryRef.current.set(second.id, { pairId: second.pairId, seenTurn: turnRef.current });

    if (first.pairId === second.pairId) {
      play(combo > 0 ? "combo" : "match", combo + 1);
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setBestCombo((value) => Math.max(value, nextCombo));
      schedule(() => {
        let matchedPairs = 0;
        const nextTokens = tokens.map((token) => {
          const matched = token.id === firstId || token.id === secondId ? true : token.matched;
          if (matched) matchedPairs += 0.5;
          return token.id === firstId || token.id === secondId ? { ...token, matched: true, owner: activePlayer } : token;
        });
        const nextScores: [number, number] = [...scores] as [number, number];
        nextScores[activePlayer] += 1;
        const nextCaptured: [string[], string[]] = [[...captured[0]], [...captured[1]]];
        nextCaptured[activePlayer].push(first.pairId);
        setTokens(nextTokens);
        setScores(nextScores);
        setCaptured(nextCaptured);
        setSelectedIds([]);
        robotMemoryRef.current.delete(firstId);
        robotMemoryRef.current.delete(secondId);
        if (matchedPairs >= effectivePairs) completeGame(nextScores, nextCaptured);
        else {
          setStatus("playing");
          setMessage(`${currentNames[activePlayer]}이(가) 한 번 더 플레이합니다.`);
        }
      }, 420);
      return;
    }

    play("miss");
    setCombo(0);
    setMessage("다른 그림이에요. 위치를 기억해 두세요.");
    schedule(() => {
      setTokens((items) => items.map((token) => token.id === firstId || token.id === secondId ? { ...token, faceUp: false } : token));
      setSelectedIds([]);
      const nextPlayer: 0 | 1 = mode === "duo" || mode === "robot" ? (activePlayer === 0 ? 1 : 0) : 0;
      setActivePlayer(nextPlayer);
      setStatus("playing");
      setMessage(`${currentNames[nextPlayer]} 차례입니다.`);
    }, 900);
  }, [activePlayer, captured, combo, completeGame, currentNames, effectivePairs, mode, play, schedule, scores, tokens]);

  const selectToken = useCallback((id: string) => {
    if (status !== "playing" || selectedIds.length >= 2) return;
    const token = tokens.find((item) => item.id === id);
    if (!token || token.faceUp || token.matched) return;
    play(selectedIds.length === 0 ? "tap" : "flip");
    const nextSelected = [...selectedIds, id];
    setTokens((items) => items.map((item) => item.id === id ? { ...item, faceUp: true } : item));
    setSelectedIds(nextSelected);
    robotMemoryRef.current.set(id, { pairId: token.pairId, seenTurn: turnRef.current });
    if (nextSelected.length === 2) {
      setStatus("resolving");
      schedule(() => resolveSelection(nextSelected[0], nextSelected[1]), 310);
    }
  }, [play, resolveSelection, schedule, selectedIds, status, tokens]);

  const chooseRobotToken = useCallback(() => {
    const available = tokens.filter((token) => !token.faceUp && !token.matched);
    if (!available.length) return null;
    const skill = ROBOT_SKILL[difficulty];
    const memory = [...robotMemoryRef.current.entries()].filter(([id, item]) => {
      const valid = available.some((token) => token.id === id) && turnRef.current - item.seenTurn <= skill.memoryTurns;
      if (!valid || Math.random() > skill.retention) robotMemoryRef.current.delete(id);
      return valid && robotMemoryRef.current.has(id);
    });
    if (selectedIds.length === 1) {
      const first = tokens.find((token) => token.id === selectedIds[0]);
      const knownMate = memory.find(([id, item]) => id !== first?.id && item.pairId === first?.pairId)?.[0];
      if (knownMate && Math.random() < skill.knownPair) return knownMate;
    } else {
      const byPair = new Map<string, string[]>();
      memory.forEach(([id, item]) => byPair.set(item.pairId, [...(byPair.get(item.pairId) ?? []), id]));
      const knownPair = [...byPair.values()].find((ids) => ids.length >= 2);
      if (knownPair && Math.random() < skill.knownPair) return knownPair[0];
    }
    return available[Math.floor(Math.random() * available.length)]?.id ?? null;
  }, [difficulty, selectedIds, tokens]);

  useEffect(() => {
    if (mode !== "robot" || activePlayer !== 1 || status !== "playing") {
      if (activePlayer !== 1) setRobotThinking(false);
      return;
    }
    setRobotThinking(true);
    const delay = selectedIds.length === 0 ? 720 : 590;
    const timer = setTimeout(() => {
      const id = chooseRobotToken();
      if (id) selectToken(id);
      if (selectedIds.length === 1) setRobotThinking(false);
    }, delay + Math.floor(Math.random() * 170));
    return () => clearTimeout(timer);
  }, [activePlayer, chooseRobotToken, mode, selectToken, selectedIds.length, status]);

  const totalMatched = scores[0] + scores[1];
  const theme = getTheme(themeId);
  const resultTitle = useMemo(() => {
    if (mode === "solo") return "기억력 훈련 완료!";
    if (mode === "challenge") return "30초 도전 완료!";
    if (scores[0] === scores[1]) return "멋진 무승부예요!";
    return scores[0] > scores[1] ? `${currentNames[0]} 승리!` : `${currentNames[1]} 승리!`;
  }, [currentNames, mode, scores]);

  return (
    <div className={styles.shell}>
      <p className={styles.live} aria-live="polite">{message}</p>
      {status === "setup" ? (
        <section className={styles.setup} aria-labelledby="token-setup-title">
          <div className={styles.setupIntro}>
            <p className={styles.kicker}>MEMORY TOKEN BATTLE</p>
            <h2 id="token-setup-title">오늘은 누구와 기억력을 겨뤄볼까요?</h2>
            <p>원형 토큰을 뒤집어 같은 그림을 찾으세요. 대전에서는 맞힌 사람이 한 번 더 플레이합니다.</p>
          </div>
          <fieldset className={styles.optionGroup}>
            <legend>플레이 모드</legend>
            <div className={styles.modeGrid}>{MODE_OPTIONS.map((option) => (
              <button type="button" className={mode === option.id ? styles.selected : ""} aria-pressed={mode === option.id} key={option.id} onClick={() => setMode(option.id)}>
                <strong>{option.name}</strong><span>{option.description}</span>
              </button>
            ))}</div>
          </fieldset>
          <div className={styles.setupGrid}>
            <label>난이도<select value={difficulty} disabled={mode === "challenge"} onChange={(event) => setDifficulty(event.target.value as Difficulty)}><option value="easy">쉬움 · 6쌍</option><option value="normal">보통 · 10쌍</option><option value="hard">어려움 · 15쌍</option></select></label>
            <label>토큰 테마<select value={themeId} onChange={(event) => setThemeId(event.target.value as ThemeId)}>{memoryThemes.filter((item) => item.id !== "coding").map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
          </div>
          {(mode === "duo" || mode === "robot") && <div className={styles.nameGrid}>
            <label>내 이름<input maxLength={12} value={playerNames[0]} onChange={(event) => setPlayerNames([event.target.value, playerNames[1]])} /></label>
            {mode === "duo" && <label>상대 이름<input maxLength={12} value={playerNames[1]} onChange={(event) => setPlayerNames([playerNames[0], event.target.value])} /></label>}
          </div>}
          <div className={styles.themePreview} aria-label={`${theme.name} 토큰 미리보기`}>
            {theme.symbols.slice(0, 6).map((symbol) => <span key={symbol.key}><MemoryIcon theme={theme.id} iconKey={symbol.key} label={symbol.label} accent={symbol.accent} soft={symbol.soft} /></span>)}
          </div>
          <div className={styles.audioSettings}>
            <button type="button" aria-pressed={sfxEnabled} onClick={() => setSfxEnabled((value) => !value)}>효과음 {sfxEnabled ? "켜짐" : "꺼짐"}</button>
            <button type="button" aria-pressed={bgmEnabled} onClick={() => setBgmEnabled((value) => !value)}>BGM {bgmEnabled ? "켜짐" : "꺼짐"}</button>
            <label>음량 <input type="range" min="0" max="0.35" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></label>
          </div>
          <button type="button" className={styles.startButton} onClick={startGame}>게임 시작</button>
          {bestRecord && <p className={styles.best}>내 최고 기록 · {bestRecord.pairs}쌍 · {formatTime(bestRecord.seconds)} · {bestRecord.moves}회</p>}
        </section>
      ) : (
        <section className={styles.game} aria-labelledby="token-game-title">
          <header className={styles.gameHeader}>
            <div><p className={styles.kicker}>{MODE_OPTIONS.find((item) => item.id === mode)?.name}</p><h2 id="token-game-title">메모리 토큰 배틀</h2></div>
            <div className={styles.headerActions}>
              <button type="button" aria-pressed={sfxEnabled} onClick={() => setSfxEnabled((value) => !value)}>소리 {sfxEnabled ? "켜짐" : "꺼짐"}</button>
              <button type="button" aria-pressed={bgmEnabled} onClick={() => setBgmEnabled((value) => !value)}>BGM {bgmEnabled ? "켜짐" : "꺼짐"}</button>
              <button type="button" onClick={startGame}>다시 시작</button>
            </div>
          </header>

          <div className={styles.players}>
            {[0, 1].map((index) => {
              const hidden = mode === "solo" || mode === "challenge" ? index === 1 : false;
              if (hidden) return null;
              return <section className={`${styles.player} ${activePlayer === index && status !== "complete" ? styles.activePlayer : ""}`} key={index} aria-label={`${currentNames[index]} 점수`}>
                <div><span>{index === 1 && mode === "robot" ? "ROBOT" : `PLAYER ${index + 1}`}</span><strong>{currentNames[index]}</strong></div>
                <b>{scores[index]}쌍</b>
                <div className={styles.captured}>{captured[index].slice(-6).map((pairId, tokenIndex) => <i key={`${pairId}-${tokenIndex}`}>{tokenIndex + 1}</i>)}</div>
              </section>;
            })}
          </div>

          <div className={styles.hud}>
            <div><span>남은 쌍</span><strong>{Math.max(0, effectivePairs - totalMatched)}</strong></div>
            <div><span>{mode === "challenge" ? "남은 시간" : "시간"}</span><strong>{formatTime(mode === "challenge" ? remaining : elapsed)}</strong></div>
            <div><span>이동</span><strong>{moves}</strong></div>
            <div><span>최고 콤보</span><strong>{bestCombo}</strong></div>
          </div>
          <div className={styles.statusLine}><span className={robotThinking ? styles.thinking : ""}>{robotThinking ? "로봇이 생각 중…" : message}</span></div>

          <div className={styles.tableSurface}>
            <div className={styles.boardFrame}>
              <div className={styles.boardShine} />
              <div className={styles.board} style={{ "--token-columns": columns } as React.CSSProperties}>
                {tokens.map((token, index) => {
                  const revealed = token.faceUp || token.matched;
                  const disabled = status !== "playing" || robotThinking || revealed || (mode === "robot" && activePlayer === 1);
                  return <div className={`${styles.socket} ${token.matched ? styles.emptySocket : ""}`} key={token.id}>
                    <button type="button" className={`${styles.token} ${revealed ? styles.flipped : ""} ${token.matched ? styles.capturedToken : ""}`} disabled={disabled} aria-pressed={revealed} aria-label={token.matched ? `${token.label} 토큰, 획득됨` : revealed ? `${token.label} 토큰, 앞면` : `${index + 1}번 뒤집힌 토큰`} onClick={() => selectToken(token.id)}>
                      <span className={styles.tokenInner}>
                        <span className={styles.tokenBack} aria-hidden="true"><i /><b>✦</b></span>
                        <span className={styles.tokenFront} aria-hidden="true"><MemoryIcon theme={token.theme} iconKey={token.iconKey} label={token.label} accent={token.accent} soft={token.soft} /></span>
                      </span>
                    </button>
                  </div>;
                })}
              </div>
            </div>
          </div>

          {status === "complete" && <div className={styles.resultBackdrop}>
            <section className={styles.result} role="dialog" aria-modal="true" aria-labelledby="token-result-title">
              <span className={styles.resultMedal}>✦</span><p className={styles.kicker}>BATTLE COMPLETE</p><h2 id="token-result-title">{resultTitle}</h2><p>{message}</p>
              <div className={styles.resultStats}><div><span>찾은 짝</span><strong>{totalMatched}</strong></div><div><span>완료 시간</span><strong>{formatTime(elapsed)}</strong></div><div><span>이동</span><strong>{moves}</strong></div><div><span>최고 콤보</span><strong>{bestCombo}</strong></div></div>
              <div className={styles.resultActions}><button type="button" onClick={startGame}>다시 하기</button><button type="button" onClick={() => setStatus("setup")}>모드 변경</button><Link href="/tools">무료 도구 전체 보기</Link></div>
            </section>
          </div>}
        </section>
      )}
    </div>
  );
}
