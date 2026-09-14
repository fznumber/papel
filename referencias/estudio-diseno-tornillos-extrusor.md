# Estudio: Diseño Óptimo de Tornillos para Extrusión de Fibra de Algodón

**Fecha:** Junio 2026
**Proyecto:** Extrusor de Doble Tornillo para Papel Moneda
**Fuentes:** Investigación bibliográfica + papers especializados + experiencia industrial de Clextral

---

## Resumen Ejecutivo

No existe un estándar universal para diseño de tornillos en extrusión de fibra celulósica. Sin embargo, la investigación reciente (2019-2025) ha producido hallazgos específicos que permiten definir pautas claras. El paper más relevante es **Rol et al. (2020)** que optimizó perfiles de tornillo para nanofibrilación de celulosa por TSE, demostrando que **6 bloques de kneading con ángulo de staggering invertido (left-handed)** producen CNF de alta calidad en un solo pase — equivalente a 4 pases con un perfil clásico.

**Hallazgo clave:** El diseño de tornillos para fibra celulósica difiere fundamentalmente del diseño para plásticos o alimentos. La diferencia principal es que **no se busca fundir** sino **fibrilar mecánicamente** las fibras, manteniendo la estructura de celulosa.

---

## 1. Por qué el diseño para fibra es diferente

### Extrusión de plásticos vs. fibra celulósica

| Aspecto | Plásticos/polímeros | Fibra celulósica |
|---------|-------------------|-----------------|
| Objetivo | Fundir, mezclar, compoundear | Fibrilar, refinar, desfibrilar |
| Estado del material | F fundido viscoso | Suspensión acuosa de fibras sólidas |
| Temperatura | 150-300°C (sobre el punto de fusión) | 20-100°C (sin fusión) |
| Mecanismo clave | Flujo viscoso + difusión | Cizallamiento mecánico + apertura de fibras |
| Relleno del barril | ~100% (totalmente lleno) | Variable (parcialmente lleno) |
| Riesgo principal | Degradación térmica | Rotura excesiva de fibras, atascamiento |
| Perfil de presión | Crece hacia el dado | Variable, controlado por elementos reversos |

### Implicaciones para el diseño de tornillos

1. **No se necesitan zonas de compresión agresiva** (como en plásticos para fundir)
2. **Los elementos kneading son críticos** pero por razones diferentes: fibrilan fibras, no dispersan aditivos
3. **Los elementos reversos (left-handed)** son esenciales para crear relleno y tiempo de residencia
4. **El control de temperatura es menos crítico** pero el control de cizallamiento lo es más
5. **El paso (pitch) debe ser mayor** para evitar rotura excesiva de fibras largas

---

## 2. Elementos de tornillo: Tipos y funciones

### 2.1 Elementos de transporte (Conveying Elements)

**Función:** Transportar material hacia adelante con cizallamiento mínimo.

| Parámetro | Efecto | Recomendación para fibra |
|-----------|--------|--------------------------|
| **Paso largo (40-60 mm)** | Mayor volumen libre, menor cizallamiento | Usar en zona de alimentación |
| **Paso medio (20-30 mm)** | Balance transporte/cizallamiento | Usar en zonas intermedias |
| **Paso corto (10-15 mm)** | Mayor cizallamiento, mayor presión | Usar solo donde se necesita compresión |
| **Doble entrada (2-flight)** | Balance estándar | Elemento base para todo el tornillo |
| **Triple entrada (3-flight)** | Canales más estrechos, mayor cizallamiento | Evitar para fibras largas |
| **Simple entrada (1-flight)** | Mayor volumen libre, menor cizallamiento | Usar para alimentación de fibras voluminosas |

**Para fibra de algodón:**
- Usar preferentemente **elementos de doble entrada** con **pasos de 30-40 mm** en zona de alimentación
- Evitar triples entradas (demasiado cizallamiento para fibras largas)
- Las simples entradas son buenas para la alimentación inicial donde la fibra es voluminosa

### 2.2 Bloques de kneading (Kneading Blocks)

**Función:** Aplicar cizallamiento intenso para fibrilar las fibras. Es el elemento más importante para nuestro proceso.

**Parámetros del kneading:**

| Parámetro | Opciones | Efecto en fibra |
|-----------|----------|----------------|
| **Ángulo de staggering** | 30°, 45°, 60°, 90° | Controla dirección del flujo y nivel de cizallamiento |
| **Número de discos** | 3, 4, 5, 6 | Más discos = más tiempo de cizallamiento |
| **Ancho de disco** | Estrecho (~7.5mm) / Ancho (~15mm) | Discos anchos = más cizallamiento |
| **Dirección** | Forward (RH) / Reverse (LH) / Neutral (90°) | Forward transporta, Reverse retiene, Neutral solo cizalla |
| **Número de lóbulos** | 2 (bípedal) / 3 (tripedal) | 2 lóbulos: mejor wiping. 3 lóbulos: más volumen |

**Hallazgos críticos de la investigación:**

#### Ángulo de staggering óptimo para fibra

- **30° forward:** Cizallamiento suave, buen transporte. Ideal para primera zona de kneading.
- **45° forward:** Balance entre cizallamiento y transporte. El más usado en general.
- **60° forward:** Alto cizallamiento, menor transporte. Bueno para refinado.
- **90° neutral:** Máximo cizallamiento, sin transporte. Crea zona de relleno máximo.
- **45° reverse (left-handed):** Alto cizallamiento + retención de material. **CRÍTICO para fibra.**

> **Hallazgo de Rol et al. (2020):** El perfil optimizado usa **6 bloques de kneading con staggering invertido (left-handed)**. Esto crea alta retención de material y cizallamiento intenso, permitiendo fibrilación en un solo pase.

#### Número de discos óptimo

- **3-4 discos:** Cizallamiento moderado. Usar en zonas de transición.
- **5-6 discos:** Cizallamiento alto. Usar en zona principal de fibrilación.
- **Más de 6 discos:** Riesgo de degradación de fibras y calentamiento excesivo.

#### Recomendación para kneading en fibra de algodón

| Zona | Tipo de kneading | Ángulo | Discos | Función |
|------|-----------------|--------|--------|---------|
| Zona 2a (impregnación) | Forward | 30-45° | 3-4 | Mezclado inicial suave |
| Zona 2b (compresión) | Forward | 45-60° | 4-5 | Apertura de fibras |
| Zona 3a (refinado principal) | **Reverse (LH)** | **45°** | **5-6** | **Fibrilación intensiva** |
| Zona 3b (refinado final) | Neutral/Reverse | 60-90° | 4-5 | Refinado fino |

### 2.3 Elementos reversos (Left-Hand / Reverse Elements)

**Función:** Empujar material hacia atrás, creando zona de alto relleno y tiempo de residencia.

**Por qué son esenciales para fibra:**
1. **Aumentan el tiempo de residencia** sin aumentar L/D
2. **Crean zonas de alto relleno** donde el cizallamiento es máximo
3. **Permiten que las fibras se expongan** repetidamente al cizallamiento
4. **Controlan la velocidad de avance** del material

**Tipos:**
- **Elemento reverso de paso largo:** Retención suave, cizallamiento moderado
- **Elemento reverso de paso corto:** Retención fuerte, alto cizallamiento
- **Elemento reverso con ranuras (cut flight):** Cizallamiento + mezclado distributivo

> **Dato de Clextral para papel moneda:** Los elementos CF1C y CF2C (cut flight reverse) son específicamente diseñados para shearing y mixing en procesamiento de fibra.

### 2.4 Mecanismo de retención de material

**Pregunta clave:** ¿Cómo se retiene el material en cada fase del proceso?

#### Fase 1: Conveying RH (Transporte)

```
Vista lateral del tornillo:

    ═══════════════════════════►
    Hélice avanza → material fluye libremente
    
    Material se mueve HACIA ADELANTE sin obstáculos
```

**Función:** Solo transporta, no retiene. El material fluye a través de los canales entre las hélices.

#### Fase 2: Kneading LH (Retención + Mezcla)

```
Vista lateral:

    ════╬═══╬═══╬═══════════►
        ↑   ↑   ↑
     Discos obstruyen el flujo
```

**Vista en sección transversal:**

```
    Disco 1    Disco 2    Disco 3
       ↓          ↓          ↓
      ┌─┐       ┌─┐       ┌─┐
      │░│       │▓│       │░│   ← Cada disco tiene
      └─┘       └─┘       └─┘      ángulo diferente
       0°        45°       90°
       
    Material queda ATRAPADO entre los discos
```

#### ¿Por qué se retiene?

| Factor | Efecto |
|--------|--------|
| **Staggering** | Discos a 45°/60°/90° obstruyen el flujo |
| **Mano LH** | Empuja material HACIA ATRÁS |
| **Intermeshing** | Los dos tornillos se "limpian" entre sí |
| **Canales estrechos** | El material no puede pasar fácilmente |

#### Ejemplo visual: Kneading 45° LH

```
Flujo del material →

   Disco 1 (0°)   Disco 2 (45°)   Disco 3 (90°)
      ┌───┐           ┌───┐           ┌───┐
      │   │           │  ╱│           │ ╱ │
      │   │     →     │ ╱ │     →     │╱  │
      │   │           │╱  │           │   │
      └───┘           └───┘           └───┘
        │               │               │
        └───────┬───────┴───────┬───────┘
                │               │
           ZONA DE         ZONA DE
          RETENCIÓN       MEZCLA
```

**El material:**
1. Entra al primer disco (libre)
2. Al segundo disco (ángulo 45°) - **se atasca**
3. Al tercer disco (ángulo 90°) - **más retención**
4. Sale con mayor dispersión de fibras

#### Para fibras de algodón

```
Sin kneading:  ═══════════════════►  Fibras pasan sin procesar

Con kneading:  ════╬═══╬═══╬════►  Fibras se fibrilan
  
  ↑ Las fibras quedan atrapadas y se separan por acción del cizallamiento
```

**Resultado:** Las fibras de algodón se separan en fibrillas más finas.

### 2.4 Elementos especiales

- **Elementos con estrías laterales (mixing pins):** Mezclado distributivo sin alto cizallamiento
- **Elementos dentados (gear mixing):** Mezclado distributivo suave
- **Elementos de degas (vent elements):** Para evacuar vapor en zonas de ventilación

---

## 3. Perfil de tornillo óptimo para fibra de algodón

### 3.1 Estructura general del perfil

Basado en la investigación (Rol et al. 2020, Freville et al. 2024, Clextral banknotes), el perfil óptimo para fibra de algodón sigue esta estructura:

```
ZONA 1: ALIMENTACIÓN (L/D 0-4)
├── Transporte paso largo (1-2 elementos, 30-40mm)
└── Transporte paso medio (1-2 elementos, 20-30mm)
    → Función: Tomar fibra húmeda y transportarla
    → Cizallamiento: Mínimo
    → Relleno: ~30-50%

ZONA 2: IMPREGNACIÓN Y MEZCLADO (L/D 4-10)
├── Kneading forward 30-45° (3-4 discos)
├── Transporte paso medio (1 elemento)
├── Kneading forward 45° (4-5 discos)
└── [Puerto de inyección de químicos]
    → Función: Impregnar fibras con soda ash, mezclar
    → Cizallamiento: Moderado
    → Relleno: ~50-70%

ZONA 3: FIBRILACIÓN / REFINADO (L/D 10-18) ← LA MÁS IMPORTANTE
├── Kneading reverse 45° (5-6 discos) ← ELEMENTO CLAVE
├── Transporte paso corto (1 elemento)
├── Kneading neutral 90° (4-5 discos)
├── Kneading reverse 45° (5-6 discos) ← SEGUNDO BLOQUE CRÍTICO
├── Transporte paso medio (1 elemento)
└── [Puerto de ventilación opcional]
    → Función: Fibrilar fibras en microfibrillas
    → Cizallamiento: MÁXIMO
    → Relleno: ~80-100%
    → Temperatura: Monitorear (máx 70-80°C)

ZONA 4: DESCARGA (L/D 18-24)
├── Transporte paso medio (1-2 elementos)
├── Transporte paso largo (1-2 elementos)
└── [Dado de salida]
    → Función: Presurizar y expulsar material
    → Cizallamiento: Bajo-moderado
    → Relleno: ~40-60%
```

### 3.2 El perfil optimizado de Rol et al. (2020)

Este es el perfil más relevante disponible en la literatura para fibrilación de celulosa:

**Perfil clásico (referencia):**
- Mezcla de transportes y kneading forward
- Requería **4+ pases** para producir CNF de alta calidad

**Perfil optimizado (nuevo):**
- **6 bloques de kneading con staggering invertido (left-handed)**
- Producía CNF equivalente en **1 solo pase**
- Sin aumento en consumo de energía
- CNF con transparencia alta y módulo de Young ~13 GPa

> **Conclusión directa:** Para nuestro caso (fibrilación de algodón para papel moneda), el perfil debe tener **múltiples bloques de kneading reverse** en la zona de refinado. Esto es lo opuesto al diseño típico de plásticos donde los kneading son todos forward.

### 3.3 Parámetros geométricos del tornillo

| Parámetro | Valor para fibra | Razón |
|-----------|-----------------|-------|
| **D/d (relación diámetros)** | 1.5-1.6 (canal moderadamente profundo) | Balance entre capacidad de transporte y cizallamiento |
| **L/D total** | 20-24:1 | Suficiente para 4 zonas sin sobre-cizallar |
| **Entradas del tornillo** | Doble entrada (2-flight) estándar | Balance transport/cizallamiento |
| **Paso transporte alimentación** | 0.8-1.0 × D (16-20mm para D=20mm) | Capturar fibra voluminosa |
| **Paso transporte general** | 0.6-0.8 × D (12-16mm) | Transporte eficiente |
| **Paso kneading** | 0.5-0.75 × D (10-15mm) | Compresión moderada |
| **Espesor de disco kneading** | 7.5-15 mm | Discos anchos para más cizallamiento |
| **Holgura radial** | 0.15-0.25 mm | Mayor que plásticos (fibra es abrasive) |
| **Holgura entre tornillos** | 0.10-0.20 mm | Evitar contacto pero mantener wiping |

---

## 4. Diferencias clave vs. diseño para plásticos

| Característica | Para plásticos | Para fibra celulósica |
|---------------|---------------|----------------------|
| **Kneading angle** | 45-60° forward predominante | **45° reverse (LH) dominante** |
| **Número de bloques kneading** | 2-3 bloques | **4-6 bloques** (más zonas de cizalla) |
| **Elementos reversos** | 1-2 (solo para crear presión) | **3-5 (esenciales para relleno)** |
| **Paso promedio** | Corto (10-20mm) | **Largo (20-40mm)** (evitar rotura de fibra) |
| **Compresión** | Agresiva (reducción de paso) | **Suave o nula** (las fibras no se funden) |
| **Zona de alimentación** | Paso corto para grip | **Paso largo** para capturar fibra voluminosa |
| **L/D típico** | 32-48:1 | **20-24:1** (menos tiempo = menos degradación) |
| **Velocidad** | 200-1000 RPM | **100-400 RPM** (menor cizallamiento) |
| **Temperatura** | Controlada activamente | **Principalmente por fricción** (pasivo) |

---

## 5. Recomendaciones específicas para nuestro extrusor (D=20mm)

### 5.1 Elementos a adquirir

Basado en la investigación, la configuración mínima recomendada es:

| # | Elemento | Designación (estilo Clextral) | Cantidad | Función |
|---|----------|-------------------------------|----------|---------|
| 1 | Transporte 1F paso largo | C1F-40/40 R | 2 | Alimentación |
| 2 | Transporte 2F paso medio | C2F-30/30 R | 4 | Transporte general |
| 3 | Transporte 2F paso corto | C2F-15/15 R | 3 | Transición / compresión suave |
| 4 | **Kneading 2-lobe 45° forward** | KBW-45/5/30 F | 2 | Mezclado inicial |
| 5 | **Kneading 2-lobe 45° reverse** | KBW-45/5/30 R | **4** | **Fibrilación principal** |
| 6 | Kneading 2-lobe 90° neutral | KBW-90/4/30 N | 2 | Refinado |
| 7 | **Elemento reverso** | C1F-15/15 L | 2 | Crear zonas de relleno |
| 8 | Elemento de degas | Vent element | 1 | Zona de ventilación |
| | **Total** | | **~20 elementos** | |

### 5.2 Secuencia de ensamblaje en el eje

```
Tolva →                                              → Dado
═══════════════════════════════════════════════════════════════

Zona 1: ALIMENTACIÓN (60mm)
  C1F-40/40 R → C1F-40/40 R → C2F-30/30 R

Zona 2: IMPREGNACIÓN (60mm)
  C2F-30/30 R → KBW-45/5/30 F → C2F-15/15 R
  [Inyección de soda ash aquí]

Zona 3: FIBRILACIÓN (120mm) ← LA ZONA CRÍTICA
  KBW-45/5/30 R → C1F-15/15 L → KBW-45/5/30 R
  → C1F-15/15 L → KBW-90/4/30 N → C1F-15/15 L
  → KBW-45/5/30 R → C2F-15/15 R

Zona 4: DESCARGA (60mm)
  C2F-30/30 R → C2F-30/30 R → Dado
```

### 5.3 Parámetros de operación recomendados

| Parámetro | Rango | Óptimo estimado |
|-----------|-------|-----------------|
| Velocidad del tornillo | 100-300 RPM | **150-200 RPM** |
| Temperatura zona 3 | 40-80°C | **50-70°C** |
| Consistencia de pulpa | 20-40% sólidos | **25-35%** |
| Alimentación | Continua, controlada | Cámara de aire variable |
| Tiempo de residencia | 1-5 minutos | **2-3 minutos** |

---

## 6. Papers de referencia

### Paper más relevante: Rol et al. (2020)
- **Título:** "Nanocellulose Production by Twin-Screw Extrusion: Simulation of the Screw Profile To Increase the Productivity"
- **Autores:** Fleur Rol, Bruno Vergnes, Nadia El Kissi, Julien Bras
- **Publicado:** ACS Sustainable Chemistry & Engineering, Vol 8(1), pp 50-59, 2020
- **DOI:** 10.1021/acssuschemeng.9b01913
- **Hallazgo principal:** Perfil optimizado con 6 bloques de kneading reverse produce CNF en 1 pase vs 4 pases del perfil clásico
- **Relevancia:** ★★★★★ — Directamente aplicable a nuestro caso

### Freville et al. (2024)
- **Título:** "Process stability optimization of the twin-screw extrusion adapted for concentrated cellulose fibrillation"
- **Publicado:** Journal of Materials Science, Vol 59, pp 15904-15919
- **Hallazgo:** Torque alto y fluctuante + temperaturas crecientes = proceso inestable. Pulpas con enzimas y tiempo largo de residencia causan inestabilidad.
- **Relevancia:** ★★★★ — Guía para evitar problemas de estabilidad

### Freville et al. (2025)
- **Título:** "Single twin-screw extrusion step to produce highly concentrated MFC powder"
- **Publicado:** Cellulose, 2025
- **Hallazgo:** MFC al 40-50% de contenido sólido en un solo pase. 56% fracción nanométrica, DP 262, cristalinidad 80.2%
- **Relevancia:** ★★★★ — Demuestra factibilidad de un solo pase

### Clextral (industria)
- **Experiencia:** Suministra equipos TSE para papel moneda desde 1990
- **Clientes:** Banco de Francia, Arjo Wiggins, Inglaterra, Rusia, China
- **Proceso:** Integración de marca de agua, hilos de seguridad y trazadores químicos durante la extrusión
- **Relevancia:** ★★★★★ — Único proveedor con experiencia real en papel moneda

### Technovel (ingeniería)
- **Guía de diseño:** Screw Elements & Screw Configuration
- **Principios:** L/D ratio, D/d ratio, número de entradas, fill rate design
- **Relevancia:** ★★★ — Fundamentos de diseño aplicables

### SPE - Kneading Block Fundamentals
- **Hallazgo:** Kneading 3-lobe 45° forward NO es eficiente para transporte — actúa como elemento restrictivo a altas velocidades
- **Implicación:** Para fibra, usar **2-lobe kneading** que tiene mejor wiping y transporte
- **Relevancia:** ★★★ — Información práctica de kneading

---

## 7. Conclusión y recomendación final

### La forma óptima del tornillo para fibra de algodón es:

1. **Mayoría de elementos de doble entrada (2-flight)** con pasos de 20-40mm
2. **4-6 bloques de kneading 2-lobe con staggering invertido (45° LH)** en la zona de refinado
3. **2-3 elementos reversos (left-hand)** para crear zonas de alto relleno
4. **Pasos relativamente largos** (20-40mm) para evitar rotura excesiva de fibras
5. **L/D total de 20-24:1** (no más largo, para evitar degradación)
6. **Sin zona de compresión agresiva** (las fibras no se funden)

### Lo que NO se debe hacer (basado en investigación):

1. **NO usar perfiles de plásticos** — están optimizados para fundir, no para fibrilar
2. **NO usar excesivos kneading forward** — crean demasiado cizallamiento sin retención
3. **NO usar triples entradas** — rompen las fibras demasiado
4. **NO usar pasos cortos (<15mm) en toda la longitud** — degrada fibras
5. **NO ignorar los elementos reversos** — son esenciales para el proceso

---

## 8. Modelos CAD disponibles

### 8.1 Cults3D — Block Type Modular Twin Screw Extruder (robotdigg)
- **URL:** https://cults3d.com/en/3d-model/tool/block-type-modular-twin-screw-extruder
- **Formato:** 21 archivos STP (STEP)
- **Costo:** €0.50
- **Contenido:** Elementos modulares de tornillo + barril + eje + ensamblaje
- **Archivos incluidos:**
  - `45-5-44.stp` / `45-5-44L.stp` — Kneading 45°, 5 discos, 44mm (forward + reverse)
  - `45-5-56.stp` / `45-5-56L.stp` — Kneading 45°, 5 discos, 56mm (forward + reverse)
  - `60-4-56.stp` — Kneading 60°, 4 discos, 56mm
  - `90-5-44.stp` / `90-5-56.stp` — Kneading 90° (neutral)
  - `30-7-56.stp` / `30-7-72.stp` — Transporte paso 30mm
  - `44-22L.stp` / `56-28L.stp` — Elementos reversos (L = left-hand)
  - `44-44.stp` / `56-56.stp` / `64-64.stp` / `72-72.stp` / `96-96.stp` — Transportes varios
  - `芯轴.stp` — Eje estriado (splined shaft)
  - `螺杆装配.stp` — Ensamblaje completo de tornillo
  - `连轴花键.stp` — Acople de eje
- **Relevancia:** ★★★★★ — Incluye todos los tipos de elementos que necesitamos (kneading forward, reverse, neutral, transporte, reversos). Los nombres de archivo siguen la nomenclatura estándar: `[ángulo]-[discos]-[longitud]` o `[paso]-[longitud]`
- **Nota:** Los archivos con "L" son versiones reverse (left-hand). Esto confirma que los fabricantes chinos producen estos elementos exactos.

### 8.2 Fabricantes de elementos de tornillo (provedores)

| Fabricante | Rango | Elementos disponibles | URL |
|-----------|-------|----------------------|-----|
| **Joiner Machinery (China)** | 20-200mm | Conveying, kneading, mixing, transition, reverse | made-in-china.com |
| **SKR Machinery (Nanjing)** | Varios | Conveying, kneading (2-lobe, 3-lobe), mixing, toothed | skrscrew.com |
| **Extruder Experts (Alemania)** | Varios | Custom profiles, wear-resistant | extruder-experts.com |
| **JMLORD International** | 14-380mm | Full range, Clextral-compatible | jmlordinternational.com |
| **Clextral (Francia)** | BC21-BC160 | C1F, C2F, CF1C, CF2C, BL22, BLO2 | clextral.com |
| **STEER World (India)** | Varios | Full range + application engineering | steerworld.com |

### 8.3 Nomenclatura estándar de elementos

Basado en la investigación, la nomenclatura para kneading blocks es:

```
KB[a]-[d]-[l] [nL]
│    │   │    │
│    │   │    └── n = número de lóbulos (2 o 3), L = left-hand (reverse)
│    │   └─────── l = longitud total en mm
│    └─────────── d = número de discos
└──────────────── a = ángulo de staggering en grados
```

Ejemplos:
- `KB45/5/44` = Kneading 45°, 5 discos, 44mm, 2 lóbulos, forward
- `KB45/5/44L` = Kneading 45°, 5 discos, 44mm, 2 lóbulos, **reverse**
- `KB90/4/30` = Kneading 90°, 4 discos, 30mm, neutral

Para elementos de transporte:
```
SE[p]/[l] [R/L]
│   │     │
│   │     └── R = Right-hand (forward), L = Left-hand (reverse)
│   └──────── l = longitud en mm
└──────────── p = paso (pitch) en mm
```

Ejemplos:
- `SE-30/30 R` = Transporte paso 30mm, longitud 30mm, forward
- `SE-15/15 L` = Transporte paso 15mm, longitud 15mm, **reverse**

---

## Fuentes

1. Rol, F. et al. (2020). "Nanocellulose Production by Twin-Screw Extrusion: Simulation of the Screw Profile To Increase the Productivity." *ACS Sustainable Chem. Eng.* 8(1), 50-59.
2. Freville, E. et al. (2024). "Process stability optimization of the twin-screw extrusion adapted for concentrated cellulose fibrillation." *J. Mater. Sci.* 59, 15904-15919.
3. Freville, E. et al. (2025). "Single twin-screw extrusion step to produce highly concentrated MFC powder." *Cellulose*.
4. Clextral. "Twin-screw extruders for the production of banknotes." clextral.com/banknotes
5. Technovel. "Screw Elements & Screw Configuration." technovel.co.jp/en/3762
6. SPE. "Fundamentals of Twin-Screw Compounding: Kneading Block Performance Characteristics."
7. Yang, W. et al. (2025). "SPH-DEM Coupling for Solid-Liquid Mixing in Meshing Twin-Screw Extruder." *Chem. Ind. Eng. Prog.* 44(7).
8. Dong, T. et al. (2023). "Simulation of Multiphase Flow and Mixing in a Conveying Element of a Co-Rotating TSE by Using SPH." *Int. J. Chem. Eng.*
9. Shen, X.Y. & Wang, P. (2010). "Extrusion Modeling of Solid Plug Flow of Co-Rotating Twin Screw Pulping Extruder."
10. Wang, P. et al. (2010). "Optimum Design on Trapezoidal Thread Parameters of Co-Rotating Twin Screw Extruder."
