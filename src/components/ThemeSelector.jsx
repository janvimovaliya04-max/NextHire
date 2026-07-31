import { useTheme } from "../context/ThemeContext";

export default function ThemeSelector() {
    const { themeName, setTheme, themes } = useTheme();

    return (
        <div>
            <h2>Choose Theme</h2>

            {Object.keys(themes).map((theme) => (
                <button
                key={theme}
                onClick={() => setTheme(theme)}
                style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                }}
                >
                    {theme}
                </button>
            ))}
        </div>
    );
}