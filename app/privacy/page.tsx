import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "MAKEON 웹사이트의 개인정보 처리 기준을 안내합니다.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const privacySections = [
  {
    title: "1. 수집하는 개인정보",
    paragraphs: [
      "MAKEON은 현재 회원가입, 댓글, 온라인 문의 양식을 운영하지 않으며 방문자로부터 이름, 전화번호 등의 개인정보를 직접 수집하지 않습니다.",
      "AI 프롬프트 생성기에 입력한 내용은 이용자의 브라우저 안에서만 처리됩니다. MAKEON 서버로 전송하거나 별도로 저장하지 않습니다.",
      "이메일로 문의하는 경우 회신을 위해 발신 이메일 주소와 문의 내용이 처리될 수 있습니다. 해당 정보는 문의 대응 목적 외에는 사용하지 않습니다.",
    ],
  },
  {
    title: "2. 자동으로 생성될 수 있는 정보",
    paragraphs: [
      "사이트의 안정적인 운영과 이용 현황 파악을 위해 접속 기록, 브라우저 종류, 기기 정보, 방문한 페이지 등의 정보가 호스팅 또는 분석 서비스에서 자동으로 생성될 수 있습니다.",
      "향후 분석 도구를 사용하는 경우 개인을 직접 식별하기보다 사이트 개선을 위한 통계 정보로 활용합니다.",
    ],
  },
  {
    title: "3. 쿠키와 광고",
    paragraphs: [
      "향후 Google AdSense 등 제3자 광고 서비스를 사용할 수 있습니다. 광고 제공업체는 이용자에게 더 적절한 광고를 제공하거나 광고 성과를 측정하기 위해 쿠키를 사용할 수 있습니다.",
      "광고 서비스가 도입되면 실제 사용 서비스와 쿠키 설정 방법을 본 방침에 추가하고, 필요한 경우 별도의 동의 안내를 제공합니다.",
    ],
  },
  {
    title: "4. 개인정보의 보유와 파기",
    paragraphs: [
      "이메일 문의 정보는 문의 처리와 분쟁 대응에 필요한 기간 동안 보관할 수 있으며, 목적이 달성되고 관련 법령상 보관 의무가 없으면 지체 없이 삭제합니다.",
    ],
  },
  {
    title: "5. 외부 링크",
    paragraphs: [
      "MAKEON의 콘텐츠에는 참고를 위해 외부 웹사이트 링크가 포함될 수 있습니다. 외부 사이트의 개인정보 처리 방식은 MAKEON이 관리하지 않으므로 해당 사이트의 정책을 확인하시기 바랍니다.",
    ],
  },
  {
    title: "6. 이용자의 권리와 문의",
    paragraphs: [
      `개인정보 처리와 관련된 문의, 열람 또는 삭제 요청은 ${siteConfig.email}로 보내주세요. 본인 확인이 필요한 경우 최소한의 정보를 요청할 수 있습니다.`,
    ],
  },
  {
    title: "7. 방침의 변경",
    paragraphs: [
      "서비스 또는 관련 법령이 변경되면 본 방침도 수정될 수 있습니다. 중요한 변경이 있는 경우 사이트를 통해 알리고, 변경된 방침 상단에 시행일을 표시합니다.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="PRIVACY POLICY"
        title="개인정보처리방침"
        description="MAKEON은 방문자의 정보를 소중하게 생각합니다. 현재 사이트 운영 기준과 향후 광고 도입 시 적용할 원칙을 안내합니다."
      />

      <section className="policy-section">
        <div className="policy-layout">
          <aside>
            <p>시행일</p>
            <strong>2026년 7월 21일</strong>
            <span>최종 업데이트: 2026년 7월 21일</span>
          </aside>
          <article className="policy-body">
            <div className="policy-intro">
              <p>
                본 개인정보처리방침은 MAKEON(이하 “사이트”)이 방문자의 정보를 어떤 기준으로
                처리하는지 설명합니다.
              </p>
            </div>
            {privacySections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
