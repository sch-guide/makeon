import type { Tool } from "@/types/content";

export const tools: Tool[] = [
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
    slug: "digital-relax-playground",
    name: "디지털 힐링 놀이터",
    description:
      "버블랩, 액체 자석, 모래 자르기, 젤리 꾸미기 등 10가지 미니게임을 한곳에서 즐겨보세요.",
    category: "재미 도구",
    status: "available",
    icon: "✣",
    actionLabel: "놀러 가기",
    featuredOnHome: false,
  },
];
