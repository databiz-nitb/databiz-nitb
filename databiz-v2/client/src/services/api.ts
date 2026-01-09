import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
=======
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3999/api",
>>>>>>> 3644f14 (frontend nav and background landing page)
});

// Add token to request headers if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
