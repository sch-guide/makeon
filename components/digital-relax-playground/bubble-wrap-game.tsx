"use client";

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type BubbleSize = "small" | "medium" | "large";
type BoardSize = "compact" | "normal" | "wide";
type BubbleTheme = "rainbow" | "peach" | "mint" | "lavender";

type Props = {
  reducedMotion: boolean;
  onPop: (golden: boolean) => void;
};

type BubbleStyle = CSSProperties & {
  "--bubble-a": string;
  "--bubble-b": string;
};

const boardCounts: Record<BoardSize, number> = {
  compact: 20,
  normal: 30,
  wide: 40,
};

const boardColumns: Record<BoardSize, number> = {
  compact: 5,
  normal: 6,
  wide: 8,
};

const themeColors: Record<BubbleTheme, Array<[string, string]>> = {
  rainbow: [
    ["#ffbad1", "#ee8eb7"],
    ["#d6b8ff", "#ac91e8"],
    ["#a9ddff", "#79bae5"],
    ["#9ee7dc", "#70c7ba"],
    ["#ffd3a3", "#f0ad74"],
    ["#d9e9a2", "#afd174"],
  ],
  peach: [
    ["#ffc5bd", "#ef978e"],
    ["#ffd7b0", "#efb57d"],
    ["#ffb7cf", "#e98dab"],
  ],
  mint: [
    ["#b5eadf", "#7ccdbc"],
    ["#d3ebad", "#9fc779"],
    ["#a8e4dc", "#6dbeb2"],
  ],
  lavender: [
    ["#ddc6ff", "#af8fe5"],
    ["#c9c4ff", "#9791e3"],
    ["#f0c9ee", "#d798d3"],
  ],
};

export function BubbleWrapGame({ reducedMotion, onPop }: Props) {
  const [bubbleSize, setBubbleSize] = useState<BubbleSize>("medium");
  const [boardSize, setBoardSize] = useState<BoardSize>("normal");
  const [theme, setTheme] = useState<BubbleTheme>("rainbow");
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
    const timer = window.setTimeout(resetBoard, reducedMotion ? 400 : 1100);
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
    <section className={`relax-bubble-game theme-${theme}`} aria-labelledby="bubble-game-title">
      <div className="relax-bubble-intro">
        <div>
          <p className="eyebrow">SOFT GEL BUBBLE WRAP</p>
          <h3 id="bubble-game-title">말랑한 젤 버블을 터뜨려 보세요.</h3>
          <p>한 번 눌러 터뜨리거나 손가락을 끌어 연속으로 터뜨릴 수 있어요.</p>
        </div>
        <strong aria-live="polite">
          <span>{popped.size}</span> / {count}
        </strong>
      </div>

      <div className="relax-bubble-stage">
        <div
          className={`relax-bubble-tray is-${bubbleSize}`}
          style={{ "--board-columns": boardColumns[boardSize] } as CSSProperties}
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
            const colors = themeColors[theme][index % themeColors[theme].length];
            const bubbleStyle: BubbleStyle = {
              "--bubble-a": colors[0],
              "--bubble-b": colors[1],
            };

            return (
              <button
                type="button"
                className={`${isPopped ? "is-popped" : ""} ${isGolden ? "is-golden" : ""}`}
                style={bubbleStyle}
                data-bubble-index={index}
                aria-label={`${index + 1}번 ${isGolden ? "황금 " : ""}버블${isPopped ? ", 터짐" : ""}`}
                aria-pressed={isPopped}
                disabled={isPopped}
                onPointerDown={() => popBubble(index)}
                key={`${boardId}-${index}`}
              >
                <span className="relax-bubble-membrane" aria-hidden="true">
                  <span className="relax-bubble-shine" />
                  <span className="relax-bubble-wrinkles" />
                  {isGolden ? <span className="relax-golden-star">★</span> : null}
                </span>
              </button>
            );
          })}
        </div>
        <div className="relax-stage-glow" aria-hidden="true" />
      </div>

      <p className="relax-game-status" aria-live="polite">
        {popped.size === count
          ? "모든 버블을 터뜨렸어요. 새 판을 준비합니다."
          : isFinite(count - popped.size)
            ? `남은 버블 ${count - popped.size}개 · 황금 버블을 찾아보세요.`
            : ""}
      </p>

      <div className="relax-bubble-options">
        <label>
          <span>색상 테마</span>
          <select
            value={theme}
            onChange={(event) => {
              setTheme(event.target.value as BubbleTheme);
              resetBoard();
            }}
          >
            <option value="rainbow">파스텔 믹스</option>
            <option value="peach">복숭아 크림</option>
            <option value="mint">민트 소다</option>
            <option value="lavender">라벤더 젤</option>
          </select>
        </label>
        <label>
          <span>버블 크기</span>
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
          <span>버블판 크기</span>
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
          버블판 새로 채우기
        </button>
      </div>
    </section>
  );
}
