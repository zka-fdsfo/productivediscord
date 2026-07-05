import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
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
