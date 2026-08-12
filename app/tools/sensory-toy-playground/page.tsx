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
      "온라인 계정이나 서버에는 저장하지 않습니다. 다만 ‘내 꾸미기 저장’을 선택하면 장식의 종류, 위치, 크기와 회전값이 현재 브라우저의 localStorage에 저장됩니다. 장식 전체 지우기 또는 브라우저 데이터 삭제로 없앨 수 있습니다.",
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
              로그인 없이 현재 브라우저에서 처리하며, 꾸미기 저장은 이용자가 선택할 때만
              이 기기의 브라우저 저장소를 사용합니다.
            </p>
          </div>

          <SensoryToyPlayground />

          <section className="sensory-guide" aria-labelledby="sensory-mode-guide-title">
            <p className="eyebrow">FOUR PLAY MODES</p>
            <h2 id="sensory-mode-guide-title">네 가지 장난감은 움직임과 소리가 서로 다릅니다.</h2>
            <div>
              <article><span>01</span><h3>말랑이</h3><p>누른 지점이 움푹 들어가고 놓으면 천천히 복원됩니다. 부드러운 폼 압축 계열의 합성 소리를 사용합니다.</p></article>
              <article><span>02</span><h3>슬랑이</h3><p>누르기보다 드래그 방향으로 길게 늘어나는 반응이 중심입니다. 낮고 점성이 있는 젤 마찰음을 표현합니다.</p></article>
              <article><span>03</span><h3>크런치 말랑이</h3><p>말랑한 본체 안의 토핑 입자가 함께 움직입니다. 본체 압축음 위에 선택한 재료의 작은 바스락임을 더합니다.</p></article>
              <article><span>04</span><h3>왁뿌볼</h3><p>같은 부분을 반복해서 누르면 껍질이 갈라지고 조각이 분리됩니다. 드러난 안쪽은 다시 말랑이처럼 반응합니다.</p></article>
            </div>
          </section>

          <section className="sensory-guide" aria-labelledby="sensory-use-guide-title">
            <p className="eyebrow">USE & STORAGE</p>
            <h2 id="sensory-use-guide-title">터치 환경과 저장 범위를 먼저 확인하세요.</h2>
            <div>
              <article><span>01</span><h3>모바일과 PC</h3><p>놀이 영역에서는 한 손가락 드래그와 마우스 포인터를 지원합니다. 페이지 이동은 놀이 영역 바깥에서 스크롤하세요.</p></article>
              <article><span>02</span><h3>소리와 진동</h3><p>소리는 첫 사용자 동작 뒤 재생될 수 있습니다. 진동은 일부 Android 브라우저처럼 Vibration API를 지원하는 환경에서만 작동합니다.</p></article>
              <article><span>03</span><h3>꾸미기 저장</h3><p>저장 버튼을 누른 장식만 현재 브라우저에 남습니다. 서버 동기화가 없어 다른 기기나 다른 브라우저로 옮겨지지 않습니다.</p></article>
              <article><span>04</span><h3>추천 이용자</h3><p>짧게 화면 반응을 즐기거나 나만의 장식을 배치하고 싶은 이용자에게 맞습니다. 실제 촉감이나 치료 효과를 제공하지는 않습니다.</p></article>
            </div>
          </section>

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
              <Link className="button button-secondary" href="/tools/pastel-stack-game">파스텔 스택 쌓기</Link>
              <Link className="button button-secondary" href="/tools/pastel-memory-match">메모리 카드 맞추기</Link>
              <Link className="button button-secondary" href="/privacy">개인정보처리방침</Link>
              <Link className="button button-primary" href="/tools/ai-prompt-generator">AI 프롬프트 생성기</Link>
            </div>
          </nav>
        </div>
      </section>
    </main>
  );
}
