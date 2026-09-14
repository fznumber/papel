import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Vector3, a as Html, d as Color, f as ExtrudeGeometry, g as Vector2, h as Shape, i as Line, l as BufferAttribute, m as Quaternion, n as Grid, o as Canvas, p as Path, r as OrbitControls, s as useFrame, t as ContactShadows, u as BufferGeometry } from "../_libs/@react-three/drei+[...].mjs";
import { a as KNEAD_PEAK, c as BEARINGS, d as SCREW, f as SPEC, g as meshAngle, h as housingSize, i as PART_COLOR, l as GEARS, m as computeDrive, n as useStudio, o as computeGearLoads, p as Z, r as cn, s as ANGLES, u as POS } from "./routes-DxqkKwxV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DriveCanvas-CHbuHvJL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function involuteT(radius, baseR) {
	const r = Math.max(radius, baseR + 1e-6);
	return Math.sqrt((r / baseR) ** 2 - 1);
}
function involutePoint(baseR, t) {
	return new Vector2(baseR * (Math.cos(t) + t * Math.sin(t)), baseR * (Math.sin(t) - t * Math.cos(t)));
}
function rot2(p, ang) {
	const c = Math.cos(ang);
	const s = Math.sin(ang);
	return new Vector2(p.x * c - p.y * s, p.x * s + p.y * c);
}
function buildGearShape(teeth, module, pressureAngle = 20, backlash = .18) {
	const pitchR = teeth * module / 2;
	const outR = pitchR + module;
	const rootR = Math.max(pitchR - 1.25 * module, pitchR * .45);
	const baseR = pitchR * Math.cos(pressureAngle * Math.PI / 180);
	const tOut = involuteT(outR, baseR);
	const pitchPt = involutePoint(baseR, involuteT(Math.max(pitchR, baseR), baseR));
	const pitchAng = Math.atan2(pitchPt.y, pitchPt.x);
	const halfTooth = Math.PI / teeth / 2 - backlash / (2 * pitchR);
	const rotateToPitch = halfTooth - pitchAng;
	const pts = [];
	const steps = 6;
	for (let i = 0; i < teeth; i++) {
		const center = i / teeth * Math.PI * 2;
		const leftInv = [];
		const rightInv = [];
		for (let s = 0; s <= steps; s++) {
			const t = tOut * s / steps;
			const p = involutePoint(baseR, Math.max(t, .02));
			leftInv.push(rot2(p, center - rotateToPitch));
			rightInv.push(rot2(new Vector2(p.x, -p.y), center + rotateToPitch));
		}
		pts.push(new Vector2(rootR * Math.cos(center - halfTooth * 1.15), rootR * Math.sin(center - halfTooth * 1.15)));
		for (const p of leftInv) pts.push(p);
		for (let s = rightInv.length - 1; s >= 0; s--) pts.push(rightInv[s]);
		pts.push(new Vector2(rootR * Math.cos(center + halfTooth * 1.15), rootR * Math.sin(center + halfTooth * 1.15)));
	}
	const shape = new Shape();
	const first = pts[0];
	shape.moveTo(first.x, first.y);
	for (let i = 1; i < pts.length; i++) {
		const p = pts[i];
		shape.lineTo(p.x, p.y);
	}
	shape.closePath();
	const bore = Math.max(3.2, pitchR * .28);
	const hole = new Path();
	hole.absarc(0, 0, bore, 0, Math.PI * 2, true);
	shape.holes.push(hole);
	return shape;
}
var gearCache = /* @__PURE__ */ new Map();
function getGearGeometry(teeth, module, thickness) {
	const key = `${teeth}:${module}:${thickness}`;
	const hit = gearCache.get(key);
	if (hit) return hit;
	const shape = buildGearShape(teeth, module);
	const geo = new ExtrudeGeometry(shape, {
		depth: thickness,
		bevelEnabled: true,
		bevelThickness: .35,
		bevelSize: .28,
		bevelSegments: 1,
		curveSegments: 1
	});
	geo.translate(0, 0, -thickness / 2);
	geo.computeVertexNormals();
	gearCache.set(key, geo);
	return geo;
}
function createBilobeScrewGeometry(opts) {
	const { length, doOuter, diInner, pitch } = opts;
	const radial = opts.radial ?? 48;
	const tubular = opts.tubular ?? 64;
	const r0 = (doOuter + diInner) / 4;
	const amp = (doOuter - diInner) / 4;
	const positions = new Float32Array((tubular + 1) * (radial + 1) * 3);
	const normals = new Float32Array(positions.length);
	for (let i = 0; i <= tubular; i++) {
		const z = i / tubular * length;
		const helix = 2 * Math.PI * z / pitch;
		for (let j = 0; j <= radial; j++) {
			const a = j / radial * Math.PI * 2;
			const r = r0 + amp * Math.cos(2 * a);
			const ang = a + helix;
			const idx = (i * (radial + 1) + j) * 3;
			positions[idx] = r * Math.cos(ang);
			positions[idx + 1] = r * Math.sin(ang);
			positions[idx + 2] = z;
		}
	}
	const indices = [];
	const cols = radial + 1;
	for (let i = 0; i < tubular; i++) for (let j = 0; j < radial; j++) {
		const a = i * cols + j;
		const b = a + cols;
		indices.push(a, b, a + 1, a + 1, b, b + 1);
	}
	const geo = new BufferGeometry();
	geo.setAttribute("position", new BufferAttribute(positions, 3));
	geo.setIndex(indices);
	const pos = geo.attributes.position;
	const acc = Array.from({ length: pos.count }, () => new Vector3());
	const tmpA = new Vector3();
	const tmpB = new Vector3();
	const tmpC = new Vector3();
	for (let i = 0; i < indices.length; i += 3) {
		const ia = indices[i];
		const ib = indices[i + 1];
		const ic = indices[i + 2];
		tmpA.fromBufferAttribute(pos, ia);
		tmpB.fromBufferAttribute(pos, ib);
		tmpC.fromBufferAttribute(pos, ic);
		tmpB.sub(tmpA);
		tmpC.sub(tmpA);
		tmpB.cross(tmpC);
		acc[ia].add(tmpB);
		acc[ib].add(tmpB);
		acc[ic].add(tmpB);
	}
	for (let i = 0; i < pos.count; i++) {
		const n = acc[i].normalize();
		normals[i * 3] = n.x;
		normals[i * 3 + 1] = n.y;
		normals[i * 3 + 2] = n.z;
	}
	geo.setAttribute("normal", new BufferAttribute(normals, 3));
	return geo;
}
var HIGHLIGHT = "#f2efe6";
function dimHex(base) {
	const c = new Color(base);
	c.lerp(new Color("#14161a"), .58);
	return `#${c.getHexString()}`;
}
function useSelect(id) {
	const selectedId = useStudio((s) => s.selectedId);
	const setSelectedId = useStudio((s) => s.setSelectedId);
	const selected = selectedId === id;
	const dim = selectedId !== null && !selected;
	return {
		selected,
		bind: { onClick: (e) => {
			e.stopPropagation();
			setSelectedId(selected ? null : id);
		} },
		color: (base) => selected ? HIGHLIGHT : dim ? dimHex(base) : base
	};
}
function tint(base, heat = 0) {
	const h = Number.isFinite(heat) ? Math.max(0, Math.min(1, heat)) : 0;
	if (h <= .02) return base;
	const c = new Color(base);
	c.lerp(new Color("#b07070"), h);
	if (!Number.isFinite(c.r) || !Number.isFinite(c.g) || !Number.isFinite(c.b)) return base;
	return `#${c.getHexString()}`;
}
function GearMesh({ teeth, module, face, color, metalness = .12, roughness = .5, id, heat = 0 }) {
	const geo = (0, import_react.useMemo)(() => getGearGeometry(teeth, module, face), [
		teeth,
		module,
		face
	]);
	const sel = useSelect(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geo,
		castShadow: true,
		receiveShadow: true,
		...sel.bind,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: sel.color(tint(color, heat)),
			metalness,
			roughness
		})
	});
}
function Bearing({ inner, outer, width, color }) {
	const sel = useSelect("radial-6001");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		...sel.bind,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			outer / 2,
			outer / 2,
			width,
			24
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: sel.color(color),
			metalness: .75,
			roughness: .28
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			inner / 2 + .4,
			inner / 2 + .4,
			width + .2,
			20
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#1a1c20",
			metalness: .4,
			roughness: .6
		})] })]
	});
}
function ThrustBearing() {
	const t = BEARINGS.thrust;
	const sel = useSelect("thrust-51102");
	const c = sel.color(PART_COLOR["thrust-51102"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		rotation: [
			Math.PI / 2,
			0,
			0
		],
		...sel.bind,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-t.T / 2 + 1,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					t.D / 2,
					t.D / 2,
					1.4,
					28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: c,
					metalness: .7,
					roughness: .22
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					t.T / 2 - 1,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					t.D / 2,
					t.D / 2,
					1.4,
					28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: c,
					metalness: .7,
					roughness: .22
				})]
			}),
			Array.from({ length: 10 }, (_, i) => {
				const a = i / 10 * Math.PI * 2;
				const r = (t.d + t.D) / 4;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						Math.cos(a) * r,
						0,
						Math.sin(a) * r
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						1.15,
						10,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#e4d5c4",
						metalness: .9,
						roughness: .12
					})]
				}, i);
			})
		]
	});
}
function AdapterShaft() {
	const sel = useSelect("adapter");
	const c = sel.color(PART_COLOR.adapter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		...sel.bind,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					-9
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					SPEC.shaftSquare,
					SPEC.shaftSquare,
					18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: c,
					metalness: .55,
					roughness: .32
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					8
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					7.5,
					7.5,
					10,
					20
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: c,
					metalness: .6,
					roughness: .28
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					58
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					6,
					6,
					88,
					18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: c,
					metalness: .58,
					roughness: .34
				})]
			})
		]
	});
}
function DriveTrain() {
	const explode = useStudio((s) => s.explode);
	const housingOpacity = useStudio((s) => s.housingOpacity);
	const showScrews = useStudio((s) => s.showScrews);
	const showForces = useStudio((s) => s.showForces);
	const showDimensions = useStudio((s) => s.showDimensions);
	const playing = useStudio((s) => s.playing);
	const motorId = useStudio((s) => s.motorId);
	const preId = useStudio((s) => s.preId);
	const loadPct = useStudio((s) => s.loadPct);
	const cmpSteel = useStudio((s) => s.cmpSteel);
	const knead = useStudio((s) => s.knead);
	const setSelectedId = useStudio((s) => s.setSelectedId);
	const drive = computeDrive(motorId, preId);
	const loads = (0, import_react.useMemo)(() => computeGearLoads(motorId, preId, loadPct / 100, {
		cmpPinionMat: cmpSteel ? "steel" : "petg",
		dutyPeak: knead ? KNEAD_PEAK : 1
	}), [
		motorId,
		preId,
		loadPct,
		cmpSteel,
		knead
	]);
	const inputRef = (0, import_react.useRef)(null);
	const cmpLRef = (0, import_react.useRef)(null);
	const cmpRRef = (0, import_react.useRef)(null);
	const outLRef = (0, import_react.useRef)(null);
	const outRRef = (0, import_react.useRef)(null);
	const angle = (0, import_react.useRef)(0);
	useFrame((_, dt) => {
		const d = Math.min(dt, .1);
		if (playing) {
			const omegaOut = (drive.screwRpmRated || 80) / 60 * Math.PI * 2;
			angle.current += omegaOut * 6 * d;
		}
		const a = angle.current;
		if (inputRef.current) inputRef.current.rotation.z = a;
		if (cmpLRef.current) cmpLRef.current.rotation.z = meshAngle(a, GEARS.input.z, GEARS.crown.z, ANGLES.inToCmpL);
		if (cmpRRef.current) cmpRRef.current.rotation.z = meshAngle(a, GEARS.input.z, GEARS.crown.z, ANGLES.inToCmpR);
		if (outLRef.current && cmpLRef.current) outLRef.current.rotation.z = meshAngle(cmpLRef.current.rotation.z, GEARS.cmpPinion.z, GEARS.output.z, ANGLES.cmpLToOutL);
		if (outRRef.current && cmpRRef.current) outRRef.current.rotation.z = meshAngle(cmpRRef.current.rotation.z, GEARS.cmpPinion.z, GEARS.output.z, ANGLES.cmpRToOutR) + Math.PI / 2;
	});
	const e = explode;
	const hs = housingSize();
	const screwGeo = (0, import_react.useMemo)(() => createBilobeScrewGeometry({
		length: SCREW.length,
		doOuter: SCREW.doOuter,
		diInner: SCREW.diInner,
		pitch: SCREW.pitch
	}), []);
	const housingSel = useSelect("housing");
	const plateSel = useSelect("thrust-plate");
	const motorSel = useSelect(motorId === "dc775_12" ? "motor-775" : "motor-nema");
	const screwSel = useSelect("square-rod");
	const couplingSel = useSelect("coupling");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			8,
			-Z.distribution / 2
		],
		onClick: () => setSelectedId(null),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					hs.height * .28 + e * 42,
					Z.distribution / 2
				],
				...housingSel.bind,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					hs.width * .92,
					10,
					hs.depth * .72
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: housingSel.color(PART_COLOR.housing),
					transparent: true,
					opacity: Math.max(housingOpacity, .18),
					roughness: .62,
					metalness: .08,
					depthWrite: housingOpacity > .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-hs.height * .22 - e * 28,
					Z.distribution / 2
				],
				...housingSel.bind,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					hs.width * .92,
					12,
					hs.depth * .72
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: housingSel.color(PART_COLOR.housing),
					transparent: true,
					opacity: Math.max(housingOpacity, .22),
					roughness: .62,
					metalness: .08,
					depthWrite: housingOpacity > .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					Z.thrustPlate - e * 18
				],
				...plateSel.bind,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					72,
					48,
					3
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: plateSel.color(PART_COLOR["thrust-plate"]),
					metalness: .9,
					roughness: .22
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					POS.outL.x,
					POS.outL.y,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							0,
							Z.thrustBearing
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThrustBearing, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							0,
							Z.frontRadial
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bearing, {
							inner: BEARINGS.radial.d,
							outer: BEARINGS.radial.D,
							width: BEARINGS.radial.B,
							color: PART_COLOR["radial-6001"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							0,
							Z.rearRadial
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bearing, {
							inner: BEARINGS.radial.d,
							outer: BEARINGS.radial.D,
							width: BEARINGS.radial.B,
							color: PART_COLOR["radial-6001"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: outLRef,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
								position: [
									0,
									0,
									Z.outputGearL
								],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearMesh, {
									id: "gear-out-steel",
									teeth: GEARS.output.z,
									module: GEARS.output.m,
									face: GEARS.output.face,
									color: PART_COLOR["gear-out-steel"],
									metalness: .55,
									roughness: .32,
									heat: showForces ? loads.heat["gear-out-L"] : 0
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdapterShaft, {}),
							showScrews ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: screwGeo,
								position: [
									0,
									0,
									Z.thrustPlate - SCREW.length - e * 36
								],
								...screwSel.bind,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: screwSel.color(PART_COLOR["square-rod"]),
									metalness: .35,
									roughness: .42
								})
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					POS.outR.x,
					POS.outR.y,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							0,
							Z.thrustBearing
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThrustBearing, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							0,
							Z.frontRadial
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bearing, {
							inner: BEARINGS.radial.d,
							outer: BEARINGS.radial.D,
							width: BEARINGS.radial.B,
							color: PART_COLOR["radial-6001"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							0,
							Z.rearRadial
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bearing, {
							inner: BEARINGS.radial.d,
							outer: BEARINGS.radial.D,
							width: BEARINGS.radial.B,
							color: PART_COLOR["radial-6001"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: outRRef,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
								position: [
									0,
									0,
									Z.outputGearR
								],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearMesh, {
									id: "gear-out-steel",
									teeth: GEARS.output.z,
									module: GEARS.output.m,
									face: GEARS.output.face,
									color: PART_COLOR["gear-out-steel"],
									metalness: .5,
									roughness: .34,
									heat: showForces ? loads.heat["gear-out-R"] : 0
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdapterShaft, {}),
							showScrews ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: screwGeo,
								position: [
									0,
									0,
									Z.thrustPlate - SCREW.length - e * 36
								],
								...screwSel.bind,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: screwSel.color(PART_COLOR["square-rod"]),
									metalness: .32,
									roughness: .45
								})
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: cmpLRef,
				position: [
					POS.cmpL.x - e * 22,
					POS.cmpL.y,
					Z.distribution
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearMesh, {
						id: "compound",
						teeth: GEARS.crown.z,
						module: GEARS.crown.m,
						face: GEARS.crown.face,
						color: PART_COLOR["compound-crown"],
						heat: showForces ? loads.heat["compound-L"] : 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							0,
							Z.outputGearL - Z.distribution
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearMesh, {
							id: "compound",
							teeth: GEARS.cmpPinion.z,
							module: GEARS.cmpPinion.m,
							face: GEARS.cmpPinion.face,
							color: PART_COLOR["compound-pinion"],
							metalness: cmpSteel ? .7 : .18,
							roughness: cmpSteel ? .28 : .48,
							heat: showForces ? loads.heat["compound-L"] : 0
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						...couplingSel.bind,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							4,
							4,
							70,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: couplingSel.color(PART_COLOR.coupling),
							metalness: .55,
							roughness: .35
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: cmpRRef,
				position: [
					POS.cmpR.x + e * 22,
					POS.cmpR.y,
					Z.distribution
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearMesh, {
						id: "compound",
						teeth: GEARS.crown.z,
						module: GEARS.crown.m,
						face: GEARS.crown.face,
						color: PART_COLOR["compound-crown"],
						heat: showForces ? loads.heat["compound-R"] : 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							0,
							Z.outputGearR - Z.distribution
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearMesh, {
							id: "compound",
							teeth: GEARS.cmpPinion.z,
							module: GEARS.cmpPinion.m,
							face: GEARS.cmpPinion.face,
							color: PART_COLOR["compound-pinion"],
							metalness: cmpSteel ? .7 : .18,
							roughness: cmpSteel ? .28 : .48,
							heat: showForces ? loads.heat["compound-R"] : 0
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						...couplingSel.bind,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							4,
							4,
							70,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: couplingSel.color(PART_COLOR.coupling),
							metalness: .55,
							roughness: .35
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: inputRef,
				position: [
					POS.input.x,
					POS.input.y + e * 16,
					Z.distribution
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearMesh, {
					id: "gear-input",
					teeth: GEARS.input.z,
					module: GEARS.input.m,
					face: GEARS.input.face,
					color: PART_COLOR["gear-input"],
					metalness: .35,
					roughness: .4,
					heat: showForces ? loads.heat["gear-input"] : 0
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					position: [
						0,
						0,
						28
					],
					...couplingSel.bind,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						4,
						4,
						56,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: couplingSel.color(PART_COLOR.coupling),
						metalness: .55,
						roughness: .35
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					POS.input.x,
					POS.input.y,
					Z.motor + e * 40
				],
				...motorSel.bind,
				children: [motorId === "dc775_12" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						21,
						21,
						66,
						28
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: motorSel.color(PART_COLOR["motor-775"]),
						metalness: .35,
						roughness: .45
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					56.4,
					56.4,
					56
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: motorSel.color(PART_COLOR["motor-nema"]),
					metalness: .28,
					roughness: .5
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						-36
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						4,
						4,
						18,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: couplingSel.color(PART_COLOR.coupling),
						metalness: .6,
						roughness: .3
					})]
				})]
			}),
			showDimensions && !showForces ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CdDimension, { explode: e }) : null,
			showForces ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForceArrows, {}) : null,
			showForces ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshForceArrows, {
				loads,
				pulse: knead
			}) : null
		]
	});
}
function CdDimension({ explode }) {
	const y = -38 - explode * 8;
	const z = Z.outputGearL;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
			points: [[
				POS.outL.x,
				y,
				z
			], [
				POS.outR.x,
				y,
				z
			]],
			color: "#c9d1d8",
			lineWidth: 1.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
			points: [[
				POS.outL.x,
				y - 4,
				z
			], [
				POS.outL.x,
				y + 4,
				z
			]],
			color: "#c9d1d8",
			lineWidth: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
			points: [[
				POS.outR.x,
				y - 4,
				z
			], [
				POS.outR.x,
				y + 4,
				z
			]],
			color: "#c9d1d8",
			lineWidth: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
			position: [
				0,
				y - 8,
				z
			],
			center: true,
			distanceFactor: 180,
			style: { pointerEvents: "none" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md bg-background/80 px-2 py-0.5 font-mono text-[11px] tracking-wide text-primary whitespace-nowrap",
				children: "CD 25.3 mm"
			})
		})
	] });
}
function PulseSphere({ color, pulse }) {
	const ref = (0, import_react.useRef)(null);
	useFrame(({ clock }) => {
		if (!ref.current) return;
		const k = pulse ? 1 + .32 * (.5 + .5 * Math.sin(clock.elapsedTime * 5.5)) : 1;
		ref.current.scale.setScalar(k);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1.8,
			12,
			10
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			emissive: color,
			emissiveIntensity: .35
		})]
	});
}
function MeshForceArrows({ loads, pulse }) {
	if (loads.loadFactor < .02) return null;
	const yAxis = new Vector3(0, 1, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: loads.meshes.map((m) => {
		const len = 8 + Math.min(22, m.Ft / 28);
		const color = m.sf < 1 ? "#b07070" : "#c9d1d8";
		const dir = new Vector3(m.tx, m.ty, 0);
		if (dir.lengthSq() < 1e-6) return null;
		dir.normalize();
		const quat = new Quaternion().setFromUnitVectors(yAxis, dir);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				m.x,
				m.y,
				m.z
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					quaternion: quat,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							len / 2,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.7,
							.7,
							len,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color,
							emissive: color,
							emissiveIntensity: .2
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							len + 3,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
							2.1,
							6,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color,
							emissive: color,
							emissiveIntensity: .2
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PulseSphere, {
					color,
					pulse
				}),
				m.id === "dist-L" || m.id === "out-L" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
					position: [
						m.tx * 10,
						14,
						6
					],
					center: true,
					distanceFactor: 200,
					style: { pointerEvents: "none" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-foreground whitespace-nowrap",
						children: [Math.round(m.Ft), " N"]
					})
				}) : null
			]
		}, m.id);
	}) });
}
function ForceArrows() {
	const shaftZ = Z.frontRadial;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: [-1, 1].map((side) => {
		const x = side * SPEC.centerDistance / 2;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				x,
				0,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						-28
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
						3.2,
						14,
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#b07070" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						-42
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						1.1,
						1.1,
						16,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#b07070" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						side * 22,
						0,
						shaftZ
					],
					rotation: [
						0,
						0,
						side === 1 ? -Math.PI / 2 : Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
						2.6,
						12,
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#7d8b96" })]
				})
			]
		}, side);
	}) });
}
function SceneLights() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#e6e4de",
			"#1a1c20",
			.55
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				90,
				140,
				80
			],
			intensity: 1.35,
			color: "#f2efe8",
			castShadow: true,
			"shadow-mapSize-width": 1024,
			"shadow-mapSize-height": 1024
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-70,
				40,
				-50
			],
			intensity: .35,
			color: "#8aa0b4"
		})
	] });
}
function Scene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLights, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriveTrain, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
			args: [400, 400],
			cellSize: 10,
			sectionSize: 50,
			cellColor: "#1c1e22",
			sectionColor: "#26282e",
			fadeDistance: 420,
			fadeStrength: 1.4,
			position: [
				0,
				-62,
				0
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				-61.5,
				0
			],
			opacity: .45,
			scale: 280,
			blur: 2.4,
			far: 90
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			makeDefault: true,
			minDistance: 90,
			maxDistance: 520,
			target: [
				0,
				0,
				0
			],
			enableDamping: true,
			dampingFactor: .08
		})
	] });
}
function DriveCanvas() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 flex items-center justify-center bg-background text-sm text-muted-foreground",
		children: "Cargando modelo…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			className: "h-full w-full touch-none",
			camera: {
				position: [
					175,
					105,
					210
				],
				fov: 34,
				near: 2,
				far: 2e3
			},
			dpr: [1, 1.75],
			shadows: "basic",
			gl: {
				antialias: true,
				alpha: false
			},
			onCreated: ({ gl }) => {
				gl.setClearColor("#0b0c0e");
				gl.shadowMap.type = 1;
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
		})
	});
}
function ViewportFrame({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative min-h-[280px] overflow-hidden bg-background", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriveCanvas, {})
	});
}
//#endregion
export { ViewportFrame, DriveCanvas as default };
