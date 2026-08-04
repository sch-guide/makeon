import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TetrisGame } from "@/components/tetris-game/tetris-game";
import styles from "@/components/tetris-game/tetris-game.module.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "MAKEON 테트리스 | 무료 온라인 블록 퍼즐 게임",
  description: "설치 없이 모바일과 PC에서 즐기는 무료 테트리스 게임입니다. 줄을 지우고 점수를 올려 오늘·전체 온라인 랭킹에 도전해보세요.",
  alternates: { canonical: "/tools/makeon-tetris" },
  openGraph: {
    title: "MAKEON 테트리스 | 무료 온라인 블록 퍼즐",
    description: "파스텔 블록을 빈틈없이 쌓고 온라인 TOP 20 랭킹에 도전해보세요.",
    url: "/tools/makeon-tetris",
    images: [{ url: "/og.png", alt: "MAKEON 무료 테트리스 게임" }],
  },
};

export default function MakeonTetrisPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "MAKEON 테트리스",
    url: `${siteConfig.url}/tools/makeon-tetris`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    description: "모바일과 PC에서 즐기고 온라인 랭킹에 도전하는 무료 테트리스 게임",
    playMode: "SinglePlayer",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        eyebrow="FREE BLOCK PUZZLE"
        title="MAKEON 테트리스"
        description="파스텔 블록을 빈틈없이 쌓아 줄을 지우고, 오늘과 전체 온라인 랭킹에 도전해보세요."
      />

      <section className={styles.pageSection}>
        <div className="site-container">
          <div className={styles.intro}>
            <p className="eyebrow">STACK · CLEAR · RANK</p>
            <h2>익숙한 블록 퍼즐을 MAKEON 색감으로 즐겨보세요.</h2>
            <p>
              일곱 종류의 블록이 무작위 7-bag 방식으로 등장합니다. 가로줄을 빈틈없이 채우면 줄이 사라지고,
              10줄마다 레벨과 낙하 속도가 올라갑니다. 게임 기록은 닉네임과 함께 온라인 TOP 20에 표시할 수 있습니다.
            </p>
          </div>

          <TetrisGame />

          <section className={styles.guide} aria-labelledby="tetris-guide-title">
            <p className="eyebrow">HOW TO PLAY</p>
            <h2 id="tetris-guide-title">게임 방법</h2>
            <p>가입이나 설치 없이 시작할 수 있으며, 랭킹에는 사용자가 정한 공개 닉네임만 표시됩니다.</p>
            <div className={styles.guideGrid}>
              <article>
                <span>01</span>
                <h3>블록을 이동하고 회전하세요.</h3>
                <p>PC에서는 방향키와 Space를, 모바일에서는 게임판 아래의 큰 조작 버튼을 사용합니다.</p>
              </article>
              <article>
                <span>02</span>
                <h3>빈틈없이 가로줄을 채우세요.</h3>
                <p>한 번에 여러 줄을 지울수록 점수가 커집니다. 네 줄을 동시에 지우면 가장 큰 보너스를 받습니다.</p>
              </article>
              <article>
                <span>03</span>
                <h3>온라인 최고 기록에 도전하세요.</h3>
                <p>오늘과 전체 랭킹을 나누어 확인할 수 있으며, 더 좋은 기록만 개인 최고 기록으로 저장됩니다.</p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
