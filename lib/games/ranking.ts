export const GAME_KEYS = [
  "pastel_stack",
  "pastel_color_sort",
  "pastel_memory_match",
] as const;

export type GameKey = (typeof GAME_KEYS)[number];
export type RankingPeriod = "today" | "all";

export type RankingEntry = {
  rank: number;
  nickname: string;
  score: number;
  level: number | null;
  height: number | null;
  moves: number | null;
  durationMs: number | null;
  bestCombo: number | null;
  difficulty: string | null;
  achievedAt: string;
  isCurrentUser: boolean;
};

export type RankingsResponse = {
  entries: RankingEntry[];
  myBest: RankingEntry | null;
  period: RankingPeriod;
  timezone: "Asia/Seoul";
};

export type GameProfile = {
  nickname: string;
};

export type StackScoreInput = {
  gameKey: "pastel_stack";
  score: number;
  height: number;
  bestCombo: number;
  durationMs: number;
  difficulty: "classic" | "calm";
  gameSessionId: string;
};

export type ScoreSubmitResult = {
  saved: boolean;
  improved: boolean;
  ignored: boolean;
  rank: number | null;
  myBest: RankingEntry | null;
};

export const RANKING_UNAVAILABLE_MESSAGE =
  "온라인 랭킹을 잠시 사용할 수 없습니다. 게임과 브라우저 기록은 계속 이용할 수 있습니다.";

export function isGameKey(value: unknown): value is GameKey {
  return typeof value === "string" && (GAME_KEYS as readonly string[]).includes(value);
}

export function isRankingPeriod(value: unknown): value is RankingPeriod {
  return value === "today" || value === "all";
}

export function formatGameDuration(durationMs: number | null) {
  if (durationMs === null) return "—";
  const seconds = Math.max(0, Math.round(durationMs / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes > 0 ? `${minutes}분 ${remainder}초` : `${remainder}초`;
}

