# Sistema de Formación de Hoja con Elementos de Seguridad

**Fecha:** Junio 2026
**Proyecto:** Extrusor de Doble Tornillo para Papel Moneda
**Conecta con:** Paso 5 - Refinado (Extrusor)

---

## Resumen del Sistema

El sistema toma la pulpa fibrilada del extrusor y la convierte en hojas de papel con elementos de seguridad integrados (marca de agua e hilo de seguridad).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SISTEMA DE FORMACIÓN DE HOJA                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [EXTRUSOR] → [CABEZAL] → [MALLA] → [DANDY ROLL] → [HILO] → [PRENSA] → [SECADO]  │
│       ↓           ↓          ↓           ↓            ↓          ↓         │
│    Pulpa      Pulpa      Agua        Marca       Hilo      Hoja          │
│    fibrilada  distribuida drena      de agua     incrustada prensada      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Componentes del Sistema

### 1. CABEZAL TIPO SLOT DIE

**Función:** Recibir la pulpa del extrusor y distribuirla uniformemente sobre la malla.

**Dimensiones:**
- Ancho de salida: 300mm (ancho de la hoja)
- Apertura de ranura: 2-5mm (ajustable)
- Longitud: 200mm

**Diseño:**
```
┌──────────────────────────────────────┐
│            CABEZAL SLOT DIE          │
├──────────────────────────────────────┤
│                                      │
│   [ENTRADA PULPA] ← Del extrusor    │
│          ↓                           │
│   ┌──────────────────────┐           │
│   │  CÁMARA DE DISTRIBUCIÓN│          │
│   │  (nivel constante)    │          │
│   └──────────┬───────────┘           │
│              ↓                       │
│   ═══════════════════════════════    │
│        RANURA DE SALIDA (2-5mm)      │
│   ═══════════════════════════════    │
│              ↓                       │
│         [MALLA FORMADORA]            │
│                                      │
└──────────────────────────────────────┘
```

**Materiales:**
- Cuerpo: Acero inoxidable o PLA (para prototipo)
- Ranura: Ajustable con tornillos

---

### 2. MALLA FORMADORA (CONVEYOR BELT)

**Función:** Soportar la pulpa y permitir el drenaje del agua.

**Especificaciones:**
- Ancho: 350mm (más que el cabezal)
- Largo: 1000mm (tiempo de formación)
- Velocidad: 0.5-2 m/min (ajustable)
- Material: Malla de acero inox o plástico
- Tamaño de malla: 50-100 mesh (0.15-0.3mm)

**Diseño:**
```
┌────────────────────────────────────────────────────────────┐
│                   MALLA FORMADORA                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  [CABEZAL]                                                 │
│      ↓                                                     │
│  ════════════════════════════════════════════════════════   │
│  ┌────────────────────────────────────────────────────┐   │
│  │  MALLA CONTINUA (50-100 mesh)                      │   │
│  │  • Agua drena por gravedad                         │   │
│  │  • Fibras se depositan formando hoja               │   │
│  └────────────────────────────────────────────────────┘   │
│  ════════════════════════════════════════════════════════   │
│      ↓                                                     │
│  [DANDY ROLL] → [HILO] → [PRENSA]                         │
│                                                            │
│  Velocidad: 0.5-2 m/min                                   │
│  Largo efectivo: 800mm                                    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Componentes:**
- 2 rodillos guía (Ø50mm)
- Malla continua (polyester o acero inox)
- Bandeja de drenaje debajo
- Sistema de limpieza de malla

---

### 3. DANDY ROLL (Marca de Agua)

**Función:** Crear la marca de agua comprimiendo selectivamente las fibras.

**Principio:**
- El cilindro tiene un patrón en relieve
- Donde hay relieve, comprime más las fibras (zona más delgada = transparente)
- Donde no hay relieve, las fibras quedan más gruesas (zona opaca)
- Al trasluz se ve el patrón

**Especificaciones:**
- Diámetro: 100-150mm
- Ancho: 300mm (igual que la hoja)
- Velocidad: Sincronizada con la malla
- Material: Cilindro de acero con patrón grabado

**Diseño del patrón:**
```
┌──────────────────────────────────────┐
│         PATRÓN DANDY ROLL            │
├──────────────────────────────────────┤
│                                      │
│   Ejemplo: Billete de $1000         │
│                                      │
│   ┌────────────────────────────┐    │
│   │    ╔══════════════╗        │    │
│   │    ║   1000       ║        │    │
│   │    ║  BANCO       ║        │    │
│   │    ║  CENTRAL     ║        │    │
│   │    ╚══════════════╝        │    │
│   │         ★ ★ ★              │    │
│   └────────────────────────────┘    │
│                                      │
│   Relieve: 0.5-1mm de profundidad   │
│   Material: Acero grabado químicamente│
│                                      │
└──────────────────────────────────────┘
```

**Fabricación:**
- Acero grabado químicamente (costo alto, calidad alta)
- PLA impreso 3D + recubrimiento (para prototipo)
- Silicona moldeada (para pruebas)

---

### 4. SISTEMA DE HILO DE SEGURIDAD

**Función:** Alimentar un hilo delgado que queda incrustado en la hoja.

**Especificaciones del hilo:**
- Material: Poliéster metalizado, polipropileno, o hilo holográfico
- Diámetro: 0.3-0.8mm
- Color: Plata, oro, o holográfico
- Bobina: 100-500m

**Diseño del alimentador:**
```
┌──────────────────────────────────────┐
│     ALIMENTADOR DE HILO              │
├──────────────────────────────────────┤
│                                      │
│   [BOBINA DE HILO]                   │
│        │                             │
│        ↓                             │
│   [GUÍA] ← Rodillo guía            │
│        │                             │
│        ↓                             │
│   [TENSOR] ← Resorte o peso         │
│        │                             │
│        ↓                             │
│   [ENTRADA AL CABEZAL]               │
│        │                             │
│        ↓                             │
│   [MALLA] ← Hilo se deposita        │
│              sobre la pulpa          │
│                                      │
└──────────────────────────────────────┘
```

**Posición de inserción:**
- El hilo se deposita SOBRE la pulpa en la malla
- Luego se cubre con otra capa de pulpa (si se tiene doble cabezal)
- O queda en la superficie (más visible)

**Alternativa: Hilo entre dos capas**
```
[CABEZAL 1] → Pulpa capa inferior
     ↓
[HILO] → Se deposita
     ↓
[CABEZAL 2] → Pulpa capa superior
     ↓
[MALLA] → Hoja compuesta
```

---

### 5. PRENSA DE RODILLOS

**Función:** Eliminar exceso de agua y compactar la hoja.

**Especificaciones:**
- Rodillos: 2-3 pares
- Presión: 0.5-2 toneladas
- Velocidad: Sincronizada con la malla
- Material: Rodillos de acero con recubrimiento de goma

**Diseño:**
```
┌──────────────────────────────────────┐
│         PRENSA DE RODILLOS           │
├──────────────────────────────────────┤
│                                      │
│   [MALLA] → [HOJA HÚMEDA]           │
│                   ↓                  │
│   ┌─────────────────────────────┐   │
│   │  ════════════════════════   │   │
│   │  [RODILLO SUPERIOR] ↓↓↓    │   │
│   │  ─────────────────────────  │   │
│   │  [RODILLO INFERIOR] ↑↑↑    │   │
│   │  ════════════════════════   │   │
│   └─────────────────────────────┘   │
│              ↓                      │
│   [HOJA PRENSADA] → [SECADO]        │
│                                      │
│   Presión: 0.5-2 t                  │
│   Agua eliminada: ~50%              │
│                                      │
└──────────────────────────────────────┘
```

---

### 6. SECADOR (Opcional para prototipo)

**Función:** Eliminar el agua restante de la hoja.

**Opciones:**

| Método | Tiempo | Complejidad |
|--------|--------|-------------|
| Aire libre | 24-48h | Ninguna |
| Rodillos calientes | 1-2h | Media |
| Horno | 30-60min | Alta |

**Para prototipo:** Secado al aire es suficiente.

**Para producción:** Rodillos calientes a 80-120°C.

---

## Especificaciones del Sistema Completo

### Dimensiones totales

| Componente | Largo | Ancho | Alto |
|------------|-------|-------|------|
| Cabezal slot die | 200mm | 350mm | 150mm |
| Malla formadora | 1000mm | 400mm | 200mm |
| Dandy roll | 150mm Ø | 350mm | 200mm |
| Alimentador hilo | 100mm | 100mm | 300mm |
| Prensa rodillos | 200mm | 350mm | 300mm |
| **TOTAL** | **~1500mm** | **400mm** | **300mm** |

### Velocidad de producción

| Parámetro | Valor |
|-----------|-------|
| Velocidad de la malla | 0.5-2 m/min |
| Ancho de hoja | 300mm |
| Gramaje objetivo | 85-100 g/m² |
| Producción | 0.5-2 m²/min |
| **Producción por hora** | **30-120 m²/h** |

### Materiales necesarios

| Componente | Material | Cantidad |
|------------|----------|----------|
| Cabezal | Acero inox / PLA | 1 |
| Malla | Polyester / Acero inox | 2m |
| Dandy roll | Acero / PLA + silicona | 1 |
| Rodillos | Acero + goma | 4-6 |
| Bobina hilo | Poliéster metalizado | 1 |
| Estructura | Aluminio / Madera | 1 |

---

## Diagrama de Conexión Completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROCESO COMPLETO: TELA → PAPEL MONEDA                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [TELA] → [CORTE] → [COCCIÓN] → [LAVADO] → [EXTRUSOR]                     │
│                                        ↓                                    │
│                              [CABEZAL SLOT DIE]                            │
│                                        ↓                                    │
│                              [MALLA FORMADORA]                             │
│                                        ↓                                    │
│                              [DANDY ROLL] ← Marca de agua                  │
│                                        ↓                                    │
│                              [ALIMENTADOR HILO] ← Hilo seguridad           │
│                                        ↓                                    │
│                              [PRENSA RODILLOS]                             │
│                                        ↓                                    │
│                              [SECADO]                                       │
│                                        ↓                                    │
│                              [HOJA DE PAPEL MONEDA]                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Costo Estimado del Sistema

| Componente | Costo estimado |
|------------|----------------|
| Cabezal slot die (PLA) | $20-50 |
| Malla formadora | $30-50 |
| Dandy roll (PLA + silicona) | $30-60 |
| Rodillos prensa | $50-100 |
| Alimentador de hilo | $20-30 |
| Estructura (aluminio) | $50-100 |
| **TOTAL** | **$200-400** |

---

## Notas de Diseño

1. **Escalabilidad:** El diseño permite empezar simple y escalar
2. **Materiales:** Para prototipo, usar PLA impreso 3D
3. **Ajustes:** Todos los componentes deben ser ajustables
4. **Mantenimiento:** Diseñar para fácil limpieza
5. **Seguridad:** Protecciones movedizas

---

*Documento generado: Junio 2026*
*Proyecto: Extrusor de Doble Tornillo para Papel Moneda*
