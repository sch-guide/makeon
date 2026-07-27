import Link from "next/link";
import type { Tool } from "@/types/content";

export function ToolCard({ tool }: { tool: Tool }) {
  const isAvailable = tool.status === "available";

  return (
    <article className="tool-card">
      <div className="tool-card-icon" aria-hidden="true">
        {tool.icon}
      </div>
      <div className="tool-card-content">
        <div className="tool-card-topline">
          <span className="category-pill">{tool.category}</span>
          <span className="status-pill">{isAvailable ? "바로 사용" : "Coming Soon"}</span>
        </div>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
      </div>
      {isAvailable ? (
        <Link className="button button-primary" href={`/tools/${tool.slug}`}>
          {tool.actionLabel ?? "도구 사용하기"}
        </Link>
      ) : (
        <button className="button button-muted" type="button" disabled>
          준비 중입니다
        </button>
      )}
    </article>
  );
}
