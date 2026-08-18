import type { Metadata } from "next";
import { BlogFilter } from "@/components/blog-filter";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PageHero } from "@/components/page-hero";
import { blogPosts } from "@/content/blog-posts";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "ChatGPT 실용 활용, 생산성, AI 이미지와 무료 AI 도구부터 AI 코딩·웹사이트 제작까지 초보자가 바로 써먹는 실전 가이드입니다.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "MAKEON 블로그",
    description: "AI를 배우고 활용하고 직접 써보는 실전 가이드와 체험 콘텐츠를 확인하세요.",
    url: "/blog",
    images: [{ url: "/og.png", alt: "MAKEON - AI로 아이디어를 현실로" }],
  },
};

export default function BlogPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="MAKEON BLOG"
        title="AI를 바로 써먹는 실전 가이드"
        description="ChatGPT 업무 활용, 생산성, AI 이미지·무료 도구와 AI 코딩·웹사이트 제작을 초보자도 직접 따라 할 수 있게 정리합니다."
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
