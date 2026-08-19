import { Link } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { useAuth } from "../../context/AuthContext";
import {
  Paper,
  Avatar,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";

export default function InterviewerProfile() {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Dashboard / Settings / Evaluations)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Safe profile object mapping with fallback values based on auth user data
  const profile = {
    firstName: user?.firstName || "Rahul",
    lastName: user?.lastName || "Sharma",
    fullName: user?.firstName && user?.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user?.username || "Rahul Sharma",
    email: user?.email || "rahul@nexthire.com",
    role: user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Senior Technical Interviewer",
    experience: user?.experience || "8 Years",
    specialization: user?.specialization || "Frontend & React",
    interviewsConducted: user?.interviewsConducted || "150+",
  };

  const textFieldStyle = {
    "& .MuiInputLabel-root": {
      color: subText,
    },
    "& input": {
      cursor: "default",
      WebkitTextFillColor: textColor,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      fontSize: {
        xs: ".9rem",
        md: "1rem"
      },
      color: primary,
    },
    "& .MuiOutlinedInput-root": {
      mb: {
        xs: 1,
        sm: 1.5,
        md: 2,
      },
      height: {
        xs: 52,
        md: 56
      },
      color: textColor,
      "& fieldset": {
        borderColor: borderStyle,
        borderRadius: "12px",
      },
      "&:hover fieldset": {
        borderColor: primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: primary,
      },
      backgroundColor: colors.input || colors.card,
    },
  };

  return (
    <InterviewerLayout>
      <Typography
        sx={{
          fontWeight: 850,
          letterSpacing: "-0.03em",
          fontSize: {
            xs: "1.35rem",
            sm: "1.8rem",
            md: "2.3rem",
          },
          mb: {
            xs: 2,
            sm: 3,
            md: 5,
          },
          color: textColor,
        }}
      >
        Profile
      </Typography>

      {/* Profile Header Card */}
      <Paper
        elevation={6}
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          borderRadius: 5,
          bgcolor: colors.card,
          backdropFilter: "blur(10px)",
          border: `1px solid ${borderStyle}`,
          color: textColor,
          transition: "all .3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: colors.shadow,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              textAlign: { xs: "center", sm: "left" },
              gap: {
                xs: 2,
                md: 3,
              },
            }}
          >
            <Avatar
              src={user?.image || ""}
              sx={{
                width: {
                  xs: 80,
                  sm: 90,
                  md: 100,
                },
                height: {
                  xs: 80,
                  sm: 90,
                  md: 100,
                },
                background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                boxShadow: `0 10px 25px ${primary}4d`,
                border: `4px solid ${colors.card}`,
                fontSize: "2.25rem",
                fontWeight: 800,
              }}
            >
              {!user?.image && profile.fullName ? profile.fullName.split(" ").map(n => n[0]).join("") : "RS"}
            </Avatar>
            <Box>
              <Typography
                fontWeight={800}
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-.03em",
                  color: textColor,
                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.8rem",
                    md: "2rem"
                  }
                }}
              >
                {profile.fullName}
              </Typography>
              <Typography
                sx={{
                  color: primary,
                  fontWeight: 600,
                  fontSize: {
                    xs: ".9rem",
                    md: "1rem"
                  }
                }}
              >
                {profile.role}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row"
              },
              gap: 2,
              width: {
                xs: "100%",
                md: "auto"
              },
            }}
          >
            <Button
              component={Link}
              to="/interviewer/edit-interviewer-profile"
              variant="contained"
              sx={{
                background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
                px: 4,
                py: 1.2,
                boxShadow: `0 4px 12px ${primary}33`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${primary}, ${primary})`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 20px ${primary}59`,
                },
              }}
            >
              Edit Profile
            </Button>

            <Button
              component={Link}
              to="/interviewer/interviewer-notifications"
              variant="text"
              sx={{
                color: primary,
                fontWeight: 700,
                borderRadius: 3,
                bgcolor: `${primary}14`,
                "&:hover": {
                  bgcolor: `${primary}22`,
                }
              }}
            >
              Notifications
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Professional Information */}
      <Paper
        elevation={6}
        sx={{
          mt: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          p: {
            xs: 2,
            sm: 3,
            md: 4
          },
          borderRadius: 5,
          bgcolor: colors.card,
          backdropFilter: "blur(10px)",
          border: `1px solid ${borderStyle}`,
          color: textColor,
          transition: "all .25s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: colors.shadow,
          },
        }}
      >
        <Typography sx={{
          fontWeight: 800,
          color: textColor,
          fontSize: {
            xs: "1.1rem",
            md: "1.25rem"
          },
          mb: {
            xs: 2,
            sm: 3,
            md: 4,
          }
        }}>
          Professional Information
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2,1fr)"
            },
            gap: {
              xs: 1,
              sm: 2,
              md: 3,
            },
          }}
        >
          <TextField
            label="Email"
            value={profile.email}
            sx={textFieldStyle}
            InputLabelProps={{ shrink: true }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />

          <TextField
            label="Experience"
            value={profile.experience}
            sx={textFieldStyle}
            InputLabelProps={{ shrink: true }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />

          <TextField
            label="Specialization"
            value={profile.specialization}
            sx={textFieldStyle}
            InputLabelProps={{ shrink: true }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />

          <TextField
            label="Interviews Conducted"
            value={profile.interviewsConducted}
            sx={textFieldStyle}
            InputLabelProps={{ shrink: true }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />
        </Box>
      </Paper>
    </InterviewerLayout>
  );
}