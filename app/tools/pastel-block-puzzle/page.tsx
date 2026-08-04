import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { TetrisGame } from "@/components/tetris-game/tetris-game";
import styles from "@/components/tetris-game/tetris-game.module.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "MAKEON 파스텔 블록 퍼즐 | 무료 줄 완성 게임",
  description:
    "일곱 종류의 파스텔 블록을 이동하고 회전해 가로줄을 완성하고 오늘·전체 온라인 랭킹에 도전하는 무료 웹 블록 퍼즐입니다.",
  alternates: { canonical: "/tools/pastel-block-puzzle" },
  openGraph: {
    title: "MAKEON 파스텔 블록 퍼즐 | 무료 줄 완성 게임",
    description: "파스텔 블록으로 가로줄을 완성하고 온라인 TOP 20 기록에 도전해보세요.",
    url: "/tools/pastel-block-puzzle",
    images: [{ url: "/og.png", alt: "MAKEON 파스텔 블록 퍼즐" }],
  },
};

const faqs = [
  {
    question: "설치나 회원가입이 필요한가요?",
    answer:
      "설치와 이메일 회원가입 없이 브라우저에서 바로 시작할 수 있습니다. 온라인 랭킹을 사용하면 Supabase 익명 인증과 사용자가 정한 공개 닉네임을 사용합니다.",
  },
  {
    question: "점수는 어떻게 계산되나요?",
    answer:
      "블록을 아래로 내리고 가로줄을 지우면 점수가 올라갑니다. 한 번에 여러 줄을 지울수록 보너스가 커지고 10줄마다 레벨과 자동 낙하 속도가 올라갑니다.",
  },
  {
    question: "기록은 어디에 저장되나요?",
    answer:
      "게임 설정과 로컬 최고 기록은 브라우저에 저장됩니다. 랭킹 제출을 선택하면 닉네임, 점수, 삭제한 줄, 레벨과 달성 시각이 온라인 랭킹에 저장될 수 있습니다.",
  },
  {
    question: "휴대폰에서도 플레이할 수 있나요?",
    answer:
      "모바일에서는 게임판 아래 이동·회전·내리기 버튼을 사용합니다. 화면 회전이나 브라우저 확대 상태에 따라 게임판 크기가 달라질 수 있습니다.",
  },
  {
    question: "오프라인에서도 기록이 남나요?",
    answer:
      "이미 열린 게임의 로컬 기록은 브라우저에 남을 수 있지만 온라인 랭킹 조회와 제출에는 네트워크 연결이 필요합니다.",
  },
];

export default function PastelBlockPuzzlePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "MAKEON 파스텔 블록 퍼즐",
    url: `${siteConfig.url}/tools/pastel-block-puzzle`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    description: "모바일과 PC에서 줄을 완성하고 온라인 랭킹에 도전하는 무료 파스텔 블록 퍼즐",
    playMode: "SinglePlayer",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        eyebrow="FREE BLOCK PUZZLE"
        title="MAKEON 파스텔 블록 퍼즐"
        description="블록을 빈틈없이 배치해 가로줄을 지우고 오늘과 전체 온라인 랭킹에 도전해보세요."
      />

      <section className={styles.pageSection}>
        <div className="site-container">
          <section className={styles.intro} aria-labelledby="block-puzzle-intro-title">
            <p className="eyebrow">STACK · CLEAR · RANK</p>
            <h2 id="block-puzzle-intro-title">일곱 종류의 블록으로 줄을 완성하는 퍼즐입니다.</h2>
            <p>
              블록은 일곱 종류가 한 묶음으로 섞이는 7-bag 방식으로 등장합니다. 빈틈없이 가로줄을
              채우면 줄이 사라지고 10줄마다 레벨과 낙하 속도가 올라갑니다. 다음 블록을 확인하며
              빈 공간을 관리하는 것이 핵심입니다.
            </p>
          </section>

          <TetrisGame />

          <section className={styles.guide} aria-labelledby="block-guide-title">
            <p className="eyebrow">HOW TO PLAY</p>
            <h2 id="block-guide-title">게임 방법</h2>
            <p>PC와 모바일 조작 방식이 다르며, 일시정지 중에는 점수와 시간이 진행되지 않습니다.</p>
            <div className={styles.guideGrid}>
              <article><span>01</span><h3>이동하고 회전하세요.</h3><p>PC에서는 방향키와 Space를, 모바일에서는 게임판 아래의 큰 조작 버튼을 사용합니다.</p></article>
              <article><span>02</span><h3>가로줄을 채우세요.</h3><p>한 번에 여러 줄을 지울수록 점수가 커집니다. 네 줄을 동시에 지우면 가장 큰 보너스를 받습니다.</p></article>
              <article><span>03</span><h3>최고 기록에 도전하세요.</h3><p>오늘과 전체 랭킹을 나누어 확인할 수 있으며 더 좋은 기록만 개인 최고 기록으로 저장됩니다.</p></article>
            </div>
          </section>

          <section className={styles.guide} aria-labelledby="block-data-title">
            <p className="eyebrow">RECORDS & PRIVACY</p>
            <h2 id="block-data-title">온라인 랭킹은 선택해서 사용할 수 있습니다.</h2>
            <p>
              랭킹에는 공개 닉네임과 게임 기록만 표시합니다. 이메일과 실명을 요구하지 않으며,
              익명 인증 식별자는 공개 목록에 노출하지 않습니다. 실명·연락처를 닉네임으로 사용하지 마세요.
            </p>
            <p>
              기록 제출이 실패해도 게임은 계속할 수 있으며 브라우저 최고 기록은 별도로 유지됩니다.
              비정상적인 점수는 서버 검증에서 제외될 수 있습니다.
            </p>
          </section>

          <section className={styles.guide} aria-labelledby="block-support-title">
            <p className="eyebrow">SUPPORT & LIMITS</p>
            <h2 id="block-support-title">지원 환경과 한계</h2>
            <div className={styles.guideGrid}>
              <article><span>01</span><h3>최신 브라우저</h3><p>최신 Chrome, Edge, Safari 계열을 기준으로 하며 오래된 브라우저에서는 오디오와 저장 기능이 제한될 수 있습니다.</p></article>
              <article><span>02</span><h3>소리와 자동재생</h3><p>브라우저 정책에 따라 첫 터치나 키 입력 뒤에 BGM과 효과음이 시작될 수 있습니다.</p></article>
              <article><span>03</span><h3>기기별 기록</h3><p>브라우저 데이터를 지우거나 다른 기기를 사용하면 로컬 설정과 기록이 이어지지 않을 수 있습니다.</p></article>
            </div>
          </section>

          <section className={styles.guide} aria-labelledby="block-update-title">
            <p className="eyebrow">UPDATE LOG</p>
            <h2 id="block-update-title">업데이트 기록</h2>
            <p><strong>2026-08-05</strong> — 독자적인 게임명으로 변경하고 사용법, 점수, 데이터 저장, 지원 환경과 FAQ를 보강했습니다.</p>
            <p><strong>2026-08-04</strong> — 온라인 랭킹과 모바일 조작, BGM·효과음 설정을 공개했습니다.</p>
          </section>

          <section className={styles.guide} aria-labelledby="block-faq-title">
            <p className="eyebrow">FAQ</p>
            <h2 id="block-faq-title">자주 묻는 질문</h2>
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </section>

          <nav className={styles.guide} aria-label="관련 페이지">
            <p className="eyebrow">KEEP PLAYING</p>
            <h2>다른 MAKEON 퍼즐도 살펴보세요.</h2>
            <p><Link href="/tools/pastel-color-sort">파스텔 컬러 정렬</Link> · <Link href="/tools/pastel-memory-match">파스텔 메모리 맞추기</Link> · <Link href="/privacy">개인정보처리방침</Link></p>
          </nav>
        </div>
      </section>
    </main>
  );
}
