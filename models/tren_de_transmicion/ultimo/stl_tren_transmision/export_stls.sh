#!/bin/bash
# Exporta cada pieza del tren de transmisión a un STL individual.
# Uso: ./export_stls.sh archivo.scad carpeta_salida

set -e

SCAD_FILE="${1:-tren_transmision_v6_3.scad}"
OUT_DIR="${2:-stl_output}"

mkdir -p "$OUT_DIR"

# Todas las piezas imprimibles (se excluye "assembly", que es solo la vista de ensamble)
PARTS=(
    "base_plate"
    "motor_plate"
    "spacer_base_rear"
    "pillar"
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
