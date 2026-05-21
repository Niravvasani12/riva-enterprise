import axios from "axios";

const DEFAULT_API_BASE_URL =
  typeof window !== "undefined" &&
  window.location.hostname === "riva-dtf-enterprise.onrender.com"
    ? "https://riva-enterprise.onrender.com"
    : "http://localhost:4000";

const normalizeApiBaseUrl = (url = "") =>
  url.trim().replace(/\/+$/, "").replace(/\/api$/i, "");

const API_BASE_URL = normalizeApiBaseUrl(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
);
const contactClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 0,
  withCredentials: false,
});

export const submitContactForm = async (payload) => {
  try {
    const response = await contactClient.post("/api/contact", payload);

    if (response.status >= 200 && response.status < 300 && response.data?.ok) {
      return response.data;
    }

    throw new Error(response.data?.error || "Unexpected response from server.");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }

      if (error.code === "ERR_NETWORK") {
        throw new Error("Cannot connect to server. Please try again.");
      }
    }

    throw new Error(error?.message || "Failed to send message. Please try again.");
  }
};
