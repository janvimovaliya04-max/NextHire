import { Button } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import useThemeColors  from "../hooks/useThemeColors";

export default function ThemeTester() {
    const { themeName, setTheme } = useTheme();
    const colors = useThemeColors();

    return (
        <div
        style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "16px",
            borderRadius: "10px"
        }}
        >
            <h3>Current Theme: {themeName}</h3>
            <p>Primary Color: {colors.primary}</p>

            <Button onClick={() => setTheme("light")}>Light</Button>
            <Button onClick={() => setTheme("dark")}>Dark</Button>
            <Button onClick={() => setTheme("gold")}>Gold</Button>
        </div>
    );
}