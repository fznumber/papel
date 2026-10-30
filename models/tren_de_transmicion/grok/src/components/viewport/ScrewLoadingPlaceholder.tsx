import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ScrewLoadingPlaceholderProps {
  length: number;
  radius: number;
  color: string;
  metalness?: number;
  roughness?: number;
}

export function ScrewLoadingPlaceholder({
  length,
  radius,
  color,
  metalness = 0.35,
  roughness = 0.42,
}: ScrewLoadingPlaceholderProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 2;
    }
    if (materialRef.current) {
      materialRef.current.opacity = 0.3 + Math.sin(Date.now() * 0.005) * 0.2;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
      {/* Base cylinder */}
      <mesh>
        <cylinderGeometry args={[radius, radius, length, 16]} />
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          metalness={metalness}
          roughness={roughness}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>

      {/* Spinning ring */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[radius * 1.1, 0.5, 8, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Progress indicator lines */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, (i - 1.5) * (length / 4), 0]}>
          <boxGeometry args={[radius * 2.5, 1, 0.5]} />
          <meshStandardMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
