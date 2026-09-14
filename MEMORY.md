# MEMORY.md — Proyecto Papel

## Qué es
Producción de papel de fibra de algodón para billetes a escala artesanal. La fase actual es diseño del extrusor twin-screw para impresión 3D (Ender-3 Pro, PETG) y planificación de máquina CNC para fabricar piezas de acero.

## Stack técnico
- **Simulación**: SPlisHSPlasH v2.17 (SPH, DFSPH, CPU build)
- **Mesh**: Python + numpy + trimesh + shapely (generación de geometría ∞ paramétrica)
- **Visualización**: VTK legacy (big-endian binary floats)
- **CAD**: OpenSCAD (8 archivos en `cad/`)
- **Búsqueda**: SearXNG autohosteado (Docker, localhost:8888)
- **GPU**: RTX 3060 12GB (CUDA 12.4), pero CUDA no integrado por ahora

## Hitos

### Mesh barrel (08-Jun-2026) ✅
Primer intento: ∞-shape con normales mixtas (~48% inward). Solución parcial: ordenar perímetro por ángulo polar.

### Barrel containment + screws simulation (09-Jun-2026) ✅
Arreglo completo de la malla barril y simulación funcional con tres cuerpos. Causa raíz: tres issues combinados — face winding, cross-section (arcos interiores vs exteriores), y mapInvert. Barril ahora watertight con 0/2880 normales inward. Screws 46/2880 inward (válido — flancos cóncavos del perfil Erdmenger). Simulación produce VTK con corrección de contorno activa.

Pipeline: `gen_barrel_mesh.py` → OBJ → SPHSimulator escena JSON → VTK

### SPlisHSPlasH operativo ✅
- Build CPU-only (sin CUDA): cmake con `-DUSE_GPU=OFF -DUSE_CUDA=OFF`
- 1280 partículas ~2.5ms/step en barrel tube
- La simulación es método DFSPH (simulationMethod 4)
- Boundary handling: Volume Map + SDF (method 2)

### Diseño extrusor twin-screw documentado ✅
- `especificaciones/EXTRUSOR.md`: diseño ingeniería completo (D=20mm, ID=12.9mm, C=16.45mm, L/D=24:1)
- BOM estimada $1,225-1,525
- 8 modelos CAD en `cad/` (todos compilan en OpenSCAD)

### Extrusor 3D-printed — Diseño completo ✅ (Jul-2026)
- **Variante definitiva**: tornillos hexagonales (hex 8.3mm flat-to-flat, varilla hex 8mm)
- **OD tornillo**: 25.3mm, 7 fases por lado (Z1-Z7), 520mm largo total
- **Barril**: figura-8 Ø26mm, 3 secciones × 2 mitades + tapa motriz + placa salida
- **Motor definitivo**: NEMA23 JK57HS51-2804-01 (1 N·m / 10.2 kg·cm, 2.8A, eje Ø5mm)
- **Tren de transmisión V3** (`models/tren_de_transmidion2/`): engranajes 18T/60T trapezoidales, módulo 1.5mm, ratio 11.1:1, rodamientos 6002ZZ, seguro E-clip
- **Tornillos Gemini hex** (`models/tronillo-gemini-hex/`): 14 STLs (7 fases × 2 lados), diseño tangencial (kissing screws)
- **Diseño tangencial**: distance centro-centro = OD (25.3mm), los tornillos se tocan pero no se solapan → ideal para piezas grandes de tela (2-5cm)
- **Holgura tornillo↔barril**: 0.7mm radial (perfecta para pulpa de algodón en PETG)
- **Archivos**: `models/` con STLs + OpenSCAD paramétricos
- **T8 rosca**: descartada (frágil en PETG), archivada como referencia en `tornillo-claude-rosca/`
- **Preparación material**: hervir tela en bicarbonato de sodio (5-10g/L, 1-2h) antes de alimentar al extrusor

### Screw elements mesh + rotación (08-Jun-2026) ✅
- `gen_screw_mesh.py`: generación paramétrica de perfil Erdmenger self-wiping
  - Cross-section: r(θ) = C·cos(θ)−√(R²−C²·sin²θ) para θ∈[−θ_int,θ_int], r=R fuera
  - Helix: 360° twist sobre 30mm pitch, 1538 vértices, 3072 triángulos, watertight
- Motor joints (TargetVelocityMotorHingeJoints): -10.5 rad/s, exacto medido
- Screws rotan correctamente en sentido co-rotante
- Bombear fluido axialmente confirmado (movimiento en Z)

### Limitación: gap 0.15mm no resoluble con CPU SPH
- Gap tornillo-barril (0.15mm) requiere partículas < 0.075mm → ~42M partículas
- Partículas de 1mm no pueden fluir por el gap → se comprimen y escapan por tapas
- Solución propuesta: simulación 2D cross-section (elimina tapas Z)

### 3D twin-screw simulation funcional ✅ (09-Jun-2026, revisado 13-Jun)
- 6360 partículas (r=0.5mm, spacing=1mm), dt=5e-5, 20000 pasos (~24s)
- NOTA: resultado 94% containment era **enganoso** — escena barrel_final.json cargaba barrel_cavity_v2.obj (no existe). Contención venía del outer_box, no del barril
- Configuración original: `mapInvert=true` + `mapThickness=0.0005` para barril
- Screws rotan correctamente, bombeo visible en partículas

### Root cause analysis — boundary blowup (13-Jun-2026) ✅ RESUELTO
- **Causa raíz**: 97% de partículas (5938/6108) estaban DENTRO de los meshes de screws
- `trimesh.proximity.signed_distance()` con `sd < -margin` filtra correctamente
- **0 partículas explotadas** con placement corregido (2711 partículas, 0.05s simulación)
- **barrel_bore.obj** (extrusión ∞-shape) = correcto: watertight, Euler=2, bore preservado
- **trimesh.contains() engaña**: retorna TRUE para material de pared, NO para bore
- **mapThickness=0.0** es el valor correcto — TODOS los ejemplos de SPlisHSPlasH usan esto
- BGEO writer corregido: formato Partio correcto (magic + 'V' + version + npts + attrs + data)
- Partículas se mueven correctamente: X de [-19,19] a [-3.6,8.0]mm en 0.05s
- Velocidad estable ~20 m/s media, ~148 m/s max (boundary interaction de screws)

## Lecciones aprendidas

1. **VTK binary format**: SPlisHSPlasH escribe big-endian floats con `swapByteOrder()`. Parsear con `struct.unpack('>' + 'f' * N, data)`.
2. **mapInvert**: Para un tubo cerrado (mesh hueco con tapas), `mapInvert: true` marca el interior como región válida para el fluido. Para un sólido (obstáculo), `mapInvert: false`.
3. **Mesh para contenedor**: Necesita ser watertight y tener normales consistentes. Si las normales son mixtas, el SDF no puede determinar interior/exterior.
4. **Perímetro ∞-shape**: La forma correcta se obtiene tomando puntos de cada círculo que están fuera del otro círculo, y ordenándolos por ángulo polar.
5. **CFL**: Con `cflFactor: 0.5` y paso base 0.0005s, el solver se adapta automáticamente (~0.0001s/step real).
6. **Performance**: Barrel tube con 1664 triángulos: ~2.5ms/step. Dos cilindros individuales (80 triángulos c/u): ~21.5ms/step (10x más lento) por doble SDF + VolumeMap.
7. **Motor joints**: TargetVelocityMotorHingeJoints funciona con -10.5 rad/s target. Notch tracking da ~10.5 rad/s exacto. El joint conecta dynamic body (screw) a static body (barrel).
8. **Erdmenger profile paramétrico**: r(θ) = C·cos(θ)−√(R²−C²·sin²θ) para θ∈[−θ_int,θ_int], star-convex desde el origen. Extrusión helicoidal con twist genera geometría self-wiping en 3D.
9. **Gap resolution**: Para resolver gap de 0.15mm entre screw y barrel con SPH, partículas < 0.075mm → inviable en CPU. Alternativa más práctica: simulación 2D del cross-section.
10. **Dynamic rigid body cost**: computeVolumeAndBoundaryX escala ~lineal con particle count y ~O(n_boundaries). Con 3 boundaries y 500 partículas: ~0.14ms/step. Con 6409 partículas: ~45ms/step (320× más para 12.7× más partículas — algo más que lineal).
11. **Cross-section outer arcs**: Para un tubo ∞ (dos cilindros solapados), el perímetro correcto del barril son los arcos EXTERNOS (pared del bore). El interior de cada círculo queda fuera del otro — usar arcos exteriores (ángulos donde r>distancia al otro centro). Orden CCW alrededor de cada círculo.
12. **mapInvert semantics**: Para un mesh hueco que contiene fluido (barril con tapas), mapInvert=True. Para un sólido macizo que desplaza fluido (screw), mapInvert=False. La regla: el exterior del mesh es el dominio del fluido → mapInvert=False. El interior del mesh es el dominio del fluido → mapInvert=True.
13. **Face winding for containing meshes**: Triángulos con normales APUNTANDO HACIA AFUERA del volumen contenido. Para el barril, outward normals significan que apuntan al exterior del tubo (no al bore). Esto combinado con mapInvert=True da el SDF correcto.
14. **mapThickness dead zone**: La condición de activación V_b es `0 < dist < supportRadius`. Con `mapInvert=false`: `dist = SDF - mapThickness`. Si mapThickness > 0, hay una zona muerta de 0-SDF<mapThickness donde no hay repulsión. Para eliminar la zona muerta: usar `mapInvert=true` con `mapThickness < supportRadius` (0.5mm < 1mm para partículas de 0.5mm radius).
15. **trimesh SDF convention**: trimesh usa convención INVERTIDA: SDF > 0 = dentro del mesh, SDF < 0 = fuera. SPlisHSPlasH usa convención estándar: SDF < 0 = dentro. Verificar siempre con un box de prueba.
16. **mapThickness=0.0 es el estándar**: TODOS los ejemplos de SPlisHSPlasH (Bunny_vs_Dragon, DamBreak, Coiling, etc.) usan `mapThickness: 0.0`. Valores > 0 causan zona muerta o fuerzas explosivas. El tolerance en la fórmula `func = sign * (SDF - tolerance)` con tolerance=0 da边界力 correcta en la superficie del mesh.
17. **manifold3d boolean puede destruir geometría**: Al repair un mesh ∞-shape (barrel_3d.obj), manifold3d colapsa el bore en un cilindro sólido (Euler=62→2, pierde el hueco). Usar `trimesh.creation.extrude_polygon()` + `shapely.boolean.difference()` para preservar cavidades.
18. **trimesh.contains() no sirve para cavidades**: Para un mesh sólido con hueco (barrel_block), `contains()` retorna TRUE para el material sólido, NO para la cavidad. Usar `shapely.contains_xy()` con la geometría 2D ∞-shape + filtro de signed distance para placement de partículas.
19. **Particle placement correcto**: 1) Generar grid 2D con shapely bore (∞-shape) 2) shrink bore por margin 3) Extruir en z 4) Filtrar con `trimesh.proximity.signed_distance()` > 0 (dentro del bore mesh) 5) Filtrar fuera de screws con `nearest.on_surface()`.
20. **Boundary blowup en screws**: Partículas en z=[19.5, 25.5]mm (lóbulo derecho del bore ∞) explotan por boundary forces extremas de screws en rotación. Las 5344/6108 partículas restantes son estables. Causa: volume map interpolation en bordes de filetes helicoidales.

## Limitaciones actuales
- Gap tornillo-barril (0.15mm) no resoluble con CPU build (~42M partículas necesarias)
- Viscosidad newtoniana (agua), no reología de pulpa
- Sin dado de salida
- Simulación lenta: ~1.1s/step con 2711 partículas (dt=1e-5, 64³ volume maps)
- Solo 0.05s simulados (5000 steps) — necesita ~0.5-1s para transporte significativo
- Velocidades altas (~20 m/s media) — posible inestabilidad numérica o efecto de initial transient
- **Barrel mount holes**: patrón de 12×M5 es placeholder — necesita medición real de tapa motriz
- **Configuración impresión**: pendiente de definir (infill, perímetros, boquilla exactos)
- **Impresión tornillos**: pendiente imprimir pieza de prueba 10-15mm para verificar fit con hex rod

## Estructura del Proyecto (Actualizada Jun-2026)

### Carpetas principales
- `extrusor/` — Extrusor de doble tornillo (STLs, scripts, alternativas)
- `formacion/` — Sistema de formación de hoja con marca de agua e hilo de seguridad
- `cnc-build/` — Solo máquina CNC (diseño frame, BOM, alternativas)
- `simulation/` — Simulación SPH (SPlisHSPlasH)
- `planos/` — Planos técnicos DXF
- `scripts/` — Scripts Python de generación
- `referencias/` — Investigación y documentación
- `design/` — Diseños adicionales

## Archivos clave

### Extrusor 3D-printed — Parámetros clave
- **Tornillo OD**: 25.3mm (radio pico 12.65mm)
- **Tornillo root**: 7.85mm radio
- **Hex hole**: 8.3mm flat-to-flat (apotema 4.15mm, circunradio 4.79mm)
- **Pared raíz filete**: 3.70mm
- **Barril bore**: figura-8 Ø26mm × 2, centro-centro 25.3mm
- **Barril pared**: 10mm
- **Barril largo**: 520mm (170+170+180)
- **Holgura tornillo↔barril**: 0.7mm radial (0.35mm por lado)
- **Diseño**: Tangencial (kissing screws) — los picos se tocan pero no solapan
- **Motor**: NEMA23 JK57HS51-2804-01 (1 N·m, 2.8A, eje Ø5mm, NEMA23 57×57mm)
- **Engranajes**: 18T/60T trapezoidales, módulo 1.5mm, ratio 11.1:1 (2 etapas 18→60)
- **Rodamientos**: 6002ZZ en placas (reemplazan bushings impressos)
- **Seguro axial**: E-clip en sync gears
- **Perno de corte**: Ø2.0mm en motor_hub + pinion1 (filamento 1.75mm como fusible)
- **Eje derecho corto**: termina a Z=24mm (justo después del sync_gear) para evitar colisión con engranaje 60T
- **7 fases**: Z1(ConveyRH 100)→Z2(Knead45LH×7 80)→Z3(ConveyRH 60)→Z4(Knead60LH×3 40)→Z5(ConveyRH 100)→Z6(Knead45LH×4 40)→Z7(ConveyRH 100)

### Configuración de impresión (pendiente de definir)
- **Infill**: 80% general, 100% en Z7 (compresión/extrusión)
- **Perímetros**: 5-6 (lo más importante para resistencia mecánica)
- **Boquilla**: 0.6mm recomendada (40% más rápido, líneas más gruesas = más fuerte)
- **Layer height**: ~0.3mm con boquilla 0.6mm
- **Material**: PETG (Tg ~80°C), alternativa PETG-CF o ASA
- **Nota**: Los perímetros (paredes) dan más resistencia que el infill

### Preparación del material (algodón)
1. Cortar tela de tocuyo en trozos 2-5cm
2. Hervir en solución de bicarbonato de sodio (5-10g/L, 1-2 horas)
3. Enjuagar bien para eliminar residuos alcalinos
4. Remojar en agua antes de alimentar al extrusor

### Simulación
- `simulation/models/barrel_bore.obj`: mesh barril ∞-shape (watertight, Euler=2, 284F)
- `simulation/models/barrel_block.obj`: caja con bore ∞-shape (watertight, Euler=4, 296F)
- `simulation/models/screw_complete.obj`: tornillo izq completo 520mm
- `simulation/models/screw_complete_right.obj`: tornillo der 520mm
- `simulation/screw_3d_scene_v7.json`: escena actual

### Extrusor (STLs para imprimir — models/)
- `models/tronillo-gemini-hex/` — 14 tornillos hex gemelos (7 fases × 2 lados, Gemini) + OpenSCAD
- `models/tren_de_transmidion2/` — 10 partes transmisión V3 (rodamientos, engranajes 18T/60T)
- `models/tornillo-claude-hex/` — 7 hex screw phases (Claude, referencia)
- `models/tornillo-claude-rosca/` — 14 T8 thread screws (archivada)
- `models/barril/` — 8 barrel STLs + OpenSCAD (scaled/ subdir for Ender-3)

### Sistema de formación
- `formacion/`: 6 archivos OpenSCAD (slot die, mesa, dandy roll, hilo, prensa)
- `formacion/preview/`: visualizaciones del sistema

### CNC
- `cnc-build/design/`: OpenSCAD frame + molds
- `cnc-build/bom/`: BOM ~2,334 EUR
- `cnc-build/alternativas/`: análisis Genmitsu, HTMCNC, Rock Solid, LowRider

### Planos y scripts
- `planos/dxf/`: 17 archivos DXF
- `scripts/`: 10 scripts Python (gen_*, render_*, visualize_*)
