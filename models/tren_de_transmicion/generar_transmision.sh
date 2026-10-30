#!/bin/bash

# Nombre de tu archivo OpenSCAD (cambia esto si tu archivo se llama distinto)
ARCHIVO="Transmision_V12.scad"
CARPETA_SALIDA="stls_transmision"

# Crear la carpeta de salida si no existe
mkdir -p "$CARPETA_SALIDA"

echo "==================================================="
echo " Generando STLs de la Caja de Transmisión (Ubuntu) "
echo "==================================================="

# Lista de todas las piezas individuales de la V12.1
PIEZAS=("base_plate" "mid_plate" "motor_plate" "spacer_base_front" "pillar_lower" "pillar_upper" "comp_corona" "comp_pinion" "out_gear" "motor_pinion" "bearing_adapter" "motor_cradle")

# Bucle para generar cada STL
for p in "${PIEZAS[@]}"; do
    echo "Exportando -> ${CARPETA_SALIDA}/${p}.stl ..."
    # Ejecuta OpenSCAD por consola, pasando la variable 'part'
    openscad -o "${CARPETA_SALIDA}/${p}.stl" -D "part=\"${p}\"" "$ARCHIVO"
done

echo "==================================================="
echo " ¡Todos los 12 STLs generados con éxito!           "
echo "==================================================="