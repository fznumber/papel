import { lazy, Suspense, useEffect } from "react";
import {
  Box,
  Download,
  Gauge,
  Layers,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { ArchitecturePanel } from "@/components/panels/ArchitecturePanel";
import { BomPanel } from "@/components/panels/BomPanel";
import { DfamPanel } from "@/components/panels/DfamPanel";
import { LoadsPanel } from "@/components/panels/LoadsPanel";
import { MotorPanel } from "@/components/panels/MotorPanel";
import { PlanosPanel } from "@/components/panels/PlanosPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PART_COLOR, PART_LEGEND } from "@/lib/bom";
import { SPEC, SPLIT_RATIO, cadBundle, computeDrive } from "@/lib/design";
import { KNEAD_PEAK, computeGearLoads } from "@/lib/gear-loads";
import { fmtNm, fmtRpm } from "@/lib/utils";
import { useStudio, type StudioTab } from "@/store/studio";

const DriveCanvas = lazy(() => import("@/components/viewport/DriveCanvas"));

function downloadCad() {
  const blob = new Blob([JSON.stringify(cadBundle(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "twinlock-253.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function AppShell() {
  const tab = useStudio((s) => s.tab);
  const setTab = useStudio((s) => s.setTab);
  const selectedId = useStudio((s) => s.selectedId);
  const setSelectedId = useStudio((s) => s.setSelectedId);
  const playing = useStudio((s) => s.playing);
  const togglePlaying = useStudio((s) => s.togglePlaying);
  const setPlaying = useStudio((s) => s.setPlaying);
  const explode = useStudio((s) => s.explode);
  const setExplode = useStudio((s) => s.setExplode);
  const housingOpacity = useStudio((s) => s.housingOpacity);
  const setHousingOpacity = useStudio((s) => s.setHousingOpacity);
  const showScrews = useStudio((s) => s.showScrews);
  const setShowScrews = useStudio((s) => s.setShowScrews);
  const showDimensions = useStudio((s) => s.showDimensions);
  const setShowDimensions = useStudio((s) => s.setShowDimensions);
  const motorId = useStudio((s) => s.motorId);
  const preId = useStudio((s) => s.preId);
  const loadPct = useStudio((s) => s.loadPct);
  const cmpSteel = useStudio((s) => s.cmpSteel);
  const knead = useStudio((s) => s.knead);
  const screwRpm = useStudio((s) => s.screwRpm);
  const setScrewRpm = useStudio((s) => s.setScrewRpm);
  const drive = computeDrive(motorId, preId);
  const loads =
    tab === "cargas"
      ? computeGearLoads(motorId, preId, loadPct / 100, {
          cmpPinionMat: cmpSteel ? "steel" : "petg",
          dutyPeak: knead ? KNEAD_PEAK : 1,
        })
      : null;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) setPlaying(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        togglePlaying();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPlaying, togglePlaying]);

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground lg:h-dvh lg:overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 lg:px-6">
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
            TSE · fibrilación de celulosa
          </p>
          <h1 className="text-lg font-medium tracking-tight lg:text-xl">TwinLock 253</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">CD 25.3 mm</Badge>
          <Badge variant="ok">Co-rotante</Badge>
          <Badge variant="primary">Fase 90°</Badge>
          <Button variant="outline" size="sm" onClick={downloadCad} className="hidden sm:inline-flex">
            <Download />
            CAD JSON
          </Button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)]">
        <section className="flex min-h-0 flex-col">
          <div className="relative h-[min(48dvh,460px)] w-full lg:h-auto lg:min-h-0 lg:flex-1">
            <Suspense
              fallback={
                <div className="flex h-full min-h-[320px] items-center justify-center text-sm text-muted-foreground">
                  Cargando modelo…
                </div>
              }
            >
              <DriveCanvas />
            </Suspense>
            <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-2">
              <span className="pointer-events-none rounded-md bg-background/80 px-2 py-1 font-mono text-[11px] tabular-nums text-muted-foreground">
                {fmtRpm(screwRpm)} · {fmtNm(drive.torqueRated)}
              </span>
              {loads ? (
                <span
                  className={`pointer-events-none rounded-md bg-background/80 px-2 py-1 font-mono text-[11px] tabular-nums ${
                    loads.critical.sf < 1 ? "text-destructive" : "text-ok"
                  }`}
                >
                  SF {loads.critical.sf.toFixed(2)}
                  {knead ? ` · pico ×${KNEAD_PEAK}` : ""}
                </span>
              ) : null}
            </div>
            <div className="absolute right-3 bottom-3 left-3 flex flex-wrap gap-1.5">
              {PART_LEGEND.map((item) => {
                const target =
                  item.id === "compound-pinion"
                    ? "compound"
                    : item.id === "motor-nema"
                      ? motorId === "dc775_12"
                        ? "motor-775"
                        : "motor-nema"
                      : item.id;
                const active = selectedId === target || selectedId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(active ? null : target)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] tracking-wide transition-all ${
                      active
                        ? "bg-foreground text-background font-medium shadow-lg scale-105"
                        : "bg-background/85 text-muted-foreground hover:bg-background/95"
                    }`}
                    style={active ? { boxShadow: `0 0 0 2px ${PART_COLOR[item.id]}` } : { boxShadow: "var(--shadow-border)" }}
                  >
                    <span
                      className={`size-2 shrink-0 rounded-full ${active ? "animate-pulse" : ""}`}
                      style={{ background: PART_COLOR[item.id] }}
                    />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border px-4 py-2">
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={togglePlaying}
              aria-label={playing ? "Pausar" : "Reproducir"}
            >
              {playing ? <Pause /> : <Play />}
            </Button>
            <label className="flex min-w-[140px] flex-1 items-center gap-3 text-[11px] text-muted-foreground">
              <RotateCcw className="size-3.5 shrink-0" />
              Explosión
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[explode]}
                onValueChange={(v) => setExplode(v[0] ?? 0)}
              />
            </label>
            <label className="hidden min-w-[120px] flex-1 items-center gap-3 text-[11px] text-muted-foreground sm:flex">
              <Box className="size-3.5 shrink-0" />
              Caja
              <Slider
                min={0}
                max={0.85}
                step={0.01}
                value={[housingOpacity]}
                onValueChange={(v) => setHousingOpacity(v[0] ?? 0.22)}
              />
            </label>
            <label className="flex min-w-[160px] flex-1 items-center gap-3 text-[11px] text-muted-foreground">
              <Gauge className="size-3.5 shrink-0" />
              RPM
              <Slider
                min={10}
                max={300}
                step={5}
                value={[screwRpm]}
                onValueChange={(v) => setScrewRpm(v[0] ?? 80)}
              />
              <span className="w-10 text-right tabular-nums">{screwRpm}</span>
            </label>
            <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Switch checked={showScrews} onCheckedChange={setShowScrews} />
              Tornillos
            </label>
            <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Switch checked={showDimensions} onCheckedChange={setShowDimensions} />
              Cotas
            </label>
          </div>
        </section>

        <aside className="flex min-h-0 flex-col border-t border-border lg:border-t-0 lg:border-l">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as StudioTab)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="px-3 pt-3">
              <TabsList className="w-full" aria-label="Secciones del diseño">
                <TabsTrigger value="arquitectura">Arq.</TabsTrigger>
                <TabsTrigger value="cargas">Cargas</TabsTrigger>
                <TabsTrigger value="bom">BOM</TabsTrigger>
                <TabsTrigger value="planos">Planos</TabsTrigger>
                <TabsTrigger value="dfam">DFAM</TabsTrigger>
                <TabsTrigger value="motor">Motor</TabsTrigger>
              </TabsList>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 lg:max-h-none">
              <TabsContent value="arquitectura">
                <ArchitecturePanel />
              </TabsContent>
              <TabsContent value="cargas">
                <LoadsPanel />
              </TabsContent>
              <TabsContent value="bom">
                <BomPanel />
              </TabsContent>
              <TabsContent value="planos">
                <PlanosPanel />
              </TabsContent>
              <TabsContent value="dfam">
                <DfamPanel />
              </TabsContent>
              <TabsContent value="motor">
                <MotorPanel />
              </TabsContent>
            </div>
          </Tabs>
          <footer className="flex items-center gap-2 border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
            <Layers className="size-3.5" />
            {SPEC.name}
            <span className="ml-auto inline-flex items-center gap-1">
              <Gauge className="size-3.5" />
              split {SPLIT_RATIO.toFixed(0)}:1
            </span>
          </footer>
        </aside>
      </div>
    </div>
  );
}
