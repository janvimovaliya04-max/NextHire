import { useTheme } from "../../context/ThemeContext";
import ThemeSelector from "../../components/ThemeSelector";
import useThemeColors from "../../hooks/useThemeColors";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
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
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  UserCog,
  Palette,
  SlidersHorizontal,
  Shield,
  Save,
  ArrowLeft,
} from "lucide-react";

export default function CandidateSettings() {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const [showThemes, setShowThemes] = useState(false);
  const { candidate } = useCandidate();
  const [emailNotification, setEmailNotification] = useState(true);

  // Colors — fully theme-driven
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Profile State to allow editing
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "Rahul",
    lastName: user?.lastName || "Sharma",
    fullName: user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || "Rahul Sharma",
    employeeId: user?.employeeId || user?.id || "CAN101",
    email: user?.email || "can@gmail.com",
    phone: user?.phone || user?.phoneNumber || "9562314785",
    role: user?.designation || user?.role || "Administrator",
    status: "Active",
  });

  // Unified clean input styling matching Candidate Portal theme
  const textFieldStyle = {
    mb: 0,
    "& .MuiInputLabel-root": {
      color: subText,
      fontSize: "0.95rem",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: primary,
    },
    "& .MuiOutlinedInput-root": {
      height: {
        xs: 52,
        sm: 56,
      },
      color: textColor,
      backgroundColor: colors.input,
      "& fieldset": {
        borderColor: borderStyle,
        borderRadius: "10px",
        transition: "border-color 0.2s ease",
      },
      "&:hover fieldset": {
        borderColor: primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: primary,
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
    bgcolor: colors.input,
    transition: "all .3s cubic-bezier(.4,0,.2,1)",
    "&:hover": {
      borderColor: primary,
      bgcolor: `${primary}08`,
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
                color: textColor,
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
          elevation={0}
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            borderRadius: 5,
            bgcolor: colors.card,
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
            transition: ".3s",

            "&:hover": {
              transform: "translateY(-4px)",
              borderColor: primary,
              boxShadow: colors.shadow,
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
            <Box sx={{ color: primary, display: "flex" }}>
              <UserCog size={18} />
            </Box>
            <Typography variant="h6" sx={{ color: textColor, fontWeight: 800 }}>
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
                value={profile.fullName}
                InputLabelProps={{ shrink: true }}
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
                value={profile.email}
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
                value={profile.role}
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
                value={profile.status}
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
                  bgcolor: `${primary}1f`,
                  color: primary,
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
                  bgcolor: `${secondary || primary}1f`,
                  color: secondary || primary,
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2,
                }}
              />
            </Box>
          </Grid>
        </Paper>

        {/* 2. Notification Settings Card */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 5,
            bgcolor: colors.card,
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
            transition: ".3s",

            "&:hover": {
              transform: "translateY(-4px)",
              borderColor: primary,
              boxShadow: colors.shadow,
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
            <Box sx={{ color: primary, display: "flex" }}>
              <SlidersHorizontal size={18} />
            </Box>
            <Typography variant="h6" sx={{ color: textColor, fontWeight: 800 }}>
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
                "&:hover": {
                  ...switchRowStyle["&:hover"],
                  transform: "translateX(4px)",
                },
              }}
            >
              <Box>
                <Typography sx={{
                  color: textColor, fontWeight: 700, fontSize: {
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
                  },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: primary,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: primary,
                  },
                }}
                checked={emailNotification}
                onChange={(e) => setEmailNotification(e.target.checked)}
              />
            </Box>

            <Box
              sx={{
                ...switchRowStyle,
                "&:hover": {
                  ...switchRowStyle["&:hover"],
                  transform: "translateX(4px)",
                },
              }}
            >
              <Box>
                <Typography sx={{
                  color: textColor, fontWeight: 700, fontSize: {
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
                  },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: primary,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: primary,
                  },
                }}
                checked={emailNotification}
                onChange={(e) => setEmailNotification(e.target.checked)}
              />
            </Box>

            <Box
              sx={{
                ...switchRowStyle,
                "&:hover": {
                  ...switchRowStyle["&:hover"],
                  transform: "translateX(4px)",
                },
              }}
            >
              <Box>
                <Typography sx={{
                  color: textColor, fontWeight: 700, fontSize: {
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
                  },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: primary,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: primary,
                  },
                }}
                checked={emailNotification}
                onChange={(e) => setEmailNotification(e.target.checked)}
              />
            </Box>
          </Box>
        </Paper>

        {/* ================= APPEARANCE ================= */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 4 },
            borderRadius: { xs: 3, md: "22px" },
            bgcolor: colors.card,
            backdropFilter: "blur(16px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                width: { xs: 40, md: 48 },
                height: { xs: 40, md: 48 },
                bgcolor: `${primary}15`,
                color: primary,
              }}
            >
              <Palette />
            </Avatar>

            <Box>
              <Typography
                sx={{
                  color: textColor,
                  fontWeight: 800,
                  fontSize: { xs: ".98rem", md: "1.1rem" },
                }}
              >
                Appearance
              </Typography>

              <Typography
                sx={{
                  color: subText,
                  fontSize: { xs: ".75rem", md: ".82rem" },
                }}
              >
                Customize the appearance of your NextHire portal.
              </Typography>
            </Box>
          </Box>

          <Box
            onClick={() => setShowThemes(!showThemes)}
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              border: `1px solid ${borderStyle}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: ".2s",
              "&:hover": {
                borderColor: primary,
                bgcolor: `${primary}08`,
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: textColor,
                  fontWeight: 700,
                }}
              >
                Theme
              </Typography>

              <Typography
                sx={{
                  color: subText,
                  fontSize: ".8rem",
                  mt: 0.3,
                }}
              >
                Choose your preferred theme
              </Typography>
            </Box>

            <Palette
              style={{
                color: primary,
                fontSize: "18px"
              }}
            />

          </Box>

          {showThemes && (
            <ThemeSelector />
          )}

        </Paper>

        {/* 3. Security Settings Card */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            borderRadius: 5,
            bgcolor: colors.card,
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
            transition: ".3s",

            "&:hover": {
              transform: "translateY(-3px)",
              borderColor: primary,
              boxShadow: colors.shadow,
            },
          }}
        >
          <Box sx={{
            display: "flex", alignItems: "center", gap: {
              xs: 1,
              sm: 1.5,
            }, mb: 3.5
          }}>
            <Box sx={{ color: primary, display: "flex" }}>
              <Shield size={18} />
            </Box>
            <Typography variant="h6" sx={{ color: textColor, fontWeight: 800 }}>
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
            justifyContent: "space-between",
            gap: {
              xs: 1.5,
              sm: 2,
            },
            flexWrap: "wrap",
          }}>
            <Box>
              <Typography sx={{
                color: textColor, fontWeight: 700, fontSize: {
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
                background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                boxShadow: `0 4px 12px ${primary}33`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${primary}, ${primary})`,
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
            to="/candidate/candidate-profile-r"
            variant="outlined"
            startIcon={<ArrowLeft size={11} />}
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
              color: subText,
              borderColor: borderStyle,
              "&:hover": {
                borderColor: primary,
                color: primary,
                bgcolor: `${primary}08`,
              }
            }}
          >
            Back to Profile
          </Button>

          <Button
            variant="contained"
            onClick={() => alert("Changes saved successfully.")}
            startIcon={<Save size={12} />}
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
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
              boxShadow: `0 4px 12px ${primary}33`,
              "&:hover": {
                background: `linear-gradient(135deg, ${primary}, ${primary})`,
                transform: "translateY(-1.5px)",
                boxShadow: `0 6px 16px ${primary}4d`,
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