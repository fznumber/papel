# Barril para extrusor de doble tornillo — fibra de algodón (tocuyo)

Diseño paramétrico en OpenSCAD (`barril.scad`) + 8 STL listos para imprimir en
Ender-3 Pro con PETG.

## 1. Estrategia de diseño (por qué está hecho así)

**El problema:** un bore figura-8 de Ø26mm es un agujero horizontal grande.
Impreso "de una pieza" y acostado, esa cavidad necesita soporte interno →
imposible de retirar limpio → superficie rugosa → fricción/atasco con la
tela. La solución estándar en extrusores impresos en FDM es **cortar el
barril longitudinalmente por el plano que contiene los dos ejes del
tornillo**, así cada mitad es un canal en forma de "artesa" que se imprime
con la cara de corte apoyada en la cama: el canal queda abierto hacia
arriba, **cero soportes, cero puentes**, y el bore queda liso de fábrica
(solo conviene pasar un escariador/broca de 26mm como acabado fino).

Por eso cada una de las 3 secciones se entrega en 2 piezas (TOP/BOTTOM) que
se atornillan entre sí, y las 3 secciones se atornillan entre sí por bridas
en los extremos. Todos los agujeros de tornillo están orientados para
imprimirse verticalmente (sin soporte) o como agujeros horizontales muy
cortos (8mm, tipo brida de cañería) que imprimen bien sin soporte.

## 2. Piezas incluidas (carpeta `STL/`)

| # | Archivo | Pieza | Tamaño aprox (X×Y×Z mm) |
|---|---|---|---|
| 1 | `01_seccion1_TOP_tolva.stl` | Sección 1 – mitad superior + tolva de entrada | 99×170×63 |
| 2 | `02_seccion1_BOTTOM_patas.stl` | Sección 1 – mitad inferior + 2 patas | 99×170×39 |
| 3 | `03_seccion2_TOP.stl` | Sección 2 – mitad superior | 99×170×32 |
| 4 | `04_seccion2_BOTTOM_patas.stl` | Sección 2 – mitad inferior + 3 patas | 99×170×39 |
| 5 | `05_seccion3_TOP.stl` | Sección 3 – mitad superior | 99×180×32 |
| 6 | `06_seccion3_BOTTOM_patas.stl` | Sección 3 – mitad inferior + 3 patas | 99×180×39 |
| 7 | `07_tapa_extremo_motriz.stl` | Tapa extremo motriz (entrada de ejes) | 89×64×10 |
| 8 | `08_placa_salida_dado.stl` | Placa de salida / dado | 89×64×10 |

Las 8 piezas caben individualmente en la cama de la Ender-3 Pro (220×220mm),
sin necesidad de cortar nada más.

Longitudes: 170+170+180 = **520mm**, igual al largo de tus tornillos.

## 3. Geometría del bore

- Figura-8: dos círculos Ø26mm, distancia centro-centro 25.3mm (igual al OD
  del tornillo, para intermeshing correcto).
- Pared radial: 10mm.
- Holgura tornillo↔bore: (26−25.3)/2 = **0.35mm por lado**. Es una holgura
  ajustada. En FDM los agujeros suelen salir 0.2–0.3mm más chicos que el
  nominal, así que **antes de montar los tornillos, pasa un escariador o
  broca de 26mm** por cada mitad (con las dos mitades atornilladas) para
  calibrar el diámetro real y dejar los tornillos girando libres sin juego
  excesivo. Si prefieres más holgura de entrada, cambiá `bore_comp` en el
  `.scad` (por ejemplo `bore_comp=0.4` agranda el bore 0.4mm) y reimprimí.
- El hueco hex de 8.3mm de tus tornillos es para el acople del motor y no
  forma parte del barril; la tapa motriz (#7) sólo tiene 2 agujeros pasantes
  de Ø10mm para que pasen los ejes/acoples hacia la caja reductora externa.

## 4. Uniones y tornillería (no impresa)

| Unión | Cantidad | Tornillo sugerido | Función |
|---|---|---|---|
| Pestaña longitudinal (TOP↔BOTTOM), por sección | 8–10 según largo | M5 × 25mm + tuerca | cierra el barril, agujero vertical (sin soporte) |
| Brida axial entre secciones (×2) y extremos (×2) | 12 por brida (6+6) | M5 × 20mm + tuerca | une secciones y tapas, agujero horizontal corto de 8mm |
| Patas a bancada | 2 por pata (7 patas en total) | M6 | fijación a mesa/marco |

Recomendado: usar tuercas autoblocantes (nylock) por la vibración del
tornillo girando, y una fina película de silicona RTV o una junta de papel
en la línea de partición TOP/BOTTOM para sellar contra polvo de fibra.

## 5. Puertos

- **Entrada**: tolva rectangular impresa sobre la sección 1 (pieza #1), boca
  ~55×42mm y ventana de paso de Ø36mm hacia el bore — suficiente para
  alimentar a mano los trozos de tela de 2–5cm.
- **Salida**: placa `08_placa_salida_dado.stl`, con 2 orificios de Ø18mm (uno
  por lóbulo). Si necesitas otra forma de salida (una sola boca, una rejilla,
  etc.) es la pieza más fácil de rediseñar — avisame y te genero variantes.

## 6. Impresión (Ender-3 Pro / PETG)

- Boquilla 0.4mm, capa 0.2mm, 3–4 perímetros, **60–80% de relleno** (el
  barril trabaja con fricción y calor, conviene rigidez extra).
- Temperatura de impresión PETG habitual (230–240°C boquilla / 70–80°C
  cama), velocidad moderada (40–50mm/s) para buena adherencia entre capas.
- **Sin soportes** en ninguna de las 8 piezas (por diseño). Si tu slicer
  sugiere soporte en la tolva o las patas, revisá la orientación: todas las
  piezas deben imprimirse tal como vienen en el STL (no rotar).
- Falda o borde ("brim") de 5mm recomendado por el tamaño de las piezas.
- Orientación de impresión ya resuelta en los STL: la cara de partición
  queda apoyada en la cama.

### Nota térmica importante
El PETG tiene una temperatura de transición vítrea (Tg) de ~80°C. Trabajar
a 70°C continuo deja poco margen: evitá puntos calientes localizados
(resistencias en contacto directo con el plástico) y usá 60–80% de relleno
para minimizar deformación. Si el proceso real puede superar 75–80°C en
algún punto, considerá:
- Imprimir en **PETG-CF** o **ASA** (mejor resistencia térmica), mismo
  archivo `.scad` sirve.
- Insertar un **manguito interior metálico** (aluminio o inox, tubo
  perfilado a la figura-8) dentro del bore para la superficie de contacto
  real con la fibra, dejando el plástico solo como estructura — recomendado
  si el uso va a ser prolongado o industrial.

## 7. Personalización (parámetros en `barril.scad`)

Al abrir el archivo en OpenSCAD vas a ver, arriba del todo, las variables:
`r_bore, cdist, wall_t, flange_ext, flange_th, rail_ext, rail_h, bolt_d,
foot_bolt_d, shaft_hole_d, L1, L2, L3, bore_comp`. Cambiando cualquiera y
pulsando F5/F6 podés regenerar cualquier pieza. La variable `part` al final
del archivo elige qué pieza exportar (`sec1_top`, `sec1_bottom`, ...,
`end_cap`, `die_plate`, o `assembly` para vista de conjunto).

Para volver a exportar un STL por línea de comandos:
```
openscad -o pieza.stl -D 'part="sec2_top"' barril.scad
```

## 8. Orden de montaje sugerido

1. Escariar el bore de las 6 mitades con broca/escariador de 26mm.
2. Insertar los 2 tornillos en la mitad BOTTOM de la sección 1, tapar con la
   TOP, atornillar la pestaña longitudinal.
3. Repetir para secciones 2 y 3, deslizando los tornillos a medida que se
   arman.
4. Unir las 3 secciones por las bridas axiales (tornillos M5 horizontales).
5. Atornillar la tapa motriz en el extremo de la sección 1 y la placa de
   salida en el extremo de la sección 3.
6. Fijar el conjunto a la bancada por las 7 patas (M6).
7. Acoplar los ejes de los tornillos (hex 8.3mm) a la caja reductora/motor
   a través de la tapa motriz.
