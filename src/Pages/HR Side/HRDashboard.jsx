import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  alpha,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // Using Grid v2 for size prop compatibility

import {
  Briefcase,
  Calendar,
  UserCheck,
  Users,
  UserRound,
  ArrowRight,
  Clock,
  HelpCircle,
} from "lucide-react";

import dashboardData from "../../data/Dashboard.json";
import HRLayout from "../../Layouts/HRLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { useAuth } from "../../context/AuthContext"; // 👈 Context imported

// Icon mapping configuration
const ICON_MAP = {
  briefcase: <Briefcase size={20} />,
  usertie: <UserRound size={20} />,
  calendar: <Calendar size={20} />,
  usercheck: <Users size={20} />,
};

// Sub-component: Stat Card
const StatCard = ({ card, colors, darkMode }) => {
  const icon = ICON_MAP[card.icon] || <HelpCircle size={20} />;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} sx={{ display: "flex" }}>
      <Link to={card.link} style={{ textDecoration: "none", width: "100%" }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            bgcolor: colors.card,
            backdropFilter: "blur(16px)",
            boxShadow: colors.shadow,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            height: "100%",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? "0 24px 55px rgba(0,0,0,.42)"
                : "0 26px 55px rgba(15,23,42,.12)",
            },
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "0.72rem", sm: "0.8rem", md: "0.85rem" },
                  color: colors.subText,
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
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
                {icon}
              </Box>
            </Box>
            <Typography
              sx={{
                color: colors.text,
                fontWeight: 800,
                mb: 1,
                fontSize: { xs: "2rem", sm: "2.3rem", md: "3rem" },
              }}
            >
              {card.value}
            </Typography>
            <Typography sx={{ color: colors.subText, fontSize: { xs: "0.72rem", sm: "0.8rem" } }}>
              Total {card.title}
            </Typography>
            <Typography sx={{ color: card.color, fontSize: { xs: "0.7rem", sm: "0.78rem" }, fontWeight: 700 }}>
              {card.trend}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

// Sub-component: Quick Action Card
const ActionCard = ({ action, colors }) => (
  <Grid size={{ xs: 12, sm: 6, lg: 4 }} sx={{ display: "flex" }}>
    <Card
      elevation={0}
      sx={{
        width: "100%",
        color: colors.text,
        borderRadius: 4,
        bgcolor: colors.card,
        backdropFilter: "blur(16px)",
        boxShadow: colors.shadow,
        border: `1px solid ${colors.border}`,
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: { xs: 2, sm: 3 },
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: action.color,
          boxShadow: `0 10px 20px ${alpha(action.color, 0.1)}`,
        },
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <Avatar
            sx={{
              width: { xs: 30, sm: 34 },
              height: { xs: 30, sm: 34 },
              bgcolor: alpha(action.color, 0.12),
              color: action.color,
            }}
          >
            {action.icon}
          </Avatar>
          <Typography
            sx={{
              color: colors.text,
              fontWeight: 800,
              fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
            }}
          >
            {action.title}
          </Typography>
        </Box>
        <Typography
          sx={{
            color: colors.subText,
            fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.88rem" },
            lineHeight: 1.5,
            mb: 3,
          }}
        >
          {action.desc}
        </Typography>
      </Box>

      <Button
        component={Link}
        to={action.link}
        fullWidth
        variant="contained"
        endIcon={<ArrowRight size={12} />}
        sx={{
          py: { xs: 1, sm: 1.2 },
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: { xs: "0.8rem", sm: "0.9rem" },
          background: action.color,
          color: "#fff",
          "&:hover": {
            background: action.color,
            opacity: 0.9,
          },
        }}
      >
        {action.btnText}
      </Button>
    </Card>
  </Grid>
);

export default function HRDashboard() {
  const { user } = useAuth(); // 👈 Logged-in user data get karyo
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const primary = colors.primary;
  const secondary = colors.secondary;

  const { cards = [], recentCandidates = [], upcomingInterviews = [] } = dashboardData;

  const quickActions = [
    {
      title: "Create Job Post",
      desc: "Draft role requirements, configure workflow filters, and publish.",
      btnText: "New Position",
      link: "/hr/create-job",
      color: primary,
      icon: <Briefcase size={18} />,
    },
    {
      title: "Manage Candidates",
      desc: "View candidate profiles, interview progress and hiring status.",
      btnText: "View Candidates",
      link: "/hr/candidates",
      color: secondary || primary,
      icon: <UserCheck size={18} />,
    },
    {
      title: "Book Interviews",
      desc: "Coordinate times slots between candidates and technical reviewers.",
      btnText: "Schedule Round",
      link: "/hr/interview-management",
      color: primary,
      icon: <Calendar size={18} />,
    },
  ];

  // Dynamic Name logic based on JSON properties
  const displayName = user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ""}` : user?.username) || "User";

  return (
    <HRLayout>
      {/* Dynamic Welcome Banner */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography
          sx={{
            color: colors.text,
            fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
            mb: { xs: 0, md: 0.5 },
            fontWeight: 850,
            letterSpacing: "-0.03em",
          }}
        >
          Hello, {displayName}
        </Typography>
      </Box>

      {/* Grid of Dynamic Stat Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 4, md: 6 } }}>
        {cards.map((card) => (
          <StatCard key={card.title} card={card} colors={colors} darkMode={darkMode} />
        ))}
      </Grid>

      {/* Quick Actions Header & Grid */}
      <Typography
        sx={{
          fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
          mb: { xs: 1.5, md: 2 },
          fontWeight: 850,
          letterSpacing: "-0.03em",
          color: colors.text,
        }}
      >
        Quick Actions Panel
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 4, md: 6 } }}>
        {quickActions.map((action) => (
          <ActionCard key={action.title} action={action} colors={colors} />
        ))}
      </Grid>

      {/* Feeds Section */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 4, md: 6 } }}>
        {/* Recent Candidates */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              backdropFilter: "blur(16px)",
              boxShadow: colors.shadow,
              bgcolor: colors.card,
              border: `1px solid ${colors.border}`,
              p: { xs: 2, sm: 3 },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" sx={{ color: colors.text, fontWeight: 800 }}>
                Recent Candidates
              </Typography>
              <Button component={Link} to="/hr/candidates" size="small" sx={{ fontSize: { xs: "0.72rem", sm: "0.82rem" }, color: primary }}>
                View Candidates
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2.5 } }}>
              {recentCandidates.map((candidate, idx) => {
                const isSelected = candidate.status === "Selected";
                const isScheduled = candidate.status === "Interview Scheduled";
                const chipBg = isSelected
                  ? "rgba(34,197,94,.12)"
                  : isScheduled
                    ? alpha(primary, 0.1)
                    : "rgba(245,158,11,.10)";
                const chipColor = isSelected ? "#22C55E" : isScheduled ? primary : "#F59E0B";

                return (
                  <Box
                    key={candidate.name}
                    sx={{
                      color: colors.text,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pb: idx !== recentCandidates.length - 1 ? 2.5 : 0,
                      borderBottom: idx !== recentCandidates.length - 1 ? `1px solid ${colors.border}` : "none",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.2, sm: 2 } }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(primary, 0.12),
                          color: primary,
                          fontWeight: 700,
                          width: { xs: 34, sm: 40 },
                          height: { xs: 34, sm: 40 },
                          fontSize: { xs: "0.8rem", sm: "0.95rem" },
                        }}
                      >
                        {candidate.initials}
                      </Avatar>
                      <Box>
                        <Typography sx={{ color: colors.text, fontWeight: 700, fontSize: "0.95rem" }}>
                          {candidate.name}
                        </Typography>
                        <Typography sx={{ color: colors.subText, fontSize: { xs: "0.72rem", sm: "0.82rem" } }}>
                          {candidate.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={candidate.status}
                      size="small"
                      sx={{ fontWeight: 800, fontSize: "0.72rem", bgcolor: chipBg, color: chipColor }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Card>
        </Grid>

        {/* Upcoming Interviews */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              bgcolor: colors.card,
              backdropFilter: "blur(16px)",
              boxShadow: colors.shadow,
              border: `1px solid ${colors.border}`,
              p: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography sx={{ color: colors.text, fontWeight: 800, fontSize: { xs: "1rem", sm: "1.15rem" } }}>
                Upcoming Interviews Today
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2.5 } }}>
              {upcomingInterviews.map((interview, idx) => (
                <Box
                  key={`${interview.candidate}-${interview.time}`}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: { xs: 1.2, sm: 2 },
                    pb: idx !== upcomingInterviews.length - 1 ? 2.5 : 0,
                    borderBottom: idx !== upcomingInterviews.length - 1 ? `1px solid ${colors.border}` : "none",
                  }}
                >
                  <Avatar sx={{ bgcolor: alpha(primary, 0.12), color: primary, width: 38, height: 38 }}>
                    <Calendar size={16} />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                      <Typography sx={{ color: colors.text, fontWeight: 700, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
                        {interview.candidate}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: primary }}>
                        <Clock size={11} />
                        <Typography sx={{ fontWeight: 800, fontSize: "0.8rem" }}>{interview.time}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ color: colors.subText, fontSize: "0.82rem" }}>
                      {interview.type} • <span style={{ fontWeight: 600 }}>{interview.interviewer}</span>
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Button
              variant="outlined"
              component={Link}
              to="/hr/interview-management"
              size="small"
              sx={{
                mt: 4,
                fontSize: { xs: "0.7rem", sm: "0.82rem" },
                color: primary,
                borderColor: alpha(primary, 0.4),
                "&:hover": {
                  borderColor: primary,
                  bgcolor: alpha(primary, 0.08),
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