import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/"
      : "https://soma-backend-aena.onrender.com/",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 30000,
});

export default apiClient;
