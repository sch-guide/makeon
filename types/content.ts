export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  readingTime: string;
  featured?: boolean;
  sections: BlogSection[];
};

export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  status: "coming-soon" | "available";
  icon: string;
};
