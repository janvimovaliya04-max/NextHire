import { Link } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { useState } from "react";
import { toast } from "react-toastify";
import { ClipboardCheck } from "lucide-react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";
import SEO from "../../components/common/SEO"; // SEO Component Import Added

export default function Feedback() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Dashboard / Settings / Evaluations)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

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
      color: subText,
      fontSize: ".95rem",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: primary,
    },

    "& .MuiOutlinedInput-root": {
      color: textColor,

      backgroundColor: colors.input || colors.card,

      "& fieldset": {
        borderColor: borderStyle,

        borderRadius: "10px",
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
    <InterviewerLayout>
      {/* Dynamic SEO Tags Injection */}
      <SEO
        title="Feedback"
        description="Provide feedback about candidates after interviews on NextHire HR Portal."
        canonicalUrl="/interviewer/feedback"
      />

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

            color: textColor,
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
          bgcolor: colors.card,

          backdropFilter: "blur(10px)",

          border: `1px solid ${borderStyle}`,

          boxShadow: colors.shadow,

          transition: "all .3s ease",

          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: colors.shadow,
          },
          color: textColor,
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
              color: primary,
              display: "flex",
            }}
          >
            <ClipboardCheck size={18} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: textColor,
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
              to="/interviewer/evaluations"
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
                color: primary,
                borderColor: `${primary}40`,
                "&:hover": {
                  borderColor: primary,
                  bgcolor: `${primary}0d`,
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
                background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,

                boxShadow: `0 4px 12px ${primary}33`,

                "&:hover": {
                  background: `linear-gradient(135deg, ${primary}, ${primary})`,
                  boxShadow: `0 6px 18px ${primary}4d`,
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