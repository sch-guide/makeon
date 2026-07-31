export const TUBE_CAPACITY = 4;

export type ColorId =
  | "rose"
  | "lavender"
  | "sky"
  | "mint"
  | "apricot"
  | "lemon"
  | "sage"
  | "coral"
  | "plum"
  | "aqua";

export type Tube = ColorId[];

export type PuzzleMove = {
  from: number;
  to: number;
  count: number;
  color: ColorId;
};

export type LevelDefinition = {
  id: number;
  colorCount: number;
  seed: number;
  scrambleMoves: number;
  recommendedMoves: number;
  tubes: Tube[];
  solution: PuzzleMove[];
};

export type LevelRecord = {
  moves?: number;
  stars?: number;
};

export type SavedProgress = {
  unlockedLevel: number;
  lastLevel: number;
  soundEnabled: boolean;
  patternsEnabled: boolean;
  records: Record<number, LevelRecord>;
};
