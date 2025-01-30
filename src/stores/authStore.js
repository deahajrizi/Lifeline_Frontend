import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      userInfo: null,
      setCredentials: (data) => {
        set({ userInfo: data });
      },
      logout: () => {
        set({ userInfo: null });
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);