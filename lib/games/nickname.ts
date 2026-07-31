export const NICKNAME_MIN_LENGTH = 2;
export const NICKNAME_MAX_LENGTH = 12;

const allowedNickname = /^[가-힣A-Za-z0-9._ -]+$/u;
const contactPattern = /(?:https?:\/\/|www\.|@|\b(?:010|011|016|017|018|019)[- .]?\d{3,4}[- .]?\d{4}\b)/iu;
const markupPattern = /[<>]|(?:javascript|script|iframe)\s*:/iu;
const blockedWords = ["관리자", "운영자", "makeon관리", "광고문의"];

export function normalizeNickname(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f\u200b-\u200d\ufeff]/gu, "")
    .trim()
    .replace(/\s+/gu, " ");
}

export function validateNickname(value: unknown): { nickname?: string; error?: string } {
  if (typeof value !== "string") return { error: "닉네임을 입력해주세요." };
  const nickname = normalizeNickname(value);
  const length = Array.from(nickname).length;

  if (length < NICKNAME_MIN_LENGTH || length > NICKNAME_MAX_LENGTH) {
    return { error: "닉네임은 2~12자로 입력해주세요." };
  }
  if (!allowedNickname.test(nickname)) {
    return { error: "한글, 영문, 숫자, 공백, 마침표, 밑줄, 하이픈만 사용할 수 있습니다." };
  }
  if (contactPattern.test(nickname) || markupPattern.test(nickname)) {
    return { error: "연락처, URL 또는 코드 형태는 닉네임으로 사용할 수 없습니다." };
  }
  if (blockedWords.some((word) => nickname.toLocaleLowerCase("ko-KR").includes(word))) {
    return { error: "운영진이나 광고 문구로 오해할 수 있는 닉네임은 사용할 수 없습니다." };
  }

  return { nickname };
}

