import { Link } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaClipboardCheck } from "react-icons/fa";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";

export default function Feedback() {
  const { darkMode } = useTheme();
  const [error, setError] = useState("");

  const [feedback, setFeedback] = useState({
    interviewId: "",
    candidateId: "",
    jobId: "",
    recruiterId: "",
    technicalRating: "",
    communicationRating: "",
    problemSolvingRating: "",
    overallRating: "",
    strengths: "",
    improvements: "",
    comments: "",
    recommendation: "",
  });

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!feedback.candidateId.trim()) {
      setError("Candidate ID is required");
      return;
    }

    if (!feedback.interviewId.trim()) {
      setError("Interview ID is required");
      return;
    }

    if (!feedback.technicalRating) {
      setError("Technical Rating is required");
      return;
    }

    if (!feedback.comments.trim()) {
      setError("Comments are required");
      return;
    }
    setError("");
    toast.success("Feedback submitted successfully");
    setFeedback({
      interviewId: "",
      candidateId: "",
      jobId: "",
      recruiterId: "",
      technicalRating: "",
      communicationRating: "",
      problemSolvingRating: "",
      overallRating: "",
      strengths: "",
      improvements: "",
      comments: "",
      recommendation: "",
    });
  };

  const textFieldStyle = {
    mb: 2.5,

    "& .MuiInputLabel-root": {
      color: darkMode ? "#94a3b8" : "#64748b",
      fontSize: ".95rem",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#14b8a6",
    },

    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#ffffff" : "#0f172a",

      backgroundColor: darkMode
        ? "rgba(15,23,42,.55)"
        : "rgba(255,255,255,.6)",

      "& fieldset": {
        borderColor: darkMode
          ? "rgba(255,255,255,.18)"
          : "rgba(0,0,0,.12)",

        borderRadius: "10px",
      },

      "&:hover fieldset": {
        borderColor: "#14b8a6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#14b8a6",
        borderWidth: "2px",
      },
    },
  };

  return (
    <InterviewerLayout>

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 850,
            letterSpacing: "-.03em",

            fontSize: {
              xs: "1.6rem",
              sm: "2rem",
              md: "2.2rem",
            },

            color: darkMode ? "#fff" : "#0f172a",
          }}
        >
          Interview Feedback
        </Typography>
      </Box>



      <Paper
        elevation={6}
        sx={{
          maxWidth: 900,
          width: "100%",
          mx: "auto",
          p: { xs: 3, md: 5 },
          borderRadius: 5,
          bgcolor: darkMode
            ? "#1e293b"
            : "#ffffff",

          backdropFilter: "blur(10px)",

          border: `1px solid ${darkMode
            ? "#334155"
            : "#e2e8f0"
            }`,

          boxShadow: darkMode
            ? "0 8px 25px rgba(0,0,0,.35)"
            : "0 8px 25px rgba(0,0,0,.04)",

          transition: "all .3s ease",

          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: darkMode
              ? "0 12px 30px rgba(0,0,0,.45)"
              : "0 12px 30px rgba(0,0,0,.08)",
          },
          color: darkMode ? "#ffffff" : "#000000",
        }}
      >


        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 4,
          }}
        >
          <Box
            sx={{
              color: "#14b8a6",
              display: "flex",
            }}
          >
            <FaClipboardCheck size={18} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: darkMode ? "#ffffff" : "#0f172a",
            }}
          >
            Evaluation Details
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            size="small"
            fullWidth
            label="Candidate ID"
            name="candidateId"
            value={feedback.candidateId}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            label="Interview ID"
            name="interviewId"
            value={feedback.interviewId}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            label="Job ID"
            name="jobId"
            value={feedback.jobId}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            label="Recruiter ID"
            name="recruiterId"
            value={feedback.recruiterId}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            type="number"
            slotProps={{
              htmlInput: {
                min: 1,
                max: 5,
              },
            }}
            label="Technical Rating (1-5)"
            name="technicalRating"
            value={feedback.technicalRating}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            type="number"
            slotProps={{
              htmlInput: {
                min: 1,
                max: 5,
              },
            }}
            label="Communication Rating (1-5)"
            name="communicationRating"
            value={feedback.communicationRating}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            type="number"
            slotProps={{
              htmlInput: {
                min: 1,
                max: 5,
              },
            }}
            label="Problem Solving Rating (1-5)"
            name="problemSolvingRating"
            value={feedback.problemSolvingRating}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            type="number"
            slotProps={{
              htmlInput: {
                min: 1,
                max: 5,
              },
            }}
            label="Overall Rating (1-5)"
            name="overallRating"
            value={feedback.overallRating}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            label="Strengths"
            name="strengths"
            value={feedback.strengths}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            label="Improvements"
            name="improvements"
            value={feedback.improvements}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            multiline
            minRows={3}
            maxRows={5}
            label="Comments"
            name="comments"
            value={feedback.comments}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            size="small"
            fullWidth
            label="Recommendation"
            name="recommendation"
            value={feedback.recommendation}
            onChange={handleChange}
            sx={textFieldStyle}
          >
            <MenuItem value="Selected">Selected</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Hold">Hold</MenuItem>

          </TextField>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: "10px",
                fontWeight: 600,
              }}
            >
              {error}
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "flex-end",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              component={Link}
              to="/evaluations"
              variant="outlined"
              sx={{
                borderRadius: 5,
                textTransform: "none",
                fontWeight: "bold",
                px: {
                  xs: 3,
                  sm: 5,
                },

                width: {
                  xs: "100%",
                  sm: "auto"
                },
                py: 1.2,
                color: darkMode
                  ? "#5eead4"
                  : "#0f766e",
                borderColor:
                  darkMode
                    ? "rgba(20,184,166,.30)"
                    : "rgba(20,184,166,.25)",
                "&:hover": {
                  borderColor: darkMode ? "#ffffff" : "#0f172a",
                  bgcolor:
                    darkMode
                      ? "rgba(20,184,166,.08)"
                      : "rgba(20,184,166,.05)"
                },
                transition: "all 0.2s ease",
              }}
            >
              View Evaluations
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: "linear-gradient(90deg,#14b8a6,#0f766e)",

                boxShadow: "0 4px 12px rgba(16,185,129,.2)",

                "&:hover": {
                  background: "linear-gradient(90deg,#0d9488,#115e59)",
                  boxShadow: "0 6px 18px rgba(16,185,129,.3)",
                  transform: "translateY(-1px)"
                },
                borderRadius: 5,
                textTransform: "none",
                fontWeight: "bold",
                px: {
                  xs: 3,
                  sm: 5,
                },

                width: {
                  xs: "100%",
                  sm: "auto"
                },
                py: 1.2,
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",
                transition: "all 0.2s ease",
              }}
            >
              Submit Feedback
            </Button>
          </Box>
        </Box>
      </Paper>

    </InterviewerLayout>
  );
}