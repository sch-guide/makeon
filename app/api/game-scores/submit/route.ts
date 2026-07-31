import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { loadStackRankings } from "@/lib/games/ranking-server";
import { parseStackScoreInput } from "@/lib/games/stack-score-validation";
import { authenticateGameRequest, getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const MAX_DURATION_DRIFT_MS = 15_000;

function kstDate(now: Date) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export async function POST(request: Request) {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "온라인 랭킹이 아직 연결되지 않았습니다.", code: "RANKING_UNAVAILABLE" }, { status: 503 });
  }
  const user = await authenticateGameRequest(request);
  if (!user) return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }
  const parsed = parseStackScoreInput(body);
  if (!parsed.data) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const score = parsed.data;

  const { data: profile, error: profileError } = await admin
    .from("game_profiles")
    .select("nickname")
    .eq("user_id", user.id)
    .maybeSingle();
  if (profileError) return NextResponse.json({ error: "닉네임을 확인하지 못했습니다." }, { status: 500 });
  if (!profile) return NextResponse.json({ error: "랭킹에 표시할 닉네임을 먼저 설정해주세요.", code: "NICKNAME_REQUIRED" }, { status: 409 });

  const { data: session, error: sessionError } = await admin
    .from("game_sessions")
    .select("id, game_key, difficulty, started_at, submitted_at")
    .eq("id", score.gameSessionId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (sessionError) return NextResponse.json({ error: "게임 세션을 확인하지 못했습니다." }, { status: 500 });
  if (!session || session.submitted_at || session.game_key !== score.gameKey || session.difficulty !== score.difficulty) {
    return NextResponse.json({ error: "이미 제출했거나 유효하지 않은 게임 세션입니다." }, { status: 409 });
  }

  const now = new Date();
  const serverDurationMs = now.getTime() - new Date(session.started_at).getTime();
  if (serverDurationMs < 0 || serverDurationMs > 6 * 60 * 60 * 1000 ||
      Math.abs(serverDurationMs - score.durationMs) > Math.max(MAX_DURATION_DRIFT_MS, serverDurationMs * 0.25)) {
    return NextResponse.json({ error: "게임 진행 시간과 제출 기록이 일치하지 않습니다." }, { status: 400 });
  }

  const submissionHash = createHash("sha256")
    .update(`${user.id}:${score.gameKey}:${score.gameSessionId}:${score.score}:${score.height}:${score.bestCombo}`)
    .digest("hex");

  const date = kstDate(now);
  const { data: submitResult, error: submitError } = await admin.rpc("submit_stack_score", {
    p_user_id: user.id,
    p_game_session_id: session.id,
    p_score: score.score,
    p_height: score.height,
    p_best_combo: score.bestCombo,
    p_duration_ms: serverDurationMs,
    p_difficulty: score.difficulty,
    p_submission_hash: submissionHash,
    p_score_date: date,
  });
  if (submitError) {
    const rateLimited = submitError.message.includes("rate_limit");
    return NextResponse.json(
      { error: rateLimited ? "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." : "기록을 안전하게 저장하지 못했습니다." },
      { status: rateLimited ? 429 : 409 },
    );
  }
  const improved = Boolean((submitResult as Array<{ improved: boolean }> | null)?.[0]?.improved);

  try {
    const rankings = await loadStackRankings(admin, user.id, "all");
    return NextResponse.json({
      saved: improved,
      improved,
      ignored: !improved,
      rank: rankings.myBest?.rank ?? null,
      myBest: rankings.myBest,
    });
  } catch {
    return NextResponse.json({ saved: improved, improved, ignored: !improved, rank: null, myBest: null });
  }
}
