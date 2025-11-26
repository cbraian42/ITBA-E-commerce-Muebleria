import React from 'react'
import { useState } from 'react'
import { AuthContext } from './AuthContext'

export default function AuthProvicer({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const isAuthenticated = Boolean(token);
    const isAdmin = Boolean(user?.role==="admin")

    const decodeToken = (token) => {
        try{
            const payload = JSON.parse(atob(token.split(".")[1]));
            return{
                id: payload.id
            };
        }catch(error){
            console.error("token invalido:",error);
            return null;
        }
    };
    const login = (tokenData) => {
        setToken(tokenData);

        const userData = decodeToken(tokenData);
        setUser(userData);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const getAuthHeaders = () => {
        return token ? { Authorization: `Bearer ${token}`} : {};
    };

    const value = {
        token, user, isAuthenticated,isAdmin, login, logout, getAuthHeaders
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};