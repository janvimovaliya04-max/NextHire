import dashboardData from "../../data/dashboard.json";


import HRLayout from "../../Layouts/HRLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  FaBriefcase,
  FaCalendarAlt,
  FaUserCheck,
  FaUsers,
  FaUserTie,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";

export default function HRDashboard() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const { cards, recentCandidates, upcomingInterviews } = dashboardData;

  const iconMap = {
    briefcase: <FaBriefcase size={20} />,
    usertie: <FaUserTie size={20} />,
    calendar: <FaCalendarAlt size={20} />,
    usercheck: <FaUsers size={20} />,
  };

  const quickActions = [
    {
      title: "Create Job Post",
      desc: "Draft role requirements, configure workflow filters, and publish.",
      btnText: "New Position",
      link: "/create-job",
      color: primary,
      icon: <FaBriefcase size={18} />,
    },
    {
      title: "Manage Candidates",
      desc: "View candidate profiles, interview progress and hiring status.",
      btnText: "View Candidates",
      link: "/candidates",
      color: secondary || primary,
      icon: <FaUserCheck size={18} />,
    },
    {
      title: "Book Interviews",
      desc: "Coordinate times slots between candidates and technical reviewers.",
      btnText: "Schedule Round",
      link: "/interview-management",
      color: primary,
      icon: <FaCalendarAlt size={18} />,
    },
  ];

  return (
    <HRLayout>

      {/* Welcome Banner */}
      <Box
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      >
        <Typography
          sx={{
            color: colors.text,
            fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
            mb: { xs: 0, md: 0.5 },
            fontWeight: 850,
            letterSpacing: "-0.03em",
          }}
        >
          Hello, Admin Manager
        </Typography>

      </Box>

      {/* Grid of Dynamic Stat Cards */}
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 3,
        }}
        sx={{
          mb: {
            xs: 4,
            md: 6,
          },
        }}
      >
        {cards.map((card) => (
          <Grid key={card.title}
            size={{
              xs: 12,
              sm: 6,
              md: 6,
              lg: 3
            }}
            sx={{ display: "flex" }}
          >
            <Link to={card.link} style={{ textDecoration: "none", width: "100%" }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  bgcolor: colors.card,
                  backdropFilter: "blur(16px)",

                  boxShadow: colors.shadow,
                  color: textColor,
                  border: `1px solid ${borderStyle}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: darkMode
                      ? `0 24px 55px rgba(0,0,0,.42)`
                      : `0 26px 55px rgba(15,23,42,.12)`,
                  }
                }}
              >
                <CardContent
                  sx={{
                    p: {
                      xs: 2,
                      sm: 3,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.72rem", sm: "0.8rem", md: "0.85rem" }, color: subText, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                      {card.title}
                    </Typography>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "8px",
                        bgcolor: darkMode ? card.bgDark : card.bgLight,
                        color: card.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {iconMap[card.icon]}
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: 800,
                      mb: 1,
                      fontSize: {
                        xs: "2rem",
                        sm: "2.3rem",
                        md: "3rem"
                      }
                    }}
                  >
                    {card.value}
                  </Typography>

                  <Typography
                    sx={{
                      color: subText,
                      fontSize: { xs: "0.72rem", sm: "0.8rem" }
                    }}
                  >
                    Total {card.title}
                  </Typography>
                  <Typography sx={{ color: card.color, fontSize: { xs: "0.7rem", sm: "0.78rem" }, fontWeight: 700 }}>
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
          fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
          mb: { xs: 0, md: 0.5 },
          fontWeight: 850,
          letterSpacing: "-0.03em",
        }}
      >
        Quick Actions Panel
      </Typography>

      <Grid
        container
        spacing={{
          xs: 2,
          sm: 3,
        }}
        sx={{
          mb: {
            xs: 4,
            md: 6,
          },
        }}
      >
        {quickActions.map((action) => (
          <Grid key={action.title}
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
            sx={{ display: "flex" }}
          >
            <Card
              elevation={0}
              sx={{
                width: "100%",
                color: textColor,
                borderRadius: 4,
                bgcolor: colors.card,
                backdropFilter: "blur(16px)",
                boxShadow: colors.shadow,
                border: `1px solid ${borderStyle}`,
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: { xs: 2, sm: 3 },
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
                        xs: 30,
                        sm: 34
                      },

                      height: {
                        xs: 30,
                        sm: 34
                      },
                      bgcolor: `${action.color}15`,
                      color: action.color
                    }}
                  >
                    {action.icon}
                  </Avatar>
                  <Typography sx={{
                    color: textColor,
                    fontWeight: 800, fontSize: {
                      xs: "0.95rem",
                      sm: "1.05rem",
                      md: "1.1rem"
                    },
                  }}>
                    {action.title}
                  </Typography>
                </Box>
                <Typography sx={{
                  color: subText, fontSize: {
                    xs: "0.8rem",
                    sm: "0.85rem",
                    md: "0.88rem"
                  }, lineHeight: 1.5, mb: 3
                }}>
                  {action.desc}
                </Typography>
              </Box>

              <Link to={action.link} style={{ textDecoration: "none" }}>
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<FaArrowRight size={12} />}
                  sx={{
                    py: {
                      xs: 1,
                      sm: 1.2
                    },
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: {
                      xs: "0.8rem",
                      sm: "0.9rem"
                    },
                    background: action.color,
                    color: "#fff",
                    "&:hover": {
                      background: action.color,
                      opacity: .9,
                    },
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
          xs: 2,
          sm: 3,
        }}
        sx={{
          mb: {
            xs: 4,
            md: 6,
          },
        }}
      >

        {/* Left Column: Recent Candidates */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              backdropFilter: "blur(16px)",
              boxShadow: colors.shadow,
              bgcolor: colors.card,
              border: `1px solid ${borderStyle}`,
              p: {
                xs: 2,
                sm: 3
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: textColor,
                  fontWeight: 800,
                }}
              >
                Recent Candidates
              </Typography>

              <Button
                component={Link}
                to="/candidates"
                size="small"
                sx={{
                  fontSize: {
                    xs: "0.72rem",
                    sm: "0.82rem"
                  },
                  color: primary,
                }}
              >
                View Candidates
              </Button>
            </Box>

            <Box sx={{
              display: "flex", flexDirection: "column", gap: {
                xs: 1.5,
                sm: 2.5
              }
            }}>
              {recentCandidates.map((candidate, idx) => (
                <Box
                  key={candidate.name}
                  sx={{
                    color: textColor,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: idx !== recentCandidates.length - 1 ? 2.5 : 0,
                    borderBottom: idx !== recentCandidates.length - 1 ? `1px solid ${borderStyle}` : "none",
                  }}
                >
                  <Box sx={{
                    display: "flex", alignItems: "center", gap: {
                      xs: 1.2,
                      sm: 2
                    },
                  }}>
                    <Avatar sx={{
                      bgcolor: `${primary}15`, color: primary, fontWeight: 700, width: {
                        xs: 34,
                        sm: 40
                      },

                      height: {
                        xs: 34,
                        sm: 40
                      },

                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.95rem"
                      },
                    }}
                    >
                      {candidate.initials}
                    </Avatar>
                    <Box>
                      <Typography sx={{ color: textColor, fontWeight: 700, fontSize: "0.95rem" }}>{candidate.name}</Typography>
                      <Typography
                        sx={{
                          color: subText,
                          fontSize: {
                            xs: "0.72rem",
                            sm: "0.82rem"
                          },
                        }}
                      >
                        {candidate.role}
                      </Typography>
                    </Box>
                  </Box>

                  <Chip
                    label={candidate.status}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.72rem",
                      bgcolor:
                        candidate.status === "Selected"
                          ? "rgba(34,197,94,.12)"
                          : candidate.status === "Interview Scheduled"
                            ? `${primary}10`
                            : "rgba(245,158,11,.10)",

                      color:
                        candidate.status === "Selected"
                          ? "#22C55E"
                          : candidate.status === "Interview Scheduled"
                            ? primary
                            : "#F59E0B",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Right Column: Upcoming Interviews */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              bgcolor: colors.card,
              backdropFilter: "blur(16px)",
              boxShadow: colors.shadow,
              border: `1px solid ${borderStyle}`, p: 3
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  color: textColor,
                  fontWeight: 800,
                  fontSize: {
                    xs: "1rem",
                    sm: "1.15rem"
                  }
                }}
              >
                Upcoming Interviews Today
              </Typography>
            </Box>
            <Box sx={{
              display: "flex", flexDirection: "column", gap: {
                xs: 1.5,
                sm: 2.5
              }
            }}>
              {upcomingInterviews.map((interview, idx) => (
                <Box
                  key={interview.candidate}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: {
                      xs: 1.2,
                      sm: 2
                    },
                    pb: idx !== upcomingInterviews.length - 1 ? 2.5 : 0,
                    borderBottom: idx !== upcomingInterviews.length - 1 ? `1px solid ${borderStyle}` : "none",
                  }}
                >
                  <Avatar sx={{ bgcolor: `${primary}15`, color: primary, width: 38, height: 38 }}>
                    <FaCalendarAlt size={16} />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                      <Typography sx={{
                        color: textColor, fontWeight: 700, fontSize: {
                          xs: "0.85rem",
                          sm: "0.95rem"
                        },
                      }}
                      >
                        {interview.candidate}</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: primary }}>
                        <FaClock size={11} />
                        <Typography sx={{ fontWeight: 800, fontSize: "0.8rem" }}>{interview.time}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ color: subText, fontSize: "0.82rem" }}>
                      {interview.type} • <span style={{ fontWeight: 600 }}>{interview.interviewer}</span>
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Button
              variant="outlined"
              component={Link}
              to="/interview-management"
              size="small"
              sx={{
                mt: 4,
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.82rem"
                },
                color: primary,
                borderColor: `${primary}40`,
                "&:hover": {
                  borderColor: primary,
                  bgcolor: `${primary}08`,
                },
              }}
            >
              View Schedule
            </Button>
          </Card>
        </Grid>
      </Grid>
    </HRLayout>
  );
}