# Ensamble total — extrusor de doble tornillo

**Archivo:** `models/assembly_total.scad` (OpenSCAD 2021.01)
**Subensambles:** `models/barril/barril.scad`, `models/portador/portador.scad`,
`models/tren_de_transmicion/twinlock_253_v16_4.scad`,
`models/tornillo/Tornillos_Modulares_V2.scad`

**Última validación:** 31 Oct 2026
**Estado:** watertight, `Simple: yes`; 200 × 185 × 818 mm;
z = -244…574 mm; 7,6979 L sin tornillos extrusores y 8,0065 L con ellos.

---

## 1. Alcance

Este archivo integra en un solo modelo:

- El **marco**: placa vertical de 18 mm + dos vigas de 40 × 60 × 590 mm +
  pata trasera de apoyo.
- La **caja TwinLock-253 V16.4**, girada 180° sobre Y y atornillada a la
  cara trasera de la placa vertical.
- El **barril V4.3** de 3 secciones (180 + 180 + 178 = 538 mm) y la tapa
  motriz, atornillados a la cara delantera de la placa.
- El **portador de dado** (8 / 6 / 4 mm) en la salida, z = 538…574.
- Los **2 ejes de salida** de 6,35 × 140 mm y los **2 ejes de compuestos**
  de 6,35 × 118 mm.
- La **tornillería** de unión y, opcionalmente, los dos tornillos
  extrusores (`show_screws = true`).

**No incluye:** motor real (se muestra un dummy NEMA23 para verificar
alturas y voladizo), abrazaderas de las vigas, tolva/crammer, termocupla,
limitador de par, ventilador ni sensores. Las abrazaderas se definen en la
sección 7.

El STL del ensamble es de **visualización y validación**, no un archivo de
impresión. Para imprimir, usar los STL individuales de
`models/tren_de_transmicion/generar_transmision.sh`, `models/barril/barril.scad`
y `models/portador/portador.scad`.

---

## 2. Sistema de coordenadas

- **z:** eje del barril. z = 0 es la cara de entrada del barril; z = 538
  es la salida; la caja y el motor viven en z < 0.
- **y:** vertical. La mesa está en y = -100; el eje del barril en y = 0;
  el motor en y = +33,21.
- **x:** transversal. Los tornillos están en x = ±12,65; las vigas en
  x = ±40; la placa mide 200 mm de ancho.

La caja se monta con `translate([0,0,-34]) rotate([0,180,0])`:

| Eje local de la caja | Eje global |
|---|---|
| +Z | -Z |
| +X | -X |
| +Y | +Y |

Por eso el motor queda **arriba y detrás**: y = +33,21, z = -168…-244.

---

## 3. Plano de corte longitudinal

### 3.1 Vista lateral esquemática

Corte por el plano x = 0. No está a escala; las cotas reales están en las
tablas de la sección 4.

```
        motor           caja TwinLock          placa/tapa        barril         portador
       ┌──────┐   ┌──────────────────────┐   ┌──────────┐   ┌───────────┐   ┌────────┐
 y=+33 │NEMA23│   │ engranajes           │   │          │   │           │   │        │
 y=0   └──────┘   │ y rodamientos 6703   │───┤ 18 + 16  ├───┤ 3 tramos  ├───┤  dado  │
 y=-40            └──────────────────────┘   └──────────┘   └───────────┘   └────────┘
 y=-100 ────────────────── vigas 40×60 (x = ±40) ──────────────────────────────────
       z=-244    -168…-44                  -34…-16        0…538         538…574
```

La pata trasera (80 × 48 × 30 mm) va bajo la cuna del motor, entre
z = -198 y -168, apoyada en la mesa (y = -100).

### 3.2 Desarrollo axial

```
z = -244  ─── extremo trasero del motor NEMA23 (76 mm de cuerpo)
    -198  ─── pata trasera (bloque 80×48×30, y = -100…-52)
    -168  ─── cara de montaje del motor / placa motor
    -158  ─── placa motor (10 mm)
    -145  ─── coronas Z54 + piñón motor Z18 (20 mm)
    -125  ─── fin de la etapa 3
    -119  ─── cara trasera de la placa intermedia (10 mm)
    -109  ─── cara delantera de la placa intermedia
     -92  ─── Z24 salida R + Z16 compuesto R (20 mm)
     -70  ─── Z24 salida L + Z16 compuesto L (20 mm)
     -51  ─── cabezas M6 + arandelas (desde el interior de la caja)
     -44  ─── placa base de la caja (10 mm)
     -34  ─── cara trasera de la placa vertical
     -16  ─── cara delantera de la placa vertical / tapa motriz
       0  ─── cara de entrada del barril / bolsillo de tuerca M6
     538  ─── salida del barril / entrada del portador
     574  ─── cara de salida del portador (dado)
```

---

## 4. Estaciones y cotas

### 4.1 Caja TwinLock (local → global)

La caja tiene su origen local en la cara exterior de la placa base. La
transformación global es `z_global = -34 - z_local`.

| Local z (mm) | Global z (mm) | Componente |
|---|---|---|
| 0…10 | -44…-34 | Placa base (10 mm) |
| 6…10 | -44…-40 | Rodamientos 6703 de la placa base (4 uds.) |
| 6…16 | -50…-40 | Adaptadores Out_R / Cmp_R (seat 6…10, cuerpo 10…16) |
| 16…36 | -70…-50 | Piso 1: Z24 salida L + Z16 compuesto L |
| 38…58 | -92…-72 | Piso 2: Z24 salida R + Z16 compuesto R |
| 69…79 | -113…-103 | Adaptadores Out_L / Cmp_L (cuerpo 69…75, seat 75…79) |
| 75…85 | -119…-109 | Placa intermedia (10 mm) |
| 75…79 | -113…-109 | Rodamientos 6703 de salidas/compuestos en la placa intermedia (4) |
| 81…85 | -119…-115 | Rodamiento 6703 del motor en la placa intermedia (1) |
| 91…111 | -145…-125 | Piso 3: coronas Z54 + piñón motor Z18 |
| 124…134 | -168…-158 | Placa motor (10 mm) |
| 124…128 | -162…-158 | Rodamientos 6703 de la placa motor (2 uds.) |
| 134…210 | -244…-168 | Motor NEMA23 (dummy) |
| 134…164 | -198…-168 | Cuna del motor |
| 6…124 | -158…-40 | Ejes de compuestos 6,35 × 118 (x = ±42,90) |

**Ejes de salida:** 6,35 × 140 mm, global z = -115…+25, x = ±12,65.
Atraviesan el adaptador, el engranaje de salida, la placa
base/intermedia, la placa vertical, la tapa motriz y el collar de empuje.

**Pilares:** 6 inferiores (local 10…75) y 6 superiores (local 85…124),
de 12 × 12 mm, con agujero pasante de 6,5 mm. El modelo no prescribe la
longitud exacta de los tornillos; usar varilla roscada M6 o tornillos M6
medidos en el banco.

**Separador frontal:** va de local z = 10 a 38, en y = -52…-25. La fila
delantera de tornillos M6 (y = -25) tiene una media luna Ø13 en
x = -45, 0, 45, local z = 0…9 del separador (global -53…-44), para que la
cabeza y la arandela no apoyen en el PETG.

### 4.2 Barril y portador

| Global z (mm) | Componente |
|---|---|
| -16…0 | Tapa motriz (16 mm) |
| 0…180 | Sección 1 (TOP + BOTTOM) |
| 180…360 | Sección 2 (TOP + BOTTOM) |
| 360…538 | Sección 3 (TOP + BOTTOM) |
| 538…539 | Junta de brida del portador (1 mm) |
| 539…564 | Cuerpo del portador (25 mm) |
| 554…555 | Junta de dado (1 mm, dentro del bolsillo) |
| 555…564,2 | Placa de dado (9,2 mm; 0,2 mm dentro de la tapa) |
| 564…574 | Tapa del portador (10 mm) |

Los collares de empuje van en z = -9,4…0, en x = ±12,65, y giran
-7,5° global.

### 4.3 Marco

| Global z (mm) | Componente | y (mm) |
|---|---|---|
| -198…-168 | Pata trasera 80×48×30 | -100…-52 |
| -34…-16 | Placa vertical 200×160×18 | -80…80 |
| -16…574 | 2 vigas 40×60×590 | -100…-39,98 |
| 0…538 | Apoyo de las bridas del barril | -40 |
| 538…574 | Apoyo del portador | -40 |

La placa vertical se atornilla a las vigas con 4 × M6 × 60 en
x = ±40, y = -61 y -74. La cabeza queda en la cara trasera de la placa
(z = -39…-34), con 42 mm de vástago dentro de la viga.

---

## 5. Lista de materiales (BOM)

### 5.1 Marco (no impreso)

| Cant. | Pieza | Material / medida | Notas |
|---|---|---|---|
| 1 | Placa vertical | 200 × 160 × 18 mm, contrachapado o aluminio | 6×Ø6,5; 2×Ø14; 4×Ø6,5 |
| 2 | Viga longitudinal | 40 × 60 × 590 mm, madera o perfil de aluminio | x = ±40; y = -100…-40 |
| 1 | Pata trasera | 80 × 48 × 30 mm, madera | z = -198…-168 |
| 4 | Tornillo M6 × 60 + arandela | acero | placa → vigas |
| 4–6 | Abrazadera del barril | acero o impresión | no modelada; ver §7 |

### 5.2 Caja TwinLock (impresa en PETG-CF; engranajes al 100 %)

| Cant. | Pieza | Notas |
|---|---|---|
| 1 | `base_plate` | 10 mm; 4 rodamientos 6703 |
| 1 | `mid_plate` | 10 mm; 4 rodamientos + 1 motor |
| 1 | `motor_plate` | 10 mm; 2 rodamientos |
| 6 | `pillar_lower` | 12 × 12 mm |
| 6 | `pillar_upper` | 12 × 12 mm |
| 1 | `spacer_base_front` | con media luna Ø13 para las cabezas M6 |
| 1 | `motor_cradle` | cuna del NEMA23 |
| 1 | `out_gear_L` | Z24, fase +7,5° local |
| 1 | `out_gear_R` | Z24, fase +7,5° local |
| 1 | `comp_pinion_L` | Z16, fase 0° |
| 1 | `comp_pinion_R` | Z16, fase 0° |
| 2 | `comp_corona` | Z54, fase 0° |
| 1 | `motor_pinion` | Z18, fase 0°; barrenado Ø8,2 |
| 4 | `bearing_adapter` | 2 en placa base, 2 en placa intermedia |
| 2 | `compound_shaft` (opcional, prueba) | 6,35 × 118 mm; PETG sólo para giros en vacío |
| 11 | Rodamiento 6703 | 17 × 23 × 4 mm |
| 6 + 6 | M6 para pilares | varilla roscada o tornillos M6, longitud medida |
| 4 | Prisionero M3 | adaptadores de salida |
| 2 | Prisionero M3 | piñón motor |
| 1 | NEMA23 2 N·m | eje 8 × 26 mm; cuerpo 57 × 57 × 76 |
| 4 | M5 × 20 | brida del motor |

### 5.3 Barril, portador y ejes

| Cant. | Pieza | Notas |
|---|---|---|
| 6 | Secciones del barril | 3 TOP + 3 BOTTOM |
| 1 | Tapa motriz | 16 mm |
| 2 | Collar de empuje | 9,4 mm; fase -7,5° global |
| 2 | Tapa de escotilla | sección 2 y 3 |
| 1 | Cuerpo del portador | 120 × 80 × 25 mm |
| 1 | Tapa del portador | 120 × 80 × 10 mm |
| 3 | Placas de dado | Ø8, Ø6, Ø4 |
| 2 | Juntas de 1 mm | brida y dado |
| 6 | M6 × 50 + arandela 12 × 1 + tuerca nylock | caja ↔ placa ↔ tapa ↔ barril |
| 6 | M6 × 25 + tuerca nylock | portador ↔ barril |
| 4 | M6 × 16 + tuerca nylock | tapa del portador |
| 12 | M6 × 20 + tuerca nylock | 2 uniones axiales del barril (6 cada una) |
| 24–30 | M5 × 25 + tuerca cautiva | pestañas longitudinales (8–10 por sección) |
| 2 | Eje cuadrado 6,35 × 140 mm | salidas; acero |
| 2 | Eje cuadrado 6,35 × 118 mm | compuestos; acero (reemplaza al impreso de prueba) |
| 2 | Tornillo extrusor modular | 537,65 mm; opcional |

**Nota sobre los M6 × 50:** con la arandela de 1 mm, la punta del tornillo
llega a z = +5 y el fondo del bolsillo de la tuerca está en z = +6. No usar
M6 × 55 sin verificar que no haga tope. La tuerca nylock debe entrar en el
bolsillo de 6 mm; probar la orientación del inserto de nylon antes de
cerrar el conjunto (ver §10). En el ensamble total no se usan los
6 × M6 × 25 de la tapa motriz del barril standalone: los M6 × 50 ocupan
esos mismos agujeros.

---

## 6. Fabricación

### 6.1 Marco

1. Cortar la placa de 200 × 160 × 18 mm y las dos vigas de 40 × 60 × 590 mm.
2. Perforar la placa:
   - 6 × Ø6,5 en x = -45, 0, 45; y = ±25 (paso de los M6 al barril).
   - 2 × Ø14 en x = ±12,65; y = 0 (paso de los ejes de salida).
   - 4 × Ø6,5 en x = ±40; y = -61 y -74 (placa → vigas).
3. La cabeza de los 4 M6 × 60 queda detrás de la placa, en el espacio
   libre bajo la caja (y = -61 y -74); usar arandela. No hace falta
   contraborear. Si se prefiere enrasar, abrir un alojamiento de
   Ø10–11 × 5 mm y usar un tornillo 5 mm más largo.
4. Cortar la pata trasera de 80 × 48 × 30 mm y fijarla entre las vigas,
   en z = -198…-168. La pata no es estructural: descarga el voladizo del
   motor y reduce vibración.
5. Atornillar las vigas a la placa. Verificar que la placa quede
   perpendicular a las vigas y que la mesa esté a nivel.

### 6.2 Piezas impresas

- **Caja:** PETG-CF, boquilla 0,4 mm, capa 0,2 mm, 6+ perímetros,
  60–80 % de relleno. Engranajes y adaptadores al 100 %.
- **Barril:** PETG o PETG-CF, 3–4 perímetros, 60–80 % de relleno, sin
  soportes (la cara de partición va sobre la cama).
- **Portador:** PETG, cuerpo y tapa con 6+ perímetros; placas de dado al
  100 %; juntas en TPU o silicona de 1 mm.
- **Ejes de compuestos:** preferentemente varilla cuadrada de acero de
  1/4" (6,35 mm), cortada a 118 mm. Si se imprimen en PETG para probar,
  usarlos sólo en vacío.

### 6.3 Tolerancias

- Alojamiento 6703: Ø23,05 mm nominal; ajuste deslizante. Si el
  rodamiento no entra, escariar 0,05–0,1 mm; no golpear el PETG.
- Hueco cuadrado: 6,35 + 0,3 mm = 6,65 mm.
- Agujeros M6: 6,5 mm.
- Ejes de salida: 6,35 mm; 25 mm dentro del tornillo.

---

## 7. Secuencia de montaje

### 7.1 Preparación

1. Imprimir y limpiar las piezas. Retirar rebabas de los alojamientos de
   rodamientos y de los huecos cuadrados.
2. Verificar que los 11 rodamientos 6703 entren a mano y giren libres.
3. Escariar el bore del barril a Ø26,7 mm con las mitades atornilladas.
4. Montar el barril: insertar los 2 tornillos, cerrar las mitades con las
   pestañas longitudinales, unir las 3 secciones con 12 × M6 × 20 y
   colocar los collares en la tapa motriz. No apretar todo todavía.
5. Montar el portador con el dado de 8 mm: cuerpo + junta de brida +
   junta de dado + placa + tapa + 4 × M6 × 16. Atornillarlo a la brida de
   salida del barril con 6 × M6 × 25 + tuerca nylock; apretar en cruz sin
   exceder 3–4 N·m.

### 7.2 Caja

6. Montar los rodamientos de la placa base (4), la placa intermedia
   (4 + 1 motor) y la placa motor (2). Los asientos deben quedar a ras.
7. Colocar los adaptadores en el rodamiento **opuesto** al cuello
   integrado del engranaje:
   - `Out_R` y `Cmp_R`: placa base, local z = 16, volteados 180° sobre X.
   - `Out_L` y `Cmp_L`: placa intermedia, local z = 69.
   - Los adaptadores de salida (`Out_L`, `Out_R`) giran **+7,5° local**;
     los de compuestos, 0°.
8. Montar los pisos 1 y 2 sobre la placa base:
   - Piso 1 (local z = 16): `out_gear_L` + `comp_pinion_L`.
   - Piso 2 (local z = 38): `out_gear_R` + `comp_pinion_R`.
   - Los engranajes de salida giran **+7,5° local** (360/48); los
     compuestos y el piñón motor, 0°.
9. Insertar los 2 ejes de compuestos 6,35 × 118 en x = ±42,90, local
   z = 6…124, a 0°. Deben entrar en el hueco cuadrado del piñón y del
   adaptador R. Si no entra, revisar rebabas o fase; no forzar.
10. Montar los 6 pilares inferiores (local 10…75) y bajar la placa
    intermedia con sus adaptadores L sobre los ejes y pilares. Verificar
    que cada eje entre en el adaptador L y en el rodamiento de la placa
    intermedia; no forzar.
11. Montar el piso 3 sobre la placa intermedia: las 2 coronas Z54 y el
    piñón motor Z18 en local 91…111. Luego los 6 pilares superiores
    (85…124) y la placa motor (124…134) con sus 2 rodamientos.
    Verificar que los ejes de compuestos entren en las coronas y en los
    rodamientos de la placa motor. Apretar en cruz.
12. Montar el separador frontal, la cuna y el NEMA23 con 4 × M5 × 20; el
    eje de 8 mm entra en el piñón Z18. Verificar que el piñón quede en
    local z = 91…111 y que el motor no roce la cuna. Probar el giro a
    mano: dos caminos, mismo sentido, sin puntos duros. Si hay un punto
    duro, revisar la fase de los engranajes de salida y la alineación de
    los ejes.

### 7.3 Integración con el marco y el barril

13. Armar el marco: atornillar la placa vertical a las vigas con
    4 × M6 × 60 y fijar la pata trasera. Verificar escuadra y nivel.
    Presentar la caja contra la placa vertical, con la placa base en
    z = -34 y el motor arriba. Alinear los 6 agujeros M6.
14. Insertar los 6 M6 × 50 + arandela de 1 mm desde el interior de la
    caja, a través de la placa base, la placa vertical y la tapa motriz,
    hasta las tuercas nylock en los bolsillos del barril (z = 0…6).
    Apretar en cruz. La punta debe quedar ~1 mm antes del fondo del
    bolsillo.
15. Insertar los 2 ejes de salida 6,35 × 140 desde la caja hacia el
    barril, a -7,5° global, hasta 25 mm dentro del alojamiento del
    tornillo. Verificar que el eje atraviese el adaptador, el engranaje
    y el collar. Apretar los prisioneros M3 de los adaptadores y del
    piñón motor.
16. Fijar el barril a las vigas con las abrazaderas (no modeladas):
    2–3 por viga, con una junta de goma o fieltro para no marcar el
    PETG. Verificar que las bridas apoyen sin forzar el barril.
17. Verificar la fase de 90° entre los dos tornillos: el izquierdo a
    -7,5° global y el derecho a 82,5° global. Si no coincide, soltar los
    adaptadores y corregir; no girar el eje dentro del tornillo.
18. Montar la tolva/crammer, la termocupla, el limitador de par
    (7,5–8 N·m) y el ventilador. Engrasar los engranajes con EP2 y los
    rodamientos con grasa ligera.

### 7.4 Prueba en vacío

19. 10–20 rpm durante 2–3 minutos; verificar sentido, ruido y temperatura.
20. 100 rpm sin carga durante 5 minutos; verificar que no haya roces ni
    puntos calientes.
21. Recién entonces pasar al lote A con dado de 8 mm y pulpa a 20–25 %
    de consistencia.

---

## 8. Fase y alineación

La fase se fija en **-7,5° global** para los dos ejes de salida:

| Elemento | Fase local | Fase global |
|---|---|---|
| `out_gear_L` / `out_gear_R` | +7,5° | -7,5° |
| Adaptadores `Out_L` / `Out_R` | +7,5° | -7,5° |
| Ejes de salida, collares y alojamientos de tornillo | — | -7,5° |
| Tornillo derecho | — | 82,5° (90° respecto del izquierdo) |
| Compuestos (piñones, coronas, adaptadores y ejes) | 0° | 0° |

**Por qué:** un cuadrado de 1/4" tiene simetría de 90°, pero no de 7,5°.
Los engranajes de salida se rotan medio diente (360/48 = 7,5°) para que el
hueco cuadrado coincida con el eje. El volteo global de la caja
(180° sobre Y) convierte +7,5° local en -7,5° global. Los compuestos no
se rotan porque la corona y el piñón compuesto están alineados por el
mismo eje cuadrado.

**Si un eje no entra:** comprobar que el hueco del engranaje y el del
adaptador estén alineados entre sí; girar el conjunto engranaje +
adaptador, no el eje solo. Los adaptadores van en el rodamiento opuesto
al cuello integrado del engranaje; si se colocan del mismo lado,
colisionan (~2.078 mm³ por engranaje).

---

## 9. Validación geométrica

### 9.1 Piezas y ensamble

| Elemento | Watertight | Volumen | Dimensiones (mm) |
|---|---|---|---|
| Caja (con motor dummy) | Sí | 1,5861 L | 190 × 140 × 210 |
| Barril | Sí | 2,2552 L | 120 × 105 × 554 |
| Portador | Sí | 0,3159 L | 120 × 80 × 36 |
| Marco | Sí | 3,5176 L | 200 × 180 × 772 |
| Tornillos M6 | Sí | 0,0126 L | 102 × 62 × 57 |
| Ejes de salida | Sí | 0,0113 L | 32,4 × 7,1 × 140 |
| Tornillos extrusores | Sí | 0,3086 L | 50,2 × 24,9 × 537,6 |
| Estructura (sin ejes ni tornillos) | Sí | 7,6740 L | 200 × 185 × 818 |
| Ensamble total | Sí | 7,6979 L | 200 × 185 × 818 |
| Ensamble total + tornillos extrusores | Sí | 8,0065 L | 200 × 185 × 818 |

### 9.2 Intersecciones

Todas las intersecciones son **solapes de contacto de 0,02 mm**
intencionales para que el ensamble siga siendo 2-manifold. No son
interferencias de montaje.

| Par | Volumen | Interpretación |
|---|---|---|
| Caja × marco | 502,886 mm³ | Placa base/placa vertical + cuna/pata |
| Caja × tornillos M6 | 9,537 mm³ | Arandela de 1 mm sobre la placa base |
| Barril × marco | 303,517 mm³ | Tapa/placa vertical + bridas/vigas |
| Portador × marco | 57,569 mm³ | Apoyo del portador en las vigas |
| Caja × barril | 0 | — |
| Caja × portador | 0 | — |
| Barril × portador | 0 | — |
| Ejes × caja/barril/portador/marco | 0 | — |
| Tornillos extrusores × todo | 0 | — |

### 9.3 Sondas

| Sonda | Resultado |
|---|---|
| Agujeros M6 (6 posiciones × 6 z) | 36/36 libres |
| Camino de los ejes de salida | 32/32 libre |
| Camino de flujo del portador | 22/22 libre |
| Alojamiento de cabezas M6 delanteras | 9/9 libre |
| Material del separador detrás del alivio | 6/6 sólido |
| Ejes de compuestos | 24/24 sólidos |
| Cuerpos de engranajes compuestos | 12/12 sólidos |
| Ejes de salida dentro del ensamble | 10/10 sólidos |
| Centros de adaptadores | 4/4 libres |
| Alojamientos de tornillo (sockets) | 6/6 libres |

---

## 10. Pendientes y riesgos

- **Abrazaderas del barril:** el modelo no las incluye. Definir 2–3 por
  viga, con una junta de goma/fieltro. Sin ellas, el barril sólo apoya
  por las bridas y el portador.
- **Empuje axial:** el 6703 es radial; el collar es el camino de empuje.
  Evaluar una arandela de acero de 1 mm entre el collar y la tapa, y el
  desgaste PETG-PETG. No cargar el 6703 como rodamiento axial.
- **Tuerca nylock M6:** con M6 × 50 + arandela de 1 mm, la punta llega a
  z = +5 y el bolsillo termina en z = +6. Verificar en banco que la punta
  alcance el inserto de nylon de la tuerca. Si la tuerca va con el nylon
  hacia el fondo, puede quedar 1 mm corta; corregir con una arandela más
  fina o rebajando el bolsillo, no alargando el tornillo a ciegas.
- **Curva del motor:** para 100–150 rpm en los tornillos, el NEMA23 debe
  girar 450–675 rpm. Verificar la curva a ese punto; si no llega, usar
  AC + VFD o aceptar 30–60 rpm y ajustar el proceso.
- **Temperatura:** PETG Tg ~75 °C; proceso ≤50 °C. Los engranajes son el
  fusible mecánico; usar limitador 7,5–8 N·m.
- **Voladizo de la caja:** la placa base llega a y = +85 y la placa
  vertical a y = +80; 5 mm de voladizo no estructural.
- **Placa de 18 mm:** si se cambia a aluminio o a otro espesor, ajustar la
  longitud de los 4 M6 × 60 y de los 6 M6 × 50.
- **STL del ensamble:** incluye el motor dummy y los ejes; no imprimirlo
  como una sola pieza. Usar los STL individuales.
- **Portador:** probar la tapa con presión real; si flexiona, subir a
  12 mm o agregar un refuerzo de acero de 3 mm.

---

## 11. Archivos relacionados

| Archivo | Rol |
|---|---|
| `models/assembly_total.scad` | Ensamble total y flags de exportación |
| `models/tren_de_transmicion/twinlock_253_v16_4.scad` | Fuente de verdad de la caja |
| `models/tren_de_transmicion/TwinLock-253-Documentacion.md` | Cotas, apilado y límites de la caja |
| `models/tren_de_transmicion/ESTADO_PROYECTO.md` | Estado y próximos pasos |
| `models/barril/barril.scad` | Barril V4.3 |
| `models/barril/README.md` | Fabricación del barril |
| `models/portador/portador.scad` | Portador y placas de dado |
| `models/portador/README.md` | Fabricación y montaje del portador |
| `models/portador/assembly_barril.scad` | Subensamble barril + portador |
| `models/tren_de_transmicion/generar_transmision.sh` | STL individuales de la caja |

### Flags de `assembly_total.scad`

| Flag | Efecto |
|---|---|
| `total_part = "assembly"` | Ensamble completo |
| `total_part = "frame"` | Marco |
| `total_part = "gearbox"` | Caja + motor dummy + ejes de compuestos |
| `total_part = "barrel"` | Barril + tapa + collares |
| `total_part = "portador"` | Portador |
| `total_part = "shafts"` | Ejes de salida |
| `total_part = "bolts"` | Tornillos M6 al barril |
| `total_part = "screws"` | Tornillos extrusores |
| `show_screws = true` | Agrega los tornillos extrusores al ensamble |

Ejemplo de exportación:

```
openscad -o assembly_total.stl models/assembly_total.scad
openscad -o frame.stl -D 'total_part="frame"' models/assembly_total.scad
openscad -o gearbox.stl -D 'total_part="gearbox"' models/assembly_total.scad
```
