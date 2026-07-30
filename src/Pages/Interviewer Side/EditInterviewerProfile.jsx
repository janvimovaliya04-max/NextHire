import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { FaUserTie } from "react-icons/fa";
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

  const subText = darkMode ? "#94a3b8" : "#475569";

  const textColor = darkMode
    ? "#ffffff"
    : "#0f172a";

  const borderStyle = darkMode
    ? "rgba(148,163,184,0.18)"
    : "rgba(0,0,0,0.08)";

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
      color: darkMode
        ? "#94a3b8"
        : "#64748b",

      fontSize: {
        xs: ".9rem",
        sm: ".95rem",
      }
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#14b8a6",
    },

    "& .MuiOutlinedInput-root": {

      color: textColor,

      backgroundColor: darkMode
        ? "rgba(15,23,42,.30)"
        : "rgba(255,255,255,.4)",

      "& fieldset": {

        borderColor: darkMode
          ? "rgba(255,255,255,.08)"
          : "rgba(0,0,0,.10)",

        borderRadius: "10px"
      },

      "&:hover fieldset": {
        borderColor: "#14b8a6"
      },

      "&.Mui-focused fieldset": {
        borderColor: "#14b8a6",
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

          bgcolor: darkMode
            ? "rgba(30,41,59,.45)"
            : "#ffffff",

          backdropFilter: "blur(12px)",

          border: `1px solid ${borderStyle}`,

          boxShadow: darkMode
            ? "0 10px 30px rgba(0,0,0,.30)"
            : "0 10px 30px rgba(0,0,0,.03)",

          transition: "all .3s ease",

          "&:hover": {
            filter: "brightness(1.03)",
            transform: "translateY(-2px)",
            boxShadow: darkMode
              ? "0 15px 35px rgba(0,0,0,.4)"
              : "0 15px 35px rgba(0,0,0,.06)"
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

              background:
                "linear-gradient(135deg,#14b8a6,#0f766e)",


              fontWeight: 800,

              boxShadow:
                "0 8px 24px rgba(20,184,166,.30)",

              border: `4px solid ${darkMode
                ? "rgba(30,41,59,.9)"
                : "#ffffff"
                }`
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
              color: "#14b8a6",

              "&:hover": {
                background: "rgba(20,184,166,.06)"
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
              color: "#14b8a6",
              display: "flex"
            }}
          >
            <FaUserTie size={18} />
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
            to="/interviewer-profile"
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
              color: darkMode ? "#cbd5e1" : "#475569",
              borderColor: darkMode
                ? "rgba(255,255,255,.18)"
                : "rgba(0,0,0,.10)",
              "&:hover": {
                borderColor: darkMode ? "#ffffff" : "#0f172a",
                bgcolor: darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
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
              background:
                "linear-gradient(90deg,#14b8a6,#0f766e)",

              boxShadow:
                "0 4px 14px rgba(20,184,166,.30)",

              "&:hover": {

                background:
                  "linear-gradient(90deg,#0d9488,#115e59)",

                transform: "translateY(-1px)",

                boxShadow:
                  "0 8px 20px rgba(20,184,166,.40)"
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