import axios from "axios";

const api = axios.create({
  baseURL: "https://flowstock-production.up.railway.app",
});

export default api;