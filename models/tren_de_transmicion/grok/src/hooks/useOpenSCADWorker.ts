import { useEffect, useRef, useCallback } from "react";

interface OpenSCADResult {
  stl: string | null;
  error: string | null;
  loading: boolean;
}

export function useOpenSCADWorker() {
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<
    Map<string, { resolve: (r: OpenSCADResult) => void }>
  >(new Map());

  useEffect(() => {
    console.log("[Hook] Creating OpenSCAD worker...");
    const worker = new Worker(
      new URL("../workers/openscad-worker.ts", import.meta.url),
      { type: "module" },
    );
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const { id, stl, error } = e.data;
      console.log(`[Hook] Worker response for ${id}:`, error ? "error" : "success");
      const pending = pendingRef.current.get(id);
      if (pending) {
        pending.resolve({ stl, error, loading: false });
        pendingRef.current.delete(id);
      }
    };

    worker.onerror = (e) => {
      console.error("[Hook] Worker error:", e);
    };

    return () => {
      console.log("[Hook] Terminating OpenSCAD worker");
      worker.terminate();
      pendingRef.current.clear();
    };
  }, []);

  const render = useCallback(
    (code: string): Promise<OpenSCADResult> => {
      return new Promise((resolve) => {
        if (!workerRef.current) {
          console.error("[Hook] Worker not initialized");
          resolve({ stl: null, error: "Worker not initialized", loading: false });
          return;
        }

        const id = crypto.randomUUID();
        pendingRef.current.set(id, { resolve });

        console.log(`[Hook] Sending render request ${id}`);
        workerRef.current.postMessage({ id, code });
      });
    },
    [],
  );

  return { render };
}
