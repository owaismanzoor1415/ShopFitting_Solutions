import axios from "axios";
import { getToken } from "./admin/context/AdminDataContext";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Attach auth token if available
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;