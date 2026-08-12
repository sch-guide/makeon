import type { BlogPost, BlogSection } from "@/types/content";

type BlogEnhancement = {
  updatedAt?: string;
  reviewNote?: BlogPost["reviewNote"];
  sections: BlogSection[];
  sources?: NonNullable<BlogPost["sources"]>;
};

const makeonReviewNote = (environment: string, notice: string): NonNullable<BlogPost["reviewNote"]> => ({
  checkedAt: "2026-08-12",
  environment,
  notice,
});

const enhancements: Record<string, BlogEnhancement> = {
  "build-a-website-with-ai-without-coding": {
    updatedAt: "2026-08-12",
    reviewNote: makeonReviewNote(
      "MAKEON의 공개 Next.js 사이트, GitHub main 브랜치와 Vercel 배포 흐름",
      "무료 플랜의 범위와 제품 화면은 바뀔 수 있습니다. 배포 직전에는 사용하는 서비스의 공식 플랜·배포 문서를 다시 확인하세요.",
    ),
    sections: [
      {
        heading: "처음 만들 때는 페이지 수보다 완료 기준을 먼저 정하세요",
        paragraphs: [
          "MAKEON처럼 블로그와 무료 도구를 함께 운영하려면 첫 버전에서 홈, 소개, 문의, 개인정보처리방침과 실제로 완성할 도구 한 개만 정해도 충분합니다. 로그인, 결제, 데이터베이스를 동시에 추가하면 오류 범위와 개인정보 안내가 함께 커져 초보자가 결과를 확인하기 어려워집니다.",
          "배포 완료의 기준도 ‘화면이 열린다’에서 끝내지 않습니다. 모바일 가로 넘침, 메뉴 링크, canonical, sitemap, robots.txt, 환경변수 제외, TypeScript와 production build를 확인해야 공개 뒤 검색엔진과 방문자가 같은 페이지를 안정적으로 볼 수 있습니다.",
        ],
        bullets: [
          "목적과 대상 사용자를 한 문장으로 정하기",
          "첫 공개에 꼭 필요한 페이지와 기능만 선택하기",
          "AI 요청에 유지할 URL과 제외할 기능 적기",
          "로컬 검사 후 GitHub push와 공개 URL을 각각 확인하기",
        ],
        contextualLinks: [
          { prefix: "구현 요청을 먼저 정리하려면", label: "AI 프롬프트 생성기", href: "/tools/ai-prompt-generator", suffix: "에서 목표·기능·검증 항목을 나눠 작성할 수 있습니다." },
        ],
      },
    ],
  },
  "codex-vscode-guide": {
    updatedAt: "2026-08-12",
    reviewNote: makeonReviewNote(
      "Windows의 VS Code, Git 저장소와 MAKEON Next.js 프로젝트 작업 흐름",
      "Codex와 VS Code의 버튼 이름이나 화면 배치는 버전에 따라 달라질 수 있습니다. 화면 이름보다 프로젝트 경로, 변경 파일과 명령 결과를 기준으로 확인하세요.",
    ),
    sections: [
      {
        heading: "수정이 보이지 않을 때는 세 위치부터 대조하세요",
        paragraphs: [
          "AI가 작업을 완료했다고 알려도 VS Code에서 연 폴더, 터미널의 현재 경로, 실제 Git 저장소가 서로 다르면 원하는 사이트에는 변경이 나타나지 않습니다. MAKEON 작업에서도 바탕화면의 동명 폴더와 실제 OneDrive 저장소를 구분하는 일이 먼저였습니다.",
          "변경 파일을 확인한 다음에만 타입 검사와 빌드를 실행하고, 검사 성공 뒤 `git status`로 커밋 대상을 다시 봅니다. 실행 중인 개발 서버 화면만 보고 저장 여부를 판단하지 않는 것이 안전합니다.",
        ],
        codeBlock: { label: "작업 위치와 변경 확인", code: "pwd\ngit status -sb\ngit diff --stat\nnpm run typecheck\nnpm run build" },
        callout: { type: "warning", title: "기존 변경을 지우지 마세요", text: "예상하지 못한 수정 파일이 보이면 reset이나 checkout으로 되돌리기 전에 누가 만든 변경인지 먼저 확인하세요." },
      },
    ],
  },
  "nextjs-vercel-deployment-guide": {
    updatedAt: "2026-08-12",
    reviewNote: makeonReviewNote(
      "MAKEON main 브랜치의 GitHub push와 Vercel production 배포",
      "Vercel의 메뉴 이름과 무료 플랜 조건은 변경될 수 있습니다. 오류 원인은 배포 화면의 첫 번째 실제 Build Error와 해당 시점의 공식 문서를 기준으로 판단하세요.",
    ),
    sections: [
      {
        heading: "배포 성공은 GitHub, Vercel, 공개 주소를 따로 확인해야 합니다",
        paragraphs: [
          "GitHub push 성공은 원격 저장소에 커밋이 도착했다는 뜻이고 Vercel Ready는 해당 커밋의 빌드가 완료됐다는 뜻입니다. 공개 도메인이 새 배포를 가리키는지까지 확인해야 사용자가 보는 결과가 갱신됐다고 판단할 수 있습니다.",
          "오류가 나면 마지막 줄만 복사하기보다 Build Logs에서 처음 등장한 실제 오류를 찾습니다. 환경변수 이름 오타, 잠금 파일 불일치, TypeScript 오류와 잘못된 프로젝트 루트는 뒤쪽에 연쇄 오류를 만들 수 있습니다.",
        ],
        bullets: [
          "GitHub main에 의도한 커밋이 있는지 확인",
          "Vercel 배포가 그 커밋 해시를 사용하는지 확인",
          "Ready 상태와 production 도메인 연결 확인",
          "공개 페이지의 HTML·링크·환경별 기능 다시 확인",
        ],
        contextualLinks: [
          { prefix: "빌드가 실패했다면", label: "Vercel 배포 오류 해결 순서", href: "/blog/vercel-deployment-error-guide", suffix: "에서 Build Logs를 읽는 순서를 이어서 확인하세요." },
        ],
      },
    ],
  },
  "nextjs-google-search-console-setup": {
    updatedAt: "2026-08-12",
    reviewNote: makeonReviewNote(
      "MAKEON의 공개 sitemap.xml, robots.txt, canonical과 Search Console URL 검사 흐름",
      "색인 생성 요청은 색인을 보장하지 않습니다. Google이 다시 크롤링한 뒤에도 페이지의 독창성, 내부 링크와 전체 사이트 품질을 기준으로 색인 여부를 판단할 수 있습니다.",
    ),
    sections: [
      {
        heading: "‘크롤링됨 - 현재 색인이 생성되지 않음’은 요청 반복보다 페이지 점검이 먼저입니다",
        paragraphs: [
          "URL 검사에서 페이지 가져오기가 성공하고 색인 생성이 허용돼도 Google이 바로 색인을 선택하는 것은 아닙니다. canonical이 자기 자신을 가리키는지, sitemap에 포함됐는지, 목록 페이지에서 직접 연결되는지, 비슷한 글보다 고유한 답을 제공하는지를 먼저 확인합니다.",
          "내용을 실제로 개선한 뒤 한 번 색인 생성을 요청하고 기다리는 편이 낫습니다. 같은 내용을 바꾸지 않은 채 요청만 반복해도 페이지 품질 신호가 새로 생기지는 않습니다.",
        ],
        bullets: ["HTTP 200과 noindex 부재 확인", "자기 참조 canonical 확인", "sitemap과 목록 페이지의 직접 링크 확인", "중복되지 않는 본문·FAQ·관련 자료 보강", "수정 뒤 색인 생성 요청"],
      },
    ],
  },
  "vercel-adsense-setup-review-process": {
    updatedAt: "2026-08-12",
    reviewNote: makeonReviewNote(
      "MAKEON 공개 HTML head, ads.txt, 개인정보처리방침과 AdSense 검토 준비 상태",
      "광고 코드와 ads.txt가 정상이어도 승인을 의미하지 않습니다. 재심사 전 AdSense 정책 센터와 계정에 표시된 실제 사유를 다시 확인해야 합니다.",
    ),
    sections: [
      {
        heading: "재심사 전에는 연결 상태와 콘텐츠 품질을 분리해 확인하세요",
        paragraphs: [
          "연결 점검에서는 공개 HTML head의 게시자 스크립트, 게시자 ID, ads.txt의 한 줄과 HTTP 응답을 확인합니다. 콘텐츠 점검에서는 기능만 있는 짧은 페이지, 잘못된 개인정보 안내, 깨진 내부 링크, 비슷한 글과 과장된 승인 표현을 별도로 살펴봅니다.",
          "MAKEON은 도구 페이지마다 사용법, 실제 저장 범위, 제한, FAQ와 관련 도구를 보강하고 개인정보처리방침에 Supabase 익명 랭킹과 Google 광고 쿠키를 실제 운영 상태에 맞춰 적었습니다. 이는 승인 요령이 아니라 방문자가 기능과 데이터 처리를 이해하도록 만드는 기본 정보입니다.",
        ],
        bullets: ["AdSense 코드와 publisher ID를 공개 head에서 확인", "ads.txt 200 및 평문 한 줄 확인", "개인정보처리방침과 실제 저장 동작 대조", "도구 페이지의 사용법·FAQ·관련 링크 확인", "정책 센터의 실제 사유를 해결한 뒤 재심사 요청"],
        callout: { type: "warning", title: "승인 결과는 보장할 수 없습니다", text: "글 개수나 특정 문구만으로 승인이 결정된다는 공식 기준은 없습니다. 사이트 전체의 정책 준수와 사용자 가치를 지속해서 관리해야 합니다." },
      },
    ],
  },
  "fix-chatgpt-prompts-for-better-answers": {
    updatedAt: "2026-08-05",
    reviewNote: makeonReviewNote(
      "MAKEON의 AI 요청서와 실제 Next.js 구현 결과",
      "같은 표현도 사용하는 모델, 기존 대화 맥락, 연결된 파일에 따라 결과가 달라질 수 있습니다. 예시는 요구사항을 검증 가능한 문장으로 바꾸는 방법에 초점을 맞췄습니다.",
    ),
    sections: [
      {
        heading: "MAKEON 사례: ‘고퀄리티로’라는 말을 확인 가능한 조건으로 바꿨습니다",
        paragraphs: [
          "파스텔 컬러 정렬 퍼즐을 개선할 때 처음 요청은 ‘평면 UI가 아니라 실제 투명 유리 용기와 액체처럼 보이게 해달라’는 방향이었습니다. 이 문장만으로는 완성 여부를 판단하기 어려워 유리 테두리, 내부 반사광, 바닥 그림자, 액체 메니스커스, 250~450ms 이동 애니메이션처럼 화면에서 확인할 수 있는 조건으로 나눴습니다.",
          "동시에 ‘기존 게임 규칙, 라우트, 레벨, 최고 기록 구조는 유지하고 TypeScript 오류 없이 빌드한다’는 보존 조건도 적었습니다. 디자인 요청과 기존 기능 보호를 한 문장에 섞지 않고 나누자, 무엇을 바꾸고 무엇을 건드리지 않아야 하는지가 분명해졌습니다.",
        ],
        bullets: [
          "추상 표현: 현실적이고 고급스럽게",
          "관찰 조건: 유리 하이라이트, 액체 표면, 접지 그림자, 완료 glow",
          "보존 조건: 규칙, 레벨, 기록, 공개 경로 유지",
          "검증 조건: 모바일·데스크톱 확인, 타입 검사와 production build 통과",
        ],
        contextualLinks: [
          {
            prefix: "이 사례에 사용한 구조를 직접 문장으로 만들어보려면",
            label: "무료 AI 프롬프트 생성기",
            href: "/tools/ai-prompt-generator",
            suffix: "에서 목표와 제약 조건을 분리해 입력해 보세요.",
          },
        ],
      },
    ],
  },
  "free-ai-prompt-generator-guide": {
    updatedAt: "2026-08-05",
    reviewNote: makeonReviewNote(
      "MAKEON AI 프롬프트 생성기의 공개 화면과 브라우저 동작",
      "생성 결과는 입력 내용을 정돈한 초안입니다. 사실 확인, 민감정보 제거, 사용 중인 AI 서비스의 정책 확인은 사용자가 별도로 해야 합니다.",
    ),
    sections: [
      {
        heading: "직접 만든 도구는 다섯 가지 입력을 한 개의 요청서로 합칩니다",
        paragraphs: [
          "MAKEON 생성기는 역할, 목표, 배경, 제약 조건, 출력 형식을 따로 입력받습니다. 예를 들어 목표에는 ‘게임 페이지를 개선한다’, 제약 조건에는 ‘현재 라우트와 기록 구조를 유지한다’, 출력 형식에는 ‘변경 파일과 테스트 결과를 정리한다’를 넣습니다. 생성 버튼을 누르면 이 항목을 빠뜨리지 않는 하나의 요청서로 정리합니다.",
          "입력과 생성 과정은 현재 브라우저 안에서만 처리하고 서버나 계정에 저장하지 않습니다. 페이지를 새로 고치면 작성 내용이 사라질 수 있고, 복사 기능은 브라우저의 클립보드 권한이 차단된 환경에서 작동하지 않을 수 있습니다. 따라서 긴 원문은 별도 문서에 보관하고 개인정보나 비밀 키는 처음부터 넣지 않는 편이 안전합니다.",
        ],
        contextualLinks: [
          {
            prefix: "설명을 읽은 뒤 바로 시험하려면",
            label: "AI 프롬프트 생성기",
            href: "/tools/ai-prompt-generator",
            suffix: "를 열어 짧은 요청과 상세 요청의 차이를 비교해 보세요.",
          },
        ],
      },
    ],
  },
  "monetize-an-ai-built-website": {
    updatedAt: "2026-08-05",
    reviewNote: makeonReviewNote(
      "MAKEON의 Google AdSense 검토 결과와 공개 페이지 품질 점검",
      "AdSense 승인은 Google의 개별 심사 결과이며 어떤 수정도 승인을 보장하지 않습니다. 정책과 계정 상태는 재검토 요청 직전에 공식 화면에서 다시 확인해야 합니다.",
    ),
    sections: [
      {
        heading: "MAKEON 사례: 광고 코드 연결과 콘텐츠 승인은 서로 다른 단계였습니다",
        paragraphs: [
          "MAKEON은 광고 스크립트, 사이트 소유권 확인, ads.txt 같은 기술 항목을 준비했지만 ‘가치가 별로 없는 콘텐츠’ 사유로 한 차례 승인되지 않았습니다. 이 경험에서 확인한 핵심은 광고 코드가 정상적으로 로드된다는 사실만으로 페이지의 독창성, 충분한 설명, 사이트 전체의 탐색 가치가 인정되는 것은 아니라는 점입니다.",
          "재검토 전에는 짧은 도구 페이지에 사용법, 데이터 저장 범위, 한계, FAQ, 업데이트 기록을 보강하고, 블로그의 일반론에는 실제 MAKEON 구현 사례와 검토일을 추가했습니다. 상표와 혼동될 수 있는 공개 게임 명칭도 독립적인 이름으로 바꾸고 이전 주소는 새 주소로 연결했습니다. 이 작업은 승인 요령이 아니라 방문자가 페이지 하나만 읽어도 무엇을 얻는지 이해할 수 있게 만드는 기본 품질 정리입니다.",
        ],
        callout: {
          type: "warning",
          title: "승인을 보장하는 체크리스트는 없습니다",
          text: "사이트 수정 뒤에도 개인정보 동의 관리, Search Console 색인 상태, 정책 위반 알림과 AdSense 계정 상태는 운영자가 계정 화면에서 직접 확인해야 합니다.",
        },
      },
    ],
  },
  "better-prompts-for-ai-coding": {
    updatedAt: "2026-08-05",
    reviewNote: makeonReviewNote(
      "MAKEON Next.js 프로젝트의 실제 게임 리디자인 요청과 검증 절차",
      "명령어와 파일 구조는 프로젝트마다 다릅니다. AI에게 수정 권한을 주기 전에 저장소의 작업 규칙과 기존 변경 내역을 먼저 확인하세요.",
    ),
    sections: [
      {
        heading: "실전 요청서에는 변경 목표와 보호할 구조를 함께 적었습니다",
        paragraphs: [
          "컬러 정렬 퍼즐 요청에서는 ‘투명 유리병과 실제 액체처럼 보이게’라는 목표 다음에 기존 규칙, 레벨, 점수·기록, 라우트를 유지하라고 명시했습니다. 애니메이션은 ‘부드럽게’에서 끝내지 않고 선택한 용기가 기울고 액체가 흐른 뒤 도착 용기가 채워지며 전체 전환은 250~450ms라고 범위를 정했습니다.",
          "마지막에는 외부 유료 라이브러리와 핫링크 이미지를 사용하지 않고 CSS, SVG, React 안에서 구현하며 TypeScript 검사와 production build를 통과해야 한다고 적었습니다. 이런 종료 조건은 화면만 그럴듯하고 기존 판정이나 배포가 깨지는 결과를 줄이는 데 도움이 됩니다.",
        ],
        codeBlock: {
          label: "MAKEON식 완료 조건 예시",
          code: "- 기존 라우트·레벨·기록 구조 유지\n- 모바일과 데스크톱에서 조작 확인\n- 애니메이션 250~450ms\n- 외부 핫링크 없이 로컬 자산 사용\n- npm run typecheck 및 npm run build 통과",
        },
      },
    ],
    sources: [
      { label: "OpenAI Academy 프롬프트 모범 사례", href: "https://learn.chatgpt.com/guides/best-practices" },
      { label: "OpenAI Academy 프롬프팅 안내", href: "https://learn.chatgpt.com/docs/prompting" },
    ],
  },
  "build-a-mini-app-with-ai": {
    updatedAt: "2026-08-05",
    sections: [
      {
        heading: "MAKEON에서 확인한 범위 관리: 게임 하나씩 완성하고 다음 기능으로 넘어갔습니다",
        paragraphs: [
          "MAKEON의 미니게임 작업은 한 번에 여러 게임을 묶어 만들기보다 각 게임의 화면, 규칙, 반응형 동작과 빌드를 확인한 뒤 다음 게임으로 확장했습니다. 초기 미니게임 추가, 스택 게임 완성, 컬러 정렬과 메모리 게임 추가가 각각 별도 변경 기록으로 남아 있어 문제가 생겼을 때 어느 단계에서 바뀌었는지 좁혀 볼 수 있었습니다.",
          "AI에게 맡기는 범위도 같은 방식으로 나눴습니다. 먼저 관련 파일을 찾고, 기존 저장 구조를 확인한 다음, 화면과 상호작용을 수정하고 마지막에 타입 검사와 빌드를 실행했습니다. 작은 완료 단위를 남기는 방식은 기능 수를 늘리는 것보다 검증과 되돌리기에 유리했습니다.",
        ],
      },
    ],
  },
  "chatgpt-codex-webapp-review": {
    updatedAt: "2026-08-05",
    sections: [
      {
        heading: "MAKEON에서는 기획 대화와 저장소 작업을 구분해 사용했습니다",
        paragraphs: [
          "AdSense 개선 방향이나 게임의 분위기처럼 선택지가 많은 문제는 먼저 대화로 정리했습니다. 반면 공개 경로 변경, 내부 링크 점검, 메타데이터 수정, TypeScript 검사처럼 저장소와 실행 결과를 확인해야 하는 일은 프로젝트 파일을 읽고 수정할 수 있는 작업 흐름으로 진행했습니다.",
          "예를 들어 공개 게임 이름을 바꿀 때 화면의 제목만 고치지 않고 도구 목록, 사이트맵, canonical 주소, 구조화 데이터, 이전 주소 리디렉션, 랭킹 표시 문구까지 함께 확인했습니다. 아이디어를 정하는 단계와 실제 연결 지점을 검증하는 단계의 차이가 두 도구를 구분할 때 가장 실용적인 기준이었습니다.",
        ],
      },
    ],
  },
};

export function applyBlogPostEnhancement(post: BlogPost): BlogPost {
  const enhancement = enhancements[post.slug];
  if (!enhancement) return post;

  const existingSourceUrls = new Set((post.sources ?? []).map((source) => source.href));
  const newSources = (enhancement.sources ?? []).filter((source) => !existingSourceUrls.has(source.href));

  return {
    ...post,
    updatedAt: enhancement.updatedAt ?? post.updatedAt,
    reviewNote: enhancement.reviewNote ?? post.reviewNote,
    sections: [...post.sections, ...enhancement.sections],
    sources: post.sources || newSources.length ? [...(post.sources ?? []), ...newSources] : undefined,
  };
}
