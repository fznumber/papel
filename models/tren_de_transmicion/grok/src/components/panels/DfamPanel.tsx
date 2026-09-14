import { GEARS, SPEC } from "@/lib/design";

const PRINTS = [
  {
    file: "housing_A.stl",
    role: "Mitad locadora",
    set: "6 paredes, 40 % gyroid, bores −0.2 mm",
  },
  {
    file: "housing_B.stl",
    role: "Tapa holgada",
    set: "No localiza rodamientos. Solo cubre.",
  },
  {
    file: "pinion_Z18.stl",
    role: "Piñón distribuidor",
    set: "Eje vertical, 100 % infill, herringbone",
  },
  {
    file: "compound_LR.stl",
    role: "Corona Z54 + piñón Z16",
    set: "Pieza única. Dos unidades, piñón en plano opuesto.",
  },
  {
    file: "hub_clamp.stl",
    role: "Abrazadera de fase (prototipo)",
    set: "Sustituir por acero en servicio. Casquillo Ø12.",
  },
];

export function DfamPanel() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Manufactura
        </p>
        <h2 className="text-xl font-medium tracking-tight">DFAM para PETG-CF</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          El plástico se ablanda a ~{SPEC.petgSofteningC} °C. El barril va aislado de la caja
          (junta 3 mm + placa metálica). Los engranajes de salida, a módulo {GEARS.output.m} y{" "}
          {GEARS.output.face} mm de cara, se especifican en acero para el par de régimen.
        </p>
      </header>

      <section className="space-y-2">
        <h3 className="text-sm font-medium">Reglas FDM</h3>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>Holgura de centros +{SPEC.backlashAllowance} mm. No hiperestático.</li>
          <li>Una sola mitad localiza cada rodamiento. La tapa lleva holgura.</li>
          <li>Insertos M3/M4 heat-set. Nunca rosca directa bajo carga cíclica.</li>
          <li>Herringbone en PETG: cancela empuje de hélice y sube el contact ratio.</li>
          <li>Boquilla 0.4, capa 0.2, 250 °C / cama 80 °C, filamento seco, recinto cerrado.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium">Archivos a imprimir</h3>
        <ul className="divide-y divide-border overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
          {PRINTS.map((row) => (
            <li key={row.file} className="px-3 py-2.5">
              <p className="font-mono text-xs text-primary">{row.file}</p>
              <p className="text-sm">{row.role}</p>
              <p className="text-xs text-muted-foreground">{row.set}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium">Secuencia de montaje</h3>
        <ol className="list-decimal space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
          <li>Prensar 6001 en housing A. Calentar insertos.</li>
          <li>Montar adaptadores, collares y 51102 contra la placa de reacción.</li>
          <li>Apilar engranajes de salida en planos z=40 y z=60. Abrazadera suelta.</li>
          <li>Engranar compuestos y piñón. Verificar dos caminos, mismo sentido.</li>
          <li>Tapa B. Motor y acoplamiento.</li>
          <li>Insertar tornillos, barrer hasta 90°, apretar fase. Engrasar EP2.</li>
        </ol>
      </section>
    </div>
  );
}
