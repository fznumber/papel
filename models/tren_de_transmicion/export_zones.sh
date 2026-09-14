#!/bin/bash
mkdir -p stl_tornillos_v1
for z in Z1 Z2 Z3 Z4 Z5 Z6 Z7; do
    echo "Exportando ${z}..."
    openscad -o stl_tornillos_v1/tornillo_${z}.stl -D "part=\"${z}\"" tornillos_corotantes_v1.scad
done
echo "¡Exportación completa!"
