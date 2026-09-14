/* ==========================================================
   ACOPLADOR DE EJE ESCALONADO
   ----------------------------------------------------------
   Transición: Cuadrado 3/8" (sync gear) → Cuadrado 1/4" (tornillo)
   Pieza intermedia que conecta el tren de transmisión V10.1
   con los tornillos co-rotantes V1.
   ========================================================== */

// Lado sync gear (3/8" = 9.525mm)
sq_large      = 9.525;
cl_large      = 0.3;      // clearance
bore_large    = sq_large + cl_large;  // 9.825mm

// Lado tornillo (1/4" = 6.35mm)
sq_small      = 6.35;
cl_small      = 0.3;      // clearance
bore_small    = sq_small + cl_small;  // 6.65mm

// Dimensiones del acoplador
coupler_od    = 16;        // Diámetro exterior
coupler_len   = 35;        // Longitud total
hole_depth_lg = 15;        // Profundidad del hueco 3/8"
hole_depth_sm = 18;        // Profundidad del hueco 1/4"
// Dejamos 2mm de pared sólida en el medio (15 + 18 + 2 = 35)

// Tornillos de fijación
set_screw_d   = 2.5;       // M2.5

/* --- Parámetro visual --- */
part = "coupler"; // [coupler, section_view]

module acoplador() {
    difference() {
        // Cuerpo cilíndrico principal
        cylinder(d=coupler_od, h=coupler_len, $fn=32);

        // Hueco cuadrado 3/8" (recibe el eje del tren)
        translate([0, 0, -1])
        linear_extrude(hole_depth_lg + 1)
        square([bore_large, bore_large], center=true);

        // Hueco cuadrado 1/4" (recibe el eje de metal del tornillo)
        translate([0, 0, coupler_len - hole_depth_sm])
        linear_extrude(hole_depth_sm + 1)
        square([bore_small, bore_small], center=true);

        // Tornillo de fijación transversal (zona 3/8")
        translate([0, 0, hole_depth_lg/2])
        rotate([0, 90, 0])
        cylinder(d=set_screw_d, h=coupler_od + 2, center=true, $fn=16);

        // Tornillo de fijación transversal (zona 1/4")
        translate([0, 0, coupler_len - hole_depth_sm/2])
        rotate([0, 90, 0])
        cylinder(d=set_screw_d, h=coupler_od + 2, center=true, $fn=16);
    }
}

module section_view() {
    difference() {
        acoplador();
        translate([0, -50, -1]) cube([100, 100, 100]);
    }
}

if (part == "coupler") {
    color("Orange") acoplador();
} else if (part == "section_view") {
    color("Orange") section_view();
}
