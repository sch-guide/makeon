import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의",
  description: "MAKEON의 콘텐츠, 무료 도구, 협업과 관련된 문의 방법을 안내합니다.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="CONTACT"
        title="궁금한 점을 들려주세요."
        description="콘텐츠에 대한 질문, 도구 아이디어, 오류 제보와 협업 제안을 이메일로 보내주세요. 확인 후 차분히 답변드리겠습니다."
      />

      <section className="contact-section">
        <div className="site-container contact-grid">
          <div className="contact-main-card">
            <span className="contact-icon" aria-hidden="true">@</span>
            <p className="eyebrow">EMAIL</p>
            <h2>{siteConfig.email}</h2>
            <p>
              문의 내용을 구체적으로 적어 주시면 더 정확하게 답변할 수 있습니다. 도구 오류는
              사용한 기기와 브라우저, 문제가 발생한 순서를 함께 알려주세요.
            </p>
            <a className="button button-primary" href={`mailto:${siteConfig.email}`}>
              이메일 보내기 <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="contact-guide">
            <p className="eyebrow">BEFORE YOU SEND</p>
            <h2>이렇게 적어주세요.</h2>
            <ol>
              <li>
                <span>01</span>
                <div><strong>문의 목적</strong><p>질문, 오류 제보, 협업 등 목적을 먼저 알려주세요.</p></div>
              </li>
              <li>
                <span>02</span>
                <div><strong>관련 페이지</strong><p>어떤 글이나 도구에 관한 내용인지 주소를 적어주세요.</p></div>
              </li>
              <li>
                <span>03</span>
                <div><strong>필요한 답변</strong><p>궁금한 점과 원하는 도움을 구체적으로 적어주세요.</p></div>
              </li>
            </ol>
            <p className="contact-note">
              광고성 제안이나 사이트 주제와 관련 없는 요청에는 답변이 어려울 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
