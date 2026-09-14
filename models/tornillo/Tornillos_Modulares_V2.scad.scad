/* ==========================================================
   TORNILLO EXTRUSOR - V2 CO-ROTANTE (MODULAR MULTI-PIEZA)
   Material: PETG-CF | OD: 25.3mm | Eje: Cuadrado 1/4" (6.35mm)
   ----------------------------------------------------------
   - Permite exportar las 16 fases individuales (Z1a hasta Z4b).
   - Las piezas individuales aparecen en Z=0 listas para el Slicer.
   ========================================================== */

// SELECCIONA QUÉ IMPRIMIR AQUÍ ABAJO:
part = "seg1"; // [Z1a, Z1b, Z1c, Z2a, Z2b, Z2c, Z3a, Z3b, Z3c, Z3d, Z3e, Z3f, Z3g, Z3h, Z4a, Z4b, seg1, seg2, seg3, seg4, assembly, pair]

/* --- PARÁMETROS GEOMÉTRICOS --- */
od_nominal = 25.3;
root_radius = 7.85;
square_shaft_side = 6.35;   // 1/4 de pulgada exacta
square_clearance = 0.3;     // Holgura de inserción
screw_clearance = 0.4;      
center_distance = 25.3;     

/* --- CÁLCULOS DEL PERFIL --- */
r_peak = (od_nominal - screw_clearance) / 2;  
r_root = root_radius - (screw_clearance / 2); 
lobe_off = r_peak - r_root;                   

/* ==========================================================
   MÓDULOS BASE
   ========================================================== */
module profile_stadium() {
    hull() {
        translate([-lobe_off, 0]) circle(r=r_root, $fn=64);
        translate([lobe_off, 0]) circle(r=r_root, $fn=64);
    }
}

module square_cut(h) {
    s = square_shaft_side + square_clearance; 
    translate([0,0,-1])
    linear_extrude(h + 2)
    square([s, s], center=true);
}

/* ==========================================================
   GENERADORES DE FASE
   ========================================================== */
module phase_convey(length, pitch, start_angle, hand="R") {
    sign = (hand == "R") ? -1 : 1;
    twist_angle = sign * (length / pitch) * 360;
    
    rotate([0, 0, start_angle])
    linear_extrude(height=length, twist=twist_angle, slices=max(length*2, 10), convexity=10)
    profile_stadium();
}

module phase_knead(length, elements, stagger_angle, start_angle, hand="R") {
    h_elem = length / elements;
    sign = (hand == "F") ? -1 : 1;
    
    for (i = [0 : elements - 1]) {
        translate([0, 0, (i * h_elem) - 0.01])
        rotate([0, 0, start_angle + (i * sign * stagger_angle)])
        linear_extrude(height=h_elem + 0.02, convexity=10)
        profile_stadium();
    }
}

/* ==========================================================
   DEFINICIÓN DE LAS 16 FASES (TODAS EMPIEZAN EN Z=0)
   ========================================================== */
module p_Z1a() { phase_convey(50.60, 50.60, 0, "R"); }
module p_Z1b() { phase_convey(50.60, 50.60, 0, "R"); }
module p_Z1c() { phase_convey(37.95, 37.95, 0, "R"); }

module p_Z2a() { phase_convey(37.95, 37.95, 0, "R"); }
module p_Z2b() { phase_knead(37.95, 5, 45, 0, "F"); }  
module p_Z2c() { phase_convey(18.98, 18.98, 180, "R"); }

module p_Z3a() { phase_knead(37.95, 5, 45, 180, "R"); } 
module p_Z3b() { phase_convey(18.98, 18.98, 0, "L"); }   
module p_Z3c() { phase_knead(37.95, 5, 45, 0, "R"); }   
module p_Z3d() { phase_convey(18.98, 18.98, 180, "L"); } 
module p_Z3e() { phase_knead(37.95, 4, 90, 180, "N"); } 
module p_Z3f() { phase_convey(18.98, 18.98, 90, "L"); }  
module p_Z3g() { phase_knead(37.95, 5, 45, 90, "R"); }  
module p_Z3h() { phase_convey(18.98, 18.98, 270, "R"); } 

module p_Z4a() { phase_convey(37.95, 37.95, 270, "R"); }
module p_Z4b() { phase_convey(37.95, 37.95, 270, "R"); }

/* ==========================================================
   MÓDULOS DE LOS 4 BLOQUES GRANDES
   ========================================================== */
ov = 0.02; 
module print_seg1() { p_Z1a(); z1=50.60; translate([0,0,z1-ov]) p_Z1b(); z2=z1+50.60; translate([0,0,z2-ov]) p_Z1c(); }
module print_seg2() { p_Z2a(); z1=37.95; translate([0,0,z1-ov]) p_Z2b(); z2=z1+37.95; translate([0,0,z2-ov]) p_Z2c(); z3=z2+18.98; translate([0,0,z3-ov]) p_Z3a(); z4=z3+37.95; translate([0,0,z4-ov]) p_Z3b(); }
module print_seg3() { p_Z3c(); z1=37.95; translate([0,0,z1-ov]) p_Z3d(); z2=z1+18.98; translate([0,0,z2-ov]) p_Z3e(); z3=z2+37.95; translate([0,0,z3-ov]) p_Z3f(); z4=z3+18.98; translate([0,0,z4-ov]) p_Z3g(); }
module print_seg4() { p_Z3h(); z1=18.98; translate([0,0,z1-ov]) p_Z4a(); z2=z1+37.95; translate([0,0,z2-ov]) p_Z4b(); }

module full_screw_assembly() {
    color("DodgerBlue")  print_seg1();
    color("LimeGreen")   translate([0,0,139.15]) print_seg2();
    color("Crimson")     translate([0,0,290.96]) print_seg3();
    color("Gray")        translate([0,0,442.77]) print_seg4();
}

/* ==========================================================
   CONSTRUCTOR DE EXPORTACIÓN Y CORTE FINAL
   ========================================================== */
module make_part() {
    difference() {
        // Selector de 16 Piezas Individuales
        if      (part == "Z1a") p_Z1a(); else if (part == "Z1b") p_Z1b(); else if (part == "Z1c") p_Z1c();
        else if (part == "Z2a") p_Z2a(); else if (part == "Z2b") p_Z2b(); else if (part == "Z2c") p_Z2c();
        else if (part == "Z3a") p_Z3a(); else if (part == "Z3b") p_Z3b(); else if (part == "Z3c") p_Z3c();
        else if (part == "Z3d") p_Z3d(); else if (part == "Z3e") p_Z3e(); else if (part == "Z3f") p_Z3f();
        else if (part == "Z3g") p_Z3g(); else if (part == "Z3h") p_Z3h();
        else if (part == "Z4a") p_Z4a(); else if (part == "Z4b") p_Z4b();
        
        // Selector de 4 Bloques Gigantes
        else if (part == "seg1") print_seg1(); else if (part == "seg2") print_seg2();
        else if (part == "seg3") print_seg3(); else if (part == "seg4") print_seg4();
        
        // Visualización Total
        else if (part == "assembly") { full_screw_assembly(); }
        else if (part == "pair") {
            translate([-center_distance/2, 0, 0]) difference() { full_screw_assembly(); square_cut(600); }
            translate([center_distance/2, 0, 0]) rotate([0, 0, 90]) difference() { full_screw_assembly(); square_cut(600); }
        }
        
        // El corte del agujero cuadrado se aplica a TODO excepto a "pair"
        if (part != "pair") {
            square_cut(600); 
        }
    }
}

if (part == "pair") { color("SteelBlue") make_part(); } else { make_part(); }