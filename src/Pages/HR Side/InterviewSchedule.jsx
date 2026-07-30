import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import HRLayout from "../../Layouts/HRLayout";

import { toast } from "react-toastify";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import { FaCalendarPlus, FaSave, FaTimes } from "react-icons/fa";

export default function InterviewSchedule() {
  const { darkMode } = useTheme();

  // Form State bindings
  const [candidateName, setCandidateName] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [jobId, setJobId] = useState("");
  const [recruiterId, setRecruiterId] = useState("");
  const [mode, setMode] = useState("Online");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [result, setResult] = useState("Pending");
  const [remarks, setRemarks] = useState("");
  const [roundType, setRoundType] = useState(
    localStorage.getItem("roundType") || "technical"
  );

  const subText = darkMode ? "#94a3b8" : "#475569";
  const handleSchedule = () => {
    if (!candidateName.trim()) {
      toast.error("Candidate name is required");
      return;
    }

    if (!candidateId.trim()) {
      toast.error("Candidate ID is required");
      return;
    }

    if (!jobId.trim()) {
      toast.error("Job ID is required");
      return;
    }

    if (!recruiterId.trim()) {
      toast.error("Recruiter ID is required");
      return;
    }

    if (!interviewerName.trim()) {
      toast.error("Interviewer name is required");
      return;
    }

    if (!date) {
      toast.error("Select interview date");
      return;
    }

    if (!time) {
      toast.error("Select interview time");
      return;
    }

    toast.success("Interview Scheduled Successfully");
  };

  const borderStyle = darkMode
    ? "rgba(148, 163, 184, 0.22)"
    : "rgba(15, 23, 42, 0.08)";

  // Unified clean input styling matching Login / Register / InterviewManagement
  const textFieldStyle = {
    mb: {
      xs: 2,
      md: 2.5
    },
    "& .MuiInputLabel-root": {
      color: darkMode ? "#94a3b8" : "#64748b",
      fontSize: {
        xs: "0.82rem",
        sm: "0.9rem",
        md: "0.95rem"
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      fontSize: {
        xs: ".82rem",
        md: ".95rem",
      },
      color: "#2563eb",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: {
        xs: ".85rem",
        md: ".95rem"
      },
      color: darkMode ? "#ffffff" : "#0f172a",
      backgroundColor: darkMode
        ? "rgba(15, 23, 42, 0.55)"
        : "rgba(255, 255, 255, 0.4)",

      "& fieldset": {
        borderColor: darkMode
          ? "rgba(148, 163, 184, 0.35)"
          : "rgba(0, 0, 0, 0.12)",
        borderRadius: "10px",
        transition: "all 0.25s ease",
      },
      "& input, & textarea": {
        fontSize: {
          xs: ".85rem",
          md: ".95rem",
        },
      },
      "&:hover fieldset": {
        borderColor: darkMode
          ? "rgba(255,255,255,0.45)"
          : "#2563eb",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2563eb",
        borderWidth: "2px",
      },
    },
    "& .MuiSelect-icon": {
      color: darkMode ? "#94a3b8" : "#475569",
    },
  };

  return (
    <HRLayout>
      {/* Page Header */}
      <Box sx={{ mb: { xs: 3, md: 4 }, }}>
        <Typography
            sx={{
              fontSize: {
                xs: "1.45rem",
                sm: "1.7rem",
                md: "2rem",
                lg: "2.2rem",
              },
              mb: {
                xs: 0,
                md: 0.5,
              },
              fontWeight: 850,
              letterSpacing: "-0.03em",
            }}
          >
          Schedule Interview
        </Typography>
      </Box>

      {/* Premium Glassmorphic Form Card */}
      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 1.5,
            sm: 2.5,
            md: 4
          },
          borderRadius: {
            xs: 3,
            md: "22px"
          },
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
        {/* Section Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 4, gap: {
              xs: 1,
              md: 1.5
            },

            mb: {
              xs: 3,
              md: 4
            }
          }}
        >
          <Box
            sx={{
              color: "#2563eb", // Blue icon
              display: "flex",
            }}
          >
            <FaCalendarPlus size={window.innerWidth < 600 ? 13 : 16} />
          </Box>

          <Typography
            sx={{
              fontSize: {
                xs: "1rem",
                md: "1.25rem"
              },
              fontWeight: 800,
              color: darkMode ? "#fff" : "#0f172a",
            }}
          >
            Interview Details
          </Typography>
        </Box>

        <Grid
          container
          spacing={{
            xs: 1,
            md: 2
          }}
        >
          {/* Candidate Name Field (1/2 Width) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Candidate Name"
              placeholder="e.g. Janvi Movaliya"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              variant="outlined"
              sx={textFieldStyle}
            />
          </Grid>

          {/* Assigned Interviewer Field (1/2 Width) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Assigned Interviewer"
              placeholder="e.g. David (Lead UI)"
              value={interviewerName}
              onChange={(e) => setInterviewerName(e.target.value)}
              variant="outlined"
              sx={textFieldStyle}
            />
          </Grid>

          {/* Round Type Selector (1/3 Width) */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              select
              label="Interview Round"
              value={roundType}
              onChange={(e) => {
                setRoundType(e.target.value);
                localStorage.setItem("roundType", e.target.value)
              }}
              sx={textFieldStyle}
            >
              <MenuItem value="technical">Technical Live Coding</MenuItem>
              <MenuItem value="design">System Design Interview</MenuItem>
              <MenuItem value="behavioral">HR / Behavioral Round</MenuItem>
              <MenuItem value="managerial">Managerial Round</MenuItem>
            </TextField>
          </Grid>

          {/* Date Picker Field (1/3 Width) */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              type="date"
              label="Interview Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={textFieldStyle}
            />
          </Grid>

          {/* Time Picker Field (1/3 Width) */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              type="time"
              label="Interview Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={textFieldStyle}
            />
          </Grid>

          {/* Candidate ID */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              label="Candidate ID"
              placeholder="CAND001"
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              sx={textFieldStyle}
            />
          </Grid>

          {/* Job ID */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              label="Job ID"
              placeholder="JOB001"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              sx={textFieldStyle}
            />
          </Grid>

          {/* Recruiter ID */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              label="Recruiter ID"
              placeholder="REC001"
              value={recruiterId}
              onChange={(e) => setRecruiterId(e.target.value)}
              sx={textFieldStyle}
            />
          </Grid>

          {/* Interview Mode */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              sx={textFieldStyle}
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </TextField>
          </Grid>

          {/* Platform */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              label="Platform"
              placeholder="Google Meet"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              sx={textFieldStyle}
            />
          </Grid>

          {/* Status */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={textFieldStyle}
            >
              <MenuItem value="Upcoming">Upcoming</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="Rescheduled">Rescheduled</MenuItem>
            </TextField>
          </Grid>

          {/* Result */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              sx={textFieldStyle}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Selected">Selected</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
          </Grid>

          {/* Meeting Link */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Meeting Link"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              sx={textFieldStyle}
            />
          </Grid>

          {/* Remarks */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={4}
              label="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>

        {/* Footer Actions triggers */}
        <Box sx={{
          display: "flex", flexDirection: {
            xs: "column",
            sm: "row"
          },

          gap: {
            xs: 1.5,
            md: 2
          },

          justifyContent: "flex-end",

          mt: {
            xs: 1,
            md: 2
          },
          flexWrap: "wrap"
        }}>
          <Button
            component={Link}
            to="/interview-management"
            variant="outlined"
            startIcon={<FaTimes size={12} />}
            sx={{
              width: {
                xs: "100%",
                sm: "auto"
              },

              px: {
                xs: 2,
                md: 3
              },

              py: {
                xs: 1.1,
                md: 1.4
              },

              fontSize: {
                xs: ".82rem",
                md: ".9rem"
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              color: darkMode ? "#cbd5e1" : "#475569",
              borderColor: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
              "&:hover": {
                borderColor: darkMode ? "#cbd5e1" : "#475569",
                bgcolor: darkMode
                  ? "rgba(37,99,235,.10)"
                  : "rgba(37,99,235,.05)"
              }
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSchedule}
            startIcon={<FaSave size={12} />}
            sx={{
              width: {
                xs: "100%",
                sm: "auto"
              },

              px: {
                xs: 2,
                md: 3
              },

              py: {
                xs: 1.1,
                md: 1.4
              },

              fontSize: {
                xs: ".82rem",
                md: ".9rem"
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",

              boxShadow: "0 8px 18px rgba(37,99,235,.28)",

              transition: ".25s",

              "&:hover": {
                background: "linear-gradient(135deg,#1d4ed8,#1e40af)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 24px rgba(37,99,235,.35)",
              }
            }}
          >
            Schedule Interview
          </Button>
        </Box>
      </Paper>
    </HRLayout>
  );
}