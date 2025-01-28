import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useUserStore = create((set) => ({
  user: null,
  userLoading: false,
  error: null,
  success: false,
  message: null,

  register: async (data) => {
    set({ userLoading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        data
      );
      set(() => ({
        user: response.data,
        userLoading: false,
        success: true,
      }));

      // Sync with authStore
      const { setCredentials } = useAuthStore.getState(); // Access authStore methods
      setCredentials(response.data); // Update userInfo in authStore
    } catch (error) {
      set({ error: error.message, userLoading: false });
    }
  },

  login: async (data) => {
    set({ userLoading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/auth",
        data
      );
      set(() => ({ user: response.data, userLoading: false, success: true }));
    } catch (error) {
      set({ error: error.message, userLoading: false });
    }
  },

  userLogout: async () => {
    set({ userLoading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/logout"
      );
      set(() => ({ message: response.data, userLoading: false }));
    } catch (error) {
      set({ error: error.message, userLoading: false });
    }
  },

  getUserProfile: async (_id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/profile/${_id}`
      );
      set(() => ({
        user: response.data.user,
        loading: false,
        success: true,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
