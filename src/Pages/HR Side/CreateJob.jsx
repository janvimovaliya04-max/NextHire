import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Link } from "react-router-dom";
import HRLayout from "../../Layouts/HRLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  Paper,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  Briefcase,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";

export default function CreateJob() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const handleSubmit = () => {
    if (!jobTitle.trim()) {
      toast.error("Job title is required");
      return;
    }

    if (!location.trim()) {
      toast.error("Location is required");
      return;
    }

    if (!salary) {
      toast.error("Salary is required");
      return;
    }

    if (salary <= 0) {
      toast.error("Salary must be greater than 0");
      return;
    }

    if (!description.trim()) {
      toast.error("Job description is required");
      return;
    }

    toast.success("Job created successfully");
    navigate("/hr/job-management");
  };

  // Unified clean input styling matching Login / Register / CreateAssessment
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

      background: colors.input,

      borderRadius: "12px",

      "& input": {
        fontSize: {
          xs: "0.9rem",
          sm: "0.95rem",
          md: "1rem",
        },
      },
      "& textarea": {
        fontSize: {
          xs: "0.9rem",
          sm: "0.95rem",
          md: "1rem",
        },
      },

      transition: ".3s",

      "& fieldset": {
        borderColor: colors.border,
      },

      "&:hover fieldset": {
        borderColor: primary,
      },

      "&.Mui-focused": {
        boxShadow: `0 0 0 4px ${primary}20`,
      },

      "&.Mui-focused fieldset": {
        borderColor: primary,
        borderWidth: "2px",
      },
    },
  };

  return (
    <HRLayout>

      {/* Back button */}
      <Box
        sx={{
          mb: {
            xs: .5,
            sm: 1,
            md: 1.2,
            lg: 1.5
          },
        }}
      >
        <Button
          component={Link}
          to="/hr/job-management"
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

      {/* Title Header */}
      <Box
        sx={{
          mb: {
            xs: 2,
            md: 2.5,
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
          Create Job Posting
        </Typography>
      </Box>

      {/* Premium Glassmorphic Card */}
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
          backdropFilter: "blur(16px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,

          transition: ".3s",

          "&:hover": {
            transform: "translateY(-4px)",

            boxShadow: darkMode
              ? `
                0 24px 55px rgba(0,0,0,.42)
              `
              : `
                0 26px 55px rgba(15,23,42,.12)
              `,
          },
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 0,
              sm: 1,
            },
          }}
        >
          {/* Section Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 1.2,
                md: 1.5,
              },
              mb: {
                xs: 3,
                md: 4,
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 42,
                  md: 48,
                },

                height: {
                  xs: 42,
                  md: 48,
                },

                borderRadius: {
                  xs: 2,
                  md: 3,
                },
                bgcolor: `${primary}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: primary,
              }}
            >
              <Briefcase
                size={
                  window.innerWidth < 600
                    ? 18
                    : 22
                }
              />

            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                color: textColor,
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.25rem",
                },
              }}
            >
              Job Specifications
            </Typography>
          </Box>

          <Grid
            container
            spacing={{
              xs: 0.2,
              sm: .9,
              md: 1,
            }}
          >
            {/* Job Title Field */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                helperText="Enter the job role."
                label="Job Title *"
                placeholder="e.g. Senior React Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

            {/* Location Field */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                helperText="Office location or Remote."
                label="Location *"
                placeholder="e.g. Surat, India or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

            {/* Salary Field */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                helperText="Annual salary in INR."
                type="number"
                label="Salary (per annum) *"
                placeholder="e.g. 120000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>

            {/* Description Field */}
            <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                maxRows={8}
                helperText={`Characters: ${description.length}/1000`}
                label="Job Description *"
                placeholder="Provide a comprehensive job description, responsibilities, and qualifications..."
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    setDescription(e.target.value);
                  }
                }}
                variant="outlined"
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>

          <Paper
            elevation={0}
            sx={{
              mt: -2,
              p: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },
              borderRadius: 3,
              bgcolor: colors.background,
              border: `1px solid ${borderStyle}`,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: "0.95rem",
                  md: "1rem",
                },
                mb: 2,
                color: textColor,
              }}
            >
              Job Preview
            </Typography>

            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, color: subText }}>
              <b>Title:</b> {jobTitle || "-"}
            </Typography>

            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, color: subText }}>
              <b>Location:</b> {location || "-"}
            </Typography>

            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, color: subText }}>
              <b>Salary:</b> ₹{salary || "-"}
            </Typography>
          </Paper>

          {/* Footer Trigger Buttons */}
          <Stack
            direction="row"
            spacing={{
              xs: 1.5,
              md: 2,
            }}
            sx={{
              justifyContent: "flex-end",
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${borderStyle}`,
              flexWrap: "wrap",
              gap: 2
            }}
          >
            <Button
              component={Link}
              to="/hr"
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
              disabled={
                !jobTitle.trim() ||
                !location.trim() ||
                !salary ||
                !description.trim()
              }
              onClick={handleSubmit}
              startIcon={<Save size={12} />}
              sx={{
                "&.Mui-disabled": {
                  color: "#fff",
                },
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
                background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                boxShadow: `0 4px 12px ${primary}33`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${primary}, ${primary})`,
                  boxShadow: `0 6px 16px ${primary}4d`,
                }
              }}
            >
              Create Job
            </Button>
          </Stack>
        </CardContent>
      </Paper>
    </HRLayout>
  );
}