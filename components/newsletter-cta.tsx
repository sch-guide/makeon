import Link from "next/link";

export function NewsletterCta() {
  return (
    <section className="site-container cta-wrap" aria-labelledby="cta-title">
      <div className="cta-card">
        <div>
          <p className="eyebrow eyebrow-light">LEARN · TRY · PLAY</p>
          <h2 id="cta-title">필요한 가이드를 읽고, 바로 체험해 보세요.</h2>
          <p>AI 활용 가이드와 무료 웹도구, 퍼즐·미니게임을 한곳에서 만나보세요.</p>
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
