import { useTheme } from "../../context/ThemeContext";
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

import { FaBriefcase, FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";

export default function CreateJob() {
  const { darkMode } = useTheme();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const subText = darkMode
    ? "#94a3b8"
    : "#475569";
  const borderStyle = darkMode
    ? "rgba(148, 163, 184, 0.22)"
    : "rgba(15, 23, 42, 0.08)";

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
    navigate("/job-management");
  };

  // Unified clean input styling matching Login / Register / CreateAssessment
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
      color: "#2563EB",
    },

    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#fff" : "#0f172a",

      background: darkMode
        ? "rgba(15,23,42,.65)"
        : "#ffffff",

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
        borderColor: darkMode
          ? "rgba(59,130,246,.18)"
          : "rgba(37,99,235,.10)",
      },

      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },

      "&.Mui-focused": {
        boxShadow: darkMode
          ? "0 0 0 4px rgba(37,99,235,.18)"
          : "0 0 0 4px rgba(37,99,235,.12)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#2563EB",
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
          to="/job-management"
          startIcon={<FaArrowLeft size={12} />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            color: darkMode ? "#94a3b8" : "#475569",
            "&:hover": {
              bgcolor: "transparent",
              color: "#2563eb",
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
            fontWeight: 850,
            letterSpacing: "-0.03em",
            fontSize: {
              xs: "1.45rem",
              sm: "1.8rem",
              md: "2.125rem",
            },
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
                bgcolor: "rgba(37,99,235,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563EB",
              }}
            >
              <FaBriefcase
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
                color: darkMode ? "#fff" : "#0f172a",
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
              bgcolor: darkMode
                ? "rgba(15,23,42,.5)"
                : "#F8FAFC",
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
                color: darkMode ? "#fff" : "#0f172a",
              }}
            >
              Job Preview
            </Typography>

            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, }} color={subText}>
              <bold>Title:</bold> {jobTitle || "-"}
            </Typography>

            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, }} color={subText}>
              <bold>Location:</bold> {location || "-"}
            </Typography>

            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, }} color={subText}>
              <bold>Salary:</bold> ₹{salary || "-"}
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
                  bgcolor: darkMode ? "rgba(37,99,235,0.10)" : "rgba(37, 99, 235, 0.08)"
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
              startIcon={<FaSave size={12} />}
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
                background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
                boxShadow: "0 4px 12px rgba(37,99,235,0.2)",
                "&:hover": {
                  background: "linear-gradient(90deg, #1d4ed8, #1e40af)",
                  boxShadow: "0 6px 16px rgba(37,99,235,0.3)",
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