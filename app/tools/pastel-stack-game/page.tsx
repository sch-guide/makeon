import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PastelStackGame } from "@/components/pastel-stack-game/pastel-stack-game";
import styles from "@/components/pastel-stack-game/pastel-stack-game.module.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "파스텔 스택 쌓기 | 무료 타이밍 미니게임",
  description:
    "움직이는 파스텔 블록을 정확한 순간에 멈춰 가장 높은 타워를 쌓는 무료 모바일 미니게임입니다.",
  alternates: { canonical: "/tools/pastel-stack-game" },
  openGraph: {
    title: "파스텔 스택 쌓기 | MAKEON",
    description:
      "움직이는 블록을 정확한 순간에 멈춰 퍼펙트 콤보와 최고 높이에 도전해보세요.",
    url: "/tools/pastel-stack-game",
    images: [{ url: "/og.png", alt: "MAKEON 파스텔 스택 쌓기" }],
  },
};

const faqs = [
  {
    question: "스마트폰에서도 플레이할 수 있나요?",
    answer:
      "네. 게임 화면을 한 번 탭하면 블록이 떨어집니다. 320px 이상의 세로 화면을 기준으로 조작 영역과 버튼 크기를 조정했습니다.",
  },
  {
    question: "최고 기록은 어디에 저장되나요?",
    answer:
      "기기의 최고 높이, 점수, 콤보와 설정은 브라우저 localStorage에 유지됩니다. 온라인 랭킹에 참여해 닉네임을 설정하면 서버 검증을 통과한 개인 최고 기록도 Supabase에 저장됩니다. 랭킹 연결에 실패해도 브라우저 기록은 사라지지 않습니다.",
  },
  {
    question: "소리가 자동으로 재생되지 않는 이유는 무엇인가요?",
    answer:
      "효과음과 BGM 설정은 처음부터 켜져 있지만 브라우저의 자동재생 정책 때문에 게임 시작 또는 첫 터치 뒤에 재생됩니다. 원하지 않을 때는 설정에서 각각 끌 수 있습니다.",
  },
  {
    question: "퍼펙트 콤보는 어떤 효과가 있나요?",
    answer:
      "블록 중심이 거의 정확히 맞으면 퍼펙트로 판정됩니다. 콤보 점수 보너스가 늘어나며, 5회 연속 퍼펙트마다 잘린 블록 너비를 조금 회복합니다.",
  },
];

export default function PastelStackGamePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "파스텔 스택 쌓기",
    url: `${siteConfig.url}/tools/pastel-stack-game`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    description:
      "움직이는 파스텔 블록을 정확한 순간에 멈춰 가장 높은 타워에 도전하는 무료 타이밍 미니게임",
    playMode: "SinglePlayer",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero
        eyebrow="FREE TIMING MINI GAME"
        title="파스텔 스택 쌓기"
        description="움직이는 블록을 정확한 순간에 멈춰 가장 높은 파스텔 타워를 쌓아보세요."
      />

      <section className={styles.pageSection}>
        <div className="site-container">
          <div className={styles.intro}>
            <p className="eyebrow">TAP · STACK · PERFECT</p>
            <h2>한 번의 탭으로 더 높은 타워에 도전하세요.</h2>
            <p>
              아래 블록과 겹친 부분만 다음 블록으로 남습니다. 중앙에 정확히
              맞춰 퍼펙트 콤보를 이어가고 브라우저 기록과 온라인 랭킹에 도전해보세요.
            </p>
          </div>

          <PastelStackGame />

          <section className={styles.guide} aria-labelledby="stack-guide-title">
            <p className="eyebrow">HOW TO PLAY</p>
            <h2 id="stack-guide-title">게임 방법</h2>
            <p>설치나 로그인 없이 바로 시작할 수 있습니다.</p>
            <div className={styles.guideGrid}>
              <article>
                <span>01</span>
                <h3>움직임을 살펴보세요.</h3>
                <p>위쪽 블록이 좌우로 움직입니다. 처음에는 속도가 느려 타이밍을 익히기 쉽습니다.</p>
              </article>
              <article>
                <span>02</span>
                <h3>겹치는 순간에 멈추세요.</h3>
                <p>화면을 탭하거나 클릭하세요. PC에서는 Space와 Enter 키도 사용할 수 있습니다.</p>
              </article>
              <article>
                <span>03</span>
                <h3>퍼펙트 콤보를 이어가세요.</h3>
                <p>중심을 정확히 맞추면 점수 보너스를 얻고 5 콤보마다 블록 너비가 조금 회복됩니다.</p>
              </article>
            </div>
          </section>

          <section className={styles.faq} aria-labelledby="stack-faq-title">
            <p className="eyebrow">FAQ</p>
            <h2 id="stack-faq-title">자주 묻는 질문</h2>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </section>

          <nav className={styles.related} aria-label="관련 페이지">
            <div>
              <p className="eyebrow">MORE FROM MAKEON</p>
              <h2>다른 무료 도구도 둘러보세요.</h2>
            </div>
            <div>
              <Link className="button button-secondary" href="/tools">무료 도구 전체 보기</Link>
              <Link className="button button-secondary" href="/tools/sensory-toy-playground">디지털 촉감 놀이터</Link>
              <Link className="button button-primary" href="/tools/ai-prompt-generator">AI 프롬프트 생성기</Link>
            </div>
          </nav>
        </div>
      </section>
    </main>
  );
}
