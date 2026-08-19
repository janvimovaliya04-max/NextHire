const TOKEN_KEY = 'next_hire_refresh_token';
const USER_KEY = 'next_hire_user';

/**
 * Saves refresh token and minimal user data to LocalStorage
 * @param {Object} authData
 * @param {string} authData.refreshToken
 * @param {Object} authData.user
 */
export const setStoredAuth = ({ refreshToken, user }) => {
    try {
        if (refreshToken) {
            localStorage.setItem(TOKEN_KEY, refreshToken);
        }
        if (user) {
            // Store basic user profile to restore state on hard refresh
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }
    } catch (error) {
        console.error('Error saving auth to localStorage:', error);
    }
};

/**
 * Retrieves stored refresh token and basic user data from LocalStorage
 * @returns {Object} { refreshToken: string|null, user: Object|null }
 */
export const getStoredAuth = () => {
    try {
        const refreshToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);
        const user = storedUser ? JSON.parse(storedUser) : null;

        return { refreshToken, user };
    } catch (error) {
        console.error('Error reading auth from localStorage:', error);
        return { refreshToken: null, user: null };
    }
};

/**
 * Clears all authentication persistence keys from LocalStorage on Logout
 */
export const clearStoredAuth = () => {
    try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Error clearing auth from localStorage:', error);
    }
};