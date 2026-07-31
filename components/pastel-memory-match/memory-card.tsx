import { MemoryIcon } from "./memory-icon";
import type { ThemeId } from "./memory-data";
import styles from "./pastel-memory-match.module.css";

export type MemoryCardModel = {
  id: string;
  pairId: string;
  iconKey: string;
  label: string;
  accent: string;
  soft: string;
  theme: ThemeId;
  faceUp: boolean;
  matched: boolean;
};

type Props = {
  card: MemoryCardModel;
  disabled: boolean;
  hinted: boolean;
  mismatched: boolean;
  onSelect: (card: MemoryCardModel) => void;
};

export function MemoryCard({ card, disabled, hinted, mismatched, onSelect }: Props) {
  const stateLabel = card.matched
    ? `${card.label} 카드, 매칭 완료`
    : card.faceUp
      ? `${card.label} 카드, 앞면이 열림`
      : "뒤집히지 않은 카드";

  return (
    <button
      type="button"
      className={`${styles.card} ${card.faceUp || card.matched ? styles.flipped : ""} ${card.matched ? styles.matched : ""} ${hinted ? styles.hinted : ""} ${mismatched ? styles.mismatched : ""}`}
      aria-label={stateLabel}
      aria-pressed={card.faceUp || card.matched}
      disabled={disabled || card.faceUp || card.matched}
      onClick={() => onSelect(card)}
    >
      <span className={styles.cardInner}>
        <span className={styles.cardBack} aria-hidden="true">
          <span className={styles.backPattern} />
          <span className={styles.backFrame} />
          <span className={styles.backMark}>
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path d="M24 7c2.4 7.1 7.9 12.6 15 15-7.1 2.4-12.6 7.9-15 15-2.4-7.1-7.9-12.6-15-15 7.1-2.4 12.6-7.9 15-15Z" />
              <circle cx="24" cy="22" r="3.5" />
            </svg>
          </span>
        </span>
        <span className={styles.cardFront} style={{ "--card-accent": card.accent, "--card-soft": card.soft } as React.CSSProperties} aria-hidden="true">
          <span className={styles.illustrationFrame}>
            <MemoryIcon theme={card.theme} iconKey={card.iconKey} label={card.label} accent={card.accent} soft={card.soft} />
          </span>
          <span className={styles.cardLabel}>{card.label}</span>
          {card.matched && <span className={styles.matchCheck}>✓</span>}
          {card.matched && <span className={styles.matchParticles}>{Array.from({ length: 6 }, (_, index) => <i key={index} />)}</span>}
        </span>
      </span>
    </button>
  );
}
