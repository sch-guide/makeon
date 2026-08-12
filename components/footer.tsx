import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              M
            </span>
            <span>MAKEON</span>
          </Link>
          <p className="footer-description">{siteConfig.description}</p>
        </div>

        <div>
          <p className="footer-title">둘러보기</p>
          <nav className="footer-links" aria-label="푸터 메뉴">
            {navigation.slice(1).map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="footer-title">안내</p>
          <nav className="footer-links" aria-label="정책 메뉴">
            <Link href="/privacy">개인정보처리방침</Link>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </nav>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <p>© {new Date().getFullYear()} MAKEON. All rights reserved.</p>
        <p>AI로 배우고, 만들고, 직접 써보세요.</p>
      </div>
    </footer>
  );
}
