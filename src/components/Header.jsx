import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import { Moon, Sun } from "lucide-react";

export default function Header({
  darkMode,
  setDarkMode,
  textColor,
  pageTransition,
}) {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: 100,
          zIndex: 1200,
          backgroundColor: darkMode
            ? "rgba(11,15,25,.75)"
            : "rgba(255,255,255,.80)",
          backdropFilter: "blur(12px)",
          borderBottom: darkMode
            ? "1px solid rgba(255,255,255,.06)"
            : "1px solid rgba(0,0,0,.05)",
          color: textColor,
          transition:
            "background-color .45s ease, border-color .45s ease, color .45s ease",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "72px !important",
            px: { xs: 2, md: 6 },
          }}
        >

          {/* LOGO */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="/NextHirelogo.png"
              alt="NextHire"
              style={{
                height: 130,
                objectFit: "contain",
              }}
            />
          </Box>

          {/* THEME TOGGLE */}
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              bgcolor: darkMode
                ? "rgba(255,255,255,.05)"
                : "rgba(0,0,0,.03)",
              border: darkMode
                ? "1px solid rgba(255,255,255,.10)"
                : "1px solid rgba(0,0,0,.08)",
              transition:
                "background-color .3s ease, border-color .3s ease",
              "&:hover": {
                bgcolor: darkMode
                  ? "rgba(255,255,255,.10)"
                  : "rgba(0,0,0,.06)",
              },
            }}
          >
            {darkMode ? (
              <Sun sx={{ color: "#facc15" }} />
            ) : (
              <Moon sx={{ color: "#1e293b" }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Spacer */}
      <Box sx={{ height: 72 }} />
    </>
  );
}