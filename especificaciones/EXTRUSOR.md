# Diseño de Extrusor de Doble Tornillo — Planos de Ingeniería

## Objetivo
Diseñar y construir un extrusor de doble tornillo co-rotativo artesanal, escala laboratorio, para refinar fibra de algodón destinada a papel de billetes.

---

## 1. Parámetros Generales de Diseño

| Parámetro | Valor | Razón |
|-----------|-------|-------|
| Tipo | Co-rotativo, totalmente entrelazado (intermeshing) | Perfil Erdmenger, auto-limpieza |
| Diámetro exterior (D) | **20 mm** | Escala laboratorio, batch 500g |
| Diámetro interior (ID) | **12.9 mm** | OD/ID = 1.55 (estándar) |
| Distancia entre centros | **16.45 mm** | C = (OD + ID) / 2 |
| Holgura tornillo-barril | 0.15-0.25 mm | Para fibra húmeda (mayor que plástico) |
| Holgura entre tornillos | 0.10-0.20 mm | Entrelazamiento sin contacto |
| L/D total | **24:1** (480 mm longitud) | Suficiente para refinado de fibra |
| Número de zonas de barril | **4** (modulares, ~120 mm c/u) | Flexibilidad de configuración |
| Material de tornillos | Acero inoxidable 316L | Resistencia a corrosión alcalina |
| Material de barril | Acero inoxidable 304 con liner 316L | Costo vs resistencia |
| Velocidad máxima | 400 RPM | Control por VFD |
| Torque por eje | 15-30 Nm | Para consistencia de fibra 8-15% |
| Potencia de motor | 0.75-1.5 kW (1-2 HP) | Suficiente para scale laboratorio |
| Capacidad | 2-8 kg/h | Batch de 500g procesado en 4-15 min |

### Geometría del Tornillo

```
      ← Pitch (p) →
      ┌──────────────┐
      │  ┌────┐      │  ← Flight (filete)
      │  │    │      │
      │  │    │      │  ← Channel depth (h)
      │  │    │      │
      └──┴────┴──────┘
         ← Ch width →
```

| Símbolo | Parámetro | Valor (D=20mm) |
|---------|-----------|----------------|
| D | Diámetro exterior | 20.0 mm |
| ID | Diámetro del núcleo (root) | 12.9 mm |
| h | Profundidad de canal | 3.55 mm |
| C | Distancia entre centros | 16.45 mm |
| p | Paso (pitch) — transporte | 20-40 mm |
| p | Paso — compresión | 10-15 mm |
| e | Espesor de filete | 2.0 mm |
| α | Ángulo de hélice | 17-32° según paso |
| CL | Holgura lateral entre tornillos | 0.15 mm |
| δ | Holgura radial tornillo-barril | 0.20 mm |

---

## 2. Perfil de Tornillo Detallado

### Configuración de Elementos (ensamblados en eje estriado)

Tornillo de 480 mm de largo total, dividido en 4 zonas:

```
Zona 1          Zona 2          Zona 3          Zona 4
Alimentación    Mezclado        Refinado        Descarga
[⟶⟶⟶⟶]     [⋈⋈⋈⋈]       [⋈⋈⟶⟶⋈⋈]     [⟶⟶⟶|●]
0              120             240             360         480 mm
```

### Tabla de Elementos por Zona

| Zona | Longitud | Elemento | Designación | Cant. | Función |
|------|----------|----------|-------------|-------|---------|
| **1** | 60 mm | Transporte paso largo | SK-40/60 R | 1 | Alimentar pulpa húmeda desde tolva |
| | 60 mm | Transporte paso medio | SE-30/30 R | 2 | Conducir a zona de mezclado |
| **2** | 60 mm | Kneading block 45° forward | KP-45/5/20 R | 3 | Dispersión inicial de fibras |
| | 60 mm | Kneading block 60° forward | KBW-60/4/30 R | 2 | Mezclado distributivo |
| **3** | 30 mm | Transporte paso corto | SE-15/15 R | 2 | Comprimir y llevar a refino |
| | 60 mm | Kneading block 90° neutral | KBW-90/4/30 N | 2 | Refinado intensivo (alta cizalla) |
| | 30 mm | Kneading block 45° reverse | KP-45/3/20 L | 1 | Reflujo para aumentar residencia |
| | 30 mm | Transporte paso corto | SE-15/15 R | 2 | Conducir a descarga |
| **4** | 60 mm | Transporte paso medio | SE-20/20 R | 3 | Presurizar hacia la salida |
| | 30 mm | Boquilla / Dado | — | 1 | Dado de ∅4-6 mm, 2 orificios |

**Designación de elementos** (nomenclatura Anton Paar/Brabender):
- `SE-30/30 R`: Screw Element, pitch 30mm, length 30mm, Right-hand (forward conveying)
- `SK-40/60 R`: Screw element with thrust edge, pitch 40mm, length 60mm
- `KP-45/5/20 R`: Kneading block, half-disk, 45° offset, 5 discs, 20mm length, forward
- `KBW-90/4/30 N`: Kneading block full-disk, 90° offset, 4 discs, 30mm, neutral (no conveying)
- `L` suffix = Left-hand (reverse conveying)

### Perfil de Temperatura (refinado en frío para fibra)

Al procesar pulpa de algodón húmeda (no plástico fundido), el barril **no requiere calefacción activa**. Se recomienda:

| Zona | Temperatura objetivo | Control |
|------|---------------------|---------|
| Zona 1 (alimentación) | Ambiente (20-30°C) | Pasivo |
| Zona 2 (mezclado) | 30-50°C (se calienta por fricción) | Monitoreo con termopar |
| Zona 3 (refinado) | 40-70°C (máxima fricción) | Monitoreo + refrigeración por aire si >70°C |
| Zona 4 (descarga) | 30-50°C | Monitoreo |

---

## 3. Diseño del Barril

### Configuración de Barril Segmentado

El barril es de sección en forma de "∞" (dos círculos intersecados), segmentado en 4 módulos de 120 mm cada uno:

```
Sección transversal (vista frontal):
    ┌─────┐
    │  ∞  │  ← 2 círculos de D=20mm, distancia entre centros 16.45mm
    │  ╲╱  │
    └─────┘
```

### Especificaciones del Barril

| Módulo | Longitud | Material | Características |
|--------|----------|----------|-----------------|
| **B1** — Alimentación | 120 mm | SS304 + liner SS316L | Tolva de entrada en centro (abertura 30×20 mm) |
| **B2** — Mezclado | 120 mm | SS304 + liner SS316L | Ciego (cerrado) |
| **B3** — Refinado | 120 mm | SS304 + liner SS316L | Puerto de inyección lateral para agua (opcional) |
| **B4** — Descarga | 120 mm | SS304 + liner SS316L | Boca de salida con brida para dado |

**Dimensiones del liner (camisa interior):**
- Forma: dos semicírculos de R=10.15 mm (D=20.3mm, 0.15mm de holgura radial)
- Distancia entre centros: 16.45 mm
- Profundidad del liner: 80 mm de altura total
- Espesor de pared: 5 mm mínimo

### Alternativa: Barril Clamshell (Concha de Almeja)

Más fácil de fabricar: el barril se divide en mitad superior e inferior, abisagradas. Permite limpieza y cambio de elementos sin desmontar ejes.

```
Vista lateral (corte):
┌──────────────────────────────────────┐ ← Tapa superior (bisagra a la derecha)
│  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  │ ← Cámara del tornillo
├──────────────────────────────────────┤ ← Línea de separación
│  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  │ ← Cámara del tornillo
└──────────────────────────────────────┘ ← Base fija
    ↑                              ↑
    Tolva                         Dado
```

---

## 4. Sistema de Transmisión

### Esquema de Transmisión

```
Motor eléctrico
      │
      ║ Eje del motor
      │
  ┌───┴───┐
  │  Polea │ ← Correa sincrónica (opcional, reduce vibración)
  └───┬───┘
      │
  ┌───┴─────────┐
  │  Caja de      │
  │  engranajes   │ ← Piñón de entrada + distribución a 2 ejes
  │  (distribuir)  │
  └───┬───────┬───┘
      │       │
      ║       ║ ← Ejes estriados de salida (co-rotativos)
      │       │
  ┌───┴───┐ ┌─┴───┐
  │ Tornillo A │ │ Tornillo B │
  └─────────┘ └───────┘
```

### Especificaciones de Transmisión

| Componente | Especificación | Notas |
|-----------|----------------|-------|
| Motor | 0.75-1.5 kW (1-2 HP), 1725 RPM, monofásico 220V | Motor de lavadora o industrial pequeño |
| Variador de frecuencia (VFD) | 1.5 kW, 220V entrada, 0-400 Hz | Control de velocidad variable |
| Caja de engranajes | Relación 3:1 a 5:1, salida a 2 ejes | Construcción propia o adaptada |
| Engranajes de distribución | 2 engranajes rectos idénticos, módulo 2, 20 dientes | Acero 4140 cementado |
| Cojinetes de ejes | 4 × rodamiento de bolas, ∅20mm eje | 6204-2RS (sellado) |
| Ejes estriados | ∅12mm, estriado DIN 5480 o similar | Acero 4340 |
| Acople motor-caja | Correa sincrónica HTD 5M, 15mm ancho | Reduce ruido y vibración |
| Correa | 5M-450-15 (polímero con cable de acero) | |

---

## 5. Tolva de Alimentación

```
Vista lateral:
    ┌──────┐
    │      │ ← Abertura superior 80×50 mm
    │ TOLVA│
    │      │
    └──┬───┘
       │    ← Conducto cuadrado 30×20 mm
    ┌──┴──┐
    │ B1  │ ← Barril zona 1
    └─────┘
```

- Material: SS304, 1.5 mm espesor
- Volumen: ~0.5 L
- Opcional: émbolo de avance manual para empujar pulpa hacia los tornillos

---

## 6. Dado de Salida (Die)

```
Vista frontal del dado:
┌────────────────────┐
│  ┌─────────┐       │
│  │ ●     ● │       │ ← 2 orificios de ∅4-6 mm
│  └─────────┘       │
└────────────────────┘
    ↑ 16.45 mm (centros)
```

- Material: SS316L
- Diámetro de orificios: 4 mm (inicial), intercambiable
- Plato rompedor (breaker plate) antes del dado con agujeros de ∅2 mm

---

## 7. Planos Constructivos

### 7.1 Perfil del Elemento de Transporte (Conveying Element)

```
Vista 3D conceptual (corte transversal):
        ┌─────┐
       ╱       ╲
      │         │
      │         │  ← Filete (flight) en espiral
      │    ╭───╮│
      │   ╱    ╲│
      │  │     ││  ← Núcleo (core/shaf)
      │   ╲    ╱│
      │    ╰───╯│
      │         │
       ╲       ╱
        └─────┘
```

**Parámetros del elemento de transporte SE-30/30:**
- Diámetro exterior: 20.0 mm
- Diámetro del núcleo: 12.9 mm
- Paso: 30 mm
- Longitud: 30 mm
- Número de entradas (flights): 1 (monoentrada) o 2 (bientrada)
- Perfil: Erdmenger, auto-limpieza
- Agujero central: ∅12 mm estriado

### 7.2 Perfil del Kneading Block

```
Vista desde arriba (elemento KBW-45/4/30):
┌──────────────────────────────┐
│  ╱╲  ╱╲  ╱╲  ╱╲             │ ← 4 discos desplazados 45°
│ ╱  ╲╱  ╲╱  ╲╱  ╲            │    entre sí
│╱    ╲    ╲    ╲    ╲         │
│      ╲    ╲    ╲    ╲        │
│       ╲    ╲    ╲    ╲       │
└──────────────────────────────┘
```

- 4 discos (lobulados en forma de "píldora" = dos arcos)
- Cada disco desplazado 45° respecto al anterior
- Longitud total: 30 mm
- Diámetro: 20 mm
- Ancho de cada disco: ~7.5 mm (30/4)

---

## 8. Materiales y Fabricación

### Lista de Materiales (BOM)

| Ítem | Cant. | Descripción | Material | Dimensiones | Costo est. |
|------|-------|-------------|----------|-------------|------------|
| 1 | 2 | Eje estriado principal | Acero 4340 | ∅12 × 500 mm, estriado DIN 5480 | $60 |
| 2 | 16 | Elementos de transporte | SS316L | ∅20 × varias longitudes | $200 |
| 3 | 12 | Kneading blocks (varios ángulos) | SS316L | ∅20 × varias longitudes | $200 |
| 4 | 4 | Módulos de barril (liner inferior) | SS316L | 120 × 50 × 50 mm c/u | $150 |
| 5 | 4 | Tapas de barril (liner superior) | SS304 | 120 mm | $80 |
| 6 | 1 | Carcasa exterior | SS304 | 500 × 100 × 100 mm | $100 |
| 7 | 1 | Tolva | SS304 | 0.5 L | $30 |
| 8 | 1 | Dado / Boquilla | SS316L | 40 × 30 × 15 mm | $30 |
| 9 | 2 | Engranajes de distribución (idénticos) | Acero 4140 | Módulo 2, 20 dientes | $80 |
| 10 | 4 | Rodamientos 6204-2RS | Acero | ∅20 × 47 × 14 mm | $20 |
| 11 | 1 | Caja de engranajes (housing) | Aluminio o acero | 150 × 100 × 100 mm | $50 |
| 12 | 1 | Motor 1 HP + VFD | — | 1725 RPM, 220V monofásico | $120 |
| 13 | 1 | Correa sincrónica + poleas | — | HTD 5M | $30 |
| 14 | 1 | Válvula de alivio (seguridad) | Latón | — | $15 |
| 15 | — | Pernos, sellos, empaques | Varios | — | $50 |
| 16 | — | Termopares tipo K | — | 4 unidades | $20 |
| 17 | 1 | Controlador PID 4 canales | — | — | $40 |
| | | **Total estimado de materiales** | | | **~$1,225-1,525** |

### Opciones de fabricación

| Método | Ventajas | Desventajas | Costo aprox. |
|--------|----------|-------------|-------------|
| **Torno + fresa manual** | Accesible en taller mecánico local | Precisión limitada (±0.1mm) | $300-500 (maquinado) |
| **Torno CNC** | Alta precisión (±0.02mm) | Más caro, requiere programación | $800-1500 |
| **Impresión 3D + post-procesado** | Rápido para prototipar | Los tornillos requieren metal | $50-100 (solo para carcasa) |
| **Maquinado completo con plano CAD** | La mejor opción | Llevar planos a taller especializado | $500-1000 |

**Recomendación**: Maquinar tornillos y barril en acero inoxidable con torno+fresa CNC en taller local. Diseñar carcasa y soportes para corte por láser/CNC (chapa de acero).

---

## 9. Sistema de Control

### Sensores y Control

| Señal | Sensor | Rango | Función |
|-------|--------|-------|---------|
| Velocidad de tornillo | Encoder en eje motor | 0-4000 RPM | Control de velocidad por VFD |
| Temperatura zona 1-4 | Termopar tipo K | 0-200°C | Monitoreo (sin calefacción activa) |
| Torque en eje | Medición de corriente del motor | 0-5A → torque calculado | Protección contra sobrecarga |
| Presión en dado | Transductor de presión | 0-100 bar | Monitoreo de obstrucción |

### Controlador
- Arduino Mega + 4 canales MAX6675 (termopares)
- Pantalla LCD 20×4 para visualización
- Relé de seguridad (parada de emergencia)
- Control de VFD por señal 0-10V desde Arduino

---

## 10. Ensamblaje y Secuencia de Construcción

### Fase 1: Componentes Mecánicos (días 1-10)
1. Maquinar ejes estriados (∅12 mm, 500 mm)
2. Maquinar elementos de tornillo (16 conveying + 12 kneading)
3. Maquinar segmentos de barril (4 módulos)
4. Maquinar dado de salida
5. Fabricar tolva en chapa SS304
6. Soldar y armar carcasa exterior

### Fase 2: Transmisión (días 11-15)
7. Ensamblar caja de engranajes
8. Montar rodamientos en soportes
9. Ensamblar eje motor → polea → correa → caja
10. Acoplar ejes estriados desde caja de engranajes

### Fase 3: Ensamblaje Final (días 16-20)
11. Ensartar elementos en ejes en orden correcto
12. Montar ejes con tornillos en barril
13. Cerrar tapa superior del barril
14. Instalar tolva
15. Conectar motor, VFD, sensores
16. Cablear panel de control

### Fase 4: Pruebas (días 21-25)
17. Prueba en vacío: 50-100 RPM, 10 min
18. Prueba con agua: verificar sellos
19. Prueba con pulpa de algodón (batch 100g): 50-200 RPM
20. Ajustar perfil de tornillo según resultados

---

## 11. Dimensiones de la Máquina

| Dimensión | Valor |
|-----------|-------|
| Largo total | 800 mm |
| Ancho total | 300 mm |
| Alto total (con tolva) | 500 mm |
| Peso estimado | 45-60 kg |
| Área de pie | 60 × 30 cm (banco de trabajo) |
| Voltaje | 220V monofásico |
| Consumo máximo | ~1.5 kW |

---

## 12. Criterios de Aceptación

| Prueba | Método | Objetivo |
|--------|--------|----------|
| Desfibrilación | Microscopio 10-40x | Fibras individuales, sin nudos |
| Longitud de fibra | Medición en microscopio | 1-4 mm (sin acortar excesivamente) |
| Freeness | Medidor Schopper-Riegler | 30-50 °SR |
| Consistencia de salida | Muestreo gravimétrico | ±2% del valor objetivo |
| Temperatura máx. en refinado | Termopar zona 3 | <80°C (evitar degradación) |
| Torque máx. | Lectura VFD | <80% del nominal |
| Sellos | Inspección visual sin agua | Sin fugas en juntas |

---

## 13. Planos CAD

Los planos CAD detallados (DWG/STEP) deben generarse a partir de esta especificación. Archivos a crear:

| Archivo | Contenido |
|---------|-----------|
| `twin-screw-assembly.step` | Ensamblaje completo |
| `screw-element-conveying.step` | Elemento de transporte |
| `screw-element-kneading.step` | Kneading block |
| `barrel-module.step` | Módulo de barril |
| `barrel-clamshell.step` | Barril completo tipo clamshell |
| `gearbox-housing.step` | Caja de engranajes |
| `die-plate.step` | Dado de salida |
| `frame.step` | Bastidor/soporte |

## Referencias
- NC State Extension — Screw Functionality and Screw Profile Design (2024)
- Anton Paar / Brabender — TwinLab Screw Element Designation
- Kailida Extrusion — Twin Screw Extruder Working Principle
- Dr. Chris Rauwendaal — Polymer Extrusion (screw design fundamentals)
- Granuwel Machinery — 6 Main Parameters of Twin-Screw Extruder
- Composite Technologies Inc. — Screw Element Manufacturing Guide
