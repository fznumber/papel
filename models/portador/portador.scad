/* ==========================================================
   PORTADOR DE DADO PARA EXTRUSOR DOBLE TORNILLO - V1
   ----------------------------------------------------------
   Reemplaza la placa de salida 08_placa_salida.
   - Cuerpo 120 x 80 x 25 mm (+ junta de brida de 1 mm), con
     dos conos de flujo Ø26,7 -> Ø16 alineados con los ejes.
   - Bolsillo de dado de 90 x 30 x 10 mm para placa de
     9,2 mm + junta de 1 mm (queda 0,2 mm de resalte).
   - Placas intercambiables de 8, 6 y 4 mm.
   - Tapa de 120 x 80 x 10 mm con dos salidas Ø16.
   - 6 tornillos M6 x 25 al barril (bolsillos de tuerca
     existentes en la brida de salida).
   - 4 tornillos M6 x 16 de tapa en bolsillos nuevos.
   - Impresión: cuerpo con la cara del barril (z=0) sobre
     la cama; tapa con la cara interior abajo; placas con
     la cara de entrada (conos Ø16) abajo.
   ========================================================== */

part = "assembly"; // [body, cover, die_8, die_6, die_4, gasket_die, gasket_flange, assembly]

/* --- GEOMETRÍA DEL BARRIL (no cambiar sin tocar barril.scad) --- */
cdist        = 25.3;    // distancia entre ejes de tornillo
bore_r       = 13.35;   // r_bore + bore_comp = 13,0 + 0,35
inlet_d      = 2 * bore_r;   // 26,7
outlet_d     = 16.0;    // salida de los conos de flujo

/* --- CUERPO --- */
body_x       = 120.0;
body_y       = 80.0;
body_z       = 25.0;    // + 1 mm de junta de brida = 26 mm total
cone_len     = 15.0;    // z=0..15
die_pocket_x = 90.0;
die_pocket_y = 30.0;
die_pocket_z = 10.0;    // z=15..25

/* --- PLACA DE DADO --- */
die_plate_x  = 89.6;    // 0,2 mm de holgura por lado
die_plate_y  = 29.6;
die_plate_z  = 9.2;
die_entry    = 5.0;
die_land     = die_plate_z - die_entry;   // 4,2 mm
die_d        = 8.0;     // sólo para la vista de ensamble

/* --- JUNTAS --- */
gasket_z     = 1.0;

/* --- TAPA --- */
cover_x      = 120.0;
cover_y      = 80.0;
cover_z      = 10.0;

/* --- TORNILLOS AL BARRIL --- */
body_bolt_x  = [-45, 0, 45];
body_bolt_y  = 25.0;
body_bolt_d  = 6.5;
body_cb_d    = 11.0;
body_cb_depth = 6.5;    // cabeza M6 queda 0,5 mm bajo la cara

/* --- TORNILLOS DE TAPA --- */
cover_bolt_x = 25.0;
cover_bolt_y = 28.0;
cover_bolt_d = 6.5;
cover_nut_ac = 11.8;
cover_nut_depth = 6.5;  // tuerca M6 de 6 mm + 0,5 de holgura

/* --- UÑAS DE EXTRACCIÓN DE LA PLACA --- */
pry_w        = 4.0;     // ancho en y
pry_depth    = 2.0;     // profundidad en x

/* ==========================================================
   MÓDULOS
   ========================================================== */

module body() {
    difference() {
        translate([-body_x/2, -body_y/2, 0])
            cube([body_x, body_y, body_z]);

        // Conos de flujo alineados con los tornillos
        for (x = [-cdist/2, cdist/2])
            translate([x, 0, 0])
                cylinder(d1=inlet_d, d2=outlet_d, h=cone_len, $fn=64);

        // Bolsillo del dado, abierto por la cara de salida
        translate([-die_pocket_x/2, -die_pocket_y/2, body_z - die_pocket_z])
            cube([die_pocket_x, die_pocket_y, die_pocket_z + 1]);

        // Agujeros al barril + contrabore
        for (x = body_bolt_x, y = [-body_bolt_y, body_bolt_y]) {
            translate([x, y, -1])
                cylinder(d=body_bolt_d, h=body_z + 2, $fn=16);
            translate([x, y, body_z - body_cb_depth])
                cylinder(d=body_cb_d, h=body_cb_depth + 1, $fn=32);
        }

        // Bolsillos hexagonales para tuercas de la tapa
        for (x = [-cover_bolt_x, cover_bolt_x],
             y = [-cover_bolt_y, cover_bolt_y])
            translate([x, y, body_z - cover_nut_depth])
                cylinder(d=cover_nut_ac, h=cover_nut_depth + 1, $fn=6);

        // Uñas de extracción en los extremos del bolsillo
        for (x = [-die_pocket_x/2, die_pocket_x/2])
            translate([x - (x > 0 ? 0 : pry_depth), -pry_w/2,
                       body_z - die_pocket_z])
                cube([pry_depth, pry_w, die_pocket_z + 1]);
    }
}

module cover() {
    difference() {
        translate([-cover_x/2, -cover_y/2, 0])
            cube([cover_x, cover_y, cover_z]);

        // Salidas
        for (x = [-cdist/2, cdist/2]) {
            translate([x, 0, -1])
                cylinder(d=outlet_d, h=cover_z + 2, $fn=64);
            // Chaflán exterior de 1 mm
            translate([x, 0, cover_z - 1])
                cylinder(d1=outlet_d, d2=outlet_d + 2, h=2, $fn=64);
        }

        // Agujeros de los tornillos de tapa
        for (x = [-cover_bolt_x, cover_bolt_x],
             y = [-cover_bolt_y, cover_bolt_y])
            translate([x, y, -1])
                cylinder(d=cover_bolt_d, h=cover_z + 2, $fn=16);
    }
}

module die_plate(d = 8) {
    difference() {
        translate([-die_plate_x/2, -die_plate_y/2, 0])
            cube([die_plate_x, die_plate_y, die_plate_z]);

        for (x = [-cdist/2, cdist/2]) {
            // Cono de entrada desde Ø16 hasta d
            translate([x, 0, 0])
                cylinder(d1=outlet_d, d2=d, h=die_entry, $fn=64);
            // Land recto
            translate([x, 0, die_entry - 0.01])
                cylinder(d=d, h=die_land + 0.01, $fn=64);
            // Chaflán de salida de 0,5 mm
            translate([x, 0, die_plate_z - 0.5])
                cylinder(d1=d, d2=d + 1, h=0.6, $fn=64);
        }
    }
}

module gasket_die() {
    difference() {
        translate([-die_pocket_x/2, -die_pocket_y/2, 0])
            cube([die_pocket_x, die_pocket_y, gasket_z]);
        for (x = [-cdist/2, cdist/2])
            translate([x, 0, -1])
                cylinder(d=outlet_d, h=gasket_z + 2, $fn=64);
    }
}

module gasket_flange() {
    difference() {
        translate([-body_x/2, -body_y/2, 0])
            cube([body_x, body_y, gasket_z]);
        // Figura de 8 del barril
        for (x = [-cdist/2, cdist/2])
            translate([x, 0, -1])
                cylinder(d=inlet_d, h=gasket_z + 2, $fn=64);
        // Agujeros de los 6 tornillos al barril
        for (x = body_bolt_x, y = [-body_bolt_y, body_bolt_y])
            translate([x, y, -1])
                cylinder(d=body_bolt_d, h=gasket_z + 2, $fn=16);
    }
}

module assembly(d = die_d) {
    // Junta de brida contra el barril (z=0..1)
    color("ivory") gasket_flange();

    // Cuerpo apoyado sobre la junta (z=1..26)
    color("lightblue") translate([0, 0, gasket_z]) body();

    // Junta de dado y placa en el bolsillo
    color("ivory") translate([0, 0, gasket_z + body_z - die_pocket_z])
        gasket_die();
    color("silver") translate([0, 0, gasket_z + body_z - die_pocket_z + gasket_z])
        die_plate(d);

    // Tapa sobre la cara de salida del cuerpo
    color("orange") translate([0, 0, gasket_z + body_z]) cover();
}

if (part == "body") body();
else if (part == "cover") cover();
else if (part == "die_8") die_plate(8);
else if (part == "die_6") die_plate(6);
else if (part == "die_4") die_plate(4);
else if (part == "gasket_die") gasket_die();
else if (part == "gasket_flange") gasket_flange();
else if (part == "assembly") assembly();
