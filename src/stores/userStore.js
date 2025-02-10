import { create } from 'zustand'
import axios from 'axios'
import { useAuthStore } from './authStore'

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
      set({
        userLoading: false,
        success: false,
        user: null,
        message: response.data,
      });

      // Clear credentials in authStore
      const { setCredentials } = useAuthStore.getState();
      setCredentials(null); // Clear user info in authStore after logout
    } catch (error) {
      set({ error: error.message, userLoading: false });
    }
  },

  getUserProfile: (_id) => {
    set({ loading: true, error: null });
    axios
      .get(`http://localhost:8080/api/user/profile/${_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        set(() => ({
          user: response.data.user,
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

  uploadAvatar: (_id, formData) => {
    axios
      .put(`http://localhost:8080/api/user/upload-avatar/${_id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        set(() => ({
          user: response.data.user,
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
  editProfile: (userData) => {
    axios
      .put("http://localhost:8080/api/user/profile", userData, {
        withCredentials: true,
      })
      .then((response) => {
        set(() => ({
          user: response.data,
          success: true,
        }));
        // Sync user info with authStore
        const { setCredentials } = useAuthStore.getState();
        setCredentials(response.data); // Update userInfo in authStore
        console.log("Profile updated:", response.data); // Debugging line
      })
      .catch((error) => {
        set({ error: error.message });
        console.error("Error updating profile:", error); // Debugging line
      });
  },
  addFriend: async (username) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axios.put(
        "http://localhost:8080/api/user/add-friend",
        { username }
      );
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          friends: response.data.friends,
        },
        loading: false,
        success: true,
      }));
      // Sync user info with authStore
      const { setCredentials } = useAuthStore.getState();
      setCredentials({ ...state.userInfo, friends: response.data.friends });
      console.log("Friend added:", response.data); // Debugging line
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to add friend",
      });
      console.error("Error adding friend:", error); // Debugging line
    }
  },
}));
