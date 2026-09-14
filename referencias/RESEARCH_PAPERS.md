# Research Papers — SPH Simulation of Twin-Screw Extruders & Cotton Fiber Processing

## Core SPH/Twin-Screw Simulation Papers

### 1. SPH-DEM Coupling for Solid-Liquid Mixing in Meshing Twin-Screw Extruder
- **Authors:** Yang Wenming, Xie Linsheng, Wang Yu, Ma Yulu, Li Guo
- **Published:** 2025-07-25, *Chemical Industry and Engineering Progress*, Vol. 44(7)
- **DOI:** [10.16085/j.issn.1000-6613.2024-0930](https://doi.org/10.16085/j.issn.1000-6613.2024-0930)
- **Key Findings:**
  - SPH-DEM coupling applied to solid-liquid two-phase flow in meshing TSE
  - Flow mode: mixture moves axially while rotating circumferentially; exit at ~12s
  - Kneading block section forces significantly higher than screw section
  - Max forces on particles occur at first kneading disk
  - Lacey mixing index up to 0.9 in kneading block section
  - **Directly relevant** to our goal (fiber + water suspension in TSE)

### 2. Simulation of Multiphase Flow and Mixing in a Conveying Element of a Co-Rotating TSE by Using SPH
- **Authors:** Tianwen Dong, Jianchun Wu, Yufei Ruan, Jiawen Huang, Shiyu Jiang
- **Published:** 2023-10-28, *International Journal of Chemical Engineering*
- **DOI:** [10.1155/2023/8383763](https://doi.org/10.1155/2023/8383763)
- **Key Findings:**
  - SPH validated against twin-cam mixer experiment (good agreement)
  - Two-phase Poiseuille flow used to validate accuracy
  - Viscosity ratio significantly affects flow and mixing
  - Full-filled case: pressure squeezes particles into gap → better mixing
  - Partial-filled case: particles bypass gap (no background pressure)
  - Lays foundation for polymer blending via SPH simulation

### 3. Simulation of Non-Newtonian Flows in a Partially Filled TSE Using SPH
- **Authors:** (Dong et al.)
- **Published:** 2022-03, *Polymer Engineering & Science*, Vol. 62(3), pp. 802-817
- **Link:** [UI.adsabs.harvard.edu](https://ui.adsabs.harvard.edu/abs/2022PESci..62..802D/abstract)
- **Key Findings:**
  - First SPH application to non-Newtonian flows in partially filled TSE
  - Effects of clearance on flow investigated
  - Critical for our pulp simulation (cellulose fiber suspension is non-Newtonian)

### 4. Simulation of Flow and Mixing for Highly Viscous Fluid in a TSE with a Conveying Element Using Parallelized SPH (GPU)
- **Authors:** (Dong et al.)
- **Published:** 2020-02-02, *Chemical Engineering Science*, Vol. 212
- **Link:** [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0009250919308012)
- **Key Findings:**
  - **GPU-parallelized SPH** for highly viscous fluid in TSE
  - Validated against FEM and FVM (consistent results)
  - Full-filled and half-filled cases studied
  - GPU acceleration greatly improves computational efficiency with low hardware cost
  - Direct precursor to our approach (RTX 3060 GPU available)

### 5. Flow and Mixing in Asymmetric TSE with Internal Baffle Using MPS Method
- **Authors:** Huiwen Yu, Peizhou Dong, Baiping Xu, et al.
- **Published:** 2025-12-01, *Chemical Engineering Science*, Vol. 318, 122198
- **DOI:** [10.1016/j.ces.2025.122198](https://doi.org/10.1016/j.ces.2025.122198)
- **Key Findings:**
  - MPS (Moving Particle Semi-Implicit) method, similar to SPH
  - Novel asymmetric TSE with baffle for chaotic mixing
  - Validated with PIV (Particle Image Velocimetry) experiments
  - FTLE (Finite-Time Lyapunov Exponent) significantly higher in baffled design
  - KAM island regions identified in core of twin-screw channels
  - Demonstrates experimental validation of meshfree particle methods

## Related: Cotton Fiber & Pulp Processing

### 6. Nanofibrillation of Pulp Fibers by Twin-Screw Extrusion
- **Authors:** (Roland et al.)
- **Published:** 2014, *Cellulose*
- **DOI:** [10.1007/s10570-014-0518-6](https://colab.ws/articles/10.1007%2Fs10570-014-0518-6)
- **Key Findings:**
  - TSE used for fibrillation of pulp fibers → nanofibrillated cellulose
  - Degree of fibrillation and degradation analyzed
  - Demonstrates that TSE can process cellulose fiber suspensions
  - **Direct relevance:** proves TSE works for cotton fiber refining

### 7. Simulation and Experimental Validation on the Effect of Twin-Screw Pulping
- **Published:** 2022-11
- **Link:** [TheFreeLibrary](https://www.thefreelibrary.com/Simulation+and+Experimental+Validation+on+the+Effect+of+Twin-Screw...-a0744993140)
- **Key Findings:**
  - TSE pulping has advantage of low cost and high fiber content vs other mechanical methods
  - Experimental validation of twin-screw pulping process

### 8. Enhancing Fibre-to-Fibre Recycling of Mechanically Recycled Cotton
- **Authors:** Çağdaş Aslan, Selin Hanife Eryürük, Michael Will
- **Published:** 2026-05-05, *Waste Management*, Vol. 217, 115502
- **DOI:** [10.1016/j.wasman.2026.115502](https://doi.org/10.1016/j.wasman.2026.115502)
- **Key Findings:**
  - Up to 50% recycled cotton achievable in ring-spun yarns via combed compact spinning
  - 50% rCO combed yarns show ~50% lower neps and thick places
  - Relevant for understanding fiber quality in recycling loops

### 9. Literature Review on Single and Twin-Screw Extruders Design for Polymerization Using CFD Simulation
- **Published:** 2025-01-07, *Fluids*, Vol. 10(1), 9
- **Link:** [MDPI](https://www.mdpi.com/2311-5521/10/1/9)
- **Key Findings:**
  - Comprehensive review of CFD modeling evolution for extruders
  - From analytical models → CFD simulations → DEM/CFD coupling
  - Identifies key challenges: mesh generation for complex TSE geometry, multiphase flow, non-Newtonian rheology
  - Confirms SPH/meshfree methods are the way forward for TSE simulation

### 10. Co-Rotating Twin-Screw Extruders: Detailed Analysis of Mixing (SPH-based)
- **Published:** *Chemical Engineering Science*
- **Link:** [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0009250915003759)
- **Key Findings:**
  - Mixing analysis using SPH tracer particles in TSE conveying element
  - Intensity of segregation evaluated using two different grids
  - Kinetic laws fitted for overall and axial mixing
  - Uses LIGGGHTS (open-source particle simulator) — same family as our tools

## GPU Acceleration Status

SPlisHSPlasH uses **cuNSearch** for GPU-accelerated neighborhood search (not full GPU fluid simulation).

| Aspect | CPU (CompactNSearch) | GPU (cuNSearch) |
|--------|---------------------|-----------------|
| Neighborhood search | CPU multi-threaded | GPU (CUDA) |
| Fluid solver | CPU | CPU |
| Setup | Default | Requires `-DUSE_GPU_NEIGHBORHOOD_SEARCH=On` |
| Status | ✅ Working | ⚠️ API incompatible (cuNSearch != CompactNSearch), needs patches |
| Speed | ~3.4ms for 4.7k particles | Potentially faster for >100k particles |

**Veredicto:** Para nuestro extrusor artesanal con <50k partículas, CPU es suficiente. La aceleración GPU requiere parchar varias incompatibilidades de API en el código fuente. Si escalamos a simulación de planta piloto (>100k partículas), vale la pena invertir en arreglar cuNSearch.

## Screw Design & Element Catalogs

### 11. Twin Screw Elements: Types, Functions, Materials, Screw Design
- **Source:** extruder-parts.com (Dustrial/Bloom)
- **Published:** 2026
- **Key Findings:**
  - Comprehensive guide to element types: conveying, kneading, mixing, special
  - Kneading stagger angles: 30° (moderate), 45° (high), 60° (very high), 90° (maximum)
  - Distributive vs dispersive mixing clearly distinguished
  - Material options: 38CrMoAlA, Tool Steel (D2/M2), HIP PM, Hastelloy, Tungsten Carbide
  - **Relevance:** ★★★★ — Complete reference for element selection

### 12. Professional Guide to Extruder Screw Elements — SKR Machinery
- **Source:** skrscrew.com (Nanjing Sikerun Machinery)
- **Published:** 2025
- **Key Findings:**
  - Forward conveying elements: adjust pitch/channel depth for throughput
  - Reverse conveying elements: create backflow, increase residence time
  - Kneading blocks: 2-lobe and 3-lobe options, adjustable angle/width/number
  - Toothed disc elements: distributive mixing, reduce overheating
  - Material comparison: 38CrMoAlA vs W6Mo5Cr4V2 (HRC 63-65)
  - **Relevance:** ★★★ — Practical manufacturing reference

### 13. Fundamentals of Twin-Screw Compounding: Kneading Block Performance
- **Source:** SPE (Society of Plastics Engineers)
- **Key Findings:**
  - 3-lobe kneading 45° forward is NOT efficient for conveying — acts as restrictive element
  - Wider disc KB series exhibits greater dP/dL than narrow disc
  - Radial throttle mechanism: 1mm → 1.5mm → 2mm gap reduces restrictive pressure
  - Standard restrictive elements: LHKB and LH screw bushing generate ~100 psi back pressure
  - **Relevance:** ★★★★ — Critical data for kneading block selection

### 14. Characteristic parameters and process maps for fully-filled TSE elements
- **Authors:** Hannes Bauer, Josip Matić, Johannes Khinast
- **Published:** Chemical Engineering Science, Vol 230, 2021
- **Key Findings:**
  - SPH simulations of numerous elements (conveying, kneading, mixing)
  - Comprehensive parameter catalogue: pressure build-up, power consumption, mixing
  - Novel process maps for element selection and scale-up
  - Covers ZSE12, ZSE18, ZSE27 pharma extrusion series
  - **Relevance:** ★★★★ — Quantitative data for element comparison

## Summary Table

| # | Year | Method | Focus | Relevance |
|---|------|--------|-------|-----------|
| 1 | 2025 | SPH-DEM | Solid-liquid mixing in meshing TSE | ★★★★★ — fiber + water |
| 2 | 2023 | SPH | Multiphase flow in TSE conveying element | ★★★★★ — directly applicable |
| 3 | 2022 | SPH | Non-Newtonian flow in partially-filled TSE | ★★★★ — rheology model |
| 4 | 2020 | SPH+GPU | Highly viscous flow in TSE | ★★★★ — GPU acceleration |
| 5 | 2025 | MPS | Asymmetric TSE with baffle | ★★★ — alternative method |
| 6 | 2014 | Experimental | TSE nanofibrillation of pulp fibers | ★★★★★ — proof of concept |
| 7 | 2022 | Exp+Sim | Twin-screw pulping | ★★★★ — low-cost pulping |
| 8 | 2026 | Experimental | Recycled cotton fiber quality | ★★ — fiber quality data |
| 9 | 2025 | Review | CFD for extruder polymerization | ★★★ — methodology review |
| 10 | 2015 | SPH | Mixing analysis in TSE | ★★★ — mixing quantification |
| 11 | 2026 | Guide | Element types, functions, materials | ★★★★ — complete reference |
| 12 | 2025 | Guide | SKR element manufacturing | ★★★ — manufacturing reference |
| 13 | — | SPE | Kneading block fundamentals | ★★★★ — critical kneading data |
| 14 | 2021 | SPH | Element parameter catalogue | ★★★★ — quantitative data |
