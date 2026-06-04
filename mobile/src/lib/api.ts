import axios from "axios";

const EXPO_PUBLIC_API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
