import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MOTORS,
  PRE_REDUCTIONS,
  SPEC,
  computeDrive,
  motorCurve,
  type MotorId,
  type PreId,
} from "@/lib/design";
import { fmtNm, fmtRpm } from "@/lib/utils";
import { useStudio } from "@/store/studio";

const REC: Record<string, string> = {
  ideal: "En ventana",
  usable: "Usable",
  slow: "Lento",
  weak: "Par insuficiente",
  overkill: "Exceso de reducción",
};

export function MotorPanel() {
  const motorId = useStudio((s) => s.motorId);
  const preId = useStudio((s) => s.preId);
  const setMotorId = useStudio((s) => s.setMotorId);
  const setPreId = useStudio((s) => s.setPreId);
  const drive = computeDrive(motorId, preId);
  const motor = MOTORS[motorId];
  const pre = PRE_REDUCTIONS[preId];
  const data = motorCurve(motor, drive.totalRatio, drive.eta);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Entrada de potencia
        </p>
        <h2 className="text-xl font-medium tracking-tight">Motor y reducción</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{motor.note}</p>
      </header>

      <div className="grid gap-3">
        <label className="space-y-1.5 text-xs text-muted-foreground">
          Motor
          <Select value={motorId} onValueChange={(v) => setMotorId(v as MotorId)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(MOTORS).map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="space-y-1.5 text-xs text-muted-foreground">
          Pre-reducción (antes del split 6:1)
          <Select value={preId} onValueChange={(v) => setPreId(v as PreId)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PRE_REDUCTIONS).map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={drive.recommendation === "ideal" ? "ok" : drive.recommendation === "weak" ? "warn" : "default"}>
          {REC[drive.recommendation]}
        </Badge>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">{drive.label}</span>
      </div>

      <dl className="grid grid-cols-2 gap-3">
        <Tile k="Relación total" v={`${drive.totalRatio.toFixed(0)}:1`} />
        <Tile k="η combinada" v={`${Math.round(drive.eta * 100)} %`} />
        <Tile k="rpm tornillo (régimen)" v={fmtRpm(drive.screwRpmRated)} />
        <Tile k="Par combinado" v={fmtNm(drive.torqueRated)} />
        <Tile k="Par de arranque" v={fmtNm(drive.torqueStall)} />
        <Tile k="Por eje" v={fmtNm(drive.torquePerShaft)} />
      </dl>

      <div className="h-44 rounded-xl bg-card p-2 shadow-[var(--shadow-border)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#2a2c31" strokeDasharray="3 3" />
            <XAxis
              dataKey="rpm"
              tick={{ fill: "#8a8d93", fontSize: 10 }}
              tickFormatter={(n) => `${Math.round(Number(n))}`}
            />
            <YAxis
              dataKey="torque"
              tick={{ fill: "#8a8d93", fontSize: 10 }}
              width={36}
              tickFormatter={(n) => `${Number(n).toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{ background: "#131417", border: "1px solid #2a2c31", fontSize: 12 }}
              formatter={(v) => [`${Number(v).toFixed(1)} N·m`, "Par"]}
              labelFormatter={(l) => `${Math.round(Number(l))} rpm tornillo`}
            />
            <Line type="monotone" dataKey="torque" stroke="#c9d1d8" strokeWidth={1.6} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Curva referida al tornillo. Ventana objetivo {SPEC.screwRpmMin}–{SPEC.screwRpmMax} rpm y{" "}
        {SPEC.torqueCombinedMin}–{SPEC.torqueCombinedMax} N·m. Split 6:1 fijo · {pre.name}.
      </p>

      <section className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        <h3 className="text-sm font-medium text-foreground">Recomendación de banco</h3>
        <p>
          Arranque: NEMA 23 2 N·m directo al piñón (esta ficha). ~70 rpm, ~10 N·m, control por
          pasos. Si las zonas reverse piden más par, subir a 3 N·m o añadir planetario 5:1 y
          aceptar rpm más bajas. El DC 775 solo con planetario 10:1 — sin él el tornillo gira a
          miles de rpm y no hay par.
        </p>
      </section>
    </div>
  );
}

function Tile({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-card px-3 py-2.5 shadow-[var(--shadow-border)]">
      <dt className="text-[11px] text-muted-foreground">{k}</dt>
      <dd className="font-mono text-sm tabular-nums">{v}</dd>
    </div>
  );
}
