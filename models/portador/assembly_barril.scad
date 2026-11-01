/* ==========================================================
   ENSAMBLE BARRIL + PORTADOR (sin caja reductora)
   ----------------------------------------------------------
   Usa los módulos de barril.scad y portador.scad.
   El portador se coloca en la cara de salida del barril
   (z = L1+L2+L3 = 538 mm).
   ========================================================== */

use <../barril/barril.scad>
use <portador.scad>

L1 = 180;
L2 = 180;
L3 = 178;
cdist = 25.3;
z_out = L1 + L2 + L3;

// --- Barril ---
translate([0, 0, -16]) color("purple") p_tapa_motriz();

// Fase -7,5° del conjunto total (eje cuadrado / engranaje de salida).
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

// --- Portador de dado ---
translate([0, 0, z_out]) assembly();
