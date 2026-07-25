import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "소개",
  description: "AI와 함께 아이디어를 실제 웹사이트와 앱으로 만드는 MAKEON을 소개합니다.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    number: "01",
    title: "쉽게 설명합니다",
    description: "전문 용어보다 처음 만드는 사람도 바로 이해할 수 있는 말로 기록합니다.",
  },
  {
    number: "02",
    title: "제작 과정을 확인합니다",
    description: "이론만 나열하지 않고 작은 아이디어를 결과물로 만드는 과정을 단계별로 확인합니다.",
  },
  {
    number: "03",
    title: "유용함을 나눕니다",
    description: "과정에서 만든 도구를 누구나 부담 없이 쓸 수 있도록 무료로 공유합니다.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="ABOUT MAKEON"
        title="만들고, 배우고, 나눕니다."
        description="MAKEON은 AI 시대에 아이디어를 가진 누구나 만드는 사람이 될 수 있도록 제작 과정에서 확인한 내용과 유용한 도구를 공유하는 공간입니다."
      />

      <section className="about-story-section">
        <div className="site-container about-story-grid">
          <div className="story-sticky">
            <p className="eyebrow">OUR STORY</p>
            <h2>코딩을 몰라도<br />시작할 수 있을까?</h2>
          </div>
          <div className="story-copy">
            <p className="story-lead">
              MAKEON은 이 단순한 질문에서 시작했습니다. AI와 대화하며 아이디어를 정리하고,
              코드를 만들고, 프로젝트를 공개하는 과정에서 중요한 것은 모든 기술을 아는 일이
              아니었습니다.
            </p>
            <p>
              해결하고 싶은 문제를 작게 정의하고, 결과를 직접 확인하며, 한 단계씩 개선하는
              태도가 더 중요했습니다. MAKEON은 그 과정을 초보자의 눈높이로 정리합니다.
              어떤 요청이 도움이 되는지, 어디에서 오류가 생길 수 있는지, 무엇을 확인해야
              하는지 구체적으로 설명합니다.
            </p>
            <p>
              이곳의 글과 도구가 거창한 서비스를 만드는 지름길은 아닐 수 있습니다. 대신
              머릿속에만 있던 생각을 작은 결과물로 꺼내는 첫 계기가 되기를 바랍니다.
            </p>
            <Link className="button button-primary" href="/blog">
              제작 기록 읽기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT WE VALUE</p>
              <h2>MAKEON이 지키는 세 가지</h2>
            </div>
          </div>
          <div className="values-grid">
            {values.map((value) => (
              <article className="value-card" key={value.number}>
                <span>{value.number}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCta />
    </main>
  );
}
