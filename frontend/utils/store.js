import create from "zustand";

export const useStore = create((set) => ({
  opened: false,
  setOpened: (opened) => set({ opened }),
  previousTab: "CREATE_WALLET",
  activeTab: "CREATE_WALLET",
  setActiveTab: (activeTab) =>
    set((state) => ({
      previousTab: state.activeTab,
      activeTab,
    })),
  user: {
    address: null,
  },
  setUser: (user) => set({ user }),
  updateUser: (key, value) =>
    set((state) => ({
      user: {
        ...state.user,
        [key]: value,
      },
    })),
}));
