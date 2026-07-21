import Link from "next/link";
import type { BlogPost } from "@/types/content";
import { formatDate } from "@/lib/format";

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className={`blog-card${featured ? " blog-card-featured" : ""}`}>
      <div className="blog-card-topline">
        <span className="category-pill">{post.category}</span>
      </div>
      <div>
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.summary}</p>
      </div>
      <div className="blog-card-footer">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <Link className="card-link" href={`/blog/${post.slug}`}>
          읽어보기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
