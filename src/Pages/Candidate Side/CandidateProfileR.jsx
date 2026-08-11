import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { Link } from "react-router-dom";
import { useCandidate } from "../../context/CandidateContext";
import {
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Chip,
  Box,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  UserRoundPen,
  KeyRound,
  ArrowRight,
} from "lucide-react";

export default function CandidateProfileR() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const candidateContext = useCandidate();

  const candidate = candidateContext?.candidate;

  // Colors — fully theme-driven (matches Assessment / BrowseJobs / Dashboard / Notifications)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Cohesive styling for the read-only form elements
  const textFieldStyle = {
    mb: {
      xs: 2,
      sm: 2.3,
      md: 2.5,
    },
    "& .MuiInputLabel-root": {
      color: subText,
      fontSize: "0.95rem",
    },
    "& .MuiOutlinedInput-root": {
      minHeight: {
        xs: 48,
        sm: 56,
      },
      color: textColor,
      backgroundColor: colors.input,
      "& fieldset": {
        borderColor: borderStyle,
        borderRadius: {
          xs: "8px",
          sm: "10px",
        },
      },
      cursor: "default",

      "& input": {
        fontSize: {
          xs: "0.9rem",
          sm: "1rem",
        },
        WebkitTextFillColor: textColor,
      },
      "&:hover fieldset": {
        borderColor: primary,
      },
    },
  };

  return (
    <CandidateLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: 3,
            sm: 3.5,
            md: 4,
          },
        }}
      >

        {/* Page Header */}
        <Box>
          <Typography
            sx={{
              fontWeight: 850,
              letterSpacing: "-0.03em",
              mb: .5,
              color: textColor,
              fontSize: {
                xs: "1.45rem",
                sm: "1.8rem",
                md: "2rem",
                lg: "2.2rem",
              }
            }}
          >
            My Profile
          </Typography>
        </Box>

        {/* Profile Card Summary */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            borderRadius: {
              xs: 3,
              sm: 4,
              md: 5,
            },
            bgcolor: colors.card,
            backdropFilter: "blur(12px)",
            border: `1px solid ${borderStyle}`,
            boxShadow: colors.shadow,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              borderColor: primary,
              boxShadow: colors.shadow,
            },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", gap: { xs: 3, md: 4 } }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: 3.5, textAlign: { xs: "center", sm: "left" } }}>
              {/* Premium Gradient Avatar */}
              <Avatar
                sx={{
                  width: {
                    xs: 80,
                    sm: 95,
                    md: 110,
                  },

                  height: {
                    xs: 80,
                    sm: 95,
                    md: 110,
                  },

                  fontSize: {
                    xs: "1.6rem",
                    sm: "1.8rem",
                    md: "2rem",
                  },
                  background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                  fontWeight: 800,
                  boxShadow: `0 8px 24px ${primary}40`,
                  border: `4px solid ${darkMode ? "rgba(30,41,59,0.9)" : "#ffffff"}`,
                }}
              >
                {candidate?.fullName?.trim() ? candidate.fullName.split(" ").map(n => n[0]).join("") : "JM"}
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 850,
                    letterSpacing: "-.02em",
                    color: textColor,
                    fontSize: {
                      xs: "1.3rem",
                      sm: "1.5rem",
                      md: "1.7rem",
                    }
                  }}
                >
                  {candidate?.fullName || "Janvi Movaliya"}
                </Typography>
                <Typography sx={{ color: primary, fontWeight: 700, fontSize: "0.95rem" }}>
                  {candidate?.designation || "Frontend Developer"}
                </Typography>
                <Typography sx={{ color: subText, fontSize: "0.85rem", mt: 0.5 }}>
                  {candidate?.email || "janvi@gmail.com"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: {
                      xs: 1,
                      sm: 2,
                    },
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    label="Available for Work"
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: ".68rem",
                        sm: ".72rem",
                      },
                      height: 28,
                      bgcolor: `${primary}1f`,
                      color: primary,
                    }}
                  />

                  <Chip
                    label="Frontend Developer"
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: ".68rem",
                        sm: ".72rem",
                      },
                      height: 28,
                      bgcolor: `${primary}1f`,
                      color: primary,
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Profile Action Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: 2,
                width: {
                  xs: "100%",
                  md: "auto",
                },
              }}
            >
              <Button
                component={Link}
                to="/edit-candidate-profile-r"
                variant="contained"
                startIcon={<UserRoundPen size={13} />}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                  py: {
                    xs: 1.1,
                    sm: 1.2,
                    md: 1.3,
                  },

                  px: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                  },

                  fontSize: "0.88rem",
                  borderRadius: "10px",
                  fontWeight: 700,
                  textTransform: "none",
                  background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                  boxShadow: `0 4px 12px ${primary}33`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${primary}, ${primary})`,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Edit Profile
              </Button>

              <Button
                variant="outlined"
                startIcon={<KeyRound size={12} />}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                  py: {
                    xs: 1.1,
                    sm: 1.2,
                    md: 1.3,
                  },

                  px: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                  },

                  fontSize: "0.88rem",
                  borderRadius: "10px",
                  fontWeight: 700,
                  textTransform: "none",
                  color: subText,
                  borderColor: borderStyle,
                  "&:hover": {
                    borderColor: subText,
                    bgcolor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Password
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Detailed Personal Information Card */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
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
              borderColor: primary,
              boxShadow: colors.shadow,
            },
          }}
        >
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
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: textColor,
                  fontSize: {
                    xs: "1.05rem",
                    sm: "1.15rem",
                    md: "1.25rem",
                  }
                }}
              >
                Personal Details
              </Typography>

              <Typography
                sx={{
                  color: subText,
                  fontSize: ".85rem",
                  mt: .4,
                }}
              >
                Your profile information used while applying for jobs.
              </Typography>
            </Box>

            <Button
              variant="outlined"
              fullWidth={false}
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                textTransform: "none",
                borderRadius: "10px",
                color: primary,
                borderColor: primary,

                "&:hover": {
                  bgcolor: `${primary}0d`,
                },
              }}
            >
              Edit
            </Button>
          </Box>

          <Grid
            container
            spacing={{
              xs: 2,
              sm: 3,
              md: 3.5,
              lg: 4,
            }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={candidate?.fullName || "Janvi Movaliya"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                  htmlInput: {
                    autoComplete: "off",
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Candidate ID"
                value={candidate?.candidateId || "CAN-3829-10"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                  htmlInput: {
                    autoComplete: "off",
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email Address"
                value={candidate?.email || "janvi@gmail.com"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                  htmlInput: {
                    autoComplete: "off",
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone Number"
                value={candidate?.phone || "+91 98765 43210"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                  htmlInput: {
                    autoComplete: "off",
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Core Skills"
                value={candidate?.skills || "React, JavaScript, Tailwind CSS"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                  htmlInput: {
                    autoComplete: "off",
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Experience"
                value={candidate?.experience || "2 Years"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                  htmlInput: {
                    autoComplete: "off",
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Location"
                value={candidate?.location || "Surat, Gujarat, India"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                  htmlInput: {
                    autoComplete: "off",
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Highest Qualification"
                value={
                  candidate?.qualification ||
                  "B.Tech Computer Engineering"
                }
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                  htmlInput: {
                    autoComplete: "off",
                  },
                }}
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Settings Redirect Trigger */}
        <Box
          sx={{
            mt: {
              xs: 1,
              sm: 2,
            },
            display: "flex",
            justifyContent: {
              xs: "stretch",
              md: "flex-end",
            },
          }}
        >
          <Button
            component={Link}
            to="/candidate-settings"
            variant="contained"
            endIcon={<ArrowRight size={12} />}
            sx={{
              width: {
                xs: "100%",
                md: "auto",
              },
              py: 1.5,
              px: 3.5,
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "0.9rem",
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
              boxShadow: `0 4px 12px ${primary}33`,
              "&:hover": {
                background: `linear-gradient(135deg, ${primary}, ${primary})`,
                transform: "translateY(-1.5px)",
              },
            }}
          >
            Manage Account Settings
          </Button>
        </Box>

      </Box>
    </CandidateLayout>
  );
}