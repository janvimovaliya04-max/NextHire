import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Link } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { UserRound } from "lucide-react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
} from "@mui/material";

export default function EditInterviewerProfile() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Dashboard / Settings / Interviews)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const [formData, setFormData] = useState({
    fullName: "Rahul Patel",
    email: "rahul@gmail.com",
    phone: "9685741253",
    specialization: "Frontend Development",
    experience: "5 Years",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const textFieldStyle = {
    mb: {
      xs: 2,
      sm: 2.5,
    },

    "& .MuiInputLabel-root": {
      color: subText,

      fontSize: {
        xs: ".9rem",
        sm: ".95rem",
      }
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: primary,
    },

    "& .MuiOutlinedInput-root": {

      color: textColor,

      backgroundColor: colors.input || colors.card,

      "& fieldset": {

        borderColor: borderStyle,

        borderRadius: "10px"
      },

      "&:hover fieldset": {
        borderColor: primary
      },

      "&.Mui-focused fieldset": {
        borderColor: primary,
        borderWidth: 2
      }
    }
  }



  return (
    <InterviewerLayout>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 850,
          letterSpacing: "-0.03em",
          mb: {
            xs: 3,
            sm: 4,
          },
          color: textColor,
        }}
      >
        Edit Profile
      </Typography>

      <Paper
        elevation={6}
        sx={{
          p: {
            xs: 2.5,
            sm: 3.5,
            md: 5,
          },
          borderRadius: 5,

          bgcolor: colors.card,

          backdropFilter: "blur(12px)",

          border: `1px solid ${borderStyle}`,

          boxShadow: colors.shadow,

          transition: "all .3s ease",

          "&:hover": {
            filter: "brightness(1.03)",
            transform: "translateY(-2px)",
            boxShadow: colors.shadow,
          }
        }}
      >
        {/* Avatar Edit Section */}
        <Box sx={{
          display: "flex", flexDirection: "column", alignItems: "center", mb: {
            xs: 4,
            sm: 5,
          }
        }}>
          <Avatar
            sx={{
              width: {
                xs: 80,
                sm: 100,
              },

              height: {
                xs: 80,
                sm: 100,
              },

              fontSize: {
                xs: "1.6rem",
                sm: "2rem",
              },

              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,

              fontWeight: 800,

              boxShadow: `0 8px 24px ${primary}4d`,

              border: `4px solid ${colors.card}`
            }}
          >
            {formData.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <Button
            variant="text"
            sx={{
              color: primary,

              "&:hover": {
                background: `${primary}0f`
              },
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "0.9rem",
            }}
          >
            Change Profile Photo
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,

            mb: {
              xs: 3,
              sm: 4,
            }
          }}
        >

          <Box
            sx={{
              color: primary,
              display: "flex"
            }}
          >
            <UserRound size={18} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: textColor
            }}
          >
            Personal Information
          </Typography>

        </Box>

        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",

            flexDirection: {
              xs: "column-reverse",
              sm: "row",
            },

            justifyContent: "flex-end",

            alignItems: "stretch",

            gap: {
              xs: 1.5,
              sm: 2,
            },
            mt: 5,
          }}
        >
          <Button
            component={Link}
            to="/interviewer/interviewer-profile"
            variant="outlined"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "bold",
              width: {
                xs: "100%",
                sm: "auto",
              },

              px: {
                xs: 2,
                sm: 4,
              },

              py: {
                xs: 1,
                sm: 1.2,
              },
              color: subText,
              borderColor: borderStyle,
              "&:hover": {
                borderColor: primary,
                color: primary,
                bgcolor: `${primary}08`,
              },
              transition: "all 0.2s ease",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },

              px: {
                xs: 2,
                sm: 5,
              },

              py: {
                xs: 1,
                sm: 1.2,
              },
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,

              boxShadow: `0 4px 14px ${primary}4d`,

              "&:hover": {

                background: `linear-gradient(135deg, ${primary}, ${primary})`,

                transform: "translateY(-1px)",

                boxShadow: `0 8px 20px ${primary}66`,
              },
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
              px: 5,
              py: 1.2,
              transition: "all 0.2s ease",
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>

    </InterviewerLayout>
  );
}