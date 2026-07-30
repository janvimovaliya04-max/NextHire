import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCandidate } from "../../context/CandidateContext";
import CandidateLayout from "../../Layouts/CandidateLayout";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  Chip,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { FaUserCog, FaSlidersH, FaShieldAlt, FaSave, FaArrowLeft } from "react-icons/fa";

export default function CandidateSettings() {
  const { darkMode } = useTheme();
  const { candidate } = useCandidate();
  const [emailNotification, setEmailNotification] = useState(true);
  const subText = darkMode ? "#94a3b8" : "#475569";
  const borderStyle = darkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)";

  // Unified clean input styling matching Candidate Portal theme
  const textFieldStyle = {
    mb: 0,
    "& .MuiInputLabel-root": {
      color: darkMode ? "#94a3b8" : "#64748b",
      fontSize: "0.95rem",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#10b981", // Emerald Green Focus
    },
    "& .MuiOutlinedInput-root": {
      height: {
        xs: 52,
        sm: 56,
      },
      color: darkMode ? "#ffffff" : "#0f172a",
      backgroundColor: darkMode ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.6)",
      "& fieldset": {
        borderColor: darkMode ? "rgba(148,163,184,0.35)" : "rgba(0,0,0,0.12)",
        borderRadius: "10px",
        transition: "border-color 0.2s ease",
      },
      "&:hover fieldset": {
        borderColor: "#10b981", // Emerald
      },
      "&.Mui-focused fieldset": {
        borderColor: "#10b981", // Emerald
        borderWidth: "2px",
      },
    },
  };

  // Common switch row layout styles
  const switchRowStyle = {
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    alignItems: {
      xs: "flex-start",
      sm: "center",
    },
    gap: {
      xs: 1.5,
      sm: 2,
    },
    p: {
      xs: 1.8,
      sm: 2.3,
      md: 2.5,
    },
    borderRadius: "10px",
    border: `1px solid ${borderStyle}`,
    bgcolor: darkMode ? "rgba(15, 23, 42, 0.2)" : "rgba(0, 0, 0, 0.015)",
    transition: "all .3s cubic-bezier(.4,0,.2,1)",
    "&:hover": {
      borderColor: "#10b981", // Emerald
      bgcolor: darkMode ? "rgba(15, 23, 42, 0.35)" : "rgba(0, 0, 0, 0.025)",
    }
  };

  return (
    <CandidateLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: 3,
            sm: 4,
          },
          pb: {
            xs: 3,
            sm: 4,
          },
        }}
      >

        {/* Page Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 850,
                letterSpacing: "-0.03em",
                color: darkMode ? "#fff" : "#0f172a",
                mb: 0.5,
                fontSize: {
                  xs: "1.45rem",
                  sm: "1.8rem",
                  md: "2rem",
                  lg: "2.2rem",
                },
              }}
            >
              Settings & Preferences
            </Typography>
          </Box>
        </Box>

        {/* 1. Account Settings Card */}
        <Paper
          elevation={6}
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            borderRadius: 5,
            bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: darkMode ? "0 10px 30px rgba(0,0,0,0.25)" : "0 10px 30px rgba(0,0,0,0.02)",
            transition: ".3s",

            "&:hover": {
              transform: "translateY(-4px)",
              borderColor: "#10b981",
              boxShadow: darkMode
                ? "0 15px 35px rgba(0,0,0,.3)"
                : "0 15px 35px rgba(0,0,0,.05)",
            },
          }}
        >
          <Box sx={{
            display: "flex", alignItems: "center", gap: {
              xs: 1,
              sm: 1.5,
            }, mb: {
              xs: 2.5,
              sm: 3,
              md: 4,
            },
          }}>
            <Box sx={{ color: "#10b981", display: "flex" }}>
              <FaUserCog size={18} />
            </Box>
            <Typography variant="h6" sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 800 }}>
              Account Information
            </Typography>
          </Box>

          <Grid
            container
            spacing={{
              xs: 1.5,
              sm: 2.5,
              md: 3,
            }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={candidate?.fullName || ""}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email ID"
                value={candidate?.email || ""}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Registered Role"
                value={candidate?.role || "Candidate"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="System Status"
                value={candidate?.status || "Active"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Box
              sx={{
                display: "flex",
                gap: {
                  xs: 0.8,
                  sm: 1,
                },
                mt: {
                  xs: 2,
                  sm: 1.5,
                },
                flexWrap: "wrap",
              }}
            >
              <Button
                size="small"
                sx={{
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                  bgcolor: "rgba(16,185,129,.12)",
                  color: "#10b981",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2,
                }}
              >
                Candidate
              </Button>

              <Chip
                label="Verified"
                size="small"
                sx={{
                  bgcolor: "rgba(37,99,235,.12)",
                  color: "#2563eb",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2,
                }}
              >
                Verified
              </Chip>
            </Box>
          </Grid>
        </Paper>

        {/* 2. Notification Settings Card */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 5,
            bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: darkMode ? "0 10px 30px rgba(0,0,0,0.25)" : "0 10px 30px rgba(0,0,0,0.02)",
            transition: ".3s",

            "&:hover": {
              transform: "translateY(-4px)",
              borderColor: "#10b981",
              boxShadow: darkMode
                ? "0 15px 35px rgba(0,0,0,.3)"
                : "0 15px 35px rgba(0,0,0,.05)",
            },
          }}
        >
          <Box sx={{
            display: "flex", alignItems: "center", gap: {
              xs: 1,
              sm: 1.5,
            }, mb: {
              xs: 2.5,
              sm: 3,
              md: 4,
            },
          }}>
            <Box sx={{ color: "#10b981", display: "flex" }}>
              <FaSlidersH size={18} />
            </Box>
            <Typography variant="h6" sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 800 }}>
              Alert Preferences
            </Typography>
          </Box>

          <Box sx={{
            display: "flex", flexDirection: "column", gap: {
              xs: 1.5,
              sm: 2,
            },
          }}>
            <Box
              sx={{
                ...switchRowStyle,

                transition: ".3s",

                "&:hover": {
                  borderColor: "#10b981",
                  transform: "translateX(4px)",
                  bgcolor: darkMode
                    ? "rgba(16,185,129,.05)"
                    : "rgba(16,185,129,.02)",
                },
              }}
            >
              <Box>
                <Typography sx={{
                  color: subText, fontWeight: 700, fontSize: {
                    xs: "0.9rem",
                    sm: "0.95rem",
                  },
                }}>Email Notifications</Typography>
                <Typography sx={{
                  color: subText, fontSize: {
                    xs: "0.78rem",
                    sm: "0.82rem",
                  }, lineHeight: 1.5, mt: 0.2
                }}>Receive general status logs to your primary email inbox.</Typography>
              </Box>
              <Switch
                sx={{
                  alignSelf: {
                    xs: "flex-end",
                    sm: "center",
                  }
                }}
                checked={emailNotification}
                onChange={(e) => setEmailNotification(e.target.checked)}
              />
            </Box>

            <Box
              sx={{
                ...switchRowStyle,

                transition: ".3s",

                "&:hover": {
                  borderColor: "#10b981",
                  transform: "translateX(4px)",
                  bgcolor: darkMode
                    ? "rgba(16,185,129,.05)"
                    : "rgba(16,185,129,.02)",
                },
              }}
            >
              <Box>
                <Typography sx={{
                  color: subText, fontWeight: 700, fontSize: {
                    xs: "0.9rem",
                    sm: "0.95rem",
                  },
                }}>Application Updates</Typography>
                <Typography sx={{
                  color: subText, fontSize: {
                    xs: "0.78rem",
                    sm: "0.82rem",
                  }, lineHeight: 1.5, mt: 0.2
                }}>Get notified instantly when recruiters update your application stage.</Typography>
              </Box>
              <Switch
                sx={{
                  alignSelf: {
                    xs: "flex-end",
                    sm: "center",
                  }
                }}
                checked={emailNotification}
                onChange={(e) => setEmailNotification(e.target.checked)}
              />
            </Box>

            <Box
              sx={{
                ...switchRowStyle,

                transition: ".3s",

                "&:hover": {
                  borderColor: "#10b981",
                  transform: "translateX(4px)",
                  bgcolor: darkMode
                    ? "rgba(16,185,129,.05)"
                    : "rgba(16,185,129,.02)",
                },
              }}
            >
              <Box>
                <Typography sx={{
                  color: subText, fontWeight: 700, fontSize: {
                    xs: "0.9rem",
                    sm: "0.95rem",
                  },
                }}>Interview Reminders</Typography>
                <Typography sx={{
                  color: subText, fontSize: {
                    xs: "0.78rem",
                    sm: "0.82rem",
                  }, lineHeight: 1.5, mt: 0.2
                }}>Alert prior to scheduled technical panel assessments.</Typography>
              </Box>
              <Switch
                sx={{
                  alignSelf: {
                    xs: "flex-end",
                    sm: "center",
                  }
                }}
                checked={emailNotification}
                onChange={(e) => setEmailNotification(e.target.checked)}
              />
            </Box>
          </Box>
        </Paper>

        {/* 3. Security Settings Card */}
        <Paper
          elevation={6}
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            borderRadius: 5,
            bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: darkMode ? "0 10px 30px rgba(0,0,0,0.25)" : "0 10px 30px rgba(0,0,0,0.02)",
            transition: ".3s",

            "&:hover": {
              transform: "translateY(-3px)",
              borderColor: "#10b981",
              boxShadow: darkMode
                ? "0 15px 35px rgba(0,0,0,.3)"
                : "0 15px 35px rgba(0,0,0,.05)",
            },
          }}
        >
          <Box sx={{
            display: "flex", alignItems: "center", gap: {
              xs: 1,
              sm: 1.5,
            }, mb: 3.5
          }}>
            <Box sx={{ color: "#10b981", display: "flex" }}>
              <FaShieldAlt size={18} />
            </Box>
            <Typography variant="h6" sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 800 }}>
              Security Parameters
            </Typography>
          </Box>

          <Box sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            gap: {
              xs: 1.5,
              sm: 2,
            }, flexWrap: "wrap", gap: 3
          }}>
            <Box>
              <Typography sx={{
                color: subText, fontWeight: 700, fontSize: {
                  xs: "0.9rem",
                  sm: "0.95rem",
                }, mb: 0.5
              }}>
                Account Password
              </Typography>
              <Typography sx={{ color: subText, fontSize: "0.85rem" }}>
                Password was last updated 15 days ago.
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => alert("Change Password Triggered")}
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },

                py: 1.2,

                px: {
                  xs: 2,
                  sm: 3,
                },
                borderRadius: "10px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: {
                  xs: "0.85rem",
                  sm: "0.9rem",
                },
                background: "linear-gradient(90deg, #10b981, #059669)",
                boxShadow: "0 4px 12px rgba(16,185,129,0.2)",
                "&:hover": {
                  borderColor: "#10b981",
                  background: "linear-gradient(90deg,#059669,#047857)",
                  transform: "translateY(-1px)",
                }
              }}
            >
              Change Password
            </Button>
          </Box>
        </Paper>

        {/* Global Action Triggers */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: {
              xs: "stretch",
              sm: "flex-end",
            },
            alignItems: "center",
            gap: {
              xs: 1.5,
              sm: 2,
            },
            mt: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          <Button
            component={Link}
            to="/candidate-profile-r"
            variant="outlined"
            startIcon={<FaArrowLeft size={11} />}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              py: {
                xs: 1.2,
                sm: 1.4,
              },

              px: {
                xs: 2.2,
                sm: 3,
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: {
                xs: "0.85rem",
                sm: "0.9rem",
              },
              color: darkMode ? "#cbd5e1" : "#475569",
              borderColor: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
              "&:hover": {
                borderColor: darkMode ? "#cbd5e1" : "#475569",
                bgcolor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              }
            }}
          >
            Back to Profile
          </Button>

          <Button
            variant="contained"
            onClick={() => alert("Changes saved successfully.")}
            startIcon={<FaSave size={12} />}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              py: {
                xs: 1.2,
                sm: 1.4,
              },

              px: {
                xs: 2.2,
                sm: 3,
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: {
                xs: "0.85rem",
                sm: "0.9rem",
              },
              background: "linear-gradient(90deg, #10b981, #059669)",
              boxShadow: "0 4px 12px rgba(16,185,129,0.2)",
              "&:hover": {
                background: "linear-gradient(90deg, #059669, #047857)",
                transform: "translateY(-1.5px)",
                boxShadow: "0 6px 16px rgba(16,185,129,0.3)",
              }
            }}
          >
            Save Preferences
          </Button>
        </Box>

      </Box>
    </CandidateLayout>
  );
}