import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "react-toastify"; // <-- Fixed missing import
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaFilePdf,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";

export default function ApplyJob() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  // Form State bindings
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");

  const subText = darkMode ? "#94a3b8" : "#475569";
  const borderStyle = darkMode
    ? "rgba(148,163,184,0.22)"
    : "rgba(15,23,42,0.08)";

  const handleSubmit = () => {
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }
    if (!email.trim()) {
      setError("Email address is required");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }
    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    }
    if (!resume.trim()) {
      setError("Resume / CV file is required");
      return;
    }
    setError("");
    toast.success("Application submitted successfully");
    navigate("/my-applications");
  };

  // Unified Emerald theme input styling matching candidate portal
  const textFieldStyle = {
    mb: {
      xs: 2,
      sm: 2.3,
      md: 2.5,
    },
    "& .MuiInputLabel-root": {
      color: darkMode ? "#94a3b8" : "#64748b",
      fontSize: {
        xs: ".85rem",
        sm: ".9rem",
        md: ".95rem",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#10b981", // Emerald Green Focus
    },
    "& .MuiOutlinedInput-root": {
      fontSize: {
        xs: ".85rem",
        sm: ".9rem",
        md: ".95rem",
      },
      color: darkMode ? "#ffffff" : "#0f172a",
      backgroundColor: darkMode ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.6)",
      "& fieldset": {
        borderColor: darkMode ? "rgba(148,163,184,0.35)" : "rgba(0,0,0,0.12)",
        borderRadius: "10px",
        transition: "border-color 0.2s ease",
      },
      "&:hover fieldset": {
        borderColor: "#10b981", // Emerald
      },
      "&.Mui-focused fieldset": {
        borderColor: "#10b981", // Emerald
        borderWidth: "2px",
      },
    },
  };

  return (
    <CandidateLayout>
      {/* Back link */}
      <Box
        sx={{
          mb: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          startIcon={<FaArrowLeft size={12} />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: {
              xs: ".75rem",
              sm: ".82rem",
              md: ".85rem",
            },
            color: darkMode ? "#ffffff" : "#0f172a",
            "&:hover": {
              color: "#10b981",
              bgcolor: "transparent",
            }
          }}
        >
          Back to Job Details
        </Button>
      </Box>

      {/* Main Form Paper Card */}
      <Paper
        elevation={6}
        sx={{
          p: {
            xs: 1.5,
            sm: 2.5,
            md: 4,
            lg: 5,
          },
          maxWidth: "850px",
          mx: "auto",
          borderRadius: {
            xs: 3,
            sm: 4,
            md: 5,
          },
          bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
          backdropFilter: "blur(12px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: darkMode
            ? `
                0 10px 20px rgba(0,0,0,.30),
                0 4px 8px rgba(0,0,0,.20)
              `
            : `
                0 12px 24px rgba(15,23,42,.08),
                0 2px 6px rgba(15,23,42,.05)
              `,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: darkMode
              ? `
                  0 18px 36px rgba(0,0,0,.40),
                  0 8px 12px rgba(0,0,0,.25)
                `
              : `
                  0 20px 40px rgba(15,23,42,.12),
                  0 6px 12px rgba(15,23,42,.08)
                `,
          },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              color: darkMode ? "#ffffff" : "#0f172a",
              fontWeight: 850,
              letterSpacing: "-0.03em",
              mb: {
                xs: .5,
                sm: .8,
              },
              fontSize: {
                xs: "1.35rem",
                sm: "1.7rem",
                md: "2rem",
                lg: "2.15rem",
              },
            }}
          >
            Apply for Position
          </Typography>
        </Box>

        <Grid
          container
          spacing={{
            xs: 1.5,
            sm: 2,
            md: 2.5,
          }}
        >
          {/* Full Name */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Full Name"
              placeholder="e.g. Alex Candidate"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              variant="outlined"
              sx={textFieldStyle}
            />
          </Grid>

          {/* Email Address */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              placeholder="e.g. candidate@nexthire.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={textFieldStyle}
            />
          </Grid>

          {/* Phone Number */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="e.g. +91 98765 43210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="outlined"
              sx={textFieldStyle}
            />
          </Grid>

          {/* Premium Resume Upload Drag-Box */}
          <Grid size={{ xs: 12 }} sx={{ mb: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: ".8rem",
                  sm: ".85rem",
                },
                color: subText,
                textTransform: "uppercase",
                tracking: "0.03em",
                mb: {
                  xs: 1,
                  sm: 1.3,
                  md: 1.5,
                },
              }}
            >
              Upload Documents
            </Typography>

            <Box
              component="label"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                },
                border: `2px dashed ${resume ? "#10b981" : darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
                borderRadius: "12px",
                cursor: "pointer",
                bgcolor: darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#10b981",
                  bgcolor: darkMode ? "rgba(16,185,129,.06)" : "rgba(16,185,129,.03)",
                }
              }}
            >
              <input
                hidden
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={(e) => setResume(e.target.files?.[0]?.name || "")}
              />
              <Box
                sx={{
                  fontSize: {
                    xs: 26,
                    sm: 32,
                  },
                  color: resume ? "#10b981" : "#94a3b8",
                  mb: 1.5
                }}
              >
                <FaCloudUploadAlt size={window.innerWidth < 600 ? 26 : 32} style={{ color: resume ? "#10b981" : "#94a3b8", marginBottom: 12 }} />
              </Box>
              <Typography
                sx={{
                  color: subText,
                  fontWeight: 800,
                  fontSize: {
                    xs: ".88rem",
                    sm: ".95rem",
                  }, mb: 0.5
                }}
              >
                {resume ? "Replace Uploaded File" : "Choose CV / Resume File"}
              </Typography>
              <Typography sx={{ color: subText, fontSize: "0.75rem" }}>
                Supports PDF, DOCX or DOC files up to 5MB size
              </Typography>
            </Box>

            {/* Selected File Card Indicator */}
            {resume && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  alignItems: {
                    xs: "flex-start",
                    sm: "center",
                  },
                  gap: {
                    xs: 1,
                    sm: 2,
                  },
                  p: {
                    xs: 1.5,
                    sm: 2,
                  },
                  borderRadius: "10px",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  bgcolor: darkMode
                    ? "rgba(16,185,129,.08)"
                    : "rgba(16,185,129,.04)",
                  mt: 2,
                }}
              >
                <FaFilePdf size={22} style={{ color: "#ef4444" }} />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: ".82rem",
                        sm: ".88rem",
                      },
                      color: "#10b981"
                    }}
                  >
                    {resume}
                  </Typography>
                  <Typography sx={{ color: subText, fontSize: "0.72rem" }}>
                    Ready for pipeline upload
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>

          {/* Cover Letter */}
          <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={5}
              label="Cover Letter / Introduction"
              placeholder="Introduce yourself to the recruiter. What interests you about this role?"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              variant="outlined"
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>

        {/* Validation error box */}
        {error && (
          <Box
            sx={{
              mb: {
                xs: 2.5,
                sm: 3,
                md: 4,
              },
              p: {
                xs: 1.5,
                sm: 2,
              },
              borderRadius: "8px",
              bgcolor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
              fontWeight: 600,
              fontSize: {
                xs: ".8rem",
                sm: ".88rem",
              },
            }}
          >
            {error}
          </Box>
        )}

        {/* Action Panel Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              sm: "row",
            },
            gap: {
              xs: 1.5,
              sm: 2,
            },
            justifyContent: "flex-end",
            alignItems: "stretch",
          }}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            startIcon={<FaTimes size={12} />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              py: {
                xs: 1.1,
                sm: 1.3,
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
                xs: ".8rem",
                sm: ".85rem",
                md: ".9rem",
              },
              color: darkMode ? "#cbd5e1" : "#475569",
              borderColor: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
              "&:hover": {
                borderColor: darkMode ? "#cbd5e1" : "#475569",
                bgcolor: darkMode ? "rgba(16,185,129,.08)" : "rgba(16,185,129,.04)",
              }
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<FaPaperPlane size={12} />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              py: {
                xs: 1.1,
                sm: 1.3,
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
                xs: ".8rem",
                sm: ".85rem",
                md: ".9rem",
              },
              background: "linear-gradient(135deg,#10b981,#059669)",
              boxShadow: "0 8px 18px rgba(16,185,129,.28)",
              "&:hover": {
                background: "linear-gradient(135deg,#059669,#047857)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 24px rgba(16,185,129,.35)",
              }
            }}
          >
            Submit Application
          </Button>
        </Box>
      </Paper>
    </CandidateLayout>
  );
}