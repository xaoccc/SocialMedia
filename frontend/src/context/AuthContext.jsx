import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [jwtData, setJwtData] = useState(() => {
        // Retrieve tokens from local storage on initialization
        const token = localStorage.getItem('jwtData');
        return token ? JSON.parse(token) : null;
    });

    // Save tokens to local storage whenever jwtData changes
    useEffect(() => {
        if (jwtData) {
            localStorage.setItem('jwtData', JSON.stringify(jwtData));
        } else {
            localStorage.removeItem('jwtData');
        }
    }, [jwtData]);

    const logout = () => {
        setJwtData(null);
        localStorage.removeItem('jwtData');
    };

    return (
        <AuthContext.Provider value={{ jwtData, setJwtData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);