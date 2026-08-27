import React from "react";
import { Link } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { useAuth } from "../../context/AuthContext"; // Auth Context import karyu
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

import dashboardData from "../../data/interviewerDashboard.json";
import SEO from "../../components/common/SEO"; // SEO Component Import Added

export default function InterviewerDashboard() {
  const { user } = useAuth(); // Logged-in user context mathi read karyo
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  const primary = colors.primary;
  const secondary = colors.secondary || primary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Dynamic interviewer name calculation
  const interviewerName =
    user?.name ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ""}` : user?.username) ||
    dashboardData.welcomeName;

  // Dynamic Theme Config Mapping
  const cardMeta = {
    "Interviews Assigned": {
      icon: <Calendar size={20} />,
      link: "/interviewer/assigned-interviews",
      color: primary,
      bgLight: `${primary}14`,
      bgDark: `${primary}26`,
    },
    "Feedback Pending": {
      icon: <ClipboardCheck size={20} />,
      link: "/interviewer/feedback",
      color: primary,
      bgLight: `${secondary}14`,
      bgDark: `${secondary}26`,
    },
    "Completed Evaluations": {
      icon: <ChartBar size={20} />,
      link: "/interviewer/evaluations",
      color: secondary,
      bgLight: `${secondary}14`,
      bgDark: `${secondary}26`,
    },
  };

  const actions = [
    { title: "Assigned Interviews", link: "/interviewer/assigned-interviews", color: primary },
    { title: "Submit Feedback", link: "/interviewer/feedback", color: primary },
    { title: "Evaluations Hub", link: "/interviewer/evaluations", color: primary },
  ];

  const cards = (dashboardData.cards || []).map((card) => {
    const meta = cardMeta[card.title] || {};
    return {
      ...card,
      icon: meta.icon,
      link: meta.link || "#",
      color: meta.color || primary,
      bgLight: meta.bgLight || `${primary}14`,
      bgDark: meta.bgDark || `${primary}26`,
    };
  });

  const recentInterviews = dashboardData.recentInterviews || [];
  const recentEvaluations = dashboardData.recentEvaluations || [];

  return (
    <InterviewerLayout>
      {/* Dynamic SEO Tags Injection */}
      <SEO
        title="Interviewer Dashboard"
        description="Manage job postings, candidates, and interview schedules on NextHire HR Portal."
        canonicalUrl="/interviewer/dashboard"
      />

      {/* Dynamic Welcome Greeting Banner */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontWeight: 850,
            letterSpacing: "-0.03em",
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" },
            mb: 1,
            color: textColor,
          }}
        >
          Welcome Back, {interviewerName}!
        </Typography>
      </Box>

      {/* Dashboard Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {cards.map((card) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={card.title}
            sx={{ display: "flex" }}
          >
            <Link
              to={card.link}
              style={{
                textDecoration: "none",
                width: "100%",
                display: "flex",
                flexDirection: "column"
              }}>
              <Card
                sx={{
                  borderRadius: 5,
                  bgcolor: colors.card,
                  backdropFilter: "blur(8px)",
                  color: textColor,
                  border: `1px solid ${borderStyle}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  flex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: card.color,
                    boxShadow: colors.shadow,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 3.5 } }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: ".75rem", sm: ".82rem", md: ".85rem" },
                        color: subText,
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Box
                      sx={{
                        width: { xs: 36, sm: 40 },
                        height: { xs: 36, sm: 40 },
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
                      letterSpacing: "-.04em",
                      fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                    }}
                  >
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
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 800, color: textColor }}>
          Quick Actions
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {actions.map((action) => (
            <Button
              key={action.title}
              component={Link}
              to={action.link}
              variant="contained"
              sx={{
                py: { xs: 1.6, md: 2 },
                borderRadius: 5,
                fontWeight: 700,
                textTransform: "none",
                fontSize: { xs: ".85rem", sm: ".9rem" },
                background: `linear-gradient(135deg, ${action.color}, ${secondary})`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${primary}, ${primary})`,
                  transform: "translateY(-2px)",
                  filter: "brightness(1.03)",
                },
              }}
            >
              {action.title}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Feed Grids */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
          gap: 4,
          alignItems: "start",
        }}
      >
        {/* Upcoming Rounds Panel */}
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2.5, sm: 3, md: 3.5 },
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
          <Typography variant="h6" sx={{ fontWeight: 800, color: textColor, mb: 2 }}>
            Upcoming Rounds
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
            {recentInterviews.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  justifyContent: "space-between",
                  gap: { xs: 2, sm: 0 },
                  p: 2,
                  borderRadius: 3,
                  bgcolor: `${primary}08`,
                  border: `1.5px solid ${borderStyle}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                      width: { xs: 34, sm: 38 },
                      height: { xs: 34, sm: 38 },
                      fontSize: { xs: ".8rem", sm: ".95rem" },
                      fontWeight: "bold",
                    }}
                  >
                    {item.candidate?.charAt(0)}
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
                  to="/interviewer/join-interview"
                  state={{ interview: item }}
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: "bold",
                    px: 2.5,
                    background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                    transition: "all .25s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      filter: "brightness(1.03)",
                      background: `linear-gradient(135deg, ${primary}, ${primary})`,
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
            to="/interviewer/assigned-interviews"
            endIcon={<ArrowRight size={12} />}
            sx={{
              textTransform: "none",
              color: primary,
              fontWeight: 700,
              width: { xs: "100%", sm: "auto" },
              justifyContent: "center",
              borderRadius: "10px",
              py: { xs: 1, sm: 0.6 },
              "&:hover": { bgcolor: `${primary}0f` },
            }}
          >
            View All
          </Button>
        </Paper>

        {/* Recent Outcomes Panel */}
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2.5, sm: 3, md: 3.5 },
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
          <Typography variant="h6" sx={{ fontWeight: 800, color: textColor, mb: 2 }}>
            Recent Outcomes
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
            {recentEvaluations.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                  gap: { xs: 2, sm: 0 },
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: 5,
                  transition: "all .3s ease",
                  bgcolor: `${primary}08`,
                  border: `1.5px solid ${borderStyle}`,
                  "&:hover": {
                    bgcolor: `${primary}14`,
                    transform: "translateY(-2px)",
                    filter: "brightness(1.03)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: { xs: 34, sm: 40 },
                      height: { xs: 34, sm: 40 },
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                      boxShadow: `0 6px 18px ${primary}47`,
                    }}
                  >
                    {item.candidate?.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography sx={{ fontWeight: 700, color: textColor }}>
                      {item.candidate}
                    </Typography>
                    <Typography variant="caption" sx={{ color: subText, display: "block" }}>
                      {item.role}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 0.4,
                        color: secondary,
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
                    bgcolor: item.result === "Recommended" ? `${primary}1f` : "rgba(245,158,11,.12)",
                    color: item.result === "Recommended" ? primary : "#f59e0b",
                    border: "1px solid",
                    borderColor: item.result === "Recommended" ? `${primary}4d` : "rgba(245,158,11,.30)",
                  }}
                />
              </Box>
            ))}
          </Box>

          <Button
            component={Link}
            to="/interviewer/evaluations"
            endIcon={<ArrowRight size={12} />}
            sx={{
              textTransform: "none",
              color: primary,
              fontWeight: 700,
              width: { xs: "100%", sm: "auto" },
              justifyContent: "center",
              borderRadius: 2,
              py: { xs: 1, sm: 0.6 },
              "&:hover": { bgcolor: `${primary}0d` },
            }}
          >
            Evaluations
          </Button>
        </Paper>
      </Box>
    </InterviewerLayout>
  );
}