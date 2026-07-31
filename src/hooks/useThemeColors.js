import { useTheme } from "../context/ThemeContext";

export default function useThemeColors() {
    const { colors } = useTheme();

    return colors;
}