import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export const useUserAuth = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        // If there's no token, redirect to login
        if (!token) {
            clearUser();
            navigate("/login");
            return;
        }

        // Note: The actual user data fetching is handled globally in UserProvider.
        // This hook now only handles redirection for unauthorized access.

    }, [clearUser, navigate]);

    return { user };
}