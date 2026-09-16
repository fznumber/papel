/**
 * TwinLock-253 - Componente Ejes para OpenSCAD
 * Genera código OpenSCAD de ejes cuadrados y adaptadores
 */

import { PARAMS } from "../utils/parameters";

/**
 * Genera código OpenSCAD para eje cuadrado
 */
export function generateSquareShaft(
  length: number,
  position: [number, number, number] = [0, 0, 0],
  name: string = "Eje cuadrado"
): string {
  const size = PARAMS.SHAFT_SQUARE - 0.15; // Tolerancia para impresión 3D

  return `
// ${name} - ${length}mm
translate([${position[0]}, ${position[1]}, ${position[2]}])
  cube([${size}, ${size}, ${length}], center = true);`;
}

/**
 * Genera código OpenSCAD para acople motor
 */
export function generateMotorCoupling(position: [number, number, number] = [0, 0, 0]): string {
  const squareSize = PARAMS.SHAFT_SQUARE + 0.2; // Tolerancia

  return `
// Acople motor → eje cuadrado
translate([${position[0]}, ${position[1]}, ${position[2]}])
  difference() {
    cube([10, 10, 10], center = true);
    // Hueco para eje motor (8mm)
    cylinder(d = 8.2, h = 12, center = true, $fn = 40);
    // Hueco cuadrado para eje de entrada
    translate([0, 0, -1])
      cube([${squareSize}, ${squareSize}, 12], center = false);
  }`;
}

/**
 * Genera todos los ejes del TwinLock-253
 */
export function generateAllShafts(): string {
  const { XY, POSITIONS } = PARAMS;

  let code = `
// ============================================
// EJES Y ACOPLES
// ============================================`;

  // Eje cuadrado de entrada
  code += generateSquareShaft(
    56,
    [0, XY.inputY, POSITIONS.distribution + 28],
    "Eje entrada (hacia motor)"
  );

  // Eje cuadrado compound L
  code += generateSquareShaft(
    70,
    [XY.cmpL, 0, POSITIONS.distribution],
    "Eje compound L"
  );

  // Eje cuadrado compound R
  code += generateSquareShaft(
    70,
    [XY.cmpR, 0, POSITIONS.distribution],
    "Eje compound R"
  );

  // Eje cuadrado salida L
  code += generateSquareShaft(
    130,
    [XY.outL, 0, 0],
    "Eje salida L"
  );

  // Eje cuadrado salida R
  code += generateSquareShaft(
    130,
    [XY.outR, 0, 0],
    "Eje salida R"
  );

  // Acople motor
  code += generateMotorCoupling([0, XY.inputY, POSITIONS.distribution - 45]);

  return code;
}
