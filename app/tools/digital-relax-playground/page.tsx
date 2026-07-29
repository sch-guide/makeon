import type { Metadata } from "next";
import Link from "next/link";
import { DigitalRelaxPlayground } from "@/components/digital-relax-playground/digital-relax-playground";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "디지털 힐링 놀이터 | 버블랩·모래 자르기·젤리 꾸미기 미니게임",
  description:
    "버블랩 터뜨리기, 액체 자석, 모래 자르기, 젤리 케이크 꾸미기, 얼음 깨기 등 10가지 무료 디지털 미니게임을 즐겨보세요.",
  alternates: { canonical: "/tools/digital-relax-playground" },
  openGraph: {
    title: "디지털 힐링 놀이터 | MAKEON",
    description:
      "누르고, 터뜨리고, 자르고, 섞고, 꾸미며 즐기는 무료 미니게임 놀이터입니다.",
    url: "/tools/digital-relax-playground",
    images: [{ url: "/og.png", alt: "MAKEON 디지털 힐링 놀이터" }],
  },
};

export default function DigitalRelaxPlaygroundPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "디지털 힐링 놀이터",
    url: `${siteConfig.url}/tools/digital-relax-playground`,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web Browser",
    description: "브라우저에서 즐기는 10가지 무료 디지털 미니게임",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero
        eyebrow="FREE RELAXING MINI GAMES"
        title="디지털 힐링 놀이터"
        description="누르고, 터뜨리고, 자르고, 섞고, 꾸미며 즐기는 무료 미니게임"
      />
      <section className="relax-page-section">
        <div className="site-container">
          <DigitalRelaxPlayground />
          <section className="relax-safety">
            <h2>가볍게 즐기는 디지털 놀이입니다.</h2>
            <p>
              이 미니앱은 실제 물체의 촉감과 소리를 완전히 재현하는 제품이 아니라,
              움직임, 소리와 지원 기기의 짧은 진동으로 재미를 표현한 디지털 놀이입니다.
            </p>
            <p>
              치료, 심리 진단 또는 의료 목적의 도구가 아닙니다. 소리가 불편하면
              음소거 상태로 이용하세요. 입력과 결과는 서버로 전송하거나 저장하지 않습니다.
            </p>
          </section>
          <nav className="relax-related" aria-label="관련 페이지">
            <Link className="button button-secondary" href="/tools">무료 도구 전체 보기</Link>
            <Link className="button button-secondary" href="/privacy">개인정보처리방침</Link>
            <Link className="button button-primary" href="/about">MAKEON 소개</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
