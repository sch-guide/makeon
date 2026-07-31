import { NextResponse } from "next/server";
import { isGameKey } from "@/lib/games/ranking";
import { authenticateGameRequest, getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "온라인 랭킹이 아직 연결되지 않았습니다.", code: "RANKING_UNAVAILABLE" }, { status: 503 });
  }
  const user = await authenticateGameRequest(request);
  if (!user) return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });

  let body: { gameKey?: unknown; difficulty?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }
  if (!isGameKey(body.gameKey) || body.gameKey !== "pastel_stack") {
    return NextResponse.json({ error: "아직 온라인 랭킹을 지원하지 않는 게임입니다." }, { status: 400 });
  }
  if (body.difficulty !== "classic" && body.difficulty !== "calm") {
    return NextResponse.json({ error: "게임 모드가 올바르지 않습니다." }, { status: 400 });
  }

  const startedAt = new Date().toISOString();
  const { data, error } = await admin
    .from("game_sessions")
    .insert({ user_id: user.id, game_key: body.gameKey, difficulty: body.difficulty, started_at: startedAt })
    .select("id, started_at")
    .single();
  if (error) return NextResponse.json({ error: "온라인 게임 세션을 시작하지 못했습니다." }, { status: 500 });

  return NextResponse.json(
    { gameSessionId: data.id, startedAt: data.started_at },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

