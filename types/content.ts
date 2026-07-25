export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  codeBlock?: {
    label: string;
    code: string;
  };
  contextualLinks?: {
    prefix: string;
    label: string;
    href: string;
    suffix?: string;
  }[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  summary: string;
  description: string;
  primaryKeyword?: string;
  relatedKeywords?: string[];
  publishedAt: string;
  updatedAt?: string;
  category: string;
  readingTime: string;
  featured?: boolean;
  reviewNote?: {
    checkedAt: string;
    environment: string;
    notice: string;
  };
  sections: BlogSection[];
  faqs?: BlogFaq[];
  relatedSlugs?: string[];
  toolCta?: {
    title: string;
    description: string;
    href: string;
    label: string;
  };
  sources?: {
    label: string;
    href: string;
  }[];
};

export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  status: "coming-soon" | "available";
  icon: string;
};
