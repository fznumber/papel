import { create } from "zustand";
import { runtime } from "@/lib/screw/runtime";

export type ViewMode = "pair" | "single";
export type ColorMode = "phase" | "zone" | "metal";
export type CameraPreset = "iso" | "die" | "side" | "top" | "mesh";
export type ClipMode = "off" | "long" | "axial";

type SimState = {
  playing: boolean;
  rpm: number;
  viewMode: ViewMode;
  colorMode: ColorMode;
  isolatedPhase: string | null;
  hoveredPhase: string | null;
  exploded: boolean;
  showBarrel: boolean;
  showFlow: boolean;
  showShaft: boolean;
  clipMode: ClipMode;
  clipPos: number;
  cameraPreset: CameraPreset;
  cameraTick: number;
  mobilePanel: boolean;
  setPlaying: (v: boolean) => void;
  setRpm: (v: number) => void;
  setViewMode: (v: ViewMode) => void;
  setColorMode: (v: ColorMode) => void;
  setIsolated: (id: string | null) => void;
  setHovered: (id: string | null) => void;
  setExploded: (v: boolean) => void;
  setShowBarrel: (v: boolean) => void;
  setShowFlow: (v: boolean) => void;
  setShowShaft: (v: boolean) => void;
  setClipMode: (v: ClipMode) => void;
  setClipPos: (v: number) => void;
  setCamera: (v: CameraPreset) => void;
  setMobilePanel: (v: boolean) => void;
  togglePhase: (id: string) => void;
};

export const useSim = create<SimState>((set, get) => ({
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
  clipPos: 0.55,
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
  setCamera: (cameraPreset) =>
    set({ cameraPreset, cameraTick: get().cameraTick + 1 }),
  setMobilePanel: (mobilePanel) => set({ mobilePanel }),
  togglePhase: (id) =>
    set({ isolatedPhase: get().isolatedPhase === id ? null : id }),
}));

runtime.playing = true;
runtime.rpm = 90;
