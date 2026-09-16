import { ContactShadows, Grid, Html, Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  ANGLES,
  BEARINGS,
  GEARS,
  POS,
  SCREW,
  SPEC,
  Z,
  computeDrive,
  meshAngle,
} from "@/lib/design";
import { computeGearLoads, KNEAD_PEAK, type GearLoadResult } from "@/lib/gear-loads";
import { PART_COLOR } from "@/lib/bom";
import { createBilobeScrewGeometry, getGearGeometry, clearGearCache } from "@/lib/gear-geometry";
import { cn } from "@/lib/utils";
import { useStudio } from "@/store/studio";

const HIGHLIGHT = "#f2efe6";

function dimHex(base: string) {
  const c = new THREE.Color(base);
  c.lerp(new THREE.Color("#14161a"), 0.58);
  return `#${c.getHexString()}`;
}

function useSelect(id: string) {
  const selectedId = useStudio((s) => s.selectedId);
  const setSelectedId = useStudio((s) => s.setSelectedId);
  const selected = selectedId === id;
  const dim = selectedId !== null && !selected;
  return {
    selected,
    bind: {
      onClick: (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setSelectedId(selected ? null : id);
      },
    },
    color: (base: string) => (selected ? HIGHLIGHT : dim ? dimHex(base) : base),
  };
}

function tint(base: string, heat = 0) {
  const h = Number.isFinite(heat) ? Math.max(0, Math.min(1, heat)) : 0;
  if (h <= 0.02) return base;
  const c = new THREE.Color(base);
  c.lerp(new THREE.Color("#b07070"), h);
  if (!Number.isFinite(c.r) || !Number.isFinite(c.g) || !Number.isFinite(c.b)) return base;
  return `#${c.getHexString()}`;
}

function GearMesh({
  teeth,
  module,
  face,
  color,
  metalness = 0.12,
  roughness = 0.5,
  id,
  heat = 0,
  squareBore,
  circularBore,
}: {
  teeth: number;
  module: number;
  face: number;
  color: string;
  metalness?: number;
  roughness?: number;
  id: string;
  heat?: number;
  squareBore?: number;
  circularBore?: number;
}) {
  const geo = useMemo(
    () => getGearGeometry(teeth, module, face, squareBore, circularBore),
    [teeth, module, face, squareBore, circularBore],
  );
  const sel = useSelect(id);
  return (
    <mesh geometry={geo} castShadow receiveShadow {...sel.bind}>
      <meshStandardMaterial
        color={sel.color(tint(color, heat))}
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  );
}

function Bearing({
  inner,
  outer,
  width,
  color,
}: {
  inner: number;
  outer: number;
  width: number;
  color: string;
}) {
  const sel = useSelect("radial-6001");
  return (
    <group {...sel.bind}>
      <mesh>
        <cylinderGeometry args={[outer / 2, outer / 2, width, 24]} />
        <meshStandardMaterial color={sel.color(color)} metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[inner / 2 + 0.4, inner / 2 + 0.4, width + 0.2, 20]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  );
}

function ThrustBearing() {
  const t = BEARINGS.thrust;
  const sel = useSelect("thrust-51102");
  const c = sel.color(PART_COLOR["thrust-51102"]!);
  return (
    <group rotation={[Math.PI / 2, 0, 0]} {...sel.bind}>
      <mesh position={[0, -t.T / 2 + 1, 0]}>
        <cylinderGeometry args={[t.D / 2, t.D / 2, 1.4, 28]} />
        <meshStandardMaterial color={c} metalness={0.7} roughness={0.22} />
      </mesh>
      <mesh position={[0, t.T / 2 - 1, 0]}>
        <cylinderGeometry args={[t.D / 2, t.D / 2, 1.4, 28]} />
        <meshStandardMaterial color={c} metalness={0.7} roughness={0.22} />
      </mesh>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const r = (t.d + t.D) / 4;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0, Math.sin(a) * r]}>
            <sphereGeometry args={[1.15, 10, 8]} />
            <meshStandardMaterial color="#e4d5c4" metalness={0.9} roughness={0.12} />
          </mesh>
        );
      })}
    </group>
  );
}

function AdapterShaft() {
  const sel = useSelect("adapter");
  const c = sel.color(PART_COLOR.adapter!);
  return (
    <group {...sel.bind}>
      <mesh position={[0, 0, -25]}>
        <boxGeometry args={[SPEC.shaftSquare, SPEC.shaftSquare, 190]} />
        <meshStandardMaterial color={c} metalness={0.55} roughness={0.32} />
      </mesh>
    </group>
  );
}

function DriveTrain() {
  const explode = useStudio((s) => s.explode);
  const showScrews = useStudio((s) => s.showScrews);
  const showForces = useStudio((s) => s.showForces);
  const showDimensions = useStudio((s) => s.showDimensions);
  const playing = useStudio((s) => s.playing);
  const motorId = useStudio((s) => s.motorId);
  const preId = useStudio((s) => s.preId);
  const loadPct = useStudio((s) => s.loadPct);
  const cmpSteel = useStudio((s) => s.cmpSteel);
  const knead = useStudio((s) => s.knead);
  const screwRpm = useStudio((s) => s.screwRpm);
  const setSelectedId = useStudio((s) => s.setSelectedId);

  const drive = computeDrive(motorId, preId);
  const loads = useMemo(
    () =>
      computeGearLoads(motorId, preId, loadPct / 100, {
        cmpPinionMat: cmpSteel ? "steel" : "petg",
        dutyPeak: knead ? KNEAD_PEAK : 1,
      }),
    [motorId, preId, loadPct, cmpSteel, knead],
  );
  const inputRef = useRef<THREE.Group>(null);
  const cmpLRef = useRef<THREE.Group>(null);
  const cmpRRef = useRef<THREE.Group>(null);
  const outLRef = useRef<THREE.Group>(null);
  const outRRef = useRef<THREE.Group>(null);
  const angle = useRef(0);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    if (playing) {
      const omegaOut = (screwRpm / 60) * Math.PI * 2;
      angle.current += omegaOut * 6 * d;
    }
    const a = angle.current;
    if (inputRef.current) inputRef.current.rotation.z = a;
    if (cmpLRef.current) {
      cmpLRef.current.rotation.z = meshAngle(a, GEARS.input.z, GEARS.crown.z, ANGLES.inToCmpL);
    }
    if (cmpRRef.current) {
      cmpRRef.current.rotation.z = meshAngle(a, GEARS.input.z, GEARS.crown.z, ANGLES.inToCmpR);
    }
    if (outLRef.current && cmpLRef.current) {
      outLRef.current.rotation.z = meshAngle(
        cmpLRef.current.rotation.z,
        GEARS.cmpPinion.z,
        GEARS.output.z,
        ANGLES.cmpLToOutL,
      );
    }
    if (outRRef.current && cmpRRef.current) {
      outRRef.current.rotation.z =
        meshAngle(
          cmpRRef.current.rotation.z,
          GEARS.cmpPinion.z,
          GEARS.output.z,
          ANGLES.cmpRToOutR,
        ) +
        Math.PI / 2;
    }
  });

  const e = explode;
  const screwGeo = useMemo(
    () =>
      createBilobeScrewGeometry({
        length: SCREW.length,
        doOuter: SCREW.doOuter,
        diInner: SCREW.diInner,
        pitch: SCREW.pitch,
      }),
    [],
  );

  const plateSel = useSelect("thrust-plate");
  const motorSel = useSelect(motorId === "dc775_12" ? "motor-775" : "motor-nema");
  const screwSel = useSelect("square-rod");
  const couplingSel = useSelect("coupling");

  return (
    <group
      position={[0, 8, -Z.distribution / 2]}
      onClick={() => setSelectedId(null)}
    >
      {/* Thrust plate */}
      <mesh position={[0, 0, Z.thrustPlate - e * 18]} {...plateSel.bind}>
        <boxGeometry args={[72, 48, 3]} />
        <meshStandardMaterial
          color={plateSel.color(PART_COLOR["thrust-plate"]!)}
          metalness={0.9}
          roughness={0.22}
        />
      </mesh>

      {/* Output L path */}
      <group position={[POS.outL.x, POS.outL.y, 0]}>
        <group position={[0, 0, Z.thrustBearing]}>
          <ThrustBearing />
        </group>
        <group position={[0, 0, Z.frontRadial]} rotation={[Math.PI / 2, 0, 0]}>
          <Bearing
            inner={BEARINGS.radial.d}
            outer={BEARINGS.radial.D}
            width={BEARINGS.radial.B}
            color={PART_COLOR["radial-6001"]!}
          />
        </group>
        <group ref={outLRef}>
          <group position={[0, 0, Z.outputGearL]}>
            <GearMesh
              id="gear-out-steel"
              teeth={GEARS.output.z}
              module={GEARS.output.m}
              face={GEARS.output.face}
              color={PART_COLOR["gear-out-steel"]!}
              metalness={0.55}
              roughness={0.32}
              heat={showForces ? loads.heat["gear-out-L"] : 0}
              squareBore={SPEC.shaftSquare}
            />
          </group>
          <AdapterShaft />
          {showScrews ? (
            <mesh
              geometry={screwGeo}
              position={[0, 0, Z.thrustPlate - SCREW.length - e * 36]}
              {...screwSel.bind}
            >
              <meshStandardMaterial
                color={screwSel.color(PART_COLOR["square-rod"]!)}
                metalness={0.35}
                roughness={0.42}
              />
            </mesh>
          ) : null}
        </group>
      </group>

      {/* Output R path — 90° phase baked into kinematics */}
      <group position={[POS.outR.x, POS.outR.y, 0]}>
        <group position={[0, 0, Z.thrustBearing]}>
          <ThrustBearing />
        </group>
        <group position={[0, 0, Z.frontRadial]} rotation={[Math.PI / 2, 0, 0]}>
          <Bearing
            inner={BEARINGS.radial.d}
            outer={BEARINGS.radial.D}
            width={BEARINGS.radial.B}
            color={PART_COLOR["radial-6001"]!}
          />
        </group>
        <group ref={outRRef}>
          <group position={[0, 0, Z.outputGearR]}>
            <GearMesh
              id="gear-out-steel"
              teeth={GEARS.output.z}
              module={GEARS.output.m}
              face={GEARS.output.face}
              color={PART_COLOR["gear-out-steel"]!}
              metalness={0.5}
              roughness={0.34}
              heat={showForces ? loads.heat["gear-out-R"] : 0}
              squareBore={SPEC.shaftSquare}
            />
          </group>
          <AdapterShaft />
          {showScrews ? (
            <mesh
              geometry={screwGeo}
              position={[0, 0, Z.thrustPlate - SCREW.length - e * 36]}
              {...screwSel.bind}
            >
              <meshStandardMaterial
                color={screwSel.color(PART_COLOR["square-rod"]!)}
                metalness={0.32}
                roughness={0.45}
              />
            </mesh>
          ) : null}
        </group>
      </group>

      {/* Compound L */}
      <group
        ref={cmpLRef}
        position={[POS.cmpL.x - e * 22, POS.cmpL.y, Z.distribution]}
      >
        <GearMesh
          id="compound"
          teeth={GEARS.crown.z}
          module={GEARS.crown.m}
          face={GEARS.crown.face}
          color={PART_COLOR["compound-crown"]!}
          heat={showForces ? loads.heat["compound-L"] : 0}
          squareBore={SPEC.shaftSquare}
        />
        <group position={[0, 0, Z.outputGearL - Z.distribution]}>
          <GearMesh
            id="compound"
            teeth={GEARS.cmpPinion.z}
            module={GEARS.cmpPinion.m}
            face={GEARS.cmpPinion.face}
            color={PART_COLOR["compound-pinion"]!}
            metalness={cmpSteel ? 0.7 : 0.18}
            roughness={cmpSteel ? 0.28 : 0.48}
            heat={showForces ? loads.heat["compound-L"] : 0}
            squareBore={SPEC.shaftSquare}
          />
        </group>
        <mesh {...couplingSel.bind}>
          <boxGeometry args={[SPEC.shaftSquare, SPEC.shaftSquare, 70]} />
          <meshStandardMaterial
            color={couplingSel.color(PART_COLOR.coupling!)}
            metalness={0.55}
            roughness={0.35}
          />
        </mesh>
      </group>

      {/* Compound R */}
      <group
        ref={cmpRRef}
        position={[POS.cmpR.x + e * 22, POS.cmpR.y, Z.distribution]}
      >
        <GearMesh
          id="compound"
          teeth={GEARS.crown.z}
          module={GEARS.crown.m}
          face={GEARS.crown.face}
          color={PART_COLOR["compound-crown"]!}
          heat={showForces ? loads.heat["compound-R"] : 0}
          squareBore={SPEC.shaftSquare}
        />
        <group position={[0, 0, Z.outputGearR - Z.distribution]}>
          <GearMesh
            id="compound"
            teeth={GEARS.cmpPinion.z}
            module={GEARS.cmpPinion.m}
            face={GEARS.cmpPinion.face}
            color={PART_COLOR["compound-pinion"]!}
            metalness={cmpSteel ? 0.7 : 0.18}
            roughness={cmpSteel ? 0.28 : 0.48}
            heat={showForces ? loads.heat["compound-R"] : 0}
            squareBore={SPEC.shaftSquare}
          />
        </group>
        <mesh {...couplingSel.bind}>
          <boxGeometry args={[SPEC.shaftSquare, SPEC.shaftSquare, 70]} />
          <meshStandardMaterial
            color={couplingSel.color(PART_COLOR.coupling!)}
            metalness={0.55}
            roughness={0.35}
          />
        </mesh>
      </group>

      {/* Input pinion */}
      <group
        ref={inputRef}
        position={[POS.input.x, POS.input.y + e * 16, Z.distribution]}
      >
        <GearMesh
          id="gear-input"
          teeth={GEARS.input.z}
          module={GEARS.input.m}
          face={GEARS.input.face}
          color={PART_COLOR["gear-input"]!}
          metalness={0.35}
          roughness={0.4}
          heat={showForces ? loads.heat["gear-input"] : 0}
          squareBore={SPEC.shaftSquare}
        />
        <mesh position={[0, 0, 28]} {...couplingSel.bind}>
          <boxGeometry args={[SPEC.shaftSquare, SPEC.shaftSquare, 56]} />
          <meshStandardMaterial
            color={couplingSel.color(PART_COLOR.coupling!)}
            metalness={0.55}
            roughness={0.35}
          />
        </mesh>
      </group>

      {/* Motor */}
      <group position={[POS.input.x, POS.input.y, Z.motor + e * 40]} {...motorSel.bind}>
        {motorId === "dc775_12" ? (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[21, 21, 66, 28]} />
            <meshStandardMaterial
              color={motorSel.color(PART_COLOR["motor-775"]!)}
              metalness={0.35}
              roughness={0.45}
            />
          </mesh>
        ) : (
          <mesh>
            <boxGeometry args={[56.4, 56.4, 56]} />
            <meshStandardMaterial
              color={motorSel.color(PART_COLOR["motor-nema"]!)}
              metalness={0.28}
              roughness={0.5}
            />
          </mesh>
        )}
        {/* Eje del motor (cilíndrico) */}
        <mesh position={[0, 0, -36]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[4, 4, 18, 16]} />
          <meshStandardMaterial
            color={couplingSel.color(PART_COLOR.coupling!)}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        {/* Acople motor → eje cuadrado */}
        <mesh position={[0, 0, -45]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial
            color={couplingSel.color(PART_COLOR.coupling!)}
            metalness={0.55}
            roughness={0.35}
          />
        </mesh>
      </group>

      {showDimensions && !showForces ? <CdDimension explode={e} /> : null}
      {showForces ? <ForceArrows /> : null}
      {showForces ? <MeshForceArrows loads={loads} pulse={knead} /> : null}
    </group>
  );
}

function CdDimension({ explode }: { explode: number }) {
  const y = -38 - explode * 8;
  const z = Z.outputGearL;
  return (
    <group>
      <Line
        points={[
          [POS.outL.x, y, z],
          [POS.outR.x, y, z],
        ]}
        color="#c9d1d8"
        lineWidth={1.2}
      />
      <Line
        points={[
          [POS.outL.x, y - 4, z],
          [POS.outL.x, y + 4, z],
        ]}
        color="#c9d1d8"
        lineWidth={1}
      />
      <Line
        points={[
          [POS.outR.x, y - 4, z],
          [POS.outR.x, y + 4, z],
        ]}
        color="#c9d1d8"
        lineWidth={1}
      />
      <Html position={[0, y - 8, z]} center distanceFactor={180} style={{ pointerEvents: "none" }}>
        <div className="rounded-md bg-background/80 px-2 py-0.5 font-mono text-[11px] tracking-wide text-primary whitespace-nowrap">
          CD 25.3 mm
        </div>
      </Html>
    </group>
  );
}

function PulseSphere({ color, pulse }: { color: string; pulse: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const k = pulse ? 1 + 0.32 * (0.5 + 0.5 * Math.sin(clock.elapsedTime * 5.5)) : 1;
    ref.current.scale.setScalar(k);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.8, 12, 10]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
    </mesh>
  );
}

function MeshForceArrows({ loads, pulse }: { loads: GearLoadResult; pulse: boolean }) {
  if (loads.loadFactor < 0.02) return null;
  const yAxis = new THREE.Vector3(0, 1, 0);
  return (
    <group>
      {loads.meshes.map((m) => {
        const len = 8 + Math.min(22, m.Ft / 28);
        const color = m.sf < 1 ? "#b07070" : "#c9d1d8";
        const dir = new THREE.Vector3(m.tx, m.ty, 0);
        if (dir.lengthSq() < 1e-6) return null;
        dir.normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(yAxis, dir);
        return (
          <group key={m.id} position={[m.x, m.y, m.z]}>
            <group quaternion={quat}>
              <mesh position={[0, len / 2, 0]}>
                <cylinderGeometry args={[0.7, 0.7, len, 8]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
              </mesh>
              <mesh position={[0, len + 3, 0]}>
                <coneGeometry args={[2.1, 6, 10]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
              </mesh>
            </group>
            <PulseSphere color={color} pulse={pulse} />
            {m.id === "dist-L" || m.id === "out-L" ? (
              <Html position={[m.tx * 10, 14, 6]} center distanceFactor={200} style={{ pointerEvents: "none" }}>
                <div className="rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-foreground whitespace-nowrap">
                  {Math.round(m.Ft)} N
                </div>
              </Html>
            ) : null}
          </group>
        );
      })}
    </group>
  );
}

function ForceArrows() {
  const shaftZ = Z.frontRadial;
  return (
    <group>
      {([-1, 1] as const).map((side) => {
        const x = side * SPEC.centerDistance / 2;
        return (
          <group key={side} position={[x, 0, 0]}>
            {/* Axial thrust toward gearbox (+Z) */}
            <mesh position={[0, 0, -28]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[3.2, 14, 10]} />
              <meshStandardMaterial color="#b07070" />
            </mesh>
            <mesh position={[0, 0, -42]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[1.1, 1.1, 16, 8]} />
              <meshStandardMaterial color="#b07070" />
            </mesh>
            {/* Radial separation */}
            <mesh position={[side * 22, 0, shaftZ]} rotation={[0, 0, side === 1 ? -Math.PI / 2 : Math.PI / 2]}>
              <coneGeometry args={[2.6, 12, 10]} />
              <meshStandardMaterial color="#7d8b96" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <hemisphereLight args={["#e6e4de", "#1a1c20", 0.55]} />
      <directionalLight
        position={[90, 140, 80]}
        intensity={1.35}
        color="#f2efe8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-70, 40, -50]} intensity={0.35} color="#8aa0b4" />
    </>
  );
}

function Scene() {
  return (
    <>
      <SceneLights />
      <DriveTrain />
      <Grid
        args={[400, 400]}
        cellSize={10}
        sectionSize={50}
        cellColor="#1c1e22"
        sectionColor="#26282e"
        fadeDistance={420}
        fadeStrength={1.4}
        position={[0, -62, 0]}
      />
      <ContactShadows
        position={[0, -61.5, 0]}
        opacity={0.45}
        scale={280}
        blur={2.4}
        far={90}
      />
      <OrbitControls
        makeDefault
        minDistance={90}
        maxDistance={520}
        target={[0, 0, 0]}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

export default function DriveCanvas() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    clearGearCache();
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background text-sm text-muted-foreground">
        Cargando modelo…
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        className="h-full w-full touch-none"
        camera={{ position: [175, 105, 210], fov: 34, near: 2, far: 2000 }}
        dpr={[1, 1.75]}
        shadows="basic"
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#e5e5e5");
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export function ViewportFrame({ className }: { className?: string }) {
  return (
    <div className={cn("relative min-h-[280px] overflow-hidden bg-background", className)}>
      <DriveCanvas />
    </div>
  );
}
