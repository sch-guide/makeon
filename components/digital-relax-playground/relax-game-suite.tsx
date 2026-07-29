"use client";

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type SuiteGameId =
  | "magnet"
  | "sand"
  | "jelly"
  | "bottle"
  | "cat-paw"
  | "ice"
  | "crunch"
  | "cloud";

type ActionSound = "bubble" | "pour" | "stir" | "complete";

type Props = {
  game: SuiteGameId;
  onAction: (sound: ActionSound, special?: boolean) => void;
};

const seeded = (index: number, salt = 0) => {
  const value = Math.sin(index * 9301 + salt * 49297) * 233280;
  return value - Math.floor(value);
};

function MagnetGame({ onAction }: Pick<Props, "onAction">) {
  const [strength, setStrength] = useState(62);
  const [magnet, setMagnet] = useState({ x: 50, y: 50, active: false });
  const particles = useMemo(
    () =>
      Array.from({ length: 54 }, (_, index) => ({
        x: 7 + seeded(index, 1) * 86,
        y: 9 + seeded(index, 2) * 82,
        size: 8 + seeded(index, 3) * 13,
        tone: index % 3,
      })),
    [],
  );
  const lastSoundRef = useRef(0);

  const moveMagnet = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMagnet({ x, y, active: true });
    if (Date.now() - lastSoundRef.current > 180) {
      lastSoundRef.current = Date.now();
      onAction("stir");
    }
  };

  return (
    <section className="relax-suite-game relax-magnet-game">
      <div className="relax-suite-copy">
        <p className="eyebrow">LIQUID MAGNET</p>
        <h3>빛나는 입자를 손끝으로 모아보세요.</h3>
        <p>놀이 영역을 누르거나 드래그하면 유리 구슬이 자석 쪽으로 이동합니다.</p>
      </div>
      <div
        className="relax-magnet-stage"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          moveMagnet(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) moveMagnet(event);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          setMagnet((current) => ({ ...current, active: false }));
          onAction("complete");
        }}
      >
        <span
          className={`relax-magnet-cursor ${magnet.active ? "is-active" : ""}`}
          style={{ left: `${magnet.x}%`, top: `${magnet.y}%` }}
          aria-hidden="true"
        />
        {particles.map((particle, index) => {
          const pull = magnet.active ? strength / 100 : 0;
          const dx = (magnet.x - particle.x) * pull * 0.72;
          const dy = (magnet.y - particle.y) * pull * 0.72;
          return (
            <span
              className={`relax-magnet-particle tone-${particle.tone}`}
              style={{
                "--particle-x": `${particle.x + dx}%`,
                "--particle-y": `${particle.y + dy}%`,
                "--particle-size": `${particle.size}px`,
                "--particle-delay": `${(index % 8) * -0.12}s`,
              } as CSSProperties}
              key={index}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <div className="relax-suite-options">
        <label>
          자석 강도 <strong>{strength}%</strong>
          <input
            type="range"
            min="20"
            max="100"
            value={strength}
            onChange={(event) => setStrength(Number(event.target.value))}
          />
        </label>
        <span>손끝의 빛 원이 자석 위치를 나타냅니다.</span>
      </div>
    </section>
  );
}

function SandGame({ onAction }: Pick<Props, "onAction">) {
  const [cut, setCut] = useState(56);
  const [cuts, setCuts] = useState(0);
  const [cutting, setCutting] = useState(false);
  const gemFound = cuts >= 3;

  const updateCut = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCut(Math.max(18, Math.min(82, ((event.clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <section className="relax-suite-game relax-sand-game">
      <div className="relax-suite-copy">
        <p className="eyebrow">KINETIC SAND CUTTING</p>
        <h3>층층이 쌓인 모래 케이크를 잘라보세요.</h3>
        <p>칼을 좌우로 움직인 뒤 놓으면 절단면과 모래 부스러기가 나타납니다.</p>
      </div>
      <div
        className={`relax-sand-stage ${cutting ? "is-cutting" : ""}`}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setCutting(true);
          updateCut(event);
          onAction("stir");
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) updateCut(event);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          setCutting(false);
          setCuts((current) => current + 1);
          onAction(cuts >= 2 ? "complete" : "bubble", cuts >= 2);
        }}
      >
        <div className="relax-sand-cake" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          {gemFound ? <i>◆</i> : null}
        </div>
        <div className="relax-sand-knife" style={{ left: `${cut}%` }} aria-hidden="true">
          <span />
        </div>
        <div className="relax-sand-cutline" style={{ left: `${cut}%` }} aria-hidden="true" />
        <div className="relax-sand-crumbs" aria-hidden="true">
          {Array.from({ length: Math.min(18, cuts * 5) }, (_, index) => <i key={index} />)}
        </div>
      </div>
      <div className="relax-suite-status">
        <span>자른 횟수 <strong>{cuts}</strong></span>
        <span>{gemFound ? "숨겨진 보석을 찾았어요!" : "세 번 자르면 보석이 나타나요."}</span>
      </div>
    </section>
  );
}

type Topping = {
  id: number;
  kind: string;
  x: number;
  y: number;
  rotate: number;
};

const toppingIcons: Record<string, string> = {
  cream: "⌁",
  strawberry: "🍓",
  berry: "●",
  star: "★",
  heart: "♥",
};

function JellyGame({ onAction }: Pick<Props, "onAction">) {
  const [selected, setSelected] = useState("strawberry");
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [jiggling, setJiggling] = useState(false);
  const idRef = useRef(1);

  const positionTopping = (
    event: ReactPointerEvent<HTMLDivElement>,
    id?: number,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(12, Math.min(88, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(18, Math.min(78, ((event.clientY - rect.top) / rect.height) * 100));
    if (id) {
      setToppings((current) =>
        current.map((item) => (item.id === id ? { ...item, x, y } : item)),
      );
      return;
    }
    const nextId = idRef.current++;
    setToppings((current) => [
      ...current.slice(-19),
      { id: nextId, kind: selected, x, y, rotate: Math.round(seeded(nextId) * 50 - 25) },
    ]);
    setActiveId(nextId);
    onAction("bubble");
  };

  return (
    <section className="relax-suite-game relax-jelly-game">
      <div className="relax-suite-copy">
        <p className="eyebrow">JELLY CAKE STUDIO</p>
        <h3>탱글한 젤리 케이크를 직접 꾸며보세요.</h3>
        <p>토핑을 고른 뒤 케이크 위를 누르세요. 배치한 토핑은 다시 끌어 이동할 수 있습니다.</p>
      </div>
      <div className="relax-jelly-layout">
        <div
          className={`relax-jelly-stage ${jiggling ? "is-jiggling" : ""}`}
          onPointerDown={(event) => {
            if ((event.target as HTMLElement).closest("[data-topping]")) return;
            positionTopping(event);
            setJiggling(true);
            window.setTimeout(() => setJiggling(false), 520);
          }}
          onPointerMove={(event) => {
            if (activeId !== null && event.buttons > 0) positionTopping(event, activeId);
          }}
          onPointerUp={() => setActiveId(null)}
        >
          <div className="relax-jelly-plate" aria-hidden="true" />
          <div className="relax-jelly-cake" aria-hidden="true">
            <span />
          </div>
          {toppings.map((item) => (
            <button
              type="button"
              data-topping
              className={`relax-jelly-topping ${activeId === item.id ? "is-selected" : ""}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
              }}
              aria-label={`${item.kind} 토핑 이동`}
              onPointerDown={(event) => {
                event.stopPropagation();
                setActiveId(item.id);
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onDoubleClick={() =>
                setToppings((current) => current.filter((topping) => topping.id !== item.id))
              }
              key={item.id}
            >
              {toppingIcons[item.kind]}
            </button>
          ))}
        </div>
        <div className="relax-jelly-panel">
          <strong>토핑 선택</strong>
          <div>
            {Object.entries(toppingIcons).map(([kind, icon]) => (
              <button
                type="button"
                aria-pressed={selected === kind}
                onClick={() => setSelected(kind)}
                key={kind}
              >
                <span>{icon}</span>
                {kind === "cream" ? "크림" : kind === "strawberry" ? "과일" : kind === "berry" ? "베리" : kind === "star" ? "별" : "하트"}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => setToppings((current) => current.slice(0, -1))}
          >
            마지막 토핑 지우기
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={() => onAction("complete", true)}
          >
            완성 저장
          </button>
          <small>토핑을 두 번 누르면 삭제됩니다.</small>
        </div>
      </div>
    </section>
  );
}

function BottleGame({ onAction }: Pick<Props, "onAction">) {
  const [color, setColor] = useState("#9d72dc");
  const [level, setLevel] = useState(65);
  const [tilt, setTilt] = useState(0);
  const [glitter, setGlitter] = useState("stars");
  const particles = useMemo(() => Array.from({ length: 28 }, (_, index) => index), []);

  const moveBottle = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const next = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
    setTilt(Math.max(-12, Math.min(12, next)));
  };

  return (
    <section className="relax-suite-game relax-bottle-game">
      <div className="relax-suite-copy">
        <p className="eyebrow">GLITTER BOTTLE</p>
        <h3>천천히 흐르는 반짝이 병을 만들어보세요.</h3>
        <p>병을 좌우로 끌면 액체와 반짝이가 기울고 다시 천천히 가라앉습니다.</p>
      </div>
      <div className="relax-bottle-layout">
        <div
          className="relax-bottle-stage"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            moveBottle(event);
            onAction("pour");
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) moveBottle(event);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
            setTilt(0);
            onAction("complete");
          }}
        >
          <div className="relax-glass-bottle" style={{ transform: `rotate(${tilt}deg)` }}>
            <div className="relax-bottle-cork" />
            <div
              className="relax-bottle-liquid"
              style={{ height: `${level}%`, background: color }}
            >
              {particles.map((index) => (
                <i
                  className={`glitter-${glitter}`}
                  style={{
                    left: `${8 + seeded(index, 9) * 84}%`,
                    top: `${8 + seeded(index, 10) * 82}%`,
                    animationDelay: `${seeded(index, 11) * -4}s`,
                  }}
                  key={index}
                >
                  {glitter === "stars" ? "★" : glitter === "pearls" ? "●" : "✦"}
                </i>
              ))}
            </div>
          </div>
        </div>
        <div className="relax-bottle-panel">
          <label>
            액체 색상
            <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
          </label>
          <label>
            액체 높이 <strong>{level}%</strong>
            <input
              type="range"
              min="35"
              max="85"
              value={level}
              onChange={(event) => setLevel(Number(event.target.value))}
            />
          </label>
          <label>
            반짝이
            <select value={glitter} onChange={(event) => setGlitter(event.target.value)}>
              <option value="stars">별</option>
              <option value="pearls">구슬</option>
              <option value="sparkle">빛가루</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

function CatPawGame({ onAction }: Pick<Props, "onAction">) {
  const [affection, setAffection] = useState(18);
  const [pressed, setPressed] = useState<number | null>(null);
  const [reaction, setReaction] = useState("발바닥 젤리를 살짝 눌러보세요.");
  const [pulling, setPulling] = useState(false);

  const pressPad = (index: number) => {
    setPressed(index);
    setAffection((current) => Math.min(100, current + (index === 4 ? 5 : 3)));
    setReaction(index === 4 ? "골골… 가장 큰 젤리가 말랑해요." : "말랑! 작은 젤리가 쏙 들어갔어요.");
    onAction(index === 4 ? "complete" : "bubble");
    if ((affection + index) % 7 === 0) {
      setPulling(true);
      setReaction("고양이가 장난스럽게 발을 쏙 뺐어요!");
      window.setTimeout(() => setPulling(false), 650);
    }
    window.setTimeout(() => setPressed(null), 260);
  };

  return (
    <section className="relax-suite-game relax-cat-game">
      <div className="relax-suite-copy">
        <p className="eyebrow">SOFT CAT PAW</p>
        <h3>포근한 고양이와 발바닥 인사를 나눠보세요.</h3>
        <p>큰 젤리와 작은 젤리가 각각 따로 눌리고, 친밀도에 따라 반응이 달라집니다.</p>
      </div>
      <div className="relax-cat-stage">
        <div className="relax-cat-face" aria-hidden="true">
          <i className="ear-left" />
          <i className="ear-right" />
          <span className="eye-left" />
          <span className="eye-right" />
          <b>ᴗ</b>
        </div>
        <div className={`relax-cat-paw ${pulling ? "is-pulling" : ""}`}>
          {[0, 1, 2, 3].map((index) => (
            <button
              type="button"
              className={pressed === index ? "is-pressed" : ""}
              aria-label={`${index + 1}번째 작은 발바닥 젤리`}
              onClick={() => pressPad(index)}
              key={index}
            />
          ))}
          <button
            type="button"
            className={`main-pad ${pressed === 4 ? "is-pressed" : ""}`}
            aria-label="큰 발바닥 젤리"
            onClick={() => pressPad(4)}
          />
        </div>
        <div className="relax-cat-hearts" aria-hidden="true">
          <span>♥</span><span>♥</span><span>♥</span>
        </div>
      </div>
      <div className="relax-affection">
        <span>친밀도</span>
        <div><i style={{ width: `${affection}%` }} /></div>
        <strong>{affection}%</strong>
      </div>
      <p className="relax-game-status" aria-live="polite">{reaction}</p>
    </section>
  );
}

function IceGame({ onAction }: Pick<Props, "onAction">) {
  const [broken, setBroken] = useState<Set<number>>(new Set());
  const [hammer, setHammer] = useState("soft");
  const [score, setScore] = useState(0);
  const treasureIndex = 13;

  const hit = (index: number) => {
    if (broken.has(index)) return;
    const power = hammer === "heavy" ? 3 : hammer === "pick" ? 2 : 1;
    const next = new Set(broken);
    next.add(index);
    for (let offset = 1; offset < power; offset += 1) {
      if (index + offset < 24) next.add(index + offset);
    }
    setBroken(next);
    const found = next.has(treasureIndex);
    setScore((current) => current + power * 10 + (found && !broken.has(treasureIndex) ? 100 : 0));
    onAction(found ? "complete" : "bubble", found);
  };

  return (
    <section className="relax-suite-game relax-ice-game">
      <div className="relax-suite-copy">
        <p className="eyebrow">ICE TREASURE</p>
        <h3>푸른 얼음을 깨고 숨은 보물을 찾아보세요.</h3>
        <p>망치를 고른 뒤 얼음 조각을 누르면 누른 위치에서 균열이 퍼집니다.</p>
      </div>
      <div className="relax-ice-stage">
        <div className="relax-ice-grid">
          {Array.from({ length: 24 }, (_, index) => (
            <button
              type="button"
              className={`${broken.has(index) ? "is-broken" : ""} ${index === treasureIndex ? "has-treasure" : ""}`}
              aria-label={`${index + 1}번째 얼음 조각`}
              onClick={() => hit(index)}
              key={index}
            >
              {broken.has(index) && index === treasureIndex ? "♛" : ""}
            </button>
          ))}
        </div>
      </div>
      <div className="relax-ice-controls">
        <div>
          {[
            ["soft", "🔨", "고무망치"],
            ["pick", "⛏", "얼음송곳"],
            ["heavy", "🔧", "큰 망치"],
          ].map(([value, icon, label]) => (
            <button
              type="button"
              aria-pressed={hammer === value}
              onClick={() => setHammer(value)}
              key={value}
            >
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>
        <strong>점수 {score}</strong>
      </div>
    </section>
  );
}

function CrunchGame({ onAction }: Pick<Props, "onAction">) {
  const [kind, setKind] = useState("star");
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [mixing, setMixing] = useState(false);
  const idRef = useRef(1);

  const addTopping = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    setToppings((current) => [
      ...current.slice(-39),
      {
        id,
        kind,
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
        rotate: Math.round(seeded(id, 5) * 60),
      },
    ]);
    onAction("bubble");
  };

  const symbols: Record<string, string> = {
    star: "★",
    heart: "♥",
    foam: "●",
    pearl: "◉",
    flake: "✦",
  };

  return (
    <section className="relax-suite-game relax-crunch-game">
      <div className="relax-suite-copy">
        <p className="eyebrow">CRUNCH TOPPING GEL</p>
        <h3>투명 젤 위에 작은 토핑을 채워보세요.</h3>
        <p>토핑을 선택해 원하는 위치에 놓고, 섞기와 누르기로 움직임을 즐깁니다.</p>
      </div>
      <div className="relax-crunch-layout">
        <div
          className={`relax-crunch-bowl ${mixing ? "is-mixing" : ""}`}
          onPointerDown={addTopping}
        >
          <div className="relax-crunch-gel" aria-hidden="true" />
          {toppings.map((item) => (
            <i
              className={`kind-${item.kind}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
              }}
              key={item.id}
            >
              {symbols[item.kind]}
            </i>
          ))}
        </div>
        <div className="relax-crunch-panel">
          <div>
            {Object.entries(symbols).map(([value, symbol]) => (
              <button
                type="button"
                aria-pressed={kind === value}
                onClick={() => setKind(value)}
                key={value}
              >
                <span>{symbol}</span>
                {value === "star" ? "별" : value === "heart" ? "하트" : value === "foam" ? "폼볼" : value === "pearl" ? "구슬" : "빛가루"}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setMixing(true);
              onAction("stir");
              window.setTimeout(() => setMixing(false), 650);
            }}
          >
            천천히 섞기
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              onAction("bubble");
              setMixing(true);
              window.setTimeout(() => setMixing(false), 350);
            }}
          >
            젤 누르기
          </button>
        </div>
      </div>
    </section>
  );
}

type Cloud = { id: number; x: number; y: number; scale: number };

function CloudGame({ onAction }: Pick<Props, "onAction">) {
  const [effect, setEffect] = useState("sun");
  const [clouds, setClouds] = useState<Cloud[]>([
    { id: 1, x: 23, y: 42, scale: 1 },
    { id: 2, x: 63, y: 28, scale: 0.78 },
    { id: 3, x: 72, y: 67, scale: 1.12 },
  ]);
  const [active, setActive] = useState<number | null>(null);
  const idRef = useRef(4);

  const move = (event: ReactPointerEvent<HTMLDivElement>, id: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(10, Math.min(90, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(12, Math.min(82, ((event.clientY - rect.top) / rect.height) * 100));
    setClouds((current) => current.map((cloud) => (cloud.id === id ? { ...cloud, x, y } : cloud)));
  };

  const mergeNearby = (id: number) => {
    setClouds((current) => {
      const moved = current.find((cloud) => cloud.id === id);
      if (!moved) return current;
      const near = current.find(
        (cloud) =>
          cloud.id !== id &&
          Math.hypot(cloud.x - moved.x, cloud.y - moved.y) < 16,
      );
      if (!near) return current;
      onAction("complete", true);
      return current
        .filter((cloud) => cloud.id !== near.id && cloud.id !== id)
        .concat({
          id,
          x: (moved.x + near.x) / 2,
          y: (moved.y + near.y) / 2,
          scale: Math.min(1.45, (moved.scale + near.scale) * 0.72),
        });
    });
  };

  const split = (cloud: Cloud) => {
    if (clouds.length >= 8) return;
    const nextId = idRef.current++;
    setClouds((current) =>
      current
        .map((item) =>
          item.id === cloud.id
            ? { ...item, x: Math.max(10, item.x - 7), scale: item.scale * 0.78 }
            : item,
        )
        .concat({
          id: nextId,
          x: Math.min(90, cloud.x + 9),
          y: cloud.y + 2,
          scale: cloud.scale * 0.72,
        }),
    );
    onAction("pour");
  };

  return (
    <section className="relax-suite-game relax-cloud-game">
      <div className="relax-suite-copy">
        <p className="eyebrow">CLOUD PLAYGROUND</p>
        <h3>구름을 나누고 겹쳐 새로운 하늘을 만드세요.</h3>
        <p>끌어서 이동하고, 두 번 누르면 나뉩니다. 가까이 포개 놓으면 하나로 합쳐집니다.</p>
      </div>
      <div className={`relax-cloud-stage effect-${effect}`}>
        <div className="relax-sky-effect" aria-hidden="true" />
        {clouds.map((cloud) => (
          <button
            type="button"
            className={active === cloud.id ? "is-active" : ""}
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              transform: `translate(-50%, -50%) scale(${cloud.scale})`,
            }}
            onPointerDown={(event) => {
              setActive(cloud.id);
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                move(event as unknown as ReactPointerEvent<HTMLDivElement>, cloud.id);
              }
            }}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
              setActive(null);
              mergeNearby(cloud.id);
              onAction("stir");
            }}
            onDoubleClick={() => split(cloud)}
            aria-label="이동 가능한 구름, 두 번 누르면 나누기"
            key={cloud.id}
          >
            <span /><span /><span /><span />
          </button>
        ))}
      </div>
      <div className="relax-cloud-controls">
        {[
          ["sun", "☀", "햇살"],
          ["rain", "☂", "비"],
          ["snow", "❄", "눈"],
          ["stars", "✦", "별가루"],
        ].map(([value, icon, label]) => (
          <button
            type="button"
            aria-pressed={effect === value}
            onClick={() => setEffect(value)}
            key={value}
          >
            <span>{icon}</span>{label}
          </button>
        ))}
      </div>
    </section>
  );
}

export function RelaxMiniGame({ game, onAction }: Props) {
  if (game === "magnet") return <MagnetGame onAction={onAction} />;
  if (game === "sand") return <SandGame onAction={onAction} />;
  if (game === "jelly") return <JellyGame onAction={onAction} />;
  if (game === "bottle") return <BottleGame onAction={onAction} />;
  if (game === "cat-paw") return <CatPawGame onAction={onAction} />;
  if (game === "ice") return <IceGame onAction={onAction} />;
  if (game === "crunch") return <CrunchGame onAction={onAction} />;
  return <CloudGame onAction={onAction} />;
}
