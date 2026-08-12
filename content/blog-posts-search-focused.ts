import type { BlogPost } from "@/types/content";

export const searchFocusedPostSlugs = [
  "codex-error-troubleshooting-guide",
  "adsense-low-value-content-checklist",
  "better-prompts-for-ai-coding",
  "vercel-deployment-error-guide",
  "reuse-supabase-project-multiple-apps",
] as const;

export const searchFocusedPosts: BlogPost[] = [
  {
    slug: "codex-error-troubleshooting-guide",
    title: "Codex 작업이 멈추거나 실패할 때 해결하는 순서 7가지",
    seoTitle: "Codex 오류 해결: 작업이 멈추거나 실패할 때 7단계",
    summary:
      "Codex가 응답을 멈추거나 명령·로그인·검사 단계에서 실패했을 때, 무작정 다시 실행하지 않고 원인을 좁히는 순서를 정리했습니다.",
    description:
      "Codex 작업이 멈추거나 실패할 때 기다릴지 중단할지 판단하고, 폴더·권한·로그인·오류 로그·검사 명령을 7단계로 확인하는 초보자용 해결 가이드입니다.",
    primaryKeyword: "Codex 오류 해결",
    relatedKeywords: [
      "Codex 작업 멈춤",
      "Codex 실패 해결",
      "Codex 명령 멈춤",
      "Codex 로그인 오류",
      "Codex 작업 재개",
    ],
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-12",
    category: "Codex 가이드",
    tags: ["AI 코딩·Codex"],
    readingTime: "13분",
    reviewNote: {
      checkedAt: "2026-08-10",
      environment: "Codex 앱·IDE·CLI의 일반적인 로컬 프로젝트 작업 흐름",
      notice:
        "Codex의 화면, 인증 방식과 명령 이름은 업데이트나 사용 환경에 따라 달라질 수 있습니다. 이 글은 특정 버전 번호를 전제로 하지 않으며, 현재 화면과 OpenAI 공식 문서를 함께 확인하세요.",
    },
    sections: [
      {
        heading: "결론: 다시 실행하기 전에 ‘어디에서 멈췄는지’부터 분리하세요",
        paragraphs: [
          "Codex 작업이 멈추거나 실패했을 때 가장 먼저 할 일은 같은 요청을 반복하는 것이 아닙니다. 답변 생성, 파일 읽기, 명령 실행, 로그인, 네트워크, TypeScript 검사, 배포 중 어느 단계에서 멈췄는지 구분해야 합니다. 단계가 달라지면 해결 방법도 달라집니다.",
          "특히 개발 서버처럼 원래 종료되지 않는 명령과 실제로 멈춘 명령을 구분해야 합니다. `npm run dev`는 사용자가 중단할 때까지 실행되는 것이 정상인 반면, `git status`가 오랫동안 응답하지 않는다면 저장소나 프로세스 상태를 살펴봐야 합니다.",
        ],
        table: {
          caption: "Codex 작업 상태를 먼저 구분하는 표",
          headers: ["보이는 상태", "가능한 원인", "첫 행동"],
          rows: [
            ["계속 실행 중", "개발 서버·감시 명령처럼 종료되지 않는 작업", "정상 대기 명령인지 확인하고 필요하면 안전하게 중단"],
            ["승인 대기", "파일 쓰기·네트워크·외부 앱 접근 권한 필요", "화면의 승인 요청과 정확한 작업 범위 확인"],
            ["로그인 필요", "GitHub·Vercel·외부 서비스 세션 만료", "별도 상태 명령으로 로그인 확인"],
            ["명령 실패", "첫 오류보다 마지막 종료 문구만 보고 있음", "로그에서 최초 오류와 실행 명령 기록"],
            ["응답 없음", "도구 프로세스·네트워크·매우 큰 작업", "경과 시간과 마지막 출력 확인 후 중단 여부 결정"],
          ],
        },
      },
      {
        heading: "1. 마지막 정상 단계와 마지막 출력 한 줄을 기록합니다",
        paragraphs: [
          "‘Codex가 안 돼요’만으로는 원인을 찾기 어렵습니다. 실행 중이던 요청, 마지막으로 보인 도구 이름이나 명령, 마지막 출력, 기다린 시간을 적어 두세요. 파일 수정은 끝났는데 검사에서 멈춘 것인지, 수정 자체가 시작되지 않은 것인지도 구분합니다.",
          "작업을 재개할 때는 ‘기존 명령을 이어서 실행하지 말고 저장된 파일과 Git 상태부터 확인해줘’처럼 안전한 확인 지점을 지정할 수 있습니다. 이렇게 하면 이미 저장된 변경을 잃거나 같은 장시간 명령을 반복할 가능성을 줄일 수 있습니다.",
        ],
        bullets: [
          "요청한 작업과 실제로 시작된 단계",
          "마지막 출력 또는 오류의 첫 줄",
          "마지막 출력 이후 경과 시간",
          "이미 저장된 변경 파일 존재 여부",
          "중단해도 되는 명령인지 여부",
        ],
      },
      {
        heading: "2. 기다려야 하는 명령과 종료해야 하는 명령을 구분합니다",
        paragraphs: [
          "빌드나 패키지 설치는 프로젝트 크기와 네트워크에 따라 시간이 걸릴 수 있습니다. 반면 개발 서버, 파일 감시, 지속 로그 출력은 스스로 종료되지 않는 명령입니다. 요청할 때 검사별 제한 시간을 적고, 초과하면 프로세스를 중단한 뒤 마지막 출력만 보고하도록 하면 장시간 정지를 예방할 수 있습니다.",
        ],
        table: {
          caption: "명령별 대기 기준 예시",
          headers: ["명령 유형", "정상적인 특징", "안전한 요청 방식"],
          rows: [
            ["git status", "대개 빠르게 종료", "2분 이상 무응답이면 중단하고 위치·프로세스 확인"],
            ["TypeScript 검사", "성공 또는 오류로 종료", "최대 시간을 정하고 오류 전문 보존"],
            ["production build", "빌드 결과와 종료 코드 출력", "개발 서버와 분리해 단독 실행"],
            ["개발 서버", "사용자가 끌 때까지 계속 실행", "화면 확인 목적이 아니면 실행하지 않기"],
            ["배포 상태 확인", "외부 서비스 응답 필요", "로그인·네트워크가 필요하면 즉시 알려 달라고 요청"],
          ],
        },
        callout: {
          type: "warning",
          title: "강제 종료 전에 확인하세요",
          text: "커밋·push·데이터 마이그레이션처럼 외부 상태를 바꾸는 작업은 중간에 끊기 전에 현재 결과를 확인해야 합니다. 불확실하면 추가 쓰기 없이 상태만 조회하세요.",
        },
      },
      {
        heading: "3. 프로젝트 폴더와 저장된 변경을 먼저 확인합니다",
        paragraphs: [
          "다른 폴더를 열었거나 프로젝트 루트가 아닌 위치에서 명령을 실행하면 파일을 찾지 못하거나 잘못된 `package.json`을 사용할 수 있습니다. 현재 작업 폴더, 프로젝트 루트의 핵심 파일, `git status`를 읽기 전용으로 확인하세요.",
        ],
        codeBlock: {
          label: "상태만 확인하는 기본 명령",
          code: "git status --short --branch\ngit diff --stat\ngit diff --name-only",
        },
        contextualLinks: [
          {
            prefix: "프로젝트 폴더를 여는 단계부터 다시 확인하려면",
            label: "Codex VS Code 사용법",
            href: "/blog/codex-vscode-guide",
            suffix: "을 참고하세요.",
          },
        ],
      },
      {
        heading: "4. 권한·로그인·네트워크 문제를 코드 오류와 분리합니다",
        paragraphs: [
          "GitHub push, 외부 문서 조회, 패키지 설치는 로컬 파일 편집과 다른 권한이 필요할 수 있습니다. 로그인 만료나 네트워크 차단을 코드 문제로 오해하면 파일을 불필요하게 수정하게 됩니다. 먼저 해당 서비스의 상태 확인 명령이나 현재 세션을 확인하고, 사용자 입력이 필요하면 기다리지 말고 알려 달라고 요청하세요.",
          "인증 오류를 해결하려고 토큰이나 비밀번호를 대화에 붙여 넣으면 안 됩니다. 로그인 화면이나 공식 CLI 절차를 사용하고, 로그를 공유할 때는 계정명·토큰·저장소 비공개 정보·환경변수 값을 가리세요.",
        ],
        codeBlock: {
          label: "GitHub CLI 인증 확인 흐름",
          code: "gh auth status\n# 로그인 만료 또는 invalid token이면 사용자가 직접 실행\ngh auth login\n# 로그인 완료 뒤 다시 확인\ngh auth status",
        },
      },
      {
        heading: "5. 로그의 마지막 줄이 아니라 첫 번째 실제 오류를 찾습니다",
        paragraphs: [
          "`exited with code 1`이나 `build failed`는 원인이라기보다 실패 결과인 경우가 많습니다. 그보다 앞에 나온 첫 TypeScript 오류, 찾지 못한 모듈, 권한 거부, 환경변수 누락을 찾으세요. 긴 로그는 명령, 첫 오류, 오류 주변 몇 줄만 정리하면 AI가 추측하는 범위를 줄일 수 있습니다.",
        ],
        codeBlock: {
          label: "오류 분석 요청 템플릿",
          code: "아래 오류를 바로 수정하지 말고 먼저 분석해줘.\n\n실행한 명령: [명령]\n정상적으로 기대한 결과: [결과]\n마지막 정상 단계: [단계]\n첫 번째 실제 오류: [비밀정보를 제거한 오류]\n최근 변경 파일: [목록]\n\n1. 가장 가능성 높은 원인\n2. 추가로 확인할 읽기 전용 명령\n3. 최소 수정 범위\n4. 수정 후 다시 실행할 검사\n순서로 설명해줘.",
        },
      },
      {
        heading: "6. 큰 요청을 작은 재현 작업으로 줄입니다",
        paragraphs: [
          "여러 파일 수정, 테스트, 커밋, push, 배포 확인을 한 요청에 묶으면 어느 단계에서 실패했는지 찾기 어렵습니다. 먼저 상태 확인, 다음으로 한 파일 수정, TypeScript 검사, build, Git 작업, 공개 확인 순서로 분리하세요. 이미 통과한 검사는 코드가 바뀌지 않았다면 반복하지 않아도 됩니다.",
        ],
        contextualLinks: [
          {
            prefix: "작업 요청 자체를 더 명확하게 쓰는 방법은",
            label: "AI 코딩 프롬프트 작성법",
            href: "/blog/better-prompts-for-ai-coding",
            suffix: "의 10가지 조건과 템플릿을 활용하세요.",
          },
        ],
      },
      {
        heading: "7. 검사를 하나씩 실행하고 결과를 고정합니다",
        paragraphs: [
          "한 명령 문자열에 설치, 검사, 빌드, 커밋과 push를 모두 묶지 마세요. TypeScript가 실패하면 build와 배포를 진행하지 않고 그 오류부터 해결합니다. 각 단계의 종료 코드와 변경 파일을 확인하면 성공했다고 잘못 판단하는 일을 줄일 수 있습니다.",
        ],
        bullets: [
          "현재 브랜치와 변경 파일 확인",
          "TypeScript 검사 단독 실행",
          "production build 단독 실행",
          "내부 링크와 핵심 페이지 확인",
          "커밋 대상 파일과 메시지 확인",
          "push 후 원격 커밋 확인",
          "배포 완료 후 실제 공개 URL 확인",
        ],
        codeBlock: {
          label: "검증 뒤 GitHub와 Vercel 확인 순서",
          code: "git status --short --branch\ngit diff --stat\ngit add [확인한 파일]\ngit commit -m \"변경 내용을 설명하는 메시지\"\ngit push origin main\n# Vercel에서 같은 커밋의 배포가 Ready인지 확인\n# 마지막으로 운영 URL을 직접 열어 새 내용을 확인",
        },
        contextualLinks: [
          {
            prefix: "배포 단계에서 실패했다면",
            label: "Next.js Vercel 배포 방법",
            href: "/blog/nextjs-vercel-deployment-guide",
            suffix: "에서 Git 연결과 로그 확인 순서를 이어서 볼 수 있습니다.",
          },
        ],
        callout: {
          type: "tip",
          title: "완료 보고도 검증 항목으로 만드세요",
          text: "‘완료’ 대신 수정 파일, 실행한 검사, 종료 결과, 확인하지 못한 항목을 나눠 보고하도록 요청하면 다음 행동을 판단하기 쉽습니다.",
        },
      },
      {
        heading: "문제 해결 사례: 장시간 작업은 저장 상태부터 다시 확인합니다",
        paragraphs: [
          "개발 서버나 프로세스 확인 단계가 장시간 끝나지 않았다면 이전 명령을 그대로 이어 가지 말고 현재 폴더, 저장된 변경 파일과 `git status`만 먼저 확인하세요. TypeScript 검사와 production build도 각각 제한 시간을 두고 따로 실행합니다.",
          "GitHub CLI 인증이 만료됐다면 코드 수정과 인증 문제를 분리합니다. `gh auth login` 완료 뒤 상태를 다시 확인하고 commit과 main push를 한 단계씩 진행하세요. push 성공만으로 끝내지 말고 Vercel 자동 배포 뒤 실제 공개 URL에서 새 HTML이 보이는지 확인합니다.",
        ],
        callout: {
          type: "note",
          title: "사례에서 얻은 원칙",
          text: "멈춘 작업을 통째로 재시도하기보다 저장 상태 → 검사 → Git → 배포 → 공개 URL 순서로 확인하면 이미 끝난 단계와 실패한 단계를 구분할 수 있습니다.",
        },
      },
    ],
    faqs: [
      {
        question: "Codex가 오래 작업 중이면 바로 중단해야 하나요?",
        answer:
          "명령 종류와 마지막 출력을 먼저 확인하세요. 개발 서버처럼 계속 실행되는 명령인지, 빌드처럼 종료되어야 하는 명령인지에 따라 판단이 다릅니다. 제한 시간을 정하고 초과 시 마지막 출력과 저장 상태를 확인하는 방식이 안전합니다.",
      },
      {
        question: "중단하면 이미 수정한 파일이 사라지나요?",
        answer:
          "항상 사라지는 것은 아닙니다. 중단 후 새 작업을 바로 시작하지 말고 `git status`와 변경 파일을 확인하면 저장된 수정 여부를 알 수 있습니다. 확인 전에 되돌리기 명령을 실행하지 마세요.",
      },
      {
        question: "오류 로그를 전부 붙여 넣어야 하나요?",
        answer:
          "실행 명령, 첫 실제 오류와 주변 문맥, 최근 변경 내용을 우선 제공하세요. 토큰, 이메일, 환경변수 값과 비공개 저장소 정보는 제거해야 합니다.",
      },
      {
        question: "TypeScript 검사를 통과하면 배포도 성공하나요?",
        answer:
          "보장되지 않습니다. production build, 환경변수, 배포 프로젝트 설정과 공개 URL을 별도로 확인해야 합니다.",
      },
    ],
    relatedSlugs: [
      "codex-vscode-guide",
      "better-prompts-for-ai-coding",
      "nextjs-vercel-deployment-guide",
      "improve-ai-coding-output-quality",
    ],
    toolCta: {
      title: "오류 수정 요청을 구조화해 보세요",
      description:
        "현재 상태, 필요한 변경과 검증 조건을 입력하면 Codex에 전달할 요청문의 첫 초안을 만들 수 있습니다.",
      href: "/tools/ai-prompt-generator",
      label: "AI 프롬프트 생성기 열기",
    },
    sources: [
      { label: "OpenAI Codex 문제 해결 공식 안내", href: "https://learn.chatgpt.com/docs/reference/troubleshooting" },
      { label: "OpenAI Codex 프롬프트 공식 안내", href: "https://learn.chatgpt.com/docs/prompting" },
      { label: "OpenAI Codex 장시간 작업 공식 안내", href: "https://learn.chatgpt.com/docs/long-running-work" },
      { label: "OpenAI Codex 인증과 세션 공식 안내", href: "https://learn.chatgpt.com/docs/reference/authentication" },
    ],
  },
  {
    slug: "adsense-low-value-content-checklist",
    title: "애드센스 ‘가치가 별로 없는 콘텐츠’ 해결 체크리스트: 무엇을 수정해야 할까?",
    seoTitle: "애드센스 가치가 별로 없는 콘텐츠 해결 체크리스트",
    summary:
      "AdSense 검토에서 콘텐츠 가치가 부족하다는 판단을 받았을 때 글 수보다 먼저 확인할 페이지 품질, 탐색, 신뢰 정보와 도구 설명을 정리했습니다.",
    description:
      "애드센스 가치가 별로 없는 콘텐츠 문제를 해결하기 위해 콘텐츠 깊이, 중복, 탐색, 정책 페이지, 무료 도구와 재검토 전 확인 사항을 점검하는 실전 체크리스트입니다.",
    primaryKeyword: "애드센스 가치가 별로 없는 콘텐츠",
    relatedKeywords: [
      "애드센스 저가치 콘텐츠 해결",
      "애드센스 승인 거절",
      "애드센스 콘텐츠 부족",
      "애드센스 재검토",
      "애드센스 승인 체크리스트",
    ],
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-12",
    category: "AI 수익화",
    tags: ["배포·Google 검색"],
    readingTime: "14분",
    reviewNote: {
      checkedAt: "2026-08-10",
      environment: "Google AdSense·Publisher Policies·Search 공식 문서와 MAKEON 공개 페이지 점검 흐름",
      notice:
        "Google은 승인에 필요한 최소 글 수나 승인 보장 공식을 공개하지 않습니다. 정책과 심사 화면은 바뀔 수 있으므로 재신청 전 공식 도움말과 계정에 표시된 사유를 우선 확인하세요.",
    },
    sections: [
      {
        heading: "결론: 글 수를 늘리기보다 페이지마다 방문 이유가 있는지 확인하세요",
        paragraphs: [
          "애드센스에서 ‘가치가 별로 없는 콘텐츠’와 비슷한 사유를 확인했다면 무작정 짧은 글을 더 만드는 것은 해결책이 아닙니다. 각 페이지가 검색자의 질문에 직접 답하고, 다른 글과 구분되는 정보·예시·도구를 제공하며, 방문자가 다음 행동을 할 수 있어야 합니다.",
          "Google의 Publisher Policies는 게시자 콘텐츠가 없거나 가치가 낮은 화면, 공사 중인 화면에 Google 광고를 허용하지 않는다고 설명합니다. 따라서 블로그 글뿐 아니라 홈, 도구, 소개, 문의, 개인정보처리방침과 탐색 구조를 사이트 전체로 점검해야 합니다.",
        ],
        callout: {
          type: "note",
          title: "승인 기준을 숫자로 단정하지 마세요",
          text: "‘글 몇 개면 승인된다’거나 ‘몇 자 이상이면 된다’는 공식 보장이 아닙니다. 페이지 수보다 독창성, 완성도, 정책 준수와 사용자 경험을 확인하세요.",
        },
      },
      {
        heading: "1. 거절 메시지와 실제 사이트 상태를 같은 날짜에 기록합니다",
        paragraphs: [
          "먼저 AdSense 화면의 정확한 사유와 확인 날짜를 기록합니다. 그다음 공개 사이트의 페이지 수, 작동하는 도구, 정책 페이지, 깨진 링크와 색인 상태를 같은 시점에 점검하세요. 과거 초안이나 로컬 화면이 아니라 Google이 접근하는 공개 URL을 기준으로 봐야 합니다.",
        ],
        bullets: [
          "AdSense에 표시된 사유와 확인 날짜",
          "공개 도메인과 HTTPS 응답",
          "robots.txt와 sitemap.xml 접근 여부",
          "블로그·도구·소개·문의·개인정보처리방침 접근 여부",
          "준비 중·빈 결과·오류 화면 존재 여부",
        ],
        contextualLinks: [
          {
            prefix: "AdSense 코드 설치와 심사 흐름 자체가 궁금하다면",
            label: "Vercel AdSense 설정과 검토 과정",
            href: "/blog/vercel-adsense-setup-review-process",
            suffix: "을 먼저 확인하세요.",
          },
        ],
      },
      {
        heading: "2. 블로그 글을 ‘검색 질문 하나를 해결하는가’로 점검합니다",
        paragraphs: [
          "제목만 다르고 결론·표·예시가 비슷한 글이 많으면 사용자는 새 글을 읽을 이유가 없습니다. 각 글의 검색 질문을 한 문장으로 적고 첫 문단이 바로 답하는지, 실제 따라 할 단계와 실패 조건이 있는지 확인하세요.",
        ],
        table: {
          caption: "블로그 글 단위 점검표",
          headers: ["확인 항목", "낮은 가치 신호", "보완 방법"],
          rows: [
            ["검색 의도", "제목은 구체적이나 본문은 일반론", "첫 문단에 답을 제시하고 단계·판단 기준 추가"],
            ["독창성", "다른 글과 같은 설명·표 반복", "한 글만 남기거나 역할을 분리하고 내부 링크"],
            ["실행 가능성", "방법을 나열하지만 예시·완료 기준 없음", "복사 예시, 체크리스트, 오류 해결 추가"],
            ["정확성", "정책·요금·화면을 날짜 없이 단정", "확인 날짜와 공식 출처, 변경 가능성 명시"],
            ["신뢰성", "하지 않은 경험을 실제 후기처럼 표현", "확인한 범위와 확인하지 못한 범위를 구분"],
          ],
        },
      },
      {
        heading: "3. 홈과 목록 페이지가 사이트의 목적을 설명하는지 확인합니다",
        paragraphs: [
          "홈은 글과 도구로 이동하는 통로이면서 MAKEON이 무엇을 제공하는지 설명해야 합니다. 블로그 목록은 제목 카드만 나열하기보다 카테고리와 요약으로 원하는 글을 찾게 해야 하고, 도구 목록은 실제 사용 가능한 기능과 준비 중 기능을 명확히 구분해야 합니다.",
        ],
        bullets: [
          "첫 화면에서 사이트 주제와 제공 가치가 보인다",
          "메뉴와 푸터에서 주요 페이지에 접근할 수 있다",
          "카드 제목·요약·분류가 실제 상세 내용과 일치한다",
          "클릭할 수 없는 버튼이나 준비 중인 빈 화면이 없다",
          "모바일에서도 메뉴·표·버튼이 잘리지 않는다",
        ],
      },
      {
        heading: "4. 무료 도구는 기능만 아니라 사용 맥락도 제공해야 합니다",
        paragraphs: [
          "입력창과 버튼만 있는 도구는 처음 방문한 사람이 무엇을 넣고 결과를 어떻게 검토해야 하는지 알기 어렵습니다. 도구의 목적, 입력 예시, 결과 사용법, 제한, 개인정보 주의사항과 관련 글을 함께 제공하세요. 기능이 실제로 동작하는지도 빈 입력, 긴 입력과 모바일에서 확인해야 합니다.",
          "MAKEON의 AI 프롬프트 생성기라면 입력 정보가 브라우저에서 어떻게 처리되는지, 생성 결과가 사실 검증을 대신하지 않는다는 점, 민감정보를 넣지 말아야 한다는 점을 안내하는 방식이 도움이 됩니다.",
        ],
        contextualLinks: [
          {
            prefix: "도구의 실제 입력과 활용 흐름은",
            label: "무료 AI 프롬프트 생성기 사용법",
            href: "/blog/free-ai-prompt-generator-guide",
            suffix: "에서 확인할 수 있습니다.",
          },
        ],
      },
      {
        heading: "5. 신뢰 페이지를 실제 운영 상태와 맞춥니다",
        paragraphs: [
          "소개 페이지에는 사이트 운영 목적과 다루는 범위를, 문의 페이지에는 실제 연락 가능한 방법을, 개인정보처리방침에는 현재 사용하는 기능과 외부 서비스의 처리 범위를 적습니다. 사용하지 않는 분석·광고·결제 기능을 이미 사용한다고 적거나 실제 문의 주소와 다른 정보를 두면 신뢰를 떨어뜨릴 수 있습니다.",
          "AdSense를 설치한 뒤에는 Google 광고, 쿠키·광고 식별자, 맞춤 광고 선택과 제3자 처리에 관한 내용을 현재 정책과 지역별 요구에 맞게 반영해야 합니다. 설치 전 상태와 설치 후 상태를 구분해 쓰는 것이 중요합니다.",
        ],
      },
      {
        heading: "6. 기술적 오류가 콘텐츠 평가를 방해하지 않게 정리합니다",
        paragraphs: [
          "좋은 글도 Googlebot이 접근하지 못하거나 canonical이 다른 주소를 가리키면 검색에 반영되기 어렵습니다. robots.txt, sitemap, canonical, HTTPS, 내부 404와 잘못된 noindex를 확인하세요. Search Console의 ‘크롤링됨 - 현재 색인이 생성되지 않음’은 즉시 기술 오류라고 단정할 수 없으므로 URL 검사 결과와 콘텐츠 품질을 함께 봐야 합니다.",
        ],
        contextualLinks: [
          {
            prefix: "Next.js 사이트를 Search Console에 연결하고 색인을 요청하는 과정은",
            label: "Next.js Google Search Console 등록 방법",
            href: "/blog/nextjs-google-search-console-setup",
            suffix: "을 참고하세요.",
          },
        ],
      },
      {
        heading: "7. 재검토를 요청하기 전 변경 내용을 다시 읽습니다",
        paragraphs: [
          "수정 직후 바로 재검토를 반복하기보다 공개 사이트에서 변경이 실제 반영됐는지 확인하세요. 글 목록과 sitemap의 URL, 내부 링크, 모바일 화면, 도구 동작, 정책 문구를 최종 점검하고 무엇을 개선했는지 기록합니다.",
        ],
        codeBlock: {
          label: "재검토 전 최종 체크리스트",
          code: "[ ] 각 글이 서로 다른 검색 질문을 해결한다\n[ ] 얕거나 중복된 문단을 통합·보완했다\n[ ] 홈·블로그·도구·소개·문의·개인정보처리방침이 완성되어 있다\n[ ] 무료 도구가 실제로 작동하고 사용법·주의사항이 있다\n[ ] 내부 링크와 sitemap에 404가 없다\n[ ] 모바일에서 가로 넘침과 가려진 버튼이 없다\n[ ] 정책·요금·기능에 확인 날짜와 공식 출처가 있다\n[ ] 광고 코드와 개인정보처리방침의 현재 상태가 일치한다",
        },
        callout: {
          type: "warning",
          title: "승인 가능성을 보장할 수는 없습니다",
          text: "체크리스트를 모두 충족해도 승인 여부는 Google의 검토 결과에 따릅니다. 사용자에게 유용한 사이트를 지속적으로 운영하는 기준으로 활용하세요.",
        },
      },
    ],
    faqs: [
      {
        question: "애드센스 승인을 받으려면 글이 몇 개 필요하나요?",
        answer:
          "Google은 승인에 필요한 최소 글 수를 공식적으로 보장하지 않습니다. 글 개수보다 각 페이지의 독창성, 완성도, 탐색과 정책 준수를 확인하세요.",
      },
      {
        question: "짧은 글은 모두 삭제해야 하나요?",
        answer:
          "길이만으로 판단하지 마세요. 짧아도 질문에 충분히 답할 수 있습니다. 검색 의도가 겹치거나 실질적인 정보가 부족하면 관련 글에 통합하거나 보완하는 편이 낫습니다.",
      },
      {
        question: "AI로 작성한 글은 애드센스 승인이 불가능한가요?",
        answer:
          "AI 사용 자체보다 사용자 가치, 독창성, 정확성, 편집과 검토가 중요합니다. 자동 생성한 내용을 검토 없이 대량 게시하거나 비슷한 페이지를 반복해서 만들지 마세요.",
      },
      {
        question: "도구 페이지에도 설명 글이 필요한가요?",
        answer:
          "사용자가 입력 방법, 결과의 의미, 제한과 개인정보 주의사항을 이해할 수 있는 설명이 도움이 됩니다. 설명은 실제 기능과 정확히 일치해야 합니다.",
      },
      {
        question: "수정 후 바로 재검토를 요청해도 되나요?",
        answer:
          "먼저 공개 배포, 링크, sitemap, 모바일 화면과 정책 문구가 모두 반영됐는지 확인하세요. 계정에 표시된 최신 안내를 읽은 뒤 재검토 절차를 진행하는 것이 좋습니다.",
      },
    ],
    relatedSlugs: [
      "vercel-adsense-setup-review-process",
      "monetize-an-ai-built-website",
      "nextjs-google-search-console-setup",
      "free-ai-prompt-generator-guide",
    ],
    sources: [
      { label: "Google 게시자 콘텐츠가 없는 화면 관련 정책", href: "https://support.google.com/publisherpolicies/answer/11112688?hl=ko" },
      { label: "Google AdSense 프로그램 정책", href: "https://support.google.com/adsense/answer/48182?hl=ko" },
      { label: "Google Search 생성형 AI 콘텐츠 안내", href: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content?hl=ko" },
      { label: "Google Search 스팸 정책", href: "https://developers.google.com/search/docs/essentials/spam-policies?hl=ko" },
    ],
  },
  {
    slug: "better-prompts-for-ai-coding",
    title: "AI 코딩 프롬프트 작성법: 원하는 결과를 얻는 10가지 조건",
    seoTitle: "AI 코딩 프롬프트 작성법: 결과를 바꾸는 10가지 조건",
    summary:
      "AI에게 코드를 맡길 때 목적, 사용자, 페이지 구조, 기능, 디자인, 기술 스택, 유지 조건, 배포와 검증을 빠뜨리지 않도록 10가지 조건과 복사 템플릿을 제공합니다.",
    description:
      "AI 코딩 프롬프트 작성법을 목적, 대상 사용자, 페이지 구조, 핵심 기능, 디자인, 기술 스택, 유지·금지 조건, 배포와 검증의 10가지 조건으로 설명합니다.",
    primaryKeyword: "AI 코딩 프롬프트 작성법",
    relatedKeywords: [
      "Codex 프롬프트 작성법",
      "AI 코딩 요청 예시",
      "ChatGPT 코딩 프롬프트",
      "웹사이트 제작 프롬프트",
      "코딩 프롬프트 템플릿",
    ],
    publishedAt: "2026-07-07",
    updatedAt: "2026-08-10",
    category: "프롬프트",
    tags: ["AI 활용·프롬프트", "AI 코딩·Codex"],
    readingTime: "15분",
    featured: true,
    reviewNote: {
      checkedAt: "2026-08-10",
      environment: "기존 Next.js 프로젝트를 Codex로 분석·수정·검증하는 작업 흐름",
      notice:
        "AI 코딩 도구의 권한, 모델과 화면은 달라질 수 있습니다. 이 글은 특정 기능 이름보다 재사용할 수 있는 요청 구조와 검증 원칙에 집중합니다.",
    },
    sections: [
      {
        heading: "결론: 좋은 프롬프트는 ‘무엇을 만들까’보다 ‘어떻게 끝났다고 확인할까’까지 적습니다",
        paragraphs: [
          "AI 코딩 프롬프트에서 원하는 결과를 얻으려면 목표만 말해서는 부족합니다. 현재 프로젝트, 수정 가능한 범위, 반드시 유지할 기능, 실패할 때의 동작과 완료 후 검증까지 알려줘야 합니다. 좋은 요청은 길기만 한 설명이 아니라 결과를 비교할 수 있는 작업 명세입니다.",
          "처음부터 완벽한 기술 용어를 알 필요는 없습니다. 누가 어떤 문제를 겪고 있는지, 지금 무엇이 동작하는지, 어떤 모습이면 완료인지 쉬운 말로 적고, 모르는 구현 방식은 프로젝트를 읽은 뒤 선택지를 제안해 달라고 하면 됩니다.",
        ],
      },
      {
        heading: "‘웹사이트 만들어줘’만으로 결과가 흔들리는 이유",
        paragraphs: [
          "짧은 요청의 문제는 글자 수가 아니라 빈칸입니다. 사이트 목적, 모바일 기준, 필요한 페이지와 제외 기능이 없으면 AI가 임의로 결정합니다. 기존 프로젝트를 수정할 때는 더 위험합니다. 정상 동작하는 메뉴나 저장 방식, SEO 코드까지 새 구조로 바꿀 수 있기 때문입니다.",
        ],
        table: {
          caption: "모호한 요청과 검증 가능한 요청 비교",
          headers: ["구분", "예시", "결과 차이"],
          rows: [
            ["모호함", "홈페이지를 세련되게 고쳐줘", "변경 범위와 보존 조건을 AI가 추측"],
            ["구체적", "홈 Hero의 제목과 CTA 간격만 조정하고 메뉴·URL·색상 변수는 유지해줘", "수정 전후를 비교하기 쉬움"],
            ["모호함", "로그인이 안 돼. 해결해줘", "재현 단계와 오류 근거가 없음"],
            ["구체적", "익명 로그인 요청의 상태 코드와 첫 오류를 분석하고 RLS·환경변수는 읽기 전용으로 확인해줘", "원인을 좁힌 뒤 최소 수정 가능"],
          ],
        },
      },
      {
        heading: "AI 코딩 프롬프트에 넣을 10가지 조건",
        paragraphs: [
          "모든 항목을 길게 쓸 필요는 없습니다. 새 기능이라면 사용자와 핵심 행동을 자세히 적고, 오류 수정이라면 현재 상태와 재현 방법을 더 자세히 적는 식으로 비중을 조절하세요.",
        ],
        subsections: [
          { heading: "1. 목적", paragraphs: ["무엇을 만드는지가 아니라 어떤 문제를 해결할지 적습니다. ‘필터 추가’보다 ‘사용자가 카테고리를 누르면 해당 글만 즉시 찾게 한다’가 분명합니다."] },
          { heading: "2. 대상 사용자와 사용 환경", paragraphs: ["초보자·관리자·모바일 사용자처럼 누가 쓰는지, 320px 모바일·키보드·터치처럼 중요한 환경을 적습니다."] },
          { heading: "3. 페이지 구조", paragraphs: ["홈·목록·상세·설정처럼 필요한 페이지와 각 페이지의 핵심 영역을 정합니다. 기존 URL을 유지해야 한다면 페이지별로 함께 적습니다."] },
          { heading: "4. 핵심 기능과 구현 우선순위", paragraphs: ["필수 기능과 가능하면 추가할 기능을 분리합니다. 첫 단계에서 해결할 핵심 행동을 하나로 제한하면 검증이 쉬워집니다."] },
          { heading: "5. 디자인 기준", paragraphs: ["색상, 여백, 카드·버튼 스타일과 참고 분위기를 설명하되 ‘예쁘게’에서 멈추지 않습니다. 기존 디자인 시스템 유지 여부와 모바일 배치도 명시합니다."] },
          { heading: "6. 현재 상태와 기술 스택", paragraphs: ["Next.js·TypeScript 같은 기술, 관련 URL, 현재 데이터 흐름, 이미 동작하는 기능과 오류 재현 순서를 제공합니다. 환경변수는 이름만 적고 비밀값은 제외합니다."] },
          { heading: "7. 기존 기능 유지 조건과 변경 범위", paragraphs: ["URL, 데이터, 로그인, SEO, 광고 코드처럼 유지할 항목과 수정 가능한 화면·기능·파일을 나눕니다. 파일을 모르면 먼저 관련 파일을 찾아 설명하게 합니다."] },
          { heading: "8. 하지 말아야 할 것과 예외 처리", paragraphs: ["데이터 삭제·force push·불필요한 패키지 추가 금지 같은 안전 경계와 로딩·실패·빈 결과·접근성 처리를 함께 정의합니다."] },
          { heading: "9. 배포 조건", paragraphs: ["로컬 확인까지만 할지, GitHub commit·main push와 Vercel 공개 반영까지 필요한지 구분합니다. 로그인이나 승인이 필요하면 기다리지 말고 보고하도록 적습니다."] },
          { heading: "10. 검증 항목과 완료 기준", paragraphs: ["TypeScript, production build, 모바일, 내부 링크, 실제 동작과 공개 URL처럼 끝났다고 판단할 증거를 적습니다. 확인하지 못한 항목은 성공으로 보고하지 않게 합니다."] },
        ],
      },
      {
        heading: "바로 복사해 사용하는 AI 코딩 프롬프트 템플릿",
        paragraphs: [
          "대괄호를 채우고 필요 없는 항목은 지우세요. 처음부터 수정하게 하기보다 분석과 계획, 구현, 검증을 분리하면 기존 기능을 지키기 쉽습니다.",
        ],
        codeBlock: {
          label: "AI 코딩 작업 요청 템플릿",
          code: "[목적]\n- 해결할 사용자 문제와 원하는 최종 동작: \n\n[대상 사용자와 환경]\n- 주요 사용자: \n- 모바일·PC·접근성 기준: \n\n[페이지 구조]\n- 필요한 페이지와 URL: \n- 페이지별 핵심 영역: \n\n[핵심 기능과 우선순위]\n- 반드시 구현할 기능: \n- 나중으로 미룰 기능: \n\n[디자인 기준]\n- 색상·여백·카드·버튼 기준: \n- 유지할 기존 디자인 시스템: \n\n[현재 상태와 기술 스택]\n- 기술과 프로젝트 구조: \n- 관련 URL·데이터 흐름: \n- 재현 순서와 첫 오류: \n\n[유지 조건과 변경 범위]\n- 반드시 유지: \n- 수정 가능한 영역: \n\n[금지 사항과 예외 처리]\n- 삭제·변경 금지: \n- 빈 상태·오류 상태: \n- 승인 없이 하지 말 것: \n\n[배포 조건]\n- 로컬 확인 / GitHub push / Vercel 반영 범위: \n- 사용자 로그인이나 승인이 필요할 때 보고: \n\n[검증과 완료 기준]\n- TypeScript 검사\n- production build\n- 모바일과 핵심 링크 확인\n- 실제 공개 URL 확인\n- 변경 파일·오류·확인하지 못한 항목 보고\n\n먼저 현재 구조를 읽고 관련 파일, 원인과 계획만 설명해줘. 그다음 승인된 범위만 수정하고 검증 명령은 하나씩 실행해줘.",
        },
      },
      {
        heading: "웹사이트 수정 요청을 단계별로 나누는 예시",
        paragraphs: [
          "큰 작업을 한 번에 요청하면 화면, 데이터, 배포 중 무엇이 실패했는지 알기 어렵습니다. 분석 단계에서는 파일을 바꾸지 않고 구조와 위험을 확인하고, 구현 단계에서는 핵심 기능 하나만 수정하고, 마지막 단계에서 검증과 외부 반영을 수행하세요.",
        ],
        bullets: [
          "1차 요청: 관련 파일, 기존 데이터 흐름, 충돌 가능성만 분석",
          "2차 요청: 승인한 파일에서 핵심 기능 하나 구현",
          "3차 요청: 오류·빈 상태와 모바일 보완",
          "4차 요청: 타입 검사와 build를 각각 실행",
          "5차 요청: Git 대상 확인 후 commit·push·공개 검증",
        ],
        contextualLinks: [
          {
            prefix: "VS Code에서 작은 수정부터 시작하는 실제 흐름은",
            label: "Codex VS Code 사용법",
            href: "/blog/codex-vscode-guide",
            suffix: "을 참고하세요.",
          },
          {
            prefix: "작업이 멈추거나 명령이 실패했다면",
            label: "Codex 오류 해결 7단계",
            href: "/blog/codex-error-troubleshooting-guide",
            suffix: "로 원인을 분리하세요.",
          },
        ],
      },
      {
        heading: "수정 요청에서는 유지할 점과 달라야 할 점을 함께 적습니다",
        paragraphs: [
          "‘다시 만들어줘’라고 하면 잘된 부분도 사라질 수 있습니다. 현재 결과에서 유지할 화면, 기대와 다른 부분, 바꿀 수치를 나눠 적으세요. 예를 들어 ‘데스크톱 카드 폭은 유지하고 390px에서 버튼만 세로 배치’처럼 확인 가능한 조건이 좋습니다.",
        ],
        contextualLinks: [
          {
            prefix: "일반 대화형 AI의 답변을 고치는 방법은",
            label: "ChatGPT가 원하는 답을 안 줄 때 프롬프트 수정 방법",
            href: "/blog/fix-chatgpt-prompts-for-better-answers",
            suffix: "에서 역할·조건·출력 형식을 진단하세요.",
          },
          {
            prefix: "구현 후 결과를 더 엄격하게 검증하려면",
            label: "AI 코딩 결과의 완성도를 높이는 요청 방법",
            href: "/blog/improve-ai-coding-output-quality",
            suffix: "의 품질 기준을 함께 사용하세요.",
          },
        ],
      },
      {
        heading: "민감정보와 파괴적 작업에는 별도 경계를 둡니다",
        paragraphs: [
          "API 키, 비밀번호, 실제 환경변수 값, 고객 정보와 비공개 저장소 정보는 프롬프트에 넣지 마세요. 데이터 삭제, migration, force push, 운영 배포처럼 되돌리기 어려운 작업은 읽기 전용 확인과 정확한 대상 검증을 먼저 요청합니다.",
        ],
        callout: {
          type: "warning",
          title: "AI의 완료 문장은 검증 결과가 아닙니다",
          text: "검사 명령의 종료 결과, 변경 diff와 실제 공개 화면을 사용자가 확인해야 합니다. 실행하지 못한 검사를 통과했다고 표현하지 않도록 보고 형식도 지정하세요.",
        },
      },
    ],
    toolCta: {
      title: "10가지 조건을 빈칸부터 채워 보세요",
      description:
        "만들고 싶은 것, 기능, 디자인, 대상 사용자와 추가 요구사항을 입력하면 ChatGPT나 Codex에 붙여넣을 요청문 초안을 만들 수 있습니다.",
      href: "/tools/ai-prompt-generator",
      label: "AI 프롬프트 생성기 열기",
    },
    faqs: [
      { question: "AI 코딩 프롬프트는 길수록 좋은가요?", answer: "아닙니다. 결과를 바꾸는 조건이 명확한지가 중요합니다. 반복 배경은 줄이고 목표, 현재 상태, 수정 범위, 유지 조건과 검증을 남기세요." },
      { question: "기술을 잘 모르면 무엇부터 적어야 하나요?", answer: "사용자 문제, 현재 화면, 원하는 동작, 유지할 기능과 완료 모습을 쉬운 말로 적으세요. 기술 선택은 프로젝트를 먼저 읽고 선택지를 설명해 달라고 요청할 수 있습니다." },
      { question: "한 번에 분석과 수정, 배포까지 요청해도 되나요?", answer: "가능하지만 큰 작업일수록 분석, 작은 구현, 검증, 외부 반영을 분리하는 편이 안전합니다. 단계가 분리되면 실패 원인과 되돌릴 지점을 찾기 쉽습니다." },
      { question: "오류 해결 요청에 꼭 필요한 정보는 무엇인가요?", answer: "실행 명령, 재현 순서, 첫 실제 오류, 기대 결과, 최근 변경을 포함하세요. 토큰과 개인정보는 제거해야 합니다." },
      { question: "프롬프트 생성기가 만든 결과를 그대로 사용해도 되나요?", answer: "첫 초안으로 사용하되 실제 프로젝트의 URL, 기술, 유지 조건, 검증 명령과 민감정보 포함 여부를 직접 확인한 뒤 사용하세요." },
    ],
    relatedSlugs: [
      "codex-vscode-guide",
      "codex-error-troubleshooting-guide",
      "improve-ai-coding-output-quality",
      "website-building-prompt-guide",
      "build-a-website-with-ai-without-coding",
    ],
    sources: [
      { label: "OpenAI Codex 프롬프트 공식 안내", href: "https://learn.chatgpt.com/docs/prompting" },
      { label: "OpenAI Codex 모범 사례", href: "https://learn.chatgpt.com/guides/best-practices" },
      { label: "OpenAI Codex 문제 해결 공식 안내", href: "https://learn.chatgpt.com/docs/reference/troubleshooting" },
    ],
  },
  {
    slug: "vercel-deployment-error-guide",
    title: "Vercel 배포 오류 해결 방법: Build Logs부터 확인하는 순서",
    seoTitle: "Vercel 배포 오류 해결: Build Logs·환경변수 점검 순서",
    summary:
      "Vercel 배포가 실패하거나 성공했는데 사이트가 바뀌지 않을 때 Build Logs의 첫 오류부터 로컬 빌드, 환경변수, Root Directory와 브랜치를 확인하는 순서입니다.",
    description:
      "Vercel 배포 오류를 Build Logs, 로컬 build, 환경변수, Root Directory, Node.js, 파일명 대소문자, Git 브랜치와 공개 도메인 순서로 해결하는 실전 가이드입니다.",
    primaryKeyword: "Vercel 배포 오류",
    relatedKeywords: [
      "Vercel build failed",
      "Vercel 배포 실패",
      "Vercel 환경변수 오류",
      "Vercel 배포 반영 안됨",
      "Next.js Vercel 오류",
    ],
    publishedAt: "2026-08-10",
    category: "배포 가이드",
    tags: ["배포·Google 검색", "웹사이트·웹앱 제작"],
    readingTime: "14분",
    reviewNote: {
      checkedAt: "2026-08-10",
      environment: "Next.js 프로젝트를 GitHub main 브랜치와 Vercel에 연결한 일반적인 배포 흐름",
      notice:
        "Vercel 대시보드 메뉴, 런타임과 플랜 제한은 변경될 수 있습니다. 특정 버전 번호를 전제로 하지 않으며 현재 Build Logs와 공식 문서를 우선 확인하세요.",
    },
    sections: [
      {
        heading: "결론: 마지막 ‘실패’ 문구보다 Build Logs의 첫 실제 오류를 찾으세요",
        paragraphs: [
          "Vercel 배포 오류는 먼저 실패 지점을 분류하면 해결 시간이 줄어듭니다. 저장소 연결 전인지, 빌드가 시작되지 않았는지, 빌드 중 실패했는지, 배포는 성공했지만 공개 주소가 바뀌지 않았는지부터 구분하세요.",
          "Vercel 공식 문제 해결 문서도 `exited with 1` 같은 마지막 결과 문구가 실제 원인이 아닐 수 있다고 안내합니다. Build Logs에서 그보다 앞에 나온 첫 TypeScript 오류, 모듈 누락, 설정 오류를 찾고 로컬에서 같은 build를 재현하는 것이 출발점입니다.",
        ],
        table: {
          caption: "Vercel 배포 상태별 첫 확인 위치",
          headers: ["보이는 상태", "첫 확인", "다음 행동"],
          rows: [
            ["배포가 생성되지 않음", "Git 연결·production 브랜치·Ignored Build Step", "push한 커밋과 연결 저장소 대조"],
            ["Build Failed", "실패한 deployment의 Build Logs", "첫 실제 오류를 로컬 build에서 재현"],
            ["로그 없이 실패", "배포 화면의 요약 메시지", "잘못된 설정·권한·빌드 시작 조건 확인"],
            ["Ready지만 기능 오류", "Runtime Logs·브라우저 Network", "서버 실행 오류와 API 응답 확인"],
            ["Ready지만 변경 안 보임", "커밋 SHA·production 도메인", "Preview와 Production, 캐시를 구분"],
          ],
        },
      },
      {
        heading: "1. 실패한 배포가 어떤 커밋에서 만들어졌는지 확인합니다",
        paragraphs: [
          "Vercel 프로젝트의 Deployments에서 실패한 항목을 열고 연결된 Git 커밋, 브랜치와 배포 환경을 확인합니다. 로컬에서 수정한 파일이 아직 commit되지 않았거나 다른 브랜치에 push되었다면 Vercel 설정을 바꿔도 해결되지 않습니다.",
        ],
        bullets: [
          "GitHub 원격 저장소와 Vercel 연결 저장소가 같은가",
          "운영 배포가 추적하는 production 브랜치가 맞는가",
          "배포 상세의 커밋 SHA가 방금 push한 커밋인가",
          "Preview URL과 운영 도메인을 혼동하지 않았는가",
          "Ignored Build Step이나 모노레포 건너뛰기 설정이 작동하지 않았는가",
        ],
        contextualLinks: [
          {
            prefix: "저장소 연결부터 정상 배포까지 처음 진행하는 중이라면",
            label: "Next.js Vercel 배포 방법",
            href: "/blog/nextjs-vercel-deployment-guide",
            suffix: "을 먼저 따라가세요.",
          },
        ],
      },
      {
        heading: "2. 배포가 만들어지지 않았다면 GitHub 권한부터 확인합니다",
        paragraphs: [
          "push는 성공했는데 Vercel에 새 deployment가 전혀 생기지 않았다면 코드보다 Git 연결을 먼저 봐야 합니다. Vercel 프로젝트의 Settings → Git에서 연결 저장소가 맞는지 확인하고, GitHub에서 Vercel 앱이 해당 저장소에 접근할 수 있는지 점검하세요. 조직 저장소는 조직 역할과 저장소 접근 권한이 모두 필요할 수 있습니다.",
          "개인 저장소와 조직 저장소, Hobby와 Pro 팀은 연결·배포 조건이 다를 수 있습니다. 특히 비공개 조직 저장소에서는 커밋 작성자와 Vercel 팀 소속 때문에 배포가 막힐 수 있으므로, 다른 계정으로 다시 push하기 전에 Vercel의 Git 연결 안내와 GitHub 앱 권한을 확인하세요.",
        ],
        table: {
          caption: "GitHub 연결 문제를 구분하는 방법",
          headers: ["증상", "확인 위치", "해결 방향"],
          rows: [
            ["Import 목록에 저장소가 없음", "GitHub의 Vercel 앱 저장소 접근 범위", "해당 저장소 접근을 허용하거나 조직 관리자에게 요청"],
            ["기존 연결 뒤 자동 배포가 멈춤", "Vercel Settings → Git의 Connected Git Repository", "연결 저장소·production 브랜치·Git 앱 상태 확인"],
            ["특정 작성자의 커밋만 배포 안 됨", "커밋 작성자와 Vercel 팀·저장소 권한", "공식 플랜별 권한 조건을 확인하고 계정 연결 정리"],
            ["GitHub check가 권한 오류", "GitHub 저장소의 Checks·Deployments와 앱 설치", "Vercel 앱 권한을 재승인한 뒤 새 커밋으로 확인"],
          ],
        },
        callout: {
          type: "note",
          title: "GitHub CLI 로그인과 Vercel Git 권한은 별개입니다",
          text: "`gh auth status`가 정상이어도 Vercel GitHub 앱의 저장소 접근 권한이 없으면 자동 배포가 생성되지 않을 수 있습니다. 로컬 push 성공 여부와 Vercel integration 권한을 각각 확인하세요.",
        },
      },
      {
        heading: "3. Build Logs에서 첫 번째 원인 오류를 찾습니다",
        paragraphs: [
          "로그 아래쪽의 종료 코드만 복사하지 말고 위로 올라가 처음 나온 구체적인 오류를 찾으세요. 파일 경로와 줄 번호가 있는 TypeScript 오류, `Module not found`, 환경변수 검증 오류처럼 행동으로 옮길 수 있는 메시지가 원인 후보입니다.",
        ],
        codeBlock: {
          label: "오류 기록 양식",
          code: "배포 커밋: [SHA 앞 7자리]\n배포 환경: [Production / Preview]\n실행된 Build Command: [명령]\n첫 실제 오류: [비밀값을 제거한 내용]\n관련 파일과 줄: [경로]\n로컬 재현 여부: [예 / 아니오]\n최근 변경: [package.json / 환경변수 / 경로 / 코드]",
        },
        callout: {
          type: "warning",
          title: "로그 공유 전 비밀정보를 제거하세요",
          text: "API 키, 토큰, 이메일, 데이터베이스 주소의 식별자와 환경변수 실제 값은 가린 뒤 필요한 오류 문맥만 공유하세요.",
        },
      },
      {
        heading: "4. 같은 커밋을 로컬 production build로 재현합니다",
        paragraphs: [
          "개발 서버가 열린다는 사실은 production build 성공을 뜻하지 않습니다. Vercel이 사용한 커밋에서 의존성을 설치하고 프로젝트의 build 스크립트를 실행하세요. 로컬에서도 실패하면 코드·타입·의존성 문제를 먼저 해결하고, 로컬만 성공하면 환경과 프로젝트 설정의 차이를 비교합니다.",
        ],
        codeBlock: {
          label: "Next.js 기본 확인",
          code: "git status --short --branch\nnpm ci\nnpm run build",
        },
        bullets: [
          "package-lock.json이 package.json 변경과 함께 commit됐는가",
          "빌드에 필요한 패키지가 dependencies 또는 devDependencies에 존재하는가",
          "로컬 전용 전역 패키지에 의존하지 않는가",
          "Windows에서만 통과하는 파일명 대소문자 차이가 없는가",
          "빌드 중 외부 API가 꼭 필요한 구조인지 확인했는가",
        ],
      },
      {
        heading: "5. 환경변수 이름·값·적용 환경을 따로 확인합니다",
        paragraphs: [
          "환경변수가 등록되어 있어도 Production에 적용되지 않았거나 이름의 철자·접두사가 코드와 다르면 누락으로 처리됩니다. 값은 화면이나 로그에 출력하지 말고 존재 여부와 적용 환경만 확인하세요. 새 환경변수는 이미 끝난 배포에 소급 적용되지 않으므로 새 배포가 필요한지도 확인합니다.",
        ],
        table: {
          caption: "환경변수 오류 진단",
          headers: ["증상", "확인할 항목", "주의"],
          rows: [
            ["빌드 중 undefined", "코드의 변수 이름과 Vercel Key 일치", "공백과 오탈자 확인"],
            ["Preview만 성공", "Production·Preview 적용 범위", "환경별 값이 다를 수 있음"],
            ["브라우저에서 값 없음", "클라이언트 공개 접두사 필요 여부", "비밀키를 공개 접두사로 바꾸지 않기"],
            ["서버 API 500", "서버 전용 값과 Runtime Logs", "service role·secret key는 서버에만 보관"],
          ],
        },
      },
      {
        heading: "6. Root Directory와 Build Command가 실제 프로젝트를 가리키는지 봅니다",
        paragraphs: [
          "저장소 루트에 앱이 하나라면 보통 자동 감지가 가능하지만, 하위 폴더나 모노레포에서는 Vercel 프로젝트의 Root Directory가 해당 `package.json`이 있는 위치를 가리켜야 합니다. 잘못된 폴더에서는 프레임워크를 찾지 못하거나 다른 앱을 빌드할 수 있습니다.",
          "Framework Preset, Install Command, Build Command, Output Directory를 직접 덮어썼다면 왜 필요한지 확인하세요. 기본값으로 동작하는 프로젝트에 과거 설정이 남아 있으면 현재 코드와 충돌할 수 있습니다.",
        ],
      },
      {
        heading: "7. Node.js·패키지 관리자·파일 경로 차이를 확인합니다",
        paragraphs: [
          "로컬 Node.js와 Vercel 프로젝트 설정이 다르거나 lockfile이 여러 개면 다른 패키지 버전이 설치될 수 있습니다. `package.json`의 engines·packageManager 설정과 저장소의 lockfile을 확인하고, 실제 사용하지 않는 lockfile은 원인을 확인한 뒤 정리하세요.",
          "Windows는 대소문자가 다른 import를 지나칠 수 있지만 배포 환경에서는 `Header.tsx`와 `header.tsx`가 다른 파일일 수 있습니다. Git이 파일명 변경을 기록했는지도 확인해야 합니다.",
        ],
      },
      {
        heading: "8. 배포 성공인데 사이트가 안 바뀌면 도메인과 캐시를 분리합니다",
        paragraphs: [
          "Ready 상태라면 해당 배포의 고유 URL에서 먼저 새 문구나 기능을 확인합니다. 고유 URL은 바뀌었는데 운영 도메인은 이전 화면이라면 production 배포 승격과 도메인 연결을 확인하세요. 두 URL 모두 새 배포인데 브라우저만 이전 화면이면 강력 새로고침과 서비스 워커·CDN 캐시 가능성을 점검합니다.",
          "수동 재배포가 필요하면 Vercel 대시보드에서 프로젝트 → Deployments로 이동해 대상 deployment 오른쪽의 점 3개 메뉴에서 Redeploy를 선택합니다. 확인 창에서 기존 Build Cache를 사용할지 결정한 뒤 Redeploy를 실행하세요. 환경변수나 설정을 바꾼 경우 새 배포가 필요하지만, 캐시가 원인이라는 근거가 없으면 무조건 cache를 끄기보다 먼저 로그와 변경 내용을 기록하는 편이 좋습니다.",
        ],
        bullets: [
          "배포 고유 URL에서 새 커밋 확인",
          "운영 도메인이 가리키는 Production deployment 확인",
          "HTML 소스와 브라우저 화면을 구분해 확인",
          "API 응답과 정적 화면 캐시를 별도로 확인",
          "Deployments → 점 3개 → Redeploy 순서와 Build Cache 선택 확인",
        ],
      },
      {
        heading: "오류 유형별 최소 수정 순서",
        paragraphs: [
          "한 번에 Node 버전, 환경변수, build 명령과 코드를 모두 바꾸면 어떤 변경이 해결했는지 알 수 없습니다. 아래 순서에서 근거가 확인된 항목 하나만 수정하고 다시 배포하세요.",
        ],
        table: {
          caption: "문제·원인·확인 방법·해결 방법으로 보는 Vercel 오류",
          headers: ["문제", "가능한 원인", "확인 방법", "해결 방법"],
          rows: [
            ["TypeScript build 실패", "코드의 타입 오류", "첫 오류의 파일·줄과 로컬 typecheck", "해당 타입을 최소 수정한 뒤 build 재실행"],
            ["Module not found", "import 경로·패키지·lockfile 불일치", "대소문자와 package.json·lockfile", "경로를 바로잡거나 의존성과 lockfile을 함께 반영"],
            ["환경변수 누락", "Key 오탈자·적용 환경 불일치", "코드의 변수 이름과 Production 설정", "정확한 Key를 서버/클라이언트 범위에 맞게 등록하고 새 배포"],
            ["다른 앱이 빌드됨", "Root Directory 오류", "배포 로그의 framework·package.json 위치", "프로젝트의 Root Directory를 실제 앱 폴더로 설정"],
            ["Ready인데 공개 반영 안 됨", "다른 commit·branch·domain 또는 캐시", "배포 SHA, 고유 URL과 운영 URL", "올바른 Production 배포와 도메인을 연결한 뒤 공개 URL 재확인"],
          ],
        },
        contextualLinks: [
          {
            prefix: "AI에게 오류 분석을 맡길 때는",
            label: "Codex 작업 실패 해결 순서",
            href: "/blog/codex-error-troubleshooting-guide",
            suffix: "의 첫 오류 전달 템플릿을 사용하세요.",
          },
        ],
      },
    ],
    faqs: [
      { question: "Vercel의 `Command exited with 1`이 원인인가요?", answer: "대개 실패 결과를 요약한 문구입니다. Build Logs에서 그보다 앞에 나온 첫 구체적인 오류와 파일 경로를 찾으세요." },
      { question: "로컬 build는 성공하는데 Vercel만 실패하는 이유는 무엇인가요?", answer: "환경변수, Node.js, 패키지 설치, Root Directory, 파일명 대소문자와 배포 커밋이 로컬과 다른지 확인해야 합니다." },
      { question: "환경변수를 추가하면 기존 배포에도 적용되나요?", answer: "이미 완료된 배포에는 자동으로 소급되지 않을 수 있습니다. 변수의 적용 환경을 확인하고 새 배포에서 동작을 검증하세요." },
      { question: "Redeploy를 누르면 모든 오류가 해결되나요?", answer: "일시적인 문제에는 도움이 될 수 있지만 코드나 설정 오류는 반복됩니다. 첫 오류와 변경 근거를 확인한 뒤 필요할 때만 재배포하세요." },
      { question: "배포가 Ready인데 운영 사이트가 그대로인 이유는 무엇인가요?", answer: "Preview 배포를 보고 있거나 운영 도메인이 이전 Production deployment를 가리킬 수 있습니다. 커밋 SHA, 고유 URL과 도메인 연결을 비교하세요." },
    ],
    relatedSlugs: [
      "nextjs-vercel-deployment-guide",
      "codex-error-troubleshooting-guide",
      "github-pages-vs-vercel-for-beginners",
      "build-a-website-with-ai-without-coding",
    ],
    sources: [
      { label: "Vercel Build 오류 문제 해결", href: "https://vercel.com/docs/deployments/troubleshoot-a-build" },
      { label: "Vercel Build Logs 공식 문서", href: "https://vercel.com/docs/deployments/logs" },
      { label: "Vercel GitHub 저장소 연결과 권한", href: "https://vercel.com/docs/git/vercel-for-github" },
      { label: "Vercel 배포 관리와 Redeploy", href: "https://vercel.com/docs/deployments/managing-deployments" },
      { label: "Vercel 프로젝트 설정 공식 문서", href: "https://vercel.com/docs/project-configuration/project-settings" },
      { label: "Vercel 모노레포와 Root Directory", href: "https://vercel.com/docs/monorepos" },
    ],
  },
  {
    slug: "reuse-supabase-project-multiple-apps",
    title: "Supabase 무료 프로젝트가 가득 찼을 때 기존 프로젝트를 여러 앱에서 사용하는 방법",
    seoTitle: "Supabase 무료 프로젝트 재사용: 여러 앱 안전하게 분리하기",
    summary:
      "무료 프로젝트 한도 때문에 Supabase 프로젝트를 공유할 때 테이블 접두사, RLS, 익명 로그인, API 키와 migration을 앱별로 분리하는 방법을 설명합니다.",
    description:
      "Supabase 프로젝트 하나를 여러 앱에서 사용할 때 기존 데이터에 영향 없이 테이블·정책·함수·migration을 분리하고 publishable·service role 키와 RLS를 안전하게 구성하는 방법입니다.",
    primaryKeyword: "Supabase 무료 프로젝트 재사용",
    relatedKeywords: [
      "Supabase 프로젝트 여러 앱",
      "Supabase 프로젝트 재사용",
      "Supabase 테이블 분리",
      "Supabase RLS 여러 앱",
      "Supabase 익명 로그인",
      "Supabase service role key",
    ],
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-12",
    category: "AI 웹앱 제작",
    tags: ["웹사이트·웹앱 제작", "배포·Google 검색"],
    readingTime: "15분",
    reviewNote: {
      checkedAt: "2026-08-10",
      environment: "Supabase 익명 인증, RLS, API 키와 여러 앱의 객체 분리 방식",
      notice:
        "Supabase 키 체계와 대시보드 메뉴는 변경될 수 있습니다. 실제 SQL 실행 전 기존 객체·RLS·백업과 최신 공식 문서를 확인하세요.",
    },
    sections: [
      {
        heading: "결론: 가능하지만 데이터베이스 경계가 아니라 ‘운영 규칙으로 분리’된다는 점을 알아야 합니다",
        paragraphs: [
          "Supabase 프로젝트 하나를 여러 앱에서 함께 사용할 수 있습니다. 같은 프로젝트 URL과 인증 시스템을 사용하면서 앱별 테이블, 함수, 정책을 따로 만들 수 있기 때문입니다. 다만 별도 프로젝트처럼 완전히 격리되는 것은 아닙니다. 키 회전, Auth 설정, 사용량, 장애와 관리 권한은 프로젝트 전체에 영향을 줍니다.",
          "예를 들어 기존 여행 앱과 게임 랭킹을 같은 프로젝트에서 운영한다면 새 랭킹 객체에 앱 전용 접두사를 붙일 수 있습니다. 핵심은 이름만 바꾸는 것이 아니라 RLS, 함수, 인덱스, migration과 서버 키 사용 범위까지 앱별로 분리하는 것입니다.",
        ],
        table: {
          caption: "한 프로젝트 공유가 맞는 경우와 분리가 필요한 경우",
          headers: ["상황", "한 프로젝트 공유", "별도 프로젝트 권장"],
          rows: [
            ["규모", "작은 개인 앱·낮은 트래픽", "독립적인 운영·높은 트래픽"],
            ["인증", "같은 Auth 설정을 수용 가능", "로그인 정책·사용자 수명주기가 완전히 다름"],
            ["보안", "같은 소유자와 엄격한 RLS 검토", "팀·고객·규제 경계를 분리해야 함"],
            ["장애 영향", "한 앱 장애가 다른 앱에 미칠 위험 수용", "독립 배포·복구·키 회전 필요"],
            ["비용", "무료 한도 안에서 실험", "앱별 사용량·비용을 명확히 분리"],
          ],
        },
      },
      {
        heading: "1. 기존 객체를 먼저 목록화하고 소유 범위를 정합니다",
        paragraphs: [
          "새 migration을 실행하기 전에 기존 테이블, 함수, trigger, 정책과 Auth 사용 방식을 확인하세요. 이름이 겹치지 않아도 `drop policy if exists`나 `create or replace function`이 기존 객체를 가리키면 다른 앱이 바뀔 수 있습니다.",
        ],
        bullets: [
          "기존 앱이 소유한 테이블·뷰·함수·정책 이름",
          "기존 Auth provider와 익명 로그인 사용 여부",
          "새 앱만 사용할 객체 접두사 또는 별도 schema",
          "공유할 객체와 절대 수정하지 않을 객체",
          "migration 실행 전 백업과 복구 방법",
        ],
        callout: {
          type: "warning",
          title: "접두사는 충돌 방지 규칙이지 보안 경계가 아닙니다",
          text: "`game_` 같은 접두사만으로 접근이 막히지 않습니다. 실제 권한은 grants, RLS, 함수 권한과 서버 코드에서 제어해야 합니다.",
        },
      },
      {
        heading: "2. 테이블·정책·함수에 같은 앱 접두사를 사용합니다",
        paragraphs: [
          "public schema를 함께 쓴다면 테이블뿐 아니라 인덱스, constraint, policy와 RPC 함수 이름에도 같은 접두사를 붙이세요. migration 파일도 앱 폴더에 보관해 어느 서비스가 소유하는 변경인지 알 수 있게 합니다.",
        ],
        codeBlock: {
          label: "게임 앱 전용 이름 예시",
          code: "public.game_profiles\npublic.game_scores\ngame_scores_user_game_idx\ngame_scores_insert_own\npublic.submit_game_score(...)\nsupabase/migrations/game/20260810_game_ranking.sql",
        },
        table: {
          caption: "객체별 분리 원칙",
          headers: ["객체", "예시", "확인할 점"],
          rows: [
            ["테이블", "game_scores", "기존 테이블 참조·cascade 삭제 없음"],
            ["인덱스", "game_scores_rank_idx", "앱 접두사와 대상 열 일치"],
            ["정책", "game_scores_select_public", "대상 role과 using·with check"],
            ["함수", "submit_game_score", "search_path·권한·입력 검증"],
            ["migration", "makeon 폴더·타임스탬프", "기존 객체 drop·replace 금지"],
          ],
        },
      },
      {
        heading: "3. 익명 로그인과 `anon` API 키를 구분합니다",
        paragraphs: [
          "Supabase Auth의 익명 로그인은 `signInAnonymously()`로 실제 익명 사용자와 고유 ID를 만듭니다. 이 사용자는 데이터베이스에서 일반 로그인 사용자처럼 `authenticated` 역할을 사용하며 JWT의 `is_anonymous` 값으로 구분할 수 있습니다. 반면 publishable 또는 예전 anon API 키만 사용하고 로그인하지 않은 요청은 `anon` 역할입니다.",
          "프로젝트에서 익명 로그인을 켜면 Auth 설정은 프로젝트 전체에 적용됩니다. 기존 여행 앱이 `authenticated` 역할에 넓은 정책을 두었다면 익명 사용자도 그 정책 대상이 될 수 있으므로 반드시 검토해야 합니다. 기존 정책을 무작정 바꾸기보다 민감한 작업에 영구 사용자만 허용하는 제한이 필요한지 먼저 분석하세요.",
        ],
        contextualLinks: [
          {
            prefix: "AI에게 이런 보안 조건을 빠뜨리지 않고 전달하려면",
            label: "AI 코딩 프롬프트 작성법",
            href: "/blog/better-prompts-for-ai-coding",
            suffix: "의 유지·제외 조건을 함께 사용하세요.",
          },
        ],
      },
      {
        heading: "4. RLS는 새 테이블마다 별도로 켜고 최소 권한으로 작성합니다",
        paragraphs: [
          "Supabase Data API 보안은 객체에 대한 grants와 행 단위 RLS 정책을 함께 봐야 합니다. 공개 랭킹 조회가 필요하더라도 점수 제출·수정·삭제까지 모두 공개할 필요는 없습니다. 사용자가 자신의 점수만 제출할 수 있는지, 서버에서 검증한 점수만 기록해야 하는지를 게임 규칙에 맞게 결정하세요.",
        ],
        codeBlock: {
          label: "정책을 설계할 때 확인할 질문",
          code: "SELECT: 누구나 전체 랭킹을 읽어도 되는가?\nINSERT: auth.uid()가 제출 row의 user_id와 같은가?\nUPDATE: 점수 덮어쓰기를 허용할 것인가?\nDELETE: 사용자 삭제가 필요한가, 서버만 가능한가?\nRPC: 입력 범위와 호출 권한을 검증하는가?\nANONYMOUS: is_anonymous 사용자에게 허용할 행동은 무엇인가?",
        },
        callout: {
          type: "tip",
          title: "기존 RLS는 그대로 두고 새 객체만 검토하세요",
          text: "공유 프로젝트에 기능을 추가할 때는 기존 정책을 ‘정리’한다는 이유로 바꾸지 마세요. 새 앱 객체에 필요한 정책만 추가하고 회귀 테스트를 별도로 수행합니다.",
        },
      },
      {
        heading: "5. SQL Editor의 새 Query에서 새 앱 migration만 실행합니다",
        paragraphs: [
          "대시보드에서 직접 적용해야 한다면 대상 Supabase 프로젝트를 다시 확인한 뒤 SQL Editor → New Query를 엽니다. 새 Query를 쓰는 이유는 이전 앱의 SQL이나 선택 영역이 남은 탭과 섞이지 않게 하고, 이번 앱의 변경문 전체를 한 단위로 검토하기 위해서입니다.",
          "새 Query가 기존 데이터를 자동으로 보호해 주는 것은 아닙니다. 실행 전 SQL을 파일로 보관하고 `drop`, 기존 객체에 대한 `alter`, 접두사 없는 `create or replace`가 없는지 검색해야 합니다. 팀에서 Supabase CLI migration을 이미 운영한다면 Dashboard에서 직접 바꾸면 migration 기록과 어긋날 수 있으므로, 로컬 migration을 만들고 `db push`하는 기존 절차를 우선하세요.",
        ],
        bullets: [
          "Supabase Dashboard에서 정확한 프로젝트 이름을 다시 확인",
          "SQL Editor → New Query를 열고 저장한 migration 전체를 붙여넣기",
          "생성·변경 대상이 새 앱 접두사 객체로만 한정됐는지 검색",
          "실제 키·토큰·이메일과 기존 앱 데이터가 SQL에 없는지 확인",
          "Run 후 성공 메시지뿐 아니라 테이블·RLS·정책·함수 존재 확인",
          "기존 앱 로그인·조회와 새 앱 랭킹을 각각 회귀 테스트",
        ],
        codeBlock: {
          label: "실행 전 안전 확인 메모",
          code: "대상 프로젝트: [프로젝트 이름]\nSQL 원본 파일: supabase/migrations/[앱]/[날짜]_game_ranking.sql\n생성 대상: public.game_profiles, public.game_scores\n금지 대상: 기존 앱의 테이블·함수·정책\n실행 후 확인: 테이블 / RLS / policy / RPC / 기존 앱 회귀 테스트",
        },
        callout: {
          type: "warning",
          title: "New Query는 안전장치가 아니라 작업 범위를 분리하는 방법입니다",
          text: "관리 권한으로 실행하는 SQL은 기존 데이터를 바꿀 수 있습니다. SQL이 새 앱 객체만 다루는지 직접 검토하고, 실행한 최종 SQL을 migration 파일로 남겨 같은 변경을 추적할 수 있게 하세요.",
        },
      },
      {
        heading: "6. publishable 키와 service role 키의 위치를 분리합니다",
        paragraphs: [
          "Supabase 공식 문서는 publishable 키를 브라우저 같은 공개 구성 요소에서 사용할 수 있는 낮은 권한 키로 설명합니다. 실제 데이터 접근은 사용자의 로그인 상태와 RLS가 제한합니다. 반면 secret 키와 기존 service role 키는 RLS를 우회할 수 있으므로 브라우저, `NEXT_PUBLIC_` 변수, 공개 저장소와 로그에 넣으면 안 됩니다.",
        ],
        table: {
          caption: "Supabase 키 배치 기준",
          headers: ["키", "사용 위치", "보호 방법"],
          rows: [
            ["Project URL", "브라우저·서버", "환경별 설정 관리"],
            ["Publishable key", "브라우저 사용 가능", "RLS를 반드시 활성화·검토"],
            ["Legacy anon key", "기존 브라우저 앱", "publishable 키와 같은 공개 구성 요소 원칙"],
            ["Secret key", "보호된 서버 코드만", "클라이언트 번들·로그·채팅 노출 금지"],
            ["Legacy service_role", "보호된 서버 코드만", "RLS 우회 권한을 전제로 최소 사용"],
          ],
        },
      },
      {
        heading: "7. 환경변수는 앱별 Vercel 프로젝트에 등록합니다",
        paragraphs: [
          "같은 Supabase 프로젝트를 가리키더라도 각 앱의 Vercel 프로젝트에 필요한 변수만 등록하세요. 랭킹 관리에 elevated key가 필요하다면 서버 전용 이름으로 보관하고, 클라이언트에서 참조하지 않는지 build 결과와 코드 검색으로 확인합니다.",
        ],
        bullets: [
          "Project URL과 publishable key는 코드가 기대하는 정확한 이름으로 등록",
          "secret·service role 값은 서버 전용이며 `NEXT_PUBLIC_` 접두사 금지",
          "Production·Preview 환경별 적용 범위 확인",
          "실제 값은 Git, README, 오류 로그와 스크린샷에 포함하지 않기",
          "변수 변경 후 새 배포에서 API 상태 확인",
        ],
        contextualLinks: [
          {
            prefix: "환경변수를 등록한 뒤 배포가 실패하면",
            label: "Vercel 배포 오류 해결 가이드",
            href: "/blog/vercel-deployment-error-guide",
            suffix: "의 적용 환경 점검표를 확인하세요.",
          },
        ],
      },
      {
        heading: "8. migration과 회귀 테스트를 앱별로 기록합니다",
        paragraphs: [
          "SQL은 한 번에 실행 가능한 migration으로 보관하되 기존 앱 객체를 drop·alter·replace하지 않는지 먼저 검색합니다. 실행 후에는 새 테이블 존재만 확인하지 말고 기존 앱 로그인·조회와 새 앱 익명 로그인·랭킹 제출을 모두 테스트해야 합니다.",
        ],
        codeBlock: {
          label: "공유 프로젝트 적용 체크리스트",
          code: "[ ] migration이 새 앱 객체만 생성·변경한다\n[ ] 기존 테이블·함수·정책 이름을 건드리지 않는다\n[ ] 새 테이블에 RLS가 켜져 있다\n[ ] 익명 사용자와 영구 사용자의 권한을 구분했다\n[ ] publishable과 server secret 위치가 분리됐다\n[ ] 기존 앱 로그인·조회가 정상이다\n[ ] 새 앱 랭킹 조회·제출·오류 응답이 정상이다\n[ ] 키와 개인정보가 Git·로그에 없다",
        },
      },
      {
        heading: "한 프로젝트 공유를 중단해야 하는 신호",
        paragraphs: [
          "무료 한도를 아끼는 장점보다 운영 위험이 커지면 별도 프로젝트로 옮길 시점입니다. 서로 다른 고객 데이터, 팀 권한, 백업 주기와 장애 허용 수준이 필요하거나 한 앱의 트래픽이 다른 앱 성능에 영향을 주기 시작하면 분리를 검토하세요.",
        ],
        bullets: [
          "한 앱의 Auth 설정 변경이 다른 앱 요구와 충돌",
          "RLS 정책을 앱별 담당자가 독립적으로 관리해야 함",
          "키 회전과 사고 대응 범위를 분리해야 함",
          "사용량·비용·백업·복구 목표를 앱별로 측정해야 함",
          "법적·계약상 데이터 격리가 필요함",
        ],
      },
    ],
    faqs: [
      { question: "Supabase 프로젝트 하나를 여러 앱에서 써도 되나요?", answer: "기술적으로 가능하지만 Auth 설정, 사용량, 키와 장애 범위는 공유됩니다. 작은 앱에서 명확한 객체 이름과 RLS 규칙을 운영할 수 있을 때 적합합니다." },
      { question: "테이블에 접두사만 붙이면 데이터가 안전하게 분리되나요?", answer: "아닙니다. 접두사는 이름 충돌과 소유권 구분에 도움이 될 뿐입니다. grants, RLS, 함수 권한과 서버 키 배치를 별도로 설계해야 합니다." },
      { question: "익명 로그인을 켜면 기존 로그인 사용자가 로그아웃되나요?", answer: "기능을 켠다는 사실만으로 기존 사용자를 자동 로그아웃시키지는 않지만, 익명 사용자도 `authenticated` 역할을 사용하므로 기존 RLS 정책의 허용 범위를 검토해야 합니다." },
      { question: "service role key를 브라우저에서 사용해도 되나요?", answer: "안 됩니다. RLS를 우회할 수 있는 높은 권한 키이므로 보호된 서버 코드와 서버 전용 환경변수에서만 사용해야 합니다." },
      { question: "언제 별도 Supabase 프로젝트로 분리해야 하나요?", answer: "사용자·팀·보안·비용·백업과 장애 범위를 독립적으로 관리해야 하거나 Auth 설정이 충돌하기 시작하면 분리를 검토하세요." },
    ],
    relatedSlugs: [
      "build-a-mini-app-with-ai",
      "vercel-deployment-error-guide",
      "nextjs-vercel-deployment-guide",
      "better-prompts-for-ai-coding",
    ],
    sources: [
      { label: "Supabase 익명 로그인 공식 문서", href: "https://supabase.com/docs/guides/auth/auth-anonymous" },
      { label: "Supabase Row Level Security 공식 문서", href: "https://supabase.com/docs/guides/database/postgres/row-level-security" },
      { label: "Supabase API 보안 공식 문서", href: "https://supabase.com/docs/guides/api/securing-your-api" },
      { label: "Supabase API 키 공식 문서", href: "https://supabase.com/docs/guides/getting-started/api-keys" },
      { label: "Supabase Database migration 공식 문서", href: "https://supabase.com/docs/guides/deployment/database-migrations" },
    ],
  },
];
