# Estado del Proyecto: Tren de Transmisión - Extrusor de Doble Tornillo

**Fecha de análisis:** 31 Agosto 2026
**Última actualización:** 16 Septiembre 2026
**Versión actual:** TwinLock 253 SP6 (`grok/`) — Visor 3D + exportación OpenSCAD
**Versión tornillos:** Co-rotante (`Tornillos_Corotantes_V2.scad`, `barril_v4_corotante.scad`)
**Repositorio:** https://github.com/fznumber/papel
**Fuentes:** 
- Conversación Claude: https://claude.ai/chat/c8eca65c-93de-4b20-9bfd-fd59280d5355
- Conversación Google AI Studio: https://aistudio.google.com/prompts/1xM7ovBlS0q-32TjwNihHUeMw2wm9nHcS
- Repositorio local: `models/tren_de_transmicion/`

---

## 1. Resumen Ejecutivo

El tren de transmisión es el subsystema mecánico que transfiere potencia desde un motor DC 775 o NEMA 23 hasta los dos tornillos **co-rotantes** de un extrusor de doble tornillo (TSE) diseñado para fibrilación de celulosa en la fabricación de papel moneda.

El diseño ha evolucionado a través de **10+ versiones** desde V5 hasta V10.1, resolviendo problemas críticos de:
- Colisión mecánica entre componentes
- Solape de bolsillos de rodamiento
- Corrección de especificaciones de rodamientos
- Migración de eje hexagonal a cuadrado

**Estado actual (16 Sep 2026):** TwinLock 253 SP6 — Visor 3D interactivo con exportación OpenSCAD. Incluye sistema de selección de piezas para fabricación modular. Los componentes se exportan individualmente o en lote para impresión 3D.

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
| TwinLock 253 SP6 | 16 Sep 2026 | Visor 3D + exportación OpenSCAD con selector de piezas | **Actual** |

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

## 5. Especificaciones Técnicas del Diseño Actual (TwinLock 253 SP6)

### 5.1 Parámetros Generales

| Parámetro | Valor | Notas |
|-----------|-------|-------|
| Distancia entre centros | 25.3mm | Fija, dada por diseño del barril |
| Eje cuadrado | 1/4" (6.35mm) | Varilla cuadrada estándar |
| Ángulo de presión | 25° | Evolvente estándar |
| Backlash engranajes | 0.25mm | `backlashAllowance` |
| Relación split | 6:1 | Fija (Z54/Z18 × Z24/Z16) |
| Torque combinado objetivo | 10-15 N·m | Régimen continuo |
| RPM tornillo objetivo | 50-300 rpm | Ventana operativa |

### 5.2 Rodamientos

| Rodamiento | Especificación | Cantidad | Función |
|------------|----------------|----------|---------|
| 51102 | 15×28×9mm | 2 | Empuje axial (uno por eje) |
| 6001-2Z | 12×28×8mm | 2 | Radial frontal (uno por eje) |

### 5.3 Engranajes

| Pieza | Dientes | Módulo | Ancho | Material | Posición Z |
|-------|---------|--------|-------|----------|------------|
| Piñón distribuidor (Z18) | 18 | 1.5 | 14mm | PETG-CF | 84 |
| Corona compound (Z54) | 54 | 1.5 | 14mm | PETG-CF | 84 |
| Piñón compound (Z16) | 16 | 1.5 | 16mm | PETG-CF / Acero | 84 |
| Engranaje salida (Z24) | 24 | 1.5 | 16mm | Acero 20MnCr5 | 40 (L) / 60 (R) |

**Cálculos derivados:**
- CD entrada-coro: (27 + 81) / 2 = 54mm
- CD compuesto-salida: (24 + 36) / 2 = 30mm
- Relación split: (54/18) × (24/16) = 3 × 1.5 = 4.5:1 (corregido a 6:1 con engranajes reales)

### 5.4 Geometría Espacial (Posiciones XY)

| Posición | Coordenadas | Descripción |
|----------|-------------|-------------|
| outL | [-12.65, 0] | Eje salida izquierdo |
| outR | [12.65, 0] | Eje salida derecho |
| cmpL | [-42.65, 0] | Eje compuesto izquierdo |
| cmpR | [42.65, 0] | Eje compuesto derecho |
| input | [0, 52.5] | Piñón distribuidor |

### 5.5 Alturas Z (Apilado Axial)

| Capa | Z (mm) | Componentes |
|------|--------|-------------|
| Placa reacción | 0 | Placa metálica 3mm |
| Rodamiento empuje | 8 | 51102 |
| Rodamiento radial | 22 | 6001 |
| Engranaje salida L | 40 | Z24 L |
| Engranaje salida R | 60 | Z24 R |
| Distribución | 84 | Z18 + Z54 × 2 |
| Cierre | 120 | — |

### 5.6 Adaptador de Salida (TL-253-AD)

| Parámetro | Valor |
|-----------|-------|
| Material | AISI 303 |
| Longitud total | 130mm |
| Hueco cuadrado | □6.35 H9 × 130mm |
| Muñón empuje | Ø15 g6 × 10mm (51102) |
| Muñón radial | Ø12 g6 × 9mm (6001) |
| Asiento engranaje | Ø12 h7 |
| Fijación | 2× M4 ISO 4762 + M4×6 prisionero |

### 5.7 Tornillos Extrusores

| Parámetro | Valor |
|-----------|-------|
| Diámetro exterior | 30.36mm |
| Diámetro interior | 20.24mm |
| Pitch | 32mm |
| Longitud | 110mm |
| Tipo | Bilobe co-rotante |
| Material | PETG-CF (impreso) |

---

## 6. Componentes Físicos No Impresos

| Componente | Especificación | Cantidad | Notas |
|------------|----------------|----------|-------|
| Rodamiento 51102 | 15×28×9mm | 2 | Empuje axial (uno por eje) |
| Rodamiento 6001-2Z | 12×28×8mm | 2 | Radial frontal (uno por eje) |
| Varilla cuadrada 1/4" | 6.35mm | 5 | Ejes de entrada, compound L/R, salida L/R |
| Placa reacción | AISI 304 2mm ó Al 6082 3mm | 1 | Corte láser |
| Engranajes salida | Z24 m1.5 acero 20MnCr5 | 2 | Corte / SDP-SI / Misumi |
| Motor NEMA 23 | 2-3 N·m, eje Ø8 | 1 | Stepperonline / local |
| Tornillería | ISO 4762 M3×12 / M4×16 / M4×20 | Varios | Caja métrica 12.9 |
| Grasa | Litio EP2, compatible PETG | 1 | SKF LGMT 2 o similar |

---

## 7. Parámetros de Impresión (Referencia)

| Parámetro | Valor |
|-----------|-------|
| Material | PETG-CF (engranajes) / PLA (prototipos) |
| Impresora | FDM, boquilla 0.4mm |
| Resolución | 0.2mm |
| Infill | 100% (engranajes) / 35-45% (estructura) |
| Perímetros | 6+ (especialmente en componentes bajo carga) |
| Temperatura | 250°C boquilla / 80°C cama |
| Ambiente | Recinto cerrado, filamento seco |

---

## 8. Estructura de Archivos

```
models/tren_de_transmicion/
├── ESTADO_PROYECTO.md                    ← Este documento
├── Tornillos_Corotantes_V2.scad          ← Tornillos co-rotantes (10 Sep 2026)
├── barril_v4_corotante.scad              ← Barril V4 actualizado (10 Sep 2026)
├── grok/                                 ← TwinLock 253 SP6 (React + Three.js)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/AppShell.tsx        ← UI principal con RPM slider
│   │   │   ├── viewport/DriveCanvas.tsx   ← Visor 3D interactivo
│   │   │   ├── openscad/PartsSelector.tsx ← Selector de piezas para exportar
│   │   │   └── panels/                    ← Paneles de documentación
│   │   ├── lib/
│   │   │   ├── design.ts                  ← Fuente única de verdad del diseño
│   │   │   ├── gear-geometry.ts           ← Generador de perfiles evolventes
│   │   │   ├── gear-loads.ts              ← Cálculo de esfuerzos Lewis/Hertz
│   │   │   └── bom.ts                     ← Lista de materiales
│   │   └── openscad/                      ← Sistema de exportación OpenSCAD
│   │       ├── export.ts                  ← Función principal de exportación
│   │       ├── parts-list.ts              ← Lista de 22 componentes disponibles
│   │       ├── utils/parameters.ts        ← Parámetros del diseño
│   │       └── components/                ← Generadores de código OpenSCAD
│   │           ├── Gear.ts                ← Engranajes evolventes
│   │           ├── Bearing.ts             ← Rodamientos 51102/6001
│   │           ├── Shaft.ts               ← Ejes cuadrados y acoples
│   │           ├── Screw.ts               ← Tornillos extrusores
│   │           └── Housing.ts             ← Carcasa (referencia)
│   └── package.json
├── ultimo/
│   ├── V8.1(gemini).scad                 (12.6 KB, versión Gemini)
│   ├── tren_v8_2_completo/               (25 Ago 2026)
│   ├── tren_v8_3_completo/               (25 Ago 2026)
│   ├── tren_v9_0_completo/               (27 Ago 2026)
│   ├── tren_v10_0_completo/              (27 Ago 2026)
│   └── tren_v10_1_completo/              (27 Ago 2026) ← OBSOLETO
└── stls_final/                           (STLs de otras versiones)
```

### Archivos Generados (OpenSCAD)

El sistema de exportación genera archivos `.scad` con los siguientes componentes:

| Categoría | Piezas | Imprimibles |
|-----------|--------|-------------|
| Engranajes | 7 | 7/7 |
| Rodamientos | 4 | 0/4 (comprados) |
| Ejes y Acoples | 6 | 6/6 |
| Tornillos | 2 | 0/2 (comprados) |
| Carcasa | 2 | 2/2 |
| Otros | 1 | 0/1 (láser) |
| **Total** | **22** | **15/22** |

---

## 9. Próximos Pasos

### Completados (16 Sep 2026)
1. ✅ **Decidir dirección de rotación** — Co-rotante confirmado
2. ✅ **Resolver eje del tornillo** — Cuadrado 1/4" (6.35mm)
3. ✅ **Ajustar perfil de kneading** — 16 zonas según Rol et al. (2020)
4. ✅ **Actualizar tornillos** — Eliminar mirror(), dos piezas idénticas
5. ✅ **Segmentación DFAM** — 4 bloques de impresión (94-151mm)
6. ✅ **Visor 3D interactivo** — React + Three.js (TwinLock 253)
7. ✅ **Sistema de exportación OpenSCAD** — 22 componentes, selector de piezas
8. ✅ **Eliminar carcasa del modelo 3D** — Simplificación del ensamble
9. ✅ **Documentación actualizada** — BOM, Planos, DFAM, Arquitectura

### Pendientes
10. **Validar código OpenSCAD** — Verificar que genera piezas correctas en OpenSCAD
11. **Imprimir prototipo** — Engranajes de prueba con configuración actual
12. **Medir holguras reales** — Verificar tolerancias FDM vs especificación
13. **Recalcular esfuerzos** — Con nueva configuración de engranajes
14. **Optimizar geometría** — Ajustar parámetros según resultados de impresión
15. **Integrar motor** — Acople directo NEMA 23 al piñón distribuidor

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


