# Portador de dado — extrusor de doble tornillo

Reemplaza la placa de salida `08_placa_salida` (obsoleta) del barril. Es una pieza
única que recibe el flujo de los dos tornillos, lo lleva a dos boquillas
Ø16 y aloja una placa de dado intercambiable de 8, 6 o 4 mm. La tapa
atornillada comprime la placa contra una junta de 1 mm y permite cambiar
el dado sin desarmar el barril.

Archivo: `portador.scad` (OpenSCAD 2021.01).
Ensamble con el barril: `assembly_barril.scad` (usa `barril.scad` y
`portador.scad`; no incluye la caja reductora).
Ensamble total: `models/assembly_total.scad` (marco + caja + barril +
portador); ver `models/assembly_total_README.md`.

## 1. Medidas principales

| Elemento | Medida |
|---|---|
| Cuerpo | 120 × 80 × 25 mm (+ junta de brida de 1 mm) |
| Conos de flujo | Ø26,7 → Ø16 mm, longitud 15 mm, ejes x = ±12,65 |
| Bolsillo del dado | 90 × 30 × 10 mm, abierto por la cara de salida |
| Placa de dado | 89,6 × 29,6 × 9,2 mm (0,2 mm de holgura por lado) |
| Junta de dado | 90 × 30 × 1 mm |
| Tapa | 120 × 80 × 10 mm, dos salidas Ø16 |
| Tornillos al barril | 6 × M6 × 25, cabeza en contrabore Ø11 × 6,5 |
| Tornillos de tapa | 4 × M6 × 16, tuercas en bolsillos hexagonales (x = ±25, y = ±28) |
| Uñas de extracción | 2 ranuras de 4 × 2 mm en x = ±45, y = 0 |
| Paso entre centros de dado | 25,3 mm (x = ±12,65), no 16,45 |

La cara de entrada del cuerpo coincide exactamente con el bore figura-8
del barril: dos círculos de Ø26,7 mm con centros a ±12,65 mm. La junta de
brida tiene el mismo recorte figura-8 y los 6 agujeros Ø6,5.

## 2. Piezas que genera el `.scad`

| `part` | Pieza | Uso |
|---|---|---|
| `body` | Cuerpo | 1 por máquina |
| `cover` | Tapa | 1 por máquina |
| `die_8` | Placa de dado Ø8 | primera pasada |
| `die_6` | Placa de dado Ø6 | segunda pasada |
| `die_4` | Placa de dado Ø4 | tercera pasada / acabado |
| `gasket_die` | Junta de dado 90 × 30 × 1 | plantilla para silicona |
| `gasket_flange` | Junta de brida 120 × 80 × 1 | plantilla para silicona |
| `assembly` | Vista de conjunto | control visual |

Exportar, por ejemplo:

```
openscad -o body.stl   -D 'part="body"'   portador.scad
openscad -o die_8.stl  -D 'part="die_8"'  portador.scad
```

## 3. Lista de materiales

| Cant. | Pieza | Notas |
|---|---|---|
| 1 | Cuerpo PETG | 120 × 80 × 25 mm |
| 1 | Tapa PETG | 120 × 80 × 10 mm |
| 1 de cada | Placa Ø8, Ø6, Ø4 | PETG; se pueden imprimir las tres |
| 1 | Junta de brida 1 mm | silicona o papel de junta; **necesaria** |
| 1 | Junta de dado 1 mm | silicona; se cambia con el dado |
| 6 | M6 × 25 Allen | al barril, en las tuercas existentes |
| 6 | Tuerca M6 nylock | ya en los bolsillos de la brida del barril |
| 4 | M6 × 16 Allen | tapa |
| 4 | Tuerca M6 nylock | bolsillos nuevos del cuerpo |
| — | Silicona RTV | opcional, refuerzo de junta |

**No usar M6 × 30 en el cuerpo:** con 25 mm de cuerpo + 1 mm de junta +
6 mm de tuerca, el M6 × 25 deja 0,5 mm de luz; el M6 × 30 haría tope en el
fondo del bolsillo antes de apretar.

La junta de brida de 1 mm es parte de la cadena de medida. Si se omite y
se sella sólo con RTV, usar M6 × 24 o una arandela de 0,5 mm bajo cada
cabeza; si no, el M6 × 25 hace tope.

## 4. Impresión

- **Cuerpo:** cara del barril (z = 0) sobre la cama. Los conos se abren
  hacia arriba y el bolsillo del dado queda abierto. Sin soportes.
- **Tapa:** cara interior (la que apoya en el dado) sobre la cama. Sin
  soportes; el chaflán de salida es de 45°.
- **Placas de dado:** cara de entrada (la de los conos Ø16) sobre la cama.
  Sin soportes. La placa de Ø4 es la más exigente: cono de 5 mm y
  sobrehang de ~40°; imprimir con capa de 0,12–0,16 mm y ventilador.
- **Juntas:** imprimir en TPU o usar el STL como plantilla para cortar
  silicona de 1 mm. No usar PETG rígido como junta.

Orientación y caras:

```
 Cuerpo (corte lateral)                 Tapa
 z=25  ┌──────────────┐                ┌──────┐  salidas Ø16
       │  bolsillo    │                │      │
 z=15  │  dado        │                └──────┘
       │  conos       │                  z=0 (apoya en dado)
 z=0   └──────────────┘
       cara del barril
```

## 5. Montaje

1. Insertar las 6 tuercas M6 nylock en los bolsillos de la brida de
   salida del barril (z = 532…538). Ya están impresos.
2. Colocar la junta de brida de 1 mm sobre la cara del barril, alineando
   el recorte figura-8 y los 6 agujeros.
3. Apoyar el cuerpo del portador sobre la junta, con los conos alineados
   con los dos tornillos.
4. Insertar los 6 M6 × 25 desde la cara de salida del cuerpo y apretar
   en cruz. La cabeza queda 0,5 mm dentro del contrabore.
5. Colocar la junta de dado de 1 mm en el fondo del bolsillo.
6. Colocar la placa elegida con los conos de entrada mirando a la junta.
   La placa debe quedar 0,2 mm por encima de la cara del cuerpo; eso
   comprime la junta al cerrar la tapa.
7. Colocar la tapa y los 4 M6 × 16. Apretar en cruz, sin exagerar: el
   PETG y las tuercas nylock no necesitan más de 3–4 N·m.
8. Verificar que las dos salidas Ø16 de la tapa coincidan con los dos
   agujeros del dado y que la placa no se haya movido.

Para cambiar el dado: aflojar los 4 M6 × 16, retirar la tapa, sacar la
placa con un destornillador fino por las uñas laterales (x = ±45, y = 0),
cambiar la junta si está deformada y volver a montar. No hace falta
desarmar el cuerpo ni el barril.

## 6. Validación hecha

- Cuerpo, tapa, tres placas y dos juntas: **watertight**, `Simple: yes`.
- Cuerpo: 120,00 × 80,00 × 25,00 mm; 192.275 mm³.
- Tapa: 120,00 × 80,00 × 10,00 mm; 90.666 mm³.
- Placa Ø8: 89,60 × 29,60 × 9,20 mm; 22.802 mm³.
- Conjunto: 120 × 80 × 36 mm (junta 1 + cuerpo 25 + tapa 10).
- Sondas de material: agujeros de los 6 M6 al barril libres; contrabore
  Ø11 presente hasta z = 18,5; bolsillo de dado libre entre z = 15 y 25;
  paredes de 4,5 mm entre contrabore y bolsillo; conos Ø26,7 → Ø16
  libres; agujeros de tapa y placas alineados a x = ±12,65.
- Intersección cuerpo/tapa, cuerpo/placa, cuerpo/juntas: **0 mm³**.
- Intersección tapa/placa: 0,2 mm³ de compresión intencional de la junta.
- Ensamble `assembly_barril.scad`: watertight, 120 × 105 × 590 mm
  (z = -16…574). Ejes de los 6 M6 al barril libres de z = 531 a 563;
  tapa sólida en z = 565. Camino de flujo libre de z = 536 a 565 en
  x = ±12,65.
- Ensamble total `assembly_total.scad`: watertight, 200 × 185 × 818 mm.
  El portador ocupa z = 538…574: junta de brida 538…539, cuerpo 539…564,
  junta de dado 554…555, placa 555…564,2 y tapa 564…574. Intersección
  portador × marco: 57,569 mm³ de apoyo intencional; portador × barril,
  caja y ejes: 0.

## 7. Pendientes

- Probar la tapa con presión real; si flexiona, subir a 12 mm o agregar
  un refuerzo de acero de 3 mm. Con 4 M6 y PETG, la presión debe
  mantenerse baja en las primeras pruebas.
- Decidir si las tuercas de tapa se cambian por inserts roscados M6
  (más cómodos, pero menos resistentes a la extracción en PETG).
- Medir el caudal y la temperatura con cada dado (8 → 6 → 4 mm) antes de
  pasar a la comparación de blanqueo.
