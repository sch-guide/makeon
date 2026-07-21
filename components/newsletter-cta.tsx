import Link from "next/link";

export function NewsletterCta() {
  return (
    <section className="site-container cta-wrap" aria-labelledby="cta-title">
      <div className="cta-card">
        <div>
          <p className="eyebrow eyebrow-light">MAKE SOMETHING REAL</p>
          <h2 id="cta-title">아이디어를 작은 결과물로 시작해 보세요.</h2>
          <p>MAKEON의 제작 기록과 무료 도구를 차근차근 만나보세요.</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-light" href="/blog">
            블로그 둘러보기
          </Link>
          <Link className="button button-outline-light" href="/tools">
            무료 도구 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
