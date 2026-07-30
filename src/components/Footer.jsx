import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

import { Link } from "react-router-dom";

export default function Footer({
  darkMode,
  textColor,
  subText,
}) {
  const footerLink = {
    color: subText,
    textDecoration: "none",
    fontSize: ".95rem",
    transition: ".3s",

    display: "inline-block",

    marginBottom: 12,
  };

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",

        mt: {
          xs: 2,
          md: 8,
        },
        background: darkMode
          ? "linear-gradient(180deg,#0b0f19 0%,#101828 100%)"
          : "linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)",

        borderTop: darkMode
          ? "1px solid rgba(255,255,255,.06)"
          : "1px solid rgba(0,0,0,.06)",

        py: 8,
      }}
    >
      <Container maxWidth="lg">

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* LEFT */}

          <Grid size={{ xs: 12, md: 5 }}>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <img
                src="/NextHirelogo.png"
                alt="NextHire"
                style={{
                  width: 170,
                  objectFit: "contain",
                }}
              />
            </Box>

            <Typography
              sx={{
                color: subText,
                maxWidth: 360,
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              NextHire is a modern interview management
              platform that simplifies recruitment,
              technical assessments, interview scheduling,
              and candidate evaluation through an elegant
              and user-friendly interface.
            </Typography>

            <Box>

              <IconButton
                sx={{
                  mr: 1,
                  bgcolor: darkMode
                    ? "#1e293b"
                    : "#eef2ff",

                  "&:hover": {
                    bgcolor: "#2563eb",
                    color: "#fff",
                  },
                }}
              >
                <GitHubIcon />
              </IconButton>

              <IconButton
                sx={{
                  mr: 1,
                  bgcolor: darkMode
                    ? "#1e293b"
                    : "#eef2ff",

                  "&:hover": {
                    bgcolor: "#2563eb",
                    color: "#fff",
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: darkMode
                    ? "#1e293b"
                    : "#eef2ff",

                  "&:hover": {
                    bgcolor: "#2563eb",
                    color: "#fff",
                  },
                }}
              >
                <EmailIcon />
              </IconButton>

            </Box>

          </Grid>

          {/* PRODUCT */}

          <Grid size={{ xs: 6, md: 2.3 }}>

            <Typography
              sx={{
                fontWeight: 700,
                mb: 2.5,
                fontSize: "1rem",
              }}
            >
              Product
            </Typography>

            <Link
              to="/"
              style={footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = subText)}
            >
              Features
            </Link>

            <br />

            <Link
              to="/"
              style={footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = subText)}
            >
              Assessments
            </Link>

            <br />

            <Link
              to="/"
              style={footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = subText)}
            >
              Interviews
            </Link>

          </Grid>

          {/* COMPANY */}

          <Grid size={{ xs: 6, md: 2.3 }}>

            <Typography
              sx={{
                fontWeight: 700,
                mb: 2.5,
                fontSize: "1rem",
              }}
            >
              Company
            </Typography>

            <Link
              to="/"
              style={footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = subText)}
            >
              About Us
            </Link>

            <br />

            <Link
              to="/"
              style={footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = subText)}
            >
              Careers
            </Link>

            <br />

            <Link
              to="/"
              style={footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = subText)}
            >
              Contact
            </Link>

          </Grid>

          {/* LEGAL */}

          <Grid size={{ xs: 12, md: 2.4 }}>

            <Typography
              sx={{
                fontWeight: 700,
                mb: 2.5,
                fontSize: "1rem",
              }}
            >
              Legal
            </Typography>

            <Link
              to="/"
              style={footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = subText)}
            >
              Privacy Policy
            </Link>

            <br />

            <Link
              to="/"
              style={footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = subText)}
            >
              Terms & Conditions
            </Link>

            <br />

            <Link
              to="/"
              style={footerLink}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = subText)}
            >
              Security
            </Link>

          </Grid>

        </Box>

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: darkMode
              ? "1px solid rgba(255,255,255,.08)"
              : "1px solid rgba(0,0,0,.08)",

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            flexWrap: "wrap",

            gap: 2,
          }}
        >

          <Typography
            sx={{
              color: subText,
              fontSize: ".9rem",
            }}
          >
            © 2026 NextHire. All Rights Reserved.
          </Typography>

        </Box>

      </Container>

    </Box>
  );
}