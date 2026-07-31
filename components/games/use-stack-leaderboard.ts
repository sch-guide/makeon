"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  GameProfile,
  RankingEntry,
  RankingPeriod,
  RankingsResponse,
  ScoreSubmitResult,
} from "@/lib/games/ranking";
import { RANKING_UNAVAILABLE_MESSAGE } from "@/lib/games/ranking";
import { getAnonymousAccessToken, isSupabaseBrowserConfigured } from "@/lib/supabase/client";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

async function authorizedFetch(path: string, init?: RequestInit) {
  const token = await getAnonymousAccessToken();
  if (!token) throw new Error(RANKING_UNAVAILABLE_MESSAGE);
  return fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });
}

async function responseError(response: Response) {
  const body = await response.json().catch(() => ({})) as { error?: string };
  return body.error ?? RANKING_UNAVAILABLE_MESSAGE;
}

export function useStackLeaderboard() {
  const configured = isSupabaseBrowserConfigured();
  const activeSessionRef = useRef<{ id: string; localStartedAt: number } | null>(null);
  const nicknameRef = useRef<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileUnavailable, setProfileUnavailable] = useState(false);
  const [nicknameOpen, setNicknameOpen] = useState(false);
  const [nicknameSaving, setNicknameSaving] = useState(false);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [period, setPeriodState] = useState<RankingPeriod>("today");
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [myBest, setMyBest] = useState<RankingEntry | null>(null);
  const [rankingLoading, setRankingLoading] = useState(configured);
  const [rankingError, setRankingError] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [submissionResult, setSubmissionResult] = useState<ScoreSubmitResult | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!configured) {
      setProfileLoaded(true);
      return null;
    }
    try {
      const response = await authorizedFetch("/api/game-profile");
      if (!response.ok) throw new Error(await responseError(response));
      const body = await response.json() as { profile: GameProfile | null };
      const loadedNickname = body.profile?.nickname ?? null;
      nicknameRef.current = loadedNickname;
      setNickname(loadedNickname);
      setProfileUnavailable(false);
      return loadedNickname;
    } catch {
      setProfileUnavailable(true);
      return undefined;
    } finally {
      setProfileLoaded(true);
    }
  }, [configured]);

  const refreshRankings = useCallback(async (nextPeriod: RankingPeriod) => {
    if (!configured) {
      setRankingLoading(false);
      return;
    }
    setRankingLoading(true);
    setRankingError(null);
    try {
      const response = await authorizedFetch(`/api/game-scores/rankings?game=pastel_stack&type=${nextPeriod}`);
      if (!response.ok) throw new Error(await responseError(response));
      const body = await response.json() as RankingsResponse;
      setEntries(body.entries);
      setMyBest(body.myBest);
    } catch (error) {
      setRankingError(error instanceof Error ? error.message : "랭킹을 불러오지 못했습니다.");
    } finally {
      setRankingLoading(false);
    }
  }, [configured]);

  useEffect(() => {
    if (!configured) {
      setProfileLoaded(true);
      setRankingLoading(false);
      return;
    }
    void loadProfile();
    void refreshRankings("today");
  }, [configured, loadProfile, refreshRankings]);

  const saveNickname = useCallback(async (nextNickname: string) => {
    setNicknameSaving(true);
    setNicknameError(null);
    try {
      const response = await authorizedFetch("/api/game-profile", {
        method: "PUT",
        body: JSON.stringify({ nickname: nextNickname }),
      });
      if (!response.ok) throw new Error(await responseError(response));
      const body = await response.json() as { profile: GameProfile };
      nicknameRef.current = body.profile.nickname;
      setNickname(body.profile.nickname);
      setNicknameOpen(false);
      await refreshRankings(period);
      return true;
    } catch (error) {
      setNicknameError(error instanceof Error ? error.message : "닉네임을 저장하지 못했습니다.");
      return false;
    } finally {
      setNicknameSaving(false);
    }
  }, [period, refreshRankings]);

  const createGameSession = useCallback(async (difficulty: "classic" | "calm") => {
    if (!configured) return { ready: true, online: false } as const;
    if (profileLoaded && profileUnavailable) return { ready: true, online: false } as const;
    const currentNickname = profileLoaded ? nicknameRef.current : await loadProfile();
    if (currentNickname === undefined) return { ready: true, online: false } as const;
    if (!currentNickname) {
      setNicknameOpen(true);
      return { ready: false, online: true } as const;
    }
    try {
      const response = await authorizedFetch("/api/game-scores/session", {
        method: "POST",
        body: JSON.stringify({ gameKey: "pastel_stack", difficulty }),
      });
      if (!response.ok) throw new Error(await responseError(response));
      const body = await response.json() as { gameSessionId: string };
      activeSessionRef.current = { id: body.gameSessionId, localStartedAt: Date.now() };
      setSubmissionStatus("idle");
      setSubmissionError(null);
      return { ready: true, online: true } as const;
    } catch {
      activeSessionRef.current = null;
      return { ready: true, online: false } as const;
    }
  }, [configured, loadProfile, profileLoaded, profileUnavailable]);

  const submitStackScore = useCallback(async (result: {
    score: number;
    height: number;
    bestCombo: number;
    difficulty: "classic" | "calm";
  }) => {
    const session = activeSessionRef.current;
    activeSessionRef.current = null;
    if (!configured || !session || result.height < 1) return;

    setSubmissionStatus("submitting");
    setSubmissionError(null);
    try {
      const response = await authorizedFetch("/api/game-scores/submit", {
        method: "POST",
        body: JSON.stringify({
          gameKey: "pastel_stack",
          ...result,
          durationMs: Math.max(1, Date.now() - session.localStartedAt),
          gameSessionId: session.id,
        }),
      });
      if (!response.ok) throw new Error(await responseError(response));
      const body = await response.json() as ScoreSubmitResult;
      setSubmissionResult(body);
      setSubmissionStatus("success");
      await refreshRankings(period);
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "기록을 저장하지 못했습니다. 게임 기록은 브라우저에 남아 있습니다.");
      setSubmissionStatus("error");
    }
  }, [configured, period, refreshRankings]);

  const setPeriod = useCallback((nextPeriod: RankingPeriod) => {
    setPeriodState(nextPeriod);
    void refreshRankings(nextPeriod);
  }, [refreshRankings]);

  return {
    configured,
    nickname,
    nicknameOpen,
    nicknameSaving,
    nicknameError,
    period,
    entries,
    myBest,
    rankingLoading,
    rankingError,
    submissionStatus,
    submissionResult,
    submissionError,
    openNickname: () => setNicknameOpen(true),
    closeNickname: () => setNicknameOpen(false),
    saveNickname,
    createGameSession,
    submitStackScore,
    setPeriod,
    refreshRankings: () => refreshRankings(period),
  };
}
