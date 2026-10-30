/**
 * TwinLock-253 - Componente Engranaje para OpenSCAD
 * Genera código OpenSCAD de engranajes evolventes
 */

import { PARAMS } from "../utils/parameters";
import { buildGearShape } from "../../lib/gear-geometry";
import { ANGLES, meshAngle } from "../../lib/design";

interface GearProps {
  teeth: number;
  module: number;
  face: number;
  squareBore?: number;
  circularBore?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
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
  rotation = [0, 0, 0],
  name = "gear",
}: GearProps): string {
  // Use exactly the same shape generator as the 3D visualizer
  const shape = buildGearShape(teeth, module, PARAMS.PRESSURE_ANGLE, PARAMS.BACKLASH, 0, 0);
  
  // Extract points (ignoring holes since we will cut them using OpenSCAD difference)
  const points = shape.getPoints();
  const pointsStr = points.map(p => `[${p.x.toFixed(4)}, ${p.y.toFixed(4)}]`).join(", ");

  let code = `
// ${name} - Z${teeth} m${module} (Custom Polygon Extrusion)
translate([${position[0]}, ${position[1]}, ${position[2]}])
  rotate([${rotation[0]}, ${rotation[1]}, ${rotation[2]}])
    difference() {
      translate([0, 0, -${face / 2}])
        linear_extrude(height = ${face}, center = false, convexity = 10)
          polygon(points=[${pointsStr}]);`;

  if (squareBore) {
    const size = squareBore + 0.2; // Tolerancia para impresión 3D
    code += `
    // Hueco cuadrado ${squareBore}mm
    cube([${size}, ${size}, ${face + 2}], center = true);`;
  } else if (circularBore > 0) {
    code += `
    // Hueco circular
    cylinder(d = ${circularBore}, h = ${face + 2}, center = true, $fn = 50);`;
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

  // Calcular rotaciones para el mallado correcto (igual que la animación)
  const rad2deg = 180 / Math.PI;
  const a = 0;
  const inRot = a;
  const cmpLRot = meshAngle(a, GEARS.input.z, GEARS.crown.z, ANGLES.inToCmpL);
  const cmpRRot = meshAngle(a, GEARS.input.z, GEARS.crown.z, ANGLES.inToCmpR);
  const outLRot = meshAngle(cmpLRot, GEARS.cmpPinion.z, GEARS.output.z, ANGLES.cmpLToOutL);
  const outRRot = meshAngle(cmpRRot, GEARS.cmpPinion.z, GEARS.output.z, ANGLES.cmpRToOutR) + Math.PI / 2;

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
    rotation: [0, 0, inRot * rad2deg],
    name: "Engranaje Entrada Z18",
  });

  // Z54 - Corona compound L
  code += generateGear({
    teeth: GEARS.crown.z,
    module: GEARS.crown.m,
    face: GEARS.crown.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.cmpL, 0, POSITIONS.distribution],
    rotation: [0, 0, cmpLRot * rad2deg],
    name: "Corona Compound L Z54",
  });

  // Z54 - Corona compound R
  code += generateGear({
    teeth: GEARS.crown.z,
    module: GEARS.crown.m,
    face: GEARS.crown.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.cmpR, 0, POSITIONS.distribution],
    rotation: [0, 0, cmpRRot * rad2deg],
    name: "Corona Compound R Z54",
  });

  // Z10 - Piñón compound L
  code += generateGear({
    teeth: GEARS.cmpPinion.z,
    module: GEARS.cmpPinion.m,
    face: GEARS.cmpPinion.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.cmpL, 0, POSITIONS.outputGearL],
    rotation: [0, 0, cmpLRot * rad2deg],
    name: "Piñón Compound L Z16",
  });

  // Z10 - Piñón compound R
  code += generateGear({
    teeth: GEARS.cmpPinion.z,
    module: GEARS.cmpPinion.m,
    face: GEARS.cmpPinion.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.cmpR, 0, POSITIONS.outputGearR],
    rotation: [0, 0, cmpRRot * rad2deg],
    name: "Piñón Compound R Z16",
  });

  // Z20 - Engranaje salida L
  code += generateGear({
    teeth: GEARS.output.z,
    module: GEARS.output.m,
    face: GEARS.output.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.outL, 0, POSITIONS.outputGearL],
    rotation: [0, 0, outLRot * rad2deg],
    name: "Engranaje Salida L Z24",
  });

  // Z20 - Engranaje salida R
  code += generateGear({
    teeth: GEARS.output.z,
    module: GEARS.output.m,
    face: GEARS.output.face,
    squareBore: PARAMS.SHAFT_SQUARE,
    position: [XY.outR, 0, POSITIONS.outputGearR],
    rotation: [0, 0, outRRot * rad2deg],
    name: "Engranaje Salida R Z24",
  });

  return code;
}
