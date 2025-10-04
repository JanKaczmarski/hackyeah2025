import { create } from "zustand";
import { api } from "../lib/api";

interface User {
  id: number;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  user: null,

  login: async (username: string, password: string) => {
    await api.post("/auth/login", { username, password });

    // Fetch user data after successful login
    const userData = await api.get<User>("/auth/me");
    set({
      isAuthenticated: true,
      user: userData,
    });
  },

  register: async (username: string, password: string) => {
    await api.post("/auth/register", { username, password });

    // Auto-login after registration
    await api.post("/login", { username, password });
    const userData = await api.get<User>("/auth/me");
    set({
      isAuthenticated: true,
      user: userData,
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },

  checkAuth: async () => {
    try {
      const userData = await api.get<User>("/auth/me");
      set({
        isAuthenticated: true,
        user: userData,
      });
    } catch {
      set({
        isAuthenticated: false,
        user: null,
      });
    }
  },
}));
