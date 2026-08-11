import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import themes from "../themes";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import {
  getStoredTheme,
  saveTheme
} from "../utils/themeStorage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  // Load saved theme
  const [themeName, setThemeName] = useState(() =>
    getStoredTheme()
  );

  // Current Theme Object
  const theme = useMemo(() => {
    return themes[themeName] || themes.light;
  }, [themeName]);

  // Backward Compatibility
  const darkMode = themeName === "dark" || themeName === "midnight";

  // MUI theme synced with our custom theme colors
  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: theme.colors.primary },
      background: {
        default: theme.colors.background,
        paper: theme.colors.card,
      },
      text: {
        primary: theme.colors.text,
        secondary: theme.colors.subText,
      },
    },
  }), [theme, darkMode]);

  // Apply dark class to body 
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Save theme
  useEffect(() => {
    saveTheme(themeName);
  }, [themeName]);

  // Change theme
  const setTheme = (name) => {
    console.log("Changing theme to:", name);

    if (themes[name]) {
      setThemeName(name);
    } else {
      console.log("Theme not found");
    }
  };

  // Existing dark mode toggle
  const setDarkMode = (value) => {
    if (typeof value === "function") {
      const next = value(darkMode);
      setThemeName(next ? "dark" : "light");
    } else {
      setThemeName(value ? "dark" : "light");
    }
  };

  // Optional helpbar
  const toggleDarkMode = () => {
    setThemeName((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        // old API (still woks)/
        darkMode,
        setDarkMode,

        // New API
        themeName,
        theme,
        colors: theme.colors,
        themes,
        setTheme,
        toggleDarkMode,
        isDark: darkMode
      }}
    >
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);