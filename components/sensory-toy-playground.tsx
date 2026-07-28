"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  type SensoryMode,
  type SoundStyle,
  useSensoryAudio,
} from "@/components/sensory-toy/use-sensory-audio";
import {
  DeformableSquishy,
  type DeformableSquishyHandle,
  type FreeDecoration,
  type WaxShellPiece,
} from "@/components/sensory-toy/deformable-squishy";
import type { SquishySurface } from "@/components/sensory-toy/squishy-physics";

type ToyShape = "peach" | "cloud" | "paw" | "bread" | "pudding";
type ToyColor = "cream" | "sage" | "pink" | "purple" | "blue";
type RecoverySpeed = "slow" | "normal" | "fast";
type SlimeTexture = "chewy" | "water" | "butter" | "bouncy";
type Decoration = "sparkles" | "stars" | "hearts" | "clear-beads";
type CrunchBase = "clear" | "milk" | "pink" | "purple";
type CrunchTopping = "foam" | "beads" | "stars" | "hearts" | "sparkles" | "flakes";
type WaxColor = "apple" | "strawberry" | "grape" | "vanilla" | "soda";
type BackgroundColor = "cream" | "sage" | "lavender";
type ChallengePhase = "idle" | "countdown" | "running" | "result";
type DecorationCategory = FreeDecoration["category"];

type BurstParticle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  symbol: string;
};

type WaxCrack = {
  id: number;
  x: number;
  y: number;
  angle: number;
  length: number;
};

type ChallengeResult = {
  interactions: number;
  bestCombo: number;
  favoriteMode: string;
  waxPercent: number;
  waxPieces: number;
  message: string;
};

const modes: { id: SensoryMode; label: string; hint: string }[] = [
  { id: "squishy", label: "말랑이", hint: "폭신하게 누르고 복원해요." },
  { id: "slime", label: "슬랑이", hint: "길게 늘리고 빙글 섞어요." },
  { id: "crunch", label: "크런치 말랑이", hint: "재료를 섞고 톡톡 눌러요." },
  { id: "wax", label: "왁뿌볼", hint: "여러 번 눌러 껍질을 깨요." },
];

const shapes: { id: ToyShape; label: string }[] = [
  { id: "peach", label: "복숭아" },
  { id: "cloud", label: "구름" },
  { id: "paw", label: "고양이 발" },
  { id: "bread", label: "빵" },
  { id: "pudding", label: "푸딩" },
];

const colors: { id: ToyColor; label: string; value: string; shade: string }[] = [
  { id: "cream", label: "크림", value: "#f3e4c8", shade: "#d1b483" },
  { id: "sage", label: "세이지", value: "#b8d49c", shade: "#789e5a" },
  { id: "pink", label: "연분홍", value: "#efb7c5", shade: "#c7778c" },
  { id: "purple", label: "연보라", value: "#cbb9df", shade: "#917bb0" },
  { id: "blue", label: "하늘색", value: "#add8e0", shade: "#659da9" },
];

const recoveryOptions: { id: RecoverySpeed; label: string; duration: number }[] = [
  { id: "slow", label: "천천히", duration: 900 },
  { id: "normal", label: "보통", duration: 560 },
  { id: "fast", label: "빠르게", duration: 300 },
];

const surfaceOptions: { id: SquishySurface; label: string }[] = [
  { id: "foam", label: "소프트 폼" },
  { id: "gel", label: "젤" },
  { id: "mochi", label: "모찌" },
  { id: "clear-crunch", label: "투명 크런치" },
];

const slimeTextures: { id: SlimeTexture; label: string }[] = [
  { id: "chewy", label: "쫀득" },
  { id: "water", label: "워터" },
  { id: "butter", label: "버터" },
  { id: "bouncy", label: "탱글" },
];

const decorations: { id: Decoration; label: string; symbol: string }[] = [
  { id: "sparkles", label: "반짝이", symbol: "✦" },
  { id: "stars", label: "별", symbol: "★" },
  { id: "hearts", label: "작은 하트", symbol: "♥" },
  { id: "clear-beads", label: "투명 구슬", symbol: "○" },
];

const decorationCategories: { id: DecorationCategory; label: string }[] = [
  { id: "face", label: "얼굴" },
  { id: "ribbon", label: "리본" },
  { id: "parts", label: "파츠" },
  { id: "topping", label: "토핑" },
  { id: "text", label: "텍스트" },
  { id: "other", label: "기타" },
];

const freeDecorationCatalog: Array<{
  symbol: string;
  label: string;
  category: Exclude<DecorationCategory, "text">;
}> = [
  { symbol: "👀", label: "눈", category: "face" },
  { symbol: "😊", label: "웃는 얼굴", category: "face" },
  { symbol: "😺", label: "고양이 얼굴", category: "face" },
  { symbol: "✨", label: "볼터치", category: "face" },
  { symbol: "🎀", label: "핑크 리본", category: "ribbon" },
  { symbol: "🪢", label: "매듭 리본", category: "ribbon" },
  { symbol: "⭐", label: "별", category: "parts" },
  { symbol: "💚", label: "하트", category: "parts" },
  { symbol: "🍑", label: "복숭아", category: "parts" },
  { symbol: "🍓", label: "딸기", category: "parts" },
  { symbol: "●", label: "구슬", category: "topping" },
  { symbol: "🍬", label: "작은 사탕", category: "topping" },
  { symbol: "🧁", label: "크림", category: "topping" },
  { symbol: "✦", label: "반짝이", category: "other" },
  { symbol: "🌿", label: "잎사귀", category: "other" },
];

const DECORATION_STORAGE_KEY = "makeon-sensory-decorations-v1";

const crunchBases: { id: CrunchBase; label: string; value: string }[] = [
  { id: "clear", label: "투명 젤", value: "rgba(235, 244, 222, 0.64)" },
  { id: "milk", label: "우유 젤", value: "rgba(255, 250, 237, 0.9)" },
  { id: "pink", label: "핑크 젤", value: "rgba(244, 184, 200, 0.72)" },
  { id: "purple", label: "보라 젤", value: "rgba(205, 185, 225, 0.72)" },
];

const crunchToppings: { id: CrunchTopping; label: string; symbol: string }[] = [
  { id: "foam", label: "폼볼", symbol: "●" },
  { id: "beads", label: "작은 구슬", symbol: "○" },
  { id: "stars", label: "별", symbol: "★" },
  { id: "hearts", label: "하트", symbol: "♥" },
  { id: "sparkles", label: "반짝이", symbol: "✦" },
  { id: "flakes", label: "얇은 조각", symbol: "▱" },
];

const waxColors: {
  id: WaxColor;
  label: string;
  shell: string;
  shellShade: string;
  inside: string;
}[] = [
  { id: "apple", label: "청사과", shell: "#a9cc73", shellShade: "#688f45", inside: "#f1c2d0" },
  { id: "strawberry", label: "딸기 우유", shell: "#e9a7b8", shellShade: "#bd667f", inside: "#c8dca7" },
  { id: "grape", label: "포도", shell: "#a889bd", shellShade: "#705380", inside: "#f0c3cf" },
  { id: "vanilla", label: "바닐라", shell: "#ead8af", shellShade: "#b69869", inside: "#b6d5dd" },
  { id: "soda", label: "소다", shell: "#9fcfd8", shellShade: "#5e98a5", inside: "#ded0eb" },
];

const backgrounds: { id: BackgroundColor; label: string; value: string }[] = [
  { id: "cream", label: "크림", value: "#f8f2e5" },
  { id: "sage", label: "세이지", value: "#edf4e5" },
  { id: "lavender", label: "라벤더", value: "#f1ecf5" },
];

const modeTextures: Record<Exclude<SensoryMode, "wax">, string> = {
  squishy: "/images/tools/digital-squishy-playground/soft-gel-texture.webp",
  slime: "/images/tools/digital-squishy-playground/slime-texture.webp",
  crunch: "/images/tools/digital-squishy-playground/crunch-texture.webp",
};

const favoriteLabel = (counts: Record<SensoryMode, number>) => {
  const winner = modes.reduce((best, item) =>
    counts[item.id] > counts[best.id] ? item : best,
  );
  return counts[winner.id] > 0 ? winner.label : "아직 없음";
};

const pick = <T,>(items: readonly T[]) =>
  items[Math.floor(Math.random() * items.length)];

export function SensoryToyPlayground() {
  const [mode, setMode] = useState<SensoryMode>("squishy");
  const [shape, setShape] = useState<ToyShape>("peach");
  const [color, setColor] = useState<ToyColor>("sage");
  const [recovery, setRecovery] = useState<RecoverySpeed>("normal");
  const [squishySurface, setSquishySurface] = useState<SquishySurface>("mochi");
  const [slimeTexture, setSlimeTexture] = useState<SlimeTexture>("chewy");
  const [decoration, setDecoration] = useState<Decoration>("sparkles");
  const [crunchBase, setCrunchBase] = useState<CrunchBase>("clear");
  const [toppings, setToppings] = useState<CrunchTopping[]>(["foam", "beads"]);
  const [waxColor, setWaxColor] = useState<WaxColor>("apple");
  const [background, setBackground] = useState<BackgroundColor>("cream");
  const [transparency, setTransparency] = useState(82);
  const [gloss, setGloss] = useState(72);
  const [soundStyle, setSoundStyle] = useState<SoundStyle>("soft");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(0.24);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [vibrationSupported, setVibrationSupported] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowPowerMode, setLowPowerMode] = useState(false);

  const [isPressed, setIsPressed] = useState(false);
  const [pressOrigin, setPressOrigin] = useState({ x: 50, y: 50 });
  const [swirling, setSwirling] = useState(false);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);
  const [totalInteractions, setTotalInteractions] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [modeCounts, setModeCounts] = useState<Record<SensoryMode, number>>({
    squishy: 0,
    slime: 0,
    crunch: 0,
    wax: 0,
  });
  const [movedParticles, setMovedParticles] = useState(0);
  const [comboMessage, setComboMessage] = useState("");

  const [waxProgress, setWaxProgress] = useState(0);
  const [waxCracks, setWaxCracks] = useState<WaxCrack[]>([]);
  const [waxPieces, setWaxPieces] = useState(0);
  const [waxShellPieces, setWaxShellPieces] = useState<WaxShellPiece[]>([]);

  const [freeDecorations, setFreeDecorations] = useState<FreeDecoration[]>([]);
  const [selectedDecorationId, setSelectedDecorationId] = useState<number | null>(
    null,
  );
  const [decorationCategory, setDecorationCategory] =
    useState<DecorationCategory>("face");
  const [pendingDecoration, setPendingDecoration] = useState<{
    symbol: string;
    label: string;
    category: DecorationCategory;
  } | null>(null);
  const [decorationText, setDecorationText] = useState("");
  const [decorationSaveMessage, setDecorationSaveMessage] = useState("");

  const [challengePhase, setChallengePhase] = useState<ChallengePhase>("idle");
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [challengeResult, setChallengeResult] = useState<ChallengeResult | null>(null);

  const playAreaRef = useRef<HTMLDivElement>(null);
  const deformableSquishyRef = useRef<DeformableSquishyHandle>(null);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    lastAt: 0,
    downAt: 0,
    distance: 0,
    soundDistance: 0,
    angle: 0,
    angleTravel: 0,
    speed: 0,
    velocityX: 0,
    velocityY: 0,
  });
  const lastPressRef = useRef(0);
  const comboRef = useRef(0);
  const waxProgressRef = useRef(0);
  const particleIdRef = useRef(0);
  const crackIdRef = useRef(0);
  const waxPieceIdRef = useRef(0);
  const decorationIdRef = useRef(0);
  const lastDragSoundRef = useRef(0);
  const pointerActiveRef = useRef(false);
  const holdSoundTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const comboTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupTimersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const { play, getContext } = useSensoryAudio(soundEnabled, volume, soundStyle);

  const scheduleCleanup = useCallback((callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      callback();
      cleanupTimersRef.current.delete(timer);
    }, delay);
    cleanupTimersRef.current.add(timer);
  }, []);

  const selectedColor = colors.find((item) => item.id === color) ?? colors[1];
  const selectedRecovery =
    recoveryOptions.find((item) => item.id === recovery) ?? recoveryOptions[1];
  const selectedDecoration =
    decorations.find((item) => item.id === decoration) ?? decorations[0];
  const selectedBase =
    crunchBases.find((item) => item.id === crunchBase) ?? crunchBases[0];
  const selectedWax =
    waxColors.find((item) => item.id === waxColor) ?? waxColors[0];
  const selectedBackground =
    backgrounds.find((item) => item.id === background) ?? backgrounds[0];
  const decorationLimit = lowPowerMode ? 18 : 28;
  const selectedFreeDecoration =
    freeDecorations.find((item) => item.id === selectedDecorationId) ?? null;

  const showDecorationMessage = useCallback(
    (message: string) => {
      setDecorationSaveMessage(message);
      scheduleCleanup(() => setDecorationSaveMessage(""), 1800);
    },
    [scheduleCleanup],
  );

  const addFreeDecoration = useCallback(
    (
      template: {
        symbol: string;
        label: string;
        category: DecorationCategory;
      },
      x: number,
      y: number,
    ) => {
      if (freeDecorations.length >= decorationLimit) {
        showDecorationMessage(`장식은 최대 ${decorationLimit}개까지 추가할 수 있어요.`);
        return;
      }
      const nextId = decorationIdRef.current++;
      const nextDecoration: FreeDecoration = {
        id: nextId,
        symbol: template.symbol,
        label: template.label,
        category: template.category,
        x: Math.min(92, Math.max(8, x)),
        y: Math.min(90, Math.max(10, y)),
        scale: 1,
        rotation: 0,
        flipped: false,
        zIndex:
          freeDecorations.reduce(
            (highest, decoration) => Math.max(highest, decoration.zIndex),
            0,
          ) + 1,
      };
      setFreeDecorations((current) => [...current, nextDecoration]);
      setSelectedDecorationId(nextId);
      setPendingDecoration(null);
      showDecorationMessage(`${template.label} 장식을 추가했어요.`);
    },
    [decorationLimit, freeDecorations, showDecorationMessage],
  );

  const updateFreeDecoration = useCallback(
    (decorationId: number, patch: Partial<FreeDecoration>) => {
      setFreeDecorations((current) =>
        current.map((decoration) =>
          decoration.id === decorationId
            ? {
                ...decoration,
                ...patch,
                scale:
                  patch.scale === undefined
                    ? decoration.scale
                    : Math.min(2.1, Math.max(0.55, patch.scale)),
                rotation:
                  patch.rotation === undefined
                    ? decoration.rotation
                    : ((patch.rotation % 360) + 360) % 360,
              }
            : decoration,
        ),
      );
    },
    [],
  );

  const saveDecorations = () => {
    try {
      localStorage.setItem(
        DECORATION_STORAGE_KEY,
        JSON.stringify(freeDecorations),
      );
      showDecorationMessage("현재 꾸미기를 이 브라우저에 저장했어요.");
    } catch {
      showDecorationMessage("저장 공간을 사용할 수 없어 저장하지 못했어요.");
    }
  };

  const loadDecorations = () => {
    try {
      const stored = localStorage.getItem(DECORATION_STORAGE_KEY);
      if (!stored) {
        showDecorationMessage("저장된 꾸미기가 없어요.");
        return;
      }
      const parsed = JSON.parse(stored) as unknown;
      if (!Array.isArray(parsed)) throw new Error("Invalid decoration data");
      const restored = parsed
        .filter(
          (item): item is FreeDecoration =>
            typeof item === "object" &&
            item !== null &&
            typeof (item as FreeDecoration).symbol === "string" &&
            typeof (item as FreeDecoration).label === "string" &&
            typeof (item as FreeDecoration).x === "number" &&
            typeof (item as FreeDecoration).y === "number" &&
            typeof (item as FreeDecoration).scale === "number" &&
            typeof (item as FreeDecoration).rotation === "number",
        )
        .slice(0, decorationLimit)
        .map((item, index) => ({
          ...item,
          id: index,
          x: Math.min(92, Math.max(8, item.x)),
          y: Math.min(90, Math.max(10, item.y)),
          scale: Math.min(2.1, Math.max(0.55, item.scale)),
          rotation: ((item.rotation % 360) + 360) % 360,
          flipped: Boolean(item.flipped),
          zIndex: Number.isFinite(item.zIndex) ? item.zIndex : index,
        }));
      decorationIdRef.current = restored.length;
      setFreeDecorations(restored);
      setSelectedDecorationId(restored.at(-1)?.id ?? null);
      showDecorationMessage(`${restored.length}개의 장식을 불러왔어요.`);
    } catch {
      showDecorationMessage("저장된 꾸미기 데이터를 읽을 수 없어요.");
    }
  };

  const clearDecorations = () => {
    setFreeDecorations([]);
    setSelectedDecorationId(null);
    setPendingDecoration(null);
    showDecorationMessage("장식을 모두 지웠어요.");
  };

  useEffect(() => {
    setVibrationSupported("vibrate" in navigator);
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    setLowPowerMode(
      navigator.hardwareConcurrency <= 4 ||
        (typeof deviceMemory === "number" && deviceMemory <= 4),
    );
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  const vibrate = useCallback(
    (pattern: number | number[]) => {
      if (!vibrationEnabled || !vibrationSupported) return;
      navigator.vibrate(pattern);
    },
    [vibrationEnabled, vibrationSupported],
  );

  const createBurst = useCallback(
    (x: number, y: number, symbol?: string, amount = 7) => {
      const limitedAmount = Math.min(reducedMotion || lowPowerMode ? 4 : 12, amount);
      const next = Array.from({ length: limitedAmount }, (_, index) => ({
        id: particleIdRef.current + index,
        x,
        y,
        dx: (Math.cos((Math.PI * 2 * index) / limitedAmount) * (38 + Math.random() * 40)),
        dy: (Math.sin((Math.PI * 2 * index) / limitedAmount) * (38 + Math.random() * 40)),
        symbol: symbol ?? (mode === "slime" ? "●" : "✦"),
      }));
      particleIdRef.current += limitedAmount;
      setBurstParticles((current) => [...current.slice(-20), ...next]);
      const ids = new Set(next.map((item) => item.id));
      scheduleCleanup(
        () => setBurstParticles((current) => current.filter((item) => !ids.has(item.id))),
        reducedMotion ? 180 : 720,
      );
    },
    [lowPowerMode, mode, reducedMotion, scheduleCleanup],
  );

  const showComboMessage = useCallback(
    (nextCombo: number) => {
      const message =
        nextCombo === 30
          ? "Secret Mix"
          : nextCombo === 20
            ? "Super Crunch"
            : nextCombo === 10
              ? "Crunch"
              : nextCombo === 5
                ? "Nice"
                : "";
      if (!message) return;
      setComboMessage(message);
      scheduleCleanup(() => setComboMessage(""), 850);
    },
    [scheduleCleanup],
  );

  const handleWaxHit = useCallback(
    (x: number, y: number, intensity: number) => {
      if (waxProgressRef.current >= 100) return;
      const closeToCrack = waxCracks.some(
        (crack) => Math.hypot(crack.x - x, crack.y - y) < 14,
      );
      const increase = Math.round(
        (closeToCrack ? 7 : 4) + intensity * 5 + Math.random() * 2,
      );
      const previous = waxProgressRef.current;
      const next = Math.min(100, previous + increase);
      waxProgressRef.current = next;
      setWaxProgress(next);
      setWaxCracks((current) => [
        ...current.slice(-28),
        {
          id: crackIdRef.current++,
          x,
          y,
          angle: Math.random() * 360,
          length: 7 + increase * 0.75,
        },
      ]);

      const previousPieces = Math.floor(previous / 12);
      const nextPieces = Math.floor(next / 12);
      if (nextPieces > previousPieces) {
        const detachedCount = nextPieces - previousPieces;
        const detached = Array.from({ length: detachedCount }, (_, index) => ({
          id: waxPieceIdRef.current++,
          x: Math.min(92, Math.max(8, x + (Math.random() - 0.5) * 9)),
          y: Math.min(88, Math.max(10, y + (Math.random() - 0.5) * 8)),
          size: 15 + Math.random() * 10,
          rotation: Math.random() * 70 - 35,
          velocityX:
            (x < 50 ? -1 : 1) * (0.7 + Math.random() * 1.2) +
            (Math.random() - 0.5) * 0.8,
          velocityY: -1.2 - Math.random() * 1.4,
        }));
        setWaxPieces((current) => current + detachedCount);
        setWaxShellPieces((current) => [...current, ...detached].slice(-24));
        createBurst(x, y, "◆", 5);
        vibrate([9, 32, 9]);
        void play("wax", "crack", {
          intensity,
          waxCrackLevel: next / 100,
        });
        scheduleCleanup(() => {
          void play("wax", "piece", {
            intensity: Math.max(0.25, intensity * 0.7),
            waxCrackLevel: next / 100,
          });
        }, 42 + detachedCount * 12);
      } else {
        vibrate(5);
        void play("wax", closeToCrack ? "release" : "press", {
          intensity,
          waxCrackLevel: next / 100,
        });
      }

      if (next === 100) {
        const finalPieces = Array.from({ length: 3 }, (_, index) => ({
          id: waxPieceIdRef.current++,
          x: Math.min(90, Math.max(10, x + (index - 1) * 9)),
          y: Math.min(86, Math.max(12, y + Math.random() * 7)),
          size: 14 + Math.random() * 9,
          rotation: -28 + index * 28,
          velocityX: (index - 1) * 1.2 + (Math.random() - 0.5) * 0.5,
          velocityY: -1.4 - Math.random() * 1.1,
        }));
        setWaxShellPieces((current) => [...current, ...finalPieces].slice(-24));
        setWaxPieces((current) => current + finalPieces.length);
        createBurst(x, y, "✦", 12);
        vibrate([24, 35, 48]);
        void play("wax", "complete", {
          intensity: 1,
          waxCrackLevel: 1,
        });
      }
    },
    [createBurst, play, scheduleCleanup, vibrate, waxCracks],
  );

  const registerInteraction = useCallback(
    (x: number, y: number, intensity: number) => {
      const now = Date.now();
      const interval = lastPressRef.current ? now - lastPressRef.current : 0;
      const rapid = interval > 0 && interval < 480;
      const nextCombo = rapid ? comboRef.current + 1 : 1;
      lastPressRef.current = now;
      comboRef.current = nextCombo;
      setCombo(nextCombo);
      setBestCombo((current) => Math.max(current, nextCombo));
      setTotalInteractions((current) => current + 1);
      setModeCounts((current) => ({ ...current, [mode]: current[mode] + 1 }));

      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => {
        comboRef.current = 0;
        setCombo(0);
      }, 950);

      if (mode === "wax" && waxProgressRef.current < 100) {
        handleWaxHit(x, y, intensity);
      } else {
        const soundMode = mode === "wax" ? "squishy" : mode;
        void play(soundMode, "press", {
          intensity,
          comboInterval: interval,
          surface:
            mode === "squishy" || mode === "wax" ? squishySurface : undefined,
          slimeTexture: mode === "slime" ? slimeTexture : undefined,
          toppings: mode === "crunch" ? toppings : undefined,
        });
        vibrate(mode === "crunch" ? 7 : 5);
        if (rapid || mode === "crunch") {
          const symbol =
            mode === "crunch"
              ? crunchToppings.find((item) => item.id === toppings[0])?.symbol
              : undefined;
          createBurst(x, y, symbol, mode === "crunch" ? 8 : 5);
        }
      }

      if (mode === "crunch") showComboMessage(nextCombo);
    },
    [
      createBurst,
      handleWaxHit,
      mode,
      play,
      showComboMessage,
      slimeTexture,
      squishySurface,
      toppings,
      vibrate,
    ],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const now = Date.now();
    if (pendingDecoration) {
      addFreeDecoration(pendingDecoration, x, y);
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerActiveRef.current = true;
    pointerRef.current = {
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      lastAt: now,
      downAt: now,
      distance: 0,
      soundDistance: 0,
      angle: 0,
      angleTravel: 0,
      speed: 0,
      velocityX: 0,
      velocityY: 0,
    };
    setPressOrigin({ x, y });
    setIsPressed(true);
    registerInteraction(x, y, event.pressure > 0 ? event.pressure : 0.42);
    deformableSquishyRef.current?.press(
      x,
      y,
      event.pressure > 0 ? event.pressure : 0.42,
    );
    if (holdSoundTimerRef.current) clearTimeout(holdSoundTimerRef.current);
    holdSoundTimerRef.current = setTimeout(() => {
      if (!pointerActiveRef.current) return;
      if (mode === "wax" && waxProgressRef.current < 100) return;
      const soundMode = mode === "wax" ? "squishy" : mode;
      void play(soundMode, "press", {
        intensity: 0.58,
        pressDuration: 520,
        deformationAmount: 0.62,
        surface:
          mode === "squishy" || mode === "wax" ? squishySurface : undefined,
        slimeTexture: mode === "slime" ? slimeTexture : undefined,
        toppings: mode === "crunch" ? toppings : undefined,
      });
    }, 360);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isPressed) return;
    const now = Date.now();
    const deltaX = event.clientX - pointerRef.current.lastX;
    const deltaY = event.clientY - pointerRef.current.lastY;
    const elapsed = Math.max(8, now - pointerRef.current.lastAt);
    const distance = Math.hypot(deltaX, deltaY);
    if (distance > 3 && holdSoundTimerRef.current) {
      clearTimeout(holdSoundTimerRef.current);
      holdSoundTimerRef.current = null;
    }
    const speed = distance / elapsed;
    const totalX = event.clientX - pointerRef.current.x;
    const totalY = event.clientY - pointerRef.current.y;
    const limit = mode === "slime" ? 130 : 52;
    const nextDrag = {
      x: Math.max(-limit, Math.min(limit, totalX)),
      y: Math.max(-limit, Math.min(limit, totalY)),
    };
    const rect = event.currentTarget.getBoundingClientRect();
    deformableSquishyRef.current?.move(
      ((event.clientX - rect.left) / rect.width) * 100,
      ((event.clientY - rect.top) / rect.height) * 100,
      nextDrag.x,
      nextDrag.y,
      speed,
    );

    const angle = Math.atan2(totalY, totalX);
    let angleDelta = Math.abs(angle - pointerRef.current.angle);
    if (angleDelta > Math.PI) angleDelta = Math.PI * 2 - angleDelta;
    pointerRef.current.angleTravel += angleDelta;
    pointerRef.current.angle = angle;
    pointerRef.current.distance += distance;
    pointerRef.current.soundDistance += distance;
    pointerRef.current.speed = speed;
    pointerRef.current.velocityX = deltaX / elapsed;
    pointerRef.current.velocityY = deltaY / elapsed;
    pointerRef.current.lastX = event.clientX;
    pointerRef.current.lastY = event.clientY;
    pointerRef.current.lastAt = now;

    if (mode === "slime" && pointerRef.current.angleTravel > Math.PI * 2.2) {
      setSwirling(true);
      pointerRef.current.angleTravel = 0;
      createBurst(50, 50, selectedDecoration.symbol, 5);
      scheduleCleanup(() => setSwirling(false), reducedMotion ? 120 : 780);
    }

    if (mode === "crunch" && distance > 5) {
      setMovedParticles((current) => current + Math.round(distance));
    }

    const normalizedSpeed = Math.min(1, speed);
    const dragSoundInterval = 250 - normalizedSpeed * 125;
    const dragDistanceThreshold = 14 - normalizedSpeed * 7;
    if (
      now - lastDragSoundRef.current > dragSoundInterval &&
      pointerRef.current.soundDistance > dragDistanceThreshold
    ) {
      lastDragSoundRef.current = now;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      if (mode === "wax" && waxProgressRef.current < 100) {
        if (pointerRef.current.distance > 48) {
          handleWaxHit(x, y, Math.min(1, speed + 0.25));
          pointerRef.current.distance = 0;
          pointerRef.current.soundDistance = 0;
        }
      } else {
        void play(mode === "wax" ? "squishy" : mode, "drag", {
          intensity: Math.min(1, speed + 0.2),
          pressDuration: now - pointerRef.current.downAt,
          pointerSpeed: speed,
          pointerVelocity: normalizedSpeed,
          dragDistance: Math.hypot(totalX, totalY),
          deformationAmount: Math.min(
            1,
            0.28 + Math.hypot(totalX, totalY) / 90 + speed * 0.25,
          ),
          surface:
            mode === "squishy" || mode === "wax" ? squishySurface : undefined,
          slimeTexture: mode === "slime" ? slimeTexture : undefined,
          toppings: mode === "crunch" ? toppings : undefined,
        });
        pointerRef.current.soundDistance = 0;
      }
    }
  };

  const releasePointer = (event?: ReactPointerEvent<HTMLDivElement>) => {
    if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!isPressed) return;
    pointerActiveRef.current = false;
    if (holdSoundTimerRef.current) {
      clearTimeout(holdSoundTimerRef.current);
      holdSoundTimerRef.current = null;
    }

    const releaseIntensity = Math.min(
      1,
      ((Date.now() - pointerRef.current.downAt) / 1200) * 0.65 +
        pointerRef.current.speed * 0.5 +
        0.2,
    );
    if (mode === "slime" && pointerRef.current.speed > 0.65) {
      createBurst(pressOrigin.x, pressOrigin.y, selectedDecoration.symbol, 6);
    }
    if (mode !== "wax" || waxProgressRef.current >= 100) {
      void play(mode === "wax" ? "squishy" : mode, "release", {
        intensity: releaseIntensity,
        pressDuration: Date.now() - pointerRef.current.downAt,
        pointerSpeed: pointerRef.current.speed,
        pointerVelocity: Math.min(1, pointerRef.current.speed),
        dragDistance: pointerRef.current.distance,
        deformationAmount: releaseIntensity,
        releaseVelocity: Math.hypot(
          pointerRef.current.velocityX,
          pointerRef.current.velocityY,
        ),
        surface:
          mode === "squishy" || mode === "wax" ? squishySurface : undefined,
        slimeTexture: mode === "slime" ? slimeTexture : undefined,
        toppings: mode === "crunch" ? toppings : undefined,
      });
    }
    deformableSquishyRef.current?.release(
      pointerRef.current.velocityX,
      pointerRef.current.velocityY,
    );
    vibrate(releaseIntensity > 0.62 ? 14 : 6);
    setIsPressed(false);
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setPressOrigin({ x: 50, y: 50 });
    setIsPressed(true);
    deformableSquishyRef.current?.press(50, 50, 0.5);
    registerInteraction(50, 50, 0.5);
    scheduleCleanup(() => {
      deformableSquishyRef.current?.release(0, 0.4);
      setIsPressed(false);
    }, 180);
  };

  const resetWax = useCallback(() => {
    waxProgressRef.current = 0;
    setWaxProgress(0);
    setWaxCracks([]);
    setWaxPieces(0);
    setWaxShellPieces([]);
    waxPieceIdRef.current = 0;
  }, []);

  const resetMetrics = useCallback(() => {
    setTotalInteractions(0);
    setCombo(0);
    comboRef.current = 0;
    lastPressRef.current = 0;
    setBestCombo(0);
    setModeCounts({ squishy: 0, slime: 0, crunch: 0, wax: 0 });
    setMovedParticles(0);
    setComboMessage("");
  }, []);

  const resetAll = useCallback(() => {
    setIsPressed(false);
    setSwirling(false);
    setBurstParticles([]);
    setFreeDecorations([]);
    setSelectedDecorationId(null);
    setPendingDecoration(null);
    decorationIdRef.current = 0;
    deformableSquishyRef.current?.reset();
    resetMetrics();
    resetWax();
    setChallengePhase("idle");
    setCountdown(3);
    setTimeLeft(30);
    setChallengeResult(null);
  }, [resetMetrics, resetWax]);

  const randomize = () => {
    const nextMode = pick(modes).id;
    setMode(nextMode);
    setShape(pick(shapes).id);
    setColor(pick(colors).id);
    setRecovery(pick(recoveryOptions).id);
    setSquishySurface(pick(surfaceOptions).id);
    setSlimeTexture(pick(slimeTextures).id);
    setDecoration(pick(decorations).id);
    setCrunchBase(pick(crunchBases).id);
    setToppings(
      [...crunchToppings]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((item) => item.id),
    );
    setWaxColor(pick(waxColors).id);
    setBackground(pick(backgrounds).id);
    setTransparency(68 + Math.floor(Math.random() * 28));
    setGloss(48 + Math.floor(Math.random() * 48));
    resetWax();
  };

  const startChallenge = () => {
    resetMetrics();
    resetWax();
    setChallengeResult(null);
    setCountdown(3);
    setTimeLeft(30);
    setChallengePhase("countdown");
  };

  useEffect(() => {
    if (challengePhase !== "countdown") return;
    if (countdown <= 0) {
      setChallengePhase("running");
      return;
    }
    const timer = window.setTimeout(() => setCountdown((current) => current - 1), 780);
    return () => window.clearTimeout(timer);
  }, [challengePhase, countdown]);

  useEffect(() => {
    if (challengePhase !== "running") return;
    const interval = window.setInterval(
      () => setTimeLeft((current) => Math.max(0, current - 1)),
      1000,
    );
    return () => window.clearInterval(interval);
  }, [challengePhase]);

  useEffect(() => {
    if (challengePhase !== "running" || timeLeft > 0) return;
    const favorite = favoriteLabel(modeCounts);
    const messages: Record<string, string> = {
      말랑이: "오늘은 폭신한 말랑이가 잘 맞았어요!",
      슬랑이: "슬랑이를 길게 늘리며 즐겼어요!",
      "크런치 말랑이": "오늘은 바삭한 크런치가 필요한 날!",
      왁뿌볼: `왁스 껍질을 ${waxProgress}% 깨뜨렸어요!`,
      "아직 없음": "다음에는 원하는 촉감 장난감을 눌러보세요!",
    };
    setChallengeResult({
      interactions: totalInteractions,
      bestCombo,
      favoriteMode: favorite,
      waxPercent: waxProgress,
      waxPieces,
      message: messages[favorite],
    });
    setChallengePhase("result");
  }, [
    bestCombo,
    challengePhase,
    modeCounts,
    timeLeft,
    totalInteractions,
    waxPieces,
    waxProgress,
  ]);

  useEffect(
    () => () => {
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      if (holdSoundTimerRef.current) clearTimeout(holdSoundTimerRef.current);
      cleanupTimersRef.current.forEach((timer) => clearTimeout(timer));
      cleanupTimersRef.current.clear();
      if (vibrationSupported) navigator.vibrate(0);
    },
    [vibrationSupported],
  );

  const visualStyle = {
    "--toy-color": selectedColor.value,
    "--toy-shade": selectedColor.shade,
    "--toy-opacity": transparency / 100,
    "--toy-gloss": gloss / 100,
    "--press-x": `${pressOrigin.x}%`,
    "--press-y": `${pressOrigin.y}%`,
    "--recovery-duration": `${mode === "slime" ? selectedRecovery.duration + 420 : selectedRecovery.duration}ms`,
    transform: "translate3d(0, 0, 0)",
  } as CSSProperties;

  const toggleTopping = (next: CrunchTopping) => {
    setToppings((current) => {
      if (current.includes(next)) return current.filter((item) => item !== next);
      if (current.length >= 3) return current;
      return [...current, next];
    });
  };

  const waxBroken = waxProgress >= 100;

  return (
    <div className="sensory-app">
      <section className="sensory-mode-panel" aria-label="촉감 놀이 모드">
        <div className="sensory-mode-grid">
          {modes.map((item) => (
            <button
              type="button"
              className="sensory-mode-button"
              aria-pressed={mode === item.id}
              onClick={() => setMode(item.id)}
              key={item.id}
            >
              <strong>{item.label}</strong>
              <span>{item.hint}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="sensory-workspace">
        <details className="sensory-settings" open>
          <summary>촉감 장난감 꾸미기</summary>
          <div className="sensory-settings-body">
            {mode === "squishy" ? (
              <>
                <OptionButtons
                  legend="말랑이 모양"
                  items={shapes}
                  value={shape}
                  onChange={setShape}
                />
                <OptionButtons
                  legend="복원 속도"
                  items={recoveryOptions}
                  value={recovery}
                  onChange={setRecovery}
                />
                <OptionButtons
                  legend="표면 유형"
                  items={surfaceOptions}
                  value={squishySurface}
                  onChange={setSquishySurface}
                />
              </>
            ) : null}

            {mode === "slime" ? (
              <>
                <OptionButtons
                  legend="슬랑이 질감"
                  items={slimeTextures}
                  value={slimeTexture}
                  onChange={setSlimeTexture}
                />
                <OptionButtons
                  legend="장식 재료"
                  items={decorations}
                  value={decoration}
                  onChange={setDecoration}
                />
              </>
            ) : null}

            {mode === "crunch" ? (
              <>
                <OptionButtons
                  legend="크런치 베이스"
                  items={crunchBases}
                  value={crunchBase}
                  onChange={setCrunchBase}
                />
                <fieldset className="sensory-fieldset">
                  <legend>토핑 최대 3종</legend>
                  <div className="sensory-option-list">
                    {crunchToppings.map((item) => (
                      <button
                        type="button"
                        aria-pressed={toppings.includes(item.id)}
                        onClick={() => toggleTopping(item.id)}
                        key={item.id}
                      >
                        <span aria-hidden="true">{item.symbol}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <p className="sensory-field-help">{toppings.length}/3 선택</p>
                </fieldset>
              </>
            ) : null}

            {mode === "wax" ? (
              <OptionButtons
                legend="왁스 색상"
                items={waxColors}
                value={waxColor}
                onChange={(next) => {
                  setWaxColor(next);
                  resetWax();
                }}
              />
            ) : null}

            {mode !== "wax" && mode !== "crunch" ? (
              <fieldset className="sensory-fieldset">
                <legend>기본 색상</legend>
                <div className="sensory-color-list">
                  {colors.map((item) => (
                    <button
                      type="button"
                      aria-label={`${item.label} 색상`}
                      aria-pressed={color === item.id}
                      onClick={() => setColor(item.id)}
                      key={item.id}
                    >
                      <span style={{ background: item.value }} aria-hidden="true" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : null}

            <div className="sensory-range-grid">
              <label>
                <span>투명도 <strong>{transparency}%</strong></span>
                <input
                  type="range"
                  min="45"
                  max="100"
                  value={transparency}
                  onChange={(event) => setTransparency(Number(event.target.value))}
                />
              </label>
              <label>
                <span>광택 <strong>{gloss}%</strong></span>
                <input
                  type="range"
                  min="25"
                  max="100"
                  value={gloss}
                  onChange={(event) => setGloss(Number(event.target.value))}
                />
              </label>
            </div>

            <label className="sensory-select-label">
              <span>배경색</span>
              <select
                value={background}
                onChange={(event) => setBackground(event.target.value as BackgroundColor)}
              >
                {backgrounds.map((item) => (
                  <option value={item.id} key={item.id}>{item.label}</option>
                ))}
              </select>
            </label>

            <button type="button" className="button button-secondary" onClick={randomize}>
              랜덤 만들기
            </button>
          </div>
        </details>

        <div className="sensory-play-column">
          <div className="sensory-stats" aria-live="polite">
            <div><span>전체 누르기</span><strong>{totalInteractions}</strong></div>
            <div><span>현재 콤보</span><strong>{combo}</strong></div>
            <div><span>최고 콤보</span><strong>{bestCombo}</strong></div>
            <div>
              <span>{challengePhase === "running" ? "남은 시간" : "챌린지"}</span>
              <strong>{challengePhase === "running" ? `${timeLeft}초` : "30초"}</strong>
            </div>
          </div>

          <div
            className={`sensory-play-area is-${mode} ${isPressed ? "is-pressed" : ""} ${swirling ? "is-swirling" : ""} ${pendingDecoration ? "is-decoration-placement" : ""}`}
            ref={playAreaRef}
            role="application"
            tabIndex={0}
            aria-label={`${modes.find((item) => item.id === mode)?.label} 놀이 영역. 마우스나 손가락으로 누르고 드래그하세요.`}
            style={{ "--play-background": selectedBackground.value } as CSSProperties}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={releasePointer}
            onPointerCancel={releasePointer}
            onKeyDown={handleKeyboard}
          >
            {challengePhase === "countdown" ? (
              <div className="sensory-countdown" aria-live="assertive">
                {countdown || "시작!"}
              </div>
            ) : null}

            <div className="sensory-toy-visual" style={visualStyle}>
              <DeformableSquishy
                ref={deformableSquishyRef}
                mode={mode}
                shape={mode === "wax" ? "orb" : mode === "slime" ? "cloud" : shape}
                surface={
                  mode === "crunch"
                    ? "clear-crunch"
                    : mode === "slime"
                      ? "gel"
                      : squishySurface
                }
                color={
                  mode === "crunch"
                    ? selectedBase.value
                    : mode === "wax"
                      ? selectedWax.inside
                      : selectedColor.value
                }
                shade={mode === "wax" ? selectedColor.shade : selectedColor.shade}
                transparency={transparency}
                gloss={gloss}
                reducedMotion={reducedMotion}
                lowPowerMode={lowPowerMode}
                recovery={recovery}
                slimeTexture={slimeTexture}
                texturePath={
                  mode === "wax"
                    ? modeTextures.squishy
                    : modeTextures[mode]
                }
                decorationSymbol={selectedDecoration.symbol}
                particleSymbols={toppings.map(
                  (topping) =>
                    crunchToppings.find((item) => item.id === topping)?.symbol ?? "●",
                )}
                particleColor={selectedColor.shade}
                waxProgress={waxProgress}
                waxShell={selectedWax.shell}
                waxShellShade={selectedWax.shellShade}
                waxCracks={waxCracks}
                waxPieces={waxShellPieces}
                decorations={freeDecorations}
                selectedDecorationId={selectedDecorationId}
                onDecorationSelect={setSelectedDecorationId}
                onDecorationMove={(decorationId, x, y) =>
                  updateFreeDecoration(decorationId, { x, y })
                }
              />
            </div>

            {burstParticles.map((particle) => (
              <span
                className="sensory-burst-particle"
                style={
                  {
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    "--particle-x": `${particle.dx}px`,
                    "--particle-y": `${particle.dy}px`,
                  } as CSSProperties
                }
                aria-hidden="true"
                key={particle.id}
              >
                {particle.symbol}
              </span>
            ))}

            {comboMessage ? (
              <span className="sensory-combo-message" aria-live="polite">{comboMessage}</span>
            ) : null}

            <p className="sensory-play-hint">
              {mode === "wax"
                ? waxBroken
                  ? "껍질을 모두 깼어요. 내부 말랑이를 눌러보세요."
                  : "같은 곳을 여러 번 누르거나 드래그해 금을 넓혀보세요."
                : mode === "slime"
                  ? "누른 채 길게 당기거나 원을 그려보세요."
                  : mode === "crunch"
                    ? "빠르게 누르고 드래그해 재료를 움직여보세요."
                    : "짧게 누르거나 길게 눌러 압축 정도를 비교해보세요."}
            </p>
          </div>

          <details className="sensory-decoration-quick-panel" open>
            <summary>
              <span>
                자유 꾸미기
                <small>{freeDecorations.length}/{decorationLimit}</small>
              </span>
              <strong>{pendingDecoration ? "배치 준비됨" : "장식 선택"}</strong>
            </summary>
            <div className="sensory-decoration-quick-body">
              <div
                className="sensory-decoration-quick-tabs"
                role="tablist"
                aria-label="빠른 장식 카테고리"
              >
                {decorationCategories.map((category) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={decorationCategory === category.id}
                    onClick={() => setDecorationCategory(category.id)}
                    key={`quick-${category.id}`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {decorationCategory === "text" ? (
                <div className="sensory-decoration-quick-text">
                  <input
                    type="text"
                    maxLength={8}
                    value={decorationText}
                    aria-label="추가할 짧은 글자 또는 이모지"
                    placeholder="글자·이모지"
                    onChange={(event) => setDecorationText(event.target.value)}
                  />
                  <button
                    type="button"
                    disabled={!decorationText.trim()}
                    onClick={() => {
                      const text = decorationText.trim();
                      if (!text) return;
                      setPendingDecoration({
                        symbol: text,
                        label: `${text} 텍스트`,
                        category: "text",
                      });
                    }}
                  >
                    배치
                  </button>
                </div>
              ) : (
                <div className="sensory-decoration-quick-catalog">
                  {freeDecorationCatalog
                    .filter((item) => item.category === decorationCategory)
                    .map((item) => (
                      <button
                        type="button"
                        aria-label={`${item.label} 장식 선택`}
                        aria-pressed={
                          pendingDecoration?.symbol === item.symbol &&
                          pendingDecoration.label === item.label
                        }
                        onClick={() => setPendingDecoration(item)}
                        key={`quick-${item.category}-${item.label}`}
                      >
                        <span aria-hidden="true">{item.symbol}</span>
                        <small>{item.label}</small>
                      </button>
                    ))}
                </div>
              )}

              <p className="sensory-decoration-quick-guide" aria-live="polite">
                {pendingDecoration
                  ? `${pendingDecoration.label} 선택됨 — 옆 놀이판의 원하는 위치를 누르세요.`
                  : "장식을 고른 뒤 바로 옆 놀이판을 누르면 추가됩니다."}
              </p>

              {selectedFreeDecoration ? (
                <div className="sensory-decoration-quick-actions">
                  <strong>
                    <span aria-hidden="true">{selectedFreeDecoration.symbol}</span>
                    선택됨
                  </strong>
                  <button
                    type="button"
                    aria-label="장식 작게"
                    onClick={() =>
                      updateFreeDecoration(selectedFreeDecoration.id, {
                        scale: selectedFreeDecoration.scale - 0.1,
                      })
                    }
                  >
                    작게
                  </button>
                  <button
                    type="button"
                    aria-label="장식 크게"
                    onClick={() =>
                      updateFreeDecoration(selectedFreeDecoration.id, {
                        scale: selectedFreeDecoration.scale + 0.1,
                      })
                    }
                  >
                    크게
                  </button>
                  <button
                    type="button"
                    aria-label="장식 시계 방향으로 회전"
                    onClick={() =>
                      updateFreeDecoration(selectedFreeDecoration.id, {
                        rotation: selectedFreeDecoration.rotation + 15,
                      })
                    }
                  >
                    회전
                  </button>
                  <button
                    type="button"
                    aria-label="선택한 장식 삭제"
                    onClick={() => {
                      setFreeDecorations((current) =>
                        current.filter(
                          (decoration) =>
                            decoration.id !== selectedFreeDecoration.id,
                        ),
                      );
                      setSelectedDecorationId(null);
                    }}
                  >
                    삭제
                  </button>
                </div>
              ) : null}
            </div>
          </details>

          {mode === "wax" ? (
            <div className="sensory-wax-progress">
              <div>
                <span>균열 진행률</span>
                <strong>{waxProgress}%</strong>
              </div>
              <progress max="100" value={waxProgress}>{waxProgress}%</progress>
              <button type="button" className="button button-secondary" onClick={resetWax}>
                새 왁스 입히기
              </button>
            </div>
          ) : null}
        </div>

        <aside className="sensory-control-panel" aria-label="놀이 설정과 기록">
          <div className="sensory-control-buttons">
            <button
              type="button"
              className="button button-secondary"
              aria-pressed={soundEnabled}
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) void getContext();
              }}
            >
              {soundEnabled ? "소리 끄기" : "소리 켜기"}
            </button>
            <button
              type="button"
              className="button button-secondary"
              aria-pressed={vibrationEnabled}
              disabled={!vibrationSupported}
              onClick={() => setVibrationEnabled((current) => !current)}
            >
              {vibrationSupported
                ? vibrationEnabled
                  ? "진동 끄기"
                  : "진동 켜기"
                : "진동 미지원"}
            </button>
          </div>
          <p className="sensory-audio-note">소리는 첫 터치 후 재생됩니다.</p>

          <label className="sensory-volume-label">
            <span>기본 음량 <strong>{Math.round(volume * 100)}%</strong></span>
            <input
              type="range"
              min="0"
              max="0.6"
              step="0.02"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
            />
          </label>

          <label className="sensory-select-label">
            <span>소리 질감</span>
            <select
              value={soundStyle}
              onChange={(event) => setSoundStyle(event.target.value as SoundStyle)}
            >
              <option value="soft">부드럽게</option>
              <option value="deep">낮고 묵직하게</option>
              <option value="crisp">선명하게</option>
            </select>
          </label>

          <div className="sensory-challenge-card">
            <p className="eyebrow">30 SECOND CHALLENGE</p>
            <h3>30초 촉감 챌린지</h3>
            <p>카운트다운 후 원하는 모드를 자유롭게 바꿔가며 즐겨보세요.</p>
            <button
              type="button"
              className="button button-primary"
              onClick={startChallenge}
              disabled={challengePhase === "countdown" || challengePhase === "running"}
            >
              {challengePhase === "countdown"
                ? `${countdown || 0}초 후 시작`
                : challengePhase === "running"
                  ? `${timeLeft}초 진행 중`
                  : "30초 촉감 챌린지"}
            </button>
          </div>

          <div className="sensory-secondary-actions">
            <button type="button" className="button button-muted" onClick={resetAll}>
              전체 초기화
            </button>
          </div>

          <dl className="sensory-detail-stats">
            <div><dt>움직인 입자</dt><dd>{movedParticles}</dd></div>
            <div><dt>깨뜨린 왁스 조각</dt><dd>{waxPieces}</dd></div>
          </dl>
        </aside>
      </div>

      <details className="sensory-decoration-panel" open>
        <summary>
          자유 장식 꾸미기
          <span>{freeDecorations.length}/{decorationLimit}</span>
        </summary>
        <div className="sensory-decoration-body">
          <div
            className="sensory-decoration-tabs"
            role="tablist"
            aria-label="장식 카테고리"
          >
            {decorationCategories.map((category) => (
              <button
                type="button"
                role="tab"
                aria-selected={decorationCategory === category.id}
                onClick={() => setDecorationCategory(category.id)}
                key={category.id}
              >
                {category.label}
              </button>
            ))}
          </div>

          {decorationCategory === "text" ? (
            <div className="sensory-decoration-text">
              <label htmlFor="sensory-decoration-text-input">짧은 글자 또는 이모지</label>
              <div>
                <input
                  id="sensory-decoration-text-input"
                  type="text"
                  maxLength={8}
                  value={decorationText}
                  placeholder="예: MAKEON"
                  onChange={(event) => setDecorationText(event.target.value)}
                />
                <button
                  type="button"
                  className="button button-secondary"
                  disabled={!decorationText.trim()}
                  onClick={() => {
                    const text = decorationText.trim();
                    if (!text) return;
                    setPendingDecoration({
                      symbol: text,
                      label: `${text} 텍스트`,
                      category: "text",
                    });
                  }}
                >
                  배치 준비
                </button>
              </div>
            </div>
          ) : (
            <div className="sensory-decoration-catalog">
              {freeDecorationCatalog
                .filter((item) => item.category === decorationCategory)
                .map((item) => (
                  <button
                    type="button"
                    aria-pressed={
                      pendingDecoration?.symbol === item.symbol &&
                      pendingDecoration.label === item.label
                    }
                    onClick={() => setPendingDecoration(item)}
                    key={`${item.category}-${item.label}`}
                  >
                    <span aria-hidden="true">{item.symbol}</span>
                    {item.label}
                  </button>
                ))}
            </div>
          )}

          <p className="sensory-decoration-instruction" aria-live="polite">
            {pendingDecoration
              ? `${pendingDecoration.label} 선택됨 — 놀이 영역에서 원하는 위치를 눌러 배치하세요.`
              : "장식을 선택한 뒤 놀이 영역에 배치하고, 장식을 직접 드래그해 이동하세요."}
          </p>
          {pendingDecoration ? (
            <button
              type="button"
              className="button button-muted sensory-decoration-cancel"
              onClick={() => setPendingDecoration(null)}
            >
              배치 취소
            </button>
          ) : null}

          {selectedFreeDecoration ? (
            <div className="sensory-decoration-editor">
              <div>
                <strong>
                  <span aria-hidden="true">{selectedFreeDecoration.symbol}</span>
                  {selectedFreeDecoration.label}
                </strong>
                <button
                  type="button"
                  className="button button-muted"
                  onClick={() => {
                    setFreeDecorations((current) =>
                      current.filter(
                        (decoration) => decoration.id !== selectedFreeDecoration.id,
                      ),
                    );
                    setSelectedDecorationId(null);
                  }}
                >
                  삭제
                </button>
              </div>

              <label>
                <span>크기 {Math.round(selectedFreeDecoration.scale * 100)}%</span>
                <input
                  type="range"
                  min="0.55"
                  max="2.1"
                  step="0.05"
                  value={selectedFreeDecoration.scale}
                  onChange={(event) =>
                    updateFreeDecoration(selectedFreeDecoration.id, {
                      scale: Number(event.target.value),
                    })
                  }
                />
              </label>
              <label>
                <span>회전 {Math.round(selectedFreeDecoration.rotation)}°</span>
                <input
                  type="range"
                  min="0"
                  max="359"
                  step="1"
                  value={selectedFreeDecoration.rotation}
                  onChange={(event) =>
                    updateFreeDecoration(selectedFreeDecoration.id, {
                      rotation: Number(event.target.value),
                    })
                  }
                />
              </label>

              <div className="sensory-decoration-actions">
                <button
                  type="button"
                  onClick={() =>
                    updateFreeDecoration(selectedFreeDecoration.id, {
                      flipped: !selectedFreeDecoration.flipped,
                    })
                  }
                >
                  좌우반전
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateFreeDecoration(selectedFreeDecoration.id, {
                      zIndex:
                        Math.max(
                          ...freeDecorations.map(
                            (decoration) => decoration.zIndex,
                          ),
                        ) + 1,
                    })
                  }
                >
                  맨 앞으로
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateFreeDecoration(selectedFreeDecoration.id, {
                      zIndex:
                        Math.min(
                          ...freeDecorations.map(
                            (decoration) => decoration.zIndex,
                          ),
                        ) - 1,
                    })
                  }
                >
                  맨 뒤로
                </button>
                <button
                  type="button"
                  disabled={freeDecorations.length >= decorationLimit}
                  onClick={() => {
                    const nextId = decorationIdRef.current++;
                    const duplicate: FreeDecoration = {
                      ...selectedFreeDecoration,
                      id: nextId,
                      x: Math.min(92, selectedFreeDecoration.x + 5),
                      y: Math.min(90, selectedFreeDecoration.y + 5),
                      zIndex:
                        Math.max(
                          ...freeDecorations.map(
                            (decoration) => decoration.zIndex,
                          ),
                        ) + 1,
                    };
                    setFreeDecorations((current) => [...current, duplicate]);
                    setSelectedDecorationId(nextId);
                  }}
                >
                  복제
                </button>
              </div>
            </div>
          ) : null}

          <div className="sensory-decoration-storage">
            <button type="button" className="button button-secondary" onClick={saveDecorations}>
              내 꾸미기 저장
            </button>
            <button type="button" className="button button-secondary" onClick={loadDecorations}>
              불러오기
            </button>
            <button type="button" className="button button-muted" onClick={clearDecorations}>
              장식 전체 지우기
            </button>
          </div>
          <p className="sensory-decoration-note">
            장식은 내부 본체에 붙는 규칙으로 동작해 왁스 껍질 조각이 떨어져도
            본체에 남습니다. 저장 정보는 현재 브라우저에만 보관됩니다.
          </p>
          {decorationSaveMessage ? (
            <p className="sensory-decoration-message" aria-live="polite">
              {decorationSaveMessage}
            </p>
          ) : null}
        </div>
      </details>

      {challengeResult ? (
        <section className="sensory-result" aria-live="polite">
          <p className="eyebrow">CHALLENGE RESULT</p>
          <h2>{challengeResult.message}</h2>
          <div>
            <p><span>총 상호작용</span><strong>{challengeResult.interactions}회</strong></p>
            <p><span>최고 콤보</span><strong>{challengeResult.bestCombo}회</strong></p>
            <p><span>가장 많이 사용한 모드</span><strong>{challengeResult.favoriteMode}</strong></p>
            <p><span>왁뿌볼 파괴율</span><strong>{challengeResult.waxPercent}%</strong></p>
            <p><span>깨뜨린 왁스 조각</span><strong>{challengeResult.waxPieces}개</strong></p>
          </div>
          <small>결과는 재미를 위한 놀이 기록이며 심리 또는 건강 상태를 분석하지 않습니다.</small>
        </section>
      ) : null}
    </div>
  );
}

function OptionButtons<T extends string>({
  legend,
  items,
  value,
  onChange,
}: {
  legend: string;
  items: readonly { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="sensory-fieldset">
      <legend>{legend}</legend>
      <div className="sensory-option-list">
        {items.map((item) => (
          <button
            type="button"
            aria-pressed={value === item.id}
            onClick={() => onChange(item.id)}
            key={item.id}
          >
            {item.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
