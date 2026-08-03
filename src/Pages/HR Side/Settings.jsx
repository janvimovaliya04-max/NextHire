import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import HRLayout from "../../Layouts/HRLayout";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  Box,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  FaBuilding,
  FaSun,
  FaClock,
  FaUserCog,
  FaSlidersH,
  FaShieldAlt,
  FaSave,
  FaArrowLeft,
  FaMoon,
  FaBell,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaBriefcase,
} from "react-icons/fa";

export default function Settings() {

  const { darkMode, setDarkMode } = useTheme();
  const [twoFactor, setTwoFactor] = useState(() => {
    const saved = localStorage.getItem("twoFactor");
    return saved ? JSON.parse(saved) : false;
  });
  const borderStyle = darkMode
    ? "rgba(148,163,184,.12)"
    : "rgba(15,23,42,.08)";

  useEffect(() => {
    localStorage.setItem(
      "twoFactor",
      JSON.stringify(twoFactor)
    );
  }, [twoFactor]);

  // Colors //
  const primary = "#2563EB";
  const secondary = "#3B82F6";
  const lightBlue = "#60A5FA";
  const darkBlue = "#1D4ED8";
  const textColor = darkMode ? "#FFFFFF" : "#0F172A";
  const cards = [
    {
      title: "Department",
      value: "Human Resources",
      icon: <FaBuilding />,
      color: "#2563EB",
    },
    {
      title: "Role",
      value: "Administrator",
      icon: <FaUserShield />,
      color: "#3B82F6",
    },
    {
      title: "Theme",
      value: darkMode ? "Dark" : "Light",
      icon: darkMode ? <FaMoon /> : <FaSun />,
      color: "#F59E0B",
    },
    {
      title: "Last Login",
      value: "Today",
      icon: <FaClock />,
      color: "#10B981",
    },
  ];

  const subText = darkMode
    ? "#94A3B8"
    : "#475569";

  const borderColor = darkMode
    ? "rgba(255,255,255,.08)"
    : "rgba(15,23,42,.06)";

  const glassBg = darkMode
    ? "rgba(30,41,59,.45)"
    : "rgba(255,255,255,.80)";

  // Common Card Style //
  const cardStyle = {
    borderRadius: { xs: 2.5, sm: 3, md: 4 },
    bgcolor: glassBg,
    backdropFilter: "blur(10px)",
    border: `1px solid ${borderColor}`,
    transition: ".3s",

    "&:hover": {
      transform: "translateY(-4px)",
      borderColor: primary,
      boxShadow: darkMode
        ? "0 16px 35px rgba(0,0,0,.35)"
        : "0 16px 35px rgba(15,23,42,.08)",
    },
  };

  // TextField Style //
  const textFieldStyle = {
    "& .MuiInputLabel-root": {
      color: subText,
    },
    "& .MuiOutlinedInput-root": {
      fontSize: { xs: ".85rem", md: ".95rem" },
      color: textColor,
      background: darkMode
        ? "rgba(15,23,42,.55)"
        : "rgba(255,255,255,.65)",
      borderRadius: { xs: "10px", md: "12px" },
      "& fieldset": {
        borderColor: borderColor,
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

  // Switch Card //
  const switchCard = {
    display: "flex",
    flexDirection: { xs: "column", sm: "row", },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", sm: "center" },
    gap: 2,
    p: { xs: 2, sm: 2.5, md: 3 },
    borderRadius: { xs: 2.5, md: 3 },
    bgcolor: darkMode
      ? "rgba(15,23,42,.45)"
      : "rgba(255,255,255,.60)",
    border: `1px solid ${borderColor}`,
    transition: ".25s",
    "&:hover": {
      borderColor: primary,
      transform: "translateY(-2px)",
    },
  };

  // Primary Button //
  const primaryBtn = {
    py: { xs: 1, md: 1.3, },
    px: { xs: 2, md: 3 },
    fontSize: { xs: ".78rem", md: ".9rem", },
    borderRadius: "12px",
    textTransform: "none",
    fontWeight: 700,
    background:
      "linear-gradient(90deg,#2563EB,#3B82F6)",
    boxShadow:
      "0 10px 20px rgba(37,99,235,.20)",
    "&:hover": {
      background:
        "linear-gradient(90deg,#1D4ED8,#2563EB)",
      transform: "translateY(-2px)",
    },
  };

  // Outline Button //
  const outlineBtn = {
    py: { xs: 1, md: 1.3 },
    px: { xs: 2, md: 3 },
    fontSize: { xs: ".78rem", md: ".9rem" },
    borderRadius: "12px",
    textTransform: "none",
    fontWeight: 700,
    color: primary,
    borderColor: `${primary}40`,
    "&:hover": {
      borderColor: primary,
      bgcolor: `${primary}08`,
    },
  };

  // Dummy User Data //
  const [profile] = useState({
    name: "HR Manager",
    email: "hr@gmail.com",
    department: "Human Resources",
    role: "Administrator",
    status: "Active",
  });

  // Notification Toggles //
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved
      ? JSON.parse(saved)
      : {
        email: true,
        candidate: true,
        interview: true,
        jobs: false,
      };
  });

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  // PART 1B - Header + Profile Overview + Account Card //
  return (
    <HRLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: { xs: 2, sm: 3, md: 4 },
        }}
      >

        {/* ================= Header ================= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
                mb: { xs: 0, md: 0.5 },
                fontWeight: 850,
                letterSpacing: "-0.03em",
              }}
            >
              Settings & Control Panel
            </Typography>
          </Box>

          <Chip
            label="Administrator"
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
              bgcolor: `${primary}15`,
              color: primary,
              fontWeight: 700,
              px: { xs: 0.8, md: 1 },
              fontSize: { xs: ".72rem", md: ".82rem" },
              height: { xs: 24, md: 32 },
            }}
          />
        </Box>

        {/* ================= Profile Overview ================= */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 4 },
            borderRadius: { xs: 3, md: "22px" },
            bgcolor: darkMode
              ? "rgba(30,41,59,.72)"
              : "#ffffff",
            backdropFilter: "blur(16px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: darkMode
              ? `
              0 18px 45px rgba(0,0,0,.35),
              inset 0 1px 0 rgba(255,255,255,.04)
            `
              : `
              0 18px 40px rgba(15,23,42,.08),
              0 4px 12px rgba(15,23,42,.05)
            `,
            transition: ".3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? ` 0 24px 55px rgba(0,0,0,.42) `
                : ` 0 26px 55px rgba(15,23,42,.12)`,
            },
          }}
        >
          <Grid container spacing={{ xs: 2.5, md: 4 }}
            sx={{ alignItems: "center" }}
          >
            <Grid size={{ xs: 12, lg: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "center", sm: "center" },
                  textAlign: { xs: "center", sm: "left" },
                  gap: { xs: 1.5, sm: 2 },
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 60, md: 72 },
                    height: { xs: 60, md: 72 },
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    bgcolor: `${primary}15`,
                    color: primary,
                    fontWeight: 800,
                  }}
                >
                  HM
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: 800,
                      fontSize: { xs: "1rem", md: "1.2rem" },
                    }}
                  >
                    {profile.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: subText,
                      fontSize: { xs: ".8rem", md: ".9rem" },
                      wordBreak: "break-word",
                    }}
                  >
                    {profile.email}
                  </Typography>

                  <Chip
                    size="small"
                    label={profile.status}
                    sx={{
                      mt: 1,
                      fontSize: { xs: ".68rem", md: ".75rem" },
                      height: { xs: 22, md: 24 },
                      bgcolor: "rgba(16,185,129,.12)",
                      color: "#10B981",
                      fontWeight: 700,
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, lg: 8 }}>
              <Grid container spacing={{ xs: 2, md: 2.5 }}
                sx={{
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {cards.map((item) => (
                  <Grid
                    key={item.title}
                    size={{ xs: 12, sm: 6, md: 3 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        height: { xs: "auto", md: 125 },
                        minWidth: "100%",
                        p: { xs: 2, md: 2.5 },
                        borderRadius: { xs: 2.5, md: "18px" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        bgcolor: darkMode
                          ? "rgba(15,23,42,.55)"
                          : "#fff",
                        border: `1px solid ${darkMode
                          ? "rgba(255,255,255,.08)"
                          : "#E8EEF7"
                          }`,
                        boxShadow:
                          "0 8px 22px rgba(15,23,42,.06)",
                        transition: ".3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          borderColor: item.color,
                          boxShadow:
                            "0 16px 35px rgba(37,99,235,.12)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: { xs: 1.5, sm: 2 },
                        }}
                      >
                        <Typography
                          sx={{
                            color: textColor,
                            fontSize: { xs: ".75rem", md: ".82rem" },
                            fontWeight: 800,
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Box
                          sx={{
                            width: { xs: 32, md: 36 },
                            height: { xs: 32, md: 36 },
                            borderRadius: { xs: "8px", md: "10px" },
                            fontSize: { xs: ".85rem", md: ".95rem" },
                            bgcolor: `${item.color}15`,
                            color: item.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.icon}
                        </Box>
                      </Box>

                      <Typography
                        sx={{
                          color: textColor,
                          fontSize: { xs: ".95rem", md: "1.08rem" },
                          lineHeight: 1.35,
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        
        {/* ================= Account Settings ================= */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 4 },
            borderRadius: { xs: 3, md: "22px" },
            bgcolor: darkMode
              ? "rgba(30,41,59,.72)"
              : "#ffffff",
            backdropFilter: "blur(16px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: darkMode
              ? ` 0 18px 45px rgba(0,0,0,.35),
              inset 0 1px 0 rgba(255,255,255,.04) `
              : ` 0 18px 40px rgba(15,23,42,.08),
              0 4px 12px rgba(15,23,42,.05) `,
            transition: ".3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? `  0 24px 55px rgba(0,0,0,.42) `
                : ` 0 26px 55px rgba(15,23,42,.12) `,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "center" },
              textAlign: { xs: "center", sm: "left" },
              gap: { xs: 1.2, sm: 1.5 },
              mb: { xs: 3, md: 4 },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 40, md: 48 },
                height: { xs: 40, md: 48 },
                bgcolor: `${primary}15`,
                color: primary,
                fontSize: { xs: ".9rem", md: "1rem" },
              }}
            >
              <FaUserCog />
            </Avatar>
            <Box>
              <Typography
                sx={{
                  color: textColor,
                  fontWeight: 800,
                  fontSize: { xs: ".98rem", md: "1.1rem" },
                }}
              >
                Account Information
              </Typography>
              <Typography
                sx={{
                  color: subText,
                  fontSize: { xs: ".75rem", md: ".82rem" },
                }}
              >
                Update your recruiter profile information.
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={{ xs: 2, md: 3 }} >
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Recruiter Name"
                value={profile.name}
                sx={{
                  ...textFieldStyle,
                  mb: { xs: 2, md: 0 },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email Address"
                value={profile.email}
                sx={{
                  ...textFieldStyle,
                  mb: { xs: 2, md: 0 },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Department"
                value={profile.department}
                sx={{
                  ...textFieldStyle,
                  mb: { xs: 2, md: 0 },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Role"
                value={profile.role}
                sx={{
                  ...textFieldStyle,
                  mb: { xs: 2, md: 0 },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* ================= NOTIFICATION SETTINGS ================= */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 4 },
            borderRadius: { xs: 3, md: "22px", },
            bgcolor: darkMode
              ? "rgba(30,41,59,.72)"
              : "#ffffff",
            backdropFilter: "blur(16px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: darkMode
              ? ` 0 18px 45px rgba(0,0,0,.35),
              inset 0 1px 0 rgba(255,255,255,.04) `
              : ` 0 18px 40px rgba(15,23,42,.08),
              0 4px 12px rgba(15,23,42,.05) `,
            transition: ".3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? ` 0 24px 55px rgba(0,0,0,.42) `
                : ` 0 26px 55px rgba(15,23,42,.12) `,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "center" },
              textAlign: { xs: "center", sm: "left" },
              gap: { xs: 1.2, sm: 1.5 },
              mb: { xs: 3, md: 4 },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 40, md: 48 },
                height: { xs: 40, md: 48 },
                bgcolor: `${primary}15`,
                color: primary,
                fontSize: { xs: ".9rem", md: "1rem" },
              }}
            >
              <FaBell />
            </Avatar>
            <Box>
              <Typography
                sx={{
                  color: textColor,
                  fontWeight: 800,
                  fontSize: { xs: ".98rem", md: "1.1rem" },
                }}
              >
                Notification Preferences
              </Typography>
              <Typography
                sx={{
                  color: subText,
                  fontSize: { xs: ".75rem", md: ".82rem" },
                }}
              >
                Control how and when you receive important updates.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, md: 2.2 },
            }}
          >

            {/* Email */}
            <Box sx={switchCard}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    bgcolor: `${primary}15`,
                    color: primary,
                    fontSize: { xs: ".9rem", md: "1rem" },
                  }}
                >
                  <FaEnvelope />
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: 700,
                      fontSize: { xs: ".9rem", md: "1rem" },
                    }}
                  >
                    Email Notifications
                  </Typography>
                  <Typography
                    sx={{
                      color: subText,
                      fontSize: { xs: ".74rem", md: ".82rem" },
                    }}
                  >
                    Receive important system notifications by email.
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={notifications.email}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    email: e.target.checked,
                  })
                }
                sx={{
                  alignSelf: { xs: "flex-end", sm: "center" },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: primary,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    bgcolor: primary,
                  },
                }}
              />
            </Box>

            {/* Candidates */}
            <Box sx={switchCard}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    bgcolor: `${primary}15`,
                    color: primary,
                    fontSize: { xs: ".9rem", md: "1rem" },
                  }}
                >
                  <FaUserCog />
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: 700,
                      fontSize: { xs: ".9rem", md: "1rem" },
                    }}
                  >
                    Candidate Updates
                  </Typography>

                  <Typography
                    sx={{
                      color: subText,
                      fontSize: { xs: ".74rem", md: ".82rem" },
                    }}
                  >
                    Notify when new candidates apply for jobs.
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={notifications.candidate}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    candidate: e.target.checked,
                  })
                }
                sx={{
                  alignSelf: { xs: "flex-end", sm: "center" },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: primary,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    bgcolor: primary,
                  },
                }}
              />
            </Box>

            {/* Interviews */}
            <Box sx={switchCard}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    bgcolor: `${primary}15`,
                    color: primary,
                    fontSize: { xs: ".9rem", md: "1rem" },
                  }}
                >
                  <FaBriefcase />
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: 700,
                      fontSize: { xs: ".9rem", md: "1rem" },
                    }}
                  >
                    Interview Reminders
                  </Typography>

                  <Typography
                    sx={{
                      color: subText,
                      fontSize: { xs: ".74rem", md: ".82rem" },
                    }}
                  >
                    Get reminders before every scheduled interview.
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={notifications.interview}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    interview: e.target.checked,
                  })
                }
                sx={{
                  alignSelf: { xs: "flex-end", sm: "center" },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: primary,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    bgcolor: primary,
                  },
                }}
              />
            </Box>

            {/* Jobs */}
            <Box sx={switchCard}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    bgcolor: `${primary}15`,
                    color: primary,
                    fontSize: { xs: ".9rem", md: "1rem" },
                  }}
                >
                  <FaSlidersH />
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: 700,
                      fontSize: { xs: ".9rem", md: "1rem" },
                    }}
                  >
                    Job Alerts
                  </Typography>

                  <Typography
                    sx={{
                      color: subText,
                      fontSize: { xs: ".74rem", md: ".82rem" },
                    }}
                  >
                    Receive notifications about job status and expiry.
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={notifications.jobs}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    jobs: e.target.checked,
                  })
                }
                sx={{
                  alignSelf: { xs: "flex-end", sm: "center" },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: primary,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    bgcolor: primary,
                  },
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* ================= SECURITY SETTINGS ================= */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 4 },
            borderRadius: { xs: 3, sm: 4, md: "22px" },
            bgcolor: darkMode
              ? "rgba(30,41,59,.72)"
              : "#ffffff",
            backdropFilter: "blur(16px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: darkMode
              ? ` 0 18px 45px rgba(0,0,0,.35),
              inset 0 1px 0 rgba(255,255,255,.04) `
              : ` 0 18px 40px rgba(15,23,42,.08),
              0 4px 12px rgba(15,23,42,.05) `,
            transition: ".3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? ` 0 24px 55px rgba(0,0,0,.42) `
                : ` 0 26px 55px rgba(15,23,42,.12) `,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "center" },
              textAlign: { xs: "center", sm: "left" },
              gap: { xs: 1.2, sm: 1.5, md: 2 },
              mb: { xs: 2.5, sm: 3, md: 4 },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 42, sm: 48, md: 56 },
                height: { xs: 42, sm: 48, md: 56 },
                bgcolor: `${primary}15`,
                color: primary,
              }}
            >
              <FaShieldAlt />
            </Avatar>
            <Box>
              <Typography
                sx={{
                  color: textColor,
                  fontWeight: 800,
                  fontSize: { xs: ".95rem", sm: "1rem", md: "1.1rem" },
                }}
              >
                Security & Privacy
              </Typography>

              <Typography
                sx={{
                  color: subText,
                  fontSize: { xs: ".75rem", sm: ".8rem", md: ".82rem" },
                  lineHeight: 1.6,
                }}
              >
                Protect your HR account with advanced security options.
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3, }}>

            {/* Password */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: { xs: 2.5, md: 3 },
                  bgcolor: darkMode
                    ? "rgba(15,23,42,.45)"
                    : "#F8FAFC",
                  border: `1px solid ${borderColor}`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "center", sm: "flex-start" },
                    textAlign: { xs: "center", sm: "left" },
                    gap: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 40, sm: 46, md: 50 },
                      height: { xs: 40, sm: 46, md: 50 },
                      bgcolor: `${primary}15`,
                      color: primary
                    }}
                  >
                    <FaLock />
                  </Avatar>

                  <Box
                    sx={{
                      flexGrow: 1,
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: textColor,
                        fontWeight: 700,
                        fontSize: { xs: ".88rem", sm: ".95rem", md: "1rem" },
                      }}
                    >
                      Password
                    </Typography>

                    <Typography
                      sx={{
                        color: subText,
                        fontSize: { xs: ".74rem", sm: ".79rem", md: ".82rem" },
                        lineHeight: 1.6,
                        mb: 2,
                      }}
                    >
                      Last updated 30 days ago.
                    </Typography>

                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        ...outlineBtn,
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Two Factor */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: { xs: 2.5, md: 3 },
                  bgcolor: darkMode
                    ? "rgba(15,23,42,.45)"
                    : "#F8FAFC",
                  border: `1px solid ${borderColor}`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "center", sm: "flex-start" },
                    textAlign: { xs: "center", sm: "left" },
                    gap: { xs: 1.5, sm: 2 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 40, sm: 46, md: 50 },
                      height: { xs: 40, sm: 46, md: 50 },
                      bgcolor: `${primary}15`,
                      color: primary
                    }}
                  >
                    <FaUserShield />
                  </Avatar>

                  <Box
                    sx={{
                      flexGrow: 1,
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: textColor,
                        fontWeight: 700,
                      }}
                    >
                      Two-Factor Authentication
                    </Typography>

                    <Typography
                      sx={{
                        color: subText,
                        fontSize: ".82rem",
                        mb: 2,
                      }}
                    >
                      Add an extra security layer to your account.
                    </Typography>

                    <Switch
                      checked={twoFactor}
                      onChange={() =>
                        setTwoFactor(!twoFactor)
                      }
                      sx={{
                        alignSelf: { xs: "flex-end", sm: "center" },
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: primary,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          bgcolor: primary,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{
            my: { xs: 2.5, sm: 3, md: 4 },
          }} />

          <Typography
            sx={{
              color: textColor,
              fontWeight: 700,
              fontSize: { xs: ".9rem", sm: ".98rem", md: "1rem" },
              mb: { xs: 1.5, md: 2 },
            }}
          >
            Recent Login Activity
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.75, sm: 2, md: 2.5 },
              borderRadius: { xs: 2.5, md: 3 },
              bgcolor: darkMode
                ? "rgba(15,23,42,.45)"
                : "#F8FAFC",
              border: `1px solid ${borderColor}`,
            }}
          >
            <Typography
              sx={{
                color: textColor,
                fontWeight: 600,
                fontSize: { xs: ".82rem", sm: ".88rem", md: ".95rem" },
                wordBreak: "break-word",
              }}
            >
              Ahmedabad, Gujarat
            </Typography>

            <Typography
              sx={{
                color: subText,
                fontSize: { xs: ".72rem", sm: ".78rem", md: ".82rem" },
                lineHeight: 1.6,
                wordBreak: "break-word",
              }}
            >
              Chrome • Windows 11 • Today 10:42 AM
            </Typography>
          </Paper>
        </Paper>

        {/* ================= ACTION BUTTONS ================= */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: { xs: 1.5, sm: 2 },
            mt: { xs: 2, md: 1 },
          }}
        >
          <Button
            component={Link}
            to="/hr-profile"
            variant="outlined"
            startIcon={<FaArrowLeft />}
            sx={{
              ...outlineBtn,
              width: { xs: "100%", sm: "auto" },
              fontSize: { xs: ".78rem", md: ".9rem" },
            }}
          >
            Back to Profile
          </Button>

          <Button
            variant="contained"
            startIcon={<FaSave />}
            sx={{
              ...primaryBtn,
              width: { xs: "100%", sm: "auto" },
              fontSize: { xs: ".78rem", md: ".9rem" },
            }}
          >
            Save Settings
          </Button>
        </Box>
      </Box>
    </HRLayout>
  );
}