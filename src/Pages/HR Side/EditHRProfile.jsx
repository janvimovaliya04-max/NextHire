import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import HRLayout from "../../Layouts/HRLayout";
import { toast } from "react-toastify";

import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  FaArrowLeft,
  FaUserTie,
  FaSave,
  FaTimes,
} from "react-icons/fa";

export default function EditHRProfile() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "HR Manager",
    email: "hr@nexthire.com",
    phone: "9876543210",
    department: "Human Resources",
    designation: "Senior HR Manager",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const subText = darkMode ? "#94a3b8" : "#475569";
  const textColor = darkMode ? "#ffffff" : "#0f172a";
  const borderStyle = darkMode
    ? "rgba(148, 163, 184, 0.22)"
    : "rgba(15, 23, 42, 0.08)";

  // Unified clean input styling matching Login / Register / CreateJob
  const textFieldStyle = {
    mb: 2.5,

    "& .MuiInputLabel-root": {
      color: darkMode ? "#94a3b8" : "#64748b",

      fontSize: {
        xs: "0.85rem",
        sm: "0.9rem",
        md: "1rem",
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#2563eb",
    },

    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#fff" : "#0f172a",

      backgroundColor: darkMode
        ? "rgba(15,23,42,0.55)"
        : "rgba(255,255,255,0.6)",

      borderRadius: "12px",

      "& fieldset": {
        borderColor: darkMode
          ? "rgba(255,255,255,0.22)"
          : "rgba(0,0,0,0.18)",
        borderWidth: "1.5px",
      },

      "& input": {
        fontSize: {
          xs: "0.9rem",
          sm: "0.95rem",
          md: "1rem",
        },
      },

      "&:hover fieldset": {
        borderColor: "#2563eb",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#2563eb",
        borderWidth: "2px",
      },
    },
  };

  const handleSave = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }

    toast.success("Profile updated successfully");

    navigate("/hr-profile");
  };

  return (
    <HRLayout>

      {/* Back Button */}
      <Box
        sx={{
          mb: {
            xs: 0.5,
            sm: 1,
            md: 1.2,
            lg: 1.5,
          },
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          startIcon={<FaArrowLeft size={12} />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            color: darkMode ? "#94a3b8" : "#475569",
          }}
        >
          Back
        </Button>
      </Box>

      {/* Page Header */}
      <Box
        sx={{
          mb: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 850,
            letterSpacing: "-0.03em",
            mb: 0.3,
            fontSize: {
              xs: "1.45rem",
              sm: "1.8rem",
              md: "2.125rem",
            },
          }}
        >
          Edit Profile
        </Typography>
      </Box>

      {/* Main Form Paper Card */}
      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2,
            sm: 2.5,
            md: 4,
          },
          borderRadius: "22px",
          bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
          backdropFilter: "blur(12px)",
          border: `1px solid ${borderStyle}`,

          // Premium Multi-layer Shadow
          boxShadow: darkMode
            ? `
          0 10px 20px rgba(0,0,0,0.30),
          0 4px 8px rgba(0,0,0,0.20)
        `
            : `
          0 12px 24px rgba(15,23,42,0.08),
          0 2px 6px rgba(15,23,42,0.05)
        `,

          transition: "all 0.3s ease",

          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: darkMode
              ? `
            0 18px 36px rgba(0,0,0,0.40),
            0 8px 12px rgba(0,0,0,0.25)
          `
              : `
            0 20px 40px rgba(15,23,42,0.12),
            0 6px 12px rgba(15,23,42,0.08)
          `,
          },
        }}
      >
        {/* Upgraded Avatar Preview */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: {
              xs: 1,
              md: 3,
            },
          }}
        >
          <Avatar
            sx={{
              width: {
                xs: 75,
                md: 100,
              },

              height: {
                xs: 75,
                md: 100,
              },

              fontSize: {
                xs: "1.4rem",
                md: "2rem",
              },
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              fontWeight: 800,
              boxShadow: "0 8px 24px rgba(37,99,235,0.25)",
              border: `4px solid ${darkMode ? "rgba(30,41,59,0.9)" : "#ffffff"}`,
            }}
          >
            {formData.fullName
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </Avatar>

          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Button
              variant="text"
              size="small"
              sx={{
                fontSize: {
                  xs: ".78rem",
                  md: ".875rem",
                },

                mt: {
                  xs: .5,
                  md: 1,
                },
                mt: 1,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Change Photo
            </Button>
          </Box>

        </Box>

        {/* Section Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.2, md: 1.5 }, mb: { xs: 3, md: 4 }, }}>
          <Box
            sx={{
              width: {
                xs: 40,
                md: 48,
              },

              height: {
                xs: 40,
                md: 48,
              },
              borderRadius: 3,
              bgcolor: "rgba(37,99,235,.12)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#2563EB",
            }}
          >
            <FaUserTie size={22} />
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
            Personal Information
          </Typography>
        </Box>

        {/* Form Grid */}
        <Grid
          container
          spacing={{
            xs: 0.5,
            sm: 1,
            md: 2,
          }}
        >
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
              slotProps={{
                readOnly: true,
              }} onChange={handleChange}
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

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mb: 1.5 }}>
            <TextField
              fullWidth
              label="Job Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>

        {/* Footer Buttons */}
        <Box
          sx={{
            mt: -2,
            pt: 3,
            borderTop: `1px solid ${borderStyle}`,
            display: "flex",
            justifyContent: "flex-end",
            gap: {
              xs: 1.5,
              md: 2,
            },
            flexWrap: "wrap"
          }}
        >
          <Button
            component={Link}
            to="/hr-profile"
            variant="outlined"
            startIcon={<FaTimes size={12} />}
            sx={{
              py: {
                xs: 1.1,
                md: 1.4,
              },

              px: {
                xs: 2.2,
                md: 3,
              },

              fontSize: {
                xs: "0.82rem",
                md: "0.9rem",
              },

              minWidth: {
                xs: "100%",
                sm: "160px",
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              color: darkMode ? "#cbd5e1" : "#475569",
              borderColor: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
              "&:hover": {
                borderColor: darkMode ? "#cbd5e1" : "#475569",
                bgcolor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              }
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={<FaSave size={12} />}
            sx={{
              py: {
                xs: 1.1,
                md: 1.4,
              },

              px: {
                xs: 2.2,
                md: 3,
              },

              fontSize: {
                xs: "0.82rem",
                md: "0.9rem",
              },

              minWidth: {
                xs: "100%",
                sm: "160px",
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(135deg,#2563EB,#3B82F6)",
              boxShadow: "0 10px 22px rgba(37,99,235,.25)",
              transition: ".25s",
              "&:hover": {
                background: "linear-gradient(135deg,#1D4ED8,#2563EB)",
                transform: "translateY(-2px)",
                boxShadow: "0 15px 28px rgba(37,99,235,.35)",
              }
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </HRLayout >
  );
}