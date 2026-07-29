"use client";

import { useMemo, useState } from "react";

type Props = {
  onAction: (sound: "pour" | "stir" | "complete") => void;
};

const initialColors = ["#A8C686", "#F1B8C5", "#A9D2D8", "#C9B6DC"];

const hexToRgb = (hex: string) => {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
};

const toHex = (value: number) =>
  Math.round(value).toString(16).padStart(2, "0").toUpperCase();

export function ColorMixGame({ onAction }: Props) {
  const [count, setCount] = useState(3);
  const [colors, setColors] = useState(initialColors);
  const [ratios, setRatios] = useState([40, 35, 25, 20]);
  const [container, setContainer] = useState("glass");
  const [mixed, setMixed] = useState(false);
  const [message, setMessage] = useState("");

  const result = useMemo(() => {
    const activeRatios = ratios.slice(0, count);
    const total = activeRatios.reduce((sum, value) => sum + value, 0) || 1;
    const rgb = colors.slice(0, count).reduce(
      (current, color, index) => {
        const value = hexToRgb(color);
        const weight = activeRatios[index] / total;
        return {
          r: current.r + value.r * weight,
          g: current.g + value.g * weight,
          b: current.b + value.b * weight,
        };
      },
      { r: 0, g: 0, b: 0 },
    );
    return {
      ...rgb,
      hex: `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`,
    };
  }, [colors, count, ratios]);

  const colorName =
    result.g > result.r && result.g > result.b
      ? "세이지 밀크"
      : result.r > result.b
        ? "로지 크림"
        : "라벤더 미스트";

  const randomize = () => {
    const nextColors = colors.map(
      () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`,
    );
    setColors(nextColors);
    setRatios(ratios.map(() => 20 + Math.floor(Math.random() * 61)));
    setMixed(false);
    setMessage("새로운 색상 미션을 만들었어요.");
  };

  return (
    <section className="relax-game-card" aria-labelledby="color-game-title">
      <div className="relax-game-heading">
        <div>
          <p className="eyebrow">GAME 08</p>
          <h2 id="color-game-title">컬러 액체 섞기</h2>
          <p>화면 RGB 기준으로 색과 비율을 섞어 새로운 색을 만들어보세요.</p>
        </div>
      </div>

      <div className="relax-color-layout">
        <div className="relax-color-controls">
          <div className="relax-inline-settings">
            <label>
              색상 수
              <select value={count} onChange={(event) => setCount(Number(event.target.value))}>
                <option value="2">2개</option>
                <option value="3">3개</option>
                <option value="4">4개</option>
              </select>
            </label>
            <label>
              용기
              <select value={container} onChange={(event) => setContainer(event.target.value)}>
                <option value="glass">둥근 유리잔</option>
                <option value="bottle">긴 병</option>
                <option value="bowl">넓은 볼</option>
              </select>
            </label>
          </div>
          {colors.slice(0, count).map((color, index) => (
            <div className="relax-color-row" key={index}>
              <label>
                색상 {index + 1}
                <input
                  type="color"
                  value={color}
                  onChange={(event) => {
                    setColors((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? event.target.value : item,
                      ),
                    );
                    setMixed(false);
                    onAction("pour");
                  }}
                />
              </label>
              <label>
                비율 {ratios[index]}%
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={ratios[index]}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setRatios((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? value : item,
                      ),
                    );
                    setMixed(false);
                  }}
                />
              </label>
            </div>
          ))}
          <div className="relax-color-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                setMixed(true);
                setMessage(`${colorName} 색을 완성했어요.`);
                onAction("stir");
                window.setTimeout(() => onAction("complete"), 180);
              }}
            >
              색상 섞기
            </button>
            <button type="button" className="button button-secondary" onClick={randomize}>
              랜덤 미션
            </button>
          </div>
        </div>

        <div className={`relax-color-result is-${container} ${mixed ? "is-mixed" : ""}`}>
          <div style={{ "--mixed-color": result.hex } as React.CSSProperties} aria-hidden="true">
            <span />
          </div>
          <h3>{colorName}</h3>
          <strong>{result.hex}</strong>
          <p>RGB({Math.round(result.r)}, {Math.round(result.g)}, {Math.round(result.b)})</p>
          <button
            type="button"
            className="button button-secondary"
            onClick={async () => {
              await navigator.clipboard.writeText(result.hex);
              setMessage(`${result.hex} 색상 코드를 복사했어요.`);
            }}
          >
            색상 코드 복사
          </button>
        </div>
      </div>
      <p className="relax-game-status" aria-live="polite">{message}</p>
      <p className="relax-disclaimer">
        이 결과는 화면의 RGB 가중 혼합값이며 실제 물감이나 인쇄 색상과 동일하지 않을 수 있습니다.
      </p>
    </section>
  );
}
