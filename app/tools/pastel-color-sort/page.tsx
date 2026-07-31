import type { Metadata } from "next";
import Link from "next/link";
import { PastelColorSortGame } from "@/components/pastel-color-sort/pastel-color-sort-game";

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
  { question: "색을 구분하기 어려우면 어떻게 하나요?", answer: "기본으로 각 색상에 서로 다른 기호가 표시됩니다. 하단의 패턴 버튼으로 기호 표시를 켜거나 끌 수 있습니다." },
];

export default function PastelColorSortPage() {
  return (
    <main id="main-content" className="pastel-sort-page">
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

      <section className="pastel-sort-faq-section">
        <div className="site-container">
          <p className="eyebrow">FAQ</p>
          <h2>자주 묻는 질문</h2>
          <div>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>
    </main>
  );
}
