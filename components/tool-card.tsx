import Image from "next/image";
import Link from "next/link";
import type { Tool } from "@/types/content";
import styles from "./tool-card.module.css";

export function ToolCard({ tool }: { tool: Tool }) {
  const isAvailable = tool.status === "available";

  return (
    <article className={styles.card} data-category={tool.category}>
      <Link className={styles.link} href={tool.href} aria-label={`${tool.name} ${tool.actionLabel ?? "사용하기"}`}>
        <div className={styles.thumbnail}>
          {tool.thumbnail ? (
            <Image
              src={tool.thumbnail}
              alt={tool.thumbnailAlt ?? `${tool.name} 예시 화면`}
              fill
              loading="lazy"
              sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1100px) 42vw, 430px"
            />
          ) : (
            <div className={styles.fallback} aria-hidden="true"><span>{tool.icon}</span><small>MAKEON TOOL</small></div>
          )}
          <span className={styles.previewLabel}>화면 미리보기</span>
        </div>

        <div className={styles.content}>
          <div className={styles.topline}>
            <span className={styles.category}>{tool.category}</span>
            {tool.popular && <span className={styles.popular}>인기</span>}
          </div>
          <div>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
          </div>
          <ul className={styles.tags} aria-label="핵심 기능">
            {tool.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <div className={styles.footer}>
            <span className={styles.availability}>{isAvailable ? "가입·설치 없이 바로 이용" : "공개 준비 중"}</span>
            <span className={isAvailable ? styles.cta : styles.ctaMuted}>
              {isAvailable ? (tool.actionLabel ?? "도구 사용하기") : "준비 중"}
              {isAvailable && <span aria-hidden="true">→</span>}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
