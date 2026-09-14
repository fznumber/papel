# Estado del Proyecto: Tren de Transmisión - Extrusor de Doble Tornillo

**Fecha de análisis:** 31 Agosto 2026
**Última actualización:** 10 Septiembre 2026
**Versión actual:** V10.1 (`tren_transmision_v10_1.scad`) — Tren de transmisión obsoleto
**Versión tornillos:** Co-rotante (`Tornillos_Corotantes_V2.scad`, `barril_v4_corotante.scad`)
**Fuentes:** 
- Conversación Claude: https://claude.ai/chat/c8eca65c-93de-4b20-9bfd-fd59280d5355
- Conversación Google AI Studio: https://aistudio.google.com/prompts/1xM7ovBlS0q-32TjwNihHUeMw2wm9nHcS
- Repositorio local: `models/tren_de_transmidion/`

---

## 1. Resumen Ejecutivo

El tren de transmisión es el subsystema mecánico que transfiere potencia desde un motor DC 775 hasta los dos tornillos **co-rotantes** de un extrusor de doble tornillo (TSE) diseñado para fibrilación de celulosa en la fabricación de papel moneda.

El diseño ha evolucionado a través de **10+ versiones** desde V5 hasta V10.1, resolviendo problemas críticos de:
- Colisión mecánica entre componentes
- Solape de bolsillos de rodamiento
- Corrección de especificaciones de rodamientos
- Migración de eje hexagonal a cuadrado

**Estado actual (10 Sep 2026):** Se confirmó la arquitectura **co-rotante** (Rol et al. 2020, Clextral BIVIS). Los tornillos se rediseñaron completamente. El tren de transmisión V10.1 (contrarrotante) quedó **oficialmente obsoleto** — requiere nuevo diseño para co-rotación.

---

## 2. Historial de Versiones

| Versión | Fecha | Cambios Principales | Estado |
|---------|-------|---------------------|--------|
| V5-V6 | — | Diseño inicial, CGAL Error fixing, generador involuta | Obsoleto |
| V8.1 | ~24 Ago 2026 | Holgura gear2, base reducida D=20mm H=19mm, cinemática contrarrotante | Obsoleto |
| V8.2 | 25 Ago 2026 | Fix colisión pilar/bloque, holgura gear2 contra tope | Obsoleto |
| V8.3 | 25 Ago 2026 | pillar_short arranca en front_spacer_top (tope real) | Obsoleto |
| V9.0 | 27 Ago 2026 | Eje hexagonal → varilla cuadrada 3/8" (9.525mm) | Obsoleto |
| V10.0 | 27 Ago 2026 | Rodamiento 6002ZZ → 6703 (17×23×5mm) | Corregido |
| V10.1 | 27 Ago 2026 | bearing_w corregido a 4mm (ancho real catálogo) | Obsoleto |
| Tornillos V2 | 10 Sep 2026 | Co-rotante, eje 1/4", kneading discs, 16 zonas, segmentación 4 bloques | **Actual** |
| TwinLock 253 | 10 Sep 2026 | Visor 3D interactivo del tren de transmisión co-rotante (Grok App Builder) | Referencia |

---

## 3. Problemas Resueltos (Detalle)

### 3.1 Rodamiento 6002ZZ → 6703 (V10.0)

**Problema:**
Los bolsillos de rodamiento en las posiciones `pos_L` y `pos_R` (separadas 25.3mm, distancia fija entre ejes de tornillos) se fusionaban en una sola cavidad con el rodamiento 6002ZZ (OD=32mm). Se midió un solape de **1800mm³** mediante corte transversal del modelo impreso.

**Solución:**
Cambio a rodamiento 6703 (serie extra-delgada):
- OD nominal: 23mm (vs 32mm del 6002ZZ)
- ID nominal: 17mm
- Ancho: 4mm (confirmado con catálogo NTN/ISK/MISUMI)

**Resultado:**
- Queda **2.3mm de pared sólida real** entre ambos bolsillos
- El poste del `bearing_adapter` mejora de **0.45mm a 1.45mm** de pared alrededor del eje cuadrado
- **Nota:** Sigue siendo el punto más ajustado del tren — imprimir con 6+ perímetros

### 3.2 Corrección bearing_w: 5mm → 4mm (V10.1)

**Problema:**
El ancho del 6703 se usó como 5mm por error en V10.0. El catálogo de NTN/ISK/MISUMI confirma B=4mm.

**Solución:**
- Corrección de `bearing_w = 5` → `bearing_w = 4`
- 3 offsets que estaban escritos a mano como "9" en la vista de ensamblaje fueron corregidos para usar la variable `bearing_w`
- El fix se propaga automáticamente a los 12 puntos de referencia

**Verificación:**
Todos los STLs compilan limpio (Simple: yes) tras el cambio.

### 3.3 Colisión pilar/bloque frontal (V8.2/V8.3)

**Problema:**
El pilar corto (`pillar_short`) arrancaba en `Z_stage2` (44mm) directamente, creando un hueco de 4mm de aire entre el tope del bloque frontal (`spacer_base_front`) y la base del pilar. Esto causaba que el pilar quedara "flotando" sin apoyo real.

**Solución (V8.2):**
- Añadir `front_spacer_clearance = 4mm` para crear holgura real contra el tope

**Solución (V8.3):**
- `pillar_short` ahora arranca en `front_spacer_top = Z_stage2 - front_spacer_clearance` (40mm)
- El pilar se apoya efectivamente sobre el bloque frontal

### 3.4 Holgura gear2 contra tope (V8.2)

**Problema:**
`gear2` (engranaje verde, 60 dientes) tocaba el bloque frontal sin holgura (0mm de gap), causando interferencia mecánica.

**Solución:**
- `front_spacer_clearance = 4mm` añadido
- `front_spacer_top = Z_stage2 - front_spacer_clearance` calculado correctamente

### 3.5 Eje hexagonal → cuadrado 3/8" (V9.0)

**Problema:**
El eje hexagonal de 8mm (hex_shaft_flat = 8.3mm) limitaba la transferencia de torque y presentaba problemas de deslizamiento bajo carga.

**Solución:**
- Migración a varilla cuadrada 3/8" (9.525mm)
- `square_clearance = 0.3mm` para tolerancia de impresión
- Barreno cuadrado con indexado libre cada 90° (sync_teeth=12 es múltiplo de 4)
- Módulo `square_hole()` reemplaza `hex_hole()` en todas las piezas

### 3.6 Generador matemático de engranajes evolventes

**Implementación:**
- Módulo `involute_gear_2d(teeth, m, pressure_angle=20)` genera perfiles 2D completos
- Cálculo de círculo base, paso,-addendum, dedendum
- Función de involuta: `inv(a) = (tan(a) - (a * PI / 180)) * 180 / PI`
- Polígono con resolución configurable (`$fn=teeth*2`)

**Parámetros:**
- Ángulo de presión: 20° (estándar industrial)
- Backlash: 0.25mm
- Módulo principal: 1.5 (engranajes de transmisión)
- Módulo sync: 25.3/12 = 2.108 (engranajes de sincronización)

---

## 4. Problemas Pendientes

### 4.1 ~~🔴 CRÍTICO: Co-rotante vs Contrarrotante~~ — RESUELTO (10 Sep 2026)

**Decisión:** Co-rotante, basado en:
- Literatura: Rol et al. (2020) — fibrilación de celulosa por TSE
- Estándar industrial: Clextral BIVIS (máquina para papel moneda)
- Efecto self-wiping (autolimpieza continua) — estrictamente necesario para evitar zonas muertas

**Acciones tomadas:**
- Se eliminó `mirror()` en código de tornillos → dos tornillos idénticos
- Se migró eje de 3/8" a cuadrado de 1/4" (6.35mm) para dejar paredes macizas >3.15mm
- Se reprogramó perfil completo con 16 zonas según Rol et al. (2020)
- Tren de transmisión V10.1 quedó obsoleto — requiere rediseño para co-rotación

### 4.2 ~~🟡 MEDIO: Eje del tornillo vs eje de la caja~~ — RESUELTO (10 Sep 2026)

**Solución adoptada:** Cuadrado de 1/4" (6.35mm) en todo el eje.
- Pared maciza >3.15mm en cintura del perfil bilobal (vs 0.70mm con 3/8")
- Twist elástico de 5°-8° aceptable, absorbido por holgura FDM
- Simplifica ensamblaje y compatibilidad con todos los componentes

### 4.3 ~~🟡 MEDIO: Perfil de kneading no sigue el estudio~~ — RESUELTO (10 Sep 2026)

**Solución adoptada:** Perfil completo de 16 zonas según Rol et al. (2020):
- Zona 1: Forward largo (alimentación)
- Zona 2: Kneading Forward 45° (impregnación)
- Zona 3: Reverse 45° + Neutral 90° + Reverse corto (fibrilación — crítica)
- Zona 4: Forward largo (descarga)

### 4.4 🟢 BAJO: Planetario impreso descartado

**Evaluación:**
Se evaluó un reductor planetario NEMA23 impreso en FDM como alternativa.

**Rechazado por:**
- Tolerancias de corona interna (agujero dentado impreso en FDM)
- Backlash excesivo bajo carga continua
- Riesgo de creep (fluencia bajo esfuerzo sostenido) en uso continuo
- Ningún ejemplo validado para carga >5 N·m continua

**Alternativas consideradas:**
1. Reductor planetario comprado (AliExpress/envío internacional)
2. Motorreductor de gusano (hardware industrial genérico)
3. Poleas GT2/HTD + correa (sin corona interna)

---

## 5. Especificaciones Técnicas del Diseño Actual (V10.1)

### 5.1 Parámetros Generales

| Parámetro | Valor | Notas |
|-----------|-------|-------|
| Distancia entre tornillos | 25.3mm | Fija, dada por diseño del barril |
| Eje cuadrado | 1/4" (6.35mm) | Varilla cuadrada estándar — Migrado desde 3/8" |
| Holgura eje | 0.3mm | `square_clearance` |
| Backlash engranajes | 0.25mm | `backlash_offset` |
| Diámetro eje motor | 5.2mm | `motor_shaft_d` |
| Diámetro cuerpo motor | 57mm | `motor_body_d` |
| BC tornillos motor | 47.14mm | `motor_bolt_bc` |
| Diámetro piloto motor | 38.5mm | `motor_pilot_d` |

### 5.2 Rodamiento 6703

| Dimensión | Nominal | Bolsillo | Notas |
|-----------|---------|----------|-------|
| ID | 17mm | 16.8mm | Interferencia leve (-0.2mm) |
| OD | 23mm | 23.05mm | Holgura ligera (+0.05mm) |
| Ancho | 4mm | 4mm | `bearing_w` |

**Referencia catálogo:** NTN/ISK/MISUMI — da_min=18.6mm, Da_max=21.4mm

### 5.3 Engranajes

| Pieza | Tipo | Dientes | Módulo | Ancho | Posición Z | Color (ensamble) |
|-------|------|---------|--------|-------|------------|------------------|
| sync_gear (×2) | Recto externo | 12 | 2.108 | 24mm | 16-40 | Cyan |
| gear2 | Recto externo | 60 | 1.5 | 20mm | 44-64 | Green |
| pinion2 | Recto externo | 18 | 1.5 | 20mm | 44-64 | Orange |
| gear1 | Recto externo | 60 | 1.5 | 20mm | 68-88 | Red |
| pinion1 | Recto externo | 18 | 1.5 | 20mm | 68-88 | Blue |

**Cálculos derivados:**
- `center_dist = ((18 + 60) * 1.5 / 2) + 0.25 = 58.75mm`
- `y_int = sqrt(58.75² - (25.3/2)²) = 57.65mm`

### 5.4 Geometría Espacial (Posiciones XY)

| Posición | Coordenadas | Descripción |
|----------|-------------|-------------|
| pos_L | [-12.65, 0] | Eje izquierdo (tornillo) |
| pos_R | [12.65, 0] | Eje derecho (tornillo) |
| pos_Int | [0, 57.65] | Engranaje intermedio |
| pos_Mot | [0, 116.4] | Motor |

### 5.5 Alturas Z (Apilado)

| Capa | Z_min | Z_max | Componentes |
|------|-------|-------|-------------|
| Base plate | 0 | 10 | Placa base, bolsillos rodamiento |
| Sync gears | 16 | 40 | 2× sync_gear, eje cuadrado |
| Stage 2 | 44 | 64 | gear2 (izq), pinion2 (inter) |
| Stage 1 | 68 | 88 | gear1 (inter), pinion1 (motor) |
| Motor plate | 100 | 110 | Placa motor, soporte 6004 |
| Motor cradle | 100 | 130 | Soporte motor 775 |

### 5.6 Piezas del Ensamble (12 componentes)

| # | Pieza | Función | Cantidad |
|---|-------|---------|----------|
| 1 | base_plate | Placa base con bolsillos de rodamiento | 1 |
| 2 | motor_plate | Placa superior con soporte motor | 1 |
| 3 | spacer_base_front | Bloque frontal de separación | 1 |
| 4 | pillar | Pilar largo (6 posiciones) | 4 |
| 5 | pillar_short | Pilar corto (posiciones frontales) | 2 |
| 6 | sync_gear | Engranaje de sincronización | 2 |
| 7 | gear1 | Engranaje grande stage 1 | 1 |
| 8 | gear2 | Engranaje grande stage 2 | 1 |
| 9 | pinion1 | Piñón stage 1 (motor) | 1 |
| 10 | pinion2 | Piñón stage 2 | 1 |
| 11 | bearing_adapter | Adaptador de rodamiento | 4 |
| 12 | motor_cradle | Soporte de motor | 1 |

**Total piezas impresas:** 18 (contando sync_gear×2, pillar×4, pillar_short×2, bearing_adapter×4)

---

## 6. Componentes Físicos No Impresos

| Componente | Especificación | Cantidad | Notas |
|------------|----------------|----------|-------|
| Rodamiento 6703ZZ | 17×23×4mm | 4 | pos_L, pos_R, pos_Int (base) + par en motor_plate |
| Rodamiento 6004ZZ | 20×42×12mm | 2 | Eje de salida |
| Varilla cuadrada 1/4" | 6.35mm | 2 | Migrado desde 3/8" — paredes >3.15mm en cintura |
| Motor 775 DC | 36V 9000RPM (original) | 1 | O 12V según especificación actual |
| Tornillos M3 | 30mm | 7 | Montaje de tapa |
| Tornillos M5 | 40mm | 2 | Fijación engranaje grande y brazo servo |
| Tornillo M3 | 30mm | 1 | Fijación gear feedback a eje 20mm |
| Tuerca M3/M5 | — | — | Correspondiente a tornillos |
| Potenciómetro 10K | Lineal | 1 | Solo si se usa como servo |

---

## 7. Parámetros de Impresión (Referencia)

| Parámetro | Valor |
|-----------|-------|
| Material | PLA (Creality) |
| Impresora | Flsun Q5 / Anet E12 / Reprap Prusa I3 |
| Resolución | 0.2mm |
| Infill | 35-45% |
| Soportes | No |
| Perímetros | 6+ (especialmente en bearing_adapter) |

---

## 8. Estructura de Archivos

```
models/tren_de_transmision/
├── ESTADO_PROYECTO.md                    ← Este documento
├── Tornillos_Corotantes_V2.scad          ← Tornillos co-rotantes (10 Sep 2026)
├── barril_v4_corotante.scad              ← Barril V4 actualizado (10 Sep 2026)
├── grok/                                 ← Visor 3D TwinLock 253 (Grok App Builder)
├── ultimo/
│   ├── V8.1(gemini).scad                 (12.6 KB, versión Gemini)
│   ├── tren_v8_2_completo/               (25 Ago 2026)
│   ├── tren_v8_3_completo/               (25 Ago 2026)
│   ├── tren_v9_0_completo/               (27 Ago 2026)
│   ├── tren_v10_0_completo/              (27 Ago 2026)
│   ├── tren_v10_1_completo/              (27 Ago 2026) ← OBSOLETO
│   │   ├── tren_v10_1/
│   │   │   ├── tren_transmision_v10_1.scad   (344 líneas, 16.4 KB)
│   │   │   ├── export_stls.sh                (script de exportación)
│   │   │   └── stl/                          (12 STLs, 3.9 MB total)
│   │   └── tren_v10_1_completo.zip           (353 KB)
│   ├── stl_tren_transmision/             (STLs versión anterior)
│   └── tren_transmision_v6_3.stl         (1.36 MB, versión legacy)
├── stls_final/                           (STLs de otras versiones)
└── stl_tren_transmision.zip              (323 KB)
```

### Tamaños de STLs (V10.1)

| Archivo | Tamaño |
|---------|--------|
| base_plate.stl | 374 KB |
| motor_plate.stl | 291 KB |
| gear1.stl | 715 KB |
| gear2.stl | 715 KB |
| pinion1.stl | 568 KB |
| pinion2.stl | 511 KB |
| sync_gear.stl | 400 KB |
| spacer_base_front.stl | 116 KB |
| bearing_adapter.stl | 104 KB |
| motor_cradle.stl | 67 KB |
| pillar.stl | 41 KB |
| pillar_short.stl | 41 KB |
| **Total** | **3.9 MB** |

---

## 9. Próximos Pasos

### Completados (10 Sep 2026)
1. ✅ **Decidir dirección de rotación** — Co-rotante confirmado
2. ✅ **Resolver eje del tornillo** — Cuadrado 1/4" (6.35mm)
3. ✅ **Ajustar perfil de kneading** — 16 zonas según Rol et al. (2020)
4. ✅ **Actualizar tornillos** — Eliminar mirror(), dos piezas idénticas
5. ✅ **Segmentación DFAM** — 4 bloques de impresión (94-151mm)

### Pendientes
6. **Rediseñar tren de transmisión** para co-rotación (nuevo archivo .scad)
7. **Recalcular esfuerzos** con nueva configuración co-rotante
8. **Exportar STLs finales** del tren rediseñado
9. **Verificar clearance** entre todos los componentes en ensamble
10. **Imprimir prototipo** de prueba
11. **Medir holguras reales** vs especificación

---

## 10. Actualización: Rediseño del Subsistema de Tornillos Extrusores (10 Sep 2026)

**Módulos afectados:** `Tornillos_Corotantes_V2.scad` y `barril_v4_corotante.scad`

### 10.1 Evolución Topológica: De Contrarrotante a Co-Rotante

**El Cambio:** Se eliminó el comando `mirror()` en el código de los tornillos. Ahora se imprimen dos tornillos exactamente idénticos y se montan desfasados a 90° en la máquina para que giren en el mismo sentido (Co-rotantes).

**Justificación:** Basado en la literatura de extrusión de celulosa (Rol et al., 2020) y los estándares industriales (Clextral BIVIS para papel moneda), el diseño co-rotante intermeshing es estrictamente necesario para lograr el efecto "self-wiping" (autolimpieza continua), evitando zonas muertas donde la pulpa se pudra o se atasque.

### 10.2 Dimensión del Eje Central: Migración a Cuadrado de 1/4" (6.35 mm)

**El Cambio:** Se descartó el uso de varillas de 3/8" (9.52 mm) y ejes hexagonales de 8 mm. Todos los huecos pasantes se parametrizaron para varilla cuadrada estándar de 1/4 de pulgada.

**Justificación Estructural:** Un eje de 3/8" dejaba una pared de plástico de apenas ~0.70 mm en la "cintura" del perfil bilobal (radio de raíz 7.65 mm), lo que garantizaba el estallido del PETG bajo torque. El eje de 1/4" reduce la diagonal interna, dejando una pared maciza de >3.15 mm. La flexibilidad elástica torsional de la varilla de 1/4" (twist de 5°-8°) se considera aceptable y absorbida por la holgura del sistema FDM.

### 10.3 Geometría de Amasado (Kneading Blocks): Discos Planos

**El Cambio:** Se eliminaron las transiciones suaves (rampas generadas por `hull()`) entre discos de amasado, reemplazándolas por discos planos apilados con un solape microscópico (0.02 mm) para asegurar la integridad de la malla CGAL (manifoldness).

**Justificación Funcional:** Un bloque de amasado lofteado actúa como una rosca defectuosa, haciendo que la pulpa resbale. Los discos planos y afilados son necesarios para crear "zonas de pellizco" (nip regions) contra el barril (diámetro interno 26.7 mm), triturando físicamente las fibras de algodón.

### 10.4 Perfil Termomecánico Científico (16 Zonas)

Se reprogramó la longitud y secuencia de los tornillos basándose estrictamente en el estudio de Rol et al. (2020) para fibrilación óptima. La longitud total se incrementó a **537.63 mm (L/D = 21.25:1)**.

| Zona | Función | Tipo | Justificación |
|------|---------|------|---------------|
| Z1 | Alimentación | Transporte paso largo (Forward) | Maximiza captación volumétrica de tela sin generar cizalla prematura |
| Z2 | Impregnación | Kneading Forward 45° | Mezcla química alcalina suave que empuja el material, sin acortar la fibra |
| Z3 | Fibrilación (Crítica) | Reverse 45° + Neutral 90° + Reverse corto | Genera "pulsos de presión" masivos que deshilachan la celulosa a nivel microscópico sin degradación térmica |
| Z4 | Descarga | Transporte paso largo | Evacúa el material estabilizado hacia el dado sin sobre-procesarlo |

### 10.5 Adaptación para Manufactura Aditiva (Segmentación)

**El Cambio:** El modelo de 537.6 mm se programó para cortarse automáticamente en **4 Bloques de Impresión** (seg1 a seg4) de entre 94 mm y 151 mm de altura.

**Justificación (DFAM):** Evita el bamboleo (Z-wobble) en impresoras de pórtico como la Ender-3 Pro, maximizando la calidad de capa. Los cortes matemáticos coinciden con ángulos ortogonales (0° y 270°), garantizando que los bloques encajen en el eje cuadrado de 1/4" manteniendo la continuidad espiral de los lóbulos de forma natural.

### 10.6 Impacto en Sistemas Adyacentes

- **Barril Extrusor:** Se actualizó a V4 (Longitud total 538 mm) y se integraron rodamientos axiales 51102 con collares de empuje adaptados a 1/4"
- **Tren de Transmisión:** El diseño V10.1 (contrarrotante) quedó oficialmente obsoleto. La nueva arquitectura debe contemplar el giro síncrono (co-rotante) y acoples de 1/4"

---

## 11. Referencias

- **Rol et al. (2020)** — "Fibrillation of cellulose by twin-screw extrusion" — Referencia principal para perfiles de tornillo
- **Freville et al. (2024/2025)** — Seguimientos del mismo grupo de investigación
- **Clextral BIVIS** — Extrusor de referencia para papel moneda (co-rotante, intermeshing, self-wiping)
- **LUDOVIC** — Software de referencia para modelado de TSE co-rotantes (desarrollado por Bruno Vergnes)
- **Catálogo NTN/ISK/MISUMI** — Especificaciones de rodamientos


