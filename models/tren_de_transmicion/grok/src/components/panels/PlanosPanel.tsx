import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  ADAPTER,
  BEARINGS,
  GEARS,
  POS,
  SPEC,
  Z,
} from "@/lib/design";
import { fmtMm } from "@/lib/utils";

export function PlanosPanel() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Planos de fabricación
        </p>
        <h2 className="text-xl font-medium tracking-tight">{SPEC.name}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Cotas bloqueadas del tornillo y del tren. El adaptador se tuerce en acero. El 90° no se
          fresa en el cuadrado.
        </p>
      </header>

      <Drawing title="Vista frontal · interfaz de tornillos" sheet="TL-253-01">
        <EndView />
      </Drawing>

      <Drawing title="Apilado axial · camino de empuje" sheet="TL-253-02">
        <AxialView />
      </Drawing>

      <Drawing title={`Adaptador ${ADAPTER.id}`} sheet="TL-253-AD">
        <AdapterView />
      </Drawing>

      <section className="space-y-2">
        <h3 className="text-sm font-medium">Cotas críticas</h3>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-muted-foreground">
              <th className="pb-1.5 font-medium">Cota</th>
              <th className="pb-1.5 font-medium">Valor</th>
              <th className="pb-1.5 font-medium">Nota</th>
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            <Row k="CD tornillos" v={fmtMm(SPEC.centerDistance)} n="Acero. No FDM." />
            <Row k="□ eje" v={`${fmtMm(ADAPTER.square)} ${ADAPTER.squareTol}`} n="Hueco 18 mm" />
            <Row k="Fase" v="90° ±0.5°" n="Clamp en banco" />
            <Row k="Módulo / α" v={`${GEARS.output.m} / 25°`} n="Evolvente" />
            <Row k="Backlash FDM" v={`+${fmtMm(SPEC.backlashAllowance)}`} n="Solo centros impresos" />
            <Row k="51102" v={`${BEARINGS.thrust.d}×${BEARINGS.thrust.D}×${BEARINGS.thrust.T}`} n="Contra placa, no PETG" />
            <Row k="6001-2Z" v={`${BEARINGS.radial.d}×${BEARINGS.radial.D}×${BEARINGS.radial.B}`} n="2×, mitad locadora" />
          </tbody>
        </table>
      </section>

      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Adaptador — operación de torno</h3>
          <Badge variant="warn">crítico</Badge>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{ADAPTER.note}</p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>
            Barra {ADAPTER.material}, Ø{ADAPTER.shoulderOd} mínimo. Longitud {fmtMm(ADAPTER.overall)}.
          </li>
          <li>
            Muñón empuje Ø{ADAPTER.thrustJournal} {ADAPTER.thrustJournalTol} × {fmtMm(ADAPTER.thrustJournalLen)}{" "}
            (51102).
          </li>
          <li>
            Muñones radiales Ø{ADAPTER.radialJournal} {ADAPTER.radialJournalTol} × {fmtMm(ADAPTER.radialJournalLen)}{" "}
            (6001), dos asientos.
          </li>
          <li>
            Hueco □{ADAPTER.square} {ADAPTER.squareTol} × {fmtMm(ADAPTER.squareDepth)}, electroerosión o broca
            + lima + calibrador.
          </li>
          <li>
            {ADAPTER.clamp}. {ADAPTER.setScrew}. {ADAPTER.pin}.
          </li>
        </ul>
      </section>
    </div>
  );
}

function Drawing({
  title,
  sheet,
  children,
}: {
  title: string;
  sheet: string;
  children: ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
      <div className="flex items-baseline justify-between gap-3 px-3 pt-2.5">
        <figcaption className="text-xs text-muted-foreground">{title}</figcaption>
        <span className="font-mono text-[10px] tracking-wide text-primary">{sheet}</span>
      </div>
      {children}
    </figure>
  );
}

function Row({ k, v, n }: { k: string; v: string; n: string }) {
  return (
    <tr className="border-t border-border">
      <td className="py-1.5 pr-2 font-sans text-muted-foreground">{k}</td>
      <td className="py-1.5 pr-2 text-foreground">{v}</td>
      <td className="py-1.5 font-sans text-muted-foreground">{n}</td>
    </tr>
  );
}

function EndView() {
  const s = 3.4;
  const ox = 200;
  const oy = 118;
  const rL = { x: ox + POS.outL.x * s, y: oy - POS.outL.y * s };
  const rR = { x: ox + POS.outR.x * s, y: oy - POS.outR.y * s };
  const q = (SPEC.shaftSquare * s) / 2;
  const square = (cx: number, cy: number) =>
    `${cx - q},${cy - q} ${cx + q},${cy - q} ${cx + q},${cy + q} ${cx - q},${cy + q}`;
  const lobe = (cx: number, cy: number, rot: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 48; i++) {
      const t = (i / 48) * Math.PI * 2;
      const rad = 26 + 9 * Math.cos(2 * (t - rot));
      pts.push(`${cx + rad * Math.cos(t)},${cy + rad * Math.sin(t)}`);
    }
    return pts.join(" ");
  };

  return (
    <svg viewBox="0 0 400 210" className="h-auto w-full" aria-label="Vista frontal 25.3 mm">
      <line
        x1={rL.x}
        y1={rL.y + 52}
        x2={rR.x}
        y2={rR.y + 52}
        className="stroke-primary"
        strokeWidth="1"
      />
      <line x1={rL.x} y1={rL.y + 48} x2={rL.x} y2={rL.y + 56} className="stroke-primary" strokeWidth="1" />
      <line x1={rR.x} y1={rR.y + 48} x2={rR.x} y2={rR.y + 56} className="stroke-primary" strokeWidth="1" />
      <text
        x={ox}
        y={rL.y + 70}
        textAnchor="middle"
        className="fill-primary"
        fontSize="11"
        fontFamily="IBM Plex Mono, monospace"
      >
        25.3
      </text>

      <polygon points={lobe(rL.x, rL.y, 0)} className="fill-primary/10 stroke-primary" strokeWidth="1.2" />
      <polygon
        points={lobe(rR.x, rR.y, Math.PI / 2)}
        className="fill-ok/10 stroke-ok"
        strokeWidth="1.2"
      />
      <polygon points={square(rL.x, rL.y)} className="fill-primary/40 stroke-primary" strokeWidth="1.2" />
      <polygon points={square(rR.x, rR.y)} className="fill-ok/40 stroke-ok" strokeWidth="1.2" />

      <text x={rL.x} y={rL.y - 42} textAnchor="middle" className="fill-foreground" fontSize="10">
        L · lóbulo 0°
      </text>
      <text x={rR.x} y={rR.y - 42} textAnchor="middle" className="fill-foreground" fontSize="10">
        R · lóbulo 90°
      </text>
      <text x={ox} y={22} textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        Huecos □ idénticos · fase en la brida del engranaje, no en el cuadrado
      </text>
    </svg>
  );
}

function AxialView() {
  const x0 = 36;
  const scale = 2.15;
  const yL = 58;
  const yR = 118;
  const x = (z: number) => x0 + (z + 18) * scale;

  const stages: { z: number; w: number; h: number; y: number; label: string }[] = [
    { z: -18, w: 18, h: 14, y: yL, label: "□" },
    { z: 0, w: 3, h: 44, y: (yL + yR) / 2, label: "placa" },
    { z: 8, w: 9, h: 22, y: yL, label: "51102" },
    { z: 22, w: 8, h: 22, y: yL, label: "6001" },
    { z: 40, w: 16, h: 34, y: yL, label: "Z24 L" },
    { z: 104, w: 8, h: 22, y: yL, label: "6001" },
  ];
  const stagesR: { z: number; w: number; h: number; y: number; label: string }[] = [
    { z: -18, w: 18, h: 14, y: yR, label: "□" },
    { z: 8, w: 9, h: 22, y: yR, label: "51102" },
    { z: 22, w: 8, h: 22, y: yR, label: "6001" },
    { z: 60, w: 16, h: 34, y: yR, label: "Z24 R" },
    { z: 104, w: 8, h: 22, y: yR, label: "6001" },
  ];

  const bar = (s: (typeof stages)[number], fill: string) => (
    <g key={`${s.y}-${s.z}-${s.label}`}>
      <rect
        x={x(s.z)}
        y={s.y - s.h / 2}
        width={s.w * scale}
        height={s.h}
        className={fill}
        rx="1.5"
      />
      <text
        x={x(s.z) + (s.w * scale) / 2}
        y={s.y + s.h / 2 + 12}
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="8"
      >
        {s.label}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 400 168" className="h-auto w-full" aria-label="Apilado axial">
      <line x1={x(-18)} y1={yL} x2={x(120)} y2={yL} className="stroke-border" strokeWidth="1" />
      <line x1={x(-18)} y1={yR} x2={x(120)} y2={yR} className="stroke-border" strokeWidth="1" />
      {stages.map((s) =>
        bar(s, s.label === "placa" ? "fill-primary/35 stroke-primary" : "fill-secondary stroke-steel"),
      )}
      {stagesR.map((s) => bar(s, "fill-secondary stroke-ok"))}
      <text
        x={x(0)}
        y={22}
        textAnchor="middle"
        className="fill-primary"
        fontSize="9"
        fontFamily="IBM Plex Mono, monospace"
      >
        z = 0 placa
      </text>
      <text
        x={x(40)}
        y={22}
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="9"
        fontFamily="IBM Plex Mono, monospace"
      >
        L @ {Z.outputGearL}
      </text>
      <text
        x={x(60)}
        y={22}
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="9"
        fontFamily="IBM Plex Mono, monospace"
      >
        R @ {Z.outputGearR}
      </text>
      <text x={16} y={yL + 4} className="fill-foreground" fontSize="9">
        L
      </text>
      <text x={16} y={yR + 4} className="fill-foreground" fontSize="9">
        R
      </text>
      <text x={200} y={160} textAnchor="middle" className="fill-muted-foreground" fontSize="9">
        Empuje ← tornillo · descarga en placa · engranajes no coplanares
      </text>
    </svg>
  );
}

function AdapterView() {
  const x0 = 28;
  const sc = 2.6;
  const y = 70;
  const segs: { len: number; r: number; label: string }[] = [
    { len: 18, r: 8, label: "□ 6.35" },
    { len: 3, r: 9, label: "hombro" },
    { len: 10, r: 7.5, label: "Ø15 g6" },
    { len: 9, r: 6, label: "Ø12 6001" },
    { len: 16, r: 6, label: "asiento Z24" },
    { len: 20, r: 5.5, label: "cuerpo" },
    { len: 9, r: 6, label: "Ø12 6001" },
    { len: 8, r: 5, label: "cola" },
  ];
  let z = 0;
  const rects = segs.map((s) => {
    const el = { ...s, z };
    z += s.len;
    return el;
  });

  return (
    <svg viewBox="0 0 400 150" className="h-auto w-full" aria-label="Adaptador TL-253-AD">
      {rects.map((s) => (
        <g key={s.z}>
          <rect
            x={x0 + s.z * sc}
            y={y - s.r * sc * 0.55}
            width={s.len * sc}
            height={s.r * sc * 1.1}
            className="fill-secondary stroke-primary"
            strokeWidth="1"
            rx="1"
          />
          <text
            x={x0 + s.z * sc + (s.len * sc) / 2}
            y={y + 48}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="7.5"
          >
            {s.label}
          </text>
        </g>
      ))}
      <line
        x1={x0}
        y1={18}
        x2={x0 + ADAPTER.overall * sc * 0.83}
        y2={18}
        className="stroke-primary"
        strokeWidth="1"
      />
      <text
        x={x0 + 90}
        y={14}
        className="fill-primary"
        fontSize="10"
        fontFamily="IBM Plex Mono, monospace"
      >
        {ADAPTER.overall} mm · {ADAPTER.material}
      </text>
      <text x={200} y={142} textAnchor="middle" className="fill-muted-foreground" fontSize="9">
        Dos piezas idénticas. Brida partida sobre el asiento Z24 para faseo.
      </text>
    </svg>
  );
}
