export type DeformableShape =
  | "peach"
  | "cloud"
  | "paw"
  | "bread"
  | "pudding"
  | "orb";
export type SquishySurface = "foam" | "gel" | "mochi" | "clear-crunch";

export type PhysicsPoint = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  normalX: number;
  normalY: number;
};

export type PhysicsLoop = {
  centerX: number;
  centerY: number;
  points: PhysicsPoint[];
};

export type PhysicsMesh = {
  loops: PhysicsLoop[];
};

export type PointerForce = {
  active: boolean;
  x: number;
  y: number;
  strength: number;
  dragX: number;
  dragY: number;
  speed: number;
};

export type PhysicsValues = {
  stiffness: number;
  damping: number;
  mass: number;
  elasticity: number;
  viscosity: number;
  maxIndent: number;
  stretch: number;
  compression: number;
  volumeShift: number;
};

export const surfacePhysics: Record<SquishySurface, PhysicsValues> = {
  foam: {
    stiffness: 0.038,
    damping: 0.86,
    mass: 1.25,
    elasticity: 0.58,
    viscosity: 0.62,
    maxIndent: 20,
    stretch: 0.8,
    compression: 1,
    volumeShift: 1,
  },
  gel: {
    stiffness: 0.072,
    damping: 0.76,
    mass: 0.88,
    elasticity: 0.9,
    viscosity: 0.34,
    maxIndent: 25,
    stretch: 1.05,
    compression: 1.08,
    volumeShift: 1.08,
  },
  mochi: {
    stiffness: 0.044,
    damping: 0.83,
    mass: 1.18,
    elasticity: 0.72,
    viscosity: 0.78,
    maxIndent: 28,
    stretch: 0.92,
    compression: 1.18,
    volumeShift: 1.05,
  },
  "clear-crunch": {
    stiffness: 0.058,
    damping: 0.79,
    mass: 1.02,
    elasticity: 0.76,
    viscosity: 0.5,
    maxIndent: 22,
    stretch: 0.76,
    compression: 0.92,
    volumeShift: 0.9,
  },
};

export const modePhysics: Record<"slime" | "crunch" | "wax-shell", PhysicsValues> = {
  slime: {
    stiffness: 0.014,
    damping: 0.945,
    mass: 1.35,
    elasticity: 1.3,
    viscosity: 0.9,
    maxIndent: 62,
    stretch: 2.1,
    compression: 0.42,
    volumeShift: 0.55,
  },
  crunch: {
    stiffness: 0.052,
    damping: 0.81,
    mass: 1.08,
    elasticity: 0.72,
    viscosity: 0.53,
    maxIndent: 24,
    stretch: 0.72,
    compression: 0.96,
    volumeShift: 0.9,
  },
  "wax-shell": {
    stiffness: 0.16,
    damping: 0.7,
    mass: 1.42,
    elasticity: 0.16,
    viscosity: 0.18,
    maxIndent: 6,
    stretch: 0.12,
    compression: 0.2,
    volumeShift: 0.12,
  },
};

const createLoop = (
  centerX: number,
  centerY: number,
  coordinates: { x: number; y: number }[],
): PhysicsLoop => ({
  centerX,
  centerY,
  points: coordinates.map(({ x, y }) => {
    const length = Math.max(1, Math.hypot(x - centerX, y - centerY));
    return {
      baseX: x,
      baseY: y,
      x,
      y,
      vx: 0,
      vy: 0,
      normalX: (x - centerX) / length,
      normalY: (y - centerY) / length,
    };
  }),
});

const sampleLoop = (
  count: number,
  sampler: (angle: number, index: number) => { x: number; y: number },
) => Array.from({ length: count }, (_, index) => sampler((index / count) * Math.PI * 2, index));

export function createSquishyMesh(
  shape: DeformableShape,
  preferredPointCount: number,
): PhysicsMesh {
  const count = Math.max(24, Math.min(40, preferredPointCount));

  if (shape === "orb") {
    return {
      loops: [
        createLoop(
          180,
          140,
          sampleLoop(count, (angle) => ({
            x: 180 + Math.cos(angle) * 103,
            y: 140 + Math.sin(angle) * 99,
          })),
        ),
      ],
    };
  }

  if (shape === "paw") {
    const toeCount = count >= 36 ? 6 : 4;
    const padCount = count - toeCount * 4;
    const toes = [
      { x: 108, y: 91, rx: 27, ry: 30, tilt: -0.2 },
      { x: 154, y: 67, rx: 25, ry: 31, tilt: -0.07 },
      { x: 206, y: 67, rx: 25, ry: 31, tilt: 0.07 },
      { x: 252, y: 91, rx: 27, ry: 30, tilt: 0.2 },
    ].map((toe) =>
      createLoop(
        toe.x,
        toe.y,
        sampleLoop(toeCount, (angle) => ({
          x: toe.x + Math.cos(angle + toe.tilt) * toe.rx,
          y: toe.y + Math.sin(angle + toe.tilt) * toe.ry,
        })),
      ),
    );
    const pad = createLoop(
      180,
      169,
      sampleLoop(Math.max(12, padCount), (angle) => {
        const upperDip = Math.exp(-Math.pow((angle - Math.PI * 1.5) / 0.5, 2));
        const rawY =
          169 + Math.sin(angle) * (67 + Math.max(0, Math.sin(angle)) * 9);
        return {
          x: 180 + Math.cos(angle) * (79 - upperDip * 8),
          y: rawY > 229 ? 229 + (rawY - 229) * 0.04 : rawY,
        };
      }),
    );
    return { loops: [pad, ...toes] };
  }

  if (shape === "peach") {
    return {
      loops: [
        createLoop(
          180,
          143,
          sampleLoop(count, (angle) => {
            const topDistance = Math.atan2(
              Math.sin(angle - Math.PI * 1.5),
              Math.cos(angle - Math.PI * 1.5),
            );
            const notch = Math.exp(-Math.pow(topDistance / 0.27, 2));
            const sideFullness = 1 + 0.07 * Math.cos(angle * 2);
            const rawY =
              142 +
              Math.sin(angle) * 102 +
              notch * 22 +
              Math.max(0, Math.sin(angle)) * 8;
            return {
              x: 180 + Math.cos(angle) * 99 * sideFullness,
              y: rawY > 229 ? 229 + (rawY - 229) * 0.04 : rawY,
            };
          }),
        ),
      ],
    };
  }

  if (shape === "cloud") {
    return {
      loops: [
        createLoop(
          180,
          143,
          sampleLoop(count, (angle) => {
            const lobes =
              1 + 0.105 * Math.cos(angle * 6 - 0.35) + 0.035 * Math.cos(angle * 3);
            const rawY = 143 + Math.sin(angle) * 82 * lobes;
            return {
              x: 180 + Math.cos(angle) * 124 * lobes,
              y: rawY > 211 ? 211 + (rawY - 211) * 0.28 : rawY,
            };
          }),
        ),
      ],
    };
  }

  if (shape === "pudding") {
    return {
      loops: [
        createLoop(
          180,
          141,
          sampleLoop(count, (angle) => {
            const sine = Math.sin(angle);
            const vertical = 141 + sine * 94;
            const widthFactor = 0.74 + ((vertical - 47) / 188) * 0.3;
            const roundedCosine =
              Math.sign(Math.cos(angle)) * Math.pow(Math.abs(Math.cos(angle)), 0.7);
            return {
              x: 180 + roundedCosine * 106 * widthFactor,
              y: vertical > 228 ? 228 + (vertical - 228) * 0.1 : vertical,
            };
          }),
        ),
      ],
    };
  }

  return {
    loops: [
      createLoop(
        180,
        143,
        sampleLoop(count, (angle) => {
          const cosine = Math.cos(angle);
          const sine = Math.sin(angle);
          const roundedX = Math.sign(cosine) * Math.pow(Math.abs(cosine), 0.62);
          const roundedY = Math.sign(sine) * Math.pow(Math.abs(sine), 0.7);
          const topCrown = sine < 0 ? 10 * Math.cos(angle * 3) : 0;
          const rawY = 143 + roundedY * 92 - topCrown;
          return {
            x: 180 + roundedX * 106,
            y: rawY > 229 ? 229 : rawY,
          };
        }),
      ),
    ],
  };
}

export function resetMesh(mesh: PhysicsMesh) {
  mesh.loops.forEach((loop) => {
    loop.points.forEach((point) => {
      point.x = point.baseX;
      point.y = point.baseY;
      point.vx = 0;
      point.vy = 0;
    });
  });
}

export function pathFromLoop(points: PhysicsPoint[]) {
  if (points.length < 3) return "";
  const commands = [`M${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`];
  const count = points.length;
  for (let index = 0; index < count; index += 1) {
    const previous = points[(index - 1 + count) % count];
    const current = points[index];
    const next = points[(index + 1) % count];
    const afterNext = points[(index + 2) % count];
    const control1X = current.x + (next.x - previous.x) / 6;
    const control1Y = current.y + (next.y - previous.y) / 6;
    const control2X = next.x - (afterNext.x - current.x) / 6;
    const control2Y = next.y - (afterNext.y - current.y) / 6;
    commands.push(
      `C${control1X.toFixed(2)} ${control1Y.toFixed(2)} ${control2X.toFixed(2)} ${control2Y.toFixed(2)} ${next.x.toFixed(2)} ${next.y.toFixed(2)}`,
    );
  }
  commands.push("Z");
  return commands.join(" ");
}

function nearestPoint(mesh: PhysicsMesh, x: number, y: number) {
  let nearestLoop = 0;
  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;
  mesh.loops.forEach((loop, loopIndex) => {
    loop.points.forEach((point, pointIndex) => {
      const distance = Math.hypot(point.x - x, point.y - y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLoop = loopIndex;
        nearestIndex = pointIndex;
      }
    });
  });
  return { loopIndex: nearestLoop, pointIndex: nearestIndex, distance: nearestDistance };
}

export function stepSquishyPhysics(
  mesh: PhysicsMesh,
  pointer: PointerForce,
  values: PhysicsValues,
  deltaSeconds: number,
) {
  const deltaScale = Math.min(2, Math.max(0.45, deltaSeconds * 60));
  const nearest = nearestPoint(mesh, pointer.x, pointer.y);
  const primaryLoop = mesh.loops[nearest.loopIndex];
  const centerDistance = Math.hypot(
    pointer.x - primaryLoop.centerX,
    pointer.y - primaryLoop.centerY,
  );
  const centralPress =
    nearest.distance > 38 &&
    centerDistance < 72 &&
    Math.hypot(pointer.dragX, pointer.dragY) < 6;

  mesh.loops.forEach((loop, loopIndex) => {
    const displacements = loop.points.map((point) => ({
      x: point.x - point.baseX,
      y: point.y - point.baseY,
    }));
    const count = loop.points.length;

    loop.points.forEach((point, index) => {
      const previous = displacements[(index - 1 + count) % count];
      const next = displacements[(index + 1) % count];
      const current = displacements[index];
      let forceX = (point.baseX - point.x) * values.stiffness;
      let forceY = (point.baseY - point.y) * values.stiffness;

      forceX +=
        ((previous.x + next.x) * 0.5 - current.x) * values.viscosity * 0.09;
      forceY +=
        ((previous.y + next.y) * 0.5 - current.y) * values.viscosity * 0.09;

      if (pointer.active) {
        if (centralPress && loopIndex === nearest.loopIndex) {
          const outward =
            Math.max(0, 1 - Math.abs(index - nearest.pointIndex) / (count * 0.5));
          forceX += point.normalX * pointer.strength * outward * 0.28;
          forceY += point.normalY * pointer.strength * outward * 0.28;
        } else if (loopIndex === nearest.loopIndex) {
          const directDistance = Math.min(
            Math.abs(index - nearest.pointIndex),
            count - Math.abs(index - nearest.pointIndex),
          );
          const influence = Math.exp(-Math.pow(directDistance / Math.max(1.4, count * 0.1), 2));
          const dragging = Math.hypot(pointer.dragX, pointer.dragY) > 6;
          if (dragging) {
            const targetX = point.baseX + pointer.dragX * (0.55 + values.elasticity * 0.28);
            const targetY = point.baseY + pointer.dragY * (0.55 + values.elasticity * 0.28);
            forceX += (targetX - point.x) * influence * 0.065 * pointer.strength;
            forceY += (targetY - point.y) * influence * 0.065 * pointer.strength;
            forceX +=
              (targetX - point.x) *
              influence *
              0.04 *
              pointer.strength *
              values.stretch;
            forceY +=
              (targetY - point.y) *
              influence *
              0.04 *
              pointer.strength *
              values.stretch;
          } else {
            const inwardX = loop.centerX - point.baseX;
            const inwardY = loop.centerY - point.baseY;
            const inwardLength = Math.max(1, Math.hypot(inwardX, inwardY));
            forceX +=
              (inwardX / inwardLength) *
              values.maxIndent *
              influence *
              pointer.strength *
              0.055 *
              values.compression;
            forceY +=
              (inwardY / inwardLength) *
              values.maxIndent *
              influence *
              pointer.strength *
              0.055 *
              values.compression;

            const shoulder = Math.exp(-Math.pow((directDistance - count * 0.16) / (count * 0.1), 2));
            forceX +=
              point.normalX *
              shoulder *
              pointer.strength *
              values.elasticity *
              values.volumeShift *
              0.16;
            forceY +=
              point.normalY *
              shoulder *
              pointer.strength *
              values.elasticity *
              values.volumeShift *
              0.16;
          }

          const oppositeIndex = (nearest.pointIndex + Math.floor(count / 2)) % count;
          const oppositeDistance = Math.min(
            Math.abs(index - oppositeIndex),
            count - Math.abs(index - oppositeIndex),
          );
          const oppositeInfluence = Math.exp(-Math.pow(oppositeDistance / Math.max(1, count * 0.1), 2));
          forceX +=
            point.normalX *
            oppositeInfluence *
            pointer.strength *
            values.volumeShift *
            0.07;
          forceY +=
            point.normalY *
            oppositeInfluence *
            pointer.strength *
            values.volumeShift *
            0.07;
        }
      }

      point.vx = (point.vx + (forceX / values.mass) * deltaScale) * values.damping;
      point.vy = (point.vy + (forceY / values.mass) * deltaScale) * values.damping;
      point.x += point.vx * deltaScale;
      point.y += point.vy * deltaScale;

      const displacement = Math.hypot(point.x - point.baseX, point.y - point.baseY);
      const maxDisplacement =
        values.maxIndent + Math.hypot(pointer.dragX, pointer.dragY) * 0.5;
      if (displacement > maxDisplacement) {
        const ratio = maxDisplacement / displacement;
        point.x = point.baseX + (point.x - point.baseX) * ratio;
        point.y = point.baseY + (point.y - point.baseY) * ratio;
        point.vx *= 0.58;
        point.vy *= 0.58;
      }

      if (point.baseY > 220 && point.y > 232) {
        point.y = 232;
        point.vy *= -0.16;
      }
    });
  });
}

export function meshIsSettled(mesh: PhysicsMesh) {
  let energy = 0;
  mesh.loops.forEach((loop) => {
    loop.points.forEach((point) => {
      energy +=
        Math.abs(point.vx) +
        Math.abs(point.vy) +
        Math.abs(point.x - point.baseX) * 0.08 +
        Math.abs(point.y - point.baseY) * 0.08;
    });
  });
  return energy / Math.max(1, mesh.loops.reduce((sum, loop) => sum + loop.points.length, 0)) < 0.018;
}
