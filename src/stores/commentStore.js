import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useCommentStore = create((set) => ({
  loading: false,
  message: null,
  error: null,
  success: false,
  comments: [],

  createComment: async (data) => {
    set({ loading: true, message: null, error: null, success: false });

    const authToken = localStorage.getItem("token"); // Assuming you store auth token here

    try {
      const response = await axios.post(
        "http://localhost:8080/api/comment/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      set({
        loading: false,
        message: response.data.message || "Comment created successfully!",
        success: true,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "An error occurred",
        success: false,
      });
    }
  },

  getComments: async (postId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `http://localhost:8080/api/comment/${postId}/comments`,
        {
          withCredentials: true,
        }
      );
      set({ comments: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));