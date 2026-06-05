import axios from "axios";
import { Platform } from "react-native";

const fallbackUrl =
  Platform.OS === "android" ? "http://10.0.2.2:3001" : "http://localhost:3001";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || fallbackUrl;

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
