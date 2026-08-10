"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/tool-card";
import type { Tool } from "@/types/content";
import styles from "./tools-library.module.css";

type FilterKey = "전체" | "인기 도구" | string;
type SortKey = "latest" | "popular" | "name";

export function ToolsLibrary({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("전체");
  const [sort, setSort] = useState<SortKey>("popular");
  const categories = useMemo(() => ["전체", "인기 도구", ...Array.from(new Set(tools.map((tool) => tool.category)))], [tools]);

  const visibleTools = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");
    return tools
      .filter((tool) => {
        const matchesFilter = filter === "전체" || (filter === "인기 도구" ? tool.popular : tool.category === filter);
        const searchable = `${tool.name} ${tool.description} ${tool.category} ${tool.tags.join(" ")}`.toLocaleLowerCase("ko-KR");
        return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
      })
      .sort((a, b) => {
        if (sort === "latest") return b.releasedAt.localeCompare(a.releasedAt);
        if (sort === "name") return a.name.localeCompare(b.name, "ko-KR");
        return b.popularity - a.popularity;
      });
  }, [filter, query, sort, tools]);

  return (
    <div className={styles.library} id="tool-library">
      <div className={styles.heading}>
        <div><p className="eyebrow">TOOL LIBRARY</p><h2>원하는 도구를 <span className={styles.headingSecondLine}>빠르게 찾아보세요.</span></h2></div>
        <p>총 {tools.length}개 중 <strong>{visibleTools.length}개</strong> 표시</p>
      </div>

      <div className={styles.controls}>
        <label className={styles.search} aria-label="도구 이름 검색">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="도구 이름 또는 기능 검색" type="search" />
        </label>
        <label className={styles.sort}>
          <span>정렬</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
            <option value="popular">인기순</option>
            <option value="latest">최신순</option>
            <option value="name">이름순</option>
          </select>
        </label>
      </div>

      <div className={styles.filters} aria-label="도구 카테고리 필터">
        {categories.map((category) => (
          <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>
        ))}
      </div>

      {visibleTools.length > 0 ? (
        <div className={styles.grid} aria-live="polite">
          {visibleTools.map((tool) => <ToolCard tool={tool} key={tool.slug} />)}
        </div>
      ) : (
        <div className={styles.empty} role="status"><strong>일치하는 도구가 없습니다.</strong><p>검색어를 줄이거나 다른 카테고리를 선택해 보세요.</p></div>
      )}
    </div>
  );
}
