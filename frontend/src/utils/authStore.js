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

  resendCode: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${api_url}/resend-code`, {
        email,
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

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${api_url}/verify-email`, { code });
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

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${api_url}/check-auth`);
      set({
        isCheckingAuth: false,
        user: response.data.user,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      throw error;
    }
  },

  login: async (email, userName, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${api_url}/login`, {
        email,
        userName,
        password,
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

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${api_url}/forgot-password`, {
        email,
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

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${api_url}/reset-password/:token`, {
        token,
        password,
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

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${api_url}/logout`);
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: false,
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
