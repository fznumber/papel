/* ==========================================================
   ENSAMBLE TOTAL - EXTRUSOR DE DOBLE TORNILLO
   ----------------------------------------------------------
   Marco elegido: placa vertical de 18 mm + 2 vigas de
   40 x 60 x 590 mm. La caja reductora y el barril van
   atornillados a caras opuestas de la placa.

   Sistema de coordenadas global:
     - Eje del barril: z, de z=0 (entrada) a z=538 (salida).
     - Tapa motriz: z=-16..0.
     - Placa vertical: z=-34..-16.
     - Caja TwinLock: base contra la placa, se extiende hacia
       z negativo. Local +Z -> global -Z; local X -> global -X.
     - Portador de dado: z=538..574.
     - Mesa: y=-100 (fondo de las vigas).

   La caja se monta con la placa base contra la placa vertical.
   Los 6 agujeros M6 de la base coinciden con los de la tapa
   motriz y con los bolsillos de tuerca del barril. Se usan
   6 tornillos M6 x 50 + arandela de 1 mm, insertados desde
   el interior de la caja. La tuerca nylock queda en el
   bolsillo del barril (z=0..6); el tornillo no debe apoyar
   en el fondo del bolsillo.

   Ejes cuadrados:
     - 2 de salida, 6,35 x 140 mm, de z=-115 a +25. Entran 25 mm
       en el alojamiento del tornillo y atraviesan el adaptador,
       el engranaje de salida, la placa base/intermedia, la placa
       vertical, la tapa motriz y el collar de empuje.
     - 2 de compuestos, 6,35 x 118 mm, de z=-40 a -158 (dentro de
       la caja). Unen el piñón Z16 con la corona Z54 en x=±42,90.

   Fase de los ejes:
     - Los engranajes de salida van rotados +7,5° en coordenadas
       locales de la caja; el flip global los deja a -7,5°.
     - Los ejes de salida, collares y alojamientos de tornillo
       giran -7,5° global. Los adaptadores de salida van +7,5°
       local para coincidir con el hueco cuadrado del engranaje.
     - Los ejes de los compuestos van a 0° (sus engranajes no
       giran). La diferencia de fase de 90° entre los dos
       tornillos se conserva.

   La fila delantera de tornillos M6 (y=-25) tiene una media luna
   Ø13 en el separador de la caja para que la cabeza y la arandela
   no apoyen en el PETG.

   Piezas que NO incluye este archivo:
     - Tornillos extrusores (se pueden activar con show_screws).
     - Motor NEMA23 real (se muestra un dummy para verificar
       alturas y voladizo).
     - Abrazaderas de las vigas (se indican en el README).
   ========================================================== */

total_part = "assembly"; // [assembly, frame, gearbox, barrel, portador, shafts, bolts, screws]

/* --- BANDERAS DE VISUALIZACIÓN --- */
show_frame         = true;
show_frame_screws  = true;
show_barrel        = true;
show_portador      = true;
show_gearbox       = true;
show_motor         = true;
show_leg           = true;
show_shafts        = true;
show_bolts         = true;
show_screws        = false;  // true = STL completo, más lento

/* Solape de 0,02 mm para que las uniones de caras coplanares
   sigan siendo 2-manifold en OpenSCAD. No cambia ninguna cota
   funcional. */
eps = 0.02;

/* --- BARRIL --- */
L1 = 180;
L2 = 180;
L3 = 178;
z_out = L1 + L2 + L3;   // 538
cdist = 25.3;

/* --- MARCO --- */
plate_x = 200;
plate_y = 160;
plate_z0 = -34 - eps;   // solape de 0,02 con la base de la caja
plate_z1 = -16 + eps;   // solape de 0,02 con la tapa motriz
plate_t = plate_z1 - plate_z0;

beam_w = 40;
beam_len = 590;
beam_x = 40;            // centros en x = +/-40
beam_y_top = -40 + eps; // apoyo de las bridas del barril
beam_y_bot = -100;      // mesa
beam_h = beam_y_top - beam_y_bot;
beam_z0 = -16 - eps;    // solape con la placa
beam_z1 = beam_z0 + beam_len;  // 573,98

/* --- CAJA REDUCTORA --- */
gb_z0 = -34;            // local z=0 -> global z=-34
gb_rot = [0, 180, 0];   // local +Z -> global -Z, local X -> global -X

/* --- EJES CUADRADOS --- */
sq = 6.35;
shaft_z0 = -115;        // extremo trasero, dentro de la placa intermedia
shaft_z1 = 25;          // 25 mm dentro del tornillo
shaft_x = [-cdist/2, cdist/2];

/* --- TORNILLOS M6 AL BARRIL --- */
bolt_x = [-45, 0, 45];
bolt_y = [-25, 25];
bolt_washer_z0 = -45;   // arandela de 1 mm sobre la cara interior de la base
bolt_head_z0 = -51;     // cabeza de 6 mm hacia el interior de la caja
bolt_shank_z0 = -45;    // bajo la arandela
bolt_shank_len = 50;    // M6 x 50
bolt_nut_z0 = 0;
bolt_nut_z1 = 6;

use <barril/barril.scad>
use <portador/portador.scad>
use <tornillo/Tornillos_Modulares_V2.scad>

// Se incluye la caja para reutilizar sus variables y módulos.
// El guard evita que el ensamble standalone se renderice dentro de este archivo.
TWINLOCK_NO_RENDER = true;
include <tren_de_transmicion/twinlock_253_v16_4.scad>

/* ==========================================================
   MARCO
   ========================================================== */

module frame_plate() {
    difference() {
        translate([-plate_x/2, -plate_y/2, plate_z0])
            cube([plate_x, plate_y, plate_t]);

        // 6 tornillos al barril / caja
        for (x = bolt_x, y = bolt_y)
            translate([x, y, plate_z0 - 1])
                cylinder(d=6.5, h=plate_t + 2, $fn=24);

        // 2 ejes cuadrados
        for (x = shaft_x)
            translate([x, 0, plate_z0 - 1])
                cylinder(d=14, h=plate_t + 2, $fn=32);

        // 4 tornillos placa-vigas (por debajo de la base de la caja)
        for (x = [-beam_x, beam_x], y = [-61, -74])
            translate([x, y, plate_z0 - 1])
                cylinder(d=6.5, h=plate_t + 2, $fn=24);
    }
}

module frame_beams() {
    for (x = [-beam_x, beam_x])
        color("burlywood")
            translate([x - beam_w/2, beam_y_bot, beam_z0])
                cube([beam_w, beam_h, beam_len]);
}

module rear_leg() {
    // Bloque de apoyo bajo la cuna del motor. No es estructural:
    // descarga el voladizo de la caja y evita vibración.
    color("burlywood")
        translate([-40, beam_y_bot, -198 - eps])
            cube([80, 48 + eps, 30 + 2*eps]);
}

module plate_beam_screws() {
    for (x = [-beam_x, beam_x], y = [-61, -74]) {
        // cabeza en la cara trasera de la placa, con 0,02 de solape
        color("dimgray") translate([x, y, plate_z0 - 5])
            cylinder(d=10, h=5 + eps, $fn=24);
        // vástago hasta 26 mm dentro de la viga
        color("silver") translate([x, y, plate_z0])
            cylinder(d=6, h=60, $fn=16);
    }
}

module frame() {
    color("tan") frame_plate();
    frame_beams();
    if (show_leg) rear_leg();
    if (show_frame_screws) plate_beam_screws();
}

/* ==========================================================
   BARRIL + PORTADOR
   ========================================================== */

module barrel() {
    color("purple") translate([0, 0, -16]) p_tapa_motriz();

    // Fase común de -7,5°: los engranajes de salida van rotados
    // media diente; el eje cuadrado, el collar y el alojamiento del
    // tornillo giran con ellos. Así el cuadrado entra sin forzar.
    color("gold") translate([-cdist/2, 0, -9.4]) rotate([0, 0, -7.5])
        p_collar_empuje();
    color("gold") translate([ cdist/2, 0, -9.4]) rotate([0, 0, -7.5])
        p_collar_empuje();

    color("lightgreen", 0.9)
        barrel_section(L1, is_top=true, has_hopper=true,
                       hatch_positions=[], nut_ends="near");
    color("darkgreen", 0.9)
        translate([0, 0, L1]) rotate([180, 0, 0])
            barrel_section(L1, is_top=false, nut_ends="far");

    color("lightblue", 0.9)
        translate([0, 0, L1])
            barrel_section(L2, is_top=true, has_hopper=false,
                           hatch_positions=[L2/2], nut_ends="near");
    color("darkblue", 0.9)
        translate([0, 0, L1 + L2]) rotate([180, 0, 0])
            barrel_section(L2, is_top=false, nut_ends="far");

    color("pink", 0.9)
        translate([0, 0, L1 + L2])
            barrel_section(L3, is_top=true, has_hopper=false,
                           hatch_positions=[L3/2], nut_ends="both");
    color("darkred", 0.9)
        translate([0, 0, z_out]) rotate([180, 0, 0])
            barrel_section(L3, is_top=false, nut_ends="both");

    color("cyan") translate([0, 5, L1 + L2/2]) p_tapa_escotilla();
    color("cyan") translate([0, 5, L1 + L2 + L3/2]) p_tapa_escotilla();
}

module portador() {
    translate([0, 0, z_out]) assembly();
}

/* ==========================================================
   CAJA REDUCTORA TWINLOCK-253
   ========================================================== */

module gearbox_local() {
    color("gray") p_base_plate();
    color("darkgray") translate([0, 0, Z_mid_pl]) p_mid_plate();
    color("silver") translate([0, 0, Z_motor_pl]) p_motor_plate();

    color("white") {
        for (pt = pillar_coords)
            translate([pt[0], pt[1], 10]) p_pillar_lower();
        for (pt = pillar_coords)
            translate([pt[0], pt[1], Z_mid_pl + 10]) p_pillar_upper();
    }

    color("dimgray") translate([0, 0, 10]) p_spacer_base_front();
    color("darkolivegreen")
        translate([0, 0, Z_cradle + 10]) p_motor_cradle();

    for (pos = [pos_Out_L, pos_Out_R, pos_Cmp_L, pos_Cmp_R]) {
        translate(pos) translate([0, 0, 10 - bearing_w]) dummy_bearing();
        translate(pos) translate([0, 0, Z_mid_pl]) dummy_bearing();
    }
    for (pos = [pos_Cmp_L, pos_Cmp_R])
        translate(pos) translate([0, 0, Z_motor_pl]) dummy_bearing();
    translate(pos_Mot)
        translate([0, 0, Z_mid_pl + 10 - bearing_w]) dummy_bearing();

    // Adaptadores de salida en el rodamiento opuesto al cuello integrado
    // del engranaje. En coordenadas locales deben girar +7,5° para
    // coincidir con el hueco cuadrado del engranaje; el flip global de
    // 180° los deja a -7,5° como el eje.
    translate(pos_Out_R) translate([0, 0, 16]) rotate([0, 0, 7.5])
        rotate([180, 0, 0]) color("yellow") p_bearing_adapter();
    translate(pos_Cmp_R) translate([0, 0, 16]) rotate([180, 0, 0])
        color("yellow") p_bearing_adapter();
    translate(pos_Out_L) translate([0, 0, Z_mid_pl - 6])
        rotate([0, 0, 7.5]) color("yellow") p_bearing_adapter();
    translate(pos_Cmp_L) translate([0, 0, Z_mid_pl - 6])
        color("yellow") p_bearing_adapter();

    color("DodgerBlue") translate(pos_Out_L) translate([0, 0, Z_lvl1])
        rotate([0, 0, 360/(teeth_out*2)]) p_out_gear_L();
    color("Crimson") translate(pos_Cmp_L) translate([0, 0, Z_lvl1])
        p_comp_pinion_L();
    color("SteelBlue") translate(pos_Out_R) translate([0, 0, Z_lvl2])
        rotate([0, 0, 360/(teeth_out*2)]) p_out_gear_R();
    color("OrangeRed") translate(pos_Cmp_R) translate([0, 0, Z_lvl2])
        p_comp_pinion_R();
    color("LimeGreen") translate(pos_Cmp_L) translate([0, 0, Z_lvl3])
        p_comp_corona();
    color("ForestGreen") translate(pos_Cmp_R) translate([0, 0, Z_lvl3])
        p_comp_corona();
    color("Gold") translate(pos_Mot) translate([0, 0, Z_lvl3])
        p_motor_pinion();

    // Ejes cuadrados de los compuestos: unen Z16 con Z54.
    for (pos = [pos_Cmp_L, pos_Cmp_R])
        translate(pos) color("silver") p_compound_shaft();
}

module nema23_local() {
    // NEMA23 2 N.m: cuerpo 57 x 57 x 76, eje 8 x 26.
    // La brida apoya en la cara trasera de la placa motor (z=134).
    color("black")
        translate([-28.5, pos_Mot[1] - 28.5, 134])
            cube([57, 57, 76]);

    // Piloto de centraje Ø38,4 x 3 (0,1 mm de holgura en el alojamiento)
    color("black")
        translate([0, pos_Mot[1], 131])
            cylinder(d=38.4, h=3 + eps, $fn=48);

    // Eje Ø8 x 26 (z=108..134); entra en el piñón y su cuello.
    color("silver")
        translate([0, pos_Mot[1], 108])
            cylinder(d=8, h=26 + eps, $fn=32);

    // 4 tornillos M5 de la brida (desde z=124 hacia el motor)
    for (dx = [-23.57, 23.57], dy = [-23.57, 23.57]) {
        color("dimgray")
            translate([dx, pos_Mot[1] + dy, 118])
                cylinder(d=9, h=6 + eps, $fn=24);
        color("silver")
            translate([dx, pos_Mot[1] + dy, 124])
                cylinder(d=5, h=20, $fn=16);
    }
}

module gearbox() {
    translate([0, 0, gb_z0]) rotate(gb_rot) {
        gearbox_local();
        if (show_motor) nema23_local();
    }
}

/* ==========================================================
   EJES CUADRADOS Y TORNILLERÍA
   ========================================================== */

module square_shafts() {
    for (x = shaft_x)
        color("silver")
            translate([x, 0, 0]) rotate([0, 0, -7.5])
                translate([-sq/2, -sq/2, shaft_z0])
                    cube([sq, sq, shaft_z1 - shaft_z0]);
}

module barrel_bolts() {
    for (x = bolt_x, y = bolt_y) {
        // arandela de 1 mm, con 0,02 de solape en la base de la caja
        color("silver") translate([x, y, bolt_washer_z0])
            cylinder(d=12, h=1 + eps, $fn=24);
        // cabeza hexagonal de 6 mm, hacia el interior de la caja
        color("dimgray") translate([x, y, bolt_head_z0])
            cylinder(d=10, h=6 + eps, $fn=6);
        // vástago M6 x 50
        color("silver") translate([x, y, bolt_shank_z0])
            cylinder(d=6, h=bolt_shank_len, $fn=16);
        // tuerca nylock en el bolsillo del barril
        color("dimgray") translate([x, y, bolt_nut_z0])
            cylinder(d=10, h=bolt_nut_z1 - bolt_nut_z0, $fn=6);
    }
}

/* --- Tornillos extrusores (opcional) --- */
module square_cut_total(h) {
    s = 6.35 + 0.3;
    translate([0, 0, -1])
        linear_extrude(h + 2)
            square([s, s], center=true);
}

module screw_pair() {
    // Los dos tornillos giran -7,5° sobre su eje, igual que los
    // engranajes de salida. La diferencia de fase de 90° se mantiene.
    translate([-cdist/2, 0, 0]) rotate([0, 0, -7.5])
        difference() { full_screw_assembly(); square_cut_total(600); }
    translate([ cdist/2, 0, 0]) rotate([0, 0, 90 - 7.5])
        difference() { full_screw_assembly(); square_cut_total(600); }
}

/* ==========================================================
   ENSAMBLE
   ========================================================== */

module total_assembly() {
    if (show_frame)    frame();
    if (show_barrel)   barrel();
    if (show_portador) portador();
    if (show_gearbox)  gearbox();
    if (show_shafts)   square_shafts();
    if (show_bolts)    barrel_bolts();
    if (show_screws)   screw_pair();
}

if (total_part == "assembly") total_assembly();
else if (total_part == "frame") frame();
else if (total_part == "gearbox") gearbox();
else if (total_part == "barrel") barrel();
else if (total_part == "portador") portador();
else if (total_part == "shafts") square_shafts();
else if (total_part == "bolts") barrel_bolts();
else if (total_part == "screws") screw_pair();
