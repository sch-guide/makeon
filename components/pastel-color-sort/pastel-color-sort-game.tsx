"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { COLOR_META, LEVELS, createLevelVariant } from "./levels";
import {
  applyMove,
  cloneTubes,
  colorSummary,
  getHint,
  getMove,
  isPuzzleComplete,
  isTubeComplete,
} from "./game-logic";
import type { PuzzleMove, SavedProgress, Tube } from "./types";
import { TUBE_CAPACITY } from "./types";
import { usePastelAudio } from "./use-pastel-audio";

const STORAGE_KEY = "makeon-pastel-color-sort-v1";
const defaultProgress: SavedProgress = {
  unlockedLevel: 1,
  lastLevel: 1,
  soundEnabled: false,
  patternsEnabled: true,
  records: {},
};

type Transfer = PuzzleMove & {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

function starsFor(moves: number, recommended: number) {
  if (moves <= recommended) return 3;
  if (moves <= recommended + Math.max(3, Math.ceil(recommended * 0.35))) return 2;
  return 1;
}

export function PastelColorSortGame() {
  const [progress, setProgress] = useState<SavedProgress>(defaultProgress);
  const [levelNumber, setLevelNumber] = useState(1);
  const [variant, setVariant] = useState(0);
  const level = useMemo(
    () => (variant ? createLevelVariant(levelNumber, variant) : LEVELS[levelNumber - 1]),
    [levelNumber, variant],
  );
  const [tubes, setTubes] = useState<Tube[]>(() => cloneTubes(LEVELS[0].tubes));
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [history, setHistory] = useState<Array<{ tubes: Tube[]; moves: number }>>([]);
  const [hint, setHint] = useState<PuzzleMove | null>(null);
  const [transfer, setTransfer] = useState<Transfer | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [status, setStatus] = useState("첫 번째 용기를 선택해 주세요.");
  const [hydrated, setHydrated] = useState(false);
  const tubeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const timersRef = useRef<number[]>([]);
  const playSound = usePastelAudio(progress.soundEnabled);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const loadLevel = useCallback((nextLevel: number, nextVariant = 0) => {
    clearTimers();
    const definition = nextVariant
      ? createLevelVariant(nextLevel, nextVariant)
      : LEVELS[nextLevel - 1];
    setLevelNumber(nextLevel);
    setVariant(nextVariant);
    setTubes(cloneTubes(definition.tubes));
    setSelected(null);
    setMoves(0);
    setHintsUsed(0);
    setHistory([]);
    setHint(null);
    setTransfer(null);
    setCompleted(false);
    setShowLevels(false);
    setStatus(`${nextLevel}레벨을 시작합니다. 옮길 용기를 선택해 주세요.`);
    setProgress((current) => ({ ...current, lastLevel: nextLevel }));
  }, [clearTimers]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const saved = raw ? (JSON.parse(raw) as Partial<SavedProgress>) : {};
      const merged: SavedProgress = {
        ...defaultProgress,
        ...saved,
        records: saved.records ?? {},
        unlockedLevel: Math.min(30, Math.max(1, saved.unlockedLevel ?? 1)),
        lastLevel: Math.min(30, Math.max(1, saved.lastLevel ?? 1)),
      };
      setProgress(merged);
      setLevelNumber(merged.lastLevel);
      setTubes(cloneTubes(LEVELS[merged.lastLevel - 1].tubes));
    } catch {
      setProgress(defaultProgress);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage may be unavailable in private browsing; gameplay remains in memory.
    }
  }, [hydrated, progress]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const completeMove = useCallback((move: PuzzleMove) => {
    const next = applyMove(tubes, move);
    const nextMoveCount = moves + 1;
    setHistory((current) => [...current.slice(-39), { tubes: cloneTubes(tubes), moves }]);
    setTubes(next);
    setMoves(nextMoveCount);
    setTransfer(null);
    setSelected(null);
    setHint(null);

    const targetComplete = isTubeComplete(next[move.to]);
    if (targetComplete) playSound("complete");
    else playSound("land");

    if (isPuzzleComplete(next)) {
      const earnedStars = starsFor(nextMoveCount, level.recommendedMoves);
      setCompleted(true);
      setStatus(`레벨 완료! ${nextMoveCount}번 이동해 별 ${earnedStars}개를 얻었습니다.`);
      setProgress((current) => {
        const previous = current.records[levelNumber];
        return {
          ...current,
          unlockedLevel: Math.min(30, Math.max(current.unlockedLevel, levelNumber + 1)),
          records: {
            ...current.records,
            [levelNumber]: {
              moves: previous?.moves ? Math.min(previous.moves, nextMoveCount) : nextMoveCount,
              stars: Math.max(previous?.stars ?? 0, earnedStars),
            },
          },
        };
      });
      const winTimer = window.setTimeout(() => playSound("win"), 100);
      timersRef.current.push(winTimer);
    } else {
      setStatus(`${COLOR_META[move.color].name} ${move.count}개를 옮겼습니다.`);
    }
  }, [level.recommendedMoves, levelNumber, moves, playSound, tubes]);

  const startMove = useCallback((move: PuzzleMove) => {
    const source = tubeRefs.current[move.from]?.getBoundingClientRect();
    const target = tubeRefs.current[move.to]?.getBoundingClientRect();
    if (!source || !target) {
      completeMove(move);
      return;
    }
    playSound("move");
    setTransfer({
      ...move,
      startX: source.left + source.width / 2,
      startY: source.top + 32,
      endX: target.left + target.width / 2,
      endY: target.top + 32,
    });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => completeMove(move), reduced ? 80 : 460);
    timersRef.current.push(timer);
  }, [completeMove, playSound]);

  const onTubePress = useCallback((index: number) => {
    if (transfer || completed) return;
    if (selected === null) {
      if (tubes[index].length === 0 || isTubeComplete(tubes[index])) {
        playSound("invalid");
        setStatus(tubes[index].length ? "완성된 용기는 그대로 두는 편이 좋아요." : "비어 있는 용기입니다. 색상이 든 용기를 먼저 선택해 주세요.");
        return;
      }
      setSelected(index);
      setHint(null);
      playSound("select");
      setStatus(`${index + 1}번 용기를 선택했습니다. 옮길 용기를 선택해 주세요.`);
      return;
    }
    if (selected === index) {
      setSelected(null);
      setStatus("선택을 해제했습니다.");
      return;
    }
    const move = getMove(tubes, selected, index);
    if (!move) {
      playSound("invalid");
      setStatus("그곳으로는 옮길 수 없어요. 비어 있거나 같은 색이 맨 위에 있어야 합니다.");
      return;
    }
    startMove(move);
  }, [completed, playSound, selected, startMove, transfer, tubes]);

  const validTargets = useMemo(() => {
    if (selected === null) return new Set<number>();
    return new Set(tubes.map((_, index) => index).filter((index) => getMove(tubes, selected, index)));
  }, [selected, tubes]);

  const undo = () => {
    if (transfer || completed || history.length === 0) return;
    const previous = history[history.length - 1];
    setTubes(cloneTubes(previous.tubes));
    setMoves(previous.moves);
    setHistory((current) => current.slice(0, -1));
    setSelected(null);
    setHint(null);
    setStatus("한 수 전으로 되돌렸습니다.");
  };

  const showHint = () => {
    if (transfer || completed) return;
    const suggested = getHint(tubes);
    if (!suggested) {
      setStatus("지금 추천할 수 있는 이동이 없습니다. 한 수 되돌리기를 사용해 보세요.");
      return;
    }
    setHint(suggested);
    setHintsUsed((count) => count + 1);
    setStatus(`${suggested.from + 1}번에서 ${suggested.to + 1}번 용기로 옮겨 보세요. 힌트는 정답 경로를 보장하지 않습니다.`);
    const timer = window.setTimeout(() => setHint(null), 2100);
    timersRef.current.push(timer);
  };

  const onTubeKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const columns = window.innerWidth < 520 ? 3 : window.innerWidth < 820 ? 4 : 6;
    const delta = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" ? -columns : columns;
    const next = Math.min(tubes.length - 1, Math.max(0, index + delta));
    tubeRefs.current[next]?.focus();
  };

  const best = progress.records[levelNumber]?.moves;
  const earnedStars = completed ? starsFor(moves, level.recommendedMoves) : 0;

  return (
    <div className="pastel-sort-app">
      <div className="pastel-sort-toolbar">
        <div className="pastel-sort-title">
          <span>PASTEL SORT</span>
          <h2>파스텔 컬러 정렬 퍼즐</h2>
        </div>
        <dl className="pastel-sort-stats">
          <div><dt>레벨</dt><dd>{levelNumber} / 30</dd></div>
          <div><dt>이동</dt><dd>{moves}</dd></div>
          <div><dt>최고 기록</dt><dd>{best ? `${best}회` : "—"}</dd></div>
        </dl>
        <div className="pastel-sort-quick-actions">
          <button
            type="button"
            aria-pressed={progress.soundEnabled}
            onClick={() => setProgress((current) => ({ ...current, soundEnabled: !current.soundEnabled }))}
          >
            <span aria-hidden="true">{progress.soundEnabled ? "♪" : "♩"}</span>
            {progress.soundEnabled ? "소리 켬" : "소리 끔"}
          </button>
          <button type="button" onClick={() => loadLevel(levelNumber, variant)}>↻ 다시 시작</button>
        </div>
      </div>

      <div className="pastel-sort-board-shell">
        <div className="pastel-sort-board" aria-label={`${levelNumber}레벨 컬러 정렬 보드`}>
          {tubes.map((tube, index) => {
            const complete = isTubeComplete(tube);
            const isSelected = selected === index;
            const isHintFrom = hint?.from === index;
            const isHintTo = hint?.to === index;
            return (
              <button
                className={`pastel-tube${isSelected ? " is-selected" : ""}${validTargets.has(index) ? " is-valid-target" : ""}${complete ? " is-complete" : ""}${isHintFrom ? " is-hint-from" : ""}${isHintTo ? " is-hint-to" : ""}`}
                type="button"
                key={index}
                ref={(node) => { tubeRefs.current[index] = node; }}
                onClick={() => onTubePress(index)}
                onKeyDown={(event) => onTubeKeyDown(event, index)}
                aria-pressed={isSelected}
                aria-label={`${index + 1}번째 용기, ${colorSummary(tube, (color) => COLOR_META[color].name)}${complete ? ", 완성" : ""}`}
                disabled={Boolean(transfer)}
              >
                <span className="pastel-tube-number" aria-hidden="true">{index + 1}</span>
                <span className="pastel-tube-glass" aria-hidden="true">
                  <span className="pastel-tube-shine" />
                  {Array.from({ length: TUBE_CAPACITY }, (_, slot) => {
                    const color = tube[slot];
                    return (
                      <span className={`pastel-layer-slot${color ? ` color-${color}` : ""}`} key={slot}>
                        {color && progress.patternsEnabled ? COLOR_META[color].symbol : ""}
                      </span>
                    );
                  })}
                </span>
                {complete && <span className="pastel-tube-check" aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>

        {transfer && (
          <div
            className={`pastel-transfer color-${transfer.color}`}
            style={{
              "--start-x": `${transfer.startX}px`,
              "--start-y": `${transfer.startY}px`,
              "--end-x": `${transfer.endX}px`,
              "--end-y": `${transfer.endY}px`,
              "--transfer-count": transfer.count,
            } as CSSProperties}
            aria-hidden="true"
          >
            {progress.patternsEnabled ? COLOR_META[transfer.color].symbol : ""}
          </div>
        )}

        <p className="pastel-sort-live" aria-live="polite">{status}</p>

        <div className="pastel-color-legend" aria-label="색상 안내">
          {COLOR_META && Object.entries(COLOR_META).slice(0, level.colorCount).map(([color, meta]) => (
            <span key={color}><i className={`color-${color}`} aria-hidden="true">{progress.patternsEnabled ? meta.symbol : ""}</i>{meta.name}</span>
          ))}
        </div>
      </div>

      <div className="pastel-sort-controls" aria-label="게임 조작">
        <button type="button" onClick={undo} disabled={history.length === 0 || Boolean(transfer) || completed}>↶ 한 수 되돌리기</button>
        <button type="button" onClick={showHint} disabled={Boolean(transfer) || completed}>✦ 힌트 <small>{hintsUsed}회</small></button>
        <button type="button" onClick={() => loadLevel(levelNumber, variant + 1)} disabled={Boolean(transfer)}>⤨ 새 배치</button>
        <button type="button" onClick={() => loadLevel(Math.min(30, levelNumber + 1))} disabled={!completed || levelNumber === 30}>다음 레벨 →</button>
        <button type="button" onClick={() => setShowLevels(true)}>▦ 레벨 선택</button>
        <button
          type="button"
          aria-pressed={progress.patternsEnabled}
          onClick={() => setProgress((current) => ({ ...current, patternsEnabled: !current.patternsEnabled }))}
        >
          {progress.patternsEnabled ? "패턴 켬" : "패턴 끔"}
        </button>
      </div>

      {showLevels && (
        <div className="pastel-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowLevels(false);
        }}>
          <section className="pastel-level-modal" role="dialog" aria-modal="true" aria-labelledby="level-modal-title">
            <div><div><p>LEVEL MAP</p><h2 id="level-modal-title">레벨 선택</h2></div><button type="button" onClick={() => setShowLevels(false)} aria-label="레벨 선택 닫기">×</button></div>
            <div className="pastel-level-grid">
              {LEVELS.map((item) => {
                const unlocked = item.id <= progress.unlockedLevel;
                const record = progress.records[item.id];
                return (
                  <button type="button" key={item.id} disabled={!unlocked} onClick={() => loadLevel(item.id)} aria-label={`${item.id}레벨${unlocked ? `, 별 ${record?.stars ?? 0}개, 최고 ${record?.moves ?? "기록 없음"}` : ", 잠김"}`}>
                    <strong>{unlocked ? item.id : "🔒"}</strong>
                    <span>{record?.stars ? "★".repeat(record.stars) : unlocked ? "☆☆☆" : "잠김"}</span>
                    <small>{record?.moves ? `${record.moves}회` : "—"}</small>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {completed && (
        <div className="pastel-modal-backdrop pastel-success-backdrop">
          <section className="pastel-success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title">
            <div className="pastel-confetti" aria-hidden="true">● ◆ ✦ ● ◆</div>
            <p>LEVEL {levelNumber} CLEAR</p>
            <h2 id="success-title">레벨 완료!</h2>
            <div className="pastel-stars" aria-label={`별 ${earnedStars}개`}>{"★".repeat(earnedStars)}{"☆".repeat(3 - earnedStars)}</div>
            <dl><div><dt>이동</dt><dd>{moves}회</dd></div><div><dt>힌트</dt><dd>{hintsUsed}회</dd></div><div><dt>개인 최고</dt><dd>{progress.records[levelNumber]?.moves ?? moves}회</dd></div></dl>
            <div>
              <button type="button" className="button button-secondary" onClick={() => loadLevel(levelNumber, variant)}>다시 플레이</button>
              {levelNumber < 30 && <button type="button" className="button button-primary" onClick={() => loadLevel(levelNumber + 1)}>다음 레벨</button>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
