import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'; 
const api = axios.create({
  baseURL: `${baseURL}/api/v1`,
  withCredentials: true,
});
export const signup = async (formData) => {
  // User signup API call
  try {
    const response = await api.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    // Attach the original error as the cause for better diagnostics
    throw new Error(error.response?.data?.message || "Signup failed", { cause: error });
  }
};