import { POS, SPEC } from "@/lib/design";

export function SplitPowerSchematic() {
  const s = 2.05;
  const ox = 210;
  const oy = 118;
  const p = (x: number, y: number) => `${ox + x * s},${oy - y * s}`;
  const inP = p(POS.input.x, POS.input.y);
  const cL = p(POS.cmpL.x, POS.cmpL.y);
  const cR = p(POS.cmpR.x, POS.cmpR.y);
  const oL = p(POS.outL.x, POS.outL.y);
  const oR = p(POS.outR.x, POS.outR.y);

  return (
    <svg viewBox="0 0 420 210" className="h-auto w-full" aria-label="Topología split-power">
      <rect width="420" height="210" fill="transparent" />
      <line x1={ox + POS.outL.x * s} y1={oy + 28} x2={ox + POS.outR.x * s} y2={oy + 28} stroke="currentColor" className="text-primary" strokeWidth="1" />
      <text x={ox} y={oy + 44} textAnchor="middle" className="fill-primary" fontSize="10" fontFamily="IBM Plex Mono, monospace">
        CD {SPEC.centerDistance} mm · 1:1 · co-rotante
      </text>

      <path d={`M ${inP} L ${cL}`} stroke="currentColor" className="text-ok" strokeWidth="2" fill="none" />
      <path d={`M ${inP} L ${cR}`} stroke="currentColor" className="text-ok" strokeWidth="2" fill="none" />
      <path d={`M ${cL} L ${oL}`} stroke="currentColor" className="text-steel" strokeWidth="2" fill="none" />
      <path d={`M ${cR} L ${oR}`} stroke="currentColor" className="text-steel" strokeWidth="2" fill="none" />

      <circle cx={ox + POS.input.x * s} cy={oy - POS.input.y * s} r="16" className="fill-secondary stroke-primary" strokeWidth="1.4" />
      <circle cx={ox + POS.cmpL.x * s} cy={oy - POS.cmpL.y * s} r="22" className="fill-card stroke-ok" strokeWidth="1.4" />
      <circle cx={ox + POS.cmpR.x * s} cy={oy - POS.cmpR.y * s} r="22" className="fill-card stroke-ok" strokeWidth="1.4" />
      <circle cx={ox + POS.outL.x * s} cy={oy - POS.outL.y * s} r="11" className="fill-primary/20 stroke-primary" strokeWidth="1.6" />
      <circle cx={ox + POS.outR.x * s} cy={oy - POS.outR.y * s} r="11" className="fill-primary/20 stroke-primary" strokeWidth="1.6" />

      <text x={ox} y={oy - POS.input.y * s - 24} textAnchor="middle" className="fill-foreground" fontSize="10">
        Piñón Z18
      </text>
      <text x={ox + POS.cmpL.x * s} y={oy - POS.cmpL.y * s + 4} textAnchor="middle" className="fill-muted-foreground" fontSize="9">
        Comp. L
      </text>
      <text x={ox + POS.cmpR.x * s} y={oy - POS.cmpR.y * s + 4} textAnchor="middle" className="fill-muted-foreground" fontSize="9">
        Comp. R
      </text>
      <text x={ox + POS.outL.x * s} y={oy - POS.outL.y * s - 16} textAnchor="middle" className="fill-foreground" fontSize="9">
        Salida L
      </text>
      <text x={ox + POS.outR.x * s} y={oy - POS.outR.y * s - 16} textAnchor="middle" className="fill-foreground" fontSize="9">
        Salida R
      </text>
      <text x={ox} y={18} textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        Dos caminos de par independientes · sin engranaje de sincronía
      </text>
    </svg>
  );
}

export function PhaseSchematic() {
  const lobe = (cx: number, cy: number, rot: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 48; i++) {
      const t = (i / 48) * Math.PI * 2;
      const r = 22 + 8 * Math.cos(2 * (t - rot));
      pts.push(`${cx + r * Math.cos(t)},${cy + r * Math.sin(t)}`);
    }
    return pts.join(" ");
  };

  return (
    <svg viewBox="0 0 320 150" className="h-auto w-full" aria-label="Faseo 90 grados">
      <polygon points={lobe(110, 78, 0)} className="fill-primary/15 stroke-primary" strokeWidth="1.4" />
      <polygon points={lobe(210, 78, Math.PI / 2)} className="fill-ok/15 stroke-ok" strokeWidth="1.4" />
      <circle cx="110" cy="78" r="4" className="fill-primary" />
      <circle cx="210" cy="78" r="4" className="fill-ok" />
      <line x1="110" y1="78" x2="210" y2="78" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
      <text x="160" y="24" textAnchor="middle" className="fill-foreground" fontSize="11">
        Perfil bilobal · desfase 90°
      </text>
      <text x="110" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        Eje L · 0°
      </text>
      <text x="210" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        Eje R · 90°
      </text>
    </svg>
  );
}
