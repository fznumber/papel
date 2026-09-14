import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Overlay } from "@/components/extruder/Overlay";

const ExtruderCanvas = lazy(() =>
  import("@/components/extruder/ExtruderCanvas").then((mod) => ({
    default: mod.ExtruderCanvas,
  })),
);

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative h-dvh overflow-hidden bg-background text-foreground">
      {mounted ? (
        <Suspense fallback={null}>
          <ExtruderCanvas />
        </Suspense>
      ) : (
        <div className="absolute inset-0 bg-background" aria-hidden="true" />
      )}
      <Overlay />
    </main>
  );
}
