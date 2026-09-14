/* ==========================================================
   TREN DE TRANSMISIÓN - EXTRUSOR DE DOBLE TORNILLO (V5 FINAL)
   - Incluye Torre de Soporte y Abrazadera para el Motor NEMA23
   ========================================================== */

part = "assembly"; // [assembly, base_plate, motor_plate, spacer_base_rear, spacer_pillar_short, spacer_pillar_long, sync_gear, gear1, pinion2, gear2, pinion1, motor_hub, bearing_adapter, motor_support_tower, motor_clamp]

/* --- PARÁMETROS DEL MOTOR (NEMA 23) --- */
motor_shaft_d = 5.2;      
motor_body_d = 57;        
motor_bolt_bc = 47.14;    
motor_bolt_d = 5.5;       
motor_pilot_d = 38.5;     

/* --- PARÁMETROS DE TRANSMISIÓN --- */
hex_shaft_flat = 8.3;     
center_dist_screws = 25.3;
gear_module = 1.5;        
shear_pin_d = 2.0;        

/* --- PARÁMETROS DE RODAMIENTOS (6002ZZ) --- */
bearing_od = 32.2;        
bearing_id = 14.8;        
bearing_w = 9;            

/* Dientes */
sync_teeth = 18;          
pinion_teeth = 18;        
gear1_teeth = 60;         
pinion2_teeth = 18;       
gear2_teeth = 60;         

/* Cálculos de la Geometría Exacta */
sync_module = center_dist_screws / sync_teeth; 
center_dist_1 = (pinion_teeth + gear1_teeth) * gear_module / 2; // 58.5mm
center_dist_2 = (pinion2_teeth + gear2_teeth) * gear_module / 2; // 58.5mm

y_int = sqrt( pow(center_dist_2, 2) - pow(center_dist_screws/2, 2) ); // ~57.11mm

pos_L = [-center_dist_screws/2, 0];
pos_R = [center_dist_screws/2, 0];
pos_Int = [0, y_int];
pos_Mot = [0, y_int + center_dist_1];

// Alturas (Z) 
Z_base = 0;       
Z_sync = 12;      
Z_stage2 = 24;    
Z_stage1 = 46;    
Z_motor_pl = 68;  

/* ==========================================================
   MATRICES DE ACOPLE Y SOPORTE
   ========================================================== */

barrel_m5_holes = [
    [-50, 25], [-35, 25], [0, 25], [35, 25], [50, 25],
    [-50, -25], [-35, -25], [0, -25], [35, -25], [50, -25]
];

pillar_coords = [
    [-60, -43], [60, -43],                           
    [-65, y_int], [65, y_int],                       
    [-45, pos_Mot[1] + 25], [45, pos_Mot[1] + 25]    
];

/* ==========================================================
   MÓDULOS DE UTILIDAD
   ========================================================== */

module hex_hole(flat, h) {
    r_corner = flat / sqrt(3); translate([0,0,-1]) linear_extrude(h + 2) rotate([0,0,30]) circle(r=r_corner, $fn=6);
}

module pillar_positions() { for(pt = pillar_coords) translate([pt[0], pt[1], 0]) children(); }

module locking_hub(h=8) {
    difference() { cylinder(d=22, h=h, $fn=32); hex_hole(hex_shaft_flat, h); translate([0, 0, h/2]) rotate([0, 90, 0]) cylinder(d=3.0, h=15, $fn=16); }
}

module trap_gear(teeth, mod, height, hole_d=0, hex_w=0) {
    rp = teeth * mod / 2; ro = rp + mod; rr = rp - 1.25 * mod;
    hap = (90 / teeth) * 0.95; half_w_out = (PI * mod / 4) - mod * tan(20);
    hao = ((half_w_out / ro) * (180 / PI)) * 0.90; half_w_root = (PI * mod / 4) + 1.25 * mod * tan(20);
    har = ((half_w_root / rr) * (180 / PI)) * 1.05;
    
    difference() {
        linear_extrude(height=height, convexity=10) union() { circle(r=rr+0.1, $fn=teeth*2);
            for(i=[0:teeth-1]) { rotate([0, 0, i * 360 / teeth]) polygon([ [rr * cos(har), -rr * sin(har)], [rp * cos(hap), -rp * sin(hap)], [ro * cos(hao), -ro * sin(hao)], [ro * cos(hao), ro * sin(hao)], [rp * cos(hap), rp * sin(hap)], [rr * cos(har), rr * sin(har)] ]); } }
        if (hex_w > 0) hex_hole(hex_w, height);
        else if (hole_d > 0) translate([0,0,-1]) cylinder(d=hole_d, h=height+2, $fn=32);
    }
}

/* ==========================================================
   PIEZAS DE TRANSMISIÓN
   ========================================================== */

module p_sync_gear() { union() { trap_gear(sync_teeth, sync_module, 12, hex_w=hex_shaft_flat); translate([0,0,12]) locking_hub(8); } }
module p_gear2() { union() { trap_gear(gear2_teeth, gear_module, 12, hex_w=hex_shaft_flat); translate([0,0,12]) locking_hub(8); } }
module p_pinion2() { union() { trap_gear(pinion2_teeth, gear_module, 12, hex_w=hex_shaft_flat); translate([0,0,12]) locking_hub(8); } }
module p_gear1() { union() { trap_gear(gear1_teeth, gear_module, 12, hex_w=hex_shaft_flat); translate([0,0,12]) locking_hub(8); } }

module p_motor_hub() {
    difference() { union() { cylinder(d=22, h=3, $fn=32); translate([0,0,3]) cylinder(d=10, h=12, $fn=32); translate([0,0,15]) cylinder(d=14, h=15, $fn=32); } translate([0,0,-1]) cylinder(d=motor_shaft_d, h=35, $fn=32); translate([7.5, 0, -1]) cylinder(d=shear_pin_d, h=20, $fn=16); translate([0, 0, 22]) rotate([90,0,0]) cylinder(d=3.2, h=15, $fn=16); }
}

module p_pinion1() { difference() { trap_gear(pinion_teeth, gear_module, 12); translate([0,0,-1]) cylinder(d=10.5, h=15, $fn=32); translate([7.5, 0, -1]) cylinder(d=shear_pin_d, h=20, $fn=16); } }

module p_bearing_adapter() { difference() { union() { cylinder(d=19, h=2, $fn=32); translate([0,0,2]) cylinder(d=bearing_id, h=bearing_w, $fn=64); } hex_hole(hex_shaft_flat, bearing_w + 4); } }

/* ==========================================================
   PLACAS Y SOPORTES
   ========================================================== */

module p_base_plate() {
    difference() {
        hull() {
            translate(pos_L) cylinder(d=42, h=10, $fn=64); translate(pos_R) cylinder(d=42, h=10, $fn=64); translate(pos_Int) cylinder(d=42, h=10, $fn=64); pillar_positions() cylinder(d=16, h=10, $fn=32); for(pt = barrel_m5_holes) translate([pt[0], pt[1], 0]) cylinder(d=12, h=10, $fn=16); translate([-70, -52, 0]) cube([140, 5, 10]);
        }
        translate(pos_L) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64); translate(pos_R) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64); translate(pos_Int) translate([0,0,10 - bearing_w]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_L) translate([0,0,-1]) cylinder(d=18, h=12, $fn=32); translate(pos_R) translate([0,0,-1]) cylinder(d=18, h=12, $fn=32); translate(pos_Int) translate([0,0,-1]) cylinder(d=18, h=12, $fn=32);
        for(pt = barrel_m5_holes) translate([pt[0], pt[1], -1]) cylinder(d=5.5, h=15, $fn=16);
        pillar_positions() translate([0,0,-1]) cylinder(d=5.5, h=15, $fn=16);
    }
}

module p_motor_plate() {
    difference() {
        hull() {
            translate(pos_L) cylinder(d=42, h=10, $fn=64); translate(pos_R) cylinder(d=42, h=10, $fn=64); translate(pos_Int) cylinder(d=42, h=10, $fn=64); translate(pos_Mot) cylinder(d=motor_body_d, h=10, $fn=32); pillar_positions() cylinder(d=16, h=10, $fn=32); translate([-70, -52, 0]) cube([140, 5, 10]);
        }
        translate(pos_L) translate([0,0,-1]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64); translate(pos_Int) translate([0,0,-1]) cylinder(d=bearing_od, h=bearing_w + 1, $fn=64);
        translate(pos_L) translate([0,0,bearing_w-1]) cylinder(d=18, h=12, $fn=32); translate(pos_Int) translate([0,0,bearing_w-1]) cylinder(d=18, h=12, $fn=32);
        translate(pos_Mot) translate([0,0,-1]) cylinder(d=motor_pilot_d, h=12, $fn=64);
        translate(pos_Mot) { for(x=[-1,1]) for(y=[-1,1]) translate([x * motor_bolt_bc/2, y * motor_bolt_bc/2, -1]) cylinder(d=motor_bolt_d, h=12, $fn=16); }
        pillar_positions() translate([0,0,-1]) cylinder(d=5.5, h=12, $fn=16);
    }
}

module p_spacer_base_rear() {
    difference() {
        translate([-70, -52, 0]) cube([140, 27, 30]); 
        translate([-60, -43, -1]) cylinder(d=5.5, h=35, $fn=16); translate([60, -43, -1]) cylinder(d=5.5, h=35, $fn=16);
        for (x = [-45, 0, 45]) { translate([x, -20, 15]) rotate([90,0,0]) cylinder(d=6.5, h=40, $fn=16); translate([x, -25, 15]) rotate([90,0,0]) cylinder(d=15, h=17, $fn=32); }
    }
}

/* ==========================================================
   NUEVO: SOPORTE DE MOTOR (TORRE Y ABRAZADERA)
   ========================================================== */

module p_motor_support_tower() {
    motor_bottom_y = pos_Mot[1] - 28.5; // Base del motor
    motor_top_y = pos_Mot[1] + 28.5;    // Top del motor
    
    difference() {
        union() {
            // Transición desde la base plana hasta la cuna del motor
            hull() {
                translate([-50, -52, 0]) cube([100, 5, 35]); // Apoyo en la mesa
                translate([-38.5, motor_bottom_y, 0]) cube([77, 10, 35]); // Base de la cuna
            }
            // Orejas laterales que abrazan el motor
            translate([-38.5, motor_bottom_y, 0]) cube([10, 57, 35]);
            translate([28.5, motor_bottom_y, 0]) cube([10, 57, 35]);
        }
        
        // Espacio para insertar el motor (57.5 x 60mm para que deslice fácil)
        translate([-28.75, motor_bottom_y, -1]) cube([57.5, 60, 40]);
        
        // 2 Agujeros M6 para atornillar la torre a la mesa
        for(x=[-35, 35]) {
            translate([x, -53, 17.5]) rotate([-90,0,0]) cylinder(d=6.5, h=30, $fn=16); // Perno
            translate([x, -35, 17.5]) rotate([-90,0,0]) cylinder(d=15, h=100, $fn=32); // Bolsillo de llave
        }
        
        // Agujeros ciegos (tapped) M5 para atornillar la abrazadera
        for(x=[-33.5, 33.5]) {
            translate([x, motor_top_y - 25, 17.5]) rotate([-90,0,0]) cylinder(d=4.5, h=30, $fn=16);
        }
    }
}

module p_motor_clamp() {
    motor_top_y = pos_Mot[1] + 28.5; // Top del motor
    
    difference() {
        translate([-38.5, motor_top_y, 0]) cube([77, 10, 35]); // Barra abrazadera
        
        // Agujeros pasantes M5
        for(x=[-33.5, 33.5]) {
            translate([x, motor_top_y - 1, 17.5]) rotate([-90,0,0]) cylinder(d=5.5, h=20, $fn=16);
            // Bolsillo avellanado para esconder la cabeza del perno M5
            translate([x, motor_top_y + 5, 17.5]) rotate([-90,0,0]) cylinder(d=10, h=10, $fn=16);
        }
    }
}

module spacer_pillar_short() { difference() { cylinder(d=12, h=28, $fn=16); translate([0,0,-1]) cylinder(d=5.5, h=30, $fn=16); } }
module spacer_pillar_long() { difference() { cylinder(d=12, h=Z_motor_pl - 10, $fn=16); translate([0,0,-1]) cylinder(d=5.5, h=Z_motor_pl, $fn=16); } }
module dummy_bearing() { color("silver") difference() { cylinder(d=32, h=9, $fn=32); translate([0,0,-1]) cylinder(d=15, h=11, $fn=32); } }

/* ==========================================================
   VISTA DE ENSAMBLAJE
   ========================================================== */

if (part == "assembly") {
    // Placas base
    color("gray") p_base_plate();
    color("darkgray") translate([0,0,Z_motor_pl]) p_motor_plate();
    
    // Soportes Traseros a la Mesa
    color("dimgray") translate([0,0,38]) p_spacer_base_rear();
    
    // NUEVO: Torre de Soporte y Abrazadera del Motor (Separada a Z=85)
    color("darkolivegreen") translate([0,0,85]) p_motor_support_tower();
    color("olive") translate([0,0,85]) p_motor_clamp();
    
    // Pilares 
    color("white") {
        translate([-60,-43,10]) spacer_pillar_short(); translate([60,-43,10]) spacer_pillar_short();
        translate([-65, y_int, 10]) spacer_pillar_long(); translate([65, y_int, 10]) spacer_pillar_long();
        translate([-45, pos_Mot[1] + 25, 10]) spacer_pillar_long(); translate([45, pos_Mot[1] + 25, 10]) spacer_pillar_long();
    }
    
    // Engranajes, Motores, y Rodamientos
    translate(pos_L) translate([0,0,1]) { dummy_bearing(); color("yellow") translate([0,0,9]) rotate([180,0,0]) p_bearing_adapter(); }
    translate(pos_R) translate([0,0,1]) { dummy_bearing(); color("yellow") translate([0,0,9]) rotate([180,0,0]) p_bearing_adapter(); }
    translate(pos_Int) translate([0,0,1]) { dummy_bearing(); color("yellow") translate([0,0,9]) rotate([180,0,0]) p_bearing_adapter(); }
    
    color("cyan") { translate(pos_L) translate([0,0,Z_sync]) rotate([0,0,0]) p_sync_gear(); translate(pos_R) translate([0,0,Z_sync]) rotate([0,0,360/(sync_teeth*2)]) p_sync_gear(); }
    color("green") translate(pos_L) translate([0,0,Z_stage2]) p_gear2();
    color("orange") translate(pos_Int) translate([0,0,Z_stage2]) rotate([0,0,360/(pinion2_teeth*2)]) p_pinion2();
    color("red") translate(pos_Int) translate([0,0,Z_stage1]) p_gear1();
    color("purple") translate(pos_Mot) translate([0,0,Z_stage1 - 3]) p_motor_hub();
    color("blue") translate(pos_Mot) translate([0,0,Z_stage1]) rotate([0,0,360/(pinion_teeth*2)]) p_pinion1();
    
    translate(pos_L) translate([0,0,Z_motor_pl]) { dummy_bearing(); color("yellow") translate([0,0,0]) p_bearing_adapter(); }
    translate(pos_Int) translate([0,0,Z_motor_pl]) { dummy_bearing(); color("yellow") translate([0,0,0]) p_bearing_adapter(); }
    
    color("black", 0.5) translate(pos_Mot) translate([0,0,Z_motor_pl + 10 + 25.5]) cube([motor_body_d, motor_body_d, 51], center=true);

} else if (part == "sync_gear") p_sync_gear();
else if (part == "gear2") p_gear2(); else if (part == "pinion2") p_pinion2(); else if (part == "gear1") p_gear1(); else if (part == "pinion1") p_pinion1();
else if (part == "motor_hub") p_motor_hub(); else if (part == "base_plate") p_base_plate(); else if (part == "motor_plate") p_motor_plate();
else if (part == "bearing_adapter") p_bearing_adapter(); else if (part == "spacer_base_rear") p_spacer_base_rear();
else if (part == "spacer_pillar_short") spacer_pillar_short(); else if (part == "spacer_pillar_long") spacer_pillar_long();
else if (part == "motor_support_tower") p_motor_support_tower(); else if (part == "motor_clamp") p_motor_clamp();