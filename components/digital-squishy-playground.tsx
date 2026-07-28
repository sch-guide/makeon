"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SquishyMode = "soft" | "slime" | "crunch";
type SquishyShape = "cloud" | "paw" | "peach" | "pudding";
type SquishyColor = "cream" | "green" | "purple" | "pink" | "blue";
type SquishyMaterial = "beads" | "stars" | "hearts" | "sparkles";

type Particle = {
  id: number;
  x: number;
  y: number;
  symbol: string;
  angle: number;
  distance: number;
};

type PlayResult = {
  presses: number;
  bestCombo: number;
  favoriteMode: string;
};

const modes: { id: SquishyMode; label: string; description: string }[] = [
  { id: "soft", label: "폭신 말랑이", description: "부드럽게 눌리고 통통 복원돼요." },
  { id: "slime", label: "슬랑이", description: "손가락을 따라 쫀득하게 늘어나요." },
  { id: "crunch", label: "크런치 말랑이", description: "알갱이가 밀리고 톡톡 터져요." },
];

const shapes: { id: SquishyShape; label: string }[] = [
  { id: "cloud", label: "구름" },
  { id: "paw", label: "고양이 발" },
  { id: "peach", label: "복숭아" },
  { id: "pudding", label: "푸딩" },
];

const colors: { id: SquishyColor; label: string; value: string; shade: string }[] = [
  { id: "cream", label: "크림", value: "#f4e7cc", shade: "#d9bd8f" },
  { id: "green", label: "연두", value: "#b7d59a", shade: "#7ea65c" },
  { id: "purple", label: "연보라", value: "#c9b9df", shade: "#9781b7" },
  { id: "pink", label: "분홍", value: "#efb8c5", shade: "#c77b90" },
  { id: "blue", label: "하늘색", value: "#afd7df", shade: "#6ea7b5" },
];

const materials: { id: SquishyMaterial; label: string; symbol: string }[] = [
  { id: "beads", label: "작은 구슬", symbol: "●" },
  { id: "stars", label: "별", symbol: "★" },
  { id: "hearts", label: "하트", symbol: "♥" },
  { id: "sparkles", label: "반짝이", symbol: "✦" },
];

const shapePaths: Record<SquishyShape, string> = {
  cloud:
    "M67 178C35 169 27 132 48 108C60 94 78 88 96 91C104 57 137 39 168 51C190 29 230 34 246 64C276 58 303 80 304 110C335 124 335 164 307 180C284 193 258 185 235 188C213 208 178 205 158 187C131 204 91 199 67 178Z",
  paw:
    "M79 124C56 117 49 86 66 69C81 53 107 59 116 79C119 48 144 31 166 43C182 52 186 73 180 91C192 62 222 53 239 70C255 86 247 113 228 125C254 119 279 137 278 160C276 185 247 196 225 187C213 213 187 227 157 222C126 218 109 195 104 175C82 185 56 171 55 148C54 138 63 129 79 124Z",
  peach:
    "M182 53C210 32 247 41 268 70C294 106 289 160 261 198C239 228 203 239 180 216C158 239 122 228 99 198C71 161 65 107 91 71C112 42 150 33 182 53Z",
  pudding:
    "M83 85C86 59 118 44 180 44C242 44 274 59 277 85L295 190C299 216 269 231 180 231C91 231 61 216 65 190L83 85Z",
};

const modeTextures: Record<SquishyMode, string> = {
  soft: "/images/tools/digital-squishy-playground/soft-gel-texture.webp",
  slime: "/images/tools/digital-squishy-playground/slime-texture.webp",
  crunch: "/images/tools/digital-squishy-playground/crunch-texture.webp",
};

const materialPositions = [
  [108, 105],
  [143, 83],
  [181, 112],
  [220, 82],
  [252, 119],
  [94, 150],
  [139, 151],
  [183, 161],
  [229, 153],
  [266, 164],
  [124, 190],
  [174, 198],
  [225, 194],
] as const;

function mostUsedMode(counts: Record<SquishyMode, number>) {
  const selected = modes.reduce((best, mode) =>
    counts[mode.id] > counts[best.id] ? mode : best,
  );
  return counts[selected.id] ? selected.label : "아직 없음";
}

export function DigitalSquishyPlayground() {
  const [mode, setMode] = useState<SquishyMode>("soft");
  const [shape, setShape] = useState<SquishyShape>("cloud");
  const [color, setColor] = useState<SquishyColor>("green");
  const [material, setMaterial] = useState<SquishyMaterial>("beads");
  const [isPressed, setIsPressed] = useState(false);
  const [pressOrigin, setPressOrigin] = useState({ x: 50, y: 50 });
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [totalPresses, setTotalPresses] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [modeCounts, setModeCounts] = useState<Record<SquishyMode, number>>({
    soft: 0,
    slime: 0,
    crunch: 0,
  });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [surprise, setSurprise] = useState<string | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [result, setResult] = useState<PlayResult | null>(null);
  const playAreaRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const lastPressRef = useRef(0);
  const comboRef = useRef(0);
  const particleIdRef = useRef(0);
  const comboTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupTimersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);

  const selectedColor = colors.find((item) => item.id === color) ?? colors[1];
  const selectedMaterial =
    materials.find((item) => item.id === material) ?? materials[0];

  const getAudioContext = useCallback(async () => {
      const AudioContextConstructor =
        window.AudioContext ??
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextConstructor) return null;

      const context =
        audioContextRef.current ?? new AudioContextConstructor();
      audioContextRef.current = context;
      if (context.state === "suspended") await context.resume();
      return context;
  }, []);

  const playSound = useCallback(
    async (currentMode: SquishyMode, force = false) => {
      if (!soundEnabled && !force) return;

      const context = await getAudioContext();
      if (!context) return;

      const now = context.currentTime;
      const master = context.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(
        currentMode === "crunch" ? 0.2 : 0.24,
        now + 0.008,
      );
      master.gain.exponentialRampToValueAtTime(
        0.0001,
        now + (currentMode === "slime" ? 0.42 : 0.3),
      );
      master.connect(context.destination);

      const oscillator = context.createOscillator();
      const oscillatorGain = context.createGain();
      oscillator.connect(oscillatorGain);
      oscillatorGain.connect(master);
      oscillator.type = currentMode === "crunch" ? "triangle" : "sine";
      const startFrequency =
        currentMode === "soft" ? 118 : currentMode === "slime" ? 86 : 235;
      const endFrequency =
        currentMode === "soft" ? 190 : currentMode === "slime" ? 54 : 128;
      oscillator.frequency.setValueAtTime(startFrequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        endFrequency,
        now + (currentMode === "slime" ? 0.34 : 0.18),
      );
      oscillatorGain.gain.setValueAtTime(currentMode === "crunch" ? 0.22 : 0.48, now);
      oscillatorGain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + (currentMode === "slime" ? 0.38 : 0.23),
      );
      oscillator.start(now);
      oscillator.stop(now + (currentMode === "slime" ? 0.4 : 0.25));

      const noiseDuration =
        currentMode === "soft" ? 0.18 : currentMode === "slime" ? 0.34 : 0.24;
      const buffer = context.createBuffer(
        1,
        Math.floor(context.sampleRate * noiseDuration),
        context.sampleRate,
      );
      const channel = buffer.getChannelData(0);
      for (let index = 0; index < channel.length; index += 1) {
        const progress = index / channel.length;
        const envelope =
          currentMode === "crunch"
            ? Math.max(0.12, 1 - progress)
            : Math.sin(Math.PI * Math.min(1, progress * 1.35)) * (1 - progress);
        channel[index] = (Math.random() * 2 - 1) * envelope;
      }
      const noise = context.createBufferSource();
      const noiseFilter = context.createBiquadFilter();
      const noiseGain = context.createGain();
      noise.buffer = buffer;
      noiseFilter.type = currentMode === "crunch" ? "highpass" : "lowpass";
      noiseFilter.frequency.setValueAtTime(
        currentMode === "soft" ? 620 : currentMode === "slime" ? 430 : 1450,
        now,
      );
      noiseFilter.Q.setValueAtTime(currentMode === "slime" ? 1.4 : 0.7, now);
      noiseGain.gain.setValueAtTime(
        currentMode === "soft" ? 0.34 : currentMode === "slime" ? 0.3 : 0.5,
        now,
      );
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + noiseDuration);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(master);
      noise.start(now);

      if (currentMode === "crunch") {
        for (let index = 0; index < 5; index += 1) {
          const clickTime = now + 0.025 + index * 0.036 + Math.random() * 0.018;
          const click = context.createOscillator();
          const clickGain = context.createGain();
          click.type = "square";
          click.frequency.setValueAtTime(420 + Math.random() * 780, clickTime);
          click.frequency.exponentialRampToValueAtTime(180, clickTime + 0.025);
          clickGain.gain.setValueAtTime(0.0001, clickTime);
          clickGain.gain.exponentialRampToValueAtTime(0.18, clickTime + 0.003);
          clickGain.gain.exponentialRampToValueAtTime(0.0001, clickTime + 0.032);
          click.connect(clickGain);
          clickGain.connect(master);
          click.start(clickTime);
          click.stop(clickTime + 0.04);
        }
      }
    },
    [getAudioContext, soundEnabled],
  );

  const createBurst = useCallback(
    (x: number, y: number, currentMode: SquishyMode) => {
      const symbol =
        currentMode === "crunch" ? selectedMaterial.symbol : "✦";
      const nextParticles = Array.from({ length: currentMode === "crunch" ? 9 : 5 }).map(
        (_, index) => ({
          id: particleIdRef.current + index,
          x,
          y,
          symbol,
          angle: (360 / (currentMode === "crunch" ? 9 : 5)) * index + Math.random() * 18,
          distance: 36 + Math.random() * 48,
        }),
      );
      particleIdRef.current += nextParticles.length;
      setParticles((current) => [...current.slice(-24), ...nextParticles]);
      const ids = new Set(nextParticles.map((item) => item.id));
      const timer = setTimeout(() => {
        setParticles((current) => current.filter((item) => !ids.has(item.id)));
        cleanupTimersRef.current.delete(timer);
      }, 760);
      cleanupTimersRef.current.add(timer);
    },
    [selectedMaterial.symbol],
  );

  const registerPress = useCallback(
    (x: number, y: number) => {
      const now = Date.now();
      const isRapid = now - lastPressRef.current < 430;
      const nextCombo = isRapid ? comboRef.current + 1 : 1;
      comboRef.current = nextCombo;
      lastPressRef.current = now;
      setCombo(nextCombo);
      setBestCombo((current) => Math.max(current, nextCombo));
      setTotalPresses((current) => {
        const next = current + 1;
        if (mode === "crunch" && next % 12 === 0) {
          setSurprise(next % 24 === 0 ? "♥" : "★");
          const surpriseTimer = setTimeout(() => {
            setSurprise(null);
            cleanupTimersRef.current.delete(surpriseTimer);
          }, 900);
          cleanupTimersRef.current.add(surpriseTimer);
        }
        return next;
      });
      setModeCounts((current) => ({
        ...current,
        [mode]: current[mode] + 1,
      }));
      if (mode === "crunch" || isRapid) createBurst(x, y, mode);
      void playSound(mode);

      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => {
        comboRef.current = 0;
        setCombo(0);
      }, 900);
    },
    [createBurst, mode, playSound],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    setPressOrigin({ x, y });
    setDrag({ x: 0, y: 0 });
    setIsPressed(true);
    registerPress(x, y);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isPressed) return;
    const limit = mode === "slime" ? 115 : 38;
    setDrag({
      x: Math.max(-limit, Math.min(limit, event.clientX - pointerStartRef.current.x)),
      y: Math.max(-limit, Math.min(limit, event.clientY - pointerStartRef.current.y)),
    });
  };

  const releasePointer = (event?: ReactPointerEvent<HTMLDivElement>) => {
    if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsPressed(false);
    setDrag({ x: 0, y: 0 });
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setPressOrigin({ x: 50, y: 50 });
    setIsPressed(true);
    registerPress(50, 50);
    const timer = setTimeout(() => {
      setIsPressed(false);
      cleanupTimersRef.current.delete(timer);
    }, 180);
    cleanupTimersRef.current.add(timer);
  };

  const resetPlayground = useCallback(() => {
    setIsPressed(false);
    setDrag({ x: 0, y: 0 });
    setTotalPresses(0);
    setCombo(0);
    comboRef.current = 0;
    lastPressRef.current = 0;
    setBestCombo(0);
    setModeCounts({ soft: 0, slime: 0, crunch: 0 });
    setParticles([]);
    setSurprise(null);
    setTimerActive(false);
    setTimeLeft(30);
    setResult(null);
  }, []);

  const startTimer = () => {
    resetPlayground();
    setTimerActive(true);
  };

  useEffect(() => {
    if (!timerActive) return;
    const interval = window.setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    if (!timerActive || timeLeft > 0) return;
    setTimerActive(false);
    setResult({
      presses: totalPresses,
      bestCombo,
      favoriteMode: mostUsedMode(modeCounts),
    });
  }, [bestCombo, modeCounts, timeLeft, timerActive, totalPresses]);

  useEffect(
    () => () => {
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      cleanupTimersRef.current.forEach((timer) => clearTimeout(timer));
      cleanupTimersRef.current.clear();
      if (audioContextRef.current) void audioContextRef.current.close();
    },
    [],
  );

  const deformation = useMemo(() => {
    if (!isPressed) return "translate3d(0, 0, 0) scale(1, 1) rotate(0deg)";
    if (mode === "soft") {
      return `translate3d(${drag.x * 0.12}px, ${Math.max(5, drag.y * 0.12)}px, 0) scale(1.12, 0.76) rotate(${drag.x * 0.025}deg)`;
    }
    if (mode === "slime") {
      const stretchX = 1 + Math.min(Math.abs(drag.x) / 150, 0.72);
      const stretchY = 1 + Math.min(Math.abs(drag.y) / 190, 0.45);
      return `translate3d(${drag.x * 0.48}px, ${drag.y * 0.42}px, 0) scale(${stretchX}, ${Math.max(0.72, stretchY - Math.abs(drag.x) / 320)}) rotate(${drag.x * 0.07}deg)`;
    }
    return `translate3d(${drag.x * 0.08}px, 7px, 0) scale(1.06, 0.84) rotate(${drag.x * 0.02}deg)`;
  }, [drag.x, drag.y, isPressed, mode]);

  const visualStyle = {
    "--squishy-color": selectedColor.value,
    "--squishy-shade": selectedColor.shade,
    "--origin-x": `${pressOrigin.x}%`,
    "--origin-y": `${pressOrigin.y}%`,
    transform: deformation,
  } as CSSProperties;

  return (
    <div className="squishy-app">
      <div className="squishy-toolbar" aria-label="말랑이 설정">
        <fieldset className="squishy-option-group">
          <legend>모드</legend>
          <div className="squishy-choice-row">
            {modes.map((item) => (
              <button
                type="button"
                className="squishy-choice"
                aria-pressed={mode === item.id}
                onClick={() => setMode(item.id)}
                key={item.id}
              >
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="squishy-secondary-options">
          <fieldset className="squishy-option-group">
            <legend>모양</legend>
            <div className="squishy-small-choices">
              {shapes.map((item) => (
                <button
                  type="button"
                  aria-pressed={shape === item.id}
                  onClick={() => setShape(item.id)}
                  key={item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="squishy-option-group">
            <legend>색상</legend>
            <div className="squishy-color-choices">
              {colors.map((item) => (
                <button
                  type="button"
                  aria-label={`${item.label} 색상`}
                  aria-pressed={color === item.id}
                  style={{ "--choice-color": item.value } as CSSProperties}
                  onClick={() => setColor(item.id)}
                  key={item.id}
                >
                  <span aria-hidden="true" />
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="squishy-option-group">
            <legend>내부 재료</legend>
            <div className="squishy-small-choices">
              {materials.map((item) => (
                <button
                  type="button"
                  aria-pressed={material === item.id}
                  onClick={() => setMaterial(item.id)}
                  key={item.id}
                >
                  <span aria-hidden="true">{item.symbol}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="squishy-stage-card">
        <div className="squishy-stats" aria-live="polite">
          <div><span>총 누르기</span><strong>{totalPresses}</strong></div>
          <div><span>현재 콤보</span><strong>{combo}</strong></div>
          <div><span>최고 콤보</span><strong>{bestCombo}</strong></div>
          <div><span>{timerActive ? "남은 시간" : "30초 모드"}</span><strong>{timeLeft}초</strong></div>
        </div>

        <div
          className={`squishy-play-area is-${mode} ${isPressed ? "is-pressed" : ""}`}
          ref={playAreaRef}
          role="application"
          tabIndex={0}
          aria-label={`${modes.find((item) => item.id === mode)?.label} 놀이 영역. 마우스나 손가락으로 누르고 드래그하세요.`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={releasePointer}
          onPointerCancel={releasePointer}
          onKeyDown={handleKeyboard}
        >
          <div className="squishy-ambient" aria-hidden="true" />
          <div className="squishy-visual" style={visualStyle}>
            <svg viewBox="0 0 360 270" role="img" aria-label={`${shapes.find((item) => item.id === shape)?.label} 모양 말랑이`}>
              <defs>
                <linearGradient id="squishy-gel" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="white" stopOpacity="0.68" />
                  <stop offset="0.28" stopColor="var(--squishy-color)" />
                  <stop offset="1" stopColor="var(--squishy-shade)" />
                </linearGradient>
                <filter id="squishy-shadow" x="-30%" y="-30%" width="160%" height="180%">
                  <feDropShadow dx="0" dy="13" stdDeviation="10" floodColor="#31452a" floodOpacity="0.18" />
                </filter>
                <clipPath id={`squishy-clip-${shape}`}>
                  <path d={shapePaths[shape]} />
                </clipPath>
              </defs>
              <path
                className="squishy-main-shape"
                d={shapePaths[shape]}
                fill="url(#squishy-gel)"
                filter="url(#squishy-shadow)"
              />
              <image
                className={`squishy-texture-image is-${mode}`}
                href={modeTextures[mode]}
                x="0"
                y="0"
                width="360"
                height="270"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#squishy-clip-${shape})`}
                aria-hidden="true"
              />
              <path
                className="squishy-color-wash"
                d={shapePaths[shape]}
                fill="var(--squishy-color)"
              />
              {shape === "peach" ? (
                <path className="squishy-leaf" d="M181 57C186 27 213 15 237 25C225 51 205 64 181 57Z" />
              ) : null}
              {mode === "crunch" ? (
                <g clipPath={`url(#squishy-clip-${shape})`} className="squishy-materials">
                  {materialPositions.map(([x, y], index) =>
                    material === "beads" ? (
                      <circle
                        cx={x + (isPressed ? drag.x * ((index % 3) - 1) * 0.04 : 0)}
                        cy={y + (isPressed ? drag.y * ((index % 2) - 0.5) * 0.05 : 0)}
                        r={5 + (index % 3)}
                        key={`${x}-${y}`}
                      />
                    ) : (
                      <text
                        x={x + (isPressed ? drag.x * ((index % 3) - 1) * 0.04 : 0)}
                        y={y + (isPressed ? drag.y * ((index % 2) - 0.5) * 0.05 : 0)}
                        key={`${x}-${y}`}
                      >
                        {selectedMaterial.symbol}
                      </text>
                    ),
                  )}
                </g>
              ) : null}
              <ellipse
                className="squishy-highlight"
                cx={112 + pressOrigin.x * 0.42}
                cy={61 + pressOrigin.y * 0.18}
                rx="51"
                ry="18"
                transform={`rotate(-18 ${112 + pressOrigin.x * 0.42} ${61 + pressOrigin.y * 0.18})`}
              />
            </svg>
          </div>
          {particles.map((particle) => (
            <span
              className="squishy-particle"
              aria-hidden="true"
              style={
                {
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  "--particle-angle": `${particle.angle}deg`,
                  "--particle-distance": `${particle.distance}px`,
                } as CSSProperties
              }
              key={particle.id}
            >
              {particle.symbol}
            </span>
          ))}
          {surprise ? <span className="squishy-surprise" aria-hidden="true">{surprise}</span> : null}
          <p className="squishy-stage-hint">
            {mode === "slime" ? "누른 채 길게 드래그해 보세요." : "여러 번 빠르게 눌러 콤보를 올려보세요."}
          </p>
        </div>

        <div className="squishy-actions">
          <button
            type="button"
            className="button button-secondary"
            aria-pressed={soundEnabled}
            onClick={() => {
              const nextSoundState = !soundEnabled;
              setSoundEnabled(nextSoundState);
              if (nextSoundState) void playSound(mode, true);
            }}
          >
            {soundEnabled ? "소리 끄기" : "소리 켜기"}
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={startTimer}
            disabled={timerActive}
          >
            {timerActive ? `${timeLeft}초 놀이 중` : "30초 놀이 시작"}
          </button>
          <button type="button" className="button button-muted" onClick={resetPlayground}>
            초기화
          </button>
        </div>

        <p className="squishy-medical-note">
          잠깐 쉬고 싶을 때 가볍게 눌러보세요. 스트레스 치료나 의료 목적의 도구는 아닙니다.
        </p>

        {result ? (
          <section className="squishy-result" aria-live="polite">
            <p className="eyebrow">30 SECOND RESULT</p>
            <h2>오늘 말랑이를 {result.presses}번 눌렀어요.</h2>
            <div>
              <p><span>최고 콤보</span><strong>{result.bestCombo}회</strong></p>
              <p><span>가장 많이 사용한 모드</span><strong>{result.favoriteMode}</strong></p>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
