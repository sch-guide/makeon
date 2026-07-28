import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SensoryToyPlayground } from "@/components/sensory-toy-playground";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "디지털 촉감 놀이터 | 말랑이·슬랑이·크런치 말랑이·왁뿌볼",
  description:
    "말랑이를 누르고, 슬랑이를 늘리고, 크런치 재료를 섞고, 왁뿌볼 껍질을 깨뜨리는 무료 디지털 촉감 놀이 미니앱입니다.",
  alternates: { canonical: "/tools/sensory-toy-playground" },
  openGraph: {
    title: "디지털 촉감 놀이터 | MAKEON",
    description:
      "화면을 누르고 당기고 섞고 깨뜨리며 네 가지 디지털 촉감 놀이를 즐겨보세요.",
    url: "/tools/sensory-toy-playground",
    images: [{ url: "/og.png", alt: "MAKEON 디지털 촉감 놀이터" }],
  },
};

const faqs = [
  {
    question: "실제 촉감을 느낄 수 있는 도구인가요?",
    answer:
      "실제 촉감을 재현하는 제품은 아닙니다. 화면 변형, 입자, 합성 소리와 지원 기기의 짧은 진동을 조합한 디지털 놀이입니다.",
  },
  {
    question: "소리가 나지 않을 때는 어떻게 하나요?",
    answer:
      "브라우저 자동재생 정책에 따라 먼저 소리 켜기 버튼을 눌러야 합니다. 기기 음량과 무음 모드도 함께 확인해 주세요.",
  },
  {
    question: "진동 버튼을 사용할 수 없어요.",
    answer:
      "진동은 navigator.vibrate를 지원하는 일부 브라우저와 기기에서만 작동합니다. 지원하지 않아도 나머지 기능은 동일하게 사용할 수 있습니다.",
  },
  {
    question: "놀이 결과나 개인정보가 저장되나요?",
    answer:
      "아니요. 설정과 기록은 현재 페이지의 브라우저 메모리에서만 처리하며 서버나 데이터베이스에 저장하지 않습니다.",
  },
];

export default function SensoryToyPlaygroundPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "디지털 촉감 놀이터",
    url: `${siteConfig.url}/tools/sensory-toy-playground`,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web Browser",
    description:
      "말랑이, 슬랑이, 크런치 말랑이와 왁뿌볼을 소리와 움직임으로 표현한 무료 디지털 미니앱",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero
        eyebrow="FREE SENSORY MINI APP"
        title="디지털 촉감 놀이터"
        description="화면을 직접 누르고, 당기고, 섞고, 깨뜨리며 네 가지 디지털 촉감 놀이를 즐겨보세요."
      />

      <section className="sensory-page-section">
        <div className="site-container">
          <div className="sensory-intro">
            <p className="eyebrow">SQUISH · STRETCH · MIX · CRACK</p>
            <h2>오늘은 어떤 촉감 놀이를 해볼까요?</h2>
            <p>
              말랑이를 누르고, 슬랑이를 늘리고, 크런치 재료를 섞고,
              왁뿌볼 껍질을 여러 번 눌러 깨뜨려보세요. 모든 동작은
              로그인이나 저장 없이 현재 브라우저 안에서만 처리합니다.
            </p>
          </div>

          <SensoryToyPlayground />

          <section className="sensory-safety" aria-labelledby="sensory-safety-title">
            <p className="eyebrow">PLEASE NOTE</p>
            <h2 id="sensory-safety-title">가볍게 즐기는 디지털 놀이입니다.</h2>
            <p>
              이 미니앱은 실제 말랑이·슬랑이·크런치 말랑이·왁뿌볼의
              촉감을 완전히 재현하는 제품이 아닙니다. 화면의 움직임,
              소리와 지원 기기의 짧은 진동으로 촉감 놀이를 디지털 방식으로 표현합니다.
            </p>
            <p>
              소리가 불편하거나 감각에 민감하다면 음소거 상태로 이용하세요.
              스트레스 치료, 심리 진단 또는 의료 목적의 도구가 아닙니다.
            </p>
          </section>

          <section className="sensory-faq" aria-labelledby="sensory-faq-title">
            <p className="eyebrow">FAQ</p>
            <h2 id="sensory-faq-title">자주 묻는 질문</h2>
            <div>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <nav className="sensory-related" aria-label="관련 페이지">
            <div>
              <p className="eyebrow">KEEP EXPLORING</p>
              <h2>MAKEON의 다른 페이지도 둘러보세요.</h2>
            </div>
            <div>
              <Link className="button button-secondary" href="/tools">무료 도구 전체 보기</Link>
              <Link className="button button-secondary" href="/tools/ai-prompt-generator">AI 프롬프트 생성기</Link>
              <Link className="button button-secondary" href="/privacy">개인정보처리방침</Link>
              <Link className="button button-primary" href="/about">MAKEON 소개</Link>
            </div>
          </nav>
        </div>
      </section>
    </main>
  );
}
