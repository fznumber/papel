# Resumen de Archivos - Papel Moneda

## Estructura del Proyecto (Actualizada)

```
/home/fz/proyectos/papel/
│
├── extrusor/                              ← EXTRUSOR DE DOBLE TORNILLO
│   ├── printed_parts/
│   │   ├── stl/                           ← ARCHIVOS STL PARA IMPRIMIR
│   │   │   ├── screw/                     (6 tornillos, 1.6-1.7MB c/u)
│   │   │   ├── barrel/                    (3 barriles con agujeros, 40KB c/u)
│   │   │   ├── kneading/                  (5 bloques kneading)
│   │   │   ├── motor/                     (acoples, soportes)
│   │   │   └── pins/                      (pines de alineación)
│   │   ├── prototipo_dc/                  ← PROTOTIPO MOTOR DC
│   │   │   ├── stl/                       (componentes DC)
│   │   │   ├── scripts/                   (generadores)
│   │   │   └── preview/                   (visualizaciones)
│   │   ├── frame/                         (bastidor)
│   │   ├── alternativa/                   (bomba dual del video)
│   │   ├── preview/                       (imágenes y animaciones)
│   │   ├── die/                           (dado)
│   │   ├── barrel/                        (barril)
│   │   ├── screw/                         (tornillo)
│   │   ├── kneading/                      (kneading)
│   │   ├── motor/                         (motor)
│   │   ├── pins/                          (pines)
│   │   └── IMPRESION_3D.md               (guía de impresión)
│   └── alternativas/                      (análisis alternativas)
│
├── formacion/                             ← SISTEMA DE FORMACIÓN DE HOJA
│   ├── slot_die.scad                      (cabezal slot die)
│   ├── forming_table.scad                 (mesa formadora)
│   ├── dandy_roll.scad                    (rodillo marca de agua)
│   ├── thread_feeder.scad                 (alimentador hilo)
│   ├── press_rollers.scad                 (prensa rodillos)
│   ├── complete_system.scad               (ensamblaje completo)
│   ├── visualize_system.py                (script visualización)
│   └── preview/                           (visualizaciones)
│
├── cnc-build/                             ← MÁQUINA CNC
│   ├── design/                            (diseño OpenSCAD)
│   │   ├── frame.scad                     (marco)
│   │   ├── assemblies.scad                (ensamblajes)
│   │   ├── molds.scad                     (moldes)
│   │   ├── SPECIFICATIONS.md              (especificaciones)
│   │   └── FRAME_DESIGN.md                (diseño del marco)
│   ├── bom/                               (lista de materiales)
│   │   ├── BOM.md
│   │   └── PROCUREMENT.md
│   ├── alternativas/                      (análisis alternativas CNC)
│   │   ├── alt1/                          (Genmitsu 3020)
│   │   ├── alt2/                          (HTMCNC)
│   │   └── alt3/                          (Rock Solid)
│   ├── models/stl/                        (modelos 3D)
│   ├── docs/                              (documentación)
│   └── scripts/                           (scripts utilitarios)
│
├── simulation/                            ← SIMULACIÓN SPH
│   └── models/                            (14 archivos OBJ)
│       ├── screw_complete.obj             (tornillo izq completo)
│       ├── screw_complete_right.obj       (tornillo der)
│       ├── barrel_solid.obj               (barril sólido)
│       ├── barrel_bore.obj                (forma ∞)
│       └── kneading_*.obj                 (5 bloques)
│
├── planos/                                ← PLANOS TÉCNICOS
│   └── dxf/                               (17 archivos DXF)
│       ├── 01_portada.dxf
│       ├── 02_ensamblaje_general.dxf
│       ├── 03_corte_longitudinal.dxf
│       ├── 04_seccion_barril.dxf
│       ├── 05_detalle_barril.dxf
│       ├── 06_elemento_transporte.dxf
│       ├── 07_kneading_block.dxf
│       ├── 07b_seccion2_kneading_block.dxf
│       ├── 08_plato_dado.dxf
│       ├── 09_bastidor.dxf
│       ├── 10_bom_ensamblaje.dxf
│       └── tornillo_*.dxf                 (5 planos de tornillo)
│
├── scripts/                               ← SCRIPTS DE GENERACIÓN
│   ├── gen_complete_screw.py              (genera tornillo 520mm)
│   ├── gen_kneading_mesh.py               (genera bloques kneading)
│   ├── gen_barrel_solid.py                (genera barril)
│   ├── gen_screw_sections.py              (divide tornillo para imprimir)
│   ├── gen_printable_parts.py             (genera todas las piezas)
│   ├── gen_planos_v3.py                   (genera planos DXF)
│   ├── render_previews.py                 (genera imágenes PNG)
│   ├── render_assembly.py                 (genera ensamblaje)
│   ├── animate_extruder.py                (genera animaciones GIF)
│   └── split_obj.py                       (divide OBJ grandes)
│
├── referencias/                           ← REFERENCIAS E INVESTIGACIÓN
│   ├── estudio-diseno-tornillos-extrusor.md   (estudio completo)
│   ├── RESEARCH_PAPERS.md                     (14 papers)
│   ├── perfil-*.md                            (6 perfiles)
│   └── sistema-formacion-hoja.md              (sistema de formación)
│
└── design/                                ← DISEÑOS ADICIONALES
    └── joining_features.scad              (características de unión)
```

---

## Archivos STL para Impresión 3D

### Tornillos (6 secciones)
| Archivo | Dimensión | Peso | Para qué sirve |
|---------|-----------|------|----------------|
| screw_part_A.stl | 20.3×20.3×170mm | 1.6MB | Tornillo izq: entrada (0-170mm) |
| screw_part_B.stl | 20.3×20.3×170mm | 1.6MB | Tornillo izq: medio (170-340mm) |
| screw_part_C.stl | 20.3×20.3×180mm | 1.7MB | Tornillo izq: salida (340-520mm) |
| screw_right_part_A.stl | 20.3×20.3×170mm | 1.6MB | Tornillo der: entrada |
| screw_right_part_B.stl | 20.3×20.3×170mm | 1.6MB | Tornillo der: medio |
| screw_right_part_C.stl | 20.3×20.3×180mm | 1.7MB | Tornillo der: salida |

### Barril (3 secciones con agujeros)
| Archivo | Dimensión | Peso | Para qué sirve |
|---------|-----------|------|----------------|
| barrel_A.stl | 57.8×41.4×170mm | 40KB | Barril: entrada |
| barrel_B.stl | 57.8×41.4×170mm | 40KB | Barril: medio |
| barrel_C.stl | 57.8×41.4×180mm | 40KB | Barril: salida |

### Bloques de Kneading (5 opciones)
| Archivo | Dimensión | Peso | Zona |
|---------|-----------|------|------|
| kneading_45L_7_80.stl | 20.3×20.3×80mm | 268KB | Z2 (principal) |
| kneading_60L_4_56.stl | 20.3×20.3×56mm | 156KB | Z4 |
| kneading_45L_5_44.stl | 20.3×20.3×44mm | 196KB | Z6 |
| kneading_45L_5_56.stl | 20.3×20.3×56mm | 196KB | Alternativa |
| kneading_90L_5_44.stl | 20.3×20.3×44mm | 196KB | Alternativa |

### Accesorios
| Archivo | Contenido | Peso |
|---------|-----------|------|
| pin_single.stl | 1 pín Ø2×5mm | - |
| pin_set_4x.stl | 4 pines | - |
| pin_rack_20x.stl | 20 pines | 128KB |

---

## Sistema de Formación de Hoja

### Archivos OpenSCAD
| Archivo | Descripción |
|---------|-------------|
| slot_die.scad | Cabezal para distribuir pulpa |
| forming_table.scad | Mesa con malla formadora |
| dandy_roll.scad | Rodillo para marca de agua |
| thread_feeder.scad | Alimentador de hilo de seguridad |
| press_rollers.scad | Prensa de rodillos |
| complete_system.scad | Ensamblaje completo |

---

## Resumen de Cantidades

| Categoría | Cantidad | Ubicación |
|-----------|----------|-----------|
| STLs extrusor | 15 archivos | extrusor/printed_parts/stl/ |
| STLs prototipo DC | 10 archivos | extrusor/printed_parts/prototipo_dc/stl/ |
| Planos DXF | 17 archivos | planos/dxf/ |
| OBJs simulación | 14 archivos | simulation/models/ |
| OpenSCAD formación | 6 archivos | formacion/ |
| Scripts | 10 archivos | scripts/ |

---

## Orden de Uso

### Para imprimir en 3D:
1. Abrir **OrcaSlicer**
2. Seleccionar impresora **Ender-3 Pro**
3. Arrastrar archivos STL de `extrusor/printed_parts/stl/`
4. Configuración: PETG, 0.2mm layer, 20% infill (tornillos), 40% (barril)
5. Imprimir en orden: pins → kneading → barrel → screw

### Para simulación SPH:
1. Usar OBJs de `simulation/models/`
2. Cargar en SPlisHSPlasH
3. Configurar escena con `screw_3d_scene_v7.json`

### Para fabricación en CNC:
1. Usar planos DXF de `planos/dxf/`
2. Material: Acero inox 316L
3. Seguir dimensiones en planos

---

## Dimensiones Clave

| Componente | Dimensión | Material Final |
|------------|-----------|----------------|
| Tornillo OD | Ø20.3mm | Acero 316L |
| Tornillo root | Ø12.6mm | Acero 316L |
| Tornillo largo | 520mm | Acero 316L |
| Barril exterior | 57.8×41.4mm | Acero 316L |
| Barril bore | Ø21.3mm (∞) | Acero 316L |
| Distancia centros | 16.45mm | - |
| Clearance | 0.5mm | - |

---

## Costo Estimado Impresión 3D

| Material | Cantidad | Costo |
|----------|----------|-------|
| PETG | ~2.35kg | ~Bs 314 |
| **Total** | | **~Bs 314** |

---

*Última actualización: Junio 2026*
