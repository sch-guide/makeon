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
            <p className="eyebrow">BUILD WITH AI · SHARE WITH EVERYONE</p>
            <h1>
              AI로 아이디어를
              <br />
              <span>현실로.</span>
            </h1>
            <p className="hero-description">{siteConfig.description}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/blog">
                블로그 둘러보기 <span aria-hidden="true">→</span>
              </Link>
              <Link className="button button-secondary" href="/tools">
                무료 도구 사용하기
              </Link>
            </div>
            <div className="hero-note">
              <span className="live-dot" aria-hidden="true" />
              <span>코딩 초보자의 실제 제작 과정을 기록합니다.</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="아이디어가 서비스로 만들어지는 과정">
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
                    <p>누구나 쓰는 작은 여행 도구를 만들고 싶어요.</p>
                  </div>
                </div>
                <div className="build-line">
                  <span />
                  <b>AI와 함께 만드는 중</b>
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
                    <strong>아이디어가 웹앱이 되었어요.</strong>
                    <p>기획 · 제작 · 공개까지 한 걸음씩</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-badge badge-top">코딩 경험 0도 시작</div>
            <div className="floating-badge badge-bottom">✓ 모바일까지 반응형</div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="site-container">
          <SectionHeading
            eyebrow="LATEST STORIES"
            title="최신 블로그 글"
            description="AI와 함께 직접 부딪히며 배운 제작 과정과 쉬운 가이드를 나눕니다."
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
            title="인기 무료 도구"
            description="설치 없이 바로 쓰는 작고 유용한 도구를 하나씩 만들고 있습니다."
            href="/tools"
            linkLabel="도구 모아보기"
          />
          <div className="tools-showcase">
            <ToolCard tool={tools[0]} />
            <div className="tool-promise">
              <span className="promise-number">01</span>
              <div>
                <h3>작지만 분명하게 유용한 도구</h3>
                <p>
                  복잡한 가입 없이 바로 사용할 수 있는 도구를 목표로 합니다. 새로운 도구가
                  준비되는 과정을 블로그에서 먼저 공유합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section about-home">
        <div className="site-container about-grid">
          <div>
            <p className="eyebrow">ABOUT MAKEON</p>
            <h2>몰라도 괜찮습니다.<br />함께 만들면 되니까요.</h2>
          </div>
          <div className="about-copy">
            <p>
              MAKEON은 코딩을 모르는 사람도 AI와 함께 자신의 아이디어를 실제 웹사이트와
              앱으로 만들어 볼 수 있다는 믿음에서 시작했습니다.
            </p>
            <p>
              성공한 결과만 보여주기보다 막혔던 지점과 해결 과정까지 솔직하게 기록하고,
              그 과정에서 나온 도구를 누구나 무료로 사용할 수 있게 나눕니다.
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
