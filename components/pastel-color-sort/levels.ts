import type { ColorId, LevelDefinition, PuzzleMove, Tube } from "./types";
import { TUBE_CAPACITY } from "./types";

export const COLOR_ORDER: ColorId[] = [
  "rose",
  "lavender",
  "sky",
  "mint",
  "apricot",
  "lemon",
  "sage",
  "coral",
  "plum",
  "aqua",
];

export const COLOR_META: Record<ColorId, { name: string; symbol: string }> = {
  rose: { name: "연분홍", symbol: "●" },
  lavender: { name: "연보라", symbol: "◆" },
  sky: { name: "하늘", symbol: "▲" },
  mint: { name: "민트", symbol: "✦" },
  apricot: { name: "살구", symbol: "■" },
  lemon: { name: "레몬", symbol: "＋" },
  sage: { name: "세이지", symbol: "≋" },
  coral: { name: "코랄", symbol: "♥" },
  plum: { name: "자두", symbol: "⬟" },
  aqua: { name: "아쿠아", symbol: "✣" },
};

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function cloneTubes(tubes: Tube[]) {
  return tubes.map((tube) => [...tube]);
}

function createReversePuzzle(colorCount: number, seed: number, _requestedMoves: number) {
  const colors = COLOR_ORDER.slice(0, colorCount);
  const tubes = [
    ...colors.map((color) => Array(TUBE_CAPACITY).fill(color) as ColorId[]),
    [],
    [],
    [],
  ];
  const random = mulberry32(seed);
  const sources = colors.map((_, index) => index);
  const reversed: PuzzleMove[] = [];

  for (let index = sources.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [sources[index], sources[swap]] = [sources[swap], sources[index]];
  }

  const reverseMove = (from: number, to: number, count: number) => {
    const color = tubes[from][tubes[from].length - 1];
    const moved = tubes[from].splice(-count);
    tubes[to].push(...moved);
    reversed.push({ from, to, count, color });
  };

  // Two colors are crossed as A…B / B…A. Reversing these four steps is always
  // legal under the player rules, while three empty work tubes remain available.
  while (sources.length >= 3) {
    const sourceA = sources.shift()!;
    const sourceB = sources.shift()!;
    const [emptyA, emptyB] = tubes
      .map((tube, index) => (tube.length === 0 ? index : -1))
      .filter((index) => index >= 0)
      .slice(0, 2);
    const split = 1 + Math.floor(random() * 3);
    reverseMove(sourceA, emptyA, split);
    reverseMove(sourceB, emptyB, split);
    reverseMove(sourceA, emptyB, TUBE_CAPACITY - split);
    reverseMove(sourceB, emptyA, TUBE_CAPACITY - split);
  }

  // One final split leaves exactly two empty tubes in every playable layout.
  const lastSource = sources.shift()!;
  const lastEmpty = tubes.findIndex((tube) => tube.length === 0);
  reverseMove(lastSource, lastEmpty, 1 + Math.floor(random() * 3));

  const solution = reversed
    .slice()
    .reverse()
    .map((move) => ({ ...move, from: move.to, to: move.from }));
  return { tubes, solution };
}

function colorCountForLevel(level: number) {
  if (level <= 5) return 3;
  if (level <= 15) return 5 + Math.floor((level - 6) / 4);
  if (level <= 25) return 7 + Math.floor((level - 16) / 4);
  return level <= 27 ? 9 : 10;
}

export const LEVELS: LevelDefinition[] = Array.from({ length: 30 }, (_, index) => {
  const id = index + 1;
  const colorCount = colorCountForLevel(id);
  const scrambleMoves = Math.min(colorCount * 3, 7 + Math.floor(id * 0.7));
  const seed = 104729 + id * 1543;
  const generated = createReversePuzzle(colorCount, seed, scrambleMoves);
  const recommendedMoves = Math.max(5, generated.solution.length || colorCount + 1);
  return { id, colorCount, seed, scrambleMoves, recommendedMoves, ...generated };
});

export function createLevelVariant(level: number, variant: number) {
  const base = LEVELS[level - 1];
  const generated = createReversePuzzle(
    base.colorCount,
    base.seed + variant * 100003,
    base.scrambleMoves,
  );
  return { ...base, ...generated, recommendedMoves: generated.solution.length || base.recommendedMoves };
}
