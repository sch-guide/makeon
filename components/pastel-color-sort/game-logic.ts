import type { ColorId, PuzzleMove, Tube } from "./types";
import { TUBE_CAPACITY } from "./types";

export function cloneTubes(tubes: Tube[]) {
  return tubes.map((tube) => [...tube]);
}

export function topGroup(tube: Tube) {
  const color = tube[tube.length - 1];
  if (!color) return null;
  let count = 1;
  for (let index = tube.length - 2; index >= 0 && tube[index] === color; index -= 1) {
    count += 1;
  }
  return { color, count };
}

export function getMove(tubes: Tube[], from: number, to: number): PuzzleMove | null {
  if (from === to) return null;
  const source = tubes[from];
  const target = tubes[to];
  const group = topGroup(source);
  if (!group || target.length >= TUBE_CAPACITY) return null;
  const targetTop = target[target.length - 1];
  if (targetTop && targetTop !== group.color) return null;
  return {
    from,
    to,
    color: group.color,
    count: Math.min(group.count, TUBE_CAPACITY - target.length),
  };
}

export function applyMove(tubes: Tube[], move: PuzzleMove) {
  const next = cloneTubes(tubes);
  const moved = next[move.from].splice(-move.count);
  next[move.to].push(...moved);
  return next;
}

export function isTubeComplete(tube: Tube) {
  return tube.length === TUBE_CAPACITY && tube.every((color) => color === tube[0]);
}

export function isPuzzleComplete(tubes: Tube[]) {
  return tubes.every((tube) => tube.length === 0 || isTubeComplete(tube));
}

export function getHint(tubes: Tube[]): PuzzleMove | null {
  const moves: Array<{ move: PuzzleMove; score: number }> = [];
  tubes.forEach((source, from) => {
    tubes.forEach((target, to) => {
      const move = getMove(tubes, from, to);
      if (!move) return;
      const targetTop = target[target.length - 1];
      const sourceAfter = source.slice(0, -move.count);
      let score = targetTop === move.color ? 60 : 5;
      if (target.length + move.count === TUBE_CAPACITY) score += 45;
      if (sourceAfter.length && sourceAfter[sourceAfter.length - 1] !== move.color) score += 20;
      if (isTubeComplete(source)) score -= 100;
      if (!targetTop && move.count === source.length) score -= 25;
      moves.push({ move, score });
    });
  });
  moves.sort((a, b) => b.score - a.score);
  return moves[0]?.move ?? null;
}

export function colorSummary(tube: Tube, colorName: (color: ColorId) => string) {
  if (tube.length === 0) return "비어 있음";
  const groups: string[] = [];
  [...tube].reverse().forEach((color) => {
    const label = colorName(color);
    const last = groups[groups.length - 1];
    const match = last?.match(/^(.*) (\d+)개$/);
    if (match?.[1] === label) groups[groups.length - 1] = `${label} ${Number(match[2]) + 1}개`;
    else groups.push(`${label} 1개`);
  });
  return `위에서부터 ${groups.join(", ")}`;
}
