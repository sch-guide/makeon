import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "소개",
  description:
    "Next.js, GitHub, Vercel, Supabase와 AI 코딩 도구로 사이트와 무료 도구를 직접 운영하며 확인한 과정과 실패를 기록하는 MAKEON을 소개합니다.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    number: "01",
    title: "쉽게 설명합니다",
    description: "전문 용어를 줄이고 AI가 처음인 사람도 바로 이해할 수 있는 말로 안내합니다.",
  },
  {
    number: "02",
    title: "문제 해결에 집중합니다",
    description: "검색자가 막힌 지점에서 바로 적용할 수 있는 단계와 확인 방법을 제공합니다.",
  },
  {
    number: "03",
    title: "직접 체험할 수 있습니다",
    description: "무료 웹도구와 퍼즐·미니게임을 가입 없이 브라우저에서 바로 사용할 수 있습니다.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="ABOUT MAKEON"
        title="AI를 배우고, 만들고, 직접 써보는 공간"
        description="MAKEON은 AI를 어렵게 설명하기보다 직접 배우고, 만들고, 써볼 수 있도록 실용적인 가이드와 무료 웹도구, 가볍게 즐길 수 있는 미니게임을 제공하는 공간입니다."
      />

      <section className="about-story-section">
        <div className="site-container about-story-grid">
          <div className="story-sticky">
            <p className="eyebrow">AI PLAYGROUND</p>
            <h2>읽고, 써보고,<br />자유롭게 탐색하세요.</h2>
          </div>
          <div className="story-copy">
            <p className="story-lead">
              MAKEON은 AI를 어렵게 설명하기보다 직접 배우고, 만들고, 써볼 수 있도록
              실용적인 가이드와 무료 웹도구, 가볍게 즐길 수 있는 미니게임을 제공하는 공간입니다.
            </p>
            <p>
              여기서 ‘AI 놀이터’는 어린이 전용 사이트를 뜻하지 않습니다. AI 활용법과 웹도구를
              부담 없이 둘러보고, 필요한 기능을 직접 실행하며 자신에게 맞는 활용법을 찾는
              열린 체험 공간이라는 의미입니다.
            </p>
            <p>
              블로그에서는 AI 활용, Codex, 웹사이트 제작, 배포와 검색 문제를 초보자도 따라 할 수
              있게 정리합니다. 무료 도구에서는 입력과 결과를 바로 확인하고, 게임에서는 설명보다
              플레이가 먼저 보이도록 구성해 각 영역의 역할을 분명하게 나눕니다.
            </p>
            <p>
              모든 콘텐츠는 사용자가 다음 행동을 선택하기 쉽게 연결됩니다. 글에서 해결 방법을
              확인한 뒤 관련 도구를 사용하거나, 잠시 쉬고 싶을 때 퍼즐과 미니게임을 즐길 수 있습니다.
            </p>
            <Link className="button button-primary" href="/blog">
              실용 가이드 읽기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT WE VALUE</p>
              <h2>MAKEON이 지키는 세 가지</h2>
            </div>
          </div>
          <div className="values-grid">
            {values.map((value) => (
              <article className="value-card" key={value.number}>
                <span>{value.number}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section" aria-labelledby="verification-title">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT YOU CAN DO</p>
              <h2 id="verification-title">MAKEON에서 할 수 있는 것</h2>
            </div>
          </div>
          <div className="values-grid">
            <article className="value-card">
              <span>01</span>
              <h3>AI 활용법을 쉽게 읽습니다</h3>
              <p>프롬프트, AI 코딩, 웹사이트 제작과 배포 문제를 검색 의도에 맞는 가이드로 확인합니다.</p>
            </article>
            <article className="value-card">
              <span>02</span>
              <h3>무료 웹도구를 바로 씁니다</h3>
              <p>별도 설치나 가입 없이 AI 프롬프트 생성기와 실용 도구를 브라우저에서 실행합니다.</p>
            </article>
            <article className="value-card">
              <span>03</span>
              <h3>퍼즐과 미니게임을 즐깁니다</h3>
              <p>파스텔 퍼즐, 기억력 게임과 대전 게임을 모바일과 PC에서 가볍게 플레이합니다.</p>
            </article>
          </div>
        </div>
      </section>

      <NewsletterCta />
    </main>
  );
}
