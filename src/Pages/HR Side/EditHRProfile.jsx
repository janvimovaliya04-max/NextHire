import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
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
  ArrowLeft,
  UserRound,
  Save,
  X,
} from "lucide-react";

export default function EditHRProfile() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
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

  const primary = colors.primary;
  const secondary = colors.secondary;
  const subText = colors.subText;
  const textColor = colors.text;
  const borderStyle = colors.border;

  // Unified clean input styling matching Login / Register / CreateJob
  const textFieldStyle = {
    mb: 2.5,

    "& .MuiInputLabel-root": {
      color: subText,

      fontSize: {
        xs: "0.85rem",
        sm: "0.9rem",
        md: "1rem",
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: primary,
    },

    "& .MuiOutlinedInput-root": {
      color: textColor,

      backgroundColor: colors.input,

      borderRadius: "12px",

      "& fieldset": {
        borderColor: colors.border,
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
        borderColor: primary,
      },

      "&.Mui-focused fieldset": {
        borderColor: primary,
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

    navigate("/hr/hr-profile");
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
          startIcon={<ArrowLeft size={12} />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            color: subText,
            "&:hover": {
              bgcolor: "transparent",
              color: primary,
            },
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
                fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
                mb: { xs: 0, md: 0.5 },
                fontWeight: 850,
                letterSpacing: "-0.03em",
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
          bgcolor: colors.card,
          backdropFilter: "blur(12px)",
          border: `1px solid ${borderStyle}`,

          boxShadow: colors.shadow,

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
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
              fontWeight: 800,
              boxShadow: `0 8px 24px ${primary}40`,
              border: `4px solid ${colors.card}`,
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
                color: primary,
                "&:hover": {
                  bgcolor: `${primary}08`,
                },
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
              bgcolor: `${primary}15`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: primary,
            }}
          >
            <UserRound size={22} />
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
            to="/hr/hr-profile"
            variant="outlined"
            startIcon={<X size={12} />}
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
              color: subText,
              borderColor: borderStyle,
              "&:hover": {
                borderColor: primary,
                bgcolor: `${primary}08`,
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
              background: `linear-gradient(135deg,${primary},${secondary || primary})`,
              boxShadow: `0 10px 22px ${primary}40`,
              transition: ".25s",
              "&:hover": {
                background: `linear-gradient(135deg,${primary},${primary})`,
                transform: "translateY(-2px)",
                boxShadow: `0 15px 28px ${primary}59`,
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