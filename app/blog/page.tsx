import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PageHero } from "@/components/page-hero";
import { blogPosts } from "@/content/blog-posts";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "AI와 함께 웹사이트와 앱을 만드는 과정, 초보자를 위한 쉬운 가이드와 솔직한 제작 후기를 읽어보세요.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "MAKEON 블로그",
    description: "AI로 아이디어를 현실로 만드는 과정과 배움을 공유합니다.",
    url: "/blog",
    images: [{ url: "/og.png", alt: "MAKEON - AI로 아이디어를 현실로" }],
  },
};

export default function BlogPage() {
  const [featuredPost, ...otherPosts] = blogPosts;
  const categories = [...new Set(blogPosts.map((post) => post.category))];

  return (
    <main id="main-content">
      <PageHero
        eyebrow="MAKEON BLOG"
        title="만드는 사람의 기록"
        description="완성된 결과보다 그 사이의 선택과 시행착오에 집중합니다. AI와 함께 직접 만들며 배운 내용을 초보자의 언어로 나눕니다."
      />

      <section className="blog-index-section">
        <div className="site-container">
          <div className="category-row" aria-label="블로그 카테고리">
            <span className="category-chip category-chip-active">전체 글 {blogPosts.length}</span>
            {categories.map((category) => (
              <span className="category-chip" key={category}>
                {category}
              </span>
            ))}
          </div>

          <div className="blog-index-featured">
            <BlogCard post={featuredPost} featured />
          </div>

          <div className="blog-index-grid">
            {otherPosts.map((post) => (
              <BlogCard post={post} key={post.slug} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterCta />
    </main>
  );
}
