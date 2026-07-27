import type { Metadata } from "next";
import Link from "next/link";
import { DigitalSquishyPlayground } from "@/components/digital-squishy-playground";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "디지털 말랑이 놀이터 | 슬랑이·크런치 말랑이 무료 미니앱",
  description:
    "폭신 말랑이, 늘어나는 슬랑이, 크런치 말랑이를 모바일과 PC에서 눌러보는 무료 디지털 미니앱입니다.",
  alternates: { canonical: "/tools/digital-squishy-playground" },
  openGraph: {
    title: "디지털 말랑이 놀이터 | MAKEON",
    description:
      "폭신 말랑이, 슬랑이, 크런치 말랑이를 손가락과 마우스로 누르고 늘려보세요.",
    url: "/tools/digital-squishy-playground",
    images: [{ url: "/og.png", alt: "MAKEON 디지털 말랑이 놀이터" }],
  },
};

const faqs = [
  {
    question: "실제 말랑이와 같은 촉감을 느낄 수 있나요?",
    answer:
      "실제 촉감을 재현하는 제품은 아닙니다. 브라우저의 움직임, 변형, 입자와 합성 소리로 말랑한 느낌을 표현한 디지털 미니앱입니다.",
  },
  {
    question: "휴대폰에서도 사용할 수 있나요?",
    answer:
      "네. 한 손가락 누르기와 드래그를 지원하며 모바일 Safari와 Chrome에서 사용할 수 있도록 Pointer Events 기반으로 만들었습니다.",
  },
  {
    question: "소리는 어디에서 가져오나요?",
    answer:
      "외부 음원 파일을 사용하지 않습니다. 사용자가 소리를 켠 뒤 Web Audio API가 짧은 효과음을 브라우저 안에서 직접 합성합니다.",
  },
  {
    question: "놀이 기록이나 개인정보가 저장되나요?",
    answer:
      "아니요. 클릭 수와 타이머 기록은 현재 페이지가 열려 있는 동안 브라우저 메모리에서만 처리되며 서버나 데이터베이스로 전송하지 않습니다.",
  },
];

export default function DigitalSquishyPlaygroundPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="FREE MINI APP"
        title="디지털 말랑이 놀이터"
        description="폭신 말랑이, 늘어나는 슬랑이, 바스락 크런치 말랑이를 손가락과 마우스로 눌러보세요."
      />

      <section className="squishy-page-section">
        <div className="site-container">
          <div className="squishy-intro">
            <p className="eyebrow">SQUISH · STRETCH · CRUNCH</p>
            <h2>오늘은 어떤 말랑이를 눌러볼까요?</h2>
            <p>
              이 도구는 실제 말랑이의 촉감을 완전히 재현하는 제품이 아니라,
              소리와 움직임으로 말랑한 느낌을 표현한 디지털 미니앱입니다.
              선택과 놀이 기록은 서버로 보내지 않고 브라우저 안에서만 처리합니다.
            </p>
          </div>

          <DigitalSquishyPlayground />

          <section className="squishy-guide" aria-labelledby="squishy-guide-title">
            <div>
              <p className="eyebrow">HOW TO PLAY</p>
              <h2 id="squishy-guide-title">사용 방법</h2>
            </div>
            <ol>
              <li><strong>모드 선택</strong><span>폭신, 슬랑이, 크런치 중 원하는 움직임을 고릅니다.</span></li>
              <li><strong>모양 꾸미기</strong><span>모양과 색상, 크런치 모드에서 보일 내부 재료를 선택합니다.</span></li>
              <li><strong>누르고 드래그</strong><span>PC에서는 마우스, 모바일에서는 한 손가락으로 눌러 움직입니다.</span></li>
              <li><strong>30초 놀이</strong><span>버튼을 누르고 총 누르기, 최고 콤보와 가장 많이 쓴 모드를 확인합니다.</span></li>
            </ol>
          </section>

          <section className="squishy-faq" aria-labelledby="squishy-faq-title">
            <p className="eyebrow">FAQ</p>
            <h2 id="squishy-faq-title">자주 묻는 질문</h2>
            <div>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <nav className="squishy-related" aria-label="관련 페이지">
            <div>
              <p className="eyebrow">KEEP EXPLORING</p>
              <h2>다른 MAKEON 도구도 둘러보세요.</h2>
            </div>
            <div>
              <Link className="button button-secondary" href="/tools">무료 도구 전체 보기</Link>
              <Link className="button button-secondary" href="/tools/ai-prompt-generator">AI 프롬프트 생성기</Link>
              <Link className="button button-primary" href="/about">MAKEON 소개</Link>
            </div>
          </nav>
        </div>
      </section>
    </main>
  );
}
