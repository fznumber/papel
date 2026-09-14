import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as Layers, c as ChevronDown, i as Pause, l as Check, n as RotateCcw, o as Gauge, r as Play, s as Download, u as Box } from "../_libs/lucide-react.mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DxqkKwxV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
/** TwinLock-253 split-power drivetrain — single source of truth (mm, N, N·m). */
var SPEC = {
	name: "TwinLock-253-SP6",
	project: "TSE fibrilación de celulosa (algodón / tocuyo)",
	centerDistance: 25.3,
	shaftSquare: 6.35,
	phaseDeg: 90,
	outputRatio: 1,
	corotating: true,
	torqueCombinedMin: 10,
	torqueCombinedMax: 15,
	screwRpmMin: 50,
	screwRpmMax: 300,
	thrustDesignN: 2e3,
	radialDesignN: 1200,
	backlashAllowance: .25,
	petgSofteningC: 75
};
var MODULE = 1.5;
var GEARS = {
	input: {
		z: 18,
		m: MODULE,
		face: 14,
		material: "PETG-CF",
		pd: 18 * MODULE
	},
	crown: {
		z: 54,
		m: MODULE,
		face: 14,
		material: "PETG-CF",
		pd: 54 * MODULE
	},
	cmpPinion: {
		z: 16,
		m: MODULE,
		face: 16,
		material: "PETG-CF",
		pd: 16 * MODULE
	},
	output: {
		z: 32,
		m: MODULE,
		face: 16,
		material: "acero",
		pd: 32 * MODULE
	}
};
var SPLIT_RATIO = GEARS.crown.z / GEARS.input.z * (GEARS.output.z / GEARS.cmpPinion.z);
var SCREW = {
	doOuter: 30.36,
	diInner: 20.24,
	pitch: 32,
	length: 110
};
var halfCd = SPEC.centerDistance / 2;
var outCmpCd = (GEARS.output.pd + GEARS.cmpPinion.pd) / 2;
var inCrownCd = (GEARS.input.pd + GEARS.crown.pd) / 2;
var POS = {
	outL: {
		x: -halfCd,
		y: 0
	},
	outR: {
		x: halfCd,
		y: 0
	},
	cmpL: {
		x: -halfCd - outCmpCd,
		y: 0
	},
	cmpR: {
		x: halfCd + outCmpCd,
		y: 0
	},
	input: {
		x: 0,
		y: Math.sqrt(inCrownCd ** 2 - (halfCd + outCmpCd) ** 2)
	}
};
var Z = {
	thrustPlate: 0,
	thrustBearing: 8,
	frontRadial: 22,
	outputGearL: 40,
	outputGearR: 60,
	distribution: 84,
	rearRadial: 104,
	housingEnd: 120,
	reducer: 148,
	motor: 188
};
var BEARINGS = {
	thrust: {
		spec: "51102",
		d: 15,
		D: 28,
		T: 9,
		Ca: 6700,
		C0a: 9800
	},
	radial: {
		spec: "6001-2Z",
		d: 12,
		D: 28,
		B: 8,
		Cr: 5100,
		C0r: 2380
	}
};
var MOTORS = {
	dc775_12: {
		id: "dc775_12",
		name: "DC 775 · 12 V",
		short: "DC 775",
		type: "dc",
		ratedTorque: .22,
		stallTorque: .55,
		noLoadRpm: 9e3,
		ratedRpm: 6200,
		note: "Alta velocidad, bajo par. Exige reducción agresiva."
	},
	nema23_2: {
		id: "nema23_2",
		name: "Stepper NEMA 23 · 2 N·m",
		short: "NEMA 23 · 2 N·m",
		type: "stepper",
		ratedTorque: 2,
		stallTorque: 2.2,
		noLoadRpm: 900,
		ratedRpm: 420,
		note: "Par constante a baja velocidad. Candidato principal."
	},
	nema23_3: {
		id: "nema23_3",
		name: "Stepper NEMA 23 · 3 N·m",
		short: "NEMA 23 · 3 N·m",
		type: "stepper",
		ratedTorque: 3,
		stallTorque: 3.3,
		noLoadRpm: 700,
		ratedRpm: 320,
		note: "Margen para zonas kneading reverse."
	}
};
var PRE_REDUCTIONS = {
	none: {
		id: "none",
		name: "Directo al split 6:1",
		ratio: 1,
		eta: 1,
		kind: "none"
	},
	belt3: {
		id: "belt3",
		name: "Correa HTD 5M 3:1",
		ratio: 3,
		eta: .95,
		kind: "belt"
	},
	plan5: {
		id: "plan5",
		name: "Planetario 5:1",
		ratio: 5,
		eta: .9,
		kind: "planetary"
	},
	plan10: {
		id: "plan10",
		name: "Planetario 10:1",
		ratio: 10,
		eta: .88,
		kind: "planetary"
	},
	helical8: {
		id: "helical8",
		name: "Helicoidal PETG 8:1",
		ratio: 8,
		eta: .82,
		kind: "printed"
	},
	plan27: {
		id: "plan27",
		name: "Planetario 27:1",
		ratio: 27,
		eta: .85,
		kind: "planetary"
	}
};
var SPLIT_ETA = .85;
function computeDrive(motorId, preId) {
	const motor = MOTORS[motorId];
	const pre = PRE_REDUCTIONS[preId];
	const totalRatio = pre.ratio * SPLIT_RATIO;
	const eta = pre.eta * SPLIT_ETA;
	const screwRpmRated = motor.ratedRpm / totalRatio;
	const screwRpmMax = motor.noLoadRpm / totalRatio;
	const torqueRated = motor.ratedTorque * totalRatio * eta;
	const torqueStall = motor.stallTorque * totalRatio * eta;
	const torquePerShaft = torqueRated / 2;
	const inWindow = torqueRated >= SPEC.torqueCombinedMin && torqueRated <= SPEC.torqueCombinedMax * 1.35;
	const rpmInWindow = screwRpmRated >= SPEC.screwRpmMin * .7 && screwRpmRated <= SPEC.screwRpmMax;
	const steelRequired = torquePerShaft > 6;
	let recommendation = "usable";
	if (torqueRated < 8) recommendation = "weak";
	else if (screwRpmRated < 30 && torqueRated > 20) recommendation = "overkill";
	else if (screwRpmRated < 40) recommendation = "slow";
	else if (inWindow && rpmInWindow) recommendation = "ideal";
	const label = `${totalRatio.toFixed(0)}:1 · ${screwRpmRated.toFixed(0)} rpm · ${torqueRated.toFixed(1)} N·m`;
	return {
		totalRatio,
		eta,
		screwRpmRated,
		screwRpmMax,
		torqueRated,
		torqueStall,
		torquePerShaft,
		inWindow,
		rpmInWindow,
		steelRequired,
		recommendation,
		label
	};
}
function motorCurve(motor, totalRatio, eta, points = 24) {
	const out = [];
	if (motor.type === "dc") for (let i = 0; i <= points; i++) {
		const n = motor.noLoadRpm * i / points;
		const t = motor.stallTorque * (1 - n / motor.noLoadRpm);
		out.push({
			rpm: n / totalRatio,
			torque: Math.max(0, t * totalRatio * eta)
		});
	}
	else {
		const hold = motor.ratedTorque * totalRatio * eta;
		const nRated = motor.ratedRpm / totalRatio;
		const nMax = motor.noLoadRpm / totalRatio;
		out.push({
			rpm: 0,
			torque: motor.stallTorque * totalRatio * eta
		});
		out.push({
			rpm: nRated,
			torque: hold
		});
		out.push({
			rpm: nMax,
			torque: hold * .25
		});
	}
	return out;
}
function angleFrom(a, b) {
	return Math.atan2(b.y - a.y, b.x - a.x);
}
var ANGLES = {
	inToCmpL: angleFrom(POS.input, POS.cmpL),
	inToCmpR: angleFrom(POS.input, POS.cmpR),
	cmpLToOutL: angleFrom(POS.cmpL, POS.outL),
	cmpRToOutR: angleFrom(POS.cmpR, POS.outR)
};
/** Driven gear angle so teeth mesh at the center line. */
function meshAngle(driverAngle, zDriver, zDriven, centerAngle) {
	return -driverAngle * (zDriver / zDriven) + Math.PI / zDriven + centerAngle * (1 + zDriver / zDriven);
}
function housingSize() {
	return {
		width: 2 * (Math.abs(POS.cmpL.x) + GEARS.crown.pd / 2 + 10),
		height: GEARS.crown.pd / 2 + POS.input.y + GEARS.input.pd / 2 + 18,
		depth: Z.housingEnd + 6
	};
}
/** Machined output adapter — square screw interface to bearing journals. */
var ADAPTER = {
	id: "TL-253-AD",
	material: "AISI 303",
	overall: 112,
	square: 6.35,
	squareDepth: 18,
	squareTol: "H9",
	plateHole: 16.5,
	shoulderOd: 18,
	shoulderLen: 2.5,
	thrustJournal: 15,
	thrustJournalTol: "g6",
	thrustJournalLen: 10,
	radialJournal: 12,
	radialJournalTol: "g6",
	radialJournalLen: 9,
	gearSeat: 12,
	gearSeatTol: "h7",
	clamp: "2× M4 ISO 4762 en brida partida",
	setScrew: "M4×6 prisionero sobre el cuadrado",
	pin: "Ø3 opcional, pasante, anti-extracción",
	note: "L y R son idénticos. El desfase 90° se clampa contra el engranaje en el banco, no se fresa en el cuadrado."
};
var AXIAL_STACK = [
	{
		z: -18,
		label: "Fondo hueco □",
		part: "adaptador"
	},
	{
		z: 0,
		label: "Placa de reacción 3 mm",
		part: "thrust-plate"
	},
	{
		z: 8,
		label: "51102 empuje",
		part: "thrust-51102"
	},
	{
		z: 22,
		label: "6001 radial ante",
		part: "radial-6001"
	},
	{
		z: 40,
		label: "Engranaje salida L",
		part: "gear-out-steel"
	},
	{
		z: 60,
		label: "Engranaje salida R",
		part: "gear-out-steel"
	},
	{
		z: 104,
		label: "6001 radial post",
		part: "radial-6001"
	},
	{
		z: 120,
		label: "Cierre caja",
		part: "housing"
	}
];
function cadBundle() {
	return {
		designation: SPEC.name,
		spec: SPEC,
		gears: GEARS,
		splitRatio: SPLIT_RATIO,
		positionsMm: POS,
		axialMm: Z,
		axialStack: AXIAL_STACK,
		bearings: BEARINGS,
		screw: SCREW,
		adapter: ADAPTER,
		housing: housingSize()
	};
}
var DEFAULT_MOTOR = "nema23_2";
var DEFAULT_PRE = "none";
/** Mesh forces and tooth stress for TwinLock-253 (spur, α = 20°). Units: mm, N, N·m, MPa. */
var ALPHA = 20 * Math.PI / 180;
var TOOTH_MAT = {
	petg: {
		label: "PETG-CF",
		sigmaB: 20,
		sigmaH: 35,
		E: 4500,
		nu: .38
	},
	steel: {
		label: "Acero",
		sigmaB: 160,
		sigmaH: 520,
		E: 21e4,
		nu: .29
	}
};
/** Reverse-kneading peak vs steady screw torque. */
var KNEAD_PEAK = 1.6;
function lewisY(z) {
	return Math.PI * (.154 - .912 / z);
}
function bendingMPa(ft, face, module, z) {
	return ft / (face * module * lewisY(z));
}
function hertzMPa(ft, face, d1, d2, a, b) {
	const k1 = (1 - a.nu ** 2) / a.E;
	const k2 = (1 - b.nu ** 2) / b.E;
	const rho1 = d1 / 2 * Math.sin(ALPHA);
	const rho2 = d2 / 2 * Math.sin(ALPHA);
	const fn = ft / Math.cos(ALPHA);
	return Math.sqrt(fn * (1 / rho1 + 1 / rho2) / (Math.PI * face * (k1 + k2)));
}
function along(a, b, ra) {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const d = Math.hypot(dx, dy);
	return {
		x: a.x + dx * ra / d,
		y: a.y + dy * ra / d,
		nx: dx / d,
		ny: dy / d,
		tx: -dy / d,
		ty: dx / d
	};
}
function check(name, z, mat, ft, face, module, dSelf, dMate, mate) {
	const m = TOOTH_MAT[mat];
	const sigmaB = Math.max(bendingMPa(ft, face, module, z), 1e-9);
	const sigmaH = Math.max(hertzMPa(ft, face, dSelf, dMate, m, TOOTH_MAT[mate]), 1e-9);
	const sfB = m.sigmaB / sigmaB;
	const sfH = m.sigmaH / sigmaH;
	return {
		name,
		z,
		mat,
		sigmaB,
		sigmaH,
		sfB,
		sfH,
		sf: Math.min(sfB, sfH),
		mode: sfB <= sfH ? "flexión" : "Hertz"
	};
}
function heatFromSf(sf) {
	if (!Number.isFinite(sf)) return 0;
	return Math.max(0, Math.min(1, (2.2 - sf) / 1.4));
}
function computeGearLoads(motorId, preId, loadFactor = 1, opts = {}) {
	const drive = computeDrive(motorId, preId);
	const cmpMat = opts.cmpPinionMat ?? "petg";
	const peak = opts.dutyPeak ?? 1;
	const torqueOut = drive.torqueRated * loadFactor * peak;
	const torqueIn = torqueOut / 6;
	const tShareIn = torqueIn / 2;
	const tCmp = torqueOut / 2 * (GEARS.cmpPinion.z / GEARS.output.z);
	const ftDist = 2e3 * tShareIn / GEARS.input.pd;
	const ftOut = 2e3 * tCmp / GEARS.cmpPinion.pd;
	const frDist = ftDist * Math.tan(ALPHA);
	const frOut = ftOut * Math.tan(ALPHA);
	const mkDist = (id, cmp, side) => {
		const p = along(POS.input, cmp, GEARS.input.pd / 2);
		const pinion = check(`Piñón Z${GEARS.input.z}`, GEARS.input.z, "petg", ftDist, GEARS.input.face, GEARS.input.m, GEARS.input.pd, GEARS.crown.pd, "petg");
		const gear = check(`Corona ${side} Z${GEARS.crown.z}`, GEARS.crown.z, "petg", ftDist, GEARS.crown.face, GEARS.crown.m, GEARS.crown.pd, GEARS.input.pd, "petg");
		return {
			id,
			name: `Distribución ${side}`,
			x: p.x,
			y: p.y,
			z: Z.distribution,
			nx: p.nx,
			ny: p.ny,
			tx: p.tx,
			ty: p.ty,
			Ft: ftDist,
			Fr: frDist,
			Fn: ftDist / Math.cos(ALPHA),
			pinion,
			gear,
			sf: Math.min(pinion.sf, gear.sf)
		};
	};
	const mkOut = (id, cmp, out, side, z) => {
		const p = along(cmp, out, GEARS.cmpPinion.pd / 2);
		const pinion = check(`Piñón ${side} Z${GEARS.cmpPinion.z}`, GEARS.cmpPinion.z, cmpMat, ftOut, GEARS.cmpPinion.face, GEARS.cmpPinion.m, GEARS.cmpPinion.pd, GEARS.output.pd, "steel");
		const gear = check(`Salida ${side} Z${GEARS.output.z}`, GEARS.output.z, "steel", ftOut, GEARS.output.face, GEARS.output.m, GEARS.output.pd, GEARS.cmpPinion.pd, cmpMat);
		return {
			id,
			name: `Salida ${side}`,
			x: p.x,
			y: p.y,
			z,
			nx: p.nx,
			ny: p.ny,
			tx: p.tx,
			ty: p.ty,
			Ft: ftOut,
			Fr: frOut,
			Fn: ftOut / Math.cos(ALPHA),
			pinion,
			gear,
			sf: Math.min(pinion.sf, gear.sf)
		};
	};
	const meshes = [
		mkDist("dist-L", POS.cmpL, "L"),
		mkDist("dist-R", POS.cmpR, "R"),
		mkOut("out-L", POS.cmpL, POS.outL, "L", Z.outputGearL),
		mkOut("out-R", POS.cmpR, POS.outR, "R", Z.outputGearR)
	];
	const critical = meshes.flatMap((m) => [{
		...m.pinion,
		mesh: m.name
	}, {
		...m.gear,
		mesh: m.name
	}]).reduce((a, b) => b.sf < a.sf ? b : a);
	const failPct = Math.max(8, Math.min(240, critical.sf * 100));
	const heat = {
		"gear-input": heatFromSf(meshes[0].pinion.sf),
		"compound-L": heatFromSf(Math.min(meshes[0].gear.sf, meshes[2].pinion.sf)),
		"compound-R": heatFromSf(Math.min(meshes[1].gear.sf, meshes[3].pinion.sf)),
		"gear-out-L": heatFromSf(meshes[2].gear.sf),
		"gear-out-R": heatFromSf(meshes[3].gear.sf)
	};
	return {
		loadFactor,
		torqueIn,
		torqueOut,
		torqueRated: drive.torqueRated,
		torqueStall: drive.torqueStall,
		meshes,
		critical,
		failPct,
		heat
	};
}
var BOM = [
	{
		id: "thrust-51102",
		qty: 2,
		kind: "rodamiento",
		name: "Rodamiento de empuje axial",
		spec: `${BEARINGS.thrust.spec}  ${BEARINGS.thrust.d}×${BEARINGS.thrust.D}×${BEARINGS.thrust.T}`,
		source: "SKF / NSK / generic 51102",
		note: "Descarga 2 kN por eje contra la placa metálica. No contra PETG.",
		critical: true
	},
	{
		id: "radial-6001",
		qty: 4,
		kind: "rodamiento",
		name: "Rodamiento radial rígido",
		spec: `${BEARINGS.radial.spec}  ${BEARINGS.radial.d}×${BEARINGS.radial.D}×${BEARINGS.radial.B}`,
		source: "SKF 6001-2Z",
		note: "Dos por eje (ante y post engranajes). Mantienen CD 25.3 mm.",
		critical: true
	},
	{
		id: "gear-out-steel",
		qty: 2,
		kind: "engranaje",
		name: "Engranaje de salida",
		spec: `Z${GEARS.output.z}  m${GEARS.output.m}  b${GEARS.output.face}  acero 20MnCr5`,
		source: "Corte / SDP-SI / Misumi custom",
		note: "Planos axiales distintos. No engranan entre sí. Obligatorio en acero ≥6 N·m/eje.",
		critical: true
	},
	{
		id: "gear-input",
		qty: 1,
		kind: "engranaje",
		name: "Piñón distribuidor",
		spec: `Z${GEARS.input.z}  m${GEARS.input.m}  b${GEARS.input.face}  herringbone PETG-CF`,
		source: "FDM, eje vertical, 100 % relleno",
		note: "Engrana ambas coronas a la vez. Divide el par 50/50."
	},
	{
		id: "compound",
		qty: 2,
		kind: "engranaje",
		name: "Compuesto corona+piñón",
		spec: `Z${GEARS.crown.z} + Z${GEARS.cmpPinion.z}  m${GEARS.input.m}  pieza única`,
		source: "FDM PETG-CF o PA12-CF",
		note: "Izquierdo y derecho. Piñones en planos axiales distintos."
	},
	{
		id: "adapter",
		qty: 2,
		kind: "eje",
		name: "Adaptador de salida",
		spec: `Hueco □${SPEC.shaftSquare} × 18 · muñón Ø12 / Ø15`,
		source: "Torneado AISI 303, o híbrido casquillo metálico",
		note: "Abrazadera de fase: el hueco cuadrado se clampa a 90° en el montaje.",
		critical: true
	},
	{
		id: "square-rod",
		qty: 2,
		kind: "eje",
		name: "Varilla cuadrada (tornillos)",
		spec: `□ 1/4" (6.35 mm) acero, ya en fabricación`,
		source: "Interfaz bloqueada del tornillo",
		note: "El tren no altera esta geometría. Solo la acciona."
	},
	{
		id: "collar",
		qty: 4,
		kind: "eje",
		name: "Collarín de empuje",
		spec: "Ø12 / Ø15 con tornillo M4",
		source: "McMaster / Misumi",
		note: "Bloquean el anillo interior del 51102 contra el adaptador."
	},
	{
		id: "thrust-plate",
		qty: 1,
		kind: "chasis",
		name: "Placa de reacción axial",
		spec: "AISI 304 2 mm ó Al 6082 3 mm, láser",
		source: "Corte láser local",
		note: "Atornillada al barril. El PETG jamás toma el thrust.",
		critical: true
	},
	{
		id: "housing",
		qty: 1,
		kind: "chasis",
		name: "Caja clamshell",
		spec: "PETG-CF, dos mitades, inserto M3/M4",
		source: "FDM, boquilla 0.4, 6 paredes",
		note: "Una sola mitad localiza los rodamientos (no hiperestático)."
	},
	{
		id: "motor-nema",
		qty: 1,
		kind: "motor",
		name: "Motor (opción A)",
		spec: "NEMA 23 2–3 N·m, eje Ø8",
		source: "Stepperonline / local",
		note: "Acoplamiento directo al piñón: 6:1, ~70 rpm, ~10 N·m. Recomendado."
	},
	{
		id: "motor-775",
		qty: 1,
		kind: "motor",
		name: "Motor (opción B)",
		spec: "DC 775 12 V + planetario 10:1",
		source: "Comercial 36/42 mm planetary",
		note: "Economía / alta rpm. ~100 rpm tornillo, ~10 N·m continuo."
	},
	{
		id: "coupling",
		qty: 1,
		kind: "fijacion",
		name: "Acoplamiento motor",
		spec: "Jaw 8 mm a 8 mm, o brida planetario NEMA 23",
		source: "Misumi / Amazon industrial",
		note: "Flexible para desalineación FDM."
	},
	{
		id: "inserts",
		qty: 24,
		kind: "fijacion",
		name: "Insertos roscados",
		spec: "M3 y M4 brass heat-set",
		source: "CNC Kitchen / Ruthex",
		note: "Nunca roscar directo en PETG bajo carga cíclica."
	},
	{
		id: "screws",
		qty: 1,
		kind: "fijacion",
		name: "Tornillería",
		spec: "ISO 4762 M3×12 / M4×16 / M4×20",
		source: "Caja métrica 12.9",
		note: "Incluye prisioneros M4 para collares y fase."
	},
	{
		id: "grease",
		qty: 1,
		kind: "fijacion",
		name: "Grasa",
		spec: "Litio EP2, compatible PETG",
		source: "SKF LGMT 2 o similar",
		note: "Sin solventes aromáticos. Re-engrase cada campaña."
	}
];
var KIND_LABEL = {
	rodamiento: "Rodamientos",
	engranaje: "Engranajes",
	eje: "Ejes y adaptadores",
	chasis: "Chasis",
	motor: "Motorización",
	fijacion: "Fijación y fluido"
};
/** CAD part colors — one hue per piece type, shared by BOM + 3D. */
var PART_COLOR = {
	"gear-input": "#d4a84b",
	"compound": "#2f8f7a",
	"compound-crown": "#2f8f7a",
	"compound-pinion": "#c46b3a",
	"gear-out-steel": "#6a8caf",
	adapter: "#c9b896",
	"square-rod": "#e0c9a0",
	collar: "#b89b6a",
	"thrust-51102": "#b4554a",
	"radial-6001": "#4e7a96",
	"thrust-plate": "#d5dbe1",
	housing: "#4e6a5c",
	"motor-nema": "#6a6480",
	"motor-775": "#4d5c68",
	coupling: "#8a7a55",
	inserts: "#9a8f6c",
	screws: "#7d838c",
	grease: "#6d7a55"
};
var PART_LEGEND = [
	{
		id: "gear-input",
		label: "Z18"
	},
	{
		id: "compound",
		label: "Z54"
	},
	{
		id: "compound-pinion",
		label: "Z16"
	},
	{
		id: "gear-out-steel",
		label: "Z32"
	},
	{
		id: "adapter",
		label: "Adapt."
	},
	{
		id: "square-rod",
		label: "Tornillo"
	},
	{
		id: "thrust-51102",
		label: "51102"
	},
	{
		id: "radial-6001",
		label: "6001"
	},
	{
		id: "thrust-plate",
		label: "Placa"
	},
	{
		id: "housing",
		label: "Caja"
	},
	{
		id: "motor-nema",
		label: "Motor"
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function fmtMm(n, digits = 2) {
	return `${Number.isInteger(n) ? n.toFixed(0) : n.toFixed(digits)} mm`;
}
function fmtNm(n, digits = 1) {
	return `${n.toFixed(digits)} N·m`;
}
function fmtN(n) {
	return `${Math.round(n)} N`;
}
function fmtRpm(n) {
	return `${Math.round(n)} rpm`;
}
function fmtMPa(n) {
	return `${n.toFixed(0)} MPa`;
}
var useStudio = create()(persist((set) => ({
	tab: "arquitectura",
	playing: true,
	explode: 0,
	housingOpacity: .22,
	showScrews: true,
	showForces: false,
	showDimensions: true,
	selectedId: null,
	motorId: DEFAULT_MOTOR,
	preId: DEFAULT_PRE,
	loadPct: 100,
	ramping: false,
	cmpSteel: false,
	knead: false,
	setTab: (tab) => set({
		tab,
		showForces: tab === "cargas"
	}),
	setPlaying: (playing) => set({ playing }),
	togglePlaying: () => set((s) => ({ playing: !s.playing })),
	setExplode: (explode) => set({ explode }),
	setHousingOpacity: (housingOpacity) => set({ housingOpacity }),
	setShowScrews: (showScrews) => set({ showScrews }),
	setShowForces: (showForces) => set({ showForces }),
	setShowDimensions: (showDimensions) => set({ showDimensions }),
	setSelectedId: (selectedId) => set({ selectedId }),
	setMotorId: (motorId) => set({ motorId }),
	setPreId: (preId) => set({ preId }),
	setLoadPct: (loadPct) => set({ loadPct }),
	setRamping: (ramping) => set({ ramping }),
	setCmpSteel: (cmpSteel) => set({ cmpSteel }),
	setKnead: (knead) => set({ knead })
}), {
	name: "twinlock-253",
	partialize: (s) => ({
		motorId: s.motorId,
		preId: s.preId,
		housingOpacity: s.housingOpacity,
		showScrews: s.showScrews,
		showDimensions: s.showDimensions,
		cmpSteel: s.cmpSteel
	})
}));
function SplitPowerSchematic() {
	const s = 2.05;
	const ox = 210;
	const oy = 118;
	const p = (x, y) => `${ox + x * s},${oy - y * s}`;
	const inP = p(POS.input.x, POS.input.y);
	const cL = p(POS.cmpL.x, POS.cmpL.y);
	const cR = p(POS.cmpR.x, POS.cmpR.y);
	const oL = p(POS.outL.x, POS.outL.y);
	const oR = p(POS.outR.x, POS.outR.y);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 420 210",
		className: "h-auto w-full",
		"aria-label": "Topología split-power",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "420",
				height: "210",
				fill: "transparent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: ox + POS.outL.x * s,
				y1: 146,
				x2: ox + POS.outR.x * s,
				y2: 146,
				stroke: "currentColor",
				className: "text-primary",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: ox,
				y: 162,
				textAnchor: "middle",
				className: "fill-primary",
				fontSize: "10",
				fontFamily: "IBM Plex Mono, monospace",
				children: [
					"CD ",
					SPEC.centerDistance,
					" mm · 1:1 · co-rotante"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${inP} L ${cL}`,
				stroke: "currentColor",
				className: "text-ok",
				strokeWidth: "2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${inP} L ${cR}`,
				stroke: "currentColor",
				className: "text-ok",
				strokeWidth: "2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${cL} L ${oL}`,
				stroke: "currentColor",
				className: "text-steel",
				strokeWidth: "2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${cR} L ${oR}`,
				stroke: "currentColor",
				className: "text-steel",
				strokeWidth: "2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: ox + POS.input.x * s,
				cy: oy - POS.input.y * s,
				r: "16",
				className: "fill-secondary stroke-primary",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: ox + POS.cmpL.x * s,
				cy: oy - POS.cmpL.y * s,
				r: "22",
				className: "fill-card stroke-ok",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: ox + POS.cmpR.x * s,
				cy: oy - POS.cmpR.y * s,
				r: "22",
				className: "fill-card stroke-ok",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: ox + POS.outL.x * s,
				cy: oy - POS.outL.y * s,
				r: "11",
				className: "fill-primary/20 stroke-primary",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: ox + POS.outR.x * s,
				cy: oy - POS.outR.y * s,
				r: "11",
				className: "fill-primary/20 stroke-primary",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: ox,
				y: oy - POS.input.y * s - 24,
				textAnchor: "middle",
				className: "fill-foreground",
				fontSize: "10",
				children: "Piñón Z18"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: ox + POS.cmpL.x * s,
				y: oy - POS.cmpL.y * s + 4,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "9",
				children: "Comp. L"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: ox + POS.cmpR.x * s,
				y: oy - POS.cmpR.y * s + 4,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "9",
				children: "Comp. R"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: ox + POS.outL.x * s,
				y: oy - POS.outL.y * s - 16,
				textAnchor: "middle",
				className: "fill-foreground",
				fontSize: "9",
				children: "Salida L"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: ox + POS.outR.x * s,
				y: oy - POS.outR.y * s - 16,
				textAnchor: "middle",
				className: "fill-foreground",
				fontSize: "9",
				children: "Salida R"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: ox,
				y: 18,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "10",
				children: "Dos caminos de par independientes · sin engranaje de sincronía"
			})
		]
	});
}
function PhaseSchematic() {
	const lobe = (cx, cy, rot) => {
		const pts = [];
		for (let i = 0; i <= 48; i++) {
			const t = i / 48 * Math.PI * 2;
			const r = 22 + 8 * Math.cos(2 * (t - rot));
			pts.push(`${cx + r * Math.cos(t)},${cy + r * Math.sin(t)}`);
		}
		return pts.join(" ");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 320 150",
		className: "h-auto w-full",
		"aria-label": "Faseo 90 grados",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: lobe(110, 78, 0),
				className: "fill-primary/15 stroke-primary",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: lobe(210, 78, Math.PI / 2),
				className: "fill-ok/15 stroke-ok",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "110",
				cy: "78",
				r: "4",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "210",
				cy: "78",
				r: "4",
				className: "fill-ok"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "110",
				y1: "78",
				x2: "210",
				y2: "78",
				className: "stroke-border",
				strokeWidth: "1",
				strokeDasharray: "3 3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "160",
				y: "24",
				textAnchor: "middle",
				className: "fill-foreground",
				fontSize: "11",
				children: "Perfil bilobal · desfase 90°"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "110",
				y: "138",
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "10",
				children: "Eje L · 0°"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "210",
				y: "138",
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "10",
				children: "Eje R · 90°"
			})
		]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-secondary text-muted-foreground",
		primary: "bg-primary text-primary-foreground",
		ok: "bg-ok/15 text-ok",
		warn: "bg-destructive/15 text-destructive",
		outline: "shadow-[var(--shadow-border)] text-muted-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function ArchitecturePanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase",
						children: "Topología"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium tracking-tight",
						children: "Split-power en H, salidas escalonadas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: [
							"El piñón distribuidor Z",
							GEARS.input.z,
							" engrana a la vez las dos coronas Z",
							GEARS.crown.z,
							". Cada camino lleva ~50 % del par hasta su propio engranaje de salida. Los dos ejes cuadrados no se empujan entre sí: no hay single point of failure."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-card p-3 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitPowerSchematic, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
						k: "Distancia entre centros",
						v: fmtMm(SPEC.centerDistance)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
						k: "Relación split",
						v: `${SPLIT_RATIO.toFixed(0)}:1`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
						k: "Relación entre tornillos",
						v: "1:1 estricta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
						k: "Sentido",
						v: "Co-rotante"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
						k: "Módulo",
						v: `${GEARS.output.m} mm · evolvente 20°`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
						k: "Holgura FDM",
						v: `+${fmtMm(SPEC.backlashAllowance)} en CD`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Por qué no un piñón de sincronía"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: [
						"Un engranaje pequeño entre los dos ejes a ",
						fmtMm(SPEC.centerDistance),
						" transmitiría el 100 % de la carga de un tornillo al otro. Con 10–15 N·m combinados eso es un diente PETG condenado. Aquí cada salida recibe par desde el origen: el piñón de entrada parte la potencia, y los engranajes de salida viven en planos axiales distintos (Z",
						GEARS.output.z,
						", PD ",
						fmtMm(GEARS.output.pd),
						") para no interferir a ",
						fmtMm(SPEC.centerDistance),
						"."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Faseo 90°"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "ok",
							children: "Phase lock"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl bg-card p-3 shadow-[var(--shadow-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseSchematic, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: "Un cuadrado de 1/4\" tiene simetría de 90°, así que el hueco no puede \"guardar\" el desfase por sí solo. El adaptador de salida es una abrazadera: se monta el tren, se insertan los tornillos, se gira hasta el barrido self-wiping y se aprietan los prisioneros. El tren, no el operario, mantiene el lock bajo carga."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Cinemática"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-1.5 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Piñón entre ambas coronas → las dos giran igual (co-rotantes)." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Dos mallas por camino (par) → las salidas giran igual que el piñón, más lentas." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Compuestos en x = ",
							fmtMm(POS.cmpL.x),
							" y ",
							fmtMm(POS.cmpR.x),
							", piñón en y =",
							" ",
							fmtMm(POS.input.y),
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Salida L en z = 40 mm, salida R en z = 60 mm. Nunca coplanares." })
					]
				})]
			})
		]
	});
}
function Spec({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card px-3 py-2.5 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-mono text-sm tabular-nums",
			children: v
		})]
	});
}
var ORDER = [
	"rodamiento",
	"engranaje",
	"eje",
	"chasis",
	"motor",
	"fijacion"
];
function BomPanel() {
	const selectedId = useStudio((s) => s.selectedId);
	const setSelectedId = useStudio((s) => s.setSelectedId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase",
					children: "Lista de materiales"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium tracking-tight",
					children: "Hardware comercial + FDM"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: "Pulsa una fila para resaltarla en el modelo. Las piezas críticas no se imprimen: se compran."
				})
			]
		}), ORDER.map((kind) => {
			const items = BOM.filter((i) => i.kind === kind);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
					children: KIND_LABEL[kind]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1.5",
					children: items.map((item) => {
						const active = selectedId === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSelectedId(active ? null : item.id),
							className: cn("w-full rounded-lg px-3 py-2.5 text-left transition-colors", active ? "bg-secondary" : "bg-card hover:bg-secondary/70"),
							style: { boxShadow: "var(--shadow-border)" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-block size-2.5 shrink-0 rounded-full",
												style: { background: PART_COLOR[item.id] ?? "var(--color-steel)" },
												"aria-hidden": true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-muted-foreground",
												children: [item.qty, "×"]
											}),
											" ",
											item.name
										]
									}), item.critical ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "warn",
										children: "crítico"
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-mono text-[11px] text-primary",
									children: item.spec
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground",
									children: item.note
								})
							]
						}) }, item.id);
					})
				})]
			}, kind);
		})]
	});
}
var PRINTS = [
	{
		file: "housing_A.stl",
		role: "Mitad locadora",
		set: "6 paredes, 40 % gyroid, bores −0.2 mm"
	},
	{
		file: "housing_B.stl",
		role: "Tapa holgada",
		set: "No localiza rodamientos. Solo cubre."
	},
	{
		file: "pinion_Z18.stl",
		role: "Piñón distribuidor",
		set: "Eje vertical, 100 % infill, herringbone"
	},
	{
		file: "compound_LR.stl",
		role: "Corona Z54 + piñón Z16",
		set: "Pieza única. Dos unidades, piñón en plano opuesto."
	},
	{
		file: "hub_clamp.stl",
		role: "Abrazadera de fase (prototipo)",
		set: "Sustituir por acero en servicio. Casquillo Ø12."
	}
];
function DfamPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase",
						children: "Manufactura"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium tracking-tight",
						children: "DFAM para PETG-CF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: [
							"El plástico se ablanda a ~",
							SPEC.petgSofteningC,
							" °C. El barril va aislado de la caja (junta 3 mm + placa metálica). Los engranajes de salida, a módulo ",
							GEARS.output.m,
							" y",
							" ",
							GEARS.output.face,
							" mm de cara, se especifican en acero para el par de régimen."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Reglas FDM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-1.5 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Holgura de centros +",
							SPEC.backlashAllowance,
							" mm. No hiperestático."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Una sola mitad localiza cada rodamiento. La tapa lleva holgura." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Insertos M3/M4 heat-set. Nunca rosca directa bajo carga cíclica." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Herringbone en PETG: cancela empuje de hélice y sube el contact ratio." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Boquilla 0.4, capa 0.2, 250 °C / cama 80 °C, filamento seco, recinto cerrado." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Archivos a imprimir"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
					children: PRINTS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "px-3 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-primary",
								children: row.file
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: row.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: row.set
							})
						]
					}, row.file))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Secuencia de montaje"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "list-decimal space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Prensar 6001 en housing A. Calentar insertos." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Montar adaptadores, collares y 51102 contra la placa de reacción." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Apilar engranajes de salida en planos z=40 y z=60. Abrazadera suelta." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Engranar compuestos y piñón. Verificar dos caminos, mismo sentido." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Tapa B. Motor y acoplamiento." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Insertar tornillos, barrer hasta 90°, apretar fase. Engrasar EP2." })
					]
				})]
			})
		]
	});
}
function GearLoadSchematic({ loads }) {
	const s = 1.55;
	const ox = 200;
	const oy = 118;
	const p = (pt) => ({
		x: ox + pt.x * s,
		y: oy - pt.y * s
	});
	const input = p(POS.input);
	const cmpL = p(POS.cmpL);
	const cmpR = p(POS.cmpR);
	const outL = p(POS.outL);
	const outR = p(POS.outR);
	const rIn = GEARS.input.pd / 2 * s;
	const rCr = GEARS.crown.pd / 2 * s;
	const rPn = GEARS.cmpPinion.pd / 2 * s;
	const rOut = GEARS.output.pd / 2 * s;
	const tone = (sf) => sf < 1 ? "stroke-destructive fill-destructive/20" : sf < 1.5 ? "stroke-primary fill-primary/10" : "stroke-ok fill-ok/15";
	const dist = loads.meshes[0];
	const out = loads.meshes[2];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 400 200",
		className: "h-auto w-full",
		"aria-label": "Fuerzas en los engranes",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: input.x,
				cy: input.y,
				r: rIn,
				className: tone(dist.pinion.sf),
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: cmpL.x,
				cy: cmpL.y,
				r: rCr,
				className: tone(Math.min(dist.gear.sf, out.pinion.sf)),
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: cmpR.x,
				cy: cmpR.y,
				r: rCr,
				className: tone(Math.min(loads.meshes[1].gear.sf, loads.meshes[3].pinion.sf)),
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: outL.x,
				cy: outL.y,
				r: rOut,
				className: tone(out.gear.sf),
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: outR.x,
				cy: outR.y,
				r: rOut,
				className: tone(loads.meshes[3].gear.sf),
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: cmpL.x,
				cy: cmpL.y,
				r: rPn,
				className: "fill-background/40 stroke-primary",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: cmpR.x,
				cy: cmpR.y,
				r: rPn,
				className: "fill-background/40 stroke-primary",
				strokeWidth: "1"
			}),
			loads.meshes.map((m) => {
				const c = {
					x: ox + m.x * s,
					y: oy - m.y * s
				};
				const len = 10 + Math.min(18, m.Ft / 40);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: c.x,
					y1: c.y,
					x2: c.x + m.tx * len,
					y2: c.y - m.ty * len,
					className: m.sf < 1 ? "stroke-destructive" : "stroke-primary",
					strokeWidth: "2",
					strokeLinecap: "round"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: c.x,
					cy: c.y,
					r: "2.4",
					className: m.sf < 1 ? "fill-destructive" : "fill-primary"
				})] }, m.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: input.x,
				y: input.y - rIn - 6,
				textAnchor: "middle",
				className: "fill-foreground",
				fontSize: "9",
				children: ["Z", GEARS.input.z]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: outL.x,
				y: outL.y + rOut + 12,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "8",
				children: fmtN(out.Ft)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: outR.x,
				y: outR.y + rOut + 12,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "8",
				children: fmtN(loads.meshes[3].Ft)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 200,
				y: 16,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "10",
				children: "Ft tangencial · α 20° · color = factor de seguridad"
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-border",
			outline: "shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] bg-card",
			ghost: "hover:bg-secondary",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-11 w-full touch-none items-center", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-primary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" })]
	});
}
function LoadsPanel() {
	const motorId = useStudio((s) => s.motorId);
	const preId = useStudio((s) => s.preId);
	const loadPct = useStudio((s) => s.loadPct);
	const setLoadPct = useStudio((s) => s.setLoadPct);
	const ramping = useStudio((s) => s.ramping);
	const setRamping = useStudio((s) => s.setRamping);
	const cmpSteel = useStudio((s) => s.cmpSteel);
	const setCmpSteel = useStudio((s) => s.setCmpSteel);
	const knead = useStudio((s) => s.knead);
	const setKnead = useStudio((s) => s.setKnead);
	const drive = computeDrive(motorId, preId);
	const loads = computeGearLoads(motorId, preId, loadPct / 100, {
		cmpPinionMat: cmpSteel ? "steel" : "petg",
		dutyPeak: knead ? KNEAD_PEAK : 1
	});
	const thrustSf = BEARINGS.thrust.Ca / SPEC.thrustDesignN;
	const radialSf = BEARINGS.radial.Cr * 2 / SPEC.radialDesignN;
	const stallPct = Math.round(drive.torqueStall / Math.max(drive.torqueRated, .01) * 100);
	const failed = loads.critical.sf < 1;
	const cap = Math.max(180, stallPct);
	(0, import_react.useEffect)(() => {
		if (!ramping) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setLoadPct(Math.min(cap, stallPct));
			setRamping(false);
			return;
		}
		const start = performance.now();
		const from = 0;
		const dur = 2400;
		let raf = 0;
		const tick = (now) => {
			const k = Math.min(1, (now - start) / dur);
			const eased = 1 - (1 - k) * (1 - k);
			setLoadPct(from + eased * cap);
			if (k < 1) raf = requestAnimationFrame(tick);
			else setRamping(false);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [
		ramping,
		cap,
		stallPct,
		setLoadPct,
		setRamping
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase",
						children: "Simulación de engrane"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium tracking-tight",
						children: "Carga en los dientes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: [
							"Flexión Lewis y Hertz en los cuatro engranes, α = 20°. PETG-CF a ",
							TOOTH_MAT.petg.sigmaB,
							" MPa de raíz; acero a ",
							TOOTH_MAT.steel.sigmaB,
							" MPa. Conservador (recto, no herringbone)."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Carga respecto al régimen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs tabular-nums text-foreground",
							children: [Math.round(loadPct), "%"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 0,
						max: cap,
						step: 1,
						value: [loadPct],
						onValueChange: (v) => {
							setRamping(false);
							setLoadPct(v[0] ?? 100);
						},
						"aria-label": "Porcentaje de carga"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: ramping ? "secondary" : "default",
								onClick: () => {
									setLoadPct(0);
									setRamping(true);
								},
								children: ramping ? "Rampando…" : "Rampa a stall"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									setRamping(false);
									setLoadPct(100);
								},
								children: "Régimen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[11px] text-muted-foreground",
								children: [
									fmtNm(loads.torqueOut),
									" · stall ",
									stallPct,
									"%"
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground",
						children: ["Piñón Z", GEARS.cmpPinion.z]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex rounded-lg bg-secondary p-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: cmpSteel ? "ghost" : "default",
							className: "h-8 flex-1",
							onClick: () => setCmpSteel(false),
							children: "PETG-CF"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: cmpSteel ? "default" : "ghost",
							className: "h-8 flex-1",
							onClick: () => setCmpSteel(true),
							children: "Acero"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Ciclo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex rounded-lg bg-secondary p-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: knead ? "ghost" : "default",
							className: "h-8 flex-1",
							onClick: () => setKnead(false),
							children: "Estable"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: knead ? "default" : "ghost",
							className: "h-8 flex-1",
							onClick: () => setKnead(true),
							children: ["Amasado ×", KNEAD_PEAK]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					k: "Diente crítico",
					v: `${loads.critical.name}`,
					sub: `${loads.critical.mode} · SF ${loads.critical.sf.toFixed(2)}`,
					warn: failed
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					k: "Falla a",
					v: `${loads.failPct.toFixed(0)}%`,
					sub: failed ? "por debajo del régimen" : "margen sobre régimen",
					warn: failed
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-card p-3 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearLoadSchematic, { loads })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: loads.meshes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "w-full rounded-lg bg-secondary/60 px-3 py-2 text-left",
					onClick: () => useStudio.getState().setSelectedId(m.id.startsWith("out") ? "gear-out-steel" : m.id.startsWith("dist") ? "gear-input" : "compound"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: m.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: m.sf < 1 ? "warn" : "ok",
								children: ["SF ", m.sf.toFixed(2)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-[11px] tabular-nums text-muted-foreground",
							children: [
								"Ft ",
								fmtN(m.Ft),
								" · Fr ",
								fmtN(m.Fr),
								" · Fn ",
								fmtN(m.Fn)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: [
								m.pinion.name,
								" ",
								m.pinion.mat === "petg" ? "PETG" : "acero",
								" ",
								fmtMPa(m.pinion.sigmaB),
								" flex /",
								fmtMPa(m.pinion.sigmaH),
								" Hertz · ",
								m.gear.name,
								" ",
								fmtMPa(m.gear.sigmaB)
							]
						})
					]
				}, m.id))
			}),
			failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive",
				children: [
					loads.critical.name,
					" falla por ",
					loads.critical.mode,
					".",
					!cmpSteel ? ` El piñón Z${GEARS.cmpPinion.z} en PETG contra acero concentra Hertz. Cambia a acero.` : " Sube ancho de cara o baja el par de amasado."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg bg-ok/10 px-3 py-2 text-sm text-ok",
				children: cmpSteel ? `Z${GEARS.cmpPinion.z} en acero: SF ${loads.critical.sf.toFixed(2)} en ${loads.critical.name}.` : `Todos por encima de SF 1. El más justo: ${loads.critical.name}.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-1 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Empuje y separación"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: [
						"Independiente del engrane: ",
						fmtN(SPEC.thrustDesignN),
						" axiales por eje y ",
						fmtN(SPEC.radialDesignN),
						" de apertura van a rodamiento, no al PETG."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "Par combinado (régimen)",
						value: `${fmtNm(drive.torqueRated)} / ${SPEC.torqueCombinedMin}–${SPEC.torqueCombinedMax}`,
						ratio: drive.torqueRated / SPEC.torqueCombinedMax,
						tone: drive.torqueRated < 8 ? "warn" : "ok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: `Thrust vs 51102 (Ca ${fmtN(BEARINGS.thrust.Ca)})`,
						value: `SF ${thrustSf.toFixed(1)}`,
						ratio: SPEC.thrustDesignN / BEARINGS.thrust.Ca,
						tone: "ok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: `Radial vs 2×6001`,
						value: `SF ${radialSf.toFixed(1)}`,
						ratio: SPEC.radialDesignN / (BEARINGS.radial.Cr * 2),
						tone: "ok"
					})
				]
			})
		]
	});
}
function Kpi({ k, v, sub, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card px-3 py-2.5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-sm font-medium ${warn ? "text-destructive" : "text-foreground"}`,
				children: v
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-muted-foreground",
				children: sub
			})
		]
	});
}
function Bar({ label, value, ratio, tone }) {
	const w = Math.min(100, Math.max(6, ratio * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] tabular-nums text-foreground",
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: tone === "ok" ? "h-full bg-ok" : "h-full bg-destructive",
				style: { width: `${w}%` }
			})
		})]
	});
}
var Select = Select$1;
var SelectValue = SelectValue$1;
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-11 w-full items-center justify-between gap-2 rounded-md bg-card px-3 text-sm shadow-[var(--shadow-border)] focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-40", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted-foreground" })
		})]
	});
}
function SelectContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
		className: cn("z-50 overflow-hidden rounded-lg bg-popover shadow-[var(--shadow-border)]", className),
		position: "popper",
		sideOffset: 6,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: "p-1",
			children
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex h-10 cursor-pointer select-none items-center rounded-md py-1.5 pr-8 pl-3 text-sm outline-none data-highlighted:bg-secondary focus:bg-secondary", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, {
			className: "absolute right-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
		})]
	});
}
var REC = {
	ideal: "En ventana",
	usable: "Usable",
	slow: "Lento",
	weak: "Par insuficiente",
	overkill: "Exceso de reducción"
};
function MotorPanel() {
	const motorId = useStudio((s) => s.motorId);
	const preId = useStudio((s) => s.preId);
	const setMotorId = useStudio((s) => s.setMotorId);
	const setPreId = useStudio((s) => s.setPreId);
	const drive = computeDrive(motorId, preId);
	const motor = MOTORS[motorId];
	const pre = PRE_REDUCTIONS[preId];
	const data = motorCurve(motor, drive.totalRatio, drive.eta);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase",
						children: "Entrada de potencia"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium tracking-tight",
						children: "Motor y reducción"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: motor.note
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-1.5 text-xs text-muted-foreground",
					children: ["Motor", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: motorId,
						onValueChange: (v) => setMotorId(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.values(MOTORS).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: m.id,
							children: m.name
						}, m.id)) })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-1.5 text-xs text-muted-foreground",
					children: ["Pre-reducción (antes del split 6:1)", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: preId,
						onValueChange: (v) => setPreId(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.values(PRE_REDUCTIONS).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: p.id,
							children: p.name
						}, p.id)) })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: drive.recommendation === "ideal" ? "ok" : drive.recommendation === "weak" ? "warn" : "default",
					children: REC[drive.recommendation]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tabular-nums text-muted-foreground",
					children: drive.label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						k: "Relación total",
						v: `${drive.totalRatio.toFixed(0)}:1`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						k: "η combinada",
						v: `${Math.round(drive.eta * 100)} %`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						k: "rpm tornillo (régimen)",
						v: fmtRpm(drive.screwRpmRated)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						k: "Par combinado",
						v: fmtNm(drive.torqueRated)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						k: "Par de arranque",
						v: fmtNm(drive.torqueStall)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						k: "Por eje",
						v: fmtNm(drive.torquePerShaft)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-44 rounded-xl bg-card p-2 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data,
						margin: {
							top: 12,
							right: 12,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "#2a2c31",
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "rpm",
								tick: {
									fill: "#8a8d93",
									fontSize: 10
								},
								tickFormatter: (n) => `${Math.round(Number(n))}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								dataKey: "torque",
								tick: {
									fill: "#8a8d93",
									fontSize: 10
								},
								width: 36,
								tickFormatter: (n) => `${Number(n).toFixed(0)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									background: "#131417",
									border: "1px solid #2a2c31",
									fontSize: 12
								},
								formatter: (v) => [`${Number(v).toFixed(1)} N·m`, "Par"],
								labelFormatter: (l) => `${Math.round(Number(l))} rpm tornillo`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "torque",
								stroke: "#c9d1d8",
								strokeWidth: 1.6,
								dot: false
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] text-muted-foreground",
				children: [
					"Curva referida al tornillo. Ventana objetivo ",
					SPEC.screwRpmMin,
					"–",
					SPEC.screwRpmMax,
					" rpm y",
					" ",
					SPEC.torqueCombinedMin,
					"–",
					SPEC.torqueCombinedMax,
					" N·m. Split 6:1 fijo · ",
					pre.name,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2 text-sm leading-relaxed text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium text-foreground",
					children: "Recomendación de banco"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Arranque: NEMA 23 2 N·m directo al piñón (esta ficha). ~70 rpm, ~10 N·m, control por pasos. Si las zonas reverse piden más par, subir a 3 N·m o añadir planetario 5:1 y aceptar rpm más bajas. El DC 775 solo con planetario 10:1 — sin él el tornillo gira a miles de rpm y no hay par." })]
			})
		]
	});
}
function Tile({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card px-3 py-2.5 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-mono text-sm tabular-nums",
			children: v
		})]
	});
}
function PlanosPanel() {
	const box = housingSize();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase",
						children: "Planos de fabricación"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium tracking-tight",
						children: SPEC.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: "Cotas bloqueadas del tornillo y del tren. El adaptador se tuerce en acero; la caja se imprime. El 90° no se fresa en el cuadrado."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawing, {
				title: "Vista frontal · interfaz de tornillos",
				sheet: "TL-253-01",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndView, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawing, {
				title: "Apilado axial · camino de empuje",
				sheet: "TL-253-02",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AxialView, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawing, {
				title: `Adaptador ${ADAPTER.id}`,
				sheet: "TL-253-AD",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdapterView, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Cotas críticas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-1.5 font-medium",
								children: "Cota"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-1.5 font-medium",
								children: "Valor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-1.5 font-medium",
								children: "Nota"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
						className: "font-mono tabular-nums",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "CD tornillos",
								v: fmtMm(SPEC.centerDistance),
								n: "Acero. No FDM."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "□ eje",
								v: `${fmtMm(ADAPTER.square)} ${ADAPTER.squareTol}`,
								n: "Hueco 18 mm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Fase",
								v: "90° ±0.5°",
								n: "Clamp en banco"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Módulo / α",
								v: `${GEARS.output.m} / 20°`,
								n: "Evolvente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Backlash FDM",
								v: `+${fmtMm(SPEC.backlashAllowance)}`,
								n: "Solo centros impresos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "51102",
								v: `${BEARINGS.thrust.d}×${BEARINGS.thrust.D}×${BEARINGS.thrust.T}`,
								n: "Contra placa, no PETG"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "6001-2Z",
								v: `${BEARINGS.radial.d}×${BEARINGS.radial.D}×${BEARINGS.radial.B}`,
								n: "4×, mitad locadora"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Caja",
								v: `${box.width.toFixed(0)}×${box.height.toFixed(0)}×${box.depth.toFixed(0)}`,
								n: "PETG-CF clamshell"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Adaptador — operación de torno"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "warn",
							children: "crítico"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: ADAPTER.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-1.5 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Barra ",
								ADAPTER.material,
								", Ø",
								ADAPTER.shoulderOd,
								" mínimo. Longitud ",
								fmtMm(ADAPTER.overall),
								"."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Muñón empuje Ø",
								ADAPTER.thrustJournal,
								" ",
								ADAPTER.thrustJournalTol,
								" × ",
								fmtMm(ADAPTER.thrustJournalLen),
								" ",
								"(51102)."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Muñones radiales Ø",
								ADAPTER.radialJournal,
								" ",
								ADAPTER.radialJournalTol,
								" × ",
								fmtMm(ADAPTER.radialJournalLen),
								" ",
								"(6001), dos asientos."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Hueco □",
								ADAPTER.square,
								" ",
								ADAPTER.squareTol,
								" × ",
								fmtMm(ADAPTER.squareDepth),
								", electroerosión o broca + lima + calibrador."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								ADAPTER.clamp,
								". ",
								ADAPTER.setScrew,
								". ",
								ADAPTER.pin,
								"."
							] })
						]
					})
				]
			})
		]
	});
}
function Drawing({ title, sheet, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3 px-3 pt-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "text-xs text-muted-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] tracking-wide text-primary",
				children: sheet
			})]
		}), children]
	});
}
function Row({ k, v, n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-t border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-1.5 pr-2 font-sans text-muted-foreground",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-1.5 pr-2 text-foreground",
				children: v
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-1.5 font-sans text-muted-foreground",
				children: n
			})
		]
	});
}
function EndView() {
	const s = 3.4;
	const ox = 200;
	const oy = 118;
	const rL = {
		x: ox + POS.outL.x * s,
		y: oy - POS.outL.y * s
	};
	const rR = {
		x: ox + POS.outR.x * s,
		y: oy - POS.outR.y * s
	};
	const q = SPEC.shaftSquare * s / 2;
	const square = (cx, cy) => `${cx - q},${cy - q} ${cx + q},${cy - q} ${cx + q},${cy + q} ${cx - q},${cy + q}`;
	const lobe = (cx, cy, rot) => {
		const pts = [];
		for (let i = 0; i <= 48; i++) {
			const t = i / 48 * Math.PI * 2;
			const rad = 26 + 9 * Math.cos(2 * (t - rot));
			pts.push(`${cx + rad * Math.cos(t)},${cy + rad * Math.sin(t)}`);
		}
		return pts.join(" ");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 400 210",
		className: "h-auto w-full",
		"aria-label": "Vista frontal 25.3 mm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: rL.x,
				y1: rL.y + 52,
				x2: rR.x,
				y2: rR.y + 52,
				className: "stroke-primary",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: rL.x,
				y1: rL.y + 48,
				x2: rL.x,
				y2: rL.y + 56,
				className: "stroke-primary",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: rR.x,
				y1: rR.y + 48,
				x2: rR.x,
				y2: rR.y + 56,
				className: "stroke-primary",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: ox,
				y: rL.y + 70,
				textAnchor: "middle",
				className: "fill-primary",
				fontSize: "11",
				fontFamily: "IBM Plex Mono, monospace",
				children: "25.3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: lobe(rL.x, rL.y, 0),
				className: "fill-primary/10 stroke-primary",
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: lobe(rR.x, rR.y, Math.PI / 2),
				className: "fill-ok/10 stroke-ok",
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: square(rL.x, rL.y),
				className: "fill-primary/40 stroke-primary",
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: square(rR.x, rR.y),
				className: "fill-ok/40 stroke-ok",
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: rL.x,
				y: rL.y - 42,
				textAnchor: "middle",
				className: "fill-foreground",
				fontSize: "10",
				children: "L · lóbulo 0°"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: rR.x,
				y: rR.y - 42,
				textAnchor: "middle",
				className: "fill-foreground",
				fontSize: "10",
				children: "R · lóbulo 90°"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: ox,
				y: 22,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "10",
				children: "Huecos □ idénticos · fase en la brida del engranaje, no en el cuadrado"
			})
		]
	});
}
function AxialView() {
	const x0 = 36;
	const scale = 2.15;
	const yL = 58;
	const yR = 118;
	const x = (z) => x0 + (z + 18) * scale;
	const stages = [
		{
			z: -18,
			w: 18,
			h: 14,
			y: yL,
			label: "□"
		},
		{
			z: 0,
			w: 3,
			h: 44,
			y: 88,
			label: "placa"
		},
		{
			z: 8,
			w: 9,
			h: 22,
			y: yL,
			label: "51102"
		},
		{
			z: 22,
			w: 8,
			h: 22,
			y: yL,
			label: "6001"
		},
		{
			z: 40,
			w: 16,
			h: 34,
			y: yL,
			label: "Z32 L"
		},
		{
			z: 104,
			w: 8,
			h: 22,
			y: yL,
			label: "6001"
		}
	];
	const stagesR = [
		{
			z: -18,
			w: 18,
			h: 14,
			y: yR,
			label: "□"
		},
		{
			z: 8,
			w: 9,
			h: 22,
			y: yR,
			label: "51102"
		},
		{
			z: 22,
			w: 8,
			h: 22,
			y: yR,
			label: "6001"
		},
		{
			z: 60,
			w: 16,
			h: 34,
			y: yR,
			label: "Z32 R"
		},
		{
			z: 104,
			w: 8,
			h: 22,
			y: yR,
			label: "6001"
		}
	];
	const bar = (s, fill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: x(s.z),
		y: s.y - s.h / 2,
		width: s.w * scale,
		height: s.h,
		className: fill,
		rx: "1.5"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x: x(s.z) + s.w * scale / 2,
		y: s.y + s.h / 2 + 12,
		textAnchor: "middle",
		className: "fill-muted-foreground",
		fontSize: "8",
		children: s.label
	})] }, `${s.y}-${s.z}-${s.label}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 400 168",
		className: "h-auto w-full",
		"aria-label": "Apilado axial",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x(-18),
				y1: yL,
				x2: x(120),
				y2: yL,
				className: "stroke-border",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x(-18),
				y1: yR,
				x2: x(120),
				y2: yR,
				className: "stroke-border",
				strokeWidth: "1"
			}),
			stages.map((s) => bar(s, s.label === "placa" ? "fill-primary/35 stroke-primary" : "fill-secondary stroke-steel")),
			stagesR.map((s) => bar(s, "fill-secondary stroke-ok")),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: x(0),
				y: 22,
				textAnchor: "middle",
				className: "fill-primary",
				fontSize: "9",
				fontFamily: "IBM Plex Mono, monospace",
				children: "z = 0 placa"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: x(40),
				y: 22,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "9",
				fontFamily: "IBM Plex Mono, monospace",
				children: ["L @ ", Z.outputGearL]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: x(60),
				y: 22,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "9",
				fontFamily: "IBM Plex Mono, monospace",
				children: ["R @ ", Z.outputGearR]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 16,
				y: 62,
				className: "fill-foreground",
				fontSize: "9",
				children: "L"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 16,
				y: 122,
				className: "fill-foreground",
				fontSize: "9",
				children: "R"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 200,
				y: 160,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "9",
				children: "Empuje ← tornillo · descarga en placa · engranajes no coplanares"
			})
		]
	});
}
function AdapterView() {
	const x0 = 28;
	const sc = 2.6;
	const y = 70;
	const segs = [
		{
			len: 18,
			r: 8,
			label: "□ 6.35"
		},
		{
			len: 3,
			r: 9,
			label: "hombro"
		},
		{
			len: 10,
			r: 7.5,
			label: "Ø15 g6"
		},
		{
			len: 9,
			r: 6,
			label: "Ø12 6001"
		},
		{
			len: 16,
			r: 6,
			label: "asiento Z32"
		},
		{
			len: 20,
			r: 5.5,
			label: "cuerpo"
		},
		{
			len: 9,
			r: 6,
			label: "Ø12 6001"
		},
		{
			len: 8,
			r: 5,
			label: "cola"
		}
	];
	let z = 0;
	const rects = segs.map((s) => {
		const el = {
			...s,
			z
		};
		z += s.len;
		return el;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 400 150",
		className: "h-auto w-full",
		"aria-label": "Adaptador TL-253-AD",
		children: [
			rects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: x0 + s.z * sc,
				y: y - s.r * sc * .55,
				width: s.len * sc,
				height: s.r * sc * 1.1,
				className: "fill-secondary stroke-primary",
				strokeWidth: "1",
				rx: "1"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: x0 + s.z * sc + s.len * sc / 2,
				y: 118,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "7.5",
				children: s.label
			})] }, s.z)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x0,
				y1: 18,
				x2: x0 + ADAPTER.overall * sc * .83,
				y2: 18,
				className: "stroke-primary",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: 118,
				y: 14,
				className: "fill-primary",
				fontSize: "10",
				fontFamily: "IBM Plex Mono, monospace",
				children: [
					ADAPTER.overall,
					" mm · ",
					ADAPTER.material
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 200,
				y: 142,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: "9",
				children: "Dos piezas idénticas. Brida partida sobre el asiento Z32 para faseo."
			})
		]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-secondary shadow-[var(--shadow-border)] transition-colors data-[state=checked]:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-foreground transition-transform data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-primary-foreground" })
	});
}
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("flex gap-1 overflow-x-auto rounded-xl bg-muted p-1 shadow-[var(--shadow-border)]", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 min-h-9 shrink-0 items-center justify-center rounded-lg px-3 text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("outline-none", className),
		...props
	});
}
var DriveCanvas = (0, import_react.lazy)(() => import("./DriveCanvas-CHbuHvJL.mjs"));
function downloadCad() {
	const blob = new Blob([JSON.stringify(cadBundle(), null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "twinlock-253.json";
	a.click();
	URL.revokeObjectURL(url);
}
function AppShell() {
	const tab = useStudio((s) => s.tab);
	const setTab = useStudio((s) => s.setTab);
	const selectedId = useStudio((s) => s.selectedId);
	const setSelectedId = useStudio((s) => s.setSelectedId);
	const playing = useStudio((s) => s.playing);
	const togglePlaying = useStudio((s) => s.togglePlaying);
	const setPlaying = useStudio((s) => s.setPlaying);
	const explode = useStudio((s) => s.explode);
	const setExplode = useStudio((s) => s.setExplode);
	const housingOpacity = useStudio((s) => s.housingOpacity);
	const setHousingOpacity = useStudio((s) => s.setHousingOpacity);
	const showScrews = useStudio((s) => s.showScrews);
	const setShowScrews = useStudio((s) => s.setShowScrews);
	const showDimensions = useStudio((s) => s.showDimensions);
	const setShowDimensions = useStudio((s) => s.setShowDimensions);
	const motorId = useStudio((s) => s.motorId);
	const preId = useStudio((s) => s.preId);
	const loadPct = useStudio((s) => s.loadPct);
	const cmpSteel = useStudio((s) => s.cmpSteel);
	const knead = useStudio((s) => s.knead);
	const drive = computeDrive(motorId, preId);
	const loads = tab === "cargas" ? computeGearLoads(motorId, preId, loadPct / 100, {
		cmpPinionMat: cmpSteel ? "steel" : "petg",
		dutyPeak: knead ? KNEAD_PEAK : 1
	}) : null;
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
		const onKey = (e) => {
			if (e.code === "Space" && !(e.target instanceof HTMLInputElement)) {
				e.preventDefault();
				togglePlaying();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [setPlaying, togglePlaying]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-background text-foreground lg:h-dvh lg:overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 lg:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase",
					children: "TSE · fibrilación de celulosa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-medium tracking-tight lg:text-xl",
					children: "TwinLock 253"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: "CD 25.3 mm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "ok",
						children: "Co-rotante"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "primary",
						children: "Fase 90°"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: downloadCad,
						className: "hidden sm:inline-flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "CAD JSON"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex min-h-0 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-[min(48dvh,460px)] w-full lg:h-auto lg:min-h-0 lg:flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full min-h-[320px] items-center justify-center text-sm text-muted-foreground",
								children: "Cargando modelo…"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriveCanvas, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none absolute top-3 left-3 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "pointer-events-none rounded-md bg-background/80 px-2 py-1 font-mono text-[11px] tabular-nums text-muted-foreground",
								children: [
									fmtRpm(drive.screwRpmRated),
									" · ",
									fmtNm(drive.torqueRated)
								]
							}), loads ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `pointer-events-none rounded-md bg-background/80 px-2 py-1 font-mono text-[11px] tabular-nums ${loads.critical.sf < 1 ? "text-destructive" : "text-ok"}`,
								children: [
									"SF ",
									loads.critical.sf.toFixed(2),
									knead ? ` · pico ×${KNEAD_PEAK}` : ""
								]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute right-3 bottom-3 left-3 flex flex-wrap gap-1.5",
							children: PART_LEGEND.map((item) => {
								const target = item.id === "compound-pinion" ? "compound" : item.id === "motor-nema" ? motorId === "dc775_12" ? "motor-775" : "motor-nema" : item.id;
								const active = selectedId === target || selectedId === item.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setSelectedId(active ? null : target),
									className: `inline-flex items-center gap-1.5 rounded-full bg-background/85 px-2 py-1 text-[10px] tracking-wide ${active ? "text-foreground" : "text-muted-foreground"}`,
									style: { boxShadow: "var(--shadow-border)" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2 shrink-0 rounded-full",
										style: { background: PART_COLOR[item.id] }
									}), item.label]
								}, item.id);
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border px-4 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "icon-sm",
							onClick: togglePlaying,
							"aria-label": playing ? "Pausar" : "Reproducir",
							children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-w-[140px] flex-1 items-center gap-3 text-[11px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5 shrink-0" }),
								"Explosión",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 0,
									max: 1,
									step: .01,
									value: [explode],
									onValueChange: (v) => setExplode(v[0] ?? 0)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "hidden min-w-[120px] flex-1 items-center gap-3 text-[11px] text-muted-foreground sm:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-3.5 shrink-0" }),
								"Caja",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 0,
									max: .85,
									step: .01,
									value: [housingOpacity],
									onValueChange: (v) => setHousingOpacity(v[0] ?? .22)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: showScrews,
								onCheckedChange: setShowScrews
							}), "Tornillos"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: showDimensions,
								onCheckedChange: setShowDimensions
							}), "Cotas"]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex min-h-0 flex-col border-t border-border lg:border-t-0 lg:border-l",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: tab,
					onValueChange: (v) => setTab(v),
					className: "flex min-h-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 pt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "w-full",
							"aria-label": "Secciones del diseño",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "arquitectura",
									children: "Arq."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "cargas",
									children: "Cargas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "bom",
									children: "BOM"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "planos",
									children: "Planos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "dfam",
									children: "DFAM"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "motor",
									children: "Motor"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-h-0 flex-1 overflow-y-auto px-4 py-4 lg:max-h-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "arquitectura",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitecturePanel, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "cargas",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadsPanel, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "bom",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BomPanel, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "planos",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanosPanel, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "dfam",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DfamPanel, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "motor",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotorPanel, {})
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex items-center gap-2 border-t border-border px-4 py-2 text-[11px] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }),
						SPEC.name,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-3.5" }),
								"split ",
								SPLIT_RATIO.toFixed(0),
								":1"
							]
						})
					]
				})]
			})]
		})]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { KNEAD_PEAK as a, BEARINGS as c, SCREW as d, SPEC as f, meshAngle as g, housingSize as h, PART_COLOR as i, GEARS as l, computeDrive as m, useStudio as n, computeGearLoads as o, Z as p, cn as r, ANGLES as s, routes_exports as t, POS as u };
