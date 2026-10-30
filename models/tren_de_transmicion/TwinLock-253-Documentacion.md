# TwinLock-253 — Documentación Completa

**Tren de transmisión co-rotante split-power para extrusor de doble tornillo**

---

## 1. Arquitectura

### Topología: Split-power en H, salidas escalonadas

El piñón distribuidor Z18 engrana a la vez las dos coronas Z54. Cada camino lleva ~50 % del par hasta su propio engranaje de salida. Los dos ejes cuadrados no se empujan entre sí: no hay single point of failure.

| Parámetro | Valor |
|-----------|-------|
| Distancia entre centros | 25.30 mm |
| Relación split | 6:1 |
| Relación entre tornillos | 1:1 estricta |
| Sentido | Co-rotante |
| Módulo | 1.5 mm · evolvente 25° |
| Holgura FDM | +0.25 mm en CD |

### Por qué no un piñón de sincronía

Un engranaje pequeño entre los dos ejes a 25.30 mm transmitiría el 100 % de la carga de un tornillo al otro. Con 10–15 N·m combinados eso es un diente PETG condenado. Aquí cada salida recibe par desde el origen: el piñón de entrada parte la potencia, y los engranajes de salida viven en planos axiales distintos (Z24, PD 36 mm) para no interferir a 25.30 mm.

### Faseo 90°

Un cuadrado de 1/4" tiene simetría de 90°, así que el hueco no puede "guardar" el desfase por sí solo. El adaptador de salida es una abrazadera: se monta el tren, se insertan los tornillos, se gira hasta el barrido self-wiping y se aprietan los prisioneros. El tren, no el operario, mantiene el lock bajo carga.

### Cinemática

- Piñón entre ambas coronas → las dos giran igual (co-rotantes).
- Dos mallas por camino (par) → las salidas giran igual que el piñón, más lentas.
- Compuestos en x = -48.65 mm y 48.65 mm, piñón en y = 23.1 mm.
- Salida L en z = 40 mm, salida R en z = 60 mm. Nunca coplanares.

---

## 2. Cargas

### Simulación de engrane: Carga en los dientes

Flexión Lewis y Hertz en los cuatro engranes, α = 25°. PETG-CF a 65 MPa de raíz; acero a 550 MPa. Conservador (recto, no herringbone).

#### Engranajes y materiales

| Engranaje | Dientes | Módulo | Material |
|-----------|---------|--------|----------|
| Entrada | Z18 | 1.5 mm | PETG-CF |
| Corona L/R | Z54 | 1.5 mm | PETG-CF |
| Piñón compound L/R | Z16 | 1.5 mm | PETG-CF (o acero) |
| Salida L/R | Z24 | 1.5 mm | PETG-CF |

#### Fuerzas por malla

- **Ft**: Fuerza tangencial (par transmisible)
- **Fr**: Fuerza radial (separación)
- **Fn**: Fuerza normal (resultante)

#### Criterios de diseño

| Parámetro | Valor | Nota |
|-----------|-------|------|
| Par combinado (régimen) | 10–15 N·m | Mínimo 10 N·m |
| Empuje axial por eje | 2000 N | Va a rodamiento 51102 |
| Separación radial | 1200 N | Va a 2× rodamientos 6001 |
| Ángulo de presión | 25° | Evolvente estándar |
| Backlash FDM | +0.25 mm | En distancia entre centros |

#### Rodamientos

| Rodamiento | Especificación | Capacidad | Carga aplicable | SF |
|------------|---------------|-----------|-----------------|-----|
| Empuje | 51102 (15×28×9) | Ca = 6700 N | 2000 N | 3.35 |
| Radial | 6001-2Z (12×28×8) | Cr = 5100 N (×2) | 1200 N | 8.5 |

#### Modos de falla

- **Flexión Lewis**: Rotura del diente por sobrecarga estática
- **Hertz**: Aplastamiento superficial por contacto de rodadura
- **Pico de amasado**: Factor ×3.5 en ciclos de kneading

---

## 3. Planos de Fabricación

### TL-253-01: Vista frontal · Interfaz de tornillos

- CD tornillos: 25.3 mm (acero, no FDM)
- Huecos □ idénticos en ambos ejes
- Fase 90° en la brida del engranaje, no en el cuadrado
- L: lóbulo 0°, R: lóbulo 90°

### TL-253-02: Apilado axial · Camino de empuje

| Componente | Posición Z | Nota |
|------------|------------|------|
| □ eje | -18 mm | Hueco square 6.35 mm |
| Placa reacción | 0 mm | 3 mm, aluminio |
| 51102 | 8 mm | Empuje contra placa |
| 6001 | 22 mm | Radial frontal |
| Z24 Salida L | 40 mm | Engranaje salida |
| Z24 Salida R | 60 mm | Engranaje salida |
| 6001 (cola) | 104 mm | Radial trasero |

Empuje ← tornillo · descarga en placa · engranajes no coplanares

### TL-253-AD: Adaptador

**Material**: Acero
**Longitud total**: 93 mm

| Segmento | Dimensión | Tolerancia |
|----------|-----------|------------|
| □ entrada | 6.35 mm | +0.2 mm (FDM) |
| Hombro | Ø18 mm | — |
| Muñón empuje | Ø15 g6 | ×18 mm (para 51102) |
| Muñón radial | Ø12 | ×9 mm (para 6001) |
| Asiento Z24 | — | ×16 mm |
| Cuerpo | — | ×20 mm |
| Muñón radial trasero | Ø12 | ×9 mm (para 6001) |
| Cola | — | ×8 mm |

**Operaciones de torno:**
1. Barra acero, Ø18 mínimo. Longitud 93 mm.
2. Muñón empuje Ø15 g6 × 18 mm (51102).
3. Muñones radiales Ø12 × 9 mm (6001), dos asientos.
4. Hueco □6.35 × 18 mm, electroerosión o broca + lima + calibrador.
5. Brida partida sobre el asiento Z24 para faseo.
6. Prisionero M3 para bloqueo de fase.
7. Dos piezas idénticas.

### Cotas críticas

| Cota | Valor | Nota |
|------|-------|------|
| CD tornillos | 25.3 mm | Acero. No FDM. |
| □ eje | 6.35 +0.2 mm | Hueco 18 mm |
| Fase | 90° ±0.5° | Clamp en banco |
| Módulo / α | 1.5 / 25° | Evolvente |
| Backlash FDM | +0.25 mm | Solo centros impresos |
| 51102 | 15×28×9 | Contra placa, no PETG |
| 6001-2Z | 12×28×8 | 2×, mitad locadora |

---

## 4. DFAM (Design for Additive Manufacturing)

### DFAM para PETG-CF

El plástico se ablanda a ~75 °C. Los engranajes de salida, a módulo 1.5 y 16 mm de cara, se especifican en acero para el par de régimen.

### Reglas FDM

- Holgura de centros +0.25 mm. No hiperestático.
- Una sola mitad localiza cada rodamiento. La tapa lleva holgura.
- Insertos M3/M4 heat-set. Nunca rosca directa bajo carga cíclica.
- Herringbone en PETG: cancela empuje de hélice y sube el contact ratio.
- Boquilla 0.4, capa 0.2, 250 °C / cama 80 °C, filamento seco, recinto cerrado.

### Archivos a imprimir

| Archivo | Rol | Configuración |
|---------|-----|---------------|
| `pinion_Z18.stl` | Piñón distribuidor | Eje vertical, 100 % infill, herringbone |
| `compound_LR.stl` | Corona Z54 + piñón Z16 | Pieza única. Dos unidades, piñón en plano opuesto. |
| `hub_clamp.stl` | Abrazadera de fase (prototipo) | Sustituir por acero en servicio. Casquillo Ø12. |

### Secuencia de montaje

1. Montar adaptadores, collares y 51102 contra la placa de reacción.
2. Apilar engranajes de salida en planos z=40 y z=60. Abrazadera suelta.
3. Engranar compuestos y piñón. Verificar dos caminos, mismo sentido.
4. Motor y acoplamiento.
5. Insertar tornillos, barrer hasta 90°, apretar fase. Engrasar EP2.
