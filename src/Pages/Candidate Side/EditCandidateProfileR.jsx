import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection on save
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Typography, TextField, Paper, Button, Avatar, Box, Divider } from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  ArrowLeft,
  Save,
  X,
  UserRoundPen,
} from "lucide-react";

export default function EditCandidateProfileR() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(() => {
    const saved = localStorage.getItem("candidateData");

    return saved
      ? JSON.parse(saved)
      : {
        fullName: "Janvi Movaliya",
        email: "janvi@gmail.com",
        phone: "+91 9876543210",
        candidateId: "CAN-3829-10",
        skills: "React, JavaScript, Tailwind CSS",
        experience: "2 Years",
        education: "B.Tech Computer Engineering",
        appliedJobs: 12,
        assessments: 8,
        interviews: 5,
        offers: 2,
      };
  });

  const [formData, setFormData] = useState({
    fullName: candidate?.fullName || "Janvi Movaliya",
    email: candidate?.email || "janvi@gmail.com",
    phone: candidate?.phone || "+91 98765 43210",
    skills: candidate?.skills || "React, JavaScript, Tailwind CSS",
    experience: candidate?.experience || "2 Years",
    education: candidate?.education || "B.Tech Computer Engineering",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }
    const updatedCandidate = {
      ...candidate,
      ...formData,
    };

    setCandidate(updatedCandidate);

    localStorage.setItem(
      "candidateData",
      JSON.stringify(updatedCandidate)
    );

    navigate("/candidate-profile-r"); // Redirect back to profile page after saving
  };

  // Colors — fully theme-driven (matches other candidate pages)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Unified clean input styling matching Candidate Portal theme
  const textFieldStyle = {
    mb: { xs: 1.75, sm: 2, md: 2.5 },
    "& .MuiInputLabel-root": {
      color: subText,
      fontSize: {
        xs: "0.85rem",
        sn: ".9rem",
        md: "0.95rem",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: primary,
    },
    "& .MuiOutlinedInput-root": {
      fontSize: {
        xs: "0.92rem",
        md: "1rem",
      },

      minHeight: {
        xs: 52,
        md: 56,
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

  return (
    <CandidateLayout>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: {
            xs: 1,
            sm: 2,
          },
          mb: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 850,
              letterSpacing: "-.03em",
              color: textColor,

              fontSize: {
                xs: "1.45rem",
                sm: "1.8rem",
                md: "2.1rem"
              }
            }}
          >
            Edit Profile
          </Typography>
        </Box>
      </Box>

      {/* Back button */}
      <Box
        sx={{
          mb: {
            xs: 2,
            md: 3,
          }
        }}
      >
        <Button
          component={Link}
          to="/candidate-profile-r"
          startIcon={<ArrowLeft size={12} />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: subText,
            "&:hover": {
              color: primary,
              bgcolor: "transparent",
            }
          }}
        >
          Back to Profile
        </Button>
      </Box>

      {/* Main Glassmorphic Form Card */}
      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 5,
          },
          borderRadius: {
            xs: 2.5,
            sm: 3,
            md: 5,
          },
          bgcolor: colors.card,
          backdropFilter: "blur(12px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: colors.shadow,
          },
        }}
      >
        {/* Live Initial-Updating Avatar Preview */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 2.5, sm: 3, md: 4.5 }, }}>
          <Avatar
            sx={{
              width: { xs: 70, sm: 85, md: 100 },
              height: { xs: 70, sm: 85, md: 100 },
              fontSize: {
                xs: "1.35rem",
                sm: "1.8rem",
                md: "2rem",
              },
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
              fontWeight: 800,
              boxShadow: `0 8px 24px ${primary}40`,
              border: `4px solid ${darkMode ? "rgba(30,41,59,0.9)" : "#ffffff"}`,
            }}
          >
            {formData.fullName ? formData.fullName.split(" ").map(n => n[0]).join("") : "JM"}
          </Avatar>
        </Box>

        {/* Section Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            mb: {
              xs: 2.5,
              md: 4,
            },
          }}
        >
          <Box sx={{ color: primary, display: "flex" }}>
            <UserRoundPen size={18} />
          </Box>
          <Typography
            sx={{
              color: textColor,
              fontWeight: 800,
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.25rem",
              },
            }}
          >
            Personal Details Configuration
          </Typography>
        </Box>

        <Divider sx={{ mb: { xs: 3, md: 4 }, borderColor: borderStyle }} />

        {/* Form Inputs Grid */}
        <Grid container spacing={{ xs: 1.75, sm: 2, md: 2.5 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          {/* Corrected spelling from 'Sills' to 'Skills' */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Skills Stack"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Work Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Highest Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>

        {/* Footer Actions triggers */}
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "stretch",
              sm: "flex-end",
            },
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: {
              xs: 1.5,
              sm: 2,
            },
            mt: {
              xs: 3,
              md: 4,
            }
          }}
        >
          <Button
            component={Link}
            to="/candidate-profile-r"
            variant="outlined"
            startIcon={<X size={12} />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              py: {
                xs: 1.2,
                md: 1.4,
              },

              px: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: {
                xs: "0.85rem",
                md: "0.9rem",
              },
              color: subText,
              borderColor: borderStyle,
              "&:hover": {
                borderColor: subText,
                bgcolor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              }
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={<Save size={12} />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              py: {
                xs: 1.2,
                md: 1.4,
              },

              px: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: {
                xs: "0.85rem",
                md: "0.9rem",
              },
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
              boxShadow: `0 4px 12px ${primary}33`,
              transition: "all 0.3s ease",
              "&:hover": {
                background: `linear-gradient(135deg, ${primary}, ${primary})`,
                transform: {
                  xs: "translateY(-1px)",
                  md: "translateY(-2px) scale(1.02)",
                },
                boxShadow: `0 8px 22px ${primary}59`,
              }
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </CandidateLayout>
  );
}