import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  user: null,
  login: async () => {
    try {
      window.location.href = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth/login" : "/api/auth/login";
    } catch (e) {
      console.log(e);
    }
  },

  getUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/getuser");
      // console.log(response.data.user);
      set({ user: response.data.user });
      response.data.user ? localStorage.setItem("showLoader", true): localStorage.removeItem("showLoader");
      response.data.user && toast.success("Logged In")
    } catch (e) {
        console.log(e);
    }
  },

  enableLoader: async () => {
    localStorage.setItem("showLoader", true);
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      // console.log(response);
      localStorage.removeItem("showLoader");
      window.location.href = import.meta.env === "devlopment" ? "http://localhost:5173": "/";
    } catch (e) {
      console.log(e);
    }
  }

//   check: async () => {
//     const response = await axiosInstance.get("/auth/check");
//     console.log(response.data.login)
//     if (!response.data.login) {
//         localStorage.removeItem("showLoader")
//     }
//   },
}));
