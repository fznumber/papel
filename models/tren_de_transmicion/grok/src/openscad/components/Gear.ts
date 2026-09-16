/**
 * TwinLock-253 - Componente Engranaje para OpenSCAD
 * Genera código OpenSCAD de engranajes evolventes
 */

import { PARAMS } from "../utils/parameters";

interface GearProps {
  teeth: number;
  module: number;
  face: number;
  squareBore?: number;
  circularBore?: number;
  position?: [number, number, number];
  name?: string;
}

/**
 * Genera código OpenSCAD para un engranaje evolvente
 */
export function generateGear({
  teeth,
  module,
  face,
  squareBore,
  circularBore = 0,
  position = [0, 0, 0],
  name = "gear",
}: GearProps): string {
  const circularPitch = (Math.PI * module).toFixed(4);
  const bore = squareBore ? 0 : circularBore;

  let code = `
// ${name} - Z${teeth} m${module}
translate([${position[0]}, ${position[1]}, ${position[2]}])
  difference() {
    gear(
      number_of_teeth = ${teeth},
      circular_pitch = ${circularPitch},
      pressure_angle = ${PARAMS.PRESSURE_ANGLE},
      gear_thickness = ${face},
      rim_thickness = ${face},
      hub_thickness = 0,
      bore_diameter = ${bore},
      backlash = ${PARAMS.BACKLASH}
    );`;

  if (squareBore) {
    const size = squareBore + 0.2; // Tolerancia para impresión 3D
    code += `
    // Hueco cuadrado ${squareBore}mm
    cube([${size}, ${size}, ${face + 2}], center = true);`;
  }

  code += `
  }`;

  return code;
}

/**
 * Genera todos los engranajes del TwinLock-253
 */
export function generateAllGears(): string {
  const { GEARS } = PARAMS;
  const { XY, POSITIONS } = PARAMS;

  let code = `
// ============================================
// ENGRANAJES
// ============================================`;

  // Z18 - Entranje de entrada
  code += generateGear({
    teeth: GEARS.input.z,
    module: GEARS.input.m,
    face: GEARS.input.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [0, XY.inputY, POSITIONS.distribution],
    name: "Engranaje Entrada Z18",
  });

  // Z54 - Corona compound L
  code += generateGear({
    teeth: GEARS.crown.z,
    module: GEARS.crown.m,
    face: GEARS.crown.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.cmpL, 0, POSITIONS.distribution],
    name: "Corona Compound L Z54",
  });

  // Z54 - Corona compound R
  code += generateGear({
    teeth: GEARS.crown.z,
    module: GEARS.crown.m,
    face: GEARS.crown.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.cmpR, 0, POSITIONS.distribution],
    name: "Corona Compound R Z54",
  });

  // Z10 - Piñón compound L
  code += generateGear({
    teeth: GEARS.pinion.z,
    module: GEARS.pinion.m,
    face: GEARS.pinion.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.cmpL, 0, POSITIONS.outputGearL],
    name: "Piñón Compound L Z10",
  });

  // Z10 - Piñón compound R
  code += generateGear({
    teeth: GEARS.pinion.z,
    module: GEARS.pinion.m,
    face: GEARS.pinion.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.cmpR, 0, POSITIONS.outputGearR],
    name: "Piñón Compound R Z10",
  });

  // Z20 - Engranaje salida L
  code += generateGear({
    teeth: GEARS.output.z,
    module: GEARS.output.m,
    face: GEARS.output.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.outL, 0, POSITIONS.outputGearL],
    name: "Engranaje Salida L Z20",
  });

  // Z20 - Engranaje salida R
  code += generateGear({
    teeth: GEARS.output.z,
    module: GEARS.output.m,
    face: GEARS.output.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.outR, 0, POSITIONS.outputGearR],
    name: "Engranaje Salida R Z20",
  });

  return code;
}
