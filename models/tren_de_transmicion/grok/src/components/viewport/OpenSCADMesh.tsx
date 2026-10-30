import { useMemo, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

interface OpenSCADMeshProps {
  stl: string;
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function OpenSCADMesh({
  stl,
  color = "#888888",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: OpenSCADMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const loader = new STLLoader();
    const bufferGeometry = loader.parse(stl);
    bufferGeometry.computeVertexNormals();
    return bufferGeometry;
  }, [stl]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      rotation={rotation}
    >
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
