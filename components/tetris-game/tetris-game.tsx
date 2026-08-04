"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Leaderboard } from "@/components/games/Leaderboard";
import { NicknameDialog } from "@/components/games/NicknameDialog";
import { ScoreSubmitResult } from "@/components/games/ScoreSubmitResult";
import { useTetrisAudio } from "./use-tetris-audio";
import { useTetrisLeaderboard } from "./use-tetris-leaderboard";
import styles from "./tetris-game.module.css";

type Kind = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
type Status = "ready" | "playing" | "paused" | "over";
type Cell = Kind | null;
type Board = Cell[][];
type Point = readonly [number, number];

type Piece = {
  kind: Kind;
  rotation: number;
  x: number;
  y: number;
};

type Engine = {
  board: Board;
  current: Piece;
  nextKind: Kind;
  bag: Kind[];
  score: number;
  lines: number;
  level: number;
  status: Status;
};

type Snapshot = Pick<Engine, "board" | "current" | "nextKind" | "score" | "lines" | "level" | "status">;

const COLS = 10;
const ROWS = 20;
const STORAGE_KEY = "makeon-tetris-v1";
const KINDS: Kind[] = ["I", "O", "T", "S", "Z", "J", "L"];
const COLORS: Record<Kind, string> = {
  I: "#77c4c1",
  O: "#e8c96f",
  T: "#a992c8",
  S: "#8fbd7d",
  Z: "#df8f8a",
  J: "#7f9ec9",
  L: "#dda06f",
};

const SHAPES: Record<Kind, Point[][]> = {
  I: [
    [[0, 1], [1, 1], [2, 1], [3, 1]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[0, 2], [1, 2], [2, 2], [3, 2]],
    [[1, 0], [1, 1], [1, 2], [1, 3]],
  ],
  O: Array.from({ length: 4 }, () => [[1, 0], [2, 0], [1, 1], [2, 1]] as Point[]),
  T: [
    [[1, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [1, 1], [2, 1], [1, 2]],
    [[0, 1], [1, 1], [2, 1], [1, 2]],
    [[1, 0], [0, 1], [1, 1], [1, 2]],
  ],
  S: [
    [[1, 0], [2, 0], [0, 1], [1, 1]],
    [[1, 0], [1, 1], [2, 1], [2, 2]],
    [[1, 1], [2, 1], [0, 2], [1, 2]],
    [[0, 0], [0, 1], [1, 1], [1, 2]],
  ],
  Z: [
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[2, 0], [1, 1], [2, 1], [1, 2]],
    [[0, 1], [1, 1], [1, 2], [2, 2]],
    [[1, 0], [0, 1], [1, 1], [0, 2]],
  ],
  J: [
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [2, 0], [1, 1], [1, 2]],
    [[0, 1], [1, 1], [2, 1], [2, 2]],
    [[1, 0], [1, 1], [0, 2], [1, 2]],
  ],
  L: [
    [[2, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 2]],
    [[0, 1], [1, 1], [2, 1], [0, 2]],
    [[0, 0], [1, 0], [1, 1], [1, 2]],
  ],
};

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(null));
}

function shuffledBag() {
  const bag = [...KINDS];
  for (let index = bag.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [bag[index], bag[swapIndex]] = [bag[swapIndex], bag[index]];
  }
  return bag;
}

function takeKind(engine: Pick<Engine, "bag">) {
  if (engine.bag.length === 0) engine.bag = shuffledBag();
  return engine.bag.pop()!;
}

function spawnPiece(kind: Kind): Piece {
  return { kind, rotation: 0, x: 3, y: -1 };
}

function pieceCells(piece: Piece) {
  return SHAPES[piece.kind][piece.rotation % 4].map(([x, y]) => ({
    x: x + piece.x,
    y: y + piece.y,
  }));
}

function collides(board: Board, piece: Piece) {
  return pieceCells(piece).some(({ x, y }) =>
    x < 0 || x >= COLS || y >= ROWS || (y >= 0 && board[y][x] !== null));
}

function ghostFor(board: Board, piece: Piece) {
  const ghost = { ...piece };
  while (!collides(board, { ...ghost, y: ghost.y + 1 })) ghost.y += 1;
  return ghost;
}

function makeEngine(): Engine {
  const bag = shuffledBag();
  const first = bag.pop()!;
  const next = bag.pop()!;
  return {
    board: emptyBoard(),
    current: spawnPiece(first),
    nextKind: next,
    bag,
    score: 0,
    lines: 0,
    level: 1,
    status: "playing",
  };
}

function snapshotOf(engine: Engine): Snapshot {
  return {
    board: engine.board,
    current: { ...engine.current },
    nextKind: engine.nextKind,
    score: engine.score,
    lines: engine.lines,
    level: engine.level,
    status: engine.status,
  };
}

const initialEngine: Engine = {
  board: emptyBoard(),
  current: spawnPiece("T"),
  nextKind: "I",
  bag: ["O", "S", "Z", "J", "L"],
  score: 0,
  lines: 0,
  level: 1,
  status: "ready",
};

export function TetrisGame() {
  const leaderboard = useTetrisLeaderboard();
  const audio = useTetrisAudio();
  const engineRef = useRef<Engine>(initialEngine);
  const pendingStartRef = useRef(false);
  const [snapshot, setSnapshot] = useState<Snapshot>(snapshotOf(initialEngine));
  const [message, setMessage] = useState("시작 버튼을 누르고 첫 블록을 쌓아보세요.");
  const [bestScore, setBestScore] = useState(0);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [vibrationSupported, setVibrationSupported] = useState(false);

  useEffect(() => {
    setVibrationSupported(typeof navigator.vibrate === "function");
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as { bestScore?: number; vibration?: boolean };
      setBestScore(Number(saved.bestScore) || 0);
      setVibrationEnabled(saved.vibration === true);
    } catch {
      // Local records are optional.
    }
  }, []);

  const saveLocal = useCallback((score: number) => {
    setBestScore((current) => {
      const next = Math.max(current, score);
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...stored, bestScore: next }));
      } catch {
        // The result remains visible in the current session.
      }
      return next;
    });
  }, []);

  const vibrate = useCallback((pattern: number | number[]) => {
    if (vibrationEnabled && typeof navigator.vibrate === "function") navigator.vibrate(pattern);
  }, [vibrationEnabled]);

  const endGame = useCallback((engine: Engine) => {
    if (engine.status === "over") return;
    engine.status = "over";
    setSnapshot(snapshotOf(engine));
    setMessage("게임 오버! 빈 공간을 줄이면 더 높은 점수에 도전할 수 있어요.");
    saveLocal(engine.score);
    audio.stopBgm();
    audio.play("over");
    vibrate([35, 35, 55]);
    void leaderboard.submitTetrisScore({ score: engine.score, lines: engine.lines, level: engine.level });
  }, [audio, leaderboard.submitTetrisScore, saveLocal, vibrate]);

  const lockPiece = useCallback((engine: Engine) => {
    const nextBoard = engine.board.map((row) => [...row]);
    let aboveTop = false;
    pieceCells(engine.current).forEach(({ x, y }) => {
      if (y < 0) aboveTop = true;
      else nextBoard[y][x] = engine.current.kind;
    });
    if (aboveTop) {
      endGame(engine);
      return;
    }

    const remaining = nextBoard.filter((row) => row.some((cell) => cell === null));
    const cleared = ROWS - remaining.length;
    engine.board = [
      ...Array.from({ length: cleared }, () => Array<Cell>(COLS).fill(null)),
      ...remaining,
    ];
    if (cleared > 0) {
      const lineScores = [0, 100, 300, 500, 800];
      engine.score += lineScores[cleared] * engine.level;
      engine.lines += cleared;
      engine.level = Math.floor(engine.lines / 10) + 1;
      audio.play(cleared === 4 ? "tetris" : "line");
      vibrate(cleared === 4 ? [18, 25, 30] : 18);
      setMessage(cleared === 4 ? "4줄 클리어! 한 번에 정리했어요." : `${cleared}줄을 정리했어요.`);
    } else {
      audio.play("drop");
    }

    engine.current = spawnPiece(engine.nextKind);
    engine.nextKind = takeKind(engine);
    if (collides(engine.board, engine.current)) {
      endGame(engine);
      return;
    }
    setSnapshot(snapshotOf(engine));
  }, [audio, endGame, vibrate]);

  const stepDown = useCallback((manual = false) => {
    const engine = engineRef.current;
    if (engine.status !== "playing") return;
    const candidate = { ...engine.current, y: engine.current.y + 1 };
    if (collides(engine.board, candidate)) {
      lockPiece(engine);
      return;
    }
    engine.current = candidate;
    if (manual) engine.score += 1;
    setSnapshot(snapshotOf(engine));
  }, [lockPiece]);

  const move = useCallback((direction: -1 | 1) => {
    const engine = engineRef.current;
    if (engine.status !== "playing") return;
    const candidate = { ...engine.current, x: engine.current.x + direction };
    if (collides(engine.board, candidate)) return;
    engine.current = candidate;
    setSnapshot(snapshotOf(engine));
    audio.play("move");
  }, [audio]);

  const rotate = useCallback(() => {
    const engine = engineRef.current;
    if (engine.status !== "playing") return;
    const rotated = { ...engine.current, rotation: (engine.current.rotation + 1) % 4 };
    for (const offset of [0, -1, 1, -2, 2]) {
      const candidate = { ...rotated, x: rotated.x + offset };
      if (!collides(engine.board, candidate)) {
        engine.current = candidate;
        setSnapshot(snapshotOf(engine));
        audio.play("rotate");
        return;
      }
    }
  }, [audio]);

  const hardDrop = useCallback(() => {
    const engine = engineRef.current;
    if (engine.status !== "playing") return;
    let distance = 0;
    while (!collides(engine.board, { ...engine.current, y: engine.current.y + 1 })) {
      engine.current.y += 1;
      distance += 1;
    }
    engine.score += distance * 2;
    lockPiece(engine);
  }, [lockPiece]);

  const beginGame = useCallback(() => {
    const engine = makeEngine();
    engineRef.current = engine;
    setSnapshot(snapshotOf(engine));
    setMessage("블록을 빈틈없이 쌓아 가로줄을 완성하세요.");
    void audio.startBgm();
  }, [audio]);

  const requestStart = useCallback(async () => {
    await audio.startBgm();
    pendingStartRef.current = true;
    const preparation = await leaderboard.createGameSession();
    if (!preparation.ready) return;
    pendingStartRef.current = false;
    beginGame();
  }, [audio, beginGame, leaderboard.createGameSession]);

  const togglePause = useCallback(() => {
    const engine = engineRef.current;
    if (engine.status === "playing") {
      engine.status = "paused";
      audio.stopBgm();
      setMessage("잠시 멈췄어요. 준비되면 계속하기를 누르세요.");
    } else if (engine.status === "paused") {
      engine.status = "playing";
      void audio.startBgm();
      setMessage("다시 시작합니다!");
    }
    setSnapshot(snapshotOf(engine));
  }, [audio]);

  useEffect(() => {
    if (snapshot.status !== "playing") return;
    const delay = Math.max(95, 760 - (snapshot.level - 1) * 55);
    const timer = window.setInterval(() => stepDown(false), delay);
    return () => window.clearInterval(timer);
  }, [snapshot.level, snapshot.status, stepDown]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, button")) return;
      if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "].includes(event.key)) event.preventDefault();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowDown") stepDown(true);
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "x") rotate();
      if (event.key === " ") hardDrop();
      if (event.key.toLowerCase() === "p") togglePause();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hardDrop, move, rotate, stepDown, togglePause]);

  const renderedCells = useMemo(() => {
    const cells = snapshot.board.map((row) => row.map((kind) => ({ kind, ghost: false })));
    if (snapshot.status === "playing" || snapshot.status === "paused") {
      const ghost = ghostFor(snapshot.board, snapshot.current);
      pieceCells(ghost).forEach(({ x, y }) => {
        if (y >= 0 && y < ROWS && cells[y][x].kind === null) cells[y][x] = { kind: ghost.kind, ghost: true };
      });
      pieceCells(snapshot.current).forEach(({ x, y }) => {
        if (y >= 0 && y < ROWS) cells[y][x] = { kind: snapshot.current.kind, ghost: false };
      });
    }
    return cells.flat();
  }, [snapshot]);

  const nextCells = useMemo(() => {
    const cells = Array.from({ length: 16 }, () => false);
    SHAPES[snapshot.nextKind][0].forEach(([x, y]) => { cells[y * 4 + x] = true; });
    return cells;
  }, [snapshot.nextKind]);

  return (
    <div className={styles.shell}>
      <div className={styles.gameLayout}>
        <section className={styles.playPanel} aria-label="MAKEON 파스텔 블록 퍼즐 게임">
          <div className={styles.topBar}>
            <div><span>점수</span><strong>{snapshot.score.toLocaleString()}</strong></div>
            <div><span>라인</span><strong>{snapshot.lines}</strong></div>
            <div><span>레벨</span><strong>{snapshot.level}</strong></div>
            <div><span>내 최고</span><strong>{bestScore.toLocaleString()}</strong></div>
          </div>

          <div className={styles.stageRow}>
            <div className={styles.boardWrap}>
              <div className={styles.board} role="group" aria-label={`블록 퍼즐 보드, 점수 ${snapshot.score}점, ${snapshot.lines}줄 삭제`}>
                {renderedCells.map((cell, index) => (
                  <span
                    className={`${styles.cell} ${cell.kind ? styles.filled : ""} ${cell.ghost ? styles.ghost : ""}`}
                    key={index}
                    style={cell.kind ? { backgroundColor: COLORS[cell.kind] } : undefined}
                  />
                ))}
                {snapshot.status !== "playing" ? (
                  <div className={styles.overlay}>
                    <strong>{snapshot.status === "paused" ? "일시정지" : snapshot.status === "over" ? "게임 오버" : "READY"}</strong>
                    <button type="button" onClick={snapshot.status === "paused" ? togglePause : () => void requestStart()}>
                      {snapshot.status === "paused" ? "계속하기" : snapshot.status === "over" ? "다시 도전" : "게임 시작"}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <aside className={styles.sidePanel}>
              <div className={styles.nextCard}>
                <span>다음 블록</span>
                <div className={styles.previewGrid} aria-label={`다음 블록 ${snapshot.nextKind}`}>
                  {nextCells.map((filled, index) => (
                    <i key={index} style={filled ? { backgroundColor: COLORS[snapshot.nextKind] } : undefined} />
                  ))}
                </div>
              </div>
              <button type="button" className={styles.pauseButton} disabled={snapshot.status === "ready" || snapshot.status === "over"} onClick={togglePause}>
                {snapshot.status === "paused" ? "계속하기" : "일시정지"}
              </button>
            </aside>
          </div>

          <p className={styles.message} aria-live="polite">{message}</p>

          <div className={styles.mobileControls} aria-label="블록 퍼즐 조작 버튼">
            <button type="button" onClick={() => move(-1)} aria-label="왼쪽 이동">←</button>
            <button type="button" onClick={() => stepDown(true)} aria-label="아래로 이동">↓</button>
            <button type="button" onClick={() => move(1)} aria-label="오른쪽 이동">→</button>
            <button type="button" onClick={rotate} aria-label="블록 회전">↻</button>
            <button type="button" className={styles.dropButton} onClick={hardDrop}>바로 놓기</button>
          </div>
        </section>

        <aside className={styles.settingsPanel}>
          <div>
            <p className="eyebrow">GAME SETTINGS</p>
            <h2>게임 설정</h2>
          </div>
          <div className={styles.toggleGrid}>
            <button type="button" aria-pressed={audio.soundEnabled} onClick={() => audio.setSoundEnabled(!audio.soundEnabled)}>
              효과음 {audio.soundEnabled ? "켜짐" : "꺼짐"}
            </button>
            <button type="button" aria-pressed={audio.bgmEnabled} onClick={() => audio.setBgmEnabled(!audio.bgmEnabled)}>
              BGM {audio.bgmEnabled ? "켜짐" : "꺼짐"}
            </button>
            {vibrationSupported ? (
              <button type="button" aria-pressed={vibrationEnabled} onClick={() => {
                const next = !vibrationEnabled;
                setVibrationEnabled(next);
                try {
                  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
                  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...stored, vibration: next }));
                } catch {}
              }}>
                진동 {vibrationEnabled ? "켜짐" : "꺼짐"}
              </button>
            ) : null}
          </div>
          <label className={styles.volumeControl}>
            <span>음량 <strong>{Math.round(audio.volume * 100)}%</strong></span>
            <input type="range" min="0" max="0.5" step="0.05" value={audio.volume} onChange={(event) => audio.setVolume(Number(event.target.value))} />
          </label>
          <div className={styles.instructions}>
            <strong>조작 방법</strong>
            <p><span>PC</span> ← → 이동 · ↑ 회전 · ↓ 내리기 · Space 바로 놓기 · P 일시정지</p>
            <p><span>모바일</span> 게임판 아래의 큰 조작 버튼을 사용하세요.</p>
          </div>
          <ScoreSubmitResult status={leaderboard.submissionStatus} result={leaderboard.submissionResult} error={leaderboard.submissionError} />
        </aside>
      </div>

      <Leaderboard
        game="tetris"
        configured={leaderboard.configured}
        nickname={leaderboard.nickname}
        period={leaderboard.period}
        entries={leaderboard.entries}
        myBest={leaderboard.myBest}
        loading={leaderboard.rankingLoading}
        error={leaderboard.rankingError}
        onPeriodChange={leaderboard.setPeriod}
        onRefresh={leaderboard.refreshRankings}
        onEditNickname={leaderboard.openNickname}
      />

      <NicknameDialog
        open={leaderboard.nicknameOpen}
        initialNickname={leaderboard.nickname ?? ""}
        saving={leaderboard.nicknameSaving}
        serverError={leaderboard.nicknameError}
        onClose={() => {
          const shouldStartOffline = pendingStartRef.current;
          pendingStartRef.current = false;
          leaderboard.closeNickname();
          if (shouldStartOffline) beginGame();
        }}
        onSave={async (nickname) => {
          const saved = await leaderboard.saveNickname(nickname);
          if (!saved || !pendingStartRef.current) return;
          const preparation = await leaderboard.createGameSession();
          if (preparation.ready) {
            pendingStartRef.current = false;
            beginGame();
          }
        }}
      />
    </div>
  );
}
