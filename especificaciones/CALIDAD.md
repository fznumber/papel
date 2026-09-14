# Especificación: Control de Calidad de Papel para Billetes

## Objetivo
Establecer criterios, métodos de prueba y valores objetivo para evaluar la calidad del papel de algodón producido, comparándolo con estándares de papel moneda comercial.

## Propiedades Físicas

| Propiedad | Método | Papel Billete (ref.) | Objetivo Fase 1 | Aceptable Mínimo |
|-----------|--------|---------------------|-----------------|------------------|
| Gramaje (g/m²) | ISO 536 — pesar 10×10 cm | 85-100 | 90-100 | 80-110 |
| Espesor (μm) | ISO 534 — micrómetro | 100-130 | 110-140 | 90-160 |
| Densidad aparente (g/cm³) | gramaje / espesor | 0.7-0.85 | 0.65-0.80 | 0.55-0.90 |
| Humedad (%) | ISO 287 — 105°C hasta peso constante | 5.5-7.0 | 6.0-7.0 | 5.0-8.0 |

## Propiedades Mecánicas

| Propiedad | Método | Papel Billete (ref.) | Objetivo Fase 1 | Aceptable |
|-----------|--------|---------------------|-----------------|-----------|
| Resistencia a la tracción (kN/m) — direcc. máquina | ISO 1924 | 4-8 | >3 | >2 |
| Resistencia a la tracción (kN/m) — direcc. transversal | ISO 1924 | 2-5 | >2 | >1.5 |
| Alargamiento a rotura (%) | ISO 1924 | 2-5 | >2 | >1 |
| Resistencia al plegado (MIT, # dobleces) — MD | ISO 5626 | 1000-5000 | >500 | >200 |
| Resistencia al desgarro (mN) — MD | ISO 1974 | 500-1000 | >400 | >200 |
| Resistencia al desgarro (mN) — CD | ISO 1974 | 500-1200 | >400 | >200 |
| Resistencia al reventamiento (kPa) | ISO 2758 | 250-400 | >150 | >100 |

## Propiedades Ópticas

| Propiedad | Método | Papel Billete (ref.) | Objetivo Fase 1 | Aceptable |
|-----------|--------|---------------------|-----------------|-----------|
| Blancura ISO (%) | ISO 2470 | 85-95 | >75 | >65 |
| Opacidad (%) | ISO 2471 | 90-98 | >88 | >80 |
| Tinte CIE L*a*b* | ISO 5631 | L>92, a<1, b<3 | L>85 | L>80 |

## Propiedades Químicas

| Propiedad | Método | Valor Objetivo |
|-----------|--------|----------------|
| pH (extracción en frío) | ISO 6588 | 6.0-8.0 |
| Reserva alcalina (% CaCO₃ equivalente) | ISO 10716 | >2% |
| Cenizas a 525°C (%) | ISO 1762 | <5% |
| Contenido de α-celulosa (%) | TAPPI T203 | >95% |

## Protocolo de Muestreo

1. **Por lote de prueba**: mínimo 5 hojas representativas
2. **Acondicionamiento**: 24h a 23±1°C, 50±2% HR (ISO 187)
3. **Dirección**: marcar dirección máquina (MD) y transversal (CD) en cada hoja
4. **Zona de muestreo**: evitar 10 mm del borde

## Pruebas Simplificadas para Fase 1 (sin equipo especializado)

### 1. Gramaje (necesita: balanza 0.01g + regla)
Cortar 10×10 cm, pesar, multiplicar por 100 → g/m²

### 2. Espesor (necesita: micrómetro o calibrador)
Medir en 5 puntos de la hoja, promediar

### 3. Resistencia al plegado manual
Doblar hoja 180° alternadamente hasta que se rompa
- Aceptable: >20 dobleces manuales (equivale a ~400 MIT)
- Bueno: >50 dobleces

### 4. Prueba de desgarro manual
Hacer un corte de 1 cm en el borde y rasgar
- Desgarro lineal y limpio = fibras bien formadas
- Desgarro irregular/curvo = orientación no uniforme

### 5. Opacidad visual
Colocar hoja sobre texto impreso (periódico)
- No se lee el texto = >85% opacidad
- Se lee parcialmente = 70-85%
- Se lee claramente = <70%

### 6. Humedad (necesita: balanza)
Pesar hoja, secar en horno 105°C por 1h, pesar de nuevo
- Humedad % = (peso inicial - peso seco) / peso inicial × 100

### 7. Prueba de encogimiento
Medir hoja húmeda (recién formada) y seca
- Encogimiento <5% en ancho y largo

## Formato de Reporte de Prueba

```csv
Lote, Hoja, Gramaje (g/m²), Espesor (μm), Humedad (%), Plegado manual, Opacidad, Obs
001, 1, 92, 125, 6.2, 35, Buena,
001, 2, 95, 130, 6.5, 28, Buena,
001, 3, 88, 120, 6.0, 30, Buena,
```

## Criterios de Decisión para Próximos Pasos

| Resultado | Acción |
|-----------|--------|
| Gramaje dentro de ±10% | Continuar con siguiente lote |
| Plegado manual >20 | Suficiente para validar formulación |
| Opacidad >85% (visual) | Buena formación |
| Todos los criterios aceptables | **Escalar a extrusor** |
| Fallan 2+ criterios | Revisar cocción/refinado |

## Referencias
- ISO 536 — Grammage
- ISO 534 — Thickness and apparent density
- ISO 1924 — Tensile properties
- ISO 5626 — Folding endurance (MIT)
- ISO 1974 — Tear resistance (Elmendorf)
- ISO 2470 — Brightness (ISO)
- ISO 2471 — Opacity
- ISO 6588 — pH of aqueous extracts
- TAPPI T203 — Alpha-cellulose in pulp
- European Central Bank — Banknote paper specifications (ref.)
