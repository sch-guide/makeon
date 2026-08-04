"use client";

import { useState } from "react";
import type { RankingEntry, RankingPeriod } from "@/lib/games/ranking";
import { MyBestRecord } from "./MyBestRecord";
import styles from "./game-ranking.module.css";

function medal(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `${rank}`;
}

export function Leaderboard({
  configured,
  nickname,
  period,
  entries,
  myBest,
  loading,
  error,
  onPeriodChange,
  onRefresh,
  onEditNickname,
  game = "stack",
}: {
  configured: boolean;
  nickname: string | null;
  period: RankingPeriod;
  entries: RankingEntry[];
  myBest: RankingEntry | null;
  loading: boolean;
  error: string | null;
  onPeriodChange: (period: RankingPeriod) => void;
  onRefresh: () => void;
  onEditNickname: () => void;
  game?: "stack" | "tetris";
}) {
  const [showMine, setShowMine] = useState(false);

  return (
    <section className={styles.panel} aria-labelledby="online-ranking-title">
      <header className={styles.panelHeader}>
        <div>
          <p className="eyebrow">ONLINE LEADERBOARD</p>
          <h2 id="online-ranking-title">{game === "tetris" ? "MAKEON 테트리스 온라인 랭킹" : "파스텔 스택 온라인 랭킹"}</h2>
        </div>
        <button type="button" className={styles.refreshButton} onClick={onRefresh} disabled={!configured || loading}>
          {loading ? "불러오는 중…" : "랭킹 새로고침"}
        </button>
      </header>

      {!configured ? (
        <p className={styles.statusNote}>온라인 랭킹 연결을 준비 중입니다. 현재 게임과 브라우저 최고 기록은 정상적으로 이용할 수 있습니다.</p>
      ) : (
        <>
          <div className={styles.profileBar}>
            <strong>{nickname ? `${nickname}님의 기록` : "공개 닉네임을 설정해주세요."}</strong>
            <button type="button" onClick={onEditNickname}>{nickname ? "닉네임 변경" : "닉네임 설정"}</button>
          </div>

          <div className={styles.tabs} role="tablist" aria-label="랭킹 기간">
            <button type="button" role="tab" aria-selected={!showMine && period === "today"} onClick={() => { setShowMine(false); onPeriodChange("today"); }}>오늘</button>
            <button type="button" role="tab" aria-selected={!showMine && period === "all"} onClick={() => { setShowMine(false); onPeriodChange("all"); }}>전체</button>
            <button type="button" role="tab" aria-selected={showMine} onClick={() => setShowMine(true)}>내 기록</button>
          </div>

          {error ? <div className={styles.error} role="alert">{error}</div> : null}
          {!showMine && !error && loading ? <p className={styles.empty}>랭킹을 불러오는 중입니다…</p> : null}
          {!showMine && !error && !loading && entries.length === 0 ? (
            <p className={styles.empty}>아직 등록된 기록이 없습니다. 첫 번째 기록에 도전해보세요.</p>
          ) : null}
          {!showMine && !error && entries.length > 0 ? (
            <ol className={styles.rankList} aria-label={period === "today" ? "오늘의 TOP 20" : "전체 TOP 20"}>
              {entries.map((entry) => (
                <li className={styles.rankRow} data-current={entry.isCurrentUser} key={`${entry.rank}-${entry.nickname}-${entry.achievedAt}`}>
                  <span className={styles.rank} aria-label={`${entry.rank}위`}>{medal(entry.rank)}</span>
                  <span className={styles.nickname}>{entry.nickname}{entry.isCurrentUser ? " (나)" : ""}</span>
                  <span className={styles.record}>
                    <strong>{entry.score.toLocaleString()}점</strong>
                    <span>{game === "tetris" ? `${entry.height ?? 0}줄 · 레벨 ${entry.level ?? 1}` : `${entry.height ?? 0}층 · 콤보 ${entry.bestCombo ?? 0}`}</span>
                  </span>
                </li>
              ))}
            </ol>
          ) : null}
          {(showMine || !error) && <MyBestRecord record={myBest} game={game} />}
          <p className={styles.privacyNote}>오늘 랭킹은 한국 시간 자정 기준입니다. 비정상적인 기록은 별도의 안내 없이 제외될 수 있습니다.</p>
        </>
      )}
    </section>
  );
}
