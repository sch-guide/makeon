import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="empty-page">
      <div className="site-container empty-card">
        <p className="eyebrow">404 · NOT FOUND</p>
        <h1>글을 찾을 수 없습니다.</h1>
        <p>주소가 바뀌었거나 아직 공개되지 않은 글일 수 있습니다.</p>
        <Link className="button button-primary" href="/blog">
          블로그로 돌아가기
        </Link>
      </div>
    </main>
  );
}
