import type { StackScoreInput } from "@/lib/games/ranking";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const MAX_STACK_HEIGHT = 500;
const MAX_SESSION_DURATION_MS = 6 * 60 * 60 * 1000;

function isFiniteInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && Number.isInteger(value);
}

export function maximumStackScore(height: number) {
  // Per floor: 100 base + up to 80 width + 120 perfect + 25 × current combo.
  return 300 * height + (25 * height * (height + 1)) / 2;
}

export function minimumPlausibleStackDuration(height: number) {
  return Math.max(700, height * 300);
}

export function parseStackScoreInput(value: unknown): { data?: StackScoreInput; error?: string } {
  if (!value || typeof value !== "object") return { error: "기록 형식이 올바르지 않습니다." };
  const body = value as Record<string, unknown>;

  if (body.gameKey !== "pastel_stack") return { error: "지원하지 않는 게임입니다." };
  if (!isFiniteInteger(body.score) || !isFiniteInteger(body.height) ||
      !isFiniteInteger(body.bestCombo) || !isFiniteInteger(body.durationMs)) {
    return { error: "점수와 플레이 기록은 정수여야 합니다." };
  }
  if (body.difficulty !== "classic" && body.difficulty !== "calm") {
    return { error: "게임 모드가 올바르지 않습니다." };
  }
  if (typeof body.gameSessionId !== "string" || !UUID_PATTERN.test(body.gameSessionId)) {
    return { error: "게임 세션이 올바르지 않습니다." };
  }

  const height = body.height;
  const score = body.score;
  const bestCombo = body.bestCombo;
  const durationMs = body.durationMs;
  if (height < 1 || height > MAX_STACK_HEIGHT) return { error: "높이 기록이 허용 범위를 벗어났습니다." };
  if (bestCombo < 0 || bestCombo > height) return { error: "콤보 기록이 높이와 일치하지 않습니다." };
  if (score < height * 100 || score > maximumStackScore(height)) {
    return { error: "점수와 높이의 관계가 실제 게임 규칙과 일치하지 않습니다." };
  }
  if (durationMs < minimumPlausibleStackDuration(height) || durationMs > MAX_SESSION_DURATION_MS) {
    return { error: "플레이 시간이 실제 게임 범위를 벗어났습니다." };
  }

  return {
    data: {
      gameKey: "pastel_stack",
      score,
      height,
      bestCombo,
      durationMs,
      difficulty: body.difficulty,
      gameSessionId: body.gameSessionId,
    },
  };
}

export function isBetterStackScore(
  incoming: Pick<StackScoreInput, "score" | "height" | "bestCombo" | "durationMs">,
  current: { score: number; height: number | null; best_combo: number | null; duration_ms: number | null },
) {
  if (incoming.score !== current.score) return incoming.score > current.score;
  if (incoming.height !== (current.height ?? 0)) return incoming.height > (current.height ?? 0);
  if (incoming.bestCombo !== (current.best_combo ?? 0)) return incoming.bestCombo > (current.best_combo ?? 0);
  return incoming.durationMs < (current.duration_ms ?? Number.MAX_SAFE_INTEGER);
}

