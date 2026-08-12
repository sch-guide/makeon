import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterCta } from "@/components/newsletter-cta";
import { ToolsLibrary } from "@/components/tools-library";
import { tools } from "@/content/tools";
import styles from "./page.module.css";

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
    <main id="main-content" className="tools-page">
      <section className={styles.hero}>
        <div className={`site-container ${styles.heroInner}`}>
          <p className="eyebrow">FREE WEB TOOLS</p>
          <h1>만들고, 놀고, 바로 써보는 무료 도구</h1>
          <p className={styles.heroDescription}>
            AI로 만드는 실용 도구부터 가볍게 즐기는 퍼즐·미니게임까지,<br className={styles.descriptionBreak} />
            가입과 설치 없이 브라우저에서 바로 사용할 수 있습니다.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-primary" href="#tool-library">전체 도구 둘러보기 <span aria-hidden="true">↓</span></Link>
            <Link className="button button-secondary" href="/tools/ai-prompt-generator">AI 도구 바로 사용</Link>
          </div>
          <div className={styles.heroCount}><strong>{tools.length}</strong><span>개의 무료 도구 · 가입 없이 바로 시작</span></div>
        </div>
      </section>

      <section className={styles.indexSection}>
        <div className="site-container">
          <ToolsLibrary tools={tools} />
        </div>
      </section>

      <NewsletterCta />
    </main>
  );
}
