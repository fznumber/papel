/* ==========================================================
   CAJA DE TRANSMISIÓN "TWINLOCK-253" (V16.2 FIX)
   ----------------------------------------------------------
   - FIX: Eje cuadrado pasante perfora limpiamente los 
     adaptadores inferiores.
   - FIX V16.2: Distancia base_plate-mid_plate reducida de 88mm 
     a un valor calculado por fórmula, dejando solo la holgura
     real necesaria (stage_z_clearance) entre los dientes de
     out_gear_L (Piso 1) y out_gear_R (Piso 2), que es el único
     par de engranajes que se solapa en planta (XY) y por tanto
     el único que restringe la separación vertical entre pisos.
   - Arquitectura Co-Rotante. Engranajes 100% integrados.
   ========================================================== */

part = "assembly"; // [assembly, base_plate, mid_plate, motor_plate, spacer_base_front, pillar_lower, pillar_upper, comp_corona, comp_pinion_L, comp_pinion_R, out_gear_L, out_gear_R, motor_pinion, bearing_adapter, compound_shaft, motor_cradle]

/* --- PARÁMETROS GENERALES --- */
motor_shaft_d = 8.2;      // NEMA23 eje 8 mm (0,2 mm de holgura)
motor_body_d = 57;        
motor_bolt_bc = 47.14;    
motor_bolt_d = 5.5;  
motor_pilot_d = 38.5;     
square_shaft_side = 6.35; 
square_clearance = 0.3;   
backlash_offset = 0.25;   

/* --- HOLGURA ENTRE PISOS (NUEVO) --- */
stage_z_clearance = 2;    // Holgura real entre dientes de out_gear_L (Piso1) y out_gear_R (Piso2)
neck_R = 17;               // Cuello superior de Piso 2 (antes hardcodeado como "17" en varios sitios)

/* --- PILARES CUADRADOS (NUEVO) --- */
// Lado del pilar cuadrado. 12mm deja una media-diagonal de ~8.49mm, que entra
// sin sobresalir dentro del boss circular más ajustado de las placas (radio 9mm
// en base_plate). Súbelo un poco si quieres más rigidez, pero revisa que
// (pillar_side * 0.7072) siga siendo menor al radio del boss (9mm en base_plate,
// 10mm en mid_plate/motor_plate).
pillar_side = 12;

/* --- PARÁMETROS DE RODAMIENTOS (6703) --- */
bearing_od = 23.05;       
bearing_id = 17;        
bearing_w = 4.0;          

/* --- PARÁMETROS DE ENGRANAJES --- */
gear_module = 1.5;        
pressure_angle = 25;      

teeth_mot = 18;           
teeth_cor = 54;           
teeth_cmp = 16;           
teeth_out = 24;           

trans_width = 20;         

/* --- TRIGONOMETRÍA Y COORDENADAS --- */
pos_Out_L = [-12.65, 0];
pos_Out_R = [12.65, 0];

dist_stage2 = ((teeth_cmp + teeth_out) * gear_module / 2) + backlash_offset; 
x_comp = 12.65 + dist_stage2; 
pos_Cmp_L = [-x_comp, 0];
pos_Cmp_R = [x_comp, 0];

dist_stage1 = ((teeth_mot + teeth_cor) * gear_module / 2) + backlash_offset; 
y_mot = sqrt( pow(dist_stage1, 2) - pow(x_comp, 2) ); 
pos_Mot = [0, y_mot];

/* --- NIVELES Z --- */
Z_base = 0;             
Z_lvl1 = 16;            
Z_lvl2 = Z_lvl1 + trans_width + stage_z_clearance;   // 16 + 20 + 2 = 38 (antes 51, fijo)
Z_mid_pl = Z_lvl2 + trans_width + neck_R;              // 38 + 20 + 17 = 75 (antes 88, fijo)

// Etapa 3 (mid_plate <-> motor_plate) SIN TOCAR: mismos offsets que en el diseño
// original (Z_lvl3 - Z_mid_pl = 16, Z_motor_pl - Z_mid_pl = 49), pero ahora relativos
// a Z_mid_pl para que la reducción de abajo no le "robe" ni le "agregue" espacio.
offset_lvl3     = 16;   // = 104 - 88 (original)
offset_motor_pl = 49;   // = 137 - 88 (original)

Z_lvl3 = Z_mid_pl + offset_lvl3;         // 75 + 16 = 91  (antes 104)
Z_motor_pl = Z_mid_pl + offset_motor_pl; // 75 + 49 = 124 (antes 137)
Z_cradle = Z_motor_pl;   

/* ==========================================================
   MÓDULOS DE GEOMETRÍA
   ========================================================== */
module involute_gear_2d(teeth, m, pa=25) {
    r_pitch = teeth * m / 2;
    r_base = r_pitch * cos(pa);
    r_add = r_pitch + m;
    r_ded = r_pitch - 1.25 * m;
    
    function inv(a) = (tan(a) - (a * PI / 180)) * 180 / PI;
    inv_pitch = inv(pa);
    thick_angle = 180 / teeth; 
    offset_angle = (thick_angle / 2) + inv_pitch;
    max_phi_deg = acos(r_base/r_add);

    union() {
        circle(r=r_ded, $fn=teeth*2);
        for (i = [0:teeth-1]) {
            rotate([0, 0, i * 360/teeth])
            polygon(concat(
                [[0,0]], 
                [for (phi = [0:2:max_phi_deg]) 
                    let (r = r_base / cos(phi))
                    [r * cos(offset_angle - inv(phi)), -r * sin(offset_angle - inv(phi))]
                ],
                [for (phi = [max_phi_deg:-2:0]) 
                    let (r = r_base / cos(phi))
                    [r * cos(offset_angle - inv(phi)), r * sin(offset_angle - inv(phi))]
                ]
            ));
        }
    }
}

// ¡CORREGIDO! El corte ahora empieza desde Z = -30 para atravesar cuellos inferiores
module square_cut(h) {
    s = square_shaft_side + square_clearance; 
    translate([0,0,-30]) linear_extrude(h + 60) square([s, s], center=true);
}

module bottom_adapter_pos(neck) {
    translate([0, 0, -neck]) cylinder(d=20, h=neck + 0.01, $fn=32);
    translate([0, 0, -(neck + bearing_w)]) cylinder(d=bearing_id, h=bearing_w + 0.01, $fn=64);
}
module bottom_adapter_hole(neck) {
    translate([0, 0, -neck/2]) rotate([0, 90, 0]) cylinder(d=2.5, h=40, center=true, $fn=16);
}

module top_adapter_pos(neck) {
    translate([0, 0, trans_width - 0.01]) cylinder(d=20, h=neck + 0.01, $fn=32);
    translate([0, 0, trans_width + neck]) cylinder(d=bearing_id, h=bearing_w + 0.01, $fn=64);
}
module top_adapter_hole(neck) {
    translate([0, 0, trans_width + (neck/2)]) rotate([0, 90, 0]) cylinder(d=2.5, h=40, center=true, $fn=16);
}

/* ==========================================================
   ENGRANAJES 100% INTEGRADOS Y CALIBRADOS
   ========================================================== */

// PISO 1 (Lado Izquierdo) - Cortados con square_cut
module p_out_gear_L() { 
    difference() { union() { linear_extrude(trans_width, convexity=5) involute_gear_2d(teeth_out, gear_module, pressure_angle); bottom_adapter_pos(6); } square_cut(100); bottom_adapter_hole(6); }
}
module p_comp_pinion_L() { 
    difference() { union() { linear_extrude(trans_width, convexity=5) involute_gear_2d(teeth_cmp, gear_module, pressure_angle); bottom_adapter_pos(6); } square_cut(100); bottom_adapter_hole(6); }
}

// PISO 2 (Lado Derecho)
module p_out_gear_R() { 
    difference() { union() { linear_extrude(trans_width, convexity=5) involute_gear_2d(teeth_out, gear_module, pressure_angle); top_adapter_pos(neck_R); } square_cut(100); top_adapter_hole(neck_R); }
}
module p_comp_pinion_R() { 
    difference() { union() { linear_extrude(trans_width, convexity=5) involute_gear_2d(teeth_cmp, gear_module, pressure_angle); top_adapter_pos(neck_R); } square_cut(100); top_adapter_hole(neck_R); }
}

// PISO 3 (Coronas)
module p_comp_corona() { 
    difference() { union() { linear_extrude(trans_width, convexity=5) involute_gear_2d(teeth_cor, gear_module, pressure_angle); top_adapter_pos(13); } square_cut(100); top_adapter_hole(13); }
}

// PIÑÓN DEL MOTOR (Corregido: Llega perfectamente a la placa intermedia)
module p_motor_pinion() {
    difference() { 
        union() {
            // 1. Los Dientes del engranaje principal
            linear_extrude(trans_width, convexity=5) involute_gear_2d(teeth_mot, gear_module, pressure_angle); 
            
            // 2. Cuello ARRIBA (Abraza el eje del motor)
            translate([0,0,trans_width - 0.01]) cylinder(d=24, h=15 + 0.02, $fn=32);
            
            // 3. Cuello ABAJO (Espaciador + Enchufe para rodamiento 6703 en Mid Plate)
            translate([0, 0, -6]) cylinder(d=20, h=6.01, $fn=32); // Espaciador de 6mm
            translate([0, 0, -10]) cylinder(d=bearing_id - 0.1, h=4.01, $fn=64); // Enchufe de 4mm
        }
        
        // Agujero pasante para el eje del Motor (8.2mm)
        translate([0,0,-12]) cylinder(d=motor_shaft_d, h=60, $fn=32); 
        
        // Agujeros para Prisioneros M3 a 90 grados (Para agarrar el motor con fuerza)
        translate([0, 0, trans_width + 7.5]) rotate([0, 90, 0]) cylinder(d=2.5, h=40, center=true, $fn=16); 
        translate([0, 0, trans_width + 7.5]) rotate([90, 0, 0]) cylinder(d=2.5, h=40, center=true, $fn=16);
    }
}

// EJE CUADRADO DE LOS COMPUESTOS
// Conecta el piñón Z16 (piso 1/2) con la corona Z54 (piso 3) en cada
// posición x = ±42,90. Va de z=6 (rodamiento base) a z=124 (placa motor),
// 118 mm. Sin este eje la corona no transmite par al piñón compuesto.
module p_compound_shaft() {
    s = square_shaft_side;
    translate([-s/2, -s/2, 6])
        cube([s, s, Z_motor_pl - 6], center=false);
}

// LOS 4 ACOPLES SUELTOS
module p_bearing_adapter() { 
    difference() { 
        union() { 
            cylinder(d=19, h=6, $fn=32); 
            for (angle = [0:60:300]) { rotate([0, 0, angle]) translate([19/2, 0, 3]) cube([3, 2, 6], center=true); }
            translate([0,0,6 - 0.01]) cylinder(d=bearing_id, h=bearing_w + 0.02, $fn=64); 
        } 
        square_cut(20); 
        translate([0, 0, 3]) rotate([0, 90, 0]) cylinder(d=2.5, h=40, center=true, $fn=16);
    } 
}

/* ==========================================================
   CHASIS Y PLACAS 
   ========================================================== */
barrel_m6_holes = [ [-45, 25], [0, 25], [45, 25], [-45, -25], [0, -25], [45, -25] ];
pillar_coords = [ [-85, -45], [85, -45], [-85, 45], [85, 45], [-45, 75], [45, 75] ];

module p_base_plate() {
    difference() {
        hull() {
            translate(pos_Out_L) cylinder(d=30, h=10, $fn=64); translate(pos_Out_R) cylinder(d=30, h=10, $fn=64); 
            translate(pos_Cmp_L) cylinder(d=30, h=10, $fn=64); translate(pos_Cmp_R) cylinder(d=30, h=10, $fn=64);
            for(pt = pillar_coords) translate([pt[0], pt[1], 0]) cylinder(d=18, h=10, $fn=32);
            for(pt = barrel_m6_holes) translate([pt[0], pt[1], 0]) cylinder(d=16, h=10, $fn=16);
        }
        translate(pos_Out_L) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_Out_R) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_Cmp_L) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_Cmp_R) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        
        translate(pos_Out_L) translate([0,0,-1]) cylinder(d=15, h=12, $fn=32); translate(pos_Out_R) translate([0,0,-1]) cylinder(d=15, h=12, $fn=32);
        translate(pos_Cmp_L) translate([0,0,-1]) cylinder(d=15, h=12, $fn=32); translate(pos_Cmp_R) translate([0,0,-1]) cylinder(d=15, h=12, $fn=32);
        
        for(pt = barrel_m6_holes) translate([pt[0], pt[1], -1]) cylinder(d=6.5, h=15, $fn=16); 
        for(pt = pillar_coords) translate([pt[0], pt[1], -1]) cylinder(d=6.5, h=15, $fn=16); 
    }
}

module p_mid_plate() {
    difference() {
        hull() {
            translate(pos_Out_L) cylinder(d=30, h=10, $fn=64); translate(pos_Out_R) cylinder(d=30, h=10, $fn=64); 
            translate(pos_Cmp_L) cylinder(d=30, h=10, $fn=64); translate(pos_Cmp_R) cylinder(d=30, h=10, $fn=64);
            translate(pos_Mot) cylinder(d=35, h=10, $fn=32); 
            for(pt = pillar_coords) translate([pt[0], pt[1], 0]) cylinder(d=20, h=10, $fn=32);
        }
        translate(pos_Out_L) translate([0,0,-1]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_Out_R) translate([0,0,-1]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_Cmp_L) translate([0,0,-1]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_Cmp_R) translate([0,0,-1]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        
        translate(pos_Mot) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        
        translate(pos_Out_L) translate([0,0,bearing_w-1]) cylinder(d=15, h=12, $fn=32); translate(pos_Out_R) translate([0,0,bearing_w-1]) cylinder(d=15, h=12, $fn=32);
        translate(pos_Cmp_L) translate([0,0,bearing_w-1]) cylinder(d=15, h=12, $fn=32); translate(pos_Cmp_R) translate([0,0,bearing_w-1]) cylinder(d=15, h=12, $fn=32);
        translate(pos_Mot) translate([0,0,-1]) cylinder(d=15, h=12, $fn=32);
        
        for(pt = pillar_coords) translate([pt[0], pt[1], -1]) cylinder(d=6.5, h=12, $fn=16); 
    }
}

module p_motor_plate() {
    difference() {
        hull() {
            translate(pos_Cmp_L) cylinder(d=30, h=10, $fn=64); translate(pos_Cmp_R) cylinder(d=30, h=10, $fn=64);
            translate(pos_Mot) cylinder(d=motor_body_d, h=10, $fn=32);
            for(pt = pillar_coords) translate([pt[0], pt[1], 0]) cylinder(d=20, h=10, $fn=32);
        }
        translate(pos_Cmp_L) translate([0,0,-1]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_Cmp_R) translate([0,0,-1]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_Cmp_L) translate([0,0,bearing_w-1]) cylinder(d=15, h=12, $fn=32); translate(pos_Cmp_R) translate([0,0,bearing_w-1]) cylinder(d=15, h=12, $fn=32);
        
        translate(pos_Mot) translate([0,0,-1]) cylinder(d=motor_pilot_d, h=12, $fn=64);
        translate(pos_Mot) { for(x=[-1,1]) for(y=[-1,1]) translate([x * motor_bolt_bc/2, y * motor_bolt_bc/2, -1]) cylinder(d=motor_bolt_d, h=12, $fn=16); }
        for(pt = pillar_coords) translate([pt[0], pt[1], -1]) cylinder(d=6.5, h=12, $fn=16); 
    }
}

module p_spacer_base_front() {
    difference() {
        translate([-70, -52, 0]) cube([140, 27, Z_lvl2 - 10]); 
        translate([-60, -43, -1]) cylinder(d=6.5, h=100, $fn=16); translate([60, -43, -1]) cylinder(d=6.5, h=100, $fn=16);
        for (x = [-45, 0, 45]) { 
            translate([x, -24, 15]) rotate([90,0,0]) cylinder(d=6.5, h=40, center=true, $fn=16); 
            translate([x, -24, 15]) rotate([90,0,0]) cylinder(d=15, h=18, $fn=32); 
        }
        // Alojamiento de las cabezas M6 que entran desde el interior de la
        // caja. La fila delantera está en y=-25, en el borde del bloque; se
        // rebaja una media luna Ø13 en la cara inferior (z=0..9) para que la
        // arandela y la cabeza no apoyen en el separador.
        for (x = [-45, 0, 45])
            translate([x, -25, -1]) cylinder(d=13, h=10.01, $fn=32);
    }
}

// Pilares cuadrados (antes cilíndricos) para impresión más fácil: caras planas,
// sin necesidad de $fn alto, mejor apoyo en la cama y más fáciles de sujetar/alinear.
module p_pillar_lower() {
    h_total = Z_mid_pl - 10;
    difference() {
        translate([-pillar_side/2, -pillar_side/2, 0]) cube([pillar_side, pillar_side, h_total]);
        translate([0,0,-1]) cylinder(d=6.5, h=100, $fn=16);
    }
}
module p_pillar_upper() {
    h_total = Z_motor_pl - (Z_mid_pl + 10);
    difference() {
        translate([-pillar_side/2, -pillar_side/2, 0]) cube([pillar_side, pillar_side, h_total]);
        translate([0,0,-1]) cylinder(d=6.5, h=100, $fn=16);
    }
}

module p_motor_cradle() {
    difference() {
        hull() { translate([-50, -52, 0]) cube([100, 5, 30]); translate([-35, pos_Mot[1] - 28.5, 0]) cube([70, 10, 30]); }
        translate([-28.75, pos_Mot[1] - 28.5, -1]) cube([57.5, 60, 40]);
        for(x=[-35, 35]) { translate([x, -50, 15]) rotate([90,0,0]) cylinder(d=6.5, h=40, center=true, $fn=16); translate([x, -50, 15]) rotate([90,0,0]) cylinder(d=15, h=40, $fn=32); }
    }
}

module dummy_bearing() { color("silver") difference() { cylinder(d=23, h=4, $fn=32); translate([0,0,-1]) cylinder(d=17, h=6, $fn=32); } }

/* ==========================================================
   VISTA DE ENSAMBLAJE
   ========================================================== */
// El ensamble total incluye este archivo con TWINLOCK_NO_RENDER=true
// para reutilizar variables y módulos sin duplicar la geometría.
if (part == "assembly" && is_undef(TWINLOCK_NO_RENDER)) {
    color("gray") p_base_plate(); color("darkgray") translate([0,0,Z_mid_pl]) p_mid_plate(); color("silver") translate([0,0,Z_motor_pl]) p_motor_plate();
    color("white") { for(pt = pillar_coords) translate([pt[0], pt[1], 10]) p_pillar_lower(); for(pt = pillar_coords) translate([pt[0], pt[1], Z_mid_pl + 10]) p_pillar_upper(); }
    color("dimgray") translate([0,0,10]) p_spacer_base_front(); color("darkolivegreen") translate([0,0,Z_cradle + 10]) p_motor_cradle(); 
    
    for(pos = [pos_Out_L, pos_Out_R, pos_Cmp_L, pos_Cmp_R]) { translate(pos) translate([0,0,10 - bearing_w]) dummy_bearing(); }
    for(pos = [pos_Out_L, pos_Out_R, pos_Cmp_L, pos_Cmp_R]) { translate(pos) translate([0,0,Z_mid_pl]) dummy_bearing(); }
    for(pos = [pos_Cmp_L, pos_Cmp_R]) { translate(pos) translate([0,0,Z_motor_pl]) dummy_bearing(); }
    translate(pos_Mot) translate([0,0,Z_mid_pl + 10 - bearing_w]) dummy_bearing();
    
    // Adaptador en el rodamiento opuesto al cuello integrado del engranaje.
    // Los adaptadores de salida giran +7,5° para coincidir con el hueco
    // cuadrado de out_gear_L/R.
    translate(pos_Out_R) translate([0,0,16]) rotate([0,0,7.5]) rotate([180,0,0]) color("yellow") p_bearing_adapter();
    translate(pos_Cmp_R) translate([0,0,16]) rotate([180,0,0]) color("yellow") p_bearing_adapter();
    translate(pos_Out_L) translate([0,0,Z_mid_pl - 6]) rotate([0,0,7.5]) color("yellow") p_bearing_adapter();
    translate(pos_Cmp_L) translate([0,0,Z_mid_pl - 6]) color("yellow") p_bearing_adapter();
    
    color("DodgerBlue") translate(pos_Out_L) translate([0,0,Z_lvl1]) rotate([0,0,360/(teeth_out*2)]) p_out_gear_L();
    color("Crimson")    translate(pos_Cmp_L) translate([0,0,Z_lvl1]) p_comp_pinion_L();
    color("SteelBlue")  translate(pos_Out_R) translate([0,0,Z_lvl2]) rotate([0,0,360/(teeth_out*2)]) p_out_gear_R();
    color("OrangeRed")  translate(pos_Cmp_R) translate([0,0,Z_lvl2]) p_comp_pinion_R();
    color("LimeGreen")  translate(pos_Cmp_L) translate([0,0,Z_lvl3]) p_comp_corona();
    color("ForestGreen")translate(pos_Cmp_R) translate([0,0,Z_lvl3]) p_comp_corona();
    color("Gold")       translate(pos_Mot) translate([0,0,Z_lvl3]) p_motor_pinion(); // Fase 0; 10° chocaba con ambas coronas

    // Ejes cuadrados de los compuestos: unen el piñón Z16 con la corona Z54.
    for (pos = [pos_Cmp_L, pos_Cmp_R])
        translate(pos) color("silver") p_compound_shaft();

} else if (part == "out_gear_L") p_out_gear_L(); else if (part == "out_gear_R") p_out_gear_R();
else if (part == "comp_pinion_L") p_comp_pinion_L(); else if (part == "comp_pinion_R") p_comp_pinion_R();
else if (part == "comp_corona") p_comp_corona(); else if (part == "motor_pinion") p_motor_pinion();
else if (part == "base_plate") p_base_plate(); else if (part == "mid_plate") p_mid_plate(); else if (part == "motor_plate") p_motor_plate();
else if (part == "bearing_adapter") p_bearing_adapter(); else if (part == "compound_shaft") p_compound_shaft();
else if (part == "spacer_base_front") p_spacer_base_front();
else if (part == "pillar_lower") p_pillar_lower(); else if (part == "pillar_upper") p_pillar_upper();
else if (part == "motor_cradle") p_motor_cradle();
