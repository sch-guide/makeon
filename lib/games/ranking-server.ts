import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { RankingEntry, RankingPeriod, RankingsResponse } from "@/lib/games/ranking";

type RankingRow = {
  rank: number | string;
  nickname: string;
  score: number;
  level: number | null;
  height: number | null;
  moves: number | null;
  duration_ms: number | null;
  best_combo: number | null;
  difficulty: string | null;
  achieved_at: string;
  is_current_user: boolean;
};

function mapRankingRow(row: RankingRow): RankingEntry {
  return {
    rank: Number(row.rank),
    nickname: row.nickname,
    score: row.score,
    level: row.level,
    height: row.height,
    moves: row.moves,
    durationMs: row.duration_ms,
    bestCombo: row.best_combo,
    difficulty: row.difficulty,
    achievedAt: row.achieved_at,
    isCurrentUser: row.is_current_user,
  };
}

export async function loadStackRankings(
  admin: SupabaseClient,
  userId: string,
  period: RankingPeriod,
): Promise<RankingsResponse> {
  const { data, error } = await admin.rpc("get_stack_rankings", {
    p_period: period,
    p_user_id: userId,
    p_limit: 20,
  });
  if (error) throw error;

  const entries = ((data ?? []) as RankingRow[]).map(mapRankingRow);
  return {
    entries: entries.filter((entry) => entry.rank <= 20),
    myBest: entries.find((entry) => entry.isCurrentUser) ?? null,
    period,
    timezone: "Asia/Seoul",
  };
}

