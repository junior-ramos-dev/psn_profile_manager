import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "cache-control": "no-cache",
  },
});
