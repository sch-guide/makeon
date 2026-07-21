export const siteConfig = {
  name: "MAKEON",
  slogan: "AI로 아이디어를 현실로",
  description:
    "코딩을 몰라도 AI와 함께 웹사이트와 앱을 만들고, 누구나 사용할 수 있는 유용한 무료 도구를 공유합니다.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://makeon.kr").replace(/\/$/, ""),
  email: "sabaha0506@gmail.com",
} as const;

export const navigation = [
  { label: "홈", href: "/" },
  { label: "블로그", href: "/blog" },
  { label: "무료 도구", href: "/tools" },
  { label: "소개", href: "/about" },
  { label: "문의", href: "/contact" },
] as const;
