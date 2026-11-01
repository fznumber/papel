# Estado del Proyecto: extrusor de doble tornillo

**Última actualización:** 31 Octubre 2026

**Versión mecánica:** TwinLock-253 V16.2 + ensamble total V1

**Fuente de verdad:** `models/tren_de_transmicion/twinlock_253_v16_2.scad`

**Repositorio:** https://github.com/fznumber/papel

---

## 1. Resumen ejecutivo

El proyecto es un extrusor de doble tornillo co-rotante para fibrilar pulpa de algodón (tocuyo) destinada a papel de billetes. La máquina actual es un **prototipo PETG** con geometría **tangencial**, no intermeshing. La prioridad es que arranque, no se atasque y produzca pulpa usable; la fidelidad al diseño de investigación queda para la fase 2.

**Decisión vigente:** mantener OD 25,3 mm, CD 25,3 mm, holguras 0,9/0,4 mm y 3 bloques reverse. No rediseñar el gearbox ni pasar a intermeshing hasta tener una línea base de pulpa.

---

## 2. Estado actual

| Subsistema | Archivo | Estado |
|------------|---------|--------|
| Caja de transmisión | `twinlock_253_v16_2.scad` | V16.2 watertight, 4,5:1; adaptadores opuestos y 2 ejes de compuestos |
| Tornillos | `models/tornillo/Tornillos_Modulares_V2.scad` | Válido, tangencial, 537,65 mm |
| Barril | `models/barril/barril.scad` | V4.3; ensamble, collar y tuercas corregidos; base separada |
| Portador de dado | `models/portador/portador.scad` | V1 watertight; placas 8/6/4; integrado al ensamble total |
| Ensamble total | `models/assembly_total.scad` | Watertight; marco + caja + barril + portador + ejes; 200×185×818 mm |
| Adaptador de salida | `twinlock_253_v16_2.scad` → `bearing_adapter` | Válido para 6703; 4 uds. |
| Acople directo | `acople_directo.scad` | Solo prueba en vacío; no usar con pulpa |
| Config del visor | `twinlock-253.json` | Obsoleto; ignorar o borrar |

Documentación desactualizada que todavía describe otras versiones: `especificaciones/EXTRUSOR.md` (20 mm, acero, intermeshing), `Documentación Técnica.md` (V1, hex 8 mm, 11,11:1, 6002ZZ) y partes de `referencias/proceso-tela-papel.md` (D 20,3 / L 520).

---

## 3. Especificaciones

### 3.1 Caja de transmisión

| Parámetro | Valor |
|-----------|-------|
| Arquitectura | Split-power en H, co-rotante |
| Relación total | **4,5:1** = (54/18) × (24/16) |
| Etapa 1 | Z18 motor → 2× Z54, CD 54,25 mm |
| Etapa 2 | Z16 compuesto → Z24 salida, CD 30,25 mm |
| Módulo / ángulo | 1,5 mm / 25° |
| Backlash | +0,25 mm en CD |
| Salidas | x = ±12,65 mm |
| Compuestos | x = ±42,90 mm |
| Piñón motor | y = 33,21 mm |
| Rodamientos | **6703** 17×23×4 mm, 11 uds. |
| Apilado Z | 16 / 38 / 75 / 91 / 124 mm |
| Fase de salida | **-7,5° global**; engranajes y adaptadores +7,5° local |
| Fase de tornillos | izquierdo -7,5°; derecho 82,5° (90° entre sí) |
| Adaptadores | 4 uds.; Out_R/Cmp_R en placa base (z local 16); Out_L/Cmp_L en placa intermedia (z local 69) |
| Ejes de compuestos | 2 × 6,35 × 118 mm, x = ±42,90, z local 6…124, 0° |
| Par de salida | 7,65 N·m con NEMA23 2 N·m (η 0,85) |
| Límite PETG | ≤ 8 N·m |

**No se usan 51102 ni 6001.** El 6703 no es un rodamiento de empuje; si la extrusión genera empuje axial, agregar un tope o rodamiento axial.

### 3.2 Tornillos

| Parámetro | Valor |
|-----------|-------|
| Tipo | Bilobular co-rotante, tangencial |
| OD nominal | 25,3 mm |
| OD efectivo | 24,9 mm |
| ID | 15,3 mm |
| CD entre tornillos | 25,3 mm |
| Holgura entre tornillos | 0,4 mm |
| Holgura radial al barril | 0,9 mm |
| Longitud | 537,65 mm |
| L/D | 21,25 |
| Pasos | 50,60 / 37,95 / 18,98 mm (2,0D / 1,5D / 0,75D) |
| Zonas | 16 fases; 3 reverse + 1 forward + 1 neutral |
| Bloques de impresión | 4: 139,15 / 151,81 / 151,81 / 94,88 mm |
| Eje | Cuadrado 1/4" (6,35 mm) |
| Material | PETG-CF |

### 3.3 Barril

| Parámetro | Valor |
|-----------|-------|
| Secciones | 3 × (TOP + BOTTOM): 180 / 180 / 178 mm |
| Longitud total | 538 mm |
| Bore | 2 × Ø26,7 mm (`r_bore=13,0`, `bore_comp=0,35`) |
| CD | 25,3 mm |
| Pared radial | 10 mm |
| Eje | Cuadrado 6,35 mm + 0,3 mm |
| Tolva | Boca ~55×42 mm, paso Ø36 mm |
| Salida del barril | Brida 120×80 con 6×M6 (z=532…538) |
| Salida fase 1 | Portador con placas de die 8 / 6 / 4 mm; integrado al ensamble total |

**La placa de salida antigua (`08_placa_salida`, 2×Ø18 mm) está obsoleta
y ya no se incluye en el ensamble.** El portador de dado
(`models/portador/portador.scad`) la reemplaza y aloja placas
intercambiables de 8, 6 y 4 mm con tapa atornillada. Falta imprimirlo y
probarlo con presión.

### 3.4 Accionamiento y materiales

| Componente | Especificación | Notas |
|------------|----------------|-------|
| Motor | NEMA23 2 N·m, eje 8 × 26 mm, directo al gearbox | Piñón barrenado Ø8,2 mm; 7,65 N·m de salida |
| Alternativa | AC 0,75 kW + VFD + reductor 8–12:1 | Mejor para operación continua |
| Limitador de par | 7,5–8 N·m | Protege engranajes PETG |
| Reversa / jog | 10–20 rpm | Para atascos |
| Termocupla | Zona de kneading | ≤50 °C |
| Ventilador | Enfriamiento del barril | Obligatorio en lotes largos |
| Rodamientos | 6703 17×23×4 | 11 uds. |
| Varilla cuadrada | 1/4" (6,35 mm) | 4 tramos: 2×140 mm (salidas) + 2×118 mm (compuestos) |
| Impresión | PETG-CF, 0,4 mm, capa 0,2 mm | 6+ perímetros, 100 % en engranajes |

### 3.5 Ensamble total y marco

| Parámetro | Valor |
|-----------|-------|
| Marco | Placa vertical 200×160×18 mm + 2 vigas 40×60×590 mm |
| Mesa | y = -100; eje del barril en y = 0 |
| Pata trasera | 80×48×30 mm, z = -198…-168 |
| Longitud total | 818 mm (z = -244…574) |
| Ancho / alto | 200 mm / 185 mm |
| Volumen | 7,6979 L sin tornillos extrusores; 8,0065 L con ellos |
| Unión caja ↔ placa ↔ tapa ↔ barril | 6×M6×50 + arandela de 1 mm; tuerca nylock en bolsillo z = 0…6 |
| Unión placa ↔ vigas | 4×M6×60 en y = -61 y -74 |
| Apoyo del barril | Bridas sobre las vigas + abrazaderas (no modeladas) |
| Fase | -7,5° global en las salidas; compuestos a 0° |
| Ejes de salida | 2×6,35×140 mm, z = -115…+25 |
| Ejes de compuestos | 2×6,35×118 mm, z local 6…124 |

**Validación:** ensamble total watertight, `Simple: yes`. Intersecciones
sólo por solapes de contacto de 0,02 mm: caja×marco 502,886 mm³;
caja×tornillos 9,537 mm³; barril×marco 303,517 mm³; portador×marco
57,569 mm³. El resto de los pares da 0. Ver
`models/assembly_total_README.md` para el plano de corte, la BOM y la
secuencia de montaje.

---

## 4. Limitaciones y riesgos

- **Tangencial, no intermeshing:** no hay self-wiping. La pulpa se pega y hay que limpiar entre lotes.
- **PETG:** Tg ~75 °C. Proceso ≤50 °C; los engranajes son el fusible mecánico.
- **Eje de 6,35 mm:** sobre 537 mm flexiona (~12 mm a 100 N, ~1,2 mm a 10 N). Fase 2: eje de 10 mm o acortar a 300–350 mm.
- **Relación 4,5:1:** para 100–150 rpm en los tornillos, el motor debe girar 450–675 rpm. Verificar la curva del NEMA23 a esa velocidad; si no llega, usar AC + VFD o aceptar 30–60 rpm y ajustar el proceso.
- **Alimentación:** el canal es de ~5 mm; la pulpa debe ir a 5–10 mm y 20–25 % de consistencia. Si no, patina o hace puente.
- **Die:** sin restricción no hay presión; con die muy cerrado se atasca. Empezar en 8 mm.
- **Adaptador impreso:** el `bearing_adapter` es PETG; con pulpa se desgasta. Para servicio, hacerlo en acero o pasar a 6001 con rediseño de alojamientos.
- **Empuje axial:** el 6703 es radial; el collar es el camino de empuje. Evaluar una arandela de acero de 1 mm y el desgaste PETG-PETG.
- **Abrazaderas del barril:** el marco no las modela. Sin 2–3 abrazaderas por viga, el barril sólo apoya por las bridas y el portador.
- **M6×50 + nylock:** la punta llega a z = +5 y el bolsillo termina en z = +6. Verificar que alcance el inserto de nylon de la tuerca; corregir con arandela más fina o rebajando el bolsillo, no alargando el tornillo a ciegas.
- **Ejes de compuestos impresos:** si se imprimen en PETG para probar, usarlos sólo en vacío; para pulpa, varilla cuadrada de acero.
- **`acople_directo.scad`:** solo para giros en vacío; no usarlo con pulpa.

---

## 5. Próximos pasos

### Fase 1 — que arranque (ahora)

1. Picar la pulpa cocida a 5–10 mm y escurrir a 20–25 %.
2. Agregar tolva con crammer o pistón manual.
3. Bolsillos de tuerca M6: **hecho y validado** (6 mm de profundidad, 11,8 mm entre vértices; dummy 11,55 × 5,9 mm sin interferencia en las seis mitades). Acceso inferior **resuelto** con base separada: se eliminó `base_continua`; las probetas dan abierto en z_local=12/20/100 y los 6 tornillos de las uniones z=180/360 ya se pueden insertar desde la cara interior.
4. Portador de dado: **hecho** en `models/portador/portador.scad` (cuerpo 120×80×25, conos Ø26,7→Ø16, bolsillo 90×30×10, placas 8/6/4, tapa con 2×Ø16). Validado watertight y sin colisiones; ver `models/portador/README.md`. Falta imprimir y probar con presión. Ya está integrado en `models/assembly_total.scad`.
5. Ensamble total: imprimir las piezas individuales (no el STL del ensamble), armar marco, caja, barril y portador según `models/assembly_total_README.md` §7. Verificar la fase **-7,5° global** de las salidas y que los 2 ejes de compuestos (6,35 × 118 mm, x = ±42,90) entren a 0°.
6. Fijar el barril a las vigas con 2–3 abrazaderas por viga (no modeladas) y una junta de goma/fieltro. Revisar que las 6 tuercas nylock de los M6×50 agarren el inserto de nylon: la punta llega a z = +5 y el bolsillo termina en z = +6.
7. Instalar limitador de par 7,5–8 N·m, reversa/jog, termocupla y ventilador.
8. Usar NEMA23 2 N·m directo (4,5:1); no usar la correa 3:1.
9. Lote A: agua + pulpa sin tela, 100 rpm, die 8 mm.
10. Lote B: pulpa con tela al 10–20 %, 100–150 rpm.
11. Criterio de salida: 10 min sin atasco, ≤50 °C, ≤8 N·m.

### Fase 2 — que fibrile

1. Eje de 10 mm o acortar a 300–350 mm.
2. Rodamientos 6200/6201 en alojamientos metálicos; bancada rígida.
3. Ajustar pasos: alimentación 1,0–1,2D, transporte 0,8–1,0D, zona de compresión.
4. 3–4 pasadas, midiendo CSF y hoja.
5. Criterio: CSF baja y se estabiliza; hoja sin grumos.

### Fase 3 — que sirva como billete

1. Blanqueo lado a lado: sin blanquear vs percarbonato/H₂O₂.
2. Comparar blancura, opacidad, tracción y plegado.
3. Decidir si hace falta intermeshing o acero.

---

## 6. Documentación y archivos

| Archivo | Rol |
|---------|-----|
| `models/assembly_total.scad` | Ensamble total: marco, caja, barril, portador, ejes y flags de exportación |
| `models/assembly_total_README.md` | Plano de corte, estaciones z, BOM y secuencia de montaje |
| `models/tren_de_transmicion/twinlock_253_v16_2.scad` | Gearbox, fuente de verdad |
| `models/tren_de_transmicion/TwinLock-253-Documentacion.md` | Documentación del gearbox |
| `models/tornillo/Tornillos_Modulares_V2.scad` | Tornillos actuales |
| `models/barril/barril.scad` | Barril actual |
| `models/barril/README.md` | Fabricación del barril |
| `models/portador/portador.scad` | Portador de dado 8/6/4 |
| `models/portador/README.md` | Fabricación y montaje del portador |
| `models/portador/assembly_barril.scad` | Subensamble barril + portador |
| `models/tren_de_transmicion/acople_directo.scad` | Solo prueba en vacío |
| `especificaciones/COCCION_ALCALINA.md` | Cocción (soda ash; adaptar si se usa bicarbonato) |
| `especificaciones/BLANQUEO.md` | Blanqueo con H₂O₂ |
| `especificaciones/CALIDAD.md` | Criterios de calidad |
| `referencias/proceso-tela-papel.md` | Proceso de referencia; desactualizado en dimensiones |

**Notas:**
- El STL de `models/assembly_total.scad` es de visualización/validación; incluye motor dummy y ejes. Para imprimir, usar los STL individuales del gearbox, el barril y el portador.
- `twinlock-253.json` era la config del visor; quedó obsoleto.
- Los STL de `stls_transmision/` e `imprimir/` pueden estar desactualizados; regenerarlos desde el `.scad`.

---

## 7. Historial breve

| Versión | Cambio | Estado |
|---------|--------|--------|
| V10.0/V10.1 | 6002ZZ → 6703; ancho 4 mm | Superado |
| V16.2 | Stack 16/38/75/91/124; 4,5:1; 6703; standalone | **Actual (base)** |
| Ensamble total V1 | Marco placa 18 mm + vigas; caja/barril/portador integrados; fase -7,5°; 4 tramos de varilla cuadrada | **Actual** |
| Tornillos V2 | Co-rotante, 16 fases, 4 bloques, eje 1/4" | **Actual** |
| Docs 6:1 / 6001 | Ratio y rodamiento incorrectos | **Obsoleto** |

La relación correcta siempre fue **(54/18) × (24/16) = 4,5:1**. Las versiones que decían 6:1 correspondían a otro juego de engranajes y no al standalone.

---

## 8. Referencias

- **Rol et al. (2020)** — “Fibrillation of cellulose by twin-screw extrusion”.
- **Freville et al. (2024/2025)** — Seguimientos del mismo grupo.
- **Clextral BIVIS** — Extrusor de referencia para papel moneda (co-rotante, intermeshing, self-wiping). **No es la geometría de este prototipo.**
- **LUDOVIC** — Software de referencia para modelado de TSE co-rotantes.
- **Catálogo NTN/ISK/MISUMI** — Especificaciones de rodamientos.
