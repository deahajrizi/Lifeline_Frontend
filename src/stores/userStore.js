import { create } from 'zustand'
import axios from 'axios'
import { useAuthStore } from './authStore'

export const useUserStore = create((set) => ({

  user: null,
  userLoading: false,
  error: null,
  success: false,
  message: null,
  friendsProfiles: [],

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
      const { setCredentials } = useAuthStore.getState()
      setCredentials(response.data)
    } catch (error) {
      set({ error: error.message, userLoading: false })
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
      const { setCredentials } = useAuthStore.getState()
      setCredentials(null)
    } catch (error) {
      set({ error: error.message, userLoading: false })
    }
  },

  getUserProfile: async (_id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/profile/${_id}`,
        { withCredentials: true }
      );
      set({
        user: response.data.user,
        loading: false,
        success: true,
      });

      const { setCredentials } = useAuthStore.getState();
      setCredentials(response.data);

      return response
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  uploadAvatar: (_id, formData) => {
    axios
      .put(`http://localhost:8080/api/user/upload-avatar/${_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        set(() => ({
          user: response.data.user,
          loading: false,
          success: true,
        }));
        const { setCredentials } = useAuthStore.getState();
        setCredentials(response.data)
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
        setCredentials(response.data); 
      })
      .catch((error) => {
        set({ error: error.message });
      });
  },
  getFriendsProfiles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/friends"
      );
      set(() => ({
        friendsProfiles: response.data.friends,
        loading: false,
        success: true,
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to get friends" });
      console.error("Error getting friends:", error)
    }
  },
  addFriend: async (username) => {
    set({ loading: true, error: null, success: false }); 
    try {
      const response = await axios.put(
        "http://localhost:8080/api/user/add-friend",
        { username }
      );
      set((state) => ({
        user: { ...state.user, friends: response.data.friends }, 
        loading: false,
        success: true,
      }));
      // Sync with authStore
      const { setCredentials } = useAuthStore.getState();
      setCredentials({ ...state.user, friends: response.data.friends });
  
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to add friend",
        success: false, 
      });
    }
  },
}));
