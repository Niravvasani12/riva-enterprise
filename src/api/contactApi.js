import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const CONTACT_TIMEOUT_MS = Number(import.meta.env.VITE_CONTACT_TIMEOUT_MS) || 30000;

const contactClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: CONTACT_TIMEOUT_MS,
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

      if (error.code === "ECONNABORTED") {
        throw new Error("Request timed out while sending message. Please try again.");
      }

      if (error.code === "ERR_NETWORK") {
        throw new Error("Cannot connect to server. Please try again.");
      }
    }

    throw new Error(error?.message || "Failed to send message. Please try again.");
  }
};
