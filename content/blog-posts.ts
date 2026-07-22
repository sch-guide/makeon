import type { BlogPost } from "@/types/content";

export const blogPosts: BlogPost[] = [
  {
    slug: "build-a-website-with-ai-without-coding",
    title: "AI로 무료 홈페이지 만들기: 코딩 없이 기획부터 Vercel 배포까지",
    seoTitle: "AI로 무료 홈페이지 만들기: 코딩 없이 Vercel 배포까지",
    summary:
      "아이디어를 한 문장으로 정리하는 단계부터 AI로 화면을 만들고 GitHub와 Vercel로 공개하는 과정까지 초보자 기준으로 안내합니다.",
    description:
      "AI로 무료 홈페이지를 만드는 전체 과정을 기획, 프롬프트 작성, Codex 구현, 로컬 점검, GitHub 연결, Vercel 배포 순서로 설명합니다.",
    primaryKeyword: "AI로 무료 홈페이지 만들기",
    relatedKeywords: [
      "코딩 없이 홈페이지 만들기",
      "AI 웹사이트 만들기",
      "초보자 홈페이지 제작",
      "Vercel 무료 배포",
    ],
    publishedAt: "2026-07-18",
    updatedAt: "2026-07-23",
    category: "AI 웹사이트 제작",
    readingTime: "14분",
    featured: true,
    sections: [
      {
        heading: "결론: 작은 홈페이지라면 AI와 함께 끝까지 만들 수 있습니다",
        paragraphs: [
          "코딩을 전혀 모르는 사람도 소개 페이지, 포트폴리오, 정보형 블로그, 간단한 무료 도구처럼 범위가 분명한 홈페이지는 AI와 함께 만들 수 있습니다. 중요한 것은 AI에게 한 번에 완성품을 요구하는 것이 아니라 기획, 화면, 기능, 검증, 배포를 작은 단계로 나누는 것입니다.",
          "여기서 무료라는 말은 시작 비용을 줄일 수 있다는 뜻입니다. 개발 도구와 호스팅 서비스의 무료 범위는 계정 유형, 사용량, 상업적 이용 여부에 따라 달라질 수 있고, 개인 도메인을 구매하면 별도 비용이 생깁니다. 특히 광고나 유료 서비스를 붙일 계획이라면 배포 서비스의 최신 이용 조건을 반드시 다시 확인해야 합니다.",
        ],
      },
      {
        heading: "1단계: 만들고 싶은 홈페이지를 세 문장으로 줄입니다",
        paragraphs: [
          "처음부터 메뉴와 기능을 길게 적으면 AI도 무엇이 핵심인지 판단하기 어렵습니다. 먼저 누구를 위한 사이트인지, 방문자가 해결하려는 문제가 무엇인지, 방문 후 어떤 행동을 하길 원하는지를 한 문장씩 적어 보세요. 이 세 문장이 이후 디자인과 기능을 판단하는 기준이 됩니다.",
        ],
        subsections: [
          {
            heading: "좋은 시작 문장의 예",
            paragraphs: [
              "예를 들어 ‘AI를 처음 사용하는 직장인을 위한 사이트다. 바로 복사해 쓸 수 있는 업무 프롬프트를 제공한다. 방문자는 설명을 읽고 무료 생성기를 사용한다’처럼 적을 수 있습니다. 대상, 문제, 행동이 모두 드러나기 때문에 AI가 메뉴와 첫 화면을 제안하기 쉬워집니다.",
            ],
          },
          {
            heading: "첫 버전에서 제외할 것도 함께 정합니다",
            paragraphs: [
              "로그인, 결제, 데이터베이스, 관리자 화면은 첫 홈페이지의 난도를 크게 높입니다. 꼭 필요한 이유가 없다면 정적인 콘텐츠와 핵심 기능 한 가지로 시작하세요. 제외 범위를 적는 것은 기능을 포기하는 일이 아니라 첫 공개 날짜를 지키는 방법입니다.",
            ],
            bullets: [
              "필수 페이지: 홈, 소개, 문의, 개인정보처리방침",
              "핵심 행동: 글 읽기 또는 무료 도구 사용 중 한 가지",
              "제외 범위: 로그인, 결제, 복잡한 사용자 데이터 저장",
              "완료 기준: 모바일과 PC에서 모든 링크가 정상 동작",
            ],
          },
        ],
      },
      {
        heading: "2단계: 제작 방식을 고릅니다",
        paragraphs: [
          "AI 홈페이지 제작에는 완성형 빌더를 쓰는 방법과 Next.js 같은 코드 프로젝트를 AI와 함께 만드는 방법이 있습니다. 빠른 소개 페이지가 목표라면 빌더가 편할 수 있고, 블로그와 무료 도구를 계속 추가하려면 코드 기반 프로젝트가 유리합니다. MAKEON은 콘텐츠와 미니앱을 함께 확장하기 위해 Next.js 방식을 선택했습니다.",
        ],
        table: {
          caption: "초보자가 선택할 수 있는 제작 방식",
          headers: ["방식", "잘 맞는 경우", "장점", "확인할 점"],
          rows: [
            ["노코드 빌더", "한두 페이지 소개 사이트", "화면을 빠르게 만들기 쉬움", "요금제와 이전 가능성"],
            ["HTML 정적 사이트", "가벼운 랜딩 페이지", "구조가 단순하고 배포 선택지가 많음", "콘텐츠가 많아지면 관리가 번거로움"],
            ["Next.js + AI", "블로그·도구·미니앱 확장", "SEO와 재사용 구조를 함께 관리", "Node.js와 빌드 개념을 조금씩 익혀야 함"],
          ],
        },
        contextualLinks: [
          {
            prefix: "정적 사이트와 Next.js 배포 환경을 비교하고 싶다면",
            label: "GitHub Pages와 Vercel 차이",
            href: "/blog/github-pages-vs-vercel-for-beginners",
            suffix: " 글을 먼저 확인해도 좋습니다.",
          },
        ],
      },
      {
        heading: "3단계: AI에게 줄 제작 요청서를 작성합니다",
        paragraphs: [
          "제작 요청서에는 사이트 목표, 대상 사용자, 필요한 페이지, 핵심 기능, 원하는 분위기, 제외 기능, 완료 기준을 넣습니다. ‘세련되게 만들어줘’보다 ‘모바일 우선, 밝은 배경, 본문 폭은 읽기 편하게, 버튼은 한 화면에 한 가지 행동만 강조’처럼 확인 가능한 표현이 좋습니다.",
          "한 번에 모든 기능을 구현해 달라고 하기보다 먼저 구조를 검토하게 하고, 그다음 정적인 화면, 핵심 기능, 모바일 점검 순서로 진행하세요. 요청 범위가 작을수록 결과를 비교하고 되돌리기 쉽습니다.",
        ],
        contextualLinks: [
          {
            prefix: "요청문을 더 정확하게 구성하려면",
            label: "AI 코딩 프롬프트 작성법과 복사 템플릿",
            href: "/blog/better-prompts-for-ai-coding",
            suffix: "을 함께 활용하세요.",
          },
        ],
      },
      {
        heading: "4단계: ChatGPT와 Codex의 역할을 나눕니다",
        paragraphs: [
          "ChatGPT는 아이디어를 정리하고 메뉴 이름, 설명 문구, 사용자 흐름을 검토하는 대화에 잘 맞습니다. Codex는 권한이 허용된 프로젝트 폴더를 읽고 실제 파일을 수정하며 검사 명령을 실행하는 구현 단계에 적합합니다. 둘 중 하나가 더 좋다기보다 현재 단계에 맞는 도구를 고르는 것이 중요합니다.",
        ],
        subsections: [
          {
            heading: "기획할 때 확인할 질문",
            paragraphs: [
              "누가 사용하는지, 첫 화면에서 무엇을 보여줄지, 가장 중요한 버튼은 무엇인지, 어떤 정보는 넣지 않을지를 먼저 결정합니다. 이 답이 없는 상태에서 코드를 만들면 디자인은 그럴듯해도 목적이 흐려집니다.",
            ],
          },
          {
            heading: "구현할 때 요청할 순서",
            paragraphs: [
              "Codex에게는 먼저 프로젝트 구조를 읽고 변경 계획만 설명해 달라고 요청하세요. 계획을 확인한 뒤 수정할 파일, 유지할 디자인, 실행할 검사 명령을 명시하면 불필요한 변경을 줄일 수 있습니다.",
            ],
          },
        ],
        contextualLinks: [
          {
            prefix: "두 도구를 제작 단계별로 나누는 구체적인 흐름은",
            label: "ChatGPT와 Codex 차이",
            href: "/blog/chatgpt-codex-webapp-review",
            suffix: " 글에서 이어서 설명합니다.",
          },
          {
            prefix: "에디터에서 직접 수정하는 과정이 필요하다면",
            label: "Codex VS Code 사용법",
            href: "/blog/codex-vscode-guide",
            suffix: "을 참고하세요.",
          },
        ],
      },
      {
        heading: "5단계: 로컬에서 실행하고 완료 기준을 확인합니다",
        paragraphs: [
          "화면이 한 번 열렸다고 끝난 것은 아닙니다. 개발 서버에서 주요 메뉴를 직접 누르고, 모바일 너비에서도 확인하고, 잘못된 입력이나 빈 상태를 시험해야 합니다. 마지막에는 TypeScript 검사와 production build를 실행해 배포 환경에서 발견될 오류를 미리 줄입니다.",
        ],
        codeBlock: {
          label: "NEXT.JS 기본 확인 명령",
          code: "npm install\nnpm run dev\nnpm run typecheck\nnpm run build",
        },
        bullets: [
          "홈에서 모든 메뉴가 열리는지 확인",
          "320~430px 모바일 너비에서 가로 스크롤이 생기지 않는지 확인",
          "버튼과 입력 항목에 키보드로 접근할 수 있는지 확인",
          "title, description, canonical URL이 페이지마다 맞는지 확인",
          "환경변수 파일과 비밀키가 Git에 포함되지 않았는지 확인",
        ],
      },
      {
        heading: "6단계: GitHub와 Vercel로 공개합니다",
        paragraphs: [
          "검증한 파일을 GitHub 저장소에 커밋하고 push한 뒤 Vercel에서 해당 저장소를 프로젝트로 가져옵니다. production 브랜치가 main이라면 main에 반영된 커밋이 운영 배포를 만들고, 다른 브랜치는 일반적으로 미리보기 배포에 사용됩니다. 실제 동작은 프로젝트 설정에 따라 달라질 수 있으므로 Vercel의 Git 설정과 배포 로그를 함께 확인하세요.",
          "배포가 실패하면 화면을 계속 새로고침하기보다 실패한 배포의 Build Logs에서 첫 번째 오류를 찾는 것이 빠릅니다. 로컬 build 성공 여부, 환경변수, Root Directory, Node.js 버전, 파일명의 대소문자를 차례로 확인하면 원인을 좁힐 수 있습니다.",
        ],
        contextualLinks: [
          {
            prefix: "저장소 연결부터 자동 재배포와 오류 해결까지는",
            label: "Next.js Vercel 배포 방법",
            href: "/blog/nextjs-vercel-deployment-guide",
            suffix: "에서 단계별로 확인할 수 있습니다.",
          },
        ],
      },
      {
        heading: "공개 전에 확인할 최종 체크리스트",
        paragraphs: [
          "첫 홈페이지의 목표는 완벽한 서비스가 아니라 다른 사람이 실제 주소로 방문해 목적을 이해하고 핵심 행동을 완료할 수 있는 상태입니다. 아래 항목이 모두 확인되면 공개하고, 이후 실제 사용자의 질문을 바탕으로 한 번에 한 가지씩 개선하세요.",
        ],
        bullets: [
          "사이트의 대상과 제공 가치가 첫 화면에서 보인다",
          "블로그·도구·소개·문의·개인정보처리방침 링크가 열린다",
          "모바일에서 제목, 표, 코드 블록, 버튼이 화면을 벗어나지 않는다",
          "검색 메타데이터와 sitemap, robots.txt가 올바른 공개 주소를 사용한다",
          "production build가 성공하고 배포 로그에 오류가 없다",
        ],
      },
    ],
    toolCta: {
      title: "웹사이트 제작 요청서를 먼저 만들어 보세요",
      description:
        "만들고 싶은 것과 기능, 디자인, 대상 사용자를 입력하면 ChatGPT나 Codex에 붙여넣을 구조화된 요청문을 만들 수 있습니다.",
      href: "/tools/ai-prompt-generator",
      label: "AI 프롬프트 생성기 사용하기",
    },
    faqs: [
      {
        question: "코딩을 전혀 몰라도 AI로 홈페이지를 만들 수 있나요?",
        answer:
          "소개 사이트나 블로그처럼 범위가 작은 프로젝트는 가능합니다. 다만 AI가 만든 결과를 직접 실행하고 링크, 모바일 화면, 오류 여부를 확인하는 역할은 사용자가 맡아야 합니다.",
      },
      {
        question: "AI 홈페이지 제작은 정말 무료인가요?",
        answer:
          "개발 도구와 호스팅의 무료 범위로 시작할 수 있지만 서비스 정책, 사용량, 상업적 이용 여부, 개인 도메인 구매에 따라 비용이 생길 수 있습니다. 공개 전 최신 요금과 이용 조건을 확인하세요.",
      },
      {
        question: "첫 프로젝트에 로그인과 결제를 넣어도 되나요?",
        answer:
          "가능하지만 개인정보, 보안, 데이터 저장, 결제 오류까지 검토 범위가 크게 늘어납니다. 초보자의 첫 버전은 로그인과 결제 없이 핵심 사용 장면을 검증하는 편이 안전합니다.",
      },
      {
        question: "Next.js를 꼭 사용해야 하나요?",
        answer:
          "아닙니다. 한두 페이지 정적 사이트라면 HTML이나 노코드 빌더도 충분합니다. 블로그와 무료 도구를 계속 추가하고 재사용 가능한 구조를 원할 때 Next.js를 검토하면 됩니다.",
      },
      {
        question: "배포 후 가장 먼저 확인할 것은 무엇인가요?",
        answer:
          "공개 주소에서 주요 메뉴와 핵심 기능을 직접 사용하고, 모바일 화면과 sitemap.xml을 확인하세요. 문제가 있으면 Vercel의 최신 배포 상태와 Build Logs부터 확인하는 것이 좋습니다.",
      },
    ],
    relatedSlugs: [
      "codex-vscode-guide",
      "chatgpt-codex-webapp-review",
      "better-prompts-for-ai-coding",
      "nextjs-vercel-deployment-guide",
      "github-pages-vs-vercel-for-beginners",
    ],
    sources: [
      { label: "OpenAI Codex IDE extension 공식 안내", href: "https://developers.openai.com/codex/ide" },
      { label: "Next.js 공식 배포 문서", href: "https://nextjs.org/docs/app/getting-started/deploying" },
      { label: "Vercel Git 저장소 배포 문서", href: "https://vercel.com/docs/git" },
    ],
  },
  {
    slug: "codex-vscode-guide",
    title: "Codex VS Code 사용법: 설치부터 첫 Next.js 수정까지",
    seoTitle: "Codex VS Code 사용법: 설치부터 첫 Next.js 수정까지",
    summary:
      "VS Code에서 Codex를 설치하고 프로젝트 폴더를 열어 작은 수정을 요청한 뒤 diff와 빌드 결과를 확인하는 초보자용 흐름입니다.",
    description:
      "Codex VS Code 사용법을 설치, 로그인, Next.js 폴더 열기, 수정 요청, 변경 검토, 오류 해결 순서로 초보자 눈높이에서 안내합니다.",
    primaryKeyword: "Codex VS Code 사용법",
    relatedKeywords: ["Codex 설치", "Codex 확장 프로그램", "VS Code AI 코딩", "Codex Next.js 수정"],
    publishedAt: "2026-07-23",
    category: "Codex 가이드",
    readingTime: "12분",
    sections: [
      {
        heading: "먼저 역할부터 구분합니다: VS Code는 작업 공간, Codex는 작업을 돕는 에이전트입니다",
        paragraphs: [
          "VS Code는 프로젝트 파일을 열고 편집하며 터미널과 오류를 확인하는 코드 편집기입니다. Codex는 열린 코드와 사용자가 제공한 맥락을 바탕으로 코드를 설명하고, 권한 범위 안에서 파일을 수정하고, 검사 명령을 실행하도록 도와주는 코딩 에이전트입니다.",
          "이 글은 2026년 7월 23일 기준 Windows, VS Code, Next.js 프로젝트, OpenAI의 Codex IDE 확장을 기준으로 작성했습니다. 확장 프로그램의 아이콘과 메뉴 위치는 업데이트에 따라 달라질 수 있으므로 화면이 다르면 확장 프로그램 이름과 게시자가 OpenAI인지, 공식 문서의 최신 빠른 시작 안내가 무엇인지 먼저 확인하세요.",
        ],
        table: {
          caption: "VS Code와 Codex의 역할",
          headers: ["구분", "주요 역할", "초보자가 확인할 것"],
          rows: [
            ["VS Code", "파일 탐색, 편집, 터미널, 오류 표시", "올바른 프로젝트 폴더를 열었는지"],
            ["Codex", "코드 설명, 계획, 파일 수정, 검사 지원", "수정 범위와 완료 기준을 명확히 줬는지"],
            ["사용자", "요구사항 결정, 권한 승인, diff 검토, 최종 테스트", "결과를 직접 실행하고 되돌릴 수 있는지"],
          ],
        },
      },
      {
        heading: "1단계: 설치 전에 기본 준비를 확인합니다",
        paragraphs: [
          "VS Code와 수정할 프로젝트가 먼저 필요합니다. Next.js 프로젝트라면 루트 폴더에 package.json이 있어야 하고, 로컬에서 npm install과 npm run dev가 동작하는 상태가 좋습니다. Git 저장소라면 작업 전 현재 상태를 커밋하거나 최소한 git status로 변경 파일을 확인해 두세요.",
        ],
        bullets: [
          "VS Code 최신 안정 버전 설치",
          "Node.js와 npm 사용 가능 여부 확인",
          "프로젝트 루트의 package.json 확인",
          "중요 파일과 환경변수 백업",
          "Git 체크포인트 또는 현재 diff 확인",
        ],
      },
      {
        heading: "2단계: 공식 Codex 확장을 설치하고 로그인합니다",
        paragraphs: [
          "VS Code 확장 메뉴에서 Codex를 검색하거나 OpenAI 공식 문서가 연결한 Marketplace 페이지를 사용하세요. 비슷한 이름의 확장이 있을 수 있으므로 게시자가 OpenAI인지 확인하는 것이 중요합니다. 설치 후 Codex 패널을 열고 안내되는 계정 로그인 절차를 진행합니다.",
          "공식 문서는 VS Code와 호환 편집기에서 Codex 확장을 사용하고, 확장을 연 뒤 로그인해 에디터 맥락으로 채팅을 시작하는 흐름을 안내합니다. 계정별 사용 가능 범위와 제한은 달라질 수 있으므로 로그인 화면과 현재 플랜 안내를 기준으로 판단하세요.",
        ],
        subsections: [
          {
            heading: "Codex 아이콘이 보이지 않을 때",
            paragraphs: [
              "설치 후 아이콘이 바로 나타나지 않으면 VS Code를 다시 불러오고 Command Palette에서 Codex 관련 열기 명령을 검색하세요. 명령 이름이나 위치는 버전에 따라 바뀔 수 있으므로 특정 위치만 찾기보다 확장이 활성화되어 있는지부터 확인하는 편이 빠릅니다.",
            ],
          },
        ],
      },
      {
        heading: "3단계: 파일 하나가 아니라 프로젝트 폴더를 엽니다",
        paragraphs: [
          "초보자가 가장 자주 겪는 문제는 page.tsx 파일 하나만 열고 프로젝트 전체를 연 것으로 생각하는 것입니다. VS Code의 폴더 열기 기능으로 package.json이 있는 프로젝트 루트를 여세요. 그래야 Codex가 app, components, content, 설정 파일 사이의 관계를 파악하기 쉽습니다.",
          "프로젝트를 처음 열었을 때는 바로 수정시키지 말고 ‘이 프로젝트의 기술과 폴더 구조를 읽고, 실행 방법과 주요 페이지를 설명해줘. 아직 파일은 수정하지 마’라고 요청해 현재 맥락이 맞는지 확인하세요.",
        ],
      },
      {
        heading: "4단계: 첫 요청은 작고 검증 가능하게 작성합니다",
        paragraphs: [
          "첫 수정은 문구 한 곳, 버튼 링크 한 곳, 카드 스타일 한 곳처럼 결과를 눈으로 확인할 수 있는 작업이 좋습니다. 유지할 요소와 수정할 파일 범위, 완료 후 실행할 검사를 함께 적으면 예상 밖의 변경을 줄일 수 있습니다.",
        ],
        codeBlock: {
          label: "첫 Next.js 수정 요청 예시",
          code: "현재 Next.js 프로젝트 구조를 먼저 확인해줘.\n홈 화면의 메인 설명 문구만 더 명확하게 수정하고 싶어.\n기존 베이지·연두색 디자인과 메뉴, 기능은 유지해줘.\n수정할 파일과 이유를 먼저 설명한 뒤 변경해줘.\n완료 후 TypeScript 검사와 production build를 실행해줘.",
        },
        contextualLinks: [
          {
            prefix: "요청문에 어떤 항목을 넣어야 할지 어렵다면",
            label: "AI 코딩 프롬프트 작성법",
            href: "/blog/better-prompts-for-ai-coding",
            suffix: "의 템플릿을 먼저 사용해 보세요.",
          },
        ],
      },
      {
        heading: "5단계: 변경된 줄과 실행 결과를 직접 확인합니다",
        paragraphs: [
          "Codex의 완료 메시지만 보고 작업을 끝내지 마세요. 변경 파일 목록과 diff를 확인해 요청하지 않은 파일이 바뀌지 않았는지, 기존 기능이 삭제되지 않았는지 살펴봅니다. 마음에 들지 않는 변경은 후속 요청으로 범위를 좁혀 수정하거나 Git으로 되돌릴 수 있습니다.",
        ],
        bullets: [
          "git diff 또는 에디터의 변경 보기 확인",
          "npm run dev로 실제 화면과 링크 확인",
          "npm run typecheck로 타입 오류 확인",
          "npm run build로 배포용 빌드 확인",
          "환경변수나 비밀키가 출력·커밋되지 않았는지 확인",
        ],
        contextualLinks: [
          {
            prefix: "첫 사이트 전체 제작 흐름으로 돌아가려면",
            label: "AI로 무료 홈페이지 만들기",
            href: "/blog/build-a-website-with-ai-without-coding",
            suffix: " 가이드를 참고하세요.",
          },
        ],
      },
      {
        heading: "자주 발생하는 초보자 오류와 해결 순서",
        paragraphs: [
          "오류가 생기면 여러 설정을 동시에 바꾸지 말고 현재 폴더, 설치 상태, 오류 메시지, 재현 순서부터 확인하세요. Codex에게도 ‘안 돼요’라고만 말하기보다 실행한 명령과 첫 번째 오류 메시지를 그대로 전달하는 것이 효과적입니다.",
        ],
        table: {
          caption: "Codex와 VS Code 사용 중 자주 생기는 문제",
          headers: ["증상", "가능한 원인", "먼저 확인할 것"],
          rows: [
            ["프로젝트 파일을 찾지 못함", "잘못된 폴더를 열었음", "package.json이 보이는 루트인지 확인"],
            ["npm 명령을 사용할 수 없음", "Node.js 또는 PATH 문제", "새 터미널에서 node -v와 npm -v 확인"],
            ["수정 범위가 너무 큼", "요청과 제외 범위가 모호함", "변경 파일과 완료 기준을 한정해 재요청"],
            ["권한 승인이 반복됨", "작업 공간 밖 파일 또는 네트워크 접근", "요청 대상과 승인 내용을 읽고 필요한 경우만 허용"],
            ["로컬은 되지만 build 실패", "타입·환경변수·대소문자 문제", "build의 첫 오류부터 순서대로 해결"],
          ],
        },
      },
    ],
    faqs: [
      {
        question: "VS Code와 Codex는 같은 프로그램인가요?",
        answer:
          "아닙니다. VS Code는 코드를 열고 편집하는 에디터이고, Codex는 그 작업 공간의 맥락을 활용해 설명과 수정을 돕는 코딩 에이전트입니다.",
      },
      {
        question: "Codex가 수정한 코드는 자동으로 안전한가요?",
        answer:
          "자동으로 안전하다고 가정하면 안 됩니다. 변경 diff, 실행 결과, 보안에 민감한 환경변수, 주요 기능 회귀를 사용자가 검토해야 합니다.",
      },
      {
        question: "Codex가 프로젝트를 제대로 읽지 못하면 어떻게 하나요?",
        answer:
          "package.json이 있는 루트 폴더를 열었는지 확인하고, 먼저 폴더 구조와 실행 방법만 설명해 달라고 요청하세요. 필요한 파일을 열거나 선택해 맥락을 더할 수도 있습니다.",
      },
      {
        question: "수정 전에 Git을 꼭 사용해야 하나요?",
        answer:
          "필수는 아니지만 강하게 권장합니다. 작은 체크포인트가 있으면 예상과 다른 변경을 비교하고 안전하게 되돌리기 쉽습니다.",
      },
      {
        question: "확장 화면이 글과 다르게 보이는 이유는 무엇인가요?",
        answer:
          "IDE와 확장 프로그램은 업데이트되면서 아이콘, 명령, 로그인 흐름이 바뀔 수 있습니다. OpenAI 공식 Codex IDE 문서와 Marketplace의 최신 안내를 기준으로 확인하세요.",
      },
    ],
    relatedSlugs: [
      "build-a-website-with-ai-without-coding",
      "better-prompts-for-ai-coding",
      "chatgpt-codex-webapp-review",
      "nextjs-vercel-deployment-guide",
    ],
    sources: [
      { label: "OpenAI Codex IDE extension 공식 문서", href: "https://developers.openai.com/codex/ide" },
      { label: "Visual Studio Marketplace의 OpenAI Codex 확장", href: "https://marketplace.visualstudio.com/items?itemName=OpenAI.chatgpt" },
    ],
  },
  {
    slug: "nextjs-vercel-deployment-guide",
    title: "Next.js Vercel 배포 방법: GitHub 연결부터 오류 해결까지",
    seoTitle: "Next.js Vercel 배포 방법: GitHub 연결부터 오류 해결까지",
    summary:
      "Next.js 프로젝트를 로컬에서 점검하고 GitHub 저장소와 Vercel을 연결해 자동 재배포하는 과정과 자주 발생하는 오류를 정리했습니다.",
    description:
      "Next.js를 Vercel에 배포하는 방법을 로컬 build, GitHub 연결, 프로젝트 설정, 자동 배포, 오류 로그, 무료 플랜 주의사항 순서로 설명합니다.",
    primaryKeyword: "Next.js Vercel 배포 방법",
    relatedKeywords: ["Vercel GitHub 연결", "Vercel 자동 배포", "Next.js 배포 오류", "Vercel 무료 배포"],
    publishedAt: "2026-07-23",
    category: "배포 가이드",
    readingTime: "13분",
    sections: [
      {
        heading: "배포 흐름부터 이해하면 오류를 찾기 쉽습니다",
        paragraphs: [
          "Vercel 배포는 내 컴퓨터의 폴더를 그대로 공개하는 과정이 아닙니다. GitHub 저장소의 특정 커밋을 Vercel이 가져와 의존성을 설치하고 build를 실행한 뒤, 성공한 결과를 공개 주소에 연결하는 과정입니다. 따라서 로컬, GitHub, Vercel 세 곳의 상태를 구분해야 합니다.",
          "이 글은 2026년 7월 23일 기준 Next.js App Router 프로젝트와 GitHub, Vercel의 Git 연동을 기준으로 작성했습니다. 대시보드 메뉴와 플랜 제한은 바뀔 수 있으므로 실제 배포 시 공식 문서와 계정 화면을 함께 확인하세요.",
        ],
      },
      {
        heading: "1단계: Next.js 프로젝트를 로컬에서 준비합니다",
        paragraphs: [
          "Vercel에 연결하기 전에 로컬 production build가 성공해야 합니다. package.json에 build 스크립트가 있는지 확인하고, 사용하지 않는 오류나 경고를 배포가 해결해 줄 것이라고 기대하지 마세요. 배포 환경은 운영 체제와 파일 시스템이 달라 로컬에서 지나친 문제도 발견할 수 있습니다.",
        ],
        codeBlock: {
          label: "배포 전 기본 검사",
          code: "npm install\nnpm run typecheck\nnpm run build",
        },
        bullets: [
          "package.json과 package-lock.json 포함",
          "node_modules와 .next는 .gitignore로 제외",
          ".env와 .env.local은 커밋하지 않음",
          "필요한 환경변수 이름은 별도로 기록",
          "파일 import 경로의 대소문자 확인",
        ],
      },
      {
        heading: "2단계: GitHub 저장소에 검증된 파일을 올립니다",
        paragraphs: [
          "원격 저장소를 만들고 로컬 프로젝트를 연결한 뒤, 필요한 소스 파일만 staging하고 커밋합니다. push 전에 git status와 staged diff를 확인하면 node_modules, 빌드 폴더, 환경변수 파일이 실수로 포함되는 것을 막을 수 있습니다.",
          "main을 운영 브랜치로 사용할 예정이라면 main이 현재 정상 빌드되는 상태인지 확인하세요. 팀 작업에서는 별도 브랜치와 미리보기 배포를 거쳐 main에 병합하는 흐름이 더 안전합니다.",
        ],
      },
      {
        heading: "3단계: Vercel에서 GitHub 저장소를 가져옵니다",
        paragraphs: [
          "Vercel에서 새 프로젝트를 만들고 접근 권한이 있는 GitHub 저장소를 선택합니다. 프로젝트 이름, Framework Preset, Root Directory, Build 설정, 환경변수를 확인한 뒤 첫 배포를 시작합니다. 일반적인 단일 Next.js 저장소라면 프레임워크가 자동 감지되지만, 모노레포나 하위 폴더 프로젝트라면 Root Directory가 특히 중요합니다.",
        ],
        subsections: [
          {
            heading: "환경변수는 GitHub 코드와 별도로 입력합니다",
            paragraphs: [
              "API 키나 비밀번호를 코드에 적거나 GitHub에 올리지 마세요. Vercel 프로젝트 설정의 환경변수에 이름과 값을 등록하고, Preview와 Production 중 어느 환경에 필요한지 구분합니다. 값을 추가하거나 수정한 뒤에는 새 배포가 필요할 수 있습니다.",
            ],
          },
        ],
      },
      {
        heading: "4단계: GitHub push와 자동 재배포 관계를 이해합니다",
        paragraphs: [
          "Vercel의 Git 연동에서는 저장소의 브랜치와 커밋이 배포를 트리거합니다. 공식 문서 기준으로 브랜치 push는 미리보기 배포를 만들 수 있고, 설정된 Production Branch의 최신 변경은 운영 배포로 이어집니다. 기본 production 브랜치는 보통 main이지만 프로젝트 설정에서 달라질 수 있습니다.",
        ],
        table: {
          caption: "GitHub 변경과 Vercel 배포의 일반적인 관계",
          headers: ["GitHub 동작", "Vercel 결과", "확인 목적"],
          rows: [
            ["기능 브랜치에 push", "Preview 배포", "운영 반영 전 화면·기능 점검"],
            ["main에 push 또는 병합", "Production 배포", "공개 도메인에 최신 정상 빌드 연결"],
            ["이전 커밋으로 되돌린 뒤 push", "되돌린 상태로 새 배포", "문제 변경을 Git 이력으로 복구"],
          ],
        },
        contextualLinks: [
          {
            prefix: "홈페이지 제작 전체 흐름 안에서 배포 위치를 보고 싶다면",
            label: "AI로 무료 홈페이지 만들기",
            href: "/blog/build-a-website-with-ai-without-coding",
            suffix: " 가이드로 돌아가세요.",
          },
        ],
      },
      {
        heading: "5단계: 배포 성공 후 공개 주소에서 다시 검사합니다",
        paragraphs: [
          "대시보드에 Ready가 표시되어도 공개 주소에서 실제 페이지를 확인해야 합니다. 운영 도메인이 최신 배포를 가리키는지, 주요 메뉴와 동적 글 경로가 열리는지, sitemap과 robots가 올바른 도메인을 사용하는지 확인하세요. Preview 주소만 보고 운영 반영이 끝났다고 오해하지 않는 것이 중요합니다.",
        ],
        bullets: [
          "홈, 블로그, 도구, 소개, 문의 페이지 응답 확인",
          "동적 블로그 상세 URL과 canonical 확인",
          "sitemap.xml에 공개할 글만 포함됐는지 확인",
          "robots.txt가 sitemap 주소를 안내하는지 확인",
          "모바일 너비에서 표와 코드가 가로 스크롤로 안전하게 보이는지 확인",
        ],
      },
      {
        heading: "자주 발생하는 Vercel 배포 오류와 확인 방법",
        paragraphs: [
          "배포 실패 화면보다 Build Logs의 첫 번째 실제 오류가 중요합니다. 마지막에 표시된 요약만 복사하기보다 오류가 처음 발생한 파일과 명령을 확인하세요. 아래 순서로 하나씩 점검하면 여러 설정을 동시에 바꾸는 실수를 줄일 수 있습니다.",
        ],
        table: {
          caption: "배포 오류별 우선 확인 항목",
          headers: ["문제", "주요 원인", "확인 방법"],
          rows: [
            ["Build failed", "TypeScript·lint·의존성 오류", "로컬 npm run build와 로그 첫 오류 비교"],
            ["환경변수 undefined", "Vercel에 값 미등록 또는 환경 구분 오류", "변수 이름과 Preview/Production 범위 확인"],
            ["프로젝트를 찾지 못함", "Root Directory 오류", "package.json이 있는 폴더로 설정"],
            ["로컬만 성공", "파일명 대소문자·Node 버전 차이", "import 경로와 프로젝트 Node 설정 확인"],
            ["push 후 배포 없음", "Git 연결·브랜치 설정·권한 문제", "Git 설정과 Production Branch, 최신 커밋 확인"],
            ["404", "경로 생성 누락 또는 잘못된 링크", "빌드 Route 목록과 실제 URL 대조"],
          ],
        },
        contextualLinks: [
          {
            prefix: "배포 서비스 선택 자체가 고민이라면",
            label: "GitHub Pages와 Vercel 차이",
            href: "/blog/github-pages-vs-vercel-for-beginners",
            suffix: "를 먼저 비교해 보세요.",
          },
        ],
      },
      {
        heading: "무료 플랜을 사용할 때 반드시 확인할 점",
        paragraphs: [
          "Vercel의 현재 공식 안내에서 Hobby 플랜은 개인적이고 비상업적인 프로젝트를 위한 무료 플랜으로 설명됩니다. 광고, 유료 기능, 고객 프로젝트처럼 수익과 연결되는 사이트라면 Hobby를 계속 써도 된다고 임의로 판단하지 말고 최신 플랜 조건을 확인해 적합한 플랜을 선택해야 합니다.",
          "무료 범위의 사용량과 기능 제한도 바뀔 수 있습니다. 트래픽뿐 아니라 빌드 실행, 함수, 이미지 최적화, 로그 보관 등 여러 항목이 사용량에 영향을 줄 수 있으므로 Vercel 대시보드의 Usage와 공식 플랜 문서를 주기적으로 확인하세요.",
        ],
      },
    ],
    faqs: [
      {
        question: "GitHub에 push하면 Vercel이 항상 자동 배포하나요?",
        answer:
          "Git 저장소가 프로젝트에 연결되어 있고 해당 브랜치의 자동 배포가 활성화된 경우에 동작합니다. Production Branch와 Git 연결 설정, 커밋이 실제 원격에 올라갔는지 확인하세요.",
      },
      {
        question: "Vercel 배포 전에 로컬 build가 꼭 성공해야 하나요?",
        answer:
          "강하게 권장합니다. 로컬 build가 실패한 상태에서 Vercel만 성공하기를 기대하기보다 같은 오류를 먼저 해결하는 편이 빠르고 안전합니다.",
      },
      {
        question: "환경변수 파일을 GitHub에 올려야 하나요?",
        answer:
          "아닙니다. 실제 비밀 값이 든 .env나 .env.local은 커밋하지 말고 Vercel 프로젝트의 환경변수 설정에 별도로 등록하세요.",
      },
      {
        question: "Preview와 Production 배포의 차이는 무엇인가요?",
        answer:
          "Preview는 운영 반영 전 브랜치 변경을 독립 주소에서 확인하는 용도이고, Production은 설정된 운영 브랜치의 검증된 결과를 실제 서비스 주소에 연결하는 배포입니다.",
      },
      {
        question: "애드센스 사이트도 Vercel Hobby를 사용해도 되나요?",
        answer:
          "현재 공식 안내는 Hobby를 개인·비상업적 용도로 설명합니다. 광고 수익화를 계획한다면 최신 이용 조건을 직접 확인하고 상업적 사용에 맞는 플랜을 선택하세요.",
      },
    ],
    relatedSlugs: [
      "build-a-website-with-ai-without-coding",
      "github-pages-vs-vercel-for-beginners",
      "codex-vscode-guide",
    ],
    sources: [
      { label: "Next.js 공식 배포 문서", href: "https://nextjs.org/docs/app/getting-started/deploying" },
      { label: "Vercel Git 저장소 배포 문서", href: "https://vercel.com/docs/git" },
      { label: "Vercel Hobby 플랜 공식 안내", href: "https://vercel.com/docs/plans/hobby" },
    ],
  },
  {
    slug: "chatgpt-codex-webapp-review",
    title: "ChatGPT와 Codex 차이: 웹사이트·웹앱 만들 때 역할을 나누는 방법",
    seoTitle: "ChatGPT와 Codex 차이: 웹사이트 제작 역할 나누기",
    summary:
      "기획 대화에는 ChatGPT, 실제 프로젝트 수정과 검증에는 Codex를 활용하는 웹 제작 단계별 역할 분담을 설명합니다.",
    description:
      "ChatGPT와 Codex의 차이를 웹사이트 기획, 요구사항 정리, 실제 파일 수정, 오류 해결, 배포 검증 단계별로 비교합니다.",
    primaryKeyword: "ChatGPT와 Codex 차이",
    relatedKeywords: ["ChatGPT 코딩 활용법", "Codex 사용법", "AI 웹앱 만들기", "ChatGPT Codex 역할"],
    publishedAt: "2026-07-15",
    updatedAt: "2026-07-23",
    category: "AI 코딩",
    readingTime: "11분",
    featured: true,
    sections: [
      {
        heading: "한 문장으로 정리하면 기획 대화와 프로젝트 작업의 차이입니다",
        paragraphs: [
          "ChatGPT는 만들고 싶은 서비스를 말로 풀고 사용자 흐름, 기능 우선순위, 문구를 검토하는 데 유용합니다. Codex는 사용자가 허용한 작업 공간에서 실제 파일 관계를 읽고 여러 파일을 수정하며 검사 결과를 확인하는 개발 작업에 더 직접적으로 연결됩니다.",
          "두 도구의 기능은 일부 겹치지만 초보자는 역할을 나누는 편이 안전합니다. ChatGPT에서 무엇을 만들지 결정하고, Codex에서는 그 결정이 현재 프로젝트 구조에 맞게 구현되는지 확인하는 흐름입니다.",
        ],
        table: {
          caption: "웹 제작에서 보는 ChatGPT와 Codex의 역할",
          headers: ["작업", "ChatGPT", "Codex"],
          rows: [
            ["아이디어 정리", "대상 사용자와 문제를 대화로 구체화", "기존 프로젝트 제약을 읽고 구현 가능성 확인"],
            ["콘텐츠·화면 기획", "메뉴, 문구, 사용자 흐름 초안", "컴포넌트와 라우트 구조에 반영"],
            ["코드 수정", "예제나 접근 방법 설명", "권한 범위 안에서 실제 파일 수정"],
            ["오류 해결", "오류 의미와 점검 순서 설명", "재현, 관련 파일 확인, 검사 실행"],
            ["완료 검증", "체크리스트 설계", "typecheck, build, diff 결과 확인 지원"],
          ],
        },
      },
      {
        heading: "1단계: ChatGPT로 문제와 완료 기준을 정리합니다",
        paragraphs: [
          "처음에는 기술 이름보다 사용 장면을 설명하세요. 누가 어떤 기기에서 무엇을 해결하려는지, 첫 버전에서 반드시 필요한 기능과 제외할 기능이 무엇인지 정리합니다. 이 단계에서 기능 욕심을 줄이면 구현 중 방향이 바뀌는 일을 크게 줄일 수 있습니다.",
        ],
        subsections: [
          {
            heading: "ChatGPT에 잘 맞는 질문",
            paragraphs: [
              "‘직장인이 모바일에서 1분 안에 회의 요약 프롬프트를 만드는 도구를 만들고 싶다. 첫 버전에 필요한 화면과 사용 순서를 제안해줘’처럼 대상과 상황을 줍니다. 답변을 받은 뒤 반드시 필요한 항목과 나중에 추가할 항목으로 다시 나누게 하면 범위가 선명해집니다.",
            ],
          },
        ],
      },
      {
        heading: "2단계: Codex에게 현재 프로젝트를 먼저 읽게 합니다",
        paragraphs: [
          "기획 결과를 바로 전체 구현으로 넘기지 말고 Codex에게 프로젝트의 기술, 폴더 구조, 기존 디자인, 실행 명령을 먼저 설명해 달라고 요청하세요. 아직 수정하지 말라는 조건을 넣으면 계획을 검토한 뒤 안전하게 시작할 수 있습니다.",
          "일반 대화에서 만든 예제 코드가 현재 프로젝트와 정확히 맞는다고 가정하면 안 됩니다. Codex가 실제 package.json과 컴포넌트 구조를 확인하도록 하고, 유지할 파일과 바꿀 파일을 분명히 나누세요.",
        ],
        contextualLinks: [
          {
            prefix: "VS Code에서 폴더를 열고 첫 변경을 검토하는 방법은",
            label: "Codex VS Code 사용법",
            href: "/blog/codex-vscode-guide",
            suffix: "에서 확인할 수 있습니다.",
          },
        ],
      },
      {
        heading: "3단계: 화면, 기능, 검증을 한 번에 하나씩 진행합니다",
        paragraphs: [
          "먼저 실제 문구가 들어간 정적인 화면을 만들고 모바일에서 확인합니다. 다음으로 핵심 기능 한 가지를 연결하고, 마지막에 오류 상황과 빈 상태를 점검합니다. 단계마다 diff와 실행 결과를 확인하면 잘못된 방향으로 코드가 커지는 일을 막을 수 있습니다.",
        ],
        bullets: [
          "화면: 메뉴, 실제 문구, 모바일 레이아웃",
          "기능: 사용자가 가장 자주 실행할 동작 한 가지",
          "예외: 빈 입력, 잘못된 입력, 데이터가 없는 상태",
          "검증: 내부 링크, TypeScript, production build",
          "기록: README와 배포 방법 업데이트",
        ],
      },
      {
        heading: "초보자에게 추천하는 실제 사용 흐름",
        paragraphs: [
          "ChatGPT에서 요구사항 초안을 만들고, 사용자가 직접 유지할 것과 제외할 것을 결정합니다. 그 문서를 Codex에 전달해 프로젝트 분석과 변경 계획을 받고, 작은 단위로 구현한 뒤 로컬에서 확인합니다. 마지막으로 GitHub에 검증된 변경만 올리고 Vercel 배포 결과를 확인합니다.",
        ],
        codeBlock: {
          label: "Codex로 넘길 때 사용할 요청 예시",
          code: "아래 요구사항을 현재 프로젝트 구조에 맞게 검토해줘.\n먼저 관련 파일과 변경 계획만 설명하고 아직 수정하지 마.\n기존 디자인과 메뉴는 유지해야 해.\n구현은 화면, 핵심 기능, 모바일 점검 순서로 나눠줘.\n각 단계 후 변경 파일과 확인 방법을 알려줘.",
        },
        contextualLinks: [
          {
            prefix: "전체 프로젝트의 시작부터 공개까지 보고 싶다면",
            label: "AI로 무료 홈페이지 만들기",
            href: "/blog/build-a-website-with-ai-without-coding",
            suffix: "를 중심 가이드로 활용하세요.",
          },
        ],
      },
      {
        heading: "한 도구만 사용해도 되는 경우",
        paragraphs: [
          "아이디어를 비교하거나 문구를 다듬는 일만 필요하다면 ChatGPT 대화로 충분할 수 있습니다. 반대로 요구사항이 이미 정리되어 있고 기존 저장소의 오류를 찾아 실제 파일을 수정해야 한다면 Codex에서 바로 시작하는 편이 효율적일 수 있습니다.",
          "도구를 많이 오가는 것이 목표는 아닙니다. 현재 작업에 필요한 맥락이 어디에 있는지 판단하세요. 생각을 정리해야 하면 대화, 실제 코드와 실행 결과를 함께 봐야 하면 프로젝트 작업을 선택하면 됩니다.",
        ],
      },
      {
        heading: "AI가 놓치기 쉬운 부분은 사람이 끝까지 확인합니다",
        paragraphs: [
          "AI는 요청에 없는 기능을 추가하거나 기존 디자인을 넓게 바꾸고, 실제 사용자 문구 대신 추상적인 예시를 넣을 수 있습니다. 또한 코드가 컴파일되어도 접근성, 개인정보, 상업적 서비스 정책, 사용자에게 필요한 설명까지 자동으로 보장되지는 않습니다.",
        ],
        bullets: [
          "요청하지 않은 파일과 기능이 추가되지 않았는지",
          "모바일에서 버튼과 표가 화면 밖으로 나가지 않는지",
          "API 키와 환경변수가 코드에 들어가지 않았는지",
          "실제 데이터가 없거나 오류가 날 때 안내가 있는지",
          "공식 문서가 필요한 최신 기능을 오래된 방식으로 단정하지 않았는지",
        ],
      },
    ],
    toolCta: {
      title: "ChatGPT와 Codex에 전달할 요청문을 정리하세요",
      description:
        "목표, 기능, 디자인, 대상 사용자, 추가 요구사항을 입력해 실제 제작 대화에 사용할 구조화된 프롬프트를 만들 수 있습니다.",
      href: "/tools/ai-prompt-generator",
      label: "무료 프롬프트 만들기",
    },
    faqs: [
      {
        question: "ChatGPT와 Codex 중 초보자는 무엇부터 써야 하나요?",
        answer:
          "만들고 싶은 것이 아직 모호하면 ChatGPT로 대상 사용자와 핵심 기능을 정리하세요. 요구사항이 정리되고 실제 프로젝트 파일을 수정할 단계라면 Codex를 사용하면 됩니다.",
      },
      {
        question: "ChatGPT도 코드를 작성하는데 Codex가 필요한 이유는 무엇인가요?",
        answer:
          "코드 예시만 필요하면 ChatGPT로도 충분할 수 있습니다. 기존 프로젝트의 여러 파일 관계를 읽고 실제 수정과 검사까지 이어가야 할 때 Codex의 프로젝트 작업 흐름이 더 직접적입니다.",
      },
      {
        question: "Codex에게 한 번에 전체 웹앱을 만들어 달라고 해도 되나요?",
        answer:
          "가능하더라도 초보자에게는 권장하지 않습니다. 화면, 핵심 기능, 예외 상황, 검증을 나누면 변경을 이해하고 오류 원인을 찾기 쉽습니다.",
      },
      {
        question: "AI가 만든 결과는 어떻게 검증해야 하나요?",
        answer:
          "변경 diff를 읽고 실제 화면과 링크를 사용한 뒤 TypeScript 검사와 production build를 실행하세요. 환경변수, 개인정보, 결제처럼 민감한 영역은 별도의 보안 검토가 필요합니다.",
      },
    ],
    relatedSlugs: [
      "build-a-website-with-ai-without-coding",
      "codex-vscode-guide",
      "better-prompts-for-ai-coding",
      "nextjs-vercel-deployment-guide",
    ],
    sources: [
      { label: "OpenAI Codex IDE extension 공식 문서", href: "https://developers.openai.com/codex/ide" },
    ],
  },
  {
    slug: "better-prompts-for-ai-coding",
    title: "AI 코딩 프롬프트 작성법: 원하는 결과를 얻는 핵심 항목과 템플릿",
    seoTitle: "AI 코딩 프롬프트 작성법: 핵심 항목과 복사 템플릿",
    summary:
      "목표와 현재 상태, 수정 범위, 제약 조건, 완료 기준, 검증 명령을 담아 AI 코딩 결과를 안정적으로 만드는 실전 구조를 제공합니다.",
    description:
      "AI 코딩 프롬프트 작성법을 좋은·나쁜 예시 비교, 핵심 항목, 단계별 요청 방법, 복사 가능한 웹사이트 제작 템플릿으로 설명합니다.",
    primaryKeyword: "AI 코딩 프롬프트 작성법",
    relatedKeywords: ["Codex 프롬프트", "웹사이트 제작 프롬프트", "AI 코딩 요청 예시", "ChatGPT 코딩 프롬프트"],
    publishedAt: "2026-07-07",
    updatedAt: "2026-07-23",
    category: "프롬프트",
    readingTime: "12분",
    featured: true,
    sections: [
      {
        heading: "좋은 프롬프트는 길이가 아니라 확인 가능한 작업 설명입니다",
        paragraphs: [
          "‘멋진 웹사이트를 만들어줘’라는 요청은 짧아서 나쁜 것이 아니라 결과를 판단할 기준이 없어서 위험합니다. AI는 대상 사용자, 유지할 기능, 수정 범위, 완료 기준의 빈칸을 임의로 채우게 됩니다. 그 결과 화면은 그럴듯해도 원래 목적과 멀어질 수 있습니다.",
          "좋은 AI 코딩 프롬프트는 현재 상태와 원하는 변화 사이의 차이를 설명합니다. 전문 용어를 많이 쓰기보다 누가 사용하고, 무엇을 바꾸며, 무엇은 유지하고, 어떤 검사까지 통과하면 끝인지 적는 편이 효과적입니다.",
        ],
      },
      {
        heading: "프롬프트에 넣을 핵심 7가지",
        paragraphs: [
          "아래 항목을 모두 길게 쓸 필요는 없습니다. 다만 기존 프로젝트를 수정하는 작업이라면 목표와 수정 범위, 유지할 요소, 완료 기준, 검증 방법은 빠뜨리지 않는 것이 좋습니다.",
        ],
        bullets: [
          "목표: 이번 변경으로 해결하려는 문제",
          "사용자: 누가 어떤 기기와 상황에서 사용하는지",
          "현재 상태: 기술, 폴더, 이미 동작하는 기능",
          "변경 범위: 수정해도 되는 파일과 기능",
          "제약 조건: 유지할 디자인과 넣지 말아야 할 기능",
          "완료 기준: 눈으로 확인할 화면과 동작",
          "검증 방법: typecheck, build, 링크, 모바일 확인",
        ],
      },
      {
        heading: "나쁜 프롬프트와 좋은 프롬프트를 비교해 봅니다",
        paragraphs: [
          "좋은 프롬프트는 AI에게 더 많은 자유를 주는 문장이 아니라 필요한 판단과 불필요한 판단을 구분해 주는 문장입니다. 사용자가 결정해야 할 브랜드와 기능 범위는 명확히 주고, 구현 방법은 현재 프로젝트를 확인한 뒤 제안하게 할 수 있습니다.",
        ],
        table: {
          caption: "AI 코딩 요청 비교",
          headers: ["구분", "예시", "예상되는 문제 또는 장점"],
          rows: [
            ["나쁜 예", "홈페이지를 세련되게 전부 고쳐줘", "범위와 유지할 요소가 없어 전체 디자인이 바뀔 수 있음"],
            ["개선 예", "홈 Hero 문구와 CTA 간격만 수정하고 메뉴·색상·기능은 유지해줘", "수정 범위와 보존 조건을 비교하기 쉬움"],
            ["나쁜 예", "오류를 해결해줘", "재현 방법과 오류 메시지가 없어 추측이 늘어남"],
            ["개선 예", "npm run build의 첫 오류를 분석하고 원인을 설명한 뒤 최소 수정해줘", "근거가 되는 오류와 완료 기준이 분명함"],
          ],
        },
      },
      {
        heading: "바로 복사해 사용할 수 있는 기본 템플릿",
        paragraphs: [
          "대괄호 부분을 현재 프로젝트에 맞게 바꾸세요. 모든 항목을 모를 때는 AI에게 임의로 구현하게 하기보다 먼저 프로젝트를 읽고 선택지를 설명해 달라고 요청하면 됩니다.",
        ],
        codeBlock: {
          label: "AI 코딩 프롬프트 템플릿",
          code: "[목표]\n- 만들거나 수정하려는 것: \n- 해결하려는 사용자 문제: \n\n[현재 상태]\n- 기술과 프로젝트 형태: \n- 이미 정상 동작하는 기능: \n\n[필요한 변경]\n- 핵심 기능: \n- 수정 가능한 파일 또는 영역: \n\n[유지·제외 조건]\n- 반드시 유지할 디자인과 기능: \n- 넣지 말아야 할 기능: \n\n[완료 기준]\n- 확인할 화면과 동작: \n- 모바일 기준: \n\n[검증]\n- TypeScript 검사\n- production build\n- 변경 파일과 결과 요약\n\n먼저 프로젝트를 확인하고 변경 계획만 설명해줘. 계획을 확인한 뒤 최소 범위로 수정해줘.",
        },
      },
      {
        heading: "큰 작업은 세 번의 요청으로 나눕니다",
        paragraphs: [
          "첫 요청에서는 분석과 계획만 받고, 두 번째 요청에서 작은 범위를 구현하고, 세 번째 요청에서 검증과 정리를 수행합니다. 이렇게 하면 계획이 잘못되었을 때 파일이 바뀌기 전에 멈출 수 있고, 오류가 발생한 단계를 찾기 쉽습니다.",
        ],
        subsections: [
          {
            heading: "1. 분석 요청",
            paragraphs: [
              "‘현재 구조와 관련 파일을 읽고 요구사항을 구현할 계획을 설명해줘. 아직 수정하지 마’라고 요청합니다. 예상 변경 파일과 위험 요소가 목적에 맞는지 확인합니다.",
            ],
          },
          {
            heading: "2. 구현 요청",
            paragraphs: [
              "승인한 범위와 유지할 요소를 다시 적고 한 기능만 구현하게 합니다. 여러 기능을 동시에 바꾸면 어떤 변경이 오류를 만들었는지 찾기 어렵습니다.",
            ],
          },
          {
            heading: "3. 검증 요청",
            paragraphs: [
              "변경 파일을 요약하고 TypeScript, build, 링크, 모바일 화면을 확인하게 합니다. 자동 검사가 통과해도 실제 핵심 동작은 사용자가 직접 눌러 확인합니다.",
            ],
          },
        ],
      },
      {
        heading: "결과가 다를 때는 비교 가능한 말로 수정 요청합니다",
        paragraphs: [
          "‘더 예쁘게’보다 ‘본문 최대 폭을 유지하고 H2 위 여백만 줄여줘’, ‘기존 버튼 색은 유지하고 모바일에서만 세로 배치해줘’처럼 바뀐 결과를 확인할 수 있는 표현이 좋습니다. 마음에 드는 부분과 바꿀 부분을 함께 말하면 이미 잘된 영역이 다시 흔들리는 일을 줄일 수 있습니다.",
        ],
        bullets: [
          "예상과 다른 화면을 구체적으로 설명",
          "유지할 파일과 스타일을 다시 명시",
          "한 번에 한 문제만 수정",
          "오류 메시지와 재현 순서를 그대로 제공",
          "수정 후 동일한 검사 다시 실행",
        ],
        contextualLinks: [
          {
            prefix: "이 템플릿을 실제 VS Code 프로젝트에 적용하려면",
            label: "Codex VS Code 사용법",
            href: "/blog/codex-vscode-guide",
            suffix: "을 다음 단계로 읽어보세요.",
          },
        ],
      },
      {
        heading: "프롬프트에 넣지 말아야 할 정보도 있습니다",
        paragraphs: [
          "API 키, 비밀번호, 개인 고객 정보, 운영 데이터는 프롬프트에 그대로 붙이지 마세요. 오류를 설명할 때도 토큰과 계정 식별자가 포함되지 않았는지 확인하고 필요한 부분만 가려서 전달합니다. 환경변수 파일을 수정해야 한다면 값이 아니라 필요한 변수 이름과 설정 위치를 설명하게 하는 편이 안전합니다.",
        ],
        contextualLinks: [
          {
            prefix: "기획부터 배포까지 전체 제작 흐름은",
            label: "AI로 무료 홈페이지 만들기",
            href: "/blog/build-a-website-with-ai-without-coding",
            suffix: "에서 확인할 수 있습니다.",
          },
        ],
      },
    ],
    toolCta: {
      title: "빈칸을 채우기 어렵다면 자동으로 구조화하세요",
      description:
        "만들고 싶은 것, 필요한 기능, 디자인, 대상 사용자, 추가 요구사항을 입력하면 ChatGPT와 Codex에 붙여넣을 프롬프트를 생성합니다.",
      href: "/tools/ai-prompt-generator",
      label: "AI 프롬프트 생성기 열기",
    },
    faqs: [
      {
        question: "AI 코딩 프롬프트는 길수록 좋은가요?",
        answer:
          "아닙니다. 길이보다 목표, 현재 상태, 변경 범위, 유지 조건, 완료 기준이 명확한지가 중요합니다. 반복 설명은 줄이고 확인 가능한 조건을 남기세요.",
      },
      {
        question: "기술을 잘 모르면 프롬프트를 어떻게 작성하나요?",
        answer:
          "사용자와 문제, 필요한 화면, 제외 기능, 완료 모습을 쉬운 말로 적으세요. 구현 기술은 현재 프로젝트를 먼저 확인한 뒤 선택지를 설명해 달라고 요청할 수 있습니다.",
      },
      {
        question: "한 번에 전체 기능을 요청하면 안 되나요?",
        answer:
          "작은 프로젝트라도 분석, 화면, 핵심 기능, 검증으로 나누는 편이 안전합니다. 단계가 작으면 결과를 이해하고 오류를 되돌리기 쉽습니다.",
      },
      {
        question: "오류 수정 프롬프트에는 무엇을 넣어야 하나요?",
        answer:
          "실행한 명령, 첫 번째 오류 메시지, 오류가 발생하는 순서, 정상적으로 기대한 결과, 최근 변경 내용을 포함하세요. 비밀키와 개인정보는 반드시 제거합니다.",
      },
    ],
    relatedSlugs: [
      "build-a-website-with-ai-without-coding",
      "codex-vscode-guide",
      "chatgpt-codex-webapp-review",
    ],
  },
  {
    slug: "github-pages-vs-vercel-for-beginners",
    title: "GitHub Pages와 Vercel 차이, 초보자는 무엇이 쉬울까?",
    seoTitle: "GitHub Pages와 Vercel 차이: 초보자 무료 배포 비교",
    summary:
      "정적 사이트와 Next.js 프로젝트를 기준으로 배포 방식, 자동 업데이트, 초보자 난이도를 비교했습니다.",
    description:
      "GitHub Pages와 Vercel의 배포 방식, 미리보기, Next.js 지원 차이를 초보자 관점에서 비교하고 프로젝트별 선택 기준을 안내합니다.",
    primaryKeyword: "GitHub Pages Vercel 차이",
    relatedKeywords: ["초보자 웹사이트 배포", "GitHub Pages 사용법", "Vercel 무료 배포", "Next.js 호스팅"],
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-23",
    category: "배포 가이드",
    readingTime: "8분",
    sections: [
      {
        heading: "둘 다 웹사이트를 공개하지만 잘하는 일이 다릅니다",
        paragraphs: [
          "GitHub 공식 문서에서 GitHub Pages는 저장소의 HTML, CSS, JavaScript 파일을 게시하는 정적 사이트 호스팅 서비스로 설명합니다. 소개 페이지나 문서처럼 서버 동작이 필요 없는 사이트에 잘 맞고, 구조가 단순한 만큼 문제가 생겼을 때 확인할 지점도 비교적 적습니다.",
          "Vercel은 Git 저장소의 변경에 맞춰 미리보기와 운영 배포를 만들 수 있습니다. Next.js는 정적 파일로 내보낼 수도 있지만 사용하는 기능에 따라 제한이 생기므로, Next.js 기능을 계속 활용하는 프로젝트라면 프레임워크 흐름을 지원하는 배포 환경이 편리합니다.",
        ],
      },
      {
        heading: "초보자가 체감하는 차이를 표로 비교합니다",
        paragraphs: [
          "도구의 절대적인 난이도보다 내가 만든 프로젝트의 기술과 맞는지가 중요합니다. HTML 파일 몇 개로 끝나는 사이트와 서버 기능을 포함한 Next.js 앱은 필요한 배포 환경이 다릅니다.",
        ],
        table: {
          caption: "GitHub Pages와 Vercel 선택 기준",
          headers: ["항목", "GitHub Pages", "Vercel"],
          rows: [
            ["잘 맞는 프로젝트", "정적 HTML·문서·소개 페이지", "Next.js·웹앱·프레임워크 프로젝트"],
            ["배포 흐름", "저장소 파일 또는 Actions 설정", "Git push 기반 Preview·Production 배포"],
            ["서버 기능", "정적 파일 중심", "플랫폼이 지원하는 함수와 프레임워크 기능"],
            ["초보자 판단 기준", "사이트가 완전한 정적 파일인지", "Next.js 기능과 자동 배포가 필요한지"],
          ],
        },
      },
      {
        heading: "Next.js 프로젝트라면 배포 방식부터 확인합니다",
        paragraphs: [
          "Next.js는 Node.js 서버, Docker, 정적 내보내기 등 여러 방식으로 배포할 수 있고 방식에 따라 지원 기능이 달라집니다. 정적 내보내기로 충분한지 모른다면 기능을 억지로 줄이기보다 현재 라우트와 서버 기능을 확인한 뒤 배포 환경을 선택하세요.",
        ],
        contextualLinks: [
          {
            prefix: "Next.js를 GitHub와 연결해 공개하는 실제 단계는",
            label: "Next.js Vercel 배포 방법",
            href: "/blog/nextjs-vercel-deployment-guide",
            suffix: "을 참고하세요.",
          },
        ],
      },
      {
        heading: "비용과 도메인은 최신 조건을 다시 봐야 합니다",
        paragraphs: [
          "두 서비스 모두 비용 없이 시작할 수 있는 범위가 있지만 사용 조건은 다릅니다. Vercel의 현재 공식 안내는 Hobby 플랜을 개인·비상업적 프로젝트용으로 설명하므로, 광고나 유료 기능을 계획한다면 상업적 사용에 맞는 플랜을 확인해야 합니다. 요금과 사용량 제한은 바뀔 수 있으므로 배포 전 공식 문서를 확인하세요.",
          "두 서비스 모두 기본 주소를 제공하고 조건에 따라 개인 도메인을 연결할 수 있습니다. 브랜드를 운영할 계획이라면 기본 주소로 기능을 검증한 뒤 도메인과 플랜을 함께 결정하는 편이 안전합니다.",
        ],
      },
      {
        heading: "MAKEON의 선택 기준",
        paragraphs: [
          "Next.js로 콘텐츠 페이지와 무료 도구를 계속 추가할 계획이라면 Vercel의 Git 연동 흐름이 자연스럽습니다. 반대로 한 장짜리 소개 페이지나 정적 문서를 빠르게 공유할 때는 GitHub Pages도 충분합니다.",
          "어떤 서비스를 고르든 README에 실행 방법을 남기고, 환경변수 실제 값은 저장소 밖에서 관리하며, 배포 전 production build를 확인하는 습관이 중요합니다.",
        ],
        contextualLinks: [
          {
            prefix: "사이트 제작의 처음부터 배포까지 한 번에 보려면",
            label: "AI로 무료 홈페이지 만들기",
            href: "/blog/build-a-website-with-ai-without-coding",
            suffix: "를 중심 글로 읽어보세요.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Next.js는 GitHub Pages에 배포할 수 없나요?",
        answer:
          "정적 내보내기가 가능한 범위에서는 선택할 수 있지만 일부 Next.js 기능이 제한될 수 있습니다. 프로젝트가 사용하는 기능과 공식 배포 문서를 먼저 확인해야 합니다.",
      },
      {
        question: "초보자는 GitHub Pages와 Vercel 중 무엇이 쉬운가요?",
        answer:
          "순수 HTML 정적 사이트는 GitHub Pages가 단순하고, 일반적인 Next.js 프로젝트는 Vercel이 설정을 줄여주는 경우가 많습니다. 프로젝트 기술에 맞춰 선택하세요.",
      },
      {
        question: "무료 플랜으로 상업 사이트를 운영해도 되나요?",
        answer:
          "서비스와 플랜마다 조건이 다릅니다. 특히 Vercel Hobby는 현재 개인·비상업적 용도로 안내되므로 광고나 수익화 전 최신 약관과 적합한 플랜을 확인하세요.",
      },
    ],
    relatedSlugs: [
      "build-a-website-with-ai-without-coding",
      "nextjs-vercel-deployment-guide",
      "codex-vscode-guide",
    ],
    sources: [
      { label: "GitHub Pages 공식 소개", href: "https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages" },
      { label: "Next.js 공식 배포 문서", href: "https://nextjs.org/docs/app/getting-started/deploying" },
      { label: "Vercel Git 저장소 배포 문서", href: "https://vercel.com/docs/git" },
      { label: "Vercel Hobby 플랜 공식 안내", href: "https://vercel.com/docs/plans/hobby" },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts() {
  return blogPosts.filter((post) => post.featured);
}
