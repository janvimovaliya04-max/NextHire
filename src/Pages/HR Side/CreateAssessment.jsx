import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Link, useNavigate } from "react-router-dom";
import HRLayout from "../../Layouts/HRLayout";

import {
  Card,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import { toast } from "react-toastify";

import {
  ArrowLeft,
  ClipboardList,
  Save,
  X,
} from "lucide-react";

export default function CreateAssessment() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const navigate = useNavigate();

  // ==============================
  // Form States
  // ==============================

  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");

  const [category, setCategory] = useState("coding");
  const [difficulty, setDifficulty] = useState("medium");
  const [duration, setDuration] = useState("60");

  // ==============================
  // Theme Colors
  // ==============================

  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // ==============================
  // Save Assessment
  // ==============================

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Assessment title is required");
      return;
    }

    if (!instructions.trim()) {
      toast.error("Assessment instructions are required");
      return;
    }

    toast.success("Assessment created successfully!");

    navigate("/job-management");
  };

  // ==============================
  // Shared TextField Style
  // ==============================

  const textFieldStyle = {
    mb: 2.5,

    "& .MuiInputLabel-root": {
      color: subText,
      fontSize: "0.95rem",
      fontWeight: 500,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: primary,
    },

    "& .MuiOutlinedInput-root": {
      color: textColor,

      backgroundColor: colors.input,

      borderRadius: "12px",

      transition: "all .25s ease",

      "& fieldset": {
        borderColor: colors.border,
      },

      "&:hover fieldset": {
        borderColor: primary,
      },

      "&.Mui-focused fieldset": {
        borderColor: primary,
        borderWidth: "2px",
      },
    },

    "& .MuiSelect-icon": {
      color: subText,
    },
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
          component={Link}
          to="/job-management"
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

      {/* ========================= */}
      {/* Page Header */}
      {/* ========================= */}

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
                fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
                mb: { xs: 0, md: 0.5 },
                fontWeight: 850,
                letterSpacing: "-0.03em",
              }}
        >
          Create Assessment
        </Typography>
      </Box>

      {/* ========================= */}
      {/* Main Card */}
      {/* ========================= */}

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: "22px",
          bgcolor: colors.card,
          backdropFilter: "blur(16px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,
          transition: ".3s",
          "&:hover": {
            transform: "translateY(-6px)",
            transition: "all .35s ease",
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
        {/* Section Title */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.4,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 45,
              height: 45,
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: `linear-gradient(135deg,${primary},${secondary || primary})`,
              color: "#fff",
            }}
          >
            <ClipboardList
              size={
                window.innerWidth < 600
                  ? 18
                  : 22
              }
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.1rem",
                color: textColor,
              }}
            >
              Assessment Details
            </Typography>

            <Typography
              sx={{
                color: subText,
                fontSize: ".82rem",
              }}
            >
              Fill all required information carefully.
            </Typography>
          </Box>
        </Box>

        {/* Form */}
        <Grid container spacing={1}>

          {/* Title */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              helperText="Enter a unique assessment name."
              label="Assessment Title *"
              placeholder="Senior Frontend Developer Assessment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={textFieldStyle}
            />
          </Grid>

          {/* Category */}

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              helperText="Choose assessment type."
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={textFieldStyle}
            >
              <MenuItem value="coding">
                Coding Challenge
              </MenuItem>

              <MenuItem value="design">
                System Design
              </MenuItem>

              <MenuItem value="quiz">
                Technical Quiz
              </MenuItem>

              <MenuItem value="behavioral">
                Behavioral Round
              </MenuItem>
            </TextField>
          </Grid>

          {/* Difficulty */}

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              helperText="Select expected difficulty."
              label="Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              sx={textFieldStyle}
            >
              <MenuItem value="easy">
                Easy
              </MenuItem>

              <MenuItem value="medium">
                Medium
              </MenuItem>

              <MenuItem value="hard">
                Hard
              </MenuItem>
            </TextField>
          </Grid>

          {/* Duration */}

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              helperText="Time allowed for candidates."
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              sx={textFieldStyle}
            >
              <MenuItem value="30">
                30 Minutes
              </MenuItem>

              <MenuItem value="45">
                45 Minutes
              </MenuItem>

              <MenuItem value="60">
                60 Minutes
              </MenuItem>

              <MenuItem value="90">
                90 Minutes
              </MenuItem>

              <MenuItem value="120">
                120 Minutes
              </MenuItem>
            </TextField>
          </Grid>

          {/* Instructions */}

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              maxRows={8}
              helperText={`Characters: ${instructions.length}/1000`}
              label="Assessment Instructions *"
              placeholder="Write instructions for candidates..."
              value={instructions}
              onChange={(e) => {
                if (e.target.value.length <= 1000) {
                  setInstructions(e.target.value);
                }
              }}
              sx={textFieldStyle}
            />
          </Grid>

        </Grid>

        <Paper
          elevation={0}
          sx={{
            mt: 2,
            p: 3,
            borderRadius: 4,
            bgcolor: colors.background,
            border: `1px solid ${borderStyle}`,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              mb: 3,
              color: textColor,
            }}
          >
            Assessment Summary
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ color: subText, fontSize: ".8rem" }}>
                Assessment Title:
              </Typography>

              <Typography sx={{ fontWeight: 700, color: textColor }}>
                {title || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ color: subText, fontSize: ".8rem" }}>
                Category:
              </Typography>

              <Typography sx={{ fontWeight: 700, color: textColor }}>
                {category}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ color: subText, fontSize: ".8rem" }}>
                Difficulty:
              </Typography>

              <Typography sx={{ fontWeight: 700, color: textColor }}>
                {difficulty}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ color: subText, fontSize: ".8rem" }}>
                Duration:
              </Typography>

              <Typography sx={{ fontWeight: 700, color: textColor }}>
                {duration} Minutes
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Footer Buttons */}

        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: `1px solid ${borderStyle}`,
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            component={Link}
            to="/hr"
            variant="outlined"
            startIcon={<X size={12} />}
            sx={{
              minWidth: 150,
              py: 1.25,
              px: 3,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.92rem",
              color: subText,
              borderColor: borderStyle,
              "&:hover": {
                borderColor: primary,
                color: primary,
                bgcolor: `${primary}08`,
              },
            }}
          >
            Cancel
          </Button>

          <Button
            disabled={
              !title.trim() ||
              !instructions.trim()
            }
            onClick={handleSave}
            variant="contained"
            startIcon={<Save size={12} />}
            sx={{
              "&.Mui-disabled": {
                color: "#fff",
              },
              minWidth: 180,
              py: 1.25,
              px: 3,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.92rem",
              background: `linear-gradient(135deg,${primary},${secondary || primary})`,
              boxShadow: `0 8px 20px ${primary}48`,
              transition: ".25s",
              "&:hover": {
                background: `linear-gradient(135deg,${primary},${primary})`,
                transform: "translateY(-2px)",
                boxShadow: `0 12px 24px ${primary}58`,
              },
            }}
          >
            Save Assessment
          </Button>
        </Box>

      </Paper>
    </HRLayout>
  );
}