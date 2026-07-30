import { Link } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import dashboardData from "../../data/candidateDashboard.json";
import {
  Card,
  CardContent,
  LinearProgress,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  FaBriefcase,
  FaClipboardList,
  FaCalendarAlt,
  FaAward,
  FaArrowRight,
  FaVideo,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function CandidateDashboard() {
  const { darkMode } = useTheme();
  const subText = darkMode ? "#94a3b8" : "#475569";
  const borderStyle = darkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)";

  // Safe fallbacks in case context is loading or empty
  const appliedCount = dashboardData.stats.appliedJobs;
  const assessmentCount = dashboardData.stats.assessments;
  const interviewCount = dashboardData.stats.interviews;
  const offerCount = dashboardData.stats.offers;

  const cards = [
    {
      title: "Applied Jobs",
      value: appliedCount,
      icon: <FaBriefcase size={20} />,
      color: "#16a34a",              // Green 600
      bgLight: "rgba(22,163,74,0.08)",
      bgDark: "rgba(22,163,74,0.18)",
      trend: dashboardData.trends.appliedJobs,
      link: "/my-applications",
    },
    {
      title: "Assessments",
      value: assessmentCount,
      icon: <FaClipboardList size={20} />,
      color: "#10b981",              // Emerald 500
      bgLight: "rgba(16,185,129,0.08)",
      bgDark: "rgba(16,185,129,0.18)",
      trend: dashboardData.trends.assessments,
      link: "/candidate-assessment",
    },
    {
      title: "Interviews",
      value: interviewCount,
      icon: <FaCalendarAlt size={20} />,
      color: "#059669",              // Emerald 600
      bgLight: "rgba(5,150,105,0.08)",
      bgDark: "rgba(5,150,105,0.18)",
      trend: dashboardData.trends.interviews,
      link: "/my-interviews",
    },
    {
      title: "Job Offers",
      value: offerCount,
      icon: <FaAward size={20} />,
      color: "#15803d",              // Green 700
      bgLight: "rgba(21,128,61,0.08)",
      bgDark: "rgba(21,128,61,0.18)",
      trend: dashboardData.trends.offers,
      link: "/offers",
    },
  ];

  const activeApplications = dashboardData.activeApplications;
  const quickActions = dashboardData.quickActions;
  const nextInterview = dashboardData.nextInterview;

  return (
    <CandidateLayout>
      {/* Dynamic Welcome Greeting Banner */}
      <Box
        sx={{
          mb: {
            xs: 3,
            sm: 4,
            md: 5,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 850,
            letterSpacing: "-0.03em",
            mb: 0.5,
            color: darkMode ? "#fff" : "#0f172a",
            fontSize: {
              xs: "1.5rem",
              sm: "1.8rem",
              md: "2.1rem",
              lg: "2.4rem",
            }
          }}
        >
          Welcome back, {dashboardData.candidateName}!
        </Typography>
      </Box>

      {/* Grid of Dynamic Stat Cards */}
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 2.5,
          md: 3,
        }}
        sx={{
          mb: {
            xs: 4,
            sm: 5,
            md: 6,
          },
        }}
      >
        {cards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
            <Link to={card.link} style={{ textDecoration: "none", width: "100%" }}>
              <Card
                sx={{
                  borderRadius: {
                    xs: 3,
                    sm: 4,
                  },
                  bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(8px)",
                  color: darkMode ? "#ffffff" : "#0f172a",
                  border: `1px solid ${borderStyle}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                  "&:hover": {
                    transform: {
                      xs: "none",
                      md: "translateY(-6px)",
                    },
                    borderColor: card.color,
                    boxShadow: darkMode
                      ? `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${card.color}15`
                      : `0 15px 30px rgba(0, 0, 0, 0.05), 0 0 15px ${card.color}15`,
                  },
                }}
              >
                <CardContent sx={{
                  p: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                  },
                }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: subText, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                      {card.title}
                    </Typography>
                    <Box
                      sx={{
                        width: {
                          xs: 34,
                          sm: 38,
                        },

                        height: {
                          xs: 34,
                          sm: 38,
                        },
                        borderRadius: "8px",
                        bgcolor: darkMode ? card.bgDark : card.bgLight,
                        color: card.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {card.icon}
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      mb: 1,
                      fontSize: {
                        xs: "2rem",
                        sm: "2.3rem",
                        md: "2.8rem",
                      },
                    }}
                  >
                    {card.value}
                  </Typography>
                  <Typography sx={{ color: card.color, fontSize: "0.78rem", fontWeight: 700 }}>
                    {card.trend}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Grid of Dynamic Quick Action Cards */}
      <Typography
        sx={{
          fontWeight: 800,
          letterSpacing: "-0.02em",
          mb: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },
          color: darkMode ? "#fff" : "#0f172a",
          fontSize: {
            xs: "1.2rem",
            md: "1.4rem",
          },
        }}
      >
        Quick Actions Panel
      </Typography>

      <Grid container spacing={{
        xs: 2,
        sm: 2.5,
        md: 3,
      }} sx={{ mb: 6 }}>
        {quickActions.map((action) => (
          <Grid key={action.title} size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
            <Card
              sx={{
                width: "100%",
                borderRadius: 4,
                bgcolor: darkMode ? "rgba(30, 41, 59, 0.3)" : "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(6px)",
                border: `1px solid ${borderStyle}`,
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: {
                  xs: 2.2,
                  sm: 3,
                },
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: action.color,
                  boxShadow: `0 10px 20px ${action.color}0a`,
                }
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <Avatar
                    sx={{
                      width: {
                        xs: 32,
                        sm: 34,
                      },

                      height: {
                        xs: 32,
                        sm: 34,
                      },
                      bgcolor: `${action.color}15`,
                      color: action.color
                    }}
                  >
                    {action.icon === "briefcase" ? (
                      <FaBriefcase size={18} />
                    ) : action.icon === "clipboard" ? (
                      <FaClipboardList size={18} />
                    ) : (
                      <FaCalendarAlt size={18} />
                    )}
                  </Avatar>
                  <Typography
                    sx={{
                      color: darkMode ? "#ffffff" : "#0f172a",
                      fontWeight: 800,
                      fontSize: {
                        xs: "1rem",
                        md: "1.1rem",
                      },
                    }}
                  >
                    {action.title}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: subText,
                    fontSize: {
                      xs: ".82rem",
                      sm: ".88rem",
                    },
                    lineHeight: 1.5,
                    mb: 3
                  }}
                >
                  {action.desc}
                </Typography>
              </Box>

              <Link to={action.link} style={{ textDecoration: "none" }}>
                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={<FaArrowRight size={12} />}
                  sx={{
                    py: 1.2,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 700,
                    color: action.color,
                    borderColor: `${action.color}40`,
                    "&:hover": {
                      borderColor: action.color,
                      bgcolor: `${action.color}08`,
                    }
                  }}
                >
                  {action.btnText}
                </Button>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Grid of Dynamic Feed Information */}
      <Grid
        container
        spacing={{
          xs: 3,
          md: 4,
        }}
      >
        {/* Left Column: Active Application Stages */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 3.5,
              },
              borderRadius: {
                xs: 3,
                sm: 4,
              },
              bgcolor: darkMode ? "rgba(30,41,59,.45)" : "#fff",
              backdropFilter: "blur(12px)",
              border: `1px solid ${borderStyle}`,
              transition: "all .3s ease",

              "&:hover": {
                transform: "translateY(-2px)",
                borderColor: "#10b981",
                boxShadow: darkMode
                  ? "0 12px 28px rgba(0,0,0,.35)"
                  : "0 12px 28px rgba(0,0,0,.05)"
              },
            }}
          >
            <Typography variant="h6" sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 800, mb: 3 }}>
              Active Application Statuses
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 2.5 } }}>
              {activeApplications.map((app, idx) => (
                <Box key={app.company}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                    <Box>
                      <Typography sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 700, fontSize: { xs: ".9rem", sm: ".95rem", } }}>
                        {app.role}
                      </Typography>
                      <Typography sx={{ color: subText, fontSize: "0.78rem" }}>
                        {app.company} • <span style={{ opacity: 0.85 }}>{app.date}</span>
                      </Typography>
                    </Box>

                    <Chip
                      label={app.stage}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: {
                          xs: ".66rem",
                          sm: ".72rem",
                        },

                        px: {
                          xs: .5,
                          sm: .8,
                        },
                        bgcolor: `${app.badgeColor}15`,
                        color: "#059669",
                        border: "1px solid rgba(16,185,129,.2)",
                      }}
                    />
                  </Box>
                  {/* Dynamic mini-progress line */}
                  <LinearProgress
                    variant="determinate"
                    value={app.progress}
                    sx={{
                      height: 5,
                      borderRadius: 10,
                      bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: app.badgeColor,
                        borderRadius: 3,
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Right Column: Next Scheduled Interview */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            sx={{
              p: {
                xs: 2.5,
                md: 3.5,
              },
              borderRadius: 4,
              bgcolor: darkMode ? "rgba(30,41,59,.45)" : "#fff",
              backdropFilter: "blur(12px)",
              border: `1px solid ${borderStyle}`,
              transition: "all .3s ease",

              "&:hover": {
                transform: "translateY(-2px)",
                borderColor: "#10b981",
                boxShadow: darkMode
                  ? "0 12px 28px rgba(0,0,0,.35)"
                  : "0 12px 28px rgba(0,0,0,.05)"
              },
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 800, mb: 3 }}>
                Next Upcoming Interview
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  alignItems: {
                    xs: "center",
                    sm: "flex-start",
                  },
                  textAlign: {
                    xs: "center",
                    sm: "left",
                  },
                  gap: 2,
                  mb: 3,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: darkMode ? "rgba(16,185,129,0.15)" : "rgba(16,185,129,0.08)",
                    color: "#10b981",
                    width: {
                      xs: 44,
                      sm: 48,
                      md: 52,
                    },

                    height: {
                      xs: 44,
                      sm: 48,
                      md: 52,
                    },
                  }}
                >
                  <FaCalendarAlt size={16} />
                </Avatar>
                <Box
                  sx={{
                    flexGrow: 1,
                    width: "100%",
                  }}
                >
                  <Typography sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 800, fontSize: "1rem" }}>
                    {nextInterview.title}</Typography>
                  <Typography sx={{ color: subText, fontSize: "0.85rem", mt: 0.5 }}>
                    {nextInterview.company}
                  </Typography>

                  <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: {
      xs: "center",
      sm: "flex-start",
    },
    gap: 0.8,
    color: "#10b981",
    mt: 1.5,
    width: "100%",
  }}
>
                    <FaClock size={12} />
                    <Typography sx={{ fontWeight: 800, fontSize: "0.82rem" }}>{nextInterview.time}</Typography>
                  </Box>
                  <Typography sx={{ color: subText, fontSize: "0.82rem", mt: 0.5 }}>
                    Interviewer: <span style={{ fontWeight: 600 }}>{nextInterview.interviewer}</span>
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Link to={nextInterview.link} style={{ textDecoration: "none" }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<FaVideo size={12} />}
                sx={{
                  py: {
                    xs: 1.2,
                    sm: 1.4,
                    md: 1.6,
                  },
                  borderRadius: "10px",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.88rem",
                  background: "linear-gradient(90deg,#10b981,#059669)",
                  boxShadow: "0 4px 12px rgba(16,185,129,.2)",
                  "&:hover": {
                    background: "linear-gradient(90deg,#059669,#047857)",
                    boxShadow: "0 6px 16px rgba(16,185,129,.3)",
                    transform: "translateY(-1px)",
                  }
                }}
              >
                Join Coding Round
              </Button>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </CandidateLayout>
  );
}