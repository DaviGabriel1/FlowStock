import axios from "axios";

const api = axios.create({
  baseURL: "http://3.148.182.158:3000" /*"http://localhost:7000"*/,
});

export default api;