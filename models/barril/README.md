# Barril para extrusor de doble tornillo — fibra de algodón (tocuyo)

Diseño paramétrico en OpenSCAD (`barril.scad`) para imprimir en Ender-3 Pro
con PETG. El `.scad` genera las piezas principales, el collar de empuje y la
tapa de escotilla. La salida es el **portador de dado** de
`models/portador/portador.scad`; el montaje completo con marco y caja está en
`models/assembly_total.scad` (ver `models/assembly_total_README.md`).

## 1. Estrategia de diseño (por qué está hecho así)

**El problema:** un bore figura-8 de Ø26,7 mm es un agujero horizontal grande.
Impreso "de una pieza" y acostado, esa cavidad necesita soporte interno →
imposible de retirar limpio → superficie rugosa → fricción/atasco con la
tela. La solución estándar en extrusores impresos en FDM es **cortar el
barril longitudinalmente por el plano que contiene los dos ejes del
tornillo**, así cada mitad es un canal en forma de "artesa" que se imprime
con la cara de corte apoyada en la cama: el canal queda abierto hacia
arriba, **cero soportes, cero puentes**, y el bore queda liso de fábrica
(solo conviene pasar un escariador/broca de 26,7 mm como acabado fino).

Por eso cada una de las 3 secciones se entrega en 2 piezas (TOP/BOTTOM) que
se atornillan entre sí, y las 3 secciones se atornillan entre sí por bridas
en los extremos. Todos los agujeros de tornillo están orientados para
imprimirse verticalmente (sin soporte) o como agujeros horizontales cortos
(10–16 mm, tipo brida de cañería) que imprimen bien sin soporte.

## 2. Piezas principales

| # | Archivo | Pieza | Tamaño aprox (X×Y×Z mm) |
|---|---|---|---|
| 1 | `01_seccion1_TOP.stl` | Sección 1 – mitad superior + tolva | 120×65×180 |
| 2 | `02_seccion1_BOTTOM.stl` | Sección 1 – mitad inferior | 120×40×180 |
| 3 | `03_seccion2_TOP.stl` | Sección 2 – mitad superior | 120×40×180 |
| 4 | `04_seccion2_BOTTOM.stl` | Sección 2 – mitad inferior | 120×40×180 |
| 5 | `05_seccion3_TOP.stl` | Sección 3 – mitad superior | 120×40×178 |
| 6 | `06_seccion3_BOTTOM.stl` | Sección 3 – mitad inferior | 120×40×178 |
| 7 | `07_tapa_motriz.stl` | Tapa extremo motriz (entrada de ejes) | 120×80×16 |
| 8 | `09_collar_empuje.stl` | Collar de empuje (2 por máquina) | Ø22×9,4 |
| 9 | `10_tapa_escotilla.stl` | Tapa de escotilla (secciones 2 y 3) | — |

**`08_placa_salida` está obsoleta.** La placa de salida de 2×Ø18 mm ya no
se genera en el selector `part` ni se incluye en el ensamble; el portador de
dado ocupa su lugar. El módulo se conserva en el `.scad` sólo como
referencia histórica.

**La base ya no es solidaria.** Se eliminó `base_continua` para que las
cabezas de los 6 tornillos inferiores de las uniones z=180/360 queden
accesibles desde la cara interior. El barril se apoya en una bancada
separada: dos vigas longitudinales de madera (o PETG) debajo de las
pestañas laterales, con abrazaderas. En el ensamble total, la altura queda
fijada por el marco: mesa en y = -100, eje del barril en y = 0
(`models/assembly_total_README.md`).

Las piezas principales caben individualmente en la cama de la Ender-3 Pro
(220×220mm), sin necesidad de cortar nada más.

Longitudes: 180+180+178 = **538 mm**; el tornillo actual mide 537,65 mm.

## 3. Geometría del bore

- Figura-8: dos círculos **Ø26,7 mm**, distancia centro-centro **25,3 mm**.
  Es geometría **tangencial (kissing)**, no intermeshing: el CD es igual al OD
  nominal del tornillo, no a (OD+ID)/2.
- Pared radial: 10 mm.
- Holgura tornillo↔bore: (26,7 − 24,9)/2 = **0,9 mm por lado**. El OD efectivo
  del tornillo es 24,9 mm (OD nominal 25,3 menos 0,4 mm de holgura entre
  tornillos). Es una holgura holgada, deliberada para tolerar FDM, flexión del
  eje y pulpa. En FDM los agujeros suelen salir 0,2–0,3 mm más chicos que el
  nominal, así que **antes de montar los tornillos, pasá un escariador o broca
  de 26,7 mm** por cada mitad (con las dos mitades atornilladas) para calibrar
  el diámetro real. Si querés más holgura, subí `bore_comp` en el `.scad`
  (por ejemplo `bore_comp=0,45` deja el bore en Ø26,9) y reimprimí.
- El hueco de los tornillos es **cuadrado de 1/4" (6,35 mm + 0,3 mm de
  holgura)**; no es hex 8,3 mm. La tapa motriz (#7) tiene 2 agujeros pasantes
  de Ø12 mm y alojamientos de Ø28,5 mm para los collares de empuje (Ø22 mm).

## 4. Uniones y tornillería (no impresa)

| Unión | Cantidad | Tornillo sugerido | Función |
|---|---|---|---|
| Pestaña longitudinal (TOP↔BOTTOM), por sección | 8–10 según largo | M5 × 25 mm + tuerca cautiva | cierra el barril; apilado de 30 mm, tuerca en el plano de unión |
| Brida axial entre secciones (×2) | 6 por brida (3+3) | M6 × 20 mm + tuerca cautiva | 2×10 mm de brida; agujero pasante Ø6,5 mm |
| Tapa motriz (extremo motor) | 6 | M6 × 25 mm + tuerca cautiva (solo barril standalone) | 16 mm tapa + 10 mm brida; en el ensamble total se reemplazan por los 6 × M6 × 50 que vienen de la caja; no usar ambos |
| Portador de dado (extremo de salida) | 6 | M6 × 25 mm + tuerca cautiva | 25 mm cuerpo + 1 mm junta + tuerca en brida de 10 mm; ver `models/portador/README.md` |
| Caja ↔ placa ↔ tapa ↔ barril | 6 | M6 × 50 mm + arandela 12 × 1 mm + nylock | entran desde el interior de la caja; tuerca en el bolsillo del barril (z = 0…6); ver `models/assembly_total_README.md` |
| Marco del ensamble total | 2–3 abrazaderas por viga | — | placa vertical de 18 mm + vigas 40×60; junta de goma/fieltro |

**Tuercas cautivas M6:** las seis bridas axiales ya tienen bolsillo
hexagonal de 6 mm de profundidad y 10,2 mm entre caras en la cara de
acople, para tuerca M6 nylock. La tuerca se coloca antes de unir; la brida
de enfrente la tapa. Validado con dummy de 11,55 mm entre vértices × 5,9 mm
de alto: cero interferencia en las seis mitades.

**Acceso a la fila inferior — resuelto:** se eliminó la pata continua
`base_continua`. Las probetas después del cambio dan abierto/void en
z_local = 12, 20 y 100 mm, así que los 6 tornillos inferiores de las
uniones z=180/360 ya se pueden insertar y ajustar desde la cara interior.
El barril se monta en una bancada separada (ver arriba). El agujero
central queda a ~0,3 mm del cuerpo: usar tornillo Allen sin arandela en
ese punto, o avellanar/desplazar 1 mm si la impresión sale con
sobre-material.

La pestaña longitudinal tiene 30 mm de apilado; el M5×25 sólo alcanza si la
tuerca va cautiva en el plano de unión (si va del otro lado, hace falta
M5×35).

Recomendado: usar tuercas autoblocantes (nylock) por la vibración del
tornillo girando, y una fina película de silicona RTV o una junta de papel
en la línea de partición TOP/BOTTOM para sellar contra polvo de fibra.

## 5. Puertos

- **Entrada**: tolva rectangular impresa sobre la sección 1 (pieza #1), boca
  ~55×42mm y ventana de paso de Ø36mm hacia el bore — suficiente para
  alimentar pulpa cocida desmenuzada a **5–10 mm**. Trozos de 2–5 cm hacen
  puente en la tolva; para eso hace falta un crammer o empujador.
- **Salida**: **portador de dado** (`models/portador/portador.scad`), con
  placas intercambiables de 8, 6 y 4 mm y tapa atornillada. Reemplaza la
  antigua `08_placa_salida` de 2×Ø18 mm, que quedó obsoleta. Ver
  `models/portador/README.md`.

## 6. Impresión (Ender-3 Pro / PETG)

- Boquilla 0.4mm, capa 0.2mm, 3–4 perímetros, **60–80% de relleno** (el
  barril trabaja con fricción y calor, conviene rigidez extra).
- Temperatura de impresión PETG habitual (230–240°C boquilla / 70–80°C
  cama), velocidad moderada (40–50mm/s) para buena adherencia entre capas.
- **Sin soportes** en ninguna de las piezas (por diseño). Si tu slicer
  sugiere soporte en la tolva o los puentes, revisá la orientación: todas
  las piezas deben imprimirse tal como vienen en el STL (no rotar).
- Falda o borde ("brim") de 5mm recomendado por el tamaño de las piezas.
- Orientación de impresión ya resuelta en los STL: la cara de partición
  queda apoyada en la cama.

### Nota térmica importante
El PETG tiene una temperatura de transición vítrea (Tg) de ~75 °C. Trabajar
por encima de **50 °C** deja poco margen: evitá puntos calientes localizados
(resistencias en contacto directo con el plástico) y usá 60–80 % de relleno
para minimizar deformación. Si el proceso real puede superar 50 °C en
algún punto, considerá:
- Imprimir en **PETG-CF** o **ASA** (mejor resistencia térmica), mismo
  archivo `.scad` sirve.
- Insertar un **manguito interior metálico** (aluminio o inox, tubo
  perfilado a la figura-8) dentro del bore para la superficie de contacto
  real con la fibra, dejando el plástico solo como estructura — recomendado
  si el uso va a ser prolongado o industrial.

## 7. Personalización (parámetros en `barril.scad`)

Al abrir el archivo en OpenSCAD vas a ver, arriba del todo, las variables:
`cdist, r_bore, bore_comp, wall_t, rail_h, flange_th, nut_ac, nut_depth,
L1, L2, L3, square_shaft_side, square_clearance`. Cambiando cualquiera y
pulsando F5/F6 podés regenerar cualquier pieza. La variable `part` al final
del archivo elige qué pieza exportar (`01_seccion1_TOP`, `02_seccion1_BOTTOM`,
..., `07_tapa_motriz`, `09_collar_empuje`, `10_tapa_escotilla`, o `assembly`
para vista de conjunto). `08_placa_salida` ya no está en el selector: el
módulo se conserva sólo como referencia obsoleta.

Para volver a exportar un STL por línea de comandos:
```
openscad -o pieza.stl -D 'part="03_seccion2_TOP"' barril.scad
```

## 8. Orden de montaje sugerido

1. Escariar el bore de las 6 mitades con broca/escariador de **26,7 mm**.
2. Insertar los 2 tornillos en la mitad BOTTOM de la sección 1, tapar con la
   TOP, atornillar la pestaña longitudinal.
3. Repetir para secciones 2 y 3, deslizando los tornillos a medida que se
   arman.
4. Colocar las tuercas M6 en los bolsillos de las caras de acople: sección 1
   cara motor, sección 2 cara sección 1, sección 3 caras sección 2 y salida.
5. Unir las 3 secciones por las bridas axiales (6 tornillos M6 por unión:
   3 superiores + 3 inferiores).
6. Atornillar la tapa motriz en el extremo de la sección 1. En el extremo de
   salida va el **portador de dado** (reemplaza la placa de salida); ver
   `models/portador/README.md` y el ensamble `models/portador/assembly_barril.scad`.
7. Apoyar el barril en el marco (placa vertical de 18 mm + vigas de 40×60) y
   sujetarlo con 2–3 abrazaderas por viga; ya no hay patas impresas.
8. Acoplar los ejes de los tornillos (**cuadrado 6,35 mm**) a la caja
   reductora/motor a través de la tapa motriz.

El montaje integrado —caja, placa vertical, tapa motriz y barril con los
6×M6×50— está en `models/assembly_total_README.md` §7.3. Ahí también se
fija la fase **-7,5° global** de los ejes de salida y se revisa que los
2 ejes de compuestos (6,35 × 118 mm) entren a 0°.
