import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import HRLayout from "../../Layouts/HRLayout";
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Box,
  Button,
  LinearProgress,
} from "@mui/material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Grid from "@mui/material/Grid";

import {
  Users,
  UserCheck,
  Calendar,
  Briefcase,
  ArrowUp,
} from "lucide-react";

export default function Analytics() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const primary = colors.primary;
  const textColor = colors.text;
  const [timePeriod, setTimePeriod] = useState("30"); // Interactivity state

  const subText = colors.subText;
  const borderStyle = colors.border;

  const stats = [
    {
      title: "Applications Received",
      value: "420",
      icon: <Users size={20} />,
      color: primary,
      growth: "+14.2%",
    },
    {
      title: "Hires Confirmed",
      value: "85",
      icon: <UserCheck size={20} />,
      color: `${primary}cc`,
      growth: "+8.4%",
    },
    {
      title: "Interviews Conducted",
      value: "128",
      icon: <Calendar size={20} />,
      color: `${primary}99`,
      growth: "+22.1%",
    },
    {
      title: "Active Job Listings",
      value: "15",
      icon: <Briefcase size={20} />,
      color: primary,
      growth: "+4.0%",
    },
  ];



  const applicationData = [
    { month: "Jan", applications: 45, hires: 8 },
    { month: "Feb", applications: 70, hires: 12 },
    { month: "Mar", applications: 85, hires: 18 },
    { month: "Apr", applications: 105, hires: 20 },
    { month: "May", applications: 135, hires: 26 },
    { month: "Jun", applications: 160, hires: 32 },
    { month: "Jul", applications: 190, hires: 40 },
  ];

  const analyticsData = {
    "7": {
      stats: [
        { value: "62" },
        { value: "8" },
        { value: "15" },
        { value: "4" },
      ],

      applications: [
        { month: "Mon", applications: 8, hires: 1 },
        { month: "Tue", applications: 12, hires: 2 },
        { month: "Wed", applications: 9, hires: 1 },
        { month: "Thu", applications: 15, hires: 3 },
        { month: "Fri", applications: 11, hires: 2 },
        { month: "Sat", applications: 5, hires: 1 },
        { month: "Sun", applications: 2, hires: 0 },
      ],

      funnel: [
        { stage: "Applied", value: 62 },
        { stage: "Screening", value: 40 },
        { stage: "Assessment", value: 18 },
        { stage: "Interview", value: 10 },
        { stage: "Hired", value: 8 },
      ],

      sources: [
        { name: "LinkedIn", value: 42 },
        { name: "Referral", value: 28 },
        { name: "Indeed", value: 18 },
        { name: "Other", value: 12 },
      ],
    },

    "30": {
      stats: [
        { value: "420" },
        { value: "85" },
        { value: "128" },
        { value: "15" },
      ],

      applications: applicationData,

      funnel: [
        { stage: "Applied", value: 420 },
        { stage: "Screening", value: 280 },
        { stage: "Assessment", value: 128 },
        { stage: "Interview", value: 95 },
        { stage: "Hired", value: 85 },
      ],

      sources: [
        { name: "LinkedIn", value: 55 },
        { name: "Referral", value: 25 },
        { name: "Indeed", value: 12 },
        { name: "Other", value: 8 },
      ],
    },

    "90": {
      stats: [
        { value: "980" },
        { value: "160" },
        { value: "290" },
        { value: "18" },
      ],

      applications: [
        { month: "Jan", applications: 150, hires: 30 },
        { month: "Feb", applications: 210, hires: 42 },
        { month: "Mar", applications: 280, hires: 58 },
      ],

      funnel: [
        { stage: "Applied", value: 980 },
        { stage: "Screening", value: 650 },
        { stage: "Assessment", value: 310 },
        { stage: "Interview", value: 200 },
        { stage: "Hired", value: 160 },
      ],
      sources: [
        { name: "LinkedIn", value: 48 },
        { name: "Referral", value: 30 },
        { name: "Indeed", value: 15 },
        { name: "Other", value: 7 },
      ],
    },

    "365": {
      stats: [
        { value: "5200" },
        { value: "820" },
        { value: "1450" },
        { value: "42" },
      ],

      applications: [
        { month: "Jan", applications: 220, hires: 38 },
        { month: "Feb", applications: 280, hires: 46 },
        { month: "Mar", applications: 320, hires: 55 },
        { month: "Apr", applications: 350, hires: 61 },
        { month: "May", applications: 390, hires: 72 },
        { month: "Jun", applications: 430, hires: 81 },
        { month: "Jul", applications: 480, hires: 94 },
        { month: "Aug", applications: 510, hires: 98 },
        { month: "Sep", applications: 540, hires: 105 },
        { month: "Oct", applications: 590, hires: 118 },
        { month: "Nov", applications: 640, hires: 126 },
        { month: "Dec", applications: 700, hires: 140 },
      ],
      funnel: [
        { stage: "Applied", value: 5200 },
        { stage: "Screening", value: 3600 },
        { stage: "Assessment", value: 1800 },
        { stage: "Interview", value: 1100 },
        { stage: "Hired", value: 820 },
      ],
      sources: [
        { name: "LinkedIn", value: 52 },
        { name: "Referral", value: 24 },
        { name: "Indeed", value: 16 },
        { name: "Other", value: 8 },
      ],
    },
  };

  const currentData = analyticsData[timePeriod];

  return (
    <HRLayout>
      {/* Analytics Page Title & Filters Bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: { xs: 3, md: 5 }, }}>

        {/* Dynamic Period Filter Buttons */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", bgcolor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", p: 0.7, borderRadius: "10px", border: `1px solid ${borderStyle}` }}>
          {["7", "30", "90", "365"].map((period) => (
            <Button
              key={period}
              size="small"
              onClick={() => setTimePeriod(period)}
              sx={{
                px: { xs: 1.5, md: 2.2 },
                fontSize: { xs: ".75rem", md: ".82rem" },
                py: 0.8,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.82rem",
                color: timePeriod === period ? "#fff" : darkMode ? "#cbd5e1" : "#475569",
                bgcolor: timePeriod === period ? primary : "transparent",
                boxShadow: timePeriod === period ? "0 4px 10px rgba(37,99,235,0.2)" : "none",
                "&:hover": {
                  bgcolor: timePeriod === period ? `${primary}dd` : darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                }
              }}
            >
              {period === "7" ? "7 Days" : period === "30" ? "30 Days" : period === "90" ? "90 Days" : "12 Months"}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Stats Cards Section */}
      <Grid container spacing={3} sx={{ mb: { xs: 3, md: 5 }, }}>
        {stats.map((item, index) => (
          <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
            <Card
              sx={{
                width: "100%",
                borderRadius: 4,
                bgcolor: colors.card,
                backdropFilter: "blur(8px)",
                color: textColor,
                border: `1px solid ${borderStyle}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: darkMode
                    ? `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${item.color}15`
                    : `0 15px 30px rgba(0, 0, 0, 0.05), 0 0 15px ${item.color}15`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.82rem", color: subText }}>
                    {item.title}
                  </Typography>
                  <Box sx={{ color: item.color, opacity: 0.85 }}>
                    {item.icon}
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: {
                        xs: "2rem",
                        md: "3rem"
                      }
                    }}
                  >
                    {currentData.stats[index].value}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", color: item.color, gap: 0.2 }}>
                    <ArrowUp size={8} />
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 700 }}>
                      {item.growth}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Chart Area */}
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
          bgcolor: colors.card,
          border: `1px solid ${borderStyle}`,
          mb: { xs: 3, md: 5 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h6" sx={{ color: textColor, fontWeight: 800 }}>
            Hiring Performance & Applications Over Time
          </Typography>
        </Box>

        {/* Dynamic Premium SVG Chart Area */}
        <Box
          sx={{
            height: { xs: 220, sm: 260, md: 320 },
            borderRadius: 3,
            bgcolor: colors.background,
            border: `1px solid ${borderStyle}`,
            p: {
              xs: 1.5,
              sm: 2,
              md: 3,
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Simulated chart component */}
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={currentData.applications} style={{ outline: "none" }}>
              <defs>
                <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#334155" : "#e2e8f0"}
              />

              <XAxis
                dataKey="month"
                stroke={subText}
              />

              <YAxis stroke={subText} />

              <Tooltip />

              <Legend />

              <Area
                type="monotone"
                dataKey="applications"
                stroke="#2563eb"
                fill="url(#colorApplications)"
                strokeWidth={3}
              />

              <Area
                type="monotone"
                dataKey="hires"
                stroke="#10b981"
                fill="url(#colorHires)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Interactive Legends overlay */}
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mt: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: "3px", bgcolor: "#2563eb" }} />
              <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: subText }}>Job Applications</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: "3px", bgcolor: "#10b981" }} />
              <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: subText }}>Hires Completed</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Grid of Double Detailed Insight Cards */}
      <Grid container spacing={{ xs: 2, md: 4 }}>

        {/* Left Column: Funnel Rates */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: {
                xs: 3,
                md: 5,
              },
              bgcolor: colors.card,
              border: `1px solid ${borderStyle}`,
              p: {
                xs: 2,
                sm: 2.5,
                md: 3.5,
              },
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ color: textColor, fontWeight: 800, mb: 3.5 }}>
              Recruitment Conversion Funnel
            </Typography>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={currentData.funnel}
                layout="vertical"
                style={{ outline: "none" }}
                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                barCategoryGap="25%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#334155" : "#e2e8f0"}
                />

                <XAxis
                  type="number"
                  stroke={subText}
                />

                <YAxis
                  type="category"
                  dataKey="stage"
                  stroke={subText}
                  width={90}
                />

                <Tooltip
                  cursor={false}
                  contentStyle={{
                    border: "none",
                    borderRadius: 12,
                    boxShadow: "0 10px 30px rgba(0,0,0,.12)",
                  }}
                />

                <Bar
                  dataKey="value"
                  fill={primary}
                  radius={[0, 8, 8, 0]}
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>

          </Card>
        </Grid>

        {/* Right Column: Source Performance */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: {
                xs: 3,
                md: 5,
              },
              bgcolor: colors.card,
              border: `1px solid ${borderStyle}`,
              p: {
                xs: 2,
                sm: 2.5,
                md: 3.5,
              },
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ color: textColor, fontWeight: 800, mb: 3.5 }}>
              Candidate Acquisition Channels
            </Typography>

            <ResponsiveContainer width="100%" height={320}>
              <PieChart style={{ outline: "none" }} >
                <Pie
                  data={currentData.sources}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  innerRadius={60}
                  paddingAngle={4}
                  label
                  stroke="none"
                >
                  <Cell fill={primary} />
                  <Cell fill={`${primary}cc`} />
                  <Cell fill={`${primary}99`} />
                  <Cell fill={`${primary}66`} />
                </Pie>

                <Tooltip
                  contentStyle={{
                    border: "none",
                    borderRadius: 12,
                    boxShadow: "0 10px 30px rgba(0,0,0,.12)",
                  }}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>

          </Card>
        </Grid>
      </Grid>
    </HRLayout>
  );
}