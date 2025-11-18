import axios from "axios";

const api = axios.create({
  baseURL: "https://servidor-psi-two.vercel.app", // TU SERVIDOR
});

export default api;
