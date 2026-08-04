import api from "../../api/axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaLayerGroup,
  FaCheck,
} from "react-icons/fa";

export default function JobDetails() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const subText = darkMode ? "#94a3b8" : "#475569";
  const borderStyle = darkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)";

  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/jobdetails?jobId=${id}`);

        setJob(response.data[0]);
      } catch (err) {
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return (
      <CandidateLayout>
        <Box
          sx={{
            textAlign: "center",
            mt: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Job not found
          </Typography>

          <Button
            sx={{ mt: 3 }}
            onClick={() => navigate("/browse-jobs")}
          >
            Back to Browse Jobs
          </Button>
        </Box>
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      {/* Back button */}
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
          variant="outlined"
          sx={{
            py: {
              xs: 1.2,
              md: 1.4,
            },
            borderRadius: "10px",
            fontWeight: 700,
            textTransform: "none",
            fontSize: {
              xs: "0.84rem",
              md: "0.9rem",
            },
            color: darkMode ? "#cbd5e1" : "#475569",
            borderColor: darkMode
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,0.12)",
            "&:hover": {
              borderColor: darkMode ? "#cbd5e1" : "#475569",
              bgcolor: darkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.03)",
            },
          }}
        >
          Back to Job List
        </Button>
      </Box>

      {/* Dynamic Grid Layout */}
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 3,
          md: 4,
        }}
      >
        {/* Left Side: Role description (2/3rds width) */}
        <Grid size={{ xs: 12, md: 8 }}>
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
              bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
              backdropFilter: "blur(12px)",
              border: `1px solid ${borderStyle}`,
              boxShadow: darkMode ? "0 10px 30px rgba(0,0,0,0.25)" : "0 10px 30px rgba(0,0,0,0.02)",
              transition: "all .3s",

              "&:hover": {
                transform: "translateY(-3px)",
                borderColor: "#10b981",
                boxShadow: darkMode
                  ? "0 15px 35px rgba(0,0,0,.3)"
                  : "0 15px 35px rgba(0,0,0,.05)",
              },
            }}
          >
            {/* Header Details */}
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
                justifyContent: "space-between",
                gap: {
                  xs: 2,
                  sm: 2.5,
                },
                mb: 3.5,
              }}
            >
              <Box sx={{ display: "flex", gap: 2.5, alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: {
                      xs: 44,
                      sm: 52,
                      md: 56,
                    },

                    height: {
                      xs: 44,
                      sm: 52,
                      md: 56,
                    },

                    fontSize: {
                      xs: 16,
                      sm: 20,
                      md: 22,
                    },
                    background: "linear-gradient(135deg,#10b981,#059669)",
                    fontWeight: 800,
                    boxShadow: "0 6px 18px rgba(16,185,129,.25)",
                  }}
                >
                  {job.logoLetter}
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      color: darkMode ? "#fff" : "#0f172a",
                      fontWeight: 900,
                      lineHeight: 1.2,
                      fontSize: {
                        xs: "1.15rem",
                        sm: "1.45rem",
                        md: "1.9rem",
                      },
                      fontWeight: 900,
                    }}
                  >
                    {job.position}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#10b981",
                      fontWeight: 700,
                    }}
                  >
                    {job.company}
                  </Typography>

                  <Typography
                    sx={{
                      color: subText,
                      fontSize: ".85rem",
                      mt: .5,
                    }}
                  >
                    Job ID : {job.jobId}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: {
                        xs: .75,
                        sm: 1,
                      },

                      mt: 1,
                      mt: 1.2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip
                      label={job.position}
                      size="small"
                      sx={{
                        bgcolor: "rgba(16,185,129,.12)",
                        color: "#10b981",
                        fontWeight: 700,
                      }}
                    />

                    <Chip
                      label={job.employmentType}
                      size="small"
                      sx={{
                        bgcolor: "rgba(37,99,235,.12)",
                        color: "#2563eb",
                        fontWeight: 700,
                      }}
                    />

                    <Chip
                      label={job.experience}
                      size="small"
                      sx={{
                        bgcolor: "rgba(245,158,11,.12)",
                        color: "#f59e0b",
                        fontWeight: 700,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider sx={{
              mb: {
                xs: 3,
                md: 4,
              }, borderColor: borderStyle
            }} />

            {/* Description */}
            <Box sx={{
              mb: {
                xs: 3,
                md: 4.5,
              }
            }}>
              <Typography sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.25rem",
                }
              }}>
                About This Role
              </Typography>
              <Typography sx={{
                color: subText, fontSize: {
                  xs: "0.88rem",
                  md: "0.95rem",
                }, lineHeight: 1.7
              }}>
                {job.description}
              </Typography>
            </Box>

            {/* Responsibilities */}
            <Box sx={{ mb: 4.5 }}>
              <Typography variant="h6" sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 800, mb: 2 }}>
                What You'll do
              </Typography>
              <Box sx={{
                display: "flex", flexDirection: "column", gap: {
                  xs: 1,
                  md: 1.5,
                },
              }}>
                {job.responsibilities?.map((resp, idx) => (
                  <Box key={idx} sx={{
                    display: "flex", gap: {
                      xs: 1,
                      md: 1.5,
                    }, alignItems: "flex-start"
                  }}>
                    <Box sx={{ color: "#10b981", mt: 0.4 }}>
                      <FaCheck size={11} />
                    </Box>
                    <Typography sx={{
                      color: subText, fontSize: {
                        xs: "0.86rem",
                        md: "0.92rem",
                      }, lineHeight: 1.5
                    }}>
                      {resp}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Requirements */}
            <Box>
              <Typography variant="h6" sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 800, mb: 2 }}>
                What We're Looking For
              </Typography>
              <Box sx={{
                display: "flex", flexDirection: "column", gap: {
                  xs: 1,
                  md: 1.5,
                },
              }}>
                {job.requirements?.map((req, idx) => (
                  <Box key={idx} sx={{
                    display: "flex", gap: {
                      xs: 1,
                      md: 1.5,
                    }, alignItems: "flex-start"
                  }}>
                    <Box sx={{ color: "#10b981", mt: 0.4 }}>
                      <FaCheck size={11} />
                    </Box>
                    <Typography sx={{
                      color: subText, fontSize: {
                        xs: "0.86rem",
                        md: "0.92rem",
                      }, lineHeight: 1.5
                    }}>
                      {req}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Side: Quick Specs Widget (1/3rd width) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: {
                xs: 2,
                md: 3.5,
              },
              position: { xs: "static", md: "sticky" },
              top: {
                md: 20,
                lg: 24,
              }
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },
                bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "#ffffff",
                border: `1px solid ${borderStyle}`,
                boxShadow: darkMode ? "0 10px 30px rgba(0,0,0,0.25)" : "0 10px 30px rgba(0,0,0,0.02)",
                transition: "all .3s",

                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: "#10b981",
                  boxShadow: darkMode
                    ? "0 15px 35px rgba(0,0,0,.3)"
                    : "0 15px 35px rgba(0,0,0,.05)",
                },
              }}
            >
              <Typography variant="h6" sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 800, mb: 3 }}>
                Quick Overview
              </Typography>

              {/* Specs List */}
              <Box sx={{
                display: "flex", flexDirection: "column", gap: {
                  xs: 2,
                  md: 2.5,
                }, mb: 4
              }}>
                <Box sx={{
                  display: "flex", alignItems: "center", gap: {
                    xs: 1.25,
                    md: 2,
                  }
                }}>
                  <FaMapMarkerAlt style={{ color: "#10b981", fontSize: 14 }} />
                  <Box>
                    <Typography sx={{
                      fontSize: {
                        xs: "0.7rem",
                        md: "0.75rem",
                      }, fontWeight: 700, color: subText, textTransform: "uppercase", tracking: "0.03em"
                    }}>
                      Location
                    </Typography>
                    <Typography sx={{
                      color: subText, fontSize: {
                        xs: "0.85rem",
                        md: "0.9rem",
                      }, fontWeight: 600
                    }}>
                      {job.location}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{
                  display: "flex", alignItems: "center", gap: {
                    xs: 1.25,
                    md: 2,
                  }
                }}>
                  <FaMoneyBillWave style={{ color: "#10b981", fontSize: 14 }} />
                  <Box>
                    <Typography sx={{
                      fontSize: {
                        xs: "0.7rem",
                        md: "0.75rem",
                      }, fontWeight: 700, color: subText, textTransform: "uppercase", tracking: "0.03em"
                    }}>
                      Salary Package
                    </Typography>
                    <Typography sx={{
                      color: subText, fontSize: {
                        xs: "0.85rem",
                        md: "0.9rem",
                      }, fontWeight: 600
                    }}>
                      {job.salary}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{
                  display: "flex", alignItems: "center", gap: {
                    xs: 1.25,
                    md: 2,
                  }
                }}>
                  <FaClock style={{ color: "#10b981", fontSize: 14 }} />
                  <Box>
                    <Typography sx={{
                      fontSize: {
                        xs: "0.7rem",
                        md: "0.75rem",
                      }, fontWeight: 700, color: subText, textTransform: "uppercase", tracking: "0.03em"
                    }}>
                      Job Type
                    </Typography>
                    <Typography sx={{
                      color: subText, fontSize: {
                        xs: "0.85rem",
                        md: "0.9rem",
                      }, fontWeight: 600
                    }}>
                      {job.employmentType}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{
                  display: "flex", alignItems: "center", gap: {
                    xs: 1.25,
                    md: 2,
                  }
                }}>
                  <FaLayerGroup style={{ color: "#10b981", fontSize: 14 }} />
                  <Box>
                    <Typography sx={{
                      fontSize: {
                        xs: "0.7rem",
                        md: "0.75rem",
                      }, fontWeight: 700, color: subText, textTransform: "uppercase", tracking: "0.03em"
                    }}>
                      Experience Level
                    </Typography>
                    <Typography sx={{
                      color: subText, fontSize: {
                        xs: "0.85rem",
                        md: "0.9rem",
                      }, fontWeight: 600
                    }}>
                      {job.experience}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mb: 3.5, borderColor: borderStyle }} />

              {/* Skills required tags */}
              <Box sx={{ mb: 4 }}>
                <Typography sx={{
                  fontSize: {
                    xs: "0.7rem",
                    md: "0.75rem",
                  }, fontWeight: 700, color: subText, textTransform: "uppercase", tracking: "0.03em", mb: 1.8
                }}>
                  Required Skills
                </Typography>
                <Box sx={{
                  display: "flex", flexWrap: "wrap", gap: {
                    xs: .75,
                    md: 1,
                  }
                }}>
                  {job.skills?.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: {
                          xs: "0.65rem",
                          md: "0.72rem",
                        },
                        bgcolor: "#10b981",
                        border: `1px solid ${borderStyle}`,
                        color: "#fff",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Call to Actions */}
              <Box sx={{
                display: "flex", flexDirection: "column", gap: {
                  xs: 1,
                  md: 1.5,
                }, mt: 2,
              }}>
                <Link to={`/apply-job/${job.jobId}`}
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{
                      py: {
                        xs: 1.2,
                        md: 1.4,
                      },
                      borderRadius: "10px",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: {
                        xs: "0.84rem",
                        md: "0.9rem",
                      },
                      background: "linear-gradient(135deg,#10b981,#16a34a)",
                      boxShadow: "0 10px 24px rgba(16,185,129,0.25)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #059669, #047857)",
                        boxShadow: "0 6px 16px rgba(16,185,129,0.3)",
                        transform: "translateY(-1px)",
                      }
                    }}
                  >
                    Apply Now
                  </Button>
                </Link>

                <Button
                  onClick={() => navigate(-1)}
                  variant="outlined"
                  sx={{
                    py: {
                      xs: 1.2,
                      md: 1.4,
                    },
                    borderRadius: "10px",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: {
                      xs: "0.84rem",
                      md: "0.9rem",
                    },
                    color: darkMode ? "#cbd5e1" : "#475569",
                    borderColor: darkMode
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.12)",
                    "&:hover": {
                      borderColor: darkMode ? "#cbd5e1" : "#475569",
                      bgcolor: darkMode
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.03)",
                    },
                  }}
                >
                  Back to List
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </CandidateLayout>
  );
}