import axios from "axios";

const api = axios.create({
  baseURL:
    "https://flowstock-production.up.railway.app" /*"http://localhost:7000"*/,
});

export default api;