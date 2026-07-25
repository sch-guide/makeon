import type { BlogImage, BlogPost } from "@/types/content";

const explanatoryCaption =
  "실제 서비스 화면을 그대로 복제하지 않은 설명용 UI 모형입니다.";

type BlogVisualPlan = {
  coverImage: string;
  coverImageAlt: string;
  coverImageCaption: string;
  coverImageWidth: number;
  coverImageHeight: number;
  sectionImages: {
    sectionIndex: number;
    images: BlogImage[];
  }[];
};

const makeImage = (
  image: string,
  imageAlt: string,
  imageCaption: string,
  imageWidth = 1536,
  imageHeight = 1024,
): BlogImage => ({
  image,
  imageAlt,
  imageCaption: `${imageCaption} ${explanatoryCaption}`,
  imageWidth,
  imageHeight,
  imagePosition: "wide",
  imagePriority: false,
});

export const blogVisualPlans: Record<string, BlogVisualPlan> = {
  "ai-work-automation-prompts": {
    coverImage: "/images/blog/ai-work-automation-prompts/cover.webp",
    coverImageAlt:
      "반복 업무 입력, AI 초안 생성, 사람 검토의 세 단계로 구성된 AI 업무 자동화 UI 모형",
    coverImageCaption: `AI가 초안을 만들고 사람이 검토하는 안전한 업무 자동화 흐름입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 2,
        images: [
          makeImage(
            "/images/blog/ai-work-automation-prompts/01-prompt-review-flow.webp",
            "이메일, 회의록, 보고서 등 업무 프롬프트 7가지와 사람 검토 체크리스트 UI 모형",
            "반복 업무별 프롬프트를 선택한 뒤 사실과 민감정보를 사람이 다시 확인하는 과정입니다.",
          ),
        ],
      },
    ],
  },
  "website-building-prompt-guide": {
    coverImage: "/images/blog/website-building-prompt-guide/cover.webp",
    coverImageAlt:
      "웹사이트 요구사항 입력에서 반응형 화면 생성까지 연결한 웹사이트 제작 프롬프트 UI 모형",
    coverImageCaption: `구체적인 요구사항이 데스크톱과 모바일 화면으로 이어지는 흐름입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 1,
        images: [
          makeImage(
            "/images/blog/website-building-prompt-guide/01-requirements-checklist.webp",
            "사이트 목적부터 검증 항목까지 웹사이트 제작 요청의 핵심 10가지를 정리한 UI 모형",
            "AI에게 웹사이트를 요청하기 전에 채워야 할 열 가지 항목을 한눈에 정리했습니다.",
          ),
        ],
      },
    ],
  },
  "fix-chatgpt-prompts-for-better-answers": {
    coverImage: "/images/blog/fix-chatgpt-prompts-for-better-answers/cover.webp",
    coverImageAlt:
      "부족한 AI 답변에 조건을 추가해 개선된 결과로 바꾸는 프롬프트 수정 UI 모형",
    coverImageCaption: `문제 확인, 조건 추가, 결과 개선의 순서로 프롬프트를 고치는 흐름입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 4,
        images: [
          makeImage(
            "/images/blog/fix-chatgpt-prompts-for-better-answers/01-prompt-revision-template.webp",
            "짧은 요청을 역할, 목적, 조건, 출력 형식, 예시가 있는 구조화 프롬프트로 바꾸는 UI 모형",
            "모호한 한 줄 요청을 다섯 항목으로 보완해 구조화된 답변을 얻는 예시입니다.",
          ),
        ],
      },
    ],
  },
  "free-ai-prompt-generator-guide": {
    coverImage: "/images/blog/free-ai-prompt-generator-guide/cover.webp",
    coverImageAlt:
      "정보 입력, 프롬프트 생성, 복사 활용의 세 단계로 구성된 무료 프롬프트 생성기 UI 모형",
    coverImageCaption: `입력 내용을 구조화된 프롬프트로 바꿔 복사하는 도구 사용 흐름입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 3,
        images: [
          makeImage(
            "/images/blog/free-ai-prompt-generator-guide/01-input-result-examples.webp",
            "웹사이트 제작, 업무 정리, 콘텐츠 작성 예시를 선택해 프롬프트 결과를 만드는 UI 모형",
            "세 가지 사용 예시에서 입력, 결과 생성, 복사 후 개선 순서를 확인할 수 있습니다.",
          ),
        ],
      },
    ],
  },
  "build-a-mini-app-with-ai": {
    coverImage: "/images/blog/build-a-mini-app-with-ai/cover.webp",
    coverImageAlt:
      "아이디어, 기능 정의, 코드 구현, 미리보기, 배포 완료로 이어지는 AI 미니앱 제작 UI 모형",
    coverImageCaption: `작은 문제를 해결하는 미니앱을 아이디어에서 배포까지 진행하는 흐름입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 8,
        images: [
          makeImage(
            "/images/blog/build-a-mini-app-with-ai/01-mini-app-checklist.webp",
            "작은 앱의 범위 고정, 기능 구현, 로컬 테스트, 배포 준비와 초보자 오류를 정리한 UI 모형",
            "기능 범위를 작게 유지하고 모바일, 링크, 빌드 오류를 점검하는 체크리스트입니다.",
          ),
        ],
      },
    ],
  },
  "monetize-an-ai-built-website": {
    coverImage: "/images/blog/monetize-an-ai-built-website/cover.webp",
    coverImageAlt:
      "유용한 콘텐츠, 검색 유입, 수익화 선택지, 품질 정책 점검을 연결한 웹사이트 수익화 UI 모형",
    coverImageCaption: `사용자 가치와 정책 점검을 우선하는 웹사이트 수익화 구조입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 7,
        images: [
          makeImage(
            "/images/blog/monetize-an-ai-built-website/01-sustainable-monetization-flow.webp",
            "콘텐츠와 무료 도구, 검색 유입, 품질 개선, 여러 수익화 선택지를 연결한 UI 모형",
            "광고만 붙이는 방식이 아니라 문제 해결과 품질 개선을 반복하는 장기 흐름입니다.",
          ),
        ],
      },
    ],
  },
  "build-a-website-with-ai-without-coding": {
    coverImage: "/images/blog/build-a-website-with-ai-without-coding/cover.webp",
    coverImageAlt:
      "아이디어부터 페이지 기획, 프롬프트, 코드, 미리보기, 배포까지 이어지는 AI 홈페이지 제작 UI 모형",
    coverImageCaption: `코딩 초보자가 AI와 함께 홈페이지를 제작하는 전체 여섯 단계입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 5,
        images: [
          makeImage(
            "/images/blog/build-a-website-with-ai-without-coding/01-website-production-flow.webp",
            "페이지 정의, AI 요청, 코드와 반응형 화면 확인, 배포 점검으로 구성된 홈페이지 제작 UI 모형",
            "로컬 화면과 모바일 반응형, 내부 링크, 빌드 결과를 함께 확인하는 실전 점검 흐름입니다.",
          ),
        ],
      },
    ],
  },
  "codex-vscode-guide": {
    coverImage: "/images/blog/codex-vscode-guide/cover.webp",
    coverImageAlt:
      "프로젝트 폴더, AI 수정 요청, 코드 차이 검토, 로컬 확인으로 이어지는 AI 코딩 UI 모형",
    coverImageCaption: `프로젝트를 열고 수정 요청부터 결과 검증까지 진행하는 기본 작업 흐름입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 4,
        images: [
          makeImage(
            "/images/blog/codex-vscode-guide/01-safe-first-edit.webp",
            "수정 파일 지정, 변경 계획, 코드 차이 검토, 실행 확인으로 구성된 안전한 첫 수정 UI 모형",
            "첫 수정은 파일과 범위를 좁히고 변경된 줄과 검사 결과를 차례로 확인합니다.",
          ),
        ],
      },
    ],
  },
  "nextjs-vercel-deployment-guide": {
    coverImage: "/images/blog/nextjs-vercel-deployment-guide/cover.webp",
    coverImageAlt:
      "Next.js 프로젝트가 로컬 준비, Git 저장소, 배포 서비스를 거쳐 공개되는 전체 흐름 일러스트",
    coverImageCaption: `Next.js 프로젝트의 준비부터 자동 배포까지 전체 흐름을 보여주는 브랜드 이미지입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 864,
    sectionImages: [
      {
        sectionIndex: 1,
        images: [
          makeImage(
            "/images/blog/nextjs-vercel-deployment-guide/01-local-project.webp",
            "프로젝트 폴더, package.json 빌드 스크립트, 로컬 빌드 성공 상태를 보여주는 UI 모형",
            "프로젝트 구조와 빌드 명령을 먼저 확인하는 로컬 준비 단계입니다.",
            1200,
            720,
          ),
        ],
      },
      {
        sectionIndex: 2,
        images: [
          makeImage(
            "/images/blog/nextjs-vercel-deployment-guide/02-git-upload-flow.webp",
            "gitignore 확인, commit, push, 원격 저장소 반영 순서를 보여주는 UI 모형",
            "검증된 파일만 커밋하고 원격 저장소에 올리는 흐름입니다.",
            1200,
            720,
          ),
        ],
      },
      {
        sectionIndex: 3,
        images: [
          makeImage(
            "/images/blog/nextjs-vercel-deployment-guide/03-project-connection.webp",
            "저장소 선택, 프로젝트 설정, 환경변수 확인, 배포 시작을 보여주는 UI 모형",
            "저장소를 배포 프로젝트에 연결하고 설정을 확인하는 단계입니다.",
            1200,
            720,
          ),
        ],
      },
      {
        sectionIndex: 4,
        images: [
          makeImage(
            "/images/blog/nextjs-vercel-deployment-guide/04-deployment-status.webp",
            "배포 진행, 준비 완료, 빌드 오류, 로그 확인 상태를 함께 보여주는 UI 모형",
            "자동 재배포의 성공 상태와 실패 시 첫 오류 로그를 확인하는 위치입니다.",
            1200,
            720,
          ),
        ],
      },
    ],
  },
  "chatgpt-codex-webapp-review": {
    coverImage: "/images/blog/chatgpt-codex-webapp-review/cover.webp",
    coverImageAlt:
      "대화형 AI의 기획 결과를 작업 명세로 전달해 코딩 에이전트가 구현하고 검토하는 UI 모형",
    coverImageCaption: `기획 대화와 프로젝트 구현의 역할을 나눠 연결하는 흐름입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 4,
        images: [
          makeImage(
            "/images/blog/chatgpt-codex-webapp-review/01-role-workflow.webp",
            "아이디어 정리부터 요구사항, 파일 수정, 검사, 화면 검토까지 AI 역할을 비교한 UI 모형",
            "대화형 AI, 코딩 에이전트, 사용자가 단계마다 맡을 일을 구분했습니다.",
          ),
        ],
      },
    ],
  },
  "better-prompts-for-ai-coding": {
    coverImage: "/images/blog/better-prompts-for-ai-coding/cover.webp",
    coverImageAlt:
      "모호한 AI 코딩 요청과 목표, 범위, 유지 조건, 검증을 포함한 구조화 요청을 비교한 UI 모형",
    coverImageCaption: `수정 범위와 검증 기준의 유무가 코드 결과에 미치는 차이입니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 3,
        images: [
          makeImage(
            "/images/blog/better-prompts-for-ai-coding/01-coding-prompt-template.webp",
            "목표, 현재 상태, 수정 범위, 유지 조건, 완료 기준, 검증 명령을 채우는 AI 코딩 요청 UI 모형",
            "복사 가능한 작업 요청을 만들고 변경 파일과 타입 검사 결과까지 확인하는 예시입니다.",
          ),
        ],
      },
    ],
  },
  "github-pages-vs-vercel-for-beginners": {
    coverImage: "/images/blog/github-pages-vs-vercel-for-beginners/cover.webp",
    coverImageAlt:
      "정적 사이트 배포와 프레임워크 앱 배포의 기능을 비교하는 무료 호스팅 UI 모형",
    coverImageCaption: `정적 파일과 Next.js 앱에 맞는 배포 방식을 기능별로 비교했습니다. ${explanatoryCaption}`,
    coverImageWidth: 1536,
    coverImageHeight: 1024,
    sectionImages: [
      {
        sectionIndex: 9,
        images: [
          makeImage(
            "/images/blog/github-pages-vs-vercel-for-beginners/01-hosting-decision-guide.webp",
            "정적 HTML 사이트와 Next.js 앱의 서버 기능, 자동 빌드, 도메인 요구를 비교한 선택 UI 모형",
            "프로젝트 형태와 서버 기능 필요 여부에 따라 배포 방식을 고르는 체크 흐름입니다.",
          ),
        ],
      },
    ],
  },
};

export function applyBlogVisuals(post: BlogPost): BlogPost {
  const plan = blogVisualPlans[post.slug];

  if (!plan) {
    return post;
  }

  const imagesBySection = new Map(
    plan.sectionImages.map(({ sectionIndex, images }) => [sectionIndex, images]),
  );

  return {
    ...post,
    coverImage: plan.coverImage,
    coverImageAlt: plan.coverImageAlt,
    coverImageCaption: plan.coverImageCaption,
    coverImageWidth: plan.coverImageWidth,
    coverImageHeight: plan.coverImageHeight,
    sections: post.sections.map((section, sectionIndex) => ({
      ...section,
      image: undefined,
      imageAlt: undefined,
      imageCaption: undefined,
      imageWidth: undefined,
      imageHeight: undefined,
      imagePosition: undefined,
      imagePriority: undefined,
      images: imagesBySection.get(sectionIndex),
    })),
  };
}
