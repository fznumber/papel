/** Mesh forces and tooth stress for TwinLock-253 (spur, α = 20°). Units: mm, N, N·m, MPa. */

import {
  GEARS,
  POS,
  Z,
  computeDrive,
  type MotorId,
  type PreId,
} from "@/lib/design";

const ALPHA = (25 * Math.PI) / 180;

export const TOOTH_MAT = {
  petg: {
    label: "PETG-CF",
    sigmaB: 20,
    sigmaH: 35,
    E: 4500,
    nu: 0.38,
  },
  steel: {
    label: "Acero",
    sigmaB: 160,
    sigmaH: 520,
    E: 210000,
    nu: 0.29,
  },
} as const;

export type MatId = keyof typeof TOOTH_MAT;

/** Reverse-kneading peak vs steady screw torque. */
export const KNEAD_PEAK = 1.6;

function lewisY(z: number) {
  return Math.PI * (0.170 - 0.950 / z);
}

function bendingMPa(ft: number, face: number, module: number, z: number) {
  return ft / (face * module * lewisY(z));
}

function hertzMPa(
  ft: number,
  face: number,
  d1: number,
  d2: number,
  a: (typeof TOOTH_MAT)[MatId],
  b: (typeof TOOTH_MAT)[MatId],
) {
  const k1 = (1 - a.nu ** 2) / a.E;
  const k2 = (1 - b.nu ** 2) / b.E;
  const rho1 = (d1 / 2) * Math.sin(ALPHA);
  const rho2 = (d2 / 2) * Math.sin(ALPHA);
  const fn = ft / Math.cos(ALPHA);
  return Math.sqrt((fn * (1 / rho1 + 1 / rho2)) / (Math.PI * face * (k1 + k2)));
}

export interface ToothCheck {
  name: string;
  z: number;
  mat: MatId;
  sigmaB: number;
  sigmaH: number;
  sfB: number;
  sfH: number;
  sf: number;
  mode: "flexión" | "Hertz";
}

export interface MeshLoad {
  id: "dist-L" | "dist-R" | "out-L" | "out-R";
  name: string;
  x: number;
  y: number;
  z: number;
  nx: number;
  ny: number;
  tx: number;
  ty: number;
  Ft: number;
  Fr: number;
  Fn: number;
  pinion: ToothCheck;
  gear: ToothCheck;
  sf: number;
}

export interface GearLoadResult {
  loadFactor: number;
  torqueIn: number;
  torqueOut: number;
  torqueRated: number;
  torqueStall: number;
  meshes: MeshLoad[];
  critical: ToothCheck & { mesh: string };
  failPct: number;
  heat: Record<string, number>;
}

function along(
  a: { x: number; y: number },
  b: { x: number; y: number },
  ra: number,
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy);
  return {
    x: a.x + (dx * ra) / d,
    y: a.y + (dy * ra) / d,
    nx: dx / d,
    ny: dy / d,
    tx: -dy / d,
    ty: dx / d,
  };
}

function check(
  name: string,
  z: number,
  mat: MatId,
  ft: number,
  face: number,
  module: number,
  dSelf: number,
  dMate: number,
  mate: MatId,
): ToothCheck {
  const m = TOOTH_MAT[mat];
  const sigmaB = Math.max(bendingMPa(ft, face, module, z), 1e-9);
  const sigmaH = Math.max(hertzMPa(ft, face, dSelf, dMate, m, TOOTH_MAT[mate]), 1e-9);
  const sfB = m.sigmaB / sigmaB;
  const sfH = m.sigmaH / sigmaH;
  const sf = Math.min(sfB, sfH);
  return {
    name,
    z,
    mat,
    sigmaB,
    sigmaH,
    sfB,
    sfH,
    sf,
    mode: sfB <= sfH ? "flexión" : "Hertz",
  };
}

function heatFromSf(sf: number) {
  if (!Number.isFinite(sf)) return 0;
  return Math.max(0, Math.min(1, (2.2 - sf) / 1.4));
}

export interface LoadOpts {
  cmpPinionMat?: MatId;
  dutyPeak?: number;
}

export function computeGearLoads(
  motorId: MotorId,
  preId: PreId,
  loadFactor = 1,
  opts: LoadOpts = {},
): GearLoadResult {
  const drive = computeDrive(motorId, preId);
  const cmpMat: MatId = opts.cmpPinionMat ?? "petg";
  const peak = opts.dutyPeak ?? 1;
  const torqueOut = drive.torqueRated * loadFactor * peak;
  const torqueIn = torqueOut / 6;
  const tShareIn = torqueIn / 2;
  const tCmp = (torqueOut / 2) * (GEARS.cmpPinion.z / GEARS.output.z);

  const ftDist = (2000 * tShareIn) / GEARS.input.pd;
  const ftOut = (2000 * tCmp) / GEARS.cmpPinion.pd;
  const frDist = ftDist * Math.tan(ALPHA);
  const frOut = ftOut * Math.tan(ALPHA);

  const mkDist = (id: MeshLoad["id"], cmp: { x: number; y: number }, side: "L" | "R"): MeshLoad => {
    const p = along(POS.input, cmp, GEARS.input.pd / 2);
    const pinion = check(
      `Piñón Z${GEARS.input.z}`,
      GEARS.input.z,
      "petg",
      ftDist,
      GEARS.input.face,
      GEARS.input.m,
      GEARS.input.pd,
      GEARS.crown.pd,
      "petg",
    );
    const gear = check(
      `Corona ${side} Z${GEARS.crown.z}`,
      GEARS.crown.z,
      "petg",
      ftDist,
      GEARS.crown.face,
      GEARS.crown.m,
      GEARS.crown.pd,
      GEARS.input.pd,
      "petg",
    );
    return {
      id,
      name: `Distribución ${side}`,
      x: p.x,
      y: p.y,
      z: Z.distribution,
      nx: p.nx,
      ny: p.ny,
      tx: p.tx,
      ty: p.ty,
      Ft: ftDist,
      Fr: frDist,
      Fn: ftDist / Math.cos(ALPHA),
      pinion,
      gear,
      sf: Math.min(pinion.sf, gear.sf),
    };
  };

  const mkOut = (
    id: MeshLoad["id"],
    cmp: { x: number; y: number },
    out: { x: number; y: number },
    side: "L" | "R",
    z: number,
  ): MeshLoad => {
    const p = along(cmp, out, GEARS.cmpPinion.pd / 2);
    const pinion = check(
      `Piñón ${side} Z${GEARS.cmpPinion.z}`,
      GEARS.cmpPinion.z,
      cmpMat,
      ftOut,
      GEARS.cmpPinion.face,
      GEARS.cmpPinion.m,
      GEARS.cmpPinion.pd,
      GEARS.output.pd,
      "steel",
    );
    const gear = check(
      `Salida ${side} Z${GEARS.output.z}`,
      GEARS.output.z,
      "steel",
      ftOut,
      GEARS.output.face,
      GEARS.output.m,
      GEARS.output.pd,
      GEARS.cmpPinion.pd,
      cmpMat,
    );
    return {
      id,
      name: `Salida ${side}`,
      x: p.x,
      y: p.y,
      z,
      nx: p.nx,
      ny: p.ny,
      tx: p.tx,
      ty: p.ty,
      Ft: ftOut,
      Fr: frOut,
      Fn: ftOut / Math.cos(ALPHA),
      pinion,
      gear,
      sf: Math.min(pinion.sf, gear.sf),
    };
  };

  const meshes: MeshLoad[] = [
    mkDist("dist-L", POS.cmpL, "L"),
    mkDist("dist-R", POS.cmpR, "R"),
    mkOut("out-L", POS.cmpL, POS.outL, "L", Z.outputGearL),
    mkOut("out-R", POS.cmpR, POS.outR, "R", Z.outputGearR),
  ];

  const teeth = meshes.flatMap((m) => [
    { ...m.pinion, mesh: m.name },
    { ...m.gear, mesh: m.name },
  ]);
  const critical = teeth.reduce((a, b) => (b.sf < a.sf ? b : a));
  const failPct = Math.max(8, Math.min(240, critical.sf * 100));

  const heat = {
    "gear-input": heatFromSf(meshes[0]!.pinion.sf),
    "compound-L": heatFromSf(Math.min(meshes[0]!.gear.sf, meshes[2]!.pinion.sf)),
    "compound-R": heatFromSf(Math.min(meshes[1]!.gear.sf, meshes[3]!.pinion.sf)),
    "gear-out-L": heatFromSf(meshes[2]!.gear.sf),
    "gear-out-R": heatFromSf(meshes[3]!.gear.sf),
  };

  return {
    loadFactor,
    torqueIn,
    torqueOut,
    torqueRated: drive.torqueRated,
    torqueStall: drive.torqueStall,
    meshes,
    critical,
    failPct,
    heat,
  };
}
