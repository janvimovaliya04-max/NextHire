import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Link, useLocation } from "react-router-dom";
import HRLayout from "../../Layouts/HRLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Paper,
  Avatar,
  Typography,
  Button,
  Chip,
  Box,
  Divider,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaCheck,
  FaCalendarAlt,
  FaFilePdf,
  FaTimes,
} from "react-icons/fa";

export default function CandidateProfileV() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderColor = colors.border;
  const location = useLocation(); // <-- Get router state

  // Extract passed candidate details
  const passedApplicant = location.state?.applicant;
  const candidate = location.state?.applicant;

  if (!candidate) {
    return (
      <HRLayout>
        <Typography sx={{ p: 4, color: textColor }}>
          Candidate data not found.
        </Typography>
      </HRLayout>
    );
  }

  const navigate = useNavigate();
  const borderStyle = colors.border;

  // Primary Button (matches reference theme) //
  const primaryBtn = {
    py: { xs: 1.2, md: 2 },
    borderRadius: { xs: "8px", md: "10px" },
    fontWeight: 700,
    textTransform: "none",
    background: `linear-gradient(135deg,${primary},${secondary || primary})`,
    boxShadow: `0 10px 22px ${primary}40`,
    "&:hover": {
      background: `linear-gradient(135deg,${primary},${primary})`,
      transform: "translateY(-1px)",
    },
  };

  // Outline Button (matches reference theme) //
  const outlineBtn = {
    py: { xs: 1.2, md: 2 },
    borderRadius: { xs: "8px", md: "10px" },
    fontWeight: 700,
    textTransform: "none",
    color: primary,
    borderColor: `${primary}40`,
    "&:hover": {
      borderColor: primary,
      bgcolor: `${primary}10`,
      transform: "translateY(-1px)",
    },
  };

  return (
    <HRLayout>
      {/* Back button */}
      <Box sx={{ mb: { xs: 2, md: 4 }, }}>
        <Button
          onClick={() => navigate(-1)}
          startIcon={<FaArrowLeft size={12} />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: {
              xs: "0.78rem",
              md: "0.85rem",
            },
            color: subText,
            "&:hover": {
              color: primary,
              bgcolor: "transparent",
            }
          }}
        >
          Back
        </Button>
      </Box>

      {/* Main Grid Content */}
      <Grid container spacing={{ xs: 2, md: 4 }}>

        {/* Left Side: Summary Panel (1/3rd width) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2.5, md: 4 },
              borderRadius: 5,
              bgcolor: colors.card,
              backdropFilter: "blur(18px)",
              border: `1px solid ${borderStyle}`,
              boxShadow: colors.shadow,
              textAlign: "center",
              position: { xs: "static", md: "sticky" },
              top: { md: 24 },
            }}
          >
            {/* Dynamic Avatar with matching colors */}
            <Avatar
              sx={{
                width: { xs: 64, md: 96 },
                height: { xs: 64, md: 96 },
                fontSize: { xs: 24, md: 36 },
                mx: "auto",
                mb: 2.5,
                background: `linear-gradient(135deg,${primary},${secondary || primary})`,
                fontWeight: 800,
                boxShadow: `0 15px 30px ${primary}48`,
              }}
            >
              {candidate.initials ? candidate.initials : candidate.fullName.charAt(0)}
            </Avatar>

            <Typography
              sx={{
                color: textColor,
                fontWeight: 850,
                mb: 0.5,
                fontSize: {
                  xs: "1.15rem",
                  sm: "1.3rem",
                  md: "1.7rem",
                }
              }}
            >
              {candidate.fullName}
            </Typography>

            <Typography
              sx={{
                color: primary,
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              {candidate.position}
            </Typography>

            <Typography
              sx={{
                color: textColor,
                fontSize: "0.82rem",
                mb: 2.5,
              }}
            >
              {candidate.experience + " Years"} Experience
            </Typography>

            <Chip
              label={candidate.status}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: "0.75rem",
                bgcolor:
                  candidate.status === "Shortlisted"
                    ? "rgba(16,185,129,.2)"
                    : candidate.status === "Rejected"
                      ? "rgba(239,68,68,.2)"
                      : candidate.status === "Interview Scheduled"
                        ? "rgba(139,92,246,.2)"
                        : `${primary}25`,

                color:
                  candidate.status === "Shortlisted"
                    ? "#10b981"
                    : candidate.status === "Rejected"
                      ? "#ef4444"
                      : candidate.status === "Interview Scheduled"
                        ? "#8b5cf6"
                        : primary,
                border: `1px solid ${candidate.status === "Shortlisted" ? "rgba(16, 185, 129, 0.2)" : candidate.status === "Rejected" ? "rgba(239, 68, 68, 0.2)" : `${primary}30`}`,
                px: 1,
                mb: 4,
              }}
            />

            <Divider sx={{ mb: 3.5, borderColor: borderStyle }} />

            {/* Quick Contact Details */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, md: 2.2 },
                textAlign: "left",
                mb: 4,
              }}
            >
              {/* Email */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, md: 1.8 },
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    bgcolor: `${primary}15`,
                    color: primary,
                  }}
                >
                  <FaEnvelope size={14} />
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: "0.78rem", md: "0.88rem" },
                    fontWeight: 600,
                    color: textColor,
                    wordBreak: "break-word",
                    lineHeight: 1.4,
                  }}
                >
                  {candidate.email}
                </Typography>
              </Box>

              {/* Phone */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, md: 1.8 },
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    bgcolor: "rgba(16,185,129,0.12)",
                    color: "#34D399",
                  }}
                >
                  <FaPhone size={13} />
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: "0.78rem", md: "0.88rem" },
                    fontWeight: 600,
                    color: textColor,
                    lineHeight: 1.4,
                  }}
                >
                  {candidate.phone}
                </Typography>
              </Box>

              {/* Location */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, md: 1.8 },
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    bgcolor: "rgba(139,92,246,0.12)",
                    color: "#A78BFA",
                  }}
                >
                  <FaMapMarkerAlt size={14} />
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: "0.78rem", md: "0.88rem" },
                    fontWeight: 600,
                    color: textColor,
                    lineHeight: 1.4,
                  }}
                >
                  {candidate.location}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3.5, borderColor: borderStyle }} />

            {/* Core Action triggers */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => toast.success(`${candidate.fullName} shortlisted successfully`)}
                  startIcon={<FaCheck size={12} />}
                  sx={{
                    py: { xs: 1.2, md: 2 },
                    borderRadius: { xs: "8px", md: "10px" },
                    fontWeight: 700,
                    textTransform: "none",
                    background: "linear-gradient(135deg,#10B981,#22C55E)",
                    boxShadow: "0 10px 22px rgba(16,185,129,.25)",
                    "&:hover": {
                      background: "linear-gradient(135deg,#059669,#10B981)",
                      transform: "translateY(-1px)",
                    }
                  }}
                >
                  Shortlist Candidate
                </Button>
              </Box>

              <Box>
                <Button
                  fullWidth
                  variant="outlined"
                  component={Link}
                  to="/interview-schedule"
                  state={{ candidate }}
                  startIcon={<FaCalendarAlt size={12} />}
                  sx={{
                    py: { xs: 1.2, md: 2 },
                    borderRadius: { xs: "8px", md: "10px" },
                    fontWeight: 700,
                    textTransform: "none",
                    color: "#7C3AED",
                    borderColor: "rgba(124,58,237,.30)",
                    "&:hover": {
                      borderColor: "#8b5cf6",
                      bgcolor: "rgba(124,58,237,.06)",
                      transform: "translateY(-1px)",
                    }
                  }}
                >
                  Schedule Interview
                </Button>
              </Box>

              <Button
                fullWidth
                variant="text"
                onClick={() => toast.success(`${candidate.fullName} rejected`)}
                startIcon={<FaTimes size={12} />}
                sx={{
                  py: { xs: 1.2, md: 2 },
                  borderRadius: "10px",
                  fontWeight: 700,
                  textTransform: "none",
                  color: "#DC2626",
                  "&:hover": {
                    bgcolor: "rgba(220,38,38,.06)",
                  }
                }}
              >
                Reject Application
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Side: Professional Details Panel (2/3rds width) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 4 }, }}>

            {/* Skills & Qualifications Panel */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, sm: 2.5, md: 4 },
                borderRadius: 5,
                bgcolor: colors.card,
                backdropFilter: "blur(12px)",
                border: `1px solid ${borderStyle}`,
                boxShadow: colors.shadow,
                transition: ".3s",

                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: colors.shadow,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "1rem",
                    md: "1.25rem",
                  },
                  color: textColor,
                  fontWeight: 800,
                  mb: 3.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <FaGraduationCap style={{ color: primary }} size={20} />
                Skills & Education
              </Typography>

              {/* Education row */}
              <Box sx={{ mb: 4.5 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: ".82rem",
                    letterSpacing: "1px",
                    color: primary,
                    mb: 1.5,
                  }}
                >
                  Education
                </Typography>
                <Typography
                  sx={{
                    color: textColor,
                    fontWeight: 700,
                    fontSize: {
                      xs: "0.95rem",
                      md: "1.05rem",
                    }
                  }}
                >
                  {candidate.education.degree} in{" "}
                  {candidate.education.specialization}
                </Typography>

                <Typography
                  sx={{
                    color: subText,
                    mt: 1,
                  }}
                >
                  {candidate.education.college}
                </Typography>

                <Typography
                  sx={{
                    color: subText,
                  }}
                >
                  Graduation Year: {candidate.education.graduationYear}
                </Typography>
                <Typography sx={{ color: subText, fontSize: "0.88rem", mt: 0.5 }}>
                  Graduated with Distinction • First Class Honours
                </Typography>
              </Box>

              {/* Skills grid */}
              <Box>
                <Typography sx={{
                  fontWeight: 700,
                  fontSize: { xs: ".75rem", md: ".82rem" },
                  borderRadius: "10px",
                  px: 1,
                  py: .5,
                  mb: 2,
                  bgcolor: colors.background,
                  color: primary,
                  border: `1px solid ${primary}30`,
                  transition: ".25s",
                  display: "inline-block",
                  "&:hover": {
                    bgcolor: primary,
                    color: "#fff",
                    transform: "translateY(-2px)",
                  },
                }}
                >
                  Technical Stack
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
                  {candidate.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "0.72rem", md: "0.82rem" },
                        py: 0.5,
                        px: 0.5,
                        borderRadius: "8px",
                        bgcolor: colors.background,
                        border: `1px solid ${borderStyle}`,
                        color: subText,
                        "&:hover": {
                          borderColor: primary,
                          color: primary,
                          bgcolor: `${primary}08`,
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>

            {/* Resume CV Download Panel */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 4 },
                borderRadius: 5,
                bgcolor: colors.card,
                backdropFilter: "blur(12px)",
                border: `1px solid ${borderStyle}`,
                boxShadow: colors.shadow,

                transition: ".3s",

                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: colors.shadow,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "1rem",
                    md: "1.25rem",
                  },
                  color: textColor,
                  fontWeight: 800,
                  mb: 3.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                Submitted Documents
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "flex-start", md: "center" },
                  justifyContent: "space-between",
                  p: {
                    xs: 1.5,
                    md: 2.5,
                  },
                  borderRadius: 4,
                  border: `1px solid ${borderStyle}`,
                  bgcolor: colors.background,
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <FaFilePdf size={30} style={{ color: "#DC2626" }} />
                  <Box>
                    <Typography sx={{ color: textColor, fontWeight: 600, fontSize: "0.8rem" }}>
                      {candidate.resume}
                    </Typography>
                    <Typography sx={{ color: subText, fontSize: "0.78rem" }}>
                      PDF Document • 1.4 MB
                    </Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth={false}
                  variant="contained"
                  size="small"
                  startIcon={<FaFilePdf size={12} />}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "auto",
                    },
                    ...primaryBtn,
                    py: 1,
                    px: { xs: 2, md: 2.8 },
                  }}
                >
                  Download Resume
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </HRLayout>
  );
}