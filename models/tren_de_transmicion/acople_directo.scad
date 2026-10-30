/* ==========================================================
   BUJE-ACOPLE INTEGRADO (DUMMY BEARING + ADAPTER)
   ----------------------------------------------------------
   Sustituye al rodamiento 6703 Y al adaptador en UNA pieza.
   ¡SÓLO PARA PRUEBAS DE MOVIMIENTO EN VACÍO!
   ========================================================== */

square_shaft_side = 6.35; // 1/4" de pulgada
square_clearance = 0.3;   // Tolerancia FDM para que la varilla entre suave
$fn = 64;

module buje_acople_integrado() {
    difference() {
        union() {
            // 1. EL RODAMIENTO (La parte ancha)
            // Diámetro 22.6mm (El agujero en la placa es de 23.05mm). 
            // Ese casi medio milímetro de holgura hará que gire libre sin rozar.
            translate([0, 0, 6]) cylinder(d=22.6, h=4);
            
            // Chaflán sutil para evitar el "pie de elefante" al imprimir
            translate([0, 0, 6]) cylinder(d1=21.6, d2=22.6, h=0.5);
            
            // 2. EL CUELLO DEL ACOPLE (Donde va el tornillo)
            // Diámetro 19mm. Queda expuesto fuera de la placa para meter la llave Allen
            cylinder(d=19, h=6);
        }
        
        // 3. EL HUECO CUADRADO (Para el eje de 1/4")
        s = square_shaft_side + square_clearance; 
        translate([0,0,-1]) linear_extrude(12) square([s, s], center=true);
        
        // 4. AGUJERO DEL PRISIONERO M3
        // Diámetro 2.5mm para que el tornillo M3 de acero tale su propia rosca
        translate([0, 0, 3]) rotate([0, 90, 0]) cylinder(d=2.5, h=40, center=true, $fn=16);
    }
}

// Render para exportar
color("gold") buje_acople_integrado();