import { BlogBgm } from "@/components/blog-bgm";

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <BlogBgm>{children}</BlogBgm>;
}
