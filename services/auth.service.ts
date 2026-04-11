import api from "@/lib/api";
import { Login, Register } from "@/types/auth";

export const AuthService = {
  async login(data: Login) {
    try {
      const res = await api.post("/login", data);

      const token = res.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", res.data?.data?.user?.email);
        document.cookie = `token=${token}; path=/`;
        window.location.href = "/";
      }

      return res;
    } catch (error: any) {
      throw error.response;
    }
  },

  async register(data: Register) {
    try {
      const res = await api.post("/register", data);
      if (res.status === 201 && res.data.data) {
        window.location.href = "/login";
      }
      return res;
    } catch (error: any) {
      throw error.response;
    }
  },

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  },
};
