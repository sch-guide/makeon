import type { Metadata } from "next";
import { BlogFilter } from "@/components/blog-filter";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PageHero } from "@/components/page-hero";
import { blogPosts } from "@/content/blog-posts";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "AI 활용, 프롬프트, Codex, 웹사이트 제작, Vercel 배포와 Google 검색 문제를 해결하는 초보자용 실전 가이드입니다.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "MAKEON 블로그",
    description: "AI 활용부터 웹사이트 제작과 배포까지 단계별 해결 방법을 확인하세요.",
    url: "/blog",
    images: [{ url: "/og.png", alt: "MAKEON - AI로 아이디어를 현실로" }],
  },
};

export default function BlogPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="MAKEON BLOG"
        title="AI 활용과 웹사이트 제작 가이드"
        description="프롬프트 작성, AI 코딩, 웹사이트·웹앱 제작, 배포와 Google 검색 문제를 초보자도 따라 할 수 있게 단계별로 정리합니다."
      />

      <section className="blog-index-section">
        <div className="site-container">
          <BlogFilter posts={blogPosts} />
        </div>
      </section>

      <NewsletterCta />
    </main>
  );
}
