import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import usersData from "../data/users.json"; // 👈 usersData import ઉમેર્યું છે

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Avatar,
  Chip,
  InputAdornment,
  IconButton,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { darkMode } = useTheme();
  const subText = darkMode ? "#94a3b8" : "#475569";

  const role = searchParams.get("role");

  // Dynamic Theme configurations for each role
  const getRoleTheme = (userRole) => {
    switch (userRole) {
      case "hr":
        return {
          accent: "#2563eb",
          gradient: "linear-gradient(135deg, #2563eb, #3b82f6)",
          hoverGradient: "linear-gradient(135deg, #1d4ed8, #2563eb)",
          glow: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0) 70%)",
          chipBg: darkMode ? "rgba(37, 99, 235, 0.15)" : "#eff6ff",
          chipText: "#2563eb",
        };
      case "candidate":
        return {
          accent: "#10b981",
          gradient: "linear-gradient(135deg, #10b981, #34d399)",
          hoverGradient: "linear-gradient(135deg, #059669, #10b981)",
          glow: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0) 70%)",
          chipBg: darkMode ? "rgba(16, 185, 129, 0.15)" : "#ecfdf5",
          chipText: "#10b981",
        };
      case "interviewer":
        return {
          accent: "#8b5cf6",
          gradient: "linear-gradient(135deg, #8b5cf6, #c084fc)",
          hoverGradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
          glow: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)",
          chipBg: darkMode ? "rgba(139, 92, 246, 0.15)" : "#f5f3ff",
          chipText: "#8b5cf6",
        };
      default:
        return {
          accent: "#2563eb",
          gradient: "linear-gradient(135deg, #2563eb, #7c3aed)",
          hoverGradient: "linear-gradient(135deg, #1d4ed8, #6d28d9)",
          glow: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0) 70%)",
          chipBg: darkMode ? "rgba(37, 99, 235, 0.15)" : "#eff6ff",
          chipText: "#2563eb",
        };
    }
  };

  const roleTheme = getRoleTheme(role);

  const handleLogin = (e) => {
    e?.preventDefault();

    // 1. JSON Data માંથી matching user શોધો (username અથવા email બંને ચાલે)
    const foundUser = usersData.find(
      (user) =>
        (user.username === username || user.email === username) &&
        user.password === password
    );

    if (foundUser) {
      // 2. LocalStorage માં user data સેટ કરો
      localStorage.setItem("accessToken", foundUser.accessToken || "mock-token");
      localStorage.setItem("refreshToken", foundUser.refreshToken || "mock-refresh-token");
      localStorage.setItem("userData", JSON.stringify(foundUser));

      // 3. User ના પોતાના Role અથવા URL ના Role પ્રમાણે Navigation
      const targetRole = role || foundUser.role;

      if (targetRole === "hr") {
        navigate("/hr");
      } else if (targetRole === "candidate") {
        navigate("/candidate");
      } else if (targetRole === "interviewer") {
        navigate("/interviewer");
      } else {
        navigate("/");
      }
    } else {
      alert("Invalid Username or Password!");
    }
  };

  const textFieldStyle = {
    mb: { xs: 1.6, sm: 2.5 },
    "& .MuiInputLabel-root": {
      color: darkMode ? "#94a3b8" : "#64748b",
      fontSize: "0.95rem",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: roleTheme.accent,
    },
    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#ffffff" : "#0f172a",
      backgroundColor: darkMode
        ? "rgba(15, 23, 42, 0.55)"
        : "rgba(255, 255, 255, 0.4)",
      "& fieldset": {
        borderColor: darkMode
          ? "rgba(148,163,184,0.35)"
          : "rgba(0, 0, 0, 0.12)",
        borderRadius: "10px",
        transition: "all 0.25s ease",
      },
      "&:hover fieldset": {
        borderColor: darkMode
          ? "rgba(255,255,255,0.35)"
          : roleTheme.accent,
      },
      "&.Mui-focused fieldset": {
        borderColor: roleTheme.accent,
        borderWidth: "2px",
      },
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 4 },
        position: "relative",
        bgcolor: darkMode ? "#0b0f19" : "#f8fafc",
        background: darkMode
          ? `radial-gradient(ellipse at center, #111827 0%, #0b0f19 80%)`
          : `radial-gradient(ellipse at center, #f0fdf4 0%, #f8fafc 80%)`,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: { xs: 280, sm: 400, md: 500 },
          height: { xs: 280, sm: 400, md: 500 },
          borderRadius: "50%",
          background: roleTheme.glow,
          filter: "blur(120px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: { xs: 6, sm: 24 },
          left: { xs: 12, sm: 24 },
          zIndex: 10,
        }}
      >
        <Button
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            navigate("/", { state: { restorePortal: true } });
          }}
          sx={{
            color: darkMode ? "#94a3b8" : "#475569",
            textTransform: "none",
            fontWeight: 600,
            mb: { xs: 1, md: 3 },
            fontSize: { xs: ".75rem", sm: ".9rem" },
            "&:hover": {
              color: roleTheme.accent,
              background: "transparent",
            },
          }}
        >
          Back to Home
        </Button>
      </Box>

      <Paper
        sx={{
          mx: "auto",
          width: "100%",
          maxWidth: { xs: "100%", sm: 450, md: 480 },
          p: { xs: 2, sm: 4, md: 5 },
          borderRadius: 5,
          position: "relative",
          zIndex: 1,
          bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(16px)",
          color: darkMode ? "#ffffff" : "#0f172a",
          border: darkMode
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.05)",
          boxShadow: darkMode
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.06)",
        }}
      >
        <Box textAlign="center" sx={{ mb: { xs: 1, sm: 2 } }}>
          <Avatar
            sx={{
              width: { xs: 48, sm: 64 },
              height: { xs: 48, sm: 64 },
              fontSize: { xs: 20, sm: 26 },
              mx: "auto",
              mb: { xs: 1.5, sm: 2.5 },
              fontWeight: 800,
              background: roleTheme.gradient,
              boxShadow: `0 8px 20px ${roleTheme.accent}33`,
            }}
          >
            N
          </Avatar>

          {role && (
            <Chip
              label={`${role.toUpperCase()} PORTAL`}
              sx={{
                display: "flex",
                width: "fit-content",
                mx: "auto",
                mb: 2,
                bgcolor: roleTheme.chipBg,
                color: roleTheme.chipText,
                fontWeight: 800,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                borderRadius: "6px",
                border: `1px solid ${roleTheme.accent}33`,
              }}
            />
          )}
          <Typography
            sx={{
              color: subText,
              fontSize: "0.95rem",
              lineHeight: 1.5,
            }}
          >
            {role
              ? `Please enter your ${role} credentials to continue`
              : "Sign in to access your NextHire account"}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} noValidate autoComplete="off">
          <TextField
            size="small"
            fullWidth
            label="Username or Email"
            variant="outlined"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={textFieldStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 1,
              mt: { xs: 1, sm: 2 },
              mb: { xs: 0.5, sm: 1 },
            }}
          >
            <FormControlLabel
              sx={{
                m: 0,
                "& .MuiFormControlLabel-label": {
                  color: darkMode ? "#cbd5e1" : "#475569",
                  fontSize: { xs: ".82rem", sm: ".88rem" },
                  fontWeight: 500,
                },
              }}
              control={
                <Checkbox
                  sx={{
                    color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)",
                    p: 0.8,
                    mr: 0.5,
                    "&.Mui-checked": {
                      color: roleTheme.accent,
                    },
                  }}
                />
              }
              label="Remember me"
            />

            <Typography
              component="a"
              href="#"
              sx={{
                color: roleTheme.accent,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.88rem",
                transition: "opacity 0.2s",
                "&:hover": {
                  opacity: 0.85,
                },
              }}
            >
              Forgot Password?
            </Typography>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              py: { xs: 1.15, sm: 1.7 },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "1rem",
              background: roleTheme.gradient,
              boxShadow: `0 8px 25px ${roleTheme.accent}22`,
              transition: "all 0.3s ease",
              "&:hover": {
                background: roleTheme.hoverGradient,
                transform: "translateY(-1px)",
                boxShadow: `0 12px 30px ${roleTheme.accent}33`,
              },
            }}
          >
            Sign In
          </Button>
        </Box>

        <Typography
          align="center"
          sx={{
            mt: { xs: 2, sm: 4 },
            fontSize: { xs: ".82rem", sm: ".9rem" },
            color: subText,
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: roleTheme.accent,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}