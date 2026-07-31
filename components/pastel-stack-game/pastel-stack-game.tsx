"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./pastel-stack-game.module.css";

type Mode = "classic" | "calm";
type GameStatus = "ready" | "playing" | "dropping" | "over";
type SoundName = "land" | "perfect" | "cut" | "over" | "record";

type Block = {
  x: number;
  y: number;
  width: number;
  colorIndex: number;
};

type FallingPiece = Block & {
  vx: number;
  vy: number;
  rotation: number;
  angularVelocity: number;
  opacity: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

type Engine = {
  status: GameStatus;
  tower: Block[];
  current: Block | null;
  pieces: FallingPiece[];
  particles: Particle[];
  direction: 1 | -1;
  speed: number;
  dropVelocity: number;
  cameraOffset: number;
  cameraTarget: number;
  score: number;
  combo: number;
  bestCombo: number;
  perfectCount: number;
  height: number;
  shake: number;
  mode: Mode;
};

type Records = {
  height: number;
  score: number;
  combo: number;
};

const LOGICAL_WIDTH = 420;
const LOGICAL_HEIGHT = 680;
const BLOCK_HEIGHT = 34;
const BASE_Y = 608;
const MAX_BLOCK_WIDTH = 286;
const STORAGE_KEY = "makeon-pastel-stack-v1";

const blockPalette = [
  ["#a9c98d", "#7fa966"],
  ["#f8ebcf", "#d9c59f"],
  ["#f3b38d", "#d98d68"],
  ["#efb3c3", "#d98ca3"],
  ["#c8b5e4", "#9f87c5"],
  ["#a9d5e8", "#77aec7"],
] as const;

const modeConfig = {
  classic: { startSpeed: 78, speedStep: 8, maxSpeed: 178, tolerance: 5 },
  calm: { startSpeed: 62, speedStep: 4.5, maxSpeed: 126, tolerance: 8 },
} as const;

function createEngine(mode: Mode): Engine {
  const base: Block = {
    x: (LOGICAL_WIDTH - MAX_BLOCK_WIDTH) / 2,
    y: BASE_Y,
    width: MAX_BLOCK_WIDTH,
    colorIndex: 0,
  };

  return {
    status: "ready",
    tower: [base],
    current: null,
    pieces: [],
    particles: [],
    direction: 1,
    speed: modeConfig[mode].startSpeed,
    dropVelocity: 0,
    cameraOffset: 0,
    cameraTarget: 0,
    score: 0,
    combo: 0,
    bestCombo: 0,
    perfectCount: 0,
    height: 0,
    shake: 0,
    mode,
  };
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.roundRect(x, y, width, height, safeRadius);
}

export function PastelStackGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine>(createEngine("classic"));
  const animationRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const soundEnabledRef = useRef(false);
  const vibrationEnabledRef = useRef(false);
  const volumeRef = useRef(0.25);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const [mode, setMode] = useState<Mode>("classic");
  const [status, setStatus] = useState<GameStatus>("ready");
  const [height, setHeight] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [records, setRecords] = useState<Records>({ height: 0, score: 0, combo: 0 });
  const [newRecord, setNewRecord] = useState(false);
  const [message, setMessage] = useState("게임 시작을 눌러 첫 블록을 쌓아보세요.");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [vibrationSupported, setVibrationSupported] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [reducedMotion, setReducedMotion] = useState(false);

  const syncHud = useCallback((engine: Engine) => {
    setStatus(engine.status);
    setHeight(engine.height);
    setScore(engine.score);
    setCombo(engine.combo);
    setBestCombo(engine.bestCombo);
  }, []);

  const saveSettings = useCallback((next: Partial<{ sound: boolean; vibration: boolean; volume: number }>) => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : {};
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...stored, ...next }));
    } catch {
      // The game remains playable when storage is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as Partial<Records> & {
          sound?: boolean;
          vibration?: boolean;
          volume?: number;
        };
        setRecords({
          height: Number(stored.height) || 0,
          score: Number(stored.score) || 0,
          combo: Number(stored.combo) || 0,
        });
        const storedSound = stored.sound === true;
        const storedVibration = stored.vibration === true;
        const storedVolume = Math.min(0.6, Math.max(0, Number(stored.volume) || 0.25));
        setSoundEnabled(storedSound);
        setVibrationEnabled(storedVibration);
        setVolume(storedVolume);
        soundEnabledRef.current = storedSound;
        vibrationEnabledRef.current = storedVibration;
        volumeRef.current = storedVolume;
      }
    } catch {
      // Ignore malformed or unavailable storage.
    }

    setVibrationSupported(typeof navigator.vibrate === "function");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      setReducedMotion(media.matches);
      reducedMotionRef.current = media.matches;
    };
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  const ensureAudio = useCallback(async () => {
    const Constructor = window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Constructor) return null;
    const context = audioContextRef.current ?? new Constructor();
    audioContextRef.current = context;
    if (context.state === "suspended") await context.resume();
    if (!masterGainRef.current) {
      const compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -24;
      compressor.knee.value = 18;
      compressor.ratio.value = 3;
      compressor.attack.value = 0.006;
      compressor.release.value = 0.18;
      const master = context.createGain();
      master.gain.value = volumeRef.current;
      compressor.connect(master);
      master.connect(context.destination);
      compressorRef.current = compressor;
      masterGainRef.current = master;
    }
    return context;
  }, []);

  const playSound = useCallback(async (name: SoundName) => {
    if (!soundEnabledRef.current || document.visibilityState === "hidden") return;
    const context = await ensureAudio();
    if (!context || !compressorRef.current) return;
    const now = context.currentTime + 0.004;
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const variation = 0.965 + Math.random() * 0.07;
    const settings: Record<SoundName, { start: number; end: number; duration: number; peak: number }> = {
      land: { start: 150, end: 105, duration: 0.105, peak: 0.05 },
      perfect: { start: 330, end: 440, duration: 0.16, peak: 0.045 },
      cut: { start: 118, end: 88, duration: 0.13, peak: 0.032 },
      over: { start: 180, end: 118, duration: 0.24, peak: 0.04 },
      record: { start: 294, end: 494, duration: 0.28, peak: 0.04 },
    };
    const sound = settings[name];
    oscillator.type = name === "perfect" || name === "record" ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(sound.start * variation, now);
    oscillator.frequency.exponentialRampToValueAtTime(sound.end * variation, now + sound.duration);
    filter.type = "lowpass";
    filter.frequency.value = name === "land" || name === "cut" ? 520 : 920;
    filter.Q.value = 0.35;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(sound.peak * variation, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + sound.duration);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(compressorRef.current);
    oscillator.start(now);
    oscillator.stop(now + sound.duration + 0.02);
    oscillator.addEventListener("ended", () => {
      oscillator.disconnect();
      filter.disconnect();
      gain.disconnect();
    }, { once: true });
  }, [ensureAudio]);

  const vibrate = useCallback((pattern: number | number[]) => {
    if (!vibrationEnabledRef.current || typeof navigator.vibrate !== "function") return;
    navigator.vibrate(pattern);
  }, []);

  const spawnCurrentBlock = useCallback((engine: Engine) => {
    const previous = engine.tower[engine.tower.length - 1];
    const targetY = previous.y - BLOCK_HEIGHT;
    const fromLeft = engine.height % 2 === 0;
    engine.current = {
      x: fromLeft ? 24 : LOGICAL_WIDTH - previous.width - 24,
      y: targetY - 112,
      width: previous.width,
      colorIndex: (engine.height + 1) % blockPalette.length,
    };
    engine.direction = fromLeft ? 1 : -1;
    engine.dropVelocity = 0;
    engine.status = "playing";
    syncHud(engine);
  }, [syncHud]);

  const updateRecords = useCallback((engine: Engine) => {
    const next = {
      height: Math.max(records.height, engine.height),
      score: Math.max(records.score, engine.score),
      combo: Math.max(records.combo, engine.bestCombo),
    };
    const isNew = next.height > records.height || next.score > records.score;
    setRecords(next);
    setNewRecord(isNew);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : {};
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...stored, ...next }));
    } catch {
      // The current game result is still shown without persistence.
    }
    return isNew;
  }, [records]);

  const endGame = useCallback((engine: Engine) => {
    engine.status = "over";
    engine.combo = 0;
    const isNew = updateRecords(engine);
    setMessage(isNew ? "새 최고 기록! 멋진 파스텔 타워예요." : "조금만 더 정확하게! 다시 도전해보세요.");
    syncHud(engine);
    void playSound(isNew ? "record" : "over");
    vibrate(38);
  }, [playSound, syncHud, updateRecords, vibrate]);

  const resolveLanding = useCallback((engine: Engine) => {
    const current = engine.current;
    const previous = engine.tower[engine.tower.length - 1];
    if (!current || !previous) return;

    const targetY = previous.y - BLOCK_HEIGHT;
    const centerDifference = Math.abs(
      current.x + current.width / 2 - (previous.x + previous.width / 2),
    );
    const perfect = centerDifference <= modeConfig[engine.mode].tolerance;
    const overlapLeft = Math.max(current.x, previous.x);
    const overlapRight = Math.min(current.x + current.width, previous.x + previous.width);
    const overlapWidth = overlapRight - overlapLeft;

    if (overlapWidth <= 5) {
      engine.pieces.push({
        ...current,
        y: targetY,
        vx: engine.direction * 55,
        vy: 20,
        rotation: 0,
        angularVelocity: engine.direction * 2.1,
        opacity: 1,
      });
      engine.current = null;
      endGame(engine);
      return;
    }

    let placedX = perfect ? previous.x : overlapLeft;
    let placedWidth = perfect ? previous.width : overlapWidth;
    engine.combo = perfect ? engine.combo + 1 : 0;
    engine.bestCombo = Math.max(engine.bestCombo, engine.combo);
    if (perfect) engine.perfectCount += 1;

    if (perfect && engine.combo > 0 && engine.combo % 5 === 0) {
      const recovered = engine.mode === "calm" ? 16 : 10;
      const center = placedX + placedWidth / 2;
      placedWidth = Math.min(MAX_BLOCK_WIDTH, placedWidth + recovered);
      placedX = Math.max(20, Math.min(LOGICAL_WIDTH - placedWidth - 20, center - placedWidth / 2));
    }

    if (!perfect) {
      const rightEdge = current.x + current.width;
      if (current.x < previous.x) {
        engine.pieces.push({
          x: current.x,
          y: targetY,
          width: previous.x - current.x,
          colorIndex: current.colorIndex,
          vx: -48,
          vy: 12,
          rotation: 0,
          angularVelocity: -1.8,
          opacity: 1,
        });
      } else if (rightEdge > previous.x + previous.width) {
        engine.pieces.push({
          x: overlapRight,
          y: targetY,
          width: rightEdge - overlapRight,
          colorIndex: current.colorIndex,
          vx: 48,
          vy: 12,
          rotation: 0,
          angularVelocity: 1.8,
          opacity: 1,
        });
      }
      void playSound("cut");
    }

    engine.tower.push({
      x: placedX,
      y: targetY,
      width: placedWidth,
      colorIndex: current.colorIndex,
    });
    engine.height += 1;
    const widthBonus = Math.round((placedWidth / MAX_BLOCK_WIDTH) * 80);
    const perfectBonus = perfect ? 120 + engine.combo * 25 : 0;
    engine.score += 100 + widthBonus + perfectBonus;
    engine.cameraTarget = Math.max(0, (engine.height - 7) * BLOCK_HEIGHT);
    const level = Math.floor(engine.height / 5);
    const config = modeConfig[engine.mode];
    engine.speed = Math.min(config.maxSpeed, config.startSpeed + level * config.speedStep);
    engine.shake = reducedMotionRef.current ? 0 : perfect ? 3 : 1.6;

    if (perfect) {
      const particleCount = reducedMotionRef.current ? 5 : 14;
      for (let index = 0; index < particleCount; index += 1) {
        const angle = (Math.PI * 2 * index) / particleCount;
        engine.particles.push({
          x: placedX + placedWidth / 2,
          y: targetY + engine.cameraOffset,
          vx: Math.cos(angle) * (35 + Math.random() * 35),
          vy: Math.sin(angle) * (30 + Math.random() * 35) - 22,
          life: 1,
          color: blockPalette[current.colorIndex][0],
        });
      }
      setMessage(engine.combo >= 5 ? `${engine.combo} 콤보! 블록 너비를 회복했어요.` : "퍼펙트!");
      void playSound("perfect");
      vibrate([8, 24, 8]);
    } else {
      setMessage(placedWidth < MAX_BLOCK_WIDTH * 0.42 ? "조금만 더 정확하게!" : "좋아요, 계속 쌓아볼까요?");
      void playSound("land");
      vibrate(7);
    }

    engine.current = null;
    syncHud(engine);
    window.setTimeout(() => {
      if (engineRef.current === engine && engine.status !== "over") spawnCurrentBlock(engine);
    }, reducedMotionRef.current ? 40 : 150);
  }, [endGame, playSound, spawnCurrentBlock, syncHud, vibrate]);

  const drawBlock = useCallback((
    context: CanvasRenderingContext2D,
    block: Block,
    y: number,
    rotation = 0,
    opacity = 1,
  ) => {
    if (block.width <= 0) return;
    const [topColor, sideColor] = blockPalette[block.colorIndex % blockPalette.length];
    context.save();
    context.globalAlpha = opacity;
    context.translate(block.x + block.width / 2, y + BLOCK_HEIGHT / 2);
    context.rotate(rotation);
    context.translate(-(block.x + block.width / 2), -(y + BLOCK_HEIGHT / 2));
    context.shadowColor = "rgba(74, 61, 48, 0.18)";
    context.shadowBlur = 8;
    context.shadowOffsetY = 5;
    const gradient = context.createLinearGradient(block.x, y, block.x, y + BLOCK_HEIGHT);
    gradient.addColorStop(0, topColor);
    gradient.addColorStop(0.52, topColor);
    gradient.addColorStop(1, sideColor);
    roundedRect(context, block.x, y, block.width, BLOCK_HEIGHT, 5);
    context.fillStyle = gradient;
    context.fill();
    context.shadowColor = "transparent";
    roundedRect(context, block.x + 3, y + 3, Math.max(0, block.width - 6), 5, 2);
    context.fillStyle = "rgba(255,255,255,0.34)";
    context.fill();
    if (block.width > 16) {
      context.fillStyle = "rgba(67, 56, 45, 0.09)";
      context.fillRect(block.x + block.width - 6, y + 7, 4, BLOCK_HEIGHT - 10);
    }
    context.restore();
  }, []);

  const drawScene = useCallback((context: CanvasRenderingContext2D, engine: Engine) => {
    const heightProgress = Math.min(1, engine.height / 24);
    const themeStops = engine.height < 7
      ? ["#fff8e9", "#f3e9d3"]
      : engine.height < 14
        ? ["#eaf2dd", "#cbdcaf"]
        : engine.height < 21
          ? ["#ffe0ca", "#eeb39b"]
          : ["#ddd4f0", "#ada1ce"];
    const background = context.createLinearGradient(0, 0, 0, LOGICAL_HEIGHT);
    background.addColorStop(0, themeStops[0]);
    background.addColorStop(1, themeStops[1]);
    context.fillStyle = background;
    context.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);

    context.globalAlpha = 0.22 + heightProgress * 0.12;
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.arc(74, 96, 43, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1;

    for (let index = 0; index < 5; index += 1) {
      const cloudX = 25 + ((index * 113 + engine.height * 3) % 430);
      const cloudY = 90 + (index % 3) * 86;
      context.fillStyle = "rgba(255,255,255,0.24)";
      context.beginPath();
      context.ellipse(cloudX, cloudY, 42, 14, 0, 0, Math.PI * 2);
      context.fill();
    }

    const shakeX = engine.shake ? (Math.random() - 0.5) * engine.shake : 0;
    const shakeY = engine.shake ? (Math.random() - 0.5) * engine.shake : 0;
    context.save();
    context.translate(shakeX, shakeY);

    context.fillStyle = "rgba(91, 74, 57, 0.12)";
    context.beginPath();
    context.ellipse(LOGICAL_WIDTH / 2, BASE_Y + 50 + engine.cameraOffset, 168, 22, 0, 0, Math.PI * 2);
    context.fill();

    engine.tower.forEach((block) => {
      const screenY = block.y + engine.cameraOffset;
      if (screenY > -BLOCK_HEIGHT && screenY < LOGICAL_HEIGHT + BLOCK_HEIGHT) {
        drawBlock(context, block, screenY);
      }
    });

    if (engine.current) {
      drawBlock(context, engine.current, engine.current.y + engine.cameraOffset);
      if (engine.status === "playing") {
        context.setLineDash([4, 6]);
        context.strokeStyle = "rgba(76, 69, 60, 0.2)";
        context.beginPath();
        context.moveTo(engine.current.x + engine.current.width / 2, engine.current.y + BLOCK_HEIGHT + engine.cameraOffset + 5);
        context.lineTo(engine.current.x + engine.current.width / 2, engine.tower[engine.tower.length - 1].y + engine.cameraOffset - 5);
        context.stroke();
        context.setLineDash([]);
      }
    }

    engine.pieces.forEach((piece) => {
      drawBlock(context, piece, piece.y + engine.cameraOffset, piece.rotation, piece.opacity);
    });

    engine.particles.forEach((particle) => {
      context.globalAlpha = Math.max(0, particle.life);
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x, particle.y, 2.6, 0, Math.PI * 2);
      context.fill();
    });
    context.globalAlpha = 1;
    context.restore();

    const vignette = context.createLinearGradient(0, 0, LOGICAL_WIDTH, 0);
    vignette.addColorStop(0, "rgba(77,62,48,0.05)");
    vignette.addColorStop(0.18, "transparent");
    vignette.addColorStop(0.82, "transparent");
    vignette.addColorStop(1, "rgba(77,62,48,0.05)");
    context.fillStyle = vignette;
    context.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  }, [drawBlock]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = LOGICAL_WIDTH * dpr;
    canvas.height = LOGICAL_HEIGHT * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const frame = (time: number) => {
      const engine = engineRef.current;
      const delta = Math.min(0.034, (time - (lastFrameRef.current || time)) / 1000);
      lastFrameRef.current = time;

      if (document.visibilityState !== "hidden") {
        if (engine.status === "playing" && engine.current) {
          engine.current.x += engine.direction * engine.speed * delta;
          const leftLimit = 20;
          const rightLimit = LOGICAL_WIDTH - engine.current.width - 20;
          if (engine.current.x >= rightLimit) {
            engine.current.x = rightLimit;
            engine.direction = -1;
          } else if (engine.current.x <= leftLimit) {
            engine.current.x = leftLimit;
            engine.direction = 1;
          }
        } else if (engine.status === "dropping" && engine.current) {
          const previous = engine.tower[engine.tower.length - 1];
          const targetY = previous.y - BLOCK_HEIGHT;
          engine.dropVelocity += 1180 * delta;
          engine.current.y += engine.dropVelocity * delta;
          if (engine.current.y >= targetY) {
            engine.current.y = targetY;
            resolveLanding(engine);
          }
        }

        engine.cameraOffset += (engine.cameraTarget - engine.cameraOffset) * Math.min(1, delta * 5.2);
        engine.shake *= Math.pow(0.035, delta);
        engine.pieces = engine.pieces
          .map((piece) => ({
            ...piece,
            x: piece.x + piece.vx * delta,
            y: piece.y + piece.vy * delta,
            vy: piece.vy + 720 * delta,
            rotation: piece.rotation + piece.angularVelocity * delta,
            opacity: piece.opacity - delta * 0.52,
          }))
          .filter((piece) => piece.opacity > 0 && piece.y + engine.cameraOffset < LOGICAL_HEIGHT + 130)
          .slice(-12);
        engine.particles = engine.particles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx * delta,
            y: particle.y + particle.vy * delta,
            vy: particle.vy + 90 * delta,
            life: particle.life - delta * 1.8,
          }))
          .filter((particle) => particle.life > 0)
          .slice(-28);
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawScene(context, engine);
      animationRef.current = window.requestAnimationFrame(frame);
    };

    animationRef.current = window.requestAnimationFrame(frame);
    return () => {
      if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
    };
  }, [drawScene, resolveLanding]);

  useEffect(() => () => {
    if (audioContextRef.current) void audioContextRef.current.close();
    compressorRef.current?.disconnect();
    masterGainRef.current?.disconnect();
    if (typeof navigator.vibrate === "function") navigator.vibrate(0);
  }, []);

  const startGame = useCallback(() => {
    const engine = createEngine(mode);
    engine.status = "playing";
    engineRef.current = engine;
    setNewRecord(false);
    setMessage("움직이는 블록이 아래 블록과 겹칠 때 탭하세요.");
    syncHud(engine);
    spawnCurrentBlock(engine);
  }, [mode, spawnCurrentBlock, syncHud]);

  const dropBlock = useCallback(() => {
    const engine = engineRef.current;
    if (engine.status === "ready") {
      startGame();
      return;
    }
    if (engine.status !== "playing" || !engine.current) return;
    engine.status = "dropping";
    engine.dropVelocity = reducedMotionRef.current ? 1000 : 520;
    setStatus("dropping");
  }, [startGame]);

  return (
    <div className={styles.shell}>
      <div className={styles.summaryBar}>
        <div>
          <span>최고 높이</span>
          <strong>{records.height}층</strong>
        </div>
        <div>
          <span>최고 점수</span>
          <strong>{records.score.toLocaleString()}</strong>
        </div>
        <div>
          <span>최고 콤보</span>
          <strong>{records.combo}</strong>
        </div>
      </div>

      <div className={styles.gameLayout}>
        <section className={styles.gameCard} aria-label="파스텔 스택 게임">
          <div className={styles.hud} aria-live="polite">
            <div><span>점수</span><strong>{score.toLocaleString()}</strong></div>
            <div><span>높이</span><strong>{height}층</strong></div>
            <div><span>퍼펙트 콤보</span><strong>{combo}</strong></div>
          </div>

          <div
            className={styles.canvasWrap}
            role="application"
            aria-label="좌우로 움직이는 파스텔 블록을 클릭, 탭, Space 또는 Enter로 떨어뜨리는 게임"
            tabIndex={0}
            onPointerDown={(event) => {
              if ((event.target as HTMLElement).closest("button")) return;
              event.preventDefault();
              dropBlock();
              event.currentTarget.focus();
            }}
            onKeyDown={(event) => {
              if (event.code === "Space" || event.code === "Enter") {
                event.preventDefault();
                dropBlock();
              }
            }}
          >
            <canvas ref={canvasRef} className={styles.canvas}>
              움직이는 블록과 아래 블록이 겹치는 순간에 조작하여 파스텔 타워를 쌓는 게임입니다.
            </canvas>

            {status === "ready" ? (
              <div className={styles.startOverlay}>
                <span aria-hidden="true" className={styles.stackMark}><i /><i /><i /></span>
                <h2>하늘까지 쌓아볼까요?</h2>
                <p>블록이 중앙에 왔을 때 멈추면 퍼펙트 콤보가 이어집니다.</p>
                <button type="button" className="button button-primary" onClick={startGame}>
                  게임 시작
                </button>
              </div>
            ) : null}

            {status === "over" ? (
              <div className={styles.gameOverOverlay} role="dialog" aria-labelledby="stack-result-title">
                <span>{newRecord ? "NEW RECORD" : "TOWER COMPLETE"}</span>
                <h2 id="stack-result-title">{newRecord ? "새 최고 기록!" : "멋진 타워예요!"}</h2>
                <div>
                  <p>높이 <strong>{height}층</strong></p>
                  <p>점수 <strong>{score.toLocaleString()}</strong></p>
                  <p>최고 콤보 <strong>{bestCombo}</strong></p>
                </div>
                <button type="button" className="button button-primary" onClick={startGame}>
                  다시 시작
                </button>
                <Link className="button button-secondary" href="/tools">다른 무료 도구 보기</Link>
              </div>
            ) : null}

            <p className={styles.feedback} aria-live="assertive">{message}</p>
          </div>
        </section>

        <aside className={styles.controls} aria-label="게임 설정">
          <div className={styles.controlHeading}>
            <span>GAME SETTINGS</span>
            <h2>나에게 맞게 즐기기</h2>
          </div>

          <fieldset>
            <legend>게임 모드</legend>
            <div className={styles.modeButtons}>
              <button
                type="button"
                aria-pressed={mode === "classic"}
                onClick={() => {
                  setMode("classic");
                  engineRef.current.mode = "classic";
                }}
              >
                <strong>클래식</strong><span>기본 속도</span>
              </button>
              <button
                type="button"
                aria-pressed={mode === "calm"}
                onClick={() => {
                  setMode("calm");
                  engineRef.current.mode = "calm";
                }}
              >
                <strong>편안하게</strong><span>느린 속도</span>
              </button>
            </div>
          </fieldset>

          <div className={styles.toggleRow}>
            <button
              type="button"
              aria-pressed={soundEnabled}
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                soundEnabledRef.current = next;
                saveSettings({ sound: next });
                if (next) void ensureAudio();
              }}
            >
              <span aria-hidden="true">{soundEnabled ? "♪" : "×"}</span>
              {soundEnabled ? "소리 켬" : "음소거"}
            </button>
            {vibrationSupported ? (
              <button
                type="button"
                aria-pressed={vibrationEnabled}
                onClick={() => {
                  const next = !vibrationEnabled;
                  setVibrationEnabled(next);
                  vibrationEnabledRef.current = next;
                  saveSettings({ vibration: next });
                }}
              >
                <span aria-hidden="true">⌁</span>
                {vibrationEnabled ? "진동 켬" : "진동 끔"}
              </button>
            ) : null}
          </div>

          <label className={styles.volumeControl}>
            <span>음량 <strong>{Math.round(volume * 100)}%</strong></span>
            <input
              type="range"
              min="0"
              max="0.6"
              step="0.05"
              value={volume}
              onChange={(event) => {
                const next = Number(event.target.value);
                setVolume(next);
                volumeRef.current = next;
                saveSettings({ volume: next });
                if (audioContextRef.current && masterGainRef.current) {
                  masterGainRef.current.gain.setTargetAtTime(next, audioContextRef.current.currentTime, 0.025);
                }
              }}
            />
          </label>

          <button type="button" className="button button-secondary" onClick={startGame}>
            다시 시작
          </button>

          <div className={styles.instructions}>
            <strong>조작 방법</strong>
            <p><span>PC</span> 마우스 클릭 · Space · Enter</p>
            <p><span>모바일</span> 게임 화면을 한 번 탭</p>
            <small>소리는 사용자가 켠 뒤 첫 상호작용부터 재생됩니다.</small>
          </div>
        </aside>
      </div>

      <p className={styles.motionNote}>
        {reducedMotion
          ? "기기의 움직임 줄이기 설정에 따라 화면 흔들림과 입자 효과를 줄였습니다."
          : "블록이 높아질수록 배경이 크림 아침에서 연보라 밤으로 천천히 바뀝니다."}
      </p>
    </div>
  );
}
