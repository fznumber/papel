import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_MOTOR,
  DEFAULT_PRE,
  type MotorId,
  type PreId,
} from "@/lib/design";

export type StudioTab = "arquitectura" | "cargas" | "bom" | "dfam" | "motor" | "planos";

interface StudioState {
  tab: StudioTab;
  playing: boolean;
  explode: number;
  housingOpacity: number;
  showScrews: boolean;
  showForces: boolean;
  showDimensions: boolean;
  selectedId: string | null;
  motorId: MotorId;
  preId: PreId;
  loadPct: number;
  ramping: boolean;
  cmpSteel: boolean;
  knead: boolean;
  setTab: (tab: StudioTab) => void;
  setPlaying: (v: boolean) => void;
  togglePlaying: () => void;
  setExplode: (v: number) => void;
  setHousingOpacity: (v: number) => void;
  setShowScrews: (v: boolean) => void;
  setShowForces: (v: boolean) => void;
  setShowDimensions: (v: boolean) => void;
  setSelectedId: (id: string | null) => void;
  setMotorId: (id: MotorId) => void;
  setPreId: (id: PreId) => void;
  setLoadPct: (v: number) => void;
  setRamping: (v: boolean) => void;
  setCmpSteel: (v: boolean) => void;
  setKnead: (v: boolean) => void;
}

export const useStudio = create<StudioState>()(
  persist(
    (set) => ({
      tab: "arquitectura",
      playing: true,
      explode: 0,
      housingOpacity: 0.22,
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
      setTab: (tab) =>
        set({
          tab,
          showForces: tab === "cargas",
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
      setKnead: (knead) => set({ knead }),
    }),
    {
      name: "twinlock-253",
      partialize: (s) => ({
        motorId: s.motorId,
        preId: s.preId,
        housingOpacity: s.housingOpacity,
        showScrews: s.showScrews,
        showDimensions: s.showDimensions,
        cmpSteel: s.cmpSteel,
      }),
    },
  ),
);
