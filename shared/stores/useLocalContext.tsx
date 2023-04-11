import { create } from "zustand";

interface LocalContextState {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const useLocalContextState = create<LocalContextState>()((set) => ({
  apiKey: "",
  setApiKey: (key: string) => set(() => ({ apiKey: key })),
}));
