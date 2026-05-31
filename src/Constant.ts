import axios from "axios";

export const AxiosProvider = axios.create({
  baseURL: "http://localhost:3000",
});

// Attach the JWT token to every request automatically
AxiosProvider.interceptors.request.use((config) => {
  const token = localStorage.getItem("nb_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});