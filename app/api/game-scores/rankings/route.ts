import { NextRequest, NextResponse } from "next/server";
import { isGameKey, isRankingPeriod } from "@/lib/games/ranking";
import { loadStackRankings } from "@/lib/games/ranking-server";
import { authenticateGameRequest, getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "온라인 랭킹이 아직 연결되지 않았습니다.", code: "RANKING_UNAVAILABLE" }, { status: 503 });
  }
  const user = await authenticateGameRequest(request);
  if (!user) return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });

  const game = request.nextUrl.searchParams.get("game");
  const periodValue = request.nextUrl.searchParams.get("type") ?? "all";
  if (!isGameKey(game) || game !== "pastel_stack" || !isRankingPeriod(periodValue)) {
    return NextResponse.json({ error: "랭킹 조회 조건이 올바르지 않습니다." }, { status: 400 });
  }

  try {
    const rankings = await loadStackRankings(admin, user.id, periodValue);
    return NextResponse.json(rankings, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch {
    return NextResponse.json({ error: "랭킹을 불러오지 못했습니다." }, { status: 500 });
  }
}

