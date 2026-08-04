import type { TetrisScoreInput } from "@/lib/games/ranking";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const MAX_DURATION_MS = 3 * 60 * 60 * 1000;

function isFiniteInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && Number.isInteger(value);
}

export function parseTetrisScoreInput(value: unknown): { data?: TetrisScoreInput; error?: string } {
  if (!value || typeof value !== "object") return { error: "기록 형식이 올바르지 않습니다." };
  const body = value as Record<string, unknown>;

  if (body.gameKey !== "tetris") return { error: "지원하지 않는 게임입니다." };
  if (body.difficulty !== "classic") return { error: "게임 모드가 올바르지 않습니다." };
  if (!isFiniteInteger(body.score) || !isFiniteInteger(body.lines) ||
      !isFiniteInteger(body.level) || !isFiniteInteger(body.durationMs)) {
    return { error: "점수, 라인, 레벨과 플레이 시간은 정수여야 합니다." };
  }
  if (typeof body.gameSessionId !== "string" || !UUID_PATTERN.test(body.gameSessionId)) {
    return { error: "게임 세션이 올바르지 않습니다." };
  }

  const { score, lines, level, durationMs } = body;
  if (score < 0 || score > 2_000_000) return { error: "점수가 허용 범위를 벗어났습니다." };
  if (lines < 0 || lines > 500) return { error: "삭제한 라인 수가 허용 범위를 벗어났습니다." };
  if (level !== Math.floor(lines / 10) + 1 || level > 51) {
    return { error: "레벨과 라인 기록이 일치하지 않습니다." };
  }
  if (durationMs < 1_000 || durationMs > MAX_DURATION_MS) {
    return { error: "플레이 시간이 허용 범위를 벗어났습니다." };
  }

  const seconds = Math.ceil(durationMs / 1_000);
  const maximumPlausibleScore = 10_000 + lines * 20_000 + seconds * 100;
  if (score > maximumPlausibleScore || lines > seconds * 4 + 4) {
    return { error: "게임 시간과 점수 기록이 실제 플레이 범위와 일치하지 않습니다." };
  }

  return {
    data: {
      gameKey: "tetris",
      score,
      lines,
      level,
      durationMs,
      difficulty: "classic",
      gameSessionId: body.gameSessionId,
    },
  };
}
