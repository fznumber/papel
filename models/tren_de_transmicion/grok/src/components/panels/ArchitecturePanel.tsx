import { PhaseSchematic, SplitPowerSchematic } from "@/components/diagrams/SplitPowerSchematic";
import { Badge } from "@/components/ui/badge";
import { GEARS, POS, SPEC, SPLIT_RATIO } from "@/lib/design";
import { fmtMm } from "@/lib/utils";

export function ArchitecturePanel() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Topología
        </p>
        <h2 className="text-xl font-medium tracking-tight">Split-power en H, salidas escalonadas</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          El piñón distribuidor Z{GEARS.input.z} engrana a la vez las dos coronas Z{GEARS.crown.z}.
          Cada camino lleva ~50 % del par hasta su propio engranaje de salida. Los dos ejes
          cuadrados no se empujan entre sí: no hay single point of failure.
        </p>
      </header>

      <div className="rounded-xl bg-card p-3 shadow-[var(--shadow-border)]">
        <SplitPowerSchematic />
      </div>

      <dl className="grid grid-cols-2 gap-3">
        <Spec k="Distancia entre centros" v={fmtMm(SPEC.centerDistance)} />
        <Spec k="Relación split" v={`${SPLIT_RATIO.toFixed(0)}:1`} />
        <Spec k="Relación entre tornillos" v="1:1 estricta" />
        <Spec k="Sentido" v="Co-rotante" />
        <Spec k="Módulo" v={`${GEARS.output.m} mm · evolvente 20°`} />
        <Spec k="Holgura FDM" v={`+${fmtMm(SPEC.backlashAllowance)} en CD`} />
      </dl>

      <section className="space-y-2">
        <h3 className="text-sm font-medium">Por qué no un piñón de sincronía</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Un engranaje pequeño entre los dos ejes a {fmtMm(SPEC.centerDistance)} transmitiría el 100 %
          de la carga de un tornillo al otro. Con 10–15 N·m combinados eso es un diente PETG
          condenado. Aquí cada salida recibe par desde el origen: el piñón de entrada parte la
          potencia, y los engranajes de salida viven en planos axiales distintos (Z{GEARS.output.z},
          PD {fmtMm(GEARS.output.pd)}) para no interferir a {fmtMm(SPEC.centerDistance)}.
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Faseo 90°</h3>
          <Badge variant="ok">Phase lock</Badge>
        </div>
        <div className="rounded-xl bg-card p-3 shadow-[var(--shadow-border)]">
          <PhaseSchematic />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Un cuadrado de 1/4" tiene simetría de 90°, así que el hueco no puede "guardar" el
          desfase por sí solo. El adaptador de salida es una abrazadera: se monta el tren, se
          insertan los tornillos, se gira hasta el barrido self-wiping y se aprietan los
          prisioneros. El tren, no el operario, mantiene el lock bajo carga.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium">Cinemática</h3>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>Piñón entre ambas coronas → las dos giran igual (co-rotantes).</li>
          <li>Dos mallas por camino (par) → las salidas giran igual que el piñón, más lentas.</li>
          <li>
            Compuestos en x = {fmtMm(POS.cmpL.x)} y {fmtMm(POS.cmpR.x)}, piñón en y ={" "}
            {fmtMm(POS.input.y)}.
          </li>
          <li>Salida L en z = 40 mm, salida R en z = 60 mm. Nunca coplanares.</li>
        </ul>
      </section>
    </div>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-card px-3 py-2.5 shadow-[var(--shadow-border)]">
      <dt className="text-[11px] text-muted-foreground">{k}</dt>
      <dd className="font-mono text-sm tabular-nums">{v}</dd>
    </div>
  );
}
