import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PastelMemoryMatch } from "@/components/pastel-memory-match/pastel-memory-match";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "파스텔 메모리 카드 맞추기 | 무료 기억력 게임",
  description: "파스텔 카드를 뒤집어 같은 그림을 찾고 콤보와 최고 기록에 도전하는 무료 기억력 미니게임입니다.",
  alternates: { canonical: "/tools/pastel-memory-match" },
  openGraph: {
    title: "파스텔 메모리 카드 맞추기 | 무료 기억력 게임",
    description: "같은 파스텔 그림을 찾으며 콤보와 최고 기록에 도전해 보세요.",
    url: "/tools/pastel-memory-match",
    images: [{ url: "/og.png", alt: "MAKEON 파스텔 메모리 카드 맞추기" }],
  },
};

const faqs = [
  ["게임 기록은 어디에 저장되나요?", "최고 점수와 선택한 설정은 현재 기기의 브라우저 localStorage에만 저장됩니다. 이름, 이메일 등 개인정보는 수집하거나 서버로 전송하지 않습니다."],
  ["힌트는 카드를 자동으로 뒤집나요?", "아니요. 아직 맞추지 않은 한 쌍의 뒷면만 약 1초 동안 강조합니다. 게임마다 세 번까지 사용할 수 있고 사용할 때마다 50점이 차감됩니다."],
  ["휴대폰에서도 할 수 있나요?", "네. 320px 너비부터 가로 스크롤 없이 플레이할 수 있으며 어려움과 챌린지는 카드가 너무 작아지지 않도록 4열로 배치됩니다."],
  ["소리를 완전히 끌 수 있나요?", "기본값이 음소거이며 소리 끔 버튼을 눌러야 Web Audio 효과음이 시작됩니다. 켠 뒤에도 음량을 최대 60% 안에서 조절할 수 있습니다."],
];

export default function PastelMemoryMatchPage() {
  const structuredData = {
    "@context": "https://schema.org", "@type": "Game",
    name: "파스텔 메모리 카드 맞추기", url: `${siteConfig.url}/tools/pastel-memory-match`,
    description: "파스텔 카드를 뒤집어 같은 그림을 찾는 무료 기억력 미니게임",
    genre: ["Memory", "Puzzle"], gamePlatform: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero eyebrow="FREE PASTEL MEMORY GAME" title="파스텔 메모리 카드 맞추기" description="카드를 뒤집어 같은 그림 두 장을 찾고, 나만의 최고 콤보와 기록에 도전해 보세요." />
      <section className={styles.pageSection}>
        <div className="site-container">
          <PastelMemoryMatch />
          <section className={styles.guide} aria-labelledby="memory-guide-title">
            <p className="eyebrow">HOW TO PLAY</p>
            <h2 id="memory-guide-title">천천히 기억하고, 연속으로 맞춰보세요.</h2>
            <div>
              <article><span>01</span><h3>위치를 기억해요</h3><p>2초 미리보기로 카드 위치를 살핀 뒤 같은 그림 두 장을 차례로 선택하세요.</p></article>
              <article><span>02</span><h3>콤보를 이어가요</h3><p>연속으로 맞추면 2콤보부터 점수 배수가 올라가고 최고 콤보가 기록됩니다.</p></article>
              <article><span>03</span><h3>막히면 힌트를 써요</h3><p>한 쌍의 위치를 은은하게 알려주는 힌트를 게임마다 세 번 사용할 수 있어요.</p></article>
            </div>
          </section>
          <section className={styles.faq} aria-labelledby="memory-faq-title">
            <p className="eyebrow">FAQ</p><h2 id="memory-faq-title">자주 묻는 질문</h2>
            <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
          </section>
          <nav className={styles.related} aria-label="관련 페이지">
            <div><p className="eyebrow">KEEP PLAYING</p><h2>MAKEON의 다른 무료 도구도 만나보세요.</h2></div>
            <div><Link className="button button-secondary" href="/tools">무료 도구 전체 보기</Link><Link className="button button-primary" href="/tools/sensory-toy-playground">디지털 촉감 놀이터</Link></div>
          </nav>
        </div>
      </section>
    </main>
  );
}
