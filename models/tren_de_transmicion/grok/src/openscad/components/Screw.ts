/**
 * TwinLock-253 - Componente Tornillo Extrusor para OpenSCAD
 * Genera código OpenSCAD de tornillos bilobe
 */

import { PARAMS } from "../utils/parameters";

/**
 * Genera código OpenSCAD para tornillo extrusor bilobe
 */
export function generateBilobeScrew(position: [number, number, number] = [0, 0, 0]): string {
  const { doOuter, diInner, pitch, length } = PARAMS.SCREW;
  const r0 = (doOuter + diInner) / 4; // Radio medio
  const amp = (doOuter - diInner) / 4; // Amplitud

  return `
// Tornillo extrusor bilobe
// do: ${doOuter}mm, di: ${diInner}mm, paso: ${pitch}mm
translate([${position[0]}, ${position[1]}, ${position[2]}])
  rotate([90, 0, 0])
    linear_extrude(height = ${length}, twist = ${length / pitch * 360}, $fn = 48) {
      // Sección transversal bilobe
      polygon(points = [
        for (i = [0:47])
          let(theta = i * 360 / 48)
          let(r = ${r0} + ${amp} * cos(2 * theta))
          [r * cos(theta), r * sin(theta)]
      ]);
    }`;
}

/**
 * Genera ambos tornillos extrusores del TwinLock-253
 */
export function generateAllScrews(): string {
  const { XY, POSITIONS, SCREW } = PARAMS;

  let code = `
// ============================================
// TORNILLOS EXTRUSORES
// ============================================`;

  // Tornillo L
  code += generateBilobeScrew([
    XY.outL,
    0,
    POSITIONS.thrustPlate - SCREW.length,
  ]);

  // Tornillo R
  code += generateBilobeScrew([
    XY.outR,
    0,
    POSITIONS.thrustPlate - SCREW.length,
  ]);

  return code;
}
