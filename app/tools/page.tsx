import type { Metadata } from "next";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PageHero } from "@/components/page-hero";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/content/tools";

export const metadata: Metadata = {
  title: "무료 도구",
  description: "가입과 설치 없이 누구나 사용할 수 있는 MAKEON의 무료 웹 도구를 만나보세요.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "MAKEON 무료 도구",
    description: "일상과 작업을 조금 더 간단하게 만드는 무료 웹 도구입니다.",
    url: "/tools",
    images: [{ url: "/og.png", alt: "MAKEON - AI로 아이디어를 현실로" }],
  },
};

export default function ToolsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="FREE WEB TOOLS"
        title="만들고, 놀고, 바로 써보는 무료 도구"
        description="AI로 만드는 실용 도구부터 가볍게 즐기는 퍼즐·미니게임까지, 브라우저에서 바로 사용할 수 있습니다."
      />

      <section className="tools-index-section">
        <div className="site-container">
          <div className="tools-intro-row">
            <div>
              <p className="eyebrow">TOOL LIBRARY</p>
              <h2>무료 도구 전체 보기</h2>
            </div>
            <p>현재 {tools.length}개의 도구를 무료로 사용할 수 있습니다.</p>
          </div>

          <div className="tools-index-grid">
            {tools.map((tool) => (
              <ToolCard tool={tool} key={tool.slug} />
            ))}
          </div>

          <div className="coming-roadmap">
            <div className="roadmap-mark" aria-hidden="true">+</div>
            <div>
              <h2>직접 확인한 도구만 공개합니다.</h2>
              <p>
                각 도구는 모바일과 데스크톱 동작, 데이터 저장 범위와 기본 사용법을 확인한 뒤
                공개합니다. 구현 과정과 시행착오는 블로그에서 함께 설명합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterCta />
    </main>
  );
}
