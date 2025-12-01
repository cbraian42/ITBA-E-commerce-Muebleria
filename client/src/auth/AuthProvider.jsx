import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const isAuthenticated = Boolean(token);
    const isAdmin = Boolean(user?.role === "admin");

    const decodeToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return {
                id: payload.id,
                role: payload.role,
            };
        } catch (error) {
            console.error("Token inválido:", error);
            return null;
        }
    };

    const login = (tokenData) => {
        setToken(tokenData);
        const userData = decodeToken(tokenData);
        setUser(userData);
        localStorage.setItem("token", tokenData);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    const getAuthHeaders = () => {
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) login(savedToken);
    }, []);

    const value = {
        token,
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        getAuthHeaders,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
