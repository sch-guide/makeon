import { NextResponse } from "next/server";
import { validateNickname } from "@/lib/games/nickname";
import { authenticateGameRequest, getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function unavailable() {
  return NextResponse.json(
    { error: "온라인 랭킹이 아직 연결되지 않았습니다.", code: "RANKING_UNAVAILABLE" },
    { status: 503 },
  );
}

export async function GET(request: Request) {
  const admin = getSupabaseAdmin();
  if (!admin) return unavailable();
  const user = await authenticateGameRequest(request);
  if (!user) return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });

  const { data, error } = await admin
    .from("game_profiles")
    .select("nickname")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: "닉네임을 불러오지 못했습니다." }, { status: 500 });

  return NextResponse.json(
    { profile: data ? { nickname: data.nickname } : null },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

export async function PUT(request: Request) {
  const admin = getSupabaseAdmin();
  if (!admin) return unavailable();
  const user = await authenticateGameRequest(request);
  if (!user) return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }
  const result = validateNickname((body as { nickname?: unknown })?.nickname);
  if (!result.nickname) return NextResponse.json({ error: result.error }, { status: 400 });

  const { error } = await admin.from("game_profiles").upsert({
    user_id: user.id,
    nickname: result.nickname,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
  if (error) return NextResponse.json({ error: "닉네임을 저장하지 못했습니다." }, { status: 500 });

  return NextResponse.json({ profile: { nickname: result.nickname } });
}

