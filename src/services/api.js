import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 Attach token ONLY if it exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // ❌ DO NOT send token for login/register
    if (
      token &&
      !config.url.includes("/auth/login") &&
      !config.url.includes("/auth/register")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
