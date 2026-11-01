/* ==========================================================
   BARRIL PARA EXTRUSOR DE DOBLE TORNILLO - V4.3 (CO-ROTANTE)
   ----------------------------------------------------------
   - FIX CRÍTICO: Hueco interior (Bore) cambiado de "cápsula" 
     a Figura de 8 real (Intersección de círculos pura).
   - FIX 31 Oct 2026: mitades inferiores alineadas, collar de
     empuje de 9,4 mm y bridas axiales 3×M6 por mitad.
   - V4.3: se eliminó la pata continua `base_continua`. La base
     pasa a ser un cradle separado para que las cabezas de los
     6 tornillos inferiores de las uniones z=180/360 sean
     accesibles desde la cara interior.
   - Ajustado a nueva longitud de tornillos: 537.65 mm
   - Ejes cuadrados de 1/4" (6.35 mm)
   ========================================================== */

part = "assembly"; // [01_seccion1_TOP, 02_seccion1_BOTTOM, 03_seccion2_TOP, 04_seccion2_BOTTOM, 05_seccion3_TOP, 06_seccion3_BOTTOM, 07_tapa_motriz, 09_collar_empuje, 10_tapa_escotilla, assembly]

/* --- PARÁMETROS GEOMÉTRICOS PRINCIPALES --- */
cdist = 25.3;            
r_bore = 13.0;           
bore_comp = 0.35;        
wall_t = 10.0;           
rail_w = 20;             
rail_h = 15;             
flange_th = 10;          
nut_ac = 11.8;           // M6: 10 mm entre caras + holgura (11,8 entre vértices)
nut_depth = 6.0;         // bolsillo para tuerca M6 nylock

/* --- LONGITUDES --- */
L1 = 180;                
L2 = 180;                
L3 = 178;                

/* --- PARÁMETROS DEL EJE --- */
square_shaft_side = 6.35;   
square_clearance = 0.3;     

/* ==========================================================
   MÓDULOS 2D BÁSICOS Y CORTES
   ========================================================== */

module bore_2d() {
    // ¡CORREGIDO! De hull() a union() para crear el 8 perfecto.
    union() {
        translate([-cdist/2, 0]) circle(r=r_bore + bore_comp, $fn=64);
        translate([cdist/2, 0]) circle(r=r_bore + bore_comp, $fn=64);
    }
}

module end_flange_2d() {
    intersection() {
        translate([-60, -40]) square([120, 80]);
        translate([-60, 0]) square([120, 80]);
    }
}

module square_cut(h) {
    s = square_shaft_side + square_clearance; 
    translate([0,0,-1]) linear_extrude(h + 2) square([s, s], center=true);
}

/* ==========================================================
   MÓDULOS FUNCIONALES Y ESCOTILLAS
   ========================================================== */

// La base ya no es solidaria: se usa un cradle separado (madera o PETG).
// Esto deja libres las caras interiores de las bridas inferiores para
// insertar y ajustar los tornillos M6 de las uniones z=180 y z=360.

module tolva(z_pos) {
    translate([0, 23, z_pos]) {
        difference() {
            hull() { translate([-25, 0, -20]) cube([50, 1, 40]); translate([-35, 40, -30]) cube([70, 2, 60]); }
            hull() { translate([-15, -10, -15]) cube([30, 10, 30]); translate([-30, 42, -25]) cube([60, 10, 50]); }
            translate([0, -25, 0]) rotate([-90,0,0]) cylinder(d=36, h=50, $fn=32);
        }
    }
}

module escotilla_boss(z_pos) { translate([-30, 10, z_pos - 30]) cube([60, 15, 60]); }

module escotilla_hole(z_pos) {
    translate([-18, 0, z_pos - 20]) cube([36, 26, 40]);
    for(x = [-23, 23]) { for(z = [z_pos - 23, z_pos + 23]) { translate([x, 26, z]) rotate([90,0,0]) cylinder(d=4.6, h=20, $fn=16); } }
}

module p_tapa_escotilla() {
    difference() {
        union() {
            translate([-30, 20, -30]) cube([60, 5, 60]);
            translate([-17.5, 0, -19.5]) cube([35, 20, 39]);
        }
        // Este corte ahora usa el 8 perfecto, así que el tapón encajará limpiamente sin zonas muertas.
        translate([0,0,-35]) linear_extrude(70) bore_2d();
        for(x = [-23, 23]) { for(z = [-23, 23]) { translate([x, 26, z]) rotate([90,0,0]) cylinder(d=5.5, h=15, $fn=16); } }
    }
}

/* ==========================================================
   MÓDULO PRINCIPAL DE SECCIÓN DEL BARRIL
   ========================================================== */

module barrel_section(length, is_top=true, has_hopper=false, hatch_positions=[], nut_ends="none") {
    difference() {
        union() {
            linear_extrude(length) {
                intersection() {
                    // El EXTERIOR sigue usando hull() para darle la forma de pastilla gruesa de pared
                    union() { hull() { translate([-cdist/2, 0]) circle(r=r_bore + wall_t, $fn=64); translate([cdist/2, 0]) circle(r=r_bore + wall_t, $fn=64); } translate([-60, 0]) square([120, rail_h]); }
                    translate([-65, 0]) square([130, 100]); 
                }
            }
            linear_extrude(flange_th) end_flange_2d();
            translate([0, 0, length - flange_th]) linear_extrude(flange_th) end_flange_2d();
            if(is_top && has_hopper) tolva(length/2);
            if (is_top) { for (z = hatch_positions) escotilla_boss(z); }
        }
        
        // EL HUECO INTERIOR en forma de 8
        translate([0,0,-1]) linear_extrude(length+2) bore_2d();
        if(is_top && has_hopper) translate([0, -1, length/2]) rotate([-90,0,0]) cylinder(d=36, h=50, $fn=64);
        if(is_top) { for (z = hatch_positions) escotilla_hole(z); }
        
        // Brida axial M6: 3 por mitad (x=-45,0,45), coincide con tapa motriz y placa base.
        for (x = [-45, 0, 45]) {
            translate([x, 25, -1]) cylinder(d=6.5, h=flange_th+2, $fn=16);
            translate([x, 25, length - flange_th - 1]) cylinder(d=6.5, h=flange_th+2, $fn=16);
        }

        // Bolsillos de tuerca M6 nylock en las caras de acople.
        // near = cara z=0; far = cara z=length.
        if (nut_ends == "near" || nut_ends == "both") {
            for (x = [-45, 0, 45]) {
                translate([x, 25, -0.01]) cylinder(d=nut_ac, h=nut_depth + 0.01, $fn=6);
            }
        }
        if (nut_ends == "far" || nut_ends == "both") {
            for (x = [-45, 0, 45]) {
                translate([x, 25, length - nut_depth]) cylinder(d=nut_ac, h=nut_depth + 0.01, $fn=6);
            }
        }
        for(z = [20 : 35 : length-20]) {
            translate([52, -1, z]) rotate([-90,0,0]) cylinder(d=5.5, h=rail_h+5, $fn=16);
            translate([-52, -1, z]) rotate([-90,0,0]) cylinder(d=5.5, h=rail_h+5, $fn=16);
        }
    }
}

/* ==========================================================
   TAPAS, PLACAS Y COLLARES
   ========================================================== */

module p_tapa_motriz() {
    difference() {
        translate([-60, -40, 0]) cube([120, 80, 16]);
        
        for(x = [-45, 0, 45]) { 
            translate([x, 25, -1]) cylinder(d=6.5, h=20, $fn=16); 
            translate([x, -25, -1]) cylinder(d=6.5, h=20, $fn=16); 
        }
        
        translate([-cdist/2, 0, 16.1 - 9.5]) cylinder(d=28.5, h=10, $fn=64);
        translate([cdist/2, 0, 16.1 - 9.5]) cylinder(d=28.5, h=10, $fn=64);
        
        translate([-cdist/2, 0, -1]) cylinder(d=12, h=20, $fn=32);
        translate([cdist/2, 0, -1]) cylinder(d=12, h=20, $fn=32);
    }
}

// OBSOLETA: placa de salida con 2 x Ø18 sin restricción. El portador de
// dado (`models/portador/portador.scad`) la reemplaza en la máquina actual.
// Se conserva el módulo sólo como referencia; no se incluye en el ensamble.
module p_placa_salida() {
    difference() {
        translate([-60, -40, 0]) cube([120, 80, 12]);
        for(x = [-45, 0, 45]) { translate([x, 25, -1]) cylinder(d=6.5, h=20, $fn=16); translate([x, -25, -1]) cylinder(d=6.5, h=20, $fn=16); }
        translate([-cdist/2, 0, -1]) cylinder(d1=26, d2=18, h=14, $fn=64);
        translate([cdist/2, 0, -1]) cylinder(d1=26, d2=18, h=14, $fn=64);
    }
}

module p_collar_empuje() {
    difference() { 
        // 9,4 mm: entra completo en el contrabore de la tapa (-9,4..0)
        // y apoya contra la cara trasera del tornillo en z=0.
        cylinder(d=22, h=9.4, $fn=32);
        square_cut(14);
        translate([0, 0, 4.7]) rotate([0, 90, 0]) cylinder(d=2.5, h=15, $fn=16);
    }
}

/* ==========================================================
   VISTA DE ENSAMBLE
   ========================================================== */

if (part == "assembly") {
    translate([0,0, -16]) color("purple") p_tapa_motriz();
    
    // Fase -7,5° para que el hueco cuadrado coincida con el eje y el
    // engranaje de salida cuando se arma el conjunto total.
    color("gold") translate([-cdist/2, 0, -9.4]) rotate([0, 0, -7.5])
        p_collar_empuje();
    color("gold") translate([cdist/2, 0, -9.4]) rotate([0, 0, -7.5])
        p_collar_empuje();

    color("lightgreen", 0.9) translate([0,0, 0]) barrel_section(L1, is_top=true, has_hopper=true, hatch_positions=[], nut_ends="near");
    color("darkgreen", 0.9)  translate([0,0, L1]) rotate([180,0,0]) barrel_section(L1, is_top=false, nut_ends="far");

    color("lightblue", 0.9) translate([0,0, L1]) barrel_section(L2, is_top=true, has_hopper=false, hatch_positions=[L2/2], nut_ends="near");
    color("darkblue", 0.9)  translate([0,0, L1+L2]) rotate([180,0,0]) barrel_section(L2, is_top=false, nut_ends="far");

    color("pink", 0.9)      translate([0,0, L1+L2]) barrel_section(L3, is_top=true, has_hopper=false, hatch_positions=[L3/2], nut_ends="both");
    color("darkred", 0.9)   translate([0,0, L1+L2+L3]) rotate([180,0,0]) barrel_section(L3, is_top=false, nut_ends="both");

    // La salida ya no es la placa con 2 x Ø18: va el portador de dado.
    // Ver `models/portador/assembly_barril.scad` o `models/assembly_total.scad`.

    color("cyan") translate([0, 5, L1 + L2/2]) p_tapa_escotilla();
    color("cyan") translate([0, 5, L1 + L2 + L3/2]) p_tapa_escotilla();

} 
else if (part == "01_seccion1_TOP") barrel_section(L1, is_top=true, has_hopper=true, hatch_positions=[], nut_ends="near");
else if (part == "02_seccion1_BOTTOM") barrel_section(L1, is_top=false, nut_ends="far");
else if (part == "03_seccion2_TOP") barrel_section(L2, is_top=true, has_hopper=false, hatch_positions=[L2/2], nut_ends="near");
else if (part == "04_seccion2_BOTTOM") barrel_section(L2, is_top=false, nut_ends="far");
else if (part == "05_seccion3_TOP") barrel_section(L3, is_top=true, has_hopper=false, hatch_positions=[L3/2], nut_ends="both");
else if (part == "06_seccion3_BOTTOM") barrel_section(L3, is_top=false, nut_ends="both");
else if (part == "07_tapa_motriz") p_tapa_motriz();
else if (part == "09_collar_empuje") p_collar_empuje();
else if (part == "10_tapa_escotilla") p_tapa_escotilla();