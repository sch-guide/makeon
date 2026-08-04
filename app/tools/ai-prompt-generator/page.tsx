import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PromptGenerator } from "@/components/prompt-generator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI 프롬프트 생성기",
  description:
    "만들고 싶은 것과 필요한 기능을 입력하면 ChatGPT 또는 Codex에 바로 붙여넣을 수 있는 구조화된 개발 프롬프트를 무료로 만들어 드립니다.",
  alternates: { canonical: "/tools/ai-prompt-generator" },
  openGraph: {
    title: "AI 프롬프트 생성기 | MAKEON",
    description:
      "아이디어, 기능, 디자인, 대상 사용자를 입력하고 바로 사용할 수 있는 완성 프롬프트를 만들어 보세요.",
    url: "/tools/ai-prompt-generator",
    images: [{ url: "/og.png", alt: "MAKEON - AI로 아이디어를 현실로" }],
  },
};

const faqs = [
  {
    question: "입력한 내용이 서버에 저장되나요?",
    answer:
      "아니요. 입력과 프롬프트 조합은 현재 브라우저에서만 처리합니다. MAKEON 서버로 전송하거나 계정에 저장하지 않습니다.",
  },
  {
    question: "ChatGPT와 Codex 외의 AI에도 사용할 수 있나요?",
    answer:
      "일반적인 대화형·코딩 AI에도 붙여넣을 수 있습니다. 다만 도구마다 지원하는 파일 수정, 실행과 첨부 기능이 다르므로 작업 원칙을 조정해야 합니다.",
  },
  {
    question: "생성된 프롬프트가 완성된 코드를 보장하나요?",
    answer:
      "보장하지 않습니다. 생성기는 요구사항을 구조화할 뿐입니다. AI가 만든 결과는 직접 실행하고 보안, 접근성, 모바일과 데이터 처리를 검토해야 합니다.",
  },
  {
    question: "어떤 내용을 입력하면 안 되나요?",
    answer:
      "비밀번호, API 키, 주민등록번호, 고객 정보와 비공개 회사 자료처럼 민감한 정보는 입력하거나 외부 AI에 붙여넣지 마세요.",
  },
  {
    question: "복사 버튼이 동작하지 않으면 어떻게 하나요?",
    answer:
      "브라우저의 클립보드 권한이 차단됐을 수 있습니다. 결과 텍스트 영역을 선택해 직접 복사할 수 있습니다.",
  },
];

export default function AiPromptGeneratorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MAKEON AI 프롬프트 생성기",
    url: `${siteConfig.url}/tools/ai-prompt-generator`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    description: "아이디어와 요구사항을 AI 작업 프롬프트로 구조화하는 무료 브라우저 도구",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        eyebrow="FREE AI TOOL"
        title="AI 프롬프트 생성기"
        description="막연한 아이디어를 ChatGPT와 Codex가 이해하기 쉬운 작업 요청으로 바꿔보세요. 가입 없이 무료로 사용할 수 있습니다."
      />

      <section className="prompt-tool-section">
        <div className="site-container">
          <div className="prompt-tool-intro">
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>다섯 가지 항목만 적으면 됩니다.</h2>
            <p>
              만들고 싶은 것, 기능, 디자인, 사용자와 추가 조건을 입력하면 구현 원칙과 완료
              기준까지 포함된 프롬프트를 자동으로 구성합니다.
            </p>
          </div>
          <PromptGenerator />
        </div>
      </section>

      <section className="prompt-tool-section" aria-labelledby="prompt-use-title">
        <div className="site-container article-body">
          <p className="eyebrow">HOW TO USE</p>
          <h2 id="prompt-use-title">결과를 그대로 보내기 전에 세 부분을 확인하세요.</h2>
          <p>
            첫 번째 필수 항목에는 누구를 위한 무엇을 만들지 적습니다. 필요한 기능에는 첫 버전에
            반드시 필요한 기능만 넣고, 추가 요구사항에는 사용할 기술과 제외할 기능, 유지해야 할
            기존 URL과 데이터가 있으면 적습니다.
          </p>
          <ol>
            <li><strong>목표 확인:</strong> 결과의 ‘만들고 싶은 것’이 사용자 문제를 한 문장으로 설명하는지 봅니다.</li>
            <li><strong>범위 확인:</strong> 로그인·결제·데이터베이스처럼 요청하지 않은 큰 기능이 포함되지 않았는지 봅니다.</li>
            <li><strong>완료 기준 수정:</strong> 프로젝트의 실제 검사 명령, 모바일 폭과 보존할 기능을 추가합니다.</li>
          </ol>
        </div>
      </section>

      <section className="prompt-tool-section" aria-labelledby="prompt-example-title">
        <div className="site-container article-body">
          <p className="eyebrow">EXAMPLE</p>
          <h2 id="prompt-example-title">MAKEON에서는 기능 목록보다 유지 조건을 더 중요하게 사용했습니다.</h2>
          <p>
            파스텔 컬러 정렬 게임을 수정할 때 ‘고퀄리티로 만들어 달라’고만 하지 않고 기존 라우트,
            레벨, 점수와 브라우저 저장을 유지하도록 적었습니다. 여기에 모바일 가로 스크롤 금지,
            TypeScript 검사와 프로덕션 빌드를 완료 조건으로 추가했습니다.
          </p>
          <p>
            생성된 문장은 시작점입니다. 현재 프로젝트의 파일과 실제 동작을 확인한 뒤 유지 조건과
            검증 명령을 구체화할수록 결과를 비교하기 쉬워집니다.
          </p>
          <p><Link href="/blog/improve-ai-coding-output-quality">AI 코딩 요청을 구체화한 실제 방법 읽기</Link></p>
        </div>
      </section>

      <section className="prompt-tool-section" aria-labelledby="prompt-limits-title">
        <div className="site-container article-body">
          <p className="eyebrow">LIMITS & PRIVACY</p>
          <h2 id="prompt-limits-title">이 도구는 답을 생성하지 않고 요청문만 구성합니다.</h2>
          <p>
            생성기는 입력한 문장을 정해진 구조로 조합합니다. 사실 확인, 코드 실행, 취약점 검사와
            저작권 검토를 대신하지 않습니다. 결과를 외부 AI에 붙여넣는 순간부터는 해당 서비스의
            개인정보 처리 기준이 적용됩니다.
          </p>
          <p>
            최신 Chrome, Edge와 Safari 계열 브라우저를 기준으로 하며 클립보드 권한이 없으면 자동
            복사 대신 직접 복사해야 합니다. 페이지를 새로고침하면 입력과 생성 결과는 초기화됩니다.
          </p>
        </div>
      </section>

      <section className="prompt-tool-section" aria-labelledby="prompt-faq-title">
        <div className="site-container article-body">
          <p className="eyebrow">FAQ</p>
          <h2 id="prompt-faq-title">자주 묻는 질문</h2>
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section className="prompt-tool-section" aria-labelledby="prompt-update-title">
        <div className="site-container article-body">
          <p className="eyebrow">UPDATE LOG</p>
          <h2 id="prompt-update-title">업데이트 기록</h2>
          <p><strong>2026-08-05</strong> — 결과 해석, 실제 사용 사례, 한계, 개인정보, 지원 환경과 FAQ를 추가했습니다.</p>
          <p><Link href="/blog/free-ai-prompt-generator-guide">프롬프트 생성기 사용 예시</Link> · <Link href="/privacy">개인정보처리방침</Link></p>
        </div>
      </section>
    </main>
  );
}
