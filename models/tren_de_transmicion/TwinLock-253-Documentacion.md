# TwinLock-253 — Documentación del tren de transmisión

**Tren co-rotante split-power para extrusor de doble tornillo**

**Fuente de verdad:** `twinlock_253_v16_2.scad` (standalone).

**Ensamble total:** `models/assembly_total.scad`; ver `models/assembly_total_README.md`.

**Geometría de tornillos:** tangencial, no intermeshing.

**Relación real:** 4,5:1.

---

## 1. Arquitectura

### Topología: split-power en H, salidas escalonadas

El piñón distribuidor Z18 engrana a la vez con las dos coronas Z54. Cada camino lleva ~50 % del par hasta su propio engranaje de salida. Los dos ejes cuadrados no se empujan entre sí: no hay un único punto de falla en la transmisión.

| Parámetro | Valor |
|-----------|-------|
| Distancia entre centros de tornillos | 25,30 mm |
| Relación total | **4,5:1** |
| Relación entre tornillos | 1:1 estricta |
| Sentido | Co-rotante |
| Módulo | 1,5 mm · evolvente 25° |
| Backlash FDM | +0,25 mm en distancia entre centros |
| Etapa 1 (motor → coronas) | Z18 → Z54, CD 54,25 mm |
| Etapa 2 (compuestos → salidas) | Z16 → Z24, CD 30,25 mm |

### Por qué no un piñón de sincronía

Un engranaje pequeño entre los dos ejes a 25,30 mm transmitiría el 100 % de la carga de un tornillo al otro. Con 7,65 N·m combinados eso es un diente PETG condenado. Aquí cada salida recibe par desde el origen: el piñón de entrada parte la potencia, y los engranajes de salida viven en planos axiales distintos (Z24, PD 36 mm) para no interferir a 25,30 mm.

### Faseo 90° y fase de las salidas

Un cuadrado de 1/4" tiene simetría de 90°, así que el hueco no puede “guardar” el desfase por sí solo. El adaptador de salida es una abrazadera: se monta el tren, se insertan los tornillos, se giran hasta que los lóbulos queden a 90° y se aprietan los prisioneros. El tren mantiene el lock bajo carga.

Además del desfase de 90° entre tornillos, el gearbox tiene una **fase de montaje de medio diente**:

| Elemento | Fase local | Fase global |
|---|---|---|
| `out_gear_L` / `out_gear_R` | +7,5° (360/48) | -7,5° |
| Adaptadores `Out_L` / `Out_R` | +7,5° | -7,5° |
| Ejes de salida y collares | — | -7,5° |
| Tornillo derecho | — | 82,5° (90° respecto del izquierdo) |
| Compuestos: Z16, Z54, adaptadores y ejes | 0° | 0° |

El volteo global de la caja (180° sobre Y) convierte +7,5° local en -7,5° global. Los engranajes de salida y sus adaptadores giran juntos medio diente para que el hueco cuadrado coincida con el eje; los compuestos no se rotan porque la corona y el piñón compuesto están unidos por el mismo eje cuadrado.

**Importante:** con CD = 25,3 mm y OD = 25,3 mm, los tornillos son **tangenciales (kissing)**. No hay barrido self-wiping ni autolimpieza entre lóbulos. El faseo de 90° es para el amasado y para que los lóbulos no choquen, no para autolimpiar.

### Cinemática

- Piñón entre ambas coronas → las dos giran igual (co-rotantes).
- Dos mallas por camino (par) → las salidas giran igual que el piñón, más lentas.
- Compuestos en x = **-42,90 mm** y **42,90 mm**; piñón en y = **33,21 mm**.
- Salida L en z = **16 mm**; salida R en z = **38 mm**. Nunca coplanares.
- Coronas y piñón motor en z = **91 mm**.
- Placa intermedia en z = **75 mm**; placa motor en z = **124 mm**.
- Adaptadores: `Out_R`/`Cmp_R` en la placa base (z local 16); `Out_L`/`Cmp_L` en la placa intermedia (z local 69). Siempre en el rodamiento **opuesto** al cuello integrado del engranaje.
- Ejes de compuestos: 2 × □6,35 × 118 mm en x = ±42,90, z local 6…124. Sin estos ejes la corona Z54 no transmite par al piñón Z16.

---

## 2. Cargas

### Hipótesis de cálculo

PETG-CF a 65 MPa de raíz; acero a 550 MPa. Cálculo conservador (diente recto, no herringbone). La carga real depende de la pulpa, la consistencia y el die; el límite práctico lo pone el PETG.

#### Engranajes y materiales

| Engranaje | Dientes | Módulo | Material |
|-----------|---------|--------|----------|
| Entrada | Z18 | 1,5 mm | PETG-CF |
| Corona L/R | Z54 | 1,5 mm | PETG-CF |
| Piñón compound L/R | Z16 | 1,5 mm | PETG-CF (o acero) |
| Salida L/R | Z24 | 1,5 mm | PETG-CF (prototipo) / acero (servicio) |

#### Criterios de diseño

| Parámetro | Valor | Nota |
|-----------|-------|------|
| Par de salida con NEMA23 2 N·m | **7,65 N·m** | 2 × 4,5 × 0,85 |
| Límite seguro PETG | **≤ 8 N·m** | Por encima, riesgo de diente |
| Carga tangencial por salida | ~210 N | A 3,8 N·m y radio 18 mm |
| Ángulo de presión | 25° | Evolvente estándar |
| Backlash FDM | +0,25 mm | En distancia entre centros |

#### Rodamientos

| Rodamiento | Especificación | Cantidad | Función |
|------------|----------------|----------|---------|
| **6703** | 17 × 23 × 4 mm | **11** | 4 en placa base, 5 en placa intermedia (4 salidas/compuestos + 1 motor), 2 en placa motor |

**No hay 51102 ni 6001 en el standalone.** El 6703 es un rodamiento delgado de ranura profunda: aguanta carga radial y algo de axial, pero **no es un rodamiento de empuje**. Si la extrusión genera empuje axial alto, agregar un tope/arandela de empuje o un rodamiento axial en el adaptador; no cargar el 6703 como si fuera un 51102.

#### Modos de falla

- **Flexión Lewis:** rotura del diente por sobrecarga estática.
- **Hertz:** aplastamiento superficial por contacto de rodadura.
- **Pico de amasado:** factor ×3,5 en ciclos de kneading.
- **Creep del PETG:** deformación lenta bajo carga continua y temperatura; mantener ≤50 °C.

---

## 3. Planos de fabricación

### TL-253-01: Vista frontal · Interfaz de tornillos

- CD tornillos: 25,3 mm.
- Huecos □ idénticos en ambos ejes.
- Fase 90° en la brida del engranaje, no en el cuadrado.
- L: lóbulo 0°, R: lóbulo 90°.
- Eje cuadrado de 1/4" (6,35 mm) con holgura de inserción 0,3 mm.

### TL-253-02: Apilado axial

| Componente | Posición Z | Nota |
|------------|------------|------|
| Placa base | 0–10 mm | PETG, 10 mm |
| Rodamientos 6703 (base) | 6–10 mm | 4 uds. |
| Adaptadores Out_R / Cmp_R | 6–16 mm | 2 uds.; seat 6–10, cuerpo 10–16; volteados 180° sobre X |
| Z24 Salida L | 16–36 mm | Piso 1 |
| Z24 Salida R | 38–58 mm | Piso 2, 2 mm de holgura |
| Adaptadores Out_L / Cmp_L | 69–79 mm | 2 uds.; cuerpo 69–75, seat 75–79 |
| Placa intermedia | 75–85 mm | PETG, 10 mm |
| Rodamientos 6703 (intermedia) | 75–79 mm | 4 uds. de salidas/compuestos |
| Rodamiento 6703 (motor) | 81–85 mm | 1 ud., lado superior de la placa intermedia |
| Coronas Z54 + piñón motor Z18 | 91–111 mm | Piso 3 |
| Ejes de compuestos | 6–124 mm | 2 × □6,35 × 118 mm, x = ±42,90, 0° |
| Placa motor | 124–134 mm | PETG, 10 mm |
| Rodamientos 6703 (motor) | 124–128 mm | 2 uds. |

**Empuje:** no hay rodamiento axial dedicado. La placa y el 6703 absorben lo que haya; para pulpa, prever un tope axial y no confiar en el rodamiento como empuje principal.

### TL-253-AD: Adaptador de salida

En el standalone **no existe un adaptador de acero de 93 mm**. La pieza es `bearing_adapter`, impresa:

| Segmento | Dimensión | Tolerancia |
|----------|-----------|------------|
| Cuerpo | Ø19 × 6 mm | — |
| Asiento 6703 | Ø17 × 4 mm | Ajuste deslizante |
| Hueco cuadrado | □6,35 mm | +0,3 mm |
| Orejas de arrastre | 6 lengüetas de 3×2×6 mm | — |
| Prisionero | M3 | Faseo |

Si se hace en acero, replicar estas cotas: cuerpo Ø19, asiento Ø17 h6 × 4 mm, hueco □6,35 y prisionero M3. No usar el `acople_directo.scad` con pulpa: es un buje impreso para pruebas en vacío, no un rodamiento.

**Montaje:** el adaptador va siempre en el rodamiento **opuesto** al cuello integrado del engranaje. Si se monta del mismo lado, colisiona con el cuello (~2.078 mm³ por engranaje). `Out_R` y `Cmp_R` van en la placa base, local z = 16, volteados 180° sobre X; `Out_L` y `Cmp_L` en la placa intermedia, local z = 69. Los adaptadores de salida giran **+7,5° local**; los de compuestos, 0°. El prisionero M3 fija la abrazadera al eje cuadrado, no al revés.

### Cotas críticas

| Cota | Valor | Nota |
|------|-------|------|
| CD tornillos | 25,3 mm | Tangencial, no intermeshing |
| □ eje | 6,35 +0,3 mm | Varilla cuadrada 1/4" |
| Fase entre tornillos | 90° ±0,5° | Abrazadera en banco |
| Fase de salida | +7,5° local / -7,5° global | Engranajes y adaptadores de salida |
| Fase de compuestos | 0° | Z16, Z54, adaptadores y ejes |
| Módulo / α | 1,5 / 25° | Evolvente |
| Backlash FDM | +0,25 mm | Solo centros impresos |
| 6703 | 17 × 23 × 4 | 11 uds. |
| 51102 / 6001 | — | **No se usan** |

---

## 4. DFAM (Design for Additive Manufacturing)

### DFAM para PETG-CF

El plástico se ablanda a ~75 °C. Los engranajes de salida, a módulo 1,5 y 20 mm de cara, se especifican en PETG-CF para el prototipo y en acero para el par de régimen. El piñón motor del standalone tiene alojamiento para eje de **8,2 mm** (NEMA23 de 8 mm × 26 mm; llega a los prisioneros en z≈118,5). Si se usa un eje de 6,35 mm, ajustar el barrenado antes de imprimir.

### Reglas FDM

- Holgura de centros +0,25 mm. No hiperestático.
- Una sola mitad localiza cada rodamiento; la tapa lleva holgura.
- Insertos M3/M4 heat-set. Nunca rosca directa bajo carga cíclica.
- El modelo actual es de **diente recto**. El herringbone es una mejora para fase 2: cancela el empuje de hélice y sube el contact ratio, pero hay que rediseñar los engranajes.
- Boquilla 0,4 mm, capa 0,2 mm, 250 °C / cama 80 °C, filamento seco, recinto cerrado.
- Para pulpa, usar los 4 bloques grandes del tornillo, no las 16 fases sueltas.

### Archivos a imprimir

| Archivo / parte | Rol | Configuración |
|-----------------|-----|---------------|
| `base_plate` | Placa base | 6+ perímetros, 60–80 % relleno |
| `mid_plate` | Placa intermedia | 6+ perímetros, 60–80 % relleno |
| `motor_plate` | Placa motor | 6+ perímetros, 60–80 % relleno |
| `pillar_lower` / `pillar_upper` | Pilares | 6+ perímetros |
| `spacer_base_front` / `motor_cradle` | Separador / cuna | 6+ perímetros |
| `out_gear_L` / `out_gear_R` | Z24 salida | 100 % infill, diente recto |
| `comp_pinion_L` / `comp_pinion_R` | Z16 compuesto | 100 % infill, una de cada una |
| `comp_corona` | Z54 | 100 % infill, dos unidades |
| `motor_pinion` | Z18 | 100 % infill, ajustar eje |
| `bearing_adapter` | Adaptador de salida | 4 uds., asiento 6703 |
| `compound_shaft` | Eje de compuestos | 2 uds.; acero □1/4" × 118 mm o PETG sólo en vacío |

**Varilla cuadrada:** 4 tramos de 1/4" (6,35 mm) en total: 2 × 140 mm para las salidas y 2 × 118 mm para los compuestos. Los compuestos impresos en PETG se usan sólo para verificar el montaje en vacío; con pulpa, acero.

Los STL de `stls_transmision/` e `imprimir/` pueden estar desactualizados: regenerarlos desde `twinlock_253_v16_2.scad` antes de imprimir. `generar_transmision.sh` ya incluye `compound_shaft`.

### Secuencia de montaje

1. Montar los 4 rodamientos 6703 en la placa base (local 6…10).
2. Montar los adaptadores `Out_R` y `Cmp_R` en la placa base, local z = 16, volteados 180° sobre X. `Out_R` a +7,5° local; `Cmp_R` a 0°.
3. Apilar el Z24 salida L (local 16) y el Z24 salida R (local 38) con sus Z16 compuestos. Insertar los 2 ejes de compuestos □6,35 × 118 en x = ±42,90, local z = 6…124, a 0°. Abrazaderas sueltas.
4. Montar los 4 rodamientos de salidas/compuestos (local 75…79) y el rodamiento del motor (local 81…85) en la placa intermedia.
5. Montar los adaptadores `Out_L` y `Cmp_L` en la placa intermedia, local z = 69. `Out_L` a +7,5° local; `Cmp_L` a 0°.
6. Montar los 6 pilares inferiores (local 10…75) y bajar la placa intermedia sobre los ejes y pilares. Verificar que los ejes entren en los adaptadores y rodamientos; no forzar.
7. Montar las 2 coronas Z54 y el piñón motor Z18 en local 91…111, y los 6 pilares superiores (85…124). Apretar en cruz.
8. Montar la placa motor (local 124…134) con sus 2 rodamientos (124…128). Verificar que los ejes de compuestos entren en los rodamientos.
9. Montar el separador frontal y la cuna del motor. Montar el NEMA23 con 4 × M5 × 20 y verificar el piñón en local 91…111.
10. Verificar dos caminos, mismo sentido y giro suave a mano. Insertar los ejes de salida, fijar la fase -7,5° global (90° entre tornillos) con las abrazaderas y apretar los prisioneros M3. Engrasar EP2.

---

## 5. Limitaciones conocidas

- **Tangencial, no intermeshing:** no hay self-wiping; pueden quedar zonas muertas y la pulpa se pega. Limpiar entre lotes.
- **PETG:** Tg ~75 °C; proceso ≤50 °C. Los engranajes son el fusible mecánico.
- **Eje de 6,35 mm:** sobre 537 mm flexiona; para fase 2, eje de 10 mm o acortar a 300–350 mm.
- **Relación 4,5:1:** para 100–150 rpm en los tornillos, el motor debe girar 450–675 rpm. Verificar la curva del NEMA23 a esa velocidad; si no llega, usar AC + VFD o aceptar 30–60 rpm y ajustar el proceso.
- **Sin rodamiento axial dedicado:** no cargar el 6703 con empuje alto.
- **`acople_directo.scad`:** solo prueba en vacío; con pulpa se desgasta y agarra.
