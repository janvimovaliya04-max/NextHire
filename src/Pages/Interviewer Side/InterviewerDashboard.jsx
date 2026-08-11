import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
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
} from "@mui/material";

import {
  Calendar,
  ClipboardCheck,
  ChartBar,
  ArrowRight,
  Video,
} from "lucide-react";

// Adjust this path to match where you place the JSON file
import dashboardData from "../../data/interviewerDashboard.json";

export default function InterviewerDashboard() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Candidate Dashboard / Settings / Evaluations)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Stat card meta — accents alternate between theme primary/secondary,
  // "Feedback Pending" keeps a semantic red since it signals something outstanding
  const cardMeta = {
    "Interviews Assigned": {
      icon: <Calendar size={20} />,
      link: "/assigned-interviews",
      color: primary,
      bgLight: `${primary}14`,
      bgDark: `${primary}26`,
    },
    "Feedback Pending": {
      icon: <ClipboardCheck size={20} />,
      link: "/feedback",
      color: primary,
      bgLight: `${secondary || primary}14`,
      bgDark: `${secondary || primary}26`,
    },
    "Completed Evaluations": {
      icon: <ChartBar size={20} />,
      link: "/evaluations",
      color: secondary || primary,
      bgLight: `${secondary || primary}14`,
      bgDark: `${secondary || primary}26`,
    },
  };

  const actions = [
    {
      title: "Assigned Interviews",
      link: "/assigned-interviews",
      color: primary,
    },

    {
      title: "Submit Feedback",
      link: "/feedback",
      color: primary,
    },

    {
      title: "Evaluations Hub",
      link: "/evaluations",
      color: primary,
    },
  ];

  const cards = dashboardData.cards.map((card) => ({
    ...card,
    icon: cardMeta[card.title]?.icon,
    link: cardMeta[card.title]?.link,
    color: cardMeta[card.title]?.color,
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
            color: textColor,
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
                  bgcolor: colors.card,
                  backdropFilter: "blur(8px)",
                  color: textColor,
                  border: `1px solid ${borderStyle}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: card.color,
                    boxShadow: colors.shadow,
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
        <Typography variant="h6" sx={{ mt: -3, mb: 2, fontWeight: 800, color: textColor }}>
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

                background: `linear-gradient(135deg, ${action.color}, ${secondary || primary})`,

                "&:hover": {

                  background: `linear-gradient(135deg, ${primary}, ${primary})`,

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
          alignItems: "start",
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
            bgcolor: colors.card,

            backdropFilter: "blur(10px)",

            border: `1px solid ${borderStyle}`,
            color: textColor,
            transition: "all .3s ease",

            "&:hover": {

              transform: "translateY(-2px)",

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
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
              justifyContent: "space-between",
              gap: 1.5,
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: textColor }}>
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

                  bgcolor: `${primary}08`,

                  border: `1.5px solid ${borderStyle}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
                  <Avatar
                    sx={{
                      background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
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
                    <Typography fontWeight="bold" sx={{ fontSize: "0.95rem", color: textColor }}>
                      {item.candidate}
                    </Typography>
                    <Typography variant="caption" sx={{ color: subText }}>
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
                    background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,

                    transition: "all .25s ease",

                    "&:hover": {
                      transform: "translateY(-2px)",

                      filter: "brightness(1.03)",
                      background: `linear-gradient(135deg, ${primary}, ${primary})`
                    },

                  }}
                >
                  <Video size={12} style={{ marginRight: "6px" }} />
                  Join
                </Button>
              </Box>
            ))}
          </Box>

          <Button
            component={Link}
            to="/assigned-interviews"
            endIcon={<ArrowRight size={12} />}
            sx={{
              textTransform: "none",
              color: primary,
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
                bgcolor: `${primary}0f`,
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
            bgcolor: colors.card,

            backdropFilter: "blur(10px)",

            border: `1px solid ${borderStyle}`,
            color: textColor,
            transition: "all .3s ease",

            "&:hover": {

              transform: "translateY(-2px)",

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
              alignItems: {
                xs: "stretch",
                sm: "center",
              },
              justifyContent: "space-between",
              gap: 1.5,
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: textColor }}>
              Recent Outcomes
            </Typography>

          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {recentEvaluations.map((item) => (
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
                  bgcolor: `${primary}08`,
                  border: `1.5px solid ${borderStyle}`,
                  "&:hover": {
                    bgcolor: `${primary}14`,

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

                      background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,

                      boxShadow: `0 6px 18px ${primary}47`,
                    }}
                  >
                    {item.candidate.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: textColor,
                      }}
                    >
                      {item.candidate}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: subText,
                      }}
                    >
                      {item.role}
                    </Typography>

                    <Typography
                      sx={{
                        mt: .4,
                        color: secondary || primary,
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
                        ? `${primary}1f`
                        : "rgba(245,158,11,.12)",

                    color:
                      item.result === "Recommended"
                        ? primary
                        : "#f59e0b",

                    border: "1px solid",

                    borderColor:
                      item.result === "Recommended"
                        ? `${primary}4d`
                        : "rgba(245,158,11,.30)",
                  }}
                />
              </Box>
            ))}
          </Box>
          <Button
            component={Link}
            to="/evaluations"
            endIcon={<ArrowRight size={12} />}
            sx={{
              textTransform: "none",
              color: primary,
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
                bgcolor: `${primary}0d`,
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