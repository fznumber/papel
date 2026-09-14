#!/bin/bash

# Nombre de tu archivo OpenSCAD
ARCHIVO="Tornillos_Modulares_V2.scad"
CARPETA_SALIDA="stls_tornillos"

# Crear la carpeta de salida si no existe
mkdir -p "$CARPETA_SALIDA"

echo "==========================================="
echo " Generando STLs de los Tornillos (Ubuntu)  "
echo "==========================================="

# Lista de las 16 fases individuales y los 4 bloques grandes
PIEZAS=("Z1a" "Z1b" "Z1c" "Z2a" "Z2b" "Z2c" "Z3a" "Z3b" "Z3c" "Z3d" "Z3e" "Z3f" "Z3g" "Z3h" "Z4a" "Z4b" "seg1" "seg2" "seg3" "seg4")

# Bucle para generar cada STL
for p in "${PIEZAS[@]}"; do
    echo "Exportando -> ${CARPETA_SALIDA}/${p}.stl ..."
    # Ejecuta OpenSCAD por consola, pasando la variable 'part'
    openscad -o "${CARPETA_SALIDA}/${p}.stl" -D "part=\"${p}\"" "$ARCHIVO"
done

echo "==========================================="
echo " ¡Todos los STLs generados con éxito!      "
echo "==========================================="