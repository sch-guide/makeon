"use client";

import { useEffect, useState } from "react";
import { NICKNAME_MAX_LENGTH, normalizeNickname, validateNickname } from "@/lib/games/nickname";
import styles from "./game-ranking.module.css";

type Props = {
  open: boolean;
  initialNickname?: string;
  saving: boolean;
  serverError?: string | null;
  onClose: () => void;
  onSave: (nickname: string) => Promise<void>;
};

export function NicknameDialog({ open, initialNickname = "", saving, serverError, onClose, onSave }: Props) {
  const [value, setValue] = useState(initialNickname);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setValue(initialNickname);
      setError(null);
    }
  }, [initialNickname, open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !saving) onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open, saving]);

  if (!open) return null;
  const count = Array.from(normalizeNickname(value)).length;

  return (
    <div className={styles.dialogBackdrop} role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !saving) onClose();
    }}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="nickname-title">
        <p className="eyebrow">ONLINE RANKING</p>
        <h2 id="nickname-title">랭킹에 표시할 닉네임을 정해주세요.</h2>
        <p>
          닉네임과 게임 기록은 공개 랭킹에 표시될 수 있습니다.
          실명, 전화번호, 이메일은 닉네임으로 사용하지 마세요.
        </p>
        <label>
          공개 닉네임
          <input
            autoFocus
            value={value}
            maxLength={NICKNAME_MAX_LENGTH}
            autoComplete="off"
            inputMode="text"
            onChange={(event) => {
              setValue(event.target.value);
              setError(null);
            }}
            aria-invalid={Boolean(error || serverError)}
            aria-describedby="nickname-help"
          />
          <span id="nickname-help" className={styles.inputMeta}>
            <span>한글·영문·숫자, 일부 기호 사용 가능</span>
            <span>{count}/{NICKNAME_MAX_LENGTH}</span>
          </span>
        </label>
        {(error || serverError) && <p className={styles.error} role="alert">{error || serverError}</p>}
        <div className={styles.dialogActions}>
          <button type="button" className="button button-secondary" disabled={saving} onClick={onClose}>나중에</button>
          <button
            type="button"
            className="button button-primary"
            disabled={saving}
            onClick={async () => {
              const result = validateNickname(value);
              if (!result.nickname) {
                setError(result.error ?? "닉네임을 확인해주세요.");
                return;
              }
              await onSave(result.nickname);
            }}
          >
            {saving ? "저장 중…" : "저장"}
          </button>
        </div>
      </section>
    </div>
  );
}

