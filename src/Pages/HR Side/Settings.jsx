import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import HRLayout from "../../Layouts/HRLayout";
import ThemeSelector from "../../components/ThemeSelector";
import useThemeColors from "../../hooks/useThemeColors";
import { useAuth } from "../../context/AuthContext";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  Building2,
  Sun,
  Clock,
  UserCog,
  SlidersHorizontal,
  Shield,
  Save,
  ArrowLeft,
  Moon,
  Bell,
  Mail,
  Lock,
  UserRoundCheck,
  BriefcaseBusiness,
  Palette,
} from "lucide-react";
import SEO from "../../components/common/SEO"; // SEO Component Import Added

export default function Settings() {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const [showThemes, setShowThemes] = useState(false);

  const [twoFactor, setTwoFactor] = useState(() => {
    const saved = localStorage.getItem("twoFactor");
    return saved ? JSON.parse(saved) : false;
  });

  const borderStyle = darkMode
    ? "rgba(148,163,184,.12)"
    : "rgba(15,23,42,.08)";

  useEffect(() => {
    localStorage.setItem("twoFactor", JSON.stringify(twoFactor));
  }, [twoFactor]);

  // Colors
  const primary = colors.primary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderColor = colors.border;
  const glassBg = colors.card;

  // Profile State to allow editing
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "HR",
    lastName: user?.lastName || "Manager",
    fullName: user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || "HR Manager",
    employeeId: user?.employeeId || user?.id || "HR101",
    email: user?.email || "hr@gmail.com",
    phone: user?.phone || user?.phoneNumber || "9562314785",
    department: user?.department || "Human Resources",
    role: user?.designation || user?.role || "Administrator",
    status: "Active",
  });

  const cards = [
    {
      title: "Department",
      value: "Human Resources",
      icon: <Building2 />,
      color: colors.primary,
    },
    {
      title: "Role",
      value: "Administrator",
      icon: <UserRoundCheck />,
      color: colors.primary,
    },
    {
      title: "Last Login",
      value: "Today",
      icon: <Clock />,
      color: colors.primary,
    },
  ];

  // TextField Style
  const textFieldStyle = {
    "& .MuiInputLabel-root": {
      color: subText,
    },
    "& .MuiOutlinedInput-root": {
      fontSize: { xs: ".85rem", md: ".95rem" },
      color: textColor,
      background: colors.input,
      borderRadius: { xs: "10px", md: "12px" },
      "& fieldset": {
        borderColor: colors.border,
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

  // Switch Card Style
  const switchCard = {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", sm: "center" },
    gap: 2,
    p: { xs: 2, sm: 2.5, md: 3 },
    borderRadius: { xs: 2.5, md: 3 },
    bgcolor: colors.background,
    border: `1px solid ${borderColor}`,
    transition: "all .25s ease",
    "&:hover": {
      borderColor: primary,
      transform: "translateY(-2px)",
      boxShadow: darkMode
        ? `0 8px 20px rgba(0,0,0,.25)`
        : `0 8px 20px rgba(15,23,42,.08)`,
    },
  };

  // Primary Button
  const primaryBtn = {
    py: { xs: 1, md: 1.3 },
    px: { xs: 2, md: 3 },
    fontSize: { xs: ".78rem", md: ".9rem" },
    borderRadius: "12px",
    textTransform: "none",
    fontWeight: 700,
    background: "linear-gradient(135deg,#2563EB,#3B82F6)",
    boxShadow: "0 10px 20px rgba(37,99,235,.20)",
    "&:hover": {
      background: "linear-gradient(135deg,#1D4ED8,#2563EB)",
      transform: "translateY(-2px)",
    },
  };

  // Outline Button
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

  // Notification Toggles
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
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  return (
    <HRLayout>
      {/* Dynamic SEO Tags Injection */}
      <SEO
        title="Settings"
        description="Manage job postings, candidates, and interview schedules on NextHire HR Portal."
        canonicalUrl="/hr-portal/dashboard"
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Header */}
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

        {/* Profile Overview */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 4 },
            borderRadius: { xs: 3, md: "22px" },
            bgcolor: glassBg,
            backdropFilter: "blur(16px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
            transition: ".3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? `0 24px 55px rgba(0,0,0,.42)`
                : `0 26px 55px rgba(15,23,42,.12)`,
            },
          }}
        >
          <Grid container spacing={3} sx={{ alignItems: "center" }}>
            {/* Left Side: Profile Info */}
            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "center", sm: "flex-start" },
                  textAlign: { xs: "center", sm: "left" },
                  gap: { xs: 2, sm: 2.5 },
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 64, md: 72 },
                    height: { xs: 64, md: 72 },
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    bgcolor: `${primary}15`,
                    color: primary,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  HM
                </Avatar>

                <Box sx={{ overflow: "hidden", width: "100%" }}>
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: 800,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                    }}
                  >
                    {profile.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: subText,
                      fontSize: { xs: ".8rem", md: ".9rem" },
                      wordBreak: "break-word",
                      mt: 0.5,
                    }}
                  >
                    {profile.email}
                  </Typography>

                  <Chip
                    size="small"
                    label={profile.status}
                    sx={{
                      mt: 1.2,
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

            {/* Right Side: Stats / Info Cards */}
            <Grid item xs={12} lg={8}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {cards.map((item) => (
                  <Paper
                    key={item.title}
                    elevation={0}
                    sx={{
                      height: "100%",
                      minHeight: 115,
                      p: { xs: 2, md: 2 },
                      borderRadius: { xs: 2.5, md: "18px" },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      bgcolor: colors.card,
                      border: `1px solid ${darkMode ? "rgba(255,255,255,.08)" : "#E8EEF7"
                        }`,
                      boxShadow: colors.shadow,
                      transition: ".3s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: item.color,
                        boxShadow: "0 16px 35px rgba(37,99,235,.12)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: subText,
                          fontSize: { xs: ".75rem", md: ".8rem" },
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "8px",
                          fontSize: ".9rem",
                          bgcolor: `${item.color}15`,
                          color: item.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </Box>
                    </Box>

                    <Typography
                      sx={{
                        color: textColor,
                        fontSize: { xs: ".95rem", md: "1.05rem" },
                        fontWeight: 700,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Account Settings */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 4 },
            borderRadius: { xs: 3, md: "22px" },
            bgcolor: glassBg,
            backdropFilter: "blur(16px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
            transition: ".3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? `0 24px 55px rgba(0,0,0,.42)`
                : `0 26px 55px rgba(15,23,42,.12)`,
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
              <UserCog />
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

          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Recruiter Name"
                value={profile.fullName}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email Address"
                value={profile.email}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Department"
                value={profile.department}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setProfile({ ...profile, department: e.target.value })
                }
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Role"
                value={profile.role}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Appearance */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 4 },
            borderRadius: { xs: 3, md: "22px" },
            bgcolor: glassBg,
            backdropFilter: "blur(16px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
              <Typography sx={{ color: textColor, fontWeight: 700 }}>
                Theme
              </Typography>

              <Typography sx={{ color: subText, fontSize: ".8rem", mt: 0.3 }}>
                Choose your preferred theme
              </Typography>
            </Box>

            <Palette style={{ color: primary, fontSize: "18px" }} />
          </Box>

          {showThemes && <ThemeSelector />}
        </Paper>

        {/* Notification Settings */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 4 },
            borderRadius: { xs: 3, md: "22px" },
            bgcolor: glassBg,
            backdropFilter: "blur(16px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
            transition: ".3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? `0 24px 55px rgba(0,0,0,.42)`
                : `0 26px 55px rgba(15,23,42,.12)`,
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
              <Bell />
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
                  <Mail />
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
                  "& .MuiSwitch-switchBase.Mui-checked": { color: primary },
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
                  <UserCog />
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
                  "& .MuiSwitch-switchBase.Mui-checked": { color: primary },
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
                  <BriefcaseBusiness />
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
                  "& .MuiSwitch-switchBase.Mui-checked": { color: primary },
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
                  <SlidersHorizontal />
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
                  "& .MuiSwitch-switchBase.Mui-checked": { color: primary },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    bgcolor: primary,
                  },
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Security Settings */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 4 },
            borderRadius: { xs: 3, sm: 4, md: "22px" },
            bgcolor: glassBg,
            backdropFilter: "blur(16px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
            transition: ".3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? `0 24px 55px rgba(0,0,0,.42)`
                : `0 26px 55px rgba(15,23,42,.12)`,
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
              <Shield />
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

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {/* Password Security Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: { xs: 2.5, md: 3 },
                  bgcolor: colors.background,
                  border: `1px solid ${borderColor}`,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "center", sm: "flex-start" },
                    textAlign: { xs: "center", sm: "left" },
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 40, sm: 46, md: 50 },
                      height: { xs: 40, sm: 46, md: 50 },
                      bgcolor: `${primary}15`,
                      color: primary,
                    }}
                  >
                    <Lock />
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{ color: textColor, fontWeight: 700, fontSize: "1rem" }}
                    >
                      Password & Credentials
                    </Typography>
                    <Typography
                      sx={{ color: subText, fontSize: ".82rem", mt: 0.5 }}
                    >
                      Change your current password and manage account login safety.
                    </Typography>
                  </Box>
                </Box>

                <Button variant="outlined" sx={{ ...outlineBtn, alignSelf: "flex-start" }}>
                  Change Password
                </Button>
              </Paper>
            </Grid>

            {/* 2FA Security Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: { xs: 2.5, md: 3 },
                  bgcolor: colors.background,
                  border: `1px solid ${borderColor}`,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "center", sm: "flex-start" },
                    textAlign: { xs: "center", sm: "left" },
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 40, sm: 46, md: 50 },
                      height: { xs: 40, sm: 46, md: 50 },
                      bgcolor: `${primary}15`,
                      color: primary,
                    }}
                  >
                    <Shield />
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{ color: textColor, fontWeight: 700, fontSize: "1rem" }}
                    >
                      Two-Factor Authentication
                    </Typography>
                    <Typography
                      sx={{ color: subText, fontSize: ".82rem", mt: 0.5 }}
                    >
                      Add an extra layer of security to prevent unauthorized access.
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ color: textColor, fontWeight: 600, fontSize: ".85rem" }}>
                    Enable 2FA
                  </Typography>
                  <Switch
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": { color: primary },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        bgcolor: primary,
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Footer Actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            pt: 1,
            pb: 2,
          }}
        >
          <Button
            component={Link}
            to="/hr"
            variant="outlined"
            startIcon={<ArrowLeft size={18} />}
            sx={outlineBtn}
          >
            Back
          </Button>
          <Button
            variant="contained"
            startIcon={<Save size={18} />}
            sx={primaryBtn}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </HRLayout>
  );
}