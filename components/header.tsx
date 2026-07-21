import Link from "next/link";
import { navigation } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link className="brand" href="/" aria-label="MAKEON 홈">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span>MAKEON</span>
        </Link>

        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="mobile-menu">
          <summary aria-label="메뉴 열기">
            <span className="menu-line" />
            <span className="menu-line" />
            <span className="menu-line" />
          </summary>
          <nav aria-label="모바일 메뉴">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/privacy">개인정보처리방침</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
