import axios from "axios";
import create from "zustand";
import { authHeader } from "./auth";

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
  Axios: null,
  user: {
    address: null,
  },
  setUser: (user) =>
    set({
      user,
      Axios: axios.create({
        headers: authHeader(),
      }),
    }),
  updateUser: (key, value) =>
    set((state) => ({
      user: {
        ...state.user,
        [key]: value,
      },
    })),

  web3: null,
  setWeb3: (web3) => set({ web3 }),
  sendingAmount: null,
  setSendingAmount: (sendingAmount) => set({ sendingAmount }),
  receiverAddress: null,
  setReceiverAddress: (receiverAddress) => set({ receiverAddress }),
}));
