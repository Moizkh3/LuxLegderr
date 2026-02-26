import React, { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext({
    user: null,
    updateUser: () => { },
    clearUser: () => { },
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Initial fetch to restore user session on page refresh
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        let isMounted = true;

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if (isMounted && response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
                if (isMounted) {
                    // Only clear the session if the error is specifically 401 (Unauthorized)
                    // If it's a network error (no internet), we want to keep the session intact
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        localStorage.removeItem("token");
                        setUser(null);
                    }
                }
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        };
    }, []);

    // Function to update user data - wrapped in useCallback to prevent infinite loops in hooks
    const updateUser = useCallback((userData) => {
        setUser(userData);
    }, []);

    // Function to clear user data - wrapped in useCallback to prevent infinite loops in hooks
    const clearUser = useCallback(() => {
        setUser(null);
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            updateUser,
            clearUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
