"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/blog-card";
import type { BlogPost } from "@/types/content";

const filterCategories = [
  "AI 활용·프롬프트",
  "AI 코딩·Codex",
  "웹사이트·웹앱 제작",
  "배포·수익화",
  "무료 도구",
] as const;

type BlogFilterProps = {
  posts: BlogPost[];
};

export function BlogFilter({ posts }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>("전체 글");
  const categories = useMemo(
    () => [
      { label: "전체 글", count: posts.length },
      ...filterCategories.map((category) => ({
        label: category,
        count: posts.filter((post) => post.tags?.includes(category)).length,
      })),
    ],
    [posts],
  );
  const filteredPosts =
    activeCategory === "전체 글"
      ? posts
      : posts.filter((post) => post.tags?.includes(activeCategory));
  const [featuredPost, ...otherPosts] = filteredPosts;

  return (
    <>
      <div className="category-row" role="group" aria-label="블로그 카테고리 필터">
        {categories.map((category) => {
          const isActive = activeCategory === category.label;

          return (
            <button
              className={`category-chip${isActive ? " category-chip-active" : ""}`}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category.label)}
              key={category.label}
            >
              {category.label} {category.count}
            </button>
          );
        })}
      </div>

      <p className="blog-filter-status" aria-live="polite">
        {activeCategory}에서 {filteredPosts.length}개의 글을 표시하고 있습니다.
      </p>

      {featuredPost ? (
        <>
          <div className="blog-index-featured">
            <BlogCard post={featuredPost} featured />
          </div>
          {otherPosts.length ? (
            <div className="blog-index-grid">
              {otherPosts.map((post) => (
                <BlogCard post={post} key={post.slug} />
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className="blog-filter-empty" role="status">
          <p>이 카테고리에 등록된 글이 없습니다.</p>
        </div>
      )}
    </>
  );
}
