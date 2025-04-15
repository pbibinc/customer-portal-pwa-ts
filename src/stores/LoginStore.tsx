import { create, UseBoundStore, StoreApi } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: number;
  role_id: number;
  is_admin: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface LoginStore {
  user: User | null;
  token: string | null;
  expiry: number | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const useLoginStore: UseBoundStore<StoreApi<LoginStore>> =
  create<LoginStore>()(
    persist(
      (set) => ({
        user: null,
        token: null,
        expiry: null,
        setUser: (user: User | null) => set({ user }),
        setToken: (token: string | null) => {
          if (token) {
            const expiry = Date.now() + 2 * 60 * 60 * 1000;
            set({ token, expiry });
          } else {
            set({ token: null, expiry: null });
          }
        },
      }),
      {
        name: "login-store",
        storage: createJSONStorage(() => sessionStorage),
        onRehydrateStorage: (state) => {
          if (state) {
            const current = Date.now();
            // If the token exists but is expired, clear it.
            if (state.token && state.expiry && state.expiry < current) {
              useLoginStore.getState().setToken(null);
              sessionStorage.removeItem("login-store");
            }
          }
        },
      }
    )
  );
