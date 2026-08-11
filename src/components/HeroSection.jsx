import { Box, Button, Container, Typography } from "@mui/material";

export default function HeroSection({
  darkMode,
  pageBg,
  subText,
  handleGetStarted,
}) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 8, md: 16 },
        pb: { xs: 2, md: 8 },
        textAlign: "center",
        bgcolor: pageBg,
      }}
    >
      {/* Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          background: darkMode
            ? "radial-gradient(ellipse at top,#1e1b4b 0%,#0b0f19 70%)"
            : "radial-gradient(ellipse at top,#eff6ff 0%,#f8fafc 70%)",

          transition: "opacity .45s ease",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "2.8rem", md: "5.5rem" },
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            mb: 3,

            background: darkMode
              ? "linear-gradient(135deg,#ffffff 0%,#cbd5e1 60%,#94a3b8 100%)"
              : "linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#475569 100%)",

            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",

            transition: "color .45s ease",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg,#2563eb,#8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hire
          </span>

          <span> Smarter </span>

          <br />

          <span> Test </span>

          <span
            style={{
              background: "linear-gradient(135deg,#2563eb,#8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Fairer
          </span>
        </Typography>

        <Typography
          sx={{
            maxWidth: 650,
            mx: "auto",
            color: subText,
            fontSize: { xs: "1.05rem", md: "1.25rem" },
            lineHeight: 1.6,
            mb: 5,

            transition: "color .45s ease",
          }}
        >
          Streamline recruitment pipelines, run interactive coding
          assessments, scheduling, and coordinate smart evaluations on a
          unified workspace.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleGetStarted}
          sx={{
            px: 6,
            py: 2,

            fontWeight: 700,
            fontSize: "1.05rem",

            borderRadius: "12px",

            textTransform: "none",

            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",

            boxShadow:
              "0 10px 30px rgba(37,99,235,.30)",

            transition:
              "transform .25s ease, box-shadow .3s ease",

            "&:hover": {
              background:
                "linear-gradient(135deg,#1d4ed8,#6d28d9)",

              transform: "translateY(-2px)",

              boxShadow:
                "0 15px 35px rgba(37,99,235,.45)",
            },
          }}
        >
          Get Started Now
        </Button>
      </Container>
    </Box>
  );
}