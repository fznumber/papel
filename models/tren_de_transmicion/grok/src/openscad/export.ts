/**
 * TwinLock-253 - Exportación OpenSCAD
 * Genera código OpenSCAD del modelo completo
 */

import { generateAllGears, generateGear } from "./components/Gear";
import { generateAllBearings, generateThrustBearing, generateRadialBearing } from "./components/Bearing";
import { generateAllShafts, generateSquareShaft, generateMotorCoupling } from "./components/Shaft";
import { generateAllScrews, generateBilobeScrew } from "./components/Screw";
import { generateHousing, generateHousingUpper, generateHousingLower } from "./components/Housing";
import { PARAMS } from "./utils/parameters";
import { AVAILABLE_PARTS, type PartInfo } from "./parts-list";

/**
 * Genera el código OpenSCAD completo del TwinLock-253
 */
export function generateOpenSCADCode(): string {
  const timestamp = new Date().toISOString();

  let code = `// ============================================
// TwinLock-253 - Split-Power Drivetrain
// Generado automáticamente: ${timestamp}
// ============================================

// Configuración
$fn = 50;

// ============================================
// PARÁMETROS
// ============================================
MODULE = ${PARAMS.MODULE};
PRESSURE_ANGLE = ${PARAMS.PRESSURE_ANGLE};
BACKLASH = ${PARAMS.BACKLASH};
SHAFT_SQUARE = ${PARAMS.SHAFT_SQUARE};
CENTER_DISTANCE = ${PARAMS.CENTER_DISTANCE};

// ============================================
// INCLUIR MCAD
// ============================================
use <MCAD/involute_gears.scad>

// ============================================
// PLACA DE REACCIÓN
// ============================================
// Placa de reacción 3mm
translate([0, 0, ${PARAMS.POSITIONS.thrustPlate}])
  cube([72, 48, 3], center = true);
`;

  // Agregar componentes
  code += generateAllGears();
  code += generateAllBearings();
  code += generateAllShafts();
  code += generateAllScrews();
  code += generateHousing();

  // Agregar ensamblaje completo
  code += `

// ============================================
// ENSAMBLAJE COMPLETO (descomentar para ver)
// ============================================
// twinlock253();
`;

  return code;
}

/**
 * Genera código OpenSCAD solo con las piezas seleccionadas
 */
export function generateOpenSCADForParts(selectedPartIds: string[]): string {
  const timestamp = new Date().toISOString();

  let code = `// ============================================
// TwinLock-253 - Piezas Seleccionadas
// Generado automáticamente: ${timestamp}
// Piezas: ${selectedPartIds.length}
// ============================================

// Configuración
$fn = 50;

// ============================================
// PARÁMETROS
// ============================================
MODULE = ${PARAMS.MODULE};
PRESSURE_ANGLE = ${PARAMS.PRESSURE_ANGLE};
BACKLASH = ${PARAMS.BACKLASH};
SHAFT_SQUARE = ${PARAMS.SHAFT_SQUARE};
CENTER_DISTANCE = ${PARAMS.CENTER_DISTANCE};

// ============================================
// INCLUIR MCAD
// ============================================
use <MCAD/involute_gears.scad>

`;

  // Generar cada pieza seleccionada
  for (const partId of selectedPartIds) {
    code += generatePartById(partId);
  }

  return code;
}

/**
 * Genera código OpenSCAD para una pieza por su ID
 */
function generatePartById(partId: string): string {
  const { XY, POSITIONS } = PARAMS;

  switch (partId) {
    // Engranajes
    case "gear-z18":
      return generateGear({
        teeth: 18, module: 1.5, face: 14,
        squareBore: PARAMS.SHAFT_SQUARE,
        position: [0, XY.inputY, POSITIONS.distribution],
        name: "Engranaje Entrada Z18",
      });
    case "gear-z54-l":
      return generateGear({
        teeth: 54, module: 1.5, face: 14,
        squareBore: PARAMS.SHAFT_SQUARE,
        position: [XY.cmpL, 0, POSITIONS.distribution],
        name: "Corona Compound L Z54",
      });
    case "gear-z54-r":
      return generateGear({
        teeth: 54, module: 1.5, face: 14,
        squareBore: PARAMS.SHAFT_SQUARE,
        position: [XY.cmpR, 0, POSITIONS.distribution],
        name: "Corona Compound R Z54",
      });
    case "gear-z10-l":
      return generateGear({
        teeth: 10, module: 0.5, face: 16,
        squareBore: PARAMS.SHAFT_SQUARE,
        position: [XY.cmpL, 0, POSITIONS.outputGearL],
        name: "Piñón Compound L Z10",
      });
    case "gear-z10-r":
      return generateGear({
        teeth: 10, module: 0.5, face: 16,
        squareBore: PARAMS.SHAFT_SQUARE,
        position: [XY.cmpR, 0, POSITIONS.outputGearR],
        name: "Piñón Compound R Z10",
      });
    case "gear-z20-l":
      return generateGear({
        teeth: 20, module: 0.5, face: 16,
        squareBore: PARAMS.SHAFT_SQUARE,
        position: [XY.outL, 0, POSITIONS.outputGearL],
        name: "Engranaje Salida L Z20",
      });
    case "gear-z20-r":
      return generateGear({
        teeth: 20, module: 0.5, face: 16,
        squareBore: PARAMS.SHAFT_SQUARE,
        position: [XY.outR, 0, POSITIONS.outputGearR],
        name: "Engranaje Salida R Z20",
      });

    // Rodamientos
    case "bearing-51102-l":
      return generateThrustBearing([XY.outL, 0, POSITIONS.thrustBearing]);
    case "bearing-51102-r":
      return generateThrustBearing([XY.outR, 0, POSITIONS.thrustBearing]);
    case "bearing-6001-l":
      return generateRadialBearing([XY.outL, 0, POSITIONS.frontRadial]);
    case "bearing-6001-r":
      return generateRadialBearing([XY.outR, 0, POSITIONS.frontRadial]);

    // Ejes
    case "shaft-input":
      return generateSquareShaft(56, [0, XY.inputY, POSITIONS.distribution + 28], "Eje entrada");
    case "shaft-compound-l":
      return generateSquareShaft(70, [XY.cmpL, 0, POSITIONS.distribution], "Eje compound L");
    case "shaft-compound-r":
      return generateSquareShaft(70, [XY.cmpR, 0, POSITIONS.distribution], "Eje compound R");
    case "shaft-output-l":
      return generateSquareShaft(130, [XY.outL, 0, 0], "Eje salida L");
    case "shaft-output-r":
      return generateSquareShaft(130, [XY.outR, 0, 0], "Eje salida R");
    case "coupling-motor":
      return generateMotorCoupling([0, XY.inputY, POSITIONS.distribution - 45]);

    // Tornillos
    case "screw-l":
      return generateBilobeScrew([XY.outL, 0, POSITIONS.thrustPlate - PARAMS.SCREW.length]);
    case "screw-r":
      return generateBilobeScrew([XY.outR, 0, POSITIONS.thrustPlate - PARAMS.SCREW.length]);

    // Carcasa
    case "housing-upper":
      return generateHousingUpper([0, 0, POSITIONS.housingEnd]);
    case "housing-lower":
      return generateHousingLower([0, 0, POSITIONS.housingEnd + 30]);

    // Otros
    case "thrust-plate":
      return `
// Placa de reacción
translate([0, 0, ${PARAMS.POSITIONS.thrustPlate}])
  cube([72, 48, 3], center = true);
`;

    default:
      return `\n// Pieza no encontrada: ${partId}\n`;
  }
}

/**
 * Genera y guarda el archivo OpenSCAD
 * Retorna el código generado (para uso en browser)
 */
export function generateOpenSCAD(): string {
  const code = generateOpenSCADCode();
  
  // En browser, retornamos el código para que el usuario lo descargue
  return code;
}

/**
 * Descarga el archivo OpenSCAD generado con todas las piezas
 */
export function downloadOpenSCAD(): void {
  const code = generateOpenSCADCode();
  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "twinlock253.scad";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Descarga el archivo OpenSCAD con solo las piezas seleccionadas
 */
export function downloadOpenSCADSelected(partIds: string[]): void {
  if (partIds.length === 0) {
    alert("Selecciona al menos una pieza para exportar");
    return;
  }
  
  const code = generateOpenSCADForParts(partIds);
  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `twinlock253-${partIds.length}piezas.scad`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Genera código OpenSCAD de una pieza individual
 */
export function generateSinglePart(partName: string): string {
  let code = `// TwinLock-253 - ${partName}
// Generado: ${new Date().toISOString()}

$fn = 50;
use <MCAD/involute_gears.scad>
`;

  switch (partName.toLowerCase()) {
    case "gear-z18":
    case "input":
      code += generateGearZ18();
      break;
    case "gear-z54":
    case "crown":
      code += generateGearZ54();
      break;
    case "gear-z10":
    case "pinion":
      code += generateGearZ10();
      break;
    case "gear-z20":
    case "output":
      code += generateGearZ20();
      break;
    case "bearing-51102":
    case "thrust":
      code += generateBearing51102();
      break;
    case "bearing-6001":
    case "radial":
      code += generateBearing6001();
      break;
    default:
      code += `\n// Pieza no encontrada: ${partName}`;
  }

  return code;
}

// Funciones auxiliares para piezas individuales
function generateGearZ18(): string {
  const { input } = PARAMS.GEARS;
  return `
// Engranaje Z18 - Entrada
difference() {
  gear(
    number_of_teeth = ${input.z},
    circular_pitch = ${(Math.PI * input.m).toFixed(4)},
    pressure_angle = ${PARAMS.PRESSURE_ANGLE},
    gear_thickness = ${input.face},
    rim_thickness = ${input.face},
    hub_thickness = 0,
    bore_diameter = 0,
    backlash = ${PARAMS.BACKLASH}
  );
  cube([${PARAMS.SHAFT_SQUARE + 0.2}, ${PARAMS.SHAFT_SQUARE + 0.2}, ${input.face + 2}], center = true);
}
`;
}

function generateGearZ54(): string {
  const { crown } = PARAMS.GEARS;
  return `
// Corona Z54
difference() {
  gear(
    number_of_teeth = ${crown.z},
    circular_pitch = ${(Math.PI * crown.m).toFixed(4)},
    pressure_angle = ${PARAMS.PRESSURE_ANGLE},
    gear_thickness = ${crown.face},
    rim_thickness = ${crown.face},
    hub_thickness = 0,
    bore_diameter = 0,
    backlash = ${PARAMS.BACKLASH}
  );
  cube([${PARAMS.SHAFT_SQUARE + 0.2}, ${PARAMS.SHAFT_SQUARE + 0.2}, ${crown.face + 2}], center = true);
}
`;
}

function generateGearZ10(): string {
  const { pinion } = PARAMS.GEARS;
  return `
// Piñón Z10
difference() {
  gear(
    number_of_teeth = ${pinion.z},
    circular_pitch = ${(Math.PI * pinion.m).toFixed(4)},
    pressure_angle = ${PARAMS.PRESSURE_ANGLE},
    gear_thickness = ${pinion.face},
    rim_thickness = ${pinion.face},
    hub_thickness = 0,
    bore_diameter = 0,
    backlash = ${PARAMS.BACKLASH}
  );
  cube([${PARAMS.SHAFT_SQUARE + 0.2}, ${PARAMS.SHAFT_SQUARE + 0.2}, ${pinion.face + 2}], center = true);
}
`;
}

function generateGearZ20(): string {
  const { output } = PARAMS.GEARS;
  return `
// Engranaje Z20 - Salida
difference() {
  gear(
    number_of_teeth = ${output.z},
    circular_pitch = ${(Math.PI * output.m).toFixed(4)},
    pressure_angle = ${PARAMS.PRESSURE_ANGLE},
    gear_thickness = ${output.face},
    rim_thickness = ${output.face},
    hub_thickness = 0,
    bore_diameter = 0,
    backlash = ${PARAMS.BACKLASH}
  );
  cube([${PARAMS.SHAFT_SQUARE + 0.2}, ${PARAMS.SHAFT_SQUARE + 0.2}, ${output.face + 2}], center = true);
}
`;
}

function generateBearing51102(): string {
  const { thrust } = PARAMS.BEARINGS;
  return `
// Rodamiento de empuje ${thrust.spec}
union() {
  difference() {
    cylinder(d = ${thrust.D}, h = ${thrust.T}, $fn = 60);
    translate([0, 0, -1])
      cylinder(d = ${thrust.d + 2}, h = ${thrust.T + 2}, $fn = 60);
  }
  difference() {
    cylinder(d = ${thrust.d + 5}, h = ${thrust.T}, $fn = 60);
    translate([0, 0, -1])
      cylinder(d = ${thrust.d}, h = ${thrust.T + 2}, $fn = 60);
  }
  for (i = [0:9]) {
    rotate([0, 0, i * 36])
      translate([${thrust.d / 2 + 2.5}, 0, ${thrust.T / 2}])
        sphere(d = 2.3, $fn = 20);
  }
}
`;
}

function generateBearing6001(): string {
  const { radial } = PARAMS.BEARINGS;
  return `
// Rodamiento radial ${radial.spec}
union() {
  difference() {
    cylinder(d = ${radial.D}, h = ${radial.B}, $fn = 60);
    translate([0, 0, -1])
      cylinder(d = ${radial.d + 3}, h = ${radial.B + 2}, $fn = 60);
  }
  difference() {
    cylinder(d = ${radial.d + 4}, h = ${radial.B}, $fn = 60);
    translate([0, 0, -1])
      cylinder(d = ${radial.d}, h = ${radial.B + 2}, $fn = 60);
  }
  for (i = [0:8]) {
    rotate([0, 0, i * 40])
      translate([${radial.d / 2 + 2}, 0, ${radial.B / 2}])
        sphere(d = 2, $fn = 20);
  }
}
`;
}
