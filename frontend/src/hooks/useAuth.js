import { api } from "../api/axios.js";
import { useMutation } from "@tanstack/react-query";
import {
  login,
  register,
  accesstoken,
  checkUsername,
} from "../api/Auth.api.js";
import { AuthContext } from "../context/auth.context.jsx";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect,useState } from "react";

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Handle successful login, e.g., update context or local storage
      // console.log("Login successful:", data);
      // console.log("User set in context:", userData);
      // console.log("User set in context:", User);
    },
    onError: (error) => {
      // Handle login error, e.g., show error message
      console.error("Login failed:", error);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      // Handle successful login, e.g., update context or local storage
      // console.log("Login successful:", data);
      // console.log("User set in context:", userData);
      // console.log("User set in context:", User);
    },
    onError: (error) => {
      // Handle login error, e.g., show error message
      console.error("Login failed:", error);
    },
  });
}

export function useAccessToken() {
  const query = useQuery({
    queryKey: ["User_data"],
    queryFn: accesstoken,
  });

  return query;
}

export function checkUsernameEX(username, delay = 500) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!username || username.trim().length < 3) {
      setStatus("idle");
      setMessage("");
      return;
    }

    setStatus("checking");
    const timer = setTimeout(async () => {
      try {
        const checkUse = useQuery({
          queryKey: ["checkUse"],
          queryFn: checkUsername,
        });
     setStatus(checkUse.available ? "available" : "taken");
        setMessage(checkUse.message);
      } catch (error) {}
    }, delay);

    return () => clearTimeout(timer);
  }, [username,delay]);

  return status;
}
