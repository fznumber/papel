export type Hand = "R" | "L" | "F" | "N";
export type PhaseType = "convey" | "knead";
export type ZoneId = "Z1" | "Z2" | "Z3" | "Z4";

export type PhaseDef = {
  id: string;
  zone: ZoneId;
  label: string;
  type: PhaseType;
  length: number;
  pitch?: number;
  elements?: number;
  stagger?: number;
  startAngle: number;
  hand: Hand;
  color: string;
  z0: number;
};

/** OpenSCAD geometric parameters, millimetres. */
export const GEOM = {
  odNominal: 25.3,
  rootRadius: 7.85,
  squareShaftSide: 6.35,
  squareClearance: 0.3,
  screwClearance: 0.4,
  centerDistance: 25.3,
} as const;

export const rPeak = (GEOM.odNominal - GEOM.screwClearance) / 2; // 12.45
export const rRoot = GEOM.rootRadius - GEOM.screwClearance / 2; // 7.65
export const lobeOff = rPeak - rRoot; // 4.80
export const barrelRadius = GEOM.odNominal / 2; // 12.65
export const squareBore = GEOM.squareShaftSide + GEOM.squareClearance;

const RAW: Omit<PhaseDef, "z0">[] = [
  { id: "Z1a", zone: "Z1", label: "Alimentación 1D", type: "convey", length: 50.6, pitch: 50.6, startAngle: 0, hand: "R", color: "#e23d3d" },
  { id: "Z1b", zone: "Z1", label: "Alimentación 1D", type: "convey", length: 50.6, pitch: 50.6, startAngle: 0, hand: "R", color: "#e8882a" },
  { id: "Z1c", zone: "Z1", label: "Alimentación 0.75D", type: "convey", length: 37.95, pitch: 37.95, startAngle: 0, hand: "R", color: "#c9a227" },
  { id: "Z2a", zone: "Z2", label: "Transporte 0.75D", type: "convey", length: 37.95, pitch: 37.95, startAngle: 0, hand: "R", color: "#3d9a56" },
  { id: "Z2b", zone: "Z2", label: "Amasado 45° F", type: "knead", length: 37.95, elements: 5, stagger: 45, startAngle: 0, hand: "F", color: "#7cba3a" },
  { id: "Z2c", zone: "Z2", label: "Transporte 0.375D", type: "convey", length: 18.98, pitch: 18.98, startAngle: 180, hand: "R", color: "#6b7c32" },
  { id: "Z3a", zone: "Z3", label: "Amasado 45° R", type: "knead", length: 37.95, elements: 5, stagger: 45, startAngle: 180, hand: "R", color: "#2aa8c4" },
  { id: "Z3b", zone: "Z3", label: "Inverso 0.375D", type: "convey", length: 18.98, pitch: 18.98, startAngle: 0, hand: "L", color: "#4682b4" },
  { id: "Z3c", zone: "Z3", label: "Amasado 45° R", type: "knead", length: 37.95, elements: 5, stagger: 45, startAngle: 0, hand: "R", color: "#2f5fbf" },
  { id: "Z3d", zone: "Z3", label: "Inverso 0.375D", type: "convey", length: 18.98, pitch: 18.98, startAngle: 180, hand: "L", color: "#243a7a" },
  { id: "Z3e", zone: "Z3", label: "Amasado 90° N", type: "knead", length: 37.95, elements: 4, stagger: 90, startAngle: 180, hand: "N", color: "#6b3fa0" },
  { id: "Z3f", zone: "Z3", label: "Inverso 0.375D", type: "convey", length: 18.98, pitch: 18.98, startAngle: 90, hand: "L", color: "#c23b8c" },
  { id: "Z3g", zone: "Z3", label: "Amasado 45° R", type: "knead", length: 37.95, elements: 5, stagger: 45, startAngle: 90, hand: "R", color: "#d67a9a" },
  { id: "Z3h", zone: "Z3", label: "Transporte 0.375D", type: "convey", length: 18.98, pitch: 18.98, startAngle: 270, hand: "R", color: "#c1323a" },
  { id: "Z4a", zone: "Z4", label: "Dosificación 0.75D", type: "convey", length: 37.95, pitch: 37.95, startAngle: 270, hand: "R", color: "#7a5340" },
  { id: "Z4b", zone: "Z4", label: "Dosificación 0.75D", type: "convey", length: 37.95, pitch: 37.95, startAngle: 270, hand: "R", color: "#8a8f96" },
];

let zCursor = 0;
export const PHASES: PhaseDef[] = RAW.map((p) => {
  const z0 = zCursor;
  zCursor += p.length;
  return { ...p, z0 };
});

export const TOTAL_LENGTH = zCursor;
export const PHASE_BY_ID = Object.fromEntries(PHASES.map((p) => [p.id, p]));

export const ZONE_META: Record<
  ZoneId,
  { name: string; detail: string; color: string }
> = {
  Z1: { name: "Alimentación", detail: "Sólidos · paso largo", color: "#c9a227" },
  Z2: { name: "Fusión", detail: "Compresión y amasado F", color: "#3d9a56" },
  Z3: { name: "Mezclado", detail: "Inversos y bloques KB", color: "#2f5fbf" },
  Z4: { name: "Dosificación", detail: "Bombeo al dado", color: "#8a8f96" },
};

export const MATERIAL = {
  name: "PETG-CF",
  od: GEOM.odNominal,
  shaft: '1/4″ (6.35 mm)',
  length: TOTAL_LENGTH,
  cd: GEOM.centerDistance,
};

export function phaseAt(z: number): PhaseDef {
  const zz = ((z % TOTAL_LENGTH) + TOTAL_LENGTH) % TOTAL_LENGTH;
  for (let i = PHASES.length - 1; i >= 0; i--) {
    const p = PHASES[i]!;
    if (zz >= p.z0) return p;
  }
  return PHASES[0]!;
}

export function twistSign(hand: Hand): number {
  // OpenSCAD: R → −1, L → +1
  return hand === "R" ? -1 : 1;
}

export function kneadSign(hand: Hand): number {
  // OpenSCAD: F → −1, otherwise +1
  return hand === "F" ? -1 : 1;
}
