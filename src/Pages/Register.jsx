import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Chip,
  Button,
  Avatar,
  Divider,
  MenuItem,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Register() {
  const { darkMode } = useTheme();

  // State management
  const [role, setRole] = useState("candidate"); // Dynamic role state for dynamic theme coloring
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const subText = darkMode ? "#94a3b8" : "#475569";

  // Dynamic Theme configurations based on selected registration role
  const getRoleTheme = (userRole) => {
    switch (userRole) {
      case "hr":
        return {
          accent: "#2563eb",
          gradient: "linear-gradient(135deg, #2563eb, #3b82f6)",
          hoverGradient: "linear-gradient(135deg, #1d4ed8, #2563eb)",
          glow: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0) 70%)",
        };
      case "candidate":
        return {
          accent: "#10b981",
          gradient: "linear-gradient(135deg, #10b981, #34d399)",
          hoverGradient: "linear-gradient(135deg, #059669, #10b981)",
          glow: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0) 70%)",
        };
      case "interviewer":
        return {
          accent: "#8b5cf6",
          gradient: "linear-gradient(135deg, #8b5cf6, #c084fc)",
          hoverGradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
          glow: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)",
        };
      default:
        return {
          accent: "#2563eb",
          gradient: "linear-gradient(135deg, #2563eb, #7c3aed)",
          hoverGradient: "linear-gradient(135deg, #1d4ed8, #6d28d9)",
          glow: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0) 70%)",
        };
    }
  };

  const roleTheme = getRoleTheme(role);

  // Modular styling configuration for the form inputs
  const textFieldStyle = {
    mb: 2.5,
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
        : "rgba(255, 255, 255, 0.5)",
      "& fieldset": {
        borderColor: darkMode
          ? "rgba(148,163,184,0.35)"
          : "rgba(0,0,0,0.12)",
        borderRadius: "10px",
        transition: "all 0.25s ease",
      },

      "& .MuiInputBase-input": {
        fontSize: {
          xs: ".9rem",
          sm: ".95rem",
          md: "1rem",
        },
      },

      "& .MuiInputLabel-root": {
        fontSize: {
          xs: ".9rem",
          sm: ".95rem",
        },
      },

      "&:hover fieldset": {
        borderColor: darkMode
          ? "rgba(255,255,255,0.45)"
          : roleTheme.accent,
      },

      "&.Mui-focused fieldset": {
        borderColor: roleTheme.accent,
        borderWidth: "2px",
      },
    },
    "& .MuiSelect-icon": {
      color: darkMode ? "#94a3b8" : "#475569",
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
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
        px: { xs: 2, sm: 3 },
        py: { xs: 7, sm: 5, md: 6 },
        position: "relative",
        bgcolor: darkMode ? "#0b0f19" : "#f8fafc",
        background: darkMode
          ? `radial-gradient(ellipse at center, #111827 0%, #0b0f19 80%)`
          : `radial-gradient(ellipse at center, #f0fdf4 0%, #f8fafc 80%)`,
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Glow Blobs based on theme */}
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

      {/* Dynamic Back Navigation */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 6, sm: 24 },
          left: { xs: 6, sm: 24 },
          zIndex: 10,
        }}
      >
        <Button
          size="small"
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: darkMode ? "#94a3b8" : "#475569",
            textTransform: "none",
            fontWeight: 600,
            fontSize: {
              xs: ".75rem",
              sm: ".9rem",
            },
            "&:hover": {
              color: roleTheme.accent,
              background: "transparent",
            }
          }}
        >
          Back to Home
        </Button>
      </Box>

      {/* Premium Glassmorphic Card Container */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: 470,
            md: 500,
          },
          p: {
            xs: 2.25,
            sm: 4,
            md: 5
          },
          borderRadius: {
            xs: 3,
            sm: 4,
            md: 5
          },
          mt: {
            xs: 1,
            md: 0,
          },
          position: "relative",
          zIndex: 1,
          bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(16px)",
          color: darkMode ? "#ffffff" : "#0f172a",
          border: darkMode
            ? "1px solid rgba(148,163,184,0.18)"
            : "1px solid rgba(0,0,0,0.06)",
          boxShadow: darkMode
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.06)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: darkMode
              ? `0 30px 60px rgba(0, 0, 0, 0.5), 0 0 25px ${roleTheme.accent}15`
              : `0 30px 60px rgba(0, 0, 0, 0.08), 0 0 25px ${roleTheme.accent}15`,
          },
        }}
      >
        <Box
          textAlign="center"
          sx={{
            mb: {
              xs: 2.5,
              sm: 4,
            },
          }}
        >
          <Avatar
            sx={{
              width: { xs: 48, sm: 60, md: 64 },

              height: { xs: 48, sm: 60, md: 64 },

              fontSize: {
                xs: 22,
                sm: 24,
                md: 26
              },
              mx: "auto",
              mb: {
                xs: 1.5,
                sm: 2.5,
              },
              fontWeight: 800,
              background: roleTheme.gradient,
              boxShadow: `0 8px 20px ${roleTheme.accent}33`,
            }}
          >
            N
          </Avatar>

          <Chip
            label={`${role.toUpperCase()} PORTAL`}
            sx={{
              display: "flex",
              width: "fit-content",
              mx: "auto", // Centers the chip
              bgcolor:
                role === "hr"
                  ? darkMode
                    ? "rgba(37,99,235,.15)"
                    : "#eff6ff"
                  : role === "candidate"
                    ? darkMode
                      ? "rgba(16,185,129,.15)"
                      : "#ecfdf5"
                    : darkMode
                      ? "rgba(139,92,246,.15)"
                      : "#f5f3ff",

              color: roleTheme.accent,

              fontWeight: 800,
              fontSize: {
                xs: ".68rem",
                sm: ".75rem",
              },
              height: {
                xs: 28,
                sm: 32,
              },

              border: `1px solid ${roleTheme.accent}33`,

              borderRadius: "6px",

              mb: {
                xs: 1.5,
                sm: 2,
              },
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
              fontSize: {
                xs: "1.5rem",
                sm: "1.8rem",
                md: "2.2rem"
              },
              mb: {
                xs: .75,
                sm: 1.5,
              },
            }}
          >
            Create Account
          </Typography>

        </Box>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            size="small"
            fullWidth
            label="Full Name"
            variant="outlined"
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            label="Email Address"
            variant="outlined"
            type="email"
            sx={textFieldStyle}
          />

          {/* Interactive Select Field that morphs UI color on change */}
          <TextField
            size="small"
            fullWidth
            select
            label="Register As"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={textFieldStyle}
          >
            <MenuItem value="candidate">Candidate</MenuItem>
            <MenuItem value="hr">HR Manager</MenuItem>
            <MenuItem value="interviewer">Interviewer</MenuItem>
          </TextField>

          <TextField
            size="small"
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
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

          <TextField
            size="small"
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            sx={textFieldStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControlLabel
            sx={{
              mt: .5,
              mb: 2,
              "& .MuiFormControlLabel-label": {
                color: darkMode ? "#cbd5e1" : "#475569",
                fontSize: {
                  xs: ".75rem",
                  sm: ".82rem",
                  md: ".85rem"
                },
                fontWeight: 500,
              }
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
            label="I agree to the Terms & Conditions and Privacy Policy"
          />

          {/* Dynamic Registration Trigger */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              py: {
                xs: 1.4,
                sm: 1.6,
                md: 1.7
              },

              fontSize: {
                xs: ".9rem",
                sm: ".95rem",
                md: "1rem"
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
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
            Create Account
          </Button>

          <Divider sx={{ my: { xs: 2.5, sm: 3.5 }, borderColor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)" }}>
            <Typography sx={{ color: subText, fontSize: "0.8rem", fontWeight: 700 }}>OR</Typography>
          </Divider>

          {/* Google Button */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon sx={{ fontSize: 20 }} />}
            sx={{
              py: {
                xs: 1.4,
                sm: 1.5,
                md: 1.6
              },

              fontSize: {
                xs: ".85rem",
                sm: ".9rem",
                md: ".95rem"
              },
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              color: darkMode ? "#ffffff" : "#475569",
              borderColor: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
              bgcolor: darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: roleTheme.accent,
                bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              }
            }}
          >
            Continue with Google
          </Button>
        </Box>

        <Typography
          align="center"
          sx={{
            mt: {
              xs: 3,
              sm: 4,
            },
            fontSize: {
              xs: ".8rem",
              sm: ".85rem",
              md: ".9rem"
            },
            color: subText,
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: roleTheme.accent,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}