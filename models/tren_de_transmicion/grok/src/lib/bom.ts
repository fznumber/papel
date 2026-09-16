import { BEARINGS, GEARS, SPEC } from "@/lib/design";

export type BomKind = "rodamiento" | "engranaje" | "eje" | "chasis" | "motor" | "fijacion";

export interface BomItem {
  id: string;
  qty: number;
  kind: BomKind;
  name: string;
  spec: string;
  source: string;
  note: string;
  critical?: boolean;
}

export const BOM: BomItem[] = [
  {
    id: "thrust-51102",
    qty: 2,
    kind: "rodamiento",
    name: "Rodamiento de empuje axial",
    spec: `${BEARINGS.thrust.spec}  ${BEARINGS.thrust.d}×${BEARINGS.thrust.D}×${BEARINGS.thrust.T}`,
    source: "SKF / NSK / generic 51102",
    note: "Descarga 2 kN por eje contra la placa metálica. No contra PETG.",
    critical: true,
  },
  {
    id: "radial-6001",
    qty: 4,
    kind: "rodamiento",
    name: "Rodamiento radial rígido",
    spec: `${BEARINGS.radial.spec}  ${BEARINGS.radial.d}×${BEARINGS.radial.D}×${BEARINGS.radial.B}`,
    source: "SKF 6001-2Z",
    note: "Dos por eje (ante y post engranajes). Mantienen CD 25.3 mm.",
    critical: true,
  },
  {
    id: "gear-out-steel",
    qty: 2,
    kind: "engranaje",
    name: "Engranaje de salida",
    spec: `Z${GEARS.output.z}  m${GEARS.output.m}  b${GEARS.output.face}  acero 20MnCr5`,
    source: "Corte / SDP-SI / Misumi custom",
    note: "Planos axiales distintos. No engranan entre sí. Obligatorio en acero ≥6 N·m/eje.",
    critical: true,
  },
  {
    id: "gear-input",
    qty: 1,
    kind: "engranaje",
    name: "Piñón distribuidor",
    spec: `Z${GEARS.input.z}  m${GEARS.input.m}  b${GEARS.input.face}  herringbone PETG-CF`,
    source: "FDM, eje vertical, 100 % relleno",
    note: "Engrana ambas coronas a la vez. Divide el par 50/50.",
  },
  {
    id: "compound",
    qty: 2,
    kind: "engranaje",
    name: "Compuesto corona+piñón",
    spec: `Z${GEARS.crown.z} + Z${GEARS.cmpPinion.z}  m${GEARS.input.m}  pieza única`,
    source: "FDM PETG-CF o PA12-CF",
    note: "Izquierdo y derecho. Piñones en planos axiales distintos.",
  },
  {
    id: "adapter",
    qty: 2,
    kind: "eje",
    name: "Adaptador de salida",
    spec: `Hueco □${SPEC.shaftSquare} × 18 · muñón Ø12 / Ø15`,
    source: "Torneado AISI 303, o híbrido casquillo metálico",
    note: "Abrazadera de fase: el hueco cuadrado se clampa a 90° en el montaje.",
    critical: true,
  },
  {
    id: "square-rod",
    qty: 2,
    kind: "eje",
    name: "Varilla cuadrada (tornillos)",
    spec: `□ 1/4" (6.35 mm) acero, ya en fabricación`,
    source: "Interfaz bloqueada del tornillo",
    note: "El tren no altera esta geometría. Solo la acciona.",
  },
  {
    id: "collar",
    qty: 4,
    kind: "eje",
    name: "Collarín de empuje",
    spec: "Ø12 / Ø15 con tornillo M4",
    source: "McMaster / Misumi",
    note: "Bloquean el anillo interior del 51102 contra el adaptador.",
  },
  {
    id: "thrust-plate",
    qty: 1,
    kind: "chasis",
    name: "Placa de reacción axial",
    spec: "AISI 304 2 mm ó Al 6082 3 mm, láser",
    source: "Corte láser local",
    note: "Atornillada al barril. El PETG jamás toma el thrust.",
    critical: true,
  },
  {
    id: "motor-nema",
    qty: 1,
    kind: "motor",
    name: "Motor (opción A)",
    spec: "NEMA 23 2–3 N·m, eje Ø8",
    source: "Stepperonline / local",
    note: "Acoplamiento directo al piñón: 6:1, ~70 rpm, ~10 N·m. Recomendado.",
  },
  {
    id: "motor-775",
    qty: 1,
    kind: "motor",
    name: "Motor (opción B)",
    spec: "DC 775 12 V + planetario 10:1",
    source: "Comercial 36/42 mm planetary",
    note: "Economía / alta rpm. ~100 rpm tornillo, ~10 N·m continuo.",
  },
  {
    id: "coupling",
    qty: 1,
    kind: "fijacion",
    name: "Acoplamiento motor",
    spec: "Jaw 8 mm a 8 mm, o brida planetario NEMA 23",
    source: "Misumi / Amazon industrial",
    note: "Flexible para desalineación FDM.",
  },
  {
    id: "inserts",
    qty: 24,
    kind: "fijacion",
    name: "Insertos roscados",
    spec: "M3 y M4 brass heat-set",
    source: "CNC Kitchen / Ruthex",
    note: "Nunca roscar directo en PETG bajo carga cíclica.",
  },
  {
    id: "screws",
    qty: 1,
    kind: "fijacion",
    name: "Tornillería",
    spec: "ISO 4762 M3×12 / M4×16 / M4×20",
    source: "Caja métrica 12.9",
    note: "Incluye prisioneros M4 para collares y fase.",
  },
  {
    id: "grease",
    qty: 1,
    kind: "fijacion",
    name: "Grasa",
    spec: "Litio EP2, compatible PETG",
    source: "SKF LGMT 2 o similar",
    note: "Sin solventes aromáticos. Re-engrase cada campaña.",
  },
];

export const KIND_LABEL: Record<BomKind, string> = {
  rodamiento: "Rodamientos",
  engranaje: "Engranajes",
  eje: "Ejes y adaptadores",
  chasis: "Chasis",
  motor: "Motorización",
  fijacion: "Fijación y fluido",
};

/** CAD part colors — one hue per piece type, shared by BOM + 3D. */
export const PART_COLOR: Record<string, string> = {
  "gear-input": "#d4a84b",
  "compound": "#2f8f7a",
  "compound-crown": "#2f8f7a",
  "compound-pinion": "#c46b3a",
  "gear-out-steel": "#6a8caf",
  adapter: "#c9b896",
  "square-rod": "#e0c9a0",
  collar: "#b89b6a",
  "thrust-51102": "#b4554a",
  "radial-6001": "#4e7a96",
  "thrust-plate": "#d5dbe1",
  "motor-nema": "#6a6480",
  "motor-775": "#4d5c68",
  coupling: "#8a7a55",
  inserts: "#9a8f6c",
  screws: "#7d838c",
  grease: "#6d7a55",
};

export const PART_LEGEND: { id: string; label: string }[] = [
  { id: "gear-input", label: "Z18" },
  { id: "compound", label: "Z54" },
  { id: "compound-pinion", label: "Z16" },
  { id: "gear-out-steel", label: "Z24" },
  { id: "adapter", label: "Adapt." },
  { id: "square-rod", label: "Tornillo" },
  { id: "thrust-51102", label: "51102" },
  { id: "radial-6001", label: "6001" },
  { id: "thrust-plate", label: "Placa" },
  { id: "housing", label: "Caja" },
  { id: "motor-nema", label: "Motor" },
];

