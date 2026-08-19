import React, { createContext, useContext, useState, useEffect } from 'react';
import candidateUsers from '../data/candidateUsers.json';
import hrUsers from '../data/hrUsers.json';
import interviewerUsers from '../data/interviewerUsers.json';
import { getStoredAuth, setStoredAuth, clearStoredAuth } from '../utils/authStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session from localStorage on initial render / page refresh
    useEffect(() => {
        const initializeAuth = () => {
            const { refreshToken, user: storedUser } = getStoredAuth();

            if (refreshToken && storedUser) {
                // Find matching active token from dataset for restored user
                let allUsers = [...candidateUsers, ...hrUsers, ...interviewerUsers];
                let foundUser = allUsers.find((u) => u.id === storedUser.id);

                if (foundUser) {
                    setUser(foundUser);
                    setAccessToken(foundUser.accessToken);
                } else {
                    clearStoredAuth();
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    /**
     * Universal Login Handler across all 3 user types
     * @param {string} username 
     * @param {string} password 
     */
    const login = (username, password) => {
        // Combine all 3 role datasets for lookup
        const allUsers = [...candidateUsers, ...hrUsers, ...interviewerUsers];

        const matchedUser = allUsers.find(
            (u) =>
                (u.username === username || u.email === username) &&
                u.password === password
        );

        if (matchedUser) {
            // 1. Set state in volatile memory
            setUser(matchedUser);
            setAccessToken(matchedUser.accessToken);

            // 2. Save refreshToken & basic profile in localStorage
            setStoredAuth({
                refreshToken: matchedUser.refreshToken,
                user: {
                    id: matchedUser.id,
                    role: matchedUser.role,
                    username: matchedUser.username,
                },
            });

            return { success: true, role: matchedUser.role, user: matchedUser };
        }

        return {
            success: false,
            message: 'Invalid username/email or password',
        };
    };

    /**
     * Logout Handler
     */
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        clearStoredAuth();
    };

    const value = {
        user,
        accessToken,
        isAuthenticated: !!user,
        role: user ? user.role : null,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom Hook to consume AuthContext cleanly in components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};