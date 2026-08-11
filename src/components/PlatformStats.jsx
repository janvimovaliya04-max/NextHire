import {
  Box,
  Card,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import {
  Briefcase,
  Users,
  ClipboardCheck,
  Trophy,
} from "lucide-react";

export default function PlatformStats({
  darkMode,
  textColor,
  subText,
  sectionHeadingStyle,
}) {
  const stats = [
    {
      icon: <Briefcase sx={{ fontSize: 36 }} />,
      value: "500+",
      label: "Jobs Posted",
    },
    {
      icon: <Users sx={{ fontSize: 36 }} />,
      value: "2000+",
      label: "Candidates Logged",
    },
    {
      icon: <ClipboardCheck sx={{ fontSize: 36 }} />,
      value: "1500+",
      label: "Interviews Executed",
    },
    {
      icon: <Trophy sx={{ fontSize: 36 }} />,
      value: "800+",
      label: "Successful Offers",
    },
  ];

  return (
    <Box sx={{ mb: 14 }}>
      <Typography align="center" sx={sectionHeadingStyle}>
        Trusted Performance at Scale
      </Typography>

      <Typography
        align="center"
        sx={{
          color: subText,
          fontSize: "1.05rem",
          mb: 6,
        }}
      >
        A high-growth statistics indicator for platform throughput and active volume.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
            <Card
              sx={{
                width: "100%",
                height: 180,
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                bgcolor: darkMode
                  ? "rgba(30,41,59,.25)"
                  : "rgba(255,255,255,.5)",
                border: darkMode
                  ? "1px solid rgba(255,255,255,.05)"
                  : "1px solid rgba(229,231,235,.6)",
                transition:
                  "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: "#2563eb",
                  boxShadow: darkMode
                    ? "0 15px 30px rgba(0,0,0,.2)"
                    : "0 15px 30px rgba(0,0,0,.03)",
                },
              }}
            >
              <Box sx={{ color: "#2563eb", mb: 1 }}>
                {stat.icon}
              </Box>

              <Typography
                sx={{
                  color: textColor,
                  fontWeight: 900,
                  fontSize: "2.6rem",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </Typography>

              <Typography
                sx={{
                  color: subText,
                  mt: 1,
                  fontSize: ".9rem",
                }}
              >
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}