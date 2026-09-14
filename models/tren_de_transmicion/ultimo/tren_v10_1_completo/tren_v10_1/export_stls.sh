#!/bin/bash
set -e
SCAD_FILE="${1:-tren_transmision_v8_2.scad}"
OUT_DIR="${2:-stl_output}"
mkdir -p "$OUT_DIR"

PARTS=(
    "base_plate"
    "motor_plate"
    "spacer_base_front"
    "pillar"
    "pillar_short"
    "sync_gear"
    "gear1"
    "gear2"
    "pinion1"
    "pinion2"
    "bearing_adapter"
    "motor_cradle"
)

for p in "${PARTS[@]}"; do
    echo "Exportando: $p"
    openscad -o "${OUT_DIR}/${p}.stl" -D "part=\"${p}\"" "$SCAD_FILE"
done
echo "Listo. STLs generados en: $OUT_DIR"
