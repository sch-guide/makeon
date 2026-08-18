# MAKEON

**AI를 배우고, 활용하고, 직접 써보는 실용형 AI 놀이터**

MAKEON은 초보자가 AI를 실제 생활과 작업에 활용하고, 무료 웹도구와 게임을 직접 체험할 수 있도록 돕는 콘텐츠·도구 중심 웹사이트입니다.

콘텐츠 역할은 다음과 같이 구분합니다.

- 블로그: 검색 유입과 문제 해결을 위한 실용 정보
- 무료 도구·게임: 가입과 설치 없이 브라우저에서 직접 체험하는 콘텐츠
- 전체 브랜드: 배우기, 활용하기, 직접 써보기를 연결하는 실용형 AI 놀이터

현재 버전에는 홈, 블로그 글 19개, 무료 도구·게임 7개, 소개, 문의, 개인정보처리방침이 포함되어 있습니다. 대부분의 기능은 브라우저에서 바로 동작하며 일부 게임의 온라인 랭킹은 Supabase 익명 인증을 사용합니다.

## 사용 기술

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Vercel 배포에 적합한 정적 콘텐츠 구조
- Metadata API, `sitemap.xml`, `robots.txt`, JSON-LD 기본 SEO

## 1. 프로젝트 구조

```text
MAKEON/
├─ app/
│  ├─ about/page.tsx             # 소개
│  ├─ blog/
│  │  ├─ [slug]/page.tsx         # 블로그 상세 글 공통 화면
│  │  └─ page.tsx                # 블로그 목록
│  ├─ contact/page.tsx           # 문의
│  ├─ privacy/page.tsx           # 개인정보처리방침
│  ├─ tools/page.tsx             # 무료 도구 목록
│  ├─ globals.css                # 전체 디자인과 반응형 스타일
│  ├─ layout.tsx                 # 공통 레이아웃과 SEO 기본값
│  ├─ page.tsx                   # 홈
│  ├─ robots.ts                  # /robots.txt 자동 생성
│  └─ sitemap.ts                 # /sitemap.xml 자동 생성
├─ components/                   # 여러 페이지에서 재사용하는 UI
├─ content/
│  ├─ blog-posts.ts              # 블로그 글 데이터
│  └─ tools.ts                   # 무료 도구 데이터
├─ lib/
│  ├─ format.ts                  # 날짜 표시 함수
│  └─ site.ts                    # 사이트 이름, 주소, 이메일, 메뉴
├─ public/
│  └─ og.png                     # 링크 공유용 이미지
├─ types/content.ts              # 글과 도구 데이터 형식
├─ .env.example                  # 환경 변수 예시
├─ next.config.ts
├─ package.json
└─ README.md
```

페이지 화면은 `app`, 반복되는 UI는 `components`, 자주 추가할 콘텐츠는 `content`에 분리했습니다. 대부분의 운영 작업은 `content` 폴더의 데이터만 수정하면 됩니다.

## 2. 실행 방법

### 준비물

- Node.js 24 LTS 권장(Next.js 16이 지원하는 Node.js 버전 사용)
- npm(Node.js 설치 시 함께 설치됨)

### 처음 실행

프로젝트 폴더에서 다음 명령을 차례로 실행합니다.

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 사이트가 보입니다. 개발 서버를 종료하려면 터미널에서 `Ctrl + C`를 누릅니다.

### 배포 전 확인

```bash
npm run typecheck
npm run build
```

두 명령이 오류 없이 끝나면 배포할 준비가 된 것입니다.

## 3. 블로그 글 추가 방법

블로그 글은 [`content/blog-posts.ts`](./content/blog-posts.ts)의 `blogPosts` 배열에 저장됩니다. 새 글 객체를 배열 맨 앞에 추가하면 홈과 블로그 목록, sitemap에 자동으로 반영됩니다.

```ts
{
  slug: "my-first-ai-project",
  title: "AI로 첫 프로젝트를 만든 과정",
  summary: "목록 카드에 표시할 짧은 요약입니다.",
  description: "검색 결과에 표시할 글 설명입니다.",
  publishedAt: "2026-07-21",
  category: "제작 후기",
  readingTime: "5분",
  featured: true,
  sections: [
    {
      heading: "첫 번째 소제목",
      paragraphs: [
        "첫 번째 문단입니다.",
        "두 번째 문단입니다."
      ],
      bullets: ["목록 항목 1", "목록 항목 2"]
    }
  ]
}
```

작성할 때 확인할 점:

1. `slug`는 주소가 되므로 영문 소문자와 하이픈만 사용합니다.
2. `slug`는 다른 글과 겹치면 안 됩니다.
3. 날짜는 `YYYY-MM-DD` 형식으로 적습니다.
4. `featured: true`인 글은 홈의 최신 글 카드에 강조 표시할 수 있습니다.
5. `sections`를 추가하면 별도 페이지 파일을 만들지 않아도 `/blog/slug` 상세 페이지가 자동 생성됩니다.

## 4. 무료 도구 추가 방법

도구 카드는 [`content/tools.ts`](./content/tools.ts)의 `tools` 배열에서 관리합니다.

```ts
{
  slug: "simple-text-counter",
  name: "글자 수 세기",
  description: "입력한 문장의 글자 수와 단어 수를 확인합니다.",
  category: "문서 도구",
  status: "coming-soon",
  icon: "T"
}
```

1. 준비 중인 도구는 `status: "coming-soon"`으로 추가합니다. 카드에 Coming Soon 상태가 표시됩니다.
2. 기능 페이지를 `app/tools/[도구-slug]/page.tsx`에 만든 뒤 `status: "available"`로 바꾸면 카드 버튼이 `/tools/[도구-slug]`로 연결됩니다.
3. 도구가 늘어나도 `app/tools/page.tsx`를 수정할 필요는 없습니다.

첫 번째 `AI 프롬프트 생성기`는 요청대로 자리만 마련했으며 실제 기능은 아직 연결하지 않았습니다.

## 5. 사이트 정보 수정

배포 전에 [`lib/site.ts`](./lib/site.ts)에서 아래 값을 실제 정보로 바꿉니다.

- `email`: 실제로 받을 문의 이메일
- 기본 `url`: 사용할 실제 도메인

로컬 환경이나 Vercel에서는 `NEXT_PUBLIC_SITE_URL` 환경 변수로 주소를 지정할 수 있습니다.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

개인정보처리방침의 운영자 정보와 날짜는 실제 운영 상황에 맞게 유지하세요. 광고, 게임 랭킹 또는 외부 서비스가 변경되면 사용하는 정보와 제3자 서비스 내용도 함께 갱신해야 합니다.

## Supabase 온라인 랭킹 설정

파스텔 스택 게임은 Supabase 연결 전에도 기존 브라우저 최고 기록 방식으로 정상 작동합니다. 온라인 랭킹을 활성화하려면 다음 순서로 설정합니다.

1. Supabase 프로젝트에서 익명 로그인을 활성화합니다.
2. Supabase SQL Editor에서 `supabase/migrations/20260801_create_game_leaderboards.sql`을 실행합니다.
3. 로컬 개발 환경의 `.env.local`과 Vercel 환경변수에 다음 값을 설정합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY`는 서버 전용입니다. 브라우저 컴포넌트에서 import하거나 `NEXT_PUBLIC_` 접두사를 붙이거나 Git에 커밋하면 안 됩니다. 환경변수 적용 후 Vercel을 다시 배포하면 익명 인증, 닉네임, 오늘·전체 랭킹과 서버 검증 점수 제출이 활성화됩니다.

## 6. Vercel 배포 방법

### GitHub를 연결하는 방법

1. 이 프로젝트를 GitHub 저장소에 올립니다.
2. [Vercel](https://vercel.com)에 로그인하고 **Add New → Project**를 선택합니다.
3. GitHub 저장소 목록에서 MAKEON 저장소를 가져옵니다.
4. Framework Preset이 **Next.js**인지 확인합니다.
5. Environment Variables에 `NEXT_PUBLIC_SITE_URL`을 추가합니다. 온라인 랭킹을 사용할 경우 위의 Supabase 환경변수 3개도 Production, Preview, Development에 설정합니다.
6. **Deploy**를 누릅니다.

이후 GitHub의 기본 브랜치에 변경 사항을 올리면 Vercel이 자동으로 새 버전을 배포합니다.

### 개인 도메인 연결

Vercel 프로젝트의 **Settings → Domains**에서 도메인을 추가하고 안내되는 DNS 레코드를 도메인 구매처에 등록합니다. 연결 후 `NEXT_PUBLIC_SITE_URL`도 `https://실제도메인`으로 변경한 다음 다시 배포합니다.

## 7. SEO와 AdSense 준비 사항

- 각 페이지에 제목, 설명, canonical 주소를 설정했습니다.
- 블로그 글마다 `BlogPosting` JSON-LD가 생성됩니다.
- `/sitemap.xml`과 `/robots.txt`가 자동 생성됩니다.
- `public/og.png`가 검색 결과와 메신저 공유 카드에 사용됩니다.
- 본문 폭과 사이드 영역을 분리해 추후 광고를 삽입하기 쉽습니다.
- 개인정보처리방침, 소개, 문의 페이지를 포함했습니다.

AdSense 신청 전에는 실제 도메인과 이메일을 적용하고, 충분한 고유 콘텐츠를 꾸준히 추가하고, 깨진 링크가 없는지 확인하세요. 광고 코드는 승인 후 넣는 것을 권장합니다. 블로그 상세 페이지의 `article-aside` 내부 또는 본문 섹션 사이가 광고 컴포넌트를 추가하기 쉬운 위치입니다. 광고가 콘텐츠 읽기를 방해하지 않도록 여백과 개수를 보수적으로 유지하세요.

## 현재 포함하지 않은 기능

- 이메일 기반 회원가입과 회원 관리
- 컬러 정렬·메모리 게임의 온라인 랭킹(파스텔 스택 검증 후 확장 예정)
- 댓글, 관리자 화면, 온라인 문의 폼

온라인 랭킹은 Supabase 익명 인증을 사용하며 이메일, 전화번호 또는 실명을 요구하지 않습니다. Supabase가 연결되지 않거나 장애가 발생해도 게임과 브라우저 기록은 계속 사용할 수 있습니다.
