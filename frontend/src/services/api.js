import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL,
=======
  baseURL: "http://import.meta.env.VITE_API_URL/api",
>>>>>>> fc2a2e9 (localhost fixation)
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
