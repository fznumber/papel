/**
 * TwinLock-253 - Parámetros para generación OpenSCAD
 * Extraídos de design.ts
 */

export const PARAMS = {
  // Módulo y ángulo de presión
  MODULE: 1.5,
  PRESSURE_ANGLE: 25,
  BACKLASH: 0.18,
  SHAFT_SQUARE: 6.35, // 1/4 pulgada
  CENTER_DISTANCE: 25.3,

  // Engranajes
  GEARS: {
    input: { z: 18, m: 1.5, face: 14, material: "PETG-CF" },
    crown: { z: 54, m: 1.5, face: 14, material: "PETG-CF" },
    cmpPinion: { z: 16, m: 1.5, face: 16, material: "PETG-CF" },
    output: { z: 24, m: 1.5, face: 16, material: "PETG-CF" },
  },

  // Rodamientos
  BEARINGS: {
    thrust: { spec: "51102", d: 15, D: 28, T: 9 },
    radial: { spec: "6001-2Z", d: 12, D: 28, B: 8 },
  },

  // Posiciones axiales (Z)
  POSITIONS: {
    thrustPlate: 0,
    thrustBearing: 8,
    frontRadial: 22,
    outputGearL: 40,
    outputGearR: 60,
    distribution: 84,
    housingEnd: 120,
  },

  // Posiciones XY
  XY: {
    outL: -12.65,
    outR: 12.65,
    cmpL: -48.65,
    cmpR: 48.65,
    inputY: 23.1,
  },

  // Tornillo extrusor (Tornillos_Modulares_V2)
  SCREW: {
    odNominal: 25.3,
    rootRadius: 7.85,
    squareShaftSide: 6.35,
    squareClearance: 0.3,
    screwClearance: 0.4,
    centerDistance: 25.3,
    // Longitudes de fases (mm)
    phases: {
      Z1a: { length: 50.60, type: "convey", pitch: 50.60, startAngle: 0, hand: "R" },
      Z1b: { length: 50.60, type: "convey", pitch: 50.60, startAngle: 0, hand: "R" },
      Z1c: { length: 37.95, type: "convey", pitch: 37.95, startAngle: 0, hand: "R" },
      Z2a: { length: 37.95, type: "convey", pitch: 37.95, startAngle: 0, hand: "R" },
      Z2b: { length: 37.95, type: "knead", elements: 5, staggerAngle: 45, startAngle: 0, hand: "F" },
      Z2c: { length: 18.98, type: "convey", pitch: 18.98, startAngle: 180, hand: "R" },
      Z3a: { length: 37.95, type: "knead", elements: 5, staggerAngle: 45, startAngle: 180, hand: "R" },
      Z3b: { length: 18.98, type: "convey", pitch: 18.98, startAngle: 0, hand: "L" },
      Z3c: { length: 37.95, type: "knead", elements: 5, staggerAngle: 45, startAngle: 0, hand: "R" },
      Z3d: { length: 18.98, type: "convey", pitch: 18.98, startAngle: 180, hand: "L" },
      Z3e: { length: 37.95, type: "knead", elements: 4, staggerAngle: 90, startAngle: 180, hand: "N" },
      Z3f: { length: 18.98, type: "convey", pitch: 18.98, startAngle: 90, hand: "L" },
      Z3g: { length: 37.95, type: "knead", elements: 5, staggerAngle: 45, startAngle: 90, hand: "R" },
      Z3h: { length: 18.98, type: "convey", pitch: 18.98, startAngle: 270, hand: "R" },
      Z4a: { length: 37.95, type: "convey", pitch: 37.95, startAngle: 270, hand: "R" },
      Z4b: { length: 37.95, type: "convey", pitch: 37.95, startAngle: 270, hand: "R" },
    },
    // Bloques de impresión (4 segmentos)
    segments: {
      seg1: ["Z1a", "Z1b", "Z1c"],
      seg2: ["Z2a", "Z2b", "Z2c", "Z3a", "Z3b"],
      seg3: ["Z3c", "Z3d", "Z3e", "Z3f", "Z3g"],
      seg4: ["Z3h", "Z4a", "Z4b"],
    },
    // Posiciones Z de los segmentos (desde el extremo del tornillo)
    segmentPositions: {
      seg1: 0,
      seg2: 139.15,
      seg3: 290.96,
      seg4: 442.77,
    },
  },

  // Carcasa
  HOUSING: {
    width: 210,
    height: 140,
    depth: 126,
  },
} as const;
