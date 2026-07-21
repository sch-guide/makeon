import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI 웹사이트 만들기",
    "AI 코딩",
    "무료 도구",
    "웹앱 만들기",
    "초보자 코딩",
    "MAKEON",
  ],
  authors: [{ name: "MAKEON" }],
  creator: "MAKEON",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 910,
        alt: "MAKEON - AI로 아이디어를 현실로",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">
          본문으로 바로가기
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
