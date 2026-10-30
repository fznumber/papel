import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { useOpenSCADWorker } from "@/hooks/useOpenSCADWorker";
import { generateModularScrewCode } from "@/openscad/components/Screw";

interface UseOpenSCADGeometryOptions {
  code: string;
  enabled?: boolean;
}

interface UseOpenSCADGeometryResult {
  geometry: THREE.BufferGeometry | null;
  loading: boolean;
  error: string | null;
}

// Cache for rendered geometries
const geometryCache = new Map<string, THREE.BufferGeometry>();

export function useOpenSCADGeometry({
  code,
  enabled = true,
}: UseOpenSCADGeometryOptions): UseOpenSCADGeometryResult {
  const { render } = useOpenSCADWorker();
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const renderIdRef = useRef(0);

  useEffect(() => {
    if (!enabled || !code) {
      setGeometry(null);
      return;
    }

    // Check cache first
    const cacheKey = code;
    if (geometryCache.has(cacheKey)) {
      console.log("[Geometry] Using cached geometry");
      setGeometry(geometryCache.get(cacheKey)!);
      return;
    }

    let cancelled = false;
    const currentRenderId = ++renderIdRef.current;

    async function renderGeometry() {
      setLoading(true);
      setError(null);

      try {
        console.log("[Geometry] Rendering OpenSCAD code...");
        const result = await render(code);

        if (cancelled || currentRenderId !== renderIdRef.current) {
          return;
        }

        if (result.error) {
          console.error("[Geometry] Render error:", result.error);
          setError(result.error);
          setGeometry(null);
        } else if (result.stl) {
          console.log("[Geometry] Parsing STL...");
          const loader = new STLLoader();
          const bufferGeometry = loader.parse(result.stl);
          bufferGeometry.computeVertexNormals();

          geometryCache.set(cacheKey, bufferGeometry);
          console.log("[Geometry] Geometry created successfully");
          setGeometry(bufferGeometry);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[Geometry] Error:", err);
          setError(String(err));
          setGeometry(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    renderGeometry();

    return () => {
      cancelled = true;
    };
  }, [code, enabled, render]);

  return { geometry, loading, error };
}

// Hook specifically for the modular screw
export function useScrewGeometry(part: string = "assembly") {
  const code = useMemo(() => generateModularScrewCode(part), [part]);

  return useOpenSCADGeometry({
    code,
    enabled: true,
  });
}
