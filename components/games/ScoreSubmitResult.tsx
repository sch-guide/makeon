import type { ScoreSubmitResult as Result } from "@/lib/games/ranking";
import styles from "./game-ranking.module.css";

export function ScoreSubmitResult({ status, result, error }: {
  status: "idle" | "submitting" | "success" | "error";
  result: Result | null;
  error: string | null;
}) {
  if (status === "idle") return null;
  if (status === "submitting") return <div className={styles.submitResult} aria-live="polite"><strong>기록 제출 중…</strong><p>안전하게 점수를 확인하고 있습니다.</p></div>;
  if (status === "error") return <div className={styles.error} role="alert">{error ?? "기록을 저장하지 못했습니다. 브라우저 기록은 유지됩니다."}</div>;

  return (
    <div className={styles.submitResult} aria-live="polite">
      <strong>{result?.improved ? "온라인 최고 기록을 갱신했어요!" : "기존 최고 기록을 유지했어요."}</strong>
      <p>{result?.rank ? `현재 전체 ${result.rank}위입니다.` : "전체 랭킹에서 기록을 확인할 수 있습니다."}</p>
    </div>
  );
}

