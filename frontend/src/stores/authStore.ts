import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock login - in production, validate with backend
        set({
          isAuthenticated: true,
          user: { email, name: email.split("@")[0] },
        });
      },

      register: async (email: string, password: string, name: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock register - in production, send to backend
        set({
          isAuthenticated: true,
          user: { email, name },
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
