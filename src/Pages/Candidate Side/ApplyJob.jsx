import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
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
  ArrowLeft,
  CloudUpload,
  FileText,
  Send,
  X,
} from "lucide-react";

export default function ApplyJob() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const navigate = useNavigate();
  const { id } = useParams();

  // Form State bindings
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");

  // Colors — fully theme-driven
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

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
    navigate("/candidate/my-applications");
  };

  // Unified theme-driven input styling matching candidate portal
  const textFieldStyle = {
    mb: { xs: 2, sm: 2.3, md: 2.5 },
    "& .MuiInputLabel-root": {
      color: subText,
      fontSize: { xs: ".85rem", sm: ".9rem", md: ".95rem" },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: primary,
    },
    "& .MuiOutlinedInput-root": {
      fontSize: { xs: ".85rem", sm: ".9rem", md: ".95rem" },
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
      {/* Back link */}
      <Box
        sx={{
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowLeft size={12} />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: { xs: ".75rem", sm: ".82rem", md: ".85rem" },
            color: textColor,
            "&:hover": {
              color: primary,
              bgcolor: "transparent",
            }
          }}
        >
          Back to Job Details
        </Button>
      </Box>

      {/* Main Form Paper Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2.5, md: 4, lg: 5 },
          maxWidth: "850px",
          mx: "auto",
          borderRadius: { xs: 3, sm: 4, md: 5 },
          bgcolor: colors.card,
          backdropFilter: "blur(12px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: colors.shadow,
          },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              color: textColor,
              fontWeight: 850,
              letterSpacing: "-0.03em",
              mb: { xs: .5, sm: .8 },
              fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.15rem" },
            }}
          >
            Apply for Position
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 1.5, sm: 2, md: 2.5 }}
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
                fontSize: { xs: ".8rem", sm: ".85rem" },
                color: subText,
                textTransform: "uppercase",
                tracking: "0.03em",
                mb: { xs: 1, sm: 1.3, md: 1.5 },
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
                p: { xs: 2, sm: 3, md: 4 },
                border: `2px dashed ${resume ? primary : borderStyle}`,
                borderRadius: "12px",
                cursor: "pointer",
                bgcolor: colors.input,
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: primary,
                  bgcolor: `${primary}08`,
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
                  fontSize: { xs: 26, sm: 32 },
                  color: resume ? primary : subText,
                  mb: 1.5
                }}
              >
                <CloudUpload size={window.innerWidth < 600 ? 26 : 32} style={{ color: resume ? primary : subText, marginBottom: 12 }} />
              </Box>
              <Typography
                sx={{
                  color: subText,
                  fontWeight: 800,
                  fontSize: { xs: ".88rem", sm: ".95rem" },
                  mb: 0.5
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
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: { xs: 1, sm: 2 },
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: "10px",
                  border: `1px solid ${primary}33`,
                  bgcolor: `${primary}0a`,
                  mt: 2,
                }}
              >
                <FileText size={22} style={{ color: "#ef4444" }} />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: ".82rem", sm: ".88rem" },
                      color: primary
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
              mb: { xs: 2.5, sm: 3, md: 4 },
              p: { xs: 1.5, sm: 2 },
              borderRadius: "8px",
              bgcolor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
              fontWeight: 600,
              fontSize: { xs: ".8rem", sm: ".88rem" },
            }}
          >
            {error}
          </Box>
        )}

        {/* Action Panel Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: { xs: 1.5, sm: 2 },
            justifyContent: "flex-end",
            alignItems: "stretch",
          }}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            startIcon={<X size={12} />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              py: { xs: 1.1, sm: 1.3, md: 1.4 },
              px: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: { xs: ".8rem", sm: ".85rem", md: ".9rem" },
              color: subText,
              borderColor: borderStyle,
              "&:hover": {
                borderColor: primary,
                color: primary,
                bgcolor: `${primary}08`,
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<Send size={12} />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              py: { xs: 1.1, sm: 1.3, md: 1.4 },
              px: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: { xs: ".8rem", sm: ".85rem", md: ".9rem" },
              background: `linear-gradient(135deg,${primary},${secondary || primary})`,
              boxShadow: `0 8px 18px ${primary}47`,
              "&:hover": {
                background: `linear-gradient(135deg,${primary},${primary})`,
                transform: "translateY(-2px)",
                boxShadow: `0 12px 24px ${primary}59`,
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