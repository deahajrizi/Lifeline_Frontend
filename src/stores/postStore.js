import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";

 
export const usePostStore = create((set) => ({
  loading: false,
  message: null,
  error: null,
  success: false,
  posts: [],

  createPost: async (data) => {
    set({ loading: true, message: null, error: null, success: false });

    const authToken = localStorage.getItem("token"); // Assuming you store auth token here

    try {
      const response = await axios.post(
        "http://localhost:8080/api/post/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const createdPost = response.data; // Récupération des données du post créé

      set((state) => ({
        loading: false,
        message: createdPost.message || "Post created successfully!",
        success: true,
        posts: [...state.posts, createdPost], // Ajout du post à la liste
      }));

      return createdPost; // 🔴 AJOUT : on retourne le post créé
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "An error occurred",
        success: false,
      });

      return null; // 🔴 AJOUT : retourne `null` en cas d'erreur
    }
  },

  uploadPostMedia: (id, formData) => {
    axios
      .put(`http://localhost:8080/api/post/upload-post-media/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        set(() => ({
          post: response.data.post,
          loading: false,
          success: true,
        }));
        const { setCredentials } = useAuthStore.getState();
        setCredentials(response.data);
      })
      .catch((error) => {
        set({ error: error.message, loading: false });
      });
  },
  getPosts: async (friendId = null) => {
    set({ loading: true, error: null });

    try {
      const url = friendId
        ? `http://localhost:8080/api/post/all/${friendId}`
        : "http://localhost:8080/api/post/all";

      const response = await axios.get(url, {
        withCredentials: true,
      });

      set({
        posts: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
  getSinglePost: async (postId) => {
    set({ loading: true, error: null });

    const authToken = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch post",
        loading: false,
      });
      return null;
    }
  },
  updatePost: async (postId, data) => {
    set({ loading: true, message: null, error: null, success: false });

    const authToken = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:8080/api/post/${postId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      set({
        loading: false,
        message: response.data.message || "Post updated successfully",
        success: true,
      });

      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update post",
        success: false,
      });
      return null;
    }
  },
  deletePost: async (postId) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/post/${postId}`
      );
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
        loading: false,
        success: true,
      }));
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete post",
        success: false,
      });
      return null;
    }
  },
}));