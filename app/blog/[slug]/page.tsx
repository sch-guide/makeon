import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { blogPosts, getPostBySlug } from "@/content/blog-posts";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "글을 찾을 수 없습니다" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      section: post.category,
      images: [{ url: "/og.png", alt: "MAKEON - AI로 아이디어를 현실로" }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "ko-KR",
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: "MAKEON" },
    publisher: { "@type": "Organization", name: "MAKEON" },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article>
        <header className="article-header">
          <div className="article-header-inner">
            <nav className="breadcrumbs" aria-label="현재 위치">
              <Link href="/">홈</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog">블로그</Link>
              <span aria-hidden="true">/</span>
              <span>{post.category}</span>
            </nav>
            <span className="category-pill">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="article-summary">{post.summary}</p>
            <div className="article-meta">
              <span>MAKEON 편집팀</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} 읽기</span>
            </div>
          </div>
        </header>

        <div className="site-container article-layout">
          <div className="article-body">
            <div className="article-lead">
              <span>MAKEON NOTE</span>
              <p>{post.description}</p>
            </div>

            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <div className="article-end">
              <span aria-hidden="true">✦</span>
              <p>이 글이 작은 아이디어를 시작하는 데 도움이 되었기를 바랍니다.</p>
              <Link className="text-link" href="/blog">
                블로그 목록으로 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <aside className="article-aside" aria-label="글 안내">
            <div className="aside-card">
              <span className="aside-label">MAKEON</span>
              <h2>AI와 함께 직접 만들어갑니다.</h2>
              <p>쉬운 설명, 솔직한 과정, 누구나 쓰는 무료 도구를 공유합니다.</p>
              <Link className="button button-primary" href="/about">
                MAKEON 소개
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <section className="related-section">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">KEEP READING</p>
              <h2>함께 읽으면 좋은 글</h2>
            </div>
          </div>
          <div className="related-grid">
            {relatedPosts.map((item) => (
              <BlogCard post={item} key={item.slug} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterCta />
    </main>
  );
}
