import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useFrame, c as BoxGeometry, d as Color, f as Matrix4, g as Vector3, h as Quaternion, i as Canvas, l as BufferAttribute, m as Plane, n as Grid, o as useThree, p as MeshStandardMaterial, r as OrbitControls, t as ContactShadows, u as BufferGeometry } from "../_libs/@react-three/drei+[...].mjs";
import { a as Play, c as Box, i as Scan, o as Pause, r as SlidersHorizontal, s as Layers, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BeN1Js5q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-card-hover shadow-[var(--shadow-border)]",
			ghost: "text-foreground/80 hover:bg-secondary hover:text-foreground",
			outline: "shadow-[var(--shadow-border)] bg-transparent hover:bg-secondary text-foreground"
		},
		size: {
			default: "h-10 px-3.5",
			sm: "h-8 px-2.5 text-xs",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-primary shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70" })]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-10 shrink-0 items-center rounded-full shadow-[var(--shadow-border)] transition-colors duration-150 data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-foreground shadow-sm transition-transform duration-150 data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-primary-foreground" })
	});
}
/** OpenSCAD geometric parameters, millimetres. */
var GEOM = {
	odNominal: 25.3,
	rootRadius: 7.85,
	squareShaftSide: 6.35,
	squareClearance: .3,
	screwClearance: .4,
	centerDistance: 25.3
};
var rPeak = (GEOM.odNominal - GEOM.screwClearance) / 2;
var rRoot = GEOM.rootRadius - GEOM.screwClearance / 2;
var lobeOff = rPeak - rRoot;
var barrelRadius = GEOM.odNominal / 2;
GEOM.squareShaftSide + GEOM.squareClearance;
var RAW = [
	{
		id: "Z1a",
		zone: "Z1",
		label: "Alimentación 1D",
		type: "convey",
		length: 50.6,
		pitch: 50.6,
		startAngle: 0,
		hand: "R",
		color: "#e23d3d"
	},
	{
		id: "Z1b",
		zone: "Z1",
		label: "Alimentación 1D",
		type: "convey",
		length: 50.6,
		pitch: 50.6,
		startAngle: 0,
		hand: "R",
		color: "#e8882a"
	},
	{
		id: "Z1c",
		zone: "Z1",
		label: "Alimentación 0.75D",
		type: "convey",
		length: 37.95,
		pitch: 37.95,
		startAngle: 0,
		hand: "R",
		color: "#c9a227"
	},
	{
		id: "Z2a",
		zone: "Z2",
		label: "Transporte 0.75D",
		type: "convey",
		length: 37.95,
		pitch: 37.95,
		startAngle: 0,
		hand: "R",
		color: "#3d9a56"
	},
	{
		id: "Z2b",
		zone: "Z2",
		label: "Amasado 45° F",
		type: "knead",
		length: 37.95,
		elements: 5,
		stagger: 45,
		startAngle: 0,
		hand: "F",
		color: "#7cba3a"
	},
	{
		id: "Z2c",
		zone: "Z2",
		label: "Transporte 0.375D",
		type: "convey",
		length: 18.98,
		pitch: 18.98,
		startAngle: 180,
		hand: "R",
		color: "#6b7c32"
	},
	{
		id: "Z3a",
		zone: "Z3",
		label: "Amasado 45° R",
		type: "knead",
		length: 37.95,
		elements: 5,
		stagger: 45,
		startAngle: 180,
		hand: "R",
		color: "#2aa8c4"
	},
	{
		id: "Z3b",
		zone: "Z3",
		label: "Inverso 0.375D",
		type: "convey",
		length: 18.98,
		pitch: 18.98,
		startAngle: 0,
		hand: "L",
		color: "#4682b4"
	},
	{
		id: "Z3c",
		zone: "Z3",
		label: "Amasado 45° R",
		type: "knead",
		length: 37.95,
		elements: 5,
		stagger: 45,
		startAngle: 0,
		hand: "R",
		color: "#2f5fbf"
	},
	{
		id: "Z3d",
		zone: "Z3",
		label: "Inverso 0.375D",
		type: "convey",
		length: 18.98,
		pitch: 18.98,
		startAngle: 180,
		hand: "L",
		color: "#243a7a"
	},
	{
		id: "Z3e",
		zone: "Z3",
		label: "Amasado 90° N",
		type: "knead",
		length: 37.95,
		elements: 4,
		stagger: 90,
		startAngle: 180,
		hand: "N",
		color: "#6b3fa0"
	},
	{
		id: "Z3f",
		zone: "Z3",
		label: "Inverso 0.375D",
		type: "convey",
		length: 18.98,
		pitch: 18.98,
		startAngle: 90,
		hand: "L",
		color: "#c23b8c"
	},
	{
		id: "Z3g",
		zone: "Z3",
		label: "Amasado 45° R",
		type: "knead",
		length: 37.95,
		elements: 5,
		stagger: 45,
		startAngle: 90,
		hand: "R",
		color: "#d67a9a"
	},
	{
		id: "Z3h",
		zone: "Z3",
		label: "Transporte 0.375D",
		type: "convey",
		length: 18.98,
		pitch: 18.98,
		startAngle: 270,
		hand: "R",
		color: "#c1323a"
	},
	{
		id: "Z4a",
		zone: "Z4",
		label: "Dosificación 0.75D",
		type: "convey",
		length: 37.95,
		pitch: 37.95,
		startAngle: 270,
		hand: "R",
		color: "#7a5340"
	},
	{
		id: "Z4b",
		zone: "Z4",
		label: "Dosificación 0.75D",
		type: "convey",
		length: 37.95,
		pitch: 37.95,
		startAngle: 270,
		hand: "R",
		color: "#8a8f96"
	}
];
var zCursor = 0;
var PHASES = RAW.map((p) => {
	const z0 = zCursor;
	zCursor += p.length;
	return {
		...p,
		z0
	};
});
var TOTAL_LENGTH = zCursor;
Object.fromEntries(PHASES.map((p) => [p.id, p]));
var ZONE_META = {
	Z1: {
		name: "Alimentación",
		detail: "Sólidos · paso largo",
		color: "#c9a227"
	},
	Z2: {
		name: "Fusión",
		detail: "Compresión y amasado F",
		color: "#3d9a56"
	},
	Z3: {
		name: "Mezclado",
		detail: "Inversos y bloques KB",
		color: "#2f5fbf"
	},
	Z4: {
		name: "Dosificación",
		detail: "Bombeo al dado",
		color: "#8a8f96"
	}
};
var MATERIAL = {
	name: "PETG-CF",
	od: GEOM.odNominal,
	shaft: "1/4″ (6.35 mm)",
	length: TOTAL_LENGTH,
	cd: GEOM.centerDistance
};
function phaseAt(z) {
	const zz = (z % TOTAL_LENGTH + TOTAL_LENGTH) % TOTAL_LENGTH;
	for (let i = PHASES.length - 1; i >= 0; i--) {
		const p = PHASES[i];
		if (zz >= p.z0) return p;
	}
	return PHASES[0];
}
function twistSign(hand) {
	return hand === "R" ? -1 : 1;
}
function kneadSign(hand) {
	return hand === "F" ? -1 : 1;
}
var RADIAL = 18;
function stadiumProfile(radialSegs = RADIAL) {
	const n = radialSegs * 4;
	const out = new Float32Array(n * 2);
	let k = 0;
	const push = (x, y) => {
		out[k++] = x;
		out[k++] = y;
	};
	for (let i = 0; i < radialSegs; i++) {
		const t = Math.PI / 2 * (i / radialSegs);
		push(lobeOff + rRoot * Math.cos(t), rRoot * Math.sin(t));
	}
	for (let i = 0; i < radialSegs * 2; i++) {
		const t = Math.PI / 2 + Math.PI * (i / (radialSegs * 2));
		push(-lobeOff + rRoot * Math.cos(t), rRoot * Math.sin(t));
	}
	for (let i = 0; i < radialSegs; i++) {
		const t = 3 * Math.PI / 2 + Math.PI / 2 * (i / radialSegs);
		push(lobeOff + rRoot * Math.cos(t), rRoot * Math.sin(t));
	}
	return out;
}
var STADIUM = stadiumProfile();
function pointInStadium(px, py, pad = 0) {
	const dx = Math.max(-lobeOff, Math.min(lobeOff, px));
	return Math.hypot(px - dx, py) <= rRoot + pad;
}
function sweep(profile, x0, length, startAngle, twist, slices) {
	const n = profile.length / 2;
	const rings = slices + 1;
	const vertCount = rings * n + 2;
	const positions = new Float32Array(vertCount * 3);
	for (let i = 0; i < rings; i++) {
		const t = i / slices;
		const x = x0 + t * length;
		const ang = startAngle + t * twist;
		const c = Math.cos(ang);
		const s = Math.sin(ang);
		for (let j = 0; j < n; j++) {
			const px = profile[j * 2];
			const py = profile[j * 2 + 1];
			const rx = px * c - py * s;
			const ry = px * s + py * c;
			const idx = (i * n + j) * 3;
			positions[idx] = x;
			positions[idx + 1] = ry;
			positions[idx + 2] = -rx;
		}
	}
	const startCenter = rings * n;
	const endCenter = startCenter + 1;
	positions[startCenter * 3] = x0;
	positions[startCenter * 3 + 1] = 0;
	positions[startCenter * 3 + 2] = 0;
	positions[endCenter * 3] = x0 + length;
	positions[endCenter * 3 + 1] = 0;
	positions[endCenter * 3 + 2] = 0;
	const indices = [];
	for (let i = 0; i < slices; i++) for (let j = 0; j < n; j++) {
		const j2 = (j + 1) % n;
		const a = i * n + j;
		const b = i * n + j2;
		const c = (i + 1) * n + j;
		const d = (i + 1) * n + j2;
		indices.push(a, c, b, b, c, d);
	}
	for (let j = 0; j < n; j++) {
		const j2 = (j + 1) % n;
		indices.push(startCenter, j2, j);
		const e = slices * n;
		indices.push(endCenter, e + j, e + j2);
	}
	const geo = new BufferGeometry();
	geo.setAttribute("position", new BufferAttribute(positions, 3));
	geo.setIndex(indices);
	ensureOutward(geo);
	geo.computeVertexNormals();
	geo.computeBoundingBox();
	geo.computeBoundingSphere();
	return geo;
}
function ensureOutward(geo) {
	geo.computeVertexNormals();
	const pos = geo.getAttribute("position");
	const nrm = geo.getAttribute("normal");
	let best = 0;
	let bestR = -1;
	const count = pos.count;
	for (let i = 0; i < count; i++) {
		const y = pos.getY(i);
		const z = pos.getZ(i);
		const r = y * y + z * z;
		if (r > bestR) {
			bestR = r;
			best = i;
		}
	}
	const radialY = pos.getY(best);
	const radialZ = pos.getZ(best);
	if (nrm.getY(best) * radialY + nrm.getZ(best) * radialZ < 0) {
		const idx = geo.index;
		if (!idx) return;
		const arr = idx.array;
		for (let i = 0; i < arr.length; i += 3) {
			const t = arr[i];
			arr[i] = arr[i + 1];
			arr[i + 1] = t;
		}
		idx.needsUpdate = true;
	}
}
function mergeGeos(geos) {
	if (geos.length === 1) return geos[0];
	let vCount = 0;
	let iCount = 0;
	for (const g of geos) {
		vCount += g.getAttribute("position").count;
		iCount += g.index ? g.index.count : 0;
	}
	const positions = new Float32Array(vCount * 3);
	const indices = new Uint32Array(iCount);
	let vOff = 0;
	let iOff = 0;
	let vBase = 0;
	for (const g of geos) {
		const p = g.getAttribute("position");
		positions.set(p.array, vOff);
		const idx = g.index;
		if (idx) {
			const a = idx.array;
			for (let i = 0; i < a.length; i++) indices[iOff + i] = a[i] + vBase;
			iOff += a.length;
		}
		vBase += p.count;
		vOff += p.array.length;
		g.dispose();
	}
	const geo = new BufferGeometry();
	geo.setAttribute("position", new BufferAttribute(positions, 3));
	geo.setIndex(new BufferAttribute(indices, 1));
	ensureOutward(geo);
	geo.computeVertexNormals();
	geo.computeBoundingBox();
	geo.computeBoundingSphere();
	return geo;
}
function buildPhaseGeometry(phase) {
	const start = phase.startAngle * Math.PI / 180;
	if (phase.type === "convey") {
		const pitch = phase.pitch ?? phase.length;
		const twist = twistSign(phase.hand) * (phase.length / pitch) * Math.PI * 2;
		const slices = Math.max(20, Math.round(phase.length * 1.4));
		return sweep(STADIUM, phase.z0, phase.length, start, twist, slices);
	}
	const elements = phase.elements ?? 4;
	const h = phase.length / elements;
	const sign = kneadSign(phase.hand);
	const stagger = (phase.stagger ?? 45) * Math.PI / 180;
	const discs = [];
	for (let i = 0; i < elements; i++) {
		const ang = start + i * sign * stagger;
		discs.push(sweep(STADIUM, phase.z0 + i * h, h, ang, 0, 2));
	}
	return mergeGeos(discs);
}
var cache = null;
function getPhaseGeometries() {
	if (cache) return cache;
	const next = {};
	for (const phase of PHASES) next[phase.id] = buildPhaseGeometry(phase);
	cache = next;
	return next;
}
function makeSquareShaftGeometry() {
	const s = GEOM.squareShaftSide;
	const geo = new BoxGeometry(TOTAL_LENGTH + 8, s, s);
	geo.translate(TOTAL_LENGTH / 2, 0, 0);
	return geo;
}
function rotateStadium(angle, out = []) {
	const n = STADIUM.length / 2;
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	if (out.length !== n) {
		out.length = 0;
		for (let i = 0; i < n; i++) out.push({
			x: 0,
			y: 0
		});
	}
	for (let i = 0; i < n; i++) {
		const px = STADIUM[i * 2];
		const py = STADIUM[i * 2 + 1];
		const p = out[i];
		p.x = px * c - py * s;
		p.y = px * s + py * c;
	}
	return out;
}
var runtime = {
	angle: 0,
	rpm: 90,
	playing: true,
	meanResidence: 0,
	throughput: 0,
	particleCount: 0
};
var useSim = create((set, get) => ({
	playing: true,
	rpm: 90,
	viewMode: "pair",
	colorMode: "phase",
	isolatedPhase: null,
	hoveredPhase: null,
	exploded: false,
	showBarrel: false,
	showFlow: true,
	showShaft: true,
	clipMode: "off",
	clipPos: .55,
	cameraPreset: "iso",
	cameraTick: 0,
	mobilePanel: false,
	setPlaying: (playing) => {
		runtime.playing = playing;
		set({ playing });
	},
	setRpm: (rpm) => {
		runtime.rpm = rpm;
		set({ rpm });
	},
	setViewMode: (viewMode) => set({ viewMode }),
	setColorMode: (colorMode) => set({ colorMode }),
	setIsolated: (isolatedPhase) => set({ isolatedPhase }),
	setHovered: (hoveredPhase) => set({ hoveredPhase }),
	setExploded: (exploded) => set({ exploded }),
	setShowBarrel: (showBarrel) => set({ showBarrel }),
	setShowFlow: (showFlow) => set({ showFlow }),
	setShowShaft: (showShaft) => set({ showShaft }),
	setClipMode: (clipMode) => set({ clipMode }),
	setClipPos: (clipPos) => set({ clipPos }),
	setCamera: (cameraPreset) => set({
		cameraPreset,
		cameraTick: get().cameraTick + 1
	}),
	setMobilePanel: (mobilePanel) => set({ mobilePanel }),
	togglePhase: (id) => set({ isolatedPhase: get().isolatedPhase === id ? null : id })
}));
runtime.playing = true;
runtime.rpm = 90;
var bufA = [];
var bufB = [];
function SectionView() {
	const canvasRef = (0, import_react.useRef)(null);
	const viewMode = useSim((s) => s.viewMode);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		let raf = 0;
		const ptsA = bufA;
		const ptsB = bufB;
		const draw = () => {
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
				canvas.width = Math.round(w * dpr);
				canvas.height = Math.round(h * dpr);
			}
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			const scale = Math.min(w, h) / (GEOM.centerDistance + barrelRadius * 2 + 8);
			ctx.save();
			ctx.translate(w / 2, h / 2);
			ctx.scale(scale, -scale);
			const cd = GEOM.centerDistance;
			const c0 = viewMode === "pair" ? -cd / 2 : 0;
			const c1 = cd / 2;
			const angle = runtime.angle;
			ctx.strokeStyle = "rgba(154,164,178,0.35)";
			ctx.lineWidth = 1.1 / scale;
			ctx.beginPath();
			ctx.arc(c0, 0, barrelRadius, 0, Math.PI * 2);
			if (viewMode === "pair") ctx.arc(c1, 0, barrelRadius, 0, Math.PI * 2);
			ctx.stroke();
			ctx.fillStyle = "rgba(154,164,178,0.05)";
			ctx.beginPath();
			ctx.arc(c0, 0, barrelRadius, 0, Math.PI * 2);
			ctx.fill();
			if (viewMode === "pair") {
				ctx.beginPath();
				ctx.arc(c1, 0, barrelRadius, 0, Math.PI * 2);
				ctx.fill();
			}
			rotateStadium(angle, ptsA);
			drawScrew(ctx, c0, ptsA, "#d6dbe3", angle);
			if (viewMode === "pair") {
				rotateStadium(angle + Math.PI / 2, ptsB);
				drawScrew(ctx, c1, ptsB, "#9aa4b2", angle);
			}
			drawArrow(ctx, c0, angle, scale);
			if (viewMode === "pair") drawArrow(ctx, c1, angle, scale);
			ctx.restore();
			raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(raf);
	}, [viewMode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel overflow-hidden rounded-lg p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-center justify-between px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-medium tracking-wide text-muted uppercase",
					children: "Sección"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[10px] text-muted tabular",
					children: ["Ø ", GEOM.odNominal]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "block h-36 w-full md:h-40",
				"aria-label": "Sección transversal de los tornillos co-rotantes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-1 pt-1 text-[10px] leading-snug text-muted",
				children: "Ambos tornillos giran en el mismo sentido. Desfase 90°."
			})
		]
	});
}
function drawScrew(ctx, cx, pts, fill, _angle) {
	ctx.save();
	ctx.translate(cx, 0);
	ctx.beginPath();
	if (!pts.length) {
		ctx.restore();
		return;
	}
	ctx.moveTo(pts[0].x, pts[0].y);
	for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
	ctx.closePath();
	ctx.fillStyle = fill;
	ctx.globalAlpha = .88;
	ctx.fill();
	ctx.globalAlpha = 1;
	ctx.strokeStyle = "rgba(12,13,15,0.55)";
	ctx.lineWidth = .35;
	ctx.stroke();
	const s = GEOM.squareShaftSide / 2;
	ctx.fillStyle = "#0c0d0f";
	ctx.fillRect(-s, -s, s * 2, s * 2);
	ctx.strokeStyle = "rgba(214,219,227,0.45)";
	ctx.lineWidth = .25;
	ctx.strokeRect(-s, -s, s * 2, s * 2);
	ctx.restore();
}
function drawArrow(ctx, cx, angle, scale) {
	const r = rPeak + 2.4;
	ctx.save();
	ctx.translate(cx, 0);
	ctx.strokeStyle = "rgba(214,219,227,0.55)";
	ctx.lineWidth = 1.2 / scale;
	ctx.beginPath();
	const a0 = angle + .35;
	const a1 = angle + 1.15;
	ctx.arc(0, 0, r, a0, a1);
	ctx.stroke();
	const x = r * Math.cos(a1);
	const y = r * Math.sin(a1);
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x - 1.4 * Math.cos(a1 - .5), y - 1.4 * Math.sin(a1 - .5));
	ctx.lineTo(x - 1.4 * Math.cos(a1 + .9), y - 1.4 * Math.sin(a1 + .9));
	ctx.closePath();
	ctx.fillStyle = "rgba(214,219,227,0.7)";
	ctx.fill();
	ctx.restore();
}
function Overlay() {
	const mobilePanel = useSim((s) => s.mobilePanel);
	const setMobilePanel = useSim((s) => s.setMobilePanel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-10 flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { onOpen: () => setMobilePanel(true) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "pointer-events-none hidden w-72 shrink-0 flex-col gap-3 p-3 pt-0 lg:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-auto flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhasePanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecsCard, {})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-w-0 flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "pointer-events-none hidden w-56 shrink-0 flex-col gap-3 p-3 pt-0 md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionView, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsCard, {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomBar, {}),
			mobilePanel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto absolute inset-0 z-20 flex flex-col bg-background/92 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Controles"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "Cerrar",
						onClick: () => setMobilePanel(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-3 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionView, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhasePanel, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecsCard, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsCard, {})
					]
				})]
			}) : null
		]
	});
}
function TopBar({ onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "pointer-events-none flex items-start justify-between gap-3 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel pointer-events-auto max-w-full rounded-lg px-3.5 py-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] tracking-[0.18em] text-muted uppercase",
					children: "Co-rotante V2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg leading-tight font-semibold tracking-tight",
					children: "CoTwin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						MATERIAL.name,
						" · Ø ",
						MATERIAL.od,
						" mm · eje ",
						MATERIAL.shaft
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraButtons, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "icon",
				className: "lg:hidden",
				"aria-label": "Abrir controles",
				onClick: onOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {})
			})]
		})]
	});
}
function CameraButtons() {
	const preset = useSim((s) => s.cameraPreset);
	const setCamera = useSim((s) => s.setCamera);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel hidden items-center gap-0.5 rounded-lg p-1 sm:flex",
		children: [
			{
				id: "iso",
				label: "Iso"
			},
			{
				id: "side",
				label: "Perfil"
			},
			{
				id: "die",
				label: "Dado"
			},
			{
				id: "mesh",
				label: "Engrane"
			},
			{
				id: "top",
				label: "Planta"
			}
		].map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setCamera(it.id),
			className: cn("h-8 rounded-sm px-2.5 text-xs font-medium transition-colors duration-150", preset === it.id ? "bg-primary text-primary-foreground" : "text-muted hover:bg-secondary hover:text-foreground"),
			children: it.label
		}, it.id))
	});
}
function BottomBar() {
	const playing = useSim((s) => s.playing);
	const setPlaying = useSim((s) => s.setPlaying);
	const rpm = useSim((s) => s.rpm);
	const setRpm = useSim((s) => s.setRpm);
	const viewMode = useSim((s) => s.viewMode);
	const setViewMode = useSim((s) => s.setViewMode);
	const colorMode = useSim((s) => s.colorMode);
	const setColorMode = useSim((s) => s.setColorMode);
	const showFlow = useSim((s) => s.showFlow);
	const setShowFlow = useSim((s) => s.setShowFlow);
	const showBarrel = useSim((s) => s.showBarrel);
	const setShowBarrel = useSim((s) => s.setShowBarrel);
	const exploded = useSim((s) => s.exploded);
	const setExploded = useSim((s) => s.setExploded);
	const clipMode = useSim((s) => s.clipMode);
	const setClipMode = useSim((s) => s.setClipMode);
	const clipPos = useSim((s) => s.clipPos);
	const setClipPos = useSim((s) => s.setClipPos);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "pointer-events-none p-3 pt-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel pointer-events-auto flex flex-col gap-3 rounded-lg px-3 py-2.5 md:flex-row md:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "default",
						size: "icon-sm",
						className: "rounded-sm",
						"aria-label": playing ? "Pausar" : "Reproducir",
						onClick: () => setPlaying(!playing),
						children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 ml-px" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1 md:w-52 md:flex-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] tracking-wide text-muted uppercase",
								children: "RPM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tabular",
								children: rpm
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 0,
							max: 300,
							step: 5,
							value: [rpm],
							onValueChange: (v) => setRpm(v[0] ?? 0),
							"aria-label": "Velocidad de giro"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden h-8 w-px bg-border md:block" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seg, {
					value: viewMode,
					onChange: setViewMode,
					items: [{
						id: "pair",
						label: "Par"
					}, {
						id: "single",
						label: "Simple"
					}]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seg, {
					value: colorMode,
					onChange: setColorMode,
					items: [
						{
							id: "phase",
							label: "Fases"
						},
						{
							id: "zone",
							label: "Zonas"
						},
						{
							id: "metal",
							label: "Metal"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconToggle, {
							pressed: showFlow,
							onPressed: () => setShowFlow(!showFlow),
							label: "Flujo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconToggle, {
							pressed: showBarrel,
							onPressed: () => setShowBarrel(!showBarrel),
							label: "Cañón",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconToggle, {
							pressed: exploded,
							onPressed: () => setExploded(!exploded),
							label: "Explotado",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconToggle, {
							pressed: clipMode !== "off",
							onPressed: () => setClipMode(nextClip(clipMode)),
							label: clipLabel(clipMode),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scan, { className: "size-3.5" })
						})
					]
				}),
				clipMode === "axial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 md:w-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: .05,
						max: .98,
						step: .01,
						value: [clipPos],
						onValueChange: (v) => setClipPos(v[0] ?? .5),
						"aria-label": "Posición de corte axial"
					})
				}) : null
			]
		})
	});
}
function nextClip(mode) {
	if (mode === "off") return "long";
	if (mode === "long") return "axial";
	return "off";
}
function clipLabel(mode) {
	if (mode === "long") return "Corte Y";
	if (mode === "axial") return "Corte X";
	return "Corte";
}
function Seg({ value, onChange, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex rounded-sm bg-secondary p-0.5",
		children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(it.id),
			className: cn("h-8 rounded-sm px-2.5 text-xs font-medium transition-colors duration-150", value === it.id ? "bg-primary text-primary-foreground" : "text-muted hover:text-foreground"),
			children: it.label
		}, it.id))
	});
}
function IconToggle({ pressed, onPressed, label, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onPressed,
		className: cn("inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-xs font-medium transition-colors duration-150", pressed ? "bg-primary text-primary-foreground" : "bg-secondary text-muted hover:text-foreground"),
		children: [icon, label]
	});
}
function PhasePanel() {
	const isolated = useSim((s) => s.isolatedPhase);
	const hovered = useSim((s) => s.hoveredPhase);
	const toggle = useSim((s) => s.togglePhase);
	const setHovered = useSim((s) => s.setHovered);
	const active = PHASES.find((p) => p.id === (hovered ?? isolated));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel rounded-lg p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "16 fases"
				}), isolated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-[11px] text-brand hover:text-foreground",
					onClick: () => toggle(isolated),
					children: "Ver todas"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-1 gap-0.5",
				children: PHASES.map((p) => {
					const on = isolated === p.id || hovered === p.id;
					const dim = isolated !== null && isolated !== p.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggle(p.id),
						onMouseEnter: () => setHovered(p.id),
						onMouseLeave: () => setHovered(null),
						className: cn("flex w-full items-center gap-2 rounded-sm px-1.5 py-1 text-left transition-colors duration-150", on ? "bg-secondary" : "hover:bg-secondary/70", dim && "opacity-40"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2.5 shrink-0 rounded-full",
								style: { background: p.color }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] tabular",
								children: p.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate text-[11px] text-muted",
								children: p.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-muted tabular",
								children: p.length.toFixed(1)
							})
						]
					}) }, p.id);
				})
			}),
			active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseDetail, { phase: active }) : null
		]
	});
}
function PhaseDetail({ phase }) {
	const zone = ZONE_META[phase.zone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 border-t border-border pt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium",
			children: phase.label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-[11px] text-muted",
			children: [
				zone.name,
				" · ",
				phase.type === "convey" ? "transporte" : "amasado",
				" · mano ",
				phase.hand,
				phase.pitch ? ` · paso ${phase.pitch} mm` : null,
				phase.elements ? ` · ${phase.elements} × ${phase.stagger}°` : null
			]
		})]
	});
}
function SpecsCard() {
	const showShaft = useSim((s) => s.showShaft);
	const setShowShaft = useSim((s) => s.setShowShaft);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel rounded-lg p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-medium tracking-wide text-muted uppercase",
				children: "Geometría"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 font-mono text-[11px] tabular",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Longitud"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [TOTAL_LENGTH.toFixed(2), " mm"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "OD nominal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [MATERIAL.od, " mm"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Dist. ejes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [MATERIAL.cd, " mm"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Eje"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: MATERIAL.shaft }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Material"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: MATERIAL.name })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex items-center justify-between gap-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Eje cuadrado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: showShaft,
					onCheckedChange: setShowShaft
				})]
			})
		]
	});
}
function StatsCard() {
	const [, bump] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => bump((n) => n + 1), 400);
		return () => window.clearInterval(id);
	}, []);
	const deg = runtime.angle * 180 / Math.PI % 360;
	const ph = phaseAt(Math.min(TOTAL_LENGTH, Math.max(0, runtime.meanResidence / 18 * TOTAL_LENGTH)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel pointer-events-auto rounded-lg p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-xs font-medium tracking-wide text-muted uppercase",
			children: "Proceso"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 font-mono text-[11px] tabular",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: "Ángulo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [deg.toFixed(0), "°"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: "Residencia"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [runtime.meanResidence.toFixed(1), " s"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: "Avance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [runtime.throughput.toFixed(0), " mm/min"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: "Frente"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: ph.id })
			]
		})]
	});
}
function BootScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 flex flex-col bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] tracking-[0.18em] text-muted uppercase",
					children: "Co-rotante V2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-semibold tracking-tight",
					children: "CoTwin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-sm text-sm text-muted",
					children: "Generando el perfil bilobal y las 16 fases del tornillo extrusor."
				})
			]
		})
	});
}
var COUNT = 260;
var particles = [];
var dummy = { inited: false };
function spawn(p, atFeed) {
	p.screw = Math.random() < .5 ? 0 : 1;
	p.x = atFeed ? Math.random() * 6 : Math.random() * TOTAL_LENGTH;
	p.age = atFeed ? 0 : Math.random() * 12;
	for (let n = 0; n < 24; n++) {
		const theta = Math.random() * Math.PI * 2;
		const r = rRoot + .4 + Math.random() * (barrelRadius - rRoot - .7);
		if (!pointInStadium(r * Math.cos(theta), r * Math.sin(theta), .15)) {
			p.theta = theta;
			p.r = r;
			return;
		}
	}
	p.theta = Math.PI / 2 + (Math.random() - .5) * .4;
	p.r = (rRoot + barrelRadius) * .5;
}
function initFlow() {
	if (dummy.inited) return particles;
	dummy.inited = true;
	for (let i = 0; i < COUNT; i++) {
		const p = {
			x: 0,
			screw: 0,
			theta: 0,
			r: 8,
			age: 0
		};
		spawn(p, false);
		particles.push(p);
	}
	runtime.particleCount = COUNT;
	return particles;
}
function getParticles() {
	if (!dummy.inited) initFlow();
	return particles;
}
function axialSpeed(x, rpm) {
	const p = phaseAt(x);
	const rev = rpm / 60;
	if (p.type === "convey") {
		const pitch = p.pitch ?? p.length;
		if (p.hand === "L") return rev * pitch * -.35;
		return rev * pitch * .82;
	}
	if (p.hand === "F") return rev * 9;
	if (p.hand === "N") return rev * 3.5;
	return rev * -2.5;
}
function tickFlow(dt, rpm, angle) {
	if (!dummy.inited) initFlow();
	const dAngle = rpm / 60 * Math.PI * 2 * dt;
	let ageSum = 0;
	let fwd = 0;
	for (const p of particles) {
		const phase = phaseAt(p.x);
		const drag = phase.type === "knead" ? .35 : .72;
		p.theta += dAngle * drag;
		if (phase.type === "knead") {
			p.theta += (Math.random() - .5) * 1.8 * dt;
			p.r += (Math.random() - .5) * 4 * dt;
		}
		const vz = axialSpeed(p.x, rpm);
		p.x += vz * dt;
		fwd += Math.max(0, vz);
		p.age += dt;
		if (p.x > TOTAL_LENGTH) {
			spawn(p, true);
			continue;
		}
		if (p.x < 0) p.x = .2;
		const a = angle + (p.screw === 1 ? Math.PI / 2 : 0);
		const wx = p.r * Math.cos(p.theta);
		const wy = p.r * Math.sin(p.theta);
		const c = Math.cos(-a);
		const s = Math.sin(-a);
		if (pointInStadium(wx * c - wy * s, wx * s + wy * c, .05)) p.r = Math.min(barrelRadius - .35, p.r + .55);
		if (p.r > barrelRadius - .25) p.r = barrelRadius - .25;
		if (p.r < rRoot + .3) p.r = rRoot + .3;
		if (phase.type === "knead" && Math.random() < .015) p.screw = p.screw === 0 ? 1 : 0;
		ageSum += p.age;
	}
	runtime.meanResidence = ageSum / particles.length;
	runtime.throughput = fwd / particles.length * 60;
}
function particleWorld(p, out) {
	const center = p.screw === 0 ? -GEOM.centerDistance / 2 : GEOM.centerDistance / 2;
	const sx = p.r * Math.cos(p.theta);
	const sy = p.r * Math.sin(p.theta);
	out.x = p.x;
	out.y = sy;
	out.z = -(sx + center);
}
var L = TOTAL_LENGTH;
var CD = GEOM.centerDistance;
var clipPlanes = {
	long: new Plane(new Vector3(0, -1, 0), 0),
	axial: new Plane(new Vector3(-1, 0, 0), L * .55)
};
var _p = {
	x: 0,
	y: 0,
	z: 0
};
var _m = new Matrix4();
var _q = new Quaternion();
var _s = new Vector3(1, 1, 1);
var _c = new Color();
var _pos = new Vector3();
function Scene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#0c0d0f"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#c8cdd4",
			"#1a1814",
			.45
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .28 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				180,
				220,
				140
			],
			intensity: 1.35
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-120,
				40,
				-90
			],
			intensity: .28
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			makeDefault: true,
			enableDamping: true,
			dampingFactor: .08,
			target: [
				L * .48,
				0,
				0
			],
			minDistance: 40,
			maxDistance: 980,
			maxPolarAngle: Math.PI * .92
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipSync, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				0,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwinScrews, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Barrel, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowPoints, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, {})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
			position: [
				L * .5,
				-barrelRadius - 14,
				0
			],
			args: [40, 40],
			cellSize: 10,
			cellThickness: .6,
			cellColor: "#2a2c31",
			sectionSize: 50,
			sectionThickness: 1.1,
			sectionColor: "#3a3d44",
			fadeDistance: 720,
			fadeFrom: 1,
			infiniteGrid: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				L * .5,
				-barrelRadius - 13.6,
				0
			],
			opacity: .42,
			scale: 700,
			blur: 2.4,
			far: 80
		})
	] });
}
function CameraRig() {
	const { camera, controls } = useThree();
	const preset = useSim((s) => s.cameraPreset);
	const tick = useSim((s) => s.cameraTick);
	(0, import_react.useEffect)(() => {
		const target = new Vector3(L * .48, 0, 0);
		const map = {
			iso: new Vector3(L * .12, 108, 198),
			die: new Vector3(L + 155, 28, 58),
			side: new Vector3(L * .5, 18, 215),
			top: new Vector3(L * .5, 270, 6),
			mesh: new Vector3(-150, 22, 42)
		};
		const pos = map[preset] ?? map.iso;
		camera.position.copy(pos);
		camera.lookAt(target);
		const oc = controls;
		if (oc?.target) {
			oc.target.copy(target);
			oc.update();
		}
	}, [
		preset,
		tick,
		camera,
		controls
	]);
	return null;
}
function ClipSync() {
	const { gl } = useThree();
	const clipMode = useSim((s) => s.clipMode);
	const clipPos = useSim((s) => s.clipPos);
	(0, import_react.useEffect)(() => {
		gl.localClippingEnabled = clipMode !== "off";
	}, [gl, clipMode]);
	(0, import_react.useEffect)(() => {
		clipPlanes.axial.constant = L * clipPos;
	}, [clipPos]);
	return null;
}
function activePlanes(clipMode) {
	if (clipMode === "long") return [clipPlanes.long];
	if (clipMode === "axial") return [clipPlanes.axial];
	return [];
}
function TwinScrews() {
	const geos = (0, import_react.useMemo)(() => getPhaseGeometries(), []);
	const shaftGeo = (0, import_react.useMemo)(() => makeSquareShaftGeometry(), []);
	const viewMode = useSim((s) => s.viewMode);
	const colorMode = useSim((s) => s.colorMode);
	const isolated = useSim((s) => s.isolatedPhase);
	const hovered = useSim((s) => s.hoveredPhase);
	const exploded = useSim((s) => s.exploded);
	const showShaft = useSim((s) => s.showShaft);
	const clipMode = useSim((s) => s.clipMode);
	const g0 = (0, import_react.useRef)(null);
	const g1 = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		const d = Math.min(delta, .1);
		if (runtime.playing) runtime.angle += runtime.rpm / 60 * Math.PI * 2 * d;
		const a = runtime.angle;
		if (g0.current) g0.current.rotation.x = a;
		if (g1.current) g1.current.rotation.x = a + Math.PI / 2;
	});
	const planes = activePlanes(clipMode);
	const pair = viewMode === "pair";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: g0,
		position: [
			0,
			0,
			pair ? CD / 2 : 0
		],
		children: [PHASES.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseMesh, {
			phase: p,
			index: i,
			geo: geos[p.id],
			colorMode,
			isolated,
			hovered,
			exploded,
			planes
		}, p.id)), showShaft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: shaftGeo,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1a1b1e",
				metalness: .7,
				roughness: .35,
				clippingPlanes: planes,
				clipShadows: true
			})
		}) : null]
	}), pair ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: g1,
		position: [
			0,
			0,
			-CD / 2
		],
		children: [PHASES.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseMesh, {
			phase: p,
			index: i,
			geo: geos[p.id],
			colorMode,
			isolated,
			hovered,
			exploded,
			planes
		}, `b-${p.id}`)), showShaft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: shaftGeo,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1a1b1e",
				metalness: .7,
				roughness: .35,
				clippingPlanes: planes,
				clipShadows: true
			})
		}) : null]
	}) : null] });
}
function PhaseMesh({ phase, index, geo, colorMode, isolated, hovered, exploded, planes }) {
	const toggle = useSim((s) => s.togglePhase);
	const setHovered = useSim((s) => s.setHovered);
	const dim = isolated !== null && isolated !== phase.id;
	const hot = hovered === phase.id || isolated === phase.id;
	let color = phase.color;
	if (colorMode === "zone") color = ZONE_META[phase.zone].color;
	if (colorMode === "metal") color = "#8d9299";
	const xOff = exploded ? index * 16 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geo,
		dispose: null,
		position: [
			xOff,
			0,
			0
		],
		onClick: (e) => {
			e.stopPropagation();
			toggle(phase.id);
		},
		onPointerOver: (e) => {
			e.stopPropagation();
			setHovered(phase.id);
			document.body.style.cursor = "pointer";
		},
		onPointerOut: () => {
			setHovered(null);
			document.body.style.cursor = "auto";
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			metalness: colorMode === "metal" ? .82 : .38,
			roughness: colorMode === "metal" ? .28 : .42,
			transparent: dim,
			opacity: dim ? .1 : 1,
			emissive: hot && !dim ? color : "#000000",
			emissiveIntensity: hot && !dim ? .18 : 0,
			clippingPlanes: planes,
			depthWrite: !dim
		})
	});
}
function Barrel() {
	const show = useSim((s) => s.showBarrel);
	const viewMode = useSim((s) => s.viewMode);
	const planes = activePlanes(useSim((s) => s.clipMode));
	if (!show) return null;
	const r = barrelRadius + .15;
	const pair = viewMode === "pair";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			L / 2,
			0,
			pair ? CD / 2 : 0
		],
		rotation: [
			0,
			0,
			Math.PI / 2
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			r,
			r,
			L,
			64,
			1,
			true
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#9aa4b2",
			metalness: .7,
			roughness: .25,
			transparent: true,
			opacity: .14,
			side: 2,
			depthWrite: false,
			clippingPlanes: planes
		})]
	}), pair ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			L / 2,
			0,
			-CD / 2
		],
		rotation: [
			0,
			0,
			Math.PI / 2
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			r,
			r,
			L,
			64,
			1,
			true
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#9aa4b2",
			metalness: .7,
			roughness: .25,
			transparent: true,
			opacity: .14,
			side: 2,
			depthWrite: false,
			clippingPlanes: planes
		})]
	}) : null] });
}
function FlowPoints() {
	const show = useSim((s) => s.showFlow);
	const clipMode = useSim((s) => s.clipMode);
	const meshRef = (0, import_react.useRef)(null);
	const viewMode = useSim((s) => s.viewMode);
	(0, import_react.useEffect)(() => {
		initFlow();
	}, []);
	const mat = (0, import_react.useMemo)(() => {
		return new MeshStandardMaterial({
			metalness: .05,
			roughness: .55,
			vertexColors: true,
			clippingPlanes: activePlanes(clipMode)
		});
	}, [clipMode]);
	(0, import_react.useEffect)(() => {
		return () => {
			mat.dispose();
		};
	}, [mat]);
	useFrame((_, delta) => {
		const mesh = meshRef.current;
		if (!mesh || !show) return;
		tickFlow(Math.min(delta, .1), runtime.rpm, runtime.angle);
		const list = getParticles();
		const pair = viewMode === "pair";
		for (let i = 0; i < list.length; i++) {
			const p = list[i];
			if (!pair && p.screw === 1) {
				_s.set(0, 0, 0);
				_m.compose(_pos.set(0, -99, 0), _q, _s);
				mesh.setMatrixAt(i, _m);
				continue;
			}
			particleWorld(p, _p);
			_pos.set(_p.x, _p.y, _p.z);
			_s.set(1, 1, 1);
			_m.compose(_pos, _q, _s);
			mesh.setMatrixAt(i, _m);
			const t = Math.min(1, p.age / 14);
			_c.setRGB(.85 - t * .2, .55 - t * .35, .28 + t * .05);
			mesh.setColorAt(i, _c);
		}
		mesh.instanceMatrix.needsUpdate = true;
		if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
	});
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
		ref: meshRef,
		args: [
			void 0,
			void 0,
			260
		],
		material: mat,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1.15,
			8,
			8
		] })
	});
}
function Ruler() {
	const marks = (0, import_react.useMemo)(() => {
		const m = [];
		for (let x = 0; x <= L + .1; x += 50) m.push(Math.min(x, L));
		return m;
	}, []);
	const y = -barrelRadius - 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			L / 2,
			y,
			CD / 2 + 18
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			L,
			.35,
			.35
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#4b4e55" })]
	}), marks.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			x,
			y,
			CD / 2 + 18
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.35,
			3.2,
			.35
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#6a6e76" })]
	}, x))] });
}
function ExtruderCanvas() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		className: "absolute inset-0 touch-none",
		camera: {
			position: [
				TOTAL_LENGTH * .12,
				108,
				198
			],
			fov: 40,
			near: .4,
			far: 5e3
		},
		dpr: [1, 1.75],
		gl: {
			antialias: true,
			localClippingEnabled: true,
			alpha: false
		},
		onCreated: ({ camera, gl }) => {
			gl.setClearColor("#0c0d0f");
			camera.lookAt(TOTAL_LENGTH * .48, 0, 0);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
	});
}
function Home() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "relative h-dvh overflow-hidden bg-background text-foreground",
		children: mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtruderCanvas, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {})
	});
}
//#endregion
export { Home as component };
