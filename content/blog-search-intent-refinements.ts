import type { BlogFaq, BlogPost, BlogSection } from "@/types/content";

type BlogSearchIntentRefinement = {
  title?: string;
  seoTitle?: string;
  summary?: string;
  description?: string;
  primaryKeyword?: string;
  relatedKeywords?: string[];
  category?: string;
  readingTime?: string;
  sections?: BlogSection[];
  sectionReplacements?: Record<number, BlogSection>;
  removeSectionIndexes?: number[];
  appendSections?: BlogSection[];
  removeContextualHrefs?: string[];
  faqs?: BlogFaq[];
  relatedSlugs?: string[];
  toolCta?: BlogPost["toolCta"];
};

const refinements: Record<string, BlogSearchIntentRefinement> = {
  "better-prompts-for-ai-coding": {
    title: "AI 코딩 프롬프트 작성법: 구현 전 작업 명세 8가지",
    seoTitle: "AI 코딩 프롬프트 작성법: 구현 전 작업 명세 8가지",
    summary:
      "AI가 코드를 수정하기 전에 목표, 현재 상태, 변경 범위, 유지 조건과 검증 명령을 한 장의 작업 명세로 정리하는 방법을 설명합니다.",
    description:
      "AI 코딩 프롬프트를 구현 전 작업 명세로 작성하는 방법을 사용자 결과, 대상 파일, 변경 범위, 금지 조건, 완료 기준과 검증 명령 중심으로 안내합니다.",
    primaryKeyword: "AI 코딩 프롬프트 작성법",
    relatedKeywords: ["AI 코딩 작업 명세", "Codex 프롬프트 작성법", "AI 코드 수정 요청", "코딩 프롬프트 템플릿"],
    readingTime: "12분",
    sections: [
      {
        heading: "결론: 코드를 만들기 전에 완료 상태부터 문장으로 고정하세요",
        paragraphs: [
          "이 글은 새 웹사이트의 페이지와 디자인을 기획하는 제작 브리프가 아니라, 이미 정해진 코딩 작업을 AI에게 전달하기 위한 구현 전 작업 명세를 다룹니다. 화면이나 기능을 만든 뒤 품질을 다시 높이는 방법도 별도의 사후 개선 글에서 다룹니다.",
          "좋은 AI 코딩 프롬프트에는 사용자가 보게 될 결과, 현재 프로젝트 상태, 수정 범위, 유지할 동작, 제외할 작업, 완료 기준과 검증 명령이 들어갑니다. 이 항목이 있으면 AI가 임의로 범위를 넓히는 일을 줄이고 결과를 같은 기준으로 확인할 수 있습니다.",
        ],
        callout: {
          type: "note",
          title: "이 글의 범위",
          text: "구현을 시작하기 전 코딩 작업 명세만 다룹니다. 사이트 구조 기획은 웹사이트 제작 브리프 글, 구현 후 재수정은 AI 코딩 결과 개선 글로 이어집니다.",
        },
      },
      {
        heading: "1. 사용자가 보게 될 한 가지 결과를 먼저 적습니다",
        paragraphs: [
          "‘버튼을 개선해 줘’ 대신 ‘모바일에서 제출 버튼이 한 줄로 보이고, 누르면 입력값 검증 후 결과 영역으로 이동한다’처럼 사용자가 확인할 결과를 적습니다. 기술 이름보다 화면과 동작으로 완료 상태를 설명하면 구현 선택지가 달라도 같은 결과를 검증할 수 있습니다.",
          "한 요청에는 한 가지 사용자 결과만 넣는 편이 안전합니다. 화면 개편, 로그인, 결제와 배포를 한 번에 묶으면 변경 파일과 실패 원인을 구분하기 어렵습니다.",
        ],
      },
      {
        heading: "2. 현재 상태와 변경 범위, 제외 범위를 함께 고정합니다",
        paragraphs: [
          "AI가 저장소를 읽게 한 뒤 관련 파일과 현재 동작을 요약하도록 요청합니다. 그다음 수정할 페이지와 컴포넌트, 유지할 URL과 데이터 형식, 건드리지 않을 설정을 구분해 적습니다.",
        ],
        bullets: ["현재 문제와 재현 조건", "수정할 화면·기능·파일 범위", "유지할 URL·상태·스타일·데이터", "이번 작업에서 제외할 항목"],
        contextualLinks: [
          { prefix: "저장소를 읽고 안전하게 수정하는 기본 흐름은", label: "Codex VS Code 사용법", href: "/blog/codex-vscode-guide", suffix: "에서 먼저 확인할 수 있습니다." },
        ],
      },
      {
        heading: "3. 완료 기준과 검증 명령을 작업 명세에 넣습니다",
        paragraphs: [
          "완료 기준은 ‘예쁘게’나 ‘오류 없이’가 아니라 직접 확인할 수 있어야 합니다. 예를 들어 390px 화면에서 가로 스크롤이 없고, 빈 입력은 오류 문구를 보여 주며, 기존 URL과 저장 데이터가 유지된다고 적습니다.",
          "프로젝트에 맞는 typecheck, 테스트와 production build 명령도 명세에 포함합니다. AI가 완료했다고 말하는 것과 실제 검사를 통과하는 것은 서로 다른 단계입니다.",
        ],
        codeBlock: { label: "검증 항목 예시", code: "npm run typecheck\nnpm run build\ngit diff --stat\ngit status -sb" },
      },
      {
        heading: "4. 구현 전 작업 명세 8가지를 한 번에 점검합니다",
        paragraphs: ["아래 여덟 항목을 채우면 길기만 한 프롬프트보다 범위가 분명한 작업 요청이 됩니다."],
        bullets: ["사용자가 확인할 최종 결과", "현재 문제와 재현 방법", "관련 페이지와 파일", "수정할 기능과 화면", "반드시 유지할 동작", "이번 작업에서 제외할 범위", "완료를 판단할 조건", "실행할 검사와 보고할 결과"],
      },
      {
        heading: "5. 바로 복사하는 AI 코딩 작업 명세 템플릿",
        paragraphs: ["괄호 안을 채우고, AI가 수정하기 전에 관련 파일과 예상 변경 범위를 먼저 설명하게 하세요."],
        codeBlock: {
          label: "구현 전 작업 명세",
          code: "목표: [사용자가 확인할 한 가지 결과]\n현재 상태: [문제와 재현 방법]\n대상 범위: [페이지·컴포넌트·파일]\n필수 변경: [동작과 화면]\n유지 조건: [URL·기능·데이터·스타일]\n제외 범위: [이번에 하지 않을 작업]\n완료 기준: [화면·상태·오류 조건]\n검증: [typecheck·test·build·diff]\n\n수정 전에 관련 파일과 작업 계획을 설명하고, 수정 후 변경 파일과 검사 결과를 보고해 줘.",
        },
      },
      {
        heading: "6. 구현이 끝난 뒤에는 새 프롬프트가 아니라 결과 검수로 넘어갑니다",
        paragraphs: [
          "첫 작업 명세를 계속 길게 덧붙이기보다 실제 결과와 기대 결과의 차이를 기록하세요. 화면, 상호작용, 데이터와 배포 중 어느 층의 문제인지 나눈 뒤 한 문제씩 재수정하면 기존 기능을 지키기 쉽습니다.",
        ],
        contextualLinks: [
          { prefix: "이미 만들어진 결과가 기대와 다르다면", label: "AI 코딩 결과를 검수하고 다시 요청하는 방법", href: "/blog/improve-ai-coding-output-quality", suffix: "으로 이어가세요." },
          { prefix: "Codex 작업 자체가 멈추거나 실패했다면", label: "Codex 오류 해결 7단계", href: "/blog/codex-error-troubleshooting-guide", suffix: "에서 원인을 분리할 수 있습니다." },
        ],
      },
    ],
    faqs: [
      { question: "AI 코딩 프롬프트는 길수록 좋은가요?", answer: "아닙니다. 목표, 범위, 유지 조건과 완료 기준이 중복 없이 들어 있는지가 더 중요합니다. 한 요청에 결과 하나만 남기면 짧아도 검증하기 쉽습니다." },
      { question: "관련 파일을 모르면 어떻게 작업 범위를 적나요?", answer: "수정 전에 AI가 저장소를 읽고 관련 파일과 현재 동작을 설명하게 하세요. 그 설명을 확인한 뒤 작업 범위를 확정하면 됩니다." },
      { question: "새 웹사이트 전체 요구사항도 이 템플릿으로 작성하나요?", answer: "페이지 구조, 대상 사용자와 디자인 방향을 정하지 않았다면 먼저 웹사이트 제작 브리프를 작성하는 편이 좋습니다. 이 글의 템플릿은 구현할 작업이 정해진 뒤 사용합니다." },
      { question: "AI가 작업을 마쳤다고 하면 검사를 생략해도 되나요?", answer: "아닙니다. 변경 파일, typecheck, 테스트, production build와 실제 화면을 별도로 확인해야 합니다." },
    ],
    relatedSlugs: ["chatgpt-codex-webapp-review", "codex-vscode-guide", "improve-ai-coding-output-quality", "codex-error-troubleshooting-guide"],
    toolCta: { title: "코딩 작업 명세의 초안을 만들어 보세요", description: "목표와 기능, 대상 사용자와 추가 조건을 입력한 뒤 범위·유지 조건·검증 항목을 보완할 수 있습니다.", href: "/tools/ai-prompt-generator", label: "AI 프롬프트 생성기 열기" },
  },

  "website-building-prompt-guide": {
    title: "웹사이트 제작 브리프 작성법: 페이지·사용자·디자인·콘텐츠 구조 정하기",
    seoTitle: "웹사이트 제작 프롬프트: 제작 브리프 작성법",
    summary: "AI에게 코드를 요청하기 전에 사이트 목적, 대상 사용자, 페이지, 콘텐츠 책임과 디자인 원칙을 한 장의 제작 브리프로 정리하는 방법입니다.",
    description: "웹사이트 제작 프롬프트의 기초가 되는 제작 브리프를 목적, 사용자 여정, 페이지 구조, 콘텐츠, 디자인, 반응형과 운영 기준으로 작성하는 방법을 설명합니다.",
    primaryKeyword: "웹사이트 제작 프롬프트",
    relatedKeywords: ["웹사이트 제작 브리프", "AI 홈페이지 기획", "웹사이트 페이지 구성", "홈페이지 요구사항 정리"],
    readingTime: "13분",
    sections: [
      {
        heading: "결론: 코드를 요청하기 전에 사이트의 정보 구조부터 결정하세요",
        paragraphs: [
          "웹사이트 제작 브리프는 코딩 명령서가 아닙니다. 누구에게 어떤 정보를 어떤 순서로 보여 줄지, 각 페이지가 맡을 역할과 방문자의 다음 행동이 무엇인지 결정하는 기획 문서입니다.",
          "이 글에서는 새 콘텐츠형 웹사이트를 기준으로 목적, 사용자, 페이지, 콘텐츠, 디자인과 운영 원칙을 정합니다. 파일 수정 범위와 검증 명령은 브리프가 끝난 뒤 AI 코딩 작업 명세에서 작성합니다.",
        ],
      },
      {
        heading: "1. 제작 브리프에 들어갈 여섯 영역을 먼저 채웁니다",
        paragraphs: ["아래 여섯 영역은 화면 수를 늘리기 전에 사이트가 존재할 이유와 정보의 책임을 정하는 기준입니다."],
        bullets: ["사이트가 해결할 한 가지 문제", "대상 사용자와 방문 상황", "핵심 페이지와 각 페이지의 역할", "필요한 콘텐츠와 관리 주체", "디자인·반응형·접근성 원칙", "공개 후 갱신할 항목과 운영 주기"],
      },
      {
        heading: "2. 대상 사용자의 첫 질문과 다음 행동을 연결합니다",
        paragraphs: [
          "‘누구나 쓰는 사이트’ 대신 검색으로 처음 온 초보자가 무엇을 궁금해하고 어느 페이지에서 답을 얻는지 적습니다. 홈은 사이트의 역할을 설명하고, 글은 질문을 해결하며, 도구는 직접 체험하게 하는 식으로 페이지 책임을 나눕니다.",
        ],
      },
      {
        heading: "3. 페이지 목록보다 콘텐츠 구조와 탐색 경로를 먼저 그립니다",
        paragraphs: [
          "필요한 페이지마다 제목, 핵심 질문, 반드시 들어갈 정보, 다음 이동 링크를 적습니다. 같은 질문을 여러 페이지가 답하지 않게 하면 검색 의도와 내부 링크도 자연스럽게 분리됩니다.",
        ],
        table: {
          caption: "콘텐츠형 사이트의 페이지 책임 예시",
          headers: ["페이지", "주요 역할", "다음 행동"],
          rows: [["홈", "브랜드와 이용 경로 안내", "블로그 또는 도구 선택"], ["블로그 글", "검색 질문 하나 해결", "세부 방법 또는 관련 도구"], ["도구 상세", "사용 맥락과 직접 체험", "관련 문제 해결 글"], ["About·정책", "운영 주체와 신뢰 정보", "문의 또는 서비스 이용"]],
        },
      },
      {
        heading: "4. 디자인은 분위기보다 반복 가능한 규칙으로 적습니다",
        paragraphs: [
          "색상 이름만 전달하지 말고 본문 너비, 제목 단계, 카드 밀도, 버튼 우선순위와 모바일 동작을 적습니다. 참고 사이트는 복제 대상이 아니라 여백과 정보 계층을 설명하는 자료로 사용합니다.",
        ],
        bullets: ["데스크톱과 모바일의 콘텐츠 우선순위", "제목·본문·보조 문구의 단계", "기본 버튼과 보조 버튼의 역할", "이미지 비율과 대체 텍스트 원칙", "키보드와 터치 사용 기준"],
      },
      {
        heading: "5. 바로 복사하는 웹사이트 제작 브리프",
        paragraphs: ["구현 기술을 정하기 전에 아래 빈칸으로 사이트의 페이지와 콘텐츠 책임을 먼저 확정하세요."],
        codeBlock: {
          label: "웹사이트 제작 브리프",
          code: "사이트 목적: [해결할 문제]\n대상 사용자: [방문 상황과 숙련도]\n핵심 질문: [사용자가 가장 먼저 묻는 것]\n페이지 구조: [홈·목록·상세·About 등]\n페이지별 콘텐츠: [반드시 답할 정보]\n주요 이동 경로: [입문→세부→체험]\n디자인 원칙: [정보 계층·색상·여백]\n모바일 기준: [우선 콘텐츠와 버튼 동작]\n운영 기준: [업데이트 주기와 담당 정보]\n이번 버전 제외 범위: [로그인·결제 등]",
        },
      },
      {
        heading: "6. 브리프가 끝나면 구현 작업과 배포를 별도 단계로 넘깁니다",
        paragraphs: [
          "브리프를 확정한 뒤 한 페이지나 기능씩 코딩 작업 명세로 바꾸세요. 구현과 검증, 첫 배포를 분리하면 사이트 기획을 고치는 일과 코드 오류를 해결하는 일이 섞이지 않습니다.",
        ],
        contextualLinks: [
          { prefix: "콘텐츠형 사이트의 전체 제작 흐름은", label: "AI로 무료 홈페이지 만들기", href: "/blog/build-a-website-with-ai-without-coding", suffix: "에서 확인하세요." },
          { prefix: "브리프를 실제 코드 작업으로 옮길 때는", label: "AI 코딩 작업 명세 작성법", href: "/blog/better-prompts-for-ai-coding", suffix: "을 사용하세요." },
          { prefix: "저장소 수정 단계는", label: "Codex VS Code 사용법", href: "/blog/codex-vscode-guide", suffix: "으로 이어집니다." },
        ],
      },
    ],
    faqs: [
      { question: "웹사이트 제작 브리프와 AI 코딩 프롬프트는 무엇이 다른가요?", answer: "브리프는 사용자, 페이지와 콘텐츠 구조를 결정하고, 코딩 프롬프트는 정해진 결과를 구현하기 위한 파일 범위와 검증 조건을 전달합니다." },
      { question: "페이지는 많을수록 사이트가 완성도 있어 보이나요?", answer: "아닙니다. 각 페이지가 다른 질문이나 행동을 책임질 때만 추가해야 합니다. 역할이 같은 페이지는 콘텐츠 중복과 관리 부담을 만듭니다." },
      { question: "디자인 참고 사이트 링크만 전달해도 되나요?", answer: "링크와 함께 참고할 요소를 여백, 색상, 카드 구조처럼 구체적으로 적어야 합니다. 그대로 복제하라는 요청은 피해야 합니다." },
      { question: "로그인과 결제도 첫 브리프에 넣어야 하나요?", answer: "서비스의 핵심이 아니라면 첫 버전의 제외 범위로 두는 편이 안전합니다. 콘텐츠와 기본 탐색을 먼저 검증한 뒤 별도 기능 명세로 추가하세요." },
    ],
    relatedSlugs: ["build-a-website-with-ai-without-coding", "better-prompts-for-ai-coding", "codex-vscode-guide", "nextjs-vercel-deployment-guide"],
    toolCta: { title: "제작 브리프를 요청문 초안으로 바꿔 보세요", description: "사이트 목적과 대상 사용자, 페이지와 디자인 요구를 입력한 뒤 콘텐츠 구조와 제외 범위를 보완하세요.", href: "/tools/ai-prompt-generator", label: "웹사이트 요청문 만들기" },
  },

  "improve-ai-coding-output-quality": {
    title: "AI 코딩 결과 개선 방법: 완성된 기능을 검수하고 다시 요청하는 순서",
    seoTitle: "AI 코딩 결과 개선: 검수하고 다시 요청하는 방법",
    summary: "이미 생성된 화면이나 기능에서 실제 문제를 재현하고, 기대 결과와 유지 조건을 기록해 한 번에 한 문제씩 재수정하는 사후 개선 방법입니다.",
    description: "AI 코딩 결과를 화면, 상호작용, 데이터와 배포로 나눠 검수하고 재현 증거, 기대 결과, 유지 조건과 검증 방법을 포함해 다시 요청하는 순서를 안내합니다.",
    primaryKeyword: "AI 코딩 결과 개선",
    relatedKeywords: ["AI 코드 검수", "AI 코딩 재수정", "Codex 결과 개선", "AI 웹사이트 품질 개선"],
    readingTime: "12분",
    sections: [
      {
        heading: "결론: 처음 요청을 다시 쓰지 말고 실제 결과와 기대 결과의 차이를 기록하세요",
        paragraphs: [
          "이 글은 구현을 시작하기 전 프롬프트 작성법이 아닙니다. AI가 이미 만든 화면이나 기능을 직접 실행한 뒤 무엇이 부족한지 재현하고, 기존 동작을 지키면서 다시 수정하는 사후 개선 단계만 다룹니다.",
          "‘더 고퀄리티로’라고 요청하면 판단 기준이 다시 AI에게 넘어갑니다. 발생 위치, 재현 순서, 현재 결과, 기대 결과, 유지 조건과 검증 방법을 적으면 한 번의 수정 범위를 작게 유지할 수 있습니다.",
        ],
      },
      {
        heading: "1. 화면 인상보다 재현 가능한 문제를 먼저 수집합니다",
        paragraphs: [
          "문제가 발생한 URL과 화면 크기, 입력값, 클릭 순서와 실제 결과를 기록합니다. 디자인 문제도 ‘간격이 이상하다’보다 ‘390px에서 버튼 문구가 세 줄로 내려가 카드 높이가 달라진다’처럼 관찰 가능한 문장으로 바꿉니다.",
        ],
        bullets: ["문제가 보이는 URL과 기기 크기", "입력과 클릭 순서", "현재 화면 또는 오류 문구", "기대하는 사용자 결과"],
      },
      {
        heading: "2. 수정 전에 정상 동작과 보호할 범위를 기준선으로 남깁니다",
        paragraphs: [
          "현재 정상인 기능, URL, 저장 데이터와 모바일 동작을 먼저 적습니다. 변경 전 typecheck와 build 결과, Git 상태를 기록하면 새 수정 때문에 생긴 회귀를 구분할 수 있습니다.",
        ],
        contextualLinks: [
          { prefix: "기존 저장소를 안전하게 확인하는 순서는", label: "Codex VS Code 사용법", href: "/blog/codex-vscode-guide", suffix: "에서 볼 수 있습니다." },
        ],
      },
      {
        heading: "3. 결과를 화면·상호작용·데이터·배포 네 층으로 나눠 검수합니다",
        paragraphs: [
          "화면은 정보 계층과 반응형, 상호작용은 입력·로딩·성공·실패 상태, 데이터는 저장·복원·권한, 배포는 build와 공개 URL을 확인합니다. 여러 층의 문제를 한 요청에 섞지 않으면 수정 결과를 비교하기 쉽습니다.",
        ],
        table: {
          caption: "사후 검수 네 층",
          headers: ["검수 층", "확인할 질문"],
          rows: [["화면", "모바일에서도 정보 순서와 버튼이 명확한가?"], ["상호작용", "빈 입력·로딩·성공·실패 상태가 있는가?"], ["데이터", "새로고침과 사용자 경계에서 값이 안전한가?"], ["배포", "production build와 공개 HTML이 같은 결과를 보이는가?"]],
        },
      },
      {
        heading: "4. 영향이 큰 문제 하나만 골라 재수정 요청을 작성합니다",
        paragraphs: [
          "사용을 막는 오류, 데이터 손실, 모바일 주요 동작, 시각적 세부 조정 순서로 우선순위를 정합니다. 한 문제를 고치고 회귀 검사를 통과한 뒤 다음 문제로 넘어가세요.",
        ],
        codeBlock: {
          label: "사후 개선 요청 템플릿",
          code: "문제 위치: [URL·화면 크기]\n재현 순서: [입력·클릭]\n현재 결과: [실제 화면·오류]\n기대 결과: [사용자에게 보여야 할 상태]\n유지 조건: [정상 기능·URL·데이터]\n수정 범위: [한 가지 문제]\n검증: [재현 확인·typecheck·build·diff]",
        },
      },
      {
        heading: "5. 변경 diff와 같은 재현 절차로 개선 여부를 비교합니다",
        paragraphs: [
          "수정 파일이 요청 범위를 벗어나지 않았는지 확인하고, 문제를 발견했을 때와 같은 입력·화면 크기로 다시 실행합니다. 정상 경로뿐 아니라 빈 입력, 연속 클릭과 새로고침도 확인해야 임시 수정인지 판단할 수 있습니다.",
        ],
      },
      {
        heading: "6. 작업 실패와 배포 실패는 사후 품질 문제에서 분리합니다",
        paragraphs: [
          "코드 수정 도중 Codex가 멈춘 문제와 완성된 기능의 품질 문제는 해결 순서가 다릅니다. 로컬 결과가 정상인데 공개 사이트만 다르면 배포 글로 이동해 커밋과 Build Logs를 확인합니다.",
        ],
        contextualLinks: [
          { prefix: "Codex가 멈추거나 검사가 실행되지 않는다면", label: "Codex 오류 해결 순서", href: "/blog/codex-error-troubleshooting-guide", suffix: "를 확인하세요." },
          { prefix: "공개 사이트 반영에서 실패했다면", label: "Vercel 배포 오류 진단", href: "/blog/vercel-deployment-error-guide", suffix: "으로 이어가세요." },
        ],
      },
    ],
    faqs: [
      { question: "결과가 마음에 들지 않으면 처음 프롬프트부터 다시 써야 하나요?", answer: "대부분은 아닙니다. 현재 결과에서 재현 가능한 차이를 찾고 영향이 큰 문제 하나씩 수정하는 편이 기존 정상 기능을 보존하기 쉽습니다." },
      { question: "디자인 품질도 객관적으로 검수할 수 있나요?", answer: "화면 폭, 줄 수, 간격, 대비, 버튼 우선순위와 콘텐츠 순서처럼 관찰할 수 있는 기준으로 바꾸면 비교할 수 있습니다." },
      { question: "여러 문제를 한 번에 수정하면 더 빠르지 않나요?", answer: "변경이 서로 독립적일 때만 가능합니다. 원인이나 파일이 겹치면 한 문제씩 수정해야 실패 지점과 회귀를 찾기 쉽습니다." },
      { question: "로컬에서 정상인데 공개 사이트가 다르면 품질 문제인가요?", answer: "먼저 배포된 커밋, production 브랜치와 공개 도메인을 확인해야 합니다. 이는 구현 품질보다 배포 진단에 가까운 문제입니다." },
    ],
    relatedSlugs: ["better-prompts-for-ai-coding", "codex-vscode-guide", "codex-error-troubleshooting-guide", "vercel-deployment-error-guide"],
    toolCta: { title: "재수정 요청의 핵심 조건을 정리하세요", description: "현재 문제와 기대 결과를 입력한 뒤 유지 조건, 한 가지 수정 범위와 검증 절차를 추가하세요.", href: "/tools/ai-prompt-generator", label: "재수정 요청 초안 만들기" },
  },

  "build-a-website-with-ai-without-coding": {
    summary: "MAKEON처럼 글과 무료 도구가 함께 있는 콘텐츠형 사이트를 대상으로, 독자와 페이지 역할을 정하고 AI로 구현해 공개·검색 등록까지 이어가는 전체 흐름입니다.",
    description: "AI로 콘텐츠형 홈페이지를 만들 때 독자 질문, 페이지와 콘텐츠 구조, 제작 브리프, Next.js 구현, 모바일 검수, GitHub·Vercel 배포와 검색 등록을 순서대로 설명합니다.",
    sectionReplacements: {
      0: {
        heading: "결론: 콘텐츠형 홈페이지는 페이지 수보다 각 페이지의 답을 먼저 정해야 합니다",
        paragraphs: [
          "이 글은 입력에 따라 결과가 바뀌는 미니앱 제작법이 아니라, 검색으로 찾아온 독자가 글을 읽고 무료 도구를 체험하는 콘텐츠형 홈페이지의 전체 제작 흐름을 다룹니다.",
          "MAKEON은 홈, 블로그, 도구 상세과 신뢰 페이지가 서로 다른 역할을 맡도록 정한 뒤 구현했습니다. 첫 버전에서는 로그인이나 결제보다 독자가 이동할 경로와 계속 갱신할 콘텐츠를 먼저 완성했습니다.",
        ],
      },
      1: {
        heading: "1. 대상 독자와 콘텐츠 역할을 제작 브리프로 정합니다",
        paragraphs: [
          "초보자가 검색으로 들어와 실용 정보를 읽고 직접 도구를 써보는 흐름을 기준으로 페이지 책임을 나눴습니다. 홈은 브랜드와 이용 경로, 블로그는 질문 해결, 도구는 직접 체험, About과 정책 페이지는 운영 주체와 신뢰 정보를 설명합니다.",
        ],
        contextualLinks: [
          { prefix: "페이지·사용자·디자인·콘텐츠 구조를 먼저 정하려면", label: "웹사이트 제작 브리프 작성법", href: "/blog/website-building-prompt-guide", suffix: "을 확인하세요." },
        ],
      },
      6: {
        heading: "7. 공개 후에는 검색 등록과 콘텐츠 운영을 별도 단계로 이어갑니다",
        paragraphs: [
          "첫 배포가 끝나면 canonical, sitemap, robots와 공개 HTML을 확인하고 Search Console에 등록합니다. 광고 설치나 수익화는 홈페이지 제작의 필수 단계가 아니므로 이 기본 제작 흐름에서 분리합니다.",
        ],
        contextualLinks: [
          { prefix: "배포한 사이트를 Google 검색에 알리는 방법은", label: "Next.js Search Console 등록", href: "/blog/nextjs-google-search-console-setup", suffix: "에서 확인할 수 있습니다." },
        ],
      },
      7: {
        heading: "8. 콘텐츠형 홈페이지 완료 체크리스트",
        paragraphs: ["기능 수보다 독자가 읽고 이동하고 다시 찾을 수 있는지를 공개 전에 확인합니다."],
        bullets: ["홈에서 사이트 대상과 제공 가치를 이해할 수 있다", "블로그 글마다 검색 질문과 고유 답이 다르다", "도구 상세에서 사용 맥락과 직접 체험이 연결된다", "모바일에서 메뉴·본문·버튼이 자연스럽다", "내부 링크가 입문→세부 방법→체험으로 이어진다", "production build와 공개 URL을 모두 확인했다"],
      },
      8: {
        heading: "홈페이지 제작과 미니앱 제작은 결과물의 중심이 다릅니다",
        paragraphs: [
          "콘텐츠형 홈페이지의 중심은 정보 구조와 지속적으로 갱신할 글입니다. 입력, 상태 변화와 결과 계산이 중심이라면 홈페이지 글보다 미니앱 제작 흐름이 더 적합합니다.",
        ],
        contextualLinks: [
          { prefix: "작은 상호작용 기능을 만들고 싶다면", label: "AI로 미니앱 만드는 방법", href: "/blog/build-a-mini-app-with-ai", suffix: "으로 이동하세요." },
        ],
      },
    },
    removeContextualHrefs: ["/blog/vercel-adsense-setup-review-process"],
    faqs: [
      { question: "코딩을 전혀 몰라도 AI로 콘텐츠형 홈페이지를 만들 수 있나요?", answer: "가능하지만 페이지 역할, 유지할 URL과 완료 기준은 직접 결정해야 합니다. AI가 만든 코드도 모바일 화면과 production build를 별도로 확인해야 합니다." },
      { question: "콘텐츠형 홈페이지와 미니앱은 무엇이 다른가요?", answer: "홈페이지는 정보와 탐색 구조가 중심이고, 미니앱은 입력·상태·결과 같은 상호작용이 중심입니다. 결과물에 따라 제작 체크리스트를 달리해야 합니다." },
      { question: "처음부터 글과 도구를 많이 만들어야 하나요?", answer: "아닙니다. 서로 다른 질문을 해결하는 대표 글과 실제로 완성된 도구부터 공개하고 운영 가능한 속도로 늘리는 편이 좋습니다." },
      { question: "첫 배포 뒤 무엇을 확인해야 하나요?", answer: "공개 URL의 모바일 화면, 내부 링크, canonical, sitemap과 robots를 확인한 뒤 Search Console 등록으로 이어가세요." },
    ],
    relatedSlugs: ["website-building-prompt-guide", "codex-vscode-guide", "nextjs-vercel-deployment-guide", "nextjs-google-search-console-setup"],
  },

  "build-a-mini-app-with-ai": {
    title: "AI로 미니앱 만드는 방법: 작은 상호작용 기능을 실제로 완성하기",
    seoTitle: "AI로 미니앱 만들기: 상호작용 기능 완성 순서",
    summary: "한 가지 입력과 결과를 가진 작은 웹도구를 대상으로 상태, 예외 입력, 모바일 상호작용, 저장 여부와 배포 후 동작까지 검증하는 제작 과정입니다.",
    description: "AI로 미니앱을 만들 때 한 가지 사용자 행동을 정하고 입력·상태·결과·예외 처리를 구현해 모바일과 새로고침, production 배포까지 검증하는 방법을 설명합니다.",
    primaryKeyword: "AI로 미니앱 만들기",
    relatedKeywords: ["AI 웹도구 만들기", "상호작용 웹앱 제작", "초보자 미니앱", "AI 앱 테스트"],
    sectionReplacements: {
      0: {
        heading: "결론: 한 번의 입력이 한 가지 결과로 이어지는 기능부터 완성하세요",
        paragraphs: [
          "미니앱은 여러 정보를 읽는 홈페이지와 달리 사용자의 입력, 상태 변화와 결과가 중심입니다. 첫 결과물은 한 화면에서 한 가지 문제를 해결하고 성공·실패 상태를 모두 보여 줄 수 있어야 합니다.",
          "예를 들어 프롬프트 생성기라면 입력→생성→복사, 퍼즐이라면 시작→진행→완료가 최소 동작입니다. 페이지 수보다 이 한 흐름이 모바일과 새로고침에서도 안정적으로 작동하는지가 완료 기준입니다.",
        ],
      },
      1: {
        heading: "전체 제작 흐름: 행동→상태→예외→검증 순서로 진행합니다",
        paragraphs: ["작은 문제 선택, 입력과 출력 정의, 상태 설계, 한 기능 구현, 실패 입력 테스트, 저장 방식 선택, production 배포 순서로 진행합니다."],
        bullets: ["사용자가 할 한 가지 행동", "필수 입력과 결과", "초기·진행·성공·실패 상태", "빈 값과 반복 클릭 같은 예외", "로컬 저장 또는 데이터베이스 필요 여부", "모바일과 공개 URL 검증"],
      },
      4: {
        heading: "3단계: 화면 목록이 아니라 동작 규칙을 AI 작업 명세로 적습니다",
        paragraphs: [
          "미니앱 요청에는 입력값, 버튼 동작, 로딩·성공·실패 상태, 결과를 다시 시작하는 방법을 적습니다. 이미 정해진 기능을 구현하는 단계이므로 사이트 전체 브리프보다 코딩 작업 명세가 적합합니다.",
        ],
        contextualLinks: [
          { prefix: "구현 범위와 검증 조건은", label: "AI 코딩 작업 명세 작성법", href: "/blog/better-prompts-for-ai-coding", suffix: "으로 정리하세요." },
        ],
      },
      6: {
        heading: "5단계: 정상 입력과 실패 입력, 새로고침을 함께 테스트합니다",
        paragraphs: [
          "정상 입력만 확인하면 실제 사용 중 빈 값, 긴 문장, 빠른 연속 클릭과 새로고침에서 문제가 드러납니다. 각 입력 뒤 버튼 상태, 오류 문구, 결과 복사와 다시 시작이 자연스러운지 확인합니다.",
          "사용 기록이 기기 하나에만 남아도 되면 localStorage로 시작할 수 있습니다. 여러 기기나 사용자별 데이터가 필요할 때만 데이터베이스와 인증을 검토합니다.",
        ],
        contextualLinks: [
          { prefix: "무료 Supabase 프로젝트를 여러 작은 앱이 공유해야 한다면", label: "Supabase 프로젝트 안전하게 재사용하기", href: "/blog/reuse-supabase-project-multiple-apps", suffix: "에서 RLS와 키 분리를 확인하세요." },
        ],
      },
      8: {
        heading: "미니앱 완료 체크리스트",
        paragraphs: ["기능 수가 아니라 핵심 상호작용이 실제 환경에서 끝까지 이어지는지 확인합니다."],
        bullets: ["첫 화면에서 할 일을 이해할 수 있다", "빈 입력과 잘못된 입력을 설명한다", "진행·성공·실패 상태가 구분된다", "연속 클릭과 새로고침에서 상태가 깨지지 않는다", "모바일 터치와 키보드 사용이 가능하다", "production build와 공개 URL에서 같은 결과가 나온다"],
      },
      9: {
        heading: "기능이 동작한 뒤에만 저장과 다음 기능을 확장합니다",
        paragraphs: [
          "첫 상호작용이 안정된 뒤 사용 기록, 순위, 공유와 로그인 중 실제로 필요한 기능만 추가하세요. 새 기능마다 같은 정상·실패·새로고침 검사를 반복하면 작은 앱의 장점을 유지할 수 있습니다.",
        ],
        contextualLinks: [
          { prefix: "첫 공개는", label: "Next.js Vercel 배포 방법", href: "/blog/nextjs-vercel-deployment-guide", suffix: "으로 이어가세요." },
          { prefix: "배포가 실패하면", label: "Vercel 배포 오류 진단", href: "/blog/vercel-deployment-error-guide", suffix: "에서 Build Logs를 확인하세요." },
        ],
      },
    },
    faqs: [
      { question: "첫 미니앱은 어떤 기능이 적당한가요?", answer: "입력 하나와 결과 하나로 설명할 수 있고, 로그인이나 결제 없이도 가치를 확인할 수 있는 계산기, 생성기, 타이머나 작은 퍼즐이 적합합니다." },
      { question: "홈페이지 제작과 미니앱 제작은 무엇이 다른가요?", answer: "홈페이지는 콘텐츠 구조와 탐색이 중심이고, 미니앱은 입력·상태 변화·결과와 예외 처리가 중심입니다." },
      { question: "처음부터 데이터베이스가 필요한가요?", answer: "대부분은 아닙니다. 상태가 현재 화면이나 기기 안에만 남아도 된다면 먼저 동작을 검증하고, 사용자별 동기화가 필요할 때 데이터베이스를 추가하세요." },
      { question: "기능이 화면에서 동작하면 완성된 건가요?", answer: "빈 입력, 반복 클릭, 모바일, 새로고침, typecheck, production build와 공개 URL까지 확인해야 실제 사용 가능한 상태에 가깝습니다." },
    ],
    relatedSlugs: ["better-prompts-for-ai-coding", "codex-vscode-guide", "reuse-supabase-project-multiple-apps", "nextjs-vercel-deployment-guide", "vercel-deployment-error-guide"],
  },

  "nextjs-vercel-deployment-guide": {
    title: "Next.js Vercel 첫 배포 방법: GitHub 연결부터 공개 확인까지",
    seoTitle: "Next.js Vercel 첫 배포: GitHub 연결부터 공개 확인",
    summary: "로컬 production build를 통과한 Next.js 프로젝트를 GitHub에 올리고 Vercel production 브랜치와 환경변수를 설정해 첫 공개 URL을 확인하는 정상 배포 흐름입니다.",
    description: "Next.js 프로젝트를 처음 Vercel에 배포할 때 로컬 build, GitHub push, 저장소 연결, production 브랜치, 환경변수와 공개 URL을 순서대로 확인하는 가이드입니다.",
    primaryKeyword: "Next.js Vercel 첫 배포",
    relatedKeywords: ["Next.js Vercel 배포", "Vercel GitHub 연결", "Next.js 무료 배포", "Vercel production 배포"],
    sectionReplacements: {
      0: {
        heading: "결론: 첫 배포는 로컬 준비→GitHub→Vercel→공개 URL 순서로 확인하세요",
        paragraphs: [
          "이 글은 아직 배포를 시작하지 않은 사용자가 정상적인 첫 production 배포를 완료하는 순서를 다룹니다. 이미 Build Failed가 발생했거나 Ready인데 사이트가 바뀌지 않는다면 전용 오류 진단 글로 이동해야 합니다.",
          "로컬 build 성공, 원격 저장소 반영, Vercel Ready와 공개 HTML 확인은 서로 다른 단계입니다. 각 단계의 성공을 확인하고 다음으로 넘어가면 실패 위치를 빠르게 구분할 수 있습니다.",
        ],
      },
      5: {
        heading: "5. 첫 배포가 실패하면 설정을 반복 변경하지 말고 오류 진단으로 전환합니다",
        paragraphs: [
          "Build Logs가 실패를 표시하면 마지막 문구만 보고 Redeploy를 반복하지 마세요. 실패한 커밋과 첫 실제 오류를 기록하고 같은 커밋을 로컬에서 재현해야 합니다.",
        ],
        contextualLinks: [
          { prefix: "Build Failed, 환경변수 오류 또는 운영 반영 실패는", label: "Vercel 배포 오류 해결 순서", href: "/blog/vercel-deployment-error-guide", suffix: "에서 진단하세요." },
        ],
      },
      7: {
        heading: "7. 첫 정상 배포 완료 체크리스트",
        paragraphs: ["Vercel 대시보드의 Ready 표시만 보지 말고 실제 공개 결과까지 확인합니다."],
        bullets: ["로컬 production build가 성공했다", "GitHub 기본 브랜치에 의도한 커밋이 있다", "Vercel production 브랜치가 올바르다", "필요한 환경변수가 Production에 등록됐다", "공개 URL에서 H1·링크·이미지가 보인다", "canonical이 공개 URL을 가리킨다"],
      },
      8: {
        heading: "배포가 끝난 뒤에 Google 검색 등록을 진행합니다",
        paragraphs: [
          "공개 URL이 안정적으로 열리고 canonical, sitemap과 robots가 준비된 뒤 Search Console 인증과 사이트맵 제출을 진행하세요. 검색 등록은 배포 성공을 대신하지 않습니다.",
        ],
        contextualLinks: [
          { prefix: "배포 완료 후 다음 단계는", label: "Next.js Google Search Console 등록", href: "/blog/nextjs-google-search-console-setup", suffix: "입니다." },
        ],
      },
    },
    removeContextualHrefs: ["/blog/vercel-adsense-setup-review-process"],
    faqs: [
      { question: "GitHub에 push하면 Vercel이 자동으로 첫 배포를 시작하나요?", answer: "Vercel에서 저장소를 가져오고 production 브랜치를 연결해야 합니다. 연결 후에는 해당 브랜치의 새 push가 자동 배포를 시작할 수 있습니다." },
      { question: "첫 배포 전에 반드시 production build를 실행해야 하나요?", answer: "권장합니다. 로컬에서 먼저 build 오류를 확인하면 Git 연결 문제와 코드 문제를 분리할 수 있습니다." },
      { question: "Vercel이 Ready면 배포가 모두 끝난 건가요?", answer: "공개 도메인에서 제목, 주요 기능, canonical과 정적 파일을 직접 확인해야 합니다. Ready와 사용자에게 보이는 결과는 별도로 검증하세요." },
      { question: "배포가 실패하면 이 글의 설정을 처음부터 반복해야 하나요?", answer: "아닙니다. 실패한 커밋과 Build Logs의 첫 실제 오류를 기준으로 Vercel 오류 진단 글을 따라가세요." },
    ],
    relatedSlugs: ["github-pages-vs-vercel-for-beginners", "build-a-website-with-ai-without-coding", "vercel-deployment-error-guide", "nextjs-google-search-console-setup"],
  },

  "vercel-adsense-setup-review-process": {
    title: "Next.js Vercel AdSense 설치 방법: 코드·ads.txt·공개 HTML 확인",
    seoTitle: "Next.js Vercel AdSense 설치: 코드와 ads.txt 확인",
    summary: "Next.js/Vercel 사이트에 AdSense 스크립트를 한 번만 넣고 ads.txt를 루트에 공개한 뒤 운영 HTML과 게시자 ID가 일치하는지 확인하는 기술 설치 가이드입니다.",
    description: "Next.js App Router와 Vercel에서 AdSense 스크립트, ads.txt와 게시자 ID를 설치하고 배포 후 공개 HTML과 루트 파일을 검증하는 기술 절차를 설명합니다.",
    primaryKeyword: "Next.js Vercel AdSense 설치",
    relatedKeywords: ["Next.js AdSense 코드", "Vercel ads.txt", "AdSense 공개 HTML 확인", "AdSense 게시자 ID"],
    sectionReplacements: {
      0: {
        heading: "결론: 스크립트·게시자 ID·ads.txt·공개 HTML을 각각 확인하세요",
        paragraphs: [
          "이 글은 Next.js/Vercel에서 AdSense 연결 파일을 기술적으로 설치하고 공개 결과를 확인하는 방법만 다룹니다. 광고 승인이나 콘텐츠 품질을 높이는 전략은 설치 여부와 다른 문제입니다.",
          "루트 layout의 스크립트, ads.txt의 게시자 ID, Vercel production 배포와 실제 페이지 소스를 순서대로 대조하면 코드가 저장소에만 있고 운영 사이트에는 없는 상황을 찾을 수 있습니다.",
        ],
      },
      1: {
        heading: "1. 게시자 ID와 production 도메인을 먼저 고정합니다",
        paragraphs: [
          "AdSense 계정의 게시자 ID와 실제 운영 도메인을 기록하고, Vercel Preview 주소가 아니라 production 도메인을 검증 대상으로 사용합니다. 스크립트와 ads.txt에는 같은 게시자 ID가 들어가야 합니다.",
        ],
        bullets: ["AdSense 계정의 ca-pub 게시자 ID", "HTTPS로 열리는 production 도메인", "배포 대상 Git 브랜치와 최신 커밋", "루트 layout과 public 디렉터리 위치"],
      },
      5: {
        heading: "5. 설치 확인 실패를 위치별로 나눕니다",
        paragraphs: [
          "페이지 소스에 스크립트가 없으면 layout과 배포 커밋을 확인하고, ads.txt가 404이면 public 경로와 파일명을 확인합니다. 게시자 ID가 다르면 스크립트 URL과 ads.txt를 같은 계정 값으로 맞춥니다.",
        ],
        table: {
          caption: "AdSense 기술 설치 문제 분리",
          headers: ["증상", "먼저 확인할 위치"],
          rows: [["스크립트가 보이지 않음", "루트 layout·배포 커밋·공개 HTML"], ["ads.txt 404", "public/ads.txt·파일명·루트 URL"], ["게시자 ID 불일치", "스크립트 client와 ads.txt 레코드"], ["CMP 화면이 보이지 않음", "AdSense 계정의 메시지 설정과 적용 지역"]],
        },
      },
      6: {
        heading: "6. CMP는 저장소 코드와 계정 설정을 구분해 확인합니다",
        paragraphs: [
          "CMP가 Google 계정에서 관리되는 구성이라면 저장소 검색만으로 설정 여부를 단정할 수 없습니다. AdSense 계정의 개인정보 보호 및 메시지 설정, 적용 지역과 공개 사이트 동작을 함께 확인해야 합니다.",
        ],
      },
      7: {
        heading: "7. 기술 설치 완료 체크리스트",
        paragraphs: ["승인 결과가 아니라 연결 파일이 공개 사이트에 정확히 반영됐는지를 확인합니다."],
        bullets: ["AdSense 스크립트가 루트 layout에서 한 번 로드된다", "스크립트 client와 ads.txt 게시자 ID가 같다", "/ads.txt가 200으로 열린다", "production 배포가 의도한 커밋을 사용한다", "공개 HTML에서 스크립트 URL을 확인했다", "CMP 계정 설정과 공개 동작을 별도로 확인했다"],
      },
      8: {
        heading: "코드 연결과 콘텐츠 검토는 서로 다른 문제입니다",
        paragraphs: [
          "스크립트와 ads.txt가 정상이어도 콘텐츠 검토 결과가 달라질 수 있습니다. 설치를 반복하기보다 거절 사유가 콘텐츠 가치라면 페이지 목적, 중복, 탐색과 신뢰 정보를 별도 기준으로 점검하세요.",
        ],
        contextualLinks: [
          { prefix: "저가치 콘텐츠 사유를 받은 경우에는", label: "AdSense 저가치 콘텐츠 해결 체크리스트", href: "/blog/adsense-low-value-content-checklist", suffix: "로 이동하세요." },
        ],
      },
    },
    removeContextualHrefs: ["/blog/nextjs-google-search-console-setup"],
    faqs: [
      { question: "AdSense 스크립트는 페이지마다 넣어야 하나요?", answer: "공통 루트 layout에서 한 번 로드하면 하위 페이지에 적용할 수 있습니다. 같은 스크립트를 여러 컴포넌트에서 중복 삽입하지 마세요." },
      { question: "ads.txt는 Next.js에서 어디에 두나요?", answer: "정적 파일로 제공하려면 일반적으로 public/ads.txt에 두고 배포 후 도메인 루트의 /ads.txt가 200으로 열리는지 확인합니다." },
      { question: "코드와 ads.txt가 정상이라면 승인이 보장되나요?", answer: "아닙니다. 이는 기술 연결을 확인한 결과일 뿐이며 콘텐츠와 정책 검토는 별도로 이루어집니다." },
      { question: "CMP 코드가 저장소에서 검색되지 않으면 설정이 없는 건가요?", answer: "계정에서 관리되는 메시지는 저장소에 직접 코드가 없을 수 있습니다. AdSense 계정 설정과 실제 공개 동작을 함께 확인하세요." },
    ],
    relatedSlugs: ["nextjs-vercel-deployment-guide", "adsense-low-value-content-checklist", "monetize-an-ai-built-website"],
  },

  "monetize-an-ai-built-website": {
    title: "웹사이트 수익화 방법 비교: 광고·제휴·디지털 상품·유료 기능",
    seoTitle: "웹사이트 수익화 방법: 광고·제휴·상품·유료 기능 비교",
    summary: "방문자의 검색 목적과 반복 행동을 기준으로 광고, 제휴, 디지털 상품, 유료 기능과 무료 도구 기반 재방문 모델의 조건과 한계를 비교합니다.",
    description: "웹사이트 수익화 방법을 광고, 제휴, 디지털 상품, 유료 기능과 무료 도구 기반 재방문 모델로 나누고 트래픽·신뢰·운영 비용에 맞는 선택 기준을 설명합니다.",
    primaryKeyword: "웹사이트 수익화 방법",
    relatedKeywords: ["웹사이트 수익 모델", "블로그 광고 수익", "제휴 마케팅", "디지털 상품 판매", "웹도구 유료 기능"],
    readingTime: "14분",
    sections: [
      {
        heading: "결론: 광고 승인보다 사용자가 반복하는 행동에 맞는 모델을 선택하세요",
        paragraphs: [
          "수익 모델은 사이트를 만든 이유가 아니라 이미 해결하고 있는 사용자 문제 위에 붙는 운영 방식입니다. 검색 글을 읽는 방문자, 도구를 반복 사용하는 방문자와 전문 자료를 원하는 방문자는 지불하거나 반응하는 방식이 다릅니다.",
          "이 글은 광고 승인을 받는 방법이 아니라 광고, 제휴, 디지털 상품, 유료 기능과 무료 도구 기반 재방문 모델을 비교합니다. 먼저 사용자 행동과 유지 비용을 확인하고 한 가지 모델을 작게 시험하세요.",
        ],
      },
      {
        heading: "1. 사용자 행동과 운영 단계부터 구분합니다",
        paragraphs: [
          "검색 유입이 주로 일회성인지, 같은 도구를 반복 사용하는지, 특정 선택을 앞두고 비교 정보를 찾는지 기록합니다. 방문자가 거의 없는 초기 단계에서는 수익 기능보다 문제 해결 콘텐츠와 재방문 이유를 만드는 일이 먼저입니다.",
        ],
        table: {
          caption: "사용자 행동별 수익 모델",
          headers: ["주요 행동", "맞는 모델", "먼저 필요한 조건"],
          rows: [["정보를 읽음", "광고", "충분한 독자 가치와 정책 준수"], ["제품·서비스를 비교함", "제휴", "실제 선택을 돕는 근거"], ["템플릿을 반복 요청함", "디지털 상품", "재사용 가능한 결과물"], ["도구를 자주 사용함", "유료 기능", "반복 사용과 추가 요구"], ["무료 도구를 다시 찾음", "재방문 기반 확장", "빠른 체험과 관련 콘텐츠"]],
        },
      },
      {
        heading: "2. 광고는 읽기 흐름을 해치지 않을 때만 적합합니다",
        paragraphs: [
          "광고는 정보형 콘텐츠와 자연스럽게 결합할 수 있지만 방문량, 배치, 정책과 페이지 속도의 영향을 받습니다. 광고 공간을 먼저 만들기보다 글이 검색 질문을 충분히 해결하고 주요 버튼과 본문을 가리지 않는지 확인해야 합니다.",
        ],
        contextualLinks: [
          { prefix: "Next.js/Vercel의 기술 설치가 필요하다면", label: "AdSense 코드·ads.txt 설치 방법", href: "/blog/vercel-adsense-setup-review-process", suffix: "을 확인하세요." },
          { prefix: "콘텐츠 가치 사유로 검토가 보류됐다면", label: "저가치 콘텐츠 해결 체크리스트", href: "/blog/adsense-low-value-content-checklist", suffix: "에서 별도로 점검하세요." },
        ],
      },
      {
        heading: "3. 제휴는 구매 직전의 비교와 선택을 도울 때 사용합니다",
        paragraphs: [
          "사용해 보지 않은 서비스를 나열하기보다 가격, 기능, 제한과 적합한 사용자를 비교해야 합니다. 제휴 관계를 명확히 밝히고 링크가 없어도 글 자체로 선택할 수 있는 정보를 제공하세요.",
        ],
      },
      {
        heading: "4. 디지털 상품은 반복해서 요청받는 결과물을 묶습니다",
        paragraphs: [
          "체크리스트, 템플릿, 워크북과 설정 파일처럼 여러 사용자가 반복해서 요청하는 결과물이 있을 때 적합합니다. 무료 글과 상품의 차이는 분량보다 시간을 얼마나 줄여 주는지에 있어야 합니다.",
        ],
      },
      {
        heading: "5. 유료 기능은 반복 사용과 유지 비용이 확인된 뒤 추가합니다",
        paragraphs: [
          "저장, 동기화, 내보내기, 협업과 사용량 확대처럼 무료 도구의 반복 사용자에게 분명한 추가 가치가 있을 때 검토합니다. 로그인·결제·고객 지원과 데이터 보호 비용도 함께 계산해야 합니다.",
        ],
      },
      {
        heading: "6. 무료 도구는 재방문 이유와 관련 콘텐츠를 만듭니다",
        paragraphs: [
          "도구 자체를 유료화하지 않아도 빠른 체험이 반복 방문을 만들 수 있습니다. 도구 상세는 사용법과 한계를 설명하고, 블로그는 사용자가 도구를 찾게 된 문제를 해결하도록 역할을 나눕니다.",
        ],
        contextualLinks: [
          { prefix: "직접 만든 도구와 설명 글의 연결 예시는", label: "무료 AI 프롬프트 생성기 사용법", href: "/blog/free-ai-prompt-generator-guide", suffix: "에서 확인할 수 있습니다." },
        ],
      },
      {
        heading: "7. 한 가지 모델을 작은 범위에서 측정합니다",
        paragraphs: [
          "페이지뷰만 보지 말고 검색 질문 해결률, 도구 재사용, 링크 클릭, 이탈과 지원 요청을 함께 봅니다. 모델 하나를 일정 기간 시험한 뒤 사용자 경험과 운영 비용을 비교해야 어떤 방식이 지속 가능한지 판단할 수 있습니다.",
        ],
      },
      {
        heading: "8. 수익화 전 최종 체크리스트",
        paragraphs: ["사이트 목적과 사용자 경험을 훼손하지 않는지 먼저 확인합니다."],
        bullets: ["각 페이지가 고유한 질문이나 행동을 해결한다", "수익 링크가 없어도 콘텐츠가 유용하다", "광고·제휴 관계와 데이터 사용을 설명한다", "모바일의 본문과 주요 동작을 가리지 않는다", "유료 기능의 유지·지원 비용을 계산했다", "사용자 행동을 기준으로 한 모델만 시험한다"],
      },
    ],
    faqs: [
      { question: "방문자가 적어도 바로 광고를 설치해야 하나요?", answer: "필수는 아닙니다. 초기에는 어떤 검색 질문과 도구가 반복 사용을 만드는지 확인하는 편이 수익 모델 선택에 더 도움이 됩니다." },
      { question: "광고와 제휴를 동시에 운영해도 되나요?", answer: "가능하지만 콘텐츠 흐름과 공개 의무를 지켜야 합니다. 여러 모델을 동시에 시작하면 어떤 요소가 사용자 경험과 성과에 영향을 줬는지 판단하기 어렵습니다." },
      { question: "무료 도구는 어떻게 수익화에 도움이 되나요?", answer: "반복 방문, 관련 정보 탐색과 추가 기능 수요를 만들 수 있습니다. 도구 자체보다 사용자가 계속 해결하려는 문제를 관찰하는 것이 중요합니다." },
      { question: "유료 기능은 언제 추가하는 것이 좋나요?", answer: "무료 기능의 반복 사용자와 저장·동기화·내보내기 같은 구체적인 추가 요구가 확인된 뒤 검토하세요." },
    ],
    relatedSlugs: ["free-ai-prompt-generator-guide", "build-a-mini-app-with-ai", "vercel-adsense-setup-review-process", "adsense-low-value-content-checklist"],
  },

  "chatgpt-codex-webapp-review": {
    relatedSlugs: ["codex-vscode-guide", "better-prompts-for-ai-coding", "build-a-website-with-ai-without-coding"],
  },
  "codex-vscode-guide": {
    appendSections: [
      {
        heading: "다음 단계는 작업 명세→결과 검수→오류 해결로 나눕니다",
        paragraphs: ["Codex의 기본 작업 흐름을 익힌 뒤에는 구현 전 요청, 구현 후 검수와 작업 실패를 서로 다른 글로 확인하세요."],
        contextualLinks: [
          { prefix: "구현을 시작하기 전에는", label: "AI 코딩 작업 명세 작성법", href: "/blog/better-prompts-for-ai-coding", suffix: "을 사용하세요." },
          { prefix: "결과가 이미 만들어졌다면", label: "AI 코딩 결과 개선 방법", href: "/blog/improve-ai-coding-output-quality", suffix: "으로 검수하세요." },
          { prefix: "Codex가 멈추거나 실패했다면", label: "Codex 오류 해결 순서", href: "/blog/codex-error-troubleshooting-guide", suffix: "로 이동하세요." },
        ],
      },
    ],
    relatedSlugs: ["better-prompts-for-ai-coding", "improve-ai-coding-output-quality", "codex-error-troubleshooting-guide"],
  },
  "codex-error-troubleshooting-guide": {
    relatedSlugs: ["codex-vscode-guide", "better-prompts-for-ai-coding", "improve-ai-coding-output-quality"],
  },
  "fix-chatgpt-prompts-for-better-answers": {
    appendSections: [
      {
        heading: "수정한 프롬프트를 실제 반복 업무에 적용합니다",
        paragraphs: ["답변 형식과 검토 기준이 안정되면 이메일, 회의록과 보고서 같은 작은 반복 업무의 초안부터 재사용할 수 있습니다."],
        contextualLinks: [
          { prefix: "업무별 복사 예시는", label: "AI 업무 자동화 프롬프트 7가지", href: "/blog/ai-work-automation-prompts", suffix: "에서 확인하세요." },
        ],
      },
    ],
    relatedSlugs: ["ai-work-automation-prompts", "free-ai-prompt-generator-guide", "better-prompts-for-ai-coding"],
  },
  "free-ai-prompt-generator-guide": {
    relatedSlugs: ["fix-chatgpt-prompts-for-better-answers", "ai-work-automation-prompts", "better-prompts-for-ai-coding"],
  },
  "ai-work-automation-prompts": {
    relatedSlugs: ["fix-chatgpt-prompts-for-better-answers", "free-ai-prompt-generator-guide"],
    removeContextualHrefs: ["/blog/better-prompts-for-ai-coding"],
  },
  "reuse-supabase-project-multiple-apps": {
    relatedSlugs: ["build-a-mini-app-with-ai", "vercel-deployment-error-guide", "nextjs-vercel-deployment-guide"],
    removeContextualHrefs: ["/blog/better-prompts-for-ai-coding"],
  },
  "vercel-deployment-error-guide": {
    relatedSlugs: ["nextjs-vercel-deployment-guide", "codex-error-troubleshooting-guide", "github-pages-vs-vercel-for-beginners"],
  },
  "github-pages-vs-vercel-for-beginners": {
    relatedSlugs: ["build-a-website-with-ai-without-coding", "nextjs-vercel-deployment-guide", "vercel-deployment-error-guide"],
    removeContextualHrefs: ["/blog/build-a-mini-app-with-ai", "/blog/monetize-an-ai-built-website"],
  },
  "nextjs-google-search-console-setup": {
    relatedSlugs: ["nextjs-vercel-deployment-guide", "vercel-deployment-error-guide", "build-a-website-with-ai-without-coding"],
    removeContextualHrefs: ["/blog/vercel-adsense-setup-review-process"],
  },
  "adsense-low-value-content-checklist": {
    removeContextualHrefs: ["/blog/free-ai-prompt-generator-guide", "/blog/nextjs-google-search-console-setup"],
    relatedSlugs: ["vercel-adsense-setup-review-process", "monetize-an-ai-built-website"],
  },
};

function dedupeContextualLinks(sections: BlogSection[], blockedHrefs: Set<string>) {
  const seenHrefs = new Set<string>();
  return sections.map((section) => ({
    ...section,
    contextualLinks: section.contextualLinks?.filter(({ href }) => {
      if (blockedHrefs.has(href) || seenHrefs.has(href)) return false;
      seenHrefs.add(href);
      return true;
    }),
  }));
}

export function applyBlogSearchIntentRefinement(post: BlogPost): BlogPost {
  const refinement = refinements[post.slug];
  if (!refinement) return post;

  const {
    appendSections = [],
    sectionReplacements = {},
    removeSectionIndexes = [],
    removeContextualHrefs = [],
    ...overrides
  } = refinement;
  const removedIndexes = new Set(removeSectionIndexes);
  const baseSections = (refinement.sections ?? post.sections)
    .map((section, index) => sectionReplacements[index] ?? section)
    .filter((_, index) => !removedIndexes.has(index));
  const sections = dedupeContextualLinks(
    [...baseSections, ...appendSections],
    new Set(removeContextualHrefs),
  );

  return {
    ...post,
    ...overrides,
    sections,
  };
}
