import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  Box,
} from "@mui/material";

export default function InterviewerSettings() {
  const { darkMode } = useTheme();

  const textFieldStyle = {
    mb: 2.5,
    "& .MuiInputLabel-root": {
      fontSize: {
        xs: ".9rem",
        md: "1rem"
      },
      color: darkMode ? "#cbd5e1" : "#64748b",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#14b8a6",
    },

    "& .MuiOutlinedInput-root": {
      height: {
        xs: 52,
        md: 56
      },
      backgroundColor: darkMode
        ? "rgba(15,23,42,.45)"
        : "#fff",

      borderRadius: "12px",

      "& fieldset": {
        borderColor: darkMode
          ? "rgba(148,163,184,.3)"
          : "#cbd5e1",
      },

      "&:hover fieldset": {
        borderColor: "#14b8a6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#14b8a6",
      },
    },

    // TEXT COLOR
    "& .MuiInputBase-input": {
      color: darkMode ? "#ffffff" : "#0f172a",
      WebkitTextFillColor: darkMode ? "#ffffff" : "#0f172a",
    },

    // READONLY TEXT
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: darkMode ? "#ffffff" : "#0f172a",
    },
  };

  const paperStyle = {
    p: {
      xs: 2,
      sm: 3,
      md: 4
    },
    borderRadius: 5,

    bgcolor: darkMode
      ? "rgba(30,41,59,.35)"
      : "rgba(255,255,255,.85)",

    backdropFilter: "blur(10px)",

    border: `1.5px solid ${darkMode
      ? "rgba(148,163,184,.22)"
      : "rgba(0,0,0,.08)"
      }`,

    transition: "all .3s ease",

    "&:hover": {

      transform: "translateY(-4px)",

      boxShadow: darkMode
        ? "0 18px 35px rgba(0,0,0,.4)"
        : "0 18px 35px rgba(0,0,0,.08)"
    },
  };

  const switchStyle = {
    transform: "scale(1.05)",
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#14b8a6",
    },

    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#14b8a6",
    },
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: {
      xs: 2,
      sm: 2.5
    },
    borderRadius: 4,
    bgcolor: darkMode
      ? "rgba(255,255,255,.03)"
      : "#f8fafc",

    transition: ".2s",

    "&:hover": {

      transform: "translateX(4px)",

      bgcolor: darkMode
        ? "rgba(20,184,166,.08)"
        : "rgba(20,184,166,.04)"
    },
    border: darkMode ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.03)",
  };

  return (
    <InterviewerLayout>

      {/* Header Title */}

      <Typography
        sx={{
          fontWeight: 900,
          letterSpacing: "-.03em",

          fontSize: {
            xs: "1.35rem",
            sm: "1.8rem",
            md: "2.3rem"
          },

          mb: {
            xs: 1,
            sm: 2,
            md: 3,
          },

          color: darkMode ? "#fff" : "#0f172a"
        }}
      >
        Settings
      </Typography>
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* Account Settings Section */}
        <Paper elevation={6} sx={paperStyle}
        >
          <Typography
            sx={{
              fontWeight: 800,

              fontSize: {
                xs: "1.1rem",
                md: "1.25rem"
              },

              mb: 3,

              color: darkMode ? "#fff" : "#0f172a"
            }}
          >
            Account Settings
          </Typography>

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2,1fr)"
              },

              gap: 3
            }}
          >
            <TextField
              fullWidth
              label="Full Name"
              value="Rahul Sharma"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Email"
              value="rahul@nexthire.com"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={textFieldStyle}
            />
          </Box>
        </Paper>

        {/* Notification Settings Section */}
        <Paper elevation={6} sx={paperStyle}>
          <Typography
            sx={{
              fontWeight: 800,

              fontSize: {
                xs: "1.1rem",
                md: "1.25rem"
              },

              mb: 3,

              color: darkMode ? "#fff" : "#0f172a"
            }}
          >
            Notification Settings
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={rowStyle}>
              <Typography fontWeight="600" sx={{
                color: darkMode ? "#fff" : "#0f172a", fontSize: {
                  xs: ".9rem",
                  md: ".98rem"
                }
              }}>
                Email Notifications
              </Typography>
              <Switch defaultChecked sx={switchStyle} />
            </Box>

            <Box sx={rowStyle}>
              <Typography fontWeight="600" sx={{ color: darkMode ? "#fff" : "#0f172a", fontSize: "0.95rem" }}>
                Interview Reminders
              </Typography>
              <Switch defaultChecked sx={switchStyle} />
            </Box>

            <Box sx={rowStyle}>
              <Typography fontWeight="600" sx={{ color: darkMode ? "#fff" : "#0f172a", fontSize: "0.95rem" }}>
                Assessment Alerts
              </Typography>
              <Switch defaultChecked sx={switchStyle} />
            </Box>

            <Box sx={rowStyle}>
              <Typography fontWeight="600" sx={{ color: darkMode ? "#fff" : "#0f172a", fontSize: "0.95rem" }}>
                Feedback Updates
              </Typography>
              <Switch sx={switchStyle} />
            </Box>
          </Box>
        </Paper>

        {/* Security Settings Section */}
        <Paper elevation={6} sx={paperStyle}>
          <Typography
            sx={{
              fontWeight: 800,

              fontSize: {
                xs: "1.1rem",
                md: "1.25rem"
              },

              mb: 3,

              color: darkMode ? "#fff" : "#0f172a"
            }}
          >
            Security Settings
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row"
              },

              alignItems: {
                xs: "flex-start",
                sm: "center"
              },
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,

                  fontSize: {
                    xs: "1.1rem",
                    md: "1.25rem"
                  },

                  mb: 3,

                  color: darkMode ? "#fff" : "#0f172a"
                }}
              >
                Password
              </Typography>
              <Typography variant="caption"
                sx={{ color: darkMode ? "#cbd5e1" : "#475569" }}>
                Last changed 15 days ago
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => alert("Change Password Clicked")}
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto"
                },
                background: "linear-gradient(90deg,#14b8a6,#0f766e)",
                "&:hover": {
                  background: "linear-gradient(90deg,#0d9488,#115e59)",

                  transform: "translateY(-2px)",

                  boxShadow: "0 8px 20px rgba(20,184,166,.35)"
                },
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
                px: {
                  xs: 2,
                  sm: 4
                },

                py: 1.3,
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",
              }}
            >
              Change Password
            </Button>
          </Box>
        </Paper>

        {/* Action Buttons Panel */}
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "stretch",
              sm: "flex-end"
            },

            flexDirection: {
              xs: "column",
              sm: "row"
            },
            gap: 2,
            mt: 1,
          }}
        >
          <Button
            component={Link}
            to="/interviewer-profile"
            variant="outlined"
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              px: { xs: 2, sm: 4 },
              py: 1.3,
              color: "#14b8a6",
              borderColor: "#14b8a6",
              "&:hover": {
                bgcolor: "rgba(20,184,166,.08)",
                borderColor: "#0d9488",
                color: "#0d9488",
              },
            }}
          >
            Back to Profile
          </Button>

          <Button
            variant="contained"
            onClick={() => alert("Settings Saved")}
            sx={{
              width: {
                xs: "100%",
                sm: "auto"
              },
              background: "linear-gradient(90deg,#14b8a6,#0f766e)",
              "&:hover": {
                background: "linear-gradient(90deg,#0d9488,#115e59)",

                transform: "translateY(-2px)",

                boxShadow: "0 8px 20px rgba(20,184,166,.35)"
              },
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
              px: {
                xs: 3,
                sm: 5
              },

              py: 1.3,
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",
              transition: "all 0.2s ease",
            }}
          >
            Save Settings
          </Button>
        </Box>
      </Box>

    </InterviewerLayout>
  );
}