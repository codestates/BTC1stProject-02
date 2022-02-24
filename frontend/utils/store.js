import create from "zustand";

export const useStore = create((set) => ({
  opened: false,
  setOpened: (opened) => set({ opened }),
  activeTab: "LOGIN",
  setActiveTab: (activeTab) => set({ activeTab }),
}));
