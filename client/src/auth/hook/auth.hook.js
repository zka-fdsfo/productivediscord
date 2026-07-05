import {signup} from "../services/auth.api.js"

export const handleSignup = async (name, email, password) => {
    try {
        const userData = await signup(name, email, password);
        // setUser(userData.user);
    } catch (error) {
        console.error("Signup failed:", error);
    }
}