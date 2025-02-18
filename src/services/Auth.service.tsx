import axios from "axios"

const API_URL = "http://localhost:5000/api/auth";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(email: string, password: string) {
    const response = await axiosInstance.post(`/login`, { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data
  },

  async register(userData: any) {
    const response = await axiosInstance.post(`${API_URL}/register`, userData);
    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await axiosInstance.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  },

  async resetPassword(token: string, id: string, newPassword: string) {
    const response = await axiosInstance.post(`${API_URL}/reset-password`, { token, id, newPassword });
    return response.data;
  },

  async verifyToken(token: string) {
    const response = await axiosInstance.post(`${API_URL}/verify-token`, { token });
    return response.data;
  },
}

