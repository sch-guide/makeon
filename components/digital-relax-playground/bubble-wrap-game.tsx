"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type BubbleSize = "small" | "medium" | "large";
type BoardSize = "compact" | "normal" | "wide";

type Props = {
  reducedMotion: boolean;
  onPop: (golden: boolean) => void;
};

const boardCounts: Record<BoardSize, number> = {
  compact: 20,
  normal: 35,
  wide: 48,
};

export function BubbleWrapGame({ reducedMotion, onPop }: Props) {
  const [bubbleSize, setBubbleSize] = useState<BubbleSize>("medium");
  const [boardSize, setBoardSize] = useState<BoardSize>("normal");
  const [boardId, setBoardId] = useState(0);
  const draggingRef = useRef(false);
  const poppedRef = useRef<Set<number>>(new Set());
  const count = boardCounts[boardSize];
  const goldenIndex = useMemo(
    () => Math.floor(Math.random() * count),
    [boardId, count],
  );
  const [popped, setPopped] = useState<Set<number>>(() => new Set());

  const resetBoard = useCallback(() => {
    poppedRef.current = new Set();
    setPopped(new Set());
    setBoardId((current) => current + 1);
  }, []);

  useEffect(() => {
    if (popped.size !== count) return;
    const timer = window.setTimeout(resetBoard, reducedMotion ? 250 : 750);
    return () => window.clearTimeout(timer);
  }, [count, popped.size, reducedMotion, resetBoard]);

  const popBubble = useCallback(
    (index: number) => {
      if (poppedRef.current.has(index)) return;
      const golden = index === goldenIndex;
      const next = new Set(poppedRef.current);
      next.add(index);
      poppedRef.current = next;
      setPopped(next);
      onPop(golden);
    },
    [goldenIndex, onPop],
  );

  const handleDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLButtonElement>("[data-bubble-index]");
    if (!target) return;
    popBubble(Number(target.dataset.bubbleIndex));
  };

  return (
    <section className="relax-game-card" aria-labelledby="bubble-game-title">
      <div className="relax-game-heading">
        <div>
          <p className="eyebrow">GAME 01</p>
          <h2 id="bubble-game-title">디지털 버블랩 터뜨리기</h2>
          <p>버블을 누르거나 드래그해 연속으로 터뜨려보세요.</p>
        </div>
        <strong aria-live="polite">{popped.size}/{count}</strong>
      </div>

      <div className="relax-inline-settings">
        <label>
          버블 크기
          <select
            value={bubbleSize}
            onChange={(event) => setBubbleSize(event.target.value as BubbleSize)}
          >
            <option value="small">작게</option>
            <option value="medium">보통</option>
            <option value="large">크게</option>
          </select>
        </label>
        <label>
          판 크기
          <select
            value={boardSize}
            onChange={(event) => {
              setBoardSize(event.target.value as BoardSize);
              resetBoard();
            }}
          >
            <option value="compact">작은 판</option>
            <option value="normal">보통 판</option>
            <option value="wide">큰 판</option>
          </select>
        </label>
        <button type="button" className="button button-secondary" onClick={resetBoard}>
          새 판
        </button>
      </div>

      <div
        className={`relax-bubble-board is-${bubbleSize}`}
        onPointerDown={(event) => {
          draggingRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={handleDrag}
        onPointerUp={(event) => {
          draggingRef.current = false;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
      >
        {Array.from({ length: count }, (_, index) => {
          const isPopped = popped.has(index);
          const isGolden = index === goldenIndex;
          return (
            <button
              type="button"
              className={`${isPopped ? "is-popped" : ""} ${isGolden ? "is-golden" : ""}`}
              data-bubble-index={index}
              aria-label={`${index + 1}번 ${isGolden ? "황금 " : ""}버블${isPopped ? ", 터짐" : ""}`}
              aria-pressed={isPopped}
              disabled={isPopped}
              onPointerDown={() => popBubble(index)}
              key={`${boardId}-${index}`}
            >
              <span aria-hidden="true">{isGolden && !isPopped ? "✦" : ""}</span>
            </button>
          );
        })}
      </div>
      <p className="relax-game-status" aria-live="polite">
        {popped.size === count
          ? "모든 버블을 터뜨렸어요. 새 판을 준비합니다."
          : `남은 버블 ${count - popped.size}개`}
      </p>
    </section>
  );
}
