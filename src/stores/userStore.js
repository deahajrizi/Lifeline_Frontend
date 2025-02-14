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

  getUserProfile: async (_id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/profile/${_id}`,
        { withCredentials: true }
      );
      console.log("API response for updated profile:", response); // Debugging: Check the response

      set({
        user: response.data.user, // Make sure you're setting the user correctly
        loading: false,
        success: true,
      });

      const { setCredentials } = useAuthStore.getState();
      setCredentials(response.data);

      return response; // Return response to be used in the component
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error; // Throw error for the component to handle
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
          user: response.data.user, // Ensure this includes the updated avatar
          loading: false,
          success: true,
        }));
        const { setCredentials } = useAuthStore.getState();
        setCredentials(response.data); // Sync authStore with the updated user
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
      console.log("Friends profiles:", response.data.friends); // Debugging line
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to get friends" });
      console.error("Error getting friends:", error); // Debugging line
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
        success: false, // Ensure success is false
      });
     
   
    }
  },
}));
