const STORAGE_KEY = "nexthire-theme";

export const getStoredTheme = () => {
    return localStorage.getItem(STORAGE_KEY) || "light";
};

export const saveTheme = (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
};

export const removeStoredTheme = () => {
    localStorage.removeItem(STORAGE_KEY);
};