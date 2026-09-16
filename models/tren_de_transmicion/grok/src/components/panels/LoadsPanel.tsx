import { useEffect } from "react";
import { GearLoadSchematic } from "@/components/diagrams/GearLoadSchematic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { BEARINGS, GEARS, SPEC, computeDrive } from "@/lib/design";
import { TOOTH_MAT, KNEAD_PEAK, computeGearLoads } from "@/lib/gear-loads";
import { fmtMPa, fmtN, fmtNm } from "@/lib/utils";
import { useStudio } from "@/store/studio";

export function LoadsPanel() {
  const motorId = useStudio((s) => s.motorId);
  const preId = useStudio((s) => s.preId);
  const loadPct = useStudio((s) => s.loadPct);
  const setLoadPct = useStudio((s) => s.setLoadPct);
  const ramping = useStudio((s) => s.ramping);
  const setRamping = useStudio((s) => s.setRamping);
  const cmpSteel = useStudio((s) => s.cmpSteel);
  const setCmpSteel = useStudio((s) => s.setCmpSteel);
  const knead = useStudio((s) => s.knead);
  const setKnead = useStudio((s) => s.setKnead);
  const drive = computeDrive(motorId, preId);
  const loads = computeGearLoads(motorId, preId, loadPct / 100, {
    cmpPinionMat: cmpSteel ? "steel" : "petg",
    dutyPeak: knead ? KNEAD_PEAK : 1,
  });
  const thrustSf = BEARINGS.thrust.Ca / SPEC.thrustDesignN;
  const radialSf = (BEARINGS.radial.Cr * 2) / SPEC.radialDesignN;
  const stallPct = Math.round((drive.torqueStall / Math.max(drive.torqueRated, 0.01)) * 100);
  const failed = loads.critical.sf < 1;
  const cap = Math.max(180, stallPct);

  useEffect(() => {
    if (!ramping) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLoadPct(Math.min(cap, stallPct));
      setRamping(false);
      return;
    }
    const start = performance.now();
    const from = 0;
    const dur = 2400;
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - k) * (1 - k);
      setLoadPct(from + eased * cap);
      if (k < 1) raf = requestAnimationFrame(tick);
      else setRamping(false);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ramping, cap, stallPct, setLoadPct, setRamping]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Simulación de engrane
        </p>
        <h2 className="text-xl font-medium tracking-tight">Carga en los dientes</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Flexión Lewis y Hertz en los cuatro engranes, α = 25°. PETG-CF a {TOOTH_MAT.petg.sigmaB} MPa
          de raíz; acero a {TOOTH_MAT.steel.sigmaB} MPa. Conservador (recto, no herringbone).
        </p>
      </header>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs text-muted-foreground">Carga respecto al régimen</p>
          <p className="font-mono text-xs tabular-nums text-foreground">{Math.round(loadPct)}%</p>
        </div>
        <Slider
          min={0}
          max={cap}
          step={1}
          value={[loadPct]}
          onValueChange={(v) => {
            setRamping(false);
            setLoadPct(v[0] ?? 100);
          }}
          aria-label="Porcentaje de carga"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant={ramping ? "secondary" : "default"}
            onClick={() => {
              setLoadPct(0);
              setRamping(true);
            }}
          >
            {ramping ? "Rampando…" : "Rampa a stall"}
          </Button>
          <Button size="sm" variant="outline" onClick={() => { setRamping(false); setLoadPct(100); }}>
            Régimen
          </Button>
          <span className="font-mono text-[11px] text-muted-foreground">
            {fmtNm(loads.torqueOut)} · stall {stallPct}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <p className="text-[11px] text-muted-foreground">Piñón Z{GEARS.cmpPinion.z}</p>
          <div className="flex rounded-lg bg-secondary p-0.5">
            <Button
              size="sm"
              variant={cmpSteel ? "ghost" : "default"}
              className="h-8 flex-1"
              onClick={() => setCmpSteel(false)}
            >
              PETG-CF
            </Button>
            <Button
              size="sm"
              variant={cmpSteel ? "default" : "ghost"}
              className="h-8 flex-1"
              onClick={() => setCmpSteel(true)}
            >
              Acero
            </Button>
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-[11px] text-muted-foreground">Ciclo</p>
          <div className="flex rounded-lg bg-secondary p-0.5">
            <Button
              size="sm"
              variant={knead ? "ghost" : "default"}
              className="h-8 flex-1"
              onClick={() => setKnead(false)}
            >
              Estable
            </Button>
            <Button
              size="sm"
              variant={knead ? "default" : "ghost"}
              className="h-8 flex-1"
              onClick={() => setKnead(true)}
            >
              Amasado ×{KNEAD_PEAK}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Kpi
          k="Diente crítico"
          v={`${loads.critical.name}`}
          sub={`${loads.critical.mode} · SF ${loads.critical.sf.toFixed(2)}`}
          warn={failed}
        />
        <Kpi
          k="Falla a"
          v={`${loads.failPct.toFixed(0)}%`}
          sub={failed ? "por debajo del régimen" : "margen sobre régimen"}
          warn={failed}
        />
      </div>

      <div className="rounded-xl bg-card p-3 shadow-[var(--shadow-border)]">
        <GearLoadSchematic loads={loads} />
      </div>

      <div className="space-y-2">
        {loads.meshes.map((m) => (
          <button
            key={m.id}
            type="button"
            className="w-full rounded-lg bg-secondary/60 px-3 py-2 text-left"
            onClick={() => useStudio.getState().setSelectedId(
              m.id.startsWith("out") ? "gear-out-steel" : m.id.startsWith("dist") ? "gear-input" : "compound",
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-medium">{m.name}</p>
              <Badge variant={m.sf < 1 ? "warn" : "ok"}>SF {m.sf.toFixed(2)}</Badge>
            </div>
            <p className="mt-1 font-mono text-[11px] tabular-nums text-muted-foreground">
              Ft {fmtN(m.Ft)} · Fr {fmtN(m.Fr)} · Fn {fmtN(m.Fn)}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {m.pinion.name} {m.pinion.mat === "petg" ? "PETG" : "acero"} {fmtMPa(m.pinion.sigmaB)} flex /
              {fmtMPa(m.pinion.sigmaH)} Hertz · {m.gear.name} {fmtMPa(m.gear.sigmaB)}
            </p>
          </button>
        ))}
      </div>

      {failed ? (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {loads.critical.name} falla por {loads.critical.mode}.
          {!cmpSteel
            ? ` El piñón Z${GEARS.cmpPinion.z} en PETG contra acero concentra Hertz. Cambia a acero.`
            : " Sube ancho de cara o baja el par de amasado."}
        </p>
      ) : (
        <p className="rounded-lg bg-ok/10 px-3 py-2 text-sm text-ok">
          {cmpSteel
            ? `Z${GEARS.cmpPinion.z} en acero: SF ${loads.critical.sf.toFixed(2)} en ${loads.critical.name}.`
            : `Todos por encima de SF 1. El más justo: ${loads.critical.name}.`}
        </p>
      )}

      <header className="space-y-1 pt-2">
        <h3 className="text-sm font-medium">Empuje y separación</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Independiente del engrane: {fmtN(SPEC.thrustDesignN)} axiales por eje y {fmtN(SPEC.radialDesignN)} de
          apertura van a rodamiento, no al PETG.
        </p>
      </header>

      <div className="space-y-3">
        <Bar
          label="Par combinado (régimen)"
          value={`${fmtNm(drive.torqueRated)} / ${SPEC.torqueCombinedMin}–${SPEC.torqueCombinedMax}`}
          ratio={drive.torqueRated / SPEC.torqueCombinedMax}
          tone={drive.torqueRated < 8 ? "warn" : "ok"}
        />
        <Bar
          label={`Thrust vs 51102 (Ca ${fmtN(BEARINGS.thrust.Ca)})`}
          value={`SF ${thrustSf.toFixed(1)}`}
          ratio={SPEC.thrustDesignN / BEARINGS.thrust.Ca}
          tone="ok"
        />
        <Bar
          label={`Radial vs 2×6001`}
          value={`SF ${radialSf.toFixed(1)}`}
          ratio={SPEC.radialDesignN / (BEARINGS.radial.Cr * 2)}
          tone="ok"
        />
      </div>
    </div>
  );
}

function Kpi({
  k,
  v,
  sub,
  warn,
}: {
  k: string;
  v: string;
  sub: string;
  warn: boolean;
}) {
  return (
    <div className="rounded-xl bg-card px-3 py-2.5 shadow-[var(--shadow-border)]">
      <p className="text-[11px] text-muted-foreground">{k}</p>
      <p className={`text-sm font-medium ${warn ? "text-destructive" : "text-foreground"}`}>{v}</p>
      <p className="font-mono text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function Bar({
  label,
  value,
  ratio,
  tone,
}: {
  label: string;
  value: string;
  ratio: number;
  tone: "ok" | "warn";
}) {
  const w = Math.min(100, Math.max(6, ratio * 100));
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-mono text-[11px] tabular-nums text-foreground">{value}</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className={tone === "ok" ? "h-full bg-ok" : "h-full bg-destructive"}
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}
