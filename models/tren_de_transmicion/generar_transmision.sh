#!/bin/bash

# Genera los STLs individuales de la caja TwinLock-253 V16.2.
# Uso: ./generar_transmision.sh
# Requiere OpenSCAD en el PATH.

ARCHIVO="twinlock_253_v16_2.scad"
CARPETA_SALIDA="stls_transmision"

mkdir -p "$CARPETA_SALIDA"

echo "==================================================="
echo " Generando STLs de la Caja TwinLock-253 V16.2      "
echo "==================================================="

PIEZAS=(
  "base_plate"
  "mid_plate"
  "motor_plate"
  "spacer_base_front"
  "pillar_lower"
  "pillar_upper"
  "comp_corona"
  "comp_pinion_L"
  "comp_pinion_R"
  "out_gear_L"
  "out_gear_R"
  "motor_pinion"
  "bearing_adapter"
  "compound_shaft"
  "motor_cradle"
)

for p in "${PIEZAS[@]}"; do
    echo "Exportando -> ${CARPETA_SALIDA}/${p}.stl ..."
    openscad -o "${CARPETA_SALIDA}/${p}.stl" -D "part=\"${p}\"" "$ARCHIVO"
done

echo "==================================================="
echo " STLs generados en ${CARPETA_SALIDA}/               "
echo "==================================================="
