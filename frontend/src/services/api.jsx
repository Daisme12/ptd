import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:5001/api" : "/api"),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;