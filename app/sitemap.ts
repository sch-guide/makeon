import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog-posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRouteUpdatedAt: Record<string, string> = {
    "": "2026-08-04",
    "/blog": "2026-08-04",
    "/about": "2026-08-04",
  };
  const staticRoutes = [
    "",
    "/blog",
    "/tools",
    "/tools/ai-prompt-generator",
    "/tools/digital-squishy-playground",
    "/tools/sensory-toy-playground",
    "/tools/pastel-stack-game",
    "/tools/pastel-memory-match",
    "/tools/memory-token-battle",
    "/tools/pastel-color-sort",
    "/tools/pastel-block-puzzle",
    "/about",
    "/contact",
    "/privacy",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(staticRouteUpdatedAt[route] ?? "2026-07-22"),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority:
        route === ""
          ? 1
          : route === "/blog" || route === "/tools" || route.startsWith("/tools/")
            ? 0.8
            : 0.6,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
