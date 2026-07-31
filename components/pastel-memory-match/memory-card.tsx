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
  onSelect: (card: MemoryCardModel) => void;
};

export function MemoryCard({ card, disabled, hinted, onSelect }: Props) {
  const stateLabel = card.matched
    ? `${card.label} 카드, 매칭 완료`
    : card.faceUp
      ? `${card.label} 카드, 앞면이 열림`
      : "뒤집히지 않은 카드";

  return (
    <button
      type="button"
      className={`${styles.card} ${card.faceUp || card.matched ? styles.flipped : ""} ${card.matched ? styles.matched : ""} ${hinted ? styles.hinted : ""}`}
      aria-label={stateLabel}
      aria-pressed={card.faceUp || card.matched}
      disabled={disabled || card.faceUp || card.matched}
      onClick={() => onSelect(card)}
    >
      <span className={styles.cardInner}>
        <span className={styles.cardBack} aria-hidden="true">
          <span className={styles.backPattern}>✦</span>
          <span className={styles.backMark}>M</span>
        </span>
        <span className={styles.cardFront} style={{ background: card.soft, color: card.accent }} aria-hidden="true">
          <MemoryIcon theme={card.theme} iconKey={card.iconKey} label={card.label} />
          <span>{card.label}</span>
          {card.matched && <span className={styles.matchCheck}>✓</span>}
        </span>
      </span>
    </button>
  );
}
