import {
  GEOM,
  TOTAL_LENGTH,
  barrelRadius,
  rRoot,
  phaseAt,
} from "./params";
import { pointInStadium } from "./geometry";
import { runtime } from "./runtime";

export type Particle = {
  x: number;
  screw: 0 | 1;
  theta: number;
  r: number;
  age: number;
};

const COUNT = 180;
const particles: Particle[] = [];
const dummy = { inited: false };

function spawn(p: Particle, atFeed: boolean) {
  p.screw = Math.random() < 0.5 ? 0 : 1;
  p.x = atFeed ? Math.random() * 6 : Math.random() * TOTAL_LENGTH;
  p.age = atFeed ? 0 : Math.random() * 12;
  for (let n = 0; n < 24; n++) {
    const theta = Math.random() * Math.PI * 2;
    const r = rRoot + 0.4 + Math.random() * (barrelRadius - rRoot - 0.7);
    const px = r * Math.cos(theta);
    const py = r * Math.sin(theta);
    if (!pointInStadium(px, py, 0.15)) {
      p.theta = theta;
      p.r = r;
      return;
    }
  }
  p.theta = Math.PI / 2 + (Math.random() - 0.5) * 0.4;
  p.r = (rRoot + barrelRadius) * 0.5;
}

export function initFlow() {
  if (dummy.inited) return particles;
  dummy.inited = true;
  for (let i = 0; i < COUNT; i++) {
    const p: Particle = { x: 0, screw: 0, theta: 0, r: 8, age: 0 };
    spawn(p, false);
    particles.push(p);
  }
  runtime.particleCount = COUNT;
  return particles;
}

export function getParticles() {
  if (!dummy.inited) initFlow();
  return particles;
}

function axialSpeed(x: number, rpm: number): number {
  const p = phaseAt(x);
  const rev = rpm / 60;
  if (p.type === "convey") {
    const pitch = p.pitch ?? p.length;
    if (p.hand === "L") return rev * pitch * -0.35;
    return rev * pitch * 0.82;
  }
  if (p.hand === "F") return rev * 9;
  if (p.hand === "N") return rev * 3.5;
  return rev * -2.5;
}

export function tickFlow(dt: number, rpm: number, angle: number) {
  if (!dummy.inited) initFlow();
  const omega = (rpm / 60) * Math.PI * 2;
  const dAngle = omega * dt;
  let ageSum = 0;
  let fwd = 0;

  for (const p of particles) {
    const phase = phaseAt(p.x);
    const drag = phase.type === "knead" ? 0.35 : 0.72;
    p.theta += dAngle * drag;
    if (phase.type === "knead") {
      p.theta += (Math.random() - 0.5) * 1.8 * dt;
      p.r += (Math.random() - 0.5) * 4 * dt;
    }

    const vz = axialSpeed(p.x, rpm);
    p.x += vz * dt;
    fwd += Math.max(0, vz);
    p.age += dt;

    if (p.x > TOTAL_LENGTH) {
      spawn(p, true);
      continue;
    }
    if (p.x < 0) {
      p.x = 0.2;
    }

    const extra = p.screw === 1 ? Math.PI / 2 : 0;
    const a = angle + extra;
    const wx = p.r * Math.cos(p.theta);
    const wy = p.r * Math.sin(p.theta);
    const c = Math.cos(-a);
    const s = Math.sin(-a);
    const lx = wx * c - wy * s;
    const ly = wx * s + wy * c;
    if (pointInStadium(lx, ly, 0.05)) {
      p.r = Math.min(barrelRadius - 0.35, p.r + 0.55);
    }
    if (p.r > barrelRadius - 0.25) p.r = barrelRadius - 0.25;
    if (p.r < rRoot + 0.3) p.r = rRoot + 0.3;

    if (phase.type === "knead" && Math.random() < 0.015) {
      p.screw = p.screw === 0 ? 1 : 0;
    }

    ageSum += p.age;
  }

  runtime.meanResidence = ageSum / particles.length;
  runtime.throughput = (fwd / particles.length) * 60;
}

export function particleWorld(p: Particle, out: { x: number; y: number; z: number }) {
  const center = p.screw === 0 ? -GEOM.centerDistance / 2 : GEOM.centerDistance / 2;
  const sx = p.r * Math.cos(p.theta);
  const sy = p.r * Math.sin(p.theta);
  out.x = p.x;
  out.y = sy;
  out.z = -(sx + center);
}
