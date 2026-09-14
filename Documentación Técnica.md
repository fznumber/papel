# Documentación Técnica: Extrusor de Doble Tornillo (Prototipo V1)
**Aplicación:** Procesamiento y refinamiento de fibra de algodón (tela de tocuyo) para pulpa de papel.
**Método de Fabricación:** Impresión 3D FDM (Material recomendado: PETG).

---

## 1. Sistema del Barril (Extrusion Barrel)
El barril es el núcleo de la máquina, diseñado para soportar altas presiones y fricción sin necesidad de piezas mecanizadas, optimizado al 100% para imprimirse sin soportes.

### Características Principales:
* **Diseño Modular Bipartido:** Dividido en 3 secciones longitudinales (170mm + 170mm + 180mm = 520mm). Cada sección se divide en mitades `TOP` y `BOTTOM` (corte horizontal) permitiendo imprimir canales en forma de "artesa" sin soportes internos, garantizando un acabado liso.
* **Geometría del Bore:** Perfil en "Figura-8" de diámetro nominal **Ø26 mm**. Incluye una compensación paramétrica (`bore_comp = 0.35mm`) para contrarrestar la contracción del plástico, dejando un diámetro final de **Ø26.7 mm** para una holgura fluida.
* **Base Monolítica Trapezoidal:** La mitad inferior incorpora un pedestal masivo continuo que se ensancha hasta 110 mm. Cuenta con **18 puntos de anclaje (Pernos M6)** para fijar la máquina a una mesa de trabajo, eliminando vibraciones y torsión.
* **Gestión de Carga Axial (Empuje):** La "Tapa Motriz" incluye alojamientos para **2 Rodamientos Axiales de Empuje (Thrust Bearings 51102)**. Junto con collares impresos con prisionero M3, aíslan el 100% de la fuerza de retroceso (Tercera Ley de Newton), protegiendo la caja de engranajes.
* **Escotillas de Inspección:** Incorporadas en las secciones 2 y 3. Utilizan tapones esculpidos con la curvatura interior exacta del barril, sellando con 4 tornillos M5. Permiten monitorear el amasado sin alterar el flujo hidrodinámico ni generar fugas.

---

## 2. Tren de Transmisión (Drivetrain)
Una caja reductora externa robusta, alineada matemáticamente con el barril y soportada independientemente.

### Características Principales:
* **Reducción de Potencia:** Sistema de engranajes rectos de 2 etapas (Módulo 1.5).
  * **Etapa 1:** 18T a 60T (Relación 3.33:1)
  * **Etapa 2:** 18T a 60T (Relación 3.33:1)
  * **Reducción Total:** **11.11:1**. Un motor NEMA23 de 1 N·m entregará cómodamente más de 11 N·m en los tornillos.
* **Lógica Hexagonal (Faseado Perfecto):** Todos los engranajes montados en los ejes hexagonales tienen dientes múltiplos de 6 (18T y 60T). Esto garantiza que el patrón de dientes encaje idénticamente en cualquiera de las 6 caras del hexágono.
* **Sistema de Rodamientos (6002ZZ):** Los ejes no rozan con el plástico. Se usan 5 rodamientos industriales 6002ZZ (ID 15mm, OD 32mm) embutidos en las placas, junto con "adaptadores" hexagonales impresos. Evita la ovalización por fricción.
* **Seguridad (Perno de Corte / Shear Pin):** El acople del motor usa un hub accionado por gravedad. El torque se transmite mediante un hilo de filamento de 1.75mm/2.0mm insertado verticalmente. Ante un atasco de tela, el plástico se guillotina (fusible mecánico), salvando la máquina y el motor.
* **Soporte Estructural del Motor:** La base baja hasta el nivel de la mesa (`Y = -52mm`) con pilares extra anchos para esquivar los engranajes gigantes. Incluye una **Torre de Soporte y Abrazadera** dedicada que carga el 100% del peso del motor NEMA 23, evitando palancas que fracturen el plástico.

---

## 3. Tornillos Extrusores (Modular Screws)
Dos tornillos contrarrotantes ensamblados sobre varillas hexagonales de acero sólido de 8mm. 

### Características Principales:
* **Dimensiones Base:** Longitud 520 mm, Diámetro Exterior (OD) **25.3 mm**, Radio de Raíz 7.85 mm. 
* **Distancia Centro a Centro:** 25.3 mm. Esto genera un diseño **Tangencial (Kissing Screws)**. Es la geometría perfecta para procesar trozos de tela, ya que deja un volumen libre grande para triturar fibras largas sin atascarse (a diferencia de perfiles intermeshing apretados).
* **Holgura Radial (Clearance):** 0.7 mm entre el pico del tornillo y la pared del barril. Ideal para flujo de pulpa con hinchamiento térmico/húmedo del PETG.
* **Cálculo Automático de Ángulos:** Cada módulo calcula matemáticamente la rotación de salida de la fase anterior para que el canal hexagonal central (8.3 mm) sea perfectamente recto al apilar las piezas.

### Diseño de Fases (Perfil de Proceso)
| Fase | Longitud | Tipo | Geometría | Función en el Proceso |
| :--- | :--- | :--- | :--- | :--- |
| **Z1** | 100 mm | Transporte | Paso 25mm, RH (Rosca Derecha) | Ingreso y arrastre inicial de la tela y agua. |
| **Z2** | 80 mm | Amasado | 7 Discos, 45° LH (Rosca Izda) | Cizallamiento y trituración severa contra el flujo. |
| **Z3** | 60 mm | Transporte | Paso 25mm, RH | Descompresión, transporte de mezcla primaria. |
| **Z4** | 40 mm | Amasado Agresivo | 3 Discos, 60° LH | Mezclado turbulento, retención alta de fibra. |
| **Z5** | 100 mm | Transporte | Paso 25mm, RH | Zona larga de estabilización y homogeneización. |
| **Z6** | 40 mm | Refinamiento | 4 Discos, 45° LH | Amasado fino final de las fibras de celulosa. |
| **Z7** | 100 mm | Extrusión | Paso 25mm, RH | Compresión final hacia los dados de salida (Ø18mm). |

---

## 4. Hardware Necesario (Lista de Compras BOM)

**Mecánica y Rodamientos:**
* 2x Varillas hexagonales de acero de 8mm (Largo aprox: 600mm).
* 1x Varilla hexagonal corta (Aprox 60mm) para el eje intermedio de la caja.
* 5x Rodamientos radiales **6002ZZ** (o 2RS).
* 2x Rodamientos axiales de empuje **51102**.

**Tornillería (Tornillos y Tuercas):**
* **M5 x 20mm y 25mm:** (Aprox. 60 uds). Para cerrar mitades del barril, unir bridas, atornillar escotillas y abrazadera del motor. 
* **M5 Varillas/Pernos Largos:** (Aprox 70-80mm). Para cruzar las placas del tren de transmisión.
* **M6 x 50mm:** (Aprox. 21 uds). Para anclar el barril (18), el soporte trasero de transmisión (3) y la torre del motor (2) a la mesa.
* **Prisioneros (Set Screws) M3:** (Aprox. 8 uds). Para anclar los collarines de empuje, el hub del motor y asegurar los engranajes a las varillas hexagonales.

---

## 5. Parámetros de Impresión (Ender-3 Pro)
* **Material:** PETG (Excelente adherencia entre capas y flexibilidad mecánica frente al impacto).
* **Orientación:** Todas las piezas han sido diseñadas para imprimirse en la orientación en la que se exportan **SIN SOPORTES**.
* **Paredes (Perímetros):** Mínimo 4 a 6 (vital para roscas y piezas con alto torque como los tornillos y engranajes).
* **Relleno (Infill):** 
  * Barril y Transmisión: 50% - 60% (Cúbico o Giroide).
  * Tornillos y Engranajes: 80% - 100%.
* **Notas Adicionales:** Escariar ligeramente los agujeros M5 y M6 con broca si la tolerancia de la impresora los deja muy justos. Dejar el bore principal tal cual sale o limpiar solo hilos de "stringing".

*** 
*Documentación generada para la versión de prototipo funcional V1. Diseño paramétrico 100% en OpenSCAD.*
