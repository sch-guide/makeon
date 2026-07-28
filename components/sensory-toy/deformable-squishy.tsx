"use client";

import {
  forwardRef,
  type CSSProperties,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import {
  createSquishyMesh,
  type DeformableShape,
  meshIsSettled,
  modePhysics,
  pathFromLoop,
  type PointerForce,
  resetMesh,
  type SquishySurface,
  stepSquishyPhysics,
  surfacePhysics,
} from "@/components/sensory-toy/squishy-physics";

export type DeformableSquishyHandle = {
  press: (xPercent: number, yPercent: number, pressure: number) => void;
  move: (
    xPercent: number,
    yPercent: number,
    dragX: number,
    dragY: number,
    speed: number,
  ) => void;
  release: (releaseVelocityX: number, releaseVelocityY: number) => void;
  reset: () => void;
};

type DeformableSquishyProps = {
  mode?: "squishy" | "slime" | "crunch" | "wax";
  shape: DeformableShape;
  surface: SquishySurface;
  color: string;
  shade: string;
  transparency: number;
  gloss: number;
  reducedMotion: boolean;
  lowPowerMode: boolean;
  recovery?: "slow" | "normal" | "fast";
  slimeTexture?: "chewy" | "water" | "butter" | "bouncy";
  texturePath?: string;
  decorationSymbol?: string;
  particleSymbols?: string[];
  particleColor?: string;
  waxProgress?: number;
  waxShell?: string;
  waxShellShade?: string;
  waxCracks?: Array<{
    id: number;
    x: number;
    y: number;
    angle: number;
    length: number;
  }>;
};

const texturePath =
  "/images/tools/digital-squishy-playground/soft-gel-texture.webp";

type MaterialParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
};

const createParticles = (count: number): MaterialParticle[] =>
  Array.from({ length: count }, (_, index) => {
    const angle = index * 2.399963229728653;
    const radius = 18 + ((index * 37) % 78);
    return {
      x: 180 + Math.cos(angle) * radius,
      y: 142 + Math.sin(angle) * radius * 0.72,
      vx: 0,
      vy: 0,
      radius: 3 + (index % 4) * 0.7,
      opacity: 0.45 + (index % 5) * 0.09,
    };
  });

const toViewBoxPoint = (xPercent: number, yPercent: number) => ({
  x: 30 + Math.min(100, Math.max(0, xPercent)) * 3,
  y: 18 + Math.min(100, Math.max(0, yPercent)) * 2.44,
});

export const DeformableSquishy = forwardRef<
  DeformableSquishyHandle,
  DeformableSquishyProps
>(function DeformableSquishy(
  {
    mode = "squishy",
    shape,
    surface,
    color,
    shade,
    transparency,
    gloss,
    reducedMotion,
    lowPowerMode,
    recovery = "normal",
    slimeTexture = "chewy",
    texturePath: customTexturePath,
    decorationSymbol = "✦",
    particleSymbols = ["●", "○"],
    particleColor,
    waxProgress = 0,
    waxShell = "#a9cc73",
    waxShellShade = "#688f45",
    waxCracks = [],
  },
  ref,
) {
  const id = useId().replaceAll(":", "");
  const pointCount = reducedMotion || lowPowerMode ? 28 : 40;
  const particleCount = reducedMotion || lowPowerMode ? 22 : 46;
  const mesh = useMemo(
    () => createSquishyMesh(shape, pointCount),
    [pointCount, shape],
  );
  const meshRef = useRef(mesh);
  const pointerRef = useRef<PointerForce>({
    active: false,
    x: 180,
    y: 140,
    strength: 0,
    dragX: 0,
    dragY: 0,
    speed: 0,
  });
  const downAtRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const previousFrameRef = useRef(0);
  const basePathRefs = useRef<Array<SVGPathElement | null>>([]);
  const texturePathRefs = useRef<Array<SVGPathElement | null>>([]);
  const washPathRefs = useRef<Array<SVGPathElement | null>>([]);
  const waxShellPathRefs = useRef<Array<SVGPathElement | null>>([]);
  const contactRef = useRef<SVGEllipseElement | null>(null);
  const highlightRef = useRef<SVGEllipseElement | null>(null);
  const shadowRef = useRef<SVGEllipseElement | null>(null);
  const wrinkleRefs = useRef<Array<SVGPathElement | null>>([]);
  const clipPathRefs = useRef<Array<SVGPathElement | null>>([]);
  const particleRefs = useRef<Array<SVGTextElement | null>>([]);
  const particlesRef = useRef<MaterialParticle[]>(
    createParticles(particleCount),
  );

  const waxBroken = mode === "wax" && waxProgress >= 100;
  const physicsValues = useMemo(() => {
    const base =
      mode === "slime"
        ? modePhysics.slime
        : mode === "crunch"
          ? modePhysics.crunch
          : mode === "wax" && !waxBroken
            ? modePhysics["wax-shell"]
            : surfacePhysics[surface];
    const slimeTuning =
      mode !== "slime"
        ? {}
        : slimeTexture === "water"
          ? { stiffness: 0.009, damping: 0.958, viscosity: 0.96, stretch: 2.45 }
          : slimeTexture === "butter"
            ? { stiffness: 0.02, damping: 0.91, viscosity: 0.82, stretch: 1.62 }
            : slimeTexture === "bouncy"
              ? {
                  stiffness: 0.032,
                  damping: 0.87,
                  elasticity: 1.52,
                  stretch: 1.48,
                }
              : {};
    const recoveryTuning =
      mode !== "squishy"
        ? {}
        : recovery === "slow"
          ? {
              stiffness: base.stiffness * 0.7,
              damping: Math.min(0.94, base.damping + 0.045),
            }
          : recovery === "fast"
            ? {
                stiffness: base.stiffness * 1.36,
                damping: Math.max(0.68, base.damping - 0.055),
              }
            : {};
    return { ...base, ...slimeTuning, ...recoveryTuning };
  }, [mode, recovery, slimeTexture, surface, waxBroken]);

  const updateSvg = () => {
    meshRef.current.loops.forEach((loop, index) => {
      const path = pathFromLoop(loop.points);
      basePathRefs.current[index]?.setAttribute("d", path);
      texturePathRefs.current[index]?.setAttribute("d", path);
      washPathRefs.current[index]?.setAttribute("d", path);
      clipPathRefs.current[index]?.setAttribute("d", path);
      waxShellPathRefs.current[index]?.setAttribute("d", path);
    });

    const pointer = pointerRef.current;
    const particles = particlesRef.current;
    if (mode === "crunch" || mode === "slime") {
      particles.forEach((particle, index) => {
        const distance = Math.max(
          8,
          Math.hypot(particle.x - pointer.x, particle.y - pointer.y),
        );
        if (pointer.active) {
          const influence = Math.exp(-Math.pow(distance / 72, 2));
          const directionX = (particle.x - pointer.x) / distance;
          const directionY = (particle.y - pointer.y) / distance;
          if (mode === "crunch") {
            particle.vx +=
              directionX * influence * pointer.strength * 0.72 +
              pointer.dragX * influence * 0.002;
            particle.vy +=
              directionY * influence * pointer.strength * 0.72 +
              pointer.dragY * influence * 0.002;
          } else {
            particle.vx += pointer.dragX * influence * 0.0014;
            particle.vy += pointer.dragY * influence * 0.0014;
          }
        }

        const centerPull = mode === "slime" ? 0.0018 : 0.00035;
        particle.vx += (180 - particle.x) * centerPull;
        particle.vy += (142 - particle.y) * centerPull;
        const particleDamping = mode === "slime" ? 0.92 : 0.84;
        particle.vx *= particleDamping;
        particle.vy *= particleDamping;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.x = Math.max(72, Math.min(288, particle.x));
        particle.y = Math.max(55, Math.min(225, particle.y));

        const node = particleRefs.current[index];
        node?.setAttribute("x", particle.x.toFixed(2));
        node?.setAttribute("y", particle.y.toFixed(2));
        if (node && mode === "crunch") {
          node.setAttribute(
            "transform",
            `rotate(${((particle.vx + particle.vy) * 18).toFixed(2)} ${particle.x.toFixed(2)} ${particle.y.toFixed(2)})`,
          );
        }
      });
    }

    const contact = contactRef.current;
    if (contact) {
      const strength = Math.min(1, pointer.strength);
      contact.setAttribute("cx", pointer.x.toFixed(2));
      contact.setAttribute("cy", pointer.y.toFixed(2));
      contact.setAttribute("rx", (35 - strength * 13).toFixed(2));
      contact.setAttribute("ry", (18 - strength * 7).toFixed(2));
      contact.setAttribute(
        "opacity",
        pointer.active ? (0.1 + strength * 0.24).toFixed(3) : "0",
      );
    }

    if (highlightRef.current) {
      highlightRef.current.setAttribute(
        "cx",
        (120 - pointer.dragX * 0.05 - (pointer.x - 180) * 0.08).toFixed(2),
      );
      highlightRef.current.setAttribute(
        "cy",
        (75 - pointer.dragY * 0.03 - (pointer.y - 140) * 0.05).toFixed(2),
      );
    }

    if (shadowRef.current) {
      const dragDistance = Math.hypot(pointer.dragX, pointer.dragY);
      shadowRef.current.setAttribute(
        "cx",
        (180 + pointer.dragX * 0.08).toFixed(2),
      );
      shadowRef.current.setAttribute(
        "rx",
        (94 + Math.min(24, dragDistance * 0.13)).toFixed(2),
      );
      shadowRef.current.setAttribute(
        "ry",
        (15 - Math.min(4, pointer.strength * 3)).toFixed(2),
      );
    }

    wrinkleRefs.current.forEach((wrinkle, index) => {
      if (!wrinkle) return;
      if (!pointer.active || pointer.strength < 0.35) {
        wrinkle.setAttribute("opacity", "0");
        return;
      }
      const angle = (Math.PI * 2 * index) / 4 + Math.PI * 0.18;
      const startDistance = 22 - pointer.strength * 5;
      const endDistance = 38 + pointer.strength * 7;
      const startX = pointer.x + Math.cos(angle) * startDistance;
      const startY = pointer.y + Math.sin(angle) * startDistance * 0.65;
      const endX = pointer.x + Math.cos(angle) * endDistance;
      const endY = pointer.y + Math.sin(angle) * endDistance * 0.65;
      const bendX = (startX + endX) * 0.5 + Math.sin(angle) * 5;
      const bendY = (startY + endY) * 0.5 - Math.cos(angle) * 3;
      wrinkle.setAttribute(
        "d",
        `M${startX.toFixed(2)} ${startY.toFixed(2)} Q${bendX.toFixed(2)} ${bendY.toFixed(2)} ${endX.toFixed(2)} ${endY.toFixed(2)}`,
      );
      wrinkle.setAttribute(
        "opacity",
        Math.min(0.34, 0.08 + pointer.strength * 0.24).toFixed(3),
      );
    });
  };

  const runPhysics = (frameTime: number) => {
    if (document.visibilityState === "hidden") {
      animationRef.current = null;
      return;
    }
    const previous = previousFrameRef.current || frameTime - 16.67;
    const deltaSeconds = Math.min(0.032, Math.max(0.008, (frameTime - previous) / 1000));
    previousFrameRef.current = frameTime;

    if (pointerRef.current.active) {
      const heldFor = frameTime - downAtRef.current;
      const holdIncrease = Math.min(0.48, heldFor / 2100);
      pointerRef.current.strength = Math.min(
        1,
        Math.max(pointerRef.current.strength, 0.34) + holdIncrease * 0.035,
      );
    }

    stepSquishyPhysics(
      meshRef.current,
      pointerRef.current,
      physicsValues,
      deltaSeconds,
    );
    updateSvg();

    if (pointerRef.current.active || !meshIsSettled(meshRef.current)) {
      animationRef.current = requestAnimationFrame(runPhysics);
    } else {
      animationRef.current = null;
      previousFrameRef.current = 0;
    }
  };

  const ensureAnimation = () => {
    if (animationRef.current || document.visibilityState === "hidden") return;
    previousFrameRef.current = 0;
    animationRef.current = requestAnimationFrame(runPhysics);
  };

  useImperativeHandle(
    ref,
    () => ({
      press(xPercent, yPercent, pressure) {
        const point = toViewBoxPoint(xPercent, yPercent);
        pointerRef.current = {
          active: true,
          x: point.x,
          y: point.y,
          strength: Math.min(1, Math.max(0.32, pressure)),
          dragX: 0,
          dragY: 0,
          speed: 0,
        };
        downAtRef.current = performance.now();
        ensureAnimation();
      },
      move(xPercent, yPercent, dragX, dragY, speed) {
        const point = toViewBoxPoint(xPercent, yPercent);
        const dragScale =
          mode === "slime" ? 0.78 : mode === "wax" && !waxBroken ? 0.12 : 0.5;
        pointerRef.current.x = point.x;
        pointerRef.current.y = point.y;
        pointerRef.current.dragX = Math.max(-110, Math.min(110, dragX * dragScale));
        pointerRef.current.dragY = Math.max(-96, Math.min(96, dragY * dragScale));
        pointerRef.current.speed = speed;
        pointerRef.current.strength = Math.min(
          1,
          Math.max(pointerRef.current.strength, 0.38 + speed * 0.28),
        );
        ensureAnimation();
      },
      release(releaseVelocityX, releaseVelocityY) {
        pointerRef.current.active = false;
        const releaseScale = mode === "slime" ? 3.2 : mode === "wax" ? 0.45 : 1.7;
        const kickX = Math.max(-8, Math.min(8, releaseVelocityX * releaseScale));
        const kickY = Math.max(-8, Math.min(8, releaseVelocityY * releaseScale));
        meshRef.current.loops.forEach((loop) => {
          loop.points.forEach((point) => {
            const distance = Math.hypot(
              point.x - pointerRef.current.x,
              point.y - pointerRef.current.y,
            );
            const influence = Math.exp(-Math.pow(distance / 60, 2));
            point.vx += kickX * influence * physicsValues.elasticity;
            point.vy += kickY * influence * physicsValues.elasticity;
          });
        });
        pointerRef.current.dragX = 0;
        pointerRef.current.dragY = 0;
        pointerRef.current.strength = 0;
        ensureAnimation();
      },
      reset() {
        pointerRef.current.active = false;
        pointerRef.current.strength = 0;
        pointerRef.current.dragX = 0;
        pointerRef.current.dragY = 0;
        resetMesh(meshRef.current);
        particlesRef.current = createParticles(
          particleCount,
        );
        updateSvg();
      },
    }),
    [mode, particleCount, physicsValues, waxBroken],
  );

  useEffect(() => {
    meshRef.current = mesh;
    basePathRefs.current.length = mesh.loops.length;
    texturePathRefs.current.length = mesh.loops.length;
    washPathRefs.current.length = mesh.loops.length;
    clipPathRefs.current.length = mesh.loops.length;
    waxShellPathRefs.current.length = mesh.loops.length;
    pointerRef.current.active = false;
    particlesRef.current = createParticles(particleCount);
    updateSvg();
  }, [mesh, mode, particleCount]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      } else if (
        document.visibilityState === "visible" &&
        (pointerRef.current.active || !meshIsSettled(meshRef.current))
      ) {
        ensureAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  });

  useEffect(
    () => () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    },
    [],
  );

  const style = {
    "--deform-color": color,
    "--deform-shade": shade,
    "--deform-opacity": transparency / 100,
    "--deform-gloss": gloss / 100,
  } as CSSProperties;

  return (
    <div
      className={`deformable-squishy is-${surface} is-mode-${mode} ${waxBroken ? "is-wax-broken" : ""}`}
      style={style}
      aria-label={`${shape} 모양 ${mode} 촉감 장난감`}
    >
      <svg viewBox="0 0 360 280" role="img">
        <defs>
          <radialGradient id={`${id}-volume`} cx="36%" cy="28%" r="76%">
            <stop offset="0" stopColor="white" stopOpacity="0.72" />
            <stop offset="0.3" stopColor="var(--deform-color)" />
            <stop offset="0.72" stopColor="var(--deform-color)" />
            <stop offset="1" stopColor="var(--deform-shade)" />
          </radialGradient>
          <radialGradient id={`${id}-contact`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#253120" stopOpacity="0.32" />
            <stop offset="0.45" stopColor="#4a5942" stopOpacity="0.16" />
            <stop offset="1" stopColor="#4a5942" stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`${id}-texture`}
            patternUnits="userSpaceOnUse"
            width="360"
            height="280"
          >
            <image
              href={customTexturePath ?? texturePath}
              x="0"
              y="-40"
              width="360"
              height="360"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
          <filter id={`${id}-soft-shadow`} x="-30%" y="-35%" width="160%" height="190%">
            <feDropShadow
              dx="0"
              dy="9"
              stdDeviation="7"
              floodColor="#293525"
              floodOpacity="0.2"
            />
          </filter>
          <filter id={`${id}-contact-blur`} x="-35%" y="-60%" width="170%" height="220%">
            <feGaussianBlur stdDeviation="2.8" />
          </filter>
          <linearGradient id={`${id}-wax-shell`} x1="0.22" y1="0.08" x2="0.82" y2="0.94">
            <stop offset="0" stopColor="white" stopOpacity="0.46" />
            <stop offset="0.28" stopColor={waxShell} />
            <stop offset="1" stopColor={waxShellShade} />
          </linearGradient>
          <clipPath id={`${id}-body-clip`}>
            {mesh.loops.map((loop, index) => (
              <path
                ref={(node) => {
                  clipPathRefs.current[index] = node;
                }}
                d={pathFromLoop(loop.points)}
                key={index}
              />
            ))}
          </clipPath>
        </defs>

        <ellipse
          ref={shadowRef}
          className="deformable-ground-shadow"
          cx="180"
          cy="237"
          rx="94"
          ry="15"
        />

        {mesh.loops.map((loop, index) => {
          const initialPath = pathFromLoop(loop.points);
          return (
            <g key={`${shape}-${index}`}>
              <path
                ref={(node) => {
                  basePathRefs.current[index] = node;
                }}
                className="deformable-base"
                d={initialPath}
                fill={`url(#${id}-volume)`}
                filter={`url(#${id}-soft-shadow)`}
              />
              <path
                ref={(node) => {
                  texturePathRefs.current[index] = node;
                }}
                className="deformable-texture"
                d={initialPath}
                fill={`url(#${id}-texture)`}
              />
              <path
                ref={(node) => {
                  washPathRefs.current[index] = node;
                }}
                className="deformable-wash"
                d={initialPath}
                fill="var(--deform-color)"
              />
            </g>
          );
        })}

        {mode === "slime" || mode === "crunch" ? (
          <g
            className={`deformable-materials is-${mode}`}
            clipPath={`url(#${id}-body-clip)`}
            aria-hidden="true"
          >
            {particlesRef.current.slice(0, particleCount).map((particle, index) => (
              <text
                ref={(node) => {
                  particleRefs.current[index] = node;
                }}
                x={particle.x}
                y={particle.y}
                fill={particleColor ?? (mode === "crunch" ? "#667558" : "#ffffff")}
                fillOpacity={particle.opacity}
                fontSize={particle.radius * (mode === "crunch" ? 3.1 : 2.6)}
                textAnchor="middle"
                dominantBaseline="middle"
                key={index}
              >
                {mode === "slime"
                  ? decorationSymbol
                  : particleSymbols[index % Math.max(1, particleSymbols.length)] ?? "●"}
              </text>
            ))}
          </g>
        ) : null}

        {mode === "wax" && !waxBroken ? (
          <>
            {mesh.loops.map((loop, index) => (
              <path
                ref={(node) => {
                  waxShellPathRefs.current[index] = node;
                }}
                className="deformable-wax-shell"
                d={pathFromLoop(loop.points)}
                fill={`url(#${id}-wax-shell)`}
                opacity={Math.max(0.08, 1 - waxProgress / 112)}
                key={index}
              />
            ))}
            <g
              className="deformable-wax-cracks"
              clipPath={`url(#${id}-body-clip)`}
              aria-hidden="true"
            >
              {waxCracks.map((crack) => {
                const radians = (crack.angle * Math.PI) / 180;
                const x = 78 + crack.x * 2.04;
                const y = 38 + crack.y * 2.04;
                return (
                  <g key={crack.id}>
                    <line
                      x1={x}
                      y1={y}
                      x2={x + Math.cos(radians) * crack.length}
                      y2={y + Math.sin(radians) * crack.length}
                    />
                    <line
                      x1={x + Math.cos(radians) * crack.length * 0.52}
                      y1={y + Math.sin(radians) * crack.length * 0.52}
                      x2={x + Math.cos(radians + 0.65) * crack.length * 0.9}
                      y2={y + Math.sin(radians + 0.65) * crack.length * 0.9}
                    />
                  </g>
                );
              })}
            </g>
          </>
        ) : null}

        <ellipse
          ref={contactRef}
          className="deformable-contact"
          cx="180"
          cy="140"
          rx="34"
          ry="17"
          fill={`url(#${id}-contact)`}
          filter={`url(#${id}-contact-blur)`}
          opacity="0"
        />

        <g className="deformable-wrinkles">
          {Array.from({ length: 4 }, (_, index) => (
            <path
              ref={(node) => {
                wrinkleRefs.current[index] = node;
              }}
              opacity="0"
              key={index}
            />
          ))}
        </g>

        <ellipse
          ref={highlightRef}
          className="deformable-highlight"
          cx="120"
          cy="75"
          rx="47"
          ry="15"
        />
      </svg>
    </div>
  );
});
