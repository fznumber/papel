import * as THREE from "three";
import {
  GEOM,
  PHASES,
  rRoot,
  lobeOff,
  TOTAL_LENGTH,
  twistSign,
  kneadSign,
  type PhaseDef,
} from "./params";

const RADIAL = 18;

export function stadiumProfile(radialSegs = RADIAL): Float32Array {
  const n = radialSegs * 4;
  const out = new Float32Array(n * 2);
  let k = 0;
  const push = (x: number, y: number) => {
    out[k++] = x;
    out[k++] = y;
  };
  for (let i = 0; i < radialSegs; i++) {
    const t = (Math.PI / 2) * (i / radialSegs);
    push(lobeOff + rRoot * Math.cos(t), rRoot * Math.sin(t));
  }
  for (let i = 0; i < radialSegs * 2; i++) {
    const t = Math.PI / 2 + Math.PI * (i / (radialSegs * 2));
    push(-lobeOff + rRoot * Math.cos(t), rRoot * Math.sin(t));
  }
  for (let i = 0; i < radialSegs; i++) {
    const t = (3 * Math.PI) / 2 + (Math.PI / 2) * (i / radialSegs);
    push(lobeOff + rRoot * Math.cos(t), rRoot * Math.sin(t));
  }
  return out;
}

export const STADIUM = stadiumProfile();

export function pointInStadium(px: number, py: number, pad = 0): boolean {
  const dx = Math.max(-lobeOff, Math.min(lobeOff, px));
  return Math.hypot(px - dx, py) <= rRoot + pad;
}

function sweep(
  profile: Float32Array,
  x0: number,
  length: number,
  startAngle: number,
  twist: number,
  slices: number,
): THREE.BufferGeometry {
  const n = profile.length / 2;
  const rings = slices + 1;
  const vertCount = rings * n + 2;
  const positions = new Float32Array(vertCount * 3);

  for (let i = 0; i < rings; i++) {
    const t = i / slices;
    const x = x0 + t * length;
    const ang = startAngle + t * twist;
    const c = Math.cos(ang);
    const s = Math.sin(ang);
    for (let j = 0; j < n; j++) {
      const px = profile[j * 2]!;
      const py = profile[j * 2 + 1]!;
      const rx = px * c - py * s;
      const ry = px * s + py * c;
      const idx = (i * n + j) * 3;
      positions[idx] = x;
      positions[idx + 1] = ry;
      positions[idx + 2] = -rx;
    }
  }

  const startCenter = rings * n;
  const endCenter = startCenter + 1;
  positions[startCenter * 3] = x0;
  positions[startCenter * 3 + 1] = 0;
  positions[startCenter * 3 + 2] = 0;
  positions[endCenter * 3] = x0 + length;
  positions[endCenter * 3 + 1] = 0;
  positions[endCenter * 3 + 2] = 0;

  const indices: number[] = [];
  for (let i = 0; i < slices; i++) {
    for (let j = 0; j < n; j++) {
      const j2 = (j + 1) % n;
      const a = i * n + j;
      const b = i * n + j2;
      const c = (i + 1) * n + j;
      const d = (i + 1) * n + j2;
      indices.push(a, c, b, b, c, d);
    }
  }
  for (let j = 0; j < n; j++) {
    const j2 = (j + 1) % n;
    indices.push(startCenter, j2, j);
    const e = slices * n;
    indices.push(endCenter, e + j, e + j2);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);
  ensureOutward(geo);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  return geo;
}

function ensureOutward(geo: THREE.BufferGeometry) {
  geo.computeVertexNormals();
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  const nrm = geo.getAttribute("normal") as THREE.BufferAttribute;
  let best = 0;
  let bestR = -1;
  const count = pos.count;
  for (let i = 0; i < count; i++) {
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const r = y * y + z * z;
    if (r > bestR) {
      bestR = r;
      best = i;
    }
  }
  const radialY = pos.getY(best);
  const radialZ = pos.getZ(best);
  const dot = nrm.getY(best) * radialY + nrm.getZ(best) * radialZ;
  if (dot < 0) {
    const idx = geo.index;
    if (!idx) return;
    const arr = idx.array;
    for (let i = 0; i < arr.length; i += 3) {
      const t = arr[i]!;
      arr[i] = arr[i + 1]!;
      arr[i + 1] = t;
    }
    idx.needsUpdate = true;
  }
}

function mergeGeos(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if (geos.length === 1) return geos[0]!;
  let vCount = 0;
  let iCount = 0;
  for (const g of geos) {
    vCount += (g.getAttribute("position") as THREE.BufferAttribute).count;
    iCount += g.index ? g.index.count : 0;
  }
  const positions = new Float32Array(vCount * 3);
  const indices = new Uint32Array(iCount);
  let vOff = 0;
  let iOff = 0;
  let vBase = 0;
  for (const g of geos) {
    const p = g.getAttribute("position") as THREE.BufferAttribute;
    positions.set(p.array as Float32Array, vOff);
    const idx = g.index;
    if (idx) {
      const a = idx.array;
      for (let i = 0; i < a.length; i++) indices[iOff + i] = (a[i] as number) + vBase;
      iOff += a.length;
    }
    vBase += p.count;
    vOff += p.array.length;
    g.dispose();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setIndex(new THREE.BufferAttribute(indices, 1));
  ensureOutward(geo);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  return geo;
}

export function buildPhaseGeometry(phase: PhaseDef): THREE.BufferGeometry {
  const start = (phase.startAngle * Math.PI) / 180;
  if (phase.type === "convey") {
    const pitch = phase.pitch ?? phase.length;
    const twist = twistSign(phase.hand) * (phase.length / pitch) * Math.PI * 2;
    const slices = Math.max(20, Math.round(phase.length * 1.4));
    return sweep(STADIUM, phase.z0, phase.length, start, twist, slices);
  }
  const elements = phase.elements ?? 4;
  const h = phase.length / elements;
  const sign = kneadSign(phase.hand);
  const stagger = ((phase.stagger ?? 45) * Math.PI) / 180;
  const discs: THREE.BufferGeometry[] = [];
  for (let i = 0; i < elements; i++) {
    const ang = start + i * sign * stagger;
    discs.push(sweep(STADIUM, phase.z0 + i * h, h, ang, 0, 2));
  }
  return mergeGeos(discs);
}

let cache: Record<string, THREE.BufferGeometry> | null = null;

export function getPhaseGeometries(): Record<string, THREE.BufferGeometry> {
  if (cache) return cache;
  const next: Record<string, THREE.BufferGeometry> = {};
  for (const phase of PHASES) {
    next[phase.id] = buildPhaseGeometry(phase);
  }
  cache = next;
  return next;
}

export function makeSquareShaftGeometry(): THREE.BoxGeometry {
  const s = GEOM.squareShaftSide;
  const geo = new THREE.BoxGeometry(TOTAL_LENGTH + 8, s, s);
  geo.translate(TOTAL_LENGTH / 2, 0, 0);
  return geo;
}

export function rotateStadium(
  angle: number,
  out: { x: number; y: number }[] = [],
): { x: number; y: number }[] {
  const n = STADIUM.length / 2;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  if (out.length !== n) {
    out.length = 0;
    for (let i = 0; i < n; i++) out.push({ x: 0, y: 0 });
  }
  for (let i = 0; i < n; i++) {
    const px = STADIUM[i * 2]!;
    const py = STADIUM[i * 2 + 1]!;
    const p = out[i]!;
    p.x = px * c - py * s;
    p.y = px * s + py * c;
  }
  return out;
}
