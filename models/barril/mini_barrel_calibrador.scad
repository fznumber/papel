/* ==========================================================
   MINI-BARRIL CALIBRADOR (TEST DE TOLERANCIA) - V5.4
   ----------------------------------------------------------
   - FIX: Corte profundo de escotilla corregido.
   - NUEVO: Tapón de escotilla (mini_hatch) extraíble con 
     curvatura interior exacta y agarradera.
   ========================================================== */

part = "assembly"; // [test_TOP, test_BOTTOM, test_HATCH, assembly]

/* --- PARÁMETROS PRINCIPALES --- */
test_length = 40;        
ver_interior = true;     

/* --- PARÁMETROS EXACTOS DEL BARRIL --- */
cdist = 25.3;            
r_bore = 13.0;           
bore_comp = 0.35;        

/* --- PARÁMETROS DE OPTIMIZACIÓN (Recortes) --- */
wall_t = 6.0;            
total_w = 90;            

cut_w = 15;              
cut_h = 9;               

/* --- CÁLCULOS INTERNOS AUTOMÁTICOS --- */
total_h = r_bore + wall_t;       
flange_h = total_h - cut_h;      
body_w = total_w - (2 * cut_w);  
bolt_x = (total_w / 2) - 7.5;    

/* ==========================================================
   MÓDULOS 
   ========================================================== */
module bore_2d() {
    union() {
        translate([-cdist/2, 0]) circle(r=r_bore + bore_comp, $fn=64);
        translate([cdist/2, 0]) circle(r=r_bore + bore_comp, $fn=64);
    }
}

module outer_profile() {
    difference() {
        translate([-total_w/2, 0]) square([total_w, total_h]);
        translate([-total_w/2, total_h - cut_h]) square([cut_w, cut_h + 1]);
        translate([total_w/2 - cut_w, total_h - cut_h]) square([cut_w, cut_h + 1]);
    }
}

module mini_barrel(is_top=true) {
    difference() {
        linear_extrude(test_length) outer_profile();
        
        // Hueco interior en Figura de 8
        translate([0,0,-1]) linear_extrude(test_length+2) bore_2d();
        
        // Agujeros M5 
        if (test_length > 40) {
            for (z = [10, test_length - 10]) {
                translate([bolt_x, -1, z]) rotate([-90,0,0]) cylinder(d=5.5, h=flange_h+2, $fn=16);
                translate([-bolt_x, -1, z]) rotate([-90,0,0]) cylinder(d=5.5, h=flange_h+2, $fn=16);
            }
        } else {
            translate([bolt_x, -1, test_length/2]) rotate([-90,0,0]) cylinder(d=5.5, h=flange_h+2, $fn=16);
            translate([-bolt_x, -1, test_length/2]) rotate([-90,0,0]) cylinder(d=5.5, h=flange_h+2, $fn=16);
        }
        
        // CORTE DE LA VENTANA
        if (is_top && ver_interior) {
            window_len = max(5, test_length - 10);
            translate([0, r_bore, test_length/2])
            cube([36, 40, window_len], center=true);
        }
    }
}

/* --- NUEVO MÓDULO: EL TAPÓN DE INSPECCIÓN --- */
module mini_hatch() {
    window_len = max(5, test_length - 10);
    
    difference() {
        union() {
            // 1. Cuerpo del tapón (Intersección del perfil exterior con el hueco)
            // Se le resta 0.4 mm para garantizar que entre suavemente (Clearance)
            intersection() {
                linear_extrude(test_length) outer_profile();
                translate([0, r_bore, test_length/2])
                cube([35.6, 40, window_len - 0.4], center=true);
            }
            
            // 2. Pestaña de tope (Para que no caiga hacia los tornillos)
            translate([0, total_h + 1, test_length/2])
            cube([40, 2, window_len + 4], center=true);
            
            // 3. Agarradera / Manija
            translate([0, total_h + 5, test_length/2])
            cube([10, 6, window_len - 5], center=true);
        }
        
        // 4. EL CORTE MÁGICO: Le restamos el Bore para que copie la curva de los tornillos
        translate([0,0,-1]) linear_extrude(test_length+2) bore_2d();
    }
}

/* ==========================================================
   VISTA Y SELECCIÓN DE PIEZAS
   ========================================================== */
if (part == "assembly") {
    color("lightgreen", 0.8) mini_barrel(is_top=true);
    color("darkgreen", 0.8)  rotate([180,0,0]) mini_barrel(is_top=false);
    
    // Mostramos el tapón ligeramente levantado para que se note
    color("cyan") translate([0, 2, 0]) mini_hatch();
} 
else if (part == "test_TOP") {
    rotate([-90, 0, 0]) mini_barrel(is_top=true);
}
else if (part == "test_BOTTOM") {
    rotate([-90, 0, 0]) mini_barrel(is_top=false);
}
else if (part == "test_HATCH") {
    // Se exporta acostado, igual que el barril, para que la curva interior 
    // se imprima con resolución perfecta.
    rotate([-90, 0, 0]) mini_hatch();
}