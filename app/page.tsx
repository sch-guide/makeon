import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { ToolCard } from "@/components/tool-card";
import { SectionHeading } from "@/components/section-heading";
import { NewsletterCta } from "@/components/newsletter-cta";
import { blogPosts } from "@/content/blog-posts";
import { tools } from "@/content/tools";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const latestPosts = blogPosts.slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="home-hero">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">LEARN · BUILD · PLAY WITH AI</p>
            <h1>
              AI로 배우고, 만들고,
              <br />
              <span>직접 써보세요.</span>
            </h1>
            <p className="hero-description">
              AI 활용법과 웹사이트 제작 가이드를 읽고, 무료 웹도구와 퍼즐·미니게임을 직접 체험해 보세요.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/blog">
                AI 가이드 읽기 <span aria-hidden="true">→</span>
              </Link>
              <Link className="button button-secondary" href="/tools">
                무료 도구·게임 보기
              </Link>
            </div>
            <div className="hero-note">
              <span className="live-dot" aria-hidden="true" />
              <span>AI가 처음이어도 따라갈 수 있는 쉬운 가이드를 제공합니다.</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="AI 가이드와 무료 웹도구를 탐색하는 화면">
            <div className="visual-window">
              <div className="window-bar">
                <span />
                <span />
                <span />
                <p>makeon.build</p>
              </div>
              <div className="build-canvas">
                <div className="prompt-card">
                  <div className="prompt-icon">✦</div>
                  <div>
                    <span>MY IDEA</span>
                    <p>회의 메모를 할 일로 정리하는 웹 도구를 만들고 싶어요.</p>
                  </div>
                </div>
                <div className="build-line">
                  <span />
                  <b>AI로 정리하는 중</b>
                  <span />
                </div>
                <div className="result-card">
                  <div className="mini-page">
                    <div className="mini-nav" />
                    <div className="mini-copy">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="mini-button" />
                  </div>
                  <div>
                    <span>READY TO SHARE</span>
                    <strong>브라우저에서 바로 사용할 수 있어요.</strong>
                    <p>읽기 · 도구 · 게임을 한곳에서</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-badge badge-top">AI 가이드부터 시작</div>
            <div className="floating-badge badge-bottom">✓ 무료 도구와 미니게임</div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="site-container">
          <SectionHeading
            eyebrow="LATEST STORIES"
            title="최신 블로그 글"
            description="AI 활용, 코딩, 웹사이트 제작과 배포에서 자주 막히는 문제를 초보자도 이해하기 쉽게 정리합니다."
            href="/blog"
            linkLabel="모든 글 보기"
          />
          <div className="blog-grid">
            {latestPosts.map((post, index) => (
              <BlogCard post={post} featured={index === 0} key={post.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section section-tinted">
        <div className="site-container">
          <SectionHeading
            eyebrow="FREE TOOLS"
            title="무료 도구와 미니게임"
            description="AI 프롬프트 도구부터 퍼즐·미니게임까지, 가입과 설치 없이 브라우저에서 바로 체험해 보세요."
            href="/tools"
            linkLabel="도구 모아보기"
          />
          <div className="tools-showcase">
            {tools.filter((tool) => tool.featuredOnHome !== false).map((tool) => (
              <ToolCard tool={tool} key={tool.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section about-home">
        <div className="site-container about-grid">
          <div>
            <p className="eyebrow">ABOUT MAKEON</p>
            <h2>배우고, 써보고,<br />가볍게 즐겨보세요.</h2>
          </div>
          <div className="about-copy">
            <p>
              MAKEON은 AI를 배우고 활용하고 직접 써보는 실용형 AI 놀이터입니다. 블로그는
              검색으로 찾아온 질문에 단계별 해결 방법과 실용 정보를 제공합니다.
            </p>
            <p>
              무료 도구와 게임은 설명에 그치지 않고 브라우저에서 바로 체험할 수 있도록 제공합니다.
              읽어서 해결하고, 직접 써보고, 가볍게 즐기는 경험을 한곳에서 연결합니다.
            </p>
            <Link className="text-link" href="/about">
              MAKEON 더 알아보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <NewsletterCta />
    </main>
  );
}
