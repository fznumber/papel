import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Grid, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  GEOM,
  PHASES,
  TOTAL_LENGTH,
  ZONE_META,
  barrelRadius,
  type PhaseDef,
} from "@/lib/screw/params";
import { getPhaseGeometries, makeSquareShaftGeometry } from "@/lib/screw/geometry";
import { getParticles, initFlow, particleWorld, tickFlow } from "@/lib/screw/flow";
import { runtime } from "@/lib/screw/runtime";
import { useSim } from "@/store/sim";

const L = TOTAL_LENGTH;
const CD = GEOM.centerDistance;

const clipPlanes = {
  long: new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
  axial: new THREE.Plane(new THREE.Vector3(-1, 0, 0), L * 0.55),
};

const _p = { x: 0, y: 0, z: 0 };
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3(1, 1, 1);
const _c = new THREE.Color();
const _pos = new THREE.Vector3();

export function Scene() {
  return (
    <>
      <color attach="background" args={["#0c0d0f"]} />
      <hemisphereLight args={["#c8cdd4", "#1a1814", 0.45]} />
      <ambientLight intensity={0.28} />
      <directionalLight position={[180, 220, 140]} intensity={1.35} />
      <directionalLight position={[-120, 40, -90]} intensity={0.28} />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        target={[L * 0.48, 0, 0]}
        minDistance={40}
        maxDistance={980}
        maxPolarAngle={Math.PI * 0.92}
      />
      <CameraRig />
      <ClipSync />
      <group position={[0, 0, 0]}>
        <TwinScrews />
        <Barrel />
        <FlowPoints />
        <Ruler />
      </group>
      <Grid
        position={[L * 0.5, -barrelRadius - 14, 0]}
        args={[40, 40]}
        cellSize={10}
        cellThickness={0.6}
        cellColor="#2a2c31"
        sectionSize={50}
        sectionThickness={1.1}
        sectionColor="#3a3d44"
        fadeDistance={720}
        fadeFrom={1}
        infiniteGrid
      />
      <ContactShadows
        position={[L * 0.5, -barrelRadius - 13.6, 0]}
        opacity={0.42}
        scale={700}
        blur={2.4}
        far={80}
      />
    </>
  );
}

function CameraRig() {
  const { camera, controls, size } = useThree();
  const preset = useSim((s) => s.cameraPreset);
  const tick = useSim((s) => s.cameraTick);

  useEffect(() => {
    const mobile = size.width < 720;
    const target = new THREE.Vector3(L * 0.42, 0, 0);
    const map: Record<string, THREE.Vector3> = mobile
      ? {
          iso: new THREE.Vector3(L * 0.22, 78, 165),
          die: new THREE.Vector3(L + 120, 28, 48),
          side: new THREE.Vector3(L * 0.42, 22, 155),
          top: new THREE.Vector3(L * 0.42, 200, 6),
          mesh: new THREE.Vector3(-120, 22, 36),
        }
      : {
          iso: new THREE.Vector3(-20, 165, 340),
          die: new THREE.Vector3(L + 190, 40, 70),
          side: new THREE.Vector3(L * 0.48, 30, 280),
          top: new THREE.Vector3(L * 0.48, 340, 8),
          mesh: new THREE.Vector3(-190, 30, 55),
        };
    const pos = map[preset] ?? map.iso!;
    camera.position.copy(pos);
    camera.lookAt(target);
    const oc = controls as unknown as { target: THREE.Vector3; update: () => void } | null;
    if (oc?.target) {
      oc.target.copy(target);
      oc.update();
    }
  }, [preset, tick, camera, controls, size.width]);

  return null;
}

function ClipSync() {
  const { gl } = useThree();
  const clipMode = useSim((s) => s.clipMode);
  const clipPos = useSim((s) => s.clipPos);

  useEffect(() => {
    gl.localClippingEnabled = clipMode !== "off";
  }, [gl, clipMode]);

  useEffect(() => {
    clipPlanes.axial.constant = L * clipPos;
  }, [clipPos]);

  return null;
}

function activePlanes(clipMode: string): THREE.Plane[] {
  if (clipMode === "long") return [clipPlanes.long];
  if (clipMode === "axial") return [clipPlanes.axial];
  return [];
}

function TwinScrews() {
  const geos = useMemo(() => getPhaseGeometries(), []);
  const shaftGeo = useMemo(() => makeSquareShaftGeometry(), []);
  const viewMode = useSim((s) => s.viewMode);
  const colorMode = useSim((s) => s.colorMode);
  const isolated = useSim((s) => s.isolatedPhase);
  const hovered = useSim((s) => s.hoveredPhase);
  const exploded = useSim((s) => s.exploded);
  const showShaft = useSim((s) => s.showShaft);
  const clipMode = useSim((s) => s.clipMode);
  const g0 = useRef<THREE.Group>(null);
  const g1 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    if (runtime.playing) {
      runtime.angle += (runtime.rpm / 60) * Math.PI * 2 * d;
    }
    const a = runtime.angle;
    if (g0.current) g0.current.rotation.x = a;
    if (g1.current) g1.current.rotation.x = a + Math.PI / 2;
  });

  const planes = activePlanes(clipMode);
  const pair = viewMode === "pair";

  return (
    <>
      <group ref={g0} position={[0, 0, pair ? CD / 2 : 0]}>
        {PHASES.map((p, i) => (
          <PhaseMesh
            key={p.id}
            phase={p}
            index={i}
            geo={geos[p.id]!}
            colorMode={colorMode}
            isolated={isolated}
            hovered={hovered}
            exploded={exploded}
            planes={planes}
          />
        ))}
        {showShaft ? (
          <mesh geometry={shaftGeo} dispose={null}>
            <meshStandardMaterial
              color="#1a1b1e"
              metalness={0.7}
              roughness={0.35}
              clippingPlanes={planes}
              clipShadows
            />
          </mesh>
        ) : null}
      </group>
      {pair ? (
        <group ref={g1} position={[0, 0, -CD / 2]}>
          {PHASES.map((p, i) => (
            <PhaseMesh
              key={`b-${p.id}`}
              phase={p}
              index={i}
              geo={geos[p.id]!}
              colorMode={colorMode}
              isolated={isolated}
              hovered={hovered}
              exploded={exploded}
              planes={planes}
            />
          ))}
          {showShaft ? (
            <mesh geometry={shaftGeo} dispose={null}>
              <meshStandardMaterial
                color="#1a1b1e"
                metalness={0.7}
                roughness={0.35}
                clippingPlanes={planes}
                clipShadows
              />
            </mesh>
          ) : null}
        </group>
      ) : null}
    </>
  );
}

function PhaseMesh({
  phase,
  index,
  geo,
  colorMode,
  isolated,
  hovered,
  exploded,
  planes,
}: {
  phase: PhaseDef;
  index: number;
  geo: THREE.BufferGeometry;
  colorMode: string;
  isolated: string | null;
  hovered: string | null;
  exploded: boolean;
  planes: THREE.Plane[];
}) {
  const toggle = useSim((s) => s.togglePhase);
  const setHovered = useSim((s) => s.setHovered);
  const dim = isolated !== null && isolated !== phase.id;
  const hot = hovered === phase.id || isolated === phase.id;

  let color = phase.color;
  if (colorMode === "zone") color = ZONE_META[phase.zone].color;
  if (colorMode === "metal") color = "#8d9299";

  const xOff = exploded ? index * 16 : 0;

  return (
    <mesh
      geometry={geo}
      dispose={null}
      position={[xOff, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        toggle(phase.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(phase.id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(null);
        document.body.style.cursor = "auto";
      }}
    >
      <meshStandardMaterial
        color={color}
        metalness={colorMode === "metal" ? 0.82 : 0.38}
        roughness={colorMode === "metal" ? 0.28 : 0.42}
        transparent={dim}
        opacity={dim ? 0.1 : 1}
        emissive={hot && !dim ? color : "#000000"}
        emissiveIntensity={hot && !dim ? 0.18 : 0}
        clippingPlanes={planes}
        depthWrite={!dim}
      />
    </mesh>
  );
}

function Barrel() {
  const show = useSim((s) => s.showBarrel);
  const viewMode = useSim((s) => s.viewMode);
  const clipMode = useSim((s) => s.clipMode);
  const planes = activePlanes(clipMode);
  if (!show) return null;
  const r = barrelRadius + 0.15;
  const pair = viewMode === "pair";
  return (
    <>
      <mesh position={[L / 2, 0, pair ? CD / 2 : 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[r, r, L, 64, 1, true]} />
        <meshStandardMaterial
          color="#9aa4b2"
          metalness={0.7}
          roughness={0.25}
          transparent
          opacity={0.14}
          side={THREE.DoubleSide}
          depthWrite={false}
          clippingPlanes={planes}
        />
      </mesh>
      {pair ? (
        <mesh position={[L / 2, 0, -CD / 2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[r, r, L, 64, 1, true]} />
          <meshStandardMaterial
            color="#9aa4b2"
            metalness={0.7}
            roughness={0.25}
            transparent
            opacity={0.14}
            side={THREE.DoubleSide}
            depthWrite={false}
            clippingPlanes={planes}
          />
        </mesh>
      ) : null}
    </>
  );
}

function FlowPoints() {
  const show = useSim((s) => s.showFlow);
  const clipMode = useSim((s) => s.clipMode);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const viewMode = useSim((s) => s.viewMode);

  useEffect(() => {
    initFlow();
  }, []);

  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      metalness: 0.05,
      roughness: 0.55,
      vertexColors: true,
      clippingPlanes: activePlanes(clipMode),
    });
    return m;
  }, [clipMode]);

  useEffect(() => {
    return () => {
      mat.dispose();
    };
  }, [mat]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh || !show) return;
    const d = Math.min(delta, 0.1);
    tickFlow(d, runtime.rpm, runtime.angle);
    const list = getParticles();
    const pair = viewMode === "pair";
    const n = Math.min(list.length, mesh.count);
    for (let i = 0; i < n; i++) {
      const p = list[i]!;
      if (!pair && p.screw === 1) {
        _s.set(0, 0, 0);
        _m.compose(_pos.set(0, -99, 0), _q, _s);
        mesh.setMatrixAt(i, _m);
        continue;
      }
      particleWorld(p, _p);
      _pos.set(_p.x, _p.y, _p.z);
      _s.set(1, 1, 1);
      _m.compose(_pos, _q, _s);
      mesh.setMatrixAt(i, _m);
      const t = Math.min(1, p.age / 14);
      _c.setRGB(0.85 - t * 0.2, 0.55 - t * 0.35, 0.28 + t * 0.05);
      mesh.setColorAt(i, _c);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  if (!show) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 180]} material={mat}>
      <sphereGeometry args={[0.85, 8, 8]} />
    </instancedMesh>
  );
}

function Ruler() {
  const marks = useMemo(() => {
    const m: number[] = [];
    for (let x = 0; x <= L + 0.1; x += 50) m.push(Math.min(x, L));
    return m;
  }, []);
  const y = -barrelRadius - 8;
  return (
    <group>
      <mesh position={[L / 2, y, CD / 2 + 18]}>
        <boxGeometry args={[L, 0.35, 0.35]} />
        <meshBasicMaterial color="#4b4e55" />
      </mesh>
      {marks.map((x) => (
        <mesh key={x} position={[x, y, CD / 2 + 18]}>
          <boxGeometry args={[0.35, 3.2, 0.35]} />
          <meshBasicMaterial color="#6a6e76" />
        </mesh>
      ))}
    </group>
  );
}
