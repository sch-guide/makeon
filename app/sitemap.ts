import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog-posts";
import { tools } from "@/content/tools";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRouteUpdatedAt: Record<string, string> = {
    "": "2026-08-04",
    "/blog": "2026-08-04",
    "/about": "2026-08-04",
  };
  const coreRoutes = [
    "",
    "/blog",
    "/tools",
    "/about",
    "/contact",
    "/privacy",
  ];
  const toolRoutes = tools
    .filter((tool) => tool.status === "available")
    .map((tool) => ({ route: tool.href, lastModified: tool.updatedAt ?? tool.releasedAt }));
  const staticRoutes = [
    ...coreRoutes.map((route) => ({ route, lastModified: staticRouteUpdatedAt[route] ?? "2026-08-12" })),
    ...toolRoutes,
  ];

  return [
    ...staticRoutes.map(({ route, lastModified }) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(lastModified),
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
