/**
 * TwinLock-253 - Componente Rodamiento para OpenSCAD
 * Genera código OpenSCAD de rodamientos 51102 y 6001
 */

import { PARAMS } from "../utils/parameters";

/**
 * Genera código OpenSCAD para rodamiento de empuje 51102
 */
export function generateThrustBearing(position: [number, number, number] = [0, 0, 0]): string {
  const { thrust } = PARAMS.BEARINGS;

  return `
// Rodamiento de empuje ${thrust.spec}
translate([${position[0]}, ${position[1]}, ${position[2]}])
  union() {
    // Anillo exterior
    difference() {
      cylinder(d = ${thrust.D}, h = ${thrust.T}, $fn = 60);
      translate([0, 0, -1])
        cylinder(d = ${thrust.d + 2}, h = ${thrust.T + 2}, $fn = 60);
    }
    
    // Anillo interior
    difference() {
      cylinder(d = ${thrust.d + 5}, h = ${thrust.T}, $fn = 60);
      translate([0, 0, -1])
        cylinder(d = ${thrust.d}, h = ${thrust.T + 2}, $fn = 60);
    }
    
    // Bolas (10 bolas)
    for (i = [0:9]) {
      rotate([0, 0, i * 36])
        translate([${thrust.d / 2 + 2.5}, 0, ${thrust.T / 2}])
          sphere(d = 2.3, $fn = 20);
    }
  }`;
}

/**
 * Genera código OpenSCAD para rodamiento radial 6001-2Z
 */
export function generateRadialBearing(position: [number, number, number] = [0, 0, 0]): string {
  const { radial } = PARAMS.BEARINGS;

  return `
// Rodamiento radial ${radial.spec}
translate([${position[0]}, ${position[1]}, ${position[2]}])
  union() {
    // Anillo exterior
    difference() {
      cylinder(d = ${radial.D}, h = ${radial.B}, $fn = 60);
      translate([0, 0, -1])
        cylinder(d = ${radial.d + 3}, h = ${radial.B + 2}, $fn = 60);
    }
    
    // Anillo interior
    difference() {
      cylinder(d = ${radial.d + 4}, h = ${radial.B}, $fn = 60);
      translate([0, 0, -1])
        cylinder(d = ${radial.d}, h = ${radial.B + 2}, $fn = 60);
    }
    
    // Bolas (9 bolas)
    for (i = [0:8]) {
      rotate([0, 0, i * 40])
        translate([${radial.d / 2 + 2}, 0, ${radial.B / 2}])
          sphere(d = 2, $fn = 20);
    }
  }`;
}

/**
 * Genera todos los rodamientos del TwinLock-253
 */
export function generateAllBearings(): string {
  const { XY, POSITIONS } = PARAMS;

  let code = `
// ============================================
// RODAMIENTOS
// ============================================`;

  // Rodamiento de empuje L
  code += generateThrustBearing([XY.outL, 0, POSITIONS.thrustBearing]);

  // Rodamiento de empuje R
  code += generateThrustBearing([XY.outR, 0, POSITIONS.thrustBearing]);

  // Rodamiento radial frontal L
  code += generateRadialBearing([XY.outL, 0, POSITIONS.frontRadial]);

  // Rodamiento radial frontal R
  code += generateRadialBearing([XY.outR, 0, POSITIONS.frontRadial]);

  return code;
}
