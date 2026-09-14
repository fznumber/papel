import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { TOTAL_LENGTH } from "@/lib/screw/params";

export function ExtruderCanvas() {
  return (
    <Canvas
      className="absolute inset-0 touch-none"
      camera={{
        position: [-20, 165, 340],
        fov: 46,
        near: 0.4,
        far: 5000,
      }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, localClippingEnabled: true, alpha: false }}
      onCreated={({ camera, gl }) => {
        gl.setClearColor("#0c0d0f");
        camera.lookAt(TOTAL_LENGTH * 0.48, 0, 0);
      }}
    >
      <Scene />
    </Canvas>
  );
}
