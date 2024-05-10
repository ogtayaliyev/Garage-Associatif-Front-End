// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        // Logique d'authentification, par exemple, enregistrement de l'utilisateur
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Logique de déconnexion
        setIsLoggedIn(false);
    };

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}{refreshPage}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
