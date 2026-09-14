import { POS, GEARS } from "@/lib/design";
import type { GearLoadResult } from "@/lib/gear-loads";
import { fmtN } from "@/lib/utils";

export function GearLoadSchematic({ loads }: { loads: GearLoadResult }) {
  const s = 1.55;
  const ox = 200;
  const oy = 118;
  const p = (pt: { x: number; y: number }) => ({ x: ox + pt.x * s, y: oy - pt.y * s });
  const input = p(POS.input);
  const cmpL = p(POS.cmpL);
  const cmpR = p(POS.cmpR);
  const outL = p(POS.outL);
  const outR = p(POS.outR);
  const rIn = (GEARS.input.pd / 2) * s;
  const rCr = (GEARS.crown.pd / 2) * s;
  const rPn = (GEARS.cmpPinion.pd / 2) * s;
  const rOut = (GEARS.output.pd / 2) * s;

  const tone = (sf: number) =>
    sf < 1 ? "stroke-destructive fill-destructive/20" : sf < 1.5 ? "stroke-primary fill-primary/10" : "stroke-ok fill-ok/15";

  const dist = loads.meshes[0]!;
  const out = loads.meshes[2]!;

  return (
    <svg viewBox="0 0 400 200" className="h-auto w-full" aria-label="Fuerzas en los engranes">
      <circle cx={input.x} cy={input.y} r={rIn} className={tone(dist.pinion.sf)} strokeWidth="1.4" />
      <circle cx={cmpL.x} cy={cmpL.y} r={rCr} className={tone(Math.min(dist.gear.sf, out.pinion.sf))} strokeWidth="1.2" />
      <circle cx={cmpR.x} cy={cmpR.y} r={rCr} className={tone(Math.min(loads.meshes[1]!.gear.sf, loads.meshes[3]!.pinion.sf))} strokeWidth="1.2" />
      <circle cx={outL.x} cy={outL.y} r={rOut} className={tone(out.gear.sf)} strokeWidth="1.4" />
      <circle cx={outR.x} cy={outR.y} r={rOut} className={tone(loads.meshes[3]!.gear.sf)} strokeWidth="1.4" />
      <circle cx={cmpL.x} cy={cmpL.y} r={rPn} className="fill-background/40 stroke-primary" strokeWidth="1" />
      <circle cx={cmpR.x} cy={cmpR.y} r={rPn} className="fill-background/40 stroke-primary" strokeWidth="1" />

      {loads.meshes.map((m) => {
        const c = { x: ox + m.x * s, y: oy - m.y * s };
        const len = 10 + Math.min(18, m.Ft / 40);
        return (
          <g key={m.id}>
            <line
              x1={c.x}
              y1={c.y}
              x2={c.x + m.tx * len}
              y2={c.y - m.ty * len}
              className={m.sf < 1 ? "stroke-destructive" : "stroke-primary"}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx={c.x} cy={c.y} r="2.4" className={m.sf < 1 ? "fill-destructive" : "fill-primary"} />
          </g>
        );
      })}

      <text x={input.x} y={input.y - rIn - 6} textAnchor="middle" className="fill-foreground" fontSize="9">
        Z{GEARS.input.z}
      </text>
      <text x={outL.x} y={outL.y + rOut + 12} textAnchor="middle" className="fill-muted-foreground" fontSize="8">
        {fmtN(out.Ft)}
      </text>
      <text x={outR.x} y={outR.y + rOut + 12} textAnchor="middle" className="fill-muted-foreground" fontSize="8">
        {fmtN(loads.meshes[3]!.Ft)}
      </text>
      <text x={200} y={16} textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        Ft tangencial · α 20° · color = factor de seguridad
      </text>
    </svg>
  );
}
