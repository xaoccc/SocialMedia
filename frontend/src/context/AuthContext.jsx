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

    function isTokenExpired(token) {
        try {
            const decoded = jwt_decode(token); // contains 'exp' and optionally 'iat'

            const now = Math.floor(Date.now() / 1000); // current time in seconds

            console.log("Current time:", new Date(now * 1000).toLocaleString());

            if (decoded.iat) {
                console.log("Token issued at:", new Date(decoded.iat * 1000).toLocaleString());
            }

            if (decoded.exp) {
                console.log("Token expires at:", new Date(decoded.exp * 1000).toLocaleString());
            }

            return decoded.exp < now;
        } catch (error) {
            return true; // invalid or malformed token
        }
    }

    useEffect(() => {
        if (jwtData) {
            isTokenExpired(jwtData);
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