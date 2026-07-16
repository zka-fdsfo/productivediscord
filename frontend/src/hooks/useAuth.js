import { api } from "../api/axios.js";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/Auth.api.js";
import { AuthContext } from "../context/auth.context.jsx";

// export const useAuth = () => {
//     const { user, setUser } = useContext(AuthContext);
//     const handleLogin = async (username, password) => {
//         try {
//             const response = await api.login(username, password);
//             const { user } = response.data;
//             setUser(user);
//         } catch (error) {
//             console.error("Login failed:", error);
//         }
//     }
// }

// return { user, handleLogin };

export function useLogin() {
    return useMutation({
        mutationFn: login
    })
}

export function useRegister() {
    return useMutation({
        mutationFn: register
    })
}