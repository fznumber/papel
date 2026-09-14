import { Badge } from "@/components/ui/badge";
import { BOM, KIND_LABEL, PART_COLOR, type BomKind } from "@/lib/bom";
import { cn } from "@/lib/utils";
import { useStudio } from "@/store/studio";

const ORDER: BomKind[] = ["rodamiento", "engranaje", "eje", "chasis", "motor", "fijacion"];

export function BomPanel() {
  const selectedId = useStudio((s) => s.selectedId);
  const setSelectedId = useStudio((s) => s.setSelectedId);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Lista de materiales
        </p>
        <h2 className="text-xl font-medium tracking-tight">Hardware comercial + FDM</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Pulsa una fila para resaltarla en el modelo. Las piezas críticas no se imprimen: se
          compran.
        </p>
      </header>

      {ORDER.map((kind) => {
        const items = BOM.filter((i) => i.kind === kind);
        return (
          <section key={kind} className="space-y-2">
            <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {KIND_LABEL[kind]}
            </h3>
            <ul className="space-y-1.5">
              {items.map((item) => {
                const active = selectedId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(active ? null : item.id)}
                      className={cn(
                        "w-full rounded-lg px-3 py-2.5 text-left transition-colors",
                        active ? "bg-secondary" : "bg-card hover:bg-secondary/70",
                      )}
                      style={{ boxShadow: "var(--shadow-border)" }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="flex items-center gap-2 text-sm font-medium">
                          <span
                            className="inline-block size-2.5 shrink-0 rounded-full"
                            style={{ background: PART_COLOR[item.id] ?? "var(--color-steel)" }}
                            aria-hidden
                          />
                          <span className="font-mono text-muted-foreground">{item.qty}×</span>{" "}
                          {item.name}
                        </p>
                        {item.critical ? <Badge variant="warn">crítico</Badge> : null}
                      </div>
                      <p className="mt-0.5 font-mono text-[11px] text-primary">{item.spec}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {item.note}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
