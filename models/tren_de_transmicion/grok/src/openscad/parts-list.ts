/**
 * TwinLock-253 - Lista de componentes disponibles para exportar
 */

export interface PartInfo {
  id: string;
  name: string;
  category: "gear" | "bearing" | "shaft" | "screw" | "housing" | "other";
  description: string;
  quantity: number;
  printable: boolean;
}

export const AVAILABLE_PARTS: PartInfo[] = [
  // Engranajes
  {
    id: "gear-z18",
    name: "Engranaje Z18",
    category: "gear",
    description: "Piñón de entrada, módulo 1.5, 18 dientes",
    quantity: 1,
    printable: true,
  },
  {
    id: "gear-z54-l",
    name: "Corona Z54 L",
    category: "gear",
    description: "Corona compound lado izquierdo, módulo 1.5, 54 dientes",
    quantity: 1,
    printable: true,
  },
  {
    id: "gear-z54-r",
    name: "Corona Z54 R",
    category: "gear",
    description: "Corona compound lado derecho, módulo 1.5, 54 dientes",
    quantity: 1,
    printable: true,
  },
  {
    id: "gear-z10-l",
    name: "Piñón Z10 L",
    category: "gear",
    description: "Piñón compound lado izquierdo, módulo 0.5, 10 dientes",
    quantity: 1,
    printable: true,
  },
  {
    id: "gear-z10-r",
    name: "Piñón Z10 R",
    category: "gear",
    description: "Piñón compound lado derecho, módulo 0.5, 10 dientes",
    quantity: 1,
    printable: true,
  },
  {
    id: "gear-z20-l",
    name: "Engranaje Z20 L",
    category: "gear",
    description: "Engranaje de salida lado izquierdo, módulo 0.5, 20 dientes",
    quantity: 1,
    printable: true,
  },
  {
    id: "gear-z20-r",
    name: "Engranaje Z20 R",
    category: "gear",
    description: "Engranaje de salida lado derecho, módulo 0.5, 20 dientes",
    quantity: 1,
    printable: true,
  },

  // Rodamientos
  {
    id: "bearing-51102-l",
    name: "Rodamiento 51102 L",
    category: "bearing",
    description: "Rodamiento de empuje lado izquierdo, 15×28×9mm",
    quantity: 1,
    printable: false,
  },
  {
    id: "bearing-51102-r",
    name: "Rodamiento 51102 R",
    category: "bearing",
    description: "Rodamiento de empuje lado derecho, 15×28×9mm",
    quantity: 1,
    printable: false,
  },
  {
    id: "bearing-6001-l",
    name: "Rodamiento 6001 L",
    category: "bearing",
    description: "Rodamiento radial lado izquierdo, 12×28×8mm",
    quantity: 1,
    printable: false,
  },
  {
    id: "bearing-6001-r",
    name: "Rodamiento 6001 R",
    category: "bearing",
    description: "Rodamiento radial lado derecho, 12×28×8mm",
    quantity: 1,
    printable: false,
  },

  // Ejes
  {
    id: "shaft-input",
    name: "Eje entrada",
    category: "shaft",
    description: "Eje cuadrado 1/4\" (6.35mm), largo 56mm",
    quantity: 1,
    printable: true,
  },
  {
    id: "shaft-compound-l",
    name: "Eje compound L",
    category: "shaft",
    description: "Eje cuadrado 1/4\" (6.35mm), largo 70mm",
    quantity: 1,
    printable: true,
  },
  {
    id: "shaft-compound-r",
    name: "Eje compound R",
    category: "shaft",
    description: "Eje cuadrado 1/4\" (6.35mm), largo 70mm",
    quantity: 1,
    printable: true,
  },
  {
    id: "shaft-output-l",
    name: "Eje salida L",
    category: "shaft",
    description: "Eje cuadrado 1/4\" (6.35mm), largo 130mm",
    quantity: 1,
    printable: true,
  },
  {
    id: "shaft-output-r",
    name: "Eje salida R",
    category: "shaft",
    description: "Eje cuadrado 1/4\" (6.35mm), largo 130mm",
    quantity: 1,
    printable: true,
  },
  {
    id: "coupling-motor",
    name: "Acople motor",
    category: "shaft",
    description: "Acople motor a eje cuadrado, 10×10×10mm",
    quantity: 1,
    printable: true,
  },

  // Tornillos
  {
    id: "screw-l",
    name: "Tornillo extrusor L",
    category: "screw",
    description: "Tornillo bilobe, Ø30.36mm, largo 110mm",
    quantity: 1,
    printable: false,
  },
  {
    id: "screw-r",
    name: "Tornillo extrusor R",
    category: "screw",
    description: "Tornillo bilobe, Ø30.36mm, largo 110mm",
    quantity: 1,
    printable: false,
  },

  // Carcasa
  {
    id: "housing-upper",
    name: "Carcasa superior",
    category: "housing",
    description: "Mitad superior de la carcasa",
    quantity: 1,
    printable: true,
  },
  {
    id: "housing-lower",
    name: "Carcasa inferior",
    category: "housing",
    description: "Mitad inferior de la carcasa",
    quantity: 1,
    printable: true,
  },

  // Otros
  {
    id: "thrust-plate",
    name: "Placa de reacción",
    category: "other",
    description: "Placa de acero inox 72×48×3mm",
    quantity: 1,
    printable: false,
  },
];

export const PART_CATEGORIES = [
  { id: "gear", name: "Engranajes", color: "#3b82f6" },
  { id: "bearing", name: "Rodamientos", color: "#ef4444" },
  { id: "shaft", name: "Ejes y Acoples", color: "#22c55e" },
  { id: "screw", name: "Tornillos", color: "#f59e0b" },
  { id: "housing", name: "Carcasa", color: "#8b5cf6" },
  { id: "other", name: "Otros", color: "#6b7280" },
] as const;

/**
 * Obtener piezas por categoría
 */
export function getPartsByCategory(category: string): PartInfo[] {
  return AVAILABLE_PARTS.filter((p) => p.category === category);
}

/**
 * Obtener todas las categorías con conteo
 */
export function getCategoriesWithCount() {
  return PART_CATEGORIES.map((cat) => ({
    ...cat,
    count: getPartsByCategory(cat.id).length,
  }));
}
