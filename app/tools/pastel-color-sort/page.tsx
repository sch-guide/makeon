import type { Metadata } from "next";
import Link from "next/link";
import { PastelColorSortGame } from "@/components/pastel-color-sort/pastel-color-sort-game";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "파스텔 컬러 정렬 퍼즐 | 무료 색상 정리 게임",
  description: "여러 용기에 섞인 파스텔 색상을 같은 색끼리 모아 모든 용기를 완성하는 무료 컬러 정렬 퍼즐 게임입니다.",
  alternates: { canonical: "/tools/pastel-color-sort" },
  openGraph: {
    title: "파스텔 컬러 정렬 퍼즐 | 무료 색상 정리 게임",
    description: "부드러운 파스텔 젤 블록을 같은 색끼리 모아 30개 레벨을 완성해 보세요.",
    url: "/tools/pastel-color-sort",
    images: [{ url: "/og.png", alt: "MAKEON 파스텔 컬러 정렬 퍼즐" }],
  },
};

const faqs = [
  { question: "어떻게 색상을 옮기나요?", answer: "색상이 든 용기를 먼저 선택한 뒤, 비어 있거나 맨 위 색상이 같은 용기를 선택하세요. 맨 위에서 이어진 같은 색 블록이 빈 공간만큼 함께 이동합니다." },
  { question: "모든 레벨을 무료로 플레이할 수 있나요?", answer: "네. 로그인 없이 30개 레벨을 순서대로 무료로 플레이할 수 있습니다. 기록은 현재 브라우저의 localStorage에만 저장됩니다." },
  { question: "힌트가 정답을 보장하나요?", answer: "힌트는 같은 색을 합치거나 아래 색을 여는 유리한 이동을 우선 추천하지만 전체 정답 경로를 보장하지는 않습니다." },
  { question: "색을 구분하기 어려우면 어떻게 하나요?", answer: "색상마다 명도와 채도 차이를 충분히 두었고, 보드 아래 색상 이름과 각 용기의 음성 안내로 현재 색을 확인할 수 있습니다." },
  { question: "소리는 언제 재생되나요?", answer: "BGM과 효과음은 켜진 상태로 시작합니다. 다만 브라우저의 자동 재생 정책 때문에 첫 탭이나 클릭 뒤부터 들릴 수 있습니다. 화면의 소리와 BGM 버튼으로 각각 끌 수 있습니다." },
  { question: "기록을 다른 기기로 옮길 수 있나요?", answer: "현재 기록은 계정이나 서버와 연결되지 않아 다른 기기로 동기화되지 않습니다. 브라우저 데이터를 지우거나 시크릿 모드를 사용하면 기록이 사라질 수 있습니다." },
];

export default function PastelColorSortPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "파스텔 컬러 정렬 퍼즐",
    url: `${siteConfig.url}/tools/pastel-color-sort`,
    description: "투명한 유리 용기의 파스텔 액체를 같은 색끼리 모으는 무료 웹 퍼즐 게임",
    genre: ["Color sorting", "Puzzle"],
    gamePlatform: "Web Browser",
    numberOfPlayers: 1,
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <main id="main-content" className="pastel-sort-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="pastel-sort-hero">
        <div className="site-container">
          <p className="eyebrow">FREE PUZZLE GAME</p>
          <h1>파스텔 컬러 정렬 퍼즐</h1>
          <p>부드러운 파스텔 젤 블록을 같은 색끼리 모아 모든 용기를 완성해 보세요.</p>
        </div>
      </section>

      <section className="pastel-sort-game-section">
        <div className="site-container"><PastelColorSortGame /></div>
      </section>

      <section className="pastel-sort-guide-section">
        <div className="site-container pastel-sort-guide-grid">
          <article>
            <p className="eyebrow">HOW TO PLAY</p>
            <h2>같은 색을 차분히 모아보세요.</h2>
            <ol>
              <li><strong>용기 선택</strong><span>옮기고 싶은 색상이 맨 위에 있는 용기를 탭합니다.</span></li>
              <li><strong>색상 이동</strong><span>비어 있거나 같은 색이 맨 위에 있는 용기를 탭합니다.</span></li>
              <li><strong>레벨 완성</strong><span>모든 색상을 네 칸씩 한 용기에 모으면 다음 레벨이 열립니다.</span></li>
            </ol>
          </article>
          <article>
            <p className="eyebrow">A QUIET CHALLENGE</p>
            <h2>기록은 브라우저 안에만 저장됩니다.</h2>
            <p>최고 이동 횟수, 별, 잠금 해제 레벨과 소리 설정만 이 기기의 브라우저에 저장합니다. 개인정보를 수집하거나 서버로 보내지 않습니다.</p>
            <Link className="button button-secondary" href="/tools">무료 도구 전체 보기</Link>
          </article>
        </div>
      </section>

      <section className="pastel-sort-guide-section" aria-labelledby="pastel-sort-strategy-title">
        <div className="site-container pastel-sort-guide-grid">
          <article>
            <p className="eyebrow">STRATEGY & RECORDS</p>
            <h2 id="pastel-sort-strategy-title">빈 용기를 임시 공간으로 남겨두세요.</h2>
            <p>아래에 숨은 색을 꺼내려면 빈 용기가 필요합니다. 초반부터 빈 용기를 한 가지 색으로 모두 채우기보다, 두세 번 뒤의 이동까지 생각하며 임시 공간을 남겨두는 편이 안전합니다.</p>
            <p>별과 최고 기록은 같은 레벨에서 사용한 이동 횟수를 기준으로 비교합니다. 힌트는 다음 한 수를 제안하는 보조 기능이므로, 막혔을 때는 실행 취소나 레벨 다시 시작도 함께 활용해 보세요.</p>
          </article>
          <article>
            <p className="eyebrow">SUPPORT & LIMITS</p>
            <h2>설치 없이 최신 브라우저에서 플레이합니다.</h2>
            <p>마우스, 터치, 키보드로 조작할 수 있도록 구성했습니다. 오래된 브라우저나 절전 모드에서는 유리 반사와 액체 이동 애니메이션이 단순하게 보일 수 있지만 게임 판정에는 영향을 주지 않습니다.</p>
            <p>이 게임은 2026년 8월 5일 기준으로 규칙, 30개 레벨, 로컬 기록 저장, 음향 제어와 반응형 화면을 다시 확인했습니다.</p>
          </article>
        </div>
      </section>

      <section className="pastel-sort-faq-section">
        <div className="site-container">
          <p className="eyebrow">FAQ</p>
          <h2>자주 묻는 질문</h2>
          <div>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="pastel-sort-guide-section" aria-labelledby="pastel-sort-related-title">
        <div className="site-container pastel-sort-guide-grid">
          <article>
            <p className="eyebrow">RELATED GUIDE</p>
            <h2 id="pastel-sort-related-title">AI 코딩 결과를 더 정확하게 요청하는 방법</h2>
            <p>화면, 애니메이션, 접근성과 검증 조건을 구체적인 요청으로 정리해 원하는 결과에 가까워지는 방법을 확인해 보세요.</p>
            <Link className="button button-primary" href="/blog/improve-ai-coding-output-quality">AI 코딩 결과 품질 높이기</Link>
          </article>
          <article>
            <p className="eyebrow">UPDATE LOG</p>
            <h2>최근 확인 내용</h2>
            <p><strong>2026.08.05</strong> — 유리 용기와 액체 표현, 이동 애니메이션, BGM·효과음 제어, 도움말과 개인정보 안내를 점검했습니다.</p>
            <Link className="button button-secondary" href="/tools/pastel-memory-match">메모리 카드 게임하기</Link>
          </article>
        </div>
      </section>
    </main>
  );
}
