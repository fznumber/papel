/**
 * TwinLock-253 - Componente Carcasa para OpenSCAD
 * Genera código OpenSCAD de la carcasa clamshell
 */

import { PARAMS } from "../utils/parameters";

/**
 * Genera código OpenSCAD para la carcasa superior
 */
export function generateHousingUpper(position: [number, number, number] = [0, 0, 0]): string {
  const { width, height, depth } = PARAMS.HOUSING;

  return `
// Carcasa mitad superior
translate([${position[0]}, ${position[1]}, ${position[2]}])
  difference() {
    // Caja externa
    translate([0, 0, 0])
      cube([
        ${width * 0.92}, 
        ${height * 0.1},  
        ${depth * 0.72}
      ], center = true);
    
    // Cortes internos para componentes
    translate([0, 0, -5])
      cube([${width * 0.8}, ${height * 0.15}, ${depth * 0.6}], center = true);
  }`;
}

/**
 * Genera código OpenSCAD para la carcasa inferior
 */
export function generateHousingLower(position: [number, number, number] = [0, 0, 0]): string {
  const { width, height, depth } = PARAMS.HOUSING;

  return `
// Carcasa mitad inferior
translate([${position[0]}, ${position[1]}, ${position[2]}])
  difference() {
    // Caja externa
    cube([
      ${width * 0.92}, 
      ${height * 0.12},  
      ${depth * 0.72}
    ], center = true);
    
    // Cortes internos
    translate([0, 0, 5])
      cube([${width * 0.8}, ${height * 0.15}, ${depth * 0.6}], center = true);
  }`;
}

/**
 * Genera la carcasa completa del TwinLock-253
 */
export function generateHousing(): string {
  const { POSITIONS } = PARAMS;

  let code = `
// ============================================
// CARCASA
// ============================================`;

  code += generateHousingUpper([0, 0, POSITIONS.housingEnd]);
  code += generateHousingLower([0, 0, POSITIONS.housingEnd + 30]);

  return code;
}
