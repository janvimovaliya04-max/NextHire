import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");

    return savedTheme
      ? JSON.parse(savedTheme)
      : false;
  });

useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}, [darkMode]);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () =>
  useContext(ThemeContext);