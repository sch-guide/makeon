"use client";

import { FormEvent, useState } from "react";

type PromptFields = {
  projectIdea: string;
  features: string;
  mood: string;
  audience: string;
  requirements: string;
};

const initialFields: PromptFields = {
  projectIdea: "",
  features: "",
  mood: "",
  audience: "",
  requirements: "",
};

function optionalValue(value: string, fallback: string) {
  return value.trim() || fallback;
}

function buildPrompt(fields: PromptFields) {
  const projectIdea = fields.projectIdea.trim();
  const features = optionalValue(
    fields.features,
    "목표를 달성하는 데 꼭 필요한 핵심 기능을 먼저 제안하고, 기능을 과도하게 늘리지 말아 주세요.",
  );
  const mood = optionalValue(
    fields.mood,
    "깔끔하고 가독성이 좋은 현대적인 디자인으로 구성해 주세요.",
  );
  const audience = optionalValue(
    fields.audience,
    "처음 방문한 사람도 설명 없이 쉽게 사용할 수 있는 일반 사용자입니다.",
  );
  const requirements = optionalValue(
    fields.requirements,
    "추가 요구사항은 없습니다. 필요한 부분은 합리적으로 가정하되 가정한 내용을 먼저 알려 주세요.",
  );

  return [
    "당신은 기획, UX/UI, 프론트엔드 구현에 능숙한 제품 개발 전문가입니다.",
    "아래 조건을 바탕으로 실제로 실행하고 사용할 수 있는 결과물을 만들어 주세요.",
    "",
    "## 1. 만들고 싶은 것",
    projectIdea,
    "",
    "## 2. 대상 사용자",
    audience,
    "",
    "## 3. 필요한 기능",
    features,
    "",
    "## 4. 원하는 디자인과 분위기",
    mood,
    "",
    "## 5. 추가 요구사항",
    requirements,
    "",
    "## 6. 작업 원칙",
    "- 먼저 요구사항을 짧게 정리하고, 구현 범위와 작업 순서를 제안해 주세요.",
    "- 초보자도 관리할 수 있도록 구조와 이름을 단순하고 명확하게 만들어 주세요.",
    "- 모바일, 태블릿, PC에서 자연스럽게 보이는 반응형 화면으로 구현해 주세요.",
    "- 버튼, 입력창, 링크에 키보드 접근성과 충분한 색상 대비를 적용해 주세요.",
    "- 요청하지 않은 로그인, 데이터베이스, 결제 같은 큰 기능은 임의로 추가하지 마세요.",
    "- 기존 프로젝트가 있다면 현재 구조와 디자인을 최대한 유지하고 필요한 파일만 수정해 주세요.",
    "- 오류가 발생하면 원인을 찾고 수정한 뒤 다시 실행해 확인해 주세요.",
    "",
    "## 7. 완료 기준",
    "- 핵심 기능이 실제로 동작해야 합니다.",
    "- 빈 입력이나 잘못된 입력처럼 기본적인 예외 상황을 안내해야 합니다.",
    "- 모든 메뉴와 링크가 정상 동작해야 합니다.",
    "- 모바일 화면에서 가로 스크롤 없이 읽고 사용할 수 있어야 합니다.",
    "- 실행 방법, 수정한 파일, 사용 방법을 초보자도 이해할 수 있게 정리해 주세요.",
    "",
    "## 8. 응답 방식",
    "1. 구현 전 요구사항과 작업 계획을 간단히 요약해 주세요.",
    "2. 필요한 코드를 직접 작성하거나 기존 파일을 수정해 주세요.",
    "3. 완료 후 실행·검증 결과와 사용 방법을 알려 주세요.",
    "4. 추가로 결정이 꼭 필요한 사항이 없다면 질문만 하지 말고 합리적인 기본값으로 진행해 주세요.",
  ].join("\n");
}

export function PromptGenerator() {
  const [fields, setFields] = useState(initialFields);
  const [result, setResult] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const updateField = (field: keyof PromptFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setCopyMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(buildPrompt(fields));
    setCopyMessage("");
  };

  const handleCopy = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopyMessage("프롬프트를 복사했습니다. ChatGPT 또는 Codex에 붙여넣어 보세요.");
    } catch {
      setCopyMessage("자동 복사가 어려워요. 아래 결과를 선택해 직접 복사해 주세요.");
    }
  };

  return (
    <div className="prompt-builder">
      <form className="prompt-form-card" onSubmit={handleSubmit}>
        <div className="prompt-card-heading">
          <span className="category-pill">STEP 1</span>
          <div>
            <h2>아이디어를 알려주세요.</h2>
            <p>첫 번째 항목만 필수이며, 나머지는 비워두면 안전한 기본 문장으로 채워집니다.</p>
          </div>
        </div>

        <div className="prompt-form-grid">
          <div className="form-field form-field-full">
            <label htmlFor="project-idea">
              만들고 싶은 것 <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="project-idea"
              name="projectIdea"
              value={fields.projectIdea}
              onChange={(event) => updateField("projectIdea", event.target.value)}
              placeholder="예: 회의 메모를 핵심 내용과 할 일로 정리하는 업무용 웹앱"
              rows={4}
              required
            />
            <p>누가 어떤 상황에서 무엇을 하려는지 한두 문장으로 적으면 더 좋아요.</p>
          </div>

          <div className="form-field">
            <label htmlFor="features">필요한 기능</label>
            <textarea
              id="features"
              name="features"
              value={fields.features}
              onChange={(event) => updateField("features", event.target.value)}
              placeholder="예: 메모 입력, 핵심 요약, 담당자·마감일 목록"
              rows={4}
            />
          </div>

          <div className="form-field">
            <label htmlFor="mood">원하는 디자인·분위기</label>
            <textarea
              id="mood"
              name="mood"
              value={fields.mood}
              onChange={(event) => updateField("mood", event.target.value)}
              placeholder="예: 따뜻하고 미니멀한 베이지·세이지 디자인"
              rows={4}
            />
          </div>

          <div className="form-field">
            <label htmlFor="audience">대상 사용자</label>
            <textarea
              id="audience"
              name="audience"
              value={fields.audience}
              onChange={(event) => updateField("audience", event.target.value)}
              placeholder="예: 회의 후 정리 시간을 줄이고 싶은 직장인"
              rows={4}
            />
          </div>

          <div className="form-field">
            <label htmlFor="requirements">추가 요구사항</label>
            <textarea
              id="requirements"
              name="requirements"
              value={fields.requirements}
              onChange={(event) => updateField("requirements", event.target.value)}
              placeholder="예: 로그인과 데이터베이스는 제외, Next.js와 TypeScript 사용"
              rows={4}
            />
          </div>
        </div>

        <button className="button button-primary prompt-submit" type="submit">
          프롬프트 만들기 <span aria-hidden="true">→</span>
        </button>
        <p className="generator-privacy">
          입력 내용은 이 브라우저 안에서만 처리되며 MAKEON 서버에 전송하거나 저장하지 않습니다.
        </p>
      </form>

      <section className="prompt-output-card" aria-labelledby="prompt-result-title">
        <div className="prompt-output-heading">
          <div>
            <span className="category-pill">STEP 2</span>
            <h2 id="prompt-result-title">완성 프롬프트</h2>
          </div>
          {result ? (
            <button className="button button-secondary" type="button" onClick={handleCopy}>
              결과 복사하기
            </button>
          ) : null}
        </div>

        {result ? (
          <textarea
            className="prompt-result"
            aria-label="생성된 완성 프롬프트"
            value={result}
            readOnly
            rows={26}
          />
        ) : (
          <div className="prompt-empty-state">
            <span aria-hidden="true">✦</span>
            <h3>입력을 마치면 이곳에 결과가 나타납니다.</h3>
            <p>
              프로젝트 목표, 사용자, 기능, 디자인, 작업 원칙과 완료 기준이 포함된 구조화된
              프롬프트를 만들어 드립니다.
            </p>
          </div>
        )}

        <p className="copy-feedback" aria-live="polite">
          {copyMessage}
        </p>
      </section>
    </div>
  );
}
