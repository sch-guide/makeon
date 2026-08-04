import type { RankingEntry } from "@/lib/games/ranking";
import { formatGameDuration } from "@/lib/games/ranking";
import styles from "./game-ranking.module.css";

export function MyBestRecord({ record, game = "stack" }: { record: RankingEntry | null; game?: "stack" | "tetris" }) {
  if (!record) return <p className={styles.empty}>아직 온라인 최고 기록이 없습니다.</p>;

  return (
    <section className={styles.myBest} aria-label="내 온라인 최고 기록">
      <h3>내 최고 기록</h3>
      <dl>
        <div><dt>순위</dt><dd>{record.rank}위</dd></div>
        <div><dt>점수</dt><dd>{record.score.toLocaleString()}점</dd></div>
        <div><dt>{game === "tetris" ? "라인" : "높이"}</dt><dd>{record.height ?? 0}{game === "tetris" ? "줄" : "층"}</dd></div>
        <div><dt>시간</dt><dd>{formatGameDuration(record.durationMs)}</dd></div>
      </dl>
    </section>
  );
}
