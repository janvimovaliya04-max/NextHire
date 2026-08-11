import { Link } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
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
  Briefcase,
  ClipboardList,
  Calendar,
  Award,
  ArrowRight,
  Video,
  CircleCheck,
  Clock,
} from "lucide-react";

export default function CandidateDashboard() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Assessment / BrowseJobs)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Safe fallbacks in case context is loading or empty
  const appliedCount = dashboardData.stats.appliedJobs;
  const assessmentCount = dashboardData.stats.assessments;
  const interviewCount = dashboardData.stats.interviews;
  const offerCount = dashboardData.stats.offers;

  // Stat card accents now derive from the theme (primary/secondary),
  // alternating for visual distinction while staying on-brand
  const cards = [
    {
      title: "Applied Jobs",
      value: appliedCount,
      icon: <Briefcase size={20} />,
      color: primary,
      bgLight: `${primary}14`,
      bgDark: `${primary}2e`,
      trend: dashboardData.trends.appliedJobs,
      link: "/my-applications",
    },
    {
      title: "Assessments",
      value: assessmentCount,
      icon: <ClipboardList size={20} />,
      color: secondary || primary,
      bgLight: `${secondary || primary}14`,
      bgDark: `${secondary || primary}2e`,
      trend: dashboardData.trends.assessments,
      link: "/candidate-assessment",
    },
    {
      title: "Interviews",
      value: interviewCount,
      icon: <Calendar size={20} />,
      color: primary,
      bgLight: `${primary}14`,
      bgDark: `${primary}2e`,
      trend: dashboardData.trends.interviews,
      link: "/my-interviews",
    },
    {
      title: "Job Offers",
      value: offerCount,
      icon: <Award size={20} />,
      color: secondary || primary,
      bgLight: `${secondary || primary}14`,
      bgDark: `${secondary || primary}2e`,
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
            color: textColor,
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
                  bgcolor: colors.card,
                  backdropFilter: "blur(8px)",
                  color: textColor,
                  border: `1px solid ${borderStyle}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                  "&:hover": {
                    transform: {
                      xs: "none",
                      md: "translateY(-6px)",
                    },
                    borderColor: card.color,
                    boxShadow: colors.shadow,
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
          color: textColor,
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
                bgcolor: colors.card,
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
                      <Briefcase size={18} />
                    ) : action.icon === "clipboard" ? (
                      <ClipboardList size={18} />
                    ) : (
                      <Calendar size={18} />
                    )}
                  </Avatar>
                  <Typography
                    sx={{
                      color: textColor,
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
                  endIcon={<ArrowRight size={12} />}
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
              bgcolor: colors.card,
              backdropFilter: "blur(12px)",
              border: `1px solid ${borderStyle}`,
              transition: "all .3s ease",

              "&:hover": {
                transform: "translateY(-2px)",
                borderColor: primary,
                boxShadow: colors.shadow,
              },
            }}
          >
            <Typography variant="h6" sx={{ color: textColor, fontWeight: 800, mb: 3 }}>
              Active Application Statuses
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 2.5 } }}>
              {activeApplications.map((app, idx) => (
                <Box key={app.company}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                    <Box>
                      <Typography sx={{ color: textColor, fontWeight: 700, fontSize: { xs: ".9rem", sm: ".95rem", } }}>
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
                        color: primary,
                        border: `1px solid ${primary}33`,
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
                        bgcolor: primary,
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
              bgcolor: colors.card,
              backdropFilter: "blur(12px)",
              border: `1px solid ${borderStyle}`,
              transition: "all .3s ease",

              "&:hover": {
                transform: "translateY(-2px)",
                borderColor: primary,
                boxShadow: colors.shadow,
              },
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ color: textColor, fontWeight: 800, mb: 3 }}>
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
                    bgcolor: `${primary}14`,
                    color: primary,
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
                  <Calendar size={16} />
                </Avatar>
                <Box
                  sx={{
                    flexGrow: 1,
                    width: "100%",
                  }}
                >
                  <Typography sx={{ color: textColor, fontWeight: 800, fontSize: "1rem" }}>
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
                      color: primary,
                      mt: 1.5,
                      width: "100%",
                    }}
                  >
                    <Clock size={12} />
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
                startIcon={<Video size={12} />}
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
                  background: `linear-gradient(90deg, ${primary}, ${secondary || primary})`,
                  boxShadow: `0 4px 12px ${primary}33`,
                  "&:hover": {
                    background: `linear-gradient(90deg, ${primary}, ${primary})`,
                    boxShadow: `0 10px 22px ${primary}59`,
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