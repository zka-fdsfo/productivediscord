import {signup} from "../services/auth.api.js"

export const handleSignup = async (data) => {
    try {
        const userData = await signup(data);
        // setUser(userData.user);
        console.log(userData)
    } catch (error) {
        console.error("Signup failed:", error);
    }
}