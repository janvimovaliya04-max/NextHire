import browseJobsData from "../../data/BrowseJobDetails.json";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
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
  MapPin,
  Banknote,
  Clock,
  Layers,
  Check,
} from "lucide-react";

export default function JobDetails() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const navigate = useNavigate();

  // Colors — fully theme-driven (matches other candidate pages)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const selectedJob = browseJobsData.find(
      (item) => item.jobId === id
    );

    setJob(selectedJob);
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
            color: subText,
            borderColor: borderStyle,
            "&:hover": {
              borderColor: subText,
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
              bgcolor: colors.card,
              backdropFilter: "blur(12px)",
              border: `1px solid ${borderStyle}`,
              boxShadow: colors.shadow,
              transition: "all .3s",

              "&:hover": {
                transform: "translateY(-3px)",
                borderColor: primary,
                boxShadow: colors.shadow,
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
                    background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                    fontWeight: 800,
                    boxShadow: `0 6px 18px ${primary}40`,
                  }}
                >
                  {job.logoLetter}
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: 900,
                      lineHeight: 1.2,
                      fontSize: {
                        xs: "1.15rem",
                        sm: "1.45rem",
                        md: "1.9rem",
                      },
                    }}
                  >
                    {job.position}
                  </Typography>

                  <Typography
                    sx={{
                      color: primary,
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
                      mt: 1.2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip
                      label={job.position}
                      size="small"
                      sx={{
                        bgcolor: `${primary}1f`,
                        color: primary,
                        fontWeight: 700,
                      }}
                    />

                    {/* Employment type / experience chips: kept as
                        distinct semantic accents (blue / amber) for
                        quick visual scanning, same as the red urgency
                        timer on the Assessment page */}
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
                color: textColor,
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
              <Typography variant="h6" sx={{ color: textColor, fontWeight: 800, mb: 2 }}>
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
                    <Box sx={{ color: primary, mt: 0.4 }}>
                      <Check size={11} />
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
              <Typography variant="h6" sx={{ color: textColor, fontWeight: 800, mb: 2 }}>
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
                    <Box sx={{ color: primary, mt: 0.4 }}>
                      <Check size={11} />
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
                bgcolor: colors.card,
                border: `1px solid ${borderStyle}`,
                boxShadow: colors.shadow,
                transition: "all .3s",

                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: primary,
                  boxShadow: colors.shadow,
                },
              }}
            >
              <Typography variant="h6" sx={{ color: textColor, fontWeight: 800, mb: 3 }}>
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
                  <MapPin style={{ color: primary, fontSize: 14 }} />
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
                  <Banknote style={{ color: primary, fontSize: 14 }} />
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
                  <Clock style={{ color: primary, fontSize: 14 }} />
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
                  <Layers style={{ color: primary, fontSize: 14 }} />
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
                        bgcolor: primary,
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
                      background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                      boxShadow: `0 10px 24px ${primary}40`,
                      "&:hover": {
                        background: `linear-gradient(90deg, ${primary}, ${primary})`,
                        boxShadow: `0 6px 16px ${primary}4d`,
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
                    color: subText,
                    borderColor: borderStyle,
                    "&:hover": {
                      borderColor: subText,
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