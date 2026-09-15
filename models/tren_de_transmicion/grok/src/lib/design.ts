/** TwinLock-253 split-power drivetrain — single source of truth (mm, N, N·m). */

export const SPEC = {
  name: "TwinLock-253-SP6",
  project: "TSE fibrilación de celulosa (algodón / tocuyo)",
  centerDistance: 25.3,
  shaftSquare: 6.35,
  phaseDeg: 90,
  outputRatio: 1,
  corotating: true,
  torqueCombinedMin: 10,
  torqueCombinedMax: 15,
  screwRpmMin: 50,
  screwRpmMax: 300,
  thrustDesignN: 2000,
  radialDesignN: 1200,
  backlashAllowance: 0.25,
  petgSofteningC: 75,
} as const;

export const MODULE = 1.5;

export const GEARS = {
  input: { z: 18, m: MODULE, face: 14, material: "PETG-CF" as const, pd: 18 * MODULE },
  crown: { z: 54, m: MODULE, face: 14, material: "PETG-CF" as const, pd: 54 * MODULE },
  cmpPinion: { z: 16, m: MODULE, face: 16, material: "PETG-CF" as const, pd: 16 * MODULE },
  output: { z: 24, m: MODULE, face: 16, material: "PETG-CF" as const, pd: 24 * MODULE },
} as const;

export const SPLIT_RATIO =
  (GEARS.crown.z / GEARS.input.z) * (GEARS.output.z / GEARS.cmpPinion.z); // 6

export const SCREW = {
  doOuter: 30.36,
  diInner: 20.24,
  pitch: 32,
  length: 110,
};

const halfCd = SPEC.centerDistance / 2;
const outCmpCd = (GEARS.output.pd + GEARS.cmpPinion.pd) / 2; // 36
const inCrownCd = (GEARS.input.pd + GEARS.crown.pd) / 2; // 54

export const POS = {
  outL: { x: -halfCd, y: 0 },
  outR: { x: halfCd, y: 0 },
  cmpL: { x: -halfCd - outCmpCd, y: 0 },
  cmpR: { x: halfCd + outCmpCd, y: 0 },
  input: {
    x: 0,
    y: Math.sqrt(inCrownCd ** 2 - (halfCd + outCmpCd) ** 2),
  },
} as const;

export const Z = {
  thrustPlate: 0,
  thrustBearing: 8,
  frontRadial: 22,
  outputGearL: 40,
  outputGearR: 60,
  distribution: 84,
  rearRadial: 104,
  housingEnd: 120,
  reducer: 148,
  motor: 188,
} as const;

export const BEARINGS = {
  thrust: {
    spec: "51102",
    d: 15,
    D: 28,
    T: 9,
    Ca: 6700,
    C0a: 9800,
  },
  radial: {
    spec: "6001-2Z",
    d: 12,
    D: 28,
    B: 8,
    Cr: 5100,
    C0r: 2380,
  },
} as const;

export type MotorId = "dc775_12" | "nema23_2" | "nema23_3";
export type PreId = "none" | "belt3" | "plan5" | "plan10" | "helical8" | "plan27";

export interface Motor {
  id: MotorId;
  name: string;
  short: string;
  type: "dc" | "stepper";
  ratedTorque: number;
  stallTorque: number;
  noLoadRpm: number;
  ratedRpm: number;
  note: string;
}

export interface PreReduction {
  id: PreId;
  name: string;
  ratio: number;
  eta: number;
  kind: "none" | "belt" | "planetary" | "printed";
}

export const MOTORS: Record<MotorId, Motor> = {
  dc775_12: {
    id: "dc775_12",
    name: "DC 775 · 12 V",
    short: "DC 775",
    type: "dc",
    ratedTorque: 0.22,
    stallTorque: 0.55,
    noLoadRpm: 9000,
    ratedRpm: 6200,
    note: "Alta velocidad, bajo par. Exige reducción agresiva.",
  },
  nema23_2: {
    id: "nema23_2",
    name: "Stepper NEMA 23 · 2 N·m",
    short: "NEMA 23 · 2 N·m",
    type: "stepper",
    ratedTorque: 2.0,
    stallTorque: 2.2,
    noLoadRpm: 900,
    ratedRpm: 420,
    note: "Par constante a baja velocidad. Candidato principal.",
  },
  nema23_3: {
    id: "nema23_3",
    name: "Stepper NEMA 23 · 3 N·m",
    short: "NEMA 23 · 3 N·m",
    type: "stepper",
    ratedTorque: 3.0,
    stallTorque: 3.3,
    noLoadRpm: 700,
    ratedRpm: 320,
    note: "Margen para zonas kneading reverse.",
  },
};

export const PRE_REDUCTIONS: Record<PreId, PreReduction> = {
  none: { id: "none", name: "Directo al split 4.5:1", ratio: 1, eta: 1, kind: "none" },
  belt3: { id: "belt3", name: "Correa HTD 5M 3:1", ratio: 3, eta: 0.95, kind: "belt" },
  plan5: { id: "plan5", name: "Planetario 5:1", ratio: 5, eta: 0.9, kind: "planetary" },
  plan10: { id: "plan10", name: "Planetario 10:1", ratio: 10, eta: 0.88, kind: "planetary" },
  helical8: { id: "helical8", name: "Helicoidal PETG 8:1", ratio: 8, eta: 0.82, kind: "printed" },
  plan27: { id: "plan27", name: "Planetario 27:1", ratio: 27, eta: 0.85, kind: "planetary" },
};

export const SPLIT_ETA = 0.85;

export interface DriveResult {
  totalRatio: number;
  eta: number;
  screwRpmRated: number;
  screwRpmMax: number;
  torqueRated: number;
  torqueStall: number;
  torquePerShaft: number;
  inWindow: boolean;
  rpmInWindow: boolean;
  steelRequired: boolean;
  recommendation: "ideal" | "usable" | "slow" | "weak" | "overkill";
  label: string;
}

export function computeDrive(motorId: MotorId, preId: PreId): DriveResult {
  const motor = MOTORS[motorId];
  const pre = PRE_REDUCTIONS[preId];
  const totalRatio = pre.ratio * SPLIT_RATIO;
  const eta = pre.eta * SPLIT_ETA;
  const screwRpmRated = motor.ratedRpm / totalRatio;
  const screwRpmMax = motor.noLoadRpm / totalRatio;
  const torqueRated = motor.ratedTorque * totalRatio * eta;
  const torqueStall = motor.stallTorque * totalRatio * eta;
  const torquePerShaft = torqueRated / 2;
  const inWindow =
    torqueRated >= SPEC.torqueCombinedMin && torqueRated <= SPEC.torqueCombinedMax * 1.35;
  const rpmInWindow =
    screwRpmRated >= SPEC.screwRpmMin * 0.7 && screwRpmRated <= SPEC.screwRpmMax;
  const steelRequired = torquePerShaft > 6;

  let recommendation: DriveResult["recommendation"] = "usable";
  if (torqueRated < 8) recommendation = "weak";
  else if (screwRpmRated < 30 && torqueRated > 20) recommendation = "overkill";
  else if (screwRpmRated < 40) recommendation = "slow";
  else if (inWindow && rpmInWindow) recommendation = "ideal";

  const label = `${totalRatio.toFixed(0)}:1 · ${screwRpmRated.toFixed(0)} rpm · ${torqueRated.toFixed(1)} N·m`;

  return {
    totalRatio,
    eta,
    screwRpmRated,
    screwRpmMax,
    torqueRated,
    torqueStall,
    torquePerShaft,
    inWindow,
    rpmInWindow,
    steelRequired,
    recommendation,
    label,
  };
}

export function motorCurve(
  motor: Motor,
  totalRatio: number,
  eta: number,
  points = 24,
): { rpm: number; torque: number }[] {
  const out: { rpm: number; torque: number }[] = [];
  if (motor.type === "dc") {
    for (let i = 0; i <= points; i++) {
      const n = (motor.noLoadRpm * i) / points;
      const t = motor.stallTorque * (1 - n / motor.noLoadRpm);
      out.push({ rpm: n / totalRatio, torque: Math.max(0, t * totalRatio * eta) });
    }
  } else {
    const hold = motor.ratedTorque * totalRatio * eta;
    const nRated = motor.ratedRpm / totalRatio;
    const nMax = motor.noLoadRpm / totalRatio;
    out.push({ rpm: 0, torque: motor.stallTorque * totalRatio * eta });
    out.push({ rpm: nRated, torque: hold });
    out.push({ rpm: nMax, torque: hold * 0.25 });
  }
  return out;
}

export function angleFrom(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

export const ANGLES = {
  inToCmpL: angleFrom(POS.input, POS.cmpL),
  inToCmpR: angleFrom(POS.input, POS.cmpR),
  cmpLToOutL: angleFrom(POS.cmpL, POS.outL),
  cmpRToOutR: angleFrom(POS.cmpR, POS.outR),
};

/** Driven gear angle so teeth mesh at the center line. */
export function meshAngle(
  driverAngle: number,
  zDriver: number,
  zDriven: number,
  centerAngle: number,
) {
  return -driverAngle * (zDriver / zDriven) + Math.PI / zDriven + centerAngle * (1 + zDriver / zDriven);
}

export function housingSize() {
  const width = 2 * (Math.abs(POS.cmpL.x) + GEARS.crown.pd / 2 + 10);
  const height = GEARS.crown.pd / 2 + POS.input.y + GEARS.input.pd / 2 + 18;
  const depth = Z.housingEnd + 6;
  return { width, height, depth };
}

/** Machined output adapter — square screw interface to bearing journals. */
export const ADAPTER = {
  id: "TL-253-AD",
  material: "AISI 303",
  overall: 130,
  square: 6.35,
  squareDepth: 130,
  squareTol: "H9",
  plateHole: 16.5,
  shoulderOd: 18,
  shoulderLen: 2.5,
  thrustJournal: 15,
  thrustJournalTol: "g6",
  thrustJournalLen: 10,
  radialJournal: 12,
  radialJournalTol: "g6",
  radialJournalLen: 9,
  gearSeat: 12,
  gearSeatTol: "h7",
  clamp: "2× M4 ISO 4762 en brida partida",
  setScrew: "M4×6 prisionero sobre el cuadrado",
  pin: "Ø3 opcional, pasante, anti-extracción",
  note: "Eje cuadrado 1/4\" (6.35mm) conecta tornillo extrusor con engranaje de salida. L y R son idénticos.",
} as const;

export const AXIAL_STACK = [
  { z: -110, label: "Inicio eje cuadrado (tornillo)", part: "adaptador" },
  { z: 0, label: "Placa de reacción 3 mm", part: "thrust-plate" },
  { z: 8, label: "51102 empuje", part: "thrust-51102" },
  { z: 22, label: "6001 radial ante", part: "radial-6001" },
  { z: 40, label: "Engranaje salida L", part: "gear-out-steel" },
  { z: 60, label: "Engranaje salida R", part: "gear-out-steel" },
  { z: 104, label: "6001 radial post", part: "radial-6001" },
  { z: 120, label: "Cierre caja", part: "housing" },
] as const;

export function cadBundle() {
  return {
    designation: SPEC.name,
    spec: SPEC,
    gears: GEARS,
    splitRatio: SPLIT_RATIO,
    positionsMm: POS,
    axialMm: Z,
    axialStack: AXIAL_STACK,
    bearings: BEARINGS,
    screw: SCREW,
    adapter: ADAPTER,
    housing: housingSize(),
  };
}

export const DEFAULT_MOTOR: MotorId = "nema23_2";
export const DEFAULT_PRE: PreId = "belt3";
