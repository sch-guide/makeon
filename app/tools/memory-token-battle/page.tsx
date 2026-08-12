import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { MemoryTokenBattle } from "@/components/memory-token-battle/memory-token-battle";
import { siteConfig } from "@/lib/site";
import styles from "../pastel-memory-match/page.module.css";

export const metadata: Metadata = {
  title: "메모리 토큰 배틀 | 2인·로봇 대전 기억력 게임",
  description: "뒤집힌 토큰의 위치를 기억해 같은 그림을 찾고, 친구 또는 로봇과 점수를 겨루는 무료 기억력 보드게임입니다.",
  alternates: { canonical: "/tools/memory-token-battle" },
  openGraph: {
    title: "메모리 토큰 배틀 | 2인·로봇 대전 기억력 게임",
    description: "친구 또는 기억하는 로봇과 원형 토큰의 짝을 찾아보세요.",
    url: "/tools/memory-token-battle",
    images: [{ url: "/og.png", alt: "MAKEON 메모리 토큰 배틀" }],
  },
};

const faqs = [
  ["설치하거나 로그인해야 하나요?", "아니요. 기본 게임은 브라우저에서 바로 실행되며 로그인이나 설치가 필요하지 않습니다."],
  ["로봇은 토큰 위치를 어떻게 찾나요?", "난이도에 따라 앞서 공개된 토큰의 일부를 기억합니다. 어려움에서도 작은 실수 확률이 있어 매번 완벽하게 플레이하지는 않습니다."],
  ["휴대폰에서 2명이 함께 할 수 있나요?", "네. 2인 대전은 한 기기에서 번갈아 토큰을 누르는 방식이며 현재 차례가 점수판과 안내 문구로 표시됩니다."],
  ["게임 기록은 어디에 저장되나요?", "효과음·BGM 설정과 혼자 연습 최고 기록은 현재 브라우저에만 저장됩니다. 2인 로컬 대전 결과는 서버로 전송하지 않습니다."],
  ["소리는 언제 재생되나요?", "브라우저 정책에 따라 게임 시작 버튼을 누른 뒤부터 Web Audio API로 만든 자체 합성 BGM과 효과음이 재생됩니다. 언제든 각각 끌 수 있습니다."],
  ["승패와 동점은 어떻게 결정하나요?", "모든 토큰의 짝을 찾았을 때 더 많은 짝을 획득한 플레이어가 이깁니다. 획득한 짝 수가 같으면 동점으로 끝납니다."],
];

export default function MemoryTokenBattlePage() {
  const structuredData = {
    "@context": "https://schema.org", "@type": "Game",
    name: "메모리 토큰 배틀", url: `${siteConfig.url}/tools/memory-token-battle`,
    description: "토큰의 위치를 기억해 혼자, 친구 또는 로봇과 겨루는 무료 웹 기억력 게임",
    genre: ["Memory", "Board game", "Puzzle"], gamePlatform: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero eyebrow="FREE MEMORY BOARD GAME" title="메모리 토큰 배틀" description="원형 토큰의 위치를 기억하고 같은 그림을 찾아 친구 또는 로봇과 점수를 겨뤄보세요." />
      <section className={styles.pageSection}><div className="site-container">
        <MemoryTokenBattle />
        <section className={styles.guide} aria-labelledby="token-guide-title">
          <p className="eyebrow">HOW TO PLAY</p><h2 id="token-guide-title">같은 그림을 찾으면 한 번 더 플레이해요.</h2>
          <div><article><span>01</span><h3>두 토큰을 선택해요</h3><p>뒤집힌 원형 토큰 두 개를 차례로 누르고 그림과 위치를 확인하세요.</p></article><article><span>02</span><h3>짝을 획득해요</h3><p>같은 그림이면 1점을 얻고 다시 플레이합니다. 다르면 상대에게 차례가 넘어갑니다.</p></article><article><span>03</span><h3>로봇의 기억에 도전해요</h3><p>로봇은 앞서 본 위치의 일부를 기억합니다. 난이도가 높을수록 더 오래 정확하게 기억해요.</p></article></div>
        </section>
        <section className={styles.guide} aria-labelledby="token-mode-title"><p className="eyebrow">FOUR MODES</p><h2 id="token-mode-title">연습부터 2인 대전까지 원하는 방식으로 즐기세요.</h2><div><article><span>01</span><h3>혼자·30초 도전</h3><p>모든 짝을 찾는 기록을 줄이거나 제한 시간 동안 찾은 짝 수에 도전할 수 있습니다.</p></article><article><span>02</span><h3>한 기기 2인 대전</h3><p>닉네임을 정하고 번갈아 플레이합니다. 맞힌 토큰은 각 플레이어의 획득 영역에 쌓입니다.</p></article><article><span>03</span><h3>안전한 브라우저 게임</h3><p>기본 플레이는 서버와 계정 없이 작동하며 외부 음원 대신 자체 합성 소리를 사용합니다.</p></article></div></section>
        <section className={styles.guide} aria-labelledby="token-rules-title"><p className="eyebrow">RULES & DIFFICULTY</p><h2 id="token-rules-title">모드에 따라 기록 기준과 상대가 달라집니다.</h2><div><article><span>01</span><h3>혼자 연습 기록</h3><p>모든 짝을 찾기까지 걸린 시간과 선택 횟수를 줄이는 방식입니다. 최고 기록은 현재 브라우저에만 보관됩니다.</p></article><article><span>02</span><h3>로봇 난이도</h3><p>난이도가 올라갈수록 로봇이 앞서 공개된 토큰 위치를 더 오래 기억합니다. 로봇에게도 작은 실수 확률이 있습니다.</p></article><article><span>03</span><h3>승패 결정</h3><p>모든 짝을 찾은 뒤 획득한 짝이 더 많은 플레이어가 이깁니다. 같은 수의 짝을 얻으면 동점입니다.</p></article></div></section>
        <section className={styles.faq} aria-labelledby="token-faq-title"><p className="eyebrow">FAQ</p><h2 id="token-faq-title">자주 묻는 질문</h2><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
        <nav className={styles.related} aria-label="관련 페이지"><div><p className="eyebrow">KEEP PLAYING</p><h2>MAKEON의 다른 퍼즐도 즐겨보세요.</h2></div><div><Link className="button button-secondary" href="/tools">무료 도구 전체 보기</Link><Link className="button button-secondary" href="/tools/pastel-color-sort">컬러 정렬 퍼즐</Link><Link className="button button-primary" href="/tools/pastel-memory-match">메모리 카드 맞추기</Link></div></nav>
      </div></section>
    </main>
  );
}
