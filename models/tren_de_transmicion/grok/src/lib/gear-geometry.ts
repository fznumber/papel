import * as THREE from "three";

function involuteT(radius: number, baseR: number) {
  const r = Math.max(radius, baseR + 1e-6);
  return Math.sqrt((r / baseR) ** 2 - 1);
}

function involutePoint(baseR: number, t: number) {
  return new THREE.Vector2(
    baseR * (Math.cos(t) + t * Math.sin(t)),
    baseR * (Math.sin(t) - t * Math.cos(t)),
  );
}

function rot2(p: THREE.Vector2, ang: number) {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return new THREE.Vector2(p.x * c - p.y * s, p.x * s + p.y * c);
}

export function buildGearShape(
  teeth: number,
  module: number,
  pressureAngle = 25,
  backlash = 0.18,
  squareBore?: number,
  circularBore?: number,
): THREE.Shape {
  const pitchR = (teeth * module) / 2;
  const outR = pitchR + module;
  const rootR = Math.max(pitchR - 1.25 * module, pitchR * 0.45);
  const baseR = pitchR * Math.cos((pressureAngle * Math.PI) / 180);
  const tOut = involuteT(outR, baseR);
  const tPitch = involuteT(Math.max(pitchR, baseR), baseR);
  const pitchPt = involutePoint(baseR, tPitch);
  const pitchAng = Math.atan2(pitchPt.y, pitchPt.x);
  const halfTooth = Math.PI / teeth / 2 - backlash / (2 * pitchR);
  const rotateToPitch = halfTooth + pitchAng;

  const pts: THREE.Vector2[] = [];
  const steps = 6;

  for (let i = 0; i < teeth; i++) {
    const center = (i / teeth) * Math.PI * 2;
    const leftInv: THREE.Vector2[] = [];
    const rightInv: THREE.Vector2[] = [];
    for (let s = 0; s <= steps; s++) {
      const t = (tOut * s) / steps;
      const p = involutePoint(baseR, Math.max(t, 0.02));
      leftInv.push(rot2(p, center - rotateToPitch));
      rightInv.push(rot2(new THREE.Vector2(p.x, -p.y), center + rotateToPitch));
    }

    pts.push(
      new THREE.Vector2(
        rootR * Math.cos(center - halfTooth * 1.15),
        rootR * Math.sin(center - halfTooth * 1.15),
      ),
    );
    for (const p of leftInv) pts.push(p);
    for (let s = rightInv.length - 1; s >= 0; s--) pts.push(rightInv[s]!);
    pts.push(
      new THREE.Vector2(
        rootR * Math.cos(center + halfTooth * 1.15),
        rootR * Math.sin(center + halfTooth * 1.15),
      ),
    );
  }

  const shape = new THREE.Shape();
  const first = pts[0]!;
  shape.moveTo(first.x, first.y);
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i]!;
    shape.lineTo(p.x, p.y);
  }
  shape.closePath();

  if (squareBore && squareBore > 0) {
    const half = squareBore / 2;
    const hole = new THREE.Path();
    hole.moveTo(-half, -half);
    hole.lineTo(half, -half);
    hole.lineTo(half, half);
    hole.lineTo(-half, half);
    hole.closePath();
    shape.holes.push(hole);
  } else {
    const bore = circularBore ? (circularBore / 2) : Math.max(3.2, pitchR * 0.28);
    const hole = new THREE.Path();
    hole.absarc(0, 0, bore, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  return shape;
}

const gearCache = new Map<string, THREE.ExtrudeGeometry>();

export function clearGearCache() {
  gearCache.clear();
}

export function getGearGeometry(
  teeth: number,
  module: number,
  thickness: number,
  squareBore?: number,
  circularBore?: number,
): THREE.ExtrudeGeometry {
  const key = `${teeth}:${module}:${thickness}:${squareBore || 0}:${circularBore || 0}`;
  const hit = gearCache.get(key);
  if (hit) return hit;
  const shape = buildGearShape(teeth, module, 20, 0.18, squareBore, circularBore);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.35,
    bevelSize: 0.28,
    bevelSegments: 1,
    curveSegments: 1,
  });
  geo.translate(0, 0, -thickness / 2);
  geo.computeVertexNormals();
  gearCache.set(key, geo);
  return geo;
}

export function createBilobeScrewGeometry(opts: {
  length: number;
  doOuter: number;
  diInner: number;
  pitch: number;
  radial?: number;
  tubular?: number;
}): THREE.BufferGeometry {
  const { length, doOuter, diInner, pitch } = opts;
  const radial = opts.radial ?? 48;
  const tubular = opts.tubular ?? 64;
  const r0 = (doOuter + diInner) / 4;
  const amp = (doOuter - diInner) / 4;
  const positions = new Float32Array((tubular + 1) * (radial + 1) * 3);
  const normals = new Float32Array(positions.length);

  for (let i = 0; i <= tubular; i++) {
    const z = (i / tubular) * length;
    const helix = (2 * Math.PI * z) / pitch;
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const r = r0 + amp * Math.cos(2 * a);
      const ang = a + helix;
      const idx = (i * (radial + 1) + j) * 3;
      positions[idx] = r * Math.cos(ang);
      positions[idx + 1] = r * Math.sin(ang);
      positions[idx + 2] = z;
    }
  }

  const indices: number[] = [];
  const cols = radial + 1;
  for (let i = 0; i < tubular; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * cols + j;
      const b = a + cols;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);

  const pos = geo.attributes.position!;
  const acc = Array.from({ length: pos.count }, () => new THREE.Vector3());
  const tmpA = new THREE.Vector3();
  const tmpB = new THREE.Vector3();
  const tmpC = new THREE.Vector3();
  for (let i = 0; i < indices.length; i += 3) {
    const ia = indices[i]!;
    const ib = indices[i + 1]!;
    const ic = indices[i + 2]!;
    tmpA.fromBufferAttribute(pos, ia);
    tmpB.fromBufferAttribute(pos, ib);
    tmpC.fromBufferAttribute(pos, ic);
    tmpB.sub(tmpA);
    tmpC.sub(tmpA);
    tmpB.cross(tmpC);
    acc[ia]!.add(tmpB);
    acc[ib]!.add(tmpB);
    acc[ic]!.add(tmpB);
  }
  for (let i = 0; i < pos.count; i++) {
    const n = acc[i]!.normalize();
    normals[i * 3] = n.x;
    normals[i * 3 + 1] = n.y;
    normals[i * 3 + 2] = n.z;
  }
  geo.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  return geo;
}
