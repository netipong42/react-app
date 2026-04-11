import axios from "axios";

const apiNewService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEW_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
apiNewService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiNewService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default apiNewService;
