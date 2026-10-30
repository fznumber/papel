/* ==========================================================
   TORNILLO EXTRUSOR - V2 CO-ROTANTE (NOMENCLATURA LIMPIA)
   Material: PETG-CF | OD: 25.3mm | Eje: Cuadrado 1/4" (6.35mm)
   ----------------------------------------------------------
   - Nomenclatura ajustada a los bloques FÍSICOS de impresión.
   - S1 = Segmento 1, S2 = Segmento 2, etc.
   ========================================================== */

part = "assembly"; // [S1a, S1b, S1c, S2a, S2b, S2c, S2d, S2e, S3a, S3b, S3c, S3d, S3e, S4a, S4b, S4c, seg1, seg2, seg3, seg4, assembly, pair]

/* --- PARÁMETROS GEOMÉTRICOS PRINCIPALES --- */
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
   DEFINICIÓN DE LAS 16 FASES FÍSICAS (S = Segmento)
   ========================================================== */

// --- SEGMENTO 1 (Zona de Alimentación) ---
module p_S1a() { phase_convey(50.60, 50.60, 0, "R"); }
module p_S1b() { phase_convey(50.60, 50.60, 0, "R"); }
module p_S1c() { phase_convey(37.95, 37.95, 0, "R"); }

// --- SEGMENTO 2 (Impregnación + Inicio Fibrilación) ---
module p_S2a() { phase_convey(37.95, 37.95, 0, "R"); }
module p_S2b() { phase_knead(37.95, 5, 45, 0, "F"); }  // Knead Forward
module p_S2c() { phase_convey(18.98, 18.98, 180, "R"); }
module p_S2d() { phase_knead(37.95, 5, 45, 180, "R"); }// Knead Reverse
module p_S2e() { phase_convey(18.98, 18.98, 0, "L"); } // Reversa corta

// --- SEGMENTO 3 (Fibrilación Crítica Máxima) ---
module p_S3a() { phase_knead(37.95, 5, 45, 0, "R"); }   // Knead Reverse
module p_S3b() { phase_convey(18.98, 18.98, 180, "L"); } // Reversa corta
module p_S3c() { phase_knead(37.95, 4, 90, 180, "N"); } // Knead NEUTRAL 90°
module p_S3d() { phase_convey(18.98, 18.98, 90, "L"); }  // Reversa corta
module p_S3e() { phase_knead(37.95, 5, 45, 90, "R"); }  // Knead Reverse

// --- SEGMENTO 4 (Descarga) ---
module p_S4a() { phase_convey(18.98, 18.98, 270, "R"); } // Salida a transporte
module p_S4b() { phase_convey(37.95, 37.95, 270, "R"); }
module p_S4c() { phase_convey(37.95, 37.95, 270, "R"); }

/* ==========================================================
   MÓDULOS DE LOS 4 BLOQUES GRANDES
   ========================================================== */
ov = 0.02; 
module print_seg1() { p_S1a(); z1=50.60; translate([0,0,z1-ov]) p_S1b(); z2=z1+50.60; translate([0,0,z2-ov]) p_S1c(); }
module print_seg2() { p_S2a(); z1=37.95; translate([0,0,z1-ov]) p_S2b(); z2=z1+37.95; translate([0,0,z2-ov]) p_S2c(); z3=z2+18.98; translate([0,0,z3-ov]) p_S2d(); z4=z3+37.95; translate([0,0,z4-ov]) p_S2e(); }
module print_seg3() { p_S3a(); z1=37.95; translate([0,0,z1-ov]) p_S3b(); z2=z1+18.98; translate([0,0,z2-ov]) p_S3c(); z3=z2+37.95; translate([0,0,z3-ov]) p_S3d(); z4=z3+18.98; translate([0,0,z4-ov]) p_S3e(); }
module print_seg4() { p_S4a(); z1=18.98; translate([0,0,z1-ov]) p_S4b(); z2=z1+37.95; translate([0,0,z2-ov]) p_S4c(); }

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
        if      (part == "S1a") p_S1a(); else if (part == "S1b") p_S1b(); else if (part == "S1c") p_S1c();
        else if (part == "S2a") p_S2a(); else if (part == "S2b") p_S2b(); else if (part == "S2c") p_S2c(); else if (part == "S2d") p_S2d(); else if (part == "S2e") p_S2e();
        else if (part == "S3a") p_S3a(); else if (part == "S3b") p_S3b(); else if (part == "S3c") p_S3c(); else if (part == "S3d") p_S3d(); else if (part == "S3e") p_S3e();
        else if (part == "S4a") p_S4a(); else if (part == "S4b") p_S4b(); else if (part == "S4c") p_S4c();
        
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