import axios from "axios";
import http from "http";
import https from "https";

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:4000/" : "/",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 30000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
});

export default apiClient;
