import { create } from "zustand";
import axios from "axios";

const api_url = "http://localhost:4000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, userName, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${api_url}/signup`, {
        email,
        password,
        userName,
        name,
      });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },
}));
