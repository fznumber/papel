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
    pinion: { z: 10, m: 0.5, face: 16, material: "PETG-CF" },
    output: { z: 20, m: 0.5, face: 16, material: "acero" },
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

  // Tornillo extrusor
  SCREW: {
    doOuter: 30.36,
    diInner: 20.24,
    pitch: 32,
    length: 110,
  },

  // Carcasa
  HOUSING: {
    width: 210,
    height: 140,
    depth: 126,
  },
} as const;
