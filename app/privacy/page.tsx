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
    title: "1. 현재 운영 기능과 직접 입력하는 정보",
    paragraphs: [
      "MAKEON은 현재 블로그, 무료 AI 프롬프트 생성기와 이메일 문의 기능을 제공합니다. 회원가입, 로그인, 결제, 댓글, 온라인 문의 양식 또는 사용자 데이터베이스는 운영하지 않으며 방문자로부터 이름과 전화번호 등을 직접 입력받지 않습니다.",
      "AI 프롬프트 생성기에 입력한 내용은 이용자의 브라우저 안에서만 처리됩니다. MAKEON 서버로 전송하거나 별도로 저장하지 않습니다.",
      "이메일로 문의하면 이용자가 사용하는 이메일 서비스와 MAKEON의 이메일 계정을 통해 발신 이메일 주소, 문의 내용과 첨부 정보가 처리될 수 있습니다. 해당 정보는 문의 확인과 회신, 오류 해결을 위해서만 사용합니다.",
    ],
  },
  {
    title: "2. Vercel 호스팅과 기술 정보",
    paragraphs: [
      "MAKEON은 Vercel을 통해 사이트를 호스팅합니다. 페이지 제공, 보안 유지와 오류 진단 과정에서 IP 주소, 요청 시각, 요청한 주소, 브라우저·기기 정보, 오류 기록과 같은 기술 정보가 Vercel의 시스템에서 자동으로 처리되거나 일정 기간 보관될 수 있습니다.",
      "MAKEON은 이러한 기술 정보를 방문자의 개인 프로필을 만들거나 광고 목적으로 결합하지 않습니다. 호스팅 사업자의 구체적인 처리 기준과 보관 기간은 Vercel의 정책과 시스템 설정을 따를 수 있습니다.",
    ],
  },
  {
    title: "3. Google Search Console과 분석 도구",
    paragraphs: [
      "MAKEON은 사이트 소유권 확인, Google 검색 노출 상태와 검색 성과 확인을 위해 Google Search Console을 사용합니다. Search Console은 현재 MAKEON 페이지에 방문자 행동을 추적하는 분석 스크립트를 설치하는 방식으로 운영하지 않으며, MAKEON은 이를 이용해 개별 방문자를 식별하지 않습니다.",
      "현재 Google Analytics 또는 별도의 방문자 행동 분석 도구를 사용하지 않습니다. 향후 분석 도구를 도입하면 실제 처리 정보, 이용 목적, 보관 기준과 거부 방법을 본 방침에 반영합니다.",
    ],
  },
  {
    title: "4. 현재 쿠키와 광고 사용 상태",
    paragraphs: [
      "현재 MAKEON에는 Google AdSense 광고 코드가 설치되어 있지 않으며 맞춤 광고, 광고 식별자 또는 광고 목적의 쿠키를 사용하지 않습니다. MAKEON은 분석이나 광고를 목적으로 별도의 쿠키를 직접 설정하지 않습니다.",
      "향후 Google AdSense 또는 제3자 광고 서비스를 도입하면 Google과 광고 제공업체가 쿠키, 광고 식별자, IP 주소와 유사한 기술 정보를 이용할 수 있습니다. 이 경우 맞춤 광고와 비맞춤 광고, 제3자 제공, 설정 또는 선택 해제 방법, 필요한 동의 절차를 실제 운영 내용에 맞게 별도로 안내하고 본 방침을 먼저 수정합니다.",
    ],
  },
  {
    title: "5. 보유 기간과 파기",
    paragraphs: [
      "AI 프롬프트 생성기 입력 내용은 MAKEON 서버에 저장되지 않습니다. 이메일 문의 정보는 문의에 답변하고 관련 오류나 후속 요청을 처리하는 동안 보관하며, 처리가 끝나 더 이상 필요하지 않고 관련 법령상 보관 의무가 없으면 지체 없이 삭제합니다.",
      "Vercel에서 처리되는 기술 정보의 보유와 삭제는 Vercel의 정책과 서비스 설정이 적용될 수 있습니다.",
    ],
  },
  {
    title: "6. 외부 서비스와 링크",
    paragraphs: [
      "MAKEON은 현재 사이트 호스팅을 위해 Vercel, 검색 노출 확인을 위해 Google Search Console을 사용합니다. 블로그에는 참고를 위한 외부 공식 문서 링크가 포함될 수 있으며, 외부 서비스의 개인정보 처리에는 해당 서비스의 정책이 적용됩니다.",
    ],
  },
  {
    title: "7. 이용자의 권리와 문의",
    paragraphs: [
      `개인정보 처리와 관련된 문의, 열람 또는 삭제 요청은 ${siteConfig.email}로 보내주세요. 본인 확인이 필요한 경우 최소한의 정보를 요청할 수 있습니다.`,
    ],
  },
  {
    title: "8. 방침의 변경",
    paragraphs: [
      "서비스, 사용하는 외부 도구 또는 관련 기준이 변경되면 본 방침도 수정될 수 있습니다. 특히 분석 도구나 AdSense 광고를 도입하기 전에는 실제 처리 내용에 맞게 방침을 갱신하고, 중요한 변경이 있는 경우 사이트를 통해 알립니다.",
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
            <strong>2026년 7월 25일</strong>
            <span>최종 업데이트: 2026년 7월 25일</span>
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
