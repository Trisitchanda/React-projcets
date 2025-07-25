import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, SetUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = (username) => {
        localStorage.setItem('user', JSON.stringify({ username }));
        SetUser({ username })
    }

    const logout = () => {
        localStorage.removeItem('user');
        SetUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}