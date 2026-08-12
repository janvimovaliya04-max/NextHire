import { useTheme } from "../context/ThemeContext";

export default function ThemeSelector() {
    const { themeName, setTheme, themes } = useTheme();
    const currentTheme = themes[themeName];

    return (
        <div
            style={{
                marginTop: "16px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "12px",
            }}
        >
            {Object.keys(themes).map((theme) => (
                <button
                    key={theme}
                    onClick={() => setTheme(theme)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "14px 16px",
                        borderRadius: "12px",
                        border:
                            themeName === theme
                                ? `2px solid ${currentTheme.colors.primary}`
                                : `1px solid ${currentTheme.colors.border}`,
                        background:
                            themeName === theme
                                ? currentTheme.colors.activeMenu
                                : currentTheme.colors.card,
                        color:
                            themeName === theme
                                ? currentTheme.colors.activeText
                                : currentTheme.colors.text,
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "14px",
                        textTransform: "capitalize",
                        transition: "0.2s",
                    }}
                >
                    <span
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            flexShrink: 0,
                            background: themes[theme].colors.primary,
                            border: themeName === theme
                                ? "2px solid rgba(255,255,255,0.7)"
                                : `1px solid ${themes[theme].colors.border}`,
                        }}
                    />
                    {theme}
                </button>
            ))}
        </div>
    );
}