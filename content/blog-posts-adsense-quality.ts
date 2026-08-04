import type { BlogPost } from "@/types/content";

export const strengthenedPostSlugs = [
  "build-a-website-with-ai-without-coding",
  "codex-vscode-guide",
  "nextjs-vercel-deployment-guide",
] as const;

export const adsenseQualityPosts: BlogPost[] = [
  {
    slug: "build-a-website-with-ai-without-coding",
    title: "AI로 무료 홈페이지 만들기: MAKEON을 기획하고 공개한 실제 순서",
    seoTitle: "AI로 무료 홈페이지 만들기: Next.js·Vercel 실제 제작 과정",
    summary:
      "MAKEON이 콘텐츠 사이트와 무료 도구를 기획하고 Next.js, GitHub, Vercel로 공개한 과정을 실제 프로젝트 구조와 시행착오 중심으로 정리했습니다.",
    description:
      "AI로 무료 홈페이지를 만들 때 필요한 범위 설정, Next.js 구현, 모바일 검수, GitHub 기록, Vercel 공개 확인을 MAKEON 프로젝트 사례로 설명합니다.",
    primaryKeyword: "AI로 무료 홈페이지 만들기",
    relatedKeywords: ["AI 웹사이트 만들기", "코딩 없이 홈페이지 만들기", "Next.js 홈페이지", "Vercel 무료 배포"],
    publishedAt: "2026-07-18",
    updatedAt: "2026-08-04",
    category: "AI 웹사이트 제작",
    tags: ["AI 코딩·Codex", "웹사이트·웹앱 제작", "배포·수익화"],
    readingTime: "16분",
    featured: true,
    reviewNote: {
      checkedAt: "2026-08-04",
      environment: "MAKEON Next.js 16 저장소, Git main 브랜치, Vercel 공개 사이트",
      notice:
        "이 글은 MAKEON 저장소의 라우트, Git 커밋과 공개 페이지를 대조해 작성했습니다. 무료 플랜과 서비스 화면은 달라질 수 있으므로 공식 문서를 함께 확인하세요.",
    },
    sections: [
      {
        heading: "결론: 첫 사이트는 페이지 수보다 운영 가능한 범위를 정하는 것이 먼저입니다",
        paragraphs: [
          "AI를 사용하면 코드를 잘 모르는 사람도 홈페이지의 첫 버전을 만들 수 있습니다. 그러나 ‘예쁜 사이트를 만들어 줘’라는 한 문장만으로는 공개 후 계속 관리할 수 있는 결과를 얻기 어렵습니다. 목적, 핵심 방문자, 첫 기능, 유지할 기술, 완료 조건을 먼저 정해야 합니다.",
          "MAKEON은 AI 코딩 경험과 무료 도구를 함께 기록하는 사이트로 범위를 정했습니다. Next.js로 블로그와 도구 라우트를 관리하고, GitHub에 변경 이력을 남기며, Vercel에서 공개 결과를 확인하는 흐름을 선택했습니다. 이 선택 덕분에 글과 미니게임을 같은 프로젝트에서 확장할 수 있었지만, 한 번에 많은 기능을 요청했을 때 완성도가 낮아지는 문제도 겪었습니다.",
        ],
        callout: {
          type: "note",
          title: "무료의 의미",
          text: "초기 제작과 소규모 운영을 무료 범위에서 시작할 수 있다는 뜻입니다. 도메인, 트래픽, 데이터베이스 사용량과 상업적 이용 조건에 따라 비용이 생길 수 있습니다.",
        },
      },
      {
        heading: "1. MAKEON은 무엇을 만들지보다 무엇을 남길지 먼저 정했습니다",
        paragraphs: [
          "처음 정한 핵심은 세 가지였습니다. 초보자가 이해할 수 있는 제작 기록, 설치 없이 실행하는 무료 도구, 실패와 수정 과정을 숨기지 않는 운영 기록입니다. 이 기준에 맞지 않는 기능은 첫 버전에서 미뤘습니다.",
        ],
        table: {
          caption: "MAKEON 첫 버전의 범위",
          headers: ["구분", "포함", "처음에는 제외"],
          rows: [
            ["콘텐츠", "블로그, 소개, 문의, 개인정보처리방침", "회원별 저장 글"],
            ["도구", "브라우저에서 바로 쓰는 무료 도구", "결제와 유료 구독"],
            ["운영", "Git 기록, 공개 URL, 모바일 확인", "복잡한 관리자 화면"],
          ],
        },
        subsections: [
          {
            heading: "완료 조건도 문장으로 적었습니다",
            paragraphs: [
              "모바일과 데스크톱에서 주요 페이지가 깨지지 않고, 모든 내부 링크가 열리며, 타입 검사와 프로덕션 빌드를 통과하고, 공개 주소에서 변경 내용을 확인할 수 있어야 완료로 보았습니다. 기능 목록보다 이 기준이 수정 방향을 더 명확하게 만들었습니다.",
            ],
          },
        ],
      },
      {
        heading: "2. 글과 도구를 함께 운영하기 위해 Next.js를 선택했습니다",
        paragraphs: [
          "소개 페이지 한 장만 필요했다면 정적 HTML이나 노코드 빌더도 가능했습니다. MAKEON은 블로그 상세 주소, 도구별 주소, 메타데이터, 사이트맵과 서버 API를 한 프로젝트에서 다뤄야 했기 때문에 Next.js App Router 구조를 사용했습니다.",
          "콘텐츠는 TypeScript 데이터로 관리하고, 동적 블로그 라우트가 슬러그에 맞는 글을 렌더링합니다. 도구는 각각 독립 라우트로 분리했습니다. 이 구조는 새 글을 추가할 때 공통 레이아웃과 SEO 필드를 재사용할 수 있다는 장점이 있습니다.",
        ],
        codeBlock: {
          label: "MAKEON에서 확인한 핵심 구조",
          code: "app/\n  blog/[slug]/page.tsx\n  tools/.../page.tsx\n  sitemap.ts\n  robots.ts\ncontent/\n  blog-posts.ts\npublic/\n  ads.txt",
        },
      },
      {
        heading: "3. AI에는 전체 제작보다 한 단계씩 요청했습니다",
        paragraphs: [
          "한 번에 디자인, 블로그, 게임, 랭킹과 광고 준비를 모두 요청하면 각 기능의 세부 검수가 약해졌습니다. 이후에는 관련 파일 찾기, 현재 동작 설명, 한 기능 수정, 타입 검사, 화면 확인 순서로 요청을 나눴습니다.",
        ],
        subsections: [
          {
            heading: "실제로 도움이 된 요청 구조",
            paragraphs: ["다음 여섯 항목을 포함하면 기존 기능을 잃지 않고 수정하기 쉬웠습니다."],
            bullets: [
              "목표: 이번 변경으로 해결할 사용자 문제",
              "현재 상태: 라우트와 이미 동작하는 기능",
              "수정 범위: 찾아야 할 파일과 화면",
              "유지 조건: URL, 게임 규칙, 기록, 광고 코드",
              "완료 조건: 모바일, 타입 검사, 빌드",
              "보고 방식: 변경 파일과 확인 결과",
            ],
          },
        ],
        contextualLinks: [
          {
            prefix: "이 요청 구조를 복사해 쓰고 싶다면",
            label: "AI 코딩 결과의 완성도를 높이는 요청 방법",
            href: "/blog/improve-ai-coding-output-quality",
            suffix: "을 함께 확인하세요.",
          },
        ],
      },
      {
        heading: "4. 로컬에서는 실행보다 검사 순서를 고정했습니다",
        paragraphs: [
          "개발 화면이 열린다고 배포 가능한 것은 아닙니다. import 누락, 잘못된 타입, 서버 전용 환경변수 노출은 개발 중 바로 드러나지 않을 수 있습니다. MAKEON은 수정 후 타입 검사와 프로덕션 빌드를 별도로 확인합니다.",
        ],
        codeBlock: {
          label: "기본 확인 명령",
          code: "npm run typecheck\nnpm run build",
        },
        bullets: [
          "홈, 블로그 목록, 수정한 글과 도구 주소를 직접 열기",
          "모바일 폭에서 버튼과 표가 화면 밖으로 나가지 않는지 확인",
          "콘솔 오류와 404 링크 확인",
          "환경변수와 비밀 키가 Git diff에 포함되지 않았는지 확인",
        ],
      },
      {
        heading: "5. GitHub와 Vercel은 저장과 공개 확인을 분리했습니다",
        paragraphs: [
          "Git 커밋은 무엇을 바꿨는지 남기는 기록이고, Vercel 배포 성공은 그 코드가 공개 환경에서 빌드됐다는 확인입니다. 둘은 같은 일이 아닙니다. push가 성공해도 배포 브랜치 설정이나 빌드 오류로 공개 반영이 실패할 수 있습니다.",
          "MAKEON 저장소의 main 브랜치에는 Search Console 인증, AdSense 연결, ads.txt, 게임 추가와 랭킹 권한 수정이 각각 다른 커밋으로 남아 있습니다. 문제를 기능별로 나눠 기록했기 때문에 이후 어떤 변경이 원인이었는지 추적하기 쉬웠습니다.",
        ],
        contextualLinks: [
          {
            prefix: "Git 연결부터 공개 확인까지는",
            label: "Next.js Vercel 배포 실제 점검 순서",
            href: "/blog/nextjs-vercel-deployment-guide",
            suffix: "에서 더 자세히 설명합니다.",
          },
        ],
      },
      {
        heading: "6. 공개 후에는 검색과 광고 코드를 별도 과제로 다뤘습니다",
        paragraphs: [
          "사이트가 열린다고 검색 등록이나 광고 심사가 끝난 것은 아닙니다. MAKEON은 Google 사이트 인증 메타데이터, sitemap, robots, AdSense 스크립트와 ads.txt를 각각 추가했습니다. 공개 HTML과 실제 URL에서 다시 확인했습니다.",
          "AdSense 연결 코드는 정상이어도 콘텐츠 품질 심사에서 승인되지 않을 수 있습니다. MAKEON도 ‘가치가 별로 없는 콘텐츠’ 사유를 받은 뒤 글의 분량만 늘리기보다 실제 제작 경험, 작성자 설명, 도구 안내와 내부 링크를 다시 점검했습니다.",
        ],
        contextualLinks: [
          {
            prefix: "검색 등록 과정은",
            label: "Next.js 사이트를 Google Search Console에 등록한 실제 과정",
            href: "/blog/nextjs-google-search-console-setup",
            suffix: "에서 확인할 수 있습니다.",
          },
          {
            prefix: "광고 연결과 심사의 차이는",
            label: "Vercel 사이트에 AdSense 코드를 넣고 검토 요청한 과정",
            href: "/blog/vercel-adsense-setup-review-process",
            suffix: "에 정리했습니다.",
          },
        ],
      },
      {
        heading: "7. 다시 만들 때 지킬 체크리스트",
        paragraphs: ["새 사이트를 다시 시작한다면 아래 순서로 진행합니다."],
        bullets: [
          "방문자 한 명과 해결할 문제 한 가지를 먼저 적기",
          "첫 공개에 필요한 페이지와 제외할 기능을 구분하기",
          "프레임워크보다 운영할 콘텐츠와 기능을 먼저 결정하기",
          "AI 요청에 유지 조건과 완료 기준을 포함하기",
          "타입 검사와 빌드를 모두 통과하기",
          "Git push, 배포 성공, 공개 URL 확인을 따로 기록하기",
          "검색·광고 연결 성공을 콘텐츠 품질 승인과 혼동하지 않기",
        ],
      },
    ],
    faqs: [
      { question: "코딩을 전혀 몰라도 AI 홈페이지를 만들 수 있나요?", answer: "소개 사이트나 작은 도구는 가능하지만 오류 메시지, 파일 구조와 공개 결과를 직접 확인해야 합니다. AI가 만든 코드를 검수 없이 배포하는 방식은 권하지 않습니다." },
      { question: "Next.js를 꼭 사용해야 하나요?", answer: "아닙니다. 정적 소개 페이지는 더 단순한 방식이 나을 수 있습니다. 블로그, 동적 메타데이터, API와 도구를 함께 확장할 때 Next.js가 한 선택지가 됩니다." },
      { question: "Vercel 무료 배포는 계속 무료인가요?", answer: "플랜과 사용량, 프로젝트 목적에 따라 달라질 수 있습니다. 배포 전에 Vercel의 최신 플랜과 제한을 확인해야 합니다." },
      { question: "AI가 한 번에 사이트 전체를 만들게 하면 더 빠르지 않나요?", answer: "첫 초안은 빠르지만 세부 판정, 모바일, 접근성과 기존 기능 유지가 약해질 수 있습니다. 공개 가능한 품질을 목표로 한다면 기능 단위로 나누는 편이 안전합니다." },
      { question: "AdSense 코드를 넣으면 승인이 되나요?", answer: "아닙니다. 코드는 사이트 연결 수단이고 승인은 사이트 전체의 정책 준수와 콘텐츠 심사를 거칩니다. MAKEON도 코드 연결 후 콘텐츠 품질 사유로 승인되지 않았습니다." },
    ],
    relatedSlugs: ["codex-vscode-guide", "nextjs-vercel-deployment-guide", "improve-ai-coding-output-quality"],
    toolCta: {
      title: "웹사이트 요구사항을 프롬프트로 정리해 보세요",
      description: "목적과 기능을 입력해 AI에게 전달할 첫 요청문을 만듭니다.",
      href: "/tools/ai-prompt-generator",
      label: "무료 생성기 사용하기",
    },
    sources: [
      { label: "Next.js App Router 공식 문서", href: "https://nextjs.org/docs/app" },
      { label: "Vercel Git 저장소 배포 문서", href: "https://vercel.com/docs/git" },
      { label: "GitHub 변경 사항 커밋 안내", href: "https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files" },
    ],
  },
  {
    slug: "codex-vscode-guide",
    title: "Codex VS Code 사용법: MAKEON을 수정하며 익힌 안전한 작업 순서",
    seoTitle: "Codex VS Code 사용법: 실제 Next.js 프로젝트 수정 순서",
    summary:
      "Codex에 큰 기능을 한 번에 맡기지 않고 관련 파일 확인, 범위 고정, 코드 수정, 타입 검사와 Git 검토로 이어가는 실제 작업 방식을 설명합니다.",
    description:
      "MAKEON Next.js 프로젝트에서 Codex를 사용할 때 지킨 파일 탐색, 요청 작성, 변경 검토, 타입 검사, 빌드와 Git 확인 순서를 초보자 관점에서 안내합니다.",
    primaryKeyword: "Codex VS Code 사용법",
    relatedKeywords: ["Codex 사용법", "VS Code AI 코딩", "Codex Next.js", "AI 코딩 에이전트"],
    publishedAt: "2026-07-23",
    updatedAt: "2026-08-04",
    category: "AI 코딩",
    tags: ["AI 코딩·Codex", "웹사이트·웹앱 제작"],
    readingTime: "15분",
    featured: true,
    reviewNote: {
      checkedAt: "2026-08-04",
      environment: "Codex 데스크톱 작업 환경, Next.js 16, TypeScript, Git 저장소",
      notice:
        "Codex 화면과 지원 기능은 버전에 따라 달라질 수 있습니다. 이 글은 MAKEON에서 반복적으로 사용한 작업 원칙과 저장소에서 확인되는 수정 흐름을 중심으로 작성했습니다.",
    },
    sections: [
      {
        heading: "결론: Codex는 지시를 대신 생각하는 도구보다 저장소를 함께 점검하는 작업자로 써야 합니다",
        paragraphs: [
          "Codex를 처음 쓸 때 가장 중요한 것은 긴 프롬프트가 아닙니다. 올바른 프로젝트를 열고, 현재 동작과 수정 범위를 설명하고, 바꾸면 안 되는 조건을 적고, 결과를 명령과 화면으로 확인하는 순서가 중요합니다.",
          "MAKEON에서는 블로그, 게임, SEO와 랭킹이 한 저장소에 있습니다. 한 기능을 고칠 때 다른 기능을 건드리지 않도록 관련 파일을 먼저 찾고 기존 변경 상태를 확인한 뒤 작업했습니다. 이 방식은 화려한 한 번의 생성보다 느려 보이지만 실제 공개 오류를 줄이는 데 도움이 됐습니다.",
        ],
      },
      {
        heading: "1. 시작 전에 프로젝트와 현재 변경 상태를 확인합니다",
        paragraphs: [
          "잘못된 폴더에서 작업하면 코드가 맞아도 사이트에 반영되지 않습니다. 먼저 package.json과 주요 폴더를 확인하고 Git 상태를 봅니다. 이미 수정된 파일이 있다면 다른 작업자의 변경일 수 있으므로 함부로 되돌리면 안 됩니다.",
        ],
        codeBlock: {
          label: "MAKEON에서 먼저 확인하는 항목",
          code: "git status --short\ngit branch --show-current\nnpm run typecheck",
        },
        callout: {
          type: "warning",
          title: "기존 변경을 지우지 마세요",
          text: "AI에게 ‘깨끗하게 정리해 줘’라고만 요청하면 관련 없어 보이는 사용자 변경까지 되돌릴 수 있습니다. 보존할 파일과 작업 범위를 명시하세요.",
        },
      },
      {
        heading: "2. Codex가 수정 전에 관련 파일을 설명하게 합니다",
        paragraphs: [
          "MAKEON의 게임 화면 하나도 페이지, 게임 상태, 오디오 훅, 스타일, 저장 로직으로 나뉩니다. 화면에 보이는 컴포넌트만 수정하면 기록이나 모바일 상태가 깨질 수 있습니다. 그래서 첫 요청은 구현이 아니라 ‘관련 파일을 찾고 현재 흐름을 설명해 달라’로 시작합니다.",
        ],
        subsections: [
          {
            heading: "첫 분석 요청 예시",
            paragraphs: [
              "현재 라우트와 게임 규칙은 유지한다. 관련 페이지, 상태, 오디오, 저장, 스타일 파일을 찾고 각 파일의 역할과 수정 예상 범위를 먼저 설명한다. 아직 파일은 수정하지 않는다.",
            ],
          },
        ],
      },
      {
        heading: "3. 한 요청에는 한 가지 사용자 결과를 넣습니다",
        paragraphs: [
          "MAKEON Git 기록에는 디지털 촉감 놀이의 물리 효과, 소리, 모바일 패널과 장식 기능을 여러 커밋으로 나누어 개선한 흔적이 있습니다. 이후 파스텔 스택, 컬러 정렬, 메모리 게임도 각각 별도 단계로 추가했습니다.",
          "여러 미니게임과 세부 기능을 한꺼번에 요청했을 때는 각 게임의 손맛과 검수 깊이가 약했습니다. 반대로 ‘스택 게임의 판정은 유지하고 오디오만 개선’처럼 결과를 하나로 좁히면 변경 범위와 실패 원인을 확인하기 쉬웠습니다.",
        ],
        table: {
          caption: "넓은 요청과 작업 가능한 요청의 차이",
          headers: ["모호한 요청", "작업 가능한 요청"],
          rows: [
            ["게임 여러 개를 고퀄리티로 만들어 줘", "파스텔 스택의 기존 규칙을 유지하고 첫 입력 후 BGM이 시작되게 수정"],
            ["모바일도 완벽하게", "390px 화면에서 버튼이 두 줄을 넘지 않고 게임판이 가로 스크롤되지 않게 수정"],
            ["오류 없이 배포", "typecheck와 build를 실행하고 실패하면 원인 파일과 메시지를 보고"],
          ],
        },
      },
      {
        heading: "4. 유지 조건과 완료 조건을 분리해 적습니다",
        paragraphs: [
          "유지 조건은 기존 사용자가 잃으면 안 되는 것입니다. 완료 조건은 이번 작업이 끝났다고 판단할 기준입니다. MAKEON의 게임 수정에서는 라우트, 레벨, 점수, 브라우저 저장과 랭킹을 유지 조건으로 두고, 반응형과 타입 검사를 완료 조건에 넣었습니다.",
        ],
        codeBlock: {
          label: "복사 가능한 Codex 요청",
          code: "목표: [사용자가 느낄 변화]\n현재 상태: [라우트와 동작]\n수정 범위: [관련 파일을 먼저 확인]\n유지 조건: [URL·규칙·기록·데이터]\n완료 조건: [모바일·접근성·typecheck·build]\n보고: [변경 파일·검사 결과·남은 위험]",
        },
        contextualLinks: [
          {
            prefix: "더 구체적인 템플릿은",
            label: "AI 코딩 결과의 완성도를 높이는 요청 방법",
            href: "/blog/improve-ai-coding-output-quality",
            suffix: "에 정리했습니다.",
          },
        ],
      },
      {
        heading: "5. 수정 후에는 diff, 타입 검사, 빌드 순서로 확인합니다",
        paragraphs: [
          "AI가 ‘완료했다’고 말한 것은 검증 결과가 아닙니다. 변경된 파일 목록과 diff를 보고 예상하지 않은 삭제가 없는지 확인합니다. 다음으로 TypeScript 검사를 실행하고, 마지막에 프로덕션 빌드를 확인합니다.",
        ],
        codeBlock: {
          label: "검수 명령",
          code: "git status --short\ngit diff --stat\ngit diff\nnpm run typecheck\nnpm run build",
        },
        bullets: [
          "새 파일이 사이트맵이나 데이터 목록에 연결됐는지 확인",
          "서버 키가 클라이언트 코드나 diff에 들어가지 않았는지 확인",
          "사용자 변경 파일을 의도치 않게 덮지 않았는지 확인",
          "빌드 성공 후 실제 주소에서 모바일과 데스크톱을 확인",
        ],
      },
      {
        heading: "6. 잘되지 않았던 방식과 바꾼 점",
        paragraphs: [
          "처음에는 기능 목록을 길게 적으면 결과도 풍부해질 것으로 생각했습니다. 실제로는 요구가 많을수록 우선순위가 흐려지고, 겉으로만 존재하는 기능이나 단순한 효과가 생기기 쉬웠습니다. 이후 한 게임씩 완성하고 Git 커밋을 기능 단위로 나누는 방식으로 바꿨습니다.",
          "또한 소리가 난다는 설명만 보고 끝내지 않고 브라우저 자동재생 제한, 첫 입력 시점, 음소거 상태와 저장값을 함께 확인했습니다. 화면 기능은 코드 한 줄보다 사용자가 처음 들어왔을 때의 상태가 더 중요했습니다.",
        ],
      },
      {
        heading: "7. 작업을 마치기 전 체크리스트",
        paragraphs: ["다음 항목을 모두 확인한 뒤에만 공개 변경으로 봅니다."],
        bullets: [
          "현재 프로젝트와 브랜치가 맞는가",
          "기존 사용자 변경을 보존했는가",
          "관련 파일과 데이터 흐름을 먼저 확인했는가",
          "한 요청이 한 사용자 결과에 집중하는가",
          "URL, 규칙, 기록과 비밀 값 유지 조건이 있는가",
          "git diff, typecheck, build 결과를 직접 확인했는가",
          "공개 URL에서 변경을 다시 확인했는가",
        ],
      },
    ],
    faqs: [
      { question: "Codex에 프로젝트 전체 수정을 맡겨도 되나요?", answer: "가능하더라도 먼저 분석과 계획을 분리하고, 기능 단위로 수정하며 각 단계의 diff와 검사를 확인하는 편이 안전합니다." },
      { question: "VS Code에서 개발 서버만 열리면 작업이 끝난 건가요?", answer: "아닙니다. 개발 서버와 프로덕션 빌드는 다를 수 있습니다. 타입 검사와 build를 별도로 실행하고 공개 환경도 확인해야 합니다." },
      { question: "프롬프트는 길수록 좋은가요?", answer: "길이보다 목표, 현재 상태, 유지 조건과 완료 기준이 명확한지가 중요합니다. 서로 다른 기능은 여러 요청으로 나누세요." },
      { question: "Codex가 기존 파일을 삭제하려 할 때는 어떻게 하나요?", answer: "삭제 이유와 대상 파일을 먼저 설명하게 하고 Git diff를 확인하세요. 관련 없는 기존 변경은 보존하라고 요청해야 합니다." },
      { question: "오류가 나면 같은 요청을 다시 보내면 되나요?", answer: "오류 원문, 실행한 명령, 변경 파일과 예상 동작을 함께 제공하는 편이 좋습니다. 큰 요청은 재시도하기 전에 더 작은 단계로 나누세요." },
    ],
    relatedSlugs: ["build-a-website-with-ai-without-coding", "improve-ai-coding-output-quality", "nextjs-vercel-deployment-guide"],
    toolCta: {
      title: "Codex에 전달할 요청문을 먼저 정리하세요",
      description: "목표와 기능을 입력해 구조화된 AI 작업 요청을 만들 수 있습니다.",
      href: "/tools/ai-prompt-generator",
      label: "프롬프트 만들기",
    },
    sources: [
      { label: "OpenAI Codex 모범 사례", href: "https://learn.chatgpt.com/guides/best-practices" },
      { label: "OpenAI Codex 프롬프팅 안내", href: "https://learn.chatgpt.com/docs/prompting" },
      { label: "OpenAI Codex 문제 해결", href: "https://learn.chatgpt.com/docs/reference/troubleshooting" },
      { label: "Git 변경 검토 문서", href: "https://git-scm.com/docs/git-diff" },
    ],
  },
  {
    slug: "nextjs-vercel-deployment-guide",
    title: "Next.js Vercel 배포 방법: MAKEON에서 확인한 Git 연결과 오류 점검",
    seoTitle: "Next.js Vercel 배포: GitHub 연결부터 공개 확인까지",
    summary:
      "MAKEON의 Next.js 저장소를 Git main 브랜치로 관리하고 Vercel 공개 사이트에서 확인하는 과정을 배포 전 검사와 실패 지점 중심으로 설명합니다.",
    description:
      "Next.js 프로젝트의 typecheck와 build, GitHub push, Vercel production 브랜치, 환경변수, 공개 URL을 순서대로 확인하는 실제 배포 가이드입니다.",
    primaryKeyword: "Next.js Vercel 배포",
    relatedKeywords: ["Vercel GitHub 배포", "Next.js 무료 배포", "Vercel 빌드 오류", "Git main 자동 배포"],
    publishedAt: "2026-07-23",
    updatedAt: "2026-08-04",
    category: "배포 가이드",
    tags: ["웹사이트·웹앱 제작", "배포·수익화", "AI 코딩·Codex"],
    readingTime: "16분",
    featured: true,
    reviewNote: {
      checkedAt: "2026-08-04",
      environment: "MAKEON Next.js 16, GitHub main 브랜치, Vercel 공개 배포",
      notice:
        "저장소와 공개 사이트에서 확인할 수 있는 내용만 실제 사례로 적었습니다. Vercel 계정의 프로젝트 설정과 플랜은 사용자마다 다를 수 있습니다.",
    },
    sections: [
      {
        heading: "결론: push 성공, 배포 성공, 공개 반영은 세 번 따로 확인해야 합니다",
        paragraphs: [
          "Next.js를 Vercel에 배포하는 기본 흐름은 Git 저장소 연결과 production 브랜치 push입니다. 하지만 터미널에서 push가 성공했다고 바로 사이트가 바뀐 것은 아닙니다. Vercel 빌드가 성공해야 하고, 마지막으로 공개 주소에서 새 HTML과 기능을 확인해야 합니다.",
          "MAKEON은 main 브랜치와 원격 main을 맞추고 공개 Vercel 주소를 운영합니다. Search Console 인증, AdSense 코드, ads.txt와 게임 기능은 커밋 단위로 추가됐습니다. 이 글은 그 과정에서 재사용한 점검 순서를 정리한 것입니다.",
        ],
      },
      {
        heading: "1. 배포 전에 로컬 프로덕션 빌드를 통과시킵니다",
        paragraphs: [
          "개발 서버에서는 보이지 않던 타입 오류나 정적 생성 문제가 Vercel 빌드에서 나타날 수 있습니다. 원격으로 보내기 전에 같은 프로젝트에서 타입 검사와 build를 실행하면 원인 범위를 줄일 수 있습니다.",
        ],
        codeBlock: { label: "배포 전 검사", code: "npm run typecheck\nnpm run build" },
        bullets: [
          "동적 라우트의 slug가 콘텐츠 데이터와 일치하는지 확인",
          "서버 전용 코드가 클라이언트 컴포넌트로 들어가지 않았는지 확인",
          "필요한 환경변수 이름이 문서와 Vercel 설정에 모두 있는지 확인",
          "sitemap에 공개할 URL이 포함되는지 확인",
        ],
      },
      {
        heading: "2. 커밋에는 한 가지 배포 목적만 남깁니다",
        paragraphs: [
          "배포 오류가 발생했을 때 디자인, 게임 로직과 데이터베이스 변경이 한 커밋에 섞여 있으면 원인을 찾기 어렵습니다. MAKEON은 Search Console 인증, AdSense 코드, ads.txt, 랭킹 테이블 이름과 권한 수정을 서로 다른 커밋으로 남겼습니다.",
        ],
        codeBlock: {
          label: "기본 Git 확인",
          code: "git status --short\ngit diff --stat\ngit add [확인한 파일]\ngit commit -m \"변경 목적\"\ngit push origin main",
        },
        callout: {
          type: "warning",
          title: "전체 파일을 무조건 추가하지 마세요",
          text: "다른 작업 중인 파일, 환경변수 또는 임시 결과가 함께 커밋될 수 있습니다. status와 diff를 보고 이번 배포 파일만 선택하세요.",
        },
      },
      {
        heading: "3. Vercel의 production 브랜치를 확인합니다",
        paragraphs: [
          "Vercel 공식 문서에 따르면 Git 저장소를 연결하면 브랜치 push에 따라 배포가 만들어지고 production 브랜치의 변경은 프로덕션 배포가 됩니다. 일반적으로 main이 기본값이지만 프로젝트 설정에서 다른 브랜치를 지정할 수도 있습니다.",
          "push 후 배포가 시작되지 않으면 저장소 연결, production 브랜치, 배포 제외 설정과 Git 공급자 권한을 확인합니다. MAKEON이 Vercel에서 공개된다는 사실은 확인되지만, 개별 계정 화면은 이 글에서 실제 화면으로 제시하지 않습니다.",
        ],
      },
      {
        heading: "4. 환경변수는 이름, 환경, 공개 범위를 나눠 확인합니다",
        paragraphs: [
          "데이터베이스나 외부 서비스가 있는 앱은 로컬 `.env`만으로 배포되지 않습니다. Vercel 프로젝트의 Production 환경에도 필요한 값을 설정해야 합니다. 반대로 서비스 역할 키처럼 강한 권한의 값은 브라우저 번들에 들어가면 안 됩니다.",
          "MAKEON의 Supabase 랭킹은 공개 가능한 값과 서버에서만 사용하는 값을 분리합니다. 서비스 역할 키는 서버 코드에서만 읽고, 브라우저에서는 공개 키와 사용자 인증 범위만 사용합니다.",
        ],
        bullets: [
          "변수 이름의 철자와 대소문자 확인",
          "Preview와 Production 중 어느 환경에 설정했는지 확인",
          "`NEXT_PUBLIC_` 값이 공개돼도 되는지 확인",
          "비밀 키가 Git 이력이나 클라이언트 코드에 없는지 확인",
          "값 변경 후 새 배포가 필요한지 확인",
        ],
      },
      {
        heading: "5. 빌드 오류는 첫 원인부터 읽습니다",
        paragraphs: [
          "긴 로그의 마지막 ‘build failed’ 문장보다 처음 나타난 TypeScript 오류, 모듈 누락 또는 환경변수 오류가 실제 원인인 경우가 많습니다. 로컬에서도 같은 명령을 실행해 재현하고, 오류가 난 파일만 먼저 수정합니다.",
        ],
        table: {
          caption: "자주 확인하는 배포 실패 지점",
          headers: ["증상", "먼저 확인할 것"],
          rows: [
            ["모듈을 찾을 수 없음", "파일이 Git에 포함됐는지, import 대소문자가 맞는지"],
            ["TypeScript 오류", "로컬 typecheck 결과와 첫 오류 파일"],
            ["런타임 환경변수 오류", "Vercel 환경과 변수 이름, 서버·클라이언트 범위"],
            ["배포는 성공했지만 이전 화면", "production 브랜치, 배포 커밋 SHA, 브라우저 캐시"],
          ],
        },
      },
      {
        heading: "6. 공개 URL에서 코드가 아니라 사용자 결과를 확인합니다",
        paragraphs: [
          "배포 완료 화면만 보고 끝내지 않습니다. 수정한 주소를 직접 열고 제목, 본문, 버튼, 게임 상태와 모바일 레이아웃을 확인합니다. SEO 변경이라면 페이지 소스에서 verification, canonical, JSON-LD와 광고 스크립트도 확인합니다.",
        ],
        subsections: [
          {
            heading: "MAKEON에서 공개 확인한 항목",
            paragraphs: ["공개 사이트에서 sitemap과 robots, ads.txt, Search Console 인증값과 AdSense 스크립트가 접근 가능한지 분리해 확인했습니다."],
            bullets: [
              "`/sitemap.xml` HTTP 200 및 새 글 URL 포함",
              "`/robots.txt`의 사이트맵 주소",
              "`/ads.txt`의 게시자 항목",
              "블로그별 canonical과 고유 H1",
              "모바일과 데스크톱 주요 내부 링크",
            ],
          },
        ],
        contextualLinks: [
          { prefix: "검색 등록까지 이어가려면", label: "Next.js Search Console 등록 과정", href: "/blog/nextjs-google-search-console-setup", suffix: "을 확인하세요." },
          { prefix: "광고 연결 확인은", label: "Vercel AdSense 설정과 검토 과정", href: "/blog/vercel-adsense-setup-review-process", suffix: "에 정리했습니다." },
        ],
      },
      {
        heading: "7. 배포 완료 체크리스트",
        paragraphs: ["아래 항목이 모두 맞아야 이번 배포가 끝난 것입니다."],
        bullets: [
          "이번 변경 파일만 커밋했는가",
          "typecheck와 build를 통과했는가",
          "원격 저장소에 목표 커밋이 있는가",
          "Vercel 배포가 같은 커밋을 사용했는가",
          "Production 상태가 성공인가",
          "공개 주소에서 새 기능과 메타데이터가 보이는가",
          "모바일과 데스크톱에서 핵심 동작을 확인했는가",
        ],
      },
    ],
    faqs: [
      { question: "GitHub에 push하면 Vercel이 자동 배포하나요?", answer: "Git 저장소가 연결되고 해당 브랜치가 배포 대상이면 자동 배포가 만들어집니다. production 브랜치 설정과 배포 제외 규칙을 확인하세요." },
      { question: "로컬 build가 성공하면 Vercel도 반드시 성공하나요?", answer: "반드시 그렇지는 않습니다. Node 환경, 설치 파일, 환경변수와 대소문자 차이로 실패할 수 있지만 로컬 build는 많은 오류를 미리 줄여줍니다." },
      { question: "Vercel 배포가 성공했는데 사이트가 바뀌지 않았습니다", answer: "배포가 어느 브랜치와 커밋을 사용했는지, 도메인이 어느 프로젝트에 연결됐는지, 브라우저 캐시와 실제 공개 URL을 확인하세요." },
      { question: "환경변수는 GitHub에 올려도 되나요?", answer: "실제 비밀 값은 올리면 안 됩니다. 필요한 변수 이름만 `.env.example` 같은 파일에 남기고 실제 값은 Vercel 환경 설정에서 관리하세요." },
      { question: "배포 뒤 Search Console에 매번 요청해야 하나요?", answer: "모든 변경마다 개별 요청할 필요는 없습니다. 중요한 새 URL은 내부 링크와 사이트맵에 포함하고 Search Console에서 사이트맵과 색인 상태를 확인하세요." },
    ],
    relatedSlugs: ["nextjs-google-search-console-setup", "vercel-adsense-setup-review-process", "build-a-website-with-ai-without-coding"],
    sources: [
      { label: "Vercel Git 저장소 배포 문서", href: "https://vercel.com/docs/git" },
      { label: "Vercel 배포 개요", href: "https://vercel.com/docs/deployments/overview" },
      { label: "Next.js 배포 문서", href: "https://nextjs.org/docs/app/getting-started/deploying" },
      { label: "Supabase 데이터 보안 안내", href: "https://supabase.com/docs/guides/database/secure-data" },
    ],
  },
  {
    slug: "nextjs-google-search-console-setup",
    title: "Next.js 사이트를 Google Search Console에 등록한 실제 과정",
    seoTitle: "Next.js Search Console 등록: 인증·sitemap 실제 과정",
    summary:
      "MAKEON에 Google 인증 메타데이터를 넣고 sitemap과 robots를 공개한 뒤 Search Console에서 확인할 수 있도록 준비한 과정을 코드와 공개 URL 기준으로 정리했습니다.",
    description:
      "Next.js App Router에서 Google Search Console 인증 메타 태그, sitemap.ts, robots.ts를 설정하고 배포 후 공개 HTML과 URL을 확인하는 실제 과정을 설명합니다.",
    primaryKeyword: "Next.js Google Search Console 등록",
    relatedKeywords: ["Next.js 검색 등록", "구글 사이트 인증 메타태그", "Next.js sitemap", "Search Console 사이트맵"],
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    category: "검색 등록",
    tags: ["웹사이트·웹앱 제작", "배포·수익화"],
    readingTime: "13분",
    featured: true,
    reviewNote: {
      checkedAt: "2026-08-04",
      environment: "MAKEON Next.js 16 App Router, Vercel 공개 사이트, Google Search Console",
      notice:
        "저장소 커밋과 공개 HTML에서 인증 코드, sitemap과 robots 접근을 확인했습니다. Search Console 계정 내부의 색인 수와 과거 오류 화면은 공개 자료가 아니므로 확인되지 않은 상태를 만들지 않았습니다.",
    },
    sections: [
      {
        heading: "결론: 인증 태그, sitemap, robots, 공개 배포를 각각 확인해야 합니다",
        paragraphs: [
          "Next.js 사이트를 Search Console에 등록하려면 먼저 소유권을 확인하고 Google이 찾을 URL을 알려줘야 합니다. MAKEON은 루트 metadata에 Google 인증값을 넣고 `app/sitemap.ts`와 `app/robots.ts`를 만들었습니다. 이후 Git에 기록하고 Vercel 공개 주소에서 세 결과를 다시 확인했습니다.",
          "인증 성공은 사이트 소유권 확인이고 색인 성공은 별도 과정입니다. 사이트맵을 제출해도 모든 URL이 즉시 검색 결과에 나타나는 것은 아닙니다.",
        ],
      },
      {
        heading: "1. Search Console 속성과 공개 주소를 먼저 맞춥니다",
        paragraphs: [
          "이 글은 공개 Vercel 주소처럼 정확한 URL 단위로 확인하는 흐름을 설명합니다. Search Console에서 선택한 속성과 브라우저에서 여는 주소의 프로토콜, 호스트가 다르면 인증이나 URL 검사가 엇갈릴 수 있습니다.",
        ],
        bullets: [
          "공개 주소가 HTTPS로 열리는지 확인",
          "www 유무와 Vercel 기본 도메인 중 실제 사용할 주소 결정",
          "사이트 전체가 로그인 없이 열리는지 확인",
          "canonical과 sitemap이 같은 기본 주소를 사용하는지 확인",
        ],
      },
      {
        heading: "2. Next.js 루트 metadata에 Google 인증값을 넣습니다",
        paragraphs: [
          "Next.js는 metadata 객체의 `verification.google` 값을 Google 사이트 인증 메타 태그로 출력할 수 있습니다. MAKEON은 모든 페이지가 공유하는 루트 layout의 metadata에 값을 추가했습니다. 인증값 전체를 글이나 스크린샷에 공개할 필요는 없습니다.",
        ],
        codeBlock: {
          label: "구조 예시",
          code: "export const metadata: Metadata = {\n  verification: {\n    google: process.env.GOOGLE_SITE_VERIFICATION,\n  },\n};",
        },
        callout: {
          type: "note",
          title: "예시와 실제 구현",
          text: "프로젝트 정책에 따라 환경변수 또는 검증값을 직접 사용할 수 있습니다. 중요한 것은 배포된 HTML의 head에서 Google이 읽을 수 있는 태그가 출력되는지 확인하는 것입니다.",
        },
      },
      {
        heading: "3. sitemap.ts에 검색에 공개할 URL만 포함합니다",
        paragraphs: [
          "MAKEON의 sitemap은 홈, 블로그, 도구, 정책 페이지와 각 블로그 슬러그를 포함합니다. `/api` 같은 서버 엔드포인트나 사용자별 화면은 넣지 않습니다. 글의 수정일은 콘텐츠의 `updatedAt`을 사용합니다.",
        ],
        codeBlock: {
          label: "Next.js sitemap 핵심 형태",
          code: "export default function sitemap(): MetadataRoute.Sitemap {\n  return posts.map((post) => ({\n    url: `${siteUrl}/blog/${post.slug}`,\n    lastModified: new Date(post.updatedAt ?? post.publishedAt),\n  }));\n}",
        },
        bullets: [
          "HTTP 200으로 공개되는 canonical URL만 포함",
          "새 글이 콘텐츠 목록에 추가되면 sitemap에도 포함되는지 확인",
          "실제 변경일과 무관한 날짜를 모든 페이지에 반복하지 않기",
          "삭제·리다이렉트된 주소를 오래 남겨두지 않기",
        ],
      },
      {
        heading: "4. robots.ts에서 sitemap 위치를 알립니다",
        paragraphs: [
          "MAKEON robots 설정은 일반 페이지 크롤링을 허용하고 API 경로는 제외하며 sitemap의 전체 주소를 제공합니다. robots는 색인 승인을 보장하는 파일이 아니라 크롤러가 접근 규칙과 사이트맵 위치를 확인하는 자료입니다.",
        ],
        codeBlock: {
          label: "robots 구조 예시",
          code: "return {\n  rules: { userAgent: \"*\", allow: \"/\", disallow: \"/api/\" },\n  sitemap: `${siteUrl}/sitemap.xml`,\n  host: siteUrl,\n};",
        },
      },
      {
        heading: "5. Git에 기록하고 Vercel 공개 HTML을 확인합니다",
        paragraphs: [
          "MAKEON Git 기록에는 `Add Google Search Console verification`과 `Prepare MAKEON for Google Search indexing` 커밋이 별도로 남아 있습니다. 소유권 인증과 검색 파일 준비를 한 번에 뭉치지 않아 변경 목적을 확인할 수 있습니다.",
          "배포 후에는 홈 페이지 소스에서 `google-site-verification` 태그를 찾고 `/sitemap.xml`, `/robots.txt`를 직접 열었습니다. 로컬 파일이 존재하는 것만으로는 Search Console이 접근할 수 없습니다.",
        ],
        contextualLinks: [
          { prefix: "배포 확인 방법은", label: "Next.js Vercel 배포 가이드", href: "/blog/nextjs-vercel-deployment-guide", suffix: "에서 이어서 볼 수 있습니다." },
        ],
      },
      {
        heading: "6. Search Console에서는 사이트맵과 URL 검사를 다르게 사용합니다",
        paragraphs: [
          "사이트맵 보고서는 Google에 사이트맵 위치를 알려주고 가져오기 상태를 확인하는 곳입니다. URL 검사는 특정 페이지의 Google 색인 정보, 크롤링 가능성과 canonical을 확인하는 도구입니다.",
          "Google은 많은 새 URL과 수정 URL을 알릴 때 사이트맵을 사용하고, 중요한 개별 페이지는 URL 검사로 상태를 확인하도록 안내합니다. 색인 요청에는 한도가 있으며 요청이 검색 노출을 보장하지 않습니다.",
        ],
        table: {
          caption: "Search Console 기능 구분",
          headers: ["기능", "사용 목적", "확인할 결과"],
          rows: [
            ["소유권 확인", "사이트 관리 권한 증명", "인증된 속성"],
            ["사이트맵", "여러 공개 URL 알림", "가져오기 성공과 발견 URL"],
            ["URL 검사", "개별 URL 진단", "크롤링, 색인, canonical"],
          ],
        },
      },
      {
        heading: "7. 최종 확인 체크리스트",
        paragraphs: ["등록 뒤 아래 항목을 다시 확인합니다."],
        bullets: [
          "Search Console 속성과 canonical 기본 주소가 같은가",
          "공개 HTML에 인증 메타 태그가 있는가",
          "sitemap.xml과 robots.txt가 로그인 없이 200으로 열리는가",
          "사이트맵의 URL이 실제로 200을 반환하는가",
          "새 글이 내부 링크와 sitemap에 모두 연결됐는가",
          "URL 검사에서 크롤링 차단이나 예상 밖 canonical이 없는가",
          "색인 요청을 승인이나 검색 순위 보장으로 오해하지 않았는가",
        ],
      },
    ],
    faqs: [
      { question: "인증 메타 태그는 모든 페이지에 있어야 하나요?", answer: "루트 layout에서 출력하면 일반적으로 사이트 페이지가 공유합니다. Search Console에서 지정한 확인 방식과 공개 HTML 출력을 기준으로 확인하세요." },
      { question: "사이트맵을 제출하면 바로 검색되나요?", answer: "아닙니다. 사이트맵은 URL 발견을 돕지만 크롤링과 색인, 검색 노출을 보장하지 않습니다." },
      { question: "URL 검사를 모든 글에 실행해야 하나요?", answer: "중요한 새 글이나 문제를 진단할 때 사용할 수 있습니다. 많은 URL은 갱신된 sitemap과 내부 링크로 알리는 편이 효율적입니다." },
      { question: "robots.txt가 있으면 색인이 보장되나요?", answer: "아닙니다. robots는 크롤링 규칙을 전달합니다. 콘텐츠 품질, canonical, 접근 상태와 Google의 색인 판단은 별도입니다." },
      { question: "Vercel 기본 도메인도 Search Console에 등록할 수 있나요?", answer: "소유권 확인이 가능한 공개 주소라면 URL 접두어 속성으로 검토할 수 있습니다. 향후 맞춤 도메인으로 이전할 계획이라면 canonical과 속성 관리 계획도 세워야 합니다." },
    ],
    relatedSlugs: ["nextjs-vercel-deployment-guide", "vercel-adsense-setup-review-process", "build-a-website-with-ai-without-coding"],
    sources: [
      { label: "Google Search Console URL 검사 도구", href: "https://support.google.com/webmasters/answer/9012289?hl=ko" },
      { label: "Google Search Console 사이트맵 보고서", href: "https://support.google.com/webmasters/answer/7451001?hl=ko" },
      { label: "Next.js generateMetadata verification", href: "https://nextjs.org/docs/app/api-reference/functions/generate-metadata" },
      { label: "Next.js sitemap.xml 파일 규칙", href: "https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap" },
    ],
  },
  {
    slug: "vercel-adsense-setup-review-process",
    title: "Vercel 사이트에 AdSense 코드를 넣고 검토 요청한 과정",
    seoTitle: "Vercel AdSense 설정: 코드·ads.txt·검토 요청 과정",
    summary:
      "MAKEON의 Next.js 루트에 AdSense 코드를 넣고 ads.txt를 공개한 뒤 사이트 검토를 요청했지만 콘텐츠 품질 사유로 승인되지 않은 과정을 사실대로 정리했습니다.",
    description:
      "Vercel에 배포한 Next.js 사이트에서 AdSense 스크립트와 ads.txt를 설정하고 공개 HTML을 확인한 과정, 코드 연결과 콘텐츠 승인의 차이를 설명합니다.",
    primaryKeyword: "Vercel AdSense 설정",
    relatedKeywords: ["Next.js 애드센스 코드", "Vercel ads.txt", "애드센스 검토 요청", "가치가 별로 없는 콘텐츠"],
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    category: "배포·수익화",
    tags: ["배포·수익화", "웹사이트·웹앱 제작"],
    readingTime: "14분",
    featured: true,
    reviewNote: {
      checkedAt: "2026-08-04",
      environment: "MAKEON Next.js 16, Vercel 공개 사이트, Google AdSense 사이트 검토",
      notice:
        "MAKEON은 현재 AdSense 승인 사례가 아닙니다. 공개 코드와 ads.txt 연결은 확인됐지만 콘텐츠 품질 사유로 승인되지 않았으며, 이 글은 실패와 개선 과정을 포함합니다.",
    },
    sections: [
      {
        heading: "결론: 광고 코드 연결에 성공해도 AdSense 승인을 의미하지 않습니다",
        paragraphs: [
          "MAKEON은 공개 사이트의 모든 주요 페이지에 AdSense 스크립트가 한 번씩 출력되고, 루트의 ads.txt도 정상적으로 열립니다. 그 상태에서 사이트 검토를 진행했지만 ‘가치가 별로 없는 콘텐츠’ 사유로 승인되지 않았습니다.",
          "이 경험에서 확인한 핵심은 연결 문제와 콘텐츠 심사를 분리해야 한다는 것입니다. 스크립트와 ads.txt는 Google이 사이트와 게시자 정보를 확인하는 기술 설정이고, 승인은 사이트 전체 콘텐츠와 정책을 별도로 검토한 결과입니다.",
        ],
        callout: {
          type: "warning",
          title: "승인 후기 아님",
          text: "이 글은 승인 성공을 약속하거나 우회 방법을 소개하지 않습니다. 실제 설정, 거절 결과와 재검토 전에 개선한 항목을 기록합니다.",
        },
      },
      {
        heading: "1. 사이트 검토 전에 기본 페이지와 공개 상태를 확인했습니다",
        paragraphs: [
          "광고 코드부터 넣기 전에 홈, 블로그, 도구, 소개, 문의와 개인정보처리방침이 공개되는지 확인했습니다. 로그인 없이 열리고 내부 링크가 정상이어야 검토자가 사이트를 탐색할 수 있습니다.",
        ],
        bullets: [
          "HTTPS 공개 주소와 canonical 일치",
          "소개, 문의, 개인정보처리방침 접근 가능",
          "블로그와 도구 상세 URL HTTP 200",
          "깨진 메뉴와 비어 있는 페이지가 없는지 확인",
          "콘텐츠보다 광고가 먼저 보이는 구조를 사용하지 않음",
        ],
      },
      {
        heading: "2. Next.js 루트 layout에 AdSense 스크립트를 한 번 넣었습니다",
        paragraphs: [
          "Google은 사이트 연결 코드 조각을 페이지의 head 안에 넣는 방법을 안내합니다. MAKEON은 모든 페이지가 공유하는 루트 layout에 비동기 스크립트를 배치했습니다. 각 글이나 도구 페이지에 같은 스크립트를 반복해서 넣지 않았습니다.",
        ],
        codeBlock: {
          label: "게시자 번호를 숨긴 구조 예시",
          code: "<Script\n  async\n  src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX\"\n  crossOrigin=\"anonymous\"\n  strategy=\"beforeInteractive\"\n/>",
        },
        callout: {
          type: "note",
          title: "공개 식별자와 비밀 키",
          text: "AdSense 게시자 ID는 광고 요청과 ads.txt에 사용되는 공개 식별자입니다. 계정 로그인 정보나 인증 토큰과는 다르며 그런 비밀 정보는 코드에 넣으면 안 됩니다.",
        },
      },
      {
        heading: "3. public/ads.txt를 만들고 루트 주소에서 확인했습니다",
        paragraphs: [
          "MAKEON 저장소에는 `Add AdSense ads.txt` 커밋이 있고 파일은 `public/ads.txt`에 있습니다. Next.js가 배포되면 사이트 루트의 `/ads.txt`로 제공됩니다. 브라우저에서 직접 열어 HTTP 200과 게시자 행을 확인했습니다.",
        ],
        codeBlock: {
          label: "형식 예시",
          code: "google.com, pub-XXXXXXXX, DIRECT, f08c47fec0942fa0",
        },
        bullets: [
          "파일 이름이 정확히 ads.txt인지 확인",
          "사이트 루트에서 리다이렉트 없이 열리는지 확인",
          "AdSense 계정의 게시자 ID와 같은지 확인",
          "복수 판매자를 사용할 때는 각 안내에 맞는 행을 별도로 관리",
        ],
      },
      {
        heading: "4. Git push와 Vercel 배포 후 공개 HTML을 검사했습니다",
        paragraphs: [
          "저장소에 코드가 있어도 배포되지 않았다면 AdSense가 볼 수 없습니다. MAKEON은 AdSense 인증 코드와 ads.txt를 서로 다른 커밋으로 남겼고, 공개 페이지 HTML에서 스크립트가 한 번 출력되는지 검사했습니다.",
          "검사할 때는 React 컴포넌트 파일이 아니라 실제 공개 주소의 HTML을 기준으로 봅니다. ads.txt도 로컬 파일 존재 여부보다 공개 루트 응답이 중요합니다.",
        ],
        contextualLinks: [
          { prefix: "배포 상태를 나눠 확인하는 방법은", label: "Next.js Vercel 배포 가이드", href: "/blog/nextjs-vercel-deployment-guide", suffix: "에 정리했습니다." },
        ],
      },
      {
        heading: "5. 검토 요청 뒤 콘텐츠 품질 사유로 승인되지 않았습니다",
        paragraphs: [
          "코드 연결과 공개 파일이 정상이어도 MAKEON은 승인되지 않았습니다. 거절 사유는 ‘가치가 별로 없는 콘텐츠’였습니다. 따라서 같은 코드를 다시 넣거나 글 수만 늘리는 방식으로는 원인을 해결했다고 보기 어려웠습니다.",
          "기존 글을 점검해 보니 분량과 FAQ는 있었지만 MAKEON이 실제로 어떤 파일을 바꾸고 어떤 오류를 겪었는지 설명하는 부분이 약했습니다. 작성자도 ‘MAKEON 편집팀’이라는 브랜드 표기만 있어 실제 운영 방식과 검증 기준이 충분히 드러나지 않았습니다.",
        ],
        table: {
          caption: "거절 후 나눈 개선 항목",
          headers: ["영역", "확인된 문제", "개선 방향"],
          rows: [
            ["블로그", "일반적인 AI 설명 반복", "Git과 코드로 확인되는 실제 과정 추가"],
            ["도구 페이지", "일부 설명이 짧음", "사용법, 결과 해석, 한계, 개인정보와 FAQ 보강"],
            ["작성자", "브랜드 표기 중심", "초보 운영자 관점과 검증 방법 공개"],
            ["내부 링크", "비슷한 추천 반복", "제작·배포·검색·게임 주제별 연결"],
          ],
        },
      },
      {
        heading: "6. CMP는 코드 검색만으로 설정 여부를 단정하지 않았습니다",
        paragraphs: [
          "Google은 EEA, 영국과 스위스 사용자에게 광고를 제공할 때 동의 관리 요구사항을 안내합니다. Google CMP는 AdSense의 개인정보 보호 및 메시지 설정에서 운영할 수 있어 저장소 HTML에 별도 문자열이 항상 보이지 않을 수 있습니다.",
          "MAKEON 공개 정적 HTML과 저장소에서는 CMP 설정 상태를 확정할 수 없었습니다. 따라서 ‘설정 완료’라고 쓰지 않고 AdSense 대시보드에서 유럽 규정 메시지, 대상 사이트와 게시 상태를 별도로 확인할 항목으로 남겼습니다.",
        ],
      },
      {
        heading: "7. 재검토 요청 전에 확인할 체크리스트",
        paragraphs: ["아래 항목을 충족한 뒤 충분한 시간을 두고 재검토를 요청할 계획입니다."],
        bullets: [
          "AdSense 스크립트가 공개 페이지마다 중복 없이 출력되는가",
          "ads.txt가 루트에서 200으로 열리고 게시자 ID가 맞는가",
          "소개, 문의, 개인정보처리방침이 현재 운영 방식을 설명하는가",
          "글마다 실제 문제, 원인, 시도, 결과와 확인 방법이 있는가",
          "도구 페이지에 사용법, 한계, 데이터 저장과 FAQ가 있는가",
          "빈 페이지, 준비 중 문구와 실제 동작이 다른 안내를 정리했는가",
          "CMP와 개인정보 메시지 상태를 AdSense 대시보드에서 확인했는가",
          "승인되지 않은 상태를 성공 사례처럼 표현하지 않았는가",
        ],
        contextualLinks: [
          { prefix: "검색 등록과 공개 파일 확인은", label: "Next.js Search Console 등록 과정", href: "/blog/nextjs-google-search-console-setup", suffix: "도 함께 참고하세요." },
        ],
      },
    ],
    faqs: [
      { question: "AdSense 코드를 넣으면 사이트 검토가 통과하나요?", answer: "아닙니다. 코드는 사이트 연결을 위한 설정입니다. 승인 여부는 사이트 전체의 정책 준수와 콘텐츠 검토 결과에 따라 결정됩니다." },
      { question: "ads.txt가 없으면 코드 연결도 실패하나요?", answer: "AdSense는 여러 사이트 연결 방법을 안내합니다. ads.txt는 승인된 판매자 정보를 공개하는 별도 파일이므로 계정 안내에 맞춰 정확히 설정하고 크롤링 상태를 확인하세요." },
      { question: "가치가 별로 없는 콘텐츠는 글자 수를 늘리면 해결되나요?", answer: "글자 수만으로 해결됐다고 볼 수 없습니다. 사용자의 질문에 직접 답하고 실제 경험, 독창적인 설명, 명확한 작성자와 유용한 사이트 기능을 제공해야 합니다." },
      { question: "승인 전에도 광고 코드를 모든 페이지에 둘 수 있나요?", answer: "Google의 사이트 연결 안내에 맞춰 head에 코드를 둘 수 있습니다. 실제 광고 게재 가능 여부와 배치는 계정 상태와 정책을 따라야 합니다." },
      { question: "CMP가 공개 HTML에서 보이지 않으면 설정되지 않은 건가요?", answer: "반드시 그렇지는 않습니다. AdSense 대시보드에서 관리되는 메시지는 지역과 상태에 따라 표시될 수 있으므로 계정의 개인정보 보호 및 메시지 설정에서 확인해야 합니다." },
    ],
    relatedSlugs: ["monetize-an-ai-built-website", "nextjs-google-search-console-setup", "nextjs-vercel-deployment-guide"],
    sources: [
      { label: "Google AdSense 사이트 연결 안내", href: "https://support.google.com/adsense/answer/7584263?hl=ko" },
      { label: "Google AdSense ads.txt FAQ", href: "https://support.google.com/adsense/answer/9785052?hl=ko" },
      { label: "Google AdSense CMP 설정", href: "https://support.google.com/adsense/answer/7670013?hl=ko" },
      { label: "Google AdSense 사이트 광고 설정", href: "https://support.google.com/adsense/answer/7037624?hl=ko" },
    ],
  },
  {
    slug: "improve-ai-coding-output-quality",
    title: "AI 코딩 결과의 완성도를 높이는 요청 방법: 기능 목록보다 중요한 것",
    seoTitle: "AI 코딩 완성도를 높이는 프롬프트와 검수 방법",
    summary:
      "기능을 많이 적는 대신 목표, 현재 상태, 유지 조건과 완료 기준을 명확히 해 AI 코딩 결과를 실제로 개선한 MAKEON의 요청 방식을 설명합니다.",
    description:
      "AI 코딩 결과가 단순하거나 기존 기능을 깨뜨릴 때 사용하는 목표, 맥락, 제약, 완료 기준 기반 요청 템플릿과 단계별 검수 방법을 실제 게임 개선 사례로 안내합니다.",
    primaryKeyword: "AI 코딩 결과 완성도 높이기",
    relatedKeywords: ["AI 코딩 프롬프트", "Codex 프롬프트", "AI 코딩 요청 방법", "AI 웹사이트 완성도"],
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    category: "AI 코딩",
    tags: ["AI 코딩·Codex", "웹사이트·웹앱 제작", "프롬프트"],
    readingTime: "15분",
    featured: true,
    reviewNote: {
      checkedAt: "2026-08-04",
      environment: "MAKEON 게임·블로그 Git 이력, Codex 작업 흐름, Next.js·TypeScript 검사",
      notice:
        "결과 개선 사례는 MAKEON Git 기록에서 확인되는 범위 축소와 반복 수정 흐름을 기준으로 작성했습니다. 특정 AI 모델이 항상 같은 결과를 낸다는 뜻은 아닙니다.",
    },
    sections: [
      {
        heading: "결론: 기능 수보다 현재 상태와 완료 기준을 정확히 적어야 합니다",
        paragraphs: [
          "‘기능을 많이 넣어 고퀄리티로 만들어 줘’라는 요청은 목표가 커 보이지만 결과를 판단할 기준이 없습니다. AI는 무엇을 유지해야 하는지, 어느 화면이 가장 중요한지, 어떤 검사를 통과해야 하는지 추측하게 됩니다.",
          "MAKEON에서는 넓은 게임 묶음을 만든 뒤 한 게임에 집중하는 방향으로 바꾸고, 물리 효과, 오디오, 모바일과 랭킹을 여러 단계로 개선했습니다. 결과가 좋아진 지점은 기능 목록이 길어진 때가 아니라 한 번의 요청이 한 사용자 경험에 집중하기 시작한 때였습니다.",
        ],
      },
      {
        heading: "1. ‘고퀄리티’가 작업 지시로 부족한 이유",
        paragraphs: [
          "고퀄리티라는 말은 사람마다 의미가 다릅니다. 어떤 사람은 3D 그래픽을, 다른 사람은 빠른 반응과 오류 없는 저장을 중요하게 봅니다. 이 말을 측정 가능한 조건으로 바꿔야 AI와 사용자 모두 결과를 검수할 수 있습니다.",
        ],
        table: {
          caption: "추상적인 표현을 확인 가능한 기준으로 바꾸기",
          headers: ["추상 표현", "확인 가능한 기준"],
          rows: [
            ["고급스럽게", "색상 5개 이하, 카드 그림자, hover·active, 모바일 간격 수치"],
            ["현실적인 액체", "유리 하이라이트, 메니스커스, 층 구분, 250~450ms 이동"],
            ["반응형", "390px와 1440px에서 가로 스크롤 없이 핵심 버튼 노출"],
            ["오류 없이", "TypeScript typecheck와 production build 통과"],
          ],
        },
      },
      {
        heading: "2. 먼저 현재 프로젝트에서 유지할 것을 찾습니다",
        paragraphs: [
          "새로 만드는 것보다 기존 프로젝트를 안전하게 바꾸는 일이 어렵습니다. MAKEON의 파스텔 컬러 정렬을 리디자인할 때도 게임 규칙, 라우트, 레벨, 기록과 랭킹 구조를 유지 조건으로 두었습니다. 비주얼만 보고 상태 구조를 바꾸면 사용자의 진행 기록이 사라질 수 있기 때문입니다.",
        ],
        bullets: [
          "현재 라우트와 외부에서 연결된 URL",
          "게임 판정과 점수 계산",
          "localStorage 키와 데이터 형태",
          "API와 데이터베이스 테이블",
          "광고, 검색 인증과 개인정보 안내",
          "이미 작업 중인 변경 파일",
        ],
      },
      {
        heading: "3. 목표, 맥락, 제약, 완료 조건을 한 세트로 적습니다",
        paragraphs: [
          "OpenAI의 Codex 안내도 작업 목표와 맥락, 제약, 완료 조건을 구체적으로 제공하고 계획과 검증을 포함하는 방식을 권합니다. MAKEON에서는 여기에 ‘먼저 관련 파일을 설명할 것’과 ‘변경 파일 목록을 보고할 것’을 추가했습니다.",
        ],
        codeBlock: {
          label: "MAKEON에서 사용하는 요청 템플릿",
          code: "목표\n- 사용자가 느껴야 할 변화 한 가지\n\n현재 상태\n- 라우트, 기술, 이미 동작하는 기능\n\n유지 조건\n- URL, 규칙, 기록, 데이터, 광고 코드\n\n수정 조건\n- 시각·동작·모바일 기준을 수치로 작성\n\n완료 조건\n- 접근성, typecheck, build, 공개 확인\n\n작업 방식\n- 관련 파일 설명 → 구현 → 검사 → 변경 목록 보고",
        },
      },
      {
        heading: "4. MAKEON에서 잘되지 않았던 요청 방식",
        paragraphs: [
          "디지털 휴식 놀이터를 넓게 확장했을 때 기능은 늘었지만 각 놀이의 깊이와 사용 목적이 흐려졌습니다. Git 기록에는 1단계 놀이터 추가, 전체 게임 확장, 이후 파스텔 스택 게임으로 교체한 흐름이 남아 있습니다.",
          "이 경험만으로 AI가 많은 기능을 만들 수 없다고 말할 수는 없습니다. 문제는 한 번의 검수 범위가 너무 커졌다는 점입니다. 모든 게임의 물리, 소리, 모바일, 저장과 접근성을 한 번에 확인하기 어려웠습니다.",
        ],
        subsections: [
          {
            heading: "바꾼 방식",
            paragraphs: [
              "한 게임을 공개 가능한 수준까지 다듬은 뒤 다음 게임을 추가했습니다. 파스텔 스택 이후 컬러 정렬, 메모리 게임이 각각 별도 커밋으로 추가됐고, BGM과 시각 개선도 별도 단계로 진행했습니다.",
            ],
          },
        ],
      },
      {
        heading: "5. 구현 요청과 검수 요청을 분리합니다",
        paragraphs: [
          "AI가 자신의 변경을 설명하는 것과 실제 오류를 찾는 것은 다릅니다. 구현이 끝나면 같은 목표를 기준으로 별도 검수를 요청합니다. 이때 칭찬이나 요약보다 깨진 조건, 누락된 상태와 재현 단계를 찾도록 요청합니다.",
        ],
        codeBlock: {
          label: "검수 요청 예시",
          code: "방금 변경을 새로 구현하지 말고 검수해 줘.\n1. 유지 조건이 깨진 곳\n2. 모바일 390px 문제\n3. 키보드·스크린리더 문제\n4. 저장값과 초기 상태 불일치\n5. TypeScript·build 오류\n6. 실제로 확인하지 못한 항목\n을 파일과 근거별로 보고해 줘.",
        },
      },
      {
        heading: "6. 화면, 상태, 데이터, 배포 네 층을 확인합니다",
        paragraphs: [
          "화면이 예뻐도 새로고침 후 기록이 사라지거나 API가 실패하면 완성된 기능이 아닙니다. 반대로 타입 검사가 성공해도 버튼이 모바일에서 가려질 수 있습니다. 서로 다른 층을 분리해 확인해야 합니다.",
        ],
        table: {
          caption: "AI 코딩 결과 검수 층",
          headers: ["층", "확인 질문"],
          rows: [
            ["화면", "모바일·데스크톱에서 읽고 누를 수 있는가"],
            ["상태", "초기값, 재시작, 음소거와 저장이 일관적인가"],
            ["데이터", "권한, 개인정보, 실패 응답을 안전하게 처리하는가"],
            ["배포", "typecheck·build·공개 URL이 같은 결과인가"],
          ],
        },
        contextualLinks: [
          { prefix: "Codex 작업 순서는", label: "Codex VS Code 실제 사용법", href: "/blog/codex-vscode-guide", suffix: "에서 자세히 볼 수 있습니다." },
          { prefix: "공개 검수는", label: "Next.js Vercel 배포 점검", href: "/blog/nextjs-vercel-deployment-guide", suffix: "으로 이어집니다." },
        ],
      },
      {
        heading: "7. 완성도를 높이는 최종 체크리스트",
        paragraphs: ["다음 요청을 보내기 전에 아래 항목을 채웁니다."],
        bullets: [
          "사용자 결과를 한 문장으로 적었는가",
          "현재 라우트와 동작을 설명했는가",
          "유지할 규칙, 기록과 데이터가 무엇인지 적었는가",
          "추상적인 품질 표현을 수치와 상태로 바꿨는가",
          "한 번의 요청에 검수 가능한 범위만 넣었는가",
          "구현과 검수를 별도 단계로 나눴는가",
          "화면, 상태, 데이터, 배포를 모두 확인했는가",
          "확인하지 못한 결과를 성공했다고 쓰지 않았는가",
        ],
      },
    ],
    faqs: [
      { question: "AI 코딩 프롬프트는 길수록 완성도가 높아지나요?", answer: "아닙니다. 길이보다 목표와 우선순위, 유지 조건, 완료 기준이 충돌 없이 명확한지가 중요합니다." },
      { question: "기능을 여러 개 요청하면 비용과 시간을 줄일 수 있나요?", answer: "초안은 빠를 수 있지만 검수 범위가 커져 누락을 찾기 어렵습니다. 서로 의존하지 않는 작은 단계로 나누는 편이 수정 비용을 줄일 수 있습니다." },
      { question: "디자인 품질은 어떻게 수치로 요청하나요?", answer: "화면 폭, 여백, 색상 수, 애니메이션 시간, hover·active 상태, 줄 수와 가로 스크롤 여부처럼 관찰 가능한 기준으로 바꿉니다." },
      { question: "AI가 완료했다고 하면 build는 생략해도 되나요?", answer: "생략하면 안 됩니다. 설명과 실제 실행 결과는 다를 수 있으므로 프로젝트의 typecheck, 테스트와 production build를 직접 확인하세요." },
      { question: "기존 기능을 유지하려면 무엇을 적어야 하나요?", answer: "라우트, 사용자 규칙, 저장 키, 데이터 구조, API, 점수와 랭킹, 검색·광고 코드처럼 외부 사용자와 연결된 계약을 구체적으로 적으세요." },
    ],
    relatedSlugs: ["better-prompts-for-ai-coding", "codex-vscode-guide", "build-a-mini-app-with-ai", "build-a-website-with-ai-without-coding"],
    toolCta: {
      title: "목표와 완료 기준이 있는 요청문을 만드세요",
      description: "막연한 아이디어를 AI가 검수할 수 있는 구조화된 프롬프트로 바꿉니다.",
      href: "/tools/ai-prompt-generator",
      label: "무료 프롬프트 생성기",
    },
    sources: [
      { label: "OpenAI Codex 모범 사례", href: "https://learn.chatgpt.com/guides/best-practices" },
      { label: "OpenAI Codex 프롬프팅 안내", href: "https://learn.chatgpt.com/docs/prompting" },
      { label: "OpenAI Codex 문제 해결", href: "https://learn.chatgpt.com/docs/reference/troubleshooting" },
    ],
  },
];
