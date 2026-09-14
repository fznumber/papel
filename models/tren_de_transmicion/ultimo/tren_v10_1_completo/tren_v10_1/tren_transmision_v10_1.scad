/* ==========================================================
   TREN DE TRANSMISIÓN - EXTRUSOR DE DOBLE TORNILLO (V10.1)
   ----------------------------------------------------------
   - DISEÑO OFICIAL Y DEFINITIVO.
   - Eje actualizado a Varilla Cuadrada de 1/4" (6.35mm).
   - Distancia entre centros validada matemáticamente: 25.3mm.
   - Rodamiento 6802ZZ .
   ========================================================== */

part = "assembly"; // [assembly, base_plate, motor_plate, spacer_base_front, pillar, pillar_short, sync_gear, gear1, pinion2, gear2, pinion1, bearing_adapter, motor_cradle]

/* --- PARÁMETROS GENERALES --- */
motor_shaft_d = 5.2;      
motor_body_d = 57;        
motor_bolt_bc = 47.14;    
motor_bolt_d = 5.5;  
motor_pilot_d = 38.5;     

// Eje Cuadrado corregido a 1/4 de pulgada
square_shaft_side = 6.35;   // 1/4" en mm
square_clearance = 0.3;      
backlash_offset = 0.25;   

/* --- PARÁMETROS DE RODAMIENTOS (6703) --- */
bearing_od = 24.05;       
bearing_id = 14.8;        
bearing_w = 5;            

/* --- PARÁMETROS DE ENGRANAJES --- */
sync_teeth = 12;          
sync_width = 24;          
sync_module = 25.3 / sync_teeth; // Garantiza Pitch Diameter = 25.3mm

gear_module = 1.5;        
trans_width = 20;         
pinion_teeth = 18;        
gear_teeth = 60;         

/* Cálculos de Geometría Espacial */
center_dist = ((pinion_teeth + gear_teeth) * gear_module / 2) + backlash_offset; 
y_int = sqrt( pow(center_dist, 2) - pow(25.3/2, 2) ); 

// Distancia exacta de 25.3 mm garantizada:
pos_L = [-12.65, 0];
pos_R = [12.65, 0];
pos_Int = [0, y_int];
pos_Mot = [0, y_int + center_dist];

/* --- ALTURAS Z CORREGIDAS --- */
Z_base = 0;       
Z_sync = 16;         
Z_stage2 = 44;       
Z_stage1 = 68;       
Z_motor_pl = 100;    
Z_cradle = 100;   

front_spacer_clearance = 4;
front_spacer_top = Z_stage2 - front_spacer_clearance;

/* ==========================================================
   GENERADOR MATEMÁTICO DE ENGRANAJES EVOLVENTES
   ========================================================== */
module involute_gear_2d(teeth, m, pressure_angle=20) {
    r_pitch = teeth * m / 2;
    r_base = r_pitch * cos(pressure_angle);
    r_add = r_pitch + m;
    r_ded = r_pitch - 1.25 * m;
    
    function inv(a) = (tan(a) - (a * PI / 180)) * 180 / PI;
    inv_pitch = inv(pressure_angle);
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

module hex_hole(flat, h) {
    r_corner = flat / sqrt(3);
    translate([0,0,-1]) linear_extrude(h + 2) rotate([0,0,30]) circle(r=r_corner, $fn=6);
}

module square_hole(side, h) {
    s = side + square_clearance;
    translate([0,0,-1]) linear_extrude(h + 2) square([s, s], center=true);
}

module locking_hub_solid(h=15) {
    difference() {
        cylinder(d=24, h=h, $fn=32);
        translate([0, 0, h/2]) rotate([0, 90, 0]) cylinder(d=2.5, h=40, center=true, $fn=16); 
    }
}

/* ==========================================================
   PIEZAS MECÁNICAS
   ========================================================== */

module p_sync_gear() { 
    difference() {
        union() {
            linear_extrude(sync_width, convexity=5) involute_gear_2d(sync_teeth, sync_module); 
            translate([0,0,sync_width - 0.01]) cylinder(d=24, h=10 + 0.02, $fn=32); 
        }
        square_hole(square_shaft_side, 50); 
        translate([0, 0, sync_width + 5]) rotate([0, 90, 0]) cylinder(d=2.5, h=40, center=true, $fn=16); 
        translate([sync_teeth*sync_module/2 - 2, 0, sync_width - 1]) cylinder(d=3, h=4, $fn=16);
    }
}

module p_gear2() { 
    difference() {
        union() { 
            linear_extrude(trans_width, convexity=5) involute_gear_2d(gear_teeth, gear_module); 
            translate([0,0,trans_width - 0.01]) cylinder(d=20, h=19 + 0.02, $fn=32); 
        }
        square_hole(square_shaft_side, 60); 
        translate([0, 0, trans_width + 9.5]) rotate([0, 90, 0]) cylinder(d=2.5, h=40, center=true, $fn=16);
    }
}

module p_pinion2() { 
    difference() {
        union() { linear_extrude(trans_width, convexity=5) involute_gear_2d(pinion_teeth, gear_module); translate([0,0,trans_width - 0.01]) locking_hub_solid(3.5); }
        square_hole(square_shaft_side, 50);
    }
}

module p_gear1() { 
    difference() {
        union() { linear_extrude(trans_width, convexity=5) involute_gear_2d(gear_teeth, gear_module); translate([0,0,trans_width - 0.01]) locking_hub_solid(15); }
        square_hole(square_shaft_side, 50);
    }
}

module p_pinion1() {
    difference() { 
        union() {
            linear_extrude(trans_width, convexity=5) involute_gear_2d(pinion_teeth, gear_module); 
            translate([0,0,trans_width - 0.01]) cylinder(d=24, h=15 + 0.02, $fn=32);
        }
        translate([0,0,-1]) cylinder(d=motor_shaft_d, h=50, $fn=32); 
        translate([0, 0, trans_width + 7.5]) rotate([0, 90, 0]) cylinder(d=2.5, h=40, center=true, $fn=16); 
        translate([0, 0, trans_width + 7.5]) rotate([90, 0, 0]) cylinder(d=2.5, h=40, center=true, $fn=16);
    }
}

module p_bearing_adapter() { 
    difference() { 
        union() { 
            cylinder(d=19, h=6, $fn=32); 
            for (angle = [0:60:300]) { rotate([0, 0, angle]) translate([19/2, 0, 3]) cube([3, 2, 6], center=true); }
            translate([0,0,6 - 0.01]) cylinder(d=bearing_id, h=bearing_w + 0.02, $fn=64); 
        } 
        square_hole(square_shaft_side, 20); 
        translate([0, 0, 3]) rotate([0, 90, 0]) cylinder(d=2.5, h=40, center=true, $fn=16);
    } 
}

/* ==========================================================
   CHASIS Y PLACAS
   ========================================================== */
barrel_m6_holes = [ [-50, 25], [-35, 25], [0, 25], [35, 25], [50, 25], [-50, -25], [-35, -25], [0, -25], [35, -25], [50, -25] ];
pillar_coords = [ [-60, -43], [60, -43], [-65, y_int], [65, y_int], [-45, pos_Mot[1] + 25], [45, pos_Mot[1] + 25] ];

module p_base_plate() {
    difference() {
        hull() {
            translate(pos_L) cylinder(d=42, h=10, $fn=64); translate(pos_R) cylinder(d=42, h=10, $fn=64); translate(pos_Int) cylinder(d=42, h=10, $fn=64);
            for(pt = pillar_coords) translate([pt[0], pt[1], 0]) cylinder(d=20, h=10, $fn=32);
            for(pt = barrel_m6_holes) translate([pt[0], pt[1], 0]) cylinder(d=14, h=10, $fn=16);
            translate([-70, -52, 0]) cube([140, 5, 10]);
        }
        translate(pos_L) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_R) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_Int) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_L) translate([0,0,-1]) cylinder(d=18, h=12, $fn=32); translate(pos_R) translate([0,0,-1]) cylinder(d=18, h=12, $fn=32); translate(pos_Int) translate([0,0,-1]) cylinder(d=18, h=12, $fn=32);
        
        for(pt = barrel_m6_holes) translate([pt[0], pt[1], -1]) cylinder(d=6.5, h=15, $fn=16); 
        for(pt = pillar_coords) translate([pt[0], pt[1], -1]) cylinder(d=6.5, h=15, $fn=16); 
    }
}

module p_motor_plate() {
    difference() {
        hull() {
            translate(pos_L) cylinder(d=42, h=10, $fn=64); translate(pos_R) cylinder(d=42, h=10, $fn=64); translate(pos_Int) cylinder(d=42, h=10, $fn=64);
            translate(pos_Mot) cylinder(d=motor_body_d, h=10, $fn=32);
            for(pt = pillar_coords) translate([pt[0], pt[1], 0]) cylinder(d=20, h=10, $fn=32);
            translate([-70, -52, 0]) cube([140, 5, 10]);
        }
        translate(pos_L) translate([0,0,-1]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_Int) translate([0,0,-1]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        
        translate(pos_L) translate([0,0,bearing_w-1]) cylinder(d=18, h=12, $fn=32); translate(pos_Int) translate([0,0,bearing_w-1]) cylinder(d=18, h=12, $fn=32);
        
        translate(pos_Mot) translate([0,0,-1]) cylinder(d=motor_pilot_d, h=12, $fn=64);
        translate(pos_Mot) { for(x=[-1,1]) for(y=[-1,1]) translate([x * motor_bolt_bc/2, y * motor_bolt_bc/2, -1]) cylinder(d=motor_bolt_d, h=12, $fn=16); }
        for(pt = pillar_coords) translate([pt[0], pt[1], -1]) cylinder(d=6.5, h=12, $fn=16); 
    }
}

module p_spacer_base_front() {
    difference() {
        translate([-70, -52, 0]) cube([140, 27, Z_stage2 - 10 - front_spacer_clearance]); 
        translate([-60, -43, -1]) cylinder(d=6.5, h=50, $fn=16); translate([60, -43, -1]) cylinder(d=6.5, h=50, $fn=16);
        for (x = [-45, 0, 45]) { 
            translate([x, -24, 15]) rotate([90,0,0]) cylinder(d=6.5, h=40, center=true, $fn=16); 
            translate([x, -24, 15]) rotate([90,0,0]) cylinder(d=15, h=18, $fn=32); 
        }
    }
}

module p_pillar() { 
    difference() { 
        union() { cylinder(d=16, h=Z_motor_pl - 10, $fn=32); cylinder(d1=19, d2=16, h=2, $fn=32); }
        translate([0,0,-1]) cylinder(d=6.5, h=Z_motor_pl, $fn=16); 
    } 
}

module p_pillar_short() {
    h = Z_motor_pl - front_spacer_top;
    difference() { 
        union() { cylinder(d=16, h=h, $fn=32); cylinder(d1=19, d2=16, h=2, $fn=32); }
        translate([0,0,-1]) cylinder(d=6.5, h=h+2, $fn=16); 
    } 
}

module p_motor_cradle() {
    difference() {
        hull() { translate([-50, -52, 0]) cube([100, 5, 30]); translate([-35, pos_Mot[1] - 28.5, 0]) cube([70, 10, 30]); }
        translate([-28.75, pos_Mot[1] - 28.5, -1]) cube([57.5, 60, 40]);
        for(x=[-35, 35]) {
            translate([x, -50, 15]) rotate([90,0,0]) cylinder(d=6.5, h=40, center=true, $fn=16);
            translate([x, -50, 15]) rotate([90,0,0]) cylinder(d=15, h=40, $fn=32);
        }
    }
}

module dummy_bearing() { color("silver") difference() { cylinder(d=bearing_od-0.05, h=bearing_w, $fn=32); translate([0,0,-1]) cylinder(d=bearing_id+0.2, h=bearing_w+2, $fn=32); } }

/* ==========================================================
   VISTA DE ENSAMBLAJE 
   ========================================================== */
if (part == "assembly") {
    color("gray") p_base_plate();
    color("darkgray") translate([0,0,Z_motor_pl]) p_motor_plate();
    color("dimgray") translate([0,0,10]) p_spacer_base_front();
    color("darkolivegreen") translate([0,0,Z_cradle + 10]) p_motor_cradle(); 
    
    color("white") {
        translate([-60, -43, front_spacer_top]) p_pillar_short(); translate([60, -43, front_spacer_top]) p_pillar_short();
        translate([-65, y_int, 10]) p_pillar(); translate([65, y_int, 10]) p_pillar();
        translate([-45, pos_Mot[1] + 25, 10]) p_pillar(); translate([45, pos_Mot[1] + 25, 10]) p_pillar();
    }
    
    translate(pos_L) translate([0,0,1]) { dummy_bearing(); color("yellow") translate([0,0,bearing_w]) rotate([180,0,0]) p_bearing_adapter(); }
    translate(pos_R) translate([0,0,1]) { dummy_bearing(); color("yellow") translate([0,0,bearing_w]) rotate([180,0,0]) p_bearing_adapter(); }
    translate(pos_Int) translate([0,0,1]) { dummy_bearing(); color("yellow") translate([0,0,bearing_w]) rotate([180,0,0]) p_bearing_adapter(); }
    
    color("cyan") {
        translate(pos_L) translate([0,0,Z_sync]) rotate([0,0,0]) p_sync_gear();
        translate(pos_R) translate([0,0,Z_sync]) rotate([0,0,360/(sync_teeth*2)]) p_sync_gear();
    }
    
    color("green") translate(pos_L) translate([0,0,Z_stage2]) p_gear2();
    color("orange") translate(pos_Int) translate([0,0,Z_stage2]) rotate([0,0,360/(pinion_teeth*2)]) p_pinion2();
    
    color("red") translate(pos_Int) translate([0,0,Z_stage1]) p_gear1();
    color("blue") translate(pos_Mot) translate([0,0,Z_stage1]) rotate([0,0,360/(pinion_teeth*2)]) p_pinion1();
    
    translate(pos_L) translate([0,0,Z_motor_pl]) { dummy_bearing(); color("yellow") p_bearing_adapter(); }
    translate(pos_Int) translate([0,0,Z_motor_pl]) { dummy_bearing(); color("yellow") p_bearing_adapter(); }
    
} else if (part == "sync_gear") p_sync_gear();
else if (part == "gear2") p_gear2(); else if (part == "pinion2") p_pinion2(); 
else if (part == "gear1") p_gear1(); else if (part == "pinion1") p_pinion1();
else if (part == "base_plate") p_base_plate(); else if (part == "motor_plate") p_motor_plate();
else if (part == "bearing_adapter") p_bearing_adapter(); else if (part == "spacer_base_front") p_spacer_base_front();
else if (part == "pillar") p_pillar(); else if (part == "pillar_short") p_pillar_short(); else if (part == "motor_cradle") p_motor_cradle();