# Continuación: Diseño de Tornillos Extrusores

## Contexto del Proyecto

Proyecto de extrusor de doble tornillo (TSE) para fibrilación de celulosa en fabricación de papel moneda. El tren de transmisión está en versión V10.1 (`tren_transmision_v10_1.scad`). Ahora se necesita diseñar los tornillos extrusores.

---

## Estado Actual de la Conversación (Claude)

### Pregunta del usuario
> "primero diseña los tornillos extrusores con todas las caracteristicas que confirmaste"

### Respuesta de Claude (parcial - truncada por la UI)

Claude ejecutó 2 pruebas mínimas antes de diseñar el tornillo completo:

**Prueba 1: Transición transporte → kneading (sin hueco cuadrado)**
```scad
r_peak = 12.45;
r_root = 7.65;
module profile_stadium() {
    hull() {
        translate([-(r_peak - r_root), 0]) circle(r=r_root, $fn=64);
        translate([(r_peak - r_root), 0]) circle(r=r_root, $fn=64);
    }
}
// Transporte (twist) + kneading (sin twist)
linear_extrude(height=37.95, twist=-360, slices=80, convexity=10) profile_stadium();
translate([0,0,37.95])
linear_extrude(height=7.59, convexity=10) profile_stadium();
```
**Resultado:** ✅ 1 componente, volumen 15090.0mm³ — fusiona correctamente

**Prueba 2: Misma transición + hueco cuadrado (1/4")**
```scad
module square_cut(h) {
    s = 6.35 + 0.3;  // 1/4" + clearance
    translate([0,0,-1]) linear_extrude(h + 2) square([s, s], center=true);
}
difference() { /* same screw */ square_cut(50); }
```
**Resultado:** ✅ 1 componente, volumen 13076.1mm³ — sigue funcionando

### Conclusión parcial de Claude
> "El patrón básico funciona bien — el problema debe aparecer al aplicar el corte del hueco cuadrado sobre el conjunto ya unido."

**La conversación se cortó aquí** — Claude no llegó a diseñar el tornillo completo con las 7 fases (Z1-Z7).

---

## Hallazgos Previos de Claude (de la conversación completa)

### 🔴 Problema del eje
- **Hex actual (8.3mm):** pared en cintura = 2.86mm (sano)
- **Cuadrado 3/8" (9.525mm):** pared = 0.70mm (insuficiente)
- **Cuadrado 1/4" (6.35mm):** pared calculada ≈ 2.3mm (aceptable)
- El sync gear ya fue migrado a cuadrado 3/8", pero el tornillo necesita 1/4"
- **Solución propuesta:** eje escalonado o cuadrado 1/4" en todo el eje

### 🟡 Perfil de kneading no sigue el estudio
- **Código actual:** 3 zonas kneading todas en reversa (LH)
- **Estudio (Rol et al. 2020):** mezcla forward/neutral/reverse
- **También:** falta paso corto (10-15mm) en zona de fibrilación

### 🔴 Co-rotante vs Contrarrotante
- Clextral BIVIS (referencia) es co-rotante
- Proyecto asumió contrarrotante desde el inicio
- **Sin decisión aún**

---

## Archivos Relevantes

| Archivo | Ubicación | Contenido |
|---------|-----------|-----------|
| tornillos_modulares.scad | models/tronillo-gemini-hex/ | Diseño actual de tornillos (129 líneas, hex 8mm) |
| estudio-diseno-tornillos-extrusor.md | referencias/ | Estudio bibliográfico (493 líneas) |
| tren_transmision_v10_1.scad | models/tren_de_transmidion/ultimo/... | Tren de transmisión actual |
| ESTADO_PROYECTO.md | models/tren_de_transmidion/ | Documentación completa del estado |

---

## Parámetros Confirmados del Tornillo

| Parámetro | Valor | Fuente |
|-----------|-------|--------|
| OD nominal | 25.3mm | Distancia entre centros de la caja |
| r_peak | 12.45mm | (25.3 - 0.4) / 2 |
| r_root | 7.65mm | Radio mínimo (restringido por intermeshing) |
| screw_clearance | 0.4mm | 0.2mm por lado |
| Perfil | Stadium/Bilobal | profile_stadium() |
| Eje (actual) | Hex 8mm | **Necesita cambio a cuadrado** |
| Eje (propuesto) | Cuadrado 1/4" (6.35mm) | Para dejar pared suficiente |
| Longitud total | ~520mm | Z1(100)+Z2(80)+Z3(60)+Z4(40)+Z5(100)+Z6(40)+Z7(100) |

### Fases del tornillo (código actual)

| Fase | Tipo | Longitud | Parámetros | Notas |
|------|------|----------|------------|-------|
| Z1 | Transporte (RH) | 100mm | Pitch 25mm | Alimentación |
| Z2 | Kneading (LH) | 80mm | 7 discos, 45° stagger | **Debería ser forward según estudio** |
| Z3 | Transporte (RH) | 60mm | Pitch 25mm | **Debería ser paso corto 10-15mm** |
| Z4 | Kneading (LH) | 40mm | 3 discos, 60° stagger | **Debería ser neutral 90°** |
| Z5 | Transporte (RH) | 100mm | Pitch 25mm | **Debería ser paso corto 10-15mm** |
| Z6 | Kneading (LH) | 40mm | 4 discos, 45° stagger | Reverse OK para fibrilación |
| Z7 | Transporte (RH) | 100mm | Pitch 25mm | Salida |

---

## Prompt para Continuar con Otra IA

```
Necesito que continúes el diseño de tornillos extrusores para un extrusor de doble tornillo (TSE) destinado a fibrilación de celulosa para papel moneda. Hay una conversación previa con conclusiones parciales que debes conocer.

CONTEXTO DEL PROYECTO:
- El tren de transmisión está diseñado (V10.1) y usa sync gears cuadrados de 3/8" (9.525mm)
- Los tornillos deben conectarse al tren mediante engranajes de sincronización
- La distancia entre centros de los tornillos es 25.3mm
- El motor es 775 DC, el tren tiene relación 162:1

ARCHIVOS QUE DEBES LEER PRIMERO:
1. /home/fz/proyectos/papel/models/tronillo-gemini-hex/tornillos_modulares.scad (diseño actual, usa hex 8mm)
2. /home/fz/proyectos/papel/referencias/estudio-diseno-tornillos-extrusor.md (estudio bibliográfico con parámetros óptimos)
3. /home/fz/proyectos/papel/models/tren_de_transmidion/ultimo/tren_v10_1_completo/tren_v10_1/tren_transmision_v10_1.scad (tren de transmisión)
4. /home/fz/proyectos/papel/models/tren_de_transmidion/ESTADO_PROYECTO.md (estado actual del proyecto)

PROBLEMAS CONFIRMADOS QUE RESOLVER:
1. EJE: El hex de 8mm no cabe en el tornillo (pared solo 0.70mm). Usar cuadrado 1/4" (6.35mm) o eje escalonado. El sync gear del tren usa 3/8" pero el tornillo necesita 1/4".
2. KNEADING: El código actual usa 3 zonas todas en reversa (LH). El estudio recomienda: forward para impregnación, neutral para refinado, reverse para fibrilación.
3. PASO: Falta paso corto (10-15mm) entre bloques de kneading en zona de fibrilación.
4. CO-ROTANTE: Clextral BIVIS es co-rotante, no contrarrotante. Si se confirma co-rotante, mirror() está mal y los tornillos deben ser idénticos.

PRUEBAS QUE CLAUDE YA REALIZÓ (resultados positivos):
- Transición transporte(twist) → kneading(sin twist): ✅ 1 componente, fusiona bien
- Misma transición + hueco cuadrado 1/4": ✅ 1 componente, fusiona bien
- El problema podría aparecer con el tornillo COMPLETO (7 fases) + hueco cuadrado

TAREA:
1. Lee los 4 archivos mencionados
2. Diseña el tornillo completo con las 7 fases (Z1-Z7) usando el perfil stadium/bilobal
3. Corrige el eje de hex a cuadrado 1/4" (6.35mm + 0.3mm clearance)
4. Ajusta el perfil de kneading según el estudio (forward/neutral/reverse)
5. Añade paso corto (10-15mm) en zonas de transporte entre kneading
6. Genera el código OpenSCAD completo
7. Exporta STL y verifica con trimesh que el tornillo resultante es 1 componente sólido
8. Verifica que el hueco cuadrado no rompa la geometría en ninguna fase

PARÁMETROS DEL PERFIL:
- r_peak = 12.45mm
- r_root = 7.65mm  
- profile_stadium(): hull de dos círculos r=7.65 separados 4.8mm
- Eje: square_cut con s = 6.65mm (6.35 + 0.3 clearance)
- Longitud total: ~520mm (ajustable)
- Rosca: RH para transporte, LH para kneading (o según configuración co-rotante)

CONSIDERACIONES:
- Si decides que es co-rotante: ambos tornillos son idénticos (no espejo)
- Si decides que es contrarrotante: usar mirror() para el tornillo derecho
- Documenta cada decisión tomada y su justificación
- El tornillo debe ser funcional para fibrilación de celulosa, NO para extrusión de plásticos
```
