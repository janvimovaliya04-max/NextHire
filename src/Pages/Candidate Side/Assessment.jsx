import { useState } from "react";
import { toast } from "react-toastify";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Typography, Paper, Box, TextField, Button, LinearProgress } from "@mui/material";

import { Clock, Info, Send } from "lucide-react";

export default function Assessment() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Form State bindings
  const [q1Answer, setQ1Answer] = useState("");
  const [q2Answer, setQ2Answer] = useState("");

  // Colors — fully theme-driven
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const handleSubmit = () => {
    if (!q1Answer.trim() || !q2Answer.trim()) {
      toast.error("Please answer all questions.");
      return;
    }

    toast.success("Assessment submitted successfully");
  };

  // Unified theme-driven input styling matching candidate portal
  const textFieldStyle = {
    mb: {
      xs: 2,
      sm: 2.5,
    },
    "& .MuiInputLabel-root": {
      color: subText,
      fontSize: {
        xs: ".82rem",
        sm: ".9rem",
        md: ".95rem",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: primary,
    },
    "& .MuiOutlinedInput-root": {
      fontSize: {
        xs: ".85rem",
        sm: ".9rem",
        md: ".95rem",
      },
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
      {/* Page Header */}
      <Box
        sx={{
          mb: {
            xs: 2.5,
            sm: 3,
            md: 4,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "1.4rem",
              sm: "1.7rem",
              md: "2rem",
              lg: "2.15rem",
            },
            fontWeight: 850,
            letterSpacing: "-0.03em",
            mb: 0.5,
            color: textColor,
          }}
        >
          Online Assessment
        </Typography>
      </Box>

      {/* Main Assessment Wrapper */}
      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 1.5,
            sm: 2.5,
            md: 4,
            lg: 5,
          },
          maxWidth: "950px",
          mx: "auto",
          borderRadius: {
            xs: 3,
            sm: 4,
            md: 5,
          },
          bgcolor: colors.card,
          backdropFilter: "blur(12px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,

          transition: "all .3s ease",

          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: colors.shadow,
          },
        }}
      >
        {/* Header Row: Title and Live Countdown Timer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            gap: {
              xs: 1.5,
              sm: 2,
            },

            mb: {
              xs: 2.5,
              sm: 3,
              md: 4,
            },
          }}
        >
          <Typography
            sx={{
              color: textColor,
              fontWeight: 850,
              letterSpacing: "-0.02em",
              fontSize: {
                xs: "1.05rem",
                sm: "1.3rem",
                md: "1.5rem",
              }
            }}
          >
            React Assessment
          </Typography>

          {/* Countdown Clock Mockup — kept semantic red (urgency indicator) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: {
                  xs: 1.2,
                  sm: 1.8,
                  md: 2.2,
                },
                py: {
                  xs: .6,
                  sm: .8,
                  md: 1,
                },
                borderRadius: "20px",
                bgcolor: darkMode
                  ? "rgba(239,68,68,.15)"
                  : "rgba(239,68,68,.08)",
                color: "#ef4444",
                border: "1px solid rgba(239,68,68,.30)",
              }}
            >
              <Clock size={window.innerWidth < 600 ? 9 : 13} />
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: ".68rem",
                    sm: ".78rem",
                    md: ".85rem",
                  },
                  letterSpacing: "0.02em"
                }}
              >
                58:45 REMAINING
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Live progress limit line — semantic red (time-critical) */}
        <LinearProgress
          variant="determinate"
          value={98}
          sx={{
            height: 4,
            borderRadius: 2,
            mb: {
              xs: 2.5,
              sm: 3,
              md: 4,
            },
            bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "#f1f5f9",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#ef4444",
              borderRadius: 2,
            }
          }}
        />

        {/* Instructions Block (Info Banner Style) */}
        <Box
          sx={{
            p: {
              xs: 1.5,
              sm: 2.5,
              md: 3,
            },
            borderRadius: "12px",
            borderLeft: `4px solid ${primary}`,
            bgcolor: `${primary}0a`,
            mb: {
              xs: 3,
              sm: 4,
              md: 5,
            },
            display: "flex",
            gap: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          <Box sx={{ color: primary, mt: 0.2 }}>
            <Info size={window.innerWidth < 600 ? 13 : 16} />
          </Box>
          <Box>
            <Typography
              sx={{
                color: textColor,
                fontWeight: 800,
                fontSize: {
                  xs: ".82rem",
                  sm: ".9rem",
                  md: ".95rem",
                },
                mb: 0.8
              }}
            >
              Assessment Instructions
            </Typography>
            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 2,
                color: subText,
                fontSize: {
                  xs: ".74rem",
                  sm: ".82rem",
                  md: ".88rem",
                },
                lineHeight: 1.6,
              }}
            >
              <li>• Total allotted duration is exactly 60 minutes.</li>
              <li>• Please review your answers carefully before hitting submit.</li>
              <li>• Do not refresh or leave this browser page, as progress will be lost.</li>
              <li>• Make sure to submit answers before the countdown timer expires.</li>
            </Box>
          </Box>
        </Box>

        {/* Question blocks */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2.5, sm: 3, md: 4 },
            mb: { xs: 3, sm: 4, md: 5 },
          }}
        >
          {/* Question 1 */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 1.5,
                sm: 2.5,
                md: 3.5,
              },
              borderRadius: {
                xs: 3,
                md: 4,
              },
              border: `1px solid ${borderStyle}`,
              bgcolor: colors.input,
              transition: "border-color 0.2s ease",
              "&:hover": { borderColor: primary }
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: ".68rem", sm: ".74rem", md: ".78rem" },
                fontWeight: 800,
                color: primary,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                mb: 1.5
              }}
            >
              Question 1 of 2
            </Typography>
            <Typography
              sx={{
                color: textColor,
                fontWeight: 700,
                fontSize: {
                  xs: ".88rem",
                  sm: ".98rem",
                  md: "1.05rem",
                },
                mb: 2,
              }}
            >
              What is React and how does it differ from traditional web development?
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={5}
              label="Answer"
              placeholder="Type your explanation here..."
              value={q1Answer}
              onChange={(e) => setQ1Answer(e.target.value)}
              variant="outlined"
              sx={textFieldStyle}
            />
          </Paper>

          {/* Question 2 */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 1.5,
                sm: 2.5,
                md: 3.5,
              },
              borderRadius: {
                xs: 3,
                md: 4,
              },
              border: `1px solid ${borderStyle}`,
              bgcolor: colors.input,
              transition: "border-color 0.2s ease",
              "&:hover": { borderColor: primary }
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: ".68rem", sm: ".74rem", md: ".78rem" },
                fontWeight: 800,
                color: primary,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                mb: 1.5
              }}
            >
              Question 2 of 2
            </Typography>
            <Typography
              sx={{
                color: textColor,
                fontWeight: 700,
                fontSize: {
                  xs: ".88rem",
                  sm: ".98rem",
                  md: "1.05rem",
                },
                mb: 2,
              }}
            >
              Explain the concept of the Virtual DOM and why it provides performance advantages.
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Answer"
              placeholder="Explain reconciliation, diffing algorithms, and batch updates..."
              value={q2Answer}
              onChange={(e) => setQ2Answer(e.target.value)}
              variant="outlined"
              sx={textFieldStyle}
            />
          </Paper>
        </Box>

        {/* Form Actions Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "stretch",
              sm: "flex-end",
            },
          }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<Send size={11} />}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              py: {
                xs: 1.1,
                sm: 1.3,
                md: 1.5,
              },
              px: {
                xs: 2,
                sm: 3,
                md: 4,
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: {
                xs: ".8rem",
                sm: ".86rem",
                md: ".92rem",
              },
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
              boxShadow: `0 4px 12px ${primary}33`,
              "&:hover": {
                background: `linear-gradient(135deg, ${primary}, ${primary})`,
                boxShadow: `0 10px 22px ${primary}59`,
                transform: "translateY(-2px)",
              }
            }}
          >
            Submit Assessment
          </Button>
        </Box>
      </Paper>
    </CandidateLayout>
  );
}