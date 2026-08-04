import type { Tool } from "@/types/content";

export const tools: Tool[] = [
  {
    slug: "digital-squishy-playground",
    name: "디지털 말랑이 놀이터",
    description:
      "브라우저에서 말랑한 젤을 누르고 늘리며 시각 효과와 합성 소리를 즐기는 무료 감각 놀이",
    category: "재미 도구",
    status: "available",
    icon: "●",
    actionLabel: "놀러 가기",
    featuredOnHome: false,
  },
  {
    slug: "ai-prompt-generator",
    name: "AI 프롬프트 생성기",
    description:
      "아이디어와 필요한 기능을 입력하면 ChatGPT와 Codex에 바로 붙여넣을 수 있는 구조화된 프롬프트를 만들어주는 도구입니다.",
    category: "AI 도구",
    status: "available",
    icon: "✦",
    featuredOnHome: true,
  },
  {
    slug: "sensory-toy-playground",
    name: "디지털 촉감 놀이터",
    description:
      "말랑이·슬랑이·크런치 말랑이·왁뿌볼을 누르고 늘리고 깨뜨려보는 무료 미니앱",
    category: "재미 도구",
    status: "available",
    icon: "◉",
    actionLabel: "놀러 가기",
    featuredOnHome: false,
  },
  {
    slug: "pastel-stack-game",
    name: "파스텔 스택 쌓기",
    description:
      "블록을 타이밍에 맞춰 쌓고, 퍼펙트 콤보와 최고 높이에 도전하는 무료 미니게임",
    category: "재미 도구",
    status: "available",
    icon: "▰",
    actionLabel: "게임 시작",
    featuredOnHome: false,
  },
  {
    slug: "pastel-color-sort",
    name: "파스텔 컬러 정렬 퍼즐",
    description:
      "섞여 있는 파스텔 색상을 같은 색끼리 모아 모든 용기를 정리하는 무료 퍼즐 게임",
    category: "퍼즐 게임",
    status: "available",
    icon: "◈",
    actionLabel: "게임 시작",
    featuredOnHome: false,
  },
  {
    slug: "pastel-memory-match",
    name: "파스텔 메모리 카드 맞추기",
    description:
      "카드를 뒤집어 같은 그림을 찾고 콤보와 최고 기록에 도전하는 무료 기억력 게임",
    category: "퍼즐 게임",
    status: "available",
    icon: "✦",
    actionLabel: "게임 시작",
    featuredOnHome: false,
  },
  {
    slug: "pastel-block-puzzle",
    name: "MAKEON 파스텔 블록 퍼즐",
    description:
      "파스텔 블록으로 줄을 완성하고 오늘·전체 온라인 랭킹에 도전하는 무료 블록 퍼즐 게임",
    category: "퍼즐 게임",
    status: "available",
    icon: "▦",
    actionLabel: "게임 시작",
    featuredOnHome: false,
  },
];
