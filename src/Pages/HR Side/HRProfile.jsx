import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
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
import { useAuth } from "../../context/AuthContext";

import {
  UserRoundPen,
  KeyRound,
  ArrowRight,
} from "lucide-react";

export default function HRProfile() {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Safe profile object mapping with fallback values if users.json is missing fields
  const profile = {
    firstName: user?.firstName || "HR",
    lastName: user?.lastName || "Manager",
    fullName: user?.firstName && user?.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user?.username || "HR Manager",
    employeeId: user?.employeeId || user?.id || "HR101",
    email: user?.email || "hr@gmail.com",
    phone: user?.phone || user?.phoneNumber || "9562314785",
    department: user?.department || "Human Resources",
    designation: user?.designation || user?.role || "Senior HR Manager",
  };

  // Cohesive styling for the form elements
  const textFieldStyle = {
    mb: 2.5,
    "& .MuiInputLabel-root": {
      color: subText,
      fontSize: {
        xs: "0.82rem",
        md: "0.95rem",
      },
      // Ensures label doesn't overlap weirdly when shrunk
      "&.Mui-shrink": {
        transform: "translate(14px, -9px) scale(0.75)",
      },
    },
    "& .MuiOutlinedInput-root": {
      color: textColor,
      fontSize: {
        xs: "0.9rem",
        md: "1rem",
      },
      backgroundColor: colors.input,
      borderRadius: "12px",
      "& fieldset": {
        borderColor: colors.border,
        transition: "all .25s ease",
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
          },
        }}
      >
        {/* Page Header */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
              mb: { xs: 0, md: 0.5 },
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
              md: 4,
            },
            borderRadius: {
              xs: 3,
              md: "22px",
            },
            bgcolor: colors.card,
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: darkMode
                ? `0 24px 55px rgba(0,0,0,.42)`
                : `0 26px 55px rgba(15,23,42,.12)`,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              justifyContent: "space-between",
              alignItems: "center",
              gap: {
                xs: 2.5,
                md: 4,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                alignItems: "center",
                gap: {
                  xs: 2,
                  md: 3.5,
                },
                textAlign: {
                  xs: "center",
                  sm: "left",
                },
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
                  background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                  fontWeight: 800,
                  boxShadow: `0 8px 24px ${primary}40`,
                  border: `4px solid ${colors.card}`,
                }}
              >
                HR
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.45rem", md: "1.6rem" },
                    color: textColor,
                    fontWeight: 850,
                    letterSpacing: "-0.02em",
                    mb: 0.5,
                  }}
                >
                  {profile.fullName}
                </Typography>
                <Typography
                  sx={{
                    color: primary,
                    fontWeight: 700,
                    fontSize: { xs: "0.82rem", md: "0.95rem" },
                  }}
                >
                  {profile.designation}
                </Typography>
                <Typography
                  sx={{
                    color: subText,
                    fontSize: { xs: "0.75rem", md: "0.85rem" },
                    mt: 0.5,
                  }}
                >
                  {profile.email}
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
                to="/hr/edit-hr-profile"
                variant="contained"
                startIcon={<UserRoundPen size={14} />}
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
                  borderRadius: "12px",
                  fontWeight: 700,
                  textTransform: "none",
                  background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                  boxShadow: `0 4px 12px ${primary}33`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${primary}, ${primary})`,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Edit Profile
              </Button>

              <Button
                variant="outlined"
                startIcon={<KeyRound size={14} />}
                sx={{
                  py: { xs: 1, md: 1.3 },
                  px: { xs: 2, md: 3 },
                  width: { xs: "100%", sm: "auto" },
                  borderRadius: "12px",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.88rem",
                  color: subText,
                  borderColor: borderStyle,
                  "&:hover": {
                    borderColor: primary,
                    bgcolor: `${primary}08`,
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
          elevation={0}
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            borderRadius: {
              xs: 3,
              md: "22px",
            },
            bgcolor: colors.card,
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: darkMode
                ? `0 24px 55px rgba(0,0,0,.42)`
                : `0 26px 55px rgba(15,23,42,.12)`,
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              mb: 3,
              color: textColor,
              fontSize: { xs: "1.05rem", md: "1.25rem" },
            }}
          >
            Personal Details
          </Typography>

          <Grid
            container
            spacing={{
              xs: 1.5,
              md: 2.5,
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
                label="Employee ID"
                value={profile.employeeId}
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
                label="Email Address"
                value={profile.email}
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
                label="Phone Number"
                value={profile.phone}
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
                label="Department"
                value={profile.department}
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
                label="Job Designation"
                value={profile.designation}
                InputLabelProps={{ shrink: true }}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
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
            to="/hr/settings"
            variant="contained"
            endIcon={<ArrowRight size={14} />}
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
              borderRadius: "12px",
              fontWeight: 700,
              textTransform: "none",
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
              boxShadow: `0 4px 12px ${primary}33`,
              "&:hover": {
                background: `linear-gradient(135deg, ${primary}, ${primary})`,
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