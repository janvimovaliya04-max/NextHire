import applicationJobs from "../../data/MyApplicationJobDetails.json";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import CandidateLayout from "../../Layouts/CandidateLayout";
import {
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { FaCheck } from "react-icons/fa";

export default function MyApplicationJobDetails() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const job = applicationJobs.find(
    (item) => item.applicationId === id
  );
  const subText = darkMode ? "#94a3b8" : "#475569";
  const borderStyle = darkMode
    ? "rgba(255,255,255,0.06)"
    : "rgba(0,0,0,0.05)";

  if (!job) {
    return (
      <CandidateLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          Application not found
        </Box>
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      <Box
        sx={{
          px: {
            xs: 0.5,
            sm: 0,
          },
          animation: "fadeIn .35s ease",
          "@keyframes fadeIn": {
            from: {
              opacity: 0,
              transform: "translateY(12px)",
            },
            to: {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Box
          sx={{
            mb: {
              xs: 2.5,
              md: 4,
            },
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              py: {
                xs: 1,
                md: 1.2,
              },
              px: {
                xs: 2,
                md: 2.5,
              },
              fontSize: {
                xs: ".82rem",
                md: ".9rem",
              },
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                transform: "translateX(-2px)",
              }
            }}
          >
            Back to Applications
          </Button>
        </Box>
        <Grid container spacing={{
          xs: 2,
          sm: 3,
          md: 4,
        }}>

          {/* LEFT SIDE */}
          <Grid size={{ xs: 12, lg: 8 }}>
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
                  md: 5,
                },
                bgcolor: darkMode
                  ? "rgba(30,41,59,.45)"
                  : "white",
                border: `1px solid ${borderStyle}`,
                transition: "all .3s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: "#10b981",
                  boxShadow: darkMode
                    ? "0 15px 35px rgba(0,0,0,.30)"
                    : "0 15px 35px rgba(0,0,0,.06)",
                },
              }}
            >

              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  gap: {
                    xs: 1.5,
                    sm: 2,
                  },
                  mb: {
                    xs: 2.5,
                    md: 3,
                  },
                  alignItems: {
                    xs: "flex-start",
                    sm: "center",
                  },
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: {
                      xs: 44,
                      sm: 56,
                    },
                    height: {
                      xs: 44,
                      sm: 56,
                    },
                    fontSize: {
                      xs: "1rem",
                      sm: "1.2rem",
                    },
                    bgcolor: job.logoBg,
                    color: job.logoColor,
                    fontWeight: 800
                  }}
                >
                  {job.company.charAt(0)}
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: {
                        xs: "1.2rem",
                        sm: "1.7rem",
                      },
                      lineHeight: 1.3,
                      color: darkMode ? "#fff" : "#0f172a",
                    }}
                  >
                    {job.position}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#10b981",
                      fontWeight: 700,
                      fontSize: {
                        xs: ".9rem",
                        md: "1rem",
                      }
                    }}
                  >
                    {job.company}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip
                      sx={{
                        bgcolor: "rgba(16,185,129,.12)",
                        color: "#10b981",
                        fontWeight: 700
                      }}
                      label={job.employmentType}
                      size="small"
                    />

                    <Chip
                      sx={{
                        bgcolor: "rgba(16,185,129,.12)",
                        color: "#10b981",
                        fontWeight: 700
                      }}
                      label={job.experience}
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
              <Divider sx={{
                mb: {
                  xs: 3,
                  md: 4,
                }, borderColor: borderStyle
              }} />
              <Typography
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: {
                    xs: "1rem",
                    md: "1.25rem",
                  }
                }}
              >
                About This Role
              </Typography>
              <Typography
                sx={{
                  color: subText,
                  lineHeight: 1.7,
                  fontSize: {
                    xs: ".9rem",
                    md: ".95rem",
                  }
                }}
              >
                {job.description}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: {
                      xs: ".88rem",
                      md: ".95rem",
                    }
                  }}
                >
                  Responsibilities
                </Typography>
                {
                  job.responsibilities.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "flex-start",
                        mb: 1.5
                      }}
                    >
                      <FaCheck color="#10b981" />
                      <Typography sx={{ color: subText }}>
                        {item}
                      </Typography>
                    </Box>
                  ))
                }
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: {
                      xs: "1rem",
                      md: "1.25rem",
                    }
                  }}
                >
                  About Company
                </Typography>
                <Typography sx={{ color: subText }}>
                  {job.aboutCompany}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                },
                borderRadius: 5,
                border: `1px solid ${borderStyle}`,
                position: {
                  xs: "static",
                  lg: "sticky",
                },
                top: 24,
                bgcolor: darkMode
                  ? "rgba(30,41,59,.45)"
                  : "#fff",
                transition: "all .3s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: "#10b981",
                  boxShadow: darkMode
                    ? "0 15px 35px rgba(0,0,0,.30)"
                    : "0 15px 35px rgba(0,0,0,.06)",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: {
                    xs: "1rem",
                    md: "1.25rem",
                  }
                }}
              >
                Application Overview
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 11,
                        md: 12,
                      }, color: subText
                    }}
                  >
                    SALARY
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: ".9rem",
                        md: "1rem",
                      }
                    }}
                  >
                    {job.salary}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 11,
                        md: 12,
                      }, color: subText
                    }}
                  >
                    POSTED
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: ".9rem",
                        md: "1rem",
                      }
                    }}
                  >
                    {job.posted}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 11,
                        md: 12,
                      }, color: subText
                    }}
                  >
                    DEADLINE
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: ".9rem",
                        md: "1rem",
                      }
                    }}
                  >
                    {job.deadline}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 3, borderColor: borderStyle }} />
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2
                }}
              >
                Skills
              </Typography>
              <Box sx={{
                display: "flex", flexWrap: "wrap", gap: {
                  xs: .8,
                  md: 1.2,
                }
              }}>
                {
                  job.skills.map(skill => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{
                        bgcolor: "rgba(16,185,129,.12)",
                        color: "#10b981",
                        border: `1px solid ${borderStyle}`,
                        fontWeight: 700
                      }}
                    />
                  ))
                }
              </Box>
              <Button
                fullWidth
                size="large"
                onClick={() => navigate("/my-applications")}
                variant="contained"
                sx={{
                  mt: 4,
                  py: {
                    xs: 1.2,
                    md: 1.4,
                  },
                  fontSize: {
                    xs: ".85rem",
                    md: ".9rem",
                  },
                  borderRadius: "12px",
                  fontWeight: 700,
                  textTransform: "none",
                  background: "linear-gradient(90deg,#10b981,#059669)",
                  "&:hover": {
                    background: "linear-gradient(90deg,#059669,#047857)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(16,185,129,.25)",
                  }
                }}
              >
                View Application Status
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </CandidateLayout>
  );
}