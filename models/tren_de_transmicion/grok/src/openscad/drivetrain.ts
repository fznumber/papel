/**
 * TwinLock-253 - Generador de Tren de Transmisión
 * Archivo standalone que genera código OpenSCAD del tren completo
 * Sin dependencias externas (sin MCAD)
 */

// ============================================
// PARÁMETROS
// ============================================
const PARAMS = {
  MODULE: 1.5,
  PRESSURE_ANGLE: 25,
  BACKLASH: 0.18,
  SHAFT_SQUARE: 6.35,
  CENTER_DISTANCE: 25.3,

  GEARS: {
    input: { z: 18, m: 1.5, face: 14 },
    crown: { z: 54, m: 1.5, face: 14 },
    cmpPinion: { z: 16, m: 1.5, face: 16 },
    output: { z: 24, m: 1.5, face: 16 },
  },

  BEARINGS: {
    thrust: { d: 15, D: 28, T: 9 },
    radial: { d: 12, D: 28, B: 8 },
  },

  POSITIONS: {
    thrustPlate: 0,
    thrustBearing: 8,
    frontRadial: 22,
    outputGearL: 40,
    outputGearR: 60,
    distribution: 84,
  },

  XY: {
    outL: -12.65,
    outR: 12.65,
    cmpL: -48.65,
    cmpR: 48.65,
    inputY: 23.1,
  },
};

// ============================================
// MÓDULO: Engranaje Evolvente
// ============================================
function generateInvoluteGear(
  teeth: number,
  mod: number,
  thickness: number,
  squareBore: number,
  position: [number, number, number] = [0, 0, 0],
  rotation: [number, number, number] = [0, 0, 0],
  name: string = "Engranaje"
): string {
  const pitchR = (teeth * mod) / 2;
  const outR = pitchR + mod;
  const rootR = Math.max(pitchR - 1.25 * mod, pitchR * 0.45);
  const baseR = pitchR * Math.cos((PARAMS.PRESSURE_ANGLE * Math.PI) / 180);

  // Cálculo de ángulos
  const tOut = Math.sqrt((outR / baseR) ** 2 - 1);
  const tPitch = Math.sqrt(Math.max((pitchR / baseR) ** 2 - 1, 0.001));
  const pitchPtX = baseR * (Math.cos(tPitch) + tPitch * Math.sin(tPitch));
  const pitchPtY = baseR * (Math.sin(tPitch) - tPitch * Math.cos(tPitch));
  const pitchAng = Math.atan2(pitchPtY, pitchPtX);
  const halfTooth = Math.PI / teeth / 2 - PARAMS.BACKLASH / (2 * pitchR);
  const rotateToPitch = halfTooth + pitchAng;

  const rad2deg = 180 / Math.PI;
  const steps = 6;
  const pts: [number, number][] = [];

  for (let i = 0; i < teeth; i++) {
    const center = (i / teeth) * Math.PI * 2;

    // Punto raíz izquierdo
    pts.push([
      rootR * Math.cos(center - halfTooth * 1.15),
      rootR * Math.sin(center - halfTooth * 1.15),
    ]);

    // Evolvente izquierda
    for (let s = 0; s <= steps; s++) {
      const t = (tOut * s) / steps;
      const tEff = Math.max(t, 0.02);
      const px = baseR * (Math.cos(tEff) + tEff * Math.sin(tEff));
      const py = baseR * (Math.sin(tEff) - tEff * Math.cos(tEff));
      const ang = center - rotateToPitch;
      pts.push([px * Math.cos(ang) - py * Math.sin(ang), px * Math.sin(ang) + py * Math.cos(ang)]);
    }

    // Evolvente derecha (espejo)
    for (let s = steps; s >= 0; s--) {
      const t = (tOut * s) / steps;
      const tEff = Math.max(t, 0.02);
      const px = baseR * (Math.cos(tEff) + tEff * Math.sin(tEff));
      const py = -(baseR * (Math.sin(tEff) - tEff * Math.cos(tEff)));
      const ang = center + rotateToPitch;
      pts.push([px * Math.cos(ang) - py * Math.sin(ang), px * Math.sin(ang) + py * Math.cos(ang)]);
    }

    // Punto raíz derecho
    pts.push([
      rootR * Math.cos(center + halfTooth * 1.15),
      rootR * Math.sin(center + halfTooth * 1.15),
    ]);
  }

  const pointsStr = pts.map((p) => `[${p[0].toFixed(4)}, ${p[1].toFixed(4)}]`).join(", ");
  const boreSize = squareBore + 0.2;

  return `
// ${name} - Z${teeth} m${mod}
translate([${position[0]}, ${position[1]}, ${position[2]}])
  rotate([${rotation[0]}, ${rotation[1]}, ${rotation[2]}])
    difference() {
      translate([0, 0, -${thickness / 2}])
        linear_extrude(height = ${thickness}, center = false, convexity = 10)
          polygon(points=[${pointsStr}]);
      cube([${boreSize}, ${boreSize}, ${thickness + 2}], center = true);
    }`;
}

// ============================================
// MÓDULO: Rodamiento de Empuje 51102
// ============================================
function generateThrustBearing(position: [number, number, number]): string {
  const { thrust } = PARAMS.BEARINGS;
  return `
// Rodamiento de empuje 51102
translate([${position[0]}, ${position[1]}, ${position[2]}])
  union() {
    difference() {
      cylinder(d = ${thrust.D}, h = ${thrust.T}, $fn = 60);
      translate([0, 0, -1]) cylinder(d = ${thrust.d + 2}, h = ${thrust.T + 2}, $fn = 60);
    }
    difference() {
      cylinder(d = ${thrust.d + 5}, h = ${thrust.T}, $fn = 60);
      translate([0, 0, -1]) cylinder(d = ${thrust.d}, h = ${thrust.T + 2}, $fn = 60);
    }
    for (i = [0:9]) {
      rotate([0, 0, i * 36])
        translate([${thrust.d / 2 + 2.5}, 0, ${thrust.T / 2}])
          sphere(d = 2.3, $fn = 20);
    }
  }`;
}

// ============================================
// MÓDULO: Rodamiento Radial 6001
// ============================================
function generateRadialBearing(position: [number, number, number]): string {
  const { radial } = PARAMS.BEARINGS;
  return `
// Rodamiento radial 6001-2Z
translate([${position[0]}, ${position[1]}, ${position[2]}])
  union() {
    difference() {
      cylinder(d = ${radial.D}, h = ${radial.B}, $fn = 60);
      translate([0, 0, -1]) cylinder(d = ${radial.d + 3}, h = ${radial.B + 2}, $fn = 60);
    }
    difference() {
      cylinder(d = ${radial.d + 4}, h = ${radial.B}, $fn = 60);
      translate([0, 0, -1]) cylinder(d = ${radial.d}, h = ${radial.B + 2}, $fn = 60);
    }
    for (i = [0:8]) {
      rotate([0, 0, i * 40])
        translate([${radial.d / 2 + 2}, 0, ${radial.B / 2}])
          sphere(d = 2, $fn = 20);
    }
  }`;
}

// ============================================
// MÓDULO: Eje Cuadrado
// ============================================
function generateSquareShaft(
  length: number,
  position: [number, number, number],
  name: string = "Eje cuadrado"
): string {
  const size = PARAMS.SHAFT_SQUARE - 0.15;
  return `
// ${name} - ${length}mm
translate([${position[0]}, ${position[1]}, ${position[2]}])
  cube([${size}, ${size}, ${length}], center = true);`;
}

// ============================================
// MÓDULO: Acople Motor
// ============================================
function generateMotorCoupling(position: [number, number, number]): string {
  const squareSize = PARAMS.SHAFT_SQUARE + 0.2;
  return `
// Acople motor
translate([${position[0]}, ${position[1]}, ${position[2]}])
  difference() {
    cube([10, 10, 10], center = true);
    cylinder(d = 8.2, h = 12, center = true, $fn = 40);
    translate([0, 0, -1])
      cube([${squareSize}, ${squareSize}, 12], center = false);
  }`;
}

// ============================================
// FUNCIÓN PRINCIPAL: Genera todo el tren
// ============================================
export function generateDrivetrain(): string {
  const { GEARS, XY, POSITIONS } = PARAMS;
  const rad2deg = 180 / Math.PI;

  // Rotaciones (ángulo 0 para export estática)
  const inRot = 0;
  const cmpLRot = 0;
  const cmpRRot = 0;
  const outLRot = 0;
  const outRRot = Math.PI / 2; // 90° fase entre salidas

  let code = `// ============================================
// TwinLock-253 - Tren de Transmisión Completo
// Generado automáticamente
// ============================================

$fn = 50;

// ============================================
// PARÁMETROS
// ============================================
MODULE = ${PARAMS.MODULE};
PRESSURE_ANGLE = ${PARAMS.PRESSURE_ANGLE};
BACKLASH = ${PARAMS.BACKLASH};
SHAFT_SQUARE = ${PARAMS.SHAFT_SQUARE};
CENTER_DISTANCE = ${PARAMS.CENTER_DISTANCE};
`;

  // --- PLACA DE REACCIÓN ---
  code += `
// ============================================
// PLACA DE REACCIÓN
// ============================================
translate([0, 0, ${POSITIONS.thrustPlate}])
  cube([72, 48, 3], center = true);
`;

  // --- RODAMIENTOS ---
  code += `
// ============================================
// RODAMIENTOS
// ============================================`;
  code += generateThrustBearing([XY.outL, 0, POSITIONS.thrustBearing]);
  code += generateThrustBearing([XY.outR, 0, POSITIONS.thrustBearing]);
  code += generateRadialBearing([XY.outL, 0, POSITIONS.frontRadial]);
  code += generateRadialBearing([XY.outR, 0, POSITIONS.frontRadial]);

  // --- EJES ---
  code += `
// ============================================
// EJES
// ============================================`;
  code += generateSquareShaft(56, [0, XY.inputY, POSITIONS.distribution + 28], "Eje entrada");
  code += generateSquareShaft(70, [XY.cmpL, 0, POSITIONS.distribution], "Eje compound L");
  code += generateSquareShaft(70, [XY.cmpR, 0, POSITIONS.distribution], "Eje compound R");
  code += generateSquareShaft(130, [XY.outL, 0, 0], "Eje salida L");
  code += generateSquareShaft(130, [XY.outR, 0, 0], "Eje salida R");
  code += generateMotorCoupling([0, XY.inputY, POSITIONS.distribution - 45]);

  // --- ENGRANAJES ---
  code += `
// ============================================
// ENGRANAJES
// ============================================`;

  // Z18 - Entrada
  code += generateInvoluteGear(
    GEARS.input.z, GEARS.input.m, GEARS.input.face, PARAMS.SHAFT_SQUARE,
    [0, XY.inputY, POSITIONS.distribution],
    [0, 0, inRot * rad2deg],
    "Engranaje Entrada Z18"
  );

  // Z54 - Corona Compound L
  code += generateInvoluteGear(
    GEARS.crown.z, GEARS.crown.m, GEARS.crown.face, PARAMS.SHAFT_SQUARE,
    [XY.cmpL, 0, POSITIONS.distribution],
    [0, 0, cmpLRot * rad2deg],
    "Corona Compound L Z54"
  );

  // Z54 - Corona Compound R
  code += generateInvoluteGear(
    GEARS.crown.z, GEARS.crown.m, GEARS.crown.face, PARAMS.SHAFT_SQUARE,
    [XY.cmpR, 0, POSITIONS.distribution],
    [0, 0, cmpRRot * rad2deg],
    "Corona Compound R Z54"
  );

  // Z16 - Piñón Compound L
  code += generateInvoluteGear(
    GEARS.cmpPinion.z, GEARS.cmpPinion.m, GEARS.cmpPinion.face, PARAMS.SHAFT_SQUARE,
    [XY.cmpL, 0, POSITIONS.outputGearL],
    [0, 0, cmpLRot * rad2deg],
    "Piñón Compound L Z16"
  );

  // Z16 - Piñón Compound R
  code += generateInvoluteGear(
    GEARS.cmpPinion.z, GEARS.cmpPinion.m, GEARS.cmpPinion.face, PARAMS.SHAFT_SQUARE,
    [XY.cmpR, 0, POSITIONS.outputGearR],
    [0, 0, cmpRRot * rad2deg],
    "Piñón Compound R Z16"
  );

  // Z24 - Salida L
  code += generateInvoluteGear(
    GEARS.output.z, GEARS.output.m, GEARS.output.face, PARAMS.SHAFT_SQUARE,
    [XY.outL, 0, POSITIONS.outputGearL],
    [0, 0, outLRot * rad2deg],
    "Engranaje Salida L Z24"
  );

  // Z24 - Salida R
  code += generateInvoluteGear(
    GEARS.output.z, GEARS.output.m, GEARS.output.face, PARAMS.SHAFT_SQUARE,
    [XY.outR, 0, POSITIONS.outputGearR],
    [0, 0, outRRot * rad2deg],
    "Engranaje Salida R Z24"
  );

  return code;
}

// ============================================
// PARA USO DIRECTO (node -e "...")
// ============================================
if (typeof process !== "undefined" && process.argv[1]?.endsWith("drivetrain.ts")) {
  const fs = require("fs");
  const code = generateDrivetrain();
  fs.writeFileSync("twinlock253-tren.scad", code);
  console.log("Generado: twinlock253-tren.scad");
}
