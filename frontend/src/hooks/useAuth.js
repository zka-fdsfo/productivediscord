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

    const { User, setUser } = useContext(AuthContext);
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const userData = data?.data?.payloadtofrontend;
            // Handle successful login, e.g., update context or local storage
            // console.log("Login successful:", data);
            setUser(userData);

            // console.log("User set in context:", userData);
            // console.log("User set in context:", User);
        },
        onError: (error) => {
            // Handle login error, e.g., show error message
            console.error("Login failed:", error);
        }
    })
}

export function useRegister() {

    const { User, setUser } = useContext(AuthContext);
    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            const userData = data?.data?.payloadtofrontend;
            // Handle successful login, e.g., update context or local storage
            // console.log("Login successful:", data);
            setUser(userData);

            // console.log("User set in context:", userData);
            // console.log("User set in context:", User);
        },
        onError: (error) => {
            // Handle login error, e.g., show error message
            console.error("Login failed:", error);
        }
    })

}