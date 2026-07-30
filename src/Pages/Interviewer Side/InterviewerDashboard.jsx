import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  Paper,
  Divider,
} from "@mui/material";

import {
  FaCalendarAlt,
  FaClipboardCheck,
  FaChartBar,
  FaArrowRight,
  FaVideo,
} from "react-icons/fa";

// Adjust this path to match where you place the JSON file
import dashboardData from "../../data/interviewerDashboard.json";

const cardMeta = {
  "Interviews Assigned": {
    icon: <FaCalendarAlt size={20} />,
    link: "/assigned-interviews",
    bgLight: "rgba(20,184,166,.08)",
    bgDark: "rgba(20,184,166,.15)",
  },
  "Feedback Pending": {
    icon: <FaClipboardCheck size={20} />,
    link: "/feedback",
    bgLight: "rgba(239,68,68,.08)",
    bgDark: "rgba(239,68,68,.15)",
  },
  "Completed Evaluations": {
    icon: <FaChartBar size={20} />,
    link: "/evaluations",
    bgLight: "rgba(16,185,129,.08)",
    bgDark: "rgba(16,185,129,.15)",
  },
};

export default function InterviewerDashboard() {
  const { darkMode } = useTheme();
  const borderStyle = darkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)";
  const subText = darkMode ? "#94a3b8" : "#475569";

  const actions = [
    {
      title: "Assigned Interviews",
      link: "/assigned-interviews",
      color: "#14b8a6",
    },

    {
      title: "Submit Feedback",
      link: "/feedback",
      color: "#10b981",
    },

    {
      title: "Evaluations Hub",
      link: "/evaluations",
      color: "#90b981",
    },
  ];

  const cards = dashboardData.cards.map((card) => ({
    ...card,
    icon: cardMeta[card.title]?.icon,
    link: cardMeta[card.title]?.link,
    bgLight: cardMeta[card.title]?.bgLight,
    bgDark: cardMeta[card.title]?.bgDark,
  }));

  const recentInterviews = dashboardData.recentInterviews;
  const recentEvaluations = dashboardData.recentEvaluations;

  return (
    <InterviewerLayout>

      {/* Welcome Greeting Section */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontWeight: 850,
            letterSpacing: "-0.03em",
            fontSize: {
              xs: "1.6rem",
              sm: "2rem",
              md: "2.2rem",
            },
            mb: 1,
            color: darkMode ? "#fff" : "#0f172a",
          }}
        >
          Welcome Back, {dashboardData.welcomeName}
        </Typography>
      </Box>

      {/* Dashboard Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {cards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <Link to={card.link} style={{ textDecoration: "none", width: "100%" }}>
              <Card
                sx={{
                  mt: -2,
                  borderRadius: 5,
                  bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(8px)",
                  color: darkMode ? "#ffffff" : "#0f172a",
                  border: `1px solid ${borderStyle}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: card.color,
                    boxShadow: darkMode
                      ? `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${card.color}15`
                      : `0 15px 30px rgba(0, 0, 0, 0.05), 0 0 15px ${card.color}15`,
                  },
                }}
              >
                <CardContent sx={{
                  p: {
                    xs: 2.5,
                    sm: 3,
                    md: 3.5
                  },
                }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography sx={{
                      fontWeight: 700, fontSize: {
                        xs: ".75rem",
                        sm: ".82rem",
                        md: ".85rem",
                      }, color: subText, textTransform: "uppercase", letterSpacing: "0.03em"
                    }}>
                      {card.title}
                    </Typography>
                    <Box
                      sx={{
                        width: {
                          xs: 36,
                          sm: 40,
                        },

                        height: {
                          xs: 36,
                          sm: 40,
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
                  <Typography sx={{
                    fontWeight: 800,
                    letterSpacing: "-.04em",

                    fontSize: {
                      xs: "2rem",
                      sm: "2.4rem",
                      md: "2.8rem",
                    }
                  }}>
                    {card.value}
                  </Typography>
                  <Typography sx={{ color: card.color, fontSize: "0.78rem", fontWeight: 700 }}>
                    {card.subtext}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions Panel */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" sx={{ mt: -3, mb: 2, fontWeight: 800, color: darkMode ? "#ffffff" : "#0f172a" }}>
          Quick Actions
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3,1fr)"
            },
            gap: 3
          }}
        >

          {actions.map((action) => (
            <Button

              key={action.title}

              component={Link}

              to={action.link}

              variant="contained"

              sx={{

                py: {
                  xs: 1.6,
                  md: 2
                },

                borderRadius: 5,

                fontWeight: 700,

                textTransform: "none",

                fontSize: {
                  xs: ".85rem",
                  sm: ".9rem"
                },

                background: `linear-gradient(135deg,${action.color},#0f766e)`,

                "&:hover": {

                  background: `linear-gradient(135deg,#0f766e,#115e59)`,

                  transform: "translateY(-2px)",

                  filter: "brightness(1.03)"
                }

              }}

            >

              {action.title}

            </Button>

          ))}
        </Box>

      </Box>

      {/* Detailed Feed Grids */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
          gap: 4,
          alignItems: "start", // <-- Add this
        }}
      >
        {/* Upcoming Rounds list */}
        <Paper
          elevation={2}
          sx={{
            p: {
              xs: 2.5,
              sm: 3,
              md: 3.5
            },
            borderRadius: 5,
            bgcolor: darkMode
              ? "#1e293b"
              : "#ffffff",

            backdropFilter: "blur(10px)",

            border: `1px solid ${darkMode
              ? "#334155"
              : "#e2e8f0"
              }`,
            color: darkMode ? "#ffffff" : "#000000",
            transition: "all .3s ease",

            "&:hover": {

              transform: "translateY(-2px)",

              boxShadow: darkMode
                ? "0 14px 35px rgba(0,0,0,.4)"
                : "0 14px 35px rgba(0,0,0,.08)"
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
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
              justifyContent: "space-between",
              gap: 1.5,
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: darkMode ? "#ffffff" : "#0f172a" }}>
              Upcoming Rounds
            </Typography>

          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {recentInterviews.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",

                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },

                  alignItems: {
                    xs: "stretch",
                    sm: "center",
                  },

                  justifyContent: "space-between",

                  gap: {
                    xs: 2,
                    sm: 0,
                  },

                  p: 2,

                  borderRadius: 3,

                  bgcolor: darkMode
                    ? "rgba(20,184,166,.06)"
                    : "rgba(20,184,166,.03)",

                  border: `1.5px solid ${darkMode
                    ? "rgba(148,163,184,.45)"
                    : "rgba(0,0,0,.08)"
                    }`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
                  <Avatar
                    sx={{
                      background: "linear-gradient(135deg,#14b8a6,#0f766e)",
                      width: {
                        xs: 34,
                        sm: 38
                      },

                      height: {
                        xs: 34,
                        sm: 38
                      },

                      fontSize: {
                        xs: ".8rem",
                        sm: ".95rem"
                      },
                      fontWeight: "bold",
                    }}
                  >
                    {item.candidate.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold" sx={{ fontSize: "0.95rem" }}>
                      {item.candidate}
                    </Typography>
                    <Typography variant="caption" sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
                      {item.role} • {item.date} at {item.time}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  component={Link}
                  to="/join-interview"
                  state={{ interview: item }}
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: "bold",
                    px: 2.5,
                    background: "linear-gradient(90deg,#14b8a6,#0f766e)",

                    transition: "all .25s ease",

                    "&:hover": {
                      transform: "translateY(-2px)",

                      filter: "brightness(1.03)",
                      background: "linear-gradient(90deg,#0d9488,#115e59)"
                    },

                  }}
                >
                  <FaVideo size={12} style={{ marginRight: "6px" }} />
                  Join
                </Button>
              </Box>
            ))}
          </Box>

          <Button
            component={Link}
            to="/assigned-interviews"
            endIcon={<FaArrowRight size={12} />}
            sx={{
              textTransform: "none",
              color: "#14b8a6",
              fontWeight: 700,

              alignSelf: {
                xs: "stretch",
                sm: "auto",
              },

              width: {
                xs: "100%",
                sm: "auto",
              },

              justifyContent: "center",

              borderRadius: "10px",

              py: {
                xs: 1,
                sm: 0.6,
              },

              "&:hover": {
                bgcolor: "rgba(20,184,166,.06)",
              },
            }}
          >
            View All
          </Button>

        </Paper>

        {/* Recent Evaluations list */}
        <Paper
          elevation={2}
          sx={{
            p: {
              xs: 2.5,
              sm: 3,
              md: 3.5
            },
            borderRadius: 5,
            bgcolor: darkMode
              ? "#1e293b"
              : "#ffffff",

            backdropFilter: "blur(10px)",

            border: `1px solid ${darkMode
              ? "#334155"
              : "#e2e8f0"
              }`,
            color: darkMode ? "#ffffff" : "#000000",
            transition: "all .3s ease",

            "&:hover": {

              transform: "translateY(-2px)",

              boxShadow: darkMode
                ? "0 14px 35px rgba(0,0,0,.4)"
                : "0 14px 35px rgba(0,0,0,.08)"
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
              alignItems: {
                xs: "stretch",
                sm: "center",
              },
              justifyContent: "space-between",
              gap: 1.5,
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: darkMode ? "#ffffff" : "#0f172a" }}>
              Recent Outcomes
            </Typography>

          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {recentEvaluations.map((item, index) => (
              <Box
                key={item.id}
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
                    sm: 0,
                  },
                  p: {
                    xs: 2.5,
                    sm: 3,
                    md: 3.5
                  },

                  borderRadius: 5,

                  transition: "all .3s ease",
                  bgcolor:
                    darkMode
                      ? "rgba(20,184,166,.06)"
                      : "rgba(20,184,166,.03)",
                  border: `1.5px solid ${darkMode
                    ? "rgba(148,163,184,.45)"
                    : "rgba(0,0,0,.08)"
                    }`,
                  "&:hover": {
                    bgcolor:
                      darkMode
                        ? "rgba(20,184,166,.10)"
                        : "rgba(20,184,166,.05)",

                    transform: "translateY(-2px)",

                    filter: "brightness(1.03)"
                  }
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: {
                        xs: 34,
                        sm: 40,
                      },

                      height: {
                        xs: 34,
                        sm: 40,
                      },

                      fontWeight: 700,

                      background:
                        "linear-gradient(135deg,#14b8a6,#0f766e)",

                      boxShadow:
                        "0 6px 18px rgba(20,184,166,.28)",
                    }}
                  >
                    {item.candidate.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: darkMode ? "#fff" : "#0f172a",
                      }}
                    >
                      {item.candidate}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: darkMode
                          ? "#94a3b8"
                          : "#64748b",
                      }}
                    >
                      {item.role}
                    </Typography>

                    <Typography
                      sx={{
                        mt: .4,
                        color: "#0f766e",
                        fontWeight: 700,
                        fontSize: ".82rem",
                      }}
                    >
                      Score : {item.score}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={item.result}
                  size="small"
                  sx={{
                    px: 1,

                    fontWeight: 700,

                    fontSize: ".75rem",

                    borderRadius: "999px",

                    bgcolor:
                      item.result === "Recommended"
                        ? "rgba(16,185,129,.12)"
                        : "rgba(245,158,11,.12)",

                    color:
                      item.result === "Recommended"
                        ? "#10b981"
                        : "#f59e0b",

                    border: "1px solid",

                    borderColor:
                      item.result === "Recommended"
                        ? "rgba(16,185,129,.30)"
                        : "rgba(245,158,11,.30)",
                  }}
                />
              </Box>
            ))}
          </Box>
          <Button
            component={Link}
            to="/evaluations"
            endIcon={<FaArrowRight size={12} />}
            sx={{
              textTransform: "none",
              color: "#14b8a6",
              fontWeight: 700,

              width: {
                xs: "100%",
                sm: "auto",
              },

              justifyContent: "center",

              borderRadius: 2,

              py: {
                xs: 1,
                sm: 0.6,
              },

              "&:hover": {
                bgcolor: "rgba(20,184,166,.05)",
              },
            }}
          >
            Evaluations
          </Button>
        </Paper>
      </Box>

    </InterviewerLayout>
  );
}