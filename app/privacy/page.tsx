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
      "MAKEON은 블로그, 무료 도구, 브라우저 게임과 이메일 문의 기능을 제공합니다. 결제, 댓글 또는 온라인 문의 양식은 운영하지 않으며 게임 랭킹에서 이메일, 전화번호와 실명을 요구하지 않습니다.",
      "AI 프롬프트 생성기에 입력한 내용은 이용자의 브라우저 안에서만 처리됩니다. MAKEON 서버로 전송하거나 별도로 저장하지 않습니다.",
      "디지털 촉감 놀이터는 이용자가 저장 기능을 선택하면 장식의 종류, 위치, 크기와 회전값을 현재 기기의 브라우저 저장소(localStorage)에 보관합니다. 이 정보는 MAKEON 서버로 전송되지 않으며 브라우저 데이터 삭제 또는 도구의 장식 초기화 기능으로 지울 수 있습니다.",
      "이메일로 문의하면 이용자가 사용하는 이메일 서비스와 MAKEON의 이메일 계정을 통해 발신 이메일 주소, 문의 내용과 첨부 정보가 처리될 수 있습니다. 해당 정보는 문의 확인과 회신, 오류 해결을 위해서만 사용합니다.",
    ],
  },
  {
    title: "2. 온라인 게임 랭킹과 Supabase",
    paragraphs: [
      "파스텔 스택 쌓기와 블록 퍼즐의 온라인 랭킹에 참여하면 Supabase 익명 인증으로 생성된 사용자 식별자, 이용자가 입력한 공개 닉네임, 게임 종류, 점수, 높이, 레벨, 삭제한 줄, 플레이 시간, 콤보, 난이도와 기록 달성 시각을 처리할 수 있습니다. 온라인 랭킹이 없는 게임의 기록과 설정은 각 도구 안내에 적힌 범위에서 브라우저에만 저장됩니다.",
      "이 정보는 개인 최고 기록 저장, 오늘 및 전체 랭킹 제공, 명백히 비정상적인 기록과 과도한 제출 방지, 서비스 안정성 확인을 위해 사용합니다. 공개 랭킹에는 닉네임과 필요한 게임 기록만 표시하며 익명 사용자 ID와 인증정보는 표시하지 않습니다.",
      "닉네임은 공개될 수 있으므로 실명, 전화번호, 이메일 주소를 사용하지 마세요. 랭킹 기능은 이메일 회원가입 없이 동작하지만 이용자가 닉네임을 저장하거나 기록을 제출해야 랭킹 데이터가 생성됩니다.",
    ],
  },
  {
    title: "3. Vercel 호스팅과 기술 정보",
    paragraphs: [
      "MAKEON은 Vercel을 통해 사이트를 호스팅합니다. 페이지 제공, 보안 유지와 오류 진단 과정에서 IP 주소, 요청 시각, 요청한 주소, 브라우저·기기 정보, 오류 기록과 같은 기술 정보가 Vercel의 시스템에서 자동으로 처리되거나 일정 기간 보관될 수 있습니다.",
      "MAKEON은 이러한 기술 정보를 방문자의 개인 프로필을 만들거나 광고 목적으로 결합하지 않습니다. 호스팅 사업자의 구체적인 처리 기준과 보관 기간은 Vercel의 정책과 시스템 설정을 따를 수 있습니다.",
    ],
  },
  {
    title: "4. Google Search Console과 분석 도구",
    paragraphs: [
      "MAKEON은 사이트 소유권 확인, Google 검색 노출 상태와 검색 성과 확인을 위해 Google Search Console을 사용합니다. Search Console은 현재 MAKEON 페이지에 방문자 행동을 추적하는 분석 스크립트를 설치하는 방식으로 운영하지 않으며, MAKEON은 이를 이용해 개별 방문자를 식별하지 않습니다.",
      "현재 Google Analytics 또는 별도의 방문자 행동 분석 도구를 사용하지 않습니다. 향후 분석 도구를 도입하면 실제 처리 정보, 이용 목적, 보관 기준과 거부 방법을 본 방침에 반영합니다.",
    ],
  },
  {
    title: "5. 쿠키와 Google AdSense",
    paragraphs: [
      "MAKEON에는 Google AdSense 사이트 확인 및 광고 제공을 위한 코드가 설치되어 있습니다. Google을 포함한 제3자 광고 제공업체는 광고 제공, 부정 사용 방지와 빈도 제한을 위해 이용자의 브라우저에 쿠키를 저장하거나 읽고, 웹 비콘·IP 주소·광고 식별자와 유사한 기술 정보를 처리할 수 있습니다.",
      "Google의 광고 쿠키는 이용자의 MAKEON 또는 다른 웹사이트 방문 기록을 바탕으로 맞춤 광고를 제공하는 데 사용될 수 있습니다. 이용자는 Google 광고 설정(https://adssettings.google.com/)에서 맞춤 광고를 관리하거나 사용 중지할 수 있습니다.",
      "지역과 이용자 설정에 따라 동의 관리 화면이 제공될 수 있으며 맞춤 광고 또는 비맞춤 광고가 적용될 수 있습니다. Google이 파트너 사이트의 정보를 사용하는 방식은 https://policies.google.com/technologies/partner-sites 에서 확인할 수 있습니다. MAKEON은 광고 클릭을 유도하거나 게임 랭킹 정보를 광고 클릭과 결합하지 않습니다.",
    ],
  },
  {
    title: "6. 보유 기간과 파기",
    paragraphs: [
      "AI 프롬프트 생성기 입력 내용은 MAKEON 서버에 저장되지 않습니다. 촉감 놀이터의 장식과 게임별 로컬 기록은 이용자의 브라우저에 남아 있으며 MAKEON이 서버에서 직접 열람하거나 삭제하지 않습니다. 이메일 문의 정보는 문의에 답변하고 관련 오류나 후속 요청을 처리하는 동안 보관하며, 처리가 끝나 더 이상 필요하지 않고 관련 법령상 보관 의무가 없으면 지체 없이 삭제합니다.",
      "닉네임과 최고 기록은 랭킹 기능을 운영하는 동안 보관될 수 있습니다. 삭제를 요청하면 본인 확인에 필요한 최소한의 절차를 거쳐 익명 사용자 프로필과 연결된 기록을 삭제합니다. 부정 제출 방지용 최소 기록과 Vercel·Supabase에서 처리되는 기술 정보는 보안 및 서비스 정책에 따른 기간 동안 보관될 수 있습니다.",
    ],
  },
  {
    title: "7. 외부 서비스와 링크",
    paragraphs: [
      "MAKEON은 사이트 호스팅을 위해 Vercel, 익명 인증과 게임 랭킹 저장을 위해 Supabase, 검색 노출 확인을 위해 Google Search Console, 광고 제공을 위해 Google AdSense를 사용합니다. 외부 서비스의 개인정보 처리에는 각 서비스의 정책이 함께 적용됩니다.",
    ],
  },
  {
    title: "8. 이용자의 권리와 문의",
    paragraphs: [
      `개인정보 처리와 관련된 문의, 열람 또는 삭제 요청은 ${siteConfig.email}로 보내주세요. 본인 확인이 필요한 경우 최소한의 정보를 요청할 수 있습니다.`,
    ],
  },
  {
    title: "9. 방침의 변경",
    paragraphs: [
      "서비스, 사용하는 외부 도구 또는 관련 기준이 변경되면 본 방침도 수정될 수 있습니다. 중요한 변경이 있는 경우 시행 전에 사이트를 통해 알립니다.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="PRIVACY POLICY"
        title="개인정보처리방침"
        description="MAKEON은 방문자의 정보를 소중하게 생각합니다. 무료 도구, 게임 랭킹과 광고를 포함한 현재 사이트 운영 기준을 안내합니다."
      />

      <section className="policy-section">
        <div className="policy-layout">
          <aside>
            <p>시행일</p>
            <strong>2026년 8월 1일</strong>
            <span>최종 업데이트: 2026년 8월 12일</span>
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
