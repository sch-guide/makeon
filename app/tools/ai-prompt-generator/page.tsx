import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PromptGenerator } from "@/components/prompt-generator";

export const metadata: Metadata = {
  title: "AI 프롬프트 생성기",
  description:
    "만들고 싶은 것과 필요한 기능을 입력하면 ChatGPT 또는 Codex에 바로 붙여넣을 수 있는 구조화된 개발 프롬프트를 무료로 만들어 드립니다.",
  alternates: { canonical: "/tools/ai-prompt-generator" },
  openGraph: {
    title: "AI 프롬프트 생성기 | MAKEON",
    description:
      "아이디어, 기능, 디자인, 대상 사용자를 입력하고 바로 사용할 수 있는 완성 프롬프트를 만들어 보세요.",
    url: "/tools/ai-prompt-generator",
    images: [{ url: "/og.png", alt: "MAKEON - AI로 아이디어를 현실로" }],
  },
};

export default function AiPromptGeneratorPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="FREE AI TOOL"
        title="AI 프롬프트 생성기"
        description="막연한 아이디어를 ChatGPT와 Codex가 이해하기 쉬운 작업 요청으로 바꿔보세요. 가입 없이 무료로 사용할 수 있습니다."
      />

      <section className="prompt-tool-section">
        <div className="site-container">
          <div className="prompt-tool-intro">
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>다섯 가지 항목만 적으면 됩니다.</h2>
            <p>
              만들고 싶은 것, 기능, 디자인, 사용자와 추가 조건을 입력하면 구현 원칙과 완료
              기준까지 포함된 프롬프트를 자동으로 구성합니다.
            </p>
          </div>
          <PromptGenerator />
        </div>
      </section>
    </main>
  );
}
