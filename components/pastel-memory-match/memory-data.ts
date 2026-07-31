export type ThemeId = "cats" | "desserts" | "nature" | "coding";
export type DifficultyId = "easy" | "normal" | "hard" | "challenge";

export type MemorySymbol = {
  key: string;
  label: string;
  accent: string;
  soft: string;
};

export type MemoryTheme = {
  id: ThemeId;
  name: string;
  description: string;
  symbols: MemorySymbol[];
};

export type Difficulty = {
  id: DifficultyId;
  name: string;
  pairs: number;
  columns: number;
  targetSeconds: number;
  targetMoves: number;
};

const palette = [
  ["#d88180", "#fae5df"],
  ["#7e9f72", "#e8f0df"],
  ["#8a7bb2", "#eee8f6"],
  ["#c18a57", "#f7ead8"],
  ["#5f92a6", "#e1f0f2"],
  ["#c27291", "#f6e2ea"],
  ["#7f988e", "#e4eeea"],
  ["#d49a47", "#faedcf"],
  ["#7d8fa8", "#e7ecf3"],
  ["#a67969", "#f1e3dc"],
  ["#7e9a55", "#e9f0da"],
  ["#aa78a1", "#f2e4f0"],
] as const;

function symbols(entries: Array<[string, string]>): MemorySymbol[] {
  return entries.map(([key, label], index) => ({
    key,
    label,
    accent: palette[index][0],
    soft: palette[index][1],
  }));
}

export const memoryThemes: MemoryTheme[] = [
  {
    id: "cats",
    name: "고양이",
    description: "포근한 고양이 친구들의 하루",
    symbols: symbols([
      ["cat-face", "고양이 얼굴"], ["paw", "분홍 발바닥"], ["yarn", "털실"],
      ["fish", "생선 간식"], ["cat-house", "고양이 집"], ["bell", "방울 목걸이"],
      ["feather", "깃털 장난감"], ["milk", "우유 그릇"], ["box-cat", "박스 안 고양이"],
      ["tail", "고양이 꼬리"], ["sleeping-cat", "낮잠 자는 고양이"], ["heart-cat", "하트를 안은 고양이"],
    ]),
  },
  {
    id: "desserts",
    name: "디저트",
    description: "달콤하고 부드러운 티타임",
    symbols: symbols([
      ["cake", "딸기 케이크"], ["donut", "도넛"], ["macaron", "마카롱"],
      ["pudding", "푸딩"], ["cookie", "쿠키"], ["strawberry-milk", "딸기 우유"],
      ["cupcake", "컵케이크"], ["icecream", "아이스크림"], ["waffle", "와플"],
      ["croissant", "크루아상"], ["chocolate", "초콜릿"], ["tart", "과일 타르트"],
    ]),
  },
  {
    id: "nature",
    name: "자연",
    description: "하늘과 숲에서 만나는 작은 풍경",
    symbols: symbols([
      ["sun", "해"], ["moon", "달"], ["star", "별"],
      ["cloud", "구름"], ["rainbow", "무지개"], ["flower", "꽃"],
      ["leaf", "나뭇잎"], ["snowflake", "눈송이"], ["mushroom", "버섯"],
      ["butterfly", "나비"], ["drop", "빗방울"], ["tree", "작은 나무"],
    ]),
  },
  {
    id: "coding",
    name: "AI·코딩",
    description: "아이디어가 코드가 되는 작은 작업실",
    symbols: symbols([
      ["code", "코드 편집기"], ["terminal", "터미널"], ["folder", "폴더"],
      ["database", "데이터베이스"], ["browser", "브라우저"], ["cloud-data", "클라우드"],
      ["robot", "로봇"], ["bulb", "전구"], ["keyboard", "키보드"],
      ["git-branch", "Git 브랜치"], ["server", "서버"], ["mobile-app", "모바일 앱"],
    ]),
  },
];

export const difficulties: Difficulty[] = [
  { id: "easy", name: "쉬움", pairs: 6, columns: 4, targetSeconds: 55, targetMoves: 10 },
  { id: "normal", name: "보통", pairs: 8, columns: 4, targetSeconds: 85, targetMoves: 15 },
  { id: "hard", name: "어려움", pairs: 10, columns: 5, targetSeconds: 125, targetMoves: 20 },
  { id: "challenge", name: "챌린지", pairs: 12, columns: 6, targetSeconds: 165, targetMoves: 25 },
];

export function getTheme(id: ThemeId) {
  return memoryThemes.find((theme) => theme.id === id) ?? memoryThemes[0];
}

export function getDifficulty(id: DifficultyId) {
  return difficulties.find((difficulty) => difficulty.id === id) ?? difficulties[0];
}
