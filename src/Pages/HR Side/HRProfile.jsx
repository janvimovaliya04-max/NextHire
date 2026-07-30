import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import HRLayout from "../../Layouts/HRLayout";
import {
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Box,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  FaUserEdit,
  FaKey,
  FaArrowRight,
} from "react-icons/fa";

export default function HRProfile() {
  const { darkMode } = useTheme();
  const borderStyle = darkMode
    ? "rgba(148, 163, 184, 0.18)"
    : "rgba(0, 0, 0, 0.08)";

  // Cohesive styling for the read-only form elements
  const textFieldStyle = {
    mb: 2.5,
    "& .MuiInputLabel-root": {
      color: darkMode ? "#94a3b8" : "#64748b",
      fontSize: {
        xs: "0.82rem",
        md: "0.95rem",
      },
    },
    "& .MuiFormHelperText-root": {

      fontSize: {
        xs: "0.72rem",
        md: "0.8rem",
      },

    },
    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#ffffff" : "#0f172a",
      fontSize: {
        xs: "0.9rem",
        md: "1rem",
      },

      py: {
        xs: -5,
        md: 1.8,
      },
      backgroundColor: darkMode
        ? "rgba(15, 23, 42, 0.55)"
        : "rgba(255,255,255,0.6)",

      "& fieldset": {
        borderColor: darkMode
          ? "rgba(148,163,184,0.35)"
          : "rgba(0,0,0,0.12)",
        borderRadius: "10px",
        transition: "all .25s ease",
      },

      "&:hover fieldset": {
        borderColor: darkMode
          ? "rgba(255,255,255,0.45)"
          : "#2563eb",
      },
    },
  };

  return (
    <HRLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: 3,
            md: 4,
          },
          pb: {
            xs: 2,
            md: 0,
          }
        }}
      >

        {/* Page Header */}
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "1.45rem",
                sm: "1.7rem",
                md: "2rem",
                lg: "2.2rem",
              },
              mb: {
                xs: 0,
                md: 0.5,
              },
              fontWeight: 850,
              letterSpacing: "-0.03em",
            }}
          >
            HR Profile
          </Typography>
        </Box>

        {/* Profile Card Summary */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4
            },
            borderRadius: {
              xs: 3,
              md: 5,
            },
            bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,

            // Premium Multi-layer Shadow
            boxShadow: darkMode
              ? `
          0 10px 20px rgba(0,0,0,0.30),
          0 4px 8px rgba(0,0,0,0.20)
        `
              : `
          0 12px 24px rgba(15,23,42,0.08),
          0 2px 6px rgba(15,23,42,0.05)
        `,

            transition: "all 0.3s ease",

            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: darkMode
                ? `
            0 18px 36px rgba(0,0,0,0.40),
            0 8px 12px rgba(0,0,0,0.25)
          `
                : `
            0 20px 40px rgba(15,23,42,0.12),
            0 6px 12px rgba(15,23,42,0.08)
          `,
            },
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row"
            },
            justifyContent: "space-between",
            alignItems: "center",
            gap: {
              xs: 2.5,
              md: 4
            }
          }}
          >
            <Box sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row"
              },
              alignItems: "center",
              gap: {
                xs: 2,
                md: 3.5
              },
              textAlign: {
                xs: "center",
                sm: "left"
              }
            }}
            >
              {/* Premium Gradient Avatar */}
              <Avatar
                sx={{
                  width: {
                    xs: 72,
                    sm: 84,
                    md: 96,
                  },

                  height: {
                    xs: 72,
                    sm: 84,
                    md: 96,
                  },

                  fontSize: {
                    xs: "1.5rem",
                    md: "2rem",
                  },
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  fontWeight: 800,
                  boxShadow: "0 8px 24px rgba(37,99,235,0.25)",
                  border: `4px solid ${darkMode ? "rgba(30,41,59,0.9)" : "#ffffff"}`,
                }}
              >
                HR
              </Avatar>

              <Box>
                <Typography sx={{ fontSize: { xs: "1.2rem", sm: "1.45rem", md: "1.6rem", }, color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 850, letterSpacing: "-0.02em", mb: 0.5 }}>
                  HR Manager
                </Typography>
                <Typography sx={{ color: "#2563eb", fontWeight: 700, fontSize: { xs: "0.82rem", md: "0.95rem" }, }}>
                  Senior HR Manager
                </Typography>
                <Typography sx={{ color: darkMode ? "#94a3b8" : "#64748b", fontSize: { xs: "0.75rem", md: "0.85rem" }, mt: 0.5 }}>
                  hr@nexthire.com
                </Typography>
              </Box>
            </Box>

            {/* Profile Action Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Button
                component={Link}
                to="/edit-hr-profile"
                variant="contained"
                startIcon={<FaUserEdit size={13} />}
                sx={{
                  py: {
                    xs: 1,
                    md: 1.3,
                  },

                  px: {
                    xs: 2,
                    md: 3,
                  },

                  fontSize: {
                    xs: "0.82rem",
                    md: "0.88rem",
                  },
                  width: { xs: "100%", sm: "auto" },
                  borderRadius: "10px",
                  fontWeight: 700,
                  textTransform: "none",
                  background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.2)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #1d4ed8, #1e40af)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Edit Profile
              </Button>

              <Button
                variant="outlined"
                startIcon={<FaKey size={12} />}
                sx={{
                  py: 1.3,
                  px: 3,
                  width: { xs: "100%", sm: "auto" },
                  borderRadius: "10px",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.88rem",
                  color: darkMode ? "#cbd5e1" : "#475569",
                  borderColor: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
                  "&:hover": {
                    borderColor: darkMode ? "#cbd5e1" : "#475569",
                    bgcolor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Password
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Detailed Personal Information Card */}
        <Paper
          elevation={6}
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4
            },
            borderRadius: {
              xs: 3,
              md: 5,
            },
            bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,

            // Premium Multi-layer Shadow
            boxShadow: darkMode
              ? `
          0 10px 20px rgba(0,0,0,0.30),
          0 4px 8px rgba(0,0,0,0.20)
        `
              : `
          0 12px 24px rgba(15,23,42,0.08),
          0 2px 6px rgba(15,23,42,0.05)
        `,

            transition: "all 0.3s ease",

            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: darkMode
                ? `
            0 18px 36px rgba(0,0,0,0.40),
            0 8px 12px rgba(0,0,0,0.25)
          `
                : `
            0 20px 40px rgba(15,23,42,0.12),
            0 6px 12px rgba(15,23,42,0.08)
          `,
            },
          }}
        >
          <Typography sx={{ fontWeight: 800, mb: 3, color: darkMode ? "#ffffff" : "#0f172a", fontSize: { xs: "1.05rem", md: "1.25rem" }, }}>
            Personal Details
          </Typography>

          <Grid container spacing={{
            xs: 1,
            md: 2.5,
          }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Full Name"
                value="HR Manager"
                slotProps={{
                  input: {
                    readOnly: true,
                  }
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Employee ID"
                value="HR101"
                slotProps={{
                  input: {
                    readOnly: true,
                  }
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email Address"
                value="hr@gmail.com"
                slotProps={{
                  input: {
                    readOnly: true,
                  }
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone Number"
                value="9562314785"
                slotProps={{
                  input: {
                    readOnly: true,
                  }
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Department"
                value="Human Resources"
                slotProps={{
                  input: {
                    readOnly: true,
                  }
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Job Designation"
                value="Senior HR Manager"
                slotProps={{
                  input: {
                    readOnly: true,
                  }
                }}
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Global Settings Redirection Button */}
        <Box sx={{ mt: 1 }}>
          <Button
            component={Link}
            to="/settings"
            variant="contained"
            endIcon={<FaArrowRight size={12} />}
            sx={{
              py: {
                xs: 1.2,
                md: 1.5,
              },

              px: {
                xs: 2,
                md: 3.5,
              },

              fontSize: {
                xs: "0.82rem",
                md: "0.9rem",
              },
              width: { xs: "100%", sm: "auto" },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
              boxShadow: "0 4px 12px rgba(37,99,235,0.2)",
              "&:hover": {
                background: "linear-gradient(90deg, #1d4ed8, #1e40af)",
                transform: "translateY(-1.5px)",
              },
            }}
          >
            Go To Settings
          </Button>
        </Box>

      </Box>
    </HRLayout>
  );
}