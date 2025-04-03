import { create } from "zustand";

interface LoadStateProp {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoaderStore = create<LoadStateProp>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
