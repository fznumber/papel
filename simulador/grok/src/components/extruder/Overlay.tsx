import {
  Box,
  Layers,
  Pause,
  Play,
  Scan,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { SectionView } from "./SectionView";
import {
  MATERIAL,
  PHASES,
  TOTAL_LENGTH,
  ZONE_META,
  phaseAt,
  type PhaseDef,
} from "@/lib/screw/params";
import { runtime } from "@/lib/screw/runtime";
import { useSim, type CameraPreset, type ClipMode } from "@/store/sim";
import { cn } from "@/lib/utils";

export function Overlay() {
  const mobilePanel = useSim((s) => s.mobilePanel);
  const setMobilePanel = useSim((s) => s.setMobilePanel);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
      <TopBar onOpen={() => setMobilePanel(true)} />
      <div className="flex min-h-0 flex-1">
        <aside className="pointer-events-none hidden w-72 shrink-0 flex-col gap-3 p-3 pt-0 lg:flex">
          <div className="pointer-events-auto flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
            <PhasePanel />
            <SpecsCard />
          </div>
        </aside>
        <div className="min-w-0 flex-1" />
        <aside className="pointer-events-none hidden w-56 shrink-0 flex-col gap-3 p-3 pt-0 md:flex">
          <div className="pointer-events-auto">
            <SectionView />
          </div>
          <StatsCard />
        </aside>
      </div>
      <BottomBar />
      {mobilePanel ? (
        <div className="pointer-events-auto absolute inset-0 z-20 flex flex-col bg-background/92 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-medium">Controles</p>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Cerrar"
              onClick={() => setMobilePanel(false)}
            >
              <X />
            </Button>
          </div>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 pb-6">
            <CameraButtons always />
            <SectionView />
            <PhasePanel />
            <SpecsCard />
            <StatsCard />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TopBar({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="pointer-events-none flex items-start justify-between gap-3 p-3">
      <div className="panel pointer-events-auto max-w-full rounded-lg px-3.5 py-2.5">
        <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
          Co-rotante V2
        </p>
        <h1 className="text-lg leading-tight font-semibold tracking-tight">CoTwin</h1>
        <p className="text-xs text-muted">
          {MATERIAL.name} · Ø {MATERIAL.od} mm · eje {MATERIAL.shaft}
        </p>
      </div>
      <div className="pointer-events-auto flex items-center gap-2">
        <CameraButtons />
        <Button
          variant="secondary"
          size="icon"
          className="lg:hidden"
          aria-label="Abrir controles"
          onClick={onOpen}
        >
          <SlidersHorizontal />
        </Button>
      </div>
    </header>
  );
}

function CameraButtons({ always = false }: { always?: boolean }) {
  const preset = useSim((s) => s.cameraPreset);
  const setCamera = useSim((s) => s.setCamera);
  const items: { id: CameraPreset; label: string }[] = [
    { id: "iso", label: "Iso" },
    { id: "side", label: "Perfil" },
    { id: "die", label: "Dado" },
    { id: "mesh", label: "Engrane" },
    { id: "top", label: "Planta" },
  ];
  return (
    <div
      className={cn(
        "panel items-center gap-0.5 rounded-lg p-1",
        always ? "flex flex-wrap" : "hidden md:flex",
      )}
    >
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => setCamera(it.id)}
          className={cn(
            "h-8 rounded-sm px-2.5 text-xs font-medium transition-colors duration-150",
            preset === it.id
              ? "bg-primary text-primary-foreground"
              : "text-muted hover:bg-secondary hover:text-foreground",
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function BottomBar() {
  const playing = useSim((s) => s.playing);
  const setPlaying = useSim((s) => s.setPlaying);
  const rpm = useSim((s) => s.rpm);
  const setRpm = useSim((s) => s.setRpm);
  const viewMode = useSim((s) => s.viewMode);
  const setViewMode = useSim((s) => s.setViewMode);
  const colorMode = useSim((s) => s.colorMode);
  const setColorMode = useSim((s) => s.setColorMode);
  const showFlow = useSim((s) => s.showFlow);
  const setShowFlow = useSim((s) => s.setShowFlow);
  const showBarrel = useSim((s) => s.showBarrel);
  const setShowBarrel = useSim((s) => s.setShowBarrel);
  const exploded = useSim((s) => s.exploded);
  const setExploded = useSim((s) => s.setExploded);
  const clipMode = useSim((s) => s.clipMode);
  const setClipMode = useSim((s) => s.setClipMode);
  const clipPos = useSim((s) => s.clipPos);
  const setClipPos = useSim((s) => s.setClipPos);

  return (
    <footer className="pointer-events-none p-3 pt-0">
      <div className="panel pointer-events-auto flex flex-col gap-2 rounded-lg px-3 py-2 md:flex-row md:items-center md:gap-3 md:py-2.5">
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="icon-sm"
            className="rounded-sm"
            aria-label={playing ? "Pausar" : "Reproducir"}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-px" />}
          </Button>
          <div className="min-w-0 flex-1 md:w-52 md:flex-none">
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[10px] tracking-wide text-muted uppercase">RPM</span>
              <span className="font-mono text-xs tabular">{rpm}</span>
            </div>
            <Slider
              min={0}
              max={300}
              step={5}
              value={[rpm]}
              onValueChange={(v) => setRpm(v[0] ?? 0)}
              aria-label="Velocidad de giro"
            />
          </div>
        </div>

        <div className="hidden h-8 w-px bg-border md:block" />

        <Seg
          value={viewMode}
          onChange={setViewMode}
          items={[
            { id: "pair", label: "Par" },
            { id: "single", label: "Simple" },
          ]}
        />
        <Seg
          value={colorMode}
          onChange={setColorMode}
          items={[
            { id: "phase", label: "Fases" },
            { id: "zone", label: "Zonas" },
            { id: "metal", label: "Metal" },
          ]}
        />

        <div className="flex flex-wrap items-center gap-1">
          <IconToggle
            pressed={showFlow}
            onPressed={() => setShowFlow(!showFlow)}
            label="Flujo"
          />
          <IconToggle
            pressed={showBarrel}
            onPressed={() => setShowBarrel(!showBarrel)}
            label="Cañón"
            icon={<Box className="size-3.5" />}
          />
          <IconToggle
            pressed={exploded}
            onPressed={() => setExploded(!exploded)}
            label="Explotado"
            icon={<Layers className="size-3.5" />}
          />
          <IconToggle
            pressed={clipMode !== "off"}
            onPressed={() => setClipMode(nextClip(clipMode))}
            label={clipLabel(clipMode)}
            icon={<Scan className="size-3.5" />}
          />
        </div>

        {clipMode === "axial" ? (
          <div className="min-w-0 md:w-40">
            <Slider
              min={0.05}
              max={0.98}
              step={0.01}
              value={[clipPos]}
              onValueChange={(v) => setClipPos(v[0] ?? 0.5)}
              aria-label="Posición de corte axial"
            />
          </div>
        ) : null}
      </div>
    </footer>
  );
}

function nextClip(mode: ClipMode): ClipMode {
  if (mode === "off") return "long";
  if (mode === "long") return "axial";
  return "off";
}

function clipLabel(mode: ClipMode) {
  if (mode === "long") return "Corte Y";
  if (mode === "axial") return "Corte X";
  return "Corte";
}

function Seg<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T;
  onChange: (v: T) => void;
  items: { id: T; label: string }[];
}) {
  return (
    <div className="flex rounded-sm bg-secondary p-0.5">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => onChange(it.id)}
          className={cn(
            "h-8 rounded-sm px-2.5 text-xs font-medium transition-colors duration-150",
            value === it.id
              ? "bg-primary text-primary-foreground"
              : "text-muted hover:text-foreground",
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function IconToggle({
  pressed,
  onPressed,
  label,
  icon,
}: {
  pressed: boolean;
  onPressed: () => void;
  label: string;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onPressed}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-xs font-medium transition-colors duration-150",
        pressed
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function PhasePanel() {
  const isolated = useSim((s) => s.isolatedPhase);
  const hovered = useSim((s) => s.hoveredPhase);
  const toggle = useSim((s) => s.togglePhase);
  const setHovered = useSim((s) => s.setHovered);
  const active = PHASES.find((p) => p.id === (hovered ?? isolated));

  return (
    <div className="panel rounded-lg p-3">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-xs font-medium tracking-wide text-muted uppercase">
          16 fases
        </h2>
        {isolated ? (
          <button
            type="button"
            className="text-[11px] text-brand hover:text-foreground"
            onClick={() => toggle(isolated)}
          >
            Ver todas
          </button>
        ) : null}
      </div>
      <ul className="grid grid-cols-1 gap-0.5">
        {PHASES.map((p) => {
          const on = isolated === p.id || hovered === p.id;
          const dim = isolated !== null && isolated !== p.id;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => toggle(p.id)}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-sm px-1.5 py-1 text-left transition-colors duration-150",
                  on ? "bg-secondary" : "hover:bg-secondary/70",
                  dim && "opacity-40",
                )}
              >
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: p.color }}
                />
                <span className="font-mono text-[11px] tabular">{p.id}</span>
                <span className="min-w-0 flex-1 truncate text-[11px] text-muted">
                  {p.label}
                </span>
                <span className="font-mono text-[10px] text-muted tabular">
                  {p.length.toFixed(1)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {active ? <PhaseDetail phase={active} /> : null}
    </div>
  );
}

function PhaseDetail({ phase }: { phase: PhaseDef }) {
  const zone = ZONE_META[phase.zone];
  return (
    <div className="mt-2 border-t border-border pt-2">
      <p className="text-xs font-medium">{phase.label}</p>
      <p className="text-[11px] text-muted">
        {zone.name} · {phase.type === "convey" ? "transporte" : "amasado"} · mano {phase.hand}
        {phase.pitch ? ` · paso ${phase.pitch} mm` : null}
        {phase.elements ? ` · ${phase.elements} × ${phase.stagger}°` : null}
      </p>
    </div>
  );
}

function SpecsCard() {
  const showShaft = useSim((s) => s.showShaft);
  const setShowShaft = useSim((s) => s.setShowShaft);
  return (
    <div className="panel rounded-lg p-3">
      <h2 className="mb-2 text-xs font-medium tracking-wide text-muted uppercase">
        Geometría
      </h2>
      <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 font-mono text-[11px] tabular">
        <dt className="text-muted">Longitud</dt>
        <dd>{TOTAL_LENGTH.toFixed(2)} mm</dd>
        <dt className="text-muted">OD nominal</dt>
        <dd>{MATERIAL.od} mm</dd>
        <dt className="text-muted">Dist. ejes</dt>
        <dd>{MATERIAL.cd} mm</dd>
        <dt className="text-muted">Eje</dt>
        <dd>{MATERIAL.shaft}</dd>
        <dt className="text-muted">Material</dt>
        <dd>{MATERIAL.name}</dd>
      </dl>
      <label className="mt-3 flex items-center justify-between gap-3 text-xs">
        <span>Eje cuadrado</span>
        <Switch checked={showShaft} onCheckedChange={setShowShaft} />
      </label>
    </div>
  );
}

function StatsCard() {
  const [, bump] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => bump((n) => n + 1), 400);
    return () => window.clearInterval(id);
  }, []);
  const deg = ((runtime.angle * 180) / Math.PI) % 360;
  const zGuess = Math.min(
    TOTAL_LENGTH,
    Math.max(0, (runtime.meanResidence / 18) * TOTAL_LENGTH),
  );
  const ph = phaseAt(zGuess);
  return (
    <div className="panel pointer-events-auto rounded-lg p-3">
      <h2 className="mb-2 text-xs font-medium tracking-wide text-muted uppercase">
        Proceso
      </h2>
      <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 font-mono text-[11px] tabular">
        <dt className="text-muted">Ángulo</dt>
        <dd>{deg.toFixed(0)}°</dd>
        <dt className="text-muted">Residencia</dt>
        <dd>{runtime.meanResidence.toFixed(1)} s</dd>
        <dt className="text-muted">Avance</dt>
        <dd>{runtime.throughput.toFixed(0)} mm/min</dd>
        <dt className="text-muted">Frente</dt>
        <dd>{ph.id}</dd>
      </dl>
    </div>
  );
}

export function BootScreen() {
  return (
    <div className="absolute inset-0 flex flex-col bg-background text-foreground">
      <div className="p-6">
        <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
          Co-rotante V2
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">CoTwin</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Generando el perfil bilobal y las 16 fases del tornillo extrusor.
        </p>
      </div>
    </div>
  );
}
