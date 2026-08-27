import { Box, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function FeatureSection({
  features,
  darkMode,
  subText,
  sectionHeadingStyle,
}) {
  return (
    <Box
      sx={{
        mb: { xs: 6, sm: 8, md: 14 },
      }}
    >
      <Typography align="center" sx={sectionHeadingStyle}>
        Core Platform Capabilities
      </Typography>
      <Typography
        align="center"
        sx={{
          color: subText,
          fontSize: "1.05rem",
          mb: { xs: 4, md: 6 },
        }}
      >
        Engineered to empower every stage of the technical assessment and
        hiring journey.
      </Typography>
      <Grid container spacing={4} sx={{ justifyContent: "center" }}>
        {features.map((item) => (
          <Grid
            key={item.title}
            size={{ xs: 12, sm: 6, md: 3 }}
            sx={{ display: "flex" }}
          >
            <Card
              sx={{
                cursor: "pointer",
                width: "100%",
                height: "100%",
                minHeight: 200,
                borderRadius: 5,
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                bgcolor: darkMode
                  ? "rgba(30,41,59,.35)"
                  : "rgba(255,255,255,.6)",
                backdropFilter: "blur(8px)",
                border: darkMode
                  ? "1px solid rgba(255,255,255,.05)"
                  : "1px solid rgba(229,231,235,.7)",
                transition:
                  "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: item.color,
                  boxShadow: darkMode
                    ? "0 15px 35px rgba(0,0,0,.30)"
                    : "0 15px 35px rgba(0,0,0,.04)",
                },
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 2.5,
                  bgcolor: darkMode
                    ? "rgba(255,255,255,.04)"
                    : "rgba(0,0,0,.02)",
                  border: `1px solid ${item.color}33`,
                  color: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                {item.icon}
              </Box>
              <Typography
                sx={{
                  color: darkMode ? "#fff" : "#0f172a",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: subText,
                  fontSize: ".92rem",
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}