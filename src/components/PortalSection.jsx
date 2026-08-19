import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { ArrowRight } from "lucide-react";

export default function PortalSection({
  roles,
  darkMode,
  textColor,
  subText,
  rolesSectionRef,
  sectionHeadingStyle,
}) {
  const navigate = useNavigate();
  const handlePortalClick = (link) => {
    sessionStorage.setItem("landingScroll", window.scrollY);
    navigate(link);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: { xs: "95%", sm: "92%", md: "90%" },
        mx: "auto",
        px: { xs: 1, sm: 2, md: 0 },
      }}
    >
      <Box
        ref={rolesSectionRef}
        sx={{
          pt: { xs: 0.5, md: 6 },
          mb: { xs: 6, sm: 8, md: 12 },
        }}
      >
        <Typography
          align="center"
          sx={{
            ...sectionHeadingStyle,
            mb: { xs: 0.5, md: 1 },
            fontSize: { xs: "1.8rem", sm: "2.3rem", md: "3rem" },
          }}
        >
          Select Your Portal
        </Typography>
        <Typography
          align="center"
          sx={{
            color: subText,
            fontSize: { xs: ".95rem", sm: "1rem", md: "1.05rem" },
            px: { xs: 2, sm: 4, md: 0 },
            mb: { xs: 3, sm: 4, md: 6 },
          }}
        >
          Choose your specific gateway below to enter the NextHire space.
        </Typography>

        {/* Clean CSS Grid to guarantee exact 3 columns on medium/large screens */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            justifyContent: "center",
          }}
        >
          {roles.map((role) => (
            <Box
              key={role.title}
              onClick={() => handlePortalClick(role.link)}
              sx={{
                textDecoration: "none",
                width: "100%",
                cursor: "pointer",
                display: "flex",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 5,
                  bgcolor: darkMode
                    ? "rgba(30,41,59,.45)"
                    : "rgba(255,255,255,.70)",
                  color: textColor,
                  border: darkMode
                    ? "1px solid rgba(255,255,255,.08)"
                    : "1px solid rgba(229,231,235,.80)",
                  transition:
                    "transform .30s ease, box-shadow .30s ease, border-color .30s ease",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: role.accentColor,
                    boxShadow: darkMode
                      ? `0 20px 40px rgba(0,0,0,.40),0 0 20px ${role.accentColor}1a`
                      : `0 20px 40px rgba(0,0,0,.05),0 0 20px ${role.accentColor}1a`,
                    "& .arrow-icon": {
                      transform: "translateX(6px)",
                    },
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 2.5, sm: 3, md: 4 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                      gap: 2.5,
                      mb: 3,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: { xs: 52, sm: 56, md: 60 },
                        height: { xs: 52, sm: 56, md: 60 },
                        bgcolor: role.avatarBg,
                        borderRadius: 3,
                        flexShrink: 0,
                      }}
                    >
                      {role.icon}
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "1.2rem", sm: "1.25rem", md: "1.45rem" },
                          mb: 1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {role.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: subText,
                          fontSize: { xs: ".85rem", sm: ".88rem", md: ".95rem" },
                          lineHeight: 1.6,
                        }}
                      >
                        {role.desc}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: role.accentColor,
                      fontWeight: 700,
                      fontSize: { xs: ".8rem", sm: ".85rem", md: ".9rem" },
                    }}
                  >
                    CONTINUE TO PORTAL
                    <ArrowRight
                      className="arrow-icon"
                      sx={{
                        fontSize: 18,
                        transition: "transform .30s ease",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}