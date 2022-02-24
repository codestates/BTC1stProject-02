import create from "zustand";

export const useStore = create((set) => ({
  opened: false,
  setOpened: (opened) => set({ opened }),
  activeTab: "CREATE_WALLET",
  setActiveTab: (activeTab) => set({ activeTab }),
}));
